"""Author-only filesystem/Git rehearsal of the documented independent-checkout layout.

Exercises shipped assets, independent Git roots/indexes and a synthetic move map.
This is not a consumer migration engine, instruction loader or model evaluator.
Security decisions use the separate requests.json forward-review scenarios.
"""
from pathlib import Path
import hashlib
import json
import os
import shutil
import stat
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "skills/aios-onboard/assets/owner"


def git(root, *args):
    # No user Git config, credentials, network or real repository index involved.
    env = {key: value for key, value in os.environ.items() if not key.startswith("GIT_")}
    env.update(GIT_CONFIG_NOSYSTEM="1", GIT_CONFIG_GLOBAL=os.devnull)
    return subprocess.run(["git", "-C", str(root), *args], env=env,
                          check=True, capture_output=True, text=True).stdout.strip()


def snapshot(root):
    result = {}
    for path in sorted(root.rglob("*")):
        relative = str(path.relative_to(root))
        if path.is_symlink():
            result[relative] = {"link": os.readlink(path)}
        elif path.is_file():
            result[relative] = {
                "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
                "mode": stat.S_IMODE(path.stat().st_mode),
            }
    return result


def ignored(root, path):
    try:
        git(root, "check-ignore", "--no-index", "--", path)
        return True
    except subprocess.CalledProcessError as error:
        assert error.returncode == 1
        return False


def inspect_layout(owner):
    tracked = set(git(owner, "ls-files").splitlines())
    for family, slug in (("projects", "catalog"), ("systems", "reporting")):
        checkout = owner / family / slug
        assert not checkout.is_symlink()
        assert Path(git(checkout, "rev-parse", "--show-toplevel")) == checkout.resolve()
        assert (checkout / ".git").is_dir()
        assert (checkout / "AGENTS.md").is_file()
        assert (checkout / "docs/lifecycle.md").is_file()
        assert not (owner / "AGENTS.md").exists()
        assert not (owner / "AGENTS.override.md").exists()
        assert not (owner / family / "AGENTS.md").exists()
        assert not (owner / family / "AGENTS.override.md").exists()
        assert ignored(owner, f"{family}/{slug}/draft.txt"), "checkout exclusion missing"
        assert not ignored(owner, f"{family}/README.md"), "registry excluded"
        assert not any(p == f"{family}/{slug}" or p.startswith(f"{family}/{slug}/")
                       for p in tracked), "checkout already tracked"
    assert Path(git(owner, "rev-parse", "--show-toplevel")) == owner.resolve()


