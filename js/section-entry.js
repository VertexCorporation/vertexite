/* First-party cross-page section navigation: reveal only the settled destination. */
(function(){'use strict';
const sections=['home','projects','ecosystem','team','vision','partners','news-section','more-info'];
function entryTarget(search){const id=new URLSearchParams(search).get('section');return sections.includes(id)?id:null;}
function stablePosition(previous,current){return Number.isFinite(previous)&&Math.abs(previous-current)<.75;}
if(typeof module==='object'&&module.exports){module.exports={entryTarget,stablePosition};return;}
const id=entryTarget(location.search);if(!id)return;
const root=document.documentElement;root.classList.add('section-entry-pending');
const style=document.createElement('style');style.textContent='html.section-entry-pending{scroll-behavior:auto!important}html.section-entry-pending main,html.section-entry-pending footer{visibility:hidden!important}html.section-entry-pending .section-revealed>.wrap,.section-entry-target>.wrap{animation:none!important}';document.head.append(style);
let canceled=false,raf=0,emergency=setTimeout(()=>{canceled=true;reveal();},4500);
function reveal(){clearTimeout(emergency);cancelAnimationFrame(raf);root.classList.remove('section-entry-pending');window.removeEventListener('wheel',cancel);document.removeEventListener('pointerdown',cancel,true);document.removeEventListener('keydown',cancel,true);}
function cancel(){canceled=true;reveal();}
window.addEventListener('wheel',cancel,{passive:true});document.addEventListener('pointerdown',cancel,{capture:true,passive:true});document.addEventListener('keydown',cancel,true);
function readyHero(){return new Promise(resolve=>{const stage=document.querySelector('.story-stage');if(!stage||stage.classList.contains('story-ready'))return resolve();const timer=setTimeout(done,1800),observer=new MutationObserver(()=>{if(stage.classList.contains('story-ready'))done();});function done(){observer.disconnect();clearTimeout(timer);resolve();}observer.observe(stage,{attributes:true,attributeFilter:['class']});});}
function headingFor(target){return target.querySelector('.section-head h2,.section-head h1,.team-head h2,.vision-heading h2,.wrap > h2,.wrap > h1')||target;}
function position(target){if(target.id==='home')return 0;const heading=headingFor(target),header=document.getElementById('siteHeader');return Math.max(0,heading.getBoundingClientRect().top+window.scrollY-(header?.getBoundingClientRect().height||68)-20);}
async function enter(){
 const target=document.getElementById(id);if(!target)return reveal();target.classList.add('section-entry-target');
 await Promise.all([readyHero(),document.fonts?Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]):Promise.resolve(),document.readyState==='complete'?Promise.resolve():new Promise(r=>{window.addEventListener('load',r,{once:true});setTimeout(r,1800);})]);
 if(canceled)return;
 const start=performance.now();let previous=null,stableSince=start;
 function settle(now){if(canceled)return;const goal=position(target);if(!stablePosition(previous,goal))stableSince=now;previous=goal;
 // Intermediate layout corrections happen behind the pending surface, never in front of the visitor.
 window.scrollTo({top:goal,behavior:'instant'});
 if(now-stableSince>=220&&now-start>=300||now-start>=1800){const url=new URL(location.href);url.searchParams.delete('section');url.hash=id;history.replaceState(history.state,'',url.pathname+url.search+url.hash);const heading=headingFor(target);if(!heading.hasAttribute('tabindex'))heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});reveal();return;}
 raf=requestAnimationFrame(settle);
 }
 raf=requestAnimationFrame(settle);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enter,{once:true});else enter();
})();
