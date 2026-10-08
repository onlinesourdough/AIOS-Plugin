import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { classifyTarget, connectionCopy } from './ui-model.mjs';
const source = await readFile(new URL('./app.mjs', import.meta.url), 'utf8');
const template = await readFile(new URL('./index.html', import.meta.url), 'utf8');
const target = 'https://app.notion.com/p/00000000000000000000000000000001';
async function ui(context = { state: 'missing', revision: 'a'.repeat(64) }, sources = { state: 'missing', revision: 'c'.repeat(64), title: '', links: {} }) {
  let focused, time = 100000, host, fail = false, delay, release;
  const calls = [], links = [], nodes = new Map();
  for (const match of template.matchAll(/<(\w+)\b([^>]*\bid="([^"]+)"[^>]*)>/g)) {
    const el = { id: match[3], value: '', hidden: /\bhidden\b/.test(match[2]), disabled: false, dataset: {}, textContent: '', listeners: {},
      addEventListener(type, handler) { this.listeners[type] = handler; }, focus() { focused = this.id; } };
    nodes.set(el.id, el);
  }
  const status = { notion: { state: 'connected' }, context, sources, checkedAt: new Date(time).toISOString() };
  class App {
    constructor() { host = this; }
    getHostContext() { return {}; }
    async connect() { this.ontoolresult({ _meta: { 'aios/status': status } }); }
    async openLink(args) { links.push(args.url); return {}; }
    async callServerTool({ name, arguments: args }) {
      calls.push({ name, args }); if (delay) await delay;
      if (fail) throw new Error('Request failed');
      time += 10;
      if (name === 'aios_save_context') { status.context = { state: 'configured', ...classifyTarget(args.target), revision: 'b'.repeat(64) }; status.sources = {state:'missing', revision:'c'.repeat(64), title:'', links:{}}; }
      if (name === 'aios_save_sources') status.sources = {state:'saved', revision:'d'.repeat(64), title:args.title, links:args.links};
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
    input: value => { nodes.get('target').value = value; },
    set: (id,value) => { nodes.get(id).value = value; },
    provider: () => nodes.get('provider').listeners.click(),
    submit: () => nodes.get('setup').listeners.submit({ preventDefault() {} }),
  };
}
test('numbered setup saves each step without chat and opens all configured destinations', async () => {
  const u = await ui(); u.input(target); u.set('docs','https://example.com/docs'); await u.submit();
  assert.equal(u.nodes.get('skills-fields').hidden, false);
  assert.equal(u.nodes.get('context-fields').hidden, true);
  u.set('personalSkills','https://example.com/skills'); await u.click('add-team'); u.set('teamSkills','https://example.com/team'); await u.submit();
  assert.equal(u.nodes.get('memory-fields').hidden, false);
  u.set('memory','https://example.com/memory'); await u.submit();
  assert.equal(u.nodes.get('home').hidden, false); assert.equal(u.focused(), 'heading');
  for (const id of ['context','docs','personalSkills','teamSkills','memory']) await u.click('open-'+id);
  assert.deepEqual(u.links,[target,'https://example.com/docs','https://example.com/skills','https://example.com/team','https://example.com/memory']);
  assert.deepEqual(u.calls.map(c=>c.name), ['aios_save_context','aios_save_sources','aios_save_sources','aios_save_sources']);
});
test('an existing context opens directly; cancelling an edit makes no calls', async () => {
  const u = await ui({ state: 'configured', target, kind: 'notion', revision: 'a'.repeat(64) });
  assert.equal(u.nodes.get('home').hidden, false); await u.click('settings');
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

test('refresh in progress blocks a new save until the current snapshot arrives', async () => {
  const u = await ui(); u.input(target); u.delay();
  const refreshing = u.click('refresh');
  assert.equal(u.nodes.get('continue').disabled, true);
  await u.submit(); assert.deepEqual(u.calls.map(call => call.name), ['aios_status']);
  u.release(); await refreshing;
  assert.equal(u.nodes.get('continue').disabled, false);
  await u.submit(); assert.equal(u.nodes.get('skills-fields').hidden, false);
});

test('saved destinations open immediately, optional team stays hidden and a missing source opens its own step', async () => {
 const u=await ui({state:'configured',target,kind:'notion',revision:'a'.repeat(64)}, {state:'saved',revision:'c'.repeat(64),title:'Our AIOS',links:{personalSkills:{title:'Writing skills',target:'https://example.com/skills'}}});
 assert.equal(u.nodes.get('context-name').textContent,'Our AIOS');
 assert.equal(u.nodes.get('open-teamSkills').hidden,true);
 await u.click('open-personalSkills'); assert.deepEqual(u.links,['https://example.com/skills']);
 await u.click('open-memory'); assert.equal(u.nodes.get('memory-fields').hidden,false);
 u.set('memory','https://example.com/memory'); await u.submit();
 assert.equal(u.nodes.get('home').hidden,false);
 assert.equal(u.status.sources.links.personalSkills.title,'Writing skills');
});
test('changing context clears the previous customer destinations before another source save', async () => {
 const u=await ui({state:'configured',target,kind:'notion',revision:'a'.repeat(64)}, {state:'saved',revision:'c'.repeat(64),title:'Client A',links:{docs:{title:'Private docs',target:'https://example.com/a'}}});
 await u.click('settings'); u.input('https://app.notion.com/p/00000000000000000000000000000002'); await u.submit();
 assert.deepEqual(u.calls.map(c=>c.name),['aios_save_context']);
 assert.equal(u.nodes.get('docs').value,''); assert.equal(u.nodes.get('context-fields').hidden,false);
 await u.submit(); assert.equal(Object.keys(u.calls[1].args.links).length,0);
});

test('refresh while editing cannot apply an old draft to newly observed source links', async () => {
 const u=await ui({state:'configured',target,kind:'notion',revision:'a'.repeat(64)});
 await u.click('settings'); u.set('docs','https://example.com/draft');
 u.status.sources={state:'saved',revision:'e'.repeat(64),title:'New name',links:{memory:{title:'New memory',target:'https://example.com/new'}}};
 await u.click('refresh'); await u.submit();
 assert.deepEqual(u.calls.map(c=>c.name),['aios_status']);
 assert.equal(u.nodes.get('feedback').dataset.error,'true');
 assert.equal(u.nodes.get('docs').value,'https://example.com/draft');
});
