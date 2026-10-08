import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from '@modelcontextprotocol/ext-apps/server';
import { OpenAIExtensions } from '@openai/mcp-extensions/server';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { readNotionSetup } from './codex-status.mjs';
import { readContextRoute } from './context-route.mjs';
import { z } from 'zod';
import { createPickerStore, replySchema, requestSchema } from './picker.mjs';

const uri = 'ui://aios/setup';
const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="14" height="14" rx="3"/><path d="M3 8h14M8 8v9"/></svg>';
// MCP SDK 1.31 does not serialize tool icons. The spec's server-icon fallback
// supplies the same theme-aware navigation icon without patching SDK internals.
const server = new McpServer({ name: 'aios', title: 'AIOS', version: __AIOS_VERSION__,
  icons: [{ src: `data:image/svg+xml;base64,${Buffer.from(icon).toString('base64')}`, mimeType: 'image/svg+xml', sizes: ['20x20'] }],
});
new OpenAIExtensions(server);

registerAppResource(server, 'aios-setup', uri, {}, async () => ({ contents: [{
  uri, mimeType: RESOURCE_MIME_TYPE, text: await readFile(join(__dirname, 'index.html'), 'utf8'),
  _meta: {
    ui: { csp: { connectDomains: [], resourceDomains: [] }, prefersBorder: false },
    'openai/ui': { preferredDisplayMode: 'fullscreen', availableDisplayModes: ['fullscreen'] },
  },
}] }));

// Join simultaneous refreshes. Do not persist or reuse account state between checks.
let pending;
function status() {
  if (!pending) pending = Promise.all([readNotionSetup(), readContextRoute()])
    .then(([notion, context]) => ({ version: __AIOS_VERSION__, notion, context, checkedAt: new Date().toISOString() }))
    .finally(() => { pending = undefined; });
  return pending;
}
const picker = createPickerStore();
async function result(reply, includePicker = true) {
  let selection;
  try { if (includePicker) selection = reply ? picker.publish(reply) : picker.open(); }
  catch (error) { return { isError: true, content: [{ type: 'text', text: error.message }] }; }
  return {
    content: [{ type: 'text', text: reply?.outcome ? 'Setup outcome returned to the AIOS panel.' : reply ? 'Notion choices returned to the AIOS panel. Wait for the user to select and continue.' : 'AIOS setup panel. Page browsing runs through the official Notion tools in the visible conversation. The panel still needs the user to continue setup.' }],
    _meta: { 'aios/status': await status(), ...(selection ? { 'aios/picker': selection } : {}) },
  };
}

registerAppTool(server, 'aios_open', {
  title: 'AIOS', description: 'Open AIOS setup or return official Notion metadata to a pending picker request. With no reply, reads connection metadata and the saved context pointer only. For a picker request, use the existing Notion tools, then pass its exact requestId and bounded page choices or source map. Never invent titles, locations, permissions or missing sources. A reply updates only the temporary panel; it does not configure the home.',
  inputSchema: { reply: replySchema.optional() },
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
  _meta: { ui: { resourceUri: uri }, 'openai/ui': { entrypoints: [{ type: 'global' }] } },
}, ({ reply }) => result(reply));

registerAppTool(server, 'aios_status', {
  title: 'Refresh AIOS setup', description: 'Refresh connection metadata and the saved context pointer without reading business pages or changing configuration.',
  inputSchema: {},
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
  _meta: { ui: { resourceUri: uri, visibility: ['app'] } },
}, () => result(undefined, false));

registerAppTool(server, 'aios_picker_request', {
  title: 'Prepare a Notion page request', description: 'Prepare a read-only request for the visible conversation. Does not call Notion or send a message.',
  inputSchema: requestSchema.shape,
  annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  _meta: { ui: { visibility: ['app'] } },
}, (args) => {
  try { return { content: [], _meta: { 'aios/request': picker.begin(args) } }; }
  catch (error) { return { isError: true, content: [{ type: 'text', text: error.message }] }; }
});

registerAppTool(server, 'aios_picker_read', {
  title: 'Read Notion page choices', description: 'Read a temporary picker result for this panel; never calls Notion.',
  inputSchema: { panelId: z.string().uuid() },
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  _meta: { ui: { visibility: ['app'] } },
}, ({ panelId }) => {
  try { return { content: [], _meta: { 'aios/picker': picker.read(panelId) } }; }
  catch (error) { return { isError: true, content: [{ type: 'text', text: error.message }] }; }
});

server.connect(new StdioServerTransport()).catch(() => {
  console.error('AIOS sidebar could not start. Check the Node runtime and plugin installation.');
  process.exitCode = 1;
});
