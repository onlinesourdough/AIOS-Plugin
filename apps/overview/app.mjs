import { App, applyDocumentTheme, applyHostStyleVariables } from '@modelcontextprotocol/ext-apps';
import { OpenAIExtensions } from '@openai/mcp-extensions/app';
import catalog from './skill-catalog.json';
const main=document.querySelector('#main');
let view='setup',chosen=false,status,app,extensions,busy=false,gitBusy=false,gitError=false,opening=false,signature,fileTargets={},inventory={},gitDetails={},inFlight;
const requests={},searches={context:'',personal:'',shared:''},autoChecks=new Set();
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons={check:'M5 12l4 4L19 6',cross:'M6 6l12 12M18 6 6 18',arrow:'M5 12h14m-5-5 5 5-5 5',external:'M14 4h6v6m0-6L9 15M10 4H4v16h16v-6',chat:'M4 4h16v12H9l-5 4V4Z',folder:'M3 6h7l2 3h9v11H3V6Z',file:'M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 12h8m-8 4h6',memory:'M5 4h14v16H5V4Zm3 4h8m-8 4h8m-8 4h5',connections:'M9 7H6a4 4 0 0 0 0 8h3m6-8h3a4 4 0 0 1 0 8h-3M8 12h8',book:'M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3V4Zm9 2v16',search:'M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 6 6',refresh:'M20 8a8 8 0 1 0 1 7m-1-7V3m0 5h-5',cloud:'M6 19h12a4 4 0 0 0 0-8 6 6 0 0 0-12-2 5 5 0 0 0 0 10Z',alert:'M12 3 2 21h20L12 3Zm0 6v6m0 3v.1',dot:'M12 12h.01'};
const icon=(name,cls='')=>`<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${icons[name]||icons.file}"/></svg>`;
const prompts={
 setup:'Use aios-setup to locate and reuse my existing AIOS before offering a new setup. Respect AIOS_HOME and the managed agent route. Help me add only the missing context, then discuss private GitHub backup for my context and personal skills. Verify relevant access under my existing permissions. Do not create a second AIOS home or upload files without the correct destination and scope.',
 sync:'Use aios-maintain-context for aios sync. Inspect my configured AIOS home and Git destination first. Help me connect a private GitHub repo if one is missing, or sync reviewed context and my personal skills to the existing exact remote and branch under my recorded permissions. Follow the Sync allowlist and fresh readback; preserve unrelated changes and stop on secrets or conflicts. This request does not enable background autosync.',
 context:'Open my existing AIOS index in the file editor supported by this app. Verify the configured home and format, then help me follow relevant memory, connections and topic routes. Keep this read-only.'
};
function chatAction(kind,label,{compact=false}={}){
 if(!extensions?.message)return `<p class="action-note">Ask your agent to ${kind==='setup'?'set up AIOS':kind==='sync'?'connect or sync your AIOS with GitHub':'open your AIOS context'}.</p>`;
 const state=requests[kind]||'idle';
 const caption={idle:label,sending:'Sending request…',sent:'Request sent',uncertain:'Check your chat'}[state];
 const note={idle:'Sends a request to your agent. A new chat may open.',sending:'Sending to your agent chat.',sent:'Continue in your chat. Saved changes appear here.',uncertain:'Delivery is unconfirmed. Check your chat before retrying.'}[state];
 return `<div class="chat-action ${compact?'compact':''}"><button class="${compact?'secondary':'primary'}" data-chat="${kind}" ${state!=='idle'||inFlight?'disabled':''}>${icon('chat')}<span>${caption}</span>${icon('external')}</button><p class="action-note">${note}</p><details open class="request-preview" id="${kind}-request"><summary>View request</summary><p>${escape(prompts[kind])}</p></details></div>`;
}
function gitView(){
 const git=status?.git||{};
 if(gitBusy)return {tone:'pending',label:'Checking GitHub',description:'Reading the latest commit on GitHub.'};
 if(gitError)return {tone:'error',label:'Could not check',description:'The check did not finish. Try again or ask your agent.'};
 if(!git.connected)return {tone:'pending',label:git.state==='detached'?'Choose a branch':'Not connected',description:'Connect a private repo to back up your context and personal skills.'};
 if(git.remote?.state==='unavailable')return {tone:'error',label:'Could not check',description:'GitHub could not be reached with your current Git access. Try again or ask your agent.'};
 if(git.state==='local_changes')return {tone:'pending',label:'Changes to sync',description:`${git.changedFiles||'Some'} changed ${git.changedFiles===1?'file':'files'} on this device.`};
 if(git.remote?.state==='matches')return {tone:'good',label:'Up to date',description:'Your committed files matched GitHub at the last check.'};
 if(git.remote?.state==='differs')return {tone:'pending',label:'Needs sync',description:'This device and GitHub have different commits. Review the changes in chat.'};
 return {tone:'pending',label:'Check needed',description:git.remote?.state==='stale'?'The last GitHub check is more than five minutes old.':'Check GitHub to confirm it has your latest files.'};
}
function shortDate(value){
 const date=new Date(value);return Number.isFinite(date.getTime())?date.toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):'Not checked';
}
function infoTip(id,label,text){return `<span class="info-tip"><button class="info-button" data-info="${id}" aria-label="${escape(label)}" aria-describedby="${id}-tip">i</button><span class="tooltip" role="tooltip" id="${id}-tip">${escape(text)}</span></span>`;}
function badge(tone,label){return `<span class="status-badge ${tone}">${icon(tone==='good'?'check':tone==='error'?'cross':'dot')}<span>${label}</span></span>`;}
function repository(){
 const repo=gitDetails.repository;
 if(!repo||!/^https:\/\/github\.com\/[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+$/.test(repo.url))return '<span class="repo-empty">No GitHub repo connected</span>';
 return `<a class="repo-link" href="${escape(repo.url)}" data-repo target="_blank" rel="noopener">${escape(repo.name)}${icon('external')}</a>`;
}
function checkButton(){return `<button class="secondary" data-check-git ${gitBusy?'disabled':''}>${icon('refresh',gitBusy?'checking':'')}<span>${gitBusy?'Checking…':'Check GitHub'}</span></button>`;}
function syncCard({actions=true}={}){
 const state=gitView(),git=status?.git||{},connected=git.connected;
 return `<section class="sync-card" aria-labelledby="sync-title"><div class="sync-top"><h2 id="sync-title">${icon('cloud')}GitHub sync</h2>${badge(state.tone,state.label)}</div><div class="sync-repo">${repository()}${connected?`<span class="branch">${escape(gitDetails.branch||'')}</span>`:''}</div><p class="sync-description">${state.description}</p><div class="sync-facts"><div><span>Latest commit</span><strong>${gitDetails.commit?`${escape(gitDetails.commit.id)} · ${shortDate(gitDetails.commit.date)}`:'No commit yet'}</strong></div><div><span>GitHub checked</span><strong>${git.remote?.checkedAt?shortDate(git.remote.checkedAt):'Not checked yet'}</strong></div></div>${actions?`<div class="sync-actions">${connected?checkButton():''}${state.tone==='good'?'':chatAction('sync',connected?'Sync in chat':'Connect GitHub in chat',{compact:true})}</div>`:''}<details open class="sync-help" id="sync-details"><summary>What gets synced?</summary><p>Reviewed context and personal skills you own. AIOS plugin updates and project repos are separate.</p><p>Sync runs through your agent after review. Opening this panel checks GitHub automatically; it does not upload files. Uncommitted, ignored or excluded files are not confirmed as backed up.</p></details></section>`;
}
function setup(){
 const ready=Boolean(status?.localReady),git=status?.git||{},sync=gitView(),synced=ready&&sync.tone==='good';
 const blocked=status&&['unsupported','unavailable'].includes(status.owner);
 const steps=[
  {title:'Add your context',text:'Preferences, memory and connections.',tone:ready?'good':status?'error':'pending',label:ready?'Ready':blocked?'Needs attention':status?'Not set up':'Checking'},
  {title:'Connect GitHub',text:git.connected?gitDetails.repository?.name||'GitHub repo connected':'A private repo for backup across devices.',tone:git.connected?'good':'pending',label:git.connected?'Connected':'Not connected'},
  {title:'Sync your AIOS',text:'Your context and personal skills.',tone:synced?'good':sync.tone==='error'?'error':'pending',label:synced?'Up to date':git.connected?sync.label:'Next'}
 ];
 const count=steps.filter(step=>step.tone==='good').length;
 const heading=synced?"You’re set up.":blocked?'Check your setup.':ready?'Finish your setup.':'Set up AIOS.';
 const lead=synced?'Your committed files match GitHub.':ready?'Your context is ready. Keep it backed up across devices.':'Give your agent the context it needs for your work.';
 let action;
 if(!ready)action=chatAction('setup',blocked?'Check setup in chat':'Set up in chat');
 else if(synced)action='<button class="primary" data-view="overview">Open overview'+icon('arrow')+'</button>';
 else if(!git.connected||git.state==='local_changes'||git.remote?.state==='differs')action=chatAction('sync',git.connected?'Sync in chat':'Connect GitHub in chat');
 else action=`<div class="chat-action">${checkButton()}<p class="action-note">Checks GitHub. No files are uploaded.</p></div>`;
 return `<div class="page setup-page"><section class="intro"><p class="eyebrow">Setup</p><h1>${heading}</h1><p class="lead">${lead}</p><div class="progress"><span>${count} of 3 steps complete</span><div class="progress-track" aria-hidden="true">${steps.map(step=>`<i class="${step.tone==='good'?'complete':''}"></i>`).join('')}</div></div>${action}${ready&&!synced?'<button class="text-button" data-view="overview">Open your context '+icon('arrow')+'</button>':''}<p class="optional-note">GitHub backup is optional. Your context stays yours.</p></section><section class="workspace" aria-label="Setup progress"><ol class="steps">${steps.map((step,i)=>`<li class="step"><span class="step-number ${step.tone}" aria-hidden="true">${step.tone==='good'?icon('check'):step.tone==='error'?icon('cross'):i+1}</span><div class="step-copy"><h2>${step.title}</h2><p>${i===1&&git.connected&&gitDetails.repository?repository():escape(step.text)}</p></div>${badge(step.tone,step.label)}</li>`).join('')}</ol>${ready?'<p class="setup-note">Your context is available. Open Sync to review your GitHub backup.</p>':`<details open class="explanation" id="setup-details"><summary>How setup works</summary><p>Your agent checks for existing AIOS, then helps add what is missing. Context stays on your device, with a private GitHub backup if you choose one.</p><p>Setup happens in chat. You can review the request before sending it.</p>${blocked?`<p class="setup-error">${escape(status.reason)}</p>`:''}</details>`}</section></div>`;
}
function fileLabel(path){const leaf=path.split('/').at(-1);return (leaf==='SKILL.md'?path.split('/').at(-2):leaf.replace(/\.md$/,'')).replace(/[-_]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());}
function fileEntry(path,kind){
 const title=fileLabel(path),relative=path.replace(/^(context|skills)\//,'');
 const body=`${icon(kind==='personal'?'book':'file')}<span><strong>${escape(title)}</strong><small>${escape(relative)}</small></span>`;
 return extensions?.files&&fileTargets[path]?`<button class="file-row" data-file="${escape(path)}" aria-label="Open ${escape(relative)}">${body}${icon('external')}</button>`:`<div class="file-row">${body}</div>`;
}
function listedFiles(kind){return kind==='shared'?catalog.skills:kind==='personal'?(inventory.skills?.files||[]).filter(path=>path.endsWith('/SKILL.md')):inventory.context?.files||[];}
function listRows(kind){
 const all=listedFiles(kind),query=searches[kind].trim().toLowerCase();
 const files=all.filter(value=>(kind==='shared'?value.name+' '+value.title:value).toLowerCase().includes(query));
 if(!files.length)return `<p class="empty-list">${query?'No matching files.':kind==='personal'?'Your personal skills will appear here.':kind==='shared'?'No matching skills.':'No context files found.'}</p>`;
 return files.map(value=>kind==='shared'?`<div class="file-row">${icon('book')}<span><strong>${escape(value.title)}</strong><small>${escape(value.name)}</small></span></div>`:fileEntry(value,kind)).join('');
}
function fileBrowser(kind,title){
 const all=listedFiles(kind),source=kind==='shared'?undefined:kind==='personal'?inventory.skills:inventory.context;
 return `<section class="file-browser" aria-label="${title}"><div class="browser-heading"><h3>${title}</h3><span>${all.length}${source?.truncated?'+':''}</span></div>${all.length>4?`<label class="search">${icon('search')}<span class="sr-only">Search ${title.toLowerCase()}</span><input type="search" data-search="${kind}" aria-label="Search ${title.toLowerCase()}" placeholder="Search ${title.toLowerCase()}" value="${escape(searches[kind])}"></label>`:''}<div class="file-scroll" id="${kind}-list" tabindex="0" aria-label="${title} list">${listRows(kind)}</div>${source?.incomplete||source?.truncated?'<p class="list-note">Some files are not listed. Open your index for more routes.</p>':''}</section>`;
}
function fileLink(key,name){const present=status?.[{index:'index',memory:'memory',connections:'connections'}[key]];return extensions?.files&&fileTargets[key]?`<button class="core-link" data-file="${key}">${name}${icon('external')}</button>`:`<span class="core-link">${name}</span>${!present?'<small class="missing-file">Not found</small>':''}`;}
function contextMap(){
 return `<div class="context-map" aria-label="The AIOS index routes each task to memory, connections and relevant context"><div class="map-start"><span class="map-icon">${icon('folder')}</span><div><h3>Context index ${infoTip('index','About the context index','AIOS.md is the starting point. It routes your agent to the context relevant to the task.')}</h3>${fileLink('index','AIOS.md')}</div><span class="map-caption">Read at the start of a chat</span></div><div class="map-connectors" aria-hidden="true"><span>↓</span><span>↓</span><span>↓</span></div><div class="map-routes"><div>${icon('memory')}<h3>Memory ${infoTip('memory','About memory','Lasting decisions and corrections that should carry into future conversations.')}</h3>${fileLink('memory','MEMORY.md')}</div><div>${icon('connections')}<h3>Connections ${infoTip('connections','About connections','Where your tools and accounts are, and the permissions your agent should follow.')}</h3>${fileLink('connections','CONNECTIONS.md')}</div><div>${icon('file')}<h3>Context files ${infoTip('spaces','About context files and spaces','Topic files about you, your business or your work. A space groups related context or points to another source. AIOS.md tells your agent when to use it.')}</h3><span class="core-link">context/</span><p class="route-description">People, business and spaces.</p></div></div><p class="map-note">Your agent follows the relevant routes for each task.</p></div>${fileBrowser('context','Context files')}`;
}
function skills(){
 return `<div class="skills-panel"><section class="skill-section"><div class="skill-section-heading"><h2>AIOS skills</h2><span>AIOS ${catalog.version}</span></div><p class="section-description">Shared methods supplied with AIOS.</p>${fileBrowser('shared','AIOS skills')}</section><section class="skill-section"><div class="skill-section-heading"><h2>Your skills</h2><span>Stored with your context</span></div><p class="section-description">Personal methods in your AIOS folder. Your agent checks ownership and includes approved files when syncing.</p>${fileBrowser('personal','Personal skills')}</section><p class="panel-note">AIOS skills update with the plugin. Project skills stay with each project. Your agent must discover personal skills before it can use them.</p></div>`;
}
function openContext(){
 if(extensions?.files&&fileTargets.index)return `<div class="chat-action"><button class="primary" data-file="index">${icon('folder')}Open context${icon('external')}</button><p class="action-note">Opens AIOS.md in your file editor.</p></div>`;
 return chatAction('context','Open context in chat');
}
function pageHeading(title,lead,action=''){
 return `<header class="page-heading"><div><h1>${title}</h1><p class="lead">${lead}</p></div>${action?`<div class="page-action">${action}</div>`:''}</header>`;
}
function overview(){
 return `<div class="page content-page overview-page">${pageHeading('Your context.','The context your agent uses for each new chat.',openContext())}<div class="context-summary">${badge(status?.localReady?'good':status?'error':'pending',status?.localReady?'Context ready':'Context needs setup')}<span>${inventory.context?.files?.length??0} context file${inventory.context?.files?.length===1?'':'s'}</span>${!status?.localReady?'<button class="text-button" data-view="setup">Open setup '+icon('arrow')+'</button>':''}</div><p class="overview-explanation">AIOS gives each new conversation the context it needs. Start with the index, then open the relevant files.</p>${contextMap()}</div>`;
}
function skillsPage(){
 return `<div class="page content-page skills-page">${pageHeading('Skills.','AIOS methods and the personal skills you add.')}${skills()}</div>`;
}
function syncPage(){
 return `<div class="page content-page sync-page">${pageHeading('Sync.','Back up your context and personal skills on GitHub.')}${syncCard()}</div>`;
}
function updateCheck(){document.querySelector('#local-check').textContent=status?`Updated ${new Date(status.checkedAt).toLocaleTimeString('en-GB')}`:'Checking your context';}
function render(){
 const details=[...main.querySelectorAll('details')].map(element=>[element.id,element.open]),scroll=[...main.querySelectorAll('.file-scroll')].map(element=>[element.id,element.scrollTop]);
 const active=document.activeElement,focus=active?.dataset?.file?{file:active.dataset.file}:active?.dataset?.chat?{chat:active.dataset.chat}:active?.dataset?.search?{search:active.dataset.search,start:active.selectionStart,end:active.selectionEnd}:active?.tagName==='SUMMARY'?{details:active.parentElement.id}:active?.hasAttribute?.('data-check-git')?{check:true}:active?.dataset?.info?{info:active.dataset.info}:undefined;
 main.innerHTML=({setup,overview,skills:skillsPage,sync:syncPage}[view]||overview)();
 for(const [id,open] of details){const element=document.getElementById(id);if(element)element.open=open;}
 for(const [id,top] of scroll){const element=document.getElementById(id);if(element)element.scrollTop=top;}
 document.querySelectorAll('nav [data-view]').forEach(button=>{if(button.dataset.view===view)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
 let next;
 if(focus?.file)next=[...main.querySelectorAll('[data-file]')].find(element=>element.dataset.file===focus.file);
 if(focus?.chat)next=main.querySelector(`[data-chat="${focus.chat}"]`);
 if(focus?.search)next=main.querySelector(`[data-search="${focus.search}"]`);
 if(focus?.details)next=document.querySelector(`#${focus.details} > summary`);
 if(focus?.check)next=main.querySelector('[data-check-git]');
 if(focus?.info)next=[...main.querySelectorAll('[data-info]')].find(element=>element.dataset.info===focus.info);
 next?.focus({preventScroll:true});
 if(focus?.search&&next)next.setSelectionRange(focus.start,focus.end);
 updateCheck();
}
function receiveResult(result){
 fileTargets=result?._meta?.['aios/fileTargets']||{};inventory=result?._meta?.['aios/inventory']||{};gitDetails=result?._meta?.['aios/git']||{};
 const next=result?.structuredContent;if(!next?.owner)return;status=next;
 if(!chosen)view=next.localReady?'overview':'setup';
 const nextSignature=JSON.stringify({...next,checkedAt:undefined,fileTargets,inventory,gitDetails});
 if(signature!==nextSignature){signature=nextSignature;render();}else updateCheck();
 const key=gitDetails.repository?.url+'#'+gitDetails.branch+'#'+gitDetails.commit?.id;
 if(next.git?.connected&&['not_checked','stale'].includes(next.git.remote?.state)&&!autoChecks.has(key)){
  autoChecks.add(key);queueMicrotask(checkGit);
 }
}
async function checkGit(){
 if(gitBusy)return;gitBusy=true;gitError=false;render();
 try{
  if(app&&app.getHostCapabilities()?.serverTools)receiveResult(await app.callServerTool({name:'aios_git_check',arguments:{}}));
  else if(window.parent===window&&location.hostname==='127.0.0.1'){
   const response=await fetch('/api/git-check');if(!response.ok)throw Error('GitHub check unavailable');receiveResult(await response.json());
  }else throw Error('GitHub check unavailable');
 }catch{gitError=true;document.querySelector('#connection-status').textContent='GitHub could not be checked. Ask your agent to check your sync.';}
 finally{gitBusy=false;render();}
}
async function refresh(){
 if(busy||gitBusy||document.hidden)return;busy=true;
 try{
  if(app&&app.getHostCapabilities()?.serverTools)receiveResult(await app.callServerTool({name:'aios_context_status',arguments:{}}));
  else if(window.parent===window&&location.hostname==='127.0.0.1'){
   const response=await fetch('/api/status');if(!response.ok)throw Error('Status unavailable');receiveResult(await response.json());
  }
  document.querySelector('#local-check').classList.remove('unavailable');
 }catch{const check=document.querySelector('#local-check');check.textContent='Update unavailable · showing last check';check.classList.add('unavailable');}
 finally{busy=false;}
}
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&event.target.matches?.('[data-info]'))event.target.blur();});
document.addEventListener('input',event=>{const kind=event.target.dataset?.search;if(!kind)return;searches[kind]=event.target.value;document.querySelector('#'+kind+'-list').innerHTML=listRows(kind);});
document.addEventListener('click',async event=>{
 const nav=event.target.closest('[data-view]');if(nav){chosen=true;view=nav.dataset.view;render();main.focus({preventScroll:true});return;}
 if(event.target.closest('[data-check-git]')){await checkGit();return;}
 const repo=event.target.closest('[data-repo]');
 if(repo&&app){event.preventDefault();try{const result=await app.openLink({url:repo.href});if(result.isError)throw Error('Link unavailable');}catch{document.querySelector('#connection-status').textContent='GitHub could not be opened. Use the repo link in your browser.';}return;}
 const file=event.target.closest('[data-file]');
 if(file){const target=fileTargets[file.dataset.file];if(!extensions?.files||!target||opening)return;opening=true;file.disabled=true;
  try{await extensions.files.open(target);document.querySelector('#connection-status').textContent='Opened in your file editor.';}
  catch{document.querySelector('#connection-status').textContent='The file could not be opened. Ask your agent to open it.';}
  finally{opening=false;file.disabled=false;}return;
 }
 const button=event.target.closest('[data-chat]'),kind=button?.dataset.chat;
 if(!button||!extensions?.message||inFlight||requests[kind])return;
 inFlight=kind;requests[kind]='sending';render();
 try{const result=await extensions.message.send({role:'user',content:[{type:'text',text:prompts[kind]}],_meta:{'openai/message':{target:'active',send:true}}});if(result.isError)throw Error('Unconfirmed');requests[kind]='sent';}
 catch{requests[kind]='uncertain';}
 finally{inFlight=undefined;render();document.querySelector('#connection-status').textContent=requests[kind]==='sent'?'Request sent. Continue in your agent chat.':'Request delivery could not be confirmed.';}
});
render();
if(window.parent!==window){
 app=new App({name:'AIOS',version:catalog.version});extensions=new OpenAIExtensions(app);
 function hostContext(context){if(context?.theme)applyDocumentTheme(context.theme);if(context?.styles?.variables)applyHostStyleVariables(context.styles.variables);}
 app.addEventListener('hostcontextchanged',hostContext);app.ontoolresult=receiveResult;
 try{await app.connect();hostContext(app.getHostContext());render();}catch{document.querySelector('#connection-status').textContent='Chat connection unavailable.';}
}
await refresh();setInterval(refresh,5000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
