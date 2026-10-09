# Codex sidebar — 0.25.0

The Meetings-inspired layout uses a compact header, one Context card and simple
Personal/Team rows for Skills and Memory. Missing destinations stay visible with
Add. Source actions open their links; no repeated external-arrow icons or
full-width divider bands. Local paths display their location.

New setups show all four numbered sections from the beginning: Notion, Context,
Skills, Memory. Sections are independently revisitable and keep drafts. The first
context save enables Docs; Continue then saves source edits and advances.
Finish opens the dashboard. Existing contexts open there
directly. Settings is a separate drawer with explicit Save and discard handling.
The same interface is exposed through a native settings entrypoint.

Source selectors show saved names for the current context. Optional slots offer
None; Add/Edit link allows a new location and an optional display name. This is
navigation configuration, not live Notion page search. Neither a selected link
nor a saved map proves source access or business readiness.

## Boundaries

The official Notion plugin/account stays separate. Native CLI inventory and
public app/installed metadata determine installation, enablement and connection.
Unknown is not Connected; Connected does not prove page access. Refresh checks
that metadata. AIOS has no Notion server, credential store or custom OAuth.

AIOS MCP serves this panel and stores only navigation labels/links. It does not
proxy Notion content. Company knowledge, personal/team methods, Memory and Spaces
stay in their chosen home. The panel displays destinations, not live records or
counts. Source entry does not create a workspace or establish business readiness.

Explicit Setup handles a new or messy workspace, verifies sources through its
existing connector and registers personal navigation using Context's dashboard
procedure. A client task does not alter the consultant's personal default. Source
maintenance updates navigation only during an authorized route change; no sync
job is introduced. Context remains provider-agnostic and retrieves only needed data.

## Runtime and storage

Codex runs the packaged Node.js 22+ stdio server. No consumer npm, Docker, hosted
service, telemetry or UI network domains. Source: apps/sidebar. Locked bundles:
runtime/sidebar. Resource: ui://aios/home-v4. Tools:

- aios_open: read-only global app entry; status and links are UI metadata.
- aios_status: app-only read-only refresh.
- aios_settings: app-only native settings entry, opening the same drawer.
- aios_save_context: app-only owned AGENTS pointer save.
- aios_sources: explicit model read of the context and navigation with revisions.
- aios_save_sources: app/model navigation replacement, scoped to current context.

The short pointer lives in CODEX_HOME/AGENTS.md. Pointer saves keep unrelated
bytes and custom rules, back up prior bytes, and reject ambiguous blocks,
symlinks, oversized files and detected edits. Unchanged saves make no write.

Navigation is private state at CODEX_HOME/aios/panel/<identity-hash>.json. It
contains a context title and up to five roles: docs, personalSkills, teamSkills,
memory and teamMemory. The existing memory key remains the default/personal
source. A team slot is optional; labels imply no permissions and create no
remote databases. The actual context guide owns which sources apply to a task.

Notion identity normalizes copied URL variants; other providers use their exact
location. A changed context loads its own map, never the previous one's sources.
No source bodies, credentials, policy or access claims are stored. The map is
not preloaded as agent context or used as a second source of business truth.

Writes use bounded reads, file identity checks, per-map locking, context/source
revisions, backups and atomic rename. Invalid or symlinked state fails closed.
Pointer and source saves remain separate durable steps. Failed later writes
preserve earlier success; stale drafts cannot silently adopt refreshed revisions.
Restoring a context pointer loads an existing map before allowing replacement.

## Verification and recovery

Run the locked build, Node tests and bundled stdio smoke, package checks and
repository rehearsals. Browser proof covers initial setup, revisiting sections,
source pickers, optional slots, settings Save/discard, failed saves, retry,
keyboard/focus, light/dark and 320px. Synthetic host results are distinct from
native installed-runtime adoption and do not prove new-account OAuth.

The loopback fixture uses temporary isolated Codex homes. /setup is fresh setup,
/ is a sample dashboard, /settings opens the sample settings and /test exposes
labelled scenario/theme/error controls. Setup and dashboard are separate fixtures;
refreshing either does not alter real instructions or company sources. Source-link
open requests are recorded, not sent to fictional destinations.

Rollback with the supported plugin manager to an earlier reviewed tag; keep
Notion and its sources. Clear a selected teamMemory navigation slot before a
0.24 downgrade: older validation rejects this unknown role. Alternatively restore
a reviewed earlier map, preserving any later edits. Pointer backups are under
CODEX_HOME/backups/aios-context; map backups sit alongside the JSON file as
<file>.<revision>.bak. Prove a crashed writer stopped before removing its lock.
An already-open Codex panel may require an app reopen to load the new runtime.
