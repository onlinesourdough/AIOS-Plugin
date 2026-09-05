# AIOS 0.2.1 proof

Baseline: released AIOS v0.2.0 at
`b8c7e79fa315edb9a13f0f4e16f8f56d4ab36ec5`.
This record concerns the changed source, not an installed client.

| Boundary | Evidence |
| --- | --- |
| Shared package, 11 entrypoints, owner format | PASS: package validator including extracted links and preserved historical archive |
| Icon metadata and PNG | PASS: shared native logo/composer path, square PNG and inspected 64-pixel preview |
| Native plugin and skill metadata | PASS: external plugin validator and all 11 Skill Creator validators |
| Native Pi resource discovery | PASS: installed Pi loader finds exactly 11 shared skills, implicit invocation enabled, no diagnostics |
| Onboarding, layout and migration | PASS: existing isolated after-image, replay, conflict, source-preservation and recovery rehearsals |
| Personal skill instruction decisions | PASS: independent synthetic interpretation of create, foreign-link rename collision, repo-local edit and unavailable native discovery |
| Independent final Review | PASS: exact 88-path frozen inventory, no Critical or Required findings |
| Private repository rename | Verified: existing repository is now onlinesourdough/AIOS-Plugin; private release history retained |
| Candidate release and native adoption | Not performed; source changes do not update the installed package |
| Fresh-session personal skill behavior and native rollback | NOT VERIFIED by this source task |

## Reproduce source checks

Author commands use Python 3.12+; they add no consumer dependencies:

```sh
python3 tests/validate.py
python3 tests/onboarding-rehearsal.py
python3 tests/layout-rehearsal.py
python3 tests/migration-rehearsal.py
python3 tests/review-subject.py --check
```

External metadata checks ran with the author-only PyYAML environment because
system Python did not provide YAML. These checks validate metadata, not model
behavior. A Pi loader check observes resources only, not skill execution.

## Review scope and limits

The independent instruction review selected these routes: personal authoring
uses the native Skill Creator at the canonical owner path; a foreign same-name
link is preserved and blocks registration; repository-specific editing stays
under local instructions without personal reads; unavailable native discovery
is reported separately as NOT VERIFIED. No actual owner files or registrations
were mutated for these cases. This is synthetic interpretation, not cold runtime
acceptance.

Visual inspection used the latest warm sourdough icon, including a 64-pixel
preview: one loaf silhouette, soft cream tile and readable AIOS pixel lettering.
The generated lettering is not asserted to be an exact font-file rendering.
Earlier rejected image variants are not package assets.

README tone review used the owner's practical onlinesourdough mode: plain
English, useful examples, short paragraphs and no unsupported product claims.
The approach keeps one procedure owner and one release-history source, reuses
existing capabilities and does not add unattended automation.

The frozen inventory binds source independently of this report. Relevant later
changes require affected verification and independent acceptance again. Previous
release evidence remains in Git history and the unchanged
[0.1.x archive](archive/0.1.x/README.md); it is not reused as current acceptance.

Independent final acceptance binds review-inventory SHA-256
`70e4f064e5ca1ac537f953e79ea6d27d0a6ca041673391948a253e207a4db96e`.
The reviewer independently repeated package, onboarding/layout/migration,
frozen-inventory and native Pi resource checks. External metadata and final
owner icon approval were lead-provided evidence. No release or native client
mutation was performed.
