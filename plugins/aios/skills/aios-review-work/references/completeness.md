# Evaluate completeness

Freeze the final artifacts and reconstruct the original request plus accepted
clarifications. Do not edit the result during evaluation.

| Check | Pass evidence |
| --- | --- |
| Requirements | Each explicit requirement maps to the actual final result |
| Artifacts | Every claimed file, URL or ID exists and resolves in its owning system |
| Behavior | Relevant execution or inspection directly exercises the requested behavior; synthetic and native evidence remain distinct |
| Inspectability | The owner has concise links, paths or a useful preview to verify the result |
| Honest scope | Partial, unavailable, uncertain or flaky evidence is disclosed, with no unsupported completion claim |

Return PASS only when all applicable required proof is present. Otherwise return
FAIL with unverified claims and the smallest revision or remaining observation.
Include the exact subject, checkpoint and requirement-to-evidence mapping; keep
it proportional to the task. A small artifact needs a small check, not an
invented evaluation project. Delivery, recovery and measured outcome remain
separate; a successful build does not prove an unobserved operational outcome.
Relevant edits invalidate the affected pass and require evaluation again.
