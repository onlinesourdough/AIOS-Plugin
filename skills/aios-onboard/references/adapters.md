# Native adapter route

These are installation instructions, not permission to change a machine.
Inspect current harness documentation/help when versions differ. Install only
under existing task authorization. Product, owner data and machine configuration
are separate. Package caches are replaceable; never put owner data there.
No whole ~/.codex copy, copied credentials, model/provider reconfiguration,
background service or MCP is needed.

Read this shared bridge boundary and exactly one operation route:

- [Codex package and bridge](adapter-codex.md) for Codex installation or repair;
- [Codex desktop entry point](adapter-codex-desktop.md) only when onboarding or
  cutover affects New Chat, saved roots, environments or sidebar state;
- [Pi package and discovery](adapter-pi.md) for Pi installation or repair; or
- [portability, update and uninstall](adapter-portability.md) only for that
  cross-harness or package-lifecycle operation.

For effective configuration, approval/sandbox settings, optional capabilities,
providers, Pi settings and conflicting legacy registrations, select the one
applicable route from [harness configuration](harness-configuration.md). Do not
read every harness or optional-capability reference as a baseline ritual.

## The same small bridge

Use [bridge asset](../assets/bridge.md). Replace AIOS_ABSOLUTE_PATH with the
resolved physical owner path as literal text. The marker pair scopes future
updates. If exactly one matching block already exists, compare before changing;
an identical rerun is a no-op. Multiple/malformed blocks or an unexpected home
are a conflict. Record the pre-edit hash; re-read before patching. Keep all
bytes outside the block unchanged, including unrelated instructions.

The bridge is only the bootstrap instruction that locates the owner home; native
package and skill registration expose the method entrypoints separately. Passing
one boundary does not prove the other. The bridge identifies the configured AIOS
owner home by physical root, AIOS.md and supported AIOS_FORMAT, even when
Git-backed. Genuinely independent repository work stays local-first without
personal preload. Owner-level work reads AIOS. Unsupported/malformed owner
format remains read-only before every owner write. File access and account
authorization must still be available in the harness. Do not claim Markdown
provides isolation or team RBAC.

Keep this bridge global and AIOS.md in the owner home. Do not add an owner-home
or intermediate projects/systems AGENTS/override file that instructs nested
repository tasks to load personal context. Verify inherited instructions in a
fresh nested repository task when setup changes this boundary.

During setup or a home move, use Manage Skills'
[personal skill lifecycle](../../aios-manage-skills/references/owner-skills.md)
for the owner's existing methods and return its registration/runtime evidence.
That is the same procedure used when a conversation creates or changes a skill;
this adapter does not maintain a second registration workflow.
