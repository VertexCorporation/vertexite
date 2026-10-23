
const API_ENDPOINT = "https://europe-west1-vertex-ai-1618.cloudfunctions.net/getNewsCacheUrl";
const IMAGE_API_ENDPOINT = "https://europe-west1-vertex-ai-1618.cloudfunctions.net/getCoverDownloadUrl";

const I18N = {
    'en': { title: "Latest News", readMore: "Read More", source: "Source", close: "Close" },
    'tr': { title: "Son Haberler", readMore: "Devamını Oku", source: "Kaynak", close: "Kapat" },
    'hi': { title: "नवीनतम समाचार", readMore: "और पढ़ें", source: "स्रोत", close: "बंद करें" },
    'ar': { title: "آخر الأخبار", readMore: "اقرأ المزيد", source: "المصدر", close: "إغلاق" },
    'az': { title: "Son Xəbərlər", readMore: "Daha Çox Oxu", source: "Mənbə", close: "Bağla" },
    'pt': { title: "Últimas Notícias", readMore: "Leia Mais", source: "Fonte", close: "Fechar" },
    'nl': { title: "Laatste Nieuws", readMore: "Lees Meer", source: "Bron", close: "Sluiten" },
    'id': { title: "Berita Terbaru", readMore: "Baca Selengkapnya", source: "Sumber", close: "Tutup" },
    'it': { title: "Ultime Novità", readMore: "Leggi Tutto", source: "Fonte", close: "Chiudi" },
    'es': { title: "Últimas Noticias", readMore: "Leer Más", source: "Fuente", close: "Cerrar" },
    'ru': { title: "Последние Новости", readMore: "Читать Далее", source: "Источник", close: "Закрыть" },
    'fr': { title: "Dernières Actualités", readMore: "Lire La Suite", source: "Source", close: "Fermer" },
    'ja': { title: "最新ニュース", readMore: "続きを読む", source: "ソース", close: "閉じる" },
    'ko': { title: "최신 뉴스", readMore: "더 보기", source: "출처", close: "닫기" },
    'zh': { title: "最新消息", readMore: "阅读更多", source: "来源", close: "关闭" },
    'de': { title: "Aktuelle Neuigkeiten", readMore: "Weiterlesen", source: "Quelle", close: "Schließen" },
};

