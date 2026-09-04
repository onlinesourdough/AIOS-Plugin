---
name: osm-check
description: Check OSM installation, owner-data compatibility, routes and lifecycle evidence. Use for setup verification, audits, broken context routes or final acceptance; evaluate without changing the subject and report unverified behavior honestly.
---

# Check

Inspect only the requested scope. Read [checks](references/checks.md) and the
relevant [eval](../osm/references/evals.md). During evaluation do not edit the
subject. Return PASS, FAIL or NOT VERIFIED per claim, with actual artifact,
checkpoint, observation and next safe action. Uncertainty is never PASS.

A manifest is not proof of activation, a registry is not proof of an installed
System, a URL is not a backup, and a successful push is not live equality.
Offer an in-scope repair through [maintenance](../osm-maintain-context/SKILL.md)
then rerun affected checks after the final mutation. Preserve owner decisions,
authority and existing work. Never treat inspection as permission to publish,
install, migrate or rewrite configuration.
