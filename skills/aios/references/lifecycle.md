# Track one outcome through delivery

Use before substantive multi-step work or implementation, on scope change and
at handoff/completion. Small one-step answers skip planning. Input: accepted
requirements, proof, scope/action authority, current phase and lead/worker
linkage. Keep one contract and one live requirements list; contract/evidence
pointers may persist separately. The lead's default model remains the user's configured choice.

## Shared method and execution

Before costly production, select the useful result this conversation will deliver,
its proof, who continues and when this task's part is done. Reuse the current
contract; no extra artifact or gate for a small answer. Consider a direct answer,
a usable Spec/handoff or completed production from the user's intent, relevant
context, tools, quality, effort and responsibility. Honor explicit execution or
preparation requests. A cheaper route cannot silently narrow the accepted outcome.

Select continuation here, delegated with retained acceptance, or transferred.
Spec clarifies it as requirements settle. Inspect enough sources/guidance to make preparation
usable before choosing costly research, analysis or content production. Domain,
task size or phase alone selects no destination. Resolve only a material remaining
choice; otherwise continue under existing authority.

[Select Model](../../aios-select-model/SKILL.md) supplies model/reasoning suitability
for that work. Its capability/cost evidence may reopen this decision; it does not
define the deliverable or take over responsibility for continuation. Keep source
ownership distinct from the app, harness or session doing the work.

Spec, Build, Review and Ship are shared AIOS plugin skills. The repository's
AGENTS, specialist skills, requirements, checks and recovery records supply
local truth. Resolve shared skills through the current harness; do not copy,
wrap, rename, symlink or vendor them into each System or Project. Plugin
discovery is independent of filesystem ancestry and supplies no runtime
dependency, personal context or additional authority. Read only the active
phase and conditional references needed for the change, once per revision.

Continue in the current task by default, including substantive repository work,
design exploration and closely coupled changes. A task opened directly in a
System or Project is already its execution owner and needs no lead, launch
contract or handback to begin. A current task may work across authorized roots
sequentially after reading each root's local instructions and verifying identity.
Use isolation where concurrent work warrants it; retain one writer per overlapping
change. Do not confuse the canonical owner with the choice of session.

Delegate only when a separable result has clear inputs, allowed scope and proof,
and the expected gain in capability, independent evidence, context isolation or
useful parallel progress outweighs launch, context transfer, coordination,
review and retry cost. Task size, another repository or a bounded edit alone
does not establish that gain. Preserve a healthy context-rich session when
transfer would mostly repeat discovery. No universal token or performance
advantage is claimed for either execution mode.

Delegation with retained caller coordination/acceptance selects
[Orchestrate workers](../../aios-orchestrate-workers/SKILL.md).
[User-owned continuation and whole-task handoff](continuation.md) belong to this
shared lifecycle. Load that procedure only for a selected/requested handoff;
it owns the usable prompt, receiving context and supported transfer. A new-task
request alone does not select orchestration; native authorization rules still apply.
Otherwise stay here and do not load orchestration. Prefer a scoped review pass in the same
task unless a distinct reviewer is requested or materially improves confidence;
consequential output may require independent evidence. Review remains a separate
inspection of the final subject, even when the same session performs it.

## Native tracking SOP

1. Inspect the current callable tool inventory once at task start; recheck only
   after a runtime/capability change. Find a native plan/task-list control by its
   actual description. `update_plan` is an example, not assumed availability;
   native planning does not require Plan mode.
2. If available, invoke that tool to create/reuse a concise list covering the
   accepted requirements, statuses and pending Review/approval/Ship. Inspect its
   returned result and any exposed state/readback. Success proves the call, not
   visible UI; UI needs direct observation. An empty response does not prove
   stored state. Report those evidence limits. Do not maintain a duplicate live
   file list while native tracking is available.
3. If unavailable, visibly state that limitation and show one existing narrow
   file fallback (for example `docs/todo.md`), creating it only if none exists.
   If a callable tool fails, report the error and unverified state; a failed call
   is not proof of native UI or permission to silently switch to files. If it
   becomes unavailable, declare the fallback; if restored, reconcile the same
   requirements into it and retire the file as a live list. Routine work never
   silently changes global config to obtain a tool; an authorized Codex setup/
   repair may use [configuration guidance](../../aios-onboard/references/harness-codex.md#native-task-list-exposure).
4. Whenever a listed step starts, invoke the plan tool with `in_progress`;
   whenever it completes with passing evidence, invoke it with `completed`.
   Leave unstarted/reopened steps `pending` where those statuses are supported;
   otherwise use the tool's actual equivalents and concurrency limits. Give a
   brief completed/total progress update (for example 2/5) at each boundary.
   With a declared fallback, update that same file instead.
5. Before acting on added scope, update the same list with all still-active
   requirements and additions; reopen affected done items and invalidate their
   old proof. Preserve explicit removals, current authority and goal linkage.
6. At handoff, update evidence/statuses and keep any required caller Review, approval
   and delivery unresolved. Before completion map every accepted requirement to
   current evidence or an explicit unresolved status. Worker completion alone
   cannot complete the parent outcome. Return the observed native state or the
   fallback path, evidence gaps and next action; never fabricate UI state.

## Native goals are separate

Inspect actual goal state and invocation rules when controls exist. Reuse a
compatible unfinished goal and carry its identity, objective and explicit user
request through scope changes, worker handoffs and continuation. A phase change
is not a new request boundary: do not erase earlier authority as “no new request”.
If activation requires an explicit request and none exists, do not create a goal.
No goal request does not disable native planning. A skill or lead preference
cannot supply user/system/developer consent required by the actual goal tool.

When explicitly requested for this work and supported, invoke creation/reuse
under those rules and verify returned identity/objective/state; no new goal per
phase or budget unless requested. A worker carries the lead's goal/objective and
authorization, inspects its own state, and creates a narrower goal only when the
accepted request authorizes that worker goal under native rules. Otherwise
acknowledge linkage, not activation. Missing required activation holds dependent
work; report unavailable controls or errors honestly and do not silently substitute a note.
If the runtime genuinely has no native goal controls, label the contract as
non-native; it does not provide native cross-turn continuation.

## Phase use and conditional recovery

[Spec](../../aios-spec-work/SKILL.md) runs the SOP before READY;
[Build](../../aios-build-work/SKILL.md) updates it before implementation or scope
changes; [Review](../../aios-review-work/SKILL.md) checks requirement-to-evidence
coverage; authorized [Ship](../../aios-ship-work/SKILL.md) retains pending delivery
until readback. Keep the same task or selected worker, root, contract and applicable goals through
waiting-review and revisions. Completion requires all accepted obligations and
any required independent acceptance; logical waits are not native terminal states.

[Routing](routing.md) selects the owner/workflow before production.
[Orchestration](../../aios-orchestrate-workers/SKILL.md) carries the tracking
state, request authority and bounded worker requirements without widening action
or sidebar authority. Independent repositories use this same tracking SOP with local evidence pointers.

Only for interruption or goal-state mismatch, use [recovery](recovery.md#native-state-deadlock).
Its fallback applies only to an
already verified goal state; it does not waive initial activation. Preserve
healthy sessions, one writer, pending approvals and exact action authority.
