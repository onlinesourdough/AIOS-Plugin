import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { createPickerStore } from './picker.mjs';
import { notionPageId } from './target.mjs';
import { classifyTarget, connectionCopy, setupPrompt } from './ui-model.mjs';

const source = await readFile(new URL('./app.mjs', import.meta.url), 'utf8');
const template = await readFile(new URL('./index.html', import.meta.url), 'utf8');
const page = (n) => ({ title: `Page ${n}`, url: `https://app.notion.com/p/${String(n).padStart(32, '0')}` });

// Small synthetic DOM/host for event-order regressions. Browser rendering is
// exercised separately; these tests invoke the app's real event handlers.
async function ui(context = { state: 'missing' }) {
  let focused, time = 100000;
  class Element {
    constructor(tag, id = '') {
      Object.assign(this, { tag, id, listeners: {}, children: [], value: '', hidden: false, disabled: false, checked: false, dataset: {}, textContent: '' });
    }
    replaceChildren(...children) { this.children = children; if (this.tag === 'select') this.value = children[0]?.value || ''; }
    append(...children) { this.children.push(...children); }
    addEventListener(type, handler) { (this.listeners[type] ||= []).push(handler); }
    click() { return emit(this, 'click'); }
    focus() { focused = this.id; }
  }
  const nodes = new Map();
  for (const match of template.matchAll(/<(\w+)\b([^>]*\bid="([^"]+)"[^>]*)>/g)) {
    const el = new Element(match[1], match[3]); el.hidden = /\bhidden\b/.test(match[2]); nodes.set(el.id, el);
  }
  nodes.get('provider').value = 'notion';
  const sections = Array.from({ length: 4 }, (_, n) => ({ dataset: { step: String(n) } }));
  const setupMarkup = template.slice(template.indexOf('<form'), template.indexOf('</form>'));
  const controls = [...nodes.values()].filter((el) => ['input', 'select', 'button'].includes(el.tag) && setupMarkup.includes(`id="${el.id}"`));
  const store = createPickerStore(), panel = store.open(), prompts = [];
  let host, failRefresh = false;
  const status = { notion: { state: 'connected' }, context, checkedAt: new Date(time).toISOString() };
  class App {
    constructor() { host = this; }
    getHostCapabilities() { return { serverTools: {}, message: { text: {} }, openLinks: {} }; }
    getHostContext() { return {}; }
    addEventListener() {}
    async connect() { this.ontoolresult({ _meta: { 'aios/status': status, 'aios/picker': panel } }); }
    async sendMessage(input) { prompts.push(input.content[0].text); return {}; }
    async callServerTool({ name, arguments: args }) {
      if (name === 'aios_picker_request') return { _meta: { 'aios/request': store.begin(args) } };
      if (name === 'aios_picker_read') return { _meta: { 'aios/picker': store.read(args.panelId) } };
      if (failRefresh) throw new Error('Connection check failed');
      time += 10;
      return { _meta: { 'aios/status': { ...status, checkedAt: new Date(time).toISOString() } } };
    }
  }
  async function emit(el, type) {
    if (el.disabled) throw new Error(`Cannot interact with disabled ${el.id}`);
    for (const handler of el.listeners[type] || []) await handler({ target: el, preventDefault() {} });
    if (type === 'change' && controls.includes(el)) for (const handler of nodes.get('setup').listeners.change || []) await handler({ target: el });
  }
  const sandbox = { App, OpenAIExtensions: class {}, notionPageId, classifyTarget, connectionCopy, setupPrompt,
    __AIOS_VERSION__: 'test', applyDocumentTheme() {}, applyHostStyleVariables() {},
    Option: class { constructor(text, value) { this.text = text; this.value = value; } },
    document: { getElementById: (id) => nodes.get(id), createElement: (tag) => new Element(tag), querySelectorAll: (selector) => selector === '[data-step]' ? sections : controls },
    Date: class extends Date { static now() { return time; } },
    setTimeout() { return 1; }, clearTimeout() {},
  };
  await vm.runInNewContext(`(async () => {${source.replace(/^import .*;\n/gm, '')}})()`, sandbox);
  return { store, panel, nodes, prompts, status, focused: () => focused,
    notify: (result) => host.ontoolresult(result),
    reply: (state) => host.ontoolresult({ _meta: { 'aios/picker': state } }),
    click: (id) => emit(nodes.get(id), 'click'),
    submit: () => emit(nodes.get('setup'), 'submit'),
    change: async (id, value) => { nodes.get(id).value = value; await emit(nodes.get(id), 'change'); },
    failRefresh: (value) => { failRefresh = value; },
  };
}

