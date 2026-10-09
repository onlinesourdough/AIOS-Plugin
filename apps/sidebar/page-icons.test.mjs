import test from 'node:test';
import assert from 'node:assert/strict';
import { pageIcon, notionPageId, fetchedPageIcon } from './page-icons.mjs';

const target = 'https://app.notion.com/p/00000000000000000000000000000001';
const native = 'https://www.notion.so/icons/copy_lightgray.svg';
test('Notion emoji and native icons survive provider formats; unrelated image hosts do not load', () => {
  for (const value of ['👾', '👨‍👩‍👧‍👦', '🇩🇰', '1️⃣']) assert.equal(pageIcon(value), value);
  assert.equal(pageIcon({ type: 'emoji', emoji: '🧠' }), '🧠');
  for (const value of ['/icons/copy_lightgray.svg', native, { type: 'external', external: { url: native } },
    { type: 'icon', icon: { name: 'copy', color: 'lightgray' } }]) assert.equal(pageIcon(value), native);
  for (const value of [null, '123', '<svg onload="bad">', 'javascript:alert(1)', 'https://www.notion.so.attacker.test/icons/copy.svg',
    'https://user:password@www.notion.so/icons/copy.svg', 'https://www.notion.so/icons/copy.svg?tracking=1', 'https://tracker.test/icon.png']) assert.equal(pageIcon(value), null);
  assert.equal(notionPageId('https://example.com/page'), undefined);
});

test('selected database icons use the actual header; bodies, unrelated ids and invented icons are excluded', () => {
  const data = { id: target, text: '<database icon="/icons/copy_lightgray.svg">private company knowledge</database>' };
  assert.deepEqual(fetchedPageIcon(data, target), { target, icon: native });
  assert.deepEqual(fetchedPageIcon({ id: target, icon: { type: 'emoji', emoji: '👾' }, text: 'private' }, target), { target, icon: '👾' });
  assert.deepEqual(fetchedPageIcon({ id: target, icon: null, text: data.text }, target), { target, icon: null });
  assert.deepEqual(fetchedPageIcon({ id: target, text: '<page>body: <database icon="🧠">' }, target), { target, icon: null });
  assert.throws(() => fetchedPageIcon({ id: target.replace(/1$/, '2'), text: data.text }, target), /different page/);
});

test('incomplete icon objects and multiple emoji never generate broken assets or overflow', () => {
  for (const value of [{ type: 'icon' }, { type: 'icon', icon: {} }, { type: 'icon', icon: { name: 'copy' } }, '👾👾']) assert.equal(pageIcon(value), null);
  assert.deepEqual(fetchedPageIcon({ id: '00000000-0000-0000-0000-000000000001', icon: '👾' }, target), { target, icon: '👾' });
  assert.throws(() => fetchedPageIcon({ id: '00000000000000000000000000000002', url: target, icon: '🧠' }, target), /different page/);
});
