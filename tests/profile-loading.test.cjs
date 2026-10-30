const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../js/team-profile.js'),'utf8');
const card={id:'chief-1',name:'Example Chief',biography:'First paragraph\n\nSecond paragraph',links:{}};
function fixture(cached,fail){
 const els=new Map();function element(){return {hidden:true,children:[],textContent:'',events:{},append(...x){this.children.push(...x)},replaceChildren(...x){this.children=x},addEventListener(e,fn){this.events[e]=fn},dispatchEvent(){}};}
 const el=id=>{if(!els.has(id))els.set(id,element());return els.get(id)};
 let requests=0;const cache={read:()=>cached?{value:{cards:[card]},age:0}:null,load:async(k,fn)=>({value:await fn()}),save(){},fetchJSON:async()=>{requests++;if(fail.value)throw Error('offline');return {result:{cards:[card]}}}};
 const context={URL,URLSearchParams,Event,console:{warn(){}},location:{pathname:'/tr/profile',search:'?id=chief-1'},document:{documentElement:{},getElementById:el,querySelectorAll:()=>[],createElement:element},window:{VertexPublicCache:cache,VertexTeamLinks:{biography:c=>c?.biography,roleTitle:()=> 'Chief',ordered:()=>[]}}};
 vm.runInNewContext(source,context);return {el,requests:()=>requests,tick:()=>new Promise(r=>setImmediate(r))};
}
test('homepage snapshot opens a biography without waiting for another network request',async()=>{
 const f=fixture(true,{value:true});await f.tick();assert.equal(f.requests(),0);assert.equal(f.el('vp-content').hidden,false);assert.equal(f.el('vp-name').textContent,'Example Chief');assert.equal(f.el('vp-bio').children.length,2);
});
test('direct profile entry recovers through retry after a failed network request',async()=>{
 const fail={value:true},f=fixture(false,fail);await f.tick();assert.equal(f.el('vp-content').hidden,true);const button=f.el('vp-error').children.at(-1);assert.equal(button.textContent,'Tekrar dene');fail.value=false;await button.events.click();assert.equal(f.el('vp-content').hidden,false);assert.equal(f.requests(),2);
});
