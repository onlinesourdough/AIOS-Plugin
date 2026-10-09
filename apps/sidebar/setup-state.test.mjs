import test from 'node:test';
import assert from 'node:assert/strict';
import { draftFrom, isDirty, isCurrent, setLink, linksPayload, linkFromInput, shortTarget } from './setup-state.mjs';

const status = { context: { state: 'configured', target: '/work/a', revision: 'a' },
  sources: { state: 'saved', revision: 'c', title: 'A', links: { memory: { title: 'Decisions', target: 'https://example.com/memory' } } } };

test('a draft tracks pending edits separately from the revisions it was read from', () => {
  const draft = draftFrom(status);
  assert.equal(isDirty(draft), false); assert.equal(isCurrent(draft, status), true);
  setLink(draft, 'teamMemory', { title: 'Team memory', target: 'https://example.com/team' });
  assert.equal(isDirty(draft), true); assert.equal(status.sources.links.teamMemory, undefined);
  assert.equal(isCurrent(draft, { ...status, sources: { ...status.sources, revision: 'e' } }), false);
  setLink(draft, 'teamMemory', null);
  assert.equal(isDirty(draft), false); assert.deepEqual(Object.keys(linksPayload(draft)), ['memory']);
});

test('typed links keep a saved name only for the same target and never infer one', () => {
  const saved = status.sources.links.memory;
  assert.deepEqual(linkFromInput('memory', saved.target, '', saved), saved);
  assert.deepEqual(linkFromInput('memory', 'https://example.com/other', '', saved), { title: 'Memory', target: 'https://example.com/other' });
  assert.deepEqual(linkFromInput('teamSkills', '/work/team', ' Studio ', undefined), { title: 'Studio', target: '/work/team' });
  for (const bad of ['javascript:alert(1)', 'http://example.com', 'relative/path']) assert.throws(() => linkFromInput('docs', bad, '', undefined));
  assert.equal(shortTarget('https://www.example.com/'), 'example.com');
});
