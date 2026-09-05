# Resume without losing work

Use at reconnect, compaction, approval wait, upstream drift or uncertain effect.
Read the existing linkage, contract revision, state, last acknowledgement,
artifact hashes, pending Review/triage brief and latest output. A paused task
is not failed. Resume the same native session and bounded goal at the same root.
Lost goal handles do not justify a duplicate writer. If identity cannot be
proved, stop that mutation and ask the lead to reconcile. Replace only after
explicit stop or proven failure, retaining original state and recording the
replacement attempt under the original contract.

## Deletion and recovery boundary

Before an authorized destructive change, identify the exact paths/resources,
what will be lost and which recovery source actually covers it. Git history
does not recover untracked or ignored files: git clean -fdx can permanently
delete them. A clean status, disposable-looking folder name or command allowlist
is not recovery proof. Preview the affected scope, preserve necessary state and
test restore where recovery is required; otherwise make irreversible loss
explicit before proceeding within exact authority. Never execute destructive
commands merely to test a guard. Use inert inputs or disposable synthetic data.

## Dirty checkout and changed upstream (#60)

1. Stop durable writes. Record exact root, session, branch, HEAD, current
   instructions, status and hashes of tracked, staged, untracked and relevant
   ignored work. Preserve contents and file modes in the owner's local recovery
   location before any integration. A diff alone misses untracked/binary files.
   Do not export secrets into product evidence.
2. Verify remote/account identity, then fetch the exact configured branch for
   observation. Never pull, stash, reset, clean, auto-merge, rebase or force.
   Compare base-to-live changes with local edits and the accepted contract.
3. Instruction, authority or overlapping content drift requires lead decision.
   Preserve base, local and upstream versions and report exact intersections.
   Non-overlapping upstream movement still needs a reviewed integration plan
   when the local Git gate requires equality; do not label it data loss or
   automatically replace the worker.
4. With a reviewed scoped reconciliation, the same worker may integrate only
   the outcome's changes on the accepted base. Keep unrelated dirty files and
   their hashes untouched. A separate clean checkout is permissible only when
   isolation is necessary, the original is preserved, the runtime supports
   reattestation and the lead records the new checkout under the same session.
   No second writer for this outcome.
5. Re-read changed instructions, re-attest, rerun affected acceptance on final
   bytes, and return to the lead for a fresh decision. If no safe integration
   is authorized, retain both versions and return a bounded blocked handoff.

## Repeated handoff or final action (#48)

Use linkage + contract revision + target state + accepted artifact identity to
recognize duplicate requests. Read actual current state before replay. A
repeated PASS acknowledges the same accepted bytes; it cannot authorize later
edits or a different target. For an uncertain push, issue or send, read the
exact destination first. Existing matching delivery means verify and record,
not repeat. If identity or effect cannot be established, stop for reconciliation.

Keep local recovery state out of the product and portable owner core. Backups
need a restore rehearsal; rollback must not overwrite owner edits made after
the backup. Restore only scoped bytes whose current identity is still the
expected post-change version, otherwise preserve both for the lead.
