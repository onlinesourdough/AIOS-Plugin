# Live Excalidraw operation

AIOS supplies the method. The optional external runtime is
[yctimlin/mcp_excalidraw](https://github.com/yctimlin/mcp_excalidraw), MIT,
reviewed revision `713706e967ed21db1d9264748fa01c6af961c792`, npm package
`mcp-excalidraw-server@2.0.0` (Node 20+).
Registry integrity:
`sha512-aBzC2Mbb7XSVoiIC0SSZh2728Z59H82sXzTe8pn1o9fLVedPBecgYhuDxrtsPpVT7Njh3Spb0b/k40R5Jjk8Xg==`.

The toolkit's CLI, stdio MCP and HTTP interface operate the same live canvas.
Use an already configured compatible MCP connection when present; otherwise
the pinned CLI is sufficient. The separately hosted
[official Excalidraw MCP App](https://github.com/excalidraw/excalidraw-mcp) is
another option, not an installed connection or an attachment to excalidraw.com.
Select a different tool/version deliberately; do not silently register a service
or switch a live-browser request to a chat widget.

## Resolve or set up the selected runtime

Locate the existing installation from the task's verified tool route. Keep it
outside the AIOS package, owner context and deliverable directory. For authorized
setup, select an absent dedicated runtime directory appropriate to the platform;
preserve an existing directory with unknown provenance. Record the chosen route
with the task so another run can resume it.

Set `EXCALIDRAW_RUNTIME` to that absolute directory before using these commands:

```sh
npm install --prefix "$EXCALIDRAW_RUNTIME" --save-exact --ignore-scripts --no-audit --no-fund mcp-excalidraw-server@2.0.0
```

Verify package name, exact version and the package-lock integrity above. Keep
the lock and upstream license with the runtime. This installs the dependency
only; it does not prove a browser can open or that MCP is registered. Do not
use an unversioned `npx` command as an implicit update or modify a plugin cache.

Read the unchanged upstream instructions at
`$EXCALIDRAW_RUNTIME/node_modules/mcp-excalidraw-server/skills/excalidraw-skill/SKILL.md`
and its command reference only as needed. A second global skill registration
is unnecessary. They document APIs; this AIOS skill governs diagram choice,
browser handoff and optional image exports.

## Operate one selected canvas

Select a loopback URL, inspect its status and scene, and record it with this
task. Preserve another task's canvas; choose an unused port when isolation is
needed. Set `EXCALIDRAW_CANVAS` to the selected URL, for example
`http://127.0.0.1:43127`, then use the pinned entrypoint:

```sh
node "$EXCALIDRAW_RUNTIME/node_modules/mcp-excalidraw-server/dist/bin.js" --url "$EXCALIDRAW_CANVAS" status
node "$EXCALIDRAW_RUNTIME/node_modules/mcp-excalidraw-server/dist/bin.js" --url "$EXCALIDRAW_CANVAS" start
```

Status is read-only; canvas commands can auto-start the service. Open the returned
local URL in the selected built-in browser, inspect the canvas, then use the
upstream `add`, `apply`, `get`, `describe`, `arrange` and `export` commands for the
actual work. Read back edits. Normal browser edits sync with the same scene.
Do not open a second external browser as a workaround for missing Codex controls.

Keep standalone text alignment explicit and inspect the live layout: implicit
centering can reposition standalone labels during conversion. For shape labels
and arrow bindings, use the toolkit's documented element format; raw Excalidraw
file fields and the toolkit's convenient input fields are not interchangeable.

Use named snapshots before substantial revisions and save the editable scene to
the explicit project path before ending a session. Importing with `--replace`
replaces the selected canvas; use it only for the intended scene with recovery
preserved. Reopen the saved file and inspect labels, connections and manual edits.
PNG/SVG export is optional. The upstream screenshot loop is a verification aid,
not a mandatory image deliverable or substitute for the requested live canvas.

## Handoff, failure and recovery

Leave the verified tab and server running for a requested live handoff. A local
URL works only while that server is available on the same machine; it is not a
share link. Keep the durable `.excalidraw` file and exact route with the task.
If browser control fails, preserve preparation and report which of server,
canvas mutation, saved file and rendered editor were actually verified.

Export before stopping: live state is not a durable backup. Use the toolkit's
identity-checking `stop` command for its own server. On restart, start the chosen
runtime and import the saved scene into the intended canvas. Remove only the
dedicated runtime under an applicable removal instruction, preserving drawings.
An AIOS package rollback must not delete tool state or project files.

The optional `share` command uploads an encrypted scene to Excalidraw's service.
Local authoring does not require it; use it only for an authorized sharing action.
Updates require a reviewed version/provenance change and fresh affected checks.
Never auto-update or claim compatibility on untested platforms from npm metadata.
