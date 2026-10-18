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
 assert.match(css,/height:clamp\(320px,26vw,385px\)/);
 assert.match(css,/#team \.team-photo-wrap::after\{/);
 for(const lang of langs){
  const html=read(lang+'/index.html');
  assert.match(html,/css\/pages\/team-directory\.css\?v=directory261018a/);
  assert.match(html,/js\/site-team\.js\?v=directory261018a/);
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
  assert.match(html,/team-profile\.js\?v=directory261018a/);
  assert.match(html,/team-profile\.css\?v=directory261018a/);
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
