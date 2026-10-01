# Review and release AIOS

AIOS has one canonical `skills/` source and two release archives:

- **Codex:** native manifest, marketplace entry, skills, local overview runtime,
  icon, documentation and licenses. Requires Node.js 22+, with no consumer npm install.
- **Portable:** Agent Plugins root manifest and native skills adapters. No MCP
  runtime, installer hook or background service.

The portable manifest lives in `packaging/portable-plugin.json` in source. It is
emitted at the ZIP root only for the portable package. A recognized portable root
makes its components canonical, so a Codex-only MCP declaration in an overlay
would be ignored. The Git source and Codex ZIP therefore use the native manifest.
Author tools, tests, owner context and credentials are excluded from both ZIPs.

## Before delivery

Keep all native versions, the portable template, UI build package, overview and
changelog aligned. Maintain each skill's own [SemVer](skill-versioning.md).
Inspect the final diff and run [verification](verification.md). Obtain independent
Review of the exact release tree before merge/publication; content changes
invalidate that acceptance. Preparing a reviewable PR is not that independent
acceptance. Confirm destination, visibility, recovery point and action authority.

## CI and reproducible packages

[CI](../.github/workflows/ci.yml) runs on pull requests and main updates. It uses
pinned Actions, read-only repository permissions, Node.js 22 and the pinned npm
lockfile with install scripts disabled. It rebuilds the committed runtime and
rejects differing bytes, validates skills/docs/version progression, exercises
source/Git and domain helpers, tests the extracted stdio protocol, and uploads
both ZIPs with `SHA256SUMS` as `aios-release-package` for 30 days.

Run locally from the repository root:

```sh
npm --prefix apps/overview ci --ignore-scripts --no-audit --no-fund
npm --prefix apps/overview run build
python3 tests/validate.py --baseline origin/main --release-tag v0.16.0
npm --prefix apps/overview test
python3 tests/release-package.py
python3 scripts/package_release.py
```

The packaging test checks deterministic archives, exact skills inventory,
Codex/portable isolation, checksum equality and the extracted server. Node
protocol checks and isolated CLI installation do not prove native sidebar,
editor, account onboarding or model behavior. Report those gaps explicitly.

## Git delivery and draft CD

Use shared Ship with its Git release reference. Fresh-fetch the target, attest
physical root, clean state, reviewed commit/tree/parent and credential-free
remote. Push the accepted commit without force, then verify live commit equality.
A branch push, merge, tag and publication are separate actions. Never move a
published tag or replace an existing release's assets silently.

After independent acceptance and authorized merge, create the reviewed version
tag on its exact main-branch commit. **Tags do not publish a release.**
[Prepare draft release](../.github/workflows/release.yml) is manual, run from main
with an existing version tag. It checks the tag's main ancestry, version and
changelog, reruns CI on that source, verifies checksums and creates a **draft**
GitHub release with the ZIPs. It refuses existing release tags, including drafts;
inspect/recover an uncertain outcome before retrying. Public publication is a
separate owner-approved action. Keep previous immutable releases for recovery.

The existing v0.15.0 prerelease is retained; this candidate is v0.16.0. No new tag,
release publication or OpenAI submission has occurred merely because CI passes.

## OpenAI public directory

GitHub distribution is usable by anyone with the repository marketplace source.
It does not automatically list AIOS in OpenAI's public Plugins Directory.
[OpenAI's submission guide](https://developers.openai.com/plugins/deploy/submission)
requires a ZIP upload, automated findings, submission, review/approval and then a
separate Publish action under a verified publisher identity.

For a public MCP plugin the documented route expects a stable HTTPS endpoint.
For local MCP, contact OpenAI for local support when HTTPS deployment is not
appropriate. AIOS reads the user's own local home; do not host owner data merely
to satisfy directory submission. The local Codex UI package is not yet qualified
for that public-directory route. A separate skills-only package can follow the
skills submission route; adding MCP to an already-submitted skills-only plugin
is currently unsupported, so confirm the intended product identity first.

MCP review also needs real website/support/privacy/terms URLs, exactly five
positive and three negative review cases, and an accessible demo recording.
The publisher website and GitHub support are declared. Approved privacy/terms
pages, review assets, publisher verification and local-MCP acceptance remain
outstanding; do not fabricate them or claim submission readiness.

The listing uses the original square pixel-bread icon and valid text lengths.
Native logo/sidebar presentation and `/aios-design` command syntax still need
host acceptance; package metadata cannot remove a namespace imposed by the host.

## Local documentation

`docs/aios.md` is the version-matched overview in both packages. Validation
checks its regular file, inventory and version; release validation also checks
the tag and changelog. Content review establishes the explanation's accuracy.
Other docs stay author material. The local overview needs no hosted docs server.

## Release and adoption

Users update through [native installation controls](native-installation.md),
then start a fresh conversation. A source push or new chat alone does not replace
an installed package. Read back installed version, source and actual discovery.
An update cannot erase methods already loaded in a running conversation.

Rollback selects a previous reviewed tag/commit through the same controls. Plugin
uninstall removes its registration and local companion; retained caches depend
on the client. Owner files, personal skills and separately configured bridges
remain intact. Never edit client databases or caches to simulate adoption.
Owner Git continuity remains an explicitly requested, scoped Sync operation;
plugin releases and UI status checks never commit or push owner data.
