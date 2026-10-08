import { App, applyDocumentTheme, applyHostStyleVariables } from '@modelcontextprotocol/ext-apps';
import { classifyTarget, connectionCopy } from './ui-model.mjs';

const app = new App({ name: 'aios', version: __AIOS_VERSION__ }, { availableDisplayModes: ['fullscreen'] });
const $ = (id) => document.getElementById(id);
const connectUrl = 'https://chatgpt.com/apps/notion/asdk_app_69c18c28f1188191bf5b8445c4ab0a2e';
let status, editing = false, saving = false, refreshing = false, checkedAt = -Infinity;
function feedback(text, error = false) {
  $('feedback').textContent = text; $('feedback').dataset.error = String(error); $('feedback').hidden = !text;
}
function theme(context) {
  if (context?.theme) applyDocumentTheme(context.theme);
  if (context?.styles?.variables) applyHostStyleVariables(context.styles.variables);
}
function render() {
  if (!status) return;
  const configured = status.context.state === 'configured';
  const form = editing || !configured;
  const route = form ? classifyTarget($('target').value) : status.context;
  const notion = form ? $('provider').value !== 'other' : route?.kind === 'notion';
  const state = status.notion.state;
  $('loading').hidden = true; $('content').hidden = false;
  $('heading').textContent = form ? (configured ? 'Your context' : 'Get started') : 'Your AIOS';
  $('intro').hidden = !form;
  $('intro').textContent = notion ? 'Connect Notion and choose your context.' : 'Choose where your context lives.';
  $('provider').disabled = saving;
  $('context-number').textContent = notion ? '2' : '1';
  $('target-label').textContent = notion ? 'Context link' : 'Context link or folder';
  $('target').placeholder = notion ? 'https://notion.so/…' : 'https://… or /path/to/context';
  $('version').textContent = `v${__AIOS_VERSION__}`;
  $('setup').hidden = !form; $('home').hidden = form;
  $('notion').hidden = !notion;
  $('connection-label').textContent = refreshing ? 'Checking…' : connectionCopy[state] || connectionCopy.unknown;
  $('connection-label').dataset.state = refreshing ? 'unknown' : state;
  $('refresh').textContent = refreshing ? 'Checking…' : 'Refresh status';
  $('refresh').disabled = refreshing || saving;
  const install = state === 'not_installed' || state === 'plugin_disabled';
  $('connection-help').hidden = !notion || !install;
  $('connection-help').textContent = state === 'not_installed' ? 'Install Notion in Codex → Plugins, then refresh.' : 'Enable Notion in Codex → Plugins, then refresh.';
  $('connect').hidden = !notion || !['not_connected', 'disabled', 'unavailable'].includes(state);
  $('connect').disabled = saving;
  $('cancel').hidden = !configured; $('cancel').disabled = saving;
  $('continue').disabled = saving || !status.context.revision || ['ambiguous', 'unavailable'].includes(status.context.state);
  $('continue').textContent = saving ? 'Saving…' : configured ? 'Save' : 'Continue';
  $('target').disabled = saving;
  if (configured) {
    const path = status.context.kind === 'path';
    $('open-context').hidden = path; $('context-path').hidden = !path;
    $('context-path').textContent = path ? status.context.target : '';
    $('open-context').title = status.context.target;
  }
}
function apply(result) {
  if (result?.isError) throw new Error(result.content?.find((c) => c.type === 'text')?.text || 'Could not complete the request.');
  const value = result?._meta?.['aios/status'];
  const timestamp = Date.parse(value?.checkedAt);
  if (!Object.hasOwn(connectionCopy, value?.notion?.state) || !['configured', 'missing', 'ambiguous', 'unavailable'].includes(value?.context?.state) || (value.context.state === 'configured' && !classifyTarget(value.context.target)) || !Number.isFinite(timestamp)) throw new Error('Could not read setup. Refresh to try again.');
  if (timestamp < checkedAt) return false;
  checkedAt = timestamp; status = value;
  render();
  if (['ambiguous', 'unavailable'].includes(status.context.state)) feedback('Existing context instructions need attention. They have been left unchanged.', true);
  return true;
}
async function open(url) {
  try { const result = await app.openLink({ url }); if (result?.isError) throw new Error(); }
  catch { feedback('Could not open the link. ' + url, true); }
}
async function refresh() {
  if (refreshing || saving) return;
  refreshing = true; feedback(''); render();
  try { apply(await app.callServerTool({ name: 'aios_status', arguments: {} })); }
  catch {
    checkedAt = Math.max(checkedAt + 1, Date.now());
    if (status) status = { ...status, notion: { state: 'unknown' } };
    feedback('Could not check the connection. Try refreshing again.', true);
  } finally { refreshing = false; render(); }
}
app.ontoolresult = (result) => { try { apply(result); } catch (error) {
  checkedAt = Math.max(checkedAt + 1, Date.now());
  status = { ...(status || { context: { state: 'unavailable' } }), notion: { state: 'unknown' } };
  render(); feedback(error.message, true);
} };
app.onhostcontextchanged = theme;
$('refresh').addEventListener('click', refresh);
$('connect').addEventListener('click', () => open(connectUrl));
$('open-context').addEventListener('click', () => {
  const route = classifyTarget(status?.context?.target);
  if (route && route.kind !== 'path') return open(route.target);
});
$('change').addEventListener('click', () => {
  editing = true; $('target').value = status.context.target; $('provider').value = status.context.kind === 'notion' ? 'notion' : 'other'; feedback(''); render(); $('target').focus();
});
$('cancel').addEventListener('click', () => { editing = false; feedback(''); render(); $('heading').focus(); });
$('target').addEventListener('input', render);
$('provider').addEventListener('change', render);
$('setup').addEventListener('submit', async (event) => {
  event.preventDefault(); if (saving || !status?.context?.revision) return;
  const route = classifyTarget($('target').value);
  if (!route || /[<>]/.test(route.target) || ($('provider').value !== 'other' && route.kind !== 'notion')) { feedback($('provider').value !== 'other' ? 'Enter a Notion link, or choose another provider.' : 'Enter an HTTPS context link or an absolute folder path.', true); $('target').focus(); return; }
  saving = true; feedback(''); render();
  try {
    const result = await app.callServerTool({ name: 'aios_save_context', arguments: { target: route.target, expectedRevision: status.context.revision } });
    if (!apply(result)) throw new Error('The context changed. Refresh before trying again.');
    editing = false; render(); $('heading').focus();
  } catch (error) { feedback(error.message || 'Could not save context. Refresh before trying again.', true); }
  finally { saving = false; render(); }
});
try {
  await app.connect(undefined, { timeout: 12000 }); theme(app.getHostContext());
  if (!status) await refresh();
  const context = app.getHostContext();
  if (context?.displayMode === 'inline' && context.availableDisplayModes?.includes('fullscreen')) {
    try { await app.requestDisplayMode({ mode: 'fullscreen' }); } catch { /* Host owns placement. */ }
  }
} catch { $('loading').hidden = true; feedback('Open AIOS from the Codex sidebar.', true); }
