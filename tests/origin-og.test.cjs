const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const langs=["ar","az","de","en","es","fr","hi","id","it","ja","ko","nl","pt","ru","tr","zh"];
test('Origin previews use their own centered purple 1200x630 artwork',()=>{
 const svg=fs.readFileSync('assets/origin-og.svg','utf8');
 assert.match(svg,/width="1200" height="630"/);
 assert.match(svg,/#0f0f10/);
 assert.match(svg,/#8275B7/);
 const png=fs.readFileSync('assets/origin-og-v2.png');
 assert.equal(png.subarray(1,4).toString(),'PNG');
 assert.equal(png.readUInt32BE(16),1200);
 assert.equal(png.readUInt32BE(20),630);
 assert.equal(png[24],8,'PNG must use 8-bit channel depth');
 assert.equal(png[25],2,'PNG must use RGB rather than an indexed palette');
 for(const path of ['origin.html','origin-checkout.html']){
  const html=fs.readFileSync(path,'utf8');
  assert.match(html,/og:image" content="https:\/\/vertexishere\.com\/assets\/origin-og-v2\.png"/);
  assert.match(html,/og:image:secure_url" content="https:\/\/vertexishere\.com\/assets\/origin-og-v2\.png"/);
  assert.match(html,/twitter:image" content="https:\/\/vertexishere\.com\/assets\/origin-og-v2\.png"/);
 }
});
test('every locale Origin link resolves to the same social preview and selected language',()=>{
 const rules=fs.readFileSync('_redirects','utf8');
 for(const lang of langs){
  assert.ok(rules.includes('/'+lang+'/origin /origin?lang='+lang+' 302'));
  assert.ok(rules.includes('/'+lang+'/origin/ /origin?lang='+lang+' 302'));
 }
});
