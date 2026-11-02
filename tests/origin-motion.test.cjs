'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {sceneAt,unitNodes,nodeBirth,globeFrame}=require('../js/origin-motion.js');
const {entryTarget,stablePosition}=require('../js/section-entry.js');
test('Origin globe extends beyond both viewport edges at mobile and desktop sizes',()=>{
 for(const [width,height]of [[320,740],[390,844],[768,1024],[1440,900],[2560,1440]]){const f=globeFrame(width,height);assert.ok(f.cx-f.radius<=0);assert.ok(f.cx+f.radius>=width);}
});
test('nodes connect into a second world, which replaces the earth before the cycle resets',()=>{
 assert.equal(sceneAt(0).phase,'world');assert.equal(sceneAt(1).phase,'nodes');assert.equal(sceneAt(6).phase,'connections');const full=sceneAt(20);assert.equal(full.phase,'network');assert.ok(full.earth<.2&&full.shell>.95&&full.edges>.95);assert.equal(sceneAt(29).phase,'transition');assert.deepEqual(sceneAt(32),sceneAt(0));
});
test('early nodes appear across both hemispheres instead of starting offscreen at one pole',()=>{
 const nodes=unitNodes(),early=nodes.filter((p,i)=>nodeBirth(i,nodes.length)<3);assert.ok(early.length>20);assert.ok(Math.min(...early.map(p=>p[1]))<-.5);assert.ok(Math.max(...early.map(p=>p[1]))>.5);for(const n of nodes)assert.ok(Math.abs(Math.hypot(...n)-1)<1e-10);
});
test('cross-page entry accepts only real homepage sections and strips arbitrary targets',()=>{
 for(const id of ['home','projects','ecosystem','team','vision','partners','news-section','more-info'])assert.equal(entryTarget('?section='+id),id);for(const q of ['','?section=javascript:alert(1)','?section=origin-checkout','?section=../team'])assert.equal(entryTarget(q),null);
});
test('section entry waits through material layout changes before revealing',()=>{
 assert.equal(stablePosition(null,2400),false);assert.equal(stablePosition(2400,2540),false);assert.equal(stablePosition(2540,2540.4),true);assert.equal(stablePosition(2540,2541),false);
});
test('cross-page scroll corrections remain hidden until the final target is ready',async()=>{
 const fs=require('node:fs'),vm=require('node:vm');const classes=new Set(),frames=new Map(),scrolls=[],historyWrites=[];let scrollY=0,next=0;
 const heading={getBoundingClientRect:()=>({top:1200-scrollY}),hasAttribute:()=>false,setAttribute(){},focus(options){assert.equal(options.preventScroll,true);}};
 const target={id:'team',classList:{add(){}},querySelector:()=>heading};
 const root={classList:{add:n=>classes.add(n),remove:n=>classes.delete(n)}};
 const document={documentElement:root,readyState:'complete',fonts:{ready:Promise.resolve()},head:{append(){}},createElement:()=>({}),getElementById:id=>id==='team'?target:id==='siteHeader'?{getBoundingClientRect:()=>({height:68})}:null,querySelector:()=>({classList:{contains:()=>true}}),addEventListener(){},removeEventListener(){}};
 const window={get scrollY(){return scrollY;},addEventListener(){},removeEventListener(){},scrollTo({top}){scrolls.push({top,pending:classes.has('section-entry-pending')});scrollY=top;}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../js/section-entry.js'),'utf8'),{document,window,location:{search:'?section=team',href:'https://vertexishere.com/tr/?section=team'},history:{state:null,replaceState(_a,_b,url){historyWrites.push(url);}},URL,URLSearchParams,Number,Math,performance:{now:()=>0},setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:fn=>{frames.set(++next,fn);return next;},cancelAnimationFrame:id=>frames.delete(id)});
 assert.ok(classes.has('section-entry-pending'));
 await new Promise(setImmediate);
 for(let t=0;t<600&&frames.size;t+=40){const batch=[...frames.values()];frames.clear();for(const fn of batch)fn(t);await Promise.resolve();}
 assert.ok(scrolls.length>1);assert.ok(scrolls.every(s=>s.pending));assert.equal(scrollY,1112);assert.equal(classes.has('section-entry-pending'),false);assert.deepEqual(historyWrites,['/tr/#team']);
});
