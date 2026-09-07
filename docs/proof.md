# AIOS 0.3.0 source proof

This is a source candidate, not a published release. It started from clean
HEAD `c682b051b785a9f9ab14af81692b55a45aa6905e`; the installed/recovery
baseline remains the reviewed `v0.2.2` package. No commit, tag, push, release,
owner-data write or persistent native installation was performed.

The candidate makes the repository root the single package source. The Codex
manifest, marketplace root and Pi declaration resolve to the same `skills/`
tree. The source validator stages only `.codex-plugin/`, `skills/`, the icon
and license as runtime content; `.agents/`, `AGENTS.md`, `docs/` and `tests/`
remain author-only. The package exposes 14 distinct skills. Manage Skills owns
the one personal and installed capability lifecycle; Maintain context retains
owner facts and configured Git sync.

| Boundary | Current evidence |
| --- | --- |
| Package topology and links | PASS: `python3 tests/validate.py`; staged archive links resolve without developer files satisfying packaged links |
| Skill inventory and frontmatter | PASS: validator finds exactly 14 named entries, all implicitly invocable, with one source for Codex and Pi |
| Root isolation | PASS: native Codex cache physically contains repository `.agents/skills/`, but app-server discovery from an ordinary fixture exposed the 14 product skills and none of the six developer methods; validator also rejects developer paths as consumer sources |
| Onboarding/layout/migration | PASS: the three deterministic rehearsals complete with collision, replay, owner-format, nested-root and recovery cases |
| Worker/review policy | PASS: fixture and caller rehearsal covers conditional orchestration, no-signal/delivery-only paths, lead-controlled archive and parity cases |
| Native Pi discovery | PASS: installed Pi loader observes exactly 14 canonical-root skills, implicit invocation enabled and no diagnostics; the broader candidate fixture observed 14 AIOS, four owner and two selected external skills, plus six local methods only in the trusted repository |
| Native Codex package and rollback rehearsal | PASS: disposable home installed the old nested `v0.2.2`, switched to root `0.3.0`, then removed it and restored/listed old `0.2.2`; the separate candidate probe also removed `0.3.0` to an empty installed list |
| Native model/workflow behavior | NOT VERIFIED: package listing/resource discovery does not prove model interpretation, fresh owner routing, worker launch or issue action |
| Other harnesses | NOT VERIFIED: portability is a thin future harness-native entrypoint to the same owner home/source, not an every-harness adapter or universal loader |
| Native rollback and desktop cutover | NOT VERIFIED: source and disposable Codex remove/readback are not a real client rollback, UI cutover or owner-data migration |
| Independent lead Review | PENDING: the final frozen subject and current evidence must be accepted by the lead |

## Reproduce source checks

Author commands use Python 3.12+ and add no consumer dependencies:

```sh
python3 tests/validate.py
python3 tests/onboarding-rehearsal.py
python3 tests/layout-rehearsal.py
python3 tests/migration-rehearsal.py
python3 tests/worker-review-rehearsal.py
python3 tests/review-subject.py --check
node tests/pi-discovery.mjs <installed-pi-dist>/core/skills.js
```

The Codex observations used the supported local marketplace/add/remove controls
against disposable configuration homes. The temporary caches are not an
installation claim about the user's real profile and were not used to change
the repository or persistent client state.

The source and rehearsals do not simulate a model, worker process, account
connection, permission decision, issue tracker, desktop Project selection or
cross-harness handoff. Those boundaries remain separate acceptance work. No
Improvement signal is inferred from this packaging migration; defects and
underlying improvement signals remain separate.
