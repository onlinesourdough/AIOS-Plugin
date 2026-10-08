import { App, applyDocumentTheme, applyHostStyleVariables } from '@modelcontextprotocol/ext-apps';
import { OpenAIExtensions } from '@openai/mcp-extensions/app';
import { notionPageId } from './target.mjs';
import { classifyTarget, connectionCopy, setupPrompt } from './ui-model.mjs';

const app = new App({ name: 'aios-setup', version: __AIOS_VERSION__ }, { availableDisplayModes: ['fullscreen'] });
const extensions = new OpenAIExtensions(app);
const $ = (id) => document.getElementById(id);
const roles = ['docs', 'skills', 'teamSkills', 'memory'];
let status, picker, appliedMap, appliedPages, pollTimer, pollUntil = 0;
let edited = false, sending = false, sent = false, refreshing = false;
let step = 0, homeVisible = false, initialView = true, appliedSetup;
let selectedContext = '', canMessage = false, selectedByUser = false;
let statusCheckedAt = -Infinity;
const canonical = (url) => notionPageId(url) ? `https://app.notion.com/p/${notionPageId(url)}` : url;
const knownPages = new Map();

function feedback(message, error = false) {
  $('feedback').textContent = message; $('feedback').dataset.error = String(error); $('feedback').hidden = false;
}
function theme(context) {
  if (context?.theme) applyDocumentTheme(context.theme);
  if (context?.styles?.variables) applyHostStyleVariables(context.styles.variables);
}
function fallback(prompt) { $('fallback-prompt').value = prompt; $('fallback').hidden = false; }
function addPage(page) {
  if (!page || typeof page.title !== 'string' || classifyTarget(page.url)?.kind !== 'notion') throw new Error('Invalid page result');
  knownPages.set(canonical(page.url), { ...page, url: canonical(page.url) });
}
function fillSelect(id, empty, selected, extra = []) {
  const list = [...knownPages.values()];
  const counts = new Map(); list.forEach((p) => counts.set(p.title, (counts.get(p.title) || 0) + 1));
  const items = [{ url: '', title: empty }, ...list.map((p) => ({ ...p, title: counts.get(p.title) > 1 ? `${p.title} · ${p.path || p.url}` : p.title })), ...extra];
  if (selected && !items.some((p) => p.url === selected)) items.splice(1, 0, { url: selected, title: 'Current context' });
  $(id).replaceChildren(...items.map((p) => new Option(p.title, p.url)));
  $(id).value = selected;
}
function choices() {
  fillSelect('context-choice', 'Choose with Codex', selectedContext, [{ url: 'new', title: 'New context page' }, { url: 'manual', title: 'Use a link…' }]);
  for (const role of roles) fillSelect(role, role === 'teamSkills' ? 'No team skills yet' : 'Choose with Codex', $(role).value);
}
function target() {
  if ($('provider').value !== 'notion' || selectedContext === 'manual') return $('target').value;
  return ['new', ''].includes(selectedContext) ? '' : selectedContext;
}
function form() {
  const notion = $('provider').value === 'notion';
  const setupPending = picker?.request?.kind === 'setup' && picker.request.state === 'pending';
  const locked = sending || setupPending;
  $('notion-step').hidden = !notion; $('notion-actions').hidden = !notion;
  $('notion-context').hidden = !notion; $('docs-field').hidden = !notion;
  $('manual').hidden = notion && selectedContext !== 'manual';
  $('start').textContent = sending ? 'Working…' : sent ? 'Continue in chat' : 'Continue';
  $('home').hidden = !homeVisible;
  $('setup').hidden = homeVisible || !status;
  $('progress').textContent = notion ? `${step + 1} of 4` : `${step === 0 ? 1 : 2} of 2`;
  $('step-title').textContent = ['Get started', 'Choose your context', 'Your skills', 'Your memory'][step];
  for (const section of document.querySelectorAll('[data-step]')) section.hidden = Number(section.dataset.step) !== step;
  $('back').hidden = step === 0;
  $('home-status').textContent = status ? connectionCopy[status.notion.state][0] : '';
  $('home-status').dataset.state = status?.notion.state || 'unknown';
  $('load-home').disabled = locked || status?.notion.state !== 'connected';
  $('edit-setup').disabled = locked;
  if (homeVisible) dashboard();
  for (const el of document.querySelectorAll('#setup input, #setup select, #setup button')) el.disabled = locked;
  $('start').disabled = locked || sent;
  $('check-result').hidden = picker?.request?.state !== 'pending';
  $('check-result').disabled = sending;
  const server = Boolean(app.getHostCapabilities()?.serverTools);
  $('refresh').disabled = refreshing || sending || !server;
  $('find').disabled = locked || !server || !picker || status?.notion.state !== 'connected';
  $('read-sources').hidden = !target() || classifyTarget(target())?.kind !== 'notion' || Boolean(appliedMap && canonical(picker?.context?.url) === canonical(target()));
  $('read-sources').disabled = locked || !server || !picker || status?.notion.state !== 'connected';
}
function render(result) {
  if (result?.isError) throw new Error(result.content?.find((c) => c.type === 'text')?.text || 'The panel request failed.');
  const next = result?._meta?.['aios/status'];
  const checkedAt = next ? Date.parse(next.checkedAt) : null;
  if (next && !Number.isFinite(checkedAt)) throw new Error('Invalid connection status');
  let focusOverview = false;
  // Account checks have their own ordering: a delayed notification must not
  // restore Connected after a newer failed refresh, even if its picker is valid.
  if (next && checkedAt > statusCheckedAt) {
    if (!Object.hasOwn(connectionCopy, next.notion?.state) || !['configured', 'missing', 'unavailable', 'ambiguous'].includes(next.context?.state)
      || next.context.state === 'configured' && !classifyTarget(next.context.target)) throw new Error('Invalid connection status');
    status = next; statusCheckedAt = checkedAt;
    if (initialView) { homeVisible = next.context.state === 'configured'; initialView = false; }
    $('connection-label').textContent = connectionCopy[next.notion.state][0];
    $('connection-label').dataset.state = next.notion.state;
    $('connect').hidden = next.notion.state === 'connected';
    $('connect').textContent = next.notion.state === 'not_installed' ? 'Install Notion' : next.notion.state === 'plugin_disabled' ? 'Enable Notion' : next.notion.state === 'not_connected' ? 'Connect Notion' : 'Check Notion';
    if (!edited) {
      const route = next.context.state === 'configured' ? classifyTarget(next.context.target) : null;
      $('provider').value = route && route.kind !== 'notion' ? 'other' : 'notion';
      selectedContext = route?.kind === 'notion' ? canonical(route.target) : '';
      $('target').value = route?.target || '';
    }
    if (next.notion.state === 'disabled') feedback('Enable Notion in Codex Plugins, then refresh.');
    if (next.notion.state === 'unavailable') feedback('Notion tools are unavailable. Continue in chat to check access.');
  }
  const state = result?._meta?.['aios/picker'];
  // Tool notifications and polling can arrive out of order, including after
  // a new setup request. Never let an older snapshot unlock that request.
  if (state && Number.isSafeInteger(state.revision) && state.revision >= 0 &&
      (!picker || state.panelId === picker.panelId && state.revision >= picker.revision)) {
    picker = state;
    if (state.request?.kind === 'pages' && state.request.state === 'complete' && appliedPages !== state.request.id) {
      const retained = new Set([selectedContext, ...roles.map((role) => $(role).value)]);
      for (const url of knownPages.keys()) if (!retained.has(url)) knownPages.delete(url);
      appliedPages = state.request.id;
    }
    for (const page of state.pages) addPage(page);
    if (state.context && state.mapRequestId !== appliedMap) {
      addPage(state.context);
      // A response may open a fresh view; a running view only applies its selected map.
      if ($('provider').value === 'notion' && (!edited || canonical(target()) === canonical(state.context.url))) {
        selectedContext = canonical(state.context.url);
        for (const role of roles) if (state.sources?.[role]) addPage(state.sources[role]);
        choices();
        for (const role of roles) $(role).value = state.sources?.[role]?.url ? canonical(state.sources[role].url) : '';
        $('space').replaceChildren(new Option('All relevant Spaces', ''), ...(state.sources?.spaces || []).map((name) => new Option(name, name)));
        appliedMap = state.mapRequestId;
      }
    }
    choices();
    if (state.setup && state.request?.kind === 'setup' && appliedSetup !== state.request.id) {
      appliedSetup = state.request.id;
      sent = state.setup.outcome === 'ready';
      if (sent) { focusOverview = !homeVisible; homeVisible = true; }
      if (sent) $('feedback').hidden = true; else feedback(state.setup.outcome === 'plan' ? 'Plan prepared in the chat.' : 'Continue setup in the chat.');
    }
    if (state.request) {
      $('picker-status').hidden = state.request.kind === 'setup' && state.request.state === 'complete';
      $('picker-status').dataset.error = String(state.request.state === 'error');
      $('picker-status').textContent = state.request.state === 'pending' ? state.request.kind === 'setup' ? 'Continue setup in the chat.' : 'Finding choices in the chat…' : state.request.state === 'error' ? state.request.error : state.request.kind === 'setup' ? 'Setup checked in the chat' : state.request.kind === 'pages' ? `${state.pages.length} pages found` : 'Linked sources loaded';
      if (state.request.state === 'error' && state.request.kind === 'setup') sent = false;
      if (state.request.state !== 'pending') clearTimeout(pollTimer);
    }
  }
  if (status) { choices(); $('loading').hidden = true; $('setup').hidden = false; }
  $('version').textContent = `v${__AIOS_VERSION__}`;
  form();
  if (focusOverview) $('home-title').focus();
}
async function poll() {
  clearTimeout(pollTimer);
  if (!picker || picker.request?.state !== 'pending') return;
  if (Date.now() > pollUntil) {
    $('picker-status').textContent = 'Still waiting. Continue in the chat, then check the result.';
    if (homeVisible) $('home-state').textContent = $('picker-status').textContent;
    return;
  }
  try { render(await app.callServerTool({ name: 'aios_picker_read', arguments: { panelId: picker.panelId } }, { timeout: 8000 })); }
  catch (error) { feedback(error.message, true); return; }
  if (picker.request?.state === 'pending') pollTimer = setTimeout(poll, 2000);
}
async function send(prompt) {
  if (!canMessage) { fallback(prompt); return false; }
  const params = { role: 'user', content: [{ type: 'text', text: prompt }] };
  const result = extensions.message ? await extensions.message.send(params, { timeout: 15000 }) : await app.sendMessage(params, { timeout: 15000 });
  if (result.isError) throw new Error('Codex did not accept the request.');
  return true;
}
async function request(kind, selections) {
  if (sending || !picker || picker.request?.kind === 'setup' && picker.request.state === 'pending') return;
  sending = true; form(); $('feedback').hidden = true; $('fallback').hidden = true;
  let prompt;
  try {
    const result = await app.callServerTool({ name: 'aios_picker_request', arguments: { panelId: picker.panelId, kind,
      ...(kind === 'setup' ? { setup: selections } : kind === 'pages' ? { query: $('query').value.trim() } : { context: target() }) } }, { timeout: 8000 });
    if (result.isError) throw new Error(result.content?.[0]?.text || 'Could not prepare the request.');
    const prepared = result._meta?.['aios/request'];
    if (!prepared?.picker || typeof prepared.prompt !== 'string') throw new Error('Invalid picker request.');
    render({ _meta: { 'aios/picker': prepared.picker } }); prompt = prepared.prompt;
    if (kind === 'setup') sent = true;
    await send(prompt);
    pollUntil = Date.now() + 120000; pollTimer = setTimeout(poll, 1000);
  } catch (error) { feedback(`${error.message} Check the chat before trying again.`, true); if (prompt) { if (kind === 'setup') sent = true; fallback(prompt); pollUntil = Date.now() + 120000; pollTimer = setTimeout(poll, 2000); } }
  finally { sending = false; form(); }
}
app.ontoolresult = (result) => { try { render(result); } catch (error) { feedback(error.message, true); } };
app.addEventListener('hostcontextchanged', theme);
$('setup').addEventListener('change', () => { edited = true; sent = false; $('validation').hidden = true; $('feedback').hidden = true; form(); });
$('context-choice').addEventListener('change', () => {
  const next = $('context-choice').value;
  selectedByUser = true; edited = true;
  if (next !== selectedContext) {
    selectedContext = next; appliedMap = undefined;
    for (const role of roles) $(role).value = '';
    $('space').replaceChildren(new Option('All relevant Spaces', ''));
    $('picker-status').hidden = true;
    if (next === 'manual') $('target').value = '';
  }
  form();
});
$('client').addEventListener('change', () => {
  if ($('client').checked && !selectedByUser) {
    selectedContext = ''; $('target').value = ''; appliedMap = undefined;
    for (const role of roles) $(role).value = '';
    $('space').replaceChildren(new Option('All relevant Spaces', ''));
    $('picker-status').hidden = true; choices(); form();
  }
});
$('provider').addEventListener('change', () => {
  selectedContext = ''; selectedByUser = false; appliedMap = undefined;
  $('target').value = '';
  for (const role of roles) $(role).value = '';
  $('space').replaceChildren(new Option('All relevant Spaces', ''));
  $('picker-status').hidden = true; choices(); form();
});
$('target').addEventListener('input', () => {
  edited = true; selectedByUser = true; sent = false; appliedMap = undefined;
  for (const role of roles) $(role).value = '';
  $('space').replaceChildren(new Option('All relevant Spaces', ''));
  $('picker-status').hidden = true; form();
});
$('find').addEventListener('click', () => request('pages'));
$('query').addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); if (!$('find').disabled) request('pages'); } });
$('read-sources').addEventListener('click', () => request('sources'));
$('check-result').addEventListener('click', async () => { pollUntil = Date.now() + 120000; await poll(); });
$('refresh').addEventListener('click', async () => {
  if (sending || refreshing) return;
  refreshing = true; form();
  try {
    const result = await app.callServerTool({ name: 'aios_status', arguments: {} }, { timeout: 20000 });
    if (!result._meta?.['aios/status']) throw new Error('Could not verify the connection. Try Refresh again.');
    render(result); $('feedback').hidden = true;
    pollUntil = Date.now() + 120000; await poll();
  }
  catch (error) {
    if (status) render({ _meta: { 'aios/status': { ...status, notion: { ...status.notion, state: 'unknown' },
      checkedAt: new Date(Math.max(statusCheckedAt + 1, Date.now())).toISOString() } } });
    feedback(error.message, true);
  }
  finally { refreshing = false; form(); }
});
async function openLink(url) {
  try {
    if (!app.getHostCapabilities()?.openLinks) throw new Error();
    const result = await app.openLink({ url }, { timeout: 10000 });
    if (result.isError) throw new Error();
  } catch { feedback('Could not open the link. Continue in the chat.', true); }
}
$('connect').addEventListener('click', async () => {
  if (status?.notion.state === 'not_connected') return openLink('https://chatgpt.com/apps/notion/asdk_app_69c18c28f1188191bf5b8445c4ab0a2e');
  if (sending) return;
  const prompt = 'Help me install, enable or connect the official Notion plugin for AIOS: [@Notion](plugin://notion@openai-curated-remote). Check its current state first. Use the native plugin installation/connection flow and Plugin Management if available. Keep Notion separate from AIOS; do not add another MCP server or OAuth client. Preserve the current account and permissions; guide me through any required sign-in. Then refresh the AIOS panel.';
  sending = true; form();
  try { if (await send(prompt)) feedback('Continue in the chat, then refresh here.'); }
  catch { feedback('Check the chat before sending again.', true); fallback(prompt); }
  finally { sending = false; form(); }
});
$('guide').addEventListener('click', () => openLink('https://resources.onlinesourdough.com/resource/notion-context-home'));
function selections() {
  return { provider: $('provider').value, target: target(),
    ...Object.fromEntries(roles.filter((role) => $(role).value).map((role) => [role, $(role).value])),
    ...($('space').value ? { space: $('space').value } : {}),
    create: $('provider').value === 'notion' && selectedContext === 'new', client: $('client').checked, planOnly: $('plan-only').checked };
}
function dashboard() {
  const ready = picker?.setup?.outcome === 'ready' ? picker.setup : null;
  const entry = ready?.entry || (picker?.context ? { title: picker.context.title, target: picker.context.url } :
    status?.context.state === 'configured' ? { title: 'Context', target: status.context.target } : null);
  const sources = classifyTarget(entry?.target || '')?.kind === 'notion' ? ready ? ready.sources : picker?.sources : null;
  $('home-provider').hidden = !entry || classifyTarget(entry.target)?.kind !== 'notion';
  $('home-links').replaceChildren();
  const links = [...(entry ? [{ label: 'Context', title: entry.title, url: entry.target }] : []),
    ...roles.filter((role) => sources?.[role]).map((role) => ({ label: {docs:'Docs',skills:'Personal skills',teamSkills:'Team skills',memory:'Memory'}[role], ...sources[role] }))];
  for (const link of links) {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'home-link';
    const label = document.createElement('span'); label.textContent = link.label;
    const value = document.createElement('span'); value.textContent = link.title === link.label ? 'Open ↗' : `${link.title} ↗`;
    button.append(label, value); button.addEventListener('click', () => {
      if (classifyTarget(link.url)?.kind === 'path') feedback(link.url); else openLink(link.url);
    }); $('home-links').append(button);
  }
  $('load-home').hidden = !entry || classifyTarget(entry.target)?.kind !== 'notion' || Boolean(sources);
  const request = picker?.request?.kind === 'sources' ? picker.request : null;
  $('home-state').textContent = request?.state === 'pending' ? 'Loading sources in the chat…' : request?.state === 'error' ? request.error : ready ? 'Context verified' : '';
  $('home-state').dataset.error = String(request?.state === 'error');
  $('home-state').hidden = !$('home-state').textContent;
}
$('edit-setup').addEventListener('click', () => { homeVisible = false; step = 0; sent = false; $('feedback').hidden = true; form(); $('step-title').focus(); });
$('load-home').addEventListener('click', () => request('sources'));
$('back').addEventListener('click', () => { if (!sending && step > 0) { step--; sent = false; form(); $('step-title').focus(); } });
$('setup').addEventListener('submit', async (event) => {
  event.preventDefault(); if (sending || sent) return;
  const notion = $('provider').value === 'notion';
  if (step === 0 && notion && status?.notion.state !== 'connected') { $('connect').click(); return; }
  if (step < (notion ? 3 : 1)) { step++; $('picker-status').hidden = true; form(); $('step-title').focus(); return; }
  const input = selections();
  try { setupPrompt(input.provider, input.target, input); }
  catch (error) { $('validation').textContent = error.message; $('validation').hidden = false; return; }
  await request('setup', input);
});
try {
  await app.connect(undefined, { timeout: 12000 }); theme(app.getHostContext());
  canMessage = Boolean(app.getHostCapabilities()?.message?.text); form();
  const context = app.getHostContext();
  if (context?.displayMode === 'inline' && context.availableDisplayModes?.includes('fullscreen')) {
    try { await app.requestDisplayMode({ mode: 'fullscreen' }); } catch { /* The host owns placement. */ }
  }
} catch {
  $('loading').hidden = true; feedback('Open this panel through AIOS in Codex.', true);
  fallback('Use AIOS Setup to start or resume my context setup.');
}
