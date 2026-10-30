'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../js/news.js'),'utf8').replace('export { fetchNews };','');
function setup(options={}) {
 const entries=options.entries||new Map();let fetches=0;
 const cache={
  async match(key){return entries.get(key)?.clone();},
  async put(key,res){if(options.quota)throw Error('quota');entries.set(key,res);},
  async delete(key){return entries.delete(typeof key==='string'?key:key.url);},
  async keys(){return [...entries.keys()].map(url=>({url}));}
 };
 const context={URL,Response,Blob,AbortController,console,location:{href:'https://vertexishere.com/en/'},
  window:{caches:{open:async()=>{if(options.noStorage)throw Error('blocked');return cache;}}},
  document:{readyState:'loading',getElementById(){return null;},addEventListener(){}},setTimeout,clearTimeout,
  fetch:async()=>{fetches++;if(options.fail)throw Error('network');return new Response(new Blob(['cover'],{type:'image/png'}));}
 };
 vm.createContext(context);vm.runInContext(source+'\nthis.loadCover=getCoverSource;this.mountCover=setCoverImage;',context);
 return {load:context.loadCover,mount:context.mountCover,entries,fetches:()=>fetches};
}
const cover='https://images.example/cover-v1.png';
test('a successful cover persists across page reloads and avoids a second download',async()=>{
 const first=setup();const initial=await first.load(cover);
 assert.equal(first.fetches(),1);assert.equal(initial.cached,false);assert.match(initial.url,/^blob:/);
 const repeated=await first.load(cover);assert.equal(repeated.cached,true);assert.equal(repeated.url,initial.url);
 const reload=setup({entries:first.entries});const saved=await reload.load(cover);
 assert.equal(reload.fetches(),0);assert.equal(saved.cached,true);assert.match(saved.url,/^blob:/);
});
test('concurrent card renders share a single download',async()=>{
 const page=setup();await Promise.all([page.load(cover),page.load(cover),page.load(cover)]);
 assert.equal(page.fetches(),1);
});
test('expired covers refresh, and changed paths keep distinct images',async()=>{
 const page=setup();await page.load(cover);
 const [key]=page.entries.keys();page.entries.set(key,new Response(new Blob(['old'],{type:'image/png'}),{headers:{'x-vertex-saved-at':String(Date.now()-8*86400000)}}));
 const reload=setup({entries:page.entries});assert.equal((await reload.load(cover)).cached,false);
 await reload.load('https://images.example/cover-v2.png');assert.equal(reload.fetches(),2);assert.equal(reload.entries.size,2);
});
test('blocked storage, CORS failures and quota failures retain a usable cover',async()=>{
 for(const options of [{noStorage:true},{fail:true},{quota:true}]){
  const page=setup(options);const loaded=await page.load(cover);
  assert.ok(loaded.url===cover||loaded.url.startsWith('blob:'));assert.equal(page.entries.size,0);
 }
});
test('persistent cache evicts old entries rather than growing without limit',async()=>{
 const page=setup();for(let i=0;i<51;i++)await page.load('https://images.example/cover-'+i+'.png');
 assert.equal(page.entries.size,48);
});
test('cached covers keep shimmer until the image load event and then crossfade',async()=>{
 const first=setup();await first.load(cover);const page=setup({entries:first.entries});
 const classes=new Set(),events={};const parent={classList:{add:c=>classes.add(c),remove:c=>classes.delete(c)}};
 const img={parentElement:parent,complete:false,naturalWidth:0,addEventListener:(event,fn)=>{events[event]=fn;}};
 page.mount(img,{cover:{en:cover}},'en');
 assert.equal(classes.has('is-loading'),true);
 await new Promise(resolve=>setTimeout(resolve,10));
 assert.equal(classes.has('is-loading'),true);assert.equal(classes.has('is-cached'),false);assert.equal(page.fetches(),0);
 events.load();assert.equal(classes.has('is-loading'),false);
});
test('network covers show shimmer immediately and keep it while a fallback loads',async()=>{
 const page=setup();const classes=new Set(),events={};const parent={classList:{add:c=>classes.add(c),remove:c=>classes.delete(c)}};
 let src='';const img={parentElement:parent,complete:false,naturalWidth:0,addEventListener:(event,fn)=>{events[event]=fn;},get src(){return src;},set src(v){src=new URL(v,'https://vertexishere.com/en/').href;}};
 page.mount(img,{cover:{en:cover}},'en');assert.ok(classes.has('is-loading'));
 await new Promise(resolve=>setTimeout(resolve,10));assert.equal(page.fetches(),1);assert.ok(classes.has('is-loading'));
 events.error();assert.ok(classes.has('is-loading'));events.load();assert.equal(classes.has('is-loading'),false);
});
