"""Fast source checks for the instruction package; no runtime or model claims."""

from pathlib import Path
import json
import re
import shutil
import struct
import tempfile


ROOT = Path(__file__).resolve().parents[1]
SKILL_NAMES = {
    "aios", "aios-build-work", "aios-check", "aios-create-project",
    "aios-create-system", "aios-maintain-context", "aios-manage-skills",
    "aios-onboard", "aios-orchestrate-workers", "aios-review-work",
    "aios-ship-work", "aios-spec-work", "aios-triage-improvement",
    "aios-update",
}
PRODUCT_PATHS = (".codex-plugin", "skills", "assets/icon.png", "LICENSE")
FORBIDDEN_KEYS = {"scripts", "dependencies", "devDependencies", "peerDependencies"}
SECRET_PATTERNS = (
    r"AKIA[0-9A-Z]{16}",
    r"-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----",
    r"gh[pousr]_[A-Za-z0-9_]{30,}",
    r"sk-[A-Za-z0-9_-]{20,}",
    r"xox[baprs]-[A-Za-z0-9-]{10,}",
)


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def frontmatter(path):
    text = path.read_text()
    require(text.startswith("---\n") and "\n---\n" in text[4:], f"frontmatter: {path}")
    block = text.split("\n---\n", 1)[0][4:]
    return {key.strip(): value.strip() for line in block.splitlines()
            if ":" in line for key, value in [line.split(":", 1)]}


def link_targets(path, boundary=None):
    for target in re.findall(r"\[[^\]]*\]\(([^)]+)\)", path.read_text()):
        if re.match(r"[a-z]+:", target) or target.startswith("#"):
            continue
        resolved = (path.parent / target.split("#", 1)[0]).resolve()
        if boundary:
            require(resolved.is_relative_to(boundary.resolve()),
                    f"product link escapes package: {path} -> {target}")
        require(resolved.exists(), f"broken link: {path} -> {target}")
        yield resolved


def copy_product(root, destination):
    for relative in PRODUCT_PATHS:
        source = root / relative
        require(source.exists() and not source.is_symlink(), f"product path: {relative}")
        target = destination / relative
        if source.is_dir():
            shutil.copytree(source, target)
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)


