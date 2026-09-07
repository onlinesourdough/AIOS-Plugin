// Author-only check against an explicitly selected installed Pi loader.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL, fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
if (!process.argv[2]) throw new Error('Pass the installed Pi dist/core/skills.js path');
const {loadSkillsFromDir} = await import(pathToFileURL(path.resolve(process.argv[2])));
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const result = loadSkillsFromDir({dir: path.resolve(root, pkg.pi.skills[0]), source: 'package'});
assert.deepEqual(result.diagnostics, []);
assert.deepEqual(result.skills.map(s => s.name).sort(), ['aios', 'aios-build-work', 'aios-check', 'aios-create-project', 'aios-create-system', 'aios-maintain-context', 'aios-manage-skills', 'aios-onboard', 'aios-orchestrate-workers', 'aios-review-work', 'aios-ship-work', 'aios-spec-work', 'aios-triage-improvement', 'aios-update']);
for (const skill of result.skills) assert.equal(skill.disableModelInvocation, false);
console.log('PASS: native Pi discovers the 14 selected shared skills from the canonical root, implicit invocation enabled, no diagnostics');
