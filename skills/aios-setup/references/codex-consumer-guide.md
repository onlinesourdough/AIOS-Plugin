# Set up AIOS in Codex

Maintained by Online Sourdough. Documentation checked 1 October 2026 against
Codex CLI 0.159.2 and the official configuration reference. Recheck support in
the installed desktop app; its version, account and managed policy can differ.

AIOS runs inside Codex. Codex owns access, models, tools, projects and chats.
AIOS adds useful methods and a small, portable owner context. Most setup happens
in a conversation. An overview is a presentation of that context, not another
place to maintain a duplicate profile.

## Start with your own choices

1. Sign in through Codex's native account flow. Install the AIOS plugin from
   the chosen marketplace and start a fresh chat. Never paste credentials.
2. Say “Set up AIOS for my work.” Reuse an existing owner home if present.
   When the home is absent, decide whether to restore existing context or set
   up new. A hidden folder is storage, not a requirement to edit Markdown by hand.
3. Explain the immediate purpose and relevant sources. Keep customer facts in
   their project or source system; AIOS keeps short routes and unique decisions.
4. Choose access and optional capabilities below. Verify a small useful task
   with the tools it actually needs. Unknown optional capabilities can wait.
5. Decide whether to keep the owner home local or use optional private Git
   continuity. Setup does not automatically create a GitHub repository or upload
   files. The [Sync procedure](../../aios-maintain-context/references/sync.md)
   owns destination, direction, scope and existing authorization.

## Choose access deliberately

For a new user's local project, start with workspace access and on-request
command approvals unless their workflow or managed policy establishes another
choice. The agent can edit and run permitted commands without approving every
step; crossing the access boundary can require approval.

```toml
approval_policy = "on-request"
sandbox_mode = "workspace-write"
```

Full Access is an explicit user's choice. It removes the command sandbox's
filesystem/network isolation. Paired with `approval_policy = "never"`, it also
removes command approval prompts. This can suit a trusted, deliberately chosen
workflow, but it is not an AIOS installation requirement or a safe default to
copy from a power user's computer. Approval policy is not permission to send,
publish, pay, delete unrelated work or access another person's account.

Read-only access is useful for an initial review. If tools need network access
under workspace-write, enable only the supported access needed for the task;
web search, apps and MCP connections have separate boundaries. A network flag
does not create a domain allowlist or an account connection.

Do not mix the legacy `sandbox_mode` mechanism with a permissions-profile
selection in the same layer. Use the mechanism supported by the installed
client. Respect organization requirements and OS permissions.

## A small baseline to discuss

| Area | Recommended conversation and check |
| --- | --- |
| Model and reasoning | The person chooses. Preserve the active/default selection. Use `aios-select-model` when advice is requested or a real capability gap needs a decision. Recheck current prices and availability instead of pinning a model in AIOS. |
| Workers | The person requests the worker, its scope and any named model/effort. `aios-orchestrate-workers` prepares and follows that request. A complex task alone does not start another session. |
| Apps and plugins | Enable the selected integrations in Codex. Check their account and actual tools. An installed plugin or `features.apps` does not prove usable access. |
| Browser | Prefer the Codex in-app browser for previews and source inspection when available. Open and exercise a harmless local page; a feature flag alone proves no rendering or interaction. |
| Computer Use | Optional. Enable only the relevant apps through supported UI controls and verify a harmless action. Browser access and OS app access are different capabilities. |
| Native Memories | Optional. They do not replace AIOS's routed context. Preserve an intentional off state. See [context and Memories](harness-codex-context.md). |
| Computer History | Optional and separate from Memories. Explain its data scope and preserve an intentional off state. See [Computer History](harness-codex-computer-history.md). |
| Hooks | Optional executable behavior. Inspect a hook's source, events and trust before enabling it. `features.hooks` alone is not proof that any hook runs or protects all actions. |
| Plan and goals | A multi-step task can use a native plan. Persistent goals follow the actual tool's explicit request rules; installing AIOS does not start one. Verify the [tracking interface](codex-tracking-acceptance.md). |
| Desktop presentation | Consider system theme, visible context usage, useful activity detail, opening previews in-app and steering an active task with follow-ups. Inspect supported UI settings; do not copy undocumented desktop keys from another user's config. |
| Notifications and awake behavior | Choose what helps the person. Explain sleep/battery implications before changing wake behavior. Terminal notifications and desktop notifications have different controls. |

