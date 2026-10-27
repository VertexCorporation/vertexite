'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const langs=['ar','az','de','en','es','fr','hi','id','it','ja','ko','nl','pt','ru','tr','zh'];

test('every localized homepage loads the new managed directory and equal-card styling',()=>{
 const css=read('css/pages/team-directory.css');
 assert.match(css,/height:auto;min-height:0/);
 assert.match(css,/#team \.team-photo-wrap::after\{/);
 for(const lang of langs){
  const html=read(lang+'/index.html');
  assert.match(html,/css\/pages\/team-directory\.css\?v=social261026/);
  assert.match(html,/js\/site-team\.js\?v=social261026/);
  assert.match(html,/id="teamTrack"/);
 }
});

test('each localized biography route uses the same safely rendered live data',()=>{
 const js=read('js/team-profile.js');
 assert.match(js,/query\.get\('id'\)/);
 assert.match(js,/query\.get\('slug'\)/);
 assert.match(js,/isFounder\(x\)/);
 assert.match(js,/VertexTeamLinks\.biography\(card,lang\)/);
 assert.match(js,/p\.textContent=paragraph\.trim\(\)/);
 assert.match(js,/new URL\(value\)/);
 for(const lang of langs){
  const html=read(lang+'/profile.html');
  assert.match(html,/<section class="vp-profile"/);
  assert.match(html,/id="vp-bio"/);
  assert.match(html,/team-profile\.js\?v=social261026/);
  assert.match(html,/team-profile\.css\?v=polish261026/);
 }
});

test('dynamic biographies retain their shared portrait fog without static founder pages',()=>{
 const fog=read('css/pages/profile-photo-fog.css');
 const dynamicFog=read('css/pages/team-profile.css');
 assert.match(fog,/:is\\(\\.profile-photo-box,\\.vp-photo\\)>img/);
 assert.match(fog,/linear-gradient\\(to right,transparent/);
 assert.match(fog,/linear-gradient\\(to bottom,transparent/);
 assert.match(fog,/mask-composite:intersect/);
 assert.match(dynamicFog,/@import url\\(\"\\.\\/profile-photo-fog\\.css\\?v=polish261026[a-z]*\"\\)/);
 for(const lang of langs){
  assert.match(read(lang+'/profile.html'),/team-profile\\.css\\?v=polish261026/);
  assert.equal(fs.existsSync(path.join(root,lang,'mustafa-caki.html')),false);
 }
});

test('old founder routes preserve language and use a managed profile rather than a fixed ID',()=>{
 const redirects=read('_redirects'),sitemap=read('sitemap.xml'),js=read('js/team-profile.js');
 for(const lang of langs){
  const route='/'+lang+'/profile.html?slug=mustafa-caki';
  assert.ok(redirects.includes('/'+lang+'/mustafa-caki '+route+' 301'));
  assert.ok(redirects.includes('/'+lang+'/mustafa-caki.html '+route+' 301'));
  assert.ok(read(lang+'/index.html').includes(route));
  assert.ok(!sitemap.includes('/'+lang+'/mustafa-caki'));
 }
 assert.match(js,/profileSlug==='mustafa-caki'/);
 assert.match(js,/isFounder\\(x\\)/);
});

test('the directory never offers a biography link for empty bios',()=>{
 const js=read('js/site-team.js');
 assert.match(js,/var hasBio=!!window\.VertexTeamLinks\.biography\(card,currentLang\)/);
 assert.match(js,/var profile=hasBio&&/);
 assert.match(js,/item\.classList\.add\('profile-unavailable'\)/);
 assert.match(js,/profile\.html\?id=/);
});


test('biographies use the homepage navigation and footer in every language',()=>{
 for(const lang of langs){
  const home=read(lang+'/index.html'),profile=read(lang+'/profile.html');
  const qualify=html=>html.replace(/href="#([^"]*)"/g,(_,hash)=>'href="/'+lang+'/#'+hash+'"');
  for(const pattern of [/<header id="siteHeader">[\s\S]*?<\/header>/,/<footer>[\s\S]*?<\/footer>/]){
   assert.equal(profile.match(pattern)?.[0],qualify(home.match(pattern)[0]));
  }
  assert.doesNotMatch(profile,/id="vp-back"/);
  for(const file of ['css/layout/site-shell.css','js/site-shell.js']){
   assert.ok(home.includes(file)&&profile.includes(file));
  }
 }
});

test('public social links accept only supported buttons and safe protocols',()=>{
 const vm=require('node:vm'),context={window:{},URL};
 vm.runInNewContext(read('js/team-links.js'),context);
 const normalize=context.window.VertexTeamLinks.normalize;
 for(const label of ['LinkedIn','Instagram','X','TikTok']){
  assert.ok(normalize({label,url:'https://example.com/profile'}));
  assert.equal(normalize({label,url:'javascript:alert(1)'}),null);
  assert.equal(normalize({label,url:'mailto:hello@example.com'}),null);
 }
 assert.equal(normalize({label:'Website',url:'https://example.com'}),null);
 assert.equal(normalize({label:'Email',url:'mailto:hello@example.com'}).href,'mailto:hello@example.com');
 for(const url of ['hello@example.com?bcc=other@example.com','hello@example.com%0d%0aBcc:other@example.com','hello@example.com,other@example.com']){
  assert.equal(normalize({label:'Email',url}),null);
 }
});

 test('biography locale selection preserves source fallback and legacy cards',()=>{
 const vm=require('node:vm'),context={window:{},URL};
 vm.runInNewContext(read('js/team-links.js'),context);
 const biography=context.window.VertexTeamLinks.biography;
 const card={biographies:{tr:'Türkçe',en:'English',ar:'عربي'},bioSourceLang:'tr',bio:'Legacy'};
 for(const [lang,expected] of [['tr','Türkçe'],['en','English'],['ar','عربي'],['de','Türkçe']])assert.equal(biography(card,lang),expected);
 assert.equal(biography({bio:' Legacy only '},'en'),'Legacy only');
 assert.equal(biography({biographies:{en:'English'}},'de'),'English');
 assert.equal(biography({biographies:{tr:'  ',en:42}},'tr'),'');
 assert.equal(biography(null,'en'),'');
 assert.equal(biography(card,'__proto__'),'Türkçe');
 });

test('contacts have a stable social order with email last, regardless of saved order',()=>{
 const vm=require('node:vm'),context={window:{},URL};vm.runInNewContext(read('js/team-links.js'),context);
 const links=[{label:'Email',url:'mailto:hello@example.com'},{label:'TikTok',url:'https://tiktok.com/@test'},{label:'Instagram',url:'https://instagram.com/test'},{label:'LinkedIn',url:'https://linkedin.com/in/test'},{label:'X',url:'https://x.com/test'}];
 assert.equal(context.window.VertexTeamLinks.ordered(links).map(x=>x.key).join(','),'linkedin,instagram,x,tiktok,email');
 assert.equal(links[0].label,'Email');
});

test('brand X icon stays filled and weekly stars have rounded filled corners',()=>{
 const x=read('assets/x.svg');
 assert.match(x,/<rect[^>]+fill="#000"/);
 assert.match(x,/<path[^>]+fill="#fff"/);
 assert.match(read('js/site-team.js'),/a\.dataset\.social=normalized\.key/);
 assert.match(read('js/team-profile.js'),/a\.dataset\.social=normalized\.key/);
 assert.match(read('css/site-design.css'),/\.weekly-star svg\{[^}]*fill:currentColor;[^}]*stroke-linejoin:round/);
 assert.match(read('css/pages/team-directory.css'),/data-social="x"\] img\{filter:invert\(1\)\}/);
});

test('TikTok matches X as a filled two-tone rounded-square in both themes',()=>{
 const tiktok=read('assets/tiktok.svg');
 assert.match(tiktok,/<rect[^>]+rx="4"[^>]+fill="#000"/);
 assert.match(tiktok,/<path[^>]+fill="#fff"/);
 for(const [file,selector] of [['css/pages/team-directory.css','#team .team-social a'],['css/pages/team-profile.css','.vp-link']]){
  const css=read(file);
  assert.ok(css.includes(selector+'[data-social="tiktok"] img{filter:none}'));
  assert.ok(css.includes('html[data-theme="dark"] '+selector+'[data-social="tiktok"] img{filter:invert(1)}'));
 }
 assert.match(read('js/team-links.js'),/solid261026e/);
});
