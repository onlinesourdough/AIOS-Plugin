import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,realpath,mkdir,writeFile,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {globalSkillInventory} from './skill-inventory.mjs';
import {overviewStatus} from './overview-status.mjs';

async function fixture(t){
 const root=await realpath(await mkdtemp(join(tmpdir(),'aios-global-skills-')));
 t.after(()=>rm(root,{recursive:true,force:true}));
 return root;
}
test('global discovery lists regular entry files and resolves AIOS links without reading bodies',async t=>{
 const root=await fixture(t),global=join(root,'.agents/skills'),owner=join(root,'.AIOS/skills/owner-method');
 await mkdir(owner,{recursive:true});await writeFile(join(owner,'SKILL.md'),'Private instructions never leave this file');
 await mkdir(join(global,'external'),{recursive:true});await writeFile(join(global,'external/SKILL.md'),'External private body');
 await symlink(owner,join(global,'owner-method'));
 await symlink(join(owner,'SKILL.md'),join(global,'external/file-link.md'));
 await mkdir(join(global,'not-a-skill'));await writeFile(join(global,'not-a-skill/README.md'),'Do not recurse');
 const targets={},inventory=await globalSkillInventory(root,targets,{'skills/owner-method/SKILL.md':join(owner,'SKILL.md')});
 assert.deepEqual(inventory.files,['global/external/SKILL.md','global/owner-method/SKILL.md']);
 assert.deepEqual(inventory.aiosLinks,{'global/owner-method/SKILL.md':'skills/owner-method/SKILL.md'});
 assert.equal(targets['global/owner-method/SKILL.md'],join(owner,'SKILL.md'));
 assert.ok(!JSON.stringify(inventory).includes(root));assert.ok(!JSON.stringify(inventory).includes('Private instructions'));
 await rm(join(global,'owner-method'));
 assert.deepEqual((await globalSkillInventory(root)).aiosLinks,{});
 await symlink(join(root,'missing-owner-method'),join(global,'old-method'));
 const stale=await globalSkillInventory(root);
 assert.deepEqual(stale.unavailableLinks,['old-method']);assert.equal(stale.incomplete,true);
 assert.ok(!stale.files.includes('global/old-method/SKILL.md'));
});
test('global discovery remains bounded and excludes hidden, oversized and symlink entry files',async t=>{
 const root=await fixture(t),global=join(root,'.agents/skills');
 for(const name of ['.hidden','large','file-link',...Array.from({length:90},(_,i)=>'method-'+i)]){
  await mkdir(join(global,name),{recursive:true});
  await writeFile(join(global,name,'SKILL.md'),name==='large'?'x'.repeat(65537):'Private body');
 }
 await rm(join(global,'file-link/SKILL.md'));
 await symlink(join(global,'.hidden/SKILL.md'),join(global,'file-link/SKILL.md'));
 const inventory=await globalSkillInventory(root);
 assert.equal(inventory.files.length,80);assert.equal(inventory.truncated,true);assert.equal(inventory.incomplete,true);
 assert.ok(inventory.files.every(path=>!path.includes('.hidden')&&!path.includes('large')&&!path.includes('file-link')));
});
test('missing AIOS still permits global inventory; paths are opt-in and a missing source differs from unreadable',async t=>{
 const root=await fixture(t),agentHome=join(root,'agent');await mkdir(agentHome);
 assert.equal((await globalSkillInventory(root)).missing,true);
 await mkdir(join(root,'.agents/skills/local'),{recursive:true});await writeFile(join(root,'.agents/skills/local/SKILL.md'),'# Local');
 const status=await overviewStatus({userHome:root,agentHome});
 assert.equal(status.owner,'missing');assert.equal(status.fileTargets,undefined);
 assert.deepEqual(status.inventory.globalSkills.files,['global/local/SKILL.md']);
 const native=await overviewStatus({userHome:root,agentHome,includeTargets:true});
 assert.equal(native.fileTargets['global/local/SKILL.md'],join(root,'.agents/skills/local/SKILL.md'));
 await rm(join(root,'.agents/skills'),{recursive:true});await writeFile(join(root,'.agents/skills'),'not a directory');
 assert.equal((await globalSkillInventory(root)).incomplete,true);
});
