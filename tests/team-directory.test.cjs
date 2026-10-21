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
  assert.match(html,/css\/pages\/team-directory\.css\?v=profiles261021/);
  assert.match(html,/js\/site-team\.js\?v=profiles261021/);
  assert.match(html,/id="teamTrack"/);
 }
});

test('each localized biography route uses the same safely rendered live data',()=>{
 const js=read('js/team-profile.js');
 assert.match(js,/new URLSearchParams\(location\.search\)\.get\('id'\)/);
 assert.match(js,/card\.bio\.trim\(\)/);
 assert.match(js,/p\.textContent=paragraph\.trim\(\)/);
 assert.match(js,/new URL\(value\)/);
 for(const lang of langs){
  const html=read(lang+'/profile.html');
  assert.match(html,/<section class="vp-profile"/);
  assert.match(html,/id="vp-bio"/);
  assert.match(html,/team-profile\.js\?v=profiles261021/);
  assert.match(html,/team-profile\.css\?v=profiles261021/);
 }
});

test('the original founder portraits and new biographies share four-sided fog',()=>{
 const fog=read('css/pages/profile-photo-fog.css');
 const dynamicFog=read('css/pages/team-profile.css');
 assert.match(fog,/profile-photo-box::after/);
 assert.match(fog,/linear-gradient\(90deg/);
 assert.match(fog,/linear-gradient\(180deg/);
 assert.match(dynamicFog,/vp-photo::after/);
 for(const lang of langs){
  assert.match(read(lang+'/mustafa-caki.html'),/profile-photo-fog\.css\?v=20261018a/);
 }
});

test('the directory never offers a biography link for empty bios',()=>{
 const js=read('js/site-team.js');
 assert.match(js,/var hasBio=typeof card\.bio==='string'&&card\.bio\.trim\(\)\.length>0/);
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
