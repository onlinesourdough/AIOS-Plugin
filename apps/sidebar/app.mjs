import { App, applyDocumentTheme, applyHostStyleVariables } from '@modelcontextprotocol/ext-apps';
import { OpenAIExtensions } from '@openai/mcp-extensions/app';
import { classifyTarget, connectionCopy, setupPrompt } from './ui-model.mjs';

const app = new App({ name: 'aios-setup', version: __AIOS_VERSION__ }, { availableDisplayModes: ['fullscreen'] });
const extensions = new OpenAIExtensions(app);
const $ = (id) => document.getElementById(id);
let status;
let edited = false;
let sending = false;
let sent = false;
let canMessage = false;

function feedback(message, error = false) {
  $('feedback').textContent = message;
  $('feedback').dataset.error = String(error);
  $('feedback').hidden = false;
}
function theme(context) {
  if (context?.theme) applyDocumentTheme(context.theme);
  if (context?.styles?.variables) applyHostStyleVariables(context.styles.variables);
}
function showFallback(prompt) {
  $('fallback-prompt').value = prompt;
  $('fallback').hidden = false;
}
function updateForm() {
  const notion = $('provider').value === 'notion';
  const route = classifyTarget($('target').value);
  if (edited) $('home-detail').textContent = 'This selection is used for setup. Codex verifies it before making changes.';
  $('notion-step').hidden = !notion;
  $('home-number').textContent = notion ? '2' : '1';
  $('outcome').textContent = notion ? 'Setup checks access, reuses your Docs, Skills and Memory, and helps with one useful task.' : 'Setup checks your selected home, keeps its existing structure and helps with one useful task.';
  $('target-label').textContent = notion ? 'Notion page link' : 'Context link or folder path';
  $('target').placeholder = notion ? 'https://notion.so/…' : 'https://… or /path/to/context';
  $('open-home').hidden = !route || route.kind === 'path' || !app.getHostCapabilities()?.openLinks;
  $('start').textContent = sending ? 'Starting…' : sent ? 'Started in Codex' : status?.context?.state === 'configured' ? 'Continue setup' : 'Start setup';
  $('start').disabled = sending || sent;
}
function render(result) {
  const next = result?._meta?.['aios/status'];
  if (!next || !(next.notion?.state in connectionCopy) || !next.context) throw new Error('Invalid status');
  status = next;
  $('version').textContent = `v${__AIOS_VERSION__}`;
  const [label, detail] = connectionCopy[next.notion.state];
  $('connection-label').textContent = label;
  $('connection-label').dataset.state = next.notion.state;
  $('connection-detail').textContent = detail;
  $('connect').hidden = !['not_connected', 'unknown'].includes(next.notion.state);
  $('connect').disabled = !app.getHostCapabilities()?.openLinks;
  if (!edited) {
    const route = next.context.state === 'configured' ? classifyTarget(next.context.target) : null;
    $('target').value = route?.target || '';
    $('provider').value = route && route.kind !== 'notion' ? 'other' : 'notion';
  }
  $('home-detail').textContent = next.context.state === 'configured' ?
    'Your saved context home is below. Setup resumes from what is already there.' :
    ['unavailable', 'ambiguous'].includes(next.context.state) ?
      'The saved context route could not be read clearly. Choose a home here; Codex will check it with you.' :
      'Start with a page you already use. Setup will help organise what is needed.';
  $('loading').hidden = true;
  $('setup').hidden = false;
  updateForm();
}

app.ontoolresult = (result) => {
  try { render(result); } catch { feedback('Setup status could not be read. Please refresh or continue in the conversation.', true); }
};
app.addEventListener('hostcontextchanged', theme);
for (const event of ['input', 'change']) $('setup').addEventListener(event, () => {
  edited = true; sent = false;
  $('validation').hidden = true;
  $('fallback').hidden = true;
  updateForm();
});

$('refresh').addEventListener('click', async () => {
  $('refresh').disabled = true;
  $('refresh').textContent = 'Checking…';
  try {
    const result = await app.callServerTool({ name: 'aios_status', arguments: {} }, { timeout: 20000 });
    if (result.isError) throw new Error('Status unavailable');
    render(result);
    feedback('Status refreshed.');
  } catch { feedback('Could not refresh the connection. You can still continue setup with Codex.', true); }
  finally { $('refresh').disabled = false; $('refresh').textContent = 'Refresh status'; }
});

async function openLink(url) {
  try {
    if (!app.getHostCapabilities()?.openLinks) throw new Error('Unsupported');
    const result = await app.openLink({ url }, { timeout: 10000 });
    if (result.isError) throw new Error('Not opened');
    return true;
  } catch { feedback('Codex could not open the link. Please try again from the conversation.', true); return false; }
}
$('connect').addEventListener('click', async () => {
  // Fixed verified destination; never open an arbitrary URL from tool output.
  if (await openLink('https://chatgpt.com/apps/notion/asdk_app_69c18c28f1188191bf5b8445c4ab0a2e')) {
    feedback('Finish connecting Notion in the opened window, then refresh the status here.');
  }
});
$('guide').addEventListener('click', () => openLink('https://resources.onlinesourdough.com/resource/notion-context-home'));
$('open-home').addEventListener('click', () => {
  const route = classifyTarget($('target').value);
  if (route && route.kind !== 'path') openLink(route.target);
});

$('setup').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (sending || sent) return;
  let prompt;
  try { prompt = setupPrompt($('provider').value, $('target').value); }
  catch (error) { $('validation').textContent = error.message; $('validation').hidden = false; $('target').focus(); return; }
  if (!canMessage) { showFallback(prompt); return; }
  sending = true; updateForm();
  try {
    const params = { role: 'user', content: [{ type: 'text', text: prompt }] };
    const result = extensions.message ? await extensions.message.send(params, { timeout: 15000 }) : await app.sendMessage(params, { timeout: 15000 });
    if (result.isError) throw new Error('Message not accepted');
    sent = true;
    feedback('Setup started in this conversation. Continue with Codex.');
  } catch {
    feedback('Could not confirm that setup started. Check the conversation before sending again.', true);
    showFallback(prompt);
  } finally { sending = false; updateForm(); }
});

try {
  await app.connect(undefined, { timeout: 12000 });
  theme(app.getHostContext());
  canMessage = Boolean(app.getHostCapabilities()?.message?.text);
  $('refresh').disabled = !app.getHostCapabilities()?.serverTools;
  if (status) updateForm();
  const context = app.getHostContext();
  if (context?.displayMode === 'inline' && context.availableDisplayModes?.includes('fullscreen')) {
    try { await app.requestDisplayMode({ mode: 'fullscreen' }); } catch { /* Placement is the host's choice. */ }
  }
} catch {
  $('loading').hidden = true;
  feedback('This panel needs to be opened through the AIOS plugin in Codex.', true);
  showFallback('Use AIOS Setup to start or resume my context setup.');
}
