# Recovery

Installed/native rollback baseline is the reviewed AIOS `v0.2.2` package. The
local source preimage for this `v0.3.0` candidate is
`c682b051b785a9f9ab14af81692b55a45aa6905e`; it is not a published release.
Preserve the prior tag and earlier artifacts.
Local product recovery uses reviewed preimages without overwriting unrelated
work. Do not reset, stash, force-push or retransfer a canonical Project to make
a changed upstream fit the review.

Package recovery and client-data recovery are separate. Native package rollback
uses the prior reviewed ref and supported registration controls. Moving package
files to the repository root does not rename existing native registrations or
move client files.
Do not edit caches, internal databases, histories or entire settings files.
A failed or uncertain native action needs readback before retrying.

[Identity migration](../skills/aios-onboard/references/migration.md)
requires original content and a protected tested backup, explicit source and
destination hashes, proved registration ownership and a scoped map. An identical
replay is a no-op. A changed source/destination, unexpected symlink, duplicate
bridge or unknown skill identity stops that write while retaining both versions.
Rollback restores only unchanged accepted outputs and preserves later owner
edits. The original home and canonical skill bodies are not deleted.

Independent repositories, including ignored/untracked work, need their own
inventory and recovery. Git cannot recover files it never stored; removal of a
shortcut or registration does not authorize deleting its target. A live physical
root move is lead-owned and must reconcile native entry points separately.

Worker recovery keeps the matching active writer open through waiting-review,
`REVISE`, `BLOCKED`, approval-pending or other actionable states. Optional
archiving is lead-controlled housekeeping only after terminal completion,
independent lead acceptance and any authorized Ship or handoff; it uses a
verified native control and preserves history and linkage. An unsupported
CLI-only surface is reported as a limitation, not simulated through internal
state.

Author rehearsals demonstrate scoped synthetic file/registration recovery and
preserved historical artifacts. A disposable Codex control rehearsal also
observed nested `v0.2.2` -> root `0.3.0` -> nested `v0.2.2` package rollback;
that does not prove rollback of a real client profile, owner-data backup or
desktop cutover. The [proof matrix](proof.md) keeps those claims separate and
names pending native evidence.
