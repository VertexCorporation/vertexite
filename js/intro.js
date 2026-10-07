(function () {
  'use strict';

  var hero = document.querySelector('.hero#home');
  var statsSection = document.querySelector('.stats');
  var sponsorsSection = document.querySelector('.partners-static');
  if (!hero || !window.d3 || !window.topojson) return;

  var originalTitle = hero.querySelector('h1');
  var originalLede = hero.querySelector('.lede');
  var originalActions = Array.prototype.slice.call(hero.querySelectorAll('.hero-actions a'));
  var originalStats = statsSection ? Array.prototype.slice.call(statsSection.querySelectorAll('.stat')) : [];
  var originalLogos = sponsorsSection ? sponsorsSection.querySelector('.partners-logos') : null;
  var lang = (document.documentElement.lang || 'en').toLowerCase().split('-')[0];
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

  hero.classList.add('story-hero');
  hero.innerHTML = '' +
    '<div class="story-stage">' +
      '<div class="story-grid" aria-hidden="true"></div>' +
      '<h1 class="story-title">' + title + '</h1>' +
      '<div class="story-sponsors"><span>' + sponsorLabel + '</span><div class="story-sponsor-logos">' + (originalLogos ? originalLogos.innerHTML : '') + '</div></div>' +
      '<div class="story-globe-wrap"><canvas class="story-globe" aria-label="Graphic globe focused on Türkiye"></canvas></div>' +
      '<p class="story-statement">' + statement + '</p>' +
      '<div class="story-metrics">' + statsMarkup + '</div>' +
      '<div class="story-actions">' + actionMarkup(originalActions[0], 'btn-primary') + actionMarkup(originalActions[1], 'btn-ghost') + '</div>' +
      '<div class="story-scroll-cue" aria-hidden="true"><span></span>Scroll</div>' +
    '</div>';

  if (statsSection) statsSection.classList.add('story-relocated');
  if (sponsorsSection) sponsorsSection.classList.add('story-relocated');

  var stage = hero.querySelector('.story-stage');
  var titleEl = hero.querySelector('.story-title');
  var sponsorsEl = hero.querySelector('.story-sponsors');
  var globeWrap = hero.querySelector('.story-globe-wrap');
  var canvas = hero.querySelector('.story-globe');
  var statementEl = hero.querySelector('.story-statement');
  var metricsEl = hero.querySelector('.story-metrics');
  var actionsEl = hero.querySelector('.story-actions');
  var cueEl = hero.querySelector('.story-scroll-cue');
  var context = canvas.getContext('2d');
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
    var dpr = Math.min(window.devicePixelRatio || 1, 1.35);
    var visualScale = 2.5;
    var size = Math.max(900, Math.min(2600, Math.round(cssSize * visualScale * dpr)));
    if (canvas.width !== size || canvas.height !== size) {
      canvas.width = size;
      canvas.height = size;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
    }

    var centre = size / 2;
    var radius = size * .445;
    var turn = smooth(phase(progress, .23, .54));
    var longitude = mix(-102, 28.9784, turn);
    var latitude = mix(12, 41.0082, turn);
    var projection = d3.geoOrthographic()
      .translate([centre, centre])
      .scale(radius)
      .rotate([-longitude, -latitude])
      .clipAngle(90)
      .precision(.1);
    var path = d3.geoPath(projection, context);
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    var ocean = dark ? '#0e1013' : '#fafaf9';
    var land = dark ? '#4d5158' : '#c8c9c5';
    var spreadLand = dark ? '#f5f4f0' : '#17181b';
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
    var travel = Math.max(1, hero.offsetHeight - stage.offsetHeight);
    var progress = reduced ? 1 : clamp((window.scrollY - hero.offsetTop) / travel, 0, 1);
    var sponsorIn = phase(progress, .06, .17) * (1 - phase(progress, .25, .34));
    var globeIn = phase(progress, .18, .30);
    var turkeyFill = phase(progress, .42, .56);
    var worldSpread = phase(progress, .55, .84);
    var statementIn = phase(progress, .57, .66) * (1 - phase(progress, .71, .78));
    var metricsIn = phase(progress, .67, .77) * (1 - phase(progress, .82, .89));
    var actionsIn = phase(progress, .84, .94);
    var titleLift = smooth(phase(progress, .03, .18));

    titleEl.style.transform = 'translate3d(-50%,' + mix(0, -Math.min(76, window.innerHeight * .08), titleLift).toFixed(2) + 'px,0)';
    titleEl.style.fontSize = 'clamp(42px,' + mix(8.2, 5.4, titleLift).toFixed(2) + 'vw,112px)';
    reveal(sponsorsEl, sponsorIn, 28);
    reveal(globeWrap, globeIn, 42);
    reveal(statementEl, statementIn, 34);
    reveal(metricsEl, metricsIn, 34);
    reveal(actionsEl, actionsIn, 28);
    canvas.style.opacity = String(1 - Math.max(statementIn, metricsIn, actionsIn) * .48);
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
  window.addEventListener('resize', requestRender, { passive: true });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) requestRender(); });
  new MutationObserver(requestRender).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  render();
}());
