const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const languages = [
  'ar', 'az', 'de', 'en', 'es', 'fr', 'hi', 'id',
  'it', 'ja', 'ko', 'nl', 'pt', 'ru', 'tr', 'zh'
];

const linksTitles = {
  tr: 'Bağlantılar',
  en: 'Links',
  de: 'Links',
  fr: 'Liens',
  es: 'Enlaces',
  it: 'Link',
  pt: 'Links',
  nl: 'Links',
  ru: 'Ссылки',
  ar: 'الروابط',
  hi: 'लिंक्स',
  id: 'Tautan',
  ja: 'リンク',
  ko: '링크',
  zh: '链接',
  az: 'Keçidlər'
};

const trBio = `<p>Öğretmen babamla sürekli yer değiştirirken derin yoksulluğa; sokaklara kaybettiğimiz arkadaşlara ve sağlık hizmetlerine erişemeyen ailelere tanık oldum. Motivasyonum, bu acıları ortadan kaldırmak. Atatürk’ün Türkiye’yi kalkındırma yolculuğunu başlatmasının üzerinden bir yüzyıl geçti; onun görevi henüz tamamlanmadı.</p><p>Nihai hedefim küresel Eudaimonia, yani insanların gerçek anlamda esenliğe ve refaha ulaşması. Anlamlı bir etkiyi büyütmenin en hızlı yolunu sunduğu için teknolojiyi seçtim.</p><p>Lise öğrencileri olarak onlarca ret ve hukuki engelle karşılaşmamıza rağmen Cortex’i geliştirdik ve pazarlama harcaması yapmadan dünya genelinde organik olarak 100.000’den fazla kullanıcıya ulaştık.</p><p>Vertex’te geçirdiğim üç yılda binlerce insana, yüzlerce zorlukta liderlik ettim. Her insanın içinde saklı bir kıvılcım olduğuna inanıyorum. En büyük gücüm, bu kıvılcımları ortak bir ateşe dönüştürmek.</p><p>Teknopark Lisesi’ni iki puanla kaçırdım. Öğrenci olarak giremediğim yere bir girişim kurup CEO olarak döndüm. Üç yıl sonra Vertex, Teknopark’ın kuluçka programına girdi. Bir kapı kapandı; ben de başka bir kapıyı açtım.</p><p>On yıl içinde dünyanın en büyük şirketlerinden birine liderlik etmeyi; teknolojiyle Türkiye’yi kalkındırmayı ve dünya çapında refahı ilerletmeyi hedefliyorum. Benim için bu, çoktan yazılmış bir kader; tek görevim onu yaşamak.</p>`;

const enBio = `<p>Moving constantly with my teacher father, I witnessed extreme poverty; friends lost to the streets and families denied healthcare. My motivation is eradicating this suffering. A century after Atatürk began uplifting Türkiye, his mission remains unfinished.</p><p>My ultimate goal is global Eudaimonia, true human prosperity. I chose technology because it offers the fastest way to scale meaningful impact.</p><p>Despite dozens of rejections and legal hurdles as high schoolers, we built Cortex and organically reached 100,000+ global users without marketing spend.</p><p>Over three years at Vertex, I've led thousands of people through hundreds of challenges. I believe everyone carries a hidden spark, and my greatest strength is turning those sparks into collective fire.</p><p>I missed Teknopark High School by two points. Unable to enter as a student, I founded a startup and returned as a CEO. Three years later, Vertex entered Teknopark's incubation. One door closed, so I kicked down another.</p><p>In ten years, I intend to lead one of the world's largest companies, using technology to uplift Türkiye and advance prosperity worldwide. To me, this is already written destiny; my only job is to live it out.</p>`;

const hreflangs = languages.map(l => `<link rel="alternate" hreflang="${l}" href="https://vertexishere.com/${l}/mustafa-caki">`).join('') +
  `<link rel="alternate" hreflang="x-default" href="https://vertexishere.com/en/mustafa-caki">`;

