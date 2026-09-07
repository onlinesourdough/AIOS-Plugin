# Architecture

AIOS is one instruction package with two native distribution declarations and
one shared skill source. It does not own a model runner, worker service,
permission system or client account data.

| Boundary | Canonical content | Responsibility |
| --- | --- | --- |
| `skills/` and root `.codex-plugin/` | 14 skill entrypoints, focused references and thin native metadata/assets | One reusable payload; harness adapters point here rather than copy methods |
| `.agents/plugins/marketplace.json` | `aios@online-sourdough` pointing at the repository plugin root | Codex native package discovery |
| `package.json` | `pi.skills` pointing at the same root bodies | Pi native resource discovery; no extensions or dependencies |
| Chosen owner home, new default `~/.AIOS` | AIOS.md, AIOS_FORMAT, MEMORY.md, CONNECTIONS.md and routed context/registries | Client-owned facts, decisions, access scope and pointers |
| Thin native AGENTS bridge | Resolved physical owner route and independent-repository guard | Entry routing without copying personal data into instructions |
| Independent System/Project repositories | Local AGENTS, implementation, lifecycle, proof and recovery | Their own canonical operational truth |
| Native harness | Tools, permissions, credentials, sessions, configuration and UI | Actual capability and execution; the package cannot grant it |

AIOS_FORMAT remains the plain integer `1`; the next candidate product version is
`0.3.0` and is not a published release claim.
A name migration is explicit and never inferred from a format number. The
[compatibility map](../skills/aios-onboard/references/migration.md)
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

The [14 public skills](skills.md) are the core method surface. Detailed
procedures have one canonical owner and are linked only when relevant. Spec,
Build, Review and authorized Ship retain one outcome and one accountable
repository writer; the native harness must prove actual initial-root capability.

Native [Manage Skills](../skills/aios-manage-skills/SKILL.md) owns the complete
personal and installed capability lifecycle: creation/change decisions,
placement, registration, discovery, adoption, update, removal and rollback.
Onboard and ordinary skill changes call its single
[personal-skill procedure](../skills/aios-manage-skills/references/owner-skills.md);
Check observes its acceptance criteria without owning a repair copy. Maintain
context keeps owner facts and configured Git sync, while the native Skill
Creator keeps authoring mechanics.
When a lead actually plans, launches or recovers a worker, native
[worker orchestration](../skills/aios-orchestrate-workers/SKILL.md)
owns the worker prompt, route, root, one-writer, proof and handback boundary.
When Review or the lead identifies a concrete underlying signal, native
[improvement triage](../skills/aios-triage-improvement/SKILL.md)
owns its sanitized, deduplicated and authorized issue action. Both are
conditional procedures; neither creates a worker or external runtime.
Skill authoring uses the available native Skill Creator. No background watcher
or consumer helper is introduced.

External Global Skills, such as clarification or offer-shaping methods, are
independently owned optional capabilities. Skill management is now an AIOS
owner-level route; other Global methods are not copied into this package.
Native worker orchestration cannot create a runtime surface
or weaken the lifecycle boundary. An optional clarification method does not
replace adaptive onboarding with a questionnaire.
A skill-library UI is not a worker runtime; its development skills stay local.

Portability means that the same AIOS home and canonical `skills/` source can be
adopted by another harness later through that harness's supported entrypoint.
The current package verifies Codex and Pi; it does not install adapters for
every harness, claim identical model behavior, or add a universal loader. A
cross-harness worker handoff carries the accepted outcome, bounded context,
exact root and authority, evidence and remaining signals; the receiving
harness still performs its own capability and permission checks.

Design and Content Systems are registered independent routes, not bundled
implementations or required setup dependencies. Personal workflows, newsletters,
voice corpora and client operating principles also remain outside the product.
Relevant neutral quality checks live in Review and take values from selected
client sources. No always-on evaluator daemon or wrapper runtime is introduced.

## Author repository

`.agents/skills/` owns this repository's development lifecycle and is excluded
from consumer product-skill discovery even if those files exist physically in a
native package cache. `tests/` contains author-only validators and
isolated rehearsals. `docs/` records architecture, current proof and historical
evidence. Neither author helpers nor test fixtures become consumer runtime.
Git history and [archived records](archive/0.1.x/README.md) preserve previous
releases. Active instructions use AIOS; old identifiers appear only where a
compatibility procedure or historical fact requires them.
