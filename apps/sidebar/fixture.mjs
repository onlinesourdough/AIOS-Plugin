// Synthetic local test host. It never reads accounts or business data.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createPickerStore } from './picker.mjs';
const port = Number(process.env.AIOS_FIXTURE_PORT || 43193);
const store = createPickerStore();
const page = (n, title, path = 'North Studio') => ({ title, path, url: `https://app.notion.com/p/${String(n).padStart(32, '0')}` });
const pages = [page(1, 'AIOS'), page(2, 'Docs'), page(3, 'Skills'), page(4, 'Memory'), page(5, 'Notes'), page(6, 'Notes', 'Client Studio')];
createServer(async (req, res) => {
  if (req.headers.host !== `127.0.0.1:${port}` || req.headers.origin && req.headers.origin !== `http://127.0.0.1:${port}`) { res.writeHead(403); return res.end(); }
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      const path = { '/': './fixture.html', '/app': '../../runtime/sidebar/index.html' }[req.url];
      if (!path) { res.writeHead(404); return res.end(); }
      res.setHeader('Content-Type', 'text/html; charset=utf-8'); return res.end(await readFile(new URL(path, import.meta.url), 'utf8'));
    }
    if (req.method !== 'POST' || req.url !== '/rpc' || req.headers.origin !== `http://127.0.0.1:${port}`) { res.writeHead(403); return res.end(); }
    let body = ''; for await (const chunk of req) { body += chunk; if (body.length > 16000) throw new Error('Too large'); }
    const { action, args } = JSON.parse(body); let data;
    if (action === 'open') data = store.open();
    else if (action === 'begin') data = store.begin(args);
    else if (action === 'read') data = store.read(args.panelId);
    else if (action === 'reply') {
      const current = store.read(args.panelId);
      const result = current.request.kind === 'setup' ? { outcome: current.request.planOnly ? 'plan' : 'ready', entry: {title:'AIOS',target:pages[0].url}, sources: {docs:pages[1],skills:pages[2],teamSkills:null,memory:pages[3],spaces:['North Studio']} } : args.fail ? { error: 'Source access is unavailable.' } : current.request.kind === 'pages' ? { pages: args.empty ? [] : pages } : {
        context: { ...pages[0], url: current.request.context }, sources: { docs: pages[1], skills: pages[2], memory: pages[3], spaces: ['North Studio', 'Workshop'] },
      };
      data = store.publish({ requestId: current.request.id, ...result });
    } else throw new Error('Unknown action');
    res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data));
  } catch (error) { res.writeHead(400); res.end(JSON.stringify({ error: error.message })); }
}).listen(port, '127.0.0.1', () => console.log(`Synthetic AIOS host: http://127.0.0.1:${port}/`));
