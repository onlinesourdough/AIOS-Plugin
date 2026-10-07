import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { PassThrough } from 'node:stream';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { NOTION_ID, notionState, readNotionConnection } from './codex-status.mjs';
import { parseContextRoute, readContextRoute } from './context-route.mjs';
import { classifyTarget, setupPrompt } from './ui-model.mjs';

test('connection availability never implies page access, enablement or missing evidence', () => {
  assert.equal(notionState({ callable: true, enabled: true }), 'connected');
  assert.equal(notionState({ callable: true, enabled: false }), 'disabled');
  assert.equal(notionState({ callable: false, enabled: true }), 'unavailable');
  assert.equal(notionState({ enabled: true }), 'unknown');
  assert.equal(notionState({ callable: true }), 'unknown');
});

function fixture(replies) {
  const requests = [];
  const child = new EventEmitter();
  child.stdin = new PassThrough(); child.stdout = new PassThrough(); child.exitCode = null;
  child.kill = () => { child.exitCode = 0; child.emit('exit', 0); };
  child.stdin.on('data', (chunk) => {
    const request = JSON.parse(String(chunk)); requests.push(request);
    if (request.id) queueMicrotask(() => {
      const response = request.method === 'initialize' ? { result: {} } : replies.shift();
      if (response) child.stdout.write(JSON.stringify({ id: request.id, ...response }) + '\n');
    });
  });
  return { requests, child, launch: () => child };
}

test('native status selects exact Notion identity and closes its process', async () => {
  const f = fixture([
    { result: { apps: [{ id: 'unrelated', callable: true, enabled: true }, { id: NOTION_ID, callable: true, enabled: true }] } },
  ]);
  const result = await readNotionConnection(f);
  assert.equal(result.state, 'connected');
  assert.deepEqual(f.requests.filter((r) => r.method === 'app/installed').map((r) => r.params), [{ forceRefresh: true }]);
  assert.equal(f.child.exitCode, 0);
  assert.equal(JSON.stringify(result).includes('unrelated'), false);
});

test('a complete empty inventory differs from failed or malformed discovery', async () => {
  assert.equal((await readNotionConnection(fixture([{ result: { apps: [] } }]))).state, 'not_connected');
  for (const replies of [
    [{ error: { code: -1, message: 'private failure detail' } }],
    [{ result: {} }],
    [{ result: { apps: [{ id: NOTION_ID }] } }],
    [{ result: { apps: [{ id: NOTION_ID }, { id: NOTION_ID }] } }],
  ]) {
    const result = await readNotionConnection(fixture(replies));
    assert.equal(result.state, 'unknown');
    assert.equal(JSON.stringify(result).includes('private'), false);
  }
});

test('timeouts and unavailable CLI return an explicit unknown state and stop', async () => {
  const f = fixture([]);
  assert.equal((await readNotionConnection({ ...f, timeoutMs: 20 })).state, 'unknown');
  assert.equal(f.child.exitCode, 0);
  assert.equal((await readNotionConnection({ launch: () => { throw new Error('no binary'); } })).state, 'unknown');
});

const block = (route) => `unrelated private instructions\n<!-- AIOS:BEGIN -->\nContext: ${route}.\nOnly load relevant context.\n<!-- AIOS:END -->\nmore private instructions`;
test('reads only the exact routing block and rejects ambiguous legacy instructions', () => {
  assert.deepEqual(parseContextRoute(block('https://app.notion.com/p/example')), {
    state: 'configured', target: 'https://app.notion.com/p/example', kind: 'notion',
  });
  assert.deepEqual(parseContextRoute('Context: https://example.com'), { state: 'missing' });
  assert.deepEqual(parseContextRoute(block('https://example.com') + block('https://other.com')), { state: 'ambiguous' });
  assert.deepEqual(parseContextRoute(block('https://a.com\nContext: https://b.com')), { state: 'ambiguous' });
  assert.deepEqual(parseContextRoute('<!-- AIOS:BEGIN -->\nold prose'), { state: 'ambiguous' });
});

test('route read does not fall back to another home; bounded files only', async (t) => {
  const folder = await mkdtemp(join(tmpdir(), 'aios-route-'));
  t.after(() => rm(folder, { recursive: true, force: true }));
  assert.deepEqual(await readContextRoute({ codexHome: folder }), { state: 'missing' });
  await writeFile(join(folder, 'AGENTS.md'), block('https://example.com'));
  assert.equal((await readContextRoute({ codexHome: folder })).target, 'https://example.com/');
  await writeFile(join(folder, 'AGENTS.md'), 'x'.repeat(65537));
  assert.deepEqual(await readContextRoute({ codexHome: folder }), { state: 'unavailable' });
});

test('links and prompts reject credentials, unsafe schemes, control characters and lookalike Notion hosts', () => {
  for (const input of ['javascript:alert(1)', 'http://example.com', 'https://user:secret@example.com', '/tmp/a\nb', 'x'.repeat(2049)]) assert.equal(classifyTarget(input), null);
  assert.equal(classifyTarget('https://notion.so.attacker.test').kind, 'url');
  assert.throws(() => setupPrompt('notion', 'https://notion.so.attacker.test'));
  assert.throws(() => setupPrompt('other', 'relative/path'));
  assert.match(setupPrompt('other', '/work/my vault'), /Do not change my personal default/);
  assert.match(setupPrompt('notion', ''), /Help me choose/);
  assert.match(setupPrompt('notion', 'https://app.notion.com/p/example'), /Reuse the existing setup/);
});
