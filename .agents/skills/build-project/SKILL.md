---
name: build-project
description: Implement and verify a scoped Project change whose intended behavior and boundaries are clear. Continue through relevant review; unresolved material contracts belong in spec-project.
---

# Project Build

Deliver the whole authorized result, with proof through its actual interface
or an appropriate validator. Use the accepted contract and working stack;
return to [Spec](../spec-project/SKILL.md) only for material unresolved scope,
ownership, trust or proof. A new technology decision uses
[choose-technology](../choose-technology/SKILL.md); unchanged technology does not.

Before implementation or added scope, run the local
[tracking SOP](../spec-project/references/tracking.md): reuse the requirements
list and carried goal authority, reopen affected done items and verify the
native call/readback or declared fallback. Keep the same worker and contract;
small mechanical edits need only their diff and affected check.

## Implement and verify

Choose evidence for the changed behavior and risk. Reproduce bugs when practical;
use deterministic regression tests where they protect behavior. For instruction,
configuration or workflow changes, a validator or scoped rehearsal may provide
better evidence than a unit test that repeats the implementation's wording.
Exercise real boundaries when mocks cannot prove them. Do not run unrelated
suites or require Red-Green-Refactor for every edit.

For a behavioral defect, reproduce the affected caller or user's behavior at
the nearest safe representative boundary before fixing it. If that behavior
cannot be reproduced, report the limitation and verify the strongest meaningful
regression after the fix. Do not delete, skip, weaken, or narrow a test merely
to obtain green; an accepted contract change records its rationale and provides
replacement coverage. A content, design, or data System uses proportionate
domain proof, not compulsory browser E2E, software tests, or lifecycle
scaffolding on every edit.

Implement complete results, check them, fix in-scope findings and repeat affected
checks. Continue through [Review](../review-project/SKILL.md); do not return after
the first implementation or successful test while requested work remains.
Independent lead acceptance remains required where the task contract says so.
Existing authority carries across phases; it does not authorize a new external
destination or action.

Update affected README, instructions, interfaces, runbooks and proof in the same
result. Verify changed routes and documented commands. Record actual evidence
and limitations without turning a source check into a runtime claim.

## Preserve meaningful boundaries

Adopt an existing repository in place. For a fresh repository, make its README
specific and use an official scaffold only if the resolved stack requires one.
An instruction package, System or runbook does not need invented runtime code.
Add a layer or dependency only for a responsibility the result actually needs.

Implement the Spec's proportional security contract. Public or local-only work
does not gain authentication by default. Protected operations enforce authority
per action and resource at a trusted boundary and fail closed when required
configuration is missing. Use maintained authentication/cryptographic primitives;
JWT checks are conditional on the selected contract. Keep secrets and private
data out of source, logs, client artifacts and exports.

For changed external or retried operations, bound input, resource use, retries
and cost; make side effects idempotent where required. Prove applicable permitted,
missing/invalid/expired/replayed and authenticated-but-forbidden cases, including
misconfiguration when it could bypass protection. Use supported stack checks;
do not invent a universal scanner.
Use relevant maintained checks already available and authorized. A scanner is
optional, not a mandatory tool for every edit. Keep security findings and
synthetic regression evidence in the repository; do not run active probes
without the Spec's authorized isolation and stop conditions.

For changes to operation or infrastructure, provide failure visibility and the
scoped disable, replay, rebuild or tested restore path required by the contract.
An unavailable required check is an evidence gap, not a PASS.

## Complete the scoped result

Return changed artifacts, relevant checks, documentation truth, remaining risks
and recovery evidence. Resolve authorized review findings before handback.
Complete only when the requested obligations pass, including authorized Ship
when requested; otherwise retain the same goal at the actual Review or authority
boundary. A review-only or local-only contract supplies no publication authority.
