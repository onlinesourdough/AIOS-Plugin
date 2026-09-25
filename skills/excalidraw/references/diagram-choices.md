# Choose a diagram that answers the question

These are options, not a requirement to produce a complete diagram set.
Prefer the simplest view that makes a relationship easier to understand.

| Question | Useful view | What must be clear |
| --- | --- | --- |
| What happens next, including alternatives? | Flowchart or decision tree | Start/end, action versus decision, branch conditions |
| Who does what and where is the handoff? | Swimlanes | One ownership rule for lanes, cross-lane handoffs, waiting |
| Who calls whom, and in what order? | Sequence diagram | Participants, message direction/order, meaningful async or failure paths |
| What exists and how does it connect? | System or relationship map | Boundary, element meaning, relationship meaning |
| Which information belongs together? | Entity/relationship diagram | Entities, keys and supported cardinality; uncertainty where schema is absent |
| How does something change over time? | State diagram or timeline | State versus event, transition condition or ordering |
| How do these alternatives differ? | Comparison, before/after or matrix | Same comparison basis and a visible decision criterion |
| How can we organise a rough idea? | Concept map or grouped sketch | Main idea, labelled relationships, open questions |
| Where does a feedback loop change behaviour? | Feedback diagram | Direction, what is fed back and where the decision changes |

A topology does not show timing. A process does not necessarily show software
structure. Use separate views when those distinctions matter. Avoid a diagram
when a short sentence or table answers the question more clearly. For measured
quantities, use a plotting tool; box sizes and hand-drawn curves are not data.

## Composition

Start from the important relationship and build out only what explains it.
Use a consistent reading direction and enough separation for labels and arrows.
Group elements only when the group has a defined meaning; do not surround every
sentence with a card. Give a complex view a title, scope and compact notation key.

Text should fit at the intended viewing scale. Split a crowded explanation into
linked views instead of shrinking every label. A prepared board may have regions
to focus on during discussion, but an animation or scripted reveal is optional.
Colors can distinguish types or status; retain text labels so meaning survives
grayscale and color-vision differences. Icons are supplementary, not a substitute
for a component name or explanation.

Decision branches need explicit conditions. Parallel branches and joins should
represent real alternatives or concurrency, not just balanced geometry. Put the
relationship label close to the connection it names. Avoid crossing unrelated
nodes; use a bend or another arrangement when necessary.

## Review with the intended reader in mind

Trace a concrete example through the diagram. Can a reader tell where it starts,
which choice is made, what the arrow means and where it ends? Inspect all labels
and the connections in the live editor. Check the story at normal zoom and any
detail view separately. For an existing diagram, verify that the requested edit
preserves unrelated nodes, manual annotations and stable connections.

Return assumptions as assumptions. A clean drawing cannot establish that an
undocumented process, relationship or system actually exists.
