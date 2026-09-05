---
name: choose-technology
description: Choose technology for a new or materially changed capability after its responsibilities and constraints are known. Skip unchanged working stacks.
---

# Choose Technology

Use the accepted Build contract; resolve material gaps through
[Spec](../spec-project/SKILL.md) without repeating resolved discovery.
If the working stack still owns the needed responsibilities, keep it and
continue to [Build](../build-project/SKILL.md).

## Decide by responsibility

For a material new capability, compare only plausible options. Name its owner,
source of truth, interfaces and trust boundary, then choose Build, Buy, Rent or
Self-host. Reuse a sufficient existing system. Added runtime layers need a real
responsibility; a starter's included database, queue, auth or AI is not evidence
that the Project needs it.

Check current official sources for facts that can alter the decision: contracts,
license, plan limits/cost, maintenance, failure/recovery and exit path. Record
dated source links and material conclusions, not copied catalogs or volatile
price tables. Self-hosting needs an owner for updates, security and restore;
buying a capability still needs an owner for its dependency and replacement.

Choose the smallest maintainable shape that delivers and recovers the complete
result. Independent services need independent ownership, deployment, scaling,
isolation or recovery; otherwise prefer a cohesive unit. Keep deterministic
domain behavior replayable independently of an orchestration vendor.

## When low cost or usage determines the choice

Make that assumption testable:

- Describe realistic initial usage and the specific compute, storage, egress or
  API/workflow boundary that can create an overage.
- Compare the smallest viable code-only, managed or hybrid shapes; omit
  capabilities the outcome does not need.
- Check dated official terms for each material candidate. An apparently free
  option fails if it cannot meet the contract or shifts unacceptable operations
  to the owner.
- Name the usage/failure observer, bounded guardrail, stop condition before
  activation or scale-up, and backup/replacement path.

These are conditional decision evidence, not a default provider list.

## Return the resolved decision and continue

Record the selected capabilities and owners, existing systems reused, fit and
operating burden, material dependency/cost/license risks, verification of the
contract and failure/recovery, and update/exit paths. Include usage evidence only
when it affects the choice. Do not return a catalog of rejected stacks.

For a concrete specialist gap, inventory available capabilities through the
[local skill index](../README.md). Reuse sufficient skills; install or update
external capabilities only through the harness's authorized method. Do not copy
generic management skills into the Project or invent unavailable tools.
Pass the resolved decision to Build within the same authorized task.
