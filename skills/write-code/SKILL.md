---
name: write-code
description: Write or change code of any size, including scripts, shell snippets, SQL, tests and automation; apply proportionate quality and verification, also when reviewing code.
metadata:
  version: "1.0.0"
---

# Write code

Apply whenever authoring or changing code, including short one-off scripts,
notebooks, executable configuration and code examples. Use the same criteria
when reviewing code. Calling an existing tool or explaining existing code alone
does not require a coding workflow.

Reuse the accepted task, local AGENTS, repository conventions and available
tools. Work directly on small requests; do not create a second specification,
lifecycle or report. In Build, implement and verify. In read-only Review, inspect
the code and current proof, report concrete findings through the existing review
gate, and leave the subject unchanged. The skill does not grant execution or
external-write authority; drafting code is not permission to run its effects.

## Code that earns its complexity

- Read the relevant surrounding code and existing interfaces first. Use names
  that express the domain, clear control flow and the existing type/style rules.
  Handle meaningful failures explicitly; do not hide defects behind broad
  exception handling, invented defaults or success-shaped fallback results.
- Give modules and functions coherent responsibilities. Reuse existing code;
  separate behavior from I/O where it improves testing or understanding. Add an
  abstraction or dependency for an actual responsibility, not a hypothetical
  future need. Avoid unnecessary wrappers, tiny pass-through modules and copied
  logic; a small script can remain one readable file.
- Make interfaces consistent: inputs, outputs, validation boundaries and errors
  should form a clear contract. Preserve compatibility or make the accepted
  change explicit. Account for authorization, retries/idempotency and cancellation
  when they affect the operation. A CLI's arguments, stdout/stderr and exit
  status are also an API.
- Comments explain intent, surprising constraints, invariants and tradeoffs.
  Document public interfaces when callers need help using them correctly.
  Update stale comments; do not narrate obvious lines. Remove conversational
  AI meta-comments, scaffolding leftovers, unused code and placeholders that
  pretend to implement behavior. Preserve required notices and legitimate
  generated-file attribution.
- Complete the requested behavior and relevant failure, empty and loading
  states. Keep the patch scoped and affected documentation accurate. Do not add
  configuration or unrelated refactors to make a small change look substantial.

## Evidence suited to the change

Choose the nearest useful boundary. Prefer observed behavior and meaningful
regressions over tests that repeat implementation details or merely vary inputs
without exercising a distinct case. Run required repository checks; do not
weaken them to obtain green. Add durable tests where they protect meaningful
behavior, without a coverage quota or a new test framework for every snippet.

| Changed surface | Useful verification |
| --- | --- |
| UI/UX, layout or interaction | Use the running interface with browser/computer-use tools. Exercise the changed flow and relevant viewport, keyboard/focus, loading and error behavior. Keep selected screenshots or an action/result trace when useful. A source inspection or initial screenshot cannot prove an interaction. Avoid unit tests manufactured for styling; add/update a durable end-to-end test for a critical repeated flow when warranted. |
| Logic, parsing or state | Test the contract, meaningful boundaries and distinct regression cases. For a defect, demonstrate a failing regression before the fix when practical. Use the existing unit/integration stack where suitable. |
| API, database or integration | Exercise relevant success and failure behavior at the affected boundary with controlled fixtures or test environments. Distinguish mocks from observed integration; check compatibility when the contract changes. |
| Script, CLI or automation | Invoke it against disposable representative inputs; check results, errors, exit status and relevant repeat-run behavior. For state-changing code, use a safe fixture or supported dry run within the task's authority. Syntax checks alone do not prove behavior. |
| Code example or executable configuration | Validate syntax and the documented behavior in a small safe example when practical. Respect a request to draft only; state any unexecuted assumptions. |

After a relevant final edit, rerun affected verification and reuse unchanged
proof. Report what ran, what it demonstrated and material gaps. If a needed
interface is unavailable, use another suitable authorized tool where possible;
do not invent a PASS or automatically transfer testing to the user. Build owns
repairs and Review owns acceptance within the existing task.
