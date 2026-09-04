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
assert.deepEqual(result.skills.map(s => s.name).sort(), ['osm', 'osm-check', 'osm-maintain-context', 'osm-onboard']);
for (const skill of result.skills) assert.equal(skill.disableModelInvocation, false);
console.log('PASS: native Pi discovers exactly four shared skills, implicit invocation enabled, no diagnostics');
