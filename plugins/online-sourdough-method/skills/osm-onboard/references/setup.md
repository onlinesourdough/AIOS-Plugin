# Setup a useful owner home

Inspect before writing. Resolve any requested user folder once, expanding ~
using the active user's home and resolving existing symlinks/parent paths.
Default to ~/.OSM only when no configured or chosen home exists. Preserve an
existing home, including ~/OSM or a custom location, unless a move is requested.
Record its absolute path in the native bridge. A relative path is not a portable identity;
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

Keep OSM.md as the owner entrypoint and the small native global bridge as its
route. Do not create owner-context AGENTS.md or AGENTS.override.md files in the
home or its projects/systems directories: ancestor instructions can reach nested
repository tasks. During setup, inspect any existing inherited instruction route;
repair only the owned routing block under existing authority, preserving unrelated
instructions. Unresolved personal preload is an isolation gap, not a passed setup.

New authorized checkouts use OSM_ROOT/projects/<slug> or OSM_ROOT/systems/<slug>
as physical roots, with their own .git, AGENTS.md and lifecycle. Existing chosen
external paths remain valid. Use [creation](../../osm/references/creation.md)
only when a needed independent owner is justified; setup does not preclone
templates or registered repositories. Copy the [ignore asset](../assets/owner/.gitignore)
for a new home; merge its checkout exclusions into existing rules only when needed,
preserving other rules. Verify exclusions before owner Git staging.

Only ask what changes the current result: current focus, audience or context,
then a concrete unresolved constraint. One short question at a time; answers
may skip or stop. Save sourced owner meaning concisely; label agent inferences
until confirmed. Show the captured delta so a correction is easy. Do not ask
for a complete business inventory or scan all accounts. Store a harness-scope
preference only if needed for actual worker routing and not already known;
never store a model catalog or reasoning policy.

When setup changes harness configuration or discovery, use the relevant section
of [harness configuration](harness-configuration.md) to preserve the chosen
baseline. Inspect optional extras only when requested or needed for the task;
resuming an established home does not require a machine-wide configuration audit.
Use [adapters](adapters.md) when installing a bridge/package or repairing discovery.
Check effective instructions including overrides and preserve unrelated bytes.
Only connect a service needed by the first task: inspect available tools,
confirm account and read/write capability, guide one native authentication
step if missing, then test a safe read. Never request a secret in chat or write
one into the home. Record verification and actual authority separately.
Missing optional tools do not block a local result.

Complete one small useful artifact tied to the user's focus. Check root and
bridge readback, format, selected routes, connection gaps and the first result.
For new or changed setup, test in a fresh session with an ordinary request that
does not name OSM. For Codex desktop onboarding/cutover, also verify the actual
[New Chat entry point](adapters.md#codex-desktop-entry-point--when-onboarding-or-cutover-affects-it);
CLI projectless evidence alone does not establish GUI selection or sidebar state.
If unavailable, report setup artifacts verified and activation
NOT VERIFIED. An unchanged resume does not require repeating cold installation
acceptance or optional configuration checks. Return configured path, concise
changes, remaining gaps and the next useful action. Use the business-constraint
route only when relevant.
