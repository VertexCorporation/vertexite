const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
test('all locales expose nine institutional document links before JavaScript runs',()=>{
 for(const lang of ['ar','az','de','en','es','fr','hi','id','it','ja','ko','nl','pt','ru','tr','zh']){
  const html=fs.readFileSync(path.join(__dirname,'..',lang,'index.html'),'utf8');
  const section=html.split('id="more-info-grid"')[1].split('</section>')[0];
  assert.equal((section.match(/data-document=/g)||[]).length,9,lang);
  assert.equal((section.match(/https:\/\/drive.google.com\/file\/d\//g)||[]).length,9,lang);
  assert.match(html,/<script async type="module" src="..\/js\/news.js/);
 }
});
