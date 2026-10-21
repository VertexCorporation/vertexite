/* Shared theme, language and mobile navigation behavior. */
(function(){'use strict';
  /* Tema: kalıcı + sistem tercihi + doğru ikon (light'ta ay, dark'ta güneş göster) */
  const themeBtn = document.getElementById('themeBtn');
  const sunIcon = document.getElementById('themeIconSun');
  const moonIcon = document.getElementById('themeIconMoon');
  function syncThemeIcons(isDark){
    sunIcon.style.display = isDark ? 'block' : 'none';
    moonIcon.style.display = isDark ? 'none' : 'block';
  }
  function applyTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    try{ localStorage.setItem('theme', t); }catch(e){}
    syncThemeIcons(t === 'dark');
  }
  (function initTheme(){
    let t = null;
    try{ t = localStorage.getItem('theme'); }catch(e){}
    if(t !== 'light' && t !== 'dark'){
      t = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    applyTheme(t);
  })();
  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
  });

/* Dil paneli (butona bağlı) */
  const langWrap = document.getElementById('langWrap');
  const langBtn = document.getElementById('langBtn');
  const mLangBtn = document.getElementById('mLangBtn');
  function closeLang(){
    if(langWrap) langWrap.classList.remove('open');
    if(langBtn) langBtn.setAttribute('aria-expanded', 'false');
  }
  if(langBtn && langWrap){
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = langWrap.classList.toggle('open');
      langBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => { if(!langWrap.contains(e.target)) closeLang(); });
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeLang(); });
  }
  if(mLangBtn && langWrap){
    mLangBtn.addEventListener('click', () => {
      const h = document.getElementById('siteHeader');
      if(h) h.classList.remove('menu-open');
      const mb = document.getElementById('menuBtn');
      if(mb) mb.setAttribute('aria-expanded', 'false');
      const open = langWrap.classList.toggle('open');
      if(langBtn) langBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* Header: scroll'da cam + incelme, mobil menü */
  (function(){
    var header = document.getElementById('siteHeader') || document.querySelector('header');
    if(!header) return;
    var ticking = false;
    function onScroll(){
      header.classList.toggle('scrolled', window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ window.requestAnimationFrame(onScroll); ticking = true; }
    }, {passive:true});
    onScroll();
    var menuBtn = document.getElementById('menuBtn');
    if(!menuBtn) return;
    function closeMenu(){
      header.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
    menuBtn.addEventListener('click', function(e){
      e.stopPropagation();
      var open = header.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    header.querySelectorAll('.mobile-menu a').forEach(function(a){
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', function(){ if(window.innerWidth > 860) closeMenu(); });
  })();

})();
