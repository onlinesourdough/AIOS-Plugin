# Codex consumer refresh: 0.15.0 candidate

Owner request, 30 September 2026: focus on the Codex product, make model choice
and worker launch human decisions, expose an English minimal overview, maintain
a consumer setup guide, unify skill names and retire Create System.

This local candidate changes the portable instruction package. The optional
MCP/UI prototype is separate and is not a production runtime dependency or a
released feature. No owner files, machine settings, credentials or remote code
are changed by this source patch.

## Accepted behavior and migration

The person chooses a model and requests worker sessions. Model advice remains
available for requested help or a concrete unresolved capability choice.
Ordinary Spec/Build continues with current choices; task size or a new model
release does not start a selection ritual or authorize another worker.

All canonical skill names use `aios-<method>`. The former `aios` router is
`aios-start`; domain names become `aios-design`, `aios-review-design`,
`aios-openpencil-workbench`, `aios-content`, `aios-diffusion-studio`,
`aios-human-writing` and `aios-write-code`. Titles use `AIOS-<method>`.
The host owns command syntax and plugin namespaces; this package does not
claim it can remove a host-added namespace or register `/aios-design` aliases.
Existing explicit prompts/shortcuts need the new canonical names on adoption.
Renamed identities begin at 1.0.0; their domain methods remain intact.

Create Project remains the new-repository method. Create System is retired;
Manage Skills owns reusable methods and selected existing specialists keep
their own maintenance route. Review Design remains domain inspection inside
the shared Review lifecycle; it is not a second delivery lifecycle.

The empty `.agents/skills/` shelf is removed. `.agents/plugins/` remains native
Codex marketplace metadata. Root AGENTS becomes a concise development contract.
Historical evidence and the legacy footprint fixture retain their original
bytes; current links, inventory tests and decision cases follow the new contract.

The [consumer guide](../skills/aios-setup/references/codex-consumer-guide.md)
uses a scoped workspace baseline, distinguishes an explicit Full Access choice,
preserves model/permission/privacy choices and reuses existing conditional
capability references. Optional private owner Git continuity is not mandatory
onboarding. Shared docs contain no personal config values or device identifiers.

## Verification and recovery

Run the maintained source, version, layout, continuity, documentation and
footprint checks against baseline `3bf3ebd842ff014e2801555cf1406107648d2b07`.
Prepared instruction cases cover ordinary local work, explicit worker requests,
requested advice and unsupported choices. No new model simulation is part of
this slice; those preparations are not behavior proof. Report missing runtime
proof separately. No Pi model runs are required for this request.

Review the complete final diff and relevant rendered prototype separately.
The package remains dependency-free. Recovery is the existing 0.14.1 release;
native adoption must not overwrite active methods mid-task. Publishing,
installation of the production candidate and release require their existing
action authority and native verification.

## Ordinary context changes

Start now selects Maintain Context for owner-confirmed lasting changes,
corrections and new sources. Its conditional context-signals reference reuses
curation, format checks, deduplication and existing write/Sync authority. It
creates no background capture, mandatory approval loop or repository preload.
This is an instruction change; source checks do not establish complete native
capture-and-reuse behavior. Existing managed bridges need their owned router
name updated to `aios-start` on adoption; fresh sessions discover new identities.

Selected overview consumers may use the optional dated setup-status record.
Existing homes need no new receipt for green local availability or Overview.
The viewer resolves an explicit home or AIOS_HOME, then the managed agent
route, then the standard local home. A missing explicit route never creates a second home.
The optional receipt never replaces actual Setup acceptance. Core file hashes
invalidate affected checks; access/work are host-bound. Git sync remains optional and cached refs
are explicitly insufficient to prove current cloud equality.

## Verification observed on 30 September 2026

The package/version/link validator against 3bf3ebd, layout, continuity,
documentation and skill-version checks pass. Selected-read ceilings remain
unchanged; final setup verification is 42,748 bytes against 42,793. These are
source/Git checks and byte estimates, not runtime token telemetry.

Renamed helper coverage: 18 Design checks, 27 Content Node checks and 14 Content
Python checks pass. Review corrected an over-broad rename that changed the
Design audit dispatch identifier and missed several test import paths; existing
behavioral checks exposed those errors. Helpers retain their original behavior.

The optional overview uses local stdio metadata and a separate loopback preview.
Its status reader and protocol checks exercise real local code with bounded
synthetic fixtures. No production owner files or Codex settings are changed.
Native sidebar rendering and message-to-Setup execution remain unverified; the
computer-use surface refuses access to the Codex app. CLI installation alone
does not settle that gap. Complete fresh-chat acceptance remains with issue #4.

No Pi model simulations, new workers, remote code push, production plugin
cutover or release are part of this candidate. Recovery remains installed 0.14.1.
