# Codex sidebar — 0.21.0

Accepted outcome: a small AIOS sidebar entry and setup panel, using the host's
theme and the existing Setup skill. Keep the company home in Notion or the
selected provider. Use onlinesourdough in visible publisher labels. This extends
the earlier [0.20.0 delivery](issue-38-onboarding.md), whose scope excluded a UI.

## Customer journey

```text
Install AIOS → Open AIOS in the sidebar
                     ↓
             Connect Notion, if needed
                     ↓
          Choose an existing page or home
                     ↓
          Start setup / Continue setup
                     ↓
       Same Setup skill in the conversation
                     ↓
      Check access → reuse Docs / Skills / Memory
                     ↓
        Verify the entry → first useful task
```

The native plugin **Set up** entry remains available and starts the same skill.
No second onboarding policy or generated personal skill is added. The panel
does not create or rename pages, save instructions or mark a home ready.
Those actions belong to Setup and its existing Context procedure.

**Connected** means the exact Notion app is enabled and has callable tools in the
refreshed Codex connector snapshot. It does not prove page access or token freshness at the
provider. **Disabled** asks the user to enable it through Codex; installed but
non-callable tools show **Needs attention**, without assuming reauthentication
is the answer. **Could not verify** stays an explicit gap. **Connect Notion** opens the official app connection
page in the browser, then the user refreshes. The panel never resets auth or
opens an invented OAuth endpoint. A user click on Start/Continue sends one visible
request to the active conversation. An unconfirmed send remains unconfirmed.

## Implementation and ownership

- `apps/sidebar` owns source, pinned SDKs, build, synthetic fixture and tests.
  `runtime/sidebar` is a reproducible bundle, including dependency notices.
- `.codex-plugin/mcp.json` explicitly registers one local stdio MCP server.
  `aios_open` has an official global entrypoint; `aios_status` is app-only.
  The HTML declares fullscreen only. The MCP server icon is monochrome and
  theme-aware; SDK 1.31 uses the documented server-icon fallback.
- Node.js 22+ must be on the execution host's PATH. Consumers do not run npm,
  Docker or a separate hosted service. Codex owns the process lifecycle.
- The panel uses the installed Codex CLI's public `app/installed` protocol with
  `forceRefresh`. A short-lived app-server reads the compact connector snapshot,
  returns only the exact Notion state and terminates. Missing CLI, timeout or a
  malformed response returns `unknown`. The broader app catalog is not loaded.
- The only owner file read is the bounded `AIOS:BEGIN/END` routing block in
  `$CODEX_HOME/AGENTS.md` (default `~/.codex`). It returns only one validated
  `Context:` link/path. Duplicate or old blocks require clarification. No legacy
  home, project, chat or history scanning occurs. This is the personal saved
  default, not an inference about every project; the selected task can override it.
- Connection metadata and the route travel in the tool result's UI-only `_meta`.
  The HTML uses the initial result rather than making a duplicate check. There is
  no local business-data store, credentials file, telemetry or persisted setup state.
  Refreshes are explicit and simultaneous checks share only their in-flight work.
- The iframe has no network/resource domains. Links use the host bridge; inputs
  reject credentials, unsafe schemes and control characters. Personal/default
  instructions are not changed by a customer or project selection.
- Non-Codex client manifests remain skill-only. The shared method has no sidebar
  dependency. Recovery is the native Set up entry or a conversational request;
  a package rollback to 0.20.0 leaves the home and pointer intact.

This uses the public MCP Apps and OpenAI Extensions SDKs, not proprietary
Meetings implementation. The technology adds a real navigation responsibility;
a website alone cannot register a sidebar entry. A cloud app would add deployment
and account ownership without helping this local Codex setup.

## Verification

```sh
npm ci --prefix apps/sidebar --ignore-scripts
npm run build --prefix apps/sidebar
npm test --prefix apps/sidebar
python3 tests/onboarding-rehearsal.py --native
```

CI rebuilds and compares the committed runtime. Source checks protect the exact
declared server, the common skill source, optional Notion binding, isolated
consumer inventory and absence of hooks/implicit servers in other clients.
Unit tests cover connection classification, exact identity, process cleanup, malformed
protocol frames and inventories, timeouts, bounded route reads, duplicate routes,
round-trips from the shipped bridge for URLs/paths and provider input validation.
The bundled-server smoke check uses an isolated empty Codex home. No real account
is connected or business page changed by those tests.

The browser fixture (`npm run preview --prefix apps/sidebar`) supplies a real
MCP App handshake with synthetic state. Observed: first run and existing home,
connection link, explicit refresh, setup message, duplicate-click prevention,
denied message, delayed response with locked inputs, malformed initial status,
alternative provider, light/dark themes and narrow layout. The fixture exposes
delay and malformed-status controls so those regressions can be repeated.
These checks prove the panel and bridge behavior in that fixture. Actual local
connection metadata, installed bytes and host tool discovery are separate
readbacks during adoption.

Desktop computer use is unavailable in this environment. Neither the fixture
nor `plugin/read` proves actual sidebar placement in the running desktop app.
New-account OAuth is not exercised by resetting an existing connection. These
remain explicit pilot limits. No claim of an exact Meetings implementation or
automatic setup completion is made.

## Sources

- [MCP Extensions 0.1.0 — entrypoints](https://github.com/openai/mcp-extensions/blob/node-v0.1.0/docs/spec.md#mcp-app-entrypoints)
- [SDK styling and messages](https://github.com/openai/mcp-extensions/blob/node-v0.1.0/typescript/README.md)
- [Official plugin packaging](https://developers.openai.com/plugins/build/plugins)
- [Codex app-server](https://developers.openai.com/codex/app-server)

The selected SDK release was checked on 2026-10-07. CLI compatibility is observed
against Codex 0.160.1; experimental API drift is surfaced as unknown status.
