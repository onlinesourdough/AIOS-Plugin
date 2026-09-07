# Verification

Run the maintained source checks from the repository root:

```sh
python3 tests/validate.py
python3 tests/layout-rehearsal.py
python3 tests/context-footprint.py
```

`validate.py` checks native declarations, package inventory, skill frontmatter,
relative links, one shared Codex/Pi skill source, the complete legacy-route map,
discovery contracts, owner-template isolation, external-owner coupling, and
selected security regressions. It also builds an isolated package copy so
author-only files cannot satisfy product links.

`context-footprint.py` compares representative selected-read paths with accepted
legacy commit `ca1ba807716d1a992889f02d41cddf94fdee9f32`. The checked-in
manifest records every old path, byte count and source hash used by each stage;
pass `--legacy-root /path/to/pinned/checkout` to verify it again. The benchmark
separates the observed bridge plus all skill name/description metadata from
task-selected skill bodies and complete references. New-home stages also count
the format contract, bridge asset and every neutral owner asset; verification
adds both the common acceptance boundary and setup-specific scenarios. Their
legacy stages count the complete shipped `.aios` scaffold. Other matching stages
cover local-first negative preload, owner routing, Spec readiness, worker Build
and basic Check. Every current selected path must be no larger than its legacy
package-owned comparison, and each skill body must stay at or below 8 KiB.

At the current source bytes, the startup method layer is 12,419 -> 3,488 bytes;
the representative full selected paths are 20.3% to 58.2% smaller. All skill
bodies together are 76,114 -> 48,517 bytes. Total skill Markdown is larger
(128,980 -> 182,550 bytes) because the native plugin owns more supported
harness/setup references; those files are split by real operation/capability and
must not be loaded as one corpus. Aggregate package size is not claimed as a
context saving. The complete neutral setup scaffold is 13,591 -> 4,738 bytes;
this is a package-owned materialization input, not populated owner context.

These are UTF-8 byte counts and explicit bytes/4 token estimates, not native
runtime token telemetry. Populated owner context is excluded: the accepted
snapshot has only template placeholders, not a populated historical owner
state, and task context varies by outcome. Target-repository AGENTS instructions
are also excluded from both sides. The neutral current AIOS.md plus MEMORY.md
assets are 1,016 bytes, but no before/after owner-context saving is claimed.
Behavior remains separately checked by route/link assertions, positive and
negative scenarios, and current source validation; fewer skills alone is not a
performance result.

`layout-rehearsal.py` uses temporary Git repositories to verify independent
Project/System roots, parent exclusions, and rejection of tracked nested work.

Before a real owner-data migration, record and inspect the actual backup restore,
source and destination hashes and modes, changed-source and changed-destination
cases, symlinks, unknown identities, idempotent replay, and preservation of later
owner edits. This is an operator checklist; this repository does not claim those
observations from an invented migration helper or a current native run.

The automated checks are source and Git-filesystem checks. They do not simulate
a model, mutate a real owner home, install AIOS, change native settings, launch
a worker, or prove desktop behavior. Native acceptance must use the target
harness and report its own exact version, source, and limitations. Historical
acceptance observations remain in Git history and GitHub Releases rather than
being presented as a current automated PASS.
