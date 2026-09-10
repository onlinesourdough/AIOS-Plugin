---
name: aios-orchestrate-workers
description: Select, prepare, launch or recover a worker for explicitly requested or concretely beneficial delegation. Use for new-task requests and existing-worker recovery; ordinary repository work stays in the current task.
---

# Orchestrate workers

Enter only after the [shared execution decision](../aios/references/lifecycle.md)
selects delegation, for an explicit new-task request even without model/effort,
or for recovery of an existing worker. Continue ordinary repository work in the
current task. A bounded assignment, specialist domain or substantial workload
alone does not justify a worker.

Before launch, name the separable result, its accepted inputs and proof, and the
concrete benefit after transfer, coordination, review and retry cost. Closely
coupled discovery or design iteration often belongs in the existing session.
Use the smallest available worker/subagent surface sufficient for the result;
there is no first-class-worker default. The caller owns final acceptance.
This procedure supplies no runtime or authority.

## Route

Inspect launch control: create/resume the selected worker or subagent, expose
tools/permissions and establish workspace. Skill/prompt/model is not proof;
missing control means handback/stop. Inspect status/output/linkage before
launch; resume the matching writer when session/root/goal match, never another
for missing handle, slowness or clutter. Use [recovery](../aios/references/recovery.md)
for interruption/uncertainty.

Distinguish internal orchestrated CLI/native workers from user-visible sidebar
tasks. Codex `create_thread` requires an explicit user request for a NEW task;
delegation need alone never authorizes it. For that tool omit model unless the
user explicitly names one. Respect explicitly requested model and effort where
supported; if unavailable, report the gap without silent substitution. A sidebar
request with neither still uses this procedure to select the owner, root and
prepare context, while respecting tool defaults. Internal workers may select
appropriate exposed model/effort routes. Harness invocation rules always win
over this skill and its dated defaults; never change model configuration.

Choose model/reasoning from exposed routes only where the tool permits selection;
compare task quality and total
context/reasoning/review/retry cost before speed. Pass only needed context; preserve the tool's configured defaults when no
explicit model choice is authorized. Stop on unavailable/unsuitable routes; never invent
savings/quotas/fallbacks or silently substitute. Dated defaults are not
universal.

No launch authorizes a UI task, Project/System, account action, issue,
publication or other external effect. The contract must state exact
action/authority; otherwise keep it out of the goal.

## Minimum useful context

Pass:

- accepted requirements/proof, current plan readback or fallback pointer,
  lead-goal identity/objective/state and carried explicit goal authorization,
  including whether it covers a per-worker goal;
- relevant paths, local AGENTS/lifecycle/handoffs, root/repository identity and
  required physical initial cwd/Git root;
- route/why sufficient, allowed files/resources/actions/destinations,
  exclusions/stop, recovery/Review handback and one-writer constraint;
- no unrelated owner context/history.

Before mutation attest cwd/root, branch/repository, local instructions, session
identity and exposed route/tools/permissions. Run the
[native tracking SOP](../aios/references/lifecycle.md) in the worker's actual
runtime before production; the lead's tool inventory does not prove the worker's.
Return its plan call/readback or visible fallback and actual goal/linkage state.
Do not reset carried goal authorization at a phase or handoff; obey native
creation rules and hold dependent work if required activation is missing.

For a newly launched repository writer, a prompt path alone is not root
attestation: verify its effective workspace and Git root before mutation.
If a launch-bound workspace is wrong, stop and correct the launch; a later
shell `cd` does not prove its inherited instructions were corrected. Stop on root, branch, identity,
instruction, permission, route, goal or authority mismatch, duplicate writer or
unapproved UI task; do not replace to work around mismatch/duplicate. Recovery
may replace after explicit stop/proven failure. An independent repository worker
uses shared Spec/Build/Review with local specialist contracts and recovery without personal preload, preserves
unrelated/untracked/ignored work, proves final bytes, writes no shared owner memory, and
is not overruled by orchestration.

## Evidence and recovery

Return once with files/hashes, checks/scope, evidence gaps, goal/todo,
recovery/stop, next decision, and either `Improvement signals: none` or a
sanitized concrete signal. Never manufacture; route concrete signals through
[improvement triage](../aios-triage-improvement/SKILL.md).

At waiting-review keep session/goal active; do not poll; lead independently
Reviews every handback. A wrong/incomplete result is `REVISE` to the same
worker/outcome. For interruption, drift, reconnect or uncertainty,
use recovery above: resume the same session/goals when identity is proved,
preserve state, read back before retrying, and replace only after explicit
stop/proven failure. Never make a second writer or implicit authority.

## Lead-controlled archive

Only the lead may archive after terminal worker, independent Review PASS and
authorized Ship/handoff. Waiting-review, `REVISE`, `BLOCKED`, approval-pending
and other actionable workers stay open. Use a supported control preserving
history/evidence/root/linkage; archiving is not deletion, and a CLI-only surface
cannot prove sidebar archival.

## Dated model working defaults — 2026-09-09

Owner-selected working defaults from operating preference and exposed routes,
not a universal ranking. Reuse while suitable/available; reconsider only for
stale/missing evidence, availability/prices, task outcomes or owner input.
No creative default: choose specialists by task fit.

Owner operating preference, 2026-09-09: use `gpt-6-astra` / `medium` as the
general default when task fit and the exposed route permit selection under the
harness rules above. For lighter or tightly bounded work, `gpt-6-astra` / `low`,
`gpt-6-astra` / `medium`, and `gpt-5.6-luna` / `max` are roughly equivalent
practical options; choose by task fit, availability and total
context/reasoning/review/retry cost. This is current owner preference, not a
benchmark or universal ranking.

When refreshing, separate official price/capability facts, dated [Artificial
Analysis](https://artificialanalysis.ai/), [DeepSWE](https://deepswe.datacurve.ai/)
and [LiveBench](https://livebench.ai/) benchmarks, and owner experience; align
model/effort/harness. No per-launch research or cache self-edit; this snapshot
is only in this skill, with no service/config/memory/cache edit.
