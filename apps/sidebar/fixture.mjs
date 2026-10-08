import { createServer } from 'node:http';
import { readFile, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readContextRoute, saveContextRoute } from './context-route.mjs';
const port = Number(process.env.PORT || 43194);
const codexHome = await mkdtemp(join(tmpdir(), 'aios-ui-test-'));
const bridge = await readFile(new URL('../../skills/aios-context/assets/bridge.md', import.meta.url), 'utf8');
const version = JSON.parse(await readFile(new URL('./package.json', import.meta.url))).version;
let lastCheck = 0;
const server = createServer(async (req, res) => {
  try {
    if (req.method === 'GET') {
      const path = { '/': './fixture.html', '/test': './fixture.html', '/app': '../../runtime/sidebar/index.html' }[req.url];
      if (!path) { res.writeHead(404); return res.end(); }
      res.setHeader('Content-Type', 'text/html; charset=utf-8'); return res.end((await readFile(new URL(path, import.meta.url), 'utf8')).replace('/*HOST_MODE*/', req.url === '/test' ? 'debug' : 'preview'));
    }
    if (req.method !== 'POST' || req.url !== '/rpc' || req.headers.origin !== `http://127.0.0.1:${port}`) { res.writeHead(403); return res.end(); }
    let body = ''; for await (const chunk of req) { body += chunk; if (body.length > 5000) throw new Error('Too large'); }
    const { action, args, scenario } = JSON.parse(body);
    if (action === 'reset') {
      await rm(join(codexHome, 'AGENTS.md'), { force: true });
      if (scenario === 'existing') await writeFile(join(codexHome, 'AGENTS.md'), bridge.replace('<verified-context-entry-url-or-absolute-path>', 'https://app.notion.com/p/00000000000000000000000000000001'));
      if (scenario === 'ambiguous') await writeFile(join(codexHome, 'AGENTS.md'), '<!-- AIOS:BEGIN -->old instructions');
    } else if (action === 'save') await saveContextRoute(args, { codexHome, bridge });
    else if (action !== 'status') throw new Error('Unsupported test operation');
    lastCheck = Math.max(lastCheck + 1, Date.now());
    const state = ({ missing: 'not_installed', disconnected: 'not_connected', disabled: 'plugin_disabled', unknown: 'unknown' })[scenario] || 'connected';
    res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ content: [], _meta: { 'aios/status': { version, notion: { state }, context: await readContextRoute({ codexHome }), checkedAt: new Date(lastCheck).toISOString() } } }));
  } catch (error) { res.writeHead(400); res.end(JSON.stringify({ error: error.message })); }
}).listen(port, '127.0.0.1', () => console.log(`Synthetic AIOS host: http://127.0.0.1:${port}/`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(async () => { await rm(codexHome, { recursive: true, force: true }); process.exit(0); }));
