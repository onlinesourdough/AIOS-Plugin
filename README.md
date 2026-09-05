# Online Sourdough Method

Four instruction skills for useful owner-level work, selective context, and
reviewed delivery. Owner data lives in a separate user-owned folder, default
`~/.OSM` for new homes. Existing configured homes resume in place. This repository
contains no owner profile and requires no server,
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

The [v0.1.1 private release](https://github.com/onlinesourdough/Method/releases/tag/v0.1.1)
is released and installed according to lead acceptance, at commit
`e65157f3e8a07458b2c0ea510bbcde6997d63ee8`. It narrowed discovery, made context
and configuration loading conditional, and retained proportional checks and
continued authorized implementation through review.

## 0.1.3 release content

Codex desktop onboarding distinguishes package installation from actual New Chat
selection and fresh-task routing. It preserves chosen sidebar organization,
history and files, changes only authorized obsolete shortcuts, and requires
native UI readback before claiming cutover, including associated environment/
worktree references and physical project roots. CLI projectless tests cannot prove
a GUI default. Unsupported controls leave one guided step and explicit pending
evidence. No new skill, runtime or mandatory Pi sidebar procedure is added.
This version is in local preparation for independent lead Review; installed
desktop acceptance is a separate observation.

## 0.1.2 release content

New homes default to ~/.OSM. New Project and System checkouts live physically
under its projects/ and systems/ directories, with their own Git and local
lifecycle, excluded from owner Git. Existing deliberate external paths remain
supported. A thin global bridge routes to OSM.md; no owner-context AGENTS file
is added above nested repositories. Ordinary work reads only relevant context.

The security refinement distinguishes instructions, native permissions/sandbox
and optional hooks; scopes connection access; and makes deletion/recovery limits
explicit. Sensitive changes reuse the existing lifecycle with conditional
security evidence. No compulsory scan, hook runtime or extra skill is added.
The four skill identities and owner format 1 are unchanged. Updating the package
does not move an owner home, clone repositories or alter native trust/settings.
See [proof](docs/proof.md) for release evidence and capability limits.

Contributors start with [AGENTS.md](AGENTS.md) and select the relevant
[local Project route](.agents/skills/README.md); consult [lifecycle](docs/lifecycle.md)
when resuming substantive work. This repository owns Spec, Build, Review,
recovery and authorized Ship. Consumers receive the plugin instructions, not
this repository's development lifecycle.

[Parity](docs/parity.md) · [Proof](docs/proof.md) · [Recovery](docs/recovery.md)
· [Ownership](docs/ownership.md) · [License](LICENSE)

Author checks (Python 3.12+): `python3 tests/validate.py`,
`python3 tests/revision2-rehearsal.py` and `python3 tests/layout-rehearsal.py`.
Python is only a maintenance tool.
External scaffold validators and behavioral evidence are listed in the proof record.
