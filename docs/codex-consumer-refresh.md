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
warm branding, English agent-neutral copy and prominent status circles. It
finds an explicit home or AIOS_HOME, the managed Codex route, then the standard
home. A missing explicit route never creates another home. Supported formats
1 and 2 are read-only. Actual bounded filenames come from the owner home;
a filename alone does not claim an inferred topic, route or authenticated tool.
Shared AIOS skills are generated from the canonical source; personal skills
come from the home and stay separate from plugin releases.

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

The release PR records current CI and extracted-package results. Independent
review and native host acceptance remain separate publication gates. No new
model comparisons, workers or writes to a real owner home are required here.
