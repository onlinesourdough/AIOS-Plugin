// Disposable protocol host. No native editor, real chat, owner writes or network.
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
const html=`<!doctype html><html lang="en"><meta charset="utf-8"><title>AIOS SDK fixture</title>
<style>body{margin:0;font:12px system-ui;background:#eee}header{padding:10px;display:flex;gap:12px;align-items:center;flex-wrap:wrap}iframe{width:100%;height:calc(100vh - 155px);border:0}#trace{margin:0;padding:8px;background:white;font:10px monospace;max-height:60px;overflow:auto}</style>
<header><strong>Synthetic host · no real writes</strong><label>Context / Git <select id="scenario"><option value="matches">Connected and matching</option><option value="dirty">Local changes</option><option value="differs">Different commits</option><option value="unavailable">GitHub access failure</option><option value="stale">Old check</option><option value="unconnected">No GitHub repo</option><option value="missing">Missing context home</option></select></label><label>Preview size <select id="size"><option value="window">Window</option><option value="1280x720">Desktop 1280 × 720</option><option value="1024x640">Compact 1024 × 640</option><option value="390x780">Narrow 390 × 780</option></select></label><label>Theme <select id="theme"><option value="light">White host</option><option value="dark">Dark host</option></select></label><label>Message result <select id="message-result"><option value="ok">Success</option><option value="denied">Unconfirmed</option><option value="rpc">RPC error</option></select></label><label><input id="file-error" type="checkbox">Fail file open</label><label><input id="git-error" type="checkbox">Fail Git check RPC</label><button id="add-file">Add context file</button><button id="broken-link">Break a skill link</button></header><p id="trace" role="status">Waiting for handshake</p><iframe title="AIOS fixture" src="/app"></iframe>
<script>
const frame=document.querySelector('iframe'),trace=document.querySelector('#trace');
let extra=false,broken=false,checked=false,events=[];
function result(){const mode=document.querySelector('#scenario').value,missing=mode==='missing',connected=!['missing','unconnected'].includes(mode);
const files=['context/custom-business.md','context/team/a & b.md',...Array.from({length:10},(_,i)=>'context/topic-'+(i+1)+'.md')];if(extra)files.push('context/new-space.md');
const skills=Array.from({length:8},(_,i)=>'skills/personal-'+(i+1)+'/SKILL.md');
const globalSkills=['global/personal-1/SKILL.md',...Array.from({length:5},(_,i)=>'global/global-'+(i+1)+'/SKILL.md')];
const remote={state:!checked?'not_checked':mode==='dirty'?'matches':mode, ...(checked?{checkedAt:mode==='stale'?'2026-01-01T12:00:00Z':new Date().toISOString()}:{})};
return {content:[],structuredContent:{owner:missing?'missing':'ready',format:!missing,index:!missing,memory:!missing,connections:!missing,localReady:!missing,discovery:'explicit',routes:missing?0:files.length,personalSkills:missing?0:skills.length,setup:{context:'unknown',access:'unknown',work:'unknown'},git:{state:mode==='dirty'?'local_changes':connected?'matches_cached_remote':'not_configured',connected,changedFiles:mode==='dirty'?3:0,remote},checkedAt:new Date().toISOString()},_meta:{'aios/git':connected?{repository:{name:'synthetic/AIOS',url:'https://github.com/synthetic/AIOS'},branch:'main',commit:{id:'abc1234',date:'2026-10-01T08:00:00Z'}}:{},'aios/fileTargets':missing?{}:Object.fromEntries([['index','/synthetic/owner/AIOS.md'],['memory','/synthetic/owner/MEMORY.md'],['connections','/synthetic/owner/CONNECTIONS.md'],...files.map(name=>[name,'/synthetic/owner/'+name]),...skills.map(name=>[name,'/synthetic/owner/'+name]),...globalSkills.map(name=>[name,name.includes('personal-1')?'/synthetic/owner/skills/personal-1/SKILL.md':'/synthetic/.agents/skills/'+name.slice(7)])]),'aios/inventory':missing?{}:{context:{available:true,files,truncated:false},skills:{available:true,files:skills,truncated:false},globalSkills:{available:true,files:globalSkills,truncated:false,aiosLinks:{'global/personal-1/SKILL.md':'skills/personal-1/SKILL.md'},unavailableLinks:broken?['old-method']:[],incomplete:broken}}}};}
document.querySelector('#size').onchange=event=>{const [width,height]=event.target.value.split('x');frame.style.width=height?width+'px':'100%';frame.style.height=height?height+'px':'calc(100vh - 155px)';};
function hostContext(){const theme=document.querySelector('#theme').value;return {theme,displayMode:'fullscreen',styles:{variables:{'--color-background-primary':theme==='dark'?'#181818':'#ffffff','--color-text-primary':theme==='dark'?'#ffffff':'#000000','--font-sans':'system-ui'}}};}
document.querySelector('#theme').onchange=()=>send({method:'ui/notifications/host-context-changed',params:hostContext()});
function record(method,params){events.push({method,params});trace.textContent=JSON.stringify(events);}
function send(message){frame.contentWindow.postMessage({jsonrpc:'2.0',...message},location.origin);}
document.querySelector('#broken-link').onclick=()=>{broken=true;send({method:'ui/notifications/tool-result',params:result()});};
document.querySelector('#add-file').onclick=()=>{extra=true;send({method:'ui/notifications/tool-result',params:result()});};
document.querySelector('#scenario').onchange=()=>{checked=true;send({method:'ui/notifications/tool-result',params:result()});};
window.addEventListener('message',event=>{
 if(event.source!==frame.contentWindow||event.origin!==location.origin)return;
 const {id,method,params}=event.data;if(!method)return;
 if(method==='ui/initialize'){record(method);send({id,result:{protocolVersion:'2026-01-26',hostInfo:{name:'Synthetic white host',version:'1'},hostCapabilities:{serverTools:{},openLinks:{},message:{text:{}},experimental:{'openai/files':{},'openai/message':{}}},hostContext:hostContext()}});}
 else if(method==='tools/call'){if(params.name==='aios_git_check'){record(method,params);if(document.querySelector('#git-error').checked){send({id,error:{code:-32000,message:'Synthetic check failure'}});return;}checked=true;}send({id,result:result()});}
 else if(method==='openai/files/open'){record(method,params);send(document.querySelector('#file-error').checked?{id,error:{code:-32000,message:'Synthetic open failure'}}:{id,result:{}});}
 else if(method==='ui/open-link'){record(method,params);send({id,result:{}});}
 else if(method==='ui/message'){record(method,params);const mode=document.querySelector('#message-result').value;send(mode==='rpc'?{id,error:{code:-32000,message:'Synthetic message failure'}}:{id,result:{isError:mode==='denied'}});}
 else if(id!==undefined)send({id,result:{}});
});
</script></html>`;
createServer(async(req,res)=>{
 if(req.method!=='GET'||req.headers.host!=='127.0.0.1:43189'){res.writeHead(403);return res.end();}
 res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','text/html');
 if(req.url==='/')res.end(html);
 else if(req.url==='/app')res.end(await readFile(new URL('../../runtime/overview/index.html',import.meta.url),'utf8'));
 else{res.writeHead(404);res.end();}
}).listen(43189,'127.0.0.1',()=>console.log('Synthetic SDK host at http://127.0.0.1:43189/'));
