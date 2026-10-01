import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,realpath,writeFile,readFile,rm,readdir} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {execFileSync} from 'node:child_process';
import {readGitStatus,githubRepository} from './git-status.mjs';
async function fixture(t,{upstream=true}={}){
 const root=await realpath(await mkdtemp(join(tmpdir(),'aios-git-check-')));t.after(()=>rm(root,{recursive:true,force:true}));
 const git=(...args)=>execFileSync('git',['-C',root,...args],{encoding:'utf8'}).trim();
 git('init','-q','-b','main');await writeFile(join(root,'context.md'),'# Synthetic context');git('add','context.md');git('-c','user.name=Fixture','-c','user.email=fixture@example.test','commit','-qm','fixture');
 git('remote','add','origin','https://github.com/synthetic-fixture/aios.git');
 if(upstream){git('update-ref','refs/remotes/origin/main','HEAD');git('branch','--set-upstream-to','origin/main');}
 return {root,git,head:git('rev-parse','HEAD')};
}
test('repo links accept only credential-free GitHub URLs',()=>{
 for(const value of ['https://github.com/owner/repo.git','git@github.com:owner/repo','ssh://git@github.com/owner/repo.git'])assert.deepEqual(githubRepository(value),{name:'owner/repo',url:'https://github.com/owner/repo'});
 for(const value of ['https://token@github.com/owner/repo','https://github.com/owner/repo?token=SECRET','https://github.com/owner/repo#secret','https://example.org/owner/repo','https://github.com/../repo','git@github.com:owner/repo\n','ext::command','https://github.com/owner/repo/extra'])assert.equal(githubRepository(value),undefined);
});
test('cached refs never attest current GitHub; live match preserves index/refs/config',async t=>{
 const {root,git,head}=await fixture(t);const files=['index','config','HEAD','refs/remotes/origin/main'];const before=await Promise.all(files.map(f=>readFile(join(root,'.git',f))));
 let calls=0;const lookupRemote=async()=>{calls++;return head;};
 const cached=await readGitStatus(root,{lookupRemote});assert.equal(cached.summary.state,'matches_cached_remote');assert.equal(cached.summary.remote.state,'not_checked');assert.equal(calls,0);
 const live=await readGitStatus(root,{checkRemote:true,lookupRemote});assert.equal(live.summary.remote.state,'matches');assert.ok(live.summary.remote.checkedAt);assert.equal(calls,1);
 assert.equal((await readGitStatus(root,{lookupRemote})).summary.remote.state,'matches');assert.equal(calls,1);
 const after=await Promise.all(files.map(f=>readFile(join(root,'.git',f))));assert.deepEqual(after,before);assert.ok(!(await readdir(join(root,'.git'))).includes('FETCH_HEAD'));assert.equal(git('status','--porcelain'),'');
});
test('dirty files remain pending even when committed HEAD matches GitHub',async t=>{
 const {root,head}=await fixture(t);await writeFile(join(root,'context.md'),'# Changed');await writeFile(join(root,'new note.md'),'# New');
 const {summary}=await readGitStatus(root,{checkRemote:true,lookupRemote:async()=>head});assert.equal(summary.state,'local_changes');assert.equal(summary.changedFiles,2);assert.equal(summary.remote.state,'matches');
});
test('rename is one change even when its old filename resembles a status record',async t=>{
 const {root,git,head}=await fixture(t);git('mv','context.md',' M confusing.md');git('-c','user.name=Fixture','-c','user.email=fixture@example.test','commit','-qm','rename base');git('mv',' M confusing.md','new.md');
 assert.equal((await readGitStatus(root,{checkRemote:true,lookupRemote:async()=>head})).summary.changedFiles,1);
});
test('remote difference and failed access never claim sync; errors are sanitized',async t=>{
 const {root}=await fixture(t);let result=await readGitStatus(root,{checkRemote:true,lookupRemote:async()=> 'a'.repeat(40)});assert.equal(result.summary.remote.state,'differs');
 result=await readGitStatus(root,{checkRemote:true,lookupRemote:async()=>{throw Error('SECRET auth');}});assert.equal(result.summary.remote.state,'unavailable');assert.ok(!JSON.stringify(result).includes('SECRET'));
 result=await readGitStatus(root,{checkRemote:true,lookupRemote:async()=> 'not a commit'});assert.equal(result.summary.remote.state,'unavailable');
});
test('new local HEAD invalidates previous remote equality',async t=>{
 const {root,git,head}=await fixture(t);await readGitStatus(root,{checkRemote:true,lookupRemote:async()=>head});await writeFile(join(root,'context.md'),'# New commit');git('add','context.md');git('-c','user.name=Fixture','-c','user.email=fixture@example.test','commit','-qm','new');
 const result=await readGitStatus(root);assert.equal(result.summary.remote.state,'not_checked');assert.equal(result.summary.ahead,1);
});
test('missing upstream, detached branch and non-repo never call GitHub',async t=>{
 const {root,git}=await fixture(t,{upstream:false});let calls=0;const options={checkRemote:true,lookupRemote:async()=>{calls++;return 'a'.repeat(40);}};
 assert.equal((await readGitStatus(root,options)).summary.state,'no_upstream');git('checkout','--detach','-q');assert.equal((await readGitStatus(root,options)).summary.state,'detached');assert.equal((await readGitStatus(join(root,'absent'),options)).summary.state,'not_configured');assert.equal(calls,0);
});
test('credential-bearing remotes and URL rewrites do not reach remote lookup or UI',async t=>{
 const {root,git}=await fixture(t);git('remote','set-url','origin','https://SECRET@github.com/synthetic-fixture/aios');let calls=0;const options={checkRemote:true,lookupRemote:async()=>{calls++;return 'a'.repeat(40);}};
 let result=await readGitStatus(root,options);assert.equal(result.summary.connected,false);assert.equal(result.details.repository,undefined);assert.ok(!JSON.stringify(result).includes('SECRET'));
 git('remote','set-url','origin','https://github.com/synthetic-fixture/aios');git('config','url.https://example.invalid/.insteadOf','https://github.com/');result=await readGitStatus(root,options);assert.equal(result.summary.connected,false);assert.equal(calls,0);
});
test('concurrent checks share one remote request',async t=>{
 const {root,head}=await fixture(t);let calls=0;const lookupRemote=async()=>{calls++;await new Promise(resolve=>setTimeout(resolve,100));return head;};
 const results=await Promise.all([readGitStatus(root,{checkRemote:true,lookupRemote}),readGitStatus(root,{checkRemote:true,lookupRemote})]);assert.equal(calls,1);assert.ok(results.every(r=>r.summary.remote.state==='matches'));
});
