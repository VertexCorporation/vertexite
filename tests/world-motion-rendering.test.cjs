const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const topology=JSON.parse(fs.readFileSync('assets/geo/countries-110m.json','utf8'));
async function renderer(name,reference=false,time=0,width=1440,dark=true){
 let callback,seed=42,trig=0,paints=0,ops=[],path=[];const events={};
 const math=Object.create(Math);math.random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
 for(const fn of ['sin','cos'])math[fn]=(...a)=>{trig++;return Math[fn](...a);};
 const ctx={clearRect(){ops=[];paints++;},setTransform(){},beginPath(){path=[];},moveTo(...p){path.push(['M',...p]);},lineTo(...p){path.push(['L',...p]);},arc(...p){path.push(['A',...p]);},stroke(){ops.push(['stroke',this.strokeStyle,this.lineWidth,path]);},fill(){ops.push(['fill',this.fillStyle,path]);},createRadialGradient(...p){const gradient={points:p,stops:[],addColorStop(...stop){this.stops.push(stop);}};return gradient;}};
 const parent={clientWidth:width,clientHeight:900},canvas={parentElement:parent,dataset:{},getContext:()=>ctx};
 const document={hidden:false,documentElement:{dataset:{theme:dark?'dark':'light'}},getElementById:()=>canvas,addEventListener:(n,f)=>events[n]=f};
 let source=fs.readFileSync(reference?`tests/fixtures/${name}-motion-reference.js`:`js/${name}-motion.js`,'utf8');source=source.replace('elapsed=0','elapsed='+time);
 const context={document,window:{addEventListener:(n,f)=>events[n]=f},devicePixelRatio:1,Math:math,matchMedia:()=>({matches:false,addEventListener(){}}),MutationObserver:class{observe(){}},requestAnimationFrame:f=>(callback=f,1),cancelAnimationFrame(){},fetch:()=>Promise.resolve({ok:true,json:()=>Promise.resolve(topology)})};
 vm.runInNewContext(source,context);for(let i=0;i<5;i++)await Promise.resolve();
 return{tick(now){callback(now);},get ops(){return JSON.stringify(ops)},get trig(){return trig},get paints(){return paints}};
}
test('Beacon and Origin preserve all coastline/grid/node/edge drawing commands at matching times',async()=>{
 for(const name of ['beacon','origin'])for(const time of [0,4,12,20,30])for(const [width,dark] of [[390,false],[1440,true]]){
  const before=await renderer(name,true,time,width,dark),after=await renderer(name,false,time,width,dark);
  assert.equal(name==='beacon'&&!dark?after.ops.replaceAll('187,151,0','244,201,93'):after.ops,before.ops,`${name} at ${time}s, width ${width}`);
 }
});
test('continuous globes paint each 60Hz display frame without the previous 33ms gate',async()=>{
 for(const name of ['beacon','origin']){const before=await renderer(name,true),after=await renderer(name),start=after.paints,oldStart=before.paints;
  for(let i=1;i<=60;i++){before.tick(i*1000/60);after.tick(i*1000/60);}
  assert.equal(after.paints-start,60);assert(before.paints-oldStart<=30);
 }
});
test('steady animation frames need only two base/shell sin/cos pairs, regardless of coastline complexity',async()=>{
 for(const name of ['beacon','origin']){const before=await renderer(name,true,18),after=await renderer(name,false,18),oldCount=before.trig,newCount=after.trig;before.tick(100);after.tick(100);
  assert(before.trig-oldCount>10000);assert(after.trig-newCount<200);
 }
});
