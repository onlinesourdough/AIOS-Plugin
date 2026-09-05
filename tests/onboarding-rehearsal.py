"""Synthetic onboarding, context adaptation and configuration after-image checks.

This is author evidence, not a migration engine or a simulated model evaluator.
Cold harness selection, real config writes and native capability tests are absent.
"""
from pathlib import Path
import hashlib
import json
import shutil
import subprocess
import tempfile
import tomllib

ROOT = Path(__file__).resolve().parents[1]
PLUGIN = ROOT / "plugins/aios"


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def inventory(root):
    return {str(p.relative_to(root)): digest(p) for p in sorted(root.rglob("*"))
            if p.is_file() and ".git" not in p.parts}


def rehearse():
    evidence = {}
    with tempfile.TemporaryDirectory(prefix="aios-onboarding-") as temporary:
        fixture = Path(temporary)
        owner = fixture / "Chosen Home"
        shutil.copytree(PLUGIN / "skills/aios-onboard/assets/owner", owner)
        subprocess.run(["git", "init", "-q", "-b", "main", str(owner)], check=True)
        assert subprocess.run(["git", "-C", str(owner), "rev-parse", "--verify", "HEAD"],
                              capture_output=True).returncode != 0
        assert (owner / "AIOS_FORMAT").read_bytes() == b"1\n"
        # The worker's chosen home-route read set, not a classifier implementation.
        home_reads = ["AIOS_FORMAT", "AIOS.md", "MEMORY.md"]
        for name in home_reads:
            (owner / name).read_text()
        bridge = (PLUGIN / "skills/aios-onboard/assets/bridge.md").read_text()
        prior = "Existing unrelated instruction.\n\n"
        after_bridge = prior + bridge.replace("AIOS_ABSOLUTE_PATH", str(owner.resolve()))
        assert after_bridge[:len(prior)] == prior
        assert after_bridge.count("<!-- AIOS:BEGIN -->") == 1
        evidence["git_backed_home"] = {"decision": "owner route", "reads": home_reads,
                                        "git": "unborn main; no commit or remote",
                                        "bridge_unrelated_content_preserved": True}

        for marker in ("2\n", "not-a-version\n", "0\n"):
            (owner / "AIOS_FORMAT").write_text(marker)
            before = inventory(owner)
            # Unsupported/malformed input was inspected; no mutation is chosen.
            observed = (owner / "AIOS_FORMAT").read_text()
            assert observed != "1\n"
            assert before == inventory(owner)
        evidence["invalid_formats"] = "2, malformed and 0: inspected, no owner writes"
        (owner / "AIOS_FORMAT").write_text("1\n")

        project = owner / "checkouts/project"
        project.mkdir(parents=True)
        (project / "AGENTS.md").write_text("Use local Spec, Build and Review for this project.\n")
        (project / "SPEC.md").write_text("Fix the export filename only.\n")
        subprocess.run(["git", "init", "-q", "-b", "main", str(project)], check=True)
        project_reads = ["AGENTS.md", "SPEC.md"]
        for name in project_reads:
            (project / name).read_text()
        evidence["independent_nested_project"] = {"decision": "local lifecycle",
                                                    "chosen_reads": project_reads,
                                                    "limit": "no cold model read trace"}

        source = fixture / "original-workshop-brief.md"
        source.write_text("---\nname: workshop-brief\ndescription: Draft a workshop brief.\n"
                          "metadata:\n  custom-owner-field: retain-me\n---\n"
                          "Read [context](../../../.aios/CONTEXT.md).\n"
                          "Use the installed `$osm` Review route before sending.\n"
                          "Sending still requires exact destination authority.\n")
        original_hash = digest(source)
        target_context = owner / "context/workshop.md"
        target_context.write_text("# Workshop\nUse the approved workshop facts.\n")
        target = owner / "skills/workshop-brief/SKILL.md"
        target.parent.mkdir(parents=True)
        original = source.read_text()
        substitutions = {
            "../../../.aios/CONTEXT.md": "../../context/workshop.md",
            "the installed `$osm` Review route": "the installed `$aios-review-work` skill",
        }
        adapted = original
        for old, new in substitutions.items():
            assert adapted.count(old) == 1
            adapted = adapted.replace(old, new)
        target.write_text(adapted)
        assert (target.parent / "../../context/workshop.md").resolve() == target_context.resolve()
        assert target_context.read_text().startswith("# Workshop")
        assert (PLUGIN / "skills/aios-review-work/SKILL.md").is_file()
        reversed_body = target.read_text()
        for old, new in substitutions.items():
            reversed_body = reversed_body.replace(new, old)
        assert reversed_body == original  # unknown fields and all other bytes
        assert digest(source) == original_hash
        accepted_hash = digest(target)
        before_replay = (inventory(owner), target.stat().st_mtime_ns)
        assert target.read_text() == adapted  # replay chooses no write
        assert before_replay == (inventory(owner), target.stat().st_mtime_ns)
        target.write_text(adapted + "\nA later owner note.\n")
        conflict_hash = digest(target)
        assert conflict_hash != accepted_hash
        assert digest(source) == original_hash and digest(target) == conflict_hash
        evidence["owner_method"] = {"original_hash": original_hash,
                                    "accepted_adapted_hash": accepted_hash,
                                    "later_edit_hash": conflict_hash,
                                    "only_changes": substitutions,
                                    "target_opened": True,
                                    "replay": "no write; inventory and mtime unchanged",
                                    "conflict": "source and later destination retained"}

        config = fixture / "config.toml"
        config.write_text('# Existing chosen baseline\napproval_policy = "on-request"\n'
                          'sandbox_mode = "workspace-write"\nmodel = "existing-choice"\n'
                          '[features]\nmemories = false\n[custom]\nkeep = "unchanged"\n')
        parsed_before = tomllib.loads(config.read_text())
        config_hash = digest(config)
        # No change was requested: preserve both supported and unknown values.
        assert digest(config) == config_hash
        assert tomllib.loads(config.read_text()) == parsed_before
        new_client = fixture / "new-client.toml"
        new_client.write_text('# No explicit unrestricted-access choice\n')
        assert tomllib.loads(new_client.read_text()) == {}
        pi = fixture / "settings.json"
        pi_before = ('{\n  "defaultProvider": "existing-provider",\n'
                     '  "defaultModel": "existing-model",\n'
                     '  "packages": ["/legacy/method", "unrelated-package"],\n'
                     '  "custom": {"keep": true}\n}\n')
        pi.write_text(pi_before)
        pi_after = pi_before.replace('"/legacy/method"', '"/chosen/Method"')
        pi.write_text(pi_after)
        assert pi.read_text().replace('"/chosen/Method"', '"/legacy/method"') == pi_before
        parsed = json.loads(pi.read_text())
        assert parsed["packages"] == ["/chosen/Method", "unrelated-package"]
        assert parsed["custom"] == {"keep": True}
        assert parsed["defaultModel"] == "existing-model"
        evidence["harness_baseline"] = {"codex": "unchanged, TOML parsed, unknown fields retained",
                                         "new_client": "no unrestricted keys added",
                                         "pi": "one selected legacy registration replaced; other spans unchanged",
                                         "native_extras": "unavailable/NOT VERIFIED; no opt-in or permission write"}

    evidence["subject"] = {str(p.relative_to(ROOT)): digest(p)
                            for p in sorted(PLUGIN.rglob("*")) if p.is_file()}
    output = ROOT / ".tmp/review-evidence/onboarding-rehearsal.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(evidence, indent=2) + "\n")
    print("PASS: synthetic after-images, resolved method target, preserved originals/unknown fields, replay/conflict, Git-home and config-baseline rehearsals")
    print("LIMIT: worker-selected decisions; no cold harness activation, native permission changes or actual owner migration")


if __name__ == "__main__":
    rehearse()
