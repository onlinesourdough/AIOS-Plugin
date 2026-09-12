# Review and release AIOS

The release unit is this repository root: `.codex-plugin/`, `package.json`,
`assets/`, `LICENSE`, `README.md`, and `skills/`. Documentation, tests, and
the optional specialist shelf are author material and are not product skills.
This repository carries no local generic lifecycle skills.

## Before delivery

1. Keep the versions in `.codex-plugin/plugin.json` and `package.json` equal.
   The marketplace resolves this root's manifest; it carries no separate version.
   Maintain each skill's independent [SemVer](skill-versioning.md) and compare
   against the last reviewed release/commit. Prepare [release notes](../CHANGELOG.md).
2. Run the checks in [verification](verification.md) and inspect the complete
   diff. Runtime observations stay separate from source checks.
3. Obtain independent Review of the exact tree to be delivered. Any relevant
   content change invalidates that acceptance.
4. Confirm the destination, action, visibility, recovery point, and authority.

## Git delivery

Use shared `aios-ship-work` and its Git release reference. Re-attest
the physical root, branch, clean state, credential-free remote, reviewed commit,
tree, and parent. Fresh-fetch the exact target branch and stop on drift.

Push only the reviewed commit with a normal non-force push when that exact
branch action is authorized. Fetch and read the destination again; the local
and live commit IDs must match. A commit, push, tag, release, and installation
are separate actions and require their own applicable authority.

## Release and adoption

Use [GitHub Releases](https://github.com/onlinesourdough/AIOS-Plugin/releases)
for version history. A tag or release is not implied by a source version or
branch push. Native adoption follows the
[adapter guide](../skills/aios-onboard/references/adapters.md), preserves owner
data and unrelated settings, and verifies the actual installed source.

Keep delivery, recovery, and observed outcome distinct. Package listing or
resource discovery does not prove model behavior, account access, desktop
cutover, or owner-data migration.

## Public AIOS overview export

`docs/public/aios.md` is the only approved source artifact for a future public
AIOS overview export. It is an orientation document, not the package, its
executable skill library, customer documentation, or an installation endpoint.
No other documentation becomes public by implication.

Before an authorized consumer publishes it as `/aios.md`, freeze the reviewed
source commit and an immutable release tag (or explicitly recorded immutable
commit when no tag exists). Run the current author checks, then record the
following values from the exact source tree alongside the export:

```sh
git rev-parse HEAD
git describe --exact-match --tags HEAD || printf '%s\n' 'untagged'
shasum -a 256 docs/public/aios.md
wc -c < docs/public/aios.md
```

The consumer accepts only that one file and records its source commit/release,
SHA-256, and byte length. A later site deployment, release, tag, or visibility
change remains a separate authorized action with its own readback; this
repository does not perform any of them from an author check.
