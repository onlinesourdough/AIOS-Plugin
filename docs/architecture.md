# Architecture

AIOS is one instruction package with two native distribution declarations and
one shared skill source. It does not own a model runner, worker service,
permission system or client account data.

| Boundary | Canonical content | Responsibility |
| --- | --- | --- |
| `plugins/aios/skills/` | 11 skill entrypoints, focused references and neutral owner assets | Reusable methods, portable to the target harnesses |
| `.agents/plugins/marketplace.json` and plugin manifest | `aios@online-sourdough` and shared skill path | Codex native package discovery |
| `package.json` | `pi.skills` pointing at the same bodies | Pi native resource discovery; no extensions or dependencies |
| Chosen owner home, new default `~/.AIOS` | AIOS.md, AIOS_FORMAT, MEMORY.md, CONNECTIONS.md and routed context/registries | Client-owned facts, decisions, access scope and pointers |
| Thin native AGENTS bridge | Resolved physical owner route and independent-repository guard | Entry routing without copying personal data into instructions |
| Independent System/Project repositories | Local AGENTS, implementation, lifecycle, proof and recovery | Their own canonical operational truth |
| Native harness | Tools, permissions, credentials, sessions, configuration and UI | Actual capability and execution; the package cannot grant it |

AIOS_FORMAT remains the plain integer `1`; the product version is `0.2.0`.
A name migration is explicit and never inferred from a format number. The
[compatibility map](../plugins/aios/skills/aios-onboard/references/migration.md)
owns old OSM marker/package and template AIOS adoption.

## Context and isolation

The owner home has a small route index and selective detail. Space means
business/domain context, not an execution owner. System means reusable
specialist capability with independent truth. Project means a bounded result
with independent development, operation or handover. One-off work stays with
the owner task. There is no mandatory folder or Project per content item.

The global bridge recognizes the configured physical owner home even when it
is Git-backed. Independent repository requests start from local instructions
and accepted inputs. No owner-context AGENTS file is installed above nested
repositories. Only a concrete, account-authorized gap expands context reads.
Nested checkouts keep their own Git and recovery and are excluded from optional
owner-data Git while registry files remain trackable.

## Core methods and optional capabilities

The [11 public skills](skills.md) are the core method surface. Detailed
procedures have one canonical owner and are linked only when relevant. Spec,
Build, Review and authorized Ship retain one outcome and one accountable
repository writer; the native harness must prove actual initial-root capability.

External Global Skills, such as orchestration, clarification, skill management
or offer-shaping methods, are independently owned optional capabilities. They
were not among the 17 legacy AIOS methods and are not copied into this package.
An orchestration skill cannot create a runtime surface or weaken the lifecycle
boundary. Its absence alone does not block suitable native work. An optional
clarification method does not replace adaptive onboarding with a questionnaire.
A skill-library UI is not a worker runtime; its development skills stay local.

Design and Content Systems are registered independent routes, not bundled
implementations or required setup dependencies. Personal workflows, newsletters,
voice corpora and client operating principles also remain outside the product.
Relevant neutral quality checks live in Review and take values from selected
client sources. No always-on evaluator daemon or wrapper runtime is introduced.

## Author repository

`.agents/skills/` owns this repository's development lifecycle and is excluded
from consumer skill discovery. `tests/` contains author-only validators and
isolated rehearsals. `docs/` records architecture, current proof and historical
evidence. Neither author helpers nor test fixtures become consumer runtime.
Git history and [archived records](archive/0.1.x/README.md) preserve previous
releases. Active instructions use AIOS; old identifiers appear only where a
compatibility procedure or historical fact requires them.
