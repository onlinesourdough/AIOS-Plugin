![AIOS](assets/branding/aios-banner.png)

# AIOS

AIOS helps your AI assistant plan work, build it, review the result and remember
useful decisions. Install it in the app you use. The same 24 skills work from
one shared source, with native packaging for Codex, Pi, Claude Code, Gemini CLI,
Copilot CLI and Cursor.

Small requests stay small. Larger tasks get a clear outcome, the relevant
specialist method and a review before delivery. Your app still provides the
models, tools and permissions.

## Skill workflows

AIOS connects skills around a useful result. The tables below describe the
implemented methods and their handoffs. An arrow means the next relevant step;
it does not force every task through every skill. Existing decisions carry
forward, small requests stay small, and delivery uses the task's actual authority.

### From an idea to a result

| What you want to do | Skills and handoffs | What you get |
| --- | --- | --- |
| Think through an idea, agent or automation | [Interview](skills/aios-interview/SKILL.md) → [Spec](skills/aios-spec-work/SKILL.md) when execution needs a contract | Shared understanding, challenged assumptions, decisions and a useful next action |
| Complete substantive work | [Spec](skills/aios-spec-work/SKILL.md) → [Build](skills/aios-build-work/SKILL.md) → [Review](skills/aios-review-work/SKILL.md) → [Ship](skills/aios-ship-work/SKILL.md) for authorized delivery | A defined outcome, implemented result, current verification and delivery readback |
| Develop a visual direction | [Design](skills/design/SKILL.md) → [Review Design](skills/review-design/SKILL.md) → implementation through Build when requested | A reusable design direction and selected previews or assets, reviewed against the brief |
| Create or repurpose content | [Content](skills/content/SKILL.md), using [Human Writing](skills/human-writing/SKILL.md) for prose → Content's [final review](skills/content/references/final-review.md) → authorized delivery | A finished piece with evidence, voice and source lineage suited to its use |
| Edit an ordinary video | Content → [Diffusion Studio](skills/diffusion-studio/SKILL.md) → Content's final review → authorized delivery | An edited video, inspected export and the evidence needed for its handoff |
| Start a project or specialist solution | [Create Project](skills/aios-create-project/SKILL.md) or [Create System](skills/aios-create-system/SKILL.md) → the shared work lifecycle | An independent repository or maintained specialist, with its own requirements and verification |

Interview starts when requested, or when material uncertainty at the start of
work makes the direction unclear. A new project or agent alone does not trigger
it. During execution, the assistant asks the necessary question and continues;
a broader interview waits for an appropriate opening. Spec reuses interview
answers rather than starting discovery again.

Design and content can work together when a result needs both. Content owns the
message and production; Design owns visual direction and expressive assets.
The optional [OpenPencil Workbench](skills/openpencil-workbench/SKILL.md) supports
an editable design companion. Diffusion Studio is optional external software;
its skill is included, but the editor is not installed with AIOS. Final content
review is a procedure inside Content, not a separate public skill.

### Setup, context and maintenance

| What you want to do | Skills and handoffs | What you get |
| --- | --- | --- |
| Set up or move your AIOS home | [Setup](skills/aios-setup/SKILL.md), using Interview where context needs exploration → [Maintain Context](skills/aios-maintain-context/SKILL.md) for source routes → [Check](skills/aios-check/SKILL.md) for affected setup proof | A usable home, relevant context, verified chosen connections and a first useful result |
| Keep useful context current | Maintain Context → its [Sync procedure](skills/aios-maintain-context/references/sync.md) only when continuity is explicitly requested | Relevant facts and source pointers; optional scoped backup or restore |
| Create or change a skill | [Manage Skills](skills/aios-manage-skills/SKILL.md) → native authoring or installation → verification, using Check for discovery when relevant | One maintained capability with a known source, placement and recovery path |
| Update or recover a package or specialist | [Update](skills/aios-update/SKILL.md) → native adoption or the specialist's maintenance procedure → Check where applicable | A selected revision with observed installation state and a recovery route |

