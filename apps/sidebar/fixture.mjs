// Local development host with synthetic data only. No writes, auth or real messages.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const port = 43191;
createServer(async (req, res) => {
  if (req.method !== 'GET' || req.headers.host !== `127.0.0.1:${port}`) { res.writeHead(403); return res.end(); }
  const paths = { '/': './fixture.html', '/app': '../../runtime/sidebar/index.html' };
  if (!paths[req.url]) { res.writeHead(404); return res.end(); }
  try {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(await readFile(new URL(paths[req.url], import.meta.url), 'utf8'));
  } catch { res.writeHead(500); res.end('Build the sidebar before opening the fixture.'); }
}).listen(port, '127.0.0.1', () => console.log(`Synthetic AIOS host: http://127.0.0.1:${port}/`));
