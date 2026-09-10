# Verification

Run the maintained source checks from the repository root:

```sh
python3 tests/validate.py
python3 tests/layout-rehearsal.py
python3 tests/context-footprint.py
python3 tests/continuity-rehearsal.py
```

For model-selection changes, prepare synthetic decision probes with
`python3 tests/model-selection-rehearsal.py prepare /absolute/scratch/path`.
Run the generated prompt and schema through an authorized native evaluator in
an isolated read-only session, then use
`python3 tests/model-selection-rehearsal.py score /absolute/scratch/path/result.json`.
`prepare --baseline REF` supplies the same cases against an existing source
revision. The helper never launches a model or spends account resources itself.
Expected decisions are withheld from the evaluator; inspect explanations as
well as scored fields. Portable-brief cases return actual prompts for inspection
of accepted facts, attachments, judgment and proof without doing the production.
Cases distinguish retained orchestration, whole-task transfer, user-owned
continuation, explicit production here and judgment still required after Spec/Review.
Fixtures supply runtime evidence, so this measures
instruction decisions, not live discovery, switching, installs or task savings.
See the [model-selection record](lifecycle-model-selection.md) for actual results.
Performance claims and authorized comparisons also select the skill's measurement
reference. `context-footprint.py` reports that conditional extra read separately;
the older legacy journeys have no matched measurement route. Portable/whole-task
transfer similarly adds the conditional continuation reference and excludes worker
orchestration when the caller retains no role. Count selected references when making
a claim about that route, rather than treating the default path as its full cost.

`validate.py` checks native declarations, package inventory, skill frontmatter,
relative links, one shared Codex/Pi skill source, the complete legacy-route map,
discovery contracts, owner-template isolation, external-owner coupling,
conditional Risky Changes ownership/routing, optional Guardrails capability
routing without a package dependency or installed claim, and selected security
regressions. It also builds an isolated package copy so author-only files
cannot satisfy product links.

`context-footprint.py` compares representative selected-read paths with accepted
legacy commit `ca1ba807716d1a992889f02d41cddf94fdee9f32`. The checked-in
manifest records every old path, byte count and source hash used by each stage;
pass `--legacy-root /path/to/pinned/checkout` to verify it again. The benchmark
separates the observed bridge plus all skill name/description metadata from
task-selected skill bodies and complete references. New-home stages also count
the format contract, bridge asset and every neutral owner asset; verification
adds both the common acceptance boundary and setup-specific scenarios. Their
legacy stages count the complete shipped `.aios` scaffold. Other matching stages
cover local-first negative preload, owner routing, Spec readiness, worker Build
and basic Check. Every current selected path must be no larger than its legacy
package-owned comparison, and each skill body must stay at or below 8 KiB.

For 0.4.0, rerun the command for exact current counts; current source checks
retain the bounded descriptions and 8 KiB skill-body ceiling. The legacy
comparison remains useful for its stated routes. This change also removes
43 generic local skill bodies and their supporting payloads across the selected
repositories and seeds (62 tracked files, 329,683 bytes before replacement
routing). Those aggregate source bytes are not a per-task context or token
measurement: metadata is discovered first and bodies load conditionally.

These are UTF-8 byte counts and explicit bytes/4 token estimates, not native
runtime token telemetry. Populated owner context is excluded: the accepted
snapshot has only template placeholders, not a populated historical owner
state, and task context varies by outcome. Target-repository AGENTS instructions
are also excluded from both sides. The neutral current AIOS.md plus MEMORY.md
assets are 1,016 bytes, but no before/after owner-context saving is claimed.
Behavior remains separately checked by route/link assertions, positive and
negative scenarios, and current source validation; fewer skills alone is not a
performance result.

