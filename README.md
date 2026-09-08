![AIOS](assets/branding/aios-banner.png)

# AIOS

AIOS helps your AI assistant work with your context, remember useful decisions
and carry work from an idea to a reviewed result. It works in Codex and Pi.

Use it to plan a launch, develop a project, review a draft or pick up where you
left off. Small requests stay small. For larger work, AIOS helps clarify what
you want, build it and check the result before delivery.

## Get started

AIOS is currently available by invitation. Accept your GitHub invitation, then
give your assistant this message:

> Help me set up AIOS using https://github.com/onlinesourdough/AIOS-Plugin.
> Use the latest release, preserve any existing setup and help me get started.
> My current focus is …

Your assistant checks access and installation, asks for the context it needs
and helps you complete a first task. If you need to start a fresh conversation
after installation, say “Continue setting up AIOS.”

[Codex](https://learn.chatgpt.com/docs/app) and Pi are the currently verified
native routes. AIOS keeps one owner home and method source so onboarding can
later resolve another harness's supported entrypoint; that adapter still needs
[verification](skills/aios-onboard/references/adapter-portability.md).
You also need GitHub access to this repository. Never paste access tokens into
the chat.

### Install from a terminal

Choose a tag from [Releases](https://github.com/onlinesourdough/AIOS-Plugin/releases)
and replace `RELEASE_TAG` below with it.

For Codex:

```sh
codex plugin marketplace add onlinesourdough/AIOS-Plugin --ref RELEASE_TAG
codex plugin add aios@online-sourdough
```

For Pi:

```sh
pi install git:github.com/onlinesourdough/AIOS-Plugin@RELEASE_TAG
```

Use one installation source in each app. If you already have AIOS installed,
ask your assistant to update it while preserving your context. See the
[installation and recovery guide](skills/aios-onboard/references/adapters.md)
for existing setups.

## Work in ordinary language

You do not need to remember skill names. Try:

- “What should I focus on next, given my current projects?”
- “Help me turn this idea into a clear plan.”
- “Build the agreed change and review the result.”
- “Review this draft against what we wanted to achieve.”
- “Remember this decision and where it came from.”
- “Turn this workflow into a personal skill I can reuse.”

AIOS includes [15 skills](docs/skills.md) for everyday work, setup, updates and
keeping your context current. Your repositories keep their own development
instructions; unrelated code work does not need your personal context.

### Package layout

```text
skills/          15 shipped AIOS product skills shared by Codex and Pi
.agents/skills/  six repository development methods; not exposed as product skills
```

The root `skills/` directory is the single packaged source. The developer
methods may exist physically in a package cache with the repository, but native
AIOS discovery does not expose or load them as product skills. Create Project
and Create System remain separate shipped skills.

## Your context stays yours

Your context and personal skills live in a folder you control, normally
`~/.AIOS`, separately from the plugin. You choose what to keep and which
connections or actions to allow. Git backup is optional.

Installing AIOS does not connect accounts or grant access to other data. It
uses the tools and permissions already available in your app.

## More

[Releases](https://github.com/onlinesourdough/AIOS-Plugin/releases) contains version
history and update notes. For technical details, see [architecture](docs/architecture.md),
[verification and known limits](docs/verification.md), or [recovery](docs/recovery.md).
Contributors start with [AGENTS.md](AGENTS.md).
