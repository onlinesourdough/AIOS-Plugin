import { lstat, readFile, readdir, realpath } from 'node:fs/promises';
import { join, resolve, isAbsolute } from 'node:path';
import { homedir, hostname, platform } from 'node:os';
import { createHash } from 'node:crypto';
import { readGitStatus } from './git-status.mjs';
// Discovery is a bounded list of regular Markdown files, not a content parser.
// A filename does not establish a route, a space, or installed skill discovery.
async function inventory(root, folder, targets) {
 const result={available:false,files:[],truncated:false};
 let visited=0;
 async function walk(relative,depth){
  const info=await lstat(join(root,relative));
  if(!info.isDirectory()||info.isSymbolicLink())return;
  if(depth===0)result.available=true;
  const entries=(await readdir(join(root,relative),{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name,'en'));
  for(const entry of entries){
   if(entry.name.startsWith('.'))continue;
   if(++visited>300||result.files.length>=80){result.truncated=true;return;}
   const name=relative+'/'+entry.name;
   if(entry.isDirectory()){
    if(depth<4)await walk(name,depth+1);else result.truncated=true;
   }else if(entry.isFile()&&entry.name.endsWith('.md')){
    const file=await lstat(join(root,name));
    if(!file.isFile()||file.isSymbolicLink())continue;
    if(file.size>65536){result.incomplete=true;continue;}
    result.files.push(name);if(targets)targets[name]=join(root,name);
   }
  }
 }
 try{await walk(folder,0);}catch(error){if(error.code==='ENOENT'&&!result.available)result.missing=true;else result.incomplete=true;}
 return result;
}
async function text(root,name,limit=65536){
 const parts=name.split('/');for(let n=1;n<parts.length;n++){const parent=await lstat(join(root,...parts.slice(0,n)));if(!parent.isDirectory()||parent.isSymbolicLink())throw Error('Unsupported parent');}
 const path=join(root,name),before=await lstat(path);if(!before.isFile()||before.isSymbolicLink()||before.size>limit)throw Error('Unsupported file');
 const value=await readFile(path,'utf8'),after=await lstat(path);if(before.ino!==after.ino||before.mtimeMs!==after.mtimeMs||after.isSymbolicLink())throw Error('File changed during read');
 return value;
}
async function selectHome(selected,{userHome,agentHome}){
 if(selected!==undefined)return {path:selected,source:'explicit'};
 if(process.env.AIOS_HOME!==undefined)return {path:process.env.AIOS_HOME,source:'environment'};
 if(!isAbsolute(agentHome))return {source:'bridge',error:'The agent settings path must be absolute.'};
 let bridge;
 try{bridge=(await text(agentHome,'AGENTS.md')).replace(/\r\n/g,'\n');}
 catch(error){
  if(error.code==='ENOENT')return {path:join(userHome,'.AIOS'),source:'default'};
  return {source:'bridge',error:'The agent context route could not be read safely.'};
 }
 const begin='<!-- AIOS:BEGIN -->',end='<!-- AIOS:END -->';
 if(!bridge.includes(begin)&&!bridge.includes(end))return {path:join(userHome,'.AIOS'),source:'default'};
 if(bridge.split(begin).length!==2||bridge.split(end).length!==2||bridge.indexOf(end)<bridge.indexOf(begin))return {source:'bridge',error:'The managed AIOS route is ambiguous. Ask your agent to review it.'};
 const block=bridge.slice(bridge.indexOf(begin)+begin.length,bridge.indexOf(end));
 const paths=[...block.matchAll(/^AIOS entrypoint:[ \t]*(.+?)[ \t]*$/gm)].map(match=>match[1]);
 if(paths.length!==1||!isAbsolute(paths[0]))return {source:'bridge',error:'The managed AIOS route needs an absolute owner path.'};
 return {path:paths[0],source:'bridge'};
}
export async function contextStatus(selected,{includeTargets=false,includeInventory=false,checkRemote=false,userHome=homedir(),agentHome=process.env.CODEX_HOME||join(userHome,'.codex')}={}){
 const choice=await selectHome(selected,{userHome,agentHome});
 const status={owner:'unavailable',format:false,index:false,memory:false,connections:false,localReady:false,discovery:choice.source,routes:0,git:{state:'unknown'},personalSkills:0,setup:{context:'unknown',access:'unknown',work:'unknown'},checkedAt:new Date().toISOString()};
 if(choice.error)return {...status,reason:choice.error};
 selected=choice.path;
 if(typeof selected!=='string')return {...status,reason:'The selected owner path must be absolute.'};
 if(!isAbsolute(selected))return {...status,reason:'The selected owner path must be absolute.'};
 const root=resolve(selected);
 try{
  const info=await lstat(root);if(info.isSymbolicLink()||!info.isDirectory())return {...status,reason:'The selected owner home is not a regular directory.'};
  if((await realpath(root))!==root)return {...status,reason:'The selected owner path traverses a symbolic link.'};
 }catch(error){return {...status,owner:error.code==='ENOENT'?'missing':'unavailable',reason:error.code==='ENOENT'?'AIOS has not been set up here.':'The owner home could not be checked.'};}
 try{if(!['1','2'].includes((await text(root,'AIOS_FORMAT',32)).trim()))return {...status,owner:'unsupported',reason:'AIOS supports owner formats 1 and 2.'};}
 catch{return {...status,owner:'unsupported',reason:'The owner format could not be verified.'};}
 status.format=true;
 const sources={};
 for(const [key,name] of [['index','AIOS.md'],['memory','MEMORY.md'],['connections','CONNECTIONS.md']]){
  try{const value=await text(root,name);sources[name]=createHash('sha256').update(value).digest('hex');status[key]=Boolean(value.replace(/<!--[\s\S]*?-->/g,'').trim());}catch{}
 }
 status.owner=status.index?'ready':'incomplete';
 // Local availability never claims tool authentication or a completed task.
 // Receipts are optional task evidence, not a gate for an existing installation.
 status.localReady=status.index&&status.memory&&status.connections;
 // Native file targets are opt-in and never part of the public status response.
 if(includeTargets){
  status.fileTargets={};
  for(const [key,name] of [['index','AIOS.md'],['memory','MEMORY.md'],['connections','CONNECTIONS.md']])if(status[key])status.fileTargets[key]=join(root,name);
 }
 if(includeInventory){
  status.inventory={context:await inventory(root,'context',status.fileTargets),skills:await inventory(root,'skills',status.fileTargets)};
 }
 try{
  const path=join(root,'context'),info=await lstat(path);if(info.isDirectory()&&!info.isSymbolicLink())status.routes=(await readdir(path,{withFileTypes:true})).filter(e=>e.isFile()&&e.name.endsWith('.md')).length;
 }catch{}
 try{const path=join(root,'skills'),info=await lstat(path);if(info.isDirectory()&&!info.isSymbolicLink())for(const entry of await readdir(path,{withFileTypes:true})){if(!entry.isDirectory())continue;try{await text(join(path,entry.name),'SKILL.md');status.personalSkills++;}catch{}}}catch{}
 const hostKey=createHash('sha256').update(platform()+'\0'+hostname()).digest('hex');
 try{
  const record=JSON.parse(await text(root,'context/codex-setup.json',16384));
  if(record.version!==1)throw Error('Unsupported setup record');
  for(const key of ['context','access','work']){
   const proof=record[key];if(!proof)continue;
   if(typeof proof.evidence!=='string'||!proof.evidence.trim()||typeof proof.verifiedAt!=='string'||!Number.isFinite(Date.parse(proof.verifiedAt))||Date.parse(proof.verifiedAt)>Date.now()+60000||proof.verified!==true)continue;
   const names=key==='context'?['AIOS.md','MEMORY.md']:['CONNECTIONS.md'];
   const bound=names.every(name=>sources[name]&&proof.sourceHashes?.[name]===sources[name]);
   status.setup[key]=bound&&(key==='context'||record.hostKey===hostKey)?'recorded':'stale';
  }
 }catch{}
 const result=await readGitStatus(root,{checkRemote});
 status.git=result.summary;
 if(includeInventory||includeTargets)status.gitDetails=result.details;
 return status;
}
