"""Author-only package integrity checks; no consumer runtime or model simulation."""
from pathlib import Path
import hashlib
import json
import re
import tempfile
import shutil
import tarfile
import struct

ROOT = Path(__file__).resolve().parents[1]
PLUGIN = ROOT / "plugins/aios"
NAMES = {
    "aios", "aios-onboard", "aios-spec-work", "aios-build-work",
    "aios-review-work", "aios-ship-work", "aios-check",
    "aios-maintain-context", "aios-create-project", "aios-create-system", "aios-update",
}


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def markdown_links(path, boundary=None):
    for target in re.findall(r"\[[^\]]*\]\(([^)]+)\)", path.read_text()):
        if re.match(r"[a-z]+:", target) or target.startswith("#"):
            continue
        resolved = (path.parent / target.split("#")[0]).resolve()
        if boundary is not None:
            require(resolved.is_relative_to(boundary.resolve()), f"package link escapes archive: {target}")
        require(resolved.exists(), f"broken link: {path} -> {target}")
        yield resolved


def packaged_topology(plugin, expected_reserved):
    # Exercise the archive alone: developer docs cannot accidentally satisfy links.
    with tempfile.TemporaryDirectory() as temporary:
        location = Path(temporary)
        archive = location / "plugin.tar"
        with tarfile.open(archive, "w") as bundle:
            bundle.add(plugin, arcname=plugin.name)
        with tarfile.open(archive) as bundle:
            bundle.extractall(location / "extracted", filter="data")
        extracted = location / "extracted" / plugin.name
        for document in extracted.rglob("*.md"):
            list(markdown_links(document, extracted))
        entry = extracted / "skills/aios-onboard/SKILL.md"
        visited, pending = set(), [entry.resolve()]
        while pending:
            document = pending.pop()
            if document in visited:
                continue
            visited.add(document)
            pending.extend(target for target in markdown_links(document, extracted)
                           if target.is_file() and target.suffix == ".md")
        parity = extracted / "skills/aios-onboard/references/legacy-parity.md"
        require(parity.resolve() in visited, "onboarding cannot reach packaged parity")
        rows = re.findall(r"^\| (aios[^ ]*) \|", parity.read_text(), re.M)
        require(len(rows) == len(set(rows)) and set(rows) == expected_reserved, "packaged parity coverage")
        require(len(list(extracted.rglob("*parity*.md"))) == 1, "duplicate packaged parity map")


def validate(root=ROOT):
    plugin = root / "plugins/aios"
    manifest = json.loads((plugin / ".codex-plugin/plugin.json").read_text())
    package = json.loads((root / "package.json").read_text())
    market = json.loads((root / ".agents/plugins/marketplace.json").read_text())
    require(manifest["name"] == package["name"] == plugin.name, "plugin identity")
    require(manifest["version"] == package["version"], "release versions differ")
    require(re.fullmatch(r"\d+\.\d+\.\d+", manifest["version"]), "version")
    require(not {"scripts", "dependencies", "devDependencies", "peerDependencies"} & package.keys(), "consumer dependency/script")
    require(set(package["pi"]) == {"skills"}, "unexpected Pi runtime resource")
    require(not {"hooks", "apps", "mcpServers"} & manifest.keys(), "unexpected plugin runtime")
    interface = manifest["interface"]
    require(interface["composerIcon"] == interface["logo"] == "./assets/icon.png", "icon source differs")
    icon = (plugin / "assets/icon.png").read_bytes()
    require(icon[:8] == b"\x89PNG\r\n\x1a\n" and icon[12:16] == b"IHDR", "invalid icon PNG")
    width, height = struct.unpack(">II", icon[16:24])
    require(width == height and 256 <= width <= 2048, "icon dimensions")
    require(len(market["plugins"]) == 1, "marketplace entry count")
    entry = market["plugins"][0]
    require((root / entry["source"]["path"]).resolve() == plugin.resolve(), "marketplace target")
    require(entry["name"] == manifest["name"], "marketplace identity")
    require(entry["policy"] == {"installation": "AVAILABLE", "authentication": "ON_INSTALL"}, "marketplace policy")
    codex_path = (plugin / manifest["skills"]).resolve()
    require(len(package["pi"]["skills"]) == 1, "multiple skill sources")
    require((root / package["pi"]["skills"][0]).resolve() == codex_path, "harnesses have different bodies")
    found = {p.parent.name for p in codex_path.glob("*/SKILL.md")}
    require(found == NAMES, f"skill names: {found}")
    for path in codex_path.glob("*/SKILL.md"):
        text = path.read_text()
        require(text.startswith("---\n"), f"frontmatter {path}")
        front = text.split("---", 2)[1]
        fields = dict(line.split(":", 1) for line in front.splitlines() if ":" in line)
        require(fields.get("name", "").strip() == path.parent.name, "skill identity")
        require(0 < len(fields.get("description", "").strip()) <= 1024, "skill description")
        require("disable-model-invocation" not in fields, "implicit invocation disabled")
    for path in plugin.rglob("*"):
        require(not path.is_symlink(), f"nonportable package symlink: {path}")
        if path.is_file():
            require(path.suffix in {".md", ".json"} or path.name in {"LICENSE", "AIOS_FORMAT", ".gitignore"}
                    or path == plugin / "assets/icon.png", f"unexpected runtime file {path}")
    for path in root.rglob("*.md"):
        if path.is_relative_to(root / "docs/archive/0.1.x"):
            continue  # Exact historical bytes; relative links resolve at their original release.
        if path == root / "HANDOFF.md" or any(part in {".git", ".tmp"} for part in path.relative_to(root).parts):
            continue
        require(all(line == line.rstrip() for line in path.read_text().splitlines()), f"trailing whitespace: {path}")
        list(markdown_links(path))
        require(not re.search(r"/(?:Users|home)/[\w.-]+/", path.read_text()), f"personal machine path: {path}")
        require(not re.search(r"\b[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}\b", path.read_text()), f"execution session identity: {path}")
    owner = codex_path / "aios-onboard/assets/owner"
    require(not list(owner.rglob("AGENTS.md")) and not list(owner.rglob("AGENTS.override.md")),
            "inherited owner instructions in assets")
    require((owner / "AIOS_FORMAT").read_text() == "1\n", "owner format")
    require(len((owner / "AIOS.md").read_bytes()) < 6000, "oversized entry")
    require(len((owner / "AIOS.md").read_text().splitlines()) <= 100, "entry lines")
    expected_reserved = set(json.loads((root / "docs/source-inventory.json").read_text()))
    require(len(expected_reserved) == 17, "legacy source inventory count")
    packaged_topology(plugin, expected_reserved)
    require(not re.search(r"^\| aios", (root / "docs/parity.md").read_text(), re.M), "duplicate developer parity map")
    archive = json.loads((root / "docs/archive/inventory.json").read_text())
    for relative, expected in archive["files"].items():
        archived = root / relative
        require(archived.resolve().is_relative_to((root / "docs/archive/0.1.x").resolve()), "archive path escapes history")
        require(hashlib.sha256(archived.read_bytes()).hexdigest() == expected,
                f"historical bytes changed: {relative}")
    return len(list(plugin.rglob("*")))


