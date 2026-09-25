# Excalidraw skill: contract and verification

Source candidate: AIOS 0.15.0, based on `c8bf9a7` / 0.14.0.

## Accepted result

Add a general pre-shipped diagram method to AIOS. A user can bring an idea,
process, system or repository; the agent chooses an appropriate diagram and
works on an editable Excalidraw canvas in the built-in browser. Architecture
guidance covers consistent C4 scope, deployment, interactions and data flow.
Content is one caller, not the skill's owner or prerequisite. Editable source
is durable; a screenshot is not the default result.

The package includes original instructions and focused references. The reviewed
external toolkit remains an optional dependency, installed separately under the
task's authority. No editor bundle, copied upstream skill, new controller,
automatic MCP connection or owner-specific machine path enters the package.
The method preserves existing canvases and reports missing browser access.

Source delivery is an independently reviewed feature branch/PR. Package release
and native adoption are separate delivery actions; this record does not claim
them from source changes. The current task remains execution owner, with native
plan tracking and no requested persistent goal. Model-based independent review
uses the configured model/effort in a read-only native Codex run.

## Selected sources and decisions

- [Excalidraw](https://github.com/excalidraw/excalidraw) is the editable drawing
  format/editor. Its official [MCP App](https://github.com/excalidraw/excalidraw-mcp)
  is a documented alternative, not an active connection in this package.
- [yctimlin/mcp_excalidraw](https://github.com/yctimlin/mcp_excalidraw), MIT,
  revision `713706e967ed21db1d9264748fa01c6af961c792`, npm 2.0.0: selected for
  live browser/CLI scene editing, inspection and saved editable files. Runtime
  installation, integrity and recovery are in the shipped toolkit reference.
- [Cole Medin's skill](https://github.com/coleam00/excalidraw-diagram-skill) was
  inspected at `8646fcc9f74f38539c6cdb4c969723336a96ddcd` as a candidate. It emphasises visual structure and rendered-file
  review; no repository license was present in the inspected root. Its text,
  scripts and palettes are not redistributed. The exact social post that
  prompted the request was not identified.
- Simon Brown's [C4 views](https://c4model.com/diagrams) and
  [review criteria](https://c4model.com/diagrams/checklist), CC BY 4.0, inform the
  explicitly attributed architecture reference. Other diagram types and live
  operation are independently authored guidance.

## Proof boundary

Observed source checks on 25 September 2026: package/release-tag validation
against `c8bf9a7`, documentation (7 tests), layout, continuity, skill versions
(7 tests) and context-footprint checks pass. The initial added metadata exceeded
two selected-read ceilings; concise descriptions and routing restored the
unchanged limits. This is a byte-budget result, not a runtime speed claim.

Claude Code 2.1.139 accepted the native manifests and inline discovery reported
all 26 declared skills, including `excalidraw`, with zero agents, hooks or MCP
servers. This was an isolated inspection, not a user installation or marketplace
lifecycle test. Pi/Gemini adoption and native Codex adoption are not claimed.

Maintained source/package, version-transition, documentation, layout, continuity
and footprint checks cover the candidate. They do not prove live UI behaviour.
Bounded instruction probes cover view selection, source grounding, existing
diagram edits and missing-browser behaviour. Independent Review binds the final
subject separately so its report is not a self-referential hash.

The selected toolkit was previously exercised on macOS: scene creation and
updates, live browser inspection, editable export/reopen and PNG/SVG exports.
That evidence supports the external runtime selection, not the new method's
architecture quality or every supported harness/platform. During this change,
the in-app browser connection was unavailable. New live UI acceptance is therefore
unverified; source instructions explicitly preserve that gap instead of claiming
a working browser from HTTP health. No alternative browser is launched.

Recovery is a normal source revert or adoption of the prior package release.
Project drawings and external runtime state remain intact. Existing personal
diagram methods are not removed until an adopted shared skill has actually been
discovered and the selected callers have been migrated.
