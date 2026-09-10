# Create only a justified independent owner

Read [routing](routing.md) and the READY [task contract](lifecycle.md) first.
Existing owners are adopted in place, never refreshed from a template. The
lead selects name, safe lowercase hyphen slug, final absolute root, optional
canonical URL, outcome, authority, proof and accepted immutable input pointers.
The owner registry supplies the canonical credential-free HTTPS .git seed URL.
Validate URL has no userinfo, whitespace, query or fragment. Freshly query its
symbolic HEAD and the default branch required by the seed's current creation
interface, then freeze one exact live 40-character commit SHA. Cached refs, a
remembered pin or an assumed branch are not live evidence. Network failure or
a changed SHA stops before transfer.

For new owners choose physical AIOS_ROOT/projects/<slug> (Project) or
AIOS_ROOT/systems/<slug> (System). Existing deliberate external roots remain
supported and are adopted in place; moving one is a separate authorized action.
Before creation, the lead verifies owner Git, when used, ignores the checkout and
that ancestor AGENTS/override files will not preload personal owner context.
Keep independent .git, local AGENTS and lifecycle at the repository root; nesting
is a filesystem layout, not shared implementation or authority. No symlink farm.

No registration in an unrelated legacy home. Reject existing path/registry/canonical
identity duplicates. Create only the final empty unborn repository and use
one verified writer. Continue in the current task unless the shared execution
decision selects [Orchestrate workers](../../aios-orchestrate-workers/SKILL.md).
Attest exact physical root/Git top level, branch, zero history/refs/remotes and
no tracked/untracked/ignored files; verify registry absence before source access.
No temporary template clone or separate seed worker.

Use [Create Project](../../aios-create-project/SKILL.md) for a bounded Project
or [Create System](../../aios-create-system/SKILL.md) for a reusable System.

## Registration after proof


Prepare one row in the selected owner registry's existing
schema: name, slug, canonical URL or explicit local marker, final path, outcome
and responsible owner, local lifecycle (Project) or primary skill/invoke/return
(System), proof and checkout verification state. A delegated worker returns it
to the caller; it never edits shared owner data. The owner task runs owner-data
sync when configured, rechecks absence and
adds only that verified row, then checks routes. If registration blocks, retain
the canonical repo and retry registration only; never recreate or transfer.
Creation, revisions, registration evidence and authorized Ship retain the same
worker/session and goal. No System implementation belongs in shared owner context.
