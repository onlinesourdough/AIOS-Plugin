# Architecture

AIOS is an instruction-only package using the portable Agent Plugins format.
Native compatibility manifests all load the same root `skills/` directory; AIOS does not provide a model runner,
worker service, permission system, or client-data store.

| Boundary | Responsibility |
| --- | --- |
| `plugin.json`, native manifests, `package.json`, `assets/`, `skills/` | Portable identity, native metadata and the 17 shared product skills |
| `.agents/plugins/marketplace.json` | Codex marketplace entry pointing at this repository root |
| `AGENTS.md`, optional `.agents/skills/` | Local requirements and specialist methods; no generic lifecycle copies |
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
The shared lifecycle owns the task's deliverable, continuation and completion
boundary before costly production. Spec makes that result usable. Select Model
assesses remaining judgment and chooses model/reasoning within the accepted work;
its capability/cost evidence can reopen the shared decision. Orchestrate Workers
owns delegated execution only when the caller retains coordination/acceptance.
The lifecycle's conditional handoff reference owns portable prompts and authorized
whole-task startup followed by the former lead's exit. It carries unfinished
Review/delivery forward and supplies no automatic launch authority.
`setup-guardrails` is an optional Global capability selected only when an
owner expressly wants local guardrails for autonomous use; it is not packaged,
installed, trusted, configured, or active by implication. Onboard and Manage
Skills route that explicit need without making core AIOS depend on it.
Registered Systems are selected by their declared responsibility and primary
route. Their repositories own tool choices, internal stages, artifact formats,
schemas and natural returns; AIOS keeps only the registry and handoff boundary.
Shared Spec, Build, Review and Ship apply across owners without copying methods
into their repositories. Local contracts supply domain requirements and proof;
global discovery is provided by the harness, not parent-folder inheritance.
Continue in the current task by default. Delegate a separable result only for a
concrete gain after context, coordination, review and retry costs, or when the
user requests it. Internal workers and explicitly requested new sidebar tasks
retain their different harness authority. Direct tasks need no invented lead.
The [shared lifecycle](../skills/aios/references/lifecycle.md) owns this decision.
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
Maintain Context owns the minimal context framework: relevant areas are covered
by verified source routes, unique local facts or explicit gaps. Onboard invokes
it for a fresh or changed home and proves one useful source-routed result.
Account migration requires source identity and access verification; a title match
or copied ID cannot silently replace a source. Local gap filling never invents
missing knowledge or duplicates an already authoritative external document.

## Portability

The root `plugin.json` follows Agent Plugins 1.0.0. Codex uses the compatible
`.codex-plugin` overlay for its interface. Claude Code and Copilot can use the
`.claude-plugin` marketplace; Cursor has its native manifest; Gemini has an
extension manifest; Pi reads `package.json`. These are metadata over one skills
directory, without a loader, extension program or install script.

Installation affects only the selected harness. Native removal leaves owner
data and other harnesses intact. The AIOS skill can find an established or
default owner home without a global bridge; custom persistent routing is an
optional separate setup. Existing settings and unrelated skills are preserved.
See [native installation and evidence](native-installation.md) for tested versus
documented routes, and the [adapter guide](../skills/aios-onboard/references/adapters.md)
for the selected operation. Permissions and model behavior remain client-owned.

## Repository boundary

Tests check package structure and selected filesystem safety cases. They are
author tools, not runtime or model evidence. Previous release investigations,
frozen review inventories, and one-off acceptance reports remain recoverable
from Git history rather than living beside current documentation.
