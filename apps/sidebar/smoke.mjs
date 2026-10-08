import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const scratch = await mkdtemp(join(tmpdir(), 'aios-sidebar-smoke-'));
const client = new Client({ name: 'aios-sidebar-check', version: '1' });
const transport = new StdioClientTransport({
  command: process.execPath, args: [fileURLToPath(new URL('../../runtime/sidebar/server.cjs', import.meta.url))],
  env: { PATH: process.env.PATH, HOME: scratch, CODEX_HOME: scratch }, stderr: 'pipe',
});
try {
  await client.connect(transport);
  const { tools } = await client.listTools();
  assert.deepEqual(tools.map((tool) => tool.name), ['aios_open', 'aios_status', 'aios_picker_request', 'aios_picker_read']);
  assert.deepEqual(tools[0]._meta['openai/ui'].entrypoints, [{ type: 'global' }]);
  assert.deepEqual(tools[1]._meta.ui.visibility, ['app']);
  assert.ok(client.getServerVersion().icons[0].src.startsWith('data:image/svg+xml;base64,'));
  const view = await client.readResource({ uri: 'ui://aios/setup' });
  assert.equal(view.contents[0].mimeType, 'text/html;profile=mcp-app');
  assert.deepEqual(view.contents[0]._meta['openai/ui'], { preferredDisplayMode: 'fullscreen', availableDisplayModes: ['fullscreen'] });
  assert.ok(view.contents[0].text.includes('onlinesourdough'));
  const result = await client.callTool({ name: 'aios_open', arguments: {} });
  assert.equal(result.isError, undefined);
  assert.equal(result._meta['aios/status'].context.state, 'missing');
  assert.ok(['unknown', 'not_connected', 'not_installed'].includes(result._meta['aios/status'].notion.state));
  assert.equal(JSON.stringify(result.content).includes('Context:'), false);
  const panelId = result._meta['aios/picker'].panelId;
  const request = await client.callTool({ name: 'aios_picker_request', arguments: { panelId, kind: 'pages' } });
  const requestId = request._meta['aios/request'].picker.request.id;
  const pages = [{ title: 'Studio', url: 'https://app.notion.com/p/00000000000000000000000000000001' }];
  const reply = await client.callTool({ name: 'aios_open', arguments: { reply: { requestId, pages } } });
  assert.deepEqual(reply._meta['aios/picker'].pages, pages);
  const read = await client.callTool({ name: 'aios_picker_read', arguments: { panelId } });
  assert.deepEqual(read._meta['aios/picker'].pages, pages);
  assert.equal(JSON.stringify(read.content).includes('Studio'), false);
  console.log('PASS: bundled stdio server, global entrypoint, fullscreen resource and isolated first run.');
} finally { await client.close(); await rm(scratch, { recursive: true, force: true }); }
