import test from 'node:test';
import assert from 'node:assert/strict';
import { createPickerStore, pageId } from './picker.mjs';
import { notionPluginState, NOTION_PLUGIN_ID, setupState, readNotionPlugin } from './codex-status.mjs';
import { setupPrompt } from './ui-model.mjs';
const page = (n, title = 'Notes', path = 'Studio') => ({ title, path, url: `https://app.notion.com/p/${String(n).padStart(32, '0')}` });
const sources = { docs: page(2, 'Docs'), skills: page(3, 'Skills'), memory: null, spaces: ['Studio'] };
function start(kind = 'pages') { const store = createPickerStore(); const panel = store.open(); const req = store.begin({ panelId: panel.panelId, kind, ...(kind === 'sources' ? { context: page(1).url } : {}) }); return { store, panel, req, requestId: req.picker.request.id }; }

test('installation and connection are independent; neither falsely implies ready', () => {
  assert.equal(notionPluginState({ installed: [] }), 'missing');
  const p = { pluginId: NOTION_PLUGIN_ID, installed: true, enabled: true };
  assert.equal(notionPluginState({ installed: [p] }), 'enabled');
  assert.equal(notionPluginState({ installed: [{ ...p, enabled: false }] }), 'disabled');
  for (const inventory of [{}, { installed: [null] }, { installed: [p, p] }]) assert.equal(notionPluginState(inventory), 'unknown');
  assert.equal(notionPluginState({ installed: [{ ...p, pluginId: 'notion@lookalike' }] }), 'missing');
  assert.equal(setupState('missing', 'connected'), 'not_installed');
  assert.equal(setupState('disabled', 'connected'), 'plugin_disabled');
  assert.equal(setupState('unknown', 'connected'), 'unknown');
  assert.equal(setupState('enabled', 'not_connected'), 'not_connected');
  assert.equal(setupState('enabled', 'connected'), 'connected');
});
test('plugin detection uses bounded native CLI and hides raw errors', async () => {
  const state = await readNotionPlugin({ run: async (cmd, args, opts) => {
    assert.equal(cmd, 'codex'); assert.deepEqual(args, ['plugin', 'list', '--json']); assert.ok(opts.timeout <= 12000);
    return { stdout: JSON.stringify({ installed: [] }) };
  } });
  assert.equal(state, 'missing');
  assert.equal(await readNotionPlugin({ run: async () => { throw new Error('secret'); } }), 'unknown');
});
test('only exact Notion page identities; no credentials or lookalikes', () => {
  assert.equal(pageId(page(1).url + '?pvs=204'), '0'.repeat(31) + '1');
  for (const url of ['https://notion.so.attacker.test/' + 'a'.repeat(32), 'https://secret@notion.so/' + 'a'.repeat(32), 'https://app.notion.com/no-id']) assert.equal(pageId(url), null);
});
test('real metadata travels through a scoped mailbox; duplicate titles stay distinct', () => {
  const { store, panel, requestId } = start();
  const reply = { requestId, pages: [page(1), page(2, 'Notes', 'Client')] };
  const result = store.publish(reply);
  assert.equal(result.pages.length, 2); assert.equal(store.read(panel.panelId).request.state, 'complete');
  assert.deepEqual(store.publish(reply), result);
  assert.throws(() => store.publish({ requestId, pages: [] }), /different reply/);
  result.pages[0].title = 'mutated'; assert.equal(store.read(panel.panelId).pages[0].title, 'Notes');
});
test('duplicates, content payloads and unrequested data are rejected', () => {
  const { store, requestId } = start();
  assert.throws(() => store.publish({ requestId, pages: [page(1), page(1)] }), /once/);
  assert.throws(() => store.publish({ requestId, pages: [{ ...page(1), body: 'private' }] }));
  assert.throws(() => store.publish({ requestId, pages: [], sources }));
  assert.throws(() => store.publish({ requestId, pages: Array.from({ length: 31 }, (_, i) => page(i)) }));
  assert.throws(() => store.publish({ requestId, error: 'Denied', pages: [] }));
});
test('source results cannot cross context or panel; replacing requests invalidates old ones', () => {
  const { store, panel, requestId } = start('sources');
  assert.throws(() => store.publish({ requestId, context: page(5), sources }), /selected context/);
  const second = store.begin({ panelId: panel.panelId, kind: 'sources', context: page(5).url });
  assert.throws(() => store.publish({ requestId, context: page(1), sources }), /replaced/);
  assert.equal(store.publish({ requestId: second.picker.request.id, context: page(5), sources }).context.url, page(5).url);
  assert.deepEqual(store.open().pages, []);
});
test('expired requests and memory capacity are bounded', () => {
  let now = 0; const store = createPickerStore({ now: () => now });
  const panel = store.open(); const req = store.begin({ panelId: panel.panelId, kind: 'pages' });
  now = 600000; assert.throws(() => store.publish({ requestId: req.picker.request.id, pages: [] }), /expired/);
  const first = store.open(); for (let i = 0; i < 12; i++) store.open();
  assert.throws(() => store.read(first.panelId), /expired/);
});

