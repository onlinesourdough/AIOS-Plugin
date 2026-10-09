import { open, lstat, mkdir, rename, unlink } from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { classifyTarget } from './target.mjs';
import { readContextRoute } from './context-route.mjs';

export const roles = ['docs', 'personalSkills', 'teamSkills', 'memory', 'teamMemory'];
const home = () => process.env.CODEX_HOME || join(homedir(), '.codex');
const digest = text => createHash('sha256').update(text).digest('hex');
const revision = text => digest(text === null ? 'missing' : 'file:' + text);
const unavailable = 'Saved source links are unavailable. They have been left unchanged.';
export function contextIdentity(target) {
  const route = classifyTarget(target);
  if (!route) throw new Error('Choose a valid context first.');
  if (route.kind === 'notion') {
    const id = new URL(route.target).pathname.replaceAll('-', '').match(/([a-f0-9]{32})\/?$/i)?.[1];
    if (id) return 'notion:' + id.toLowerCase();
  }
  return route.target;
}
export function normalizeSources({ title, links }) {
  if (typeof title !== 'string' || title.length > 100 || /[\x00-\x1f\x7f]/.test(title)
      || !links || typeof links !== 'object' || Array.isArray(links) || Object.keys(links).some(key => !roles.includes(key))) throw new Error('Invalid source links.');
  const clean = {};
  for (const role of roles) {
    const link = links[role];
    if (link == null) continue;
    const route = classifyTarget(link.target);
    if (!route || /[<>]/.test(route.target) || typeof link.title !== 'string' || !link.title.trim()
        || link.title.length > 100 || /[\x00-\x1f\x7f]/.test(link.title)) throw new Error('Enter a valid source link or absolute folder path.');
    clean[role] = { title: link.title.trim(), target: route.target };
  }
  return { title: title.trim(), links: clean };
}
async function location(codexHome, target, create = false) {
  let folder = codexHome;
  for (const name of ['aios', 'panel']) {
    folder = join(folder, name);
    if (create) await mkdir(folder, { mode: 0o700 }).catch(error => { if (error.code !== 'EEXIST') throw error; });
    try { if (!(await lstat(folder)).isDirectory()) throw new Error(unavailable); }
    catch (error) { if (error.code !== 'ENOENT' || create) throw error; }
  }
  return join(folder, digest(contextIdentity(target)) + '.json');
}
async function snapshot(path) {
  let handle;
  try {
    const info = await lstat(path);
    if (!info.isFile() || info.nlink !== 1 || info.size > 16384) throw new Error(unavailable);
    handle = await open(path, 'r');
    const opened = await handle.stat();
    if (opened.ino !== info.ino || opened.dev !== info.dev) throw new Error(unavailable);
    const buffer = Buffer.alloc(16385);
    const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
    if (bytesRead > 16384) throw new Error(unavailable);
    const text = new TextDecoder('utf-8', { fatal: true }).decode(buffer.subarray(0, bytesRead));
    return { text, revision: revision(text) };
  } catch (error) {
    if (error.code === 'ENOENT') return { text: null, revision: revision(null) };
    throw new Error(unavailable);
  } finally { await handle?.close(); }
}
function decode(value, target) {
  if (value.text === null) return { state: 'missing', revision: value.revision, title: '', links: {} };
  const data = JSON.parse(value.text);
  if (data.version !== 1 || data.contextIdentity !== contextIdentity(target)) throw new Error(unavailable);
  return { state: 'saved', revision: value.revision, ...normalizeSources(data) };
}
export async function readSources(target, { codexHome = home() } = {}) {
  try { return decode(await snapshot(await location(codexHome, target)), target); }
  catch { return { state: 'unavailable', title: '', links: {} }; }
}
export async function saveSources({ target, expectedContextRevision, expectedRevision, title, links }, { codexHome = home() } = {}) {
  const clean = normalizeSources({ title, links });
  const current = () => readContextRoute({ codexHome });
  const matches = context => context.state === 'configured' && context.revision === expectedContextRevision
    && contextIdentity(context.target) === contextIdentity(target);
  if (!matches(await current())) throw new Error('Your context changed. Refresh before saving source links.');
  const path = await location(codexHome, target, true);
  let lock, temporary;
  try {
    try { lock = await open(path + '.lock', 'wx', 0o600); }
    catch { throw new Error('Another source update is in progress. Try again when it finishes.'); }
    const before = await snapshot(path), previous = decode(before, target);
    if (before.revision !== expectedRevision) throw new Error('Source links changed. Refresh before saving again.');
    if (previous.state === 'saved' && JSON.stringify({ title: previous.title, links: previous.links }) === JSON.stringify(clean)) return previous;
    const text = JSON.stringify({ version: 1, contextIdentity: contextIdentity(target), ...clean }, null, 2) + '\n';
    if (before.text !== null) {
      let backup;
      try { backup = await open(path + '.' + before.revision + '.bak', 'wx', 0o600); await backup.writeFile(before.text); await backup.sync(); }
      catch (error) { if (error.code !== 'EEXIST' || (await snapshot(path + '.' + before.revision + '.bak')).text !== before.text) throw new Error('Could not back up source links. No changes were made.'); }
      finally { await backup?.close(); }
    }
    temporary = path + '.' + randomUUID() + '.tmp';
    const file = await open(temporary, 'wx', 0o600);
    try { await file.writeFile(text); await file.sync(); } finally { await file.close(); }
    if (!matches(await current()) || (await snapshot(path)).revision !== before.revision) throw new Error('Your setup changed. Refresh before saving again.');
    await rename(temporary, path); temporary = undefined;
    const after = await readSources(target, { codexHome });
    if (after.revision !== revision(text)) throw new Error('Saved links changed again. Refresh to inspect them.');
    if (!matches(await current())) throw new Error('Your context changed. Links were saved for the previous context only.');
    return after;
  } finally {
    if (temporary) await unlink(temporary).catch(() => {});
    if (lock) { await lock.close(); await unlink(path + '.lock'); }
  }
}
