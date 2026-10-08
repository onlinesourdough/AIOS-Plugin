import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from '@modelcontextprotocol/ext-apps/server';
import { OpenAIExtensions } from '@openai/mcp-extensions/server';
import { readFile } from 'node:fs/promises';
import { overviewStatus } from './overview-status.mjs';
import { servePreview } from './preview-http.mjs';

const uri = 'ui://aios/overview';
const icons=[{src:'data:image/png;base64,'+(await readFile(new URL('./assets/icon.png',import.meta.url))).toString('base64'),mimeType:'image/png',sizes:['512x512']}];
const server = new McpServer({name: 'aios', version: __AIOS_VERSION__});
new OpenAIExtensions(server);

registerAppResource(server, 'aios', uri, {}, async () => ({
  contents: [{uri, mimeType: RESOURCE_MIME_TYPE,
    text: await readFile(new URL('./index.html', import.meta.url), 'utf8'),
    _meta: {ui: {csp: {connectDomains: [], resourceDomains: []}},
      'openai/ui': {preferredDisplayMode: 'fullscreen', availableDisplayModes: ['inline', 'fullscreen']}}}]
}));

async function statusResult(checkRemote=false){
 const {fileTargets={},inventory={},gitDetails={},...status}=await overviewStatus({includeTargets:true,checkRemote});
 return {content:[],structuredContent:status,_meta:{'aios/fileTargets':fileTargets,'aios/inventory':inventory,'aios/git':gitDetails}};
}

registerAppTool(server, 'aios_open', {
  title: 'AIOS',
  description: 'Open the AIOS context overview. It checks local availability and Git status and lists bounded local Markdown filenames for the interface; it cannot change the owner home.',
  inputSchema: {},
  annotations: {readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false},
  _meta: {ui: {resourceUri: uri}, 'openai/ui': {entrypoints: [{type: 'global',quickAction:{title:'AIOS',icons,target:{type:'tool',name:'aios_open'}}}, {type: 'thread'}]}}
}, async () => ({
  ...await statusResult(),
  content: [{type: 'text', text: 'AIOS context overview. The overview checks local availability and cached Git status. File names and editor targets are provided only to the interface; no owner-file contents or remote writes.'}]
}));

registerAppTool(server, 'aios_context_status', {
 title:'Refresh AIOS context status', description:'Read local owner availability and cached Git state. No context contents or remote fetch.',
 inputSchema:{}, annotations:{readOnlyHint:true,destructiveHint:false,idempotentHint:true,openWorldHint:false},
 _meta:{ui:{resourceUri:uri,visibility:['app']}}
}, ()=>statusResult());

registerAppTool(server, 'aios_git_check', {
 title:'Check AIOS GitHub sync', description:'Read the configured GitHub branch without fetching objects or pushing. Uses existing noninteractive Git access. No owner file or ref changes.',
 inputSchema:{}, annotations:{readOnlyHint:true,destructiveHint:false,idempotentHint:true,openWorldHint:true},
 _meta:{ui:{resourceUri:uri,visibility:['app']}}
}, ()=>statusResult(true));

if(process.argv[2]==='--preview'){
 const port=Number(process.argv[3]||43187);if(!Number.isInteger(port)||port<1024||port>65535)throw Error('Invalid preview port');
 servePreview(port);
}else await server.connect(new StdioServerTransport());
