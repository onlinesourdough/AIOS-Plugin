# Sync owner data

Before changing owner data or finalizing its delivery, verify supported
AIOS_FORMAT using [data compatibility](../../aios-onboard/references/data-format.md).
Unsupported/malformed formats remain read-only even in a Git-backed home.

Local mode: no Git preflight or remote is required. Use source-byte comparison,
scoped edits and a file backup. Git without a configured remote remains local;
do not invent an upstream or block local work solely because Git is absent.
A configured remote invokes this stricter checkpoint. Repository workers also
obey their own local Git gates; this reference does not weaken them.

Read the exact Git row in CONNECTIONS: root, remote, credential-free fetch and
push URL, branch ref, access/account, allowed data paths, capability and push
approval. `ask` is the default; standing approval must already name the exact
destination and branch plus action scope. Reuse it without repeated approvals.
Never derive permission from this method or authentication. Stop on mismatched
root/upstream/remote/account, detached HEAD or secret-bearing URL (do not print
it). Preflight never pushes.

## Before durable edits

Attest the owner-data Git top level and branch. Inventory staged, unstaged and
untracked changes; ignored repository checkouts/recovery work remain outside
the result. Fetch the exact live branch; classify HEAD as equal, behind,
ahead or diverged using commit ancestry, not cached tracking refs.

- Clean equal: pass after live readback.
- Clean behind: fast-forward-only under existing sync authority, then re-read
  instructions and verify live equality before work.
- Ahead: finish that reviewed delivery first; no preflight push.
- Dirty, diverged, uncertain access or mismatch: preserve state and stop
  durable sync/editing. Use [same-worker recovery](../../aios/references/recovery.md).

An active task's own expected dirty changes are not grounds to discard work or
restart onboarding. They proceed to Review under the same baseline; freshly
check upstream again at the next task/delivery boundary. Unexpected edits or
upstream drift require scoped reconciliation.

## After Review, at task-boundary delivery

Inspect the complete diff and stage only explicitly reviewed durable data paths,
never `git add .`, all checkouts, backups or unrelated changes. Check staged
content for scope and secrets, then make a scoped commit only under current
commit authority. Record reviewed tree/commit and base. Initial unpublished
local history needs a separately authorized first publish; there is no phantom
upstream equality requirement before a remote exists.

Re-attest target and fresh-fetch. Only the reviewed ahead commits may be
normally pushed to the exact authorized branch. Matching standing authority is
sufficient; otherwise obtain approval for that concrete push. No force, stash,
automatic merge/rebase, broad push, tags or other remote writes. If remote moved,
stop and return to same-worker reconciliation. Do not fast-forward new changes
into a reviewed delivery and pretend the prior PASS covers them.

Read back the live branch after push and prove HEAD equals its exact object.
An uncertain response or race triggers one readback/reclassification, not a
blind push loop. If still uncertain, preserve the commit and stop. Completion
requires equality when remote delivery is part of the task. Return root,
branch, sanitized remote identity, local/live IDs, relation, approval basis,
scoped paths, action and final verification or blocker.
