
const API_ENDPOINT = "https://europe-west1-vertex-ai-1618.cloudfunctions.net/getNewsCacheUrl";
const IMAGE_API_ENDPOINT = "https://europe-west1-vertex-ai-1618.cloudfunctions.net/getCoverDownloadUrl";

const I18N = {
    'en': { title: "Latest News", readMore: "Read More" },
    'tr': { title: "Son Haberler", readMore: "Devamını Oku" },
    'hi': { title: "नवीनतम समाचार", readMore: "और पढ़ें" },
    'ar': { title: "آخر الأخبار", readMore: "اقرأ المزيد" },
    'az': { title: "Son Xəbərlər", readMore: "Daha Çox Oxu" },
    'pt': { title: "Últimas Notícias", readMore: "Leia Mais" },
    'nl': { title: "Laatste Nieuws", readMore: "Lees Meer" },
    'id': { title: "Berita Terbaru", readMore: "Baca Selengkapnya" },
    'it': { title: "Ultime Novità", readMore: "Leggi Tutto" },
    'es': { title: "Últimas Noticias", readMore: "Leer Más" },
    'ru': { title: "Последние Новости", readMore: "Читать Далее" },
    'fr': { title: "Dernières Actualités", readMore: "Lire La Suite" },
    'ja': { title: "最新ニュース", readMore: "続きを読む" },
    'ko': { title: "최신 뉴스", readMore: "더 보기" },
    'zh': { title: "最新消息", readMore: "阅读更多" },
    'de': { title: "Aktuelle Neuigkeiten", readMore: "Weiterlesen" },
};

