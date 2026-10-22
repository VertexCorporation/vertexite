'use strict';
// Regenerate the biography shell from each localized homepage; no separate nav/footer copy.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const langs=['ar','az','de','en','es','fr','hi','id','it','ja','ko','nl','pt','ru','tr','zh'];
for(const lang of langs){
 const home=fs.readFileSync(path.join(root,lang,'index.html'),'utf8');
 const original=fs.readFileSync(path.join(root,lang,'profile.html'),'utf8');
 const header=home.match(/<header id="siteHeader">[\s\S]*?<\/header>/)?.[0];
 const footer=home.match(/<footer>[\s\S]*?<\/footer>/)?.[0];
 const main=original.match(/<main[\s\S]*?<\/main>/)?.[0];
 if(!header||!footer||!main)throw Error('Missing shell for '+lang);
 const localize=html=>html.replace(/href="#([^"]*)"/g,(_,hash)=>'href="/'+lang+'/#'+hash+'"');
 const theme=home.match(/<script>\s*\(function\(\)\{try\{var t=localStorage[\s\S]*?<\/script>/)?.[0]||'';
 const html='<!doctype html>\n<html lang="'+lang+'"'+(lang==='ar'?' dir="rtl"':'')+'>\n<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n'+
 '<meta name="robots" content="noindex,follow"><title>Vertex | Profile</title>\n'+theme+'\n'+
 '<link id="vertex-favicon" rel="icon" href="/assets/favicon-light.svg" type="image/svg+xml">\n'+
 '<link rel="stylesheet" href="/assets/fonts/fonts.css">\n'+
 '<link rel="stylesheet" href="/css/layout/site-shell.css?v=profiles261021">\n'+
 '<link rel="stylesheet" href="/css/site-design.css?v=profiles261021">\n'+
 '<link rel="stylesheet" href="/css/pages/team-profile.css?v=biography261022">\n'+
 '<script defer src="/js/site-shell.js?v=profiles261021"></script>\n'+
 '<script defer src="/js/site-design.js?v=biography261022"></script>\n'+
 '<script defer src="/js/team-links.js?v=profiles261021"></script>\n'+
 '<script defer src="/js/team-profile.js?v=profiles261021"></script></head>\n<body>\n'+
 localize(header)+'\n'+main+'\n'+localize(footer)+'\n</body></html>\n';
 fs.writeFileSync(path.join(root,lang,'profile.html'),html);
}
console.log('Generated 16 biography pages from homepage navigation and footer.');