Setup is the new name for `aios-onboard`; its canonical name is `aios-setup`.
Update explicit shortcuts and callers when adopting this version. The package
does not ship a duplicate Onboard alias. Setup owns installation and readiness;
Interview supplies the reusable conversation. Existing homes resume from known
facts without another foundation interview. Owner formats are unchanged.

### Methods used across workflows

| Skill | When it contributes |
| --- | --- |
| [AIOS](skills/aios/SKILL.md) | Selects relevant owner context and the method for the task; independent repositories start with their local instructions |
| [Write Code](skills/write-code/SKILL.md) | Supplies implementation and review criteria for code of any size, including scripts and automation |
| [Human Writing](skills/human-writing/SKILL.md) | Drafts or revises prose directly, or supports another method's writing |
| [Select Model](skills/aios-select-model/SKILL.md) | Assesses model and reasoning suitability when the remaining work warrants it |
| [Orchestrate Workers](skills/aios-orchestrate-workers/SKILL.md) | Coordinates a justified delegation while the caller retains acceptance |
| [Risky Changes](skills/aios-risky-changes/SKILL.md) | Adds representative proof and recovery planning when real-world consequences warrant them |
| [Triage Improvement](skills/aios-triage-improvement/SKILL.md) | Turns a concrete underlying problem into a scoped, deduplicated improvement action under existing authority |

These are composable methods, not background agents or a workflow engine.
A **System** is a separately maintained specialist solution; a chain of skills
does not need to become a System. The [skill index](docs/skills.md) lists all
24 public entrypoints and their individual responsibilities.

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

Start a fresh Pi session. AIOS is a native Pi skill package; it needs no executable extension.

### Claude Code

```sh
claude plugin marketplace add onlinesourdough/AIOS-Plugin
claude plugin install aios@online-sourdough --scope user
```

Restart Claude Code. You can use ordinary language or call
`/aios:aios-setup` and `/aios:human-writing` directly.

### Gemini CLI

```sh
gemini extensions install https://github.com/onlinesourdough/AIOS-Plugin
```