// Fallback data
const FALLBACK_NEWS = [{ "id": "the-era-of-boring-health-apps-is-ending", "translations": { "tr": { "summary": "İşte Ally!", "content": "Sadece adım sayan, ruhsuz uygulamalardan sıkıldın mı? Sıkıldın sıkıldın, biz de sıkıldık. Ally ile, sağlığınızı hayatınızın eğlenceli bir parçası yapıyoruz. Entegre donanımlarımızla beraber, amacımız dünya genelinde sağlıklı yaşam oranlarını artırmak ve akut ölümleri minimuma indirmek. Alfa test sürecine katılıp bu devrimin bir parçası olmaya ne dersin? Gel, geleceğin en gelişmiş sağlık ekosisteminin ilk adımlarını hep beraber atalım.", "title": "SIKICI SAĞLIK UYGULAMALARI DEVRİ BİTİYOR" }, "en": { "content": "Are you tired of soulless apps that just count steps? You’ve had enough, and so have we. With Ally, we are making your health a fun part of your life. Together with our integrated hardware, our goal is to increase healthy living rates worldwide and minimize acute deaths. How about joining the Alpha testing process and becoming a part of this revolution? Come, let's take the first steps of the most advanced health ecosystem of the future together.", "summary": "Meet Ally!", "title": "THE ERA OF BORING HEALTH APPS IS ENDING" } }, "cover": { "en": "news/covers/the-era-of-boring-health-apps-is-ending/1766923800106-en-cover.jpg", "tr": "news/covers/the-era-of-boring-health-apps-is-ending/1766923799776-tr-TR BANNER.png" }, "authorUid": "87F41GbxROdIYAweHiSRA5ZFIbS2", "slug": "the-era-of-boring-health-apps-is-ending", "references": ["https://allyishere.com"], "tags": ["ally", "health", "fitness", "gamification", "lifestyle", "habit-tracker", "wellbeing", "future-tech", "smart-health", "early-access", "biohacking", "alpha"], "publishedAt": "2025-12-28T12:10:07.414Z" }, { "id": "we-are-breaking-ground-in-the-ai-industry", "slug": "we-are-breaking-ground-in-the-ai-industry", "tags": ["cortex", "app"], "references": [], "authorUid": "87F41GbxROdIYAweHiSRA5ZFIbS2", "publishedAt": "2025-06-18T20:58:42.808Z", "cover": { "tr": "news/covers/we-are-breaking-ground-in-the-ai-industry/tr-cortex_banner_tr.png", "en": "news/covers/we-are-breaking-ground-in-the-ai-industry/en-cortex_banner_en.png" }, "translations": { "en": { "title": "WE ARE BREAKING GROUND IN THE AI INDUSTRY", "summary": "cortex is set to revolutionize the world by offering users an efficient and offline ai experience on mobile devices, along with many unconventional features.", "content": "cortex is an advanced artificial intelligence application. it offers almost all popular ai models in a single app, minimizing complexity, it also provides an offline experience, so no one is left out in offline mode, it keeps data on the device, ensuring security, it allows users to create their own ais, it allows users to add their own models, it befriends you with characters inside, and can do much more.\n\nmoreover, cortex is completely open source, anyone can contribute to the project or create their own projects through cortex.\n\nas of august 2025, cortex is available on the play store and open to everyone, try it now!\n\ngotthelicensesohandsoff" }, "tr": { "title": "YAPAY ZEKA SEKTÖRÜNDE ÇIĞIR AÇIYORUZ", "content": "cortex, gelişmiş bir yapay zeka uygulamasıdır.\nnerdeyse tüm popüler yapay zeka modellerini tek uygulamadan sunarak karmaşıklığı minimuma indirir, kullanıcılara internetsiz deneyim de sunarak kimseyi yalnız bırakmaz, çevrimdışı modda verileri cihazda tutarak güvenliği sağlar, kullanıcıların kendi yapay zekalarını oluşturmasına izin verir, kullanıcıların kendi modellerini eklemesine izin verir, içindeki karakterlerle size dost olur ve çok daha fazlasını yapabilir.\n\nüstelik cortex tamamen açık kaynaklı, isteyen herkes projeye katkı yapabilir veya kendi projelerini cortex üzerinden oluşturabilir.\n\ncortex, haziran 2025 ağustos itibariyle Play Store üzerinde yayında ve herkesin erişimine açık, hemen deneyin!\n\nlisansıvarbuaradadenemeyinçalmayı", "summary": "cortex, kullanıcılara mobil cihazlarda son derece verimli ve çevrimdışı bir yapay zekâ deneyimi sunan, bunun yanı sıra birçok alışılmışın dışında özellikle donatılmış devrim niteliğinde bir mobil uygulamadır." } } }];



const NEWS_KEY = 'news:published';
const COVER_FALLBACK = '/assets/logo.svg';
const NEWS_LIMIT = 36;

function validArticles(value) {
    return Array.isArray(value) && value.length > 0 && value.length <= 1000 &&
        value.every(item => item && typeof item === 'object' && typeof item.id === 'string' &&
            item.translations && typeof item.translations === 'object');
}
function validURL(value) {
    try {
        const url = new URL(value, location.href);
        return (url.protocol === 'https:' || url.protocol === 'http:') ? url.href : '';
    } catch (_) { return ''; }
}
function signedExpiry(url) {
    try {
        const query = new URL(url).searchParams;
        const rawDate = query.get('X-Goog-Date') || query.get('X-Amz-Date');
        const seconds = Number(query.get('X-Goog-Expires') || query.get('X-Amz-Expires'));
        if (rawDate && /^[0-9]{8}T[0-9]{6}Z$/.test(rawDate) && Number.isFinite(seconds) && seconds > 0) {
            const time = Date.UTC(Number(rawDate.slice(0,4)), Number(rawDate.slice(4,6))-1,
                Number(rawDate.slice(6,8)), Number(rawDate.slice(9,11)),
                Number(rawDate.slice(11,13)), Number(rawDate.slice(13,15)));
            return Math.min(time + seconds * 1000 - 60000, Date.now() + 24 * 3600 * 1000);
        }
    } catch (_) {}
    // The provider may omit expiry metadata: re-sign conservatively.
    return Date.now() + 5 * 60 * 1000;
}

