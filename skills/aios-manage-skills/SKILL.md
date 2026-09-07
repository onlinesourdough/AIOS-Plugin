---
name: aios-manage-skills
description: Manage an authorized agent-skill lifecycle, including personal skill creation, placement, discovery, installation, update, removal, or rollback; not passive audits.
---

# Manage Skills

Manage a capability change deliberately. Independent projects remain operable
without AIOS, a plugin, a personal skill or a central run-history store.

This AIOS skill owns the reviewed lifecycle for capabilities and personal
skills: creation/import/edit/rename/removal decisions, canonical placement,
registration and discovery, plus adoption, update and rollback. Follow the
[personal skill lifecycle](references/owner-skills.md) for owner methods. The
native Skill Creator owns authoring mechanics; Maintain context owns durable
owner facts and configured Git sync. Neither takes back this lifecycle.

## Distinguish audit from management

An audit detects and reports the current capability state without mutation.
Use [Check](../aios-check/SKILL.md) when the request is only to inspect or
report; no separate audit skill is required. This skill manages a proposed
change: create or reconcile a personal skill, review a capability gap, decide
whether to reuse or install, and perform an authorized install, update,
rollback, removal or overlap decision. Do not silently turn an audit into a
change.

## Confirm the gap

1. State the task the missing capability must perform and the proof it needs.
2. Check current project instructions and available capabilities first,
   including ordinary reasoning. Inspect containing-AIOS, harness-native or
   personal/installed skills only when relevant and accessible within the
   caller's authority. Do not hardcode an inventory or preload unrelated
   context. Independent repositories keep their own local lifecycle.
3. Compare sufficient candidates with the task, boundaries and risk. Reuse a
   sufficient capability and stop. If the gap is not concrete, report it and
   do not search or install.

## Discover and review candidates

Search without installing. Follow the current `skills.sh` CLI documentation;
the common candidate query is `npx skills find <need>` and listing a source is
`npx skills add <owner/repo> --list`. Prefer a reviewed project or organization
source, then the relevant technology owner, then a community source.

Before any mutation, inspect and record the candidate publisher, repository,
exact revision, license, maintenance, `SKILL.md`, referenced resources,
scripts, commands, network access, affected files/services/people, harness
compatibility, overlap, verification, update, removal and recovery paths.
Treat popularity or an audit badge as evidence to weigh, not approval.

## Get authority before changing state

Present the candidate, material access, intended scope/files, version, risks
and rollback plan. Apply existing explicit authorization when it covers the
exact candidate, revision, action, access and destination scope; do not ask
again for the same approval. Ask before mutation only for missing authority or
a material change to the approved proposal. Prefer project scope so the
change is reviewable. Never use `--all`, global scope or non-interactive
approval flags unless that exact scope was explicitly authorized.

If a harness or source lacks a supported install path, mark it unsupported or
unverified. Do not invent an adapter, claim discovery from a copied prompt or
make the project depend on a plugin at runtime.

## Install, update and rollback

Use one named skill from one canonical source. Record source revision,
release version, file hashes, destination scope and the prior version before
writing. For an update, review the upstream diff and repeat the same candidate
review; do not overwrite a local change without authorization. For rollback,
restore a recorded prior revision, verify its hashes and discovery, and report
the recovery result. A plugin may distribute a source, but it must not create a
second payload fork or own System/Project run history.

## Verify

1. Inspect the exact filesystem and version-control diff.
2. Confirm only the selected skill and expected harness adapter changed.
3. Validate frontmatter, referenced paths, scripts, source/version and hashes.
4. Confirm the selected harness discovers the skill at the documented scope.
5. Exercise one representative task without production side effects.
6. Report source, revision/license, installed scope, version, evidence,
   rollback state, unsupported harnesses and remaining risk.

If verification fails, stop, preserve the prior version and return the
failure. Never update skills automatically.
