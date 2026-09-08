/*
 * Vertex intro scene.
 *
 * Plays once, on the first interaction: the title lifts, the globe turns to
 * centre Turkiye, zooms in and fades out to reveal the page.
 *
 * The overlay markup and its CSS live inline in each index.html so the scene
 * covers the page on the very first paint. This file only drives it.
 *
 * If anything here fails - d3 missing, geometry request refused, an exception -
 * dismiss() runs and the visitor gets the normal page. The overlay must never
 * be able to trap someone.
 */
(function () {
  'use strict';

  var root = document.getElementById('vx-intro');
  if (!root) return;

  var canvas = document.getElementById('vx-canvas');
  var titleEl = root.querySelector('.vx-title');
  var hintEl = root.querySelector('.vx-hint');
  var script = document.currentScript || document.querySelector('script[data-geo]');
  var GEO_URL = (script && script.getAttribute('data-geo')) || '../assets/geo/countries-110m.json';

  var DURATION = 4200;
  var TR_LON = 35.24, TR_LAT = 38.96;
  var TR_ID = '792';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function dismiss() {
    if (root.classList.contains('vx-done')) return;
    root.classList.add('vx-done');
    document.documentElement.classList.remove('vx-lock');
    try { window.dispatchEvent(new CustomEvent('vx:intro-done')); } catch (e) {}
  }

  // The page-level failsafe timer hands over to us once we are running.
  if (window.__vxFailsafe) { clearTimeout(window.__vxFailsafe); window.__vxFailsafe = null; }
  var giveUp = setTimeout(dismiss, 6000);

  if (reduced || !canvas || !canvas.getContext || !window.d3 || !window.d3.geoOrthographic || !window.topojson) {
    clearTimeout(giveUp);
    dismiss();
    return;
  }

  var ctx = canvas.getContext('2d');
  var proj = d3.geoOrthographic().clipAngle(90);
  var path = d3.geoPath(proj, ctx);
  var turkey = [], others = [];

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function smooth(e0, e1, x) { var t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function tok(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
  function sphereFill() { return tok('--bg').toUpperCase() === '#0E1013' ? '#0E1013' : '#FFFFFF'; }

  var W = 0, H = 0, spin = 0, lastP = 0, last = 0;

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = root.clientWidth; H = root.clientHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    render(lastP);
  }

  function render(p) {
    lastP = p;
    var a = smooth(0.00, 0.22, p);   // title lifts, globe centres
    var b = smooth(0.18, 0.55, p);   // turn to Turkiye
    var z = smooth(0.52, 0.86, p);   // zoom
    var f = smooth(0.78, 1.00, p);   // fade

    proj.rotate([lerp(-(spin % 360), -TR_LON, b), lerp(-14, -TR_LAT, b)]);
    proj.scale(Math.min(W, H) * lerp(0.23, 0.33, a) * (1 + z * 14));
    proj.translate([W / 2, lerp(H * 0.72, H * 0.50, a)]);

    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = 1 - f;

    ctx.beginPath(); path({ type: 'Sphere' });
    ctx.fillStyle = sphereFill(); ctx.fill();

    ctx.beginPath();
    for (var i = 0; i < others.length; i++) path(others[i]);
    ctx.fillStyle = tok('--text'); ctx.fill();

    ctx.beginPath();
    for (var j = 0; j < turkey.length; j++) path(turkey[j]);
    ctx.fillStyle = b > 0.03 ? tok('--accent') : tok('--text'); ctx.fill();

    if (z < 0.95) {
      ctx.beginPath(); path({ type: 'Sphere' });
      ctx.lineWidth = 2; ctx.strokeStyle = tok('--border');
      ctx.globalAlpha = (1 - f) * (1 - z); ctx.stroke();
    }
    ctx.globalAlpha = 1;

    if (titleEl) {
      titleEl.style.top = lerp(39, 12, a) + '%';
      titleEl.style.opacity = String(1 - f);
    }
    root.style.opacity = String(1 - smooth(0.92, 1.00, p));
  }

  var state = 'loading', t0 = 0, rafId = null, pending = false;

  function frame() {
    var now = performance.now();
    var dt = Math.min(now - last, 60); last = now;

    if (state === 'idle') {
      spin += dt * 0.005;
      render(0);
    } else if (state === 'playing') {
      var p = clamp((now - t0) / DURATION, 0, 1);
      if (p < 0.55) spin += dt * 0.005;
      render(p);
      if (p >= 1) { dismiss(); rafId = null; return; }
    } else {
      rafId = null; return;
    }
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (state === 'playing') { dismiss(); return; }   // second press skips
    // Pressed before the geometry arrived: remember it and play on arrival,
    // otherwise the press is silently swallowed.
    if (state === 'loading') { pending = true; return; }
    if (state !== 'idle') return;
    state = 'playing';
    t0 = performance.now();
    if (hintEl) hintEl.style.display = 'none';
  }

  ['pointerdown', 'touchstart', 'wheel'].forEach(function (ev) {
    root.addEventListener(ev, function (e) { e.preventDefault(); start(); }, { passive: false });
  });
  window.addEventListener('keydown', function (e) {
    if (root.classList.contains('vx-done') || e.key === 'Tab') return;
    e.preventDefault(); start();
  });
  window.addEventListener('resize', resize);

  fetch(GEO_URL, { credentials: 'same-origin' })
    .then(function (r) { if (!r.ok) throw new Error('geo ' + r.status); return r.json(); })
    .then(function (topo) {
      var fc = topojson.feature(topo, topo.objects.countries);
      for (var i = 0; i < fc.features.length; i++) {
        (String(fc.features[i].id) === TR_ID ? turkey : others).push(fc.features[i]);
      }
      clearTimeout(giveUp);
      state = 'idle';
      last = performance.now();
      resize();
      rafId = requestAnimationFrame(frame);
      if (pending) start();
    })
    .catch(function () { clearTimeout(giveUp); dismiss(); });
})();
