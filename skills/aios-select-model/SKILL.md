---
name: aios-select-model
description: Advise on model and reasoning choices when the user asks or a concrete capability gap needs a human decision; preserve the user's selection.
metadata:
  version: "1.1.0"
---

# AIOS-select-model

The human chooses the model and reasoning effort. Use this advisory skill for
requested comparisons, help with an unclear choice, or a concrete capability
gap that the current route cannot resolve. Continue ordinary work with the
user's current selection and native defaults. Spec and Build need no routine
model assessment. A new task, phase transition or model release is not a reason
to switch or launch a worker.

Receive the accepted work from the [shared task-result decision](../aios-start/references/lifecycle.md).
Explain useful options and return a required human decision there. This skill
owns advice, not task ownership, worker launch or configuration authority.

## Useful advice

Consider the work still ahead: reasoning, tools, context, consequences and
verification. A simple patch and an unsettled design decision can need different
capabilities; phase or task size alone does not choose a model. Explain a real
gap and available options without silently substituting the user's choice.

Use current official capability, reasoning, availability and price sources
when those facts matter. Model names, vendor prices and rankings change; keep
them in dated task evidence rather than AIOS defaults or owner templates.
Distinguish the active model from app defaults, worker controls and catalog
entries. Do not invent equivalent effort levels or claim access from a listing.

Compare sufficient capability and total task cost, including context transfer,
coordination, review and retries. Separate tokens, money and time. Preserve
useful context; cheaper inference alone proves no net gain. Use
[measurement](references/measurement.md) for requested performance claims or
comparisons. Missing evidence reduces confidence; it does not stop a sufficient
current route or justify a permanent recommendation.

## Human decision and application

Return concise advice, dated sources, relevant tradeoffs and any unsupported
choice. The human decides whether to apply it. Without a named model or effort,
retain native defaults. Do not permanently prefer the newest model, highest
effort or a vendor family. A recommendation does not authorize delegation.

Apply only a switch the user requested or explicitly accepted through a
supported control. If only the user can switch, explain the exact available
selection; require native readback before claiming it changed. A selected
handoff uses the lifecycle's [continuation](../aios-start/references/continuation.md).
[Orchestrate workers](../aios-orchestrate-workers/SKILL.md) handles an explicit
worker request or recovery under an existing matching delegation grant.

Persist defaults only for authorized native setup changes. Preserve unrelated
settings and verify readback. Never retain model inventories in owner memory,
copy provider credentials or promise automatic future monitoring. Revisit advice
when requested or a concrete unresolved gap changes it, not at every phase.
