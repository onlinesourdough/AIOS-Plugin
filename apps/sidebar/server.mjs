import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from '@modelcontextprotocol/ext-apps/server';
import { OpenAIExtensions } from '@openai/mcp-extensions/server';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { readNotionConnection } from './codex-status.mjs';
import { readContextRoute } from './context-route.mjs';

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
  if (!pending) pending = Promise.all([readNotionConnection(), readContextRoute()])
    .then(([notion, context]) => ({ version: __AIOS_VERSION__, notion, context, checkedAt: new Date().toISOString() }))
    .finally(() => { pending = undefined; });
  return pending;
}
async function result() {
  return {
    content: [{ type: 'text', text: 'AIOS setup panel. Connection status and the saved context pointer are shown in the panel; setup still verifies access to the chosen home.' }],
    _meta: { 'aios/status': await status() },
  };
}

registerAppTool(server, 'aios_open', {
  title: 'AIOS', description: 'Open AIOS setup: check the Notion connection, choose a context home and continue with the existing AIOS Setup skill. Reads connection metadata and the AIOS routing block only.',
  inputSchema: {},
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
  _meta: { ui: { resourceUri: uri }, 'openai/ui': { entrypoints: [{ type: 'global' }] } },
}, result);

registerAppTool(server, 'aios_status', {
  title: 'Refresh AIOS setup', description: 'Refresh connection metadata and the saved context pointer without reading business pages or changing configuration.',
  inputSchema: {},
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
  _meta: { ui: { resourceUri: uri, visibility: ['app'] } },
}, result);

server.connect(new StdioServerTransport()).catch(() => {
  console.error('AIOS sidebar could not start. Check the Node runtime and plugin installation.');
  process.exitCode = 1;
});
