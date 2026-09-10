---
name: aios-create-project
description: Create a justified new bounded Project at its final root using the registered live seed and register only after proof.
---

# Create Project

Start with a READY owner contract. Apply the
[creation boundary and registration procedure](../aios/references/creation.md)
before acquiring source: duplicate checks, verified seed identity, the empty
final root and one verified repository writer are required. Continue in the
current task unless [shared execution](../aios/references/lifecycle.md) selects
delegation; only then use [Orchestrate workers](../aios-orchestrate-workers/SKILL.md).
Existing repositories are adopted in place and are never refreshed from a
template.


The registered Project source is a seed, not an installed System or a preclone
dependency. Acquire it only for an authorized new Project. Read its canonical
URL from projects/README.md and freeze the freshly resolved default-branch
commit as required by the shared creation boundary. Inspect the frozen source
object's root instructions, README and declared validation and creation
entrypoints. In the exact final root, follow that seed-owned documented
acquisition path, then re-attest root, branch, exact source commit, remote
identity and completely clean seed.

Re-read the acquired instructions, run the declared safe validation, recheck
identity and clean state, then invoke only the reviewed final-root creation
interface with the resolved Project name, outcome, source URL and commit, plus
a canonical destination only when already resolved. AIOS does not own or repeat
that interface's command, filenames, flags, payload filter or recovery mechanism.
If the frozen seed does not declare a usable creation path that preserves the
accepted boundary, stop before conversion rather than inventing one.

The seed owns atomic transfer and recovery. On failure, follow its reported
restore or retained-state path and never delete uncertain state. Isolated
fixtures created by seed validation are evidence, not a second acquisition or
creation worker.

Immediately re-enter the exact final root in the same session. Read generated
AGENTS and local lifecycle. Prove fresh unborn history, zero refs/remotes,
requested identity/outcome, ownership/proof/recovery records, shared lifecycle
routes with no copied generic skills, excluded seed-only paths and exact URL@SHA provenance. Verify generated
identity hashes. Add only accepted immutable handoff provenance, preserving it
exactly. Now the Project alone is canonical; continue its full local
contract with shared Spec/Build/Review.


After proof, the current owner task finalizes the registry row. A delegated
repository worker returns the proposed row to its caller instead of editing
shared owner data. A blocked registry write preserves the canonical new
repository and retries only registration. Continue its local lifecycle under
the same task or selected worker; creating an owner does not authorize external publication.
