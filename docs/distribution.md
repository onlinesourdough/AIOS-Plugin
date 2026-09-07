# Review and release AIOS

The release unit is one immutable AIOS-Plugin tree with root `.codex-plugin/`,
root `skills/`, its Codex marketplace and Pi declaration. This repository
distributes through private
Git access, not an npm publication or consumer installer. The client path is in
[README](../README.md); [native adapters](../skills/aios-onboard/references/adapters.md)
contain the supported commands and source references.

## Prepare the reviewed artifact

Update product versions together and current client documentation. Record
version history once in [GitHub Releases](https://github.com/onlinesourdough/AIOS-Plugin/releases),
not a separate changelog. Run package integrity, scoped onboarding, layout,
migration and worker/review policy rehearsals. Inspect actual skill decisions
with isolated representative requests, including failures and collisions. For
worker/review changes, include no-signal, delivery-only rework, worker and lead
signals, correct delivery with an opportunity, duplicate issue and missing
authority cases. Check external
plugin/skill metadata validators, and the target native loader where available.
Use [proof](proof.md) to separate source, synthetic and native observations.

Generate `docs/review-subject.json` with `python3 tests/review-subject.py` after
all subject edits, then use `--check`. Freeze an archive, file hashes, reviewed
base and exact Git tree independently of mutable reports. Independent lead
Review must inspect final artifacts and current evidence. A relevant later edit
returns to the same writer for affected checks and new acceptance.

## Authorized Git delivery

The local [Ship skill](../.agents/skills/ship-project/SKILL.md) owns the full
Git gate. Pin the exact reviewed tree/commit and base, re-attest checkout and
credential-free destination, and freshly fetch private `onlinesourdough/AIOS-Plugin`
main. Stop on unexpected staged/working changes or remote drift. Never rebase,
force or merge an unreviewed integration to fit the release.

Only after exact lead PASS and existing release authority, commit precisely the
reviewed tree and normally push that commit to the authorized main branch.
Create the corresponding annotated `v<version>` tag and private prerelease when
that scope is authorized. Release notes state concrete changes, migration,
observed checks and native acceptance limits. Do not publish client facts or
claim a tag exists while only source metadata has changed.

Fresh-fetch and read the remote main and peeled tag. Verify both equal the exact
reviewed release commit and read the native release record for identity,
visibility, tag and prerelease state. Preserve earlier tags and artifacts.
Fast-forward a primary checkout only when separately in scope, clean and still
at the expected baseline; otherwise leave it unchanged and report drift.

## Native adoption and client acceptance

The installation lead uses the reviewed tag/commit, verifies one effective
source per selected skill, and tests a fresh ordinary owner request plus an
independent repository request. Follow the explicit identity map for older
packages or template/global collisions. Installation does not authorize moving
owner files or rewriting native settings wholesale.

Desktop entry-point cutover, client account connections, actual model behavior
and native rollback require their own observed evidence. A successful package
release or Pi resource load cannot substitute for those checks. Keep delivery,
recovery and measured outcome separate. Continue the same outcome until its
accepted obligations are met; do not close it at a phase boundary.
