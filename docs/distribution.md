# Review and release AIOS

The release unit is this repository root: `plugin.json`, the native compatibility
manifests, `package.json`, `gemini-extension.json`, `assets/`, `LICENSE`,
`README.md`, the single `skills/` source and `docs/public/aios.md`. The overview
is package documentation, read only when needed. Other documentation, tests and
the optional specialist shelf remain author material, not product skills.
This repository carries no local generic lifecycle skills.

## Before delivery

1. Keep identity/version equal across all native manifests and the Claude
   marketplace entry. The Codex marketplace resolves the root manifest.
   Run the [native packaging checks](native-installation.md) for changed adapters.
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

`docs/public/aios.md` is the only approved source artifact for public AIOS
orientation. It ships in the package and visibly states the matching AIOS
version. It is not the full skill library, customer documentation or an
installation endpoint. No other documentation becomes public by implication.

When the package version changes, review the overview and update its version
line. `python3 scripts/public_docs.py check` and the normal package validator
reject a missing, unshipped or mismatched version. The content review establishes
accuracy; a matching version alone does not prove the prose is correct.

After reviewing an immutable source revision, prepare its export:

```sh
python3 scripts/public_docs.py export --ref REVIEWED_REF --output /new/export-directory
```

The author-only command reads the committed source, checks the package identity
and version, and produces exactly `aios.md` plus `aios.meta.json` in a new
directory. The metadata records package version, immutable commit, source date,
canonical path, SHA-256, and byte length. It contains no credentials or owner
context. An existing export directory is never overwritten.

[Versioned documentation](../.github/workflows/documentation.yml) runs these
checks and prepares the same two-file workflow artifact for pull requests,
`main` updates, published releases and explicit dispatch. Release events also
require the tag's version to match the package. The workflow has read-only
repository permissions and does not publish the site or add a consumer runtime.

Resources owns public adoption. Its maintainer imports the reviewed export:

```sh
npm run update:aios -- /export-directory REVIEWED_COMMIT
npm run ci
```

Those commands run in Resources. The reviewed commit must be selected from the
accepted source/release, rather than trusted solely from imported metadata.
Resources checks both files before replacement and serves `/aios.md` and
`/aios.meta.json`. Its existing review/merge/deploy path publishes the copy;
verify the public version, source and bytes against the reviewed export after
deployment. A source delivery is not completion of a requested public-site update.
The site deployment, release, tag or visibility change remains a separate authorized action.

Retain the previous source revision and Resources commit for recovery. A failed
website update leaves the plugin's local documentation available. Reverting a
public update restores the document and metadata together through Resources'
normal delivery path. The installed version and public-site version remain
explicitly distinct.
