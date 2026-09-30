---
name: aios-orchestrate-workers
description: Prepare, launch, coordinate and recover user-requested workers while the caller retains acceptance and preserves the user's model choice.
metadata:
  version: "1.1.0"
---

# AIOS-orchestrate-workers

Enter for user-requested [delegation](../aios-start/references/lifecycle.md) with
retained caller coordination/acceptance, or recovery of an already authorized
worker. The human decides when to start a worker. Task size, a cheaper model or
potential parallel gain alone never authorizes launch. Explain a useful option
when relevant and continue local work while awaiting the decision. New tasks
alone do not select it:
whole-task/user-owned continuation uses the shared lifecycle's [handoff](../aios-start/references/continuation.md).

## Prepare the handoff

Receive the user's worker request, accepted scope and any explicitly chosen
model/effort. Use [Select Model](../aios-select-model/SKILL.md) only for requested
advice or a concrete choice gap; it is not a launch prerequisite. Define
separable scope, inputs, proof and handback.
Keep transfer/coordination/review/retry costs within the accepted rationale.

Carry what Spec/Review settled, remaining decisions, worker discretion and what
must return to the caller. Coupled design/content/implementation judgment usually
stays with the lead. Low remaining judgment alone is insufficient for delegation.
Use the smallest sufficient worker/subagent surface, with no first-class-worker
default. An independent reader need not move the writer; worker claims are not proof.

## Route

Inspect launch/resume controls, tools, permissions, workspace and status/linkage.
Use worktrees or other supported isolation when concurrent work requires it.
Skill/prompt/model is not execution proof. Resume matching session/root/goal;
slowness, clutter or a missing handle does not justify replacement. Missing
control requires handoff/stop, not a claimed launch.

Use [Select Model](../aios-select-model/SKILL.md) for requested advice or an
unsupported choice; never silently substitute a model or effort.
Preserve tool-required defaults and explicit choices; claim no unapplied switch.
Unavailable routes require handoff or sufficient authorized local continuation.

Codex create_thread requires an explicit NEW task request; delegation alone
never authorizes it. Omit model unless the user explicitly names one. Honor
supported requested effort; report unavailable choices. Without either, select
owner/root/context using tool defaults. Internal workers obey their native rules.

Launch grants no UI-task, Project/System, account, issue or publication authority.
Carry exact action/destination authority; exclude unauthorized effects from goals.

## Minimum useful context

Pass:

- accepted requirements/proof and judgment boundary; plan readback or fallback,
  lead-goal identity/objective/state and explicit authorization, including
  whether it covers a per-worker goal;
- relevant paths, local AGENTS/lifecycle/handoffs, repository identity and
  required physical initial cwd/Git root;
- route/suitability, allowed files/resources/actions/destinations, exclusions,
  stop/recovery, Review handback and one-writer constraint;
- no unrelated owner context/history.

Before mutation attest cwd/root, branch/repository, instructions, session,
route/tools/permissions. Run the [native tracking SOP](../aios-start/references/lifecycle.md)
in the worker's runtime; the lead's inventory proves no worker state. Return
plan call/readback or visible fallback and goal/linkage state. Preserve carried
authorization; obey native goal rules and hold work requiring missing activation.

Verify launch-bound workspace/Git root before writing. Prompt paths or later cd
do not correct inherited instructions; correct the launch. Stop on root, branch,
identity, instruction, permission, route, goal or authority mismatch, duplicate
writer or unapproved UI task. Replace only after explicit stop/proven failure;
replacement cannot bypass mismatch.

Repository workers follow shared Spec/Build/Review and local specialist contracts
and recovery, without personal preload. Preserve unrelated/untracked/ignored work,
prove final bytes and write no owner memory. Local contracts still govern.

## Evidence and recovery

If judgment exceeds the handoff/route, pause affected work and return the gap.
The caller reopens Spec or Select Model. Retain worker state and one writer;
Review PASS or Ship does not settle new decisions.

Return once: files/hashes, checks/scope, evidence gaps, goal/todo, recovery/stop,
next decision and Improvement signals: none or a sanitized concrete signal.
Do not manufacture signals; use [improvement triage](../aios-triage-improvement/SKILL.md)
for real ones.

At waiting-review keep session/goal active; do not poll. The lead independently
Reviews every handback. REVISE returns the same outcome to the same worker.
For interruption, drift, reconnect or uncertain effects, use
[recovery](../aios-start/references/recovery.md): prove identity, resume state/goals,
read back before retrying, replace only after explicit stop/proven failure.
Never create a second writer or implicit authority.

## Lead-controlled archive

Only the lead may archive after terminal worker, independent Review PASS and
authorized Ship/handoff. Waiting-review, REVISE, BLOCKED, approval-pending and
other actionable workers stay open. Supported controls must preserve history,
evidence, root and linkage. Archiving is not deletion; a CLI-only surface
cannot prove sidebar archival.
