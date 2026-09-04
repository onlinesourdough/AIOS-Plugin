# Proof and review boundary

Revision 2 local Build/Review: PASS for the bounded revisions and author checks.
Independent lead Review: PENDING after the prior REVISE. Delivery: NOT PERFORMED. Recovery: synthetic
file rehearsal PASS; live harness recovery NOT VERIFIED. User/business outcome:
PENDING, measured by the accepting lead during installation and pilot work.

The final review subject is [SHA-256 inventory](review-subject.json). Evidence
files are outside that subject to avoid self-referential hashes. A relevant
subject mutation requires affected checks and renewed lead acceptance.

| Check | Observed result |
| --- | --- |
| Live APT main and direct final-root acquisition | 02cb0e4fc63203f1afb090df8632d20d5aedb9a3; fetched SHA matched |
| APT validator before transfer | PASS, including standalone/in-place creation and guarded recovery fixtures |
| Actual APT in-place transfer | PASS; final root re-entered; unborn main, zero refs/remotes, six local skills, no seed-only paths |
| Scaffold plugin validator | PASS under isolated PyYAML author environment |
| Four skill quick validators | PASS for every shared skill |
| python3 tests/validate.py | PASS: shared bodies, manifests, links, format, privacy scan; extracted archive reaches all 17 parity mappings without developer docs; negative controls reject split sources/install scripts/missing map |
| python3 tests/revision2-rehearsal.py | PASS: synthetic transformed method target, recoverable originals/unknown metadata, replay/conflict, Git-backed home, invalid formats and baseline-preserving configuration decisions |
| python3 tests/review-subject.py --check | PASS: all 53 final subject paths/hashes match; prior inventory was rejected after changes |
| Native Pi loader | PASS: exactly four names, no diagnostics, implicit invocation enabled |
| Synthetic behavioral dry-runs | See behavior-review and rehearsal-results; actual file preservation/restore hashes and explicit interpretation limits |
| git diff --check | PASS; unborn untracked tree also checked by author Markdown whitespace validation |
| Source privacy/ownership review | No private owner context in plugin; legal inherited license attribution retained; no owner facts or credentials in assets |
| Execution-evidence separation | Earlier exact attestation archived intact in ignored local evidence; root HANDOFF.md ignored; distributable Markdown contains no personal machine paths or session UUIDs |
| Independent forward test | Prior subject passed four scoped decision/rehearsal scenarios; not cold activation or acceptance of revision 2 |

First external-validator attempt failed because system Python lacked PyYAML.
An ignored repository-local `.tmp/validation-venv` with PyYAML 6.0.3 was used;
this is not a product dependency and no global environment was modified.

Reproduce external checks with a Python environment containing PyYAML and the
installed plugin-creator `scripts/validate_plugin.py` plus skill-creator
`scripts/quick_validate.py` for each skill folder. Reproduce native Pi discovery:
`node tests/pi-discovery.mjs /path/to/installed/pi/dist/core/skills.js`.
No install, account operation or model call is performed by that check.

[Revision-2 review](revision-2-review.md) · [Initial behavior review](behavior-review.md) · [Initial observed hashes](rehearsal-results.json)
· [Source inventory](source-inventory.json) · [Parity](parity.md)

Required later proof: authorized isolated/cold Codex and Pi installation,
ordinary owner-language activation, repository-local read trace, global override
handling, permission denial, same native session reconnect, private delivery
readback, and real migration inventory/restore. These are not claimed passed.
Claude/Linux/other harnesses are not automatically supported by file portability.