// Fallback data
const FALLBACK_NEWS = [{ "id": "the-era-of-boring-health-apps-is-ending", "translations": { "tr": { "summary": "İşte Ally!", "content": "Sadece adım sayan, ruhsuz uygulamalardan sıkıldın mı? Sıkıldın sıkıldın, biz de sıkıldık. Ally ile, sağlığınızı hayatınızın eğlenceli bir parçası yapıyoruz. Entegre donanımlarımızla beraber, amacımız dünya genelinde sağlıklı yaşam oranlarını artırmak ve akut ölümleri minimuma indirmek. Alfa test sürecine katılıp bu devrimin bir parçası olmaya ne dersin? Gel, geleceğin en gelişmiş sağlık ekosisteminin ilk adımlarını hep beraber atalım.", "title": "SIKICI SAĞLIK UYGULAMALARI DEVRİ BİTİYOR" }, "en": { "content": "Are you tired of soulless apps that just count steps? You’ve had enough, and so have we. With Ally, we are making your health a fun part of your life. Together with our integrated hardware, our goal is to increase healthy living rates worldwide and minimize acute deaths. How about joining the Alpha testing process and becoming a part of this revolution? Come, let's take the first steps of the most advanced health ecosystem of the future together.", "summary": "Meet Ally!", "title": "THE ERA OF BORING HEALTH APPS IS ENDING" } }, "cover": { "en": "news/covers/the-era-of-boring-health-apps-is-ending/1766923800106-en-cover.jpg", "tr": "news/covers/the-era-of-boring-health-apps-is-ending/1766923799776-tr-TR BANNER.png" }, "authorUid": "87F41GbxROdIYAweHiSRA5ZFIbS2", "slug": "the-era-of-boring-health-apps-is-ending", "references": ["https://allyishere.com"], "tags": ["ally", "health", "fitness", "gamification", "lifestyle", "habit-tracker", "wellbeing", "future-tech", "smart-health", "early-access", "biohacking", "alpha"], "publishedAt": "2025-12-28T12:10:07.414Z" }, { "id": "solar--the-key-to-the-cosmos", "slug": "solar--the-key-to-the-cosmos", "tags": ["solar", "browser", "web", "app"], "references": ["https://search.browser.solar/"], "translations": { "en": { "title": "SOLAR – THE KEY TO THE COSMOS", "summary": "solar is a next-generation browser project that offers a much faster, much safer, and much freer internet experience.", "content": "solar was built entirely from scratch. it runs on original engines and is fully open-source.\nthat means it doesn't track you — and it doesn't limit you either.\nperformance, personalization, and privacy now go hand in hand.\n\nthe mobile version of solar is coming soon.\nby the end of this summer, the desktop version will launch in open beta.\n\nand that's not all.\nintroducing solar search — an ai-powered search engine that comes with solar.\nad-free, tracker-free, and completely focused on understanding you and delivering exactly what you need.\nyou don’t have to know exactly what you’re looking for — solar search uses ai to understand what you mean.\n\nsolar goes beyond ordinary browsers;\nit’s the key to the digital universe." }, "tr": { "title": "SOLAR - KOZMOSUN ANAHTARI", "summary": "solar; çok daha hızlı, çok daha güvenli ve çok daha özgür bir internet deneyimi sunan yeni nesil tarayıcı projesidir.", "content": "solar; tamamen sıfırdan geliştirildi, özgün motorlarla çalışıyor ve açık kaynaklı.\nyani ne seni izliyor, ne de seni sınırlıyor.\nperformans, kişiselleştirme ve gizlilik artık bir arada.\n\nsoların mobil sürümü yakında çıkıyor.\nbu yazın sonunda ise bilgisayar sürümü açık beta olarak kullanıcılarla buluşacak.\n\nve hepsi bu kadar değil.\nsolar’la birlikte gelen solar search, yapay zeka destekli bir arama motoru.\nreklamsız, takipçisiz, tamamen seni anlayan ve ihtiyaç duyduğunu sana getiren bir sistem.\nne aradığını tam bilmek zorunda değilsin – yapay zeka destekli aramayla solar search senin ne demek istediğini anlar.\n\nsolar, sıradan tarayıcıların ötesinde;\ndijital uzaya açılan kapının anahtarı." } }, "authorUid": "87F41GbxROdIYAweHiSRA5ZFIbS2", "publishedAt": "2025-06-19T15:30:52.189Z", "cover": { "tr": "news/covers/solar--the-key-to-the-cosmos/tr-solar_banner.png", "en": "news/covers/solar--the-key-to-the-cosmos/en-solar_banner.png" } }, { "id": "we-are-breaking-ground-in-the-ai-industry", "slug": "we-are-breaking-ground-in-the-ai-industry", "tags": ["cortex", "app"], "references": [], "authorUid": "87F41GbxROdIYAweHiSRA5ZFIbS2", "publishedAt": "2025-06-18T20:58:42.808Z", "cover": { "tr": "news/covers/we-are-breaking-ground-in-the-ai-industry/tr-cortex_banner_tr.png", "en": "news/covers/we-are-breaking-ground-in-the-ai-industry/en-cortex_banner_en.png" }, "translations": { "en": { "title": "WE ARE BREAKING GROUND IN THE AI INDUSTRY", "summary": "cortex is set to revolutionize the world by offering users an efficient and offline ai experience on mobile devices, along with many unconventional features.", "content": "cortex is an advanced artificial intelligence application. it offers almost all popular ai models in a single app, minimizing complexity, it also provides an offline experience, so no one is left out in offline mode, it keeps data on the device, ensuring security, it allows users to create their own ais, it allows users to add their own models, it befriends you with characters inside, and can do much more.\n\nmoreover, cortex is completely open source, anyone can contribute to the project or create their own projects through cortex.\n\nas of august 2025, cortex is available on the play store and open to everyone, try it now!\n\ngotthelicensesohandsoff" }, "tr": { "title": "YAPAY ZEKA SEKTÖRÜNDE ÇIĞIR AÇIYORUZ", "content": "cortex, gelişmiş bir yapay zeka uygulamasıdır.\nnerdeyse tüm popüler yapay zeka modellerini tek uygulamadan sunarak karmaşıklığı minimuma indirir, kullanıcılara internetsiz deneyim de sunarak kimseyi yalnız bırakmaz, çevrimdışı modda verileri cihazda tutarak güvenliği sağlar, kullanıcıların kendi yapay zekalarını oluşturmasına izin verir, kullanıcıların kendi modellerini eklemesine izin verir, içindeki karakterlerle size dost olur ve çok daha fazlasını yapabilir.\n\nüstelik cortex tamamen açık kaynaklı, isteyen herkes projeye katkı yapabilir veya kendi projelerini cortex üzerinden oluşturabilir.\n\ncortex, haziran 2025 ağustos itibariyle Play Store üzerinde yayında ve herkesin erişimine açık, hemen deneyin!\n\nlisansıvarbuaradadenemeyinçalmayı", "summary": "cortex, kullanıcılara mobil cihazlarda son derece verimli ve çevrimdışı bir yapay zekâ deneyimi sunan, bunun yanı sıra birçok alışılmışın dışında özellikle donatılmış devrim niteliğinde bir mobil uygulamadır." } } }];


