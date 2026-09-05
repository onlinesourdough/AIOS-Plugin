# Legacy behavior and current public routes

This is a behavior map, not a requirement to ship one entry per old file.
The 17 core template methods were inspected separately from optional external
Global Skills. Eleven current workforms justify native discovery; smaller
checks and conditional procedures live with the workform that owns them.
Client facts and personal methods are not copied into this package.

| Legacy method | Public route and canonical procedure | Disposition and preserved behavior |
| --- | --- | --- |
| aios | [aios](../../aios/SKILL.md) | Keep: owner coordination, selective context, shortest justified route and independent-repository guard |
| aios-build-work | [Build](../../aios-build-work/SKILL.md) | Keep: correctly launched first-class root worker, one writer, bounded contract, relevant local checks and evidence |
| aios-create-project | [Create Project](../../aios-create-project/SKILL.md) | Keep: distinct bounded-owner request, live APT final-root transfer, reset seed history through APT-owned transfer and proof-based registration |
| aios-create-system | [Create System](../../aios-create-system/SKILL.md) | Keep: distinct reusable-owner request, live neutral AST materialization, no inherited history, concrete primary route and registration proof |
| aios-evaluate-completeness | [Review](../../aios-review-work/SKILL.md), [final completeness](../../aios-review-work/references/completeness.md) | Embed: explicit requirement-to-final-evidence gate before done; also used proportionately by ordinary AIOS handback and Ship reconciliation |
| aios-evaluate-publish-safety | [Ship](../../aios-ship-work/SKILL.md), [final action check](../../aios-ship-work/references/publish-safety.md) | Embed: exact content, identity, authority, privacy, claims and commitments checked last before effect |
| aios-evaluate-spec-work | [Spec](../../aios-spec-work/SKILL.md), [readiness](../../aios-spec-work/references/readiness.md) | Embed: explicit pre-Build gate for maturity, evidence, source preservation, local invariants and bounded READY contract |
| aios-onboard | [Onboard](../SKILL.md) | Keep: adaptive new setup or resume, sourced context, first useful result and native readback |
| aios-review-work | [Review](../../aios-review-work/SKILL.md) | Keep: independent lead PASS/REVISE/BLOCKED, latest-byte evidence and same-writer revision |
| aios-route-agentic-content-system | [aios](../../aios/SKILL.md), [System routing](../../aios/references/routing.md) | Embed: verified installed content owner, immutable inputs, content-package ownership and not-posted return; no forced design sibling |
| aios-route-agentic-design-system | [aios](../../aios/SKILL.md), [System routing](../../aios/references/routing.md) | Embed: verified installed design owner, editable source and accepted immutable export handoff; no forced content sibling or Project |
| aios-route-business-constraint | [aios](../../aios/SKILL.md), [business routing](../../aios/references/routing.md) | Embed: current Offer/Operations/Demand constraint, Eliminate/Automate/Delegate and smallest owner; no mandatory business interview |
| aios-ship-work | [Ship](../../aios-ship-work/SKILL.md) | Keep: exact Review plus authority, same writer, destination readback, recovery and three outcome states |
| aios-spec-work | [Spec](../../aios-spec-work/SKILL.md) | Keep: four maturities, ten evidence dimensions, preserved sources and one readiness gate |
| aios-sync | [Maintain context](../../aios-maintain-context/SKILL.md), [configured sync](../../aios-maintain-context/references/sync.md) | Embed: optional owner Git preflight and reviewed Ship checkpoint with fresh hashes and exact push authority; local mode needs no remote |
| aios-triage-improvement | [Review](../../aios-review-work/SKILL.md), [improvement](../../aios-review-work/references/improvement.md) | Embed: lead disposition, sanitized deduplicated brief, authorized issue/comment and exactly-once readback without changing the primary gate |
| aios-update | [Update](../../aios-update/SKILL.md), [identity migration](migration.md) | Keep: independent package-adoption intent, pinned release, native registration, collision proof and rollback; no legacy updater runtime |

Two useful newer workforms remain public:
[Check](../../aios-check/SKILL.md) for installation/format/harness evidence and
[Maintain context](../../aios-maintain-context/SKILL.md) for durable facts/routes.
They are distinct from artifact Review and package Update. OSM 0.1.x's `osm`,
`osm-onboard`, `osm-check` and `osm-maintain-context` map to those AIOS workforms;
the old umbrella's lifecycle is now directly invocable as Spec/Build/Review/Ship.

Conditional [principles, voice and visual checks](../../aios-review-work/references/contextual-quality.md)
belong in Review. They retain observable judgment but use the selected client's
sources, not the author's preferences. Optional orchestration, clarification,
skill-management or offer methods were outside the 17 core methods; they remain
independently discoverable and are not prerequisites or bundled implementations.

## Migration consequences

Use this map only after [origin and collision checks](migration.md). A matching
name does not make an existing skill this package's property. Preserve original
bodies and unknown metadata. Adapt a retired caller only to a proved current
route with the same intent and gate, keeping all other bytes unchanged.
Verify the new link/invocation and record transformed hashes separately from
originals. Identical replay is a no-op; later edits are conflicts. Non-product
methods and every System/Project's implementation stay with their own owner.

Intentional adaptations include asset-based neutral setup, optional local-first
Git, native package updates, no mandatory runtime helpers, and native goal/tool
controls only within their actual invocation rules. Missing optional methods
never fabricate a runtime or block an otherwise supported native route.
