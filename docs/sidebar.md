# Codex sidebar — 0.23.0

The panel is deliberately small: Notion status and one context location.
It uses Codex theme tokens, neutral controls, a green Connected badge and a
AIOS / by onlinesourdough header. The layout, type scale, section dividers,
numbered steps and SDK controls come directly from 0.21.0; the newer card layout
is removed. No setup guide, multi-source wizard or chat
handoff is exposed in the panel.

```text
Open AIOS
  ├ Existing context → Open context
  └ First use → Context link → Continue → Open context
```

## Boundaries

- Continue saves the user-entered **personal default for new Codex chats**.
  It does not search or write Notion, invoke an agent or claim business readiness.
  The link is a user-provided location; Context checks access and guidance when
  that context is actually needed. Remote contents remain untrusted source data.
- Docs, Personal/Team Skills, Memory and Spaces remain in the customer's entry.
  No second routing database or local business-content mirror is introduced.
- Requested business onboarding stays in the existing Setup skill, including
  client scope, plan-only, Interview, source reuse and first-task proof. The
  panel neither triggers nor replaces it. A blank Notion still needs that work.
- The live cross-plugin dropdown is removed. Public MCP Apps tools/call routes
  to the originating server; no supported direct Notion route is established.
  The former agent mailbox, page picker, chat messages and polling are deleted.
- The official Notion plugin and account connection stay independent. Exact
  native plugin inventory plus the public app/installed result determine the
  badge. Unknown is not Connected. Missing/disabled plugins get a short native
  Plugins instruction; disconnected accounts link to the official connection
  page. Refresh reads status without starting a conversation.
- HTTPS links and absolute paths support alternative context providers. An
  existing non-Notion route does not show Notion controls. Local paths display
  as text; this panel does not invent a host file-opening capability.

## Runtime and persistence

Codex manages the packaged Node.js 22+ stdio server; no consumer npm or Docker.
`apps/sidebar` owns source, tests and the synthetic browser host.
`runtime/sidebar` is built from locked dependencies. No UI network domains,
telemetry, credentials or custom OAuth. Tool metadata stays out of model-visible
content; context location and status reach the panel in `_meta`.

`aios_open` is the global/model entrypoint. `aios_status` is app-only and
read-only. `aios_save_context` is app-only and correctly annotated as a write.
The new resource URI is `ui://aios/home-v2`; old picker replies are unsupported.
There is no ui/message, hidden chat, background agent or prompt-copy fallback.

The only active owner file is `$CODEX_HOME/AGENTS.md`. A save appends the shipped
bridge when absent, or changes only Context: inside one unambiguous AIOS block.
Other instructions, including custom rules in that block, remain byte-for-byte.
An observed-file hash rejects stale saves; a per-file lock serializes panel
writers. Atomic replacement prevents partial writes. Existing bytes are saved
privately under `$CODEX_HOME/backups/aios-context/<revision>.md` before a change.
Unchanged saves are no-ops. Unsupported files, symlinks, multiple links, oversized
files, duplicate/malformed blocks and detected concurrent edits stop the write.
Other editors do not share this lock; readback detects a later changed result.

The UI keeps drafts on save failure, locks pending controls and prevents double
submit. Ordered status timestamps reject late snapshots, including after a
failed refresh; failed status removes Connected. Headings/inputs receive focus
on transitions. Titles, errors and paths are rendered as text.

## Verification

Run the locked build, `npm test --prefix apps/sidebar`, native onboarding
rehearsal and existing package checks. Replacement coverage tests direct save,
readback/reopen, cancellation, no message capability, stale/conflicting writes,
backup preservation, malformed inputs and connection failure/retry. The stdio
smoke exercises the built server against a disposable Codex home.

`npm run preview --prefix apps/sidebar` serves the actual bundled UI on loopback
with synthetic connection metadata and the real pointer writer restricted to a
temporary directory. It has no conversation capability. Browser rendering and
protocol proof are separate from desktop plugin adoption and live source access.
Do not claim a new-account OAuth flow or automatic company provisioning.

## Recovery

Use the supported plugin manager to restore an earlier reviewed tag if needed;
keep the official Notion plugin and customer sources. Package rollback does not
restore instruction edits. To undo a pointer save, restore only its owned change
from the backup after checking for later edits. A lock left by a crashed writer
requires confirming that writer stopped before removing that exact lock file.
An already open Codex panel may still serve old code; reopen Codex to load the
new release. Never edit plugin caches or credentials to force a refresh.

## Sources

- [MCP UI](https://developers.openai.com/plugins/build/chatgpt-ui)
- [MCP Extensions 0.1.0](https://github.com/openai/mcp-extensions/blob/node-v0.1.0/docs/spec.md)
- [Codex app-server](https://learn.chatgpt.com/docs/app-server)
