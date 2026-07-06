const fs = require('fs');
const path = require('path');

const localizationMap = {
    'tr': { terms: 'hizmet-sartlari.html', privacy: 'gizlilik-politikasi.html' },
    'ar': { terms: 'shurut-al-khidma.html', privacy: 'siyasat-al-khususiyya.html' },
    'az': { terms: 'xidmet-sertleri.html', privacy: 'mexfilik-siyaseti.html' },
    'de': { terms: 'nutzungsbedingungen.html', privacy: 'datenschutzrichtlinie.html' },
    'es': { terms: 'terminos-de-servicio.html', privacy: 'politica-de-privacidad.html' },
    'fr': { terms: 'conditions-d-utilisation.html', privacy: 'politique-de-confidentialite.html' },
    'hi': { terms: 'seva-ki-shartein.html', privacy: 'gopaniyata-niti.html' },
    'id': { terms: 'syarat-layanan.html', privacy: 'kebijakan-privasi.html' },
    'it': { terms: 'termini-di-servizio.html', privacy: 'informativa-sulla-privacy.html' },
    'ja': { terms: 'riyou-kiyaku.html', privacy: 'puraibashi-porishi.html' },
    'ko': { terms: 'iyong-yakgwan.html', privacy: 'gaein-jeongbo-cheori-bangchim.html' },
    'nl': { terms: 'servicevoorwaarden.html', privacy: 'privacybeleid.html' },
    'pt': { terms: 'termos-de-servico.html', privacy: 'politica-de-privacidade.html' },
    'ru': { terms: 'usloviya-obsluzhivaniya.html', privacy: 'politika-konfidencialnosti.html' },
    'zh': { terms: 'fuwu-tiaokuan.html', privacy: 'yinsi-zhengce.html' },
    'en': { terms: 'terms-of-service.html', privacy: 'privacy-policy.html' }
};

const baseDir = path.join(__dirname, '..');

const metaTags = (title) => `
    <link rel="icon" type="image/webp" href="/assets/favicon.webp">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="Vertex ${title} details and information.">
    <meta property="og:image" content="https://vertexishere.com/assets/favicon.webp">
    <meta property="og:url" content="https://vertexishere.com">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
`;

Object.keys(localizationMap).forEach(lang => {
    const langDir = path.join(baseDir, lang);
    if (!fs.existsSync(langDir)) return;

    // Handle Terms
    const oldTerms1 = path.join(langDir, 'terms-of-service.html');
    const oldTerms2 = path.join(langDir, 'hizmet-kosullari.html');
    const newTerms = path.join(langDir, localizationMap[lang].terms);
    
    let targetTerms = newTerms;
    if (fs.existsSync(oldTerms1)) targetTerms = oldTerms1;
    if (fs.existsSync(oldTerms2)) targetTerms = oldTerms2;
    if (fs.existsSync(newTerms)) targetTerms = newTerms;
    
    if (fs.existsSync(targetTerms)) {
        let content = fs.readFileSync(targetTerms, 'utf8');
        let titleMatch = content.match(/<title>(.*?)<\/title>/i);
        let title = titleMatch ? titleMatch[1] : 'Vertex Terms of Service';
        
        // Clear all previous injected tags
        content = content.replace(/<link rel="icon".*?>/g, '');
        content = content.replace(/<meta property="og:.*?>/g, '');
        content = content.replace(/<meta name="twitter:.*?>/g, '');
        
        content = content.replace('</head>', metaTags(title) + '</head>');
        
        fs.writeFileSync(newTerms, content, 'utf8');
        if (targetTerms !== newTerms && fs.existsSync(targetTerms)) {
            fs.unlinkSync(targetTerms);
        }
        console.log(`Updated ${lang}/${localizationMap[lang].terms}`);
    }

    // Handle Privacy
    const oldPrivacy = path.join(langDir, 'privacy-policy.html');
    const newPrivacy = path.join(langDir, localizationMap[lang].privacy);
    
    let targetPrivacy = oldPrivacy;
    if (fs.existsSync(newPrivacy)) targetPrivacy = newPrivacy;

    if (fs.existsSync(targetPrivacy)) {
        let content = fs.readFileSync(targetPrivacy, 'utf8');
        let titleMatch = content.match(/<title>(.*?)<\/title>/i);
        let title = titleMatch ? titleMatch[1] : 'Vertex Privacy Policy';
        
        content = content.replace(/<link rel="icon".*?>/g, '');
        content = content.replace(/<meta property="og:.*?>/g, '');
        content = content.replace(/<meta name="twitter:.*?>/g, '');
        
        content = content.replace('</head>', metaTags(title) + '</head>');
        
        fs.writeFileSync(newPrivacy, content, 'utf8');
        if (targetPrivacy !== newPrivacy && fs.existsSync(targetPrivacy)) {
            fs.unlinkSync(targetPrivacy);
        }
        console.log(`Updated ${lang}/${localizationMap[lang].privacy}`);
    }
});
