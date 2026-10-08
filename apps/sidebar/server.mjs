import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from '@modelcontextprotocol/ext-apps/server';
import { OpenAIExtensions } from '@openai/mcp-extensions/server';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { readNotionSetup } from './codex-status.mjs';
import { readContextRoute, saveContextRoute } from './context-route.mjs';
import { readSources, saveSources } from './sources.mjs';
import { z } from 'zod';

const uri = 'ui://aios/home-v3';
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

// Each snapshot carries its start time so delayed reads cannot undo a newer save.
let lastCheck = 0;
async function status() {
  lastCheck = Math.max(lastCheck + 1, Date.now());
  const checkedAt = new Date(lastCheck).toISOString();
  const [notion, context] = await Promise.all([readNotionSetup(), readContextRoute()]);
  const sources = context.state === 'configured' ? await readSources(context.target) : { state: 'missing', title: '', links: {} };
  return { version: __AIOS_VERSION__, notion, context, sources, checkedAt };
}
async function result() {
  return { content: [{ type: 'text', text: 'AIOS dashboard. Connection status and saved links to Context, Docs, Skills and Memory; no business records are copied.' }],
    _meta: { 'aios/status': await status() } };
}
registerAppTool(server, 'aios_open', {
  title: 'AIOS', description: 'Open the AIOS panel with connection status and the saved context location. No page search, conversation request or Notion write.',
  inputSchema: {},
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
  _meta: { ui: { resourceUri: uri }, 'openai/ui': { entrypoints: [{ type: 'global' }] } },
}, result);
registerAppTool(server, 'aios_status', {
  title: 'Refresh AIOS', description: 'Refresh Notion connection metadata and the saved context location.',
  inputSchema: {},
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
  _meta: { ui: { visibility: ['app'] } },
}, result);
registerAppTool(server, 'aios_save_context', {
  title: 'Save your context', description: 'Save the user-entered personal default context location in the AIOS block of Codex instructions. Preserve other rules and back up changed instructions. This does not verify access or create business sources.',
  inputSchema: { target: z.string().min(1).max(2048), expectedRevision: z.string().regex(/^[a-f0-9]{64}$/) },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  _meta: { ui: { visibility: ['app'] } },
}, async (args) => {
  try {
    const bridge = await readFile(join(__dirname, '../../skills/aios-context/assets/bridge.md'), 'utf8');
    await saveContextRoute(args, { bridge });
    return await result();
  } catch (error) { return { isError: true, content: [{ type: 'text', text: error.message }] }; }
});

server.registerTool('aios_sources', {
  title: 'Read AIOS source links',
  description: 'Read the current personal context location and its saved navigation links with revision tokens. Use only for requested setup or source-link maintenance. These are saved links, not live Notion records or proof of access.',
  inputSchema: {},
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async () => {
  const context = await readContextRoute();
  const sources = context.state === 'configured' ? await readSources(context.target) : { state: 'missing', title: '', links: {} };
  return { content: [{ type: 'text', text: JSON.stringify({ context, sources }) }] };
});
const sourceLink = z.object({ title: z.string().min(1).max(100), target: z.string().min(1).max(2048) }).strict();
registerAppTool(server, 'aios_save_sources', {
  title: 'Save AIOS source links',
  description: 'Save only navigation names and links for the selected personal context. Setup uses verified destinations; the panel accepts user-entered links. Does not read or write Notion content, store skills or memories, verify access, or change the context pointer. Replaces the whole link map; include every role to keep. Read aios_sources for current revision tokens first. Never use the personal default for a different client.',
  inputSchema: { target: z.string().min(1).max(2048), expectedContextRevision: z.string().regex(/^[a-f0-9]{64}$/), expectedRevision: z.string().regex(/^[a-f0-9]{64}$/), title: z.string().max(100), links: z.object({ docs: sourceLink.optional(), personalSkills: sourceLink.optional(), teamSkills: sourceLink.optional(), memory: sourceLink.optional() }).strict() },
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false },
  _meta: { ui: { visibility: ['app', 'model'] } },
}, async args => {
  try {
    await saveSources(args);
    return await result();
  } catch (error) { return { isError: true, content: [{ type: 'text', text: error.message }] }; }
});

server.connect(new StdioServerTransport()).catch(() => {
  console.error('AIOS sidebar could not start. Check the Node runtime and plugin installation.');
  process.exitCode = 1;
});
