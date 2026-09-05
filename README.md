# Online Sourdough Method

Four instruction skills for useful owner-level work, selective context, and
reviewed delivery. Owner data lives in a separate user-owned folder, default
`~/OSM`; this repository contains no owner profile and requires no server,
MCP, hooks, background process, or consumer runtime scripts.

| Skill | Use |
| --- | --- |
| osm | Route business work to its smallest justified owner and lifecycle |
| osm-onboard | Create or resume portable context and a thin native bridge |
| osm-maintain-context | Curate facts, corrections, routes and optional sync |
| osm-check | Inspect installation, compatibility and acceptance evidence |

[Installation](plugins/online-sourdough-method/skills/osm-onboard/references/adapters.md)
uses this repository's Codex marketplace or Pi package. Both load the same
skill bodies in `plugins/online-sourdough-method/skills/`. Ordinary language
can select them; automatic selection must be tested in the target harness.
Start with “Set me up for my current work.” Existing users resume their facts;
there is no fresh interview or AIOS template clone.

Canonical product: [onlinesourdough/Method](https://github.com/onlinesourdough/Method).
The [v0.1.0 private prerelease](https://github.com/onlinesourdough/Method/releases/tag/v0.1.0)
is the Codex-primary pilot at commit `9dc607f14441c9b085f29aa7ce9019e7c738382a`.
Lead acceptance verified ordinary Codex owner-chat routing and independent
repository isolation. Pi native resource loading passed; live Pi inference
remains untested and requires a reachable configured model. Claude and
Rockflow/Linux are untested. Local source revisions are not installed releases.

## 0.1.1 private pilot candidate

Prepared locally for final-byte lead Review; not released or installed.
Changes from 0.1.0: narrower skill discovery, conditional context/configuration
loading, proportional small-fix checks, continued authorized implementation
through review, and optional experimental Codex context-management guidance.
The four skill identities and owner format 1 are unchanged; no owner-data
migration or runtime dependency is introduced. Current package checks validate
this candidate; the earlier installed pilot tests are historical evidence.
See [proof](docs/proof.md) for the candidate inventory and capability limits.

Contributors start with [AGENTS.md](AGENTS.md) and select the relevant
[local Project route](.agents/skills/README.md); consult [lifecycle](docs/lifecycle.md)
when resuming substantive work. This repository owns Spec, Build, Review,
recovery and authorized Ship. Consumers receive the plugin instructions, not
this repository's development lifecycle.

[Parity](docs/parity.md) · [Proof](docs/proof.md) · [Recovery](docs/recovery.md)
· [Ownership](docs/ownership.md) · [License](LICENSE)

Author checks (Python 3.12+): `python3 tests/validate.py` and
`python3 tests/revision2-rehearsal.py`. Python is only a maintenance tool.
External scaffold validators and behavioral evidence are listed in the proof record.
