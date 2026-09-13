![AIOS](assets/branding/aios-banner.png)

# AIOS

AIOS helps your AI assistant plan work, build it, review the result and remember
useful decisions. Install it in the app you use. The same 17 skills work from
one shared source, with native packaging for Codex, Pi, Claude Code, Gemini CLI,
Copilot CLI and Cursor.

Small requests stay small. Larger tasks get a clear outcome, the relevant
specialist method and a review before delivery. Your app still provides the
models, tools and permissions.

## Install in your app

AIOS is currently available by invitation. Accept your GitHub invitation and
make sure your app can access this repository through your normal Git setup.
Never paste access tokens into a chat.

Choose one of the routes below. These commands follow the repository's current
`main` branch. For a fixed version, select a reviewed tag or commit using the
[installation guide](docs/native-installation.md).

### Codex

```sh
codex plugin marketplace add onlinesourdough/AIOS-Plugin
codex plugin add aios@online-sourdough
```

Once the marketplace is available, you can also install AIOS from Codex's plugin
browser. Start a fresh task after installation.

### Pi

```sh
pi install git:github.com/onlinesourdough/AIOS-Plugin
```

Start a fresh Pi session. AIOS is a native Pi package containing skills; it needs
no executable extension.

### Claude Code

```sh
claude plugin marketplace add onlinesourdough/AIOS-Plugin
claude plugin install aios@online-sourdough --scope user
```

Restart Claude Code. You can use ordinary language or call
`/aios:aios-onboard` and `/aios:human-writing` directly.

### Gemini CLI

```sh
gemini extensions install https://github.com/onlinesourdough/AIOS-Plugin
```

Review Gemini's installation prompt, then start a fresh session. The extension
contains the same skills and no executable extension code.

### Copilot CLI

```sh
copilot plugin marketplace add onlinesourdough/AIOS-Plugin
copilot plugin install aios@online-sourdough
```

This uses Copilot's documented support for Claude-compatible plugin metadata.
It has not been tested locally.

### Cursor and other apps

Cursor supports AIOS's portable plugin format. For private distribution, add
the repository through a **Teams or Enterprise marketplace**, then install AIOS
from **Customize**. AIOS is not listed in Cursor's public marketplace, and this
installation route has not been tested locally. See the
[Cursor adapter](skills/aios-onboard/references/adapter-other.md#cursor).

OpenCode can reference the skill directory through its native `skills.paths`
setting. It currently has no equivalent native installer for this instruction
package, so we do not describe that route as plug and play. See the
[compatibility guide](skills/aios-onboard/references/adapter-other.md#opencode).

## Start with a real task

After installation, try:

- “Help me turn this idea into a clear plan.”
- “Build the agreed change and review the result.”
- “Make this draft easier to understand without losing its meaning.”
- “Set up AIOS for my work. My current focus is …”

You can use the shared work methods immediately. Setting up your personal
context is a separate conversation: AIOS reuses an existing home or helps you
create one, normally at `~/.AIOS`. A custom location is also supported. No owner
home or global instruction edit is required just to install the plugin.

The bundled [human-writing](skills/human-writing/SKILL.md) skill is the default
for substantial writing and editing across formats: articles, blogs, reports,
emails, web copy and more. It makes the meaning easy to follow, keeps the text
as short as understanding allows, and preserves your voice, facts and necessary
detail. It adds no separate approval step.

## What is shared

Installing AIOS in one app activates it there. It does not install into your
other apps, hide their skills, change your model or connect accounts.

If you want AIOS in another app, install it there too. Both can use the same
owner home when you choose it. The plugin supplies methods; your home holds
your context and personal skills. Updates and removal leave that data intact.
Git backup and persistent routing to a custom home are optional setup choices.

Projects and Systems keep their own instructions and specialist methods.
Shared Spec, Build, Review and Ship come from AIOS. Open a repository and work
in the current task; unrelated code work does not load personal context.
Design and content Systems remain optional, separately owned capabilities.
Their integration into AIOS is being considered, not included in this release.

## Update or remove

Use the same app and installation scope you originally chose. Finish active
work before changing its methods.

| App | Update | Remove |
| --- | --- | --- |
| Codex | Refresh the AIOS marketplace, then reinstall its AIOS entry; see the guide below for pinned sources | `codex plugin remove aios@online-sourdough` |
| Pi | `pi update --extension git:github.com/onlinesourdough/AIOS-Plugin` for a tracking install | `pi remove git:github.com/onlinesourdough/AIOS-Plugin` |
| Claude Code | `claude plugin marketplace update online-sourdough`, then `claude plugin update aios@online-sourdough --scope user` | `claude plugin uninstall aios@online-sourdough --scope user` |
| Gemini CLI | `gemini extensions update aios` | `gemini extensions uninstall aios` |
| Copilot CLI | `copilot plugin marketplace update online-sourdough`, then `copilot plugin update aios@online-sourdough` | `copilot plugin uninstall aios@online-sourdough` |
| Cursor | Refresh the selected marketplace and manage AIOS in Customize | Remove AIOS in Customize |

Pinned versions and local sources need their own update selection. In Pi, use
the exact registered source from `pi list` when removing a pinned install.
See [native installation, recovery and tested limits](docs/native-installation.md)
before replacing an existing registration. A separately configured owner bridge
is not removed by the package manager.

## More

Read about the [17 skills](docs/skills.md), [architecture](docs/architecture.md),
[verification](docs/verification.md), [recovery](docs/recovery.md) and
[version history](CHANGELOG.md). GitHub [Releases](https://github.com/onlinesourdough/AIOS-Plugin/releases)
lists published releases; a source version alone does not create a release tag.
Contributors start with [AGENTS.md](AGENTS.md).