No provider credentials, browser trust hashes, personal hook commands, device
identifiers, absolute project paths or opaque app-state keys belong in a shared
baseline. Preserve unknown configuration rather than treating it as rubbish.

## Inspect, then apply the smallest change

Resolve the configured `CODEX_HOME`, or use `~/.codex`. Inspect relevant
nonsecret keys in `config.toml`, active profile, trusted project overrides,
launch overrides and runtime settings. A stored default does not establish the
effective setting. The official [loading order](https://learn.chatgpt.com/docs/config-file/config-basic)
and enforced requirements own precedence.

Useful read-only checks are `codex --version`, `codex features list`, and
`codex doctor --summary`. Check the current help before using a command. Feature
status matters: stable, experimental, under development, deprecated and removed
are different. Opt-in experimental features stay optional.

Use the shared [configuration procedure](harness-configuration.md) for changes:
prepare a scoped diff, preserve comments and unrelated settings, verify the
latest bytes, patch only authorized keys and read back. UI-only preferences
use supported UI controls. Do not rewrite the whole config or copy auth state.
Verify effective settings and the relevant capability in a fresh Codex session.
Rollback restores only owned changes and preserves later edits.

## Plugin lifecycle and Git sync

The Codex manifest declares `extensions.com.openai.onboardingSkill` pointing
to the bundled AIOS-setup skill. This supplies a getting-started entry; current
documentation does not guarantee automatic execution on installation.

Enabled plugins can bundle `hooks/hooks.json`. Installing or enabling a plugin
does not trust its hooks: the consumer must review the exact definition before
it runs, and changed definitions need renewed trust. The documented events
include `SessionStart`, `Stop` and `SessionEnd`; no install or uninstall event
is documented. A turn stopping is not proof that its changes are reviewed.

Prefer plugin-owned, bounded read-only discovery and GitHub checks when the
panel opens. Keep the work inside the host-managed MCP process, without copying
hooks into global settings or creating launchd/cron jobs. Removing the plugin
removes its source from future hook discovery; immediate active-process teardown
and deletion of writable plugin data need native verification.

AIOS Sync currently runs through the [Sync procedure](../../aios-maintain-context/references/sync.md),
under the recorded destination, branch, file scope and push authority. There is
no bundled background autosync. Any later automatic write hook needs opt-in,
reviewed owned paths, conflict handling and the same exact authority; hook trust
alone is not permission to upload all changes. A matching remote commit proves
committed files match at the check time, not that ignored or excluded files
are backed up.

Keep the owner's AIOS home and remote repository on uninstall. Setup's managed
AIOS block in the agent's AGENTS.md is external to the plugin. Remove it only
through an explicitly requested cleanup that verifies the exact owned block
and preserves unrelated or later edits. Do not promise automatic uninstall
cleanup for external settings without a supported lifecycle event.

Cloud-orchestrated ChatGPT Work does not support plugin hooks, including when
tools execute on a local machine. Qualify each receiving surface separately.

Sources checked 1 October 2026: [onboarding metadata](https://developers.openai.com/plugins/deploy/submission#manifest-fields),
[plugin support](https://learn.chatgpt.com/docs/plugins), [bundled plugin lifecycle](https://developers.openai.com/plugins/build/plugins#bundled-mcp-servers-and-lifecycle-hooks)
and [supported hooks and trust](https://learn.chatgpt.com/docs/hooks).

## Keep the guide current

Review this guide when a relevant Codex feature, permission mechanism, plugin
surface or supported key changes. Update the checked date, affected guidance
and observed verification together. This is a maintained document; it does not
start an automation or promise background updates.

Use official sources for current behavior:

- [Configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)
- [Sandbox and approvals](https://learn.chatgpt.com/docs/agent-approvals-security)
- [Plugin extensions](https://developers.openai.com/plugins/build/extensions)
- [Connect and test plugins](https://developers.openai.com/plugins/deploy/connect-chatgpt)

A release can pass its Codex acceptance without waiting for Pi model tests.
Describe other clients' observed compatibility honestly; never turn unavailable
cross-client behavior into a fabricated pass. A diagram editor or optional
workbench is likewise verified only for its selected task.