def negative_controls():
    # The validator must reject real packaging regressions, not just accept itself.
    with tempfile.TemporaryDirectory() as temporary:
        copy = Path(temporary)
        shutil.copytree(ROOT, copy, dirs_exist_ok=True,
                        ignore=shutil.ignore_patterns(".git", ".tmp", "HANDOFF.md"))
        validate(copy)
        package = json.loads((copy / "package.json").read_text())
        for mutation, expected_error in (("split-source", "harnesses have different bodies"),
                                         ("runtime-script", "consumer dependency/script")):
            bad = json.loads(json.dumps(package))
            if mutation == "split-source":
                bad["pi"]["skills"] = ["./copied-skills"]
            else:
                bad["scripts"] = {"postinstall": "echo unexpected"}
            (copy / "package.json").write_text(json.dumps(bad))
            try:
                validate(copy)
            except AssertionError as error:
                require(str(error) == expected_error, f"wrong negative-control failure: {error}")
                continue
            raise AssertionError(f"negative control accepted: {mutation}")
        (copy / "package.json").write_text(json.dumps(package))
        owner_agents = copy / "plugins/aios/skills/aios-onboard/assets/owner/AGENTS.md"
        owner_agents.write_text("Read personal owner context before every task.\n")
        try:
            validate(copy)
        except AssertionError as error:
            require(str(error) == "inherited owner instructions in assets", f"wrong inheritance failure: {error}")
        else:
            raise AssertionError("negative control accepted: inherited owner instructions")
        owner_agents.unlink()
        parity = copy / "plugins/aios/skills/aios-onboard/references/legacy-parity.md"
        parity.unlink()
        try:
            validate(copy)
        except AssertionError as error:
            require("legacy-parity.md" in str(error), f"wrong missing-parity failure: {error}")
        else:
            raise AssertionError("negative control accepted: absent packaged parity")
        shutil.copy2(ROOT / "plugins/aios/skills/aios-onboard/references/legacy-parity.md", parity)
        archived = copy / "docs/archive/0.1.x/behavior-review.md"
        archived.write_text(archived.read_text() + "\nChanged historical claim.\n")
        try:
            validate(copy)
        except AssertionError as error:
            require("historical bytes changed" in str(error), f"wrong archive failure: {error}")
        else:
            raise AssertionError("negative control accepted: rewritten historical evidence")


if __name__ == "__main__":
    count = validate()
    negative_controls()
    print(f"PASS: package integrity, 11 distinct shared skills, current Markdown links, owner format, legacy behavior map and immutable archive; {count} package paths")
    print("PASS: extracted plugin topology; rejects split sources, install scripts, inherited owner instructions, absent packaged parity and rewritten historical evidence")
