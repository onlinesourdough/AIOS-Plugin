# Architecture

AIOS combines portable owner context with Agent Skills for planning, design,
content and reviewed delivery. Native manifests load one root `skills/`
directory. Focused helpers belong to their skills and run only for a selected
task; AIOS has no model runner, background service or permission system.

| Boundary | Responsibility |
| --- | --- |
| Native harness | Projects, sessions, models, tools, permissions and credentials |
| Owner home, normally `~/.AIOS` | Relevant context, source links, decisions and personal skills |
| Spaces | Selectively loaded business or brand context |
| Skills | Reusable methods, standards and judgment, with references and small helpers as needed |
| Project repository | Local requirements, implementation, design and content material, proof and recovery |
| Optional System | A separately maintained specialist with its own dependencies or operational needs |
| Native manifests | Package identity and discovery over the same 22 skills |

## Work and methods

Continue in the current task and workspace. The shared lifecycle resolves the
outcome, then applies Spec, Build, Review and authorized Ship proportionately.
Design and content chain their own specialist steps into this lifecycle. There
is no chain configuration language, mandatory department model or fixed sequence
between design and content. Short writing uses human-writing directly.

Use project-local `design/` and `content/` for working material and create them
when needed. Product files belong where the project consumes them. Skill
packages contain reusable methods and neutral assets, never customer work.
Domain skills own briefs, evidence, review and handoff details; the core router
only selects a method. See the [skill index](skills.md),
[design preservation map](design-preservation.md) and
[content preservation map](content-preservation.md).

An optional System is useful for a bounded specialist with independent upkeep,
such as Power BI and its Windows Desktop workflow. Its repository owns its
requirements, dependencies, proof and recovery. A script or a long skill alone
does not require a System. The project and system templates create local
starting points; they do not add a second project identity or copy AIOS phases.

## Context and isolation

Owner context is selected when the work needs it. Independent repository work
starts from local instructions and accepted inputs, including repositories
nested beneath an owner home. No parent instruction file preloads personal data.
Native project discovery does not depend on an AIOS registry. Existing useful
source indexes can remain ordinary context.

New owner homes use `AIOS_FORMAT` 2, without mandatory project or system indexes.
The package also reads format 1. Package versions and owner-data formats are
separate; installation never migrates data. An authorized cleanup preserves
existing data and rollback evidence before changing the format marker. See
[data compatibility](../skills/aios-onboard/references/data-format.md).

Maintain Context owns facts and explicit continuity Sync. Manage Skills owns
personal-skill placement and native adoption. Sync transfers consented context,
personal skills and identity metadata; it excludes product trees, native
settings, credentials and nested repositories. It is an explicit workflow,
not an installation side effect.

## Selective loading

The harness discovers skill names and descriptions. Load the selected skill,
then only the references needed for its operation. Explaining a method does not
execute its lifecycle. Model selection assesses the remaining work under the
user's configured default; worker orchestration is conditional on a concrete
gain or a request. Shared continuation retains existing action authority.
Risky Changes applies to consequential changes, without creating routine gates.

Optional Global Skills retain their own owners. For example, setup-guardrails
is selected only for an explicit request, with installation and actual active
protection verified separately. No optional capability becomes a prerequisite
merely because a route mentions it.

## Documentation and native installation

The product repository owns AIOS documentation. Its approved overview at
`docs/public/aios.md` ships in the native package and states the matching package
version. The primary AIOS skill points to a small
[documentation route](../skills/aios/references/documentation.md), which selects
only the local overview or method reference needed for a question. Including a
file in the package does not preload it into conversation context.

Current releases, changed external facts and gaps in local documentation use the
[canonical source route](../skills/aios/references/canonical-sources.md).
The installed version stays distinct from upstream `main` and the public site.
Private source reads use already-authorized access. Local documentation and
methods remain usable without that access or website availability.

The [public export](distribution.md#public-aios-overview-export) contains only
the approved overview and generated version/commit/hash metadata. Source and
release checks prepare it; Resources owns its import, review, deployment and
readback. Customer documentation remains in its source system, and AIOS retains
only useful pointers, unique facts or explicit gaps. Owner context and private
author records are outside the public export.

Codex, Pi, Claude Code, Gemini CLI, Copilot CLI and Cursor have native metadata
for the same source. Installation affects only the chosen harness. It creates
no owner home, global bridge, tool installation or registration in another app.
Native removal leaves owner and project data intact. Custom-home routing is an
optional setup choice. See [native installation](native-installation.md) for
actual evidence and documented-only routes.

Source tests verify structure and filesystem behavior. They are author tools,
not proof of model behavior, native UI or future task quality. Historical
acceptance remains version-specific. Current proof and its limits belong in
[verification](verification.md).