Review Gemini's installation prompt, then start a fresh session. The extension
contains the same skills and no executable extension code. Selected design and
content tasks can use the helpers supplied with their skills.

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
[Cursor adapter](skills/aios-setup/references/adapter-other.md#cursor).

OpenCode can reference the skill directory through its native `skills.paths`
setting. It currently has no equivalent native installer for this instruction
package, so we do not describe that route as plug and play. See the
[compatibility guide](skills/aios-setup/references/adapter-other.md#opencode).

## Start with a real task

After installation, try:

- “Help me turn this idea into a clear plan.”
- “Interview me about the agent I want to create, so we can find the right scope.”
- “Build the agreed change and review the result.”
- “Design this product idea and prepare it for implementation.”
- “Turn these sources into a finished article.”
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

The **AIOS plugin** is Online Sourdough's shared method. **Your AIOS home**,
normally `~/.AIOS`, is your own context and personal skills. They have separate
owners, locations and update paths.

```mermaid
flowchart TB
    upstream["Online Sourdough / AIOS-Plugin<br/>Reviewed GitHub releases"]
    installed["Each app's local plugin installation<br/>Shared skills + references + overview"]
    agent["Your agent in Codex, Pi or another app<br/>Reads the relevant local files when needed"]
    personal["Your AIOS home: ~/.AIOS<br/>Context + personal skills + source pointers"]
    backup["Optional private GitHub owner repository<br/>Approved owner files only"]
    project["Independent projects and Systems<br/>Own code, instructions and Git history"]
    projectremote["Each project's or System's own remote"]
    upstream -->|"Native install or update in each app"| installed
    installed -->|"Selected method and references"| agent
    personal -->|"Relevant owner context and personal methods"| agent
    personal <-->|"Explicit, approved continuity Sync"| backup
    personal -.->|"Optional source pointers"| project
    project -->|"Local instructions and accepted inputs"| agent
    project <-->|"That repository's own Git workflow"| projectremote
```

| What | Where it belongs | How it moves or updates |
| --- | --- | --- |
| Shared AIOS skills, supporting files and overview | The selected app's plugin installation/cache | Install or update through that app. A fixed tag/commit stays fixed until another is selected. |
| Your facts, memory and connection pointers | `~/.AIOS/AIOS.md`, `MEMORY.md`, `CONNECTIONS.md`, `AIOS_FORMAT` and routed `context/` | Optional continuity Sync to the chosen private repository, within the approved scope. |
| Skills you create and own | Canonical personal folders in `~/.AIOS/skills/`, recorded in the owner skill index | Eligible for owner Sync after review. Each app's discovery registration is configured separately; it is not copied as owner data. |
| Other installed plugins and shared skill libraries | Their native installation or their own source | Their own update route. They do not become personal skills just because a folder is named `skills`. |
| Independent projects and optional Systems | Their own repository, inside or outside the owner home | Their own Git workflow and remote. Owner Sync can carry agreed source indexes, never their nested code/history. |
| Sessions, app settings, credentials and caches | The native app or credential store | Outside owner Sync. Reconnect/configure the destination app through its supported setup. |

**When does owner Sync happen?** When you explicitly request continuity work,
for example “Sync my AIOS to my private GitHub repository,” under the agreed
account, remote, branch, direction and file scope. Existing standing permission
is reused. Plugin installation, ordinary conversations and local edits do not
start a background upload. A local home without Git is fully supported.

Setup helps choose a new home or restore and a continuity destination.
Creating a private repository and the first upload need that action's approval.
On another machine, install the plugin in the chosen app, restore the approved
owner files into an absent or empty home, then register personal skills there.
Existing homes are preserved. See the [Sync procedure](skills/aios-maintain-context/references/sync.md).

Installing AIOS in one app activates it there. It does not install into your
other apps, hide their skills, change your model or connect accounts.

If you want AIOS in another app, install it there too. Both can use the same
owner home when you choose it. The plugin supplies methods; your home holds
your context and personal skills. Updates and removal leave that data intact.
Git backup and persistent routing to a custom home are optional setup choices.

## Context, skills and projects

**Spaces hold context:** the relevant facts and source links for a business,
brand or area of work. **Skills hold methods:** the process, standards and
judgment your assistant uses. **Your app owns projects:** open the workspace
and continue the task there. AIOS needs no second project register.

Design and content are included. The assistant chains the relevant skills from
brief to reviewed result, choosing only the steps the work needs. Design
material belongs in `design/` and content material in `content/` within the
project, created when needed. Finished code and published assets belong where
the project uses them. Existing work stays intact.

The [project template](https://github.com/onlinesourdough/Agentic-Project-Template)
starts a new independent repository from an idea. It supplies local requirements
and verification while AIOS supplies shared methods. The
[system template](https://github.com/onlinesourdough/Agentic-System-Template)
is for an optional specialist with its own maintenance needs. Power BI is one
example: it serves a narrower audience and its Desktop workflow needs Windows,
so it is not bundled with AIOS.

Small helpers for design review, handoff and content validation travel with the
skills. OpenPencil and Diffusion Studio remain optional tools, installed through
their own supported setup when a task needs them. AIOS adds no background service,
install hook or separate tools gateway. Your app keeps control of tool access.

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

The [AIOS overview](docs/aios.md) ships with the plugin and states the
version it describes. The AIOS skill's [documentation route](skills/aios/references/documentation.md)
selects only the local topic needed for a question. These references are not
loaded into every session. AIOS has no documentation or skill runtime on the
Resources domain. Selective reading saves context whether the file is local or
remote; hosting alone does not reduce the tokens of content actually read.
Future standards-based discovery and updates are tracked in [issue #12](https://github.com/onlinesourdough/AIOS-Plugin/issues/12).

Read about the [24 skills](docs/skills.md), [architecture](docs/architecture.md),
[verification](docs/verification.md), [recovery](docs/recovery.md) and
[version history](CHANGELOG.md). GitHub [Releases](https://github.com/onlinesourdough/AIOS-Plugin/releases)
lists published releases. The [release procedure](docs/distribution.md#release-and-adoption)
validates a reviewed version tag before publishing its matching release.
Contributors start with [AGENTS.md](AGENTS.md).
