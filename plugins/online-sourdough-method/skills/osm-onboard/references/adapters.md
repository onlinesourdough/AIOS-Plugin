# Native adapters

These are installation instructions, not permission to change a machine.
Inspect current harness documentation/help when versions differ. Install only
under existing task authorization. Product, owner data and machine configuration
are separate. Package caches are replaceable; never put owner data there.
No whole ~/.codex copy, copied credentials, model/provider reconfiguration,
background service or MCP is needed.

For effective config, approval/sandbox settings, memory, Computer Use/History,
providers, Pi settings and conflicting legacy registrations, follow the
[harness-configuration checklist](harness-configuration.md). Native extras are
optional; preserve the chosen baseline and report unavailable per-machine UI
steps without blocking core OSM.

## Codex

This repository contains `.agents/plugins/marketplace.json` and
`plugins/online-sourdough-method/.codex-plugin/plugin.json`. For an authorized
local pilot, substitute the verified repository path:

```sh
codex plugin marketplace add /absolute/path/to/Method
codex plugin add online-sourdough-method@online-sourdough
```

For a released private repository, the authorized account can instead add
`onlinesourdough/Method --ref REVIEWED_REF` as the marketplace source, then
install the same selector. A reviewed immutable commit/tag must exist first.
Read installed marketplace identity before reusing a conflicting name. Do not
create a personal marketplace for this repo distribution. Start a fresh thread
and verify all four skills are discoverable once.

Default global bridge target is ~/.codex/AGENTS.md (respect an explicitly
configured CODEX_HOME). Inspect AGENTS.override.md: it can shadow the normal
file. Preserve it and unrelated AGENTS instructions; do not delete or overwrite
an override to make discovery pass. Under setup authority, propose/apply the
same small managed block in the effective file, documenting the exception.
If precedence or conflicting instructions cannot be safely resolved, report
the exact blocker instead of claiming setup passed. Personalization and its
backing instructions are one surface, not two independent policies.

## Pi

The root package.json declares only `pi.skills`, pointing to the very same
four plugin skill folders. No extensions or install scripts are provided.
Standard local and Git package routes are:

```sh
pi install /absolute/path/to/Method
pi install git:github.com/onlinesourdough/Method@REVIEWED_REF
```

Choose one source, not both. Local install references the repository without
copying skill bodies. A Git install is a harness-managed package checkout;
never use it for owner data or development work. Pi may reconcile/reset its
managed Git cache on package update. Dependencies and lifecycle scripts are
absent from this package. Verify `pi list`, package paths, loaded skill names
and a fresh session. Do not manually copy skills into ~/.pi/agent/skills.

Default bridge target is ~/.pi/agent/AGENTS.md; respect a configured agent home.
Inspect AGENTS.override.md and any fallback CLAUDE.md plus effective loaded
context. Preserve unrelated content and resolve shadowing as for Codex.
Only patch exact owned keys/array entries if settings require a change; never
rewrite settings.json wholesale or touch authentication stores.

## The same small bridge

Use [bridge asset](../assets/bridge.md). Replace OSM_ABSOLUTE_PATH with the
resolved physical owner path as literal text. The marker pair scopes future
updates. If exactly one matching block already exists, compare before changing;
an identical rerun is a no-op. Multiple/malformed blocks or an unexpected home
are a conflict. Record the pre-edit hash; re-read before patching. Keep all
bytes outside the block unchanged, including unrelated instructions.

The bridge identifies the configured OSM owner home by physical root, OSM.md
and supported OSM_FORMAT, even when Git-backed. Genuinely independent repository
work stays local-first without personal preload. Owner-level work reads OSM.
Unsupported/malformed owner format remains read-only before every owner write.
File access and account authorization must still be available in the harness.
Do not claim Markdown provides isolation or team RBAC.

Keep this bridge global and OSM.md in the owner home. Do not add an owner-home
or intermediate projects/systems AGENTS/override file that instructs nested
repository tasks to load personal context. Verify inherited instructions in a
fresh nested repository task when setup changes this boundary.

## Optional user-owned skills, registered once

The canonical bodies live in OSM_ROOT/skills/<name>/SKILL.md, outside the product.
Inventory existing global and package discovery before registration. Keep each
name visible exactly once in each harness, resolving collisions before writes.
The common ~/.agents/skills discovery root is available in Codex and Pi. One
non-colliding symlink per owner skill there can point to its canonical OSM skill
folder; do not also add Pi's skills setting or copy it into another global root.
If the installed harness cannot discover that supported link, use its verified
native path registration instead, remove only the redundant owned registration
and test again. Never duplicate bodies or create another metadata wrapper.
Update links after a home move. Removing a registration never deletes the body.
Optional external Global Skills remain separately installed and owned.

## Optional Claude bridge — NOT TESTED

No Claude plugin compatibility is claimed. A separately authorized adapter
can put the same routing text with the resolved home in Claude's effective
CLAUDE.md and register the shared skills through that version's native method.
Read its current official documentation, preserve existing instructions and
run the same cold-session fixtures before claiming support. No Claude files
are required by this product.

## Update and uninstall

Inspect the reviewed release and data compatibility before adoption. Pin the
active task's method version; defer updates until a task boundary. Use native
package update/reinstall targeting the reviewed ref, then a new thread and
checks. Product rollback selects the previous reviewed package; it does not
roll back owner data. Uninstall removes only owned package registrations and
the unchanged managed bridge block, never owner files or unrelated settings.
If the block changed since setup, preserve it and show a scoped removal diff.

Sources checked 2026-09-04: [Codex instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md),
[plugin packaging](https://developers.openai.com/plugins/build/plugins),
[Pi packages](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/packages.md),
[Pi skills](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md).
Local CLI help and installed Pi docs informed these commands. Documentation
support is not proof of successful installation in another environment.