For a changed context boundary, native evidence must use a compact matched
baseline/candidate task within each harness, record selected reads and emitted
usage when the harness provides it, and state unavailable token fields plainly.
Use synthetic owner and external-canonical sources: an AIOS docs-only question
must not preload owner context. If the canonical product repository is private,
the native smoke may use only its already-authorized normal read path; absent
access is an explicit gap, never a reason to retrieve credentials or change
visibility. External customer content stays at its source; source changes are
re-read; and read-only memory access stays separate from an explicitly
authorized synthetic correction. These are bounded smoke observations, not a
cross-harness performance guarantee.

`layout-rehearsal.py` uses temporary Git repositories to verify independent
Project/System roots, parent exclusions, and rejection of tracked nested work.

`continuity-rehearsal.py` uses a temporary local bare Git remote and synthetic
owner data to verify the explicit Sync allowlist, absent/empty restore, partial
home refusal, hostile remote content, secret-like content and non-execution of
restored personal files. It also checks personal-skill provenance, nested Git
and symlink stops, target-root rebinding and a stale-history stop. It does not
contact a real remote or owner home, and is not native-agent behavioral proof.
Before calling continuity behavior accepted, run the selected synthetic case in
the target native harness and retain its actual selected reads, staged paths,
target mutations and source/target hashes.

Before a real owner-data migration, record and inspect the actual backup restore,
source and destination hashes and modes, changed-source and changed-destination
cases, symlinks, unknown identities, idempotent replay, and preservation of later
owner edits. This is an operator checklist; this repository does not claim those
observations from an invented migration helper or a current native run.

The automated checks are source and Git-filesystem checks. They do not simulate
a model, mutate a real owner home, install AIOS, change native settings, launch
a worker, or prove desktop behavior. Native acceptance must use the target
harness and report its own exact version, source, and limitations. Historical
acceptance observations remain in Git history and GitHub Releases rather than
being presented as a current automated PASS.

For the routing/System-maintenance change, the accepted contract excludes
behavioral evals, replay and model comparisons. Only `validate.py`,
`context-footprint.py`, whitespace and scoped source consistency review were
run; layout/continuity rehearsals and native execution were not run. Required
routing reads are included in the affected footprint paths. Package/link
validation permits the accepted ADS route label while continuing to exclude
specialist tools/formats and bundled ownership. See the
[lifecycle record](lifecycle-routing-system-maintenance.md) for scope and pending
independent lead acceptance. Daily-use feedback belongs to the user; these
checks do not prove workflow selection, sidebar behavior or live System updates.

For `tracking-sop-2026-09-09`, source/package/link and context-footprint checks
plus static Review are the accepted proof; behavioral model replay/eval and
broad suites are excluded. The initial unavailable-tool fallback [todo.md](todo.md)
is now retired: this resumed worker exposes `update_plan` and its call succeeded
with an empty response. This proves call execution, not independent stored-state
readback or observed UI.
The [lifecycle checkpoint](lifecycle-agents-adoption.md#tracking-sop-revision--2026-09-09)
records incident/source evidence, scope, local 0.3.5 snapshot authority and lead
adoption responsibility. Reduced instruction bytes do not prove better behavior.

## Shared lifecycle (0.4.0)

The [accepted contract](lifecycle-shared-method.md) changes shared execution and
repository ownership. `validate.py` additionally rejects both a copied local
phase and a thin local wrapper in the product repository. Project Template's
creation fixtures verify zero generated generic skills, four native shared
routes, a payload whitelist, existing/dirty-destination rejection and atomic
restore/retained-state behavior. The generated Project has fresh Git history
and no remote; the test does not require plugin discovery to prove that shape.

Domain review and audit methods remain local. Selected System entrypoint checks,
changed-link inspection and the Bachelor specialist-route validator cover the
local contracts. Independent source Review caught and corrected direct-task
recovery's stale lead requirement and stale Bachelor README routes. Runtime
discovery and native package adoption are measured separately after release.

The source baseline demonstrates the duplicate methods and mandatory worker
rules; it is not a matched native performance experiment. Reduced copying and
selective delegation remove those instruction causes. Actual token savings,
long-session quality and behavior across future tasks remain workload-dependent.
