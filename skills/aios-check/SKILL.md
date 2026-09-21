---
name: aios-check
description: Verify an AIOS installation, owner format or relevant harness discovery without changing it.
metadata:
  version: "2.0.4"
---

# AIOS:check

Inspect only the requested scope using the relevant section of
[checks](references/checks.md). Use [setup scenarios](references/setup-scenarios.md) for the requested installation
boundary. Artifact quality and lifecycle gates belong to
[Review](../aios-review-work/SKILL.md) and its owning phases, not this audit.
During evaluation do not edit the subject. Return PASS, FAIL or NOT VERIFIED
per claim, with actual artifact,
checkpoint, observation and next safe action. Uncertainty is never PASS.

A manifest is not proof of activation, a source link is not proof of an installed
specialist, a URL is not a backup, and a successful push is not live equality.
If repair is already authorized, apply it through the responsible route:
[maintenance](../aios-maintain-context/SKILL.md) for owner context,
[setup](../aios-setup/SKILL.md) for readiness, or shared Build with the repository contract.
Then evaluate the final bytes again. Otherwise report the proposed repair.
Preserve owner decisions, authority and existing work. Never treat inspection as permission to publish,
install, migrate or rewrite configuration.