test('late discovery and pending snapshots cannot regress active or completed setup', async () => {
  const u = await ui();
  await u.click('find');
  const discovery = u.store.publish({ requestId: u.store.read(u.panel.panelId).request.id, pages: [page(1)] });
  u.reply(discovery);
  await u.change('context-choice', page(1).url);
  for (let i = 0; i < 4; i++) await u.submit();
  const pending = u.store.read(u.panel.panelId);
  assert.equal(pending.request.kind, 'setup');
  u.reply(discovery);
  assert.equal(u.nodes.get('client').disabled, true);
  assert.equal(u.nodes.get('check-result').hidden, false);
  assert.equal(u.nodes.get('back').disabled, true);
  await u.submit();
  assert.equal(u.store.read(u.panel.panelId).request.id, pending.request.id);
  u.reply(u.store.publish({ requestId: pending.request.id, outcome: 'needs_input' }));
  assert.equal(u.nodes.get('client').disabled, false);
  assert.equal(u.nodes.get('check-result').hidden, true);
  assert.equal(u.nodes.get('picker-status').hidden, true);
  assert.equal(u.nodes.get('feedback').textContent, 'Continue setup in the chat.');
  u.reply(pending);
  assert.equal(u.nodes.get('client').disabled, false);
  assert.equal(u.nodes.get('check-result').hidden, true);
});

test('failed status refresh removes Connected, disables discovery and permits retry', async () => {
  const u = await ui(); u.failRefresh(true);
  await u.click('refresh');
  assert.equal(u.nodes.get('connection-label').textContent, 'Could not verify');
  assert.equal(u.nodes.get('find').disabled, true);
  assert.equal(u.nodes.get('refresh').disabled, false);
  // A full delayed notification carries status as well as picker metadata.
  u.notify({ _meta: { 'aios/status': u.status, 'aios/picker': u.panel } });
  assert.equal(u.nodes.get('connection-label').textContent, 'Could not verify');
  assert.equal(u.nodes.get('find').disabled, true);
  u.failRefresh(false); await u.click('refresh');
  assert.equal(u.nodes.get('connection-label').textContent, '✓ Connected');
  assert.equal(u.nodes.get('find').disabled, false);
});

test('switching providers removes Notion selections and creation intent', async () => {
  const u = await ui();
  await u.change('context-choice', 'new');
  await u.change('provider', 'other');
  assert.equal(u.nodes.get('notion-actions').hidden, true);
  await u.submit(); await u.submit();
  const prompt = u.prompts.at(-1);
  assert.match(prompt, /Help me choose the context entry/);
  assert.doesNotMatch(prompt, /create a context entry in a suitable Notion/);
  assert.doesNotMatch(setupPrompt('other', '', { create: true }), /create a context entry in a suitable Notion/);
});

test('the overview shows pending source retrieval and source errors', async () => {
  const u = await ui({ state: 'configured', target: page(1).url });
  await u.click('load-home');
  assert.equal(u.nodes.get('home-state').hidden, false);
  assert.match(u.nodes.get('home-state').textContent, /Loading sources/);
  u.reply(u.store.publish({ requestId: u.store.read(u.panel.panelId).request.id, error: 'Source access unavailable' }));
  assert.equal(u.nodes.get('home-state').textContent, 'Source access unavailable');
  assert.equal(u.nodes.get('home-state').dataset.error, 'true');
});

test('step and overview transitions move focus to the visible heading', async () => {
  const u = await ui({ state: 'configured', target: page(1).url });
  await u.click('edit-setup'); assert.equal(u.focused(), 'step-title');
  await u.submit(); assert.equal(u.focused(), 'step-title');
  await u.click('back'); assert.equal(u.focused(), 'step-title');
  for (let i = 0; i < 4; i++) await u.submit();
  u.reply(u.store.publish({ requestId: u.store.read(u.panel.panelId).request.id, outcome: 'ready',
    entry: { title: 'AIOS', target: page(1).url }, sources: { docs: null, skills: null, memory: null, spaces: [] } }));
  assert.equal(u.focused(), 'home-title');
});
