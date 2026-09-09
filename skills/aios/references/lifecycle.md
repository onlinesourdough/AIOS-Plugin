# One outcome through delivery

Use this for substantive work; retain one concrete persistent outcome contract,
not a goal per phase or a compulsory ritual for small work. Small answers,
read-only inspection and scoped mechanical edits remain proportional. The
contract carries stable identity and worker linkage, outcome and scope,
non-goals, accepted success proof, authority, current state, latest evidence or
blocker, and the next legal transition.

Keep the owner-facing control simple: one lead goal plus one concise mutable
todo list with statuses. When Codex exposes its native task list/To dos control,
use and update it; use an equivalent native plan/todo control in another
harness when it is exposed. Otherwise keep one visible durable checklist under
the same goal, disclose that the native list is unavailable, and do not
fabricate UI state. Goal metadata does not explain a missing plan control.
Detailed evidence and authority can remain in the internal contract or owning
repository rather than becoming a document the owner must maintain.
The lead's default model remains the user's configured choice.

## Establish or reuse the outcome

Inspect actual goal state and its representation before creation or reuse. Reuse
a compatible unfinished goal; preserve and reconcile a conflicting one. Never
silently replace, duplicate or complete a goal, infer a budget from effort, or
create a separate phase goal. A prose/session checkpoint and native goal state
are distinct evidence types.

When the harness exposes native goal controls and the current task explicitly
requests native persistence, create or reuse the one matching lead goal, then
verify the returned identity, representation and state. A skill cannot make
native activation discretionary after that request, and a prompt cannot prove
that activation occurred. If activation requires an explicit request and none
exists, make the gap visible at the first substantive lifecycle boundary; do
not silently substitute a note or manufacture consent. If the runtime genuinely
has no native goal controls, use a durable logical checkpoint and state that it
does not provide native cross-turn continuation. Do not install helpers,
require a slash command or fabricate pause, resume, objective-update, planning
or terminal capabilities.

When the user adds obligations to the same unfinished outcome, update that one
todo and reconcile the internal contract before further mutation. Preserve every
still-active earlier obligation, identify additions and any explicitly replaced
wording, and recheck scope, non-goals, authority, proof, owner/root and next
action. Keep the same native goal identity. If its actual controls cannot update
the objective or todo, do not fabricate that behavior: the concise durable
status checklist and internal contract revision carry the expanded scope. A
materially different or conflicting outcome requires reconciliation rather than
silent expansion or replacement. Added scope never grants added authority.

## Carry the same goal through the lifecycle

[Spec](../../aios-spec-work/SKILL.md) establishes or refines the same contract.
READY must include evidence of the lead goal representation, stable identity,
current state, current todo, accepted contract revision and exact next action.
When the accepted task explicitly requires a native goal per real worker, that
worker inspects its own actual goal state after root and authority attestation,
reuses a compatible unfinished worker goal or creates one narrower goal linked
to the lead goal, without a budget unless one was explicitly requested. It then
verifies the returned representation, identity and state. Without that explicit
requirement it acknowledges the linked lead goal rather than creating another.
If required worker goal controls are unavailable, hold mutation and report the
limitation rather than claiming linkage is activation. The later
[native-state deadlock](#native-state-deadlock) fallback applies only to an
already verified goal state; it never supplies missing initial activation.

Build, waiting-review, `REVISE`, approval wait, recovery and authorized Ship
keep the same lead and worker goals, worker and todo; each real boundary records
current evidence and next action. Review checks those facts, not just a prompt
that says “goal”. A worker goal remains active at initial Build, local self-review
and waiting-review. It reaches terminal completion only after exact lead
acceptance and all required authorized Ship or handoff obligations; never create
a new phase or Ship goal.

READY to Build holds mutation when required lead/worker native activation or
the applicable linked-goal acknowledgement is missing. Do not infer any of them
from a launch, prompt or phase label. Existing compatible goals are reused;
terminal and invocation semantics remain those of the actual harness. This hold
does not conflict with the later native-state-deadlock fallback for an already
verified blocked/terminal goal under its standing owner policy.

Lead PASS permits completion only when no requested obligation remains. Required
authorized Ship continues in the same goal. Lead completion requires the full
accepted outcome and final evidence; pending approval or evidence keeps it open.
Logical wait/block states are not automatically native terminal states: obey the
actual control semantics and any minimum recurrence rule. Lead-controlled
archive remains optional housekeeping after true completion, exact lead
acceptance and required authorized delivery, never during an actionable wait.

## Native-state deadlock

Blocked or terminal native-goal metadata alone is not proof that a linked
worker/session failed when its contract remains unfinished and it is otherwise
healthy. Under the standing owner fallback policy, if actual native resumption
is unavailable, retain and report the native goal's real identity and state and
continue the same truthful logical contract, session, worker and concise todo.
This is a logical continuation, not a claim that the native goal was reactivated,
and it needs no recurring owner permission for that metadata-only condition.

Do not hunt for a different worker session, delete a worker goal, or create,
replace or duplicate a native goal, worker or session merely to escape that
mismatch. The fallback does not add mutation, Ship or external-effect authority:
an unresolved external, user-action or security blocker still stops the next
action. If the accepted outcome explicitly requires native-only continuation and
has no standing fallback, ask one narrow clarification rather than inventing a
replacement.

## Public lifecycle routes

The installed skills are the canonical phase procedures:
[Spec](../../aios-spec-work/SKILL.md), [Build](../../aios-build-work/SKILL.md),
[Review](../../aios-review-work/SKILL.md) and [Ship](../../aios-ship-work/SKILL.md).
Use the phase that the existing outcome actually needs; do not restart completed
work because a skill was selected by name. Repository-local methods own their
technical lifecycle. AIOS keeps accepted intent, cross-owner coordination and
lead acceptance.

[Recovery](recovery.md) preserves the same worker and bounded outcome after an
interruption. [Readiness](../../aios-spec-work/references/readiness.md),
[completeness](../../aios-review-work/references/completeness.md) and
[publish safety](../../aios-ship-work/references/publish-safety.md) have separate
observable checkpoints. They do not create additional lifecycle goals.
Before substantive production, [routing](routing.md) resolves owner, workflow
and worker need. When delegation is required, a new sidebar task is explicitly
requested, or a worker needs recovery, the native
[orchestration procedure](../../aios-orchestrate-workers/SKILL.md) owns its
prompt, route, root, one-writer, proof and handback boundary.
