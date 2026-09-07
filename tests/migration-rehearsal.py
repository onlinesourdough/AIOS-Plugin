"""Author-only execution of an accepted synthetic identity map, not a migration tool.

This proves file-level preservation/replay/conflict feasibility. It does not test
model route selection, live package removal, native permissions or a real home move.
"""
from pathlib import Path
import hashlib
import json
import os
import shutil
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def digest(data):
    return hashlib.sha256(data).hexdigest()


def snapshot(root):
    result = {}
    for path in sorted(root.rglob("*")):
        if path.is_symlink():
            result[str(path.relative_to(root))] = {"link": os.readlink(path)}
        elif path.is_file():
            result[str(path.relative_to(root))] = {
                "hash": digest(path.read_bytes()), "mode": path.stat().st_mode & 0o777,
                "mtime": path.stat().st_mtime_ns,
            }
    return result


def apply_entry(source, expected_source, destination, accepted):
    # Only a fixed reviewed fixture entry reaches this operation.
    if source.is_symlink() or digest(source.read_bytes()) != expected_source:
        return "source-conflict"
    if destination.is_symlink():
        return "symlink-conflict"
    if destination.exists():
        return "noop" if destination.read_bytes() == accepted else "destination-conflict"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(accepted)
    destination.chmod(source.stat().st_mode & 0o777)
    return "written"