def validate(root=ROOT):
    manifest = json.loads((root / ".codex-plugin/plugin.json").read_text())
    package = json.loads((root / "package.json").read_text())
    marketplace = json.loads((root / ".agents/plugins/marketplace.json").read_text())

    require(manifest["name"] == package["name"] == "aios", "package identity")
    require(manifest["version"] == package["version"], "version mismatch")
    require(re.fullmatch(r"\d+\.\d+\.\d+", manifest["version"]), "invalid version")
    require(not (FORBIDDEN_KEYS & package.keys()), "consumer script or dependency")
    require(set(package["files"]) == set(PRODUCT_PATHS) | {"README.md"},
            "package inventory")
    require(set(package["pi"]) == {"skills"} and len(package["pi"]["skills"]) == 1,
            "Pi declaration")
    require(not ({"hooks", "apps", "mcpServers"} & manifest.keys()),
            "unexpected plugin runtime")

    skill_root = (root / manifest["skills"]).resolve()
    require(skill_root == (root / package["pi"]["skills"][0]).resolve(),
            "Codex and Pi use different skill sources")
    require(skill_root == (root / "skills").resolve(), "noncanonical skill root")

    entry = marketplace["plugins"]
    require(len(entry) == 1, "marketplace entry count")
    entry = entry[0]
    require(entry["name"] == "aios", "marketplace identity")
    require((root / entry["source"]["path"]).resolve() == root.resolve(),
            "marketplace source")
    require(entry["policy"] == {"installation": "AVAILABLE", "authentication": "ON_INSTALL"},
            "marketplace policy")

    skill_files = sorted(skill_root.glob("*/SKILL.md"))
    require({path.parent.name for path in skill_files} == SKILL_NAMES, "skill inventory")
    for path in skill_files:
        fields = frontmatter(path)
        require(fields.get("name") == path.parent.name, f"skill name: {path}")
        require(0 < len(fields.get("description", "")) <= 1024,
                f"skill description: {path}")
        require("disable-model-invocation" not in fields, f"implicit invocation: {path}")

    manager = skill_root / "aios-manage-skills"
    owner_lifecycle = manager / "references/owner-skills.md"
    require(owner_lifecycle.is_file(), "missing personal-skill owner")
    require(not (skill_root / "aios-maintain-context/references/owner-skills.md").exists(),
            "duplicate personal-skill owner")
    caller_targets = set()
    for relative in (
        "skills/aios/SKILL.md",
        "skills/aios-onboard/SKILL.md",
        "skills/aios-check/references/checks.md",
        "skills/aios-maintain-context/references/curation.md",
    ):
        caller_targets.update(link_targets(root / relative))
    require((manager / "SKILL.md").resolve() in caller_targets, "Manage Skills not routed")
    require(owner_lifecycle.resolve() in caller_targets, "personal-skill procedure not routed")

    owner = skill_root / "aios-onboard/assets/owner"
    require((owner / "AIOS_FORMAT").read_bytes() == b"1\n", "owner format")
    require(not list(owner.rglob("AGENTS.md")) and not list(owner.rglob("AGENTS.override.md")),
            "inherited owner instructions")
    bridge = (skill_root / "aios-onboard/assets/bridge.md").read_text()
    require(len(bridge.splitlines()) <= 14 and "AIOS_ABSOLUTE_PATH" in bridge,
            "bridge scope")
    require("local AGENTS.md and lifecycle first" in bridge and
            "Do not preload personal AIOS context" in bridge, "bridge isolation")

    parity = (skill_root / "aios-onboard/references/legacy-parity.md").read_text()
    parity_names = re.findall(r"^\| (aios[^ ]*) \|", parity, re.M)
    require(len(parity_names) == len(set(parity_names)) == 17, "legacy behavior map")

    icon = (root / "assets/icon.png").read_bytes()
    require(icon[:8] == b"\x89PNG\r\n\x1a\n" and icon[12:16] == b"IHDR", "icon format")
    width, height = struct.unpack(">II", icon[16:24])
    require(width == height and 256 <= width <= 2048, "icon dimensions")
    interface = manifest["interface"]
    require(interface["composerIcon"] == interface["logo"] == "./assets/icon.png",
            "icon declaration")

    for relative in PRODUCT_PATHS:
        product = root / relative
        members = product.rglob("*") if product.is_dir() else [product]
        for path in members:
            require(not path.is_symlink(), f"product symlink: {path}")
            if path.is_file():
                allowed = (path.suffix in {".md", ".json"} or
                           path.name in {"LICENSE", "AIOS_FORMAT", ".gitignore"} or
                           path == root / "assets/icon.png")
                require(allowed, f"unexpected product file: {path}")

    documents = [root / "README.md", root / "AGENTS.md"]
    for folder in (root / "docs", root / "skills", root / ".agents/skills"):
        documents.extend(folder.rglob("*.md"))
    for path in documents:
        list(link_targets(path))
        text = path.read_text()
        require(not re.search(r"/(?:Users|home)/[\w.-]+/", text),
                f"personal machine path: {path}")
        require(not any(re.search(pattern, text) for pattern in SECRET_PATTERNS),
                f"secret-like content: {path}")

    with tempfile.TemporaryDirectory(prefix="aios-package-") as temporary:
        staged = Path(temporary) / "aios"
        copy_product(root, staged)
        require(not any((staged / name).exists() for name in (".agents", "docs", "tests", "AGENTS.md")),
                "author content in product")
        for path in staged.rglob("*.md"):
            list(link_targets(path, staged))


def rejected(mutator, expected):
    with tempfile.TemporaryDirectory(prefix="aios-negative-") as temporary:
        copy = Path(temporary) / "repo"
        shutil.copytree(ROOT, copy, ignore=shutil.ignore_patterns(".git", ".tmp"))
        mutator(copy)
        try:
            validate(copy)
        except AssertionError as error:
            require(expected in str(error), f"wrong rejection: {error}")
        else:
            raise AssertionError(f"accepted regression: {expected}")


def negative_controls():
    def split_source(root):
        package = json.loads((root / "package.json").read_text())
        package["pi"]["skills"] = ["./copied-skills"]
        (root / "package.json").write_text(json.dumps(package))

    def install_script(root):
        package = json.loads((root / "package.json").read_text())
        package["scripts"] = {"postinstall": "echo unexpected"}
        (root / "package.json").write_text(json.dumps(package))

    def inherited_instructions(root):
        (root / "skills/aios-onboard/assets/owner/AGENTS.md").write_text("Read all owner data.\n")

    def duplicate_owner(root):
        path = root / "skills/aios-maintain-context/references/owner-skills.md"
        path.write_text("# Duplicate owner\n")

    def runtime_script(root):
        (root / "skills/aios/unsafe.sh").write_text("echo unexpected\n")

    rejected(split_source, "different skill sources")
    rejected(install_script, "consumer script or dependency")
    rejected(inherited_instructions, "inherited owner instructions")
    rejected(duplicate_owner, "duplicate personal-skill owner")
    rejected(runtime_script, "unexpected product file")


if __name__ == "__main__":
    validate()
    negative_controls()
    print("PASS: package declarations, 14 skill frontmatters, routes, links, isolation, and security checks")
    print("PASS: rejects split sources, install/runtime scripts, inherited instructions, and duplicate ownership")