async function getSignedImageUrl(filePath) {
    if (!filePath) return '../assets/logo.webp';
    try {
        const response = await fetch(IMAGE_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: { filePath: filePath } })
        });
        if (!response.ok) return '../assets/logo.webp';
        const json = await response.json();
        return json.result?.signedUrl || '../assets/logo.webp';
    } catch (e) {
        console.warn("Image fetch failed", e);
        return '../assets/logo.webp';
    }
}

async function fetchNews() {
    const lang = document.documentElement.lang || 'en';
    const strings = I18N[lang] || I18N['en'];
    const container = document.getElementById('news-container');
    if (!container) return;

    try {
        // 1. Get Signed URL for JSON
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: null })
        });

        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const jsonResponse = await response.json();
        const signedUrl = jsonResponse.result?.signedUrl;

        if (!signedUrl) throw new Error("No signed URL returned");

        // 2. Fetch News Content
        const newsDataResponse = await fetch(signedUrl);
        if (!newsDataResponse.ok) throw new Error("Failed to fetch news data");

        const articles = await newsDataResponse.json();

        // 3. Render
        await renderNews(articles, container, lang, strings);

    } catch (error) {
        console.warn("News fetch failed, using fallback data:", error);
        await renderNews(FALLBACK_NEWS, container, lang, strings);

        const section = document.getElementById('news-section');
        if (section) section.style.display = 'block';
    }
}

async function renderNews(articles, container, lang, strings) {
    if (!articles || articles.length === 0) return;

    // Sort by date desc
    articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    let html = `
        <div class="container">
            <h2 class="section-title fade-up visible text-center mb-6" style="font-size: 36px;">${strings.title}</h2>
            <div class="news-grid">
    `;

    // Process all images in parallel
    const articlesWithImages = await Promise.all(articles.map(async (article) => {
        const rawPath = article.cover?.[lang] || article.cover?.['en'] || article.cover?.[Object.keys(article.cover)[0]];
        const imageUrl = await getSignedImageUrl(rawPath);
        return { ...article, imageUrl };
    }));

    articlesWithImages.forEach(article => {
        // Fallback to English if translation missing
        const content = article.translations[lang] || article.translations['en'];
        if (!content) return;

        const date = new Date(article.publishedAt).toLocaleDateString(lang, {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        // References
        const link = (article.references && article.references.length > 0) ? article.references[0] : '#';
        const hrefAttr = link === '#' ? 'javascript:void(0)' : link;
        const targetAttr = link === '#' ? '' : 'target="_blank"';

        html += `
            <a href="${hrefAttr}" ${targetAttr} class="card fade-up visible news-card animated-border">
                <div class="news-img-container">
                    <img src="${article.imageUrl}" alt="${content.title}" loading="lazy" onerror="this.src='../assets/favicon.webp'">
                </div>
                <div class="card-content">
                    <div class="news-date">${date}</div>
                    <h3>${content.title}</h3>
                    <p>${content.summary || (content.content ? content.content.substring(0, 100) + '...' : '')}</p>
                    <span class="read-more">${strings.readMore} &rarr;</span>
                </div>
            </a>
        `;
    });

    html += `
            </div>
        </div>
    `;

    container.innerHTML = html;
}

export { fetchNews };
