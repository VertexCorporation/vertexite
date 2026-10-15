// Public personnel names come only from the server's active membership view.
(function () {
    var ENDPOINT = 'https://listsiteteam-o5h7dmtija-ew.a.run.app/';
    function fill(id, names) {
        var track = document.getElementById(id);
        if (!track) return;
        track.replaceChildren();
        var block = track.closest('.name-block');
        if (block) block.hidden = !names.length;
        for (var pass = 0; pass < 2; pass++) names.forEach(function (name) {
            var span = document.createElement('span');
            span.className = 'mod-item'; span.textContent = name; track.appendChild(span);
        });
        track.style.animationDuration = Math.max(40, Math.round(track.scrollWidth / 75)) + 's';
    }
    function leads() {
        var staff = document.getElementById('staffTrack');
        if (!staff || document.getElementById('chefTrack')) return;
        var block = document.createElement('div'); block.className = 'name-block mod-block';
        var heading = document.createElement('h3');
        heading.textContent = document.documentElement.lang === 'tr' ? 'Departman Sorumluları' : 'Department Leads';
        var container = document.createElement('div'); container.className = 'mod-marquee-container';
        var track = document.createElement('div'); track.id = 'chefTrack'; track.className = 'mod-track';
        container.appendChild(track); block.append(heading, container); staff.closest('.name-block').after(block);
    }
    function names(rows) { return Array.isArray(rows) ? rows.filter(function (r) { return r && typeof r.name === 'string' && r.name.trim(); }).map(function (r) { return r.name.trim(); }) : []; }
    function apply(data) { fill('modTrack', names(data.mods)); fill('staffTrack', names(data.staff)); fill('chefTrack', names(data.chefs)); }
    function load() {
        return fetch(ENDPOINT, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:{}})})
            .then(function (res) { if (!res.ok) throw Error('unavailable'); return res.json(); })
            .then(function (json) { if (!json.result || !Array.isArray(json.result.staff) || !Array.isArray(json.result.mods)) throw Error('invalid'); apply(json.result); })
            .catch(function () { apply({}); });
    }
    function start() { leads(); apply({}); load(); setInterval(function () { if (!document.hidden) load(); }, 300000); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
