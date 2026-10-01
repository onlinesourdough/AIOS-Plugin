import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve } from 'node:path';
const exec = promisify(execFile);
const checks = new Map(), pending = new Map();
const environment = () => ({...process.env, GIT_OPTIONAL_LOCKS:'0', GIT_TERMINAL_PROMPT:'0', GCM_INTERACTIVE:'Never', GIT_SSH_COMMAND:'ssh -oBatchMode=yes -oStrictHostKeyChecking=yes'});
async function git(root, args) {
  const output=(await exec('git', ['-C',root,'-c','core.fsmonitor=false',...args], {timeout:1500, maxBuffer:65536, env:environment()})).stdout;
  return args.includes('--porcelain=v1')?output:output.trim();
}
export function githubRepository(value) {
  if (typeof value !== 'string' || /[\s\x00-\x1f?#]/.test(value)) return;
  const match = value.match(/^(?:https:\/\/github\.com\/|git@github\.com:|ssh:\/\/git@github\.com\/)([A-Za-z0-9][A-Za-z0-9-]*)\/([A-Za-z0-9_.-]+?)(?:\.git)?$/);
  if (!match || ['.','..'].includes(match[2])) return;
  return {name:match[1]+'/'+match[2], url:'https://github.com/'+match[1]+'/'+match[2]};
}
async function remoteHead(root, url, ref) {
  // Query one GitHub branch without fetching objects, changing refs or prompting.
  const result = await exec('git', ['-C',root,'-c','protocol.allow=never','-c','protocol.https.allow=always','-c','protocol.ssh.allow=always','ls-remote','--exit-code',url,ref], {timeout:5000,maxBuffer:65536,env:environment()});
  const rows = result.stdout.trim().split('\n').map(line=>line.split(/\s+/));
  if (rows.length !== 1 || rows[0][1] !== ref || !/^[a-f0-9]{40,64}$/.test(rows[0][0])) throw Error('Branch could not be verified');
  return rows[0][0];
}
export async function readGitStatus(root, {checkRemote=false, lookupRemote=remoteHead}={}) {
  const summary = {state:'not_configured',connected:false,remote:{state:'not_checked'}}, details = {};
  try {
    let top;
    try { top=await git(root,['rev-parse','--show-toplevel']); } catch { return {summary,details}; }
    if (resolve(top) !== root) return {summary,details};
    const changed = await git(root,['status','--porcelain=v1','-z','--untracked-files=normal']);
    const dirty = Boolean(changed);
    summary.changedFiles=0;
    const records=changed.split('\0');
    for(let i=0;i<records.length;i++)if(records[i]){
      summary.changedFiles++;
      // A rename/copy adds an unprefixed old path to porcelain -z output.
      if(/[RC]/.test(records[i].slice(0,2)))i++;
    }
    let head;
    try {
      const [id,date] = (await git(root,['log','-1','--format=%H%x00%cI'])).split('\0');
      if (/^[a-f0-9]{40,64}$/.test(id)) { head=id; details.commit={id:id.slice(0,7),date}; }
    } catch { summary.state='no_commit'; return {summary,details}; }
    let branch;
    try { branch=await git(root,['symbolic-ref','--quiet','--short','HEAD']); }
    catch { summary.state='detached'; return {summary,details}; }
    details.branch=branch;
    let remote, ref, url;
    try {
      remote=await git(root,['config','--get',`branch.${branch}.remote`]);
      ref=await git(root,['config','--get',`branch.${branch}.merge`]);
      if (!remote || remote==='.' || !ref.startsWith('refs/heads/')) throw Error('No remote branch');
      await git(root,['check-ref-format',ref]);
      // Resolve configured URL rewrites before accepting the destination.
      url=await git(root,['remote','get-url',remote]);
    } catch { summary.state=dirty?'local_changes':'no_upstream'; return {summary,details}; }
    const repository=githubRepository(url);
    if (repository) { summary.connected=true; details.repository=repository; }
    try {
      const [ahead,behind]=(await git(root,['rev-list','--left-right','--count','HEAD...@{upstream}'])).split(/\s+/).map(Number);
      summary.ahead=ahead; summary.behind=behind;
      summary.state=dirty?'local_changes':ahead||behind?'differs_from_cached_remote':'matches_cached_remote';
    } catch { summary.state=dirty?'local_changes':'no_upstream'; }
    if (!repository) return {summary,details};
    const key=[url,ref,head].join('\0');
    let cached=checks.get(root);
    if (checkRemote) {
      const pendingKey=root+'\0'+key;
      if (!pending.has(pendingKey)) {
        const request=(async()=>{
          try { const remoteHead=await lookupRemote(root,url,ref);if(!/^[a-f0-9]{40,64}$/.test(remoteHead))throw Error('Invalid remote commit');return {key,checkedAt:new Date().toISOString(),remoteHead,state:'checked'}; }
          catch { return {key,checkedAt:new Date().toISOString(),state:'unavailable'}; }
        })();
        pending.set(pendingKey,request);
      }
      try { cached=await pending.get(pendingKey); checks.set(root,cached); }
      finally { pending.delete(pendingKey); }
      if (checks.size>8) checks.delete(checks.keys().next().value);
    }
    if (cached?.key===key) {
      const stale=Date.now()-Date.parse(cached.checkedAt)>300000;
      summary.remote={state:stale?'stale':cached.state==='unavailable'?'unavailable':cached.remoteHead===head?'matches':'differs',checkedAt:cached.checkedAt};
    }
  } catch { summary.state='unavailable'; }
  return {summary,details};
}
