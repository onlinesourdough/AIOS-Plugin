# Selective durable context

Before a write, verify supported AIOS_FORMAT at the configured owner root using
[data compatibility](../../aios-onboard/references/data.md). Unsupported or
malformed data remains read-only; missing format requires explicit migration.

Use AIOS.md as the single short entry: focus snapshot plus explicit routes to
context, MEMORY, CONNECTIONS and registries. Aim for at most 100 lines/6 KB;
AIOS.md plus MEMORY should stay below 12 KB. These are retrieval budgets, not
reasons to delete useful owner data. Move conditional detail sideways with
scope, Use when and source, maintaining a resolving route. Read only relevant
routes; do not recursively preload context/ or entire repositories.

Keep facts in one canonical source. MEMORY records only sourced durable
corrections/preferences or environment facts likely to matter across future
tasks. Retain date/source/scope and replace superseded facts deliberately.
Keep one harness-scope preference if needed; no model/effort inventory.
CONNECTIONS stores nonsecret account purpose, available access path, tested
capability, exact action/destination authority, verification date and status.
A credential or available tool is not approval. Do not promote inferred context
to owner truth. When facts conflict, identify the source owner and preserve both.

Use registry pointers for independent System/Project truth. Never mirror their
plans, checklists, operational histories or editable source into AIOS. A worker
returns a proposed shared correction with provenance; the lead decides whether
it belongs here. Serialise shared writes through one owner-data writer and
check original bytes before replacing. Concurrent changes cause a conflict,
not last-writer-wins. In Git mode run [sync](sync.md) at the task boundary.

Learn a method only when inputs, steps, proof and repeat value are clear and
reuse reduces ambiguity. Put an owner-specific shared method under AIOS_ROOT/skills,
a repository method locally, and an optional external Global Skill with its
external product. Never embed facts, credentials, outputs or history in method
text. If reuse is uncertain, suggest at most one candidate. Preserve every
nonreserved legacy owner skill during migration. Report changes and rationale.
Native memory and history can suggest retrieval; canonical corrections still
need sourced deliberate writes. No automatic transcript harvesting.
