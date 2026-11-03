const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
function browser(width=390,height=844){
 const events={},viewportEvents={},rects=[];let callback;
 const context=new Proxy({clearRect:(...r)=>rects.push(r),createRadialGradient:()=>({addColorStop(){}})},{get:(t,k)=>k in t?t[k]:()=>{},set:(t,k,v)=>(t[k]=v,true)});
 const parent={clientWidth:width,clientHeight:height},canvas={parentElement:parent,dataset:{},getContext:()=>context};
 const document={hidden:false,documentElement:{dataset:{theme:'dark'}},getElementById:()=>canvas,addEventListener:(n,f)=>events[n]=f};
 const window={addEventListener:(n,f)=>events[n]=f,visualViewport:{addEventListener:(n,f)=>viewportEvents[n]=f}};
 vm.runInNewContext(fs.readFileSync('js/beacon-motion.js','utf8'),{document,window,devicePixelRatio:1,matchMedia:()=>({matches:false,addEventListener(){}}),MutationObserver:class{observe(){}},requestAnimationFrame:f=>(callback=f,1),cancelAnimationFrame(){},fetch:()=>new Promise(()=>{})});
 return{parent,canvas,events,viewportEvents,rects,tick:now=>callback(now)};
}
test('mobile toolbar resize preserves the globe projection, while rotation resizes it',()=>{
 const b=browser();assert.deepEqual(b.rects.at(-1),[0,0,390,844]);
 b.parent.clientHeight=744;b.viewportEvents.resize();assert.equal(b.canvas.height,844);
 b.parent.clientWidth=844;b.parent.clientHeight=390;b.events.resize();assert.equal(b.canvas.width,844);assert.equal(b.canvas.height,390);
});
test('desktop window resizing updates the globe dimensions',()=>{const b=browser(1440,900);b.parent.clientHeight=700;b.events.resize();assert.equal(b.canvas.height,700)});
test('returning after a stalled frame does not skip ahead to another globe phase',()=>{const b=browser();b.tick(100);b.tick(30100);assert.equal(b.canvas.dataset.phase,'world')});
