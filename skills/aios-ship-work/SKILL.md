---
name: aios-ship-work
description: Deliver a reviewed result under existing action and destination authority, then verify readback.
metadata:
  version: "1.0.0"
---

# Ship work

Use the [tracking SOP](../aios/references/lifecycle.md) for pending delivery and
completion readback; carry the same requirements and goal authorization.

Identify the immutable subject, Review PASS, current goal/requirements,
destination, action, recovery path and measurement owner. Carry lead/worker
linkage only when delegated. A change after PASS returns to the same writer
and affected Review. For repository delivery, use local release/deployment
facts with this shared procedure; do not load personal context or another
local Ship skill. A local instruction or runbook supplies destination-specific
requirements, not a second generic phase.

PASS plus exact existing authorization enables Ship in the same task.
Capability alone is insufficient. Do not re-ask when standing/session authority
already covers this exact destination, action and scope. No authorization
comes from this file. Inspect recovery before the effect. For repository Git delivery use [Git release](references/git-release.md).
Owner-data Git alone uses [Sync](../aios-maintain-context/references/sync.md);
its personal-data allowlist does not govern independent product repositories.
Before any public or customer-facing effect, including a Git publication, run
[publish safety](references/publish-safety.md) last. Perform only the reviewed action,
read back the actual destination and compare it with the accepted artifact.
An uncertain result requires readback before any retry, never blind replay.

Keep three results distinct: delivery PASS/FAIL, recovery PASS/FAIL/NOT
APPLICABLE and outcome PASS/FAIL/PENDING with its measurement owner/window.
Final acceptance uses current critical-journey evidence, accounts for every
explicit requirement and reconciles delivered versus reviewed state. Repeat
checks when delivery changes the exercised boundary or relevant evidence is
stale; do not rerun an unchanged suite solely for a phase transition. Missing
required proof or Ship approval keeps the applicable goals open. Worker completion
requires accepted obligations; lead completion requires the
whole requested outcome and final evals. Do not treat a logical wait/block as a
native terminal state without actual control evidence. See
[recovery](../aios/references/recovery.md) on interruptions.

Before final handback, run the proportional
[completeness check](../aios-review-work/references/completeness.md) against the
actual delivered state and all accepted obligations.
