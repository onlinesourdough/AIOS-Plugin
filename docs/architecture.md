# Architecture

AIOS is an instruction-only package for Codex and Pi. Both native declarations
load the same root `skills/` directory; AIOS does not provide a model runner,
worker service, permission system, or client-data store.

| Boundary | Responsibility |
| --- | --- |
| `.codex-plugin/`, `package.json`, `assets/`, `skills/` | Native metadata and the 14 shipped product skills |
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

Worker orchestration and improvement triage are conditional instructions. They
do not create a runtime, external authority, or background watcher. Optional
Global Skills remain independently owned and are not copied into AIOS.
Registered Systems are selected by their declared responsibility and primary
route. Their repositories own tool choices, internal stages, artifact formats,
schemas and natural returns; AIOS keeps only the registry and handoff boundary.

Skill name/description metadata and the small owner bridge are the startup method
layer. One clearly triggered skill body loads next; conditional procedures live
in focused references selected by harness, operation or capability. AIOS does
not preload cross-harness adapters, optional capabilities, owner context or every
lifecycle phase to reduce file count. Skill count follows responsibility and
discovery boundaries, not a context-budget target.

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
