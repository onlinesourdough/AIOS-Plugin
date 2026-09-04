# One outcome through delivery

Use this for substantive work; retain a short session record, not a compulsory
central ledger. A goal states outcome, affected scope, observable proof,
boundaries and stop condition. Inspect existing state first. Reuse the matching
nonterminal goal; reconcile a conflicting goal rather than replacing it.
Native goal controls are optional and subject to their own invocation rules.
The same natural-language contract is sufficient. Never require /goal, invent
a token budget, create phase goals or complete at the Build boundary.

## Spec

Accept rough idea, developed brief, near-complete specification or an existing
change request. Preserve named sources and resolved wording. Construct missing
technical detail in the natural owner; do not rewrite a developed source into
another form. Audit intent, served party, proof/measurement owner, result and
non-goals, canonical sources, execution owner, authority/risk, interfaces,
operation/recovery and unknowns. Classify each resolved, inferred, missing or
conflicting with evidence. Resolve facts before asking one material owner
question. Reversible bounded technical inferences may proceed; never infer
external authority, product direction or acceptance.

Return exactly READY, REVISE or BLOCKED. READY contains a compact Build
contract: outcome; proof and measurement owner; relevant context pointers;
exact repository/worker root; scope/non-goals; authority and risk; dependencies
and immutable handoffs; expected evidence; operation/recovery and Ship scope;
launch contract; one bounded worker goal. Other gates name only the minimal
patch or material blocker. An existing Project uses its local full Spec,
Build, Review and Ship; upstream decisions are accepted input, not a second
interview. Run [readiness eval](evals.md) before Build.

## Build and worker boundary

Keep small owner tasks in the lead. Independent repository mutations initiated
from owner-level work require one first-class worker whose actual initial
workspace is that exact repository root, not a subagent with a path in a prompt.
Inspect status/latest output before launch; never duplicate a matching active
writer. Use the active harness's verified launch surface. Optional orchestration
skills may guide method, but cannot provide runtime capability. If no safe
surface exists, return a handoff and BLOCKED for that mutation.

Launch with accepted relevant inputs only, one bounded goal linked to the lead
outcome, contract revision, exact root/checkout, authority, chosen route and
proof. Before mutation attest physical cwd/workspace and Git root, branch,
repository identity, local instructions, stable native session identity,
actual route and exposed tools/permissions. A path in a prompt or merely cd-ing
a wrongly launched task is not enough. Stop on mismatch or substitution.
Use configured capable defaults. A concrete need may justify at most one
advertised and successfully launchable override; never encode model catalogs,
fixed reasoning or hidden chaining. Respect user harness restrictions.

The worker owns local Spec, implementation, tests and local Review. Preserve
unrelated changes. Verify the whole authorized result and update its local
truth. Hand off exact changed files, artifact/content hashes, checks and their
scope, missing evidence, recovery and `Improvement signals: none` or concrete
sanitized observations. Enter waiting-review; send once, return, do not poll.

## Independent lead Review

Local worker review does not replace the lead's independent acceptance.
The lead reconstructs intent and inspects actual artifacts and latest proof,
including success, denial, duplicates, failure/recovery and source ownership.
Review does not mutate its subject. Return PASS, REVISE or BLOCKED. REVISE
resumes the same worker/goal with a new contract revision; BLOCKED preserves
state. Record [triage](triage.md) disposition independently of the work gate.

Bind PASS to exact artifact hashes (or commit/tree), proof and reviewed contract
revision. Any later relevant mutation invalidates affected evidence and PASS.
The same worker reruns impacted tests/evals on final bytes, then the lead
reconciles requirements against those bytes. Test output from before a change
cannot accept the changed result. If only an evidence record changes, hash the
subject separately to avoid claiming self-referential proof.

## Ship and reconciliation

PASS plus exact existing authorization enables Ship in the same worker.
Capability alone is insufficient. Do not re-ask when standing/session authority
already covers this exact destination, action and scope. No authorization
comes from this file. Inspect recovery before the effect. For Git use
[sync](../../osm-maintain-context/references/sync.md) and local repository gates.
For other effects run publish safety last, perform only the reviewed action,
read back the actual destination and compare it with the accepted artifact.
An uncertain result requires readback before any retry, never blind replay.

Keep three results distinct: delivery PASS/FAIL, recovery PASS/FAIL/NOT
APPLICABLE and outcome PASS/FAIL/PENDING with its measurement owner/window.
Final acceptance replays critical journeys after the last relevant mutation,
accounts for every explicit requirement and reconciles delivered versus
reviewed state. Missing required proof keeps the outcome open. Worker completion
requires accepted obligations; lead completion requires the whole requested
outcome and final evals. See [recovery](recovery.md) on interruptions.
