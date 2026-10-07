import { open } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { classifyTarget } from './target.mjs';

const LIMIT = 64 * 1024;

export function parseContextRoute(text) {
  const starts = [...text.matchAll(/<!-- AIOS:BEGIN -->/g)];
  const ends = [...text.matchAll(/<!-- AIOS:END -->/g)];
  if (!starts.length && !ends.length) return { state: 'missing' };
  if (starts.length !== 1 || ends.length !== 1 || starts[0].index >= ends[0].index) return { state: 'ambiguous' };
  const block = text.slice(starts[0].index + starts[0][0].length, ends[0].index);
  const routes = [...block.matchAll(/^Context:[ \t]*(.+)$/gm)];
  if (routes.length !== 1) return { state: 'ambiguous' };
  const raw = routes[0][1].trim();
  // The shared bridge ends Context: with one sentence period for every provider.
  const route = classifyTarget(raw.replace(/\.$/, ''));
  return route ? { state: 'configured', ...route } : { state: 'ambiguous' };
}

export async function readContextRoute({ codexHome = process.env.CODEX_HOME || join(homedir(), '.codex') } = {}) {
  let handle;
  try {
    // One owned routing block only. Do not search projects, old homes or chats.
    handle = await open(join(codexHome, 'AGENTS.md'), 'r');
    const info = await handle.stat();
    if (!info.isFile() || info.size > LIMIT) return { state: 'unavailable' };
    const buffer = Buffer.alloc(LIMIT + 1);
    const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
    if (bytesRead > LIMIT) return { state: 'unavailable' };
    return parseContextRoute(buffer.toString('utf8', 0, bytesRead));
  } catch (error) {
    return { state: error.code === 'ENOENT' ? 'missing' : 'unavailable' };
  } finally { await handle?.close(); }
}