def rehearse():
    evidence = {}
    with tempfile.TemporaryDirectory(prefix="aios-migration-") as temporary:
        fixture = Path(temporary)
        old = fixture / "client/.OSM"
        old.mkdir(parents=True)
        (old / "OSM.md").write_bytes(b"# Workshop\nRead [memory](MEMORY.md).\nUnknown field: keep exactly.\n")
        (old / "OSM_FORMAT").write_bytes(b"1\n")
        (old / "MEMORY.md").write_text("# Memory\nFocus: ceramic mugs. Source: owner note.\n")
        (old / "CONNECTIONS.md").write_text("# Connections\nAccount: workshop-only.\nExternal writes: ask.\nUnknown column: retained.\n")
        (old / "context").mkdir()
        (old / "context/client.md").write_text("# Klient\nSprog: dansk. Bevar æ, ø og å.\n")
        (old / "context/client.md").chmod(0o600)
        (old / "work").mkdir()
        (old / "work/untracked-draft.md").write_text("Preserve local work outside the portable map.\n")
        baseline = snapshot(old)
        backup = fixture / "protected-backup"
        shutil.copytree(old, backup, copy_function=shutil.copy2)
        assert snapshot(backup) == baseline
        restored = fixture / "restore-proof"
        shutil.copytree(backup, restored, copy_function=shutil.copy2)
        assert snapshot(restored) == baseline

        target = fixture / "client/.AIOS"
        target.mkdir()
        mapping = {"OSM.md": "AIOS.md", "MEMORY.md": "MEMORY.md",
                   "CONNECTIONS.md": "CONNECTIONS.md", "context/client.md": "context/client.md"}
        outputs = {}
        for source_name, destination_name in mapping.items():
            source = old / source_name
            outputs[destination_name] = source.read_bytes()
            assert apply_entry(source, digest(source.read_bytes()), target / destination_name,
                               outputs[destination_name]) == "written"
        # Format identity is written last, after mapped bytes and restore checks.
        assert apply_entry(old / "OSM_FORMAT", digest(b"1\n"), target / "AIOS_FORMAT", b"1\n") == "written"
        for name, content in outputs.items():
            assert (target / name).read_bytes() == content
        before_replay = snapshot(target)
        for source_name, destination_name in mapping.items():
            assert apply_entry(old / source_name, baseline[source_name]["hash"],
                               target / destination_name, outputs[destination_name]) == "noop"
        assert apply_entry(old / "OSM_FORMAT", digest(b"1\n"), target / "AIOS_FORMAT", b"1\n") == "noop"
        assert snapshot(target) == before_replay and snapshot(old) == baseline
        evidence["osm_format1"] = "mapped bytes/modes preserved; tested backup/restore; identical replay has zero writes"

        # A transformed custom method changes only a proved relative path.
        method = fixture / "client-method.md"
        original = b"---\nname: workshop-brief\nmetadata:\n  unknown: retain\n---\nRead [facts](../../../.aios/CONTEXT.md).\nAuthority: ask.\n"
        method.write_bytes(original)
        before = b"../../../.aios/CONTEXT.md"
        after = b"../../context/client.md"
        adapted = original.replace(before, after)
        assert original.count(before) == 1 and adapted.replace(after, before) == original
        destination = target / "skills/workshop-brief/SKILL.md"
        assert apply_entry(method, digest(original), destination, adapted) == "written"
        assert (destination.parent / after.decode()).resolve() == (target / "context/client.md").resolve()
        assert method.read_bytes() == original and destination.read_bytes() == adapted
        evidence["legacy_path"] = "one verified substitution; every other byte and metadata field unchanged"

        # Real filesystem collisions: no unsafe write, no changed source, no symlink following.
        changed = target / "MEMORY.md"
        changed.write_bytes(outputs["MEMORY.md"] + b"Later owner correction.\n")
        conflict_before = snapshot(target)
        assert apply_entry(old / "MEMORY.md", baseline["MEMORY.md"]["hash"], changed,
                           outputs["MEMORY.md"]) == "destination-conflict"
        external = fixture / "unrelated.md"
        external.write_bytes(b"Unrelated owner.\n")
        link = target / "linked.md"
        link.symlink_to(external)
        assert apply_entry(old / "MEMORY.md", baseline["MEMORY.md"]["hash"], link,
                           outputs["MEMORY.md"]) == "symlink-conflict"
        assert external.read_bytes() == b"Unrelated owner.\n"
        assert apply_entry(old / "MEMORY.md", digest(b"wrong source"), target / "new.md",
                           outputs["MEMORY.md"]) == "source-conflict"
        assert not (target / "new.md").exists()
        # Rollback checks the accepted after-image before restoring; later edit is retained.
        assert changed.read_bytes() != outputs["MEMORY.md"]
        assert snapshot(target)["MEMORY.md"] == conflict_before["MEMORY.md"]
        assert snapshot(old) == baseline
        evidence["conflicts"] = "changed destination, source hash and symlink rejected; newer owner edit retained at rollback"

        # Registration provenance: an unknown same-name body cannot be claimed by the package.
        custom = fixture / "custom/aios-spec-work"
        custom.mkdir(parents=True)
        (custom / "SKILL.md").write_text("# Custom spec method\nOwner: separate workshop.\n")
        globals_root = fixture / "global-skills"
        globals_root.mkdir()
        (globals_root / "aios-spec-work").symlink_to(custom, target_is_directory=True)
        registrations = snapshot(globals_root)
        candidates = [custom / "SKILL.md", ROOT / "skills/aios-spec-work/SKILL.md"]
        assert len({p.resolve() for p in candidates}) == 2
        assert candidates[0].read_bytes() != candidates[1].read_bytes()
        # No accepted identity/authority map exists for the custom registration.
        assert snapshot(globals_root) == registrations
        assert (custom / "SKILL.md").read_text().endswith("separate workshop.\n")
        evidence["unknown_registration"] = "distinct same-name origins observed; original body and registration retained, activation unresolved"
        evidence["source_unchanged"] = snapshot(old) == baseline

    output = ROOT / ".tmp/review-evidence/migration-rehearsal.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(evidence, indent=2) + "\n")
    print("PASS: synthetic identity map, exact bytes/modes, transformed path, backup/restore, zero-write replay and collision preservation")
    print("LIMIT: fixed author-selected map; no model routing, native registration mutation, live migration or native rollback")


if __name__ == "__main__":
    rehearse()
