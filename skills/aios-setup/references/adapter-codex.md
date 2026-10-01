# Codex package and bridge

Use only for an authorized Codex package installation, registration or bridge
repair. Apply the shared [native adapter and bridge boundary](adapters.md). Read
[Codex configuration](harness-codex.md) only when effective settings or
instruction precedence beyond the bridge affects the request. Desktop workspace
and New Chat acceptance are a separate [conditional route](adapter-codex-desktop.md).
Normal Codex setup also runs [checklist and goal acceptance](codex-tracking-acceptance.md).
On package update/repair, reuse its dated evidence unless runtime/version or
capability evidence changed, is missing or uncertain; do not repeat global setup.

Install through Codex's plugin UI or native CLI. The repository's marketplace
selects AIOS; no agent bootstrap script is needed. Missing GitHub access needs
a native sign-in/invitation step, not a secret in chat. Select the intended
source: current main for a tracking install, or a reviewed immutable tag/commit
for a fixed version. Do not substitute a branch for a requested fixed release.

The native `.codex-plugin/plugin.json` declares the shared skills, interface
metadata and local overview (Node.js 22+). The portable skills ZIP has a root
Agent Plugins manifest and omits that MCP runtime;
`.agents/plugins/marketplace.json` points to this same package root. For an authorized local pilot, substitute the
verified repository path:

```sh
codex plugin marketplace add /absolute/path/to/AIOS-Plugin
codex plugin add aios@online-sourdough
```

For a released version, the account can instead add
`onlinesourdough/AIOS-Plugin --ref REVIEWED_REF` as the marketplace source, then
install the same selector. A reviewed immutable commit/tag must exist first.
Read installed marketplace identity before reusing a conflicting name. Do not
create a personal marketplace for this repo distribution. Start a fresh task
and verify the declared package skills are discoverable once. Use the
[identity migration](migration.md) before replacing an older Method selector or
legacy/global registration; a matching skill name does not establish ownership.

Only when persistent owner routing is requested, the default bridge target is ~/.codex/AGENTS.md (respect an explicitly
configured CODEX_HOME). Inspect AGENTS.override.md: it can shadow the normal
file. Preserve it and unrelated AGENTS instructions; do not delete or overwrite
an override to make discovery pass. Under setup authority, propose/apply the
same small managed block in the effective file, documenting the exception.
If precedence or conflicting instructions cannot be safely resolved, report
the exact blocker instead of claiming setup passed. Personalization and its
backing instructions are one surface, not two independent policies.
