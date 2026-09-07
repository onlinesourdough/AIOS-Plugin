---
name: aios-maintain-context
description: Curate AIOS owner facts, memory, routes, registries and connections, or reconcile configured owner Git sync. Personal and installed skill lifecycles use Manage Skills.
---

# Maintain context

Read the established AIOS.md, relevant source, and [curation](references/curation.md).
Before any owner-data mutation, check AIOS_FORMAT at the configured home using
[data compatibility](../aios-onboard/references/data-format.md). Unsupported/malformed
formats stay read-only; a missing marker requires explicit setup/migration.
Before a durable change to Git-backed owner data, read [sync](references/sync.md).
For an actual legacy import use the separate [migration procedure](../aios-onboard/references/data.md).

When an ordinary conversation creates, imports, edits, renames or removes a
personal skill, setup needs its registration, or another capability change is
proposed, route the whole lifecycle through [Manage Skills](../aios-manage-skills/SKILL.md).
It owns placement, discovery, collisions, acceptance and authorized capability
actions. This route retains owner facts and configured Git sync only; do not
duplicate or resume skill management here.

Keep shared facts in routed context, durable corrections in MEMORY.md, access
and recorded authority in CONNECTIONS.md, and canonical repository pointers in
registries. Never store credentials, model choices, raw transcripts or complete
repository plans here. Native memory/history may aid retrieval but cannot
replace these sources.

Repository workers propose learning to the lead. One owner-data writer checks
the exact source bytes immediately before patching; a conflict preserves both
versions and stops that write. Do not silently invent or merge owner meaning.

Repair local reversible authority-neutral errors when the correct result is
unambiguous. Return changed facts with provenance, checks, intentional gaps,
and Healthy, Repaired or Needs decision. A check alone does not authorize cleanup.
