# Owner format contract

AIOS supports owner format 1. `AIOS_FORMAT` is the integer `1` on one
line; it is not the product release. Files remain plain Markdown, not a rigid
business database. Unknown custom files/fields belong to the owner and survive
all updates. Before any owner-data mutation, including maintenance, check the
marker at the configured physical owner root. Only the supported integer 1 is
writable by this release. Any other integer is unsupported; malformed content
is invalid. Both remain read-only with a clear stop and a compatible-product
or explicitly reviewed migration action. Format absence means legacy or
unclassified, not empty: inspect and plan before initialization or migration.
Never silently down-convert or infer a version from filenames.

Format 1 has one small AIOS.md route index, MEMORY.md, CONNECTIONS.md, context/,
systems/README.md and projects/README.md. Details grow selectively. Optional
skills/ contains owner methods. Registries retain name, scope/outcome, canonical
repository or local marker, checkout path and verification status; System rows
also retain primary skill, invoke condition and return. Preserve legacy extra
columns rather than dropping them to fit blank assets. Unknown checkout status
is unverified, never installed. New homes default to ~/.AIOS; a default change
does not move an existing home. New checkouts live physically at
AIOS_ROOT/projects/<slug> and AIOS_ROOT/systems/<slug>. Each remains an
independent repository with its own .git, AGENTS.md, lifecycle and recovery.
Existing chosen external paths remain supported; no symlink farm is required.

For OSM 0.1.x names, legacy template layout, overlapping registrations, file
migration, machine moves or private backup, continue with the focused
[migration procedure](data.md) and [identity migration](migration.md) as
applicable. AIOS_FORMAT and OSM_FORMAT are separate markers; an old marker is
migration input, not silent authorization to write.
