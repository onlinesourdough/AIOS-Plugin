---
name: aios-maintain-context
description: Curate AIOS owner context, maintain personal skills and their runtime discovery, or reconcile configured owner Git sync. Use when a conversation creates, imports, edits, renames or removes a personal skill; independent repository skills stay local.
---

# Maintain context

Read the established AIOS.md, relevant source, and [curation](references/curation.md).
Before any owner-data mutation, check AIOS_FORMAT at the configured home using
[data compatibility](../aios-onboard/references/data.md). Unsupported/malformed
formats stay read-only; a missing marker requires explicit setup/migration.
Before a durable change to Git-backed owner data, read [sync](references/sync.md).
For format changes or legacy import use [data compatibility](../aios-onboard/references/data.md).

When an ordinary conversation creates, imports, edits, renames or removes a
personal skill, or setup needs its registration, use the canonical
[personal skill lifecycle](references/owner-skills.md). It owns placement,
discovery, collision handling and acceptance; use the available native Skill
Creator for authoring, not a new AIOS creator skill.

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
