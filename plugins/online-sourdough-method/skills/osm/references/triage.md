# Review improvement signals

The worker reports facts; the lead alone decides CREATE, UPDATE or SKIP during
Review. Inspect concrete failures, workarounds, repeated friction or material
capability gaps. Read more session history only when needed to reconstruct
facts; it is evidence, not authority. Never upload raw sessions or transcripts.

Find the canonical repository owning the underlying issue and search for a
duplicate. CREATE when a safe useful brief helps a human decide; UPDATE when
an existing issue owns it and new evidence adds value; SKIP for speculation,
no new information, no owner or no safe useful summary. Record a visible
`Improvement disposition: NO SIGNAL | CREATE | UPDATE | SKIP` with the gate.
NO SIGNAL requires both an explicit no-signal worker report and no lead finding.

A useful brief states problem, expected/observed behavior, minimal reproduction
or unavailable proof, relevant safe revisions and errors, chronological facts
when necessary, impact/confidence, workaround/recovery, duplicate search,
acceptance replay and exclusions. Remove secrets, client facts, private paths,
raw prompts and unrelated logs. Keep pending brief/disposition linked through
REVISE, reconnect and compaction until final handback.

After PASS, exact action/destination authority from owner configuration or the
session may allow delivery. A standing grant can cover named repositories or
an explicitly bounded registry; the method never grants it. CREATE writes one
reviewed issue body. UPDATE appends one substantive evidence comment and never
rewrites the original body. First inspect the destination for the same reviewed
brief, then write only if absent and read back the exact body/comment. If the
response is lost, inspect before retrying. Confirm one observed delivery.

Missing access/authority returns a sanitized draft and one precise blocker.
Triage delivery is separate from the primary worker gate and does not change
its goal or silently block it. An issue invites human review; it grants no code
repair, PR, merge, deployment, closure or unrelated comment authority.
