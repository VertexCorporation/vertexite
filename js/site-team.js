// Team directory is public, but only validated successful responses replace the static backup.
(function () {
    var ENDPOINT = 'https://listsiteteam-o5h7dmtija-ew.a.run.app/';
    var current = null, timer, loading = false;
    var lang=(document.documentElement.lang||'en').toLowerCase().split('-')[0];
    var cacheKey='directory-bios-20261025:'+lang;
    var fallbackImages=Object.create(null);
    function fill(id, values, itemClass) {
        var track = document.getElementById(id);
        if (!track) return;
        var block = track.closest('.name-block');
        track.replaceChildren();
        if (block) block.hidden = !values.length;
        var container = track.parentElement;
        track.classList.add('names-static');
        track.style.animation = 'none'; track.style.width = 'max-content'; track.style.flexWrap = 'nowrap';
        track.style.justifyContent = 'flex-start'; container.style.maskImage = ''; container.style.webkitMaskImage = '';
        function append(duplicate) { values.forEach(function (name) {
            var span = document.createElement('span'); span.className = itemClass; span.textContent = name;if(itemClass.includes('weekly-star')){var star=document.createElementNS('http://www.w3.org/2000/svg','svg');star.setAttribute('viewBox','0 0 24 24');star.setAttribute('aria-hidden','true');star.innerHTML='<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z" stroke-linejoin="round" stroke-linecap="round"/>';span.prepend(star);}
            if (duplicate) span.setAttribute('aria-hidden', 'true'); track.appendChild(span);
        }); }
        append(false);
        if (!values.length) return;
        var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // Loop only when multiple real names overflow the available width.
        // Measure before duplicating, otherwise one name becomes two moving copies.
        if (!reduced && values.length > 1 && track.scrollWidth > container.clientWidth + 1) {
            track.classList.remove('names-static');
            append(true); track.style.setProperty('--name-cycle',(track.children[values.length].getBoundingClientRect().left-track.children[0].getBoundingClientRect().left)+'px'); track.style.animation = ''; track.style.animationName='publicNamesLoop'; track.style.animationDuration = '10s';
        } else {
            track.style.width = '100%'; track.style.flexWrap = 'wrap'; track.style.justifyContent = 'center';
            container.style.maskImage = 'none'; container.style.webkitMaskImage = 'none';
        }
    }
    function names(rows) { return Array.isArray(rows) ? rows.filter(function (r) { return r && typeof r.name === 'string' && r.name.trim(); }).map(function (r) { return r.name.trim(); }) : []; }
    function isMustafa(name) {
        if (!name || typeof name !== 'string') return false;
        var clean = name.trim().toLowerCase().replace(/ı/g, 'i').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return clean === 'mustafa caki';
    }
    function safeProfileSlug(value){
        var slug=String(value||'').trim().replace(/^\/+|\/+$/g,'');
        return /^[a-zA-Z0-9_-]{1,120}$/.test(slug)?slug:null;
    }
    function getProfileSlug(card) {
        if (!card) return null;
        if (typeof card.profileSlug === 'string' && card.profileSlug.trim()) {
            return safeProfileSlug(card.profileSlug);
        }
        if (typeof card.profileId === 'string' && card.profileId.trim()) {
            return safeProfileSlug(card.profileId);
        }
        if (typeof card.slug === 'string' && card.slug.trim()) {
            return safeProfileSlug(card.slug);
        }
        if (isMustafa(card.name)) {
            return 'mustafa-caki';
        }
        return null;
    }
    function normalizeName(name){return String(name||'').trim().toLocaleLowerCase('en');}
    function safeImage(value){
        if(typeof value!=='string'||!value.trim())return '';
        try{var url=new URL(value,location.href);return /^https?:$/.test(url.protocol)?url.href:'';}catch(_){return '';}
    }
    function captureBackup(){
        var track=document.getElementById('teamTrack');if(!track)return;
        Array.prototype.forEach.call(track.querySelectorAll('.team-card'),function(card){
            var name=card.querySelector('h3'),img=card.querySelector('.team-photo');
            if(name&&img&&img.getAttribute('src'))fallbackImages[normalizeName(name.textContent)]=img.getAttribute('src');
        });
    }
    function valid(data){
        return !!data&&typeof data==='object'&&['staff','mods','chefs','honors'].every(function(k){return Array.isArray(data[k]);})&&
            (!('cards' in data)||Array.isArray(data.cards))&&
            ['staff','mods','chefs','honors','cards'].every(function(k){return !data[k]||data[k].length<=1000;});
    }
    function backupPresent(){
        var track=document.getElementById('teamTrack');
        return !!(track&&track.querySelector('.team-card:not(.skeleton)'));
    }
    function showError(){
        if(backupPresent())return;
        var track=document.getElementById('teamTrack');if(!track)return;
        track.removeAttribute('aria-busy');track.replaceChildren();
        var note=document.createElement('p');note.className='story-quick-status';note.setAttribute('role','status');
        var messages={tr:'Ekip şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.',en:'The team is unavailable right now. Please try again later.',de:'Das Team ist derzeit nicht verfügbar.',fr:'L’équipe est indisponible.',es:'El equipo no está disponible.',it:'Il team non è disponibile.',pt:'A equipa está indisponível.',nl:'Het team is momenteel niet beschikbaar.',ru:'Список команды временно недоступен.',ar:'قائمة الفريق غير متاحة الآن.',hi:'टीम अभी उपलब्ध नहीं है।',id:'Tim belum tersedia.',ja:'現在チームを読み込めません。',ko:'지금은 팀을 불러올 수 없습니다.',zh:'暂时无法加载团队。',az:'Komanda hazırda yüklənmir.'};
        note.textContent=messages[lang]||messages.en;track.appendChild(note);
    }
    function renderCards(rows) {
        var track=document.getElementById('teamTrack'); if(!track)return;
        if(!Array.isArray(rows))return; // An intentionally emptied directory must not resurrect the HTML backup.
        track.replaceChildren(); var container=track.closest('.team-scroll-wrap'); if(container)container.hidden=false;
        var lang = (document.documentElement.lang || 'en').toLowerCase();
        var supportedLangs = ['ar','az','de','en','es','fr','hi','id','it','ja','ko','nl','pt','ru','tr','zh'];
        var currentLang = supportedLangs.indexOf(lang) !== -1 ? lang : 'en';
        rows.forEach(function(card){
            var item=document.createElement('div');item.className='team-card';
            var wrap=document.createElement('div');wrap.className='team-photo-wrap';
            var photo=document.createElement('img');photo.className='team-photo';photo.alt=card.name;photo.width=400;photo.height=400;photo.loading='lazy';photo.decoding='async';photo.src=safeImage(card.imageUrl)||fallbackImages[normalizeName(card.name)]||'../assets/logo.svg';
            photo.onerror=function(){var backup=fallbackImages[normalizeName(card.name)];if(backup && photo.src!==new URL(backup,location.href).href){photo.src=backup;return;}photo.remove();wrap.classList.add('team-photo-missing');wrap.textContent=card.name.slice(0,1);};wrap.appendChild(photo);
            var info=document.createElement('div');info.className='team-info';var name=document.createElement('h3');name.textContent=card.name;
            var hasBio=!!window.VertexTeamLinks.biography(card,currentLang);
            var profile=hasBio&&/^[a-zA-Z0-9_-]{1,128}$/.test(card.id||'')
              ? '/'+currentLang+'/profile.html?id='+encodeURIComponent(card.id) : null;
            if(profile){
                item.classList.add('has-profile');
                item.dataset.profileId=card.id;
                var link=document.createElement('a');link.className='team-profile-link';link.href=profile;link.textContent=card.name;name.replaceChildren(link);
                var photoLink=document.createElement('a');photoLink.href=profile;photoLink.setAttribute('aria-label',card.name);photoLink.setAttribute('tabindex','-1');photoLink.setAttribute('aria-hidden','true');photoLink.appendChild(photo);wrap.appendChild(photoLink);
                item.addEventListener('click',function(e){if(e.target.closest('.team-social')||e.target.closest('a'))return;window.location.href=profile;});
                link.addEventListener('keydown',function(e){if(e.key===' '){e.preventDefault();window.location.href=profile;}});
            }else{
                item.dataset.profileAvailable='false';
                item.classList.add('profile-unavailable');
            }
            var role=document.createElement('div');role.className='role';role.textContent=window.VertexTeamLinks.roleTitle(card,currentLang);
            var social=document.createElement('div');social.className='team-social';
            window.VertexTeamLinks.ordered(card.links).forEach(function(normalized){
                var a=document.createElement('a');a.href=normalized.href;
                if(normalized.key!=='email'){a.target='_blank';a.rel='noopener noreferrer';}
                a.setAttribute('aria-label',normalized.label+' · '+card.name);a.title=normalized.label;a.dataset.social=normalized.key;
                a.addEventListener('click',function(e){e.stopPropagation();});
                var img=document.createElement('img');img.alt='';img.src=normalized.icon;
                a.appendChild(img);social.appendChild(a);
            });
            info.append(name,role,social);item.append(wrap,info);track.appendChild(item);
        });track.dispatchEvent(new Event('scroll'));
    }
    function apply(data) {
        current = data;
        document.getElementById("teamTrack")?.removeAttribute("aria-busy");
        fill('modTrack', names(data.staff), 'mod-item');
        fill('staffTrack', names([].concat(data.mods || [], data.chefs || [])).sort(function(a,b){return a.localeCompare(b,document.documentElement.lang || 'en');}), 'mod-item');
        fill('honorTrack', names(data.honors), 'mod-item');
        fill('weeklyStarsTrack',names(data.weeklyStars),'mod-item weekly-star');
        renderCards(Array.isArray(data.cards)?data.cards:[]);
    }
    function load() {
        if(loading)return Promise.resolve();
        var cache=window.VertexPublicCache, cached=cache&&cache.read(cacheKey);
        if(cached&&valid(cached.value)&&!current)apply(cached.value);
        loading=true;
        function request(){
            var options={method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:{lang:lang}})};
            var transport=cache?cache.fetchJSON(ENDPOINT,options,10000):fetch(ENDPOINT,options).then(function(r){if(!r.ok)throw Error('unavailable');return r.json();});
            return transport.then(function(json){var data=json&&json.result;if(!valid(data))throw Error('invalid team response');return data;});
        }
        var task=cache?cache.load(cacheKey,request,valid,{ttl:60000,cooldownMs:120000}):request().then(function(value){return {value:value,source:'network'};});
        return task.then(function(result){
            // A fresh cache has already been painted; never thrash the cards on every reload.
            if(result.source==='network'||!current)apply(result.value);
        }).catch(function(error){
            console.warn('[team] showing last available directory',error);
            if(!current)showError();
        }).finally(function(){loading=false;});
    }
    function showLoading(){var track=document.getElementById('teamTrack');if(!track||track.children.length)return;var section=track.closest('section');if(section)section.hidden=false;track.setAttribute('aria-busy','true');for(var i=0;i<3;i++){var card=document.createElement('div');card.className='team-card skeleton';card.setAttribute('aria-hidden','true');track.appendChild(card);}}
    function start() {
        var oldLeads=document.getElementById('chefTrack');if(oldLeads&&oldLeads.closest('.name-block'))oldLeads.closest('.name-block').remove();
        captureBackup();
        // The server-rendered team cards are the built-in fallback on first visit.
        if(!backupPresent())showLoading();
        load();
        window.addEventListener('online',function(){if(!document.hidden)load();});
        document.addEventListener('visibilitychange',function(){
            if(document.hidden)return;
            var cached=window.VertexPublicCache&&window.VertexPublicCache.read(cacheKey);
            if(!cached||!cached.fresh)load();
        });
        function resizeNames(){
            if(!current)return;
            clearTimeout(timer);timer=setTimeout(function(){fill('modTrack',names(current.staff),'mod-item');fill('staffTrack',names([].concat(current.mods||[],current.chefs||[])).sort(function(a,b){return a.localeCompare(b,lang);}), 'mod-item');fill('honorTrack',names(current.honors),'mod-item');fill('weeklyStarsTrack',names(current.weeklyStars),'mod-item weekly-star');},120);
        }
        window.addEventListener('resize',resizeNames);
        if(document.fonts)document.fonts.ready.then(resizeNames);
        if(window.ResizeObserver){
            var observer=new ResizeObserver(resizeNames);
            ['modTrack','staffTrack','honorTrack','weeklyStarsTrack'].forEach(function(id){
                var track=document.getElementById(id);if(track)observer.observe(track.parentElement);
            });
        }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
