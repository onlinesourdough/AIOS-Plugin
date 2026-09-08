# Legacy behavior and current public routes

This is a behavior map, not a requirement to ship one entry per old file.
The 17 core template methods were inspected separately from optional external
Global Skills. The current package exposes fifteen native workforms; smaller
checks and conditional procedures live with the workform that owns them.
Client facts and personal methods are not copied into this package.

| Legacy method | Public route and canonical procedure | Disposition and preserved behavior |
| --- | --- | --- |
| aios | [aios](../../aios/SKILL.md), [Onboard](../SKILL.md), [Check](../../aios-check/SKILL.md), [Maintain context](../../aios-maintain-context/SKILL.md), [Update](../../aios-update/SKILL.md) | Split by trigger: owner coordination and shortest justified route stay in `aios`; setup/resume, state inspection, context mutation and package adoption each use their focused owner; independent repositories remain local-first |
| aios-build-work | [Build](../../aios-build-work/SKILL.md) | Keep: correctly launched first-class root worker, one writer, linked lead/worker goals when explicitly required, bounded contract, relevant local checks and evidence |
| aios-create-project | [Create Project](../../aios-create-project/SKILL.md) | Keep: distinct bounded-owner request, registered live seed, seed-owned final-root creation interface, fresh independent history and proof-based registration |
| aios-create-system | [Create System](../../aios-create-system/SKILL.md) | Keep: distinct reusable-owner request, registered live neutral seed, seed-owned adoption interface, no inherited history, concrete primary route and registration proof |
| aios-evaluate-completeness | [Review](../../aios-review-work/SKILL.md), [final completeness](../../aios-review-work/references/completeness.md) | Embed: explicit requirement-to-final-evidence gate before done; also used proportionately by ordinary AIOS handback and Ship reconciliation |
| aios-evaluate-publish-safety | [Ship](../../aios-ship-work/SKILL.md), [final action check](../../aios-ship-work/references/publish-safety.md) | Embed: exact content, identity, authority, privacy, claims and commitments checked last before effect |
| aios-evaluate-spec-work | [Spec](../../aios-spec-work/SKILL.md), [readiness](../../aios-spec-work/references/readiness.md) | Embed: explicit pre-Build gate for maturity, evidence, source preservation, local invariants and bounded READY contract |
| aios-onboard | [Onboard](../SKILL.md) | Keep: adaptive new setup or resume, sourced context, first useful result and native readback |
| aios-review-work | [Review](../../aios-review-work/SKILL.md) | Keep: independent lead PASS/REVISE/BLOCKED, latest-byte evidence, same-writer revision and any applicable worker goal active through waiting-review |
| aios-route-agentic-content-system | [aios](../../aios/SKILL.md), [System routing](../../aios/references/routing.md) | Embed responsibility: select a verified registered content owner by invoke condition, pass accepted inputs/authority/proof need, accept its declared natural return, and never imply publishing; no fixed tool, filename, package or sibling |
| aios-route-agentic-design-system | [aios](../../aios/SKILL.md), [System routing](../../aios/references/routing.md) | Embed responsibility: select a verified registered design owner by invoke condition and preserve the accepted cross-owner result identity; no fixed tool, filename, export schema, sibling or Project |
| aios-route-business-constraint | [aios](../../aios/SKILL.md), [business routing](../../aios/references/routing.md) | Embed: current Offer/Operations/Demand constraint, Eliminate/Automate/Delegate and smallest owner; no mandatory business interview |
| aios-ship-work | [Ship](../../aios-ship-work/SKILL.md) | Keep: exact Review plus authority, same writer/goals rather than a Ship goal, destination readback, recovery and three outcome states |
| aios-spec-work | [Spec](../../aios-spec-work/SKILL.md) | Keep: four maturities, ten evidence dimensions, preserved sources, one lead goal plus concise todo, an explicitly required narrower worker goal and one readiness gate |
| aios-sync | [Maintain context](../../aios-maintain-context/SKILL.md), [configured sync](../../aios-maintain-context/references/sync.md) | Embed: optional owner Git preflight and reviewed Ship checkpoint with fresh hashes and exact push authority; local mode needs no remote |
| aios-triage-improvement | [Triage improvement](../../aios-triage-improvement/SKILL.md) | Keep: concrete-signal trigger, lead disposition, sanitized deduplicated brief, authorized issue/comment and exactly-once readback without changing the primary gate |
| aios-update | [Update](../../aios-update/SKILL.md), [identity migration](migration.md) | Keep: independent package-adoption intent, pinned release, native registration, collision proof and rollback; no legacy updater runtime |

