# Architecture

AIOS is an instruction-only package for Codex and Pi. Both native declarations
load the same root `skills/` directory; AIOS does not provide a model runner,
worker service, permission system, or client-data store.

| Boundary | Responsibility |
| --- | --- |
| `.codex-plugin/`, `package.json`, `assets/`, `skills/` | Native metadata and the 15 shipped product skills |
| `.agents/plugins/marketplace.json` | Codex marketplace entry pointing at this repository root |
| `.agents/skills/`, `AGENTS.md` | Repository development only; never product discovery |
| Owner home, normally `~/.AIOS` | Client-controlled context, decisions, connections, and personal skills |
| Native harness | Actual models, tools, credentials, permissions, settings, and UI |
| Independent Project/System repositories | Their own instructions, implementation, proof, and recovery |

The package version and owner-data format are separate. `AIOS_FORMAT` remains
the plain integer `1`; a format value never implies a package rename or grants
permission to migrate data.

## Context and isolation

The owner home is a selective route index, not a parent instruction layer for
every repository. Independent repository work starts from local instructions
and accepted inputs. Nested Project and System checkouts keep their own Git
roots and are excluded from optional owner-home Git tracking.

Manage Skills owns personal-skill placement and native capability adoption.
Maintain Context owns owner facts and configured owner Git sync. Onboard and
Check call those owners instead of duplicating their procedures.
Risky Changes owns the conditional assessment of consequential-change
assumptions, representative behavior, recovery, and residual unknowns. Spec
and Review route to it only when that risk is material; Review retains
independent acceptance and Ship remains the authority boundary.

Continuity Sync is an explicit client workflow under Maintain Context, not a
package hook or installation side effect. It transfers only consented owner
context, personal skills and format/index metadata; product bodies, native
settings/history, credentials, caches and nested repositories remain outside.
Onboard owns the missing/empty-home choice and native bridge setup, while Sync
owns upload/restore consent and no-overwrite staging.

Worker orchestration and improvement triage are conditional instructions. They
do not create a runtime, external authority, or background watcher. Optional
Global Skills remain independently owned and are not copied into AIOS.
`setup-guardrails` is an optional Global capability selected only when an
owner expressly wants local guardrails for autonomous use; it is not packaged,
installed, trusted, configured, or active by implication. Onboard and Manage
Skills route that explicit need without making core AIOS depend on it.
Registered Systems are selected by their declared responsibility and primary
route. Their repositories own tool choices, internal stages, artifact formats,
schemas and natural returns; AIOS keeps only the registry and handoff boundary.
Before substantive production, select the owner, primary workflow and worker
need. Delegation triggers orchestration before launch; internal workers and
explicitly requested new sidebar tasks retain their different harness authority.
Selected Systems install on first use, upstream-backed by default, never eagerly
at onboarding. [System maintenance](../skills/aios-update/references/systems.md)
owns compatible fast-forward updates at task boundaries under update authority.
Customized/forked Systems remain owner-maintained; local storage contracts govern
artifact preservation and recovery. Owner Sync transfers pointers, not System
contents. No registry schema, runtime or automatic updater is added.

Skill name/description metadata and the small owner bridge are the startup method
layer. One clearly triggered skill body loads next; a small explanation can name
a workflow without executing it, uses stable facts in that body, and reads one
direct source only for a missing or current fact. Conditional procedures live in
focused references selected by operation or capability. AIOS does not preload
owner format/context, lifecycle phases, cross-harness adapters or optional
capabilities for that explanation. Skill count follows responsibility and
discovery boundaries, not a context-budget target.

## Canonical documentation

AIOS product documentation stays in its canonical product repository and
releases; an active package/ref or reviewed release establishes version-specific
claims. When the repository is private, the primary `aios` route uses only an
already-authorized native account's normal read path; it neither handles
credentials nor changes visibility or publication. The installed package keeps
its executable rules offline; a source read is scoped evidence, not a remote
instruction bootstrap.
Customer documentation remains canonical in the customer source system. AIOS
may retain a scoped source pointer and freshness boundary when useful, never a
synchronized copy or an automatic harvest. An unavailable, inaccessible, or
stale source is reported as a gap.

## Portability

Codex and Pi are the verified native routes. Another harness may use the same
physical owner home and canonical skill bodies through its own supported
entrypoint, but must independently verify discovery, permissions, and behavior.
The [adapter guide](../skills/aios-onboard/references/adapters.md) owns those
integration details.

## Repository boundary

Tests check package structure and selected filesystem safety cases. They are
author tools, not runtime or model evidence. Previous release investigations,
frozen review inventories, and one-off acceptance reports remain recoverable
from Git history rather than living beside current documentation.
