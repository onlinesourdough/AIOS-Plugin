# Pi package and discovery

Use only for authorized Pi package installation, registration or bridge repair.
Apply the shared [native adapter and bridge boundary](adapters.md), then the
relevant [Pi configuration](harness-pi.md).

The root package.json declares only `pi.skills`, pointing to the same 17 root
`skills/` folders. No extensions or install scripts are provided. Standard
local and Git package routes are:

```sh
pi install /absolute/path/to/AIOS-Plugin
pi install git:github.com/onlinesourdough/AIOS-Plugin@REVIEWED_REF
```

Choose one source, not both. Local install references the repository without
copying skill bodies. A Git install is a harness-managed package checkout;
never use it for owner data or development work. Pi may reconcile/reset its
managed Git cache on package update. Dependencies and lifecycle scripts are
absent from this package. Verify `pi list`, package paths, loaded skill names
and a fresh session. Do not manually copy skills into ~/.pi/agent/skills.

Default bridge target is ~/.pi/agent/AGENTS.md; respect a configured agent home.
Inspect AGENTS.override.md and any fallback CLAUDE.md plus effective loaded
context. Preserve unrelated content and resolve shadowing as for Codex.
Only patch exact owned keys/array entries if settings require a change; never
rewrite settings.json wholesale or touch authentication stores.

## Default AIOS-focused discovery

During authorized AIOS onboarding, use AIOS-focused global discovery as the
product default unless an established explicit setting must be preserved or a
concrete compatibility conflict needs a decision. This default is not authority
for a silent settings mutation. Compute these absolute paths from the actual
user home and resolved `AIOS_ROOT`; never package a machine-specific path:

```json
[
  "!<actual-home>/.agents/skills/**",
  "<AIOS_ROOT>/skills",
  "!<AIOS_ROOT>/skills/*.md"
]
```

Apply the array only through the supported Pi settings control and preserve all
other settings, packages, explicit overrides and trusted repository resources.
The first entry excludes ambient global skills, the second explicitly loads
owner skills, and the third excludes root-level README or other Markdown that
is not a `skills/<name>/SKILL.md` body. Explicitly selected package skills remain
separate from that ambient directory exclusion. Do not replace the final
exclusion with the apparently tidier `AIOS_ROOT/skills/*/SKILL.md` pattern: the
tested Pi loader did not resolve that form. This exclusion affects the global
source only; trusted repository-local `.agents/skills` discovery remains
independent.

The observed 0.3.1 candidate fixture result was 14 AIOS skills, four owner skills and
two explicitly selected external Global skills in an ordinary untrusted context;
the trusted AIOS repository additionally exposed exactly six local development
skills. No ambient shared skills or diagnostics appeared. This is version-specific
native evidence, not a universal all-version promise. Reapply or adopt a package
only at a separate authorized task boundary.

From 0.4.0 the source repository also has no generic local developer skill
payload. Fresh discovery should expose the 17 shared product skills once, plus
only deliberately installed personal/external or repository specialist methods.
The six local skills in the historical observation above are not a current
installation requirement.
