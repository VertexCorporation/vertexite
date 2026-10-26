// Outline paths from the same Tabler catalog used by Vertex Console.
(function(){'use strict';const paths={"sun":"\n  <path d=\"M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0\" />\n  <path d=\"M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7\" />\n","moon":"\n  <path d=\"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008\" />\n","chevron-down":"\n  <path d=\"M6 9l6 6l6 -6\" />\n","chevron-left":"\n  <path d=\"M15 6l-6 6l6 6\" />\n","chevron-right":"\n  <path d=\"M9 6l6 6l-6 6\" />\n","arrow-right":"\n  <path d=\"M5 12l14 0\" />\n  <path d=\"M13 18l6 -6\" />\n  <path d=\"M13 6l6 6\" />\n","x":"\n  <path d=\"M18 6l-12 12\" />\n  <path d=\"M6 6l12 12\" />\n","check":"\n  <path d=\"M5 12l5 5l10 -10\" />\n","language":"\n  <path d=\"M9 6.371c0 4.418 -2.239 6.629 -5 6.629\" />\n  <path d=\"M4 6.371h7\" />\n  <path d=\"M5 9c0 2.144 2.252 3.908 6 4\" />\n  <path d=\"M12 20l4 -9l4 9\" />\n  <path d=\"M19.1 18h-6.2\" />\n  <path d=\"M6.694 3l.793 .582\" />\n"};
function setIcon(el,name){if(!el||!paths[name])return;el.setAttribute('viewBox','0 0 24 24');el.setAttribute('fill','none');el.setAttribute('stroke','currentColor');el.setAttribute('stroke-width','1.8');el.setAttribute('stroke-linecap','round');el.setAttribute('stroke-linejoin','round');el.setAttribute('aria-hidden','true');el.innerHTML=paths[name];}
function init(){const favicon=document.getElementById('vertex-favicon');const browserTheme=matchMedia('(prefers-color-scheme:dark)');function sync(){if(favicon)favicon.href='/assets/favicon-'+(browserTheme.matches?'dark':'light')+'.svg';}sync();if(browserTheme.addEventListener)browserTheme.addEventListener('change',sync);else if(browserTheme.addListener)browserTheme.addListener(sync);
setIcon(document.getElementById('themeIconSun'),'sun');setIcon(document.getElementById('themeIconMoon'),'moon');setIcon(document.querySelector('#langBtn > svg'),'language');document.querySelectorAll('.chev').forEach(e=>setIcon(e,'chevron-down'));document.querySelectorAll('.team-nav.prev svg').forEach(e=>setIcon(e,'chevron-left'));document.querySelectorAll('.team-nav.next svg').forEach(e=>setIcon(e,'chevron-right'));

/* Localized desktop labels can exceed the minimum desktop breakpoint. */
(function fitNavigation(){
 const header=document.getElementById('siteHeader');
 const nav=header&&header.querySelector('.nav');
 const links=nav&&nav.querySelector('.nav-links');
 const brand=nav&&nav.querySelector('.brand');
 const right=nav&&nav.querySelector('.nav-right');
 if(!nav||!links||!brand||!right)return;
 function measure(){
  header.classList.remove('nav-condensed');
  if(window.innerWidth<1280)return;
  const style=getComputedStyle(nav);
  const measured=brand.getBoundingClientRect().width+
    links.scrollWidth+right.getBoundingClientRect().width+
    2*parseFloat(style.gap||'18');
  const available=nav.clientWidth-(parseFloat(style.paddingLeft)||0)-(parseFloat(style.paddingRight)||0);
  if(measured>available+1)header.classList.add('nav-condensed');
 }
 window.addEventListener('resize',measure,{passive:true});
 if(document.fonts)document.fonts.ready.then(measure);
 measure();
})();

/* In-page navigation: align the visible heading (not the section's outer padding).
   An overlaid mobile menu must never change the header's document height. */
(function initAnchorNavigation(){
 const header=document.getElementById('siteHeader');
 const main=document.querySelector('main');
 if(!header||!main)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function getTarget(hash){
  if(!hash||hash.length<2)return null;
  let id;
  try{id=decodeURIComponent(hash.slice(1));}catch(e){return null;}
  const node=document.getElementById(id);
  return node&&main.contains(node)?node:null;
 }
 function headingTop(target){
  const outer=target.getBoundingClientRect().top+window.scrollY;
  const heading=target.querySelector('.section-head h2,.section-head h1,.team-head h2,.vision-heading h2,.wrap > h2,.wrap > h1');
  if(heading){
   const rect=heading.getBoundingClientRect();
   // content-visibility:auto can skip an offscreen subtree.
   if(rect.height>0&&rect.width>0)return rect.top+window.scrollY;
  }
  return outer+(parseFloat(getComputedStyle(target).paddingTop)||0);
 }
 function navigate(hash,smooth){
  const target=getTarget(hash);
  if(!target)return false;
  const heading=target.id==='home'?0:headingTop(target);
  const headerHeight=header.getBoundingClientRect().height;
  const top=Math.max(0,heading-headerHeight-20);
  window.scrollTo({top,behavior:smooth&&!reduced.matches?'smooth':'instant'});
  return true;
 }
 document.addEventListener('click',function(event){
  const link=event.target.closest('a[href^="#"]');
  if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const hash=link.hash;
  if(!getTarget(hash))return;
  event.preventDefault();
  header.classList.remove('menu-open');
  const menuButton=header.querySelector('#menuBtn');
  if(menuButton)menuButton.setAttribute('aria-expanded','false');
  if(location.hash!==hash)history.pushState(null,'',hash);
  requestAnimationFrame(()=>navigate(hash,true));
 });
 window.addEventListener('popstate',()=>{if(location.hash)requestAnimationFrame(()=>navigate(location.hash,false));});
 window.addEventListener('hashchange',()=>{if(location.hash)requestAnimationFrame(()=>navigate(location.hash,false));});
 // Links arriving from another page must land on the title after layout settles.
 window.addEventListener('load',()=>{if(location.hash)requestAnimationFrame(()=>navigate(location.hash,false));},{once:true});
 window.addEventListener('pageshow',event=>{if(event.persisted&&location.hash)requestAnimationFrame(()=>navigate(location.hash,false));});
})();
if('IntersectionObserver' in window){const reveals=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('section-revealed');reveals.unobserve(e.target);}}),{threshold:.04});document.querySelectorAll('main > section:not(.hero):not(.stats):not(.partners-static), main > .cta-band').forEach(el=>reveals.observe(el));}
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const scrollStates=new WeakMap();
function fadeScrollbar(el,target,duration){
 let state=scrollStates.get(el);
 if(!state){state={value:0,frame:0,idle:0};scrollStates.set(el,state);}
 if(state.frame)cancelAnimationFrame(state.frame);
 if(reduced.matches){state.value=target;el.style.setProperty('--scrollbar-alpha',String(target));return;}
 const start=performance.now(),from=state.value;
 function frame(now){
  const t=Math.min(1,(now-start)/duration),smooth=t*t*(3-2*t);
  state.value=from+(target-from)*smooth;
  el.style.setProperty('--scrollbar-alpha',state.value.toFixed(3));
  state.frame=t<1?requestAnimationFrame(frame):0;
 }
 state.frame=requestAnimationFrame(frame);
}
document.addEventListener('scroll',function(event){
 const el=event.target===document?document.documentElement:event.target;
 if(!(el instanceof Element))return;
 let state=scrollStates.get(el);
 if(!state){state={value:0,frame:0,idle:0};scrollStates.set(el,state);}
 clearTimeout(state.idle);
 fadeScrollbar(el,1,120);
 state.idle=setTimeout(()=>fadeScrollbar(el,0,320),700);
},{capture:true,passive:true});
const cta=document.querySelector('.cta-band');
document.querySelectorAll('.cta-band,.vp-main,.profile-page').forEach(container=>{
 const isProfile=container.matches('.vp-main,.profile-page');
 const sky=document.createElement('div');sky.className=isProfile?'profile-skyline':'cta-skyline';sky.setAttribute('aria-hidden','true');
 let buildings='',windows='';const heights=[80,135,104,190,150,220,166,115,200,145,230,175,125,195,155,105];
 heights.forEach((height,i)=>{const x=i*92-10,w=66,ground=310,y=ground-height,mid=x+w/2,split=i%3===0;
 buildings+='<path class="city-building" d="M'+x+' '+ground+'V'+y+(split?'L'+mid+' '+(y-14)+'L'+(x+w)+' '+y:'H'+(x+w))+'V'+ground+'Z"/>';
 if(!split)buildings+='<path class="city-roof-detail" opacity=".6" d="M'+(x+7)+' '+y+'V'+(y-7)+'H'+(x+w-7)+'V'+y+(i%4===1?' M'+mid+' '+(y-7)+'v-16':'')+'"/>';
 for(let row=y+16;row<ground-12;row+=17)for(let col=x+10;col<x+w-8;col+=13){windows+='M'+col+' '+row+'h6v6h-6Z ';}
 });
 sky.innerHTML='<svg viewBox="0 0 1440 310" preserveAspectRatio="xMidYMax slice" fill="none" stroke="currentColor" stroke-width=".85"><g class="sky-clouds" opacity=".45"><path d="M-300 32h160m35 0h70 M100 66h140m30 0h50 M620 22h180m25 0h75 M1000 82h190"/><path transform="translate(1440)" d="M-300 32h160m35 0h70 M100 66h140m30 0h50 M620 22h180m25 0h75 M1000 82h190"/></g><g class="city-buildings">'+buildings+'<path class="city-ground" d="M0 310H1440"/><path class="city-windows" d="'+windows+'" opacity=".42" stroke-width=".65"/></g></svg>';
 if(isProfile){
  sky.querySelector('.sky-clouds').remove();
  const stage=document.createElement('div');stage.className='profile-stage';
  container.before(stage);stage.append(container,sky);
  // Stretch the skyline from the portrait's bottom to the footer, even when
  // translated content, fonts or the async biography change the page height.
  const svg=sky.querySelector('svg');
  svg.setAttribute('viewBox','0 73 1440 237');
  svg.setAttribute('preserveAspectRatio','none');
  // Public biographies load asynchronously. Delay the first skyline sizing
  // until the actual translated paragraphs have been mounted and laid out.
  const publicBiography=container.querySelector('#vp-content');
  if(publicBiography?.hidden)sky.style.visibility='hidden';
  let skylineMeasured=false;
  function fitProfileSkyline(){
   if(publicBiography?.hidden)return;
   const portrait=container.querySelector('.vp-photo,.profile-photo-box,.profile-heading>img');
   if(!portrait)return;
   let top=portrait.offsetHeight,node=portrait;
   while(node&&node!==stage){top+=node.offsetTop;node=node.offsetParent;}
   top=Math.max(0,top);
   stage.style.setProperty('--profile-skyline-top',top.toFixed(2)+'px');
   const height=Math.max(0,stage.getBoundingClientRect().height-top);
   if(!skylineMeasured){sky.style.transition='none';sky.style.height=height+'px';skylineMeasured=true;requestAnimationFrame(()=>{sky.style.transition='';});}
   else sky.style.height=height+'px';
   sky.style.visibility='visible';
  }
  container.addEventListener('vertex:profile-ready',fitProfileSkyline);
  if('ResizeObserver' in window){
   const observer=new ResizeObserver(fitProfileSkyline);
   observer.observe(container);
   const portrait=container.querySelector('.vp-photo,.profile-photo-box,.profile-heading>img');
   if(portrait)observer.observe(portrait);
  }
  window.addEventListener('resize',fitProfileSkyline,{passive:true});
  if(document.fonts)document.fonts.ready.then(fitProfileSkyline);
  fitProfileSkyline();
 }else container.appendChild(sky);
});
if(cta&&'IntersectionObserver' in window)new IntersectionObserver(es=>es.forEach(e=>cta.classList.toggle('geometry-active',e.isIntersecting&&!reduced.matches))).observe(cta);
const diagrams=document.querySelectorAll('[data-diagram]');if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('diagram-active',e.isIntersecting)),{threshold:.15});diagrams.forEach(el=>observer.observe(el));}
const players=document.querySelectorAll('lottie-player[data-lottie-src]');if(players.length&&!reduced.matches&&'IntersectionObserver' in window){let loading;const observer=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const p=e.target;if(!loading)loading=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='/js/vendor/lottie-player.js';s.onload=resolve;s.onerror=reject;document.head.appendChild(s);});loading.then(()=>{if(p.isConnected)p.setAttribute('src',p.dataset.lottieSrc);}).catch(()=>{});observer.unobserve(p);}),{rootMargin:'150px'});players.forEach(p=>observer.observe(p));}
function enhanceCards(){document.querySelectorAll('#teamTrack .team-card').forEach(card=>{const profile=card.querySelector('.team-profile-link')||card.querySelector('a[href*="/mustafa-caki"]');if(profile||card.classList.contains('has-profile')||card.dataset.profileSlug){if(profile)profile.classList.add('team-profile-link');card.classList.add('has-profile');card.classList.remove('profile-unavailable');delete card.dataset.profileAvailable;}else{card.dataset.profileAvailable='false';card.classList.add('profile-unavailable');card.classList.remove('has-profile');}const social=card.querySelector('.team-social');if(social&&!social.children.length)social.remove();});}
enhanceCards();const team=document.getElementById('teamTrack');if(team)new MutationObserver(enhanceCards).observe(team,{childList:true});
const panels=document.querySelectorAll('.lang-panel,.mobile-menu,.doctrine-modal-content,.success-modal-content');panels.forEach(p=>p.classList.add('console-panel'));
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();

