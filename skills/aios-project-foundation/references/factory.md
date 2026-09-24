# Connect an independently maintained factory

The canonical runtime is
[Software and Defence Factory](https://github.com/arcitai/software-and-defence-factory).
Inspect its selected version, current quickstart, installation/doctor, job-image,
acceptance/review, delivery and recovery interfaces. Keep these implementation
details upstream; do not copy a controller, its skills, command flags or installer
into AIOS. A runtime source checkout is not automatically an app dependency.

Record application repository and selected immutable base, the isolated source
checkout, runtime version, host/image, actual toolchain/check command, model access,
scope/limits and handoff target. Reuse known decisions and working installations.
Keep per-application private state and credentials out of source and artifacts;
grant only the actual model/provider environment the jobs need. Do not mount an
operator's whole authentication home or assume a generic image supports the
application's native/mobile/browser/database workload.

The factory's implementation phase cannot unilaterally rewrite protected acceptance
policy or reuse evidence from another candidate. Exercise checks and separate
review for the exact candidate and policy; a changed patch or integration base
needs current evidence. When differential checks receive a controller-provided
base revision, use that protected revision; isolated jobs may have no origin remote.

If admission does not pin an explicit source revision before cloning, use a
controlled committed source checkout with no concurrent writer and verify that
the candidate's recorded base equals the intended SHA. Never claim a moving
source branch was pinned merely because the task text names a commit. A mismatch
holds that candidate's acceptance until corrected.

Use the selected runtime's supported branch/PR handoff when present and authorized.
If it returns only a reviewed patch, preserve that limitation: verify/apply the
patch in a unique checkout at its recorded base, inspect the resulting diff,
create the task branch and PR to the agreed target, and run integration checks.
Handle conflicts as changed work requiring review. Record issue/job/candidate/PR
links without exposing private logs. No automatic PR, merge or deployment is
implied by initialization, a skill catalog or a dashboard button.

For adoption, exercise a bounded real task on the intended off-laptop host:
implementation, meaningful checks, separate review and authorized test-environment
handoff. Confirm stop/retry behavior and resource/model connectivity relevant to
that app. Runtime demo qualification tests the runtime; it cannot substitute for
application/platform qualification. Respect existing installation/recovery state
when resuming; inspect effects before repeating uncertain actions.

Defence includes the applicable threat/security boundaries, evidence intake and
response owner. Claim live monitoring only when actual sources, triggers,
deduplication, stop/restart and response paths have been exercised. Manual
incident-evidence triage is not monitoring.

The optional later [build-dark-factory source](https://github.com/coleam00/skills/tree/main/.claude/skills/build-dark-factory)
may inform further autonomy after these foundations work. Review a specific
revision, license and overlap before reuse. It introduces no default competing
orchestrator, autonomous merge or production deployment into this skill.
