---
name: aios-create-project
description: Create a justified new bounded Project at its final root using the live Project Template and register only after proof.
---

# Create Project

Start with a READY owner contract. Apply the
[creation boundary and registration procedure](../aios/references/creation.md)
before acquiring source: duplicate checks, verified seed identity, the empty
final root and one correctly launched repository worker are required. Existing
repositories are adopted in place and are never refreshed from a template.


APT is a Project seed, not an installed System or a preclone dependency. Acquire
it only for an authorized new Project. Read its URL from projects/README.md.
In the exact final root add that URL as temporary origin, fetch live main,
verify FETCH_HEAD equals frozen
SHA, then check out local main at it. Re-attest root, branch, exact HEAD, sole
origin fetch/push URLs and completely clean seed. Read frozen AGENTS.md,
README, validator and scripts/create-project.sh. Run the seed validator, then
recheck source and clean state. Invoke only APT's own reviewed transfer:

```sh
bash scripts/create-project.sh --in-place   --name "Resolved Project Name" --outcome "Resolved bounded outcome"   --source-url "VERIFIED_APT_URL" --source-sha "FROZEN_SHA"
```

Add --canonical-url only for an already resolved destination. Substitute
verified values with correct argument quoting; never run placeholders. APT
owns atomic replacement and recovery. Do not wrap or copy its script. Before
transfer failure, remove temporary seed state only if the original empty repo
can provably be restored; otherwise retain observed state. During transfer
follow its reported restoration/retained recovery path; never delete uncertain
state. The seed validator may create isolated fixtures; these are validation,
not a second acquisition/creation worker.

Immediately re-enter the exact final root in the same session. Read generated
AGENTS and local lifecycle. Prove unborn main, zero refs/remotes, requested
identity/outcome, ownership/proof/recovery records, local lifecycle routes,
excluded seed-only paths and exact URL@SHA provenance. Verify generated identity
hashes. Add only accepted immutable handoff provenance, preserving it exactly.
Now the Project alone is canonical; continue its full local Spec/Build/Review.


After proof, the worker returns the proposed registry row; the lead alone
finalizes registration. A blocked registry write preserves the canonical new
repository and retries only registration. Continue its local lifecycle under
the same worker; creating an owner does not authorize external publication.
