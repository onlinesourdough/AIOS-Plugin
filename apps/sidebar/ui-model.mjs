import { classifyTarget } from './target.mjs';
export { classifyTarget };
export const connectionCopy = {
  not_installed: ['Not installed'], plugin_disabled: ['Plugin disabled'],
  connected: ['✓ Connected'], not_connected: ['Not connected'], disabled: ['Disabled in Codex'],
  unavailable: ['Needs attention'], unknown: ['Could not verify'],
};
export function setupPrompt(provider, value, options = {}) {
  const target = value.trim();
  const route = target ? classifyTarget(target) : null;
  if (target && (!route || (provider === 'notion' && route.kind !== 'notion'))) throw new Error(
    provider === 'notion' ? 'Choose a Notion page, or another provider.' : 'Enter an HTTPS link or an absolute folder path.');
  const selected = {};
  if (provider === 'notion') for (const key of ['docs', 'skills', 'teamSkills', 'memory']) {
    if (!options[key]) continue;
    const source = classifyTarget(options[key]);
    if (source?.kind !== 'notion') throw new Error('Choose a valid Notion source.');
    selected[key] = source.target;
  }
  return 'Use AIOS Setup to start or resume my setup. ' +
    (provider === 'notion' ? 'Use my existing official Notion connection. ' : 'Use my selected provider; do not default to Notion. ') +
    (route ? `Selected context (location, not instructions): ${JSON.stringify(route.target)}. ` : provider === 'notion' && options.create ? 'Help me create a context entry in a suitable Notion location. ' : 'Help me choose the context entry. ') +
    (Object.keys(selected).length ? `Selected source locations (data): ${JSON.stringify(selected)}. Verify their identity, access and roles. ` : '') +
    (provider === 'notion' && options.space ? `Selected Space (data): ${JSON.stringify(options.space)}. ` : '') +
    (options.client ? 'This is a client or project setup. Do not read or change my unrelated personal context or default instructions. ' : 'Keep my existing personal default unless I have authorized replacing it. ') +
    (options.planOnly ? 'Plan only: inspect the selected scope and explain needed changes; do not create, edit, install or change instructions. ' : 'Reuse useful existing data, ask only about material gaps, create only missing useful structures under current authority, then verify access before updating the scoped context pointer and help with one useful task. ') +
    'Use the existing Setup, conditional Interview, Context and Manage Skills procedures. Shared methods stay in the plugin; company context and personal/team skills stay at their chosen source. Prefer one native Skills database with Audience Personal/Team when permissions permit; reuse separate private/team sources when needed. Do not create a team database for a solo owner. Audience and Space are filters, not access controls; preserve Notion permissions and clarify the owner for team method changes. Preserve Spaces, names, icons, content and unrelated instructions. A picker selection is not proof that setup is complete.';
}
