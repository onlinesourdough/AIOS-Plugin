# Engineering foundations

Use these responsibilities for the accepted project and environment. A small
library, document repository and hosted application need different evidence.
Keep the applicable result in the current issue/specification; do not create a
separate readiness database. A working application needs exercised foundations,
not just a repository containing Markdown.

| Responsibility | Establish from the project | Useful proof |
| --- | --- | --- |
| Product and ownership | Audience, problem, scope/status, success criteria, technical and operating owners, limits and supported usage | A representative user/integrator task with an identifiable acceptance owner |
| Repository and intake | Canonical GitHub repository, preserved origin/history, issue-to-task route, selected branch/PR policy, instructions, permissions and applicable protections | Read back remote identity/settings; trace an issue through the intended check/review target |
| Reproducible setup | Actual toolchain/native libraries, ecosystem manifests and lockfiles, frozen install, start/check entrypoints, required fixture services and platform constraints | A clean checkout on the selected host installs and runs without hidden laptop state |
| Architecture and design | Components, contracts, data/trust boundaries, meaningful runtime/failure scenarios, quality goals and risks; observed visual/interaction direction or API/CLI interface contracts | Inspect real code and representative screens/interfaces; separate desired changes from existing behavior |
| Code standards | Project-specific conventions, enforced checks, material exceptions and maintained canonical examples | Inspect changed behavior against those standards and update stale guidance in the same change |
| Testing and acceptance | Behavioral unit/integration/end-to-end coverage appropriate to risk, canonical commands, controlled fixtures, negative/recovery cases and known limitations | Run the relevant checks; show that a meaningful defect fails them. Empty or accidentally skipped suites are not proof |
| Security and data | Reporting route, actual exposure, authorization/trust invariants, dependency/supply-chain controls, secrets references, synthetic fixtures, migration/retention/reset needs | Exercise affected denial, initialization and recovery paths; preserve sensitive data outside source and artifacts |
| CI and delivery | Required PR evidence, complete build cadence, artifact identity, environment separation and repeatable preview/staging delivery | Observe actual GitHub events/results and selected artifact; exercise the running target and rollback/reset when applicable |
| Application infrastructure | Hosting/build requirements, suitable resources, storage, network and provisioning ownership | Exercise the actual application target and access boundaries when in scope |
| Operations and recovery | Health/logs, diagnosis, stop/restart, updates, incident intake, cleanup, last known good state and responsible operator | Observe a failure and its applicable rollback/restore/reset path; label any unrehearsed procedure |

## Files and configuration beyond documentation

Select concrete files for the actual stack. A manifest, Dockerfile or CI example
is useful only when it describes a supported working path.

- Commit a root `.gitignore` covering the project's credentials, local state,
  caches and generated output. Inspect already tracked files and test example
  paths with Git; ensure required fixtures, locks and safe examples remain
  trackable. Ignore rules cannot repair secrets already committed to history.
- Preserve inherited license texts and notices. Record the product licensing
  decision; template attribution does not license newly authored product code.
  Do not assign an open-source license from a private-repository assumption.
- Use ecosystem manifests/locks, actual version pins, executable setup/check
  commands and configuration examples only where needed. Examples contain safe
  defaults and secret-store references, never live secrets. An application
  without environment variables needs no invented `.env.example`.
- Keep formatting, lint, file modes, line endings and binary handling in
  applicable executable configuration such as `.editorconfig`/`.gitattributes`.
  Do not copy those mechanical rules into a long AGENTS file.
- Use real workflow, deployment and provisioning definitions. When containers
  are used, inspect the build context and `.dockerignore`; no container or IaC
  framework is mandated by this skill.
- Reuse sufficient issue/PR entrypoints. An issue captures outcome, scope and
  acceptance; a PR identifies its source/base, actual checks, documentation
  impact and relevant recovery. Security reports retain a private route.
  CODEOWNERS requires real owners and a useful review policy.
- Read back repository/Actions/environment settings and permitted actors.
  Required checks, secret stores and environment protections are remote state,
  not consequences of writing files. Report actual plan/access limitations.

## New projects and existing code

APT supplies a neutral starting point. Its name/outcome inputs cannot determine
a project's architecture, design, operating contact or deployment topology.
After creation, carry accepted facts into the applicable sources and implement
the executable foundation as the product takes shape. An explicit unresolved
decision is useful seed state, but does not pass foundation acceptance.

For legacy/forked projects, inspect contradictory commands, inherited contacts,
upstream automation, licensing and provenance before enabling them. Preserve
working equivalents and unique history. Do not reseed, replace remotes, discard
local edits or duplicate a healthy documentation tree. Repeated/interrupted
work resumes from current state and evidence, without concurrent setup writers.
