# AIOS

AIOS helps you turn an idea or a current business need into useful, reviewed
work. It remembers the context you choose to keep, finds the right owner for a
task, and carries substantive work through Spec, Build, Review and authorized
Ship. Small requests stay small.

Install it as a native Codex plugin or Pi package. Both expose the same 11 real
skills. Your facts, preferences and working context live in your own folder,
normally `~/.AIOS`, separately from the installed package.

## Start with your invitation

Open Codex and sign in using its [official getting-started guidance](https://learn.chatgpt.com/docs/app).
Accept your invitation to the private
[Method repository](https://github.com/onlinesourdough/Method) with the GitHub
account that received access. If you already use Pi, the same package supports
its native installation path.

Give your agent the repository link and say:

> Set up AIOS for my current work using https://github.com/onlinesourdough/Method.
> Read its README, install the reviewed AIOS release through the supported native
> package flow, and help me get started. My current focus is …

The agent can resolve an existing reviewed AIOS release or use the exact ref
supplied with your invitation. It should verify access, inspect existing setup,
perform authorized supported installation, then continue adaptive onboarding.
Unreviewed `main` is not the default. If access or an installation control is
missing, it gives one targeted step and verifies the result; never paste a token
into the conversation. Start a fresh conversation when native installation
requires it, then say **“Continue setting up AIOS for my current work.”**

A brief walkthrough can explain the first useful task, context and permission
choices.

If you prefer a terminal, replace `REVIEWED_REF` with that existing reviewed tag
or exact commit. For Codex:

```sh
codex plugin marketplace add onlinesourdough/Method --ref REVIEWED_REF
codex plugin add aios@online-sourdough
```

For Pi:

```sh
pi install git:github.com/onlinesourdough/Method@REVIEWED_REF
```

Use one installation source per harness. For an earlier Method or template AIOS
installation, ask **“Help me adopt this AIOS release while preserving my existing
context.”** The [migration route](plugins/aios/skills/aios-onboard/references/migration.md)
resolves origins and overlapping registrations before activation. Detailed
[native installation and recovery](plugins/aios/skills/aios-onboard/references/adapters.md)
covers existing setups and client-specific controls.

## What happens during setup

AIOS inspects what you already have and asks only for the next useful missing
piece. It uses an available permitted question interface or ordinary
conversation. Known answers and existing privacy choices carry forward.
It creates relevant sourced context and concise memory, verifies the connections
needed for your work, and helps complete a first useful task. An interruption
leaves a checkpoint so you can resume without another interview.

You choose which information to retain and which actions to authorize. Git
backup, external skills and native memory/history are optional. AIOS uses the
harness's existing tools and permissions; installing instructions does not
connect accounts or grant access to your other data.

## Use it in ordinary language

| You want to… | Try… |
| --- | --- |
| Find the next useful result | “What is the main constraint on this launch, and what should we do next?” |
| Clarify an idea | “Spec this idea using what we already know.” |
| Get agreed work done | “Build the accepted change and carry it through review.” |
| Inspect a result | “Review this against the original request and the actual evidence.” |
| Deliver approved work | “Ship this reviewed version to the destination I authorized.” |
| Keep context current | “Keep this decision and its source in my context.” |
| Resume setup | “Continue my AIOS setup from where we stopped.” |

You can also select any skill explicitly. The
[skill guide](docs/skills.md) lists the 11 workforms, including Project/System
creation, update and installation checks. Readiness,
completeness and publish-safety evaluations run at their owning phase gates;
System routing and configured sync are selected when relevant.
Independent repositories keep their own instructions, files and lifecycle.
AIOS does not preload personal context for an unrelated repository task.

## What is included

The package contains instructions and neutral owner-file assets, with no server,
MCP, hooks or consumer scripts. The [architecture](docs/architecture.md) explains
the boundary between the package, your portable context and native configuration.
Optional Global Skills and independent Design/Content Systems are discovered
when a task needs them; their implementations and personal workflows are not
bundled. A client's newsletter, voice corpus and operating principles remain
that client's sources.

Codex and Pi are the target harnesses. Actual installation and fresh-session
behavior must be checked on the receiving client; package validation alone is
not runtime acceptance. No Claude or Hermes compatibility is claimed.
See [current proof and limits](docs/proof.md), [recovery](docs/recovery.md) and
[change history](CHANGELOG.md). Contributors start with [AGENTS.md](AGENTS.md)
and the [release procedure](docs/distribution.md).
