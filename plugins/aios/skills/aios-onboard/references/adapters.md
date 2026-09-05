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
steps without blocking core AIOS.

## Codex

An invited client can give the agent the private repository link and a natural
setup request. With authorized access, the agent reads the README, resolves an
existing reviewed AIOS release, and uses an advertised permitted native install
surface. Verify the release exists and identifies AIOS before installation;
never substitute an unreviewed branch because a tag is absent. Missing GitHub
access needs a native sign-in/invitation step, not a secret in chat. A fresh task
continues onboarding after resource discovery is refreshed.

This repository contains `.agents/plugins/marketplace.json` and
`plugins/aios/.codex-plugin/plugin.json`. For an authorized
local pilot, substitute the verified repository path:

```sh
codex plugin marketplace add /absolute/path/to/AIOS-Plugin
codex plugin add aios@online-sourdough
```

For a released private repository, the authorized account can instead add
`onlinesourdough/AIOS-Plugin --ref REVIEWED_REF` as the marketplace source, then
install the same selector. A reviewed immutable commit/tag must exist first.
Read installed marketplace identity before reusing a conflicting name. Do not
create a personal marketplace for this repo distribution. Start a fresh task
and verify the 13 packaged skills are discoverable once. Use the
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

## Codex desktop entry point — when onboarding or cutover affects it

The owner home stores data; it need not be the selected app Project. Ordinary
owner chat should work with no selected Project, using the global bridge.
A null selected Project does not prove the active workspace is empty or current.
Inspect composer selection, active workspace roots and the fresh task's actual
cwd separately; reconcile mismatches before declaring routing/cutover PASS.
Inspect the actual New Chat composer selection and relevant saved roots through
available native tools/UI. Do not promise a persistent default unless that
client's supported feature and effective behavior have been verified.
[Native Projects guidance](https://learn.chatgpt.com/docs/projects) distinguishes
chat without a Project from chats within a Project starting at its primary folder;
that does not establish a universal sticky New Chat default or make Quick chat
an equivalent Codex entry point.

Treat the following as distinct relevant surfaces: active workspace selection,
saved roots, local Projects with physical primary/secondary roots and associated
worktree/setup references, cloud environments, and sidebar presentation. A local
root fix does not update a cached/remote cloud environment. Inspect its canonical
identity/status through supported native sources and change it only under exact
authority; cached metadata alone cannot prove current cloud state.

Discover sidebar preferences when they matter: one list, priority order, custom
sections and pins are client-specific choices, not required AIOS structure.
Reuse chosen organization and names. Apply authorized supported changes and read
back actual state; do not map a client's display layout into owner-data taxonomy
or force the same controls on Pi.

Inventory stale saved roots separately from files and task history. Preserve
chosen custom sections, names, active roots and history. Remove only specifically
authorized obsolete shortcuts through a supported native control; never treat
shortcut cleanup as permission to delete Projects, repositories or owner data.
Include associated local environment/worktree setup references in this scoped
inventory. Resolve physical primary/secondary roots; do not deduplicate by label
or assume every displayed Project has an environment configuration. Preserve
valid setup/actions, credential references and dirty worktrees without executing
setup commands or exposing credentials. Correct only authorized stale native
registrations through supported interfaces. Do not edit app databases/internal
state or infer success from a configuration file.

Check whether the required native inspection/action exists before attempting it.
Respect explicit app-control denials as described in
[harness permissions](harness-configuration.md#computer-use--optional-several-permission-layers);
never route around a denied app through alternative automation or internal edits.
If unavailable, give one precise guided UI step, then obtain actual readback of
its result. Keep desktop cutover PENDING until verified; installation may PASS
independently. Do not substitute a CLI test or a tool-created projectless task for
interaction with the real New Chat entry point.

Acceptance: open New Chat, observe its selected Project (or no selection), start
an ordinary fresh owner task and verify its actual cwd and owner routing. Also
verify the selected root and local-first behavior of the relevant System/Project
entry points. Record observed client/version, selection and task-root evidence;
navigate away and back to New Chat before claiming the selection persists.
Refresh Settings > Environments > Select a project and verify the list agrees
with retained canonical Projects, without authorized obsolete or dangling duplicate
roots. An unavailable UI leaves that check pending with one targeted step. A single
correct task does not prove a persistent default. Repeat only when setup or a
requested UI repair changes this boundary, not during ordinary work. This is
Codex-specific; Pi has no compulsory sidebar acceptance step.

## Pi

The root package.json declares only `pi.skills`, pointing to the very same
13 plugin skill folders. No extensions or install scripts are provided.
Standard local and Git package routes are:

```sh
pi install /absolute/path/to/AIOS-Plugin
pi install git:github.com/onlinesourdough/AIOS-Plugin@REVIEWED_REF
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

Use [bridge asset](../assets/bridge.md). Replace AIOS_ABSOLUTE_PATH with the
resolved physical owner path as literal text. The marker pair scopes future
updates. If exactly one matching block already exists, compare before changing;
an identical rerun is a no-op. Multiple/malformed blocks or an unexpected home
are a conflict. Record the pre-edit hash; re-read before patching. Keep all
bytes outside the block unchanged, including unrelated instructions.

The bridge identifies the configured AIOS owner home by physical root, AIOS.md
and supported AIOS_FORMAT, even when Git-backed. Genuinely independent repository
work stays local-first without personal preload. Owner-level work reads AIOS.
Unsupported/malformed owner format remains read-only before every owner write.
File access and account authorization must still be available in the harness.
Do not claim Markdown provides isolation or team RBAC.

Keep this bridge global and AIOS.md in the owner home. Do not add an owner-home
or intermediate projects/systems AGENTS/override file that instructs nested
repository tasks to load personal context. Verify inherited instructions in a
fresh nested repository task when setup changes this boundary.

## Optional user-owned skills

During setup or a home move, use Maintain context's
[personal skill lifecycle](../../aios-maintain-context/references/owner-skills.md)
for the owner's existing methods and return its registration/runtime evidence.
That is the same procedure used when a conversation creates or changes a skill;
this adapter does not maintain a second registration workflow.

## Other harnesses

Only Codex and Pi are target adapters. No Claude or Hermes compatibility is
claimed. Another adapter requires its own scoped design and native acceptance;
no extra harness files are installed by this package.

## Update and uninstall

Inspect the reviewed release and data compatibility before adoption. Pin the
active task's method version; defer updates until a task boundary. Use native
package update/reinstall targeting the reviewed ref, then a new thread and
checks. Product rollback selects the previous reviewed package; it does not
roll back owner data. Uninstall removes only owned package registrations and
the unchanged managed bridge block, never owner files or unrelated settings.
If the block changed since setup, preserve it and show a scoped removal diff.

Sources checked 2026-09-05: [Codex instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md),
[plugin packaging](https://developers.openai.com/plugins/build/plugins),
[Pi packages](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/packages.md),
[Pi skills](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md).
Local CLI help and installed Pi docs informed these commands. Documentation
support is not proof of successful installation in another environment.