## Whole snapshot inventory

An exhaustive `SKILL.md` file inventory at accepted legacy commit
`ca1ba807716d1a992889f02d41cddf94fdee9f32` contains exactly the 17 rows above.
It contains no personal, System, Project or Global Skill body. The old README and
instructions name three optional methods without bundling them; broader accepted
migration evidence also accounts for the two other historical Global methods:

| Named external method | Current owner/disposition |
| --- | --- |
| `clarify` | Remains independently owned with an intentionally changed current job; AIOS may discover it for a concrete need but claims no unchanged-body parity |
| `manage-skills` | Its accepted responsibility moved to native [Manage Skills](../../aios-manage-skills/SKILL.md); no external body existed in the snapshot to migrate |
| `orchestrate-workers` | Its accepted responsibility moved to native [Orchestrate workers](../../aios-orchestrate-workers/SKILL.md); no external body existed in the snapshot to migrate |
| `route-models` | Retired from the external source before this migration at historical change `8b81375`; it is not a lost current route |
| `shape-offer` | Remains an independently owned Global Skill; AIOS discovers it only for a concrete need and does not copy it |

Four private personal methods were retained through owner migration and current
discovery; their bodies remain owner-controlled and are not enumerated in this
product source. Six Project Template development methods and eight Pi setup
methods likewise remain with those independent repositories. Synthetic test names such as
`owner-workflow`, `global-helper`, `system-method` and `project-method` are
fixtures proving preservation boundaries, not shipped methods. This inventory
does not infer the contents of any historical populated owner home from the
template's placeholder owner files.

Four useful native workforms beyond the direct legacy keep rows remain public:
[Check](../../aios-check/SKILL.md) for installation/format/harness evidence and
[Maintain context](../../aios-maintain-context/SKILL.md) for durable facts/routes,
and [Orchestrate workers](../../aios-orchestrate-workers/SKILL.md) for an actual
lead worker plan, launch or recovery. [Manage Skills](../../aios-manage-skills/SKILL.md)
owns personal skill placement/discovery and reviewed capability adoption,
update, removal and rollback.
They are distinct from artifact Review and package Update. OSM 0.1.x's `osm`,
`osm-onboard`, `osm-check` and `osm-maintain-context` map to those AIOS workforms;
the old umbrella's lifecycle is now directly invocable as Spec/Build/Review/Ship.

Conditional [principles, voice and visual checks](../../aios-review-work/references/contextual-quality.md)
belong in Review. They retain observable judgment but use the selected client's
sources, not the author's preferences. Optional clarification or offer methods
remain independently discoverable and are not prerequisites or bundled
implementations. Native management, orchestration and triage are conditional
routes; none grants a worker runtime or external issue authority.

The public count is an outcome of responsibility boundaries, not a target.
Creation, setup, inspection, context mutation, skill management, worker
orchestration, lifecycle phases, improvement triage and package adoption retain
focused discovery entries because their triggers or effects differ. The three
legacy evaluations are phase-owned gates, so separate auto-discovery would add
competing owners. Business and specialist routing share one owner-coordination
job: `aios` selects a registered owner, while the registry and that owner's
current primary route supply capability-specific behavior. This keeps the old
routes reachable without freezing another repository's tools or output schema.

## Migration consequences

Use this map only after [origin and collision checks](migration.md). A matching
name does not make an existing skill this package's property. Preserve original
bodies and unknown metadata. Adapt a retired caller only to a proved current
route with the same intent and gate, keeping all other bytes unchanged.
Verify the new link/invocation and record transformed hashes separately from
originals. Identical replay is a no-op; later edits are conflicts. Non-product
methods and every System/Project's implementation stay with their own owner.

Intentional adaptations include asset-based neutral setup, seed-owned creation
interfaces, optional local-first Git, native package updates, no mandatory
runtime helpers, and native goal/tool controls only within their actual
invocation rules. Missing optional methods never fabricate a runtime or block
an otherwise supported native route.
