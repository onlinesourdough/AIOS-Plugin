# Codex package and bridge

Use only for an authorized Codex package installation, registration or bridge
repair. Apply the shared [native adapter and bridge boundary](adapters.md). Read
[Codex configuration](harness-codex.md) only when effective settings or
instruction precedence beyond the bridge affects the request. Desktop workspace
and New Chat acceptance are a separate [conditional route](adapter-codex-desktop.md).
Normal Codex setup also runs [checklist and goal acceptance](codex-tracking-acceptance.md).
On package update/repair, reuse its dated evidence unless runtime/version or
capability evidence changed, is missing or uncertain; do not repeat global setup.

An invited client can give the agent the private repository link and a natural
setup request. With authorized access, read the README, resolve an existing
reviewed AIOS release, and use an advertised permitted native install surface.
Verify the release exists and identifies AIOS before installation; never
substitute an unreviewed branch because a tag is absent. Missing GitHub access
needs a native sign-in/invitation step, not a secret in chat. A fresh task
continues onboarding after resource discovery is refreshed.

This repository contains `.agents/plugins/marketplace.json` and the root
`.codex-plugin/plugin.json`. For an authorized local pilot, substitute the
verified repository path:

```sh
codex plugin marketplace add /absolute/path/to/AIOS-Plugin
codex plugin add aios@online-sourdough
```

For a released private repository, the authorized account can instead add
`onlinesourdough/AIOS-Plugin --ref REVIEWED_REF` as the marketplace source, then
install the same selector. A reviewed immutable commit/tag must exist first.
Read installed marketplace identity before reusing a conflicting name. Do not
create a personal marketplace for this repo distribution. Start a fresh task
and verify the 17 packaged skills are discoverable once. Use the
[identity migration](migration.md) before replacing an older Method selector or
legacy/global registration; a matching skill name does not establish ownership.

Default global bridge target is ~/.codex/AGENTS.md (respect an explicitly
configured CODEX_HOME). Inspect AGENTS.override.md: it can shadow the normal
file. Preserve it and unrelated AGENTS instructions; do not delete or overwrite
an override to make discovery pass. Under setup authority, propose/apply the
same small managed block in the effective file, documenting the exception.
If precedence or conflicting instructions cannot be safely resolved, report
the exact blocker instead of claiming setup passed. Personalization and its
backing instructions are one surface, not two independent policies.
