# AIOS 0.3.0 source-candidate lifecycle

## Accepted outcome

This source candidate started from clean HEAD
`c682b051b785a9f9ab14af81692b55a45aa6905e`, with released `v0.2.2` retained as
the installed/recovery baseline. No release or native adoption is claimed.

The candidate makes the repository root the single package source: root
`.codex-plugin/`, `skills/`, Pi's `./skills` declaration and the local
marketplace all resolve to one body. `.agents/skills/`, `AGENTS.md`, `tests/`,
and `docs/` remain author-only and are not exposed as consumer skills.

Improve the existing plugin from released baseline
`b8c7e79fa315edb9a13f0f4e16f8f56d4ab36ec5` (v0.2.0):

- Give personal skill creation, import, editing, rename, removal, placement and
  discovery one canonical owner in Manage Skills, called during ordinary work
  and setup. Maintain context retains owner facts and configured Git sync.
- Reuse the native Skill Creator, preserve repository/distributor ownership,
  and keep discovery, collision, replay and recovery checks explicit.
- Link shared procedures instead of maintaining copies in calling skills.
- Rename the private repository to AIOS-Plugin without changing its identity.
- Simplify the client README and use GitHub Releases as the version-history
  source, removing the standalone changelog.
- Add a minimal warm sourdough app icon with AIOS pixel lettering, inspired by
  the owner's supplied reference without copying its gradient palette.
- Add native worker orchestration and extracted native improvement triage with
  conditional invocation, per-assignment route selection, exact root/authority/
  proof handback and an independent improvement gate.
- Keep worker completion archive lead-controlled: archive only a terminal,
  independently accepted worker after authorized Ship or handoff, never archive
  actionable work, and report unsupported archive controls without inventing a
  CLI substitute.
- Make one canonical lifecycle reference own the persistent goal contract and
  its identity, state, evidence, authority and next transition across Spec,
  Build, Review, recovery and Ship; distinguish native goal state from a
  logical checkpoint and keep pending approval or evidence open.
- Restore the ported method's concrete setup confirmation, authority-separated
  triage, signal disposition, design/content handoff, onboarding trigger,
  Skill/System boundary, worker default and READY-to-Build guards.

The package now exposes 14 shared instruction skills with no new consumer
runtime, watcher, dependencies or owner-format change. Portability is a
minimal bridge to the same physical owner home and canonical skills source;
there is no universal loader or every-harness adapter. Personal data and real
native registrations are outside this source change.

## Build and Review

The local repository is the product source. Manage Skills owns personal-skill
reconciliation; Onboard calls it, Check observes it, and Review checks shared
procedure ownership. Maintain context keeps owner facts and configured Git
sync. Distinct phase responsibilities remain separate.

Proof consists of package and metadata validators, extracted-package links,
existing isolated onboarding/layout/migration rehearsals, the deterministic
worker/review/triage and goal-lifecycle source rehearsals with labeled acceptance
matrices, independent synthetic instruction interpretation, native Pi resource
loading when available, and visual inspection at icon size. The lead accepted
the procedural body behavior and expanded parity audit; current obligations are
final document-byte acceptance, publication and native adoption. These checks
do not establish fresh-session Codex or worker behavior, live personal-skill
registration or native rollback.

Freeze the final subject with the existing review inventory and obtain
independent Review of those exact bytes. A material edit invalidates acceptance.
[Proof](proof.md) records actual results and limits.

## Delivery and recovery

The repository rename was explicitly authorized. Publishing this candidate or
adopting it into a native installation needs the corresponding existing or new
authority, exact Review PASS and the [release procedure](distribution.md).
The authorized destination is private `onlinesourdough/AIOS-Plugin`; preserve
its old tags/releases. The source baseline and Git history retain the removed
changelog and previous lifecycle records.

Recovery preserves unrelated edits and uses the prior reviewed package ref.
No cache edits, full-settings rewrite, owner-data move or native acceptance is
implied by source completion. The broader owner cleanup remains a separate task.
