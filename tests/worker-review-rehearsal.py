"""Deterministic source and acceptance-matrix checks for worker workflows.

This is author evidence for package topology, callers and documented examples.
It is not a consumer runtime, model suite, worker launcher, policy oracle or
issue client. The matrix records cases for independent lead interpretation.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLUGIN = ROOT / "plugins/aios"

FIXTURE_IDS = {
    "worker-route-choice", "worker-root-mismatch", "worker-no-signal",
    "delivery-only-rework", "worker-underlying-signal", "lead-underlying-signal",
    "correct-delivery-opportunity", "revise-with-signal",
    "duplicate-improvement-issue", "missing-improvement-authority",
    "worker-completion-archive", "worker-actionable-open",
    "goal-explicit-native-request", "goal-matching-unfinished", "goal-conflict",
    "goal-native-not-authorized", "goal-runtime-no-native", "goal-ready-no-ack",
    "goal-revise-same", "goal-pass-pending-ship", "goal-verified-completion",
    "goal-small-read-only",
    "parity-pending-setup-confirmation", "parity-read-only-duplicate-search",
    "parity-concrete-signal-disposition", "parity-design-content-handoff",
    "parity-incomplete-home-trigger", "parity-method-system-classification",
    "parity-worker-default-read-only",
}


def fixture_rows():
    return json.loads((ROOT / "tests/fixtures/requests.json").read_text())


def assert_fixture_inventory():
    found = {row["id"] for row in fixture_rows()}
    missing = FIXTURE_IDS - found
    assert not missing, f"missing worker/review fixtures: {sorted(missing)}"


def assert_archive_acceptance_matrix():
    rows = {row["id"]: row for row in fixture_rows()}
    completed = rows["worker-completion-archive"]["archive"]
    assert all(completed[key] for key in (
        "terminal", "independent_lead_acceptance", "authorized_handoff_complete",
        "lead_controlled", "preserves_history",
    ))
    assert completed["worker_self_archives"] is False

    actionable = rows["worker-actionable-open"]["archive"]
    assert actionable["terminal"] is False
    assert actionable["independent_lead_acceptance"] is False
    assert actionable["keep_open"] is True
    assert actionable["worker_self_archives"] is False


def assert_goal_acceptance_matrix():
    rows = {row["id"]: row for row in fixture_rows()}
    goals = {case_id: rows[case_id]["goal"] for case_id in FIXTURE_IDS
             if case_id.startswith("goal-")}
    required = {"representation", "explicit_request", "native_controls", "action"}
    assert all(required <= goal.keys() for goal in goals.values())

    assert goals["goal-explicit-native-request"]["action"] == "create-and-verify"
    assert goals["goal-matching-unfinished"]["action"] == "reuse"
    assert goals["goal-conflict"]["action"] == "reconcile"
    assert goals["goal-native-not-authorized"]["action"] == "hold"
    assert goals["goal-runtime-no-native"]["representation"] == "logical"

    ready = goals["goal-ready-no-ack"]
    assert ready["state"] == "READY" and ready["worker_acknowledged"] is False
    assert ready["mutation_allowed"] is False

    revise = goals["goal-revise-same"]
    assert revise["same_goal"] and revise["same_worker"]
    pending = goals["goal-pass-pending-ship"]
    assert pending["outcome_open"] and pending["terminal"] is False
    complete = goals["goal-verified-completion"]
    assert complete["outcome_complete"] and complete["terminal"]
    small = goals["goal-small-read-only"]
    assert small["small_or_read_only"] and small["lifecycle_required"] is False


def assert_parity_acceptance_matrix():
    rows = {row["id"]: row for row in fixture_rows()}
    parity = {case_id: rows[case_id]["parity"] for case_id in FIXTURE_IDS
              if case_id.startswith("parity-")}
    assert len(parity) == 7
    assert all({"area"} <= case.keys() for case in parity.values())

    setup = parity["parity-pending-setup-confirmation"]
    assert setup["confirmation_pending"] and not setup["full_acceptance"]
    assert setup["preserve_answers"]

    search = parity["parity-read-only-duplicate-search"]
    assert search["read_search_authorized"] and not search["write_authorized"]
    assert search["duplicate_search"] and not search["write_allowed"]

    signal = parity["parity-concrete-signal-disposition"]
    assert signal["concrete_signal"] and signal["triage_required"]

    handoff = parity["parity-design-content-handoff"]
    handoff_fields = {
        "design_contract", "design_editable_source", "design_reviewed_exports",
        "design_snapshot_metadata", "design_handoff", "content_workspace",
        "content_output", "content_review_proof", "content_publisher_handoff",
        "content_not_posted", "remaining_decisions", "adjacent_route_status",
        "stop_condition",
    }
    assert handoff_fields <= handoff.keys()
    assert all(handoff[field] for field in handoff_fields)

    onboarding = parity["parity-incomplete-home-trigger"]
    assert onboarding["new_or_incomplete_home"]
    assert not onboarding["competing_task"] and onboarding["trigger_onboarding"]
    assert not onboarding["create_second_home"] and not onboarding["infer_install_authority"]

    classification = parity["parity-method-system-classification"]
    assert classification["repeatable_method"]
    assert not classification["independent_operational_truth"]
    assert not classification["system_by_length_or_code"]
    assert not classification["system_by_schedule"]

    worker = parity["parity-worker-default-read-only"]
    assert worker["workers_default"] and not worker["read_only_status_alone"]
    assert worker["exception_requires_advantage"] and worker["initial_root_guard"]


def assert_package_and_caller_invariants():
    orchestration_path = PLUGIN / "skills/aios-orchestrate-workers/SKILL.md"
    review_path = PLUGIN / "skills/aios-review-work/SKILL.md"
    triage_path = PLUGIN / "skills/aios-triage-improvement/SKILL.md"
    orchestration = orchestration_path.read_text()
    review = review_path.read_text()
    triage = triage_path.read_text()

    assert orchestration.startswith("---\nname: aios-orchestrate-workers\n")
    assert triage.startswith("---\nname: aios-triage-improvement\n")
    assert "archive" in orchestration.lower()
    archive_concepts = {"terminal", "independent", "authorized", "actionable", "history"}
    words = set(re.findall(r"[a-z]+", orchestration.lower()))
    assert archive_concepts <= words

    for relative in (
        "skills/aios-build-work/SKILL.md",
        "skills/aios-create-project/SKILL.md",
        "skills/aios-create-system/SKILL.md",
        "skills/aios/references/routing.md",
    ):
        caller = (PLUGIN / relative).read_text()
        assert "aios-orchestrate-workers/SKILL.md" in caller, relative
    assert "aios-triage-improvement/SKILL.md" in review
    assert not (PLUGIN / "skills/aios-review-work/references/improvement.md").exists()
    assert triage_path.exists()


def main():
    assert_fixture_inventory()
    assert_archive_acceptance_matrix()
    assert_goal_acceptance_matrix()
    assert_parity_acceptance_matrix()
    assert_package_and_caller_invariants()
    output = ROOT / ".tmp/review-evidence/worker-review-rehearsal.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps({
        "acceptance_matrix": {
            "worker-completion-archive": "lead-controlled archive is eligible only after terminal completion, independent lead acceptance and authorized Ship/handoff",
            "worker-actionable-open": "waiting-review, REVISE, BLOCKED or approval-pending work remains open",
        },
        "source_invariants": [
            "native orchestration, review and triage contracts are linked",
            "worker/review fixture inventory is complete",
            "goal lifecycle fixture schema is complete",
            "parity revision fixture schema is complete",
            "prior improvement reference is removed",
        ],
    }, indent=2) + "\n")
    print("PASS: worker/review fixture inventory and native caller links are complete")
    print("PASS: acceptance matrix includes lead-controlled completion archive")
    print("PASS: acceptance matrix keeps actionable workers open")
    print("PASS: goal lifecycle acceptance matrix covers native, logical, wait and completion boundaries")
    print("PASS: parity acceptance matrix covers setup, triage, routing, onboarding and worker defaults")
    print("LIMIT: source and acceptance-matrix checks only; no independent model interpretation, worker launch, native runtime or external issue action")


if __name__ == "__main__":
    main()
