"""Print or verify the review subject, independently of changing evidence logs."""
from pathlib import Path
import hashlib
import json
import sys

ROOT = Path(__file__).resolve().parents[1]


def subject():
    paths = set()
    for folder in ("plugins", ".agents", "tests"):
        paths.update(path for path in (ROOT / folder).rglob("*")
                     if path.is_file() and "__pycache__" not in path.parts)
    paths.update(ROOT / name for name in (
        "AGENTS.md", "README.md", "package.json", "LICENSE", ".gitignore",
        "docs/ownership.md", "docs/recovery.md", "docs/parity.md",
        "docs/lifecycle.md", "docs/source-inventory.json", "docs/architecture.md",
        "docs/skills.md", "docs/distribution.md", "docs/source-audit.md",
        "docs/archive/inventory.json",
    ))
    paths.update(path for path in (ROOT / "docs/archive/0.1.x").rglob("*") if path.is_file())
    return {str(path.relative_to(ROOT)): hashlib.sha256(path.read_bytes()).hexdigest()
            for path in sorted(paths)}


current = subject()
if sys.argv[1:] == ["--check"]:
    accepted = json.loads((ROOT / "docs/review-subject.json").read_text())
    changed = sorted(path for path in current.keys() | accepted.keys()
                     if current.get(path) != accepted.get(path))
    if changed:
        print("FAIL: stale review subject: " + ", ".join(changed))
        raise SystemExit(1)
    print(f"PASS: all {len(current)} subject paths match the frozen review inventory")
elif not sys.argv[1:]:
    print(json.dumps(current, indent=2))
else:
    raise SystemExit("Usage: python3 tests/review-subject.py [--check]")
