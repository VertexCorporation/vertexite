// Visual reference from main at 3152e0d, before the rendering optimization.
  function drawGlobe(progress, worldSpread) {
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
    // A neutral Atlantic-facing view emphasizes the world rather than any country.
    var longitude = mix(-102, -10, turn) + 360 * smooth(phase(progress,.80,.97));
    var latitude = mix(12, 15, turn);
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
    context.lineWidth = Math.max(.65, size * .00095); context.stroke();

    worldFeatures.forEach(function (country) {
      context.beginPath(); path(country);
      context.fillStyle = land; context.fill();
      context.strokeStyle = border;
      context.lineWidth = Math.max(.55, size * .0011); context.stroke();
    });

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
        context.lineWidth = Math.max(.5, size * .0010); context.stroke();
        context.restore();
      });
    }

    context.beginPath(); path({ type: 'Sphere' });
    context.strokeStyle = dark ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.28)';
    context.lineWidth = Math.max(.7, size * .0017); context.stroke();
  }
