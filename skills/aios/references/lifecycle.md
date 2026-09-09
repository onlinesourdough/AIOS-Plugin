# Track one outcome through delivery

Use before substantive multi-step work or implementation, on scope change and
at handoff/completion. Small one-step answers skip planning. Input: accepted
requirements, proof, scope/action authority, current phase and lead/worker
linkage. Keep one contract and one live requirements list; contract/evidence
pointers may persist separately. The lead's default model remains the user's configured choice.

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
6. At handoff, update evidence/statuses and keep pending lead Review, approval
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
until readback. Keep the same worker, root, contract and applicable goals through
waiting-review and revisions. Completion requires all accepted obligations and
lead acceptance; logical waits are not native terminal states.

[Routing](routing.md) selects the owner/workflow before production.
[Orchestration](../../aios-orchestrate-workers/SKILL.md) carries the tracking
state, request authority and bounded worker requirements without widening action
or sidebar authority. Independent repositories use their local tracking SOP.

Only for interruption or goal-state mismatch, use [recovery](recovery.md#native-state-deadlock).
Its fallback applies only to an
already verified goal state; it does not waive initial activation. Preserve
healthy sessions, one writer, pending approvals and exact action authority.
