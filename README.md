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
This is an unreleased candidate. No remote, installation, or release is implied.
Codex/Pi cold-session acceptance is pending lead verification. Claude is an
optional documented adapter proposal, untested.

Contributors read [AGENTS.md](AGENTS.md), the six [local Project routes](.agents/skills/README.md),
and [lifecycle](docs/lifecycle.md). This repository owns Spec, Build, Review,
recovery and authorized Ship. Consumers receive the plugin instructions, not
this repository's development lifecycle.

[Parity](docs/parity.md) · [Proof](docs/proof.md) · [Recovery](docs/recovery.md)
· [Ownership](docs/ownership.md) · [License](LICENSE)

Author checks (Python 3.12+): `python3 tests/validate.py` and
`python3 tests/revision2-rehearsal.py`. Python is only a maintenance tool.
External scaffold validators and behavioral evidence are listed in the proof record.
