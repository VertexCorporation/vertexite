const fs = require('fs');
const path = require('path');

const langs = {
    'tr': 'aramiza-katil.html',
    'en': 'join-us.html',
    'ar': 'join-us.html',
    'az': 'join-us.html',
    'de': 'join-us.html',
    'es': 'join-us.html',
    'fr': 'join-us.html',
    'hi': 'join-us.html',
    'id': 'join-us.html',
    'it': 'join-us.html',
    'ja': 'join-us.html',
    'ko': 'join-us.html',
    'nl': 'join-us.html',
    'pt': 'join-us.html',
    'ru': 'join-us.html',
    'zh': 'join-us.html'
};

const baseDir = path.join(__dirname, '..');

Object.keys(langs).forEach(lang => {
    const indexPath = path.join(baseDir, lang, 'index.html');
    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf-8');
        const targetUrl = langs[lang];
        
        // Replace onclick function
        content = content.replace(/onclick="openJoinModal\(\)"/g, `onclick="window.location.href='${targetUrl}'"`);
        
        fs.writeFileSync(indexPath, content);
        console.log('Updated:', indexPath);
    }
});
