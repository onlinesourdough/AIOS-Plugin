# Adapter portability and package lifecycle

Read only when moving between supported harnesses, updating, rolling back or
uninstalling the package. Apply the shared [native adapter boundary](adapters.md).

AIOS portability means that the same physical owner home and canonical `skills/`
source can be adopted through a supported entrypoint for another harness. It
does not mean that every harness consumes a global `AGENTS.md`, that this package
installs every adapter, or that models behave identically. Current native
evidence covers Codex and Pi only.

When work crosses harnesses, hand off the accepted outcome, bounded relevant
context, exact Project/System root, one-writer and action authority, evidence,
remaining decisions and any improvement signal (or an honest none). The
receiving harness resolves its own entrypoint, permissions, trust and runtime
capabilities before acting. No universal loader, duplicated method body,
background bridge or hidden permission grant is part of AIOS.

For update or uninstall, inspect the reviewed release and [data compatibility](data-format.md)
before adoption. Pin the active task's method version; defer updates until a
task boundary. Use native package update/reinstall targeting the reviewed ref,
then a new task and checks. Product rollback selects the previous reviewed
package; it does not roll back owner data. Uninstall removes only owned package
registrations and the unchanged managed bridge block, never owner files or
unrelated settings. If the block changed since setup, preserve it and show a
scoped removal diff.

Sources checked 2026-09-05: [Codex instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md),
[plugin packaging](https://developers.openai.com/plugins/build/plugins),
[Pi packages](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/packages.md),
[Pi skills](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md).
Local CLI help and installed Pi docs informed the commands. Documentation
support is not proof of successful installation in another environment.
