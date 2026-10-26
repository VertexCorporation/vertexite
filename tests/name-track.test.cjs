'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('js/site-team.js','utf8');
const fillSource=source.slice(source.indexOf('    function fill('),source.indexOf('    function names('));
function fixture(width,reduced=false){
 const classes=new Set(),block={},container={clientWidth:width,style:{}};
 const track={children:[],classList:{add:x=>classes.add(x),remove:x=>classes.delete(x)},
  style:{setProperty(k,v){this[k]=v;}},parentElement:container,
  closest:()=>block,replaceChildren(){this.children=[];},appendChild(node){this.children.push(node);},
  get scrollWidth(){return this.children.length*100;}};
 const document={getElementById:()=>track,createElement:()=>({setAttribute(){},prepend(){},
  getBoundingClientRect(){return {left:track.children.indexOf(this)*100};}}),
  createElementNS:()=>({setAttribute(){}})};
 const fill=vm.runInNewContext(fillSource+';fill',{document,window:{matchMedia:()=>({matches:reduced})}});
 return {fill:names=>fill('weeklyStarsTrack',names,'mod-item weekly-star'),track,container,classes,block};
}
test('one star stays centered with one real name even in a narrow viewport',()=>{
 const fx=fixture(40);fx.fill(['One']);
 assert.equal(fx.track.children.length,1);assert.equal(fx.track.style.animation,'none');
 assert.equal(fx.track.style.justifyContent,'center');assert.equal(fx.container.style.maskImage,'none');
});
test('several names that fit remain static, while overflowing names loop',()=>{
 const fx=fixture(250);fx.fill(['A','B']);
 assert.equal(fx.track.children.length,2);assert.equal(fx.track.style.animation,'none');
 fx.fill(['A','B','C']);assert.equal(fx.track.children.length,6);
 assert.equal(fx.track.style.animationName,'publicNamesLoop');assert(!fx.classes.has('names-static'));
});
test('resizing remeasures real names and removes old duplicates when the list fits',()=>{
 const fx=fixture(150);fx.fill(['A','B']);assert.equal(fx.track.children.length,4);
 fx.container.clientWidth=400;fx.fill(['A','B']);
 assert.equal(fx.track.children.length,2);assert.equal(fx.track.style.animation,'none');
 assert(fx.classes.has('names-static'));
});
test('reduced motion never duplicates names, and empty weeks hide their block',()=>{
 const fx=fixture(100,true);fx.fill(['A','B','C']);
 assert.equal(fx.track.children.length,3);assert.equal(fx.track.style.animation,'none');
 fx.fill([]);assert.equal(fx.block.hidden,true);assert.equal(fx.track.children.length,0);
});
