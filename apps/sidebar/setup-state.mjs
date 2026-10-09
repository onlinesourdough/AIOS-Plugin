import { classifyTarget, connectionCopy } from './ui-model.mjs';

// Pure draft rules shared by onboarding and Settings. A draft is bound to the
// context and revisions it was read from; it never follows a newer snapshot.
export const sourceRoles = ['docs', 'personalSkills', 'teamSkills', 'memory', 'teamMemory'];
export const roleLabels = { docs: 'Docs', personalSkills: 'Personal skills', teamSkills: 'Team skills', memory: 'Memory', teamMemory: 'Team memory' };

export function readStatus(value) {
  const timestamp = Date.parse(value?.checkedAt);
  if (!Object.hasOwn(connectionCopy, value?.notion?.state) || !['configured', 'missing', 'ambiguous', 'unavailable'].includes(value?.context?.state)
      || value.context.state === 'configured' && !classifyTarget(value.context.target) || !Number.isFinite(timestamp)
      || !['saved', 'missing', 'unavailable'].includes(value?.sources?.state) || !value.sources.links
      || sourceRoles.some(role => value.sources.links[role] && !classifyTarget(value.sources.links[role].target))) return null;
  return timestamp;
}

export function draftFrom(status) {
  const links = {};
  for (const role of sourceRoles) if (status.sources?.links?.[role]) links[role] = { ...status.sources.links[role] };
  return {
    contextTarget: status.context.state === 'configured' ? status.context.target : '',
    contextRevision: status.context.revision, sourcesRevision: status.sources?.revision,
    title: status.sources?.title || '', saved: links, links: { ...links },
  };
}

const same = (a, b) => a?.target === b?.target && a?.title === b?.title;
export const roleDirty = (draft, role) => !same(draft.links[role], draft.saved[role]);
export const isDirty = (draft, roles = sourceRoles) => roles.some(role => roleDirty(draft, role));
export const isCurrent = (draft, status) => draft.contextRevision === status.context.revision && draft.sourcesRevision === status.sources.revision;

export function setLink(draft, role, link) {
  if (link) draft.links[role] = { title: link.title, target: link.target };
  else delete draft.links[role];
}

// Unset roles are omitted, so a map without team memory stays readable by older builds.
export function linksPayload(draft) {
  const links = {};
  for (const role of sourceRoles) if (draft.links[role]) links[role] = { ...draft.links[role] };
  return links;
}

// A typed link keeps its saved name when the target is unchanged; otherwise the
// optional Name or the role label is used. Titles are never read from sources.
export function linkFromInput(role, target, name, saved) {
  const route = classifyTarget(target);
  if (!route || /[<>]/.test(route.target)) throw new Error('Enter an HTTPS link or an absolute folder path.');
  const title = String(name || '').trim();
  if (title.length > 100 || /[\x00-\x1f\x7f]/.test(title)) throw new Error('Use a shorter name without special characters.');
  return { target: route.target, title: title || (saved?.target === route.target ? saved.title : roleLabels[role]) };
}

export function shortTarget(target) {
  const route = classifyTarget(target);
  if (!route) return '';
  if (route.kind === 'path') return route.target;
  const url = new URL(route.target);
  const path = url.pathname.length > 24 ? url.pathname.slice(0, 23) + '…' : url.pathname;
  return url.hostname.replace(/^www\./, '') + (path === '/' ? '' : path);
}
