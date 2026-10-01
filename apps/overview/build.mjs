import { build } from 'esbuild';
import { mkdir, readFile, writeFile, copyFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, join } from 'node:path';
const source=fileURLToPath(new URL('.',import.meta.url));
const root=resolve(source,'../..');
const version=JSON.parse(await readFile(join(root,'.codex-plugin/plugin.json'),'utf8')).version;
const authorPackage=JSON.parse(await readFile(join(source,'package.json'),'utf8'));
const lock=JSON.parse(await readFile(join(source,'package-lock.json'),'utf8'));
if(authorPackage.version!==version||lock.version!==version||lock.packages[''].version!==version)throw Error('Overview build package version drift');
const out=resolve(process.argv[2]||join(root,'runtime/overview'));
const catalog={version,skills:[]};
for(const folder of (await readdir(join(root,'skills'))).sort()){
 const text=await readFile(join(root,'skills',folder,'SKILL.md'),'utf8');
 const name=text.match(/^name: (aios-[a-z0-9-]+)$/m)?.[1];
 if(name!==folder)throw Error('Invalid canonical skill identity: '+folder);
 const title=name.slice(5).replaceAll('-',' ');
 catalog.skills.push({name,title:title[0].toUpperCase()+title.slice(1)});
}
const catalogPlugin={name:'canonical-skill-catalog',setup(builder){builder.onResolve({filter:/^\.\/skill-catalog\.json$/},()=>({path:'catalog',namespace:'aios'}));builder.onLoad({filter:/.*/,namespace:'aios'},()=>({contents:JSON.stringify(catalog),loader:'json'}));}};
await mkdir(out,{recursive:true});
await mkdir(join(out,'assets'),{recursive:true});
await copyFile(join(root,'assets/icon.png'),join(out,'assets/icon.png'));
await copyFile(join(root,'assets/branding/onlinesourdough-mark.svg'),join(out,'assets/onlinesourdough-mark.svg'));
const app=await build({absWorkingDir:source,entryPoints:['app.mjs'],bundle:true,format:'esm',platform:'browser',plugins:[catalogPlugin],write:false,minify:true,metafile:true});
const css=await build({absWorkingDir:source,entryPoints:['styles.css'],external:['__GEIST_SANS__','__GEIST_PIXEL__'],bundle:true,write:false,minify:true,metafile:true});
const fonts={};for(const [key,file] of [['__GEIST_SANS__','geist-sans-variable.woff2'],['__GEIST_PIXEL__','geist-pixel-square.woff2']])fonts[key]='data:font/woff2;base64,'+(await readFile(join(source,'assets/fonts',file))).toString('base64');
const style=Object.entries(fonts).reduce((value,[key,url])=>value.replaceAll(key,url),css.outputFiles[0].text);
const mark=(await readFile(join(root,'assets/branding/onlinesourdough-mark.svg'),'utf8')).replace('fill="#2b1b12"','fill="currentColor"').replace('<svg','<svg class="bread-mark" aria-hidden="true"');
const template=(await readFile(join(source,'index.html'),'utf8')).replaceAll('/*MARK*/',mark).replaceAll('/*VERSION*/',version);
await writeFile(join(out,'index.html'),template.replace('/*APP_CSS*/',()=>style).replace('/*APP_JS*/',()=>app.outputFiles[0].text.replaceAll('</script','<\\/script')));
const server=await build({absWorkingDir:source,entryPoints:['server.mjs'],bundle:true,minify:true,platform:'node',format:'esm',target:'node22',define:{__AIOS_VERSION__:JSON.stringify(version)},outfile:join(out,'server.mjs'),metafile:true});
// Retain licenses for every package that contributes source to either bundle.
const packageRoots=new Set();
for(const meta of [app.metafile,css.metafile,server.metafile])for(const input of Object.keys(meta.inputs)){
 const parts=input.split('/');const at=parts.lastIndexOf('node_modules');if(at<0)continue;
 packageRoots.add(parts.slice(0,at+(parts[at+1].startsWith('@')?3:2)).join('/'));
}
let notices='# Third-party notices\n\nBundled upstream packages retain their licenses below.\n';
for(const root of [...packageRoots].sort()){
 const info=JSON.parse(await readFile(join(source,root,'package.json'),'utf8'));
 let license;for(const name of ['LICENSE','LICENSE.md','LICENSE.txt','license','license.md','COPYING']){try{license=await readFile(join(source,root,name),'utf8');break;}catch{}}
 if(!license&&info.name==='@cfworker/json-schema')license=await readFile(join(source,'license-overrides/cfworker-json-schema-LICENSE'),'utf8');
 if(!license)throw new Error('Missing license text for '+info.name);
 notices+='\n## '+info.name+' '+info.version+'\n\n'+license+'\n';
}
notices+='\n## Geist fonts\n\n'+await readFile(join(source,'assets/fonts/LICENSE.txt'),'utf8');
await writeFile(join(out,'THIRD-PARTY-NOTICES.md'),notices);
console.log('Built the self-contained overview and stdio MCP server at '+out);
