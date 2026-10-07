// vertexishere.com — Moderatörler + Staff kayan listeleri
// Vertex Konsol (admin panel) > Sistem > Ekip Kaydı'ndan yönetilir;
// bu script listSiteTeam callable'ından listeleri çekip marquee'leri günceller.
// Veri yoksa / çekilemezse HTML içindeki statik liste aynen kalır.
(function () {
    var ENDPOINT = 'https://listsiteteam-o5h7dmtija-ew.a.run.app/';

    function fill(trackId, names) {
        var track = document.getElementById(trackId);
        if (!track || !names || !names.length) return;
        while (track.firstChild) track.removeChild(track.firstChild);
        // Kaydirma dongusunun sorunsuz donmesi icin liste iki kez basilir.
        for (var pass = 0; pass < 2; pass++) {
            for (var i = 0; i < names.length; i++) {
                var span = document.createElement('span');
                span.className = 'mod-item';
                span.textContent = names[i];
                track.appendChild(span);
            }
        }
        // Hiz icerige gore: ~37px/s — Onur Tablosu marquee'siyle ayni his,
        // uzun listelerde bile yavas ve okunur (dongu yarim genislik kateder, /75).
        var duration = Math.max(40, Math.round(track.scrollWidth / 75));
        track.style.animationDuration = duration + 's';
    }

    function apply(result) {
        var data = result || {};
        var mods = (data.mods || []).map(function (m) { return m && m.name; }).filter(Boolean);
        var staff = (data.staff || []).map(function (m) { return m && m.name; }).filter(Boolean);
        if (mods.length) fill('modTrack', mods);
        if (staff.length) fill('staffTrack', staff);
    }

    function load() {
        fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: {} })
        }).then(function (res) { return res.json(); })
          .then(function (json) { apply(json && json.result); })
          .catch(function () { /* sessiz: statik liste kalir */ });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', load);
    } else {
        load();
    }
})();