/* Animate language navigation without changing regular link behavior. */
(function(){'use strict';var reduce=matchMedia('(prefers-reduced-motion: reduce)'),leaving=false;
document.addEventListener('click',function(e){var a=e.target.closest('.lang-panel a.lang-row[href]');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.hasAttribute('download')||leaving||reduce.matches)return;var url=new URL(a.href,location.href);if(url.origin!==location.origin||url.href===location.href)return;e.preventDefault();leaving=true;document.documentElement.classList.add('language-leaving');setTimeout(function(){location.assign(url.href)},160)});
window.addEventListener('pageshow',function(){leaving=false;document.documentElement.classList.remove('language-leaving')});})();

/* Public theme selector: Vertex Console anchored popover and single-open-surface behavior. */
(function () {
  'use strict';
  var labels = {
    tr:['Tema','Açık','Koyu','Sistem'],en:['Theme','Light','Dark','System'],
    de:['Design','Hell','Dunkel','System'],fr:['Thème','Clair','Sombre','Système'],
    es:['Tema','Claro','Oscuro','Sistema'],it:['Tema','Chiaro','Scuro','Sistema'],
    pt:['Tema','Claro','Escuro','Sistema'],nl:['Thema','Licht','Donker','Systeem'],
    ru:['Тема','Светлая','Тёмная','Система'],ar:['المظهر','فاتح','داكن','النظام'],
    hi:['थीम','लाइट','डार्क','सिस्टम'],id:['Tema','Terang','Gelap','Sistem'],
    ja:['テーマ','ライト','ダーク','システム'],ko:['테마','라이트','다크','시스템'],
    zh:['主题','浅色','深色','系统'],az:['Mövzu','Açıq','Tünd','Sistem']
  };
  var icons = {
    light:'<path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"/>',
    dark:'<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008"/>',
    system:'<path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10"/><path d="M7 20h10"/><path d="M9 16v4"/><path d="M15 16v4"/>',
    check:'<path d="M5 12l5 5L20 7"/>'
  };
  function svg(kind, className) {
    var el=document.createElementNS('http://www.w3.org/2000/svg','svg');
    el.setAttribute('viewBox','0 0 24 24');
    el.setAttribute('fill','none');el.setAttribute('stroke','currentColor');
    el.setAttribute('stroke-width','1.8');el.setAttribute('stroke-linecap','round');
    el.setAttribute('stroke-linejoin','round');el.setAttribute('aria-hidden','true');
    if(className)el.setAttribute('class',className);
    el.innerHTML=icons[kind];
    return el;
  }
  function init() {
    var btn=document.getElementById('themeBtn');
    var media=matchMedia('(prefers-color-scheme: dark)');
    var modes=['light','dark','system'];
    function storedMode() {
      var mode=null,legacy=null;
      try{mode=localStorage.getItem('vertex-theme-mode');legacy=localStorage.getItem('theme');}catch(e){}
      return modes.includes(mode)?mode:((legacy==='light'||legacy==='dark')?legacy:'system');
    }
    function resolved(mode){return mode==='system'?(media.matches?'dark':'light'):mode;}
    function syncTheme(mode) {
      var effective=resolved(mode);
      document.documentElement.setAttribute('data-theme',effective);
      document.documentElement.setAttribute('data-theme-mode',mode);
      try{localStorage.setItem('vertex-theme-mode',mode);localStorage.setItem('theme',effective);}catch(e){}
      var meta=document.querySelector('meta[name="theme-color"]');
      if(meta)meta.setAttribute('content',effective==='dark'?'#0F0F10':'#F8F9FA');
    }
    var langCode=(document.documentElement.lang||'en').toLowerCase().split('-')[0];
    var copy=labels[langCode]||labels.en;
    if(!btn) {
      function syncWithoutButton(){if(storedMode()==='system')syncTheme('system');}
      syncWithoutButton();media.addEventListener('change',syncWithoutButton);return;
    }

    btn.type='button';
    btn.setAttribute('aria-haspopup','dialog');
    btn.setAttribute('aria-expanded','false');
    var menu=document.createElement('div');
    menu.className='theme-mode-menu';
    menu.id='vertex-theme-menu';menu.hidden=true;menu.setAttribute('role','dialog');
    menu.setAttribute('aria-label',copy[0]);menu.setAttribute('aria-hidden','true');
    btn.setAttribute('aria-controls',menu.id);
    var heading=document.createElement('div');heading.className='theme-menu-heading';
    heading.textContent=copy[0];menu.appendChild(heading);
    var list=document.createElement('div');list.className='theme-menu-list';
    list.setAttribute('role','menu');menu.appendChild(list);
    var options=modes.map(function(mode,i){
      var option=document.createElement('button');
      option.type='button';option.className='theme-option';option.dataset.mode=mode;
      option.setAttribute('role','menuitemradio');
      var label=document.createElement('span');label.textContent=copy[i+1];
      option.append(svg(mode,'theme-option-icon'),label,svg('check','theme-option-check'));
      list.appendChild(option);return option;
    });
    document.body.appendChild(menu);
    var sun=btn.querySelector('#themeIconSun'),moon=btn.querySelector('#themeIconMoon');
    var system=svg('system','theme-system-icon');btn.appendChild(system);
    var isOpen=false,closeTimer=0,animationFrame=0;
    var motionReduced=matchMedia('(prefers-reduced-motion: reduce)');
    function syncControls(mode){
      // Keep all three SVGs mounted so even light ↔ system (light), or
      // dark ↔ system (dark), can crossfade without a display toggle.
      if(sun)sun.style.removeProperty('display');
      if(moon)moon.style.removeProperty('display');
      system.style.removeProperty('display');
      btn.dataset.themeMode=mode;
      btn.setAttribute('aria-label',copy[0]+': '+copy[modes.indexOf(mode)+1]);
      options.forEach(function(option){
        var selected=option.dataset.mode===mode;
        option.setAttribute('aria-checked',String(selected));
        option.classList.toggle('is-selected',selected);
      });
    }
    function position(){
      if(menu.hidden)return;
      var r=btn.getBoundingClientRect(),pad=8,w=menu.offsetWidth,h=menu.offsetHeight;
      var x=Math.min(Math.max(pad,r.left+r.width/2-w/2),Math.max(pad,innerWidth-w-pad));
      var below=r.bottom+7,above=r.top-h-7;
      var y=below+h<=innerHeight-pad?below:(above>=pad?above:Math.max(pad,innerHeight-h-pad));
      menu.style.left=Math.round(x)+'px';menu.style.top=Math.round(y)+'px';
      menu.style.transformOrigin=y>=r.bottom?'top center':'bottom center';
    }
    function closeTheme(restoreFocus,instant){
      if(!isOpen&&!menu.classList.contains('is-closing'))return;
      isOpen=false;btn.setAttribute('aria-expanded','false');
      clearTimeout(closeTimer);cancelAnimationFrame(animationFrame);
      menu.classList.remove('is-open');menu.classList.add('is-closing');
      menu.setAttribute('aria-hidden','true');menu.inert=true;
      if(instant||motionReduced.matches){menu.hidden=true;menu.classList.remove('is-closing');}
      else closeTimer=setTimeout(function(){if(!isOpen){menu.hidden=true;menu.classList.remove('is-closing');}},120);
      if(restoreFocus)btn.focus({preventScroll:true});
    }
    function closeLanguageImmediately(){
      var lang=document.getElementById('langWrap'),languageButton=document.getElementById('langBtn');
      if(lang&&lang.classList.contains('open')){
        var panel=lang.querySelector('.lang-panel');
        if(panel)panel.style.transition='none';
        lang.classList.remove('open');
        if(languageButton)languageButton.setAttribute('aria-expanded','false');
        if(panel)requestAnimationFrame(function(){panel.style.removeProperty('transition');});
      }
    }
    function closeMobileMenu(){
      var header=document.getElementById('siteHeader'),toggle=document.getElementById('menuBtn');
      if(header)header.classList.remove('menu-open');
      if(toggle)toggle.setAttribute('aria-expanded','false');
    }
    function openTheme(){
      closeLanguageImmediately();closeMobileMenu();
      clearTimeout(closeTimer);cancelAnimationFrame(animationFrame);
      isOpen=true;menu.hidden=false;menu.inert=false;
      menu.classList.remove('is-closing');
      menu.setAttribute('aria-hidden','false');
      btn.setAttribute('aria-expanded','true');
      position();
      animationFrame=requestAnimationFrame(function(){
        if(!isOpen)return;
        menu.classList.add('is-open');position();
      });
    }
    // Capture the old two-way theme click handler on localized pages and replace it.
    document.addEventListener('click',function(event){
      var target=event.target;
      if(btn===target||btn.contains(target)){
        event.preventDefault();event.stopImmediatePropagation();
        isOpen?closeTheme(false,false):openTheme();
        return;
      }
      var otherPanelTrigger=target.closest('#langBtn,#mLangBtn,#menuBtn');
      if(otherPanelTrigger) {
        // When another panel opens, remove the previous panel immediately.
        closeTheme(false,true);
        if(otherPanelTrigger.id==='menuBtn')closeLanguageImmediately();
        if(otherPanelTrigger.id==='langBtn')closeMobileMenu();
      } else if(!menu.contains(target)) {
        closeTheme(false,false);
      }
    },true);
    options.forEach(function(option){
      option.addEventListener('click',function(){
        var mode=option.dataset.mode;
        syncTheme(mode);syncControls(mode);closeTheme(true,false);
      });
    });
    document.addEventListener('keydown',function(event){
      if(!isOpen)return;
      if(event.key==='Escape'){
        event.preventDefault();event.stopPropagation();closeTheme(true,false);return;
      }
      if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)&&menu.contains(document.activeElement)){
        event.preventDefault();
        var active=options.indexOf(document.activeElement);
        var next=event.key==='Home'?0:event.key==='End'?options.length-1:(active+(event.key==='ArrowDown'?1:options.length-1))%options.length;
        options[next].focus();
      }
    },true);
    window.addEventListener('resize',position,{passive:true});
    window.addEventListener('scroll',function(){if(isOpen)position();},{passive:true});
    media.addEventListener('change',function(){syncTheme(storedMode());syncControls(storedMode());});
    syncTheme(storedMode());syncControls(storedMode());
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();


/* Vertex wheel momentum: gentle ease-out for discrete desktop mouse wheels.
   Trackpads, touch gestures, nested scrollers and reduced-motion users retain native scrolling. */
(function vertexWheelMomentum(){
  'use strict';
  if (window.__vertexWheelMomentum || !window.requestAnimationFrame || !window.matchMedia) return;
  window.__vertexWheelMomentum = true;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const timeConstant = 125; // ms: ~98% of the remaining distance is covered in 0.5 seconds
  const fineInputCooldown = 900; // keep trackpad gestures fully native, including their inertia
  let fineInputUntil = 0;
  let raf = 0;
  let previousFrame = 0;
  let currentY = window.scrollY;
  let targetY = currentY;
  let lastWrittenY = currentY;

  function maximumScroll(){
    const root = document.scrollingElement || document.documentElement;
    return Math.max(0, root.scrollHeight - window.innerHeight);
  }
  function cancel(){
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
    previousFrame = 0;
    currentY = targetY = lastWrittenY = window.scrollY;
  }
  function nativeScrollArea(element){
    for (let node = element; node && node !== document.documentElement; node = node.parentElement || (node.getRootNode && node.getRootNode().host)) {
      if (!(node instanceof Element)) break;
      if (node.matches('textarea, select, input[type="number"], input[type="range"], [contenteditable], [role="dialog"], [role="listbox"], [role="menu"], [data-native-wheel]')) return true;
      if (node === document.body) break;
      const style = window.getComputedStyle(node);
      if (/(auto|scroll|overlay)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 2) return true;
      if (/(auto|scroll|overlay)/.test(style.overflowX) && node.scrollWidth > node.clientWidth + 2) return true;
    }
    return false;
  }
  function advance(now){
    raf = 0;
    // Relinquish control if another script, keyboard, or scroll bar moved the page.
    if (Math.abs(window.scrollY - lastWrittenY) > 3) { cancel(); return; }
    const max = maximumScroll();
    targetY = Math.max(0, Math.min(max, targetY));
    const dt = previousFrame ? Math.min(48, now - previousFrame) : 16.67;
    previousFrame = now;
    const ease = 1 - Math.exp(-Math.max(1, dt) / timeConstant);
    currentY += (targetY - currentY) * ease;
    if (Math.abs(targetY - currentY) < 0.5) currentY = targetY;
    lastWrittenY = currentY;
    window.scrollTo({top: currentY, behavior: 'instant'});
    if (Math.abs(targetY - currentY) >= 0.5) raf = window.requestAnimationFrame(advance);
    else previousFrame = 0;
  }
  function onWheel(event){
    if (event.defaultPrevented || event.ctrlKey || event.shiftKey || event.altKey || event.metaKey ||
        reducedMotion.matches || !desktopPointer.matches || !event.isTrusted ||
        !event.deltaY || nativeScrollArea(event.target)) {
      if (raf) cancel();
      return;
    }
    const now = performance.now();
    const absY = Math.abs(event.deltaY);
    // Pixel-mode trackpad events are usually fine-grained or diagonal.
    // Let the browser apply its built-in gesture momentum instead of double-smoothing it.
    if (event.deltaMode === 0) {
      if (absY < 60 || Math.abs(event.deltaX) > 1 || !Number.isInteger(event.deltaY)) {
        fineInputUntil = now + fineInputCooldown;
        if (raf) cancel();
        return;
      }
      if (now < fineInputUntil) { if (raf) cancel(); return; }
    }
    const max = maximumScroll();
    if (max < 2) return;
    const pixelDelta = event.deltaMode === 1 ? event.deltaY * 20 :
      event.deltaMode === 2 ? event.deltaY * window.innerHeight : event.deltaY;
    const delta = Math.max(-320, Math.min(320, pixelDelta));
    const position = window.scrollY;
    // Avoid trapping overscroll or introducing momentum at the document edges.
    if ((delta > 0 && position >= max - 1) || (delta < 0 && position <= 1)) {
      if (raf) cancel();
      return;
    }
    if (raf && Math.sign(delta) !== Math.sign(targetY - currentY)) {
      // Reverse instantly on the next wheel notch rather than fighting the old target.
      currentY = targetY = position;
      lastWrittenY = position;
    }
    const nextTarget = Math.max(0, Math.min(max, (raf ? targetY : position) + delta));
    if (Math.abs(nextTarget - position) < 0.5) return;
    event.preventDefault();
    if (!raf) {
      currentY = position;
      previousFrame = 0;
      lastWrittenY = position;
    }
    targetY = nextTarget;
    if (!raf) raf = window.requestAnimationFrame(advance);
  }

  window.addEventListener('wheel', onWheel, {passive: false});
  window.addEventListener('scroll', function(){
    if (raf && Math.abs(window.scrollY - lastWrittenY) > 3) cancel();
  }, {passive: true});
  document.addEventListener('pointerdown', cancel, {passive: true, capture: true});
  document.addEventListener('keydown', function(event){
    if (['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key)) cancel();
  }, true);
  document.addEventListener('visibilitychange', function(){if (document.hidden) cancel();});
  window.addEventListener('resize', cancel, {passive: true});
  reducedMotion.addEventListener('change', cancel);
  desktopPointer.addEventListener('change', cancel);
})();

