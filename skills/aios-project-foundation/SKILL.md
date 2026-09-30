---
name: aios-project-foundation
description: Establish and maintain engineering foundations for new or existing projects.
metadata:
  version: "1.1.1"
---

# AIOS-project-foundation

Turn the accepted project into a reproducible, reviewable working environment.
Keep the project self-contained: its source, standards, design, infrastructure,
security and delivery evidence belong to the project.

## Establish the intended result

Start with the actual repository, local instructions and accepted decisions.
Keep existing work, data, licenses, remotes and useful documents. Repair a legacy
project in place; never run a template conversion or reinitialize its Git history.
Use [Create Project](../aios-create-project/SKILL.md) only for a genuinely new
repository. A requested read-only assessment uses the same criteria without
editing, provisioning or starting jobs.

Resolve material gaps in audience, ambition, current status, data sensitivity,
operating responsibility, budget and target environment from available evidence.
Use [Interview](../aios-interview/SKILL.md) for requested exploration or materially
unclear direction at the start, not to repeat known answers. A focused execution
question needs no new interview. Separate application hosting from agent/build
compute: a preview service and an isolated worker may need different resources.
Do not choose Kubernetes, cloud, a VPS or a long-lived dev branch by default.

Carry the result into the existing [Spec](../aios-spec-work/SKILL.md) and task
record. Select applicable obligations from the [foundation contract](references/foundation.md)
and [document contract](references/documents.md). Map each to its canonical
source, observed proof, repair or justified inapplicability. Missing files,
stale facts and missing executable behavior are distinct gaps. No new checklist
repository or mandatory FOUNDATION.md is needed.

## Establish and verify the foundations

Use [Build](../aios-build-work/SKILL.md) and [Write code](../aios-write-code/SKILL.md)
to make the authorized repairs. Keep one source of truth per project fact;
populate documents from accepted decisions, inspected code/configuration and
actual results. Explicitly separate current behavior, intended changes and
unknown rationale. The document contract also governs new template projects;
file presence and generator success never establish application readiness.

For an application, cover GitHub source, reproducible setup, meaningful tests,
secrets/data boundaries, architecture and applicable design, ownership,
infrastructure, delivery, operation and recovery. Establish the useful non-MD
files and service settings too. Read [CI and delivery](references/ci-delivery.md)
when changing branch policy, checks, automation or environments. Reconcile the
actual triggers, required checks and selected revision; prose cannot enable
GitHub protections or prove a deployment.

Use [Design](../aios-design/SKILL.md) and [Review Design](../aios-review-design/SKILL.md)
for material visual/interaction gaps, preserving an existing identity. Apply
the shared [security contract](../aios-start/references/security.md) to the actual
exposure and changes. A SECURITY.md page does not constitute a security audit.

Exercise clean setup, the real checks and relevant failure/recovery paths with
controlled data. When non-production delivery is part of the result, verify the
tested artifact in its actual preview/staging environment. Hosted build output
alone is insufficient for a runnable service. A document-only project instead
needs its applicable authoring, validation and delivery foundations.

## Review and hand back

[Review](../aios-review-work/SKILL.md) compares the working result with the
selected obligations, including a representative agent finding the right
instructions and checks. Reconcile documentation in the same change as the
behavior it describes. Fix in-scope findings and use authorized
[Ship](../aios-ship-work/SKILL.md), then read back the delivered state.

Return the usable entrypoints, source/environment and version-bound evidence,
changes made and remaining gaps. Distinguish a prepared repository, an exercised
non-production delivery path and a production-qualified application. Complete
the requested result only when its applicable proof exists; a specification,
template or green unrelated demo is an intermediate result.
