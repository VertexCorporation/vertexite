// Public lists contain names only; empty/error responses never restore old names.
(function () {
    var ENDPOINT = 'https://listsiteteam-o5h7dmtija-ew.a.run.app/';
    var current = {}, timer, retryTimer, failures=0;
    function fill(id, values, itemClass) {
        var track = document.getElementById(id);
        if (!track) return;
        var block = track.closest('.name-block');
        track.replaceChildren();
        if (block) block.hidden = !values.length;
        var container = track.parentElement;
        track.style.animation = 'none'; track.style.width = 'max-content'; track.style.flexWrap = 'nowrap';
        track.style.justifyContent = 'flex-start'; container.style.maskImage = ''; container.style.webkitMaskImage = '';
        function append(duplicate) { values.forEach(function (name) {
            var span = document.createElement('span'); span.className = itemClass; span.textContent = name;
            if (duplicate) span.setAttribute('aria-hidden', 'true'); track.appendChild(span);
        }); }
        append(false);
        if (!values.length) return;
        var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reduced) {
            append(true); track.style.setProperty('--name-cycle',(track.children[values.length].getBoundingClientRect().left-track.children[0].getBoundingClientRect().left)+'px'); track.style.animation = ''; track.style.animationName='publicNamesLoop'; track.style.animationDuration = '10s';
        } else {
            track.style.width = '100%'; track.style.flexWrap = 'wrap'; track.style.justifyContent = 'center';
            container.style.maskImage = 'none'; container.style.webkitMaskImage = 'none';
        }
    }
    function names(rows) { return Array.isArray(rows) ? rows.filter(function (r) { return r && typeof r.name === 'string' && r.name.trim(); }).map(function (r) { return r.name.trim(); }) : []; }
    function renderCards(rows) {
        var track=document.getElementById('teamTrack'); if(!track)return;
        track.replaceChildren(); var section=track.closest('section'); if(section)section.hidden=!rows.length;
        rows.forEach(function(card){
            var item=document.createElement('div');item.className='team-card';
            var wrap=document.createElement('div');wrap.className='team-photo-wrap';
            var photo=document.createElement('img');photo.className='team-photo';photo.alt=card.name;photo.loading='lazy';photo.decoding='async';photo.src=card.imageUrl;
            photo.onerror=function(){photo.remove();wrap.classList.add('team-photo-missing');wrap.textContent=card.name.slice(0,1);};wrap.appendChild(photo);
            var info=document.createElement('div');info.className='team-info';var name=document.createElement('h4');name.textContent=card.name;var role=document.createElement('div');role.className='role';role.textContent=card.position;
            var social=document.createElement('div');social.className='team-social';(card.links||[]).forEach(function(link){var a=document.createElement('a');a.href=link.url;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',link.label);var img=document.createElement('img');img.alt=link.label;img.src='../assets/'+(link.label.toLowerCase()==='linkedin'?'linkedin.svg':link.label.toLowerCase()==='instagram'?'instagram.svg':'website.svg');a.appendChild(img);social.appendChild(a);});
            info.append(name,role,social);item.append(wrap,info);track.appendChild(item);
        });track.dispatchEvent(new Event('scroll'));
    }
    function apply(data) {
        current = data;
        document.getElementById("teamTrack")?.removeAttribute("aria-busy");
        fill('modTrack', names(data.staff), 'mod-item');
        fill('staffTrack', names([].concat(data.mods || [], data.chefs || [])).sort(function(a,b){return a.localeCompare(b,document.documentElement.lang || 'en');}), 'mod-item');
        fill('honorTrack', names(data.honors), 'mod-item');
        renderCards(Array.isArray(data.cards)?data.cards:[]);
    }
    function load() {
        return fetch(ENDPOINT, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:{lang:document.documentElement.lang || 'en'}})})
            .then(function (res) { if (!res.ok) throw Error('unavailable'); return res.json(); })
            .then(function (json) { if (!json.result || !['staff','mods','chefs','honors'].every(function(k){return Array.isArray(json.result[k]);})) throw Error('invalid'); apply(json.result); })
            .then(function(){failures=0;})
            .catch(function () { if(failures++<3){clearTimeout(retryTimer);retryTimer=setTimeout(load,Math.min(30000,2000*Math.pow(2,failures))+Math.random()*1000);}else if(!Object.keys(current).length){var track=document.getElementById('teamTrack');if(track){track.removeAttribute('aria-busy');track.replaceChildren();var note=document.createElement('p');note.className='story-quick-status';note.setAttribute('role','status');var messages={tr:'Ekip şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.',en:'The team is unavailable right now. Please try again later.',de:'Das Team ist derzeit nicht verfügbar. Bitte später erneut versuchen.',fr:'L’équipe est indisponible. Veuillez réessayer plus tard.',es:'El equipo no está disponible. Inténtalo de nuevo más tarde.',it:'Il team non è disponibile. Riprova più tardi.',pt:'A equipa está indisponível. Tente novamente mais tarde.',nl:'Het team is momenteel niet beschikbaar. Probeer het later opnieuw.',ru:'Список команды временно недоступен. Повторите попытку позже.',ar:'قائمة الفريق غير متاحة الآن. يُرجى المحاولة لاحقًا.',hi:'टीम अभी उपलब्ध नहीं है। कृपया बाद में फिर प्रयास करें।',id:'Tim belum tersedia. Silakan coba lagi nanti.',ja:'現在チームを読み込めません。後ほどお試しください。',ko:'지금은 팀을 불러올 수 없습니다. 나중에 다시 시도해 주세요.',zh:'暂时无法加载团队，请稍后重试。',az:'Komanda hazırda yüklənmir. Daha sonra yenidən cəhd edin.'};note.textContent=messages[document.documentElement.lang]||messages.en;track.appendChild(note);}} });
    }
    function showLoading(){var track=document.getElementById('teamTrack');if(!track)return;var section=track.closest('section');if(section)section.hidden=false;track.setAttribute('aria-busy','true');for(var i=0;i<3;i++){var card=document.createElement('div');card.className='team-card skeleton';card.setAttribute('aria-hidden','true');track.appendChild(card);}}
    function start() {
        var oldLeads = document.getElementById('chefTrack'); if (oldLeads) oldLeads.closest('.name-block').remove();
        showLoading(); load(); setInterval(function () { if (!document.hidden) load(); }, 300000);
        window.addEventListener('resize',function(){clearTimeout(timer);timer=setTimeout(function(){apply(current);},100);});
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
