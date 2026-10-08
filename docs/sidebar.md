# Codex sidebar — 0.24.0

AIOS uses the early numbered, divided setup layout and Codex theme controls.
The actual v0.20 tag had no native sidebar; v0.21 introduced that shell.
A completed setup now opens a useful dashboard instead of a single context link.

```text
Connect Notion → Context + Docs → Personal / Team skills → Memory → Your AIOS
                                                                  ├ Context + Docs
                                                                  ├ Personal / Team skills
                                                                  └ Memory
```

Continue saves each step. Back navigates without undoing saved progress. A failed
later step preserves earlier saves. Optional sources may be empty and added from
the dashboard; unused Team skills stay hidden. Existing context opens the home.
One Settings icon opens the same fields. Source actions open their exact links.
Local paths display their location rather than inventing a host file opener.
There are no panel chat messages, hidden agents, source-search dropdowns or polling.

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
runtime/sidebar. Resource: ui://aios/home-v3. Tools:

- aios_open: read-only global app entry; status and links are UI metadata.
- aios_status: app-only read-only refresh.
- aios_save_context: app-only owned AGENTS pointer save.
- aios_sources: explicit model read of the context and navigation with revisions.
- aios_save_sources: app/model navigation write, scoped to current context.

The short pointer lives in CODEX_HOME/AGENTS.md. Pointer saves keep unrelated
bytes and custom rules, back up prior bytes, and reject ambiguous blocks,
symlinks, oversized files and detected edits. Unchanged saves make no write.

Navigation is separate private app state at CODEX_HOME/aios/panel/<identity-hash>.json.
It stores a context title and up to four role names/links. Notion page identity
normalizes copied URL variants; other providers use their exact location.
Another context never inherits the prior map. No source bodies, credentials,
policy, access claims or permissions are stored. This state is not preloaded as
agent context and is not a second source of business truth.

Writes use bounded reads, file identity checks, a per-map lock, context/source
revision checks, backups and atomic rename. Invalid or symlinked state fails
closed. A context pointer save and source save are distinct steps; a failed
source save does not roll back a successful pointer save. A stale draft cannot
adopt new revision tokens after Refresh; reopen Settings to reconcile it.

## Verification and recovery

Run the locked build, Node tests and bundled stdio smoke, package checks and
repository rehearsals. Browser coverage includes setup, optional team, empty
sources, reopen, settings, keyboard/focus, failure/retry, light/dark and narrow
views in a synthetic host without chat capability. Verify installed bytes and
native runtime separately; neither proves new-account OAuth or source access.

The loopback fixture writes only to a temporary Codex home. /test has labelled
scenario/theme controls; / is the clean preview. Source-link open requests are
recorded in the fixture, not sent to those synthetic destinations.

Rollback the package using the supported plugin manager and an earlier reviewed
tag; keep Notion and its sources. Instruction backups remain under
CODEX_HOME/backups/aios-context. Navigation writes keep the earlier map alongside
it as <file>.<revision>.bak. Inspect later edits before restoring either. A lock
left by a crashed writer needs proof that writer stopped before removing it.
An old open Codex panel may need the app reopened to load the new runtime.
