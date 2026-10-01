# Optional task-check record

Use only when a selected AIOS overview needs dated evidence from actual task
checks. An existing supported home with its index, memory and connections can
show green local availability and open Overview without this receipt. The
panel must not turn receipt absence into a requirement to repeat onboarding.
File availability proves no account login or useful-work acceptance. Missing
receipts mean those task checks are unrecorded, not that no work was ever done.
Setup still owns acceptance and checks actual access when a task needs it.

After the actual checks in [Setup](setup.md), record only verified scope under
existing owner-data write authority at `context/codex-setup.json`. Do not create
or mark it from a file-presence check, model completion or UI click. Preserve
later entries and check supported format/latest bytes before patching.

Version 1 has `version: 1`, `hostKey` and optional `context`, `access`, `work`
objects. Each completed object has `verified: true`, an ISO `verifiedAt`, a short
non-sensitive `evidence` reference/description and `sourceHashes` mapping the
relevant owner filenames to their SHA-256 file-byte hashes. No default green.

- `context`: the owner has confirmed/corrected the scoped context and sources;
  bind current AIOS.md and MEMORY.md hashes. A blank scaffold does not pass.
- `access`: actual relevant account, effective settings and tool check;
  bind CONNECTIONS.md. Unneeded/declined optional tools are outside the check.
- `work`: accepted useful result plus actual fresh-chat reuse of relevant
  context; bind CONNECTIONS.md. A prepared prompt is not execution proof.

`hostKey` is SHA-256 of Node's `platform() + "\0" + hostname()`; retain the
opaque hash, not the raw machine name. Access/work proof applies only on that
host. It is a scoped dated receipt, not a security credential or attestation.
Changing bound bytes or host means recheck; source moves, account/access changes
and other stale evidence still follow Setup's acceptance rules even if hashes
match. The viewer does not independently replay those checks.

Git continuity remains optional and separate. Local Git status can report
changes or equality with last fetched refs; it cannot prove current cloud sync.
Only the authorized [Sync](../../aios-maintain-context/references/sync.md)
procedure verifies live remote identity/scope, effects and readback. Include
this optional record in a sync only when the agreed `context/**` scope covers it.
The plugin UI reads status; conversation skills own authorized context edits,
record creation and remote delivery. No UI action silently grants authority.
