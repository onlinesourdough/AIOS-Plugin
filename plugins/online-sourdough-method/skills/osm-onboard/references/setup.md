# Setup a useful owner home

Inspect before writing. Resolve any requested user folder once, expanding ~
using the active user's home and resolving existing symlinks/parent paths.
Default to ~/OSM only when no configured or chosen home exists. Record its
absolute path in the native bridge. A relative path is not a portable identity;
a move requires a deliberate bridge update on the receiving machine.

Read only the existing bridge and relevant home files. If multiple bridges
point to different homes, preserve both and ask which is canonical. For a
missing path, check whether it is an unavailable volume before creating a new
folder. Never resolve a path by executing user-supplied shell text. Quote
arguments and handle spaces/non-ASCII paths.

On a new home, create missing files from [owner assets](../assets/owner/OSM.md)
using existing file tools. Do not clone AIOS or install a runtime. Validate
[data format](data.md), path ownership and write access with a scoped read/write
rehearsal. Do not follow unexpected symlinks to overwrite another owner. On an
existing home, inspect format and routes, retain every established fact, and
resume the next unfinished useful task. An empty field is not a reason for a
fresh interview. No Git setup is required for local work.

The configured root with OSM.md and a supported OSM_FORMAT is the owner home,
including when it has its own Git repository. Independent repositories, even
when nested under that home, retain their own local lifecycle. Unsupported or
malformed markers keep owner data read-only; do not fall through to a generic
repository edit. Check format before maintenance as well as onboarding writes.

Only ask what changes the current result: current focus, audience or context,
then a concrete unresolved constraint. One short question at a time; answers
may skip or stop. Save sourced owner meaning concisely; label agent inferences
until confirmed. Show the captured delta so a correction is easy. Do not ask
for a complete business inventory or scan all accounts. Store a harness-scope
preference only if needed for actual worker routing and not already known;
never store a model catalog or reasoning policy.

Use [harness configuration](harness-configuration.md) to inspect the chosen
baseline and optional native extras without silently changing owner choices.
Use [adapters](adapters.md) to install one small bridge per authorized harness.
Check effective instructions including overrides and preserve unrelated bytes.
Only connect a service needed by the first task: inspect available tools,
confirm account and read/write capability, guide one native authentication
step if missing, then test a safe read. Never request a secret in chat or write
one into the home. Record verification and actual authority separately.
Missing optional tools do not block a local result.

Complete one small useful artifact tied to the user's focus. Check root and
bridge readback, format, selected routes, connection gaps and the first result.
Then test in a fresh session with an ordinary request that does not name OSM.
If that test is unavailable, report setup artifacts verified and activation
NOT VERIFIED. Return configured path, concise changes, remaining gaps and the
next useful action. Use the business-constraint route only when relevant.
