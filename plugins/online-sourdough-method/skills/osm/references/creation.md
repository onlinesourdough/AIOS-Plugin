# Create only a justified independent owner

Read [routing](routing.md) and the READY [worker contract](lifecycle.md) first.
Existing owners are adopted in place, never refreshed from a template. The
lead selects name, safe lowercase hyphen slug, final absolute root, optional
canonical URL, outcome, authority, proof and accepted immutable input pointers.
The owner registry supplies the canonical credential-free HTTPS .git seed URL.
Validate URL has no userinfo, whitespace, query or fragment. Freshly query
symbolic HEAD and main; require refs/heads/main and freeze one exact live
40-character commit SHA. Cached refs or a remembered pin are not live evidence.
Network failure or a changed SHA stops before transfer.

No registration in an unrelated legacy home. Respect a separately chosen root;
OSM registries may point outside OSM. Reject existing path/registry/canonical
identity duplicates. The lead creates only the final empty unborn main repo,
then launches the same sole first-class worker that will own implementation.
Attest exact physical root/Git top level, branch, zero history/refs/remotes and
no tracked/untracked/ignored files; verify registry absence before source access.
No temporary template clone or separate seed worker.

## New bounded Project — APT

Read the single APT URL from projects/README.md. In the exact final root add
that URL as temporary origin, fetch live main, verify FETCH_HEAD equals frozen
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

## New persistent reusable System — AST

Require purpose, cohesive reusable responsibilities, ownership, invoke
condition, primary skill, natural return and proof boundary; explain why
one-off work, a Skill or Project is insufficient. Read the single AST URL from
systems/README.md. Fetch into one temporary non-branch seed ref in the final
empty repo and verify exact commit. Materialize the frozen seed tree with Git
archive/extraction preserving the new repo's .git. Do not check out template
main, merge, inherit history or make a seed commit.

Read seed AGENTS.md, README.md, template primary skill and audit-system before
transforming. Replace generic identity/primary skill with the concrete System,
record exact URL@SHA, operation/proof/recovery and standalone ownership.
Retain/adapt audit-system only when ongoing state/currentness audit is a real
responsibility. Keep support only when justified by the accepted contract.

AST supplies a neutral seed, not another System's source. Never copy AIOS owner
truth, a sibling System implementation, runtime, ledgers, schemas or examples
into the new System to simulate a capability. Implement its own responsibility
locally only after its contract is ready. No template runtime dependency or
later template refresh.

Retain temporary seed access and all observed files on failed proof. After
concrete identity, primary route, local evals and provenance pass, remove only
the known temporary remote/ref. Prove main is still unborn with zero refs and
remotes, no generic primary identity, and every support path justified.

## Registration after proof

Worker returns one proposed row in the selected owner registry's existing
schema: name, slug, canonical URL or explicit local marker, final path, outcome
and responsible owner, local lifecycle (Project) or primary skill/invoke/return
(System), proof and checkout verification state. It never edits the lead's
registry. The lead runs owner-data sync when configured, rechecks absence and
adds only that verified row, then checks routes. If registration blocks, retain
the canonical repo and retry registration only; never recreate or transfer.
Creation, revisions, registration evidence and authorized Ship retain the same
worker/session and goal. No source copying from Systems into OSM.
