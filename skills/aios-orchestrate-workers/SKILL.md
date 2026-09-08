---
name: aios-orchestrate-workers
description: Plan, launch or recover one bounded AIOS worker with the right context, route, root, authority, proof and lead handback.
---

# Orchestrate workers

Load this native skill only when the lead actually plans, launches or recovers
a worker. Do not load it for a small lead task, an ordinary Review, or merely
because delegation might be useful. The lead remains accountable for the
accepted outcome and final decision; this skill supplies the worker boundary,
not a worker runtime or new authority.

Workers are the default for substantive bounded assignments. A subagent
exception requires a concrete task-specific advantage assessed by the lead,
such as capability, context, coordination, expected total cost/risk or
verification value; read-only status alone is not enough. The lead makes that
routine judgment without asking the user to manage it. Independent repository
mutations retain the first-class initial-root worker guard.

## Choose the worker route

Inspect the active harness's actual worker launch controls before deciding how
to proceed. Verify that the control can create or resume one first-class worker,
expose the needed tools and permissions, and establish the requested initial
workspace. A skill description, a path in a prompt, or a merely available model
does not prove that launch surface. If no suitable control is advertised and
usable, return a bounded handoff and stop the worker mutation.

Before a new launch, inspect the existing worker's status, latest output and
stable linkage. Discover the matching active writer and resume it when the
session, root and bounded goal still match; do not start another writer merely
because the handle is missing, the worker is slow or the sidebar is cluttered.
Use the recovery procedure for interruption or uncertain state.

Choose model and reasoning per assignment. Select the least costly sufficient
route after considering total context, reasoning, review and retry usage and
the task's risk; do not optimize one token count in isolation. Do not inherit
the lead's model, reasoning or whole history automatically. There is no fixed
model catalog: a smaller model with deeper reasoning can be sufficient for one
assignment, but is not a universal rule. Use only routes the harness actually
exposes, and stop if a proposed route is unavailable or unsuitable. Never
invent savings, quotas or fallback capability, or silently substitute an
unavailable route.

A worker launch does not implicitly authorize a UI task, Project, System,
account action, issue, publication or other external effect. The accepted
contract must name that action and its exact authority; otherwise keep it out
of the worker goal.

## Give one bounded worker its minimum useful context

The launch instruction must include, without copying the whole conversation:

- the concrete deliverable and the accepted outcome it serves;
- acceptance conditions, relevant checks and the expected evidence;
- the lead goal's actual identity/state, concise current todo and whether the
  accepted task explicitly requires this worker to activate a narrower native
  goal;
- links or exact paths to the relevant sources, local AGENTS/lifecycle and
  immutable handoffs, not unrelated owner context or history;
- the exact Project or System checkout root and repository identity, plus the
  requirement that the worker's physical initial cwd/Git root match it;
- exact authority: permitted files/resources, actions and destinations, with
  exclusions and the stop condition;
- the selected model/reasoning route and why it is sufficient for this
  assignment, based on observed launch controls; and
- the recovery path, lead Review handback and one-writer constraint.

Launch one first-class worker for one outcome. Before mutation, the worker
attests its physical cwd and workspace/Git root, branch and repository
identity, local instructions, stable session identity, selected route and
exposed tools/permissions. It inspects its actual native goal state. When the
accepted task explicitly requires a goal per worker, it reuses a compatible
unfinished goal or creates one narrower goal linked to the lead goal, with no
budget unless explicitly requested, then verifies its identity and active state.
Otherwise it acknowledges the linked lead goal's actual representation,
identity and state without manufacturing a worker goal. Linkage in a prompt is
not activation; unavailable required controls hold mutation.

A path supplied in the prompt or a later `cd` does not repair a wrongly launched
root. Stop on a root, branch, identity, instruction, permission, route, goal or
authority mismatch; on a duplicate active writer; or on a request to create an
unapproved UI task. Do not launch a second worker to work around a missing
handle or slow result.

The worker follows its local Spec, Build, Review and recovery procedures when
the target is an independent repository. It preserves unrelated and
untracked/ignored work, proves the authorized result on final bytes, and does
not write shared owner memory. The lead's orchestration choice never overrides
the repository's local lifecycle or safety boundary.

## Require an honest handback

The worker returns once with exact changed files/artifact hashes, checks and
their scope, remaining or unverified evidence, current lead/worker goal and todo
state, recovery/stop state and the next lead decision. It explicitly reports
either `Improvement signals:
none` or concrete, sanitized underlying improvement signals. Signals are
observations separate from deliverable defects; examples include a method,
tooling, routing or technical gap, repeated friction, avoidable usage or
manual work, or worthwhile reuse. Never force a worker to manufacture a signal.

Enter waiting-review with the worker session and any applicable worker goal
still active, and do not poll. The lead independently reviews the actual
delivery and affected workflow proportionately. A wrong or incomplete delivery
returns `REVISE` to this same worker and outcome; a concrete underlying signal
is handled separately by [improvement triage](../aios-triage-improvement/SKILL.md).

For interruption, drift, reconnect or an uncertain effect, use the canonical
[recovery procedure](../aios/references/recovery.md): resume the same worker,
session and bounded lead/worker goals when identity is proved, preserve state,
read back an uncertain destination before retrying, and replace only after an
explicit stop or proven failure. Do not turn recovery into a second writer or
an implicit authority request.

## Lead-controlled completion archive

Archiving is optional housekeeping, not acceptance. The worker never archives
itself and never archives an actionable session. Only the lead decides whether
to use a verified native archive control for this exact worker session, and only
after all three gates are complete: the worker is terminal, independent lead
Review accepts the exact result, and any required authorized Ship or handoff is
complete. Waiting-review, `REVISE`, `BLOCKED`, approval-pending and other
actionable workers remain open for recovery or the next lead decision.

Use only a supported native control that preserves the session's history,
evidence, repository/root and lead linkage; archiving is not deletion. A
CLI-only or otherwise unsupported surface cannot prove or perform sidebar
archival, so report that limitation briefly and leave the session state alone.

Before a model/tool route, discover usable models, reasoning efforts, tools, context and routes.
If decision evidence is missing or stale, compare relevant options on task quality and total context/tool/review/retry cost; speed is secondary.
Separate official prices/capabilities, dated comparable [Artificial Analysis](https://artificialanalysis.ai/), [DeepSWE](https://deepswe.datacurve.ai/), and [LiveBench](https://livebench.ai/) benchmarks by model/effort/harness, and owner/task experience.
Record a compact dated task-local rationale for lead/worker/creative specialist; refresh on availability, price/result changes, not every launch.
Never create a universal ranking or self-modifying installed skill.
