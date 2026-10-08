import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { overviewStatus } from './overview-status.mjs';
export function servePreview(port,readStatus=(checkRemote=false)=>overviewStatus({checkRemote}),htmlUrl=new URL('./index.html',import.meta.url)){
 const server=createServer(async(req,res)=>{
  // Only the loopback origin can use this status endpoint. No writes or CORS.
  const host=`127.0.0.1:${port}`;
  if(req.method!=='GET'||req.headers.host!==host||(req.headers.origin&&req.headers.origin!==`http://${host}`)||(req.headers['sec-fetch-site']&& !['same-origin','none'].includes(req.headers['sec-fetch-site']))){res.writeHead(403);return res.end();}
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
  try{
   if(req.url==='/api/status'||req.url==='/api/git-check'){
    const {inventory={},gitDetails={},...status}=await readStatus(req.url==='/api/git-check');
    res.setHeader('Content-Type','application/json');
    return res.end(JSON.stringify({structuredContent:status,_meta:{'aios/inventory':inventory,'aios/git':gitDetails}}));
   }
   if(req.url==='/'||req.url==='/index.html'){res.setHeader('Content-Type','text/html;charset=utf-8');return res.end(await readFile(htmlUrl));}
   res.writeHead(404);res.end();
  }catch{res.writeHead(500);res.end('Preview unavailable');}
 });
 server.listen(port,'127.0.0.1',()=>console.log(`AIOS overview at http://127.0.0.1:${port}`));return server;
}
