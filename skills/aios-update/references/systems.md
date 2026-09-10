# Maintain a selected System

This is the single System-code installation/update procedure. Systems remain
independent reusable specialist repositories with AGENTS.md, their own skills,
operational state and local lifecycle. AIOS selects and records pointers; it
does not bundle their contents or own their data. Use the existing System
registry and accepted canonical source; never guess an upstream or change a
remote to make it fit. Plugin updates and owner-data Sync are separate actions.

## Bounded first-use catalog

An existing owner-selected registry route wins. Consult only the matching row
below when that route is missing; an empty new-home registry does not require
an inventory or eager installation. These are source candidates, not claims of
installation, access or compatibility. Verify repository identity, current
entrypoint and dependencies on use. Catalog lookup neither clones nor registers
anything automatically; the first-use procedure below owns those later actions.

| Matching outcome | Candidate upstream | Candidate primary skill |
| --- | --- | --- |
| Visual outcomes (ADS) | https://github.com/onlinesourdough/Agentic-Design-System | `.agents/skills/agentic-design-system/SKILL.md` |
| Persistent content production | https://github.com/onlinesourdough/Agentic-Content-System | `.agents/skills/agentic-content-system/SKILL.md` |
| OPTIONAL: matching Power BI need only | https://github.com/onlinesourdough/Agentic-PowerBI-System | `.agents/skills/agentic-powerbi-system/SKILL.md` |

## First use

Select a System by the requested outcome through [routing](../../aios/references/routing.md).
Do not preclone during onboarding. ADS/design and content are available routes;
Power BI is optional, never a default installation or selection without a
matching user need. A registered URL alone is not an installed capability.

Under existing task authority for the selected repository and destination,
verify source identity/access and clone an upstream-backed checkout at the
chosen independent root. Do not create a personal fork by default. Preserve a
nonempty destination or deliberate existing external path; verify it instead
of overwriting it. For a new owner-home checkout, verify parent Git exclusion
and supported owner format before changing registry data.

Verify physical checkout/Git identity, selected ref, AGENTS.md, primary skill,
local lifecycle and required dependencies before invocation. Inspect dependency
instructions before any execution; install only what the task authorizes and
verify readiness. Missing access, entrypoint or dependencies is a focused gap,
not permission to improvise the specialist result. Use the
[shared execution decision](../../aios/references/lifecycle.md), verifying the
selected root and one writer. Repository mutation alone does not require a worker.
Record source/ref, path, primary route and verification in the existing registry
fields under owner-data authority. Execute the selected System's actual workflow.

## Update installed upstream Systems

At a task boundary under authority to update the selected installed Systems:

1. Identify exact selected checkout, verified upstream URL and branch/ref,
   current HEAD and update authority. Inspect local AGENTS.md and its update,
   compatibility, verification and recovery instructions. Customized/forked
   repositories are explicitly owner-maintained and excluded from blind updates;
   their own reviewed maintenance contract must resolve any upstream adoption.
2. Inspect branch, staged/unstaged changes, local commits, all worktrees and
   untracked/ignored paths without exposing private content. Read the System-local
   storage contract to distinguish source from generated/user artifacts and
   locate data, dependencies and backup responsibilities. Ignored does not mean
   backed up, disposable or safely relocatable. Worktrees isolate branches and
   active work; they neither eliminate conflicts nor back up data.
3. Keep an active checkout/worktree on its known version. Defer an affected
   active System or dirty tracked tree. Preserve tracked user artifacts, local
   commits and all untracked/ignored files. An unknown storage/recovery contract,
   collision or required data migration stops application for focused
   reconciliation; do not presume a source-only fast-forward is data-safe.
4. Fetch only the verified upstream under existing authority; never change
   remotes. Record the fetched commit and compare ancestry to HEAD. Equal is a
   no-op. Ahead/diverged or local customization remains preserved for focused
   reconciliation or owner-managed maintenance. Behind is eligible only if
   tracked state is clean and the update is compatible. Review the exact diff,
   release/local instructions, dependency changes and effects on stored data
   and other worktrees. Check incoming tracked paths against untracked/ignored
   files and directories before application; any collision stops the update.
5. Record pre-update HEAD, candidate commit, worktree/data inventory and the
   local recovery path. Recheck state immediately before applying only that
   reviewed commit by fast-forward-only. No force, reset, clean, stash,
   automatic merge/rebase, data migration or upstream push. Do not move or
   delete artifacts to make the update pass. A concurrent change invalidates
   the preflight and requires fresh classification.
6. Read back HEAD and preserved worktree/data state; run the System-local
   dependency and entrypoint checks required by the reviewed change. Report
   exact old/new commits, checks and gaps. Update only relevant registry
   verification under owner-data authority; do not call fetch alone an update.

A failure stops further adoption. Preserve the resulting checkout and artifacts,
report old/candidate/current commits and the focused next action. Use only the
System-local authorized recovery procedure; no automatic downgrade or reset.
An isolated checkout of an earlier source ref can aid diagnosis but cannot
restore untracked/ignored data or undo a migration. Unknown backup or restore
coverage remains an explicit gap, never a claim of recoverability.
