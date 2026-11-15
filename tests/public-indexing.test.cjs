const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {inventory}=require('../scripts/public-page-inventory.cjs');
test('all canonical public content, including every Beacon locale, is discoverable in the sitemap',()=>{
 const pages=inventory(),xml=fs.readFileSync('sitemap.xml','utf8');assert(pages.length>140);
 for(const page of pages)assert(xml.includes('<loc>'+page.url+'</loc>'),page.file);
 for(const lang of ['ar','az','de','en','es','fr','hi','id','it','ja','ko','nl','pt','ru','tr','zh']){
  const beacon=fs.readFileSync(lang+'/beacon.html','utf8');assert(!beacon.includes('noindex'));
  assert(xml.includes('<loc>https://vertexishere.com/'+lang+'/beacon</loc>'));
  assert(beacon.includes('hreflang="tr" href="https://vertexishere.com/tr/beacon"'));
 }
});
test('homepage defers below-fold rendering without hiding public text or removing content from the DOM',()=>{
 const css=fs.readFileSync('css/site-design.css','utf8'),intro=fs.readFileSync('js/intro.js','utf8');
 assert(css.includes('.vertex-home main>section:not(.hero):not(.story-relocated){content-visibility:auto;'));
 assert(!intro.includes("document.fonts.load('112px Anton').then(function(){return document.fonts.ready;})"));
});
