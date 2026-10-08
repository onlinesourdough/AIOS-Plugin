import { App, applyDocumentTheme, applyHostStyleVariables } from '@modelcontextprotocol/ext-apps';
import { classifyTarget, connectionCopy } from './ui-model.mjs';

const app = new App({ name: 'aios', version: __AIOS_VERSION__ }, { availableDisplayModes: ['fullscreen'] });
const $ = id => document.getElementById(id);
const roles = ['docs', 'personalSkills', 'teamSkills', 'memory'];
const labels = { docs: 'Docs', personalSkills: 'Personal skills', teamSkills: 'Team skills', memory: 'Memory' };
const notes = { docs: 'Company knowledge and documents', personalSkills: 'Personal skills', teamSkills: 'Team skills', memory: 'Decisions and lasting corrections' };
const connectUrl = 'https://chatgpt.com/apps/notion/asdk_app_69c18c28f1188191bf5b8445c4ab0a2e';
let status, editing = false, step = 0, other = false, saving = false, refreshing = false, checkedAt = -Infinity;
let targetSaved = false, draftTitle = '', teamVisible = false, draftContext, draftSourcesRevision;
function feedback(text, error = false) { $('feedback').textContent = text; $('feedback').dataset.error = String(error); $('feedback').hidden = !text; }
function theme(context) {
  if (context?.theme) applyDocumentTheme(context.theme);
  if (context?.styles?.variables) applyHostStyleVariables(context.styles.variables);
}
function fillDraft() {
  draftContext = { ...status.context }; draftSourcesRevision = status.sources.revision;
  $('target').value = status.context.target || '';
  other = Boolean(status.context.kind && status.context.kind !== 'notion');
  draftTitle = status.sources.title || '';
  for (const role of roles) $(role).value = status.sources.links[role]?.target || '';
  teamVisible = Boolean($('teamSkills').value); targetSaved = status.context.state === 'configured';
}
function begin(index = 0) { fillDraft(); editing = true; step = index; feedback(''); render(); focusStep(); }
function focusStep() { $(['target', 'personalSkills', 'memory'][step]).focus(); }
function render() {
  $('retry-load').hidden = Boolean(status) || refreshing;
  if (!status) { $('loading').hidden = !refreshing; return; }
  const configured = status.context.state === 'configured';
  const form = editing || !configured;
  const notion = form ? !other : status.context.kind === 'notion';
  const locked = saving || refreshing;
  $('loading').hidden = true; $('content').hidden = false;
  $('heading').textContent = form ? 'Get started' : 'Your AIOS';
  $('intro').hidden = !form; $('settings').hidden = form;
  $('settings').disabled = locked; $('version').textContent = `v${__AIOS_VERSION__}`;
  $('home').hidden = form; $('setup').hidden = !form;
  $('notion').hidden = !notion; $('notion').dataset.mode = form ? 'setup' : 'home';
  $('notion-title').textContent = form ? 'Connect Notion' : 'Notion';
  $('connection-number').hidden = !form;
  $('connection-label').textContent = refreshing ? 'Checking…' : connectionCopy[status.notion.state];
  $('connection-label').dataset.state = refreshing ? 'unknown' : status.notion.state;
  $('refresh').disabled = locked;
  const install = ['not_installed', 'plugin_disabled'].includes(status.notion.state);
  $('connection-help').hidden = !install;
  $('connection-help').textContent = status.notion.state === 'not_installed' ? 'Install Notion in Codex → Plugins, then refresh.' : 'Enable Notion in Codex → Plugins, then refresh.';
  $('connect').hidden = !['not_connected', 'disabled', 'unavailable'].includes(status.notion.state);
  $('connect').disabled = locked;
  $('context-number').textContent = notion ? '2' : '1';
  $('skills-number').textContent = notion ? '3' : '2';
  $('memory-number').textContent = notion ? '4' : '3';
  $('target-label').textContent = notion ? 'Context link' : 'Context link or folder';
  $('target').placeholder = notion ? 'https://notion.so/…' : 'https://… or /path/to/context';
  $('provider').textContent = other ? 'Use Notion' : 'Use another provider';
  $('context-fields').hidden = step !== 0; $('context-done').hidden = step === 0;
  $('skills-section').hidden = step < 1; $('skills-fields').hidden = step !== 1; $('skills-done').hidden = step !== 2;
  $('memory-section').hidden = step !== 2;
  $('team-field').hidden = !teamVisible; $('add-team').hidden = teamVisible;
  for (const id of ['target', ...roles, 'provider', 'add-team', 'back', 'cancel']) $(id).disabled = locked;
  $('back').hidden = step === 0; $('cancel').hidden = !configured;
  $('continue').disabled = locked || !status.context.revision || ['ambiguous', 'unavailable'].includes(status.context.state) || status.sources.state === 'unavailable';
  $('continue').textContent = saving ? 'Saving…' : step === 2 ? 'Open AIOS' : 'Continue';
  $('context-name').textContent = status.sources.title || 'Your context';
  $('context-note').textContent = status.context.kind === 'path' ? status.context.target : 'Start here';
  for (const role of roles) {
    const link = status.sources.links[role];
    $(`${role}-name`).textContent = link?.title || labels[role];
    $(`${role}-note`).textContent = link ? (classifyTarget(link.target)?.kind === 'path' ? link.target : link.title === labels[role] && role === 'personalSkills' ? 'Your reusable ways of working' : link.title === labels[role] && role === 'teamSkills' ? 'Shared ways of working' : notes[role]) : 'Add a link';
    $(`${role}-action`).textContent = link ? '↗' : '+';
    $(`open-${role}`).disabled = locked || status.sources.state === 'unavailable';
  }
  $('open-teamSkills').hidden = !status.sources.links.teamSkills;
}
function apply(result) {
  if (result?.isError) throw new Error(result.content?.find(c => c.type === 'text')?.text || 'Could not complete the request.');
  const value = result?._meta?.['aios/status'];
  const timestamp = Date.parse(value?.checkedAt);
  if (!Object.hasOwn(connectionCopy, value?.notion?.state) || !['configured','missing','ambiguous','unavailable'].includes(value?.context?.state)
      || value.context.state === 'configured' && !classifyTarget(value.context.target) || !Number.isFinite(timestamp)
      || !['saved','missing','unavailable'].includes(value?.sources?.state) || !value.sources.links
      || roles.some(role => value.sources.links[role] && !classifyTarget(value.sources.links[role].target))) throw new Error('Could not read setup. Refresh to try again.');
  if (timestamp < checkedAt) return false;
  const first = !draftContext;
  checkedAt = timestamp; status = value;
  if (first) fillDraft();
  render();
  if (['ambiguous','unavailable'].includes(status.context.state)) feedback('Existing context instructions need attention. They have been left unchanged.', true);
  else if (status.sources.state === 'unavailable') feedback('Saved source links need attention. They have been left unchanged.', true);
  return true;
}
async function open(target) {
  const route = classifyTarget(target);
  if (!route) return;
  if (route.kind === 'path') { feedback(route.target); return; }
  try { const result = await app.openLink({ url: route.target }); if (result?.isError) throw new Error(); }
  catch { feedback('Could not open the link. ' + route.target, true); }
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
function linksFromDraft() {
  const links = {};
  for (const role of roles) {
    const value = $(role).value.trim(); if (!value) continue;
    const route = classifyTarget(value);
    if (!route || /[<>]/.test(route.target)) { $(role).focus(); throw new Error(`Enter a valid ${labels[role]} link or leave it empty.`); }
    const existing = status.sources.links[role];
    links[role] = { target: route.target, title: existing?.target === route.target ? existing.title : labels[role] };
  }
  return links;
}
async function saveLinks() {
  const result = await app.callServerTool({ name: 'aios_save_sources', arguments: {
    target: draftContext.target, expectedContextRevision: draftContext.revision,
    expectedRevision: draftSourcesRevision, title: draftTitle, links: linksFromDraft(),
  } });
  if (!apply(result)) throw new Error('Your setup changed. Reopen Settings before saving again.');
  draftSourcesRevision = status.sources.revision;
}
app.ontoolresult = result => { try { apply(result); } catch (error) {
  checkedAt = Math.max(checkedAt + 1, Date.now());
  status = { ...(status || { context: { state: 'unavailable' }, sources: { state: 'unavailable', links: {} } }), notion: { state: 'unknown' } };
  render(); feedback(error.message, true);
} };
app.onhostcontextchanged = theme;
$('refresh').addEventListener('click', refresh);
$('retry-load').addEventListener('click', refresh);
$('connect').addEventListener('click', () => open(connectUrl));
$('open-context').addEventListener('click', () => open(status.context.target));
$('settings').addEventListener('click', () => begin());
for (const role of roles) $(`open-${role}`).addEventListener('click', () => {
  const link = status.sources.links[role]; if (link) return open(link.target);
  begin(role === 'docs' ? 0 : role === 'memory' ? 2 : 1);
});
$('provider').addEventListener('click', () => { other = !other; render(); });
$('add-team').addEventListener('click', () => { teamVisible = true; render(); $('teamSkills').focus(); });
$('cancel').addEventListener('click', () => { editing = false; feedback(''); render(); $('heading').focus(); });
$('back').addEventListener('click', () => { step = Math.max(0, step - 1); feedback(''); render(); focusStep(); });
$('setup').addEventListener('submit', async event => {
  event.preventDefault();
  if (saving || refreshing || !status?.context?.revision || status.sources.state === 'unavailable' || ['ambiguous','unavailable'].includes(status.context.state)) return;
  const route = classifyTarget($('target').value);
  if (!route || /[<>]/.test(route.target) || (!other && route.kind !== 'notion')) { feedback(other ? 'Enter an HTTPS link or an absolute folder path.' : 'Enter a Notion link, or choose another provider.', true); $('target').focus(); return; }
  if (!draftContext || draftContext.revision !== status.context.revision || draftSourcesRevision !== status.sources.revision) {
    if (status.context.state !== 'configured') {
      const target = $('target').value, provider = other;
      fillDraft(); $('target').value = target; other = provider; step = 0;
      render(); focusStep(); feedback('Setup changed. Review your context link and continue again.', true);
    } else feedback('Your setup changed. Go back to AIOS and reopen Settings to load the latest links.', true);
    return;
  }
  try { linksFromDraft(); } catch (error) { feedback(error.message, true); return; }
  let focusAfterSave;
  saving = true; editing = true; feedback(''); render();
  try {
    if (step === 0 && (!targetSaved || route.target !== status.context.target)) {
      const changed = status.context.state === 'configured';
      const result = await app.callServerTool({ name: 'aios_save_context', arguments: { target: route.target, expectedRevision: status.context.revision } });
      if (!apply(result)) throw new Error('Your context changed. Refresh before trying again.');
      targetSaved = true; draftContext = { ...status.context }; draftSourcesRevision = status.sources.revision;
      // Load recovered maps as well as switched contexts before any replacement.
      if (changed || status.sources.state === 'saved') { fillDraft(); focusAfterSave = 'step'; feedback('Context saved. Choose the sources for this context.'); return; }
    }
    await saveLinks();
    if (step < 2) { editing = true; step++; focusAfterSave = 'step'; }
    else { editing = false; focusAfterSave = 'home'; }
  } catch (error) { feedback(error.message || 'Could not save setup. Try again.', true); }
  finally { saving = false; render(); if (focusAfterSave === 'step') focusStep(); else if (focusAfterSave === 'home') $('heading').focus(); }
});
try {
  await app.connect(undefined, { timeout: 12000 }); theme(app.getHostContext());
  if (!status) await refresh();
  const context = app.getHostContext();
  if (context?.displayMode === 'inline' && context.availableDisplayModes?.includes('fullscreen')) {
    try { await app.requestDisplayMode({ mode: 'fullscreen' }); } catch { /* Host owns placement. */ }
  }
} catch { $('loading').hidden = true; feedback('Open AIOS from the Codex sidebar.', true); }
