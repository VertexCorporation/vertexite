// Outline paths from the same Tabler catalog used by Vertex Console.
(function(){'use strict';const paths={"sun":"\n  <path d=\"M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0\" />\n  <path d=\"M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7\" />\n","moon":"\n  <path d=\"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008\" />\n","chevron-down":"\n  <path d=\"M6 9l6 6l6 -6\" />\n","chevron-left":"\n  <path d=\"M15 6l-6 6l6 6\" />\n","chevron-right":"\n  <path d=\"M9 6l6 6l-6 6\" />\n","arrow-right":"\n  <path d=\"M5 12l14 0\" />\n  <path d=\"M13 18l6 -6\" />\n  <path d=\"M13 6l6 6\" />\n","x":"\n  <path d=\"M18 6l-12 12\" />\n  <path d=\"M6 6l12 12\" />\n","check":"\n  <path d=\"M5 12l5 5l10 -10\" />\n","language":"\n  <path d=\"M9 6.371c0 4.418 -2.239 6.629 -5 6.629\" />\n  <path d=\"M4 6.371h7\" />\n  <path d=\"M5 9c0 2.144 2.252 3.908 6 4\" />\n  <path d=\"M12 20l4 -9l4 9\" />\n  <path d=\"M19.1 18h-6.2\" />\n  <path d=\"M6.694 3l.793 .582\" />\n"};
function setIcon(el,name){if(!el||!paths[name])return;el.setAttribute('viewBox','0 0 24 24');el.setAttribute('fill','none');el.setAttribute('stroke','currentColor');el.setAttribute('stroke-width','1.8');el.setAttribute('stroke-linecap','round');el.setAttribute('stroke-linejoin','round');el.setAttribute('aria-hidden','true');el.innerHTML=paths[name];}
function init(){const favicon=document.getElementById('vertex-favicon');const browserTheme=matchMedia('(prefers-color-scheme:dark)');function sync(){if(favicon)favicon.href='/assets/favicon-'+(browserTheme.matches?'dark':'light')+'.svg';}sync();browserTheme.addEventListener('change',sync);
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
  const measured=brand.getBoundingClientRect().width+
    links.scrollWidth+right.getBoundingClientRect().width+
    2*parseFloat(getComputedStyle(nav).gap||'18');
  if(measured>nav.clientWidth+1)header.classList.add('nav-condensed');
 }
 window.addEventListener('resize',measure,{passive:true});
 if(document.fonts)document.fonts.ready.then(measure);
 measure();
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
const cta=document.querySelector('.cta-band');if(cta){
 const sky=document.createElement('div');sky.className='cta-skyline';sky.setAttribute('aria-hidden','true');
 let buildings='',windows='';const heights=[80,135,104,190,150,220,166,115,200,145,230,175,125,195,155,105];
 heights.forEach((height,i)=>{const x=i*92-10,w=66,ground=310,y=ground-height,mid=x+w/2,split=i%3===0;
 buildings+='<path class="city-building" d="M'+x+' '+ground+'V'+y+(split?'L'+mid+' '+(y-14)+'L'+(x+w)+' '+y:'H'+(x+w))+'V'+ground+'Z"/>';
 if(!split)buildings+='<path class="city-roof-detail" opacity=".6" d="M'+(x+7)+' '+y+'V'+(y-7)+'H'+(x+w-7)+'V'+y+(i%4===1?' M'+mid+' '+(y-7)+'v-16':'')+'"/>';
 for(let row=y+16;row<ground-12;row+=17)for(let col=x+10;col<x+w-8;col+=13){windows+='M'+col+' '+row+'h6v6h-6Z ';}
 });
 sky.innerHTML='<svg viewBox="0 0 1440 310" preserveAspectRatio="xMidYMax slice" fill="none" stroke="currentColor" stroke-width=".85"><g class="sky-clouds" opacity=".45"><path d="M-300 32h160m35 0h70 M100 66h140m30 0h50 M620 22h180m25 0h75 M1000 82h190"/><path transform="translate(1440)" d="M-300 32h160m35 0h70 M100 66h140m30 0h50 M620 22h180m25 0h75 M1000 82h190"/></g><g class="city-buildings">'+buildings+'<path class="city-ground" d="M0 310H1440"/><path class="city-windows" d="'+windows+'" opacity=".42" stroke-width=".65"/></g></svg>';cta.appendChild(sky);
}
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
      var favicon=document.getElementById('vertex-favicon');
      if(favicon)favicon.href='/assets/favicon-'+effective+'.svg';
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
      if(sun)sun.style.display=mode==='dark'?'block':'none';
      if(moon)moon.style.display=mode==='light'?'block':'none';
      system.style.display=mode==='system'?'block':'none';
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
