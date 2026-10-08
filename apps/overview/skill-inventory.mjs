import {lstat, readdir, realpath} from 'node:fs/promises';
import {join} from 'node:path';

// User-wide discovery location documented by Codex. List only immediate skill
// entry files; do not read bodies, plugin caches, projects or app databases.
// Linked skill directories are supported, as they are by the native harness.
export async function globalSkillInventory(userHome, targets, ownerTargets={}) {
 const result={available:false,files:[],truncated:false,aiosLinks:{},unavailableLinks:[]};
 const ownerFiles=new Map(Object.entries(ownerTargets).filter(([key])=>key.startsWith('skills/')&&key.endsWith('/SKILL.md')).map(([key,path])=>[path,key]));
 const root=join(userHome,'.agents/skills');
 try {
  const directory=await realpath(root);
  if(!(await lstat(directory)).isDirectory())return {...result,incomplete:true};
  result.available=true;
  const entries=(await readdir(directory,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name,'en'));
  let visited=0;
  for(const entry of entries){
   if(entry.name.startsWith('.'))continue;
   if(++visited>300||result.files.length>=80){result.truncated=true;break;}
   if(!entry.isDirectory()&&!entry.isSymbolicLink())continue;
   try {
    const folder=await realpath(join(directory,entry.name));
    if(!(await lstat(folder)).isDirectory())continue;
    const path=join(folder,'SKILL.md'),file=await lstat(path);
    if(!file.isFile()||file.isSymbolicLink()||file.size>65536){result.incomplete=true;continue;}
    const key='global/'+entry.name+'/SKILL.md';
    result.files.push(key);
    if(ownerFiles.has(path))result.aiosLinks[key]=ownerFiles.get(path);
    if(targets)targets[key]=path;
   }catch(error){
    if(entry.isSymbolicLink()){result.unavailableLinks.push(entry.name);result.incomplete=true;}
    else if(error.code!=='ENOENT')result.incomplete=true;
   }
  }
 }catch(error){if(error.code==='ENOENT')result.missing=true;else result.incomplete=true;}
 return result;
}
