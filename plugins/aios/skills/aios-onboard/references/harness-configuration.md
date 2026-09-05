# Preserve the chosen harness baseline

Use during authorized onboarding or a requested machine/configuration move.
AIOS needs ordinary file tools and its shared skill bodies. Native memories,
Computer Use, Computer History, extra providers and other plugins are optional
extras, never AIOS prerequisites or canonical owner context. Leave an existing
choice unchanged unless the user asks to change it. Do not silently reproduce
another user's unrestricted or always-allow setup for a new client.

For full onboarding, assess relevant config/profile/overrides, supported features,
context management, native Memories/History and privacy choices, tool usability,
and client entry points. Preserve intentional off states. For a scoped repair or
ordinary resume inspect only its affected areas. The [desktop adapter](adapters.md#codex-desktop-entry-point--when-onboarding-or-cutover-affects-it)
separates workspace selection, saved local Projects, cloud environments and sidebar
preferences; none is a substitute for the others.

## Inspect, patch, verify

1. Identify the running harness/version, active user/config home, selected
   profile, launch overrides, workspace trust and managed restrictions. Read
   current official docs and that installed version's help before selecting a
   key. Relevant read-only help includes `codex --help`, `codex features list
   --help`, `codex doctor --help`, `pi --help` and `pi config --help`. Do not
   invoke auth-print commands or dump entire configuration into a transcript.
2. Inspect only relevant nonsecret configuration and effective instructions.
   Compare configured values with runtime-reported settings, advertised tools
   and actual permissions. A file value, feature flag or installed plugin is
   not proof of a usable capability. Report overridden, unavailable and
   unverified states separately. Preserve the user's existing model/provider.
3. Prepare a small diff naming the supported owned keys or registration entries,
   their current value, intended value and existing authorization. Preserve
   comments, unrelated keys, unknown fields and the rest of each instruction
   file. Back up the affected nonsecret content and its source identity in
   protected local evidence. If a file contains credentials, retain only the
   necessary nonsecret preimages and file hash; do not copy the credentials.
4. Re-read the target before patching. A baseline mismatch or ambiguous override
   stops the write with both versions retained. Apply only the reviewed key or
   marker spans, using the native supported control when the setting is UI-only.
   Never rewrite config.toml/settings.json wholesale or edit opaque app state,
   databases, tokens, keychains, permission stores or provider credentials.
5. Parse/read back the changed config, compare the scoped diff, then verify the
   effective choice in a fresh session. Restore only affected spans still equal
   to the just-written values; preserve later edits on conflict. An identical
   replay is a no-op. Record capability proof independently of config readback.

Classify legacy references before any cleanup: active configuration/discovery,
current routes, or historical/recovery text. An old name in an archive is not an
active setting. Preserve history and recovery; change only verified active stale
references in scope. Read-only diagnostic app state may explain disagreement,
but an undocumented JSON key is not a supported writable setting. Use an exact
supported mutation and readback, or retain a precise manual/unavailable gate.

## Protection and coverage — when relevant to the requested change

Instructions guide decisions. Native permissions/sandbox restrict execution;
pre-execution hooks can intercept supported calls. These are separate controls.
Full Access is not isolation for active security tests. No AIOS hook, denylist
or adapter is installed, and optional Global Skills stay a separate product.

When an existing hook or permission boundary matters, record the harness/version,
execution host, effective tool coverage, trust state and observed deny/allow
behavior. Use current [Codex hooks](https://learn.chatgpt.com/docs/hooks),
[native permissions](https://learn.chatgpt.com/docs/agent-approvals-security) or
[Pi extensions](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md)
and the installed implementation. Do not infer worker/cloud coverage from a
local setup. Shell matchers do not cover every tool, interpreter, interactive
stdin or extension execution path. Regex can miss obfuscation and block harmless
argument text; it is an accident barrier, not a complete security boundary.

Test missing files, malformed rules, handler errors/timeouts and changed trust
with harmless probes in an authorized isolated fixture. Label whether failure
blocks execution (fail-closed) or permits it (fail-open); never claim protection
from a configured flag alone. If required protection is absent or fails, stop
the affected action. Missing optional protection does not block ordinary AIOS.
Do not repair gaps by bypassing hook trust or broadening permissions. A native
trust change needs its own existing authority and supported review flow; do not
edit trust stores. Keep rule/code versions and affected rechecks with their owner,
not a second AIOS-managed protection service.

## Codex configuration and instructions

Resolve `CODEX_HOME` when configured; otherwise use `~/.codex/config.toml`.
Inspect the active profile, command-line overrides, trusted project config and
app/session selections before assuming that file controls the current run.
Managed policy may restrict user choices. Check effective global/local
AGENTS.md and AGENTS.override.md separately from config; preserve existing
instruction precedence. Use the current [config basics](https://learn.chatgpt.com/docs/config-file/config-basic)
for the running client's loading order, rather than hard-coding one order for
all versions. Existing profiles and provider definitions are not AIOS assets.

| Area | Inspect and preserve | Change/verification boundary |
| --- | --- | --- |
| Command approvals | `approval_policy` and any active approval profile/overrides | `never` changes prompting, not business authorization or OS permission. Only reproduce it when the user's chosen baseline calls for it. |
| Filesystem/network access | `sandbox_mode` or the version's supported permission-profile mechanism | `danger-full-access` is an explicit unrestricted choice, never an onboarding default. Do not mix incompatible mechanisms or bypass managed constraints. Verify actual access to the chosen home. |
| Models/providers | Effective model, provider, reasoning/profile and existing nonsecret definitions | Keep them. Do not install a provider, migrate credentials, infer a better model or pin a personal choice in AIOS. |

Check key support and allowed values against the current
[configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)
and local help. Do not convert one client's access settings into another
client's unrelated always-allow controls. Technical access never grants a send,
publish, payment or broader destination authorization.

## Codex context-management notes — optional experimental opt-in

When the user wants native context continuity, the
[official configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)
documents notes and searchable task history as experimental context management.
As checked 2026-09-05, it is off by default and requires ChatGPT sign-in on
Plus, Pro or Pro Lite. Recheck eligibility and installed-client support before
offering this scoped config.toml change, and apply only with explicit opt-in:

```toml
[features.context_management]
experimental_mode = true
```

Use the scoped inspect/patch/verify procedure above; reconcile an existing
features table rather than appending conflicting TOML. Preserve model/provider,
unrelated keys and existing choices. Check effective configuration and, in a
fresh eligible task, actual feature availability. CLI recognition or a true
flag does not prove that the active desktop task exposes notes/history; report
that capability NOT VERIFIED until observed. Do not force compaction or inspect
private history merely to manufacture proof.

These task-context facilities are separate from cross-chat Memories and
Computer History. They neither enable those options nor replace portable AIOS.md,
MEMORY.md and routed owner context. AIOS works without them. This is Codex-only
guidance: do not translate the key into Pi settings or introduce a runtime shim.

## Native memories — optional

Inspect the effective `features.memories` flag and supported
`memories.generate_memories`, `memories.use_memories` and relevant source-scope
settings, plus the app's Personalization controls and per-chat `/memories`.
The per-chat choice can differ from global settings. If legacy keys exist,
verify their supported meaning before replacing them; do not add both old and
new flags to guess at compatibility. Use `codex features list` only to inspect
known/effective feature state, not as proof that a background memory pass ran.
Preserve an off choice; enabling requires user intent. A chosen off state
does not require deleting generated memory or session files. Do not copy those
stores into AIOS or rely on editing them to control the feature.
[Native memory controls](https://learn.chatgpt.com/docs/customization/memories)
are separate from AIOS's sourced MEMORY.md and context files.

## Computer Use — optional, several permission layers

Inspect whether the native Computer Use integration/plugin is available and
enabled, then separately inspect allowed applications and browser/site scope.
Plugin enablement does not approve every app or site. Preserve existing scoped
approvals; any new persistent or all-app/all-site approval must be the user's
deliberate choice. File/shell access policy remains a separate layer.

On supported macOS installations the native UI can require Screen Recording
and Accessibility permissions. Inspect System Settings > Privacy & Security
and the app's Computer Use controls using the current
[Computer Use guide](https://learn.chatgpt.com/docs/computer-use). Do not alter
OS permission databases or create a proxy/MCP replacement. Enabling an existing
native integration is an optional harness action, not a new AIOS runtime.
Verify the advertised tool and one authorized harmless app interaction before
claiming availability; a configured flag alone is insufficient. If native UI
access is unavailable, return the exact per-machine manual step and continue
core AIOS using file tools.

An explicit native Computer Use denial for an app, including the Codex app, is
an access boundary. Do not bypass it with another automation surface, changed
app identity, OS permissions or app-database/internal-state edits. Distinguish
that denial from an absent UI tool. Use an independently supported native action
only within its own permissions; otherwise leave the affected UI action for the
user with a precise step and later readback. Do not attempt equivalent automation
to evade the denial. A permitted read-only diagnostic is not mutation authority.

## Computer History — optional, explicit personal opt-in

Inspect the native Computer History control independently of Computer Use.
Keep an off choice off. Workspace availability is not personal consent; the
user must choose opt-in and contributing apps/sites. The current macOS flow is
Settings > Integrations > Computer history, with include-only/exclude source
controls. It requires native Memories; do not enable either automatically to
complete AIOS. History does not require the Computer Use Screen Recording grant.

Use the current [Computer History guide](https://learn.chatgpt.com/docs/customization/computer-history)
for that client's availability and controls. Verify the visible setting and
chosen source scope; do not invent a config.toml key or copy opaque app/history
state. Availability, opt-in, source permission and observed collection are
separate claims. Do not collect personal activity just to test setup. If an
owner-authorized synthetic verification is unavailable, label collection NOT
VERIFIED and leave core AIOS usable. History is never canonical AIOS context.

## Pi settings and existing registrations

Resolve `PI_CODING_AGENT_DIR` or the native default `~/.pi/agent`. Inspect global
settings.json, applicable trusted `.pi/settings.json`, launch flags and loaded
AGENTS/override files. Preserve `defaultProvider`, `defaultModel`,
`defaultThinkingLevel`, existing packages, resource selections and custom
fields. Do not translate Codex sandbox/approval keys into Pi. Pi project trust
is a different control; changing `defaultProjectTrust` to always or approving
an entire parent tree must be an explicit owner choice, not a hidden setup step.
Use [Pi settings](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/settings.md)
and installed help for supported settings and native controls. Never read or
export auth stores to prove provider configuration.

Inventory enabled package/skill registrations before adding AIOS or owner
skills: old AIOS paths, duplicate local/Git AIOS installs, stale symlinks,
global skill paths and project-local registrations can conflict. Classify
which entry owns each discovered skill. Under setup authority, replace only
the verified obsolete AIOS/legacy registration, preserving original bodies,
nonreserved owner methods and unrelated packages. Unknown collisions require
a decision. Re-read the effective skill list after restart: the 11 AIOS names
once, owner methods once, supported links intact. See [adapters](adapters.md), [identity/collision migration](migration.md)
and [owner-method migration](data.md).

## Return a small baseline checklist

Report per relevant area: preserved or requested change; authoritative config/UI source;
effective state; verified capability or NOT VERIFIED; rollback evidence; and
one manual step if unavailable. Include the relevant approvals/access, memory, Computer
Use app/site and OS permissions, History opt-in/sources, provider/model,
Pi settings and legacy-registration collisions. Never include secrets or
personal baseline values in distributable docs. Unknown optional settings do
not block a useful AIOS task; an unsafe requested config write remains held.

Documentation and runtime help checked 2026-09-04. Recheck at installation;
support varies by version, account and machine. This checklist supplies no
runtime scripts, proxy, MCP server or automatic configuration policy.
