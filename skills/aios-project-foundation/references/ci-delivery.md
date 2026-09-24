# Branches, CI cadence and delivery

Preserve a healthy accepted workflow. Otherwise use main plus short task branches
as the initial application profile. Staging/preview can follow main; it does not
require a dev branch or a production release. If dev is selected, specify feature
PR targets, dev-to-main promotion checks, release authority and synchronization
after fixes. Record actual default/integration branches and required checks.

Trace issue → isolated task at recorded base SHA → reviewed candidate → branch/PR
to the selected target → current integration checks → authorized environment
delivery. Do not let a moving branch name substitute for its source revision.
Changed bases, conflict resolutions and edited candidates require relevant fresh
checks/review. A non-default-branch merge does not automatically close a GitHub
issue; read back issue/PR/deployment state instead of equating these events.

## Application/factory cadence

The selected default is relevant PR checks before merge, with complete
verification/build batches every three hours. Adapt to demonstrated project
needs and existing deployment requirements; generic project creation does not
install a fake application workflow.

- Each PR revision receives necessary checks and build prerequisites. Scope
  expensive lanes using real dependencies; shared, toolchain, CI and unknown
  changes conservatively select broader checks. An unavailable comparison base
  fails rather than becoming an empty diff; include deleted files.
- Remove duplicate full push triggers when PR plus batch covers the intended
  evidence. Cancel superseded runs for the same PR; serialize complete batches
  and actual delivery without interrupting a valid deployment.
- A scheduled batch tests the selected integration SHA and produces complete
  artifacts. Skip expensive work only if a successful full scheduled/manual run
  covers that exact SHA; a scoped PR pass is insufficient. Unverified revisions
  remain eligible; a failed attempt without full passing evidence is retried.
  Manual execution always permits a full run.
- On an idle interval, run only one lightweight metadata check: no checkout,
  dependency install, tests/builds or extra acceptance runner. This still uses
  some Actions runtime. Never promise zero cost from an in-workflow timer guard.
- Keep a stable aggregate PR check that fails on planning/API failure or any
  required lane that fails, is cancelled or unexpectedly skips. Only an explicitly
  proven idle schedule may skip its aggregate; PR/manual events and missing
  decisions must retain failure handling. GitHub can treat skipped jobs as
  successful, so a skipped check is not a merge barrier.
- Read back Actions permissions and required-check protection for the actual
  target and actor. Record unsupported plan/access constraints; never claim
  enforcement from a workflow file. Qualify successful and meaningful failing
  cases without weakening the barrier to get a green result.

GitHub schedules use the default branch and may be delayed. Choose staggered
UTC minutes, not an exact-time service promise. If dev supplies the batch source,
explicitly resolve/check out and record its SHA; the scheduler's main SHA is not
evidence for dev. Skip history must identify the tested source and workflow/policy
version, not just the scheduling branch. The workflow must exist on the default
branch and be enabled before calling the timer configured. Distinguish that
readback from observing an actual scheduled event.

See [schedule behavior](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)
and [concurrency](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency).
Use current official provider documentation when implementing the actual workflow.

## Delivery evidence

Keep the factory's full acceptance command distinct from narrower PR commands.
Record source/artifact revision, build/check result, target environment and access
route. Production qualification needs its actual release criteria even if narrower
PR checks passed. Retain existing working CD rather than disabling it because a
batch cadence was chosen. Scheduling CI does not itself add deployment authority.

A requested preview/staging target must run the artifact with the intended
configuration and controlled data. Exercise useful behavior, health/log visibility,
migrations and applicable rollback/reset. Document secret references, cleanup,
limits and operator responsibility. An uploaded build or an untested runbook
alone does not prove this path. Infrastructure, deployment and operations docs
must agree with the resources and commands that were actually exercised.
