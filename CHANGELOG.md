# Changelog

## 0.10.2 — 2026-09-14

- Require an available, permitted native question tool during onboarding.
  Respect runtime and mode restrictions, preserve open replies, and keep
  asynchronous questions pending until answered. Explain conversational
  fallback when no tool is usable or its call fails.
- Advance Onboard and Check to 2.0.1 with a matching acceptance scenario.
  The other 21 skills and owner formats are unchanged.

## 0.10.1 — 2026-09-13

- Keep the versioned overview at `docs/aios.md` with the installed plugin.
  Remove the public export scripts, artifact workflow and Resources dependency.
  Advance only the AIOS routing skill to 2.1.1 for the corrected documentation
  route; the other 22 skills retain their versions. No owner-format change.
- Add a tag-triggered GitHub Release workflow. Validate the package, local
  overview, changelog entry and tag version before publishing a prerelease.
- Explain native plugin updates, explicit private owner Sync and independent
  project/System repositories in the README diagram and ownership table.
  Preserve the `aios` installation identity and clarify active-session limits.

## 0.10.0 — source candidate

- Add `write-code` 1.0.0 for code of any size, including scripts, shell snippets,
  SQL, tests and automation. Keep code-quality criteria and proportionate
  verification in one compact method with automatic selection enabled.
- Route AIOS and Build code work through that method; Review applies the same
  criteria read-only. Advance AIOS to 2.1.0, Build to 1.1.0 and Review to 1.2.0;
  unchanged skills retain their versions. No owner-format change.
- Require useful behavioral proof: real-interface checks for UI/UX, meaningful
  regression tests for logic, contract checks for APIs and actual safe invocation
  for scripts. Avoid irrelevant unit tests and unnecessary generated scaffolding.
- Keep one 23-skill native package and update its local, versioned overview.
  Public-site adoption remains separate from source/package delivery.

## 0.9.0 — 2026-09-13

- Bundle a version-labelled overview and a short local documentation route;
  references load only for the selected question.
- Check documentation against the package version and prepare public exports
  with immutable source, version and checksum metadata during CI/release.

- Include design and content as five focused skills with portable helpers,
  preserving source judgment, review, provenance and optional editor routes.
- Use the native app's project and workspace. Remove mandatory AIOS project
  registration; keep Spaces as context and Systems as optional specialists.
- Default working material to project-local design/ and content/ when needed.
  Align the project and system template routes with this model.
- Create neutral owner format 2 without repository registries and retain
  format-1 compatibility. Installation does not migrate owner data.
- Keep one 22-skill source across native packages. Update documentation,
  migration boundaries, version checks and installation rehearsals.


## 0.8.0 — source candidate

- Add the portable Agent Plugins manifest and native Claude Code/Copilot,
  Cursor and Gemini metadata alongside Codex and Pi. All use the same 17 skills.
- Make native installation independent of an owner home or global bridge.
  Owner work reuses its established home or checks the default when none is known.
- Keep installation scoped to the selected app. Remove Pi's ambient-skill
  exclusion from setup defaults; preserve existing explicit configuration.
- Rewrite getting started around native installation, update and removal.
  Distinguish verified CLI behavior from documented and untested routes.
- Advance `aios`, `aios-onboard` and `aios-check` to 1.1.0. Human writing remains
  1.0.1 and applies across prose formats. No owner-data format change.
- Correct Manage Skills' Pi owner-registration reference to preserve ambient
  discovery and existing routes; advance that skill to 1.0.1.

## 0.7.1 — source candidate

- Clarify human-writing's general priority: familiar words, direct sentences
  and easy understanding across prose formats and genres.
- Keep text as short as understanding allows while preserving requested depth,
  necessary explanations, consistent terminology, precision and qualifications.
- Bump only human-writing to `metadata.version: "1.0.1"`; the other 16 skills
  retain their independent versions. No format-specific focus or new workflow.

## 0.7.0 — source candidate

- Simplify shared tracking and Spec bookkeeping while preserving native goal
  rules, acceptance, carried authorization and completion of authorized work.
- Make verification and skill management proportional to the changed boundary;
  preserve format, backup, source identity, recovery and delivery protections.
- Start independent `metadata.version: "1.0.0"` histories for all 17 skills,
  with schema and Git-baseline maintenance checks.
- Bundle `human-writing` as the default for substantive prose, with narrow
  discovery, evidence-preserving edits and no additional approval gate.

This source version is not evidence of release, installation or adoption.
Earlier release history remains in GitHub Releases and Git history.
