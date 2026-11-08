'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync('js/solutions-contact.js','utf8');
async function fixture({available=true,blocked=false,fail=false}={}){
 let click,route,team=0;
 const popup={closed:false,location:{replace:value=>route=value},close(){}};
 const link={addEventListener:(_name,fn)=>click=fn,setAttribute(){},removeAttribute(){}};
 const sandbox={document:{querySelector:selector=>selector==='[data-solutions-contact]'?link:{click:()=>team++}},window:{open:()=>blocked?null:popup},Date,AbortSignal,
 fetch:async()=>{if(fail)throw Error();return {ok:true,json:async()=>({available,checkedAt:Date.now()})};}};
 vm.runInNewContext(source,sandbox);await click({button:0,preventDefault(){}});return {route,team,popup};
}
test('published corporate event opens booking with no opener access',async()=>{const f=await fixture();assert.equal(f.route,'https://cal.com/team/vertex/15-minutes-meeting');assert.equal(f.team,0);assert.equal(f.popup.opener,null);});
test('unpublished and failed probes open WhatsApp with a team fallback',async()=>{for(const data of [{available:false},{fail:true}]){const f=await fixture(data);assert.equal(f.route,'https://wa.me/447400412824');assert.equal(f.team,1);}});
test('blocked popup falls back to the team',async()=>{const f=await fixture({blocked:true});assert.equal(f.route,undefined);assert.equal(f.team,1);});
