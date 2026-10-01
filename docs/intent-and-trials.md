# Intent and local trials

Unreleased source change. Baseline: `bbacc8d4199936b8a37a6e69e10f4dc140633021`.

## Accepted result

Let thinking aloud produce a short interpretation of the intended change,
underlying problem and useful result before the questions that affect the next
action. Extend Interview, including explicit invocation and conditional AIOS
selection; do not introduce a separate skill or repeat accepted discovery.
Corrections replace mistaken interpretations. An understanding-only request
can finish without manufacturing a build task.

Spec may resolve a material solution choice with the smallest useful local
trial. Design owns visual variants on a selected canvas or browser preview;
UI/UX choices require exercised interaction, and other work can use a synthetic
workflow or sample. Clear tasks, accepted directions and source-settled choices
continue directly. There is no question quota, mandatory prototype, fixed
candidate count, new schema, editor dependency or automatic parallel workers.
Provisional work preserves user edits and existing action authority.

This adapts Lauren's [restatement prompt](https://x.com/poteto/status/2104744961904394699)
and the inspected [pstack prototype playbook](https://github.com/cursor/plugins/blob/fae2c6ed95821bd85f614a73e4842e13229fa5e5/pstack/skills/poteto-mode/playbooks/prototype.md).
[AIOS #23](https://github.com/onlinesourdough/AIOS-Plugin/issues/23) holds the
research and mapping. Architecture remains an independent
[Factory follow-up](https://github.com/arcitai/factory-software-defence/issues/128).
[Arena #25](https://github.com/onlinesourdough/AIOS-Plugin/issues/25) is deferred
until measured benefit can justify full comparison cost.

## Proof and limits

Observed on 2026-10-01 using Codex CLI 0.159.2 and its runtime-default model.
The exact model ID is unavailable in retained events. Synthetic fixtures use
task-local skill registrations, with owner context, external writes,
installation and further model launches excluded.

The [sanitized evidence](evidence/intent-trials-probe.json) retains source hashes,
case responses, observations and emitted usage. It separates two kinds of proof:

- **Decision comparison:** supplied baseline/candidate instructions, twelve
  independent cases, expected labels withheld. Candidate matches 12/12 routing
  labels. Baseline matches 11/12; its restatement-only response is useful despite
  a different Interview classification. In the thinking-aloud case, candidate
  interprets goal/problem before a question; baseline starts with the question.
  Both select suitable trials. This does not prove native discovery, a broad
  quality improvement or token savings.
- **Ordinary native tasks:** a typo edit reads no Interview/trial instructions;
  ambiguous intent reads Interview and gives a goal/problem interpretation plus
  one recent-example question. No answer was supplied, so this is first-response
  evidence, not a completed multi-turn interview; its final advice stays
  provisional. A five-case workflow task actually writes a local comparison,
  exposing a missed deadline and residual interruption risk, but does not read
  the new Spec reference. A separate Spec-only task reads Spec and local trials,
  proposes a keyboard/long-detail comparison and explicitly reports that browser
  interaction was unavailable and not exercised.

No rendered canvas, actual UI interaction, installed-plugin adoption, live
integration, voice capture or other harness behavior is proven. Usage is raw
run telemetry with differing inputs and cache state, not a savings comparison.

Run source validation against the baseline, documentation and skill-version
rehearsals, context-footprint checks and whitespace checks. The changed skill
frontmatters also pass Skill Creator validation. The existing footprint ceilings
remain; local-trial detail is counted separately as a conditional extra.

For another decision probe, run
`python3 tests/intent-trials-rehearsal.py prepare /absolute/scratch/path`
and optionally `--baseline REF`. Run its generated prompt/schema with an
authorized isolated evaluator, then
`python3 tests/intent-trials-rehearsal.py score /absolute/scratch/path/result.json`.
Inspect replies as well as labels. The author-only helper never launches a
model; its JSON schema is not a user workflow or runtime requirement.

## Delivery boundary

This task delivers a reviewed draft PR, preserving package version 0.14.1,
owner formats and the installed package. Merge, release and installation are
separate actions. Recover source by reverting the scoped commit or closing the
draft; no owner-state migration is involved. Review binds the changed product
and author-tool source hashes in the evidence record, excluding that record
and this explanation from its own digest.
