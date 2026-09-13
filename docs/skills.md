# AIOS skills

AIOS ships 23 native skills. Automatic selection uses each skill description;
explicit selection uses its name. Each carries an independent quoted
`metadata.version`; see [version maintenance](skill-versioning.md). Repository development methods in
`.agents/skills/` are separate and are not product skills.

| Skill | Responsibility |
| --- | --- |
| [design](../skills/design/SKILL.md) | Develop a brief into an implementation-ready design, using discovery or exploration when needed |
| [review-design](../skills/review-design/SKILL.md) | Review exact design evidence and prepare a stable handoff |
| [openpencil-workbench](../skills/openpencil-workbench/SKILL.md) | Use optional OpenPencil tooling with project-local work |
| [content](../skills/content/SKILL.md) | Produce and review content with sources, lineage and reuse evidence when needed |
| [diffusion-studio](../skills/diffusion-studio/SKILL.md) | Use optional Diffusion Studio for video production |
| [human-writing](../skills/human-writing/SKILL.md) | Default prose drafting and editing that preserves facts, uncertainty and the user’s voice |
| [write-code](../skills/write-code/SKILL.md) | Quality and proportionate verification whenever writing or changing code, including scripts and automation; shared criteria for read-only code review |
| [aios](../skills/aios/SKILL.md) | Select relevant context and methods for the current task |
| [aios-build-work](../skills/aios-build-work/SKILL.md) | Implement specified AIOS work for lead Review |
| [aios-check](../skills/aios-check/SKILL.md) | Inspect installation, owner format, and discovery |
| [aios-create-project](../skills/aios-create-project/SKILL.md) | Start a new independent repository in the chosen workspace |
| [aios-create-system](../skills/aios-create-system/SKILL.md) | Establish an optional separately maintained specialist |
| [aios-maintain-context](../skills/aios-maintain-context/SKILL.md) | Maintain owner facts, routes, connections, and explicit continuity Sync |
| [aios-manage-skills](../skills/aios-manage-skills/SKILL.md) | Manage personal and installed skill lifecycles |
| [aios-onboard](../skills/aios-onboard/SKILL.md) | Set up or move an owner home and native bridge |
| [aios-orchestrate-workers](../skills/aios-orchestrate-workers/SKILL.md) | Prepare and recover delegated workers when the caller retains coordination and acceptance |
| [aios-risky-changes](../skills/aios-risky-changes/SKILL.md) | Assess consequential changes proportionately |
| [aios-review-work](../skills/aios-review-work/SKILL.md) | Independently accept or revise substantive work |
| [aios-select-model](../skills/aios-select-model/SKILL.md) | Assess remaining judgment and select model/reasoning for the accepted work; return capability/cost evidence to the shared task decision |
| [aios-ship-work](../skills/aios-ship-work/SKILL.md) | Deliver an exactly reviewed result under authority |
| [aios-spec-work](../skills/aios-spec-work/SKILL.md) | Resolve a substantive AIOS work contract |
| [aios-triage-improvement](../skills/aios-triage-improvement/SKILL.md) | Route a concrete underlying improvement signal |
| [aios-update](../skills/aios-update/SKILL.md) | Update selected optional specialists or adopt/roll back AIOS |

Design and content preserve their domain standards through focused references
and helpers. The assistant chains relevant skills using the current task and
its accepted result; no workflow engine or fixed chain schema is required.
Working material stays in the project. Optional tool setup is loaded only for
work that uses that tool.

Write code also applies directly to small code requests. Build invokes it for
any code it authors, and Review uses its criteria without editing. It does not
introduce a second lifecycle or require unit tests for every UI change. See the
[implementation and verification record](write-code.md).

Create Project starts a repository; Create System establishes an optional
specialist with separate upkeep. Neither creates a mandatory AIOS registration.
Update owns native package recovery and selected specialist maintenance;
Maintain Context owns facts, and Check observes state. The
[legacy behavior map](../skills/aios-onboard/references/legacy-parity.md) records
older method routes. Domain preservation is documented in the
[design](design-preservation.md) and [content](content-preservation.md) maps.