for (const lang of languages) {
  const indexFile = path.join(root, lang, 'index.html');
  if (!fs.existsSync(indexFile)) {
    console.error(`Index file not found for ${lang}: ${indexFile}`);
    continue;
  }
  let html = fs.readFileSync(indexFile, 'utf8');

  const isTr = lang === 'tr';
  const role = isTr ? 'Kurucu Ortak &amp; CEO' : 'Co-Founder &amp; CEO';
  const jobTitle = isTr ? 'Kurucu Ortak & CEO' : 'Co-Founder & CEO';
  const title = isTr ? 'Mustafa Çakı | Kurucu Ortak & CEO · Vertex' : 'Mustafa Çakı | Co-Founder & CEO · Vertex';
  const desc = isTr
    ? "Mustafa Çakı, Vertex Kurucu Ortağı ve CEO'su. Yaşamı, teknoloji vizyonu ve profesyonel bağlantıları."
    : 'Mustafa Çakı, Co-Founder & CEO of Vertex. His story, technology vision and professional links.';
  const bio = isTr ? trBio : enBio;
  const linksTitle = linksTitles[lang] || 'Links';

  // 1. Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);

  // 2. Replace meta description
  html = html.replace(/<meta content="[^"]*" name="description"\/>/, `<meta content="${desc}" name="description"/>`);
  html = html.replace(/<meta name="description" content="[^"]*"\/>/, `<meta content="${desc}" name="description"/>`);

  // 3. Replace og:title, og:description, twitter:title, twitter:description, og:url
  html = html.replace(/<meta content="[^"]*" property="og:title"\/>/g, `<meta content="${title}" property="og:title"/>`);
  html = html.replace(/<meta content="[^"]*" property="og:description"\/>/g, `<meta content="${desc}" property="og:description"/>`);
  html = html.replace(/<meta content="[^"]*" name="twitter:title"\/>/g, `<meta content="${title}" name="twitter:title"/>`);
  html = html.replace(/<meta content="[^"]*" name="twitter:description"\/>/g, `<meta content="${desc}" name="twitter:description"/>`);
  html = html.replace(/<meta property="og:url" content="[^"]*">/g, `<meta property="og:url" content="https://vertexishere.com/${lang}/mustafa-caki">`);

  // 4. Remove any existing hreflangs and canonical from index.html head
  html = html.replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*">/g, '');
  html = html.replace(/<link rel="canonical" href="[^"]*">/g, '');

  // 5. Build canonical and hreflang block
  const seoHeadBlock = `${hreflangs}<link rel="canonical" href="https://vertexishere.com/${lang}/mustafa-caki">` +
    `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Person","name":"Mustafa Çakı","jobTitle":"${jobTitle}","url":"https://vertexishere.com/${lang}/mustafa-caki","image":"https://vertexishere.com/assets/team/MUSTAFACAKI.webp","worksFor":{"@type":"Organization","name":"Vertex","url":"https://vertexishere.com"},"sameAs":["https://www.linkedin.com/in/mustawtfa/","https://www.instagram.com/mustawtfa/"]}</script>`;

  html = html.replace('</head>', `${seoHeadBlock}</head>`);

  // 6. Fix header nav links so anchors like #home become /{lang}/#home
  html = html.replace(/href="#([a-zA-Z0-9_-]+)"/g, `href="/${lang}/#$1"`);

  // 7. Update language dropdown items to link directly to /{l}/mustafa-caki
  html = html.replace(/<div class="lang-panel" role="menu">([\s\S]*?)<\/div>/, (match, inner) => {
    let updatedInner = inner;
    for (const l of languages) {
      const reg = new RegExp(`href="[^"]*\\b${l}\\/?"`, 'g');
      updatedInner = updatedInner.replace(reg, `href="/${l}/mustafa-caki"`);
    }
    // Update active class
    updatedInner = updatedInner.replace(/class="lang-row active"/g, 'class="lang-row"');
    const activeReg = new RegExp(`href="/${lang}/mustafa-caki"`, 'g');
    updatedInner = updatedInner.replace(activeReg, `href="/${lang}/mustafa-caki" class="lang-row active"`);
    // Clean up duplicate class attributes if created
    updatedInner = updatedInner.replace(/class="lang-row"\s+class="lang-row active"/g, 'class="lang-row active"');
    return `<div class="lang-panel" role="menu">${updatedInner}</div>`;
  });

  // 8. Replace <main>...</main> with profile page
  const mainContent = `<main class="profile-page wrap"><article><header class="profile-heading"><div class="profile-photo-box"><img src="/assets/team/MUSTAFACAKI.webp" alt="Mustafa Çakı" fetchpriority="high" width="784" height="1024"></div><div><h1>Mustafa Çakı</h1><p>${role} · Vertex</p></div></header><div class="profile-layout"><div class="profile-bio">${bio}</div><aside class="profile-links"><h2>${linksTitle}</h2><a href="https://www.linkedin.com/in/mustawtfa/" target="_blank" rel="noopener noreferrer"><svg class="profile-link-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg><span>LinkedIn ↗</span></a><a href="https://www.instagram.com/mustawtfa/" target="_blank" rel="noopener noreferrer"><svg class="profile-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg><span>Instagram ↗</span></a></aside></div></article></main>`;

  html = html.replace(/<main>[\s\S]*?<\/main>/, mainContent);
  html = html.replace(/<main class="profile-page wrap">[\s\S]*?<\/main>/, mainContent);

  const outFile = path.join(root, lang, 'mustafa-caki.html');
  fs.writeFileSync(outFile, html, 'utf8');
  console.log(`Generated: ${path.relative(root, outFile)}`);
}

console.log('Profile generation complete for all 16 languages.');