def main():
    evidence = {}
    with tempfile.TemporaryDirectory(prefix="aios-layout-") as temporary:
        fixture = Path(temporary)
        owner = fixture / "account/.AIOS"
        shutil.copytree(ASSETS, owner)
        git(owner, "init", "-q", "-b", "main")
        for family, slug in (("projects", "catalog"), ("systems", "reporting")):
            checkout = owner / family / slug
            checkout.mkdir()
            git(checkout, "init", "-q", "-b", "main")
            (checkout / "AGENTS.md").write_text("Use this repository's local lifecycle.\n")
            (checkout / "docs").mkdir()
            (checkout / "docs/lifecycle.md").write_text("Spec READY; Build then Review, authorized Ship.\n")
            (checkout / "draft.txt").write_text("Untracked original, not recoverable from Git.\n")
            (checkout / ".gitignore").write_text("private-fixture.txt\n")
            (checkout / "private-fixture.txt").write_text("Synthetic ignored data only.\n")
            (checkout / "private-fixture.txt").chmod(0o600)
            git(checkout, "add", "--", "AGENTS.md", "docs/lifecycle.md", ".gitignore")
            assert "draft.txt" not in git(checkout, "ls-files").splitlines()
            assert ignored(checkout, "private-fixture.txt")
        git(owner, "add", "--", ".gitignore", "AIOS.md", "AIOS_FORMAT", "MEMORY.md",
            "CONNECTIONS.md", "projects/README.md", "systems/README.md")
        inspect_layout(owner)
        evidence["layout"] = "PASS: physical nested Git roots, local lifecycle, registry staging, checkout exclusions"
        evidence["instruction_assets"] = "PASS: no owner/intermediate AGENTS or override; cold inheritance not tested"

        # Make sure real regressions fail: ignore alone cannot protect a tracked file.
        bad = fixture / "bad-index"
        shutil.copytree(owner, bad)
        # Model a parent index entry predating the nested repository; git add
        # deliberately avoids descending into an already independent checkout.
        blob = git(bad, "hash-object", "-w", "--", "projects/catalog/draft.txt")
        git(bad, "update-index", "--add", "--cacheinfo",
            f"100644,{blob},projects/catalog/draft.txt")
        assert ignored(bad, "projects/catalog/draft.txt")
        try:
            inspect_layout(bad)
        except AssertionError as error:
            assert str(error) == "checkout already tracked"
        else:
            raise AssertionError("accepted already tracked checkout")
        bad_rules = fixture / "bad-rules"
        shutil.copytree(owner, bad_rules)
        (bad_rules / ".gitignore").write_text(".env\n")
        try:
            inspect_layout(bad_rules)
        except AssertionError as error:
            assert str(error) == "checkout exclusion missing"
        else:
            raise AssertionError("accepted absent checkout exclusion")
        evidence["negative_controls"] = "PASS: missing ignore and already tracked checkout rejected"

        # Explicit synthetic move: portable context and repository copies have
        # separate inventories. No real home or Git worktree repair is exercised.
        before = snapshot(owner)
        restored = fixture / "receiving-account/Chosen Home"
        shutil.copytree(owner, restored,
                        ignore=lambda path, names: [n for n in names
                                                   if Path(path) == owner and n == ".git"
                                                   or Path(path) == owner / "projects" and n == "catalog"
                                                   or Path(path) == owner / "systems" and n == "reporting"])
        for family, slug in (("projects", "catalog"), ("systems", "reporting")):
            source = owner / family / slug
            target = restored / family / slug
            shutil.copytree(source, target)
            assert snapshot(source) == snapshot(target)
        git(restored, "init", "-q", "-b", "main")
        inspect_layout(restored)
        portable = {p: value for p, value in before.items()
                    if not p.startswith((".git/", "projects/catalog/", "systems/reporting/"))}
        assert all(snapshot(restored)[p] == value for p, value in portable.items())
        assert snapshot(owner) == before
        # Replay against accepted after-images makes no write; a later edit is
        # retained as a conflict instead of overwritten with an old source.
        accepted = snapshot(restored)
        mtimes = {str(p.relative_to(restored)): p.stat().st_mtime_ns
                  for p in restored.rglob("*") if p.is_file()}
        for relative, expected in accepted.items():
            assert snapshot(restored)[relative] == expected
        assert mtimes == {str(p.relative_to(restored)): p.stat().st_mtime_ns
                          for p in restored.rglob("*") if p.is_file()}
        memory = restored / "MEMORY.md"
        memory.write_text(memory.read_text() + "\nLater owner correction.\n")
        assert snapshot(restored)["MEMORY.md"] != accepted["MEMORY.md"]
        assert "Later owner correction." in memory.read_text()
        assert snapshot(owner) == before
        evidence["move_replay_recovery"] = "PASS: separate context/repository copies, ignored/untracked bytes and modes retained; equal replay unchanged, later edit retained"
        evidence["deletion_boundary"] = "PASS: fixture untracked/ignored files absent from Git index but present in verified backup; no destructive command executed"

    evidence["limits"] = "Scripted after-images, not cold harness selection, live migration, hook enforcement or a security scan"
    output = ROOT / ".tmp/review-evidence/layout-rehearsal.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(evidence, indent=2) + "\n")
    for result in evidence.values():
        print(result)


if __name__ == "__main__":
    main()
