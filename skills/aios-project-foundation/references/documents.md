# Project documents and their maintenance

Review the whole project, not only docs/. For a new application use the layout
below as its content becomes established. Existing useful canonical paths and
capitalization survive: link an existing design/DESIGN.md or docs/architecture.md
instead of copying its body. Keep root README, AGENTS and CONTRIBUTING entrypoints
and a maintained docs/README.md. A generated heading is not an established contract.
Both root README and AGENTS link to docs/README.md; keep other agent reads
conditional on the task rather than requiring the entire map to be loaded.

| Canonical home for new applications | Content to establish and check |
| --- | --- |
| `README.md` | Purpose, audience, scope/status, responsible owner, essential usage/start route and links to other sources; intended behavior distinct from implementation |
| `AGENTS.md` | Compact repository-specific execution/routing contract; see below |
| `ARCHITECTURE.md` | Components/contracts, data/trust boundaries, runtime success/failure flows, deployment boundaries, quality goals, material decisions and known risks |
| `DESIGN.md` | Observed/accepted flows, identity, hierarchy, tokens/components, responsive/accessibility rules and loading/empty/error states; API/CLI-only products use interface contracts and explain visual inapplicability |
| `SECURITY.md` | Actual reporting owner/channel, scope, security invariants, exposure and relevant review policy; reconcile inherited or competing security sources |
| `CONTRIBUTING.md` | Real prerequisites/install/start/check commands or their canonical routes, fixtures/services, change/branch/review rules, test coverage/limits and documentation maintenance |
| `docs/README.md` | Reader-oriented map to current canonical sources, responsibility and durable verification evidence; include developer, user/integrator and operator routes |
| `docs/infrastructure.md` | Actual application/data/worker locations, environments, network/DNS/access boundaries, external services, capacity/limits, provisioning sources and ownership; reference secret stores, not values |
| `docs/deployment.md` | Selected environment, CI/CD triggers and authority, configuration references, tested revision/artifact, access, migrations and rollback |
| `docs/operations.md` | Health/logs, diagnosis, stop/restart, updates, incident intake, operating responsibility, retention/cleanup and applicable reset/restore rehearsal |

Ownership belongs in README/operations; testing in CONTRIBUTING; recovery in
deployment/operations; proof in the real revision-bound CI/PR/factory records
linked from the appropriate guide. Standalone ownership.md, proof.md, testing.md
or recovery.md are optional. Preserve their unique content and working links
when consolidating. A combined operational guide can own several responsibilities.
Infrastructure explains resources/connections; deployment explains change and
rollback; operations explains running and recovering the system.

Add user/API/configuration reference, decisions or release notes when the
project needs them. Do not pre-create directories or pages for every heading,
impose a docs-site generator or invent historical decision rationale. For
non-application projects, use the applicable authoring/usage/validation sources
without a fictional hosting or visual design setup.

## AGENTS as an execution contract

Keep instructions that change an agent's decisions: non-obvious setup/check
prerequisites; accepted architectural/security constraints; generated/source
boundaries; actual delivery authority; recurring evidenced pitfalls with their
rationale; and short “read this when changing X” routes to canonical documents.
Technically discoverable information can still merit a short instruction if
misinterpreting it causes a concrete error. Do not remove essential constraints
merely because code also expresses them.

Leave exhaustive file trees, dependency/version inventories, duplicated code
examples and generic framework tutorials in source/configuration or omit them.
Detailed architecture, runbooks, project plans and specialist procedures belong
in their owning documents/skills. Let tools enforce formatting/static rules;
keep only the useful check route and material exceptions in AGENTS.

Curate contradictions, redundancy and obsolete guidance rather than continually
appending rules. A one-off failure is not automatically permanent policy. Keep
valuable decisions/history at their owner. Nested AGENTS files are justified by
real scope differences. Reconcile harness adapters using the selected harness's
supported import/reference mechanism, with one maintained instruction body per
scope. Verify discovery and route-following in a representative actual invocation;
file/link checks alone do not establish agent behavior. Do not preload all docs
or impose an arbitrary universal line/token quota.

## Content lifecycle and GitHub entrypoints

For every relevant behavior/interface/configuration/infrastructure change,
update its canonical document in the same reviewed change or explain why it is
unaffected. Name responsibility for keeping it current. Verify commands, links,
contacts and examples against actual code, workflows and resources. A date
refresh is not maintenance evidence. Generated reference has a canonical source
and reproducible command. Mark superseded decisions and preserve useful history;
keep secrets, restricted incident records and raw private logs at authorized stores.

Use `CONTRIBUTING.md`, not `Contribution.md`. GitHub recognizes contribution
guidance in `.github`, root or docs, with `.github` taking precedence: reconcile
competing files and verify the surfaced entrypoint. README and SECURITY have
their own supported discovery. Architecture, design and testing names are project
conventions, not GitHub community-health requirements. License detection is not
a licensing decision. Agent instruction discovery is a separate harness concern.

Primary references for changes to these integrations:
[contributing guidelines](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors),
[README](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes),
[security policies](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/add-security-policy).
