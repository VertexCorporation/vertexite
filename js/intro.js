setTimeout(async function () {
  'use strict';

  var hero = document.querySelector('.hero#home');
  var statsSection = document.querySelector('.stats');
  var sponsorsSection = document.querySelector('.partners-static');
  if (!hero || !window.d3 || !window.topojson) return;

  // Match the first HTML frame before measuring or replacing its title.
  if(document.fonts){await document.fonts.load('112px Anton');await document.fonts.ready;}
  var originalTitle = hero.querySelector('h1');
  var originalLede = hero.querySelector('.lede');
  var originalActions = Array.prototype.slice.call(hero.querySelectorAll('.hero-actions a'));
  var joinAction=document.querySelector('.nav-right a.btn[href*="join"],.nav-right a.btn[href*="katil"]');
  var originalStats = statsSection ? Array.prototype.slice.call(statsSection.querySelectorAll('.stat')) : [];
  var originalLogos = sponsorsSection ? sponsorsSection.querySelector('.partners-logos') : null;
  var lang = (document.documentElement.lang || 'en').toLowerCase().split('-')[0];
  var scrollCopy={"tr":"Kaydır","en":"Scroll","de":"Scrollen","fr":"Défiler","es":"Desplazar","it":"Scorri","pt":"Rolar","nl":"Scrollen","ru":"Прокрутите","ar":"مرّر","hi":"स्क्रॉल करें","id":"Gulir","ja":"スクロール","ko":"스크롤","zh":"滚动","az":"Sürüşdür"};
  var sponsorCopy = {
    tr: 'Destekleyenler', en: 'Sponsored by', de: 'Unterstützt von', fr: 'Soutenu par',
    es: 'Patrocinado por', it: 'Con il supporto di', pt: 'Patrocinado por', nl: 'Mede mogelijk gemaakt door',
    ru: 'При поддержке', ar: 'بدعم من', hi: 'द्वारा समर्थित', id: 'Didukung oleh',
    ja: 'スポンサー', ko: '후원', zh: '合作伙伴', az: 'Dəstəkləyənlər'
  };
  var statementCopy = {
    tr: 'Dünyanın en parlak genç zihinleri tarafından kuruldu.',
    en: 'Founded by the brightest young minds in the world.'
  };

  var title = originalTitle ? originalTitle.textContent.trim() : 'The Peak of Technology';
  var statement = statementCopy[lang] || (originalLede ? originalLede.textContent.trim() : 'Founded by the brightest young minds in the world.');
  var sponsorLabel = sponsorCopy[lang] || sponsorCopy.en;

  function actionMarkup(action, className) {
    if (!action) return '';
    return '<a class="btn ' + className + '" href="' + action.getAttribute('href') + '">' + action.textContent.trim() + '</a>';
  }

  var statsMarkup = originalStats.map(function (stat) {
    var number = stat.querySelector('.num');
    var label = stat.querySelector('.lab');
    return '<div class="story-metric"><strong>' + (number ? number.textContent.trim() : '') + '</strong><span>' + (label ? label.textContent.trim() : '') + '</span></div>';
  }).join('');

  hero.classList.add('story-hero');hero.classList.remove('story-static');
  hero.innerHTML = '' +
    '<div class="story-stage">' +

      '<div class="story-geometry" aria-hidden="true"><svg viewBox="0 0 800 800" fill="none" stroke="currentColor"><circle cx="400" cy="400" r="300"/><circle cx="400" cy="400" r="210"/><ellipse cx="400" cy="400" rx="110" ry="300"/><ellipse cx="400" cy="400" rx="230" ry="300"/><ellipse cx="400" cy="400" rx="300" ry="105"/><path d="M400 100 660 250 660 550 400 700 140 550 140 250Z M140 250 660 550 M660 250 140 550 M400 100V700 M100 400H700 M140 250H660 M140 550H660 M250 140 550 660 M550 140 250 660"/><circle cx="400" cy="100" r="5"/><circle cx="660" cy="250" r="5"/><circle cx="140" cy="550" r="5"/></svg></div>' +
      '<h1 class="story-title">' + title + '</h1>' +
      '<div class="story-sponsors"><span>' + sponsorLabel + '</span><div class="story-sponsor-logos">' + (originalLogos ? originalLogos.innerHTML : '') + '</div></div>' +
      '<div class="story-globe-wrap"><canvas class="story-globe" aria-label="Graphic globe focused on Türkiye"></canvas></div>' +
      '<p class="story-statement">' + statement + '</p>' +
      '<div class="story-metrics">' + statsMarkup + '</div>' +
      '<div class="story-actions">' + actionMarkup(originalActions[0], 'btn-primary') + actionMarkup(joinAction || originalActions[1], 'btn-ghost') + '</div>' +
      '<div class="story-scroll-cue" aria-hidden="true"><span></span>'+(scrollCopy[lang]||scrollCopy.en)+'</div>' +
    '</div>';

  if (statsSection) statsSection.classList.add('story-relocated');
  if (sponsorsSection) sponsorsSection.classList.add('story-relocated');

  var stage = hero.querySelector('.story-stage');
  var header = document.querySelector('header');
  var geometry = hero.querySelector('.story-geometry');
  var lastGlobeFrame = '';
  var titleEl = hero.querySelector('.story-title');
  var titleWords=title.split(/\s+/).filter(Boolean),titleLayout=null;
  titleEl.textContent='';titleEl.setAttribute('aria-label',title);titleWords.forEach(function(word){var span=document.createElement('span');span.textContent=word;span.className='story-title-word';span.setAttribute('aria-hidden','true');titleEl.appendChild(span);});
  function measureTitle(){
    var probe=titleEl.cloneNode(true);probe.className='story-title story-title-probe';probe.style.cssText='position:fixed;visibility:hidden;transform:none;left:0;top:0;width:'+Math.min(1120,window.innerWidth-40)+'px;font-size:'+Math.max(42,Math.min(112,window.innerWidth*.082))+'px;white-space:normal;';
    document.body.appendChild(probe);var base=probe.getBoundingClientRect(),initial=Array.from(probe.children).map(function(el){var r=el.getBoundingClientRect();return {x:r.left-base.left,y:r.top-base.top};});
    var rows=new Map();Array.from(probe.children).forEach(function(el,i){var r=el.getBoundingClientRect(),key=Math.round(initial[i].y);if(!rows.has(key))rows.set(key,[]);rows.get(key).push({i:i,left:initial[i].x,right:initial[i].x+r.width});});rows.forEach(function(row){var left=Math.min.apply(null,row.map(function(r){return r.left;})),right=Math.max.apply(null,row.map(function(r){return r.right;})),offset=(base.width-(right-left))/2-left;row.forEach(function(r){initial[r.i].x+=offset;});});
    probe.style.width='max-content';probe.style.whiteSpace='nowrap';base=probe.getBoundingClientRect();var total=base.width,final=Array.from(probe.children).map(function(el){var r=el.getBoundingClientRect();return {x:r.left-base.left,y:0};});
    titleLayout={height:initial.reduce(function(h,p){return Math.max(h,p.y);},0)+parseFloat(getComputedStyle(probe).lineHeight),initial:initial,final:final,width:Math.min(1120,window.innerWidth-40),total:total};probe.remove();
  }
  measureTitle();document.fonts.ready.then(function(){measureTitle();requestRender();});
  var sponsorsEl = hero.querySelector('.story-sponsors');
  var globeWrap = hero.querySelector('.story-globe-wrap');
  var canvas = hero.querySelector('.story-globe');
  var statementEl = hero.querySelector('.story-statement');
  var metricsEl = hero.querySelector('.story-metrics');
  var actionsEl = hero.querySelector('.story-actions');
  var cueEl = hero.querySelector('.story-scroll-cue');
  actionsEl.addEventListener('click',function(event){var link=event.target.closest('a');if(!link)return;var href=link.getAttribute('href');if(href&&href.charAt(0)==='#'){var target=document.querySelector(href);if(target){event.preventDefault();event.stopPropagation();target.style.animation='none';window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-(header?header.offsetHeight:0),behavior:'instant'});history.replaceState(null,'',href);}}});
  var context = canvas.getContext('2d');
  if(!context)return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var worldFeatures = null;
  var turkey = null;
  var spreadCountries = [];
  var graticule = d3.geoGraticule10();
  var ticking = false;

  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
  function phase(value, start, end) { return clamp((value - start) / (end - start), 0, 1); }
  function smooth(value) { return value * value * (3 - 2 * value); }
  function mix(start, end, amount) { return start + (end - start) * amount; }
  function reveal(element, amount, distance) {
    amount = smooth(clamp(amount, 0, 1));
    element.style.opacity = amount.toFixed(3);
    element.style.transform = 'translate3d(-50%,' + ((1 - amount) * distance).toFixed(2) + 'px,0)';
  }

  function drawGlobe(progress, turkeyFill, worldSpread) {
    if (!worldFeatures) return;
    var cssSize = globeWrap.clientWidth;
    var dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    var visualScale = 2.5;
    var size = Math.max(700, Math.min(window.innerWidth < 700 ? 1100 : 1920, Math.round(cssSize * visualScale * dpr)));
    if (canvas.width !== size || canvas.height !== size) {
      canvas.width = size;
      canvas.height = size;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
    }

    var signature = [progress.toFixed(3), size, document.documentElement.getAttribute('data-theme')].join(':');
    if(signature === lastGlobeFrame)return;
    lastGlobeFrame = signature;
    var centre = size / 2;
    var radius = size * .445;
    var turn = smooth(phase(progress, .23, .54));
    var longitude = mix(-102, 28.9784, turn) + 360 * smooth(phase(progress,.80,.97));
    var latitude = mix(12, 41.0082, turn);
    var projection = d3.geoOrthographic()
      .translate([centre, centre])
      .scale(radius)
      .rotate([-longitude, -latitude])
      .clipAngle(90)
      .precision(.3);
    var path = d3.geoPath(projection, context);
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    var ocean = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
    var land = dark ? '#4d5158' : '#c8c9c5';
    var spreadLand = dark ? '#ffffff' : '#000000';
    var border = dark ? '#0e1013' : '#fafaf9';

    context.clearRect(0, 0, size, size);
    context.beginPath(); path({ type: 'Sphere' });
    context.fillStyle = ocean; context.fill();
    context.beginPath(); path(graticule);
    context.strokeStyle = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.09)';
    context.lineWidth = Math.max(1, size * .0014); context.stroke();

    worldFeatures.forEach(function (country) {
      context.beginPath(); path(country);
      context.fillStyle = land; context.fill();
      context.strokeStyle = border;
      context.lineWidth = Math.max(.7, size * .0015); context.stroke();
    });

    if (turkey) {
      context.save();
      context.globalAlpha = smooth(turkeyFill);
      context.beginPath(); path(turkey);
      context.fillStyle = '#e11d2e'; context.fill();
      context.strokeStyle = dark ? '#ffffff' : '#9f1120';
      context.lineWidth = Math.max(1.2, size * .0025); context.stroke();
      context.restore();
    }

    if (worldSpread > 0 && spreadCountries.length) {
      spreadCountries.forEach(function (country, index) {
        var order = index / Math.max(1, spreadCountries.length - 1);
        var countryFade = smooth(phase(worldSpread, order * .84, order * .84 + .16));
        if (countryFade <= 0) return;
        context.save();
        context.globalAlpha = countryFade;
        context.beginPath(); path(country);
        context.fillStyle = spreadLand; context.fill();
        context.strokeStyle = dark ? '#11141a' : '#ffffff';
        context.lineWidth = Math.max(.65, size * .0014); context.stroke();
        context.restore();
      });
    }

    context.beginPath(); path({ type: 'Sphere' });
    context.strokeStyle = dark ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.28)';
    context.lineWidth = Math.max(1, size * .0024); context.stroke();
  }

  function render() {
    var bounds=hero.getBoundingClientRect();
    if(bounds.bottom<0||bounds.top>window.innerHeight){if(header){header.style.transform='';header.style.opacity='';header.style.pointerEvents='';header.inert=false;}ticking=false;return;}
    var travel = Math.max(1, hero.offsetHeight - stage.offsetHeight);
    var progress = reduced ? 1 : clamp((window.scrollY - hero.offsetTop) / travel, 0, 1);
    var sponsorIn = phase(progress, .06, .17) * (1 - phase(progress, .25, .34));
    var globeIn = phase(progress, .10, .30);
    var turkeyFill = phase(progress, .42, .56);
    var worldSpread = phase(progress, .48, .78);
    var statementIn = phase(progress, .57, .66) * (1 - phase(progress, .71, .78));
    var metricsIn = phase(progress, .67, .77) * (1 - phase(progress, .82, .89));
    var ending=smooth(phase(progress,.90,1));
    var actionsIn = Math.max(1-phase(progress,.015,.09),phase(progress,.92,1));
    var titleLift = smooth(phase(progress, .015, .26))*(1-ending);

    var headerHide = reduced ? 0 : smooth(phase(progress,.035,.16)) * (1-smooth(phase(progress,.86,.98)));
    if(header){header.style.transform=headerHide===0?'none':'translate3d(0,'+(-110*headerHide).toFixed(2)+'%,0)';header.style.opacity=String(1-headerHide);header.inert=headerHide>.95;header.style.pointerEvents=headerHide>.95?'none':'';}
    stage.style.setProperty('--story-header-space',((1-headerHide)*68).toFixed(1)+'px');
    var geometryOpacity=reduced?0:Math.max(1-smooth(phase(progress,.10,.30)),ending);
    geometry.style.opacity=String(geometryOpacity);
    // Wireframe lines must remain behind solid lettering; invert only the globe phase.
    var invertTitle=!reduced&&geometryOpacity===0;
    titleEl.style.mixBlendMode=invertTitle?'difference':'normal';
    titleEl.style.color=invertTitle?'#fff':'var(--text)';
    geometry.style.transform='translate3d(-50%,-50%,0) scale('+mix(1,1.4,smooth(phase(progress,.05,.30))*(1-ending))+') rotate('+mix(0,18,phase(progress,0,.30)*(1-ending))+'deg)';
    titleEl.style.transform = 'translate3d(-50%,' + (mix(0, -Math.min(76, window.innerHeight * .08), titleLift)).toFixed(2) + 'px,0)';
    titleEl.style.fontSize = 'clamp(42px,8.2vw,112px)';
    var layout=titleLayout,fit=Math.min(1,(window.innerWidth-40)/layout.total),morph=smooth(phase(progress,.03,.22))*(1-ending);
    titleEl.style.width=mix(layout.width,layout.total,morph)+'px';
    titleEl.style.height=layout.height+'px';
    titleEl.style.display='flex';titleEl.style.flexWrap='wrap';titleEl.style.justifyContent='center';titleEl.style.alignContent='flex-start';titleEl.style.columnGap='.25em';
    Array.from(titleEl.children).forEach(function(el,i){el.style.position=morph===0?'static':'absolute';el.style.transform=morph===0?'none':'translate3d('+mix(layout.initial[i].x,layout.final[i].x,morph).toFixed(2)+'px,'+mix(layout.initial[i].y,0,morph).toFixed(2)+'px,0)';});
    var grow=mix(.86,1,smooth(phase(progress,.30,.56)));
    actionsEl.style.top=(titleEl.offsetTop+layout.height+26)+'px';
    actionsEl.style.pointerEvents=actionsIn<.05?'none':'';actionsEl.inert=actionsIn<.05;
    titleEl.style.transform += ' scale('+ (mix(1,fit*grow,morph)).toFixed(4)+')';
    titleEl.style.willChange='auto';titleEl.style.left=morph===0?'0':'50%';titleEl.style.right=morph===0?'0':'auto';titleEl.style.margin=morph===0?'0 auto':'0';if(morph===0)titleEl.style.transform=titleLift?'translateY('+(-Math.min(76,window.innerHeight*.08)*titleLift).toFixed(2)+'px)':'none';
    titleEl.style.opacity=String(1-.12*Math.sin(Math.PI*phase(progress,.015,.26))*(1-ending));
    // Keep panels below the actual title, including long translated headings.
    var titleBottom=Math.max.apply(null,Array.from(titleEl.children).map(function(el){return el.getBoundingClientRect().bottom;}))-stage.getBoundingClientRect().top;
    if(!reduced)[sponsorsEl,statementEl,metricsEl].forEach(function(panel){panel.style.top=Math.max(titleBottom+24,Math.min(306,window.innerHeight*.34))+'px';});
    reveal(sponsorsEl, sponsorIn, 28);
    reveal(globeWrap, globeIn, 42);
    reveal(statementEl, statementIn, 34);
    reveal(metricsEl, metricsIn, 34);
    reveal(actionsEl, actionsIn, 28);
    canvas.style.opacity = String(reduced?1:1-smooth(phase(progress,.90,1)));
    globeWrap.style.setProperty('--ending-scale',String(mix(1,.72,smooth(phase(progress,.80,1)))));
    cueEl.style.opacity = String(1 - phase(progress, .02, .12));
    drawGlobe(progress, turkeyFill, worldSpread);
    ticking = false;
  }

  function requestRender() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(render);
    }
  }

  Promise.all([
    fetch('../assets/geo/countries-110m.json', { credentials: 'same-origin' }),
    fetch('../assets/geo/turkiye-detail.json', { credentials: 'same-origin' })
  ])
    .then(function (responses) {
      responses.forEach(function (response) { if (!response.ok) throw new Error(response.status); });
      return Promise.all(responses.map(function (response) { return response.json(); }));
    })
    .then(function (data) {
      var worldTopology = data[0];
      worldFeatures = topojson.feature(worldTopology, worldTopology.objects.countries).features;
      turkey = data[1];
      spreadCountries = worldFeatures
        .filter(function (country) { return String(country.id) !== '792'; })
        .sort(function (a, b) {
          return d3.geoDistance(d3.geoCentroid(a), [28.9784, 41.0082]) -
            d3.geoDistance(d3.geoCentroid(b), [28.9784, 41.0082]);
        });
      render();
    })
    .catch(function () { globeWrap.style.display = 'none'; });

  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', function(){measureTitle();requestRender();}, { passive: true });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) requestRender(); });
  new MutationObserver(requestRender).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  render();
  stage.classList.add('story-ready');
},750);
