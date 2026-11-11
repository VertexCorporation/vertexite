'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm');
const fs=require('node:fs');
const html=fs.readFileSync(process.argv[2]||require('node:path').join(__dirname,'../verify.html'),'utf8');
const code=html.match(/<script>([\s\S]*?)<\/script>/)[1];
function environment(path,response,query=''){
 let loaded,redirect=null;
 const nodes=new Map();const node=k=>{if(!nodes.has(k))nodes.set(k,{style:{},textContent:''});return nodes.get(k)};
 const ctx={console,URL,URLSearchParams,Object,Date,Number,encodeURIComponent,navigator:{language:'en'},window:{location:{pathname:path,search:query,replace:v=>redirect=v}},document:{title:'',addEventListener:(_,fn)=>loaded=fn,querySelector:node,querySelectorAll:k=>[node(k+'0'),node(k+'1'),node(k+'2')],getElementById:node},fetch:async url=>{ctx.request=new URL(url);return {ok:true,json:async()=>response}}};
 vm.runInNewContext(code,ctx);
 return {run:()=>loaded(),ctx,nodes,redirect:()=>redirect};
}
test('all lowercase certificate routes resolve server aliases, including html/trailing forms',async()=>{
 for(const path of ['/certificates/merit-abc12345','/certificates/merit-abc12345.html','/certificates/merit-abc12345/']){
 const e=environment(path,{valid:true,certificateId:'AbC_Def',certificateType:'merit',name:'Recipient',publicSlug:'merit-abc12345'});
 await e.run();assert.equal(e.ctx.request.searchParams.get('slug'),'merit-abc12345');assert.equal(e.redirect(),'/verify/AbC_Def');
 }
});
test('invalid, revoked and mismatched aliases cannot redirect',async()=>{
 for(const data of [{valid:false,revoked:true},{valid:true,certificateId:'../unsafe',certificateType:'merit',name:'Recipient',publicSlug:'merit-abc12345'},{valid:true,certificateId:'safe',certificateType:'merit',name:'Recipient',publicSlug:'merit-other000'}]){
 const e=environment('/certificates/merit-abc12345',data);await e.run();assert.equal(e.redirect(),null);assert.equal(e.nodes.get('errorState').style.display,'block');
 }
});
test('verify URLs retain case-sensitive IDs and do not redirect',async()=>{
 const e=environment('/verify/AbC_Def',{valid:true,certificateId:'AbC_Def',certificateType:'merit',name:'Recipient'});
 await e.run();assert.equal(e.ctx.request.searchParams.get('id'),'AbC_Def');assert.equal(e.redirect(),null);assert.equal(e.nodes.get('certName').textContent,'Recipient');
});
