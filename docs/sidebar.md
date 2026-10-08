# Codex sidebar — 0.22.0

Accepted outcome: a simple Get started panel, lowercase onlinesourdough topbar,
Context selection and Continue into the existing Setup procedure. Notion stays
an independently installed official plugin. Preserve other clients, owner data,
Spaces, personal/team skills, account permissions and unrelated instructions.

```text
Install AIOS → Open AIOS
                  ↓
        Check official Notion plugin
          ├ missing → Install Notion
          ├ disabled → Enable Notion
          ├ disconnected → Connect Notion
          └ ready → ✓ Connected
                  ↓
      Find pages → agent reads Notion → choose Context
                  ↓
      Context + Docs → Personal / Team skills → Memory
                  ↓
          Continue → existing AIOS Setup
                  ↓
        Relevant questions → verify → source-link overview
                  ↓
                   First useful task
```

The public MCP Apps bridge calls only its originating server, not another
plugin's tools. Page/source lookup therefore sends a visible read-only message
to the current conversation. This is an agent-assisted picker, not an instant
cross-plugin API. The global entrypoint supplies a conversation on desktop
according to the pinned Extensions specification. No hidden thread, duplicate
Notion MCP server, OAuth client, token store or private Codex endpoint is used.

## Connection and setup boundaries

- The native **Set up** entry and **Continue** invoke the same Setup skill.
  The wizard separates Context/Docs, Personal/optional Team skills and Memory.
  More options holds Space, client scope and plan-only; another provider is
  available at the connection step. Missing sources are resolved in Setup.
  Shared native Skills can serve both audiences when permissions fit. Separate
  sources preserve private/team access where needed; tags never grant access.
- AIOS ships no `.app.json` or `apps` binding. It reads `codex plugin list --json`
  for exact `notion@openai-curated-remote` installation/enablement, and public
  `app/installed` for the exact Notion app's callable connection state. Bounded
  subprocesses use the normal account configuration without reading credentials.
- Missing/disabled plugin buttons ask the visible chat to use the native plugin
  flow. Connect opens the official Notion app connection page. Refresh rechecks.
  Failed discovery is unknown, never disconnected or connected by assumption.
- Connected means installed, enabled and callable in the refreshed snapshot.
  It does not prove access to a selected page or freshness at the provider.
- Setup owns any authorized home or pointer edits. Browsing creates no Notion
  pages, changes no permissions and never marks the company setup ready.
  Client scope preserves personal defaults; plan-only remains read-only.

## Runtime and data

`apps/sidebar` owns source, pinned SDKs, tests and synthetic fixture.
`runtime/sidebar` is the reproducible consumer bundle with dependency notices.
Codex manages the declared Node.js 22+ stdio process. No consumer npm or Docker.
The HTML has no network/resource CSP domains and uses the host theme.

`aios_open` is the global/model entrypoint and accepts a reply to an outstanding
picker request. `aios_status`, `aios_picker_request` and `aios_picker_read` are
app-only. Starting a request only prepares it; the panel sends the visible
message after the user's action. Initial status is reused. Polling lasts at
most two minutes and never calls Notion; Check result retrieves a delayed reply.
Setup inputs stay locked while a submitted outcome is pending, including an
uncertain send. The conversation can return ready, plan or needs_input. Only
a verified entry/destination outcome marks the overview Context verified; it
does not claim the first business task has been tested.

A random panel/request pair, exact source identity, ten-minute discovery expiry
(one hour for setup), twelve
panel limit and at most thirty metadata choices bound temporary state. A new
request invalidates the old request; identical replies are idempotent, different
replies and crossed source maps are rejected. No business page bodies, auth data,
telemetry or setup state are saved to disk. Source errors remain explicit.

The only owner file read is the bounded AIOS routing block in `$CODEX_HOME/AGENTS.md`.
Ambiguous/old blocks are not guessed. Other files, chats and histories are not
scanned. Source names and locations are rendered as text. Other providers keep
their existing route and do not inherit hidden Notion source selections.

## Verification and recovery

Run the bundle build, `npm test --prefix apps/sidebar`, native onboarding
rehearsal and required source/package checks. Tests cover independent plugin
and connection states, malformed replies, process cleanup, pointer parsing,
scoped/expired/replayed replies, duplicate identities, unsafe URLs and prompt
scope. The stdio smoke exercises a full request/reply/read round trip.

`npm run preview --prefix apps/sidebar` starts a clearly labeled synthetic host
on loopback. Its pages are test data. Browser checks and protocol checks are
separate from actual desktop placement and live Notion round-trip evidence.
Live read-only verification and installed-byte proof belong to adoption; never
claim them merely from an HTML preview. No new-account OAuth reset is needed.

If a request expires or the process reloads, reopen AIOS and issue a new request.
If the bridge cannot send a message, a copyable request is shown. The native Set
up entry and conversational Setup remain available. Roll back through the native
package manager to reviewed 0.21.0; preserve the separate Notion plugin and all
owner content. Do not edit cache databases or credentials to force a refresh.

## Sources

- [MCP Extensions 0.1.0](https://github.com/openai/mcp-extensions/blob/node-v0.1.0/docs/spec.md)
- [MCP Apps SDK 1.7.5](https://github.com/modelcontextprotocol/ext-apps)
- [Codex app-server](https://learn.chatgpt.com/docs/app-server)

Checked with the pinned SDKs and Codex 0.160.1. Unsupported or changed host
capabilities are surfaced as explicit gaps.

## 2026-10-08 candidate observations

- 23 Node tests and the bundled stdio request/reply/read smoke pass. Native Codex
  parsing finds Setup, 26 skills, one AIOS server and no embedded app binding.
- The synthetic browser host exercises duplicate page names, pasted-link source
  mapping, the four steps, shared Personal/Team source selection, a delayed
  outcome with locked inputs, and return to the overview. Dark 320px rendering
  has no horizontal overflow. Failure/client/plan-only cases have
  bounded fixture evidence; this is not a live Notion UI round trip.
- The public CLI reports the independently installed official Notion plugin
  enabled and its account callable. Live official Notion reads verify the
  selected guide and destinations; authorized Personal/Team schema/default
  changes are read back without replacing sources, content or icons.
- The already-running desktop tool remains 0.21.0 after candidate installation.
  Reloading the new runtime and testing the complete desktop picker → agent →
  returned panel remains pending. This pilot must not be described as having
  that end-to-end acceptance or a new-account OAuth test.
