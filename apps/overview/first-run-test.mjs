// Real local reader / stdio / browser scenarios. No account login or model run.
import assert from 'node:assert/strict';
import { mkdir, writeFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { contextStatus } from './context-status.mjs';
import { servePreview } from './preview-http.mjs';
const source=fileURLToPath(new URL('.',import.meta.url));
assert.equal(process.env.AIOS_HOME,undefined,'Unset AIOS_HOME for this synthetic test process so it cannot select your real home.');
const buildRoot=resolve(process.env.AIOS_PREVIEW_BUILD||resolve(source,'../../runtime/overview'));
const directory=resolve(process.argv[3]||join(source,'../aios-first-run-fixtures'));
const userHome=join(directory,'new-user'),agentHome=join(directory,'agent-settings'),existing=join(directory,'existing home');
const options={userHome,agentHome,includeInventory:true};
const mode=process.argv[2];
if(mode==='prepare'){
 await mkdir(directory,{recursive:true});
 // Keep each run fresh rather than clobbering a previous fixture.
 assert.deepEqual(await readdir(directory),[],'Choose a new empty fixture directory.');
 await mkdir(userHome);await mkdir(agentHome);await mkdir(existing);
 await writeFile(join(existing,'AIOS_FORMAT'),'2\n');
 await writeFile(join(existing,'AIOS.md'),'# Synthetic existing AIOS\nRead MEMORY.md and only the relevant context routes.\n');
 await writeFile(join(existing,'MEMORY.md'),'# Synthetic memory\nKeep shared and personal methods separate.\n');
 await writeFile(join(existing,'CONNECTIONS.md'),'# Synthetic access choices\nNo optional connected tools are needed for this local fixture.\n');
 await mkdir(join(existing,'context'));await writeFile(join(existing,'context/custom-space.md'),'# Synthetic space\nThis file is a context route, not a working project.\n');
 await mkdir(join(existing,'skills/example-method'),{recursive:true});await writeFile(join(existing,'skills/example-method/SKILL.md'),'---\nname: example-method\n---\n# Synthetic personal method\n');
 console.log('Prepared fresh synthetic user and a separate existing context home.');
}else if(mode==='restore'){
 await writeFile(join(agentHome,'AGENTS.md'),`Unrelated synthetic settings\n<!-- AIOS:BEGIN -->\nAIOS entrypoint: ${existing}\n<!-- AIOS:END -->\n`);
 console.log('Pointed the synthetic managed bridge at the existing home. No default home created.');
}else if(mode==='inspect'){
 console.log(JSON.stringify(await contextStatus(undefined,options)));
}else if(mode==='verify'){
 const first=JSON.parse(execFileSync(process.execPath,[fileURLToPath(import.meta.url),'inspect',directory],{encoding:'utf8'}));
 const expected=process.argv[4]||'missing';assert.equal(first.owner,expected);assert.equal(first.localReady,expected==='ready');
 assert.deepEqual(await readdir(userHome),[]);
 const selected=expected==='ready'?existing:join(userHome,'.AIOS');
 const client=new Client({name:'Isolated AIOS first-run test',version:'1'});
 try{
  await client.connect(new StdioClientTransport({command:process.execPath,args:[join(buildRoot,'server.mjs')],env:{...process.env,AIOS_HOME:selected}}));
  const result=await client.callTool({name:'aios_open',arguments:{}});
  assert.equal(result.structuredContent.owner,expected);assert.equal(result.structuredContent.localReady,expected==='ready');
  assert.ok(!JSON.stringify(result.structuredContent).includes(directory));
  const resource=await client.readResource({uri:'ui://aios/overview'});assert.ok(resource.contents[0].text.includes('Context ready'));
 }finally{await client.close();}
 if(expected==='ready')assert.equal(first.setup.work,'unknown');
 await writeFile(join(directory,expected+'-result.json'),JSON.stringify({scope:'Fresh child reader and isolated real stdio; no account login or model run',status:first,defaultHomeCreated:false,stdio:'PASS'},null,2)+'\n');
 console.log(`PASS: ${expected} in a fresh child and isolated stdio; no default home created.`);
}else if(mode==='preview'){
 const port=Number(process.argv[4]||43188);assert.ok(Number.isInteger(port)&&port>=1024&&port<=65535);
 servePreview(port,()=>contextStatus(undefined,options),pathToFileURL(join(buildRoot,'index.html')));
}else throw new Error('Use prepare, inspect, verify, restore or preview.');
