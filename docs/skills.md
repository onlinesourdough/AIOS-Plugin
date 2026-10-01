# AIOS skills

AIOS ships 24 native skills. Their canonical names use `aios-<method>`, for example `aios-design` and
`aios-build-work`; visible headings use `AIOS-<method>`. The routing entrypoint is
`aios-start`. Explicit syntax depends on the host: use the skill picker or the
canonical name; a host may add its plugin namespace. AIOS does not manufacture
a slash-command alias or a second `aios-` prefix. Automatic selection uses each skill description; explicit
invocation uses the canonical name and native namespace. Setup replaces the
former `aios-onboard` entrypoint with `aios-setup`; update explicit callers on
adoption. Each
carries an independent quoted `metadata.version`; see
[version maintenance](skill-versioning.md). Repository-specific methods, when needed, are separate from the product skills.

| Skill | Responsibility |
| --- | --- |
| [AIOS-design](../skills/aios-design/SKILL.md) | Develop a brief into an implementation-ready design, using discovery or exploration when needed |
| [AIOS-review-design](../skills/aios-review-design/SKILL.md) | Review exact design evidence and prepare a stable handoff |
| [AIOS-openpencil-workbench](../skills/aios-openpencil-workbench/SKILL.md) | Use optional OpenPencil tooling with project-local work |
| [AIOS-content](../skills/aios-content/SKILL.md) | Produce and review content with sources, lineage and reuse evidence when needed |
| [AIOS-diffusion-studio](../skills/aios-diffusion-studio/SKILL.md) | Use optional Diffusion Studio for video production |
| [AIOS-human-writing](../skills/aios-human-writing/SKILL.md) | Default prose drafting and editing that preserves facts, uncertainty and the user’s voice |
| [AIOS-write-code](../skills/aios-write-code/SKILL.md) | Quality and proportionate verification whenever writing or changing code, including scripts and automation; shared criteria for read-only code review |
| [AIOS-start](../skills/aios-start/SKILL.md) | Select relevant context and methods for the current task |
| [AIOS-interview](../skills/aios-interview/SKILL.md) | Explore context, challenge assumptions and find direction when requested or materially needed at the start; no routine interruption of execution |
| [AIOS-build-work](../skills/aios-build-work/SKILL.md) | Implement and verify accepted work through in-scope fixes and Review |
| [AIOS-check](../skills/aios-check/SKILL.md) | Inspect installation, owner format, and discovery |
| [AIOS-create-project](../skills/aios-create-project/SKILL.md) | Start a new independent repository in the chosen workspace |
| [AIOS-project-foundation](../skills/aios-project-foundation/SKILL.md) | Establish and maintain project engineering, code/design, infrastructure and delivery foundations |
| [AIOS-maintain-context](../skills/aios-maintain-context/SKILL.md) | Maintain owner facts, routes, connections, and explicit continuity Sync |
| [AIOS-manage-skills](../skills/aios-manage-skills/SKILL.md) | Manage personal and installed skill lifecycles |
| [AIOS-setup](../skills/aios-setup/SKILL.md) | Set up or move an owner home and native bridge |
| [AIOS-orchestrate-workers](../skills/aios-orchestrate-workers/SKILL.md) | Prepare and recover user-requested workers while preserving the human model choice |
| [AIOS-risky-changes](../skills/aios-risky-changes/SKILL.md) | Assess consequential changes proportionately |
| [AIOS-review-work](../skills/aios-review-work/SKILL.md) | Inspect the final result against its contract; caller acceptance remains separate for delegated work |
| [AIOS-select-model](../skills/aios-select-model/SKILL.md) | Advise on a human model choice when requested or a concrete capability gap needs a decision |
| [AIOS-ship-work](../skills/aios-ship-work/SKILL.md) | Deliver an exactly reviewed result under authority |
| [AIOS-spec-work](../skills/aios-spec-work/SKILL.md) | Resolve a substantive AIOS work contract |
| [AIOS-triage-improvement](../skills/aios-triage-improvement/SKILL.md) | Route a concrete underlying improvement signal |
| [AIOS-update](../skills/aios-update/SKILL.md) | Update selected optional specialists or adopt/roll back AIOS |

Design and content preserve their domain standards through focused references
and helpers. The assistant chains relevant skills using the current task and
its accepted result; no workflow engine or fixed chain schema is required.
Working material stays in the project. Optional tool setup is loaded only for
work that uses that tool.

The [systems and workflow overview](../README.md#agentic-systems-and-skill-chains) connects these entrypoints
by purpose and result. Interview owns adaptive exploration and a shared question
procedure; Setup owns home and harness readiness. Spec reuses interview answers
and owns the execution contract. Neither installation nor a new project alone
requires an interview.

The conditional [Taste source guide](../skills/aios-design/references/taste-sources.md)
links to upstream design/style/image skills and Taste Code's reference catalog.
It adds no installed package or catalog copy. Record the used revision, adapt
selected traits to the task and compare them with the rendered output. The
OpenPencil companion remains available through its existing workbench route.

The desired command is `/aios-design`. Canonical names are `aios-design` and
`aios-write-code`; a host may still add its plugin namespace in its own picker.
The package cannot register a slash-command alias independently of that host. Personal methods keep their owner's chosen name
and use the existing Manage Skills rename/discovery procedure; no AIOS prefix
is required. They remain separate from the distributed package. Shared Review
already owns contextual principles, voice and visual checks; reuse it where a
personal evaluator adds no distinct requirement.

Write code also applies directly to small code requests. Build invokes it for
any code it authors, and Review uses its criteria without editing. It does not
introduce a second lifecycle or require unit tests for every UI change. See the
[implementation and verification record](write-code.md).

Create Project starts a repository without a second AIOS registration. Create
System is retired; Manage Skills owns reusable methods and existing specialist
repositories retain their own lifecycle.
Update owns native package recovery and selected specialist maintenance;
Maintain Context owns facts, and Check observes state. The
[legacy behavior map](../skills/aios-setup/references/legacy-parity.md) records
older method routes. Domain preservation is documented in the
[design](design-preservation.md) and [content](content-preservation.md) maps.
