"""Author-only checks and export of the one approved public AIOS document."""

import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess
import tempfile


ROOT = Path(__file__).resolve().parents[1]
PROJECT = "https://github.com/onlinesourdough/AIOS-Plugin"
SOURCE_PATH = "docs/public/aios.md"
VERSION = r"(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)"


def verify_document(document, version):
    if not isinstance(version, str) or not re.fullmatch(VERSION, version):
        raise ValueError("Invalid AIOS package version.")
    text = document.decode("utf-8")
    labels = re.findall(r"^AIOS version: (.+)$", text, re.M)
    if labels != [version] or not text.startswith(f"# AIOS\n\nAIOS version: {version}\n"):
        raise ValueError("Public overview version must match the AIOS package version.")


def check(root=ROOT):
    package = json.loads((root / "package.json").read_text())
    manifest = json.loads((root / "plugin.json").read_text())
    if SOURCE_PATH not in package["files"]:
        raise ValueError("Public overview must be explicitly included in the native package.")
    if manifest["version"] != package["version"]:
        raise ValueError("AIOS package version mismatch.")
    verify_document((root / SOURCE_PATH).read_bytes(), manifest["version"])


def git(root, *arguments):
    result = subprocess.run(["git", "-C", str(root), *arguments],
                            capture_output=True, check=False)
    if result.returncode:
        raise ValueError("Could not read the requested AIOS source revision.")
    return result.stdout


def export(root, ref, output, expected_version=None):
    origin = git(root, "remote", "get-url", "origin").decode().strip()
    if origin not in (PROJECT, PROJECT + ".git", "git@github.com:onlinesourdough/AIOS-Plugin.git"):
        raise ValueError("AIOS source origin mismatch.")
    commit = git(root, "rev-parse", "--verify", "--end-of-options", ref + "^{commit}").decode().strip()
    for path in (SOURCE_PATH, "plugin.json", "package.json"):
        entry = git(root, "ls-tree", commit, "--", path).decode()
        if not entry.startswith("100644 blob "):
            raise ValueError("Public export requires regular source files.")
    manifest = json.loads(git(root, "show", f"{commit}:plugin.json"))
    package = json.loads(git(root, "show", f"{commit}:package.json"))
    if package["version"] != manifest["version"] or SOURCE_PATH not in package["files"]:
        raise ValueError("Source revision does not ship matching AIOS documentation.")
    document = git(root, "show", f"{commit}:{SOURCE_PATH}")
    verify_document(document, manifest["version"])
    if expected_version is not None and expected_version != manifest["version"]:
        raise ValueError("Release tag version does not match the exported AIOS version.")
    metadata = {
        "schemaVersion": 1,
        "project": PROJECT,
        "version": manifest["version"],
        "commit": commit,
        "sourceDate": git(root, "show", "-s", "--format=%cI", commit).decode().strip(),
        "sourcePath": SOURCE_PATH,
        "destinationPath": "aios.md",
        "bytes": len(document),
        "sha256": hashlib.sha256(document).hexdigest(),
    }
    # A new directory is the export unit. Never overwrite an earlier release.
    output = output.resolve()
    if output.exists():
        raise ValueError("Export destination already exists; choose a new directory.")
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix=".aios-docs-", dir=output.parent) as temporary:
        staged = Path(temporary) / "export"
        staged.mkdir()
        (staged / "aios.md").write_bytes(document)
        (staged / "aios.meta.json").write_text(json.dumps(metadata, indent=2) + "\n")
        staged.rename(output)
    return metadata


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    subcommands = parser.add_subparsers(dest="command", required=True)
    subcommands.add_parser("check")
    export_parser = subcommands.add_parser("export")
    export_parser.add_argument("--ref", required=True, help="Reviewed commit or tag")
    export_parser.add_argument("--output", required=True, type=Path)
    export_parser.add_argument("--version", help="Expected package version for a release tag")
    args = parser.parse_args()
    try:
        if args.command == "check":
            check()
            print("PASS: packaged public overview matches the AIOS version.")
        else:
            metadata = export(ROOT, args.ref, args.output, args.version)
            print(f"Exported AIOS {metadata['version']} documentation at {metadata['commit']}.")
    except (ValueError, OSError, KeyError) as error:
        parser.exit(1, f"Public documentation: {error}\n")


if __name__ == "__main__":
    main()