const coverPromises = new Map();
async function getSignedImageUrl(filePath) {
    if (!filePath || typeof filePath !== 'string') return COVER_FALLBACK;
    if (/^https?:\/\//i.test(filePath)) return validURL(filePath) || COVER_FALLBACK;
    const cache = window.VertexPublicCache;
    const key = 'news-cover:' + filePath;
    const saved = cache && cache.read(key);
    if (saved && saved.value && saved.value.expiresAt > Date.now() + 10000 &&
        validURL(saved.value.url)) return saved.value.url;
    if (coverPromises.has(filePath)) return coverPromises.get(filePath);
    const promise = (async () => {
        try {
            const options = {method:'POST',headers:{'Content-Type':'application/json'},
                body:JSON.stringify({data:{filePath}})};
            const json = cache ? await cache.fetchJSON(IMAGE_API_ENDPOINT,options,10000)
                : await fetch(IMAGE_API_ENDPOINT,options).then(r=>{if(!r.ok)throw Error('cover unavailable');return r.json();});
            const url = validURL(json && json.result && json.result.signedUrl);
            if (!url) return COVER_FALLBACK;
            const expiresAt = signedExpiry(url);
            if (cache && expiresAt > Date.now() + 15000) cache.save(key,{url,expiresAt});
            return url;
        } catch (error) {
            console.warn('[news] cover unavailable',error);
            return COVER_FALLBACK;
        }
    })().finally(()=>coverPromises.delete(filePath));
    coverPromises.set(filePath,promise);
    return promise;
}
function visibleNews(items) {
    return items.filter(article => {
        const id = String(article.id || '').toLowerCase(), slug = String(article.slug || '').toLowerCase();
        const tags = Array.isArray(article.tags)?article.tags.map(t=>String(t).toLowerCase()):[];
        const titles = Object.values(article.translations||{}).map(t=>String((t&&t.title)||'').toLowerCase());
        return !id.includes('solar') && !slug.includes('solar') &&
            !tags.includes('solar') && !titles.some(title=>title.includes('solar'));
    }).sort((a,b)=>new Date(b.publishedAt||0)-new Date(a.publishedAt||0));
}
async function fetchRemoteNews() {
    const cache = window.VertexPublicCache;
    const options = {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:null})};
    const response = cache ? await cache.fetchJSON(API_ENDPOINT,options,12000)
        : await fetch(API_ENDPOINT,options).then(r=>{if(!r.ok)throw Error('news URL unavailable');return r.json();});
    const signedUrl = validURL(response && response.result && response.result.signedUrl);
    if (!signedUrl) throw new Error('invalid news download URL');
    const data = cache ? await cache.fetchJSON(signedUrl,{method:'GET',credentials:'omit'},12000)
        : await fetch(signedUrl).then(r=>{if(!r.ok)throw Error('news unavailable');return r.json();});
    if (!validArticles(data)) throw new Error('invalid news data');
    return visibleNews(data);
}
function makeElement(tag,className,text) {
    const node=document.createElement(tag);
    if(className)node.className=className;
    if(text!=null)node.textContent=text;
    return node;
}
// Cache public cover bytes by their stable storage path, not the expiring signed URL.
// This survives reloads and language navigation; failures never replace a saved image.
const COVER_CACHE = 'vertex-news-covers-v1';
const COVER_TTL = 7 * 24 * 60 * 60 * 1000;
const coverSources = new Map();
async function getCoverSource(path) {
    if (coverSources.has(path)) return coverSources.get(path).then(source => ({...source, cached:true}));
    const promise = (async () => {
        let cache;
        const key = new URL('/__vertex_news_cover', location.href);
        key.searchParams.set('path', path);
        try {
            cache = await window.caches.open(COVER_CACHE);
            const saved = await cache.match(key.href);
            const age = saved ? Date.now() - Number(saved.headers.get('x-vertex-saved-at')) : NaN;
            if (saved && age >= 0 && age < COVER_TTL) {
                return {url: URL.createObjectURL(await saved.blob()), cached: true};
            }
            if (saved) await cache.delete(key.href);
        } catch (_) { /* Private browsing or storage limits: use normal HTTP caching. */ }
        const url = await getSignedImageUrl(path);
        if (!cache || url === COVER_FALLBACK) return {url, cached: false};
        try {
            const abort = new AbortController();
            const timer = setTimeout(() => abort.abort(), 12000);
            let blob;
            try {
                const response = await fetch(url, {credentials:'omit', signal:abort.signal});
                if (!response.ok) throw new Error('cover unavailable');
                blob = await response.blob();
            } finally { clearTimeout(timer); }
            if (!blob.type.startsWith('image/') || !blob.size || blob.size > 4 * 1024 * 1024) {
                return {url, cached:false};
            }
            try {
                await cache.delete(key.href);
                await cache.put(key.href, new Response(blob, {headers: {
                    'Content-Type':blob.type, 'x-vertex-saved-at':String(Date.now())
                }}));
                const keys = await cache.keys();
                await Promise.all(keys.slice(0, Math.max(0, keys.length - 48)).map(old => cache.delete(old)));
            } catch (_) { /* A full cache must not stop the cover from displaying. */ }
            return {url:URL.createObjectURL(blob), cached:false};
        } catch (_) { return {url, cached:false}; } // CORS failures still allow an ordinary <img>.
    })();
    coverSources.set(path, promise);
    const result = await promise;
    // Retry unavailable covers on the next render instead of memorizing the fallback.
    if (result.url === COVER_FALLBACK) coverSources.delete(path);
    return result;
}
function setCoverImage(img,article,lang) {
    const cover=img.parentElement;
    const fallbackUrl=new URL(COVER_FALLBACK,location.href).href;
    let loadingTimer;
    const finish=()=>{clearTimeout(loadingTimer);cover.classList.remove('is-loading');};
    img.addEventListener('load',finish);
    img.addEventListener('error',()=>{
        finish();
        const covers=article.cover||{};
        const path=covers[lang]||covers.en||Object.values(covers)[0];
        coverSources.delete(path);
        if(img.src!==fallbackUrl)img.src=COVER_FALLBACK;
    });
    const covers=article.cover||{};
    const path=covers[lang]||covers.en||Object.values(covers)[0];
    if(!path){img.src=COVER_FALLBACK;return;}
    let started=false;
    const load=async()=>{
        if(started)return;
        started=true;
        // Cached/quick images paint directly, without replaying a loading animation.
        loadingTimer=setTimeout(()=>cover.classList.add('is-loading'),150);
        const source=await getCoverSource(path);
        if(source.cached) {
            cover.classList.add('is-cached');
            finish();
        }
        img.src=source.url;
        if(img.complete && img.naturalWidth>0)finish();
    };
    if('IntersectionObserver' in window) {
        const observer=new IntersectionObserver(entries=>{
            if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();load();}
        },{rootMargin:'160px'});
        observer.observe(img);
    } else load();
}
function renderNews(articles,container,lang,strings) {
    const visible=visibleNews(articles).slice(0,NEWS_LIMIT);
    const grid=document.createDocumentFragment();
    visible.forEach((article,index)=>{
        const content=(article.translations||{})[lang]||(article.translations||{}).en||
            Object.values(article.translations||{})[0];
        if(!content||!content.title)return;
        const card=makeElement('article','vertex-news-card');
        const cover=makeElement('div','vertex-news-cover');
        const image=makeElement('img','vertex-news-image');
        image.alt='';image.loading='lazy';image.decoding='async';
        cover.appendChild(image);setCoverImage(image,article,lang);
        const contentWrap=makeElement('div','vertex-news-content');
        const dateValue=new Date(article.publishedAt);
        if(!isNaN(dateValue.valueOf())){
            const date=makeElement('time','vertex-news-date',dateValue.toLocaleDateString(lang,{day:'numeric',month:'long',year:'numeric'}));
            date.dateTime=dateValue.toISOString();contentWrap.appendChild(date);
        }
        contentWrap.appendChild(makeElement('h3','vertex-news-title',content.title));
        const summaryText=content.summary || (content.content ? content.content.slice(0,170)+'…' : '');
        const copy=makeElement('div','vertex-news-copy');
        const summaryPanel=makeElement('div','vertex-news-summary-panel');
        const summaryInner=makeElement('div','vertex-news-panel-inner');
        summaryInner.appendChild(makeElement('p','vertex-news-summary',summaryText));
        summaryPanel.appendChild(summaryInner);
        const detail=makeElement('div','vertex-news-detail');
        detail.id='vertex-news-detail-'+index;
        detail.inert=true;
        detail.setAttribute('aria-hidden','true');
        const detailInner=makeElement('div','vertex-news-panel-inner');
        detailInner.appendChild(makeElement('p','vertex-news-body',content.content||summaryText));
        const source=Array.isArray(article.references)?validURL(article.references[0]):'';
        if(source){
            const link=makeElement('a','vertex-news-source',strings.source+' ↗');
            link.href=source;link.target='_blank';link.rel='noopener noreferrer';detailInner.appendChild(link);
        }
        detail.appendChild(detailInner);
        copy.append(summaryPanel,detail);
        contentWrap.appendChild(copy);
        const button=makeElement('button','vertex-news-toggle',strings.readMore+' ↓');
        button.type='button';button.setAttribute('aria-expanded','false');
        button.setAttribute('aria-controls',detail.id);
        button.addEventListener('click',()=>{
            const expand=button.getAttribute('aria-expanded')!=='true';
            card.classList.toggle('is-expanded',expand);
            button.setAttribute('aria-expanded',String(expand));
            detail.inert=!expand;
            detail.setAttribute('aria-hidden',String(!expand));
            summaryPanel.setAttribute('aria-hidden',String(expand));
            button.textContent=expand?strings.close+' ↑':strings.readMore+' ↓';
        });
        contentWrap.appendChild(button);
        card.append(cover,contentWrap);grid.appendChild(card);
    });
    container.replaceChildren(grid);
    container.removeAttribute('aria-busy');
}
let activeLoad = null;
async function fetchNews() {
    if(activeLoad)return activeLoad;
    const container=document.getElementById('news-container');
    if(!container)return;
    const lang=(document.documentElement.lang||'en').toLowerCase().split('-')[0];
    const strings=I18N[lang]||I18N.en;
    const cache=window.VertexPublicCache;
    const snapshot=cache&&cache.read(NEWS_KEY);
    if(snapshot&&validArticles(snapshot.value))renderNews(snapshot.value,container,lang,strings);
    activeLoad=(async()=>{
        try {
            const result=cache?await cache.load(NEWS_KEY,fetchRemoteNews,validArticles,{cooldownMs:180000})
                : {value:await fetchRemoteNews(),source:'network'};
            if(result.source==='network'||!snapshot)renderNews(result.value,container,lang,strings);
        } catch(error) {
            console.warn('[news] retaining saved or bundled stories',error);
            if(!snapshot||!validArticles(snapshot.value))renderNews(FALLBACK_NEWS,container,lang,strings);
        } finally {
            container.removeAttribute('aria-busy');
        }
    })().finally(()=>{activeLoad=null;});
    return activeLoad;
}
function bootPublicNews() {
    const section=document.getElementById('news-section');
    if(!section)return;
    if('IntersectionObserver' in window){
        const observer=new IntersectionObserver(entries=>{
            if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();fetchNews();}
        },{rootMargin:'750px'});
        observer.observe(section);
    } else fetchNews();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootPublicNews);
else bootPublicNews();
export { fetchNews };
