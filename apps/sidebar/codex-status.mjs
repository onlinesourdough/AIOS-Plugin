import { spawn } from 'node:child_process';

// Use the public app-server protocol, never Codex's auth files or private HTTP APIs.
export const NOTION_ID = 'asdk_app_69c18c28f1188191bf5b8445c4ab0a2e';
export const NOTION_CONNECT_URL = `https://chatgpt.com/apps/notion/${NOTION_ID}`;
const isRecord = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

export function notionState(app) {
  if (!app) return 'not_connected';
  if (app.enabled === false) return 'disabled';
  if (app.enabled !== true || typeof app.callable !== 'boolean') return 'unknown';
  return app.callable ? 'connected' : 'unavailable';
}

export async function readNotionConnection({ launch = spawn, timeoutMs = 12000 } = {}) {
  let child;
  let timer;
  try {
    return await new Promise((resolve) => {
      let finished = false;
      let buffer = '';
      let bytes = 0;
      const finish = (state) => {
        if (finished) return;
        finished = true;
        resolve({ state, connectUrl: NOTION_CONNECT_URL });
      };
      child = launch('codex', ['app-server', '--stdio'], {
        // Keep the user's actual account/config. No shell and no auth material in output.
        stdio: ['pipe', 'pipe', 'ignore'], windowsHide: true,
      });
      timer = setTimeout(() => finish('unknown'), timeoutMs);
      child.on('error', () => finish('unknown'));
      child.on('exit', () => finish('unknown'));
      child.stdin.on('error', () => finish('unknown'));
      child.stdout.on('error', () => finish('unknown'));
      const send = (method, params, id) => child.stdin.write(JSON.stringify({ method, params, ...(id ? { id } : {}) }) + '\n');
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (chunk) => {
        if (finished) return;
        bytes += Buffer.byteLength(chunk);
        if (bytes > 4 * 1024 * 1024) return finish('unknown');
        buffer += chunk;
        let end;
        while ((end = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, end); buffer = buffer.slice(end + 1);
          if (!line.trim()) continue;
          let response;
          try {
            response = JSON.parse(line);
            if (!isRecord(response)) return finish('unknown');
            if (response.id === 1) {
              if (response.error || !isRecord(response.result)) return finish('unknown');
              send('initialized', {});
              send('app/installed', { forceRefresh: true }, 2);
            } else if (response.id === 2) {
              if (response.error || !Array.isArray(response.result?.apps)) return finish('unknown');
              const apps = response.result.apps;
              if (!apps.every((app) => isRecord(app) && typeof app.id === 'string' && app.id.trim()
                && typeof app.enabled === 'boolean' && typeof app.callable === 'boolean')) return finish('unknown');
              const matches = apps.filter((app) => app.id === NOTION_ID);
              if (matches.length > 1) return finish('unknown');
              if (matches.length === 1) return finish(notionState(matches[0]));
              return finish('not_connected');
            }
          } catch { return finish('unknown'); }
          if (finished) break;
        }
      });
      send('initialize', { clientInfo: { name: 'aios-sidebar', version: '1.0' }, capabilities: { experimentalApi: true } }, 1);
    });
  } catch {
    return { state: 'unknown', connectUrl: NOTION_CONNECT_URL };
  } finally {
    clearTimeout(timer);
    if (child && child.exitCode === null) {
      child.stdin.end();
      child.kill();
      const forceStop = setTimeout(() => { if (child.exitCode === null) child.kill('SIGKILL'); }, 1000);
      forceStop.unref();
      child.once('exit', () => clearTimeout(forceStop));
    }
  }
}
