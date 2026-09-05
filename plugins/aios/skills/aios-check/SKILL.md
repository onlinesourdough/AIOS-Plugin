---
name: aios-check
description: Verify AIOS installation, owner format, discovery and relevant harness setup evidence. Artifact quality uses Review; context edits use maintenance.
---

# Check

Inspect only the requested scope using the relevant section of
[checks](references/checks.md). Use [setup scenarios](references/scenarios.md) for the requested installation
boundary. Artifact quality and lifecycle gates belong to
[Review](../aios-review-work/SKILL.md) and its owning phases, not this audit.
During evaluation do not edit the subject. Return PASS, FAIL or NOT VERIFIED
per claim, with actual artifact,
checkpoint, observation and next safe action. Uncertainty is never PASS.

A manifest is not proof of activation, a registry is not proof of an installed
System, a URL is not a backup, and a successful push is not live equality.
If repair is already authorized, apply it through the responsible route:
[maintenance](../aios-maintain-context/SKILL.md) for owner context,
[onboarding](../aios-onboard/SKILL.md) for setup, or the repository's local Build.
Then evaluate the final bytes again. Otherwise report the proposed repair.
Preserve owner decisions, authority and existing work. Never treat inspection as permission to publish,
install, migrate or rewrite configuration.
