# Architecture views

Start with the decision and audience, then select the scope. The
[C4 model](https://c4model.com/diagrams) distinguishes system context, containers,
components and code. Use only the levels that help; most explanations do not
need all four. A C4 container is an application or data store, not necessarily
a Docker container. Do not call an arbitrary box diagram C4-compliant.

| Need | View | Include |
| --- | --- | --- |
| Explain who uses a system and what surrounds it | System context | People, the system of interest, external systems and purposes of relationships |
| Explain the major software parts | Container | Applications, services and data stores inside a named system boundary; responsibilities and known technologies |
| Explain one service's internal structure | Component | Cohesive components within that selected container; their responsibilities and dependencies |
| Explain runtime placement | Deployment | Selected environment, runtime nodes/services, replicated instances where relevant and network placement |
| Explain one operation | Sequence or dynamic view | Participants, ordered interactions, sync/async distinction and relevant failure/retry behaviour |
| Explain information movement | Data flow | Named data, transformations, stores and relevant trust/ownership crossings |

The first three rows apply the C4 scope distinctions. The remaining rows serve
different questions and should be labelled accordingly. Keep a context view
about systems and people; use another view for tables, classes or network detail.

## Ground the drawing

For an existing system, inspect the relevant entrypoints, dependencies, deployment
configuration, interfaces and schemas. Use current documentation when it agrees
with implementation; identify drift instead of silently choosing a pleasing
story. Keep a short source/revision note with the project artifact. Do not copy
secrets, private records, credentials or full configuration dumps into the canvas.

For a proposed architecture, say that it is proposed. Use the accepted requirements
and label unresolved choices. A cloud logo, protocol, queue, database or security
control belongs only when sourced or explicitly proposed. Do not add a gateway,
event bus or microservices merely to make a simple system look sophisticated.

## Make the semantics visible

Name each component and state its role. Add technology when known and relevant
to the question. Draw a boundary for a meaningful system, environment or trust
zone, with its meaning in the label/key. Ownership and trust boundaries are
different concepts; distinguish them if both are shown.

Label inter-component arrows with the interaction or data they carry; include
protocols only when known and useful. Direction must match the label. Separate
request, response and event semantics when readers could otherwise misunderstand.
An arrow labelled only “uses” rarely explains an architectural decision.

Keep static structure separate from execution order. If an API enqueues a job
that a worker consumes, show the queue/worker path in structure and a sequence
view when acknowledgement, retry or completion timing is the actual question.
Show a failure path only when it contributes to the selected explanation; do
not invent resilience behaviour that the sources do not establish.

For deployment, state which environment is shown. Do not infer production
replicas or exposure from a local development file. For data views, distinguish
logical entities from runtime services. For security discussions, a drawn
boundary is explanatory evidence, not proof that a control is enforced.

## Review

Check the diagram against a real or clearly hypothetical request through the
system. Verify abstraction consistency, names, responsibilities, arrow meaning,
boundary meaning and material omissions. Separate observed facts from proposed
work; use a small key for non-obvious symbols. These criteria align with the
[C4 review checklist](https://c4model.com/diagrams/checklist).

Also inspect layout in the live editor: labels fit, relationships remain attached
when a node moves, and overview/detail views are readable. Check the saved editable
source as well as the displayed view. A valid scene file proves neither an
accurate architecture nor a visually usable explanation.

Sources: Simon Brown's C4 model pages linked above (CC BY 4.0). This is a concise
adaptation of the scope/review concepts for this workflow, not a copied template
or a requirement to use every C4 level.