test('setup allows an interview without expiring at discovery timeout', () => {
  let now = 0; const store = createPickerStore({ now: () => now });
  const panel = store.open();
  const req = store.begin({ panelId: panel.panelId, kind: 'setup', setup: { provider:'notion', target:page(1).url, client:false, planOnly:false, create:false } });
  now = 20 * 60000;
  assert.equal(store.publish({ requestId:req.picker.request.id, outcome:'needs_input' }).setup.outcome, 'needs_input');
  now = 60 * 60000;
  assert.throws(() => store.read(panel.panelId), /expired/);
});
test('access failure stays an error; empty list does not imply empty workspace', () => {
  const { store, requestId, req } = start();
  assert.match(req.prompt, /Empty results do not mean/);
  const result = store.publish({ requestId, error: 'Notion is unavailable.' });
  assert.equal(result.request.state, 'error'); assert.deepEqual(result.pages, []);
});
test('setup carries client and read-only constraints, sources and Space', () => {
  const prompt = setupPrompt('notion', page(1).url, { docs: page(2).url, space: 'Studio', client: true, planOnly: true });
  assert.match(prompt, /Do not read or change my unrelated personal/);
  assert.match(prompt, /do not create, edit, install or change instructions/);
  assert.ok(prompt.includes(page(2).url)); assert.match(prompt, /Studio/);
  const other = setupPrompt('other', '/work/context', { docs: page(2).url, space: 'Studio' });
  assert.ok(!other.includes(page(2).url)); assert.ok(!other.includes('Studio'));
});

test('a source map is not reapplied as a new map after browsing another page list', () => {
  const { store, panel, requestId } = start('sources');
  store.publish({ requestId, context: page(1), sources });
  const next = store.begin({ panelId: panel.panelId, kind: 'pages', query: 'other' });
  const result = store.publish({ requestId: next.picker.request.id, pages: [page(5)] });
  assert.equal(result.mapRequestId, requestId);
});
test('setup completion must match requested mode and verified entry; picker alone cannot mark ready', () => {
  const store = createPickerStore(); const panel = store.open();
  const setup = { provider: 'notion', target: page(1).url, client: false, planOnly: true, create: false };
  let req = store.begin({ panelId: panel.panelId, kind: 'setup', setup });
  assert.throws(() => store.publish({ requestId: req.picker.request.id, outcome: 'ready', entry: { title: 'AIOS', target: page(1).url }, sources }), /not verified/);
  assert.equal(store.publish({ requestId: req.picker.request.id, outcome: 'plan' }).setup.outcome, 'plan');
  req = store.begin({ panelId: panel.panelId, kind: 'setup', setup: { ...setup, planOnly: false } });
  assert.throws(() => store.publish({ requestId: req.picker.request.id, outcome: 'ready' }), /not verified/);
  assert.equal(store.publish({ requestId: req.picker.request.id, outcome: 'ready', entry: {title:'AIOS',target:page(1).url}, sources: {...sources, teamSkills: sources.skills} }).setup.outcome, 'ready');
});
test('a team source may share the skills database but never grants sharing authority', () => {
  const prompt = setupPrompt('notion', page(1).url, {skills:page(3).url,teamSkills:page(3).url});
  assert.match(prompt, /Audience Personal\/Team/); assert.match(prompt, /not access controls/);
});
