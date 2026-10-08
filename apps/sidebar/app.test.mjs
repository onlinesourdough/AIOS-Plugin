import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { classifyTarget, connectionCopy } from './ui-model.mjs';
const source = await readFile(new URL('./app.mjs', import.meta.url), 'utf8');
const template = await readFile(new URL('./index.html', import.meta.url), 'utf8');
const target = 'https://app.notion.com/p/00000000000000000000000000000001';
async function ui(context = { state: 'missing', revision: 'a'.repeat(64) }) {
  let focused, time = 100000, host, fail = false, delay, release;
  const calls = [], links = [], nodes = new Map();
  for (const match of template.matchAll(/<(\w+)\b([^>]*\bid="([^"]+)"[^>]*)>/g)) {
    const el = { id: match[3], value: '', hidden: /\bhidden\b/.test(match[2]), disabled: false, dataset: {}, textContent: '', listeners: {},
      addEventListener(type, handler) { this.listeners[type] = handler; }, focus() { focused = this.id; } };
    nodes.set(el.id, el);
  }
  const status = { notion: { state: 'connected' }, context, checkedAt: new Date(time).toISOString() };
  class App {
    constructor() { host = this; }
    getHostContext() { return {}; }
    async connect() { this.ontoolresult({ _meta: { 'aios/status': status } }); }
    async openLink(args) { links.push(args.url); return {}; }
    async callServerTool({ name, arguments: args }) {
      calls.push({ name, args }); if (delay) await delay;
      if (fail) throw new Error('Request failed');
      time += 10;
      if (name === 'aios_save_context') status.context = { state: 'configured', ...classifyTarget(args.target), revision: 'b'.repeat(64) };
      return { _meta: { 'aios/status': { ...status, checkedAt: new Date(time).toISOString() } } };
    }
  }
  const sandbox = { App, classifyTarget, connectionCopy, __AIOS_VERSION__: 'test', applyDocumentTheme() {}, applyHostStyleVariables() {},
    document: { getElementById: id => nodes.get(id) }, Date: class extends Date { static now() { return time; } } };
  await vm.runInNewContext(`(async () => {${source.replace(/^import .*;\n/gm, '')}})()`, sandbox);
  return { nodes, calls, links, status, focused: () => focused,
    notify: value => host.ontoolresult(value), fail: value => { fail = value; },
    delay() { delay = new Promise(resolve => { release = resolve; }); }, release() { release(); delay = undefined; },
    click: id => nodes.get(id).listeners.click(),
    input: value => { nodes.get('target').value = value; nodes.get('target').listeners.input(); },
    provider: value => { nodes.get('provider').value = value; nodes.get('provider').listeners.change(); },
    submit: () => nodes.get('setup').listeners.submit({ preventDefault() {} }),
  };
}
test('Continue saves directly with no conversation capability and returns to a minimal home', async () => {
  const u = await ui(); u.input(target); await u.submit();
  assert.equal(u.calls.length, 1); assert.equal(u.calls[0].name, 'aios_save_context');
  assert.equal(u.calls[0].args.target, target); assert.equal(u.nodes.get('home').hidden, false);
  assert.equal(u.nodes.get('setup').hidden, true); assert.equal(u.focused(), 'heading');
  await u.click('open-context'); assert.deepEqual(u.links, [target]);
});
test('an existing context opens directly; cancelling an edit makes no calls', async () => {
  const u = await ui({ state: 'configured', target, kind: 'notion', revision: 'a'.repeat(64) });
  assert.equal(u.nodes.get('home').hidden, false); await u.click('change');
  assert.equal(u.focused(), 'target'); u.input('https://example.com'); await u.click('cancel');
  assert.equal(u.nodes.get('home').hidden, false); assert.equal(u.calls.length, 0);
});
test('pending save locks input and blocks double submit; failures retain the draft', async () => {
  const u = await ui(); u.input(target); u.delay(); u.fail(true);
  const save = u.submit(); assert.equal(u.nodes.get('target').disabled, true); await u.submit();
  assert.equal(u.calls.length, 1); u.release(); await save;
  assert.equal(u.nodes.get('target').disabled, false); assert.equal(u.nodes.get('target').value, target);
  assert.equal(u.nodes.get('home').hidden, true); assert.equal(u.nodes.get('feedback').dataset.error, 'true');
});
test('failed refresh clears Connected; late snapshots cannot restore it and retry recovers', async () => {
  const u = await ui(); u.fail(true); await u.click('refresh');
  assert.equal(u.nodes.get('connection-label').textContent, 'Could not verify');
  u.notify({ _meta: { 'aios/status': u.status } });
  assert.equal(u.nodes.get('connection-label').textContent, 'Could not verify');
  u.fail(false); await u.click('refresh'); assert.equal(u.nodes.get('connection-label').textContent, '✓ Connected');
});
test('non-Notion contexts omit connection actions; ambiguous instructions cannot be saved', async () => {
  const u = await ui(); u.provider('other'); u.input('/work/my vault'); assert.equal(u.nodes.get('notion').hidden, true);
  const blocked = await ui({ state: 'ambiguous', revision: 'a'.repeat(64) });
  assert.equal(blocked.nodes.get('continue').disabled, true); assert.equal(blocked.nodes.get('feedback').hidden, false);
});

test('malformed status removes the Connected claim and leaves a working retry', async () => {
  const u = await ui(); u.notify({ _meta: { 'aios/status': { notion: { state: 'connected' }, context: { state: 'configured' }, checkedAt: new Date(100005).toISOString() } } });
  assert.equal(u.nodes.get('connection-label').textContent, 'Could not verify');
  assert.equal(u.nodes.get('refresh').disabled, false);
  await u.click('refresh'); assert.equal(u.nodes.get('connection-label').textContent, '✓ Connected');
});
