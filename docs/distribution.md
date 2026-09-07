# Review and release AIOS

The release unit is this repository root: `.codex-plugin/`, `package.json`,
`assets/`, `LICENSE`, `README.md`, and `skills/`. Documentation, tests, and
`.agents/skills/` are author material and are not product skills.

## Before delivery

1. Keep the versions in `.codex-plugin/plugin.json` and `package.json` equal.
2. Run the checks in [verification](verification.md) and inspect the complete
   diff. Runtime observations stay separate from source checks.
3. Obtain independent Review of the exact tree to be delivered. Any relevant
   content change invalidates that acceptance.
4. Confirm the destination, action, visibility, recovery point, and authority.

## Git delivery

Use the local [Ship method](../.agents/skills/ship-project/SKILL.md). Re-attest
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
