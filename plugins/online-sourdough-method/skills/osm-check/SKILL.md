---
name: osm-check
description: Verify OSM installation, owner-data compatibility or method acceptance evidence. Use for requested OSM checks, not ordinary repository code review or context edits.
---

# Check

Inspect only the requested scope using the relevant section of
[checks](references/checks.md). Use [evals](../osm/references/evals.md) for a
setup or substantive lifecycle acceptance checkpoint, not every small fix.
During evaluation do not edit the subject. Return PASS, FAIL or NOT VERIFIED
per claim, with actual artifact,
checkpoint, observation and next safe action. Uncertainty is never PASS.

A manifest is not proof of activation, a registry is not proof of an installed
System, a URL is not a backup, and a successful push is not live equality.
If repair is already authorized, apply it through the responsible route:
[maintenance](../osm-maintain-context/SKILL.md) for owner context,
[onboarding](../osm-onboard/SKILL.md) for setup, or the repository's local Build.
Then evaluate the final bytes again. Otherwise report the proposed repair.
Preserve owner decisions, authority and existing work. Never treat inspection as permission to publish,
install, migrate or rewrite configuration.
