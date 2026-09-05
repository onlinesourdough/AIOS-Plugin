---
name: osm-maintain-context
description: Curate durable OSM owner facts and routes, or reconcile configured owner-data sync. Use for requested context upkeep; repository edits and initial setup have their own routes.
---

# Maintain context

Read the established OSM.md, relevant source, and [curation](references/curation.md).
Before any owner-data mutation, check OSM_FORMAT at the configured home using
[data compatibility](../osm-onboard/references/data.md). Unsupported/malformed
formats stay read-only; a missing marker requires explicit setup/migration.
Before a durable change to Git-backed owner data, read [sync](references/sync.md).
For format changes or legacy import use [data compatibility](../osm-onboard/references/data.md).

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
