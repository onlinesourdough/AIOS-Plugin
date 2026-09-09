# Codex configuration and instructions

Use for relevant Codex base settings and instruction precedence. Apply the
shared [configuration procedure](harness-configuration.md). Optional context,
memory and computer capabilities use their separate routes from that index.

Resolve `CODEX_HOME` when configured; otherwise use `~/.codex/config.toml`.
Inspect the active profile, command-line overrides, trusted project config and
app/session selections before assuming that file controls the current run.
Managed policy may restrict user choices. Check effective global/local AGENTS.md
and AGENTS.override.md separately from config; preserve existing instruction
precedence. Use the current [config basics](https://learn.chatgpt.com/docs/config-file/config-basic)
for the running client's loading order, rather than hard-coding one order for
all versions. Existing profiles and provider definitions are not AIOS assets.

| Area | Inspect and preserve | Change/verification boundary |
| --- | --- | --- |
| Command approvals | `approval_policy` and active approval profile/overrides | `never` changes prompting, not business authorization or OS permission. Reproduce it only when the user's chosen baseline calls for it. |
| Filesystem/network access | `sandbox_mode` or the version's supported permission-profile mechanism | `danger-full-access` is an explicit unrestricted choice, never an onboarding default. Do not mix incompatible mechanisms or bypass managed constraints. Verify actual access to the chosen home. |
| Models/providers | Effective model, provider, reasoning/profile and existing nonsecret definitions | Keep them. Do not install a provider, migrate credentials, infer a better model or pin a personal choice in AIOS. |

Check key support and allowed values against the current
[configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)
and local help. Do not convert one client's access settings into another
client's unrelated always-allow controls. Technical access never grants a send,
publish, payment or broader destination authorization.

## Native task-list exposure

During authorized onboarding or a tracking repair, inspect actual callable
native tools first. A missing `update_plan` may be default-off: the
[official configuration schema](https://learn.chatgpt.com/docs/config-schema.json)
(checked 2026-09-09) defines `tools.update_plan.enabled` with default `false`.
Verify support in the running client and effective overrides; do not infer a
Plan-mode or model-effort cause from missing exposure.

Only when setup/repair authority covers enabling this tool, apply the shared
[configuration procedure](harness-configuration.md) to the existing table:

```toml
[tools.update_plan]
enabled = true
```

Preserve explicit off without that authority, along with unrelated keys and
comments; do not append a duplicate table. Routine lifecycle skills must not
silently change global configuration. Parse the result and use the installed
client's supported strict-config/config-load check. Report config-load success
separately from unrelated diagnostic failures; neither proves tool exposure.
Recheck the actual callable inventory next turn (or fresh session if required),
then invoke the exposed tool. Report call response, available state readback and
observed UI separately. Until the tool is available, retain the declared fallback.
