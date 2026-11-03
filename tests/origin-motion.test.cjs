'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {sceneAt,unitNodes,nodeBirth,globeFrame}=require('../js/origin-motion.js');
const {entryTarget}=require('../js/section-entry.js');
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
test('fragment links take precedence over legacy query links',()=>{
 assert.equal(entryTarget('?section=team','#home'),'home');
 assert.equal(entryTarget('?lang=tr','#projects'),'projects');
 assert.equal(entryTarget('','#%E0%A4%A'),null);
});
test('legacy entry shows content immediately, positions once and keeps other query parameters',()=>{
 const fs=require('node:fs'),vm=require('node:vm'),historyWrites=[],scrolls=[],styles=[];let scrollY=0;
 const heading={getBoundingClientRect:()=>({top:1200-scrollY}),hasAttribute:()=>false,setAttribute(){},focus(options){assert.equal(options.preventScroll,true);}};
 const target={id:'team',classList:{add(){}},querySelector:()=>heading};
 const document={readyState:'complete',head:{append(style){styles.push(style.textContent);}},createElement:()=>({remove(){}}),getElementById:id=>id==='team'?target:id==='siteHeader'?{getBoundingClientRect:()=>({height:68})}:null,addEventListener(){},removeEventListener(){}};
 const window={get scrollY(){return scrollY;},addEventListener(){},removeEventListener(){},scrollTo({top}){scrolls.push(top);scrollY=top;}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../js/section-entry.js'),'utf8'),{document,window,location:{search:'?lang=tr&section=team',hash:'',href:'https://vertexishere.com/tr/?lang=tr&section=team'},history:{state:null,replaceState(_a,_b,url){historyWrites.push(url);}},URL,URLSearchParams,Math,requestAnimationFrame:fn=>fn()});
 assert.deepEqual(scrolls,[1112]);assert.deepEqual(historyWrites,['/tr/?lang=tr','/tr/?lang=tr#team']);
 assert.ok(styles.every(s=>!s.includes('visibility')&&!s.includes('opacity')));
});
