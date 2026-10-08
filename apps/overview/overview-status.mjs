import {homedir} from 'node:os';
import {contextStatus} from './context-status.mjs';
import {globalSkillInventory} from './skill-inventory.mjs';

export async function overviewStatus({includeTargets=false,checkRemote=false,userHome=homedir(),agentHome}={}){
 const status=await contextStatus(undefined,{includeTargets:true,includeInventory:true,checkRemote,userHome,agentHome});
 const ownerTargets={...status.fileTargets};
 const targets=includeTargets?(status.fileTargets??={}):undefined;
 status.inventory??={};
 status.inventory.globalSkills=await globalSkillInventory(userHome,targets,ownerTargets);
 if(!includeTargets)delete status.fileTargets;
 return status;
}
