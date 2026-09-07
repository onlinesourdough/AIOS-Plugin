---
name: aios-update
description: Adopt or roll back a reviewed AIOS native package at a task boundary. Plan legacy OSM or AIOS adoption without overwriting owner data or colliding skills.
---

# Update AIOS

Keep the active task on its known method version. At a suitable task boundary,
inspect the requested immutable release, current installed identity and source,
owner-format compatibility, discovery origins and recovery path. Use
[native adapters](../aios-onboard/references/adapters.md) for supported package
operations. A source checkout is not an installed release.

## Choose the adoption path

- An existing native `aios@online-sourdough` package uses its supported update
  or reinstall operation targeting the reviewed ref.
- An OSM 0.1.x package changes identity as well as method content. Follow
  [identity migration](../aios-onboard/references/migration.md); updating the old
  selector does not install the new one automatically.
- A legacy AIOS template/global skill installation needs the same explicit
  source/registration inventory. Identical skill names are not evidence that
  this package owns those files. Never invoke the old template updater to copy
  methods into this package or infer ownership from an `aios-*` prefix.

Use a read-only plan first: exact source/tag or commit, installed and target
versions, native registrations, owner-data compatibility, potential conflicts,
permitted mutations and preserved rollback identities. Read release notes and
check hashes/source identity. A missing baseline or customized discovery source
is a gap to resolve, not permission to overwrite it.

## Apply and verify

Under existing exact installation authority, use supported native actions for
only the accepted package/registration changes. Leave owner data and custom
skills untouched unless a separately reviewed migration explicitly includes
those paths. Do not edit caches, native databases or the entire settings file.
Respect app-control denials and current native permissions.

Read back package source/version and start a fresh session. Verify all 14 public
skills are discoverable exactly once and that ordinary owner and independent
repository requests use the intended routes. Report source installation,
discovery, desktop entry-point cutover and model behavior separately. A failed
or unavailable native observation stays pending even if source checks passed.
Use [Check](../aios-check/SKILL.md) for the relevant acceptance scope.

## Recover

Preserve the prior reviewed ref and pre-change registration/bridge evidence.
A failed update stops further activation; restore only the scoped native
registration through supported actions when authority covers recovery. Do not
delete the old artifact, home, history or unknown settings. An uncertain action
requires readback before retry. Subsequent edits are conflicts, not overwrite
permission. Product rollback does not roll back owner data; the explicit
[migration map](../aios-onboard/references/migration.md) owns that separate
recovery. Report exact delivered/active identity, unavailable proof and the
next bounded action.
