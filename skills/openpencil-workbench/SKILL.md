---
name: openpencil-workbench
description: Open, inspect, save and export an explicitly selected optional OpenPencil companion using an external release and isolated task state.
metadata:
  version: "1.0.1"
---

# AIOS:openpencil-workbench

Use for a selected editable companion. `DESIGN.md` stays canonical; unavailable
editor tooling leaves the portable direction usable and the native requirement
explicitly unverified. Node 20+, `unzip`, a compatible external runtime and an
available harness browser are needed. No executable is bundled or installed.

The adopted helper targets OpenPencil **v0.8.4**, release commit
`c51d7ed41a96068a09127bbc096fee143fce0b22`. Its verified VSIX hash is
`7ce6cde22f7e8584de2faca0279f6d74438675291c2547a7d99230fc0e629342`
(macOS arm64, historical source verification). This does not promise availability
on another platform or prove a newer release compatible. Revalidate a new tool
selection at its first-party source. Upstream is MIT; its code/assets remain
external and their notices must accompany any separately adopted material.

Resolve this skill's installed path and use explicit absolute source/state paths:

```sh
node <openpencil-skill>/scripts/openpencil-workbench.mjs start \
  --vsix /absolute/external/openpencil.vsix \
  --document /absolute/project/design/openpencil/candidate.op \
  --state-dir /absolute/scratch/new-editor-session \
  --expected-nodes 25 --expected-document-sha256 <reviewed-hash>
```

State must be outside the package and separate from the selected source/runtime.
Use an absent private task directory. `--runtime-root` instead of `--vsix` is
for an explicitly supplied compatible runtime; its version/layout check is
**not** release-byte verification. Record its separately verified provenance.

The helper copies the selected source into disposable `working_document` state
before launching the daemon. Open its returned loopback `url` with an available
harness browser; do not invoke an OS-browser launcher. Inspect the live canvas.
Fresh origins seed English only when no existing OpenPencil language preference
exists. Served locale/CanvasKit checks do not prove rendered English.

Author only after the canvas is visible. `File → Save` counts when the known
private working file actually changes: record before/after hashes and node
counts, and prove the selected source unchanged. Preserve the candidate at an
explicit absent project path before cleanup. Reopen that candidate through
`File → Open` if available, or a fresh verified native `--file` start; record
which route was observed. Save As or browser image export needs a real local
download surfaced by the browser; otherwise report `unavailable-download`.

While live, use `native-export --state-dir <state> --output-dir <absent-output>`
for bounded native MCP `export_frames` against the private working copy. It
validates reported PNG headers/dimensions and unchanged source/working hashes,
then copies without overwrite. Output is top-level frames; inspect actual
renders before claiming visual correctness or a platform crop.

Compare the reopened source and export with `DESIGN.md`. Run `check --state-dir
<state> --document <candidate.op> --expected-nodes <count>
--expected-document-sha256 <hash>`; add `--export <file.png>` and
`--expected-export-sha256 <hash>` only for a validated file. Use `status` and
bounded `logs --lines 80`, always with `--state-dir`. Leave the workbench open
for requested `waiting-review`; otherwise `stop --state-dir <state>` closes the
daemon and removes its disposable state. Save candidates and needed proof first.

The [snapshot helper](../design/references/portable-work.md) can include native
companions with `--openpencil`, `--openpencil-tool <verified-CLI>`,
`--openpencil-source <relative.op>`, repeatable `--openpencil-export <relative.png
or .svg>`, `--openpencil-version`, `--openpencil-release-revision`,
`--openpencil-revision` (observed upstream commit), `--openpencil-provenance`,
`--openpencil-review PASS`, and `--openpencil-limitations`. The named selected
reviewer must bind every source/export hash. A CLI version probe alone proves
no live editing. Missing optional tools produce an explicit fallback, never
native proof; required native work stays incomplete until verified.
