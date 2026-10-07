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
  assert.deepEqual(tools.map((tool) => tool.name), ['aios_open', 'aios_status']);
  assert.deepEqual(tools[0]._meta['openai/ui'].entrypoints, [{ type: 'global' }]);
  assert.deepEqual(tools[1]._meta.ui.visibility, ['app']);
  assert.ok(client.getServerVersion().icons[0].src.startsWith('data:image/svg+xml;base64,'));
  const view = await client.readResource({ uri: 'ui://aios/setup' });
  assert.equal(view.contents[0].mimeType, 'text/html;profile=mcp-app');
  assert.deepEqual(view.contents[0]._meta['openai/ui'], { preferredDisplayMode: 'fullscreen', availableDisplayModes: ['fullscreen'] });
  assert.ok(view.contents[0].text.includes('by onlinesourdough'));
  const result = await client.callTool({ name: 'aios_open', arguments: {} });
  assert.equal(result.isError, undefined);
  assert.equal(result._meta['aios/status'].context.state, 'missing');
  assert.ok(['unknown', 'not_connected'].includes(result._meta['aios/status'].notion.state));
  assert.equal(JSON.stringify(result.content).includes('Context:'), false);
  console.log('PASS: bundled stdio server, global entrypoint, fullscreen resource and isolated first run.');
} finally { await client.close(); await rm(scratch, { recursive: true, force: true }); }
