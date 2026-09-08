# Adopt AIOS from an existing installation

Use this only for a requested adoption, rename or migration. New clients use
[setup](setup.md) directly. Current AIOS homes resume without migration. A new
package version never moves a folder, changes a saved Project or grants access.
The product maintainer supplies instructions; the authorized owner-data lead
owns any physical move and native cutover.

## Establish source identity before changing anything

Inspect configured bridges and the actual source and target roots. Classify:

| Observed source | Migration meaning |
| --- | --- |
| AIOS.md and supported AIOS_FORMAT at the configured root | Current owner format; resume or an explicitly requested physical move |
| OSM.md and OSM_FORMAT from released OSM 0.1.x | Earlier package identity; preserve format-1 facts and map only proved names/paths |
| Legacy `.aios/CONTEXT.md`, `.aios/MEMORY.md` and registries | Template-era owner layout; inspect the complete relevant map before assigning a format |
| A skill named `aios` or `aios-*` without proved provenance | Unknown ownership or a custom method; preserve it and resolve collision before activation |
| Both old and new homes, markers or registrations | Compare identities and accepted evidence; do not select or overwrite by name or timestamp |

Read a marker as data. Unsupported or malformed formats stay read-only; absence
is not an empty home or format 1. A legacy repository, `AIOS_VERSION`, canonical
source, immutable revision and file hashes may together establish origin; a
prefix alone cannot. A folder merely named AIOS is not enough either.

Inventory files, modes, symlinks, source hashes and relevant discovery entries
before planning writes. Include untracked/ignored work and nested repositories
without reading credential contents into evidence. Inventory nested checkout
recovery separately. Preserve the original and a protected tested backup; a Git
URL or tracked commit does not back up untracked files.

## Plan a content-preserving map

Choose the physical destination once. The new-home default is `~/.AIOS`; it
never overrides a deliberately configured existing path or authorizes a move.
A rename migration may explicitly select that destination. No worker moves its
own live checkout or parent repository; the lead coordinates those boundaries.
Use the [owner-data migration procedure](data.md) for all file-level conflict
and restore rules.

| Source | Accepted destination / treatment |
| --- | --- |
| OSM.md | AIOS.md with only verified product-name and route substitutions |
| OSM_FORMAT equal to `1` | AIOS_FORMAT equal to `1` after mapped-content and restore proof; preserve the old marker in the original/backup |
| Legacy `.aios/CONTEXT.md` | Preserve rich content as a routed context file; make a small AIOS.md index with verified links |
| MEMORY.md and CONNECTIONS.md | Preserve facts, provenance, account boundaries, authority and unknown fields; change only proved paths if needed |
| Context, System/Project registries and assets | Preserve every field and asset; verify mapped physical paths independently of canonical URLs |
| Independent repositories | Their own move/backup/local lifecycle, never copied as owner context or silently replaced |
| Non-product skills | Keep original bytes recoverable in their owner-controlled source; only separately verified path/caller adaptations |
| `<!-- OSM:BEGIN -->` bridge | Replace only one provenance-verified old managed block with the reviewed AIOS block under setup authority |
| Legacy template/root instructions | Preserve and inspect their scope; do not delete an entire AGENTS file to remove an old route |

For each intended change record exact source, baseline destination, accepted
output hash, reason, authority and rollback preimage. Identical files stay
byte-identical. Where a path must change, list those exact spans and prove every
other byte and unknown field unchanged. Do not blanket-replace a personal name,
all `aios-*` text, history, or arbitrary Markdown. Compare facts and permissions
semantically as well as checking hashes. Do not put client content or migration
logs into the distributed package or always-read context.

## Resolve package and skill collisions

Inventory active native packages, global skill directories or links, explicit
path registrations and relevant repository-local skills. Record source identity,
canonical body and actual discovery location for each overlapping name. Compare
both old OSM roles and the new AIOS names; two differently named packages can
still provide conflicting owner routes.

A verified old Method package may be disabled/removed through its supported
native registration control under adoption authority. It is a different
selector from `aios@online-sourdough`; do not claim an old-selector update
renames it. Retain the prior release/ref as recovery. Never delete a package
cache or owner folder manually to force a native uninstall.

For legacy global `aios` skills, prove the owning source before changing a
registration. Remove or repoint only the specifically authorized redundant
link/registration after comparison; retain its canonical body and recovery
information. An unknown, customized or conflicting skill is preserved and
activation waits for that collision's decision. Never overwrite a global body,
uninstall another owner's plugin, or assume the entire `aios-*` namespace is
owned by Method. Optional external Global Skills remain independently managed.

Use a supported native sequence that leaves one effective source for each of
the 15 names. A temporary staged installation is not acceptance while duplicate
sources remain active. Read back actual discovery in a fresh session; a clean
filesystem list alone does not prove the harness loaded the intended source.

## Apply, resume and recover

One authorized owner-data writer compares current source and destination hashes
against the accepted map immediately before each write. An already accepted
output is a no-op. A different existing destination, unexpected symlink, changed
source or malformed/duplicate bridge block stops that write with both versions
preserved. Do not merge conflicting facts or authorization automatically.

Record completed map entries separately from core context. Resume only incomplete
entries and recheck changed evidence. An identical replay creates no files,
duplicate registrations or new authority. Set the supported AIOS_FORMAT only
after the mapped content, route integrity and restore proof pass.

Verify the thin global AIOS bridge and all bytes outside its accepted block.
Keep ancestor owner-context instructions out of nested independent repositories.
Verify relevant native saved roots, environments and actual fresh-task cwd using
[adapters](adapters.md); a physical folder move is not desktop cutover proof.
Explicit app-control denials remain hard boundaries. An unavailable supported
control leaves one guided action and pending readback, not an internal edit.

Rollback uses the protected preimages and previous native package/ref. Restore
only scoped outputs whose current hashes still equal the accepted migration
outputs. Preserve subsequent owner edits and unknown settings; stop a conflicting
restore instead of overwriting. Do not delete the original home, previous
release, history or original skill bodies. Report package delivery, owner-data
migration, native discovery and desktop/runtime acceptance independently.
