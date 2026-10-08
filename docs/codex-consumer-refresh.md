# Codex consumer refresh: 0.16.0 candidate

The accepted owner request combines an English context overview, consistent
skill names, human control of models/workers, context curation, a maintained
consumer guide and native release packaging. Codex is the acceptance target;
Pi model simulations are not a release gate.

## Methods and migration

All 24 canonical skills use `aios-<method>`. The old router is `aios-start`;
domain skills include `aios-design`, `aios-review-design`, `aios-content`,
`aios-human-writing` and `aios-write-code`. Update explicit shortcuts and owned
bridges on adoption. Host command namespaces remain host-controlled.

The person chooses models/effort and requests workers. Ordinary Spec/Build
continues in the current chat. Model advice supports a requested choice or a
concrete capability gap. Create System is retired; Create Project remains.
Review Design contributes to shared Review. The empty local skill shelf is gone.
Owner-confirmed lasting facts route to Maintain Context under its existing
format, curation and write/Sync authority, without background capture.

The [consumer guide](../skills/aios-setup/references/codex-consumer-guide.md)
maintains deliberate workspace/access/privacy choices and optional capabilities.
No personal settings or account identifiers are copied into the plugin.
Upstream 0.15.0 Interview intent and conditional local trials remain intact.

## Local overview

The accepted Setup, Overview, Skills and Sync UI uses the onlinesourdough bread,
neutral host-compatible surfaces, a brown footer, English agent-neutral copy
and prominent status circles. It
finds an explicit home or AIOS_HOME, the managed Codex route, then the standard
home. A missing explicit route never creates another home. Supported formats
1 and 2 are read-only. Actual bounded filenames come from the owner home;
a filename alone does not claim an inferred topic, route or authenticated tool.
Shared AIOS skills are generated from the canonical source; personal skills
come from the home and stay separate from plugin releases. A single Skills
source selector also lists immediate regular `SKILL.md` entry files in the
documented user-wide `~/.agents/skills` location. Directory links are resolved;
an exact match to an inventoried AIOS source is labelled as the same original,
not another copy. This is a bounded file inventory, not proof of activation.
Bodies, arbitrary projects, plugin caches and Codex databases are not read.
The current Extensions API does not document sidebar-project enumeration.

Personal skills live with context so one owner Git repository can sync the
reviewed source. Native registrations are machine-local: Codex can link to the
original through `~/.agents/skills`, while other harnesses need their own
verified adapter. External global skills stay with their distributor. Built-in
skills belong to the harness. Syncing source files does not install or activate
them; [Manage Skills](../skills/aios-manage-skills/references/owner-skills.md)
owns registration and fresh-session verification.

Manage Skills reconciles affected links in the same authorized personal-skill
change, including rename, removal, home move and reviewed restore. It checks
unresolved links as well as live targets, preserves foreign or unknown entries,
and accounts for obsolete owned registrations. The panel reports unavailable
global links without changing them. Manual filesystem changes need a requested
Check or later relevant maintenance; no filesystem watcher is promised.

File opening uses the host editor capability. Conversation actions show the
exact request and explain that sending starts a new chat, with duplicate-send
protection. The Git view distinguishes cached refs from a fresh read-only
GitHub branch check, shows the real repository and last commit, and never
invents a sync time. Green sync requires a clean home and fresh remote equality.
No background autosync, install/uninstall hooks or hosted backend are introduced.

## Build, release and proof

The canonical runtime is built under `apps/overview/` and committed under
`runtime/overview/`. Native Codex and portable skills ZIPs are generated from
one source. [Distribution](distribution.md) owns CI, draft CD, public submission
and adoption. The prior 0.15.0 release is preserved; 0.16.0 is the combined candidate.

Run maintained checks against the current remote main baseline. Source checks,
synthetic filesystem/Git cases and real stdio protocol checks provide bounded
code evidence. The accepted browser prototype was inspected at narrow and wide
sizes with synthetic SDK interaction fixtures. These do not prove the native
Codex sidebar, actual editor opening, active uninstall or first-account login.
The computer-use surface previously refused native Codex access; that remains
an explicit acceptance gap rather than a reason to simulate a PASS.

The latest local refinement passes 19 context/Git/global-skill cases, stdio
protocol and three archive checks, plus affected source, documentation,
continuity, skill-version and footprint checks. Matching pages fit 1280 × 720
and 1024 × 640; Setup/Sync failures and an unavailable global link also fit the
compact view. Narrow 390 × 780 pages permit vertical scrolling without horizontal
overflow. White and dark synthetic hosts preserve the bread identity. The
unavailable-link case displays a red warning and has no file-open target.

The release PR and green remote CI still describe commit `0056927b`; the latest
refinement is local and has not been pushed. Historical extracted-package
results do not accept these new bytes. Independent review and native host
acceptance remain separate publication gates. No new model comparisons, workers
or writes to a real owner home are required here.
