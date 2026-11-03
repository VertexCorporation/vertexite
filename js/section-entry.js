/* Resolve section links before first paint; never hide the destination page. */
(function(){'use strict';
const sections=['home','projects','ecosystem','team','vision','partners','news-section','more-info'];
function entryTarget(search,hash=''){const legacy=new URLSearchParams(search).get('section');let fragment;try{fragment=decodeURIComponent(hash.slice(1));}catch{return null;}return sections.includes(fragment)?fragment:sections.includes(legacy)?legacy:null;}
if(typeof module==='object'&&module.exports){module.exports={entryTarget};return;}
const id=entryTarget(location.search,location.hash);if(!id)return;
const url=new URL(location.href);url.searchParams.delete('section');url.hash='';
// Prevent the browser and the page scripts from initiating competing scrolls.
history.replaceState(history.state,'',url.pathname+url.search);
const style=document.createElement('style');style.textContent='html{scroll-behavior:auto!important}.section-entry-target>.wrap{animation:none!important}';document.head.append(style);
let canceled=false;
function cancel(){canceled=true;}
window.addEventListener('wheel',cancel,{once:true,passive:true});document.addEventListener('pointerdown',cancel,{once:true,capture:true,passive:true});document.addEventListener('keydown',cancel,{once:true});
function enter(){
 const target=document.getElementById(id);url.hash=id;history.replaceState(history.state,'',url.pathname+url.search+url.hash);
 if(target&&!canceled){
  target.classList.add('section-entry-target','section-revealed');
  const heading=target.querySelector('.section-head h2,.section-head h1,.team-head h2,.vision-heading h2,.wrap > h2,.wrap > h1')||target;
  const header=document.getElementById('siteHeader');
  const top=id==='home'?0:Math.max(0,heading.getBoundingClientRect().top+window.scrollY-(header?.getBoundingClientRect().height||68)-20);
  window.scrollTo({top,behavior:'instant'});
  if(!heading.hasAttribute('tabindex'))heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});
 }
 requestAnimationFrame(()=>requestAnimationFrame(()=>style.remove()));
 window.removeEventListener('wheel',cancel);document.removeEventListener('pointerdown',cancel,true);document.removeEventListener('keydown',cancel);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enter,{once:true});else enter();
})();
