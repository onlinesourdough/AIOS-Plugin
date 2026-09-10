# AIOS skills

AIOS ships 16 native skills. Automatic selection uses each skill description;
explicit selection uses its name. Repository development methods in
`.agents/skills/` are separate and are not product skills.

| Skill | Responsibility |
| --- | --- |
| [aios](../skills/aios/SKILL.md) | Coordinate owner priorities, scoped AIOS documentation questions, and route work |
| [aios-build-work](../skills/aios-build-work/SKILL.md) | Implement specified AIOS work for lead Review |
| [aios-check](../skills/aios-check/SKILL.md) | Inspect installation, owner format, and discovery |
| [aios-create-project](../skills/aios-create-project/SKILL.md) | Create and register an independent Project |
| [aios-create-system](../skills/aios-create-system/SKILL.md) | Create and register an independent System |
| [aios-maintain-context](../skills/aios-maintain-context/SKILL.md) | Maintain owner facts, routes, connections, and explicit continuity Sync |
| [aios-manage-skills](../skills/aios-manage-skills/SKILL.md) | Manage personal and installed skill lifecycles |
| [aios-onboard](../skills/aios-onboard/SKILL.md) | Set up or move an owner home and native bridge |
| [aios-orchestrate-workers](../skills/aios-orchestrate-workers/SKILL.md) | Prepare and recover delegated workers when the caller retains coordination and acceptance |
| [aios-risky-changes](../skills/aios-risky-changes/SKILL.md) | Assess consequential changes proportionately |
| [aios-review-work](../skills/aios-review-work/SKILL.md) | Independently accept or revise substantive work |
| [aios-select-model](../skills/aios-select-model/SKILL.md) | Assess remaining judgment, select model/reasoning and who continues; own portable handoff or authorized whole-task transfer |
| [aios-ship-work](../skills/aios-ship-work/SKILL.md) | Deliver an exactly reviewed result under authority |
| [aios-spec-work](../skills/aios-spec-work/SKILL.md) | Resolve a substantive AIOS work contract |
| [aios-triage-improvement](../skills/aios-triage-improvement/SKILL.md) | Route a concrete underlying improvement signal |
| [aios-update](../skills/aios-update/SKILL.md) | Update selected upstream Systems or adopt/roll back a reviewed native package |

Create Project and Create System remain separate because their ownership and
handoff differ. Update owns package identity/rollback and the separate canonical System-code
maintenance procedure; Maintain Context owns
client facts; Check observes installed state. The shipped
[legacy behavior map](../skills/aios-onboard/references/legacy-parity.md) records
where retired method responsibilities moved.
