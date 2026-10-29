const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
test('critical navigation is in initial HTML and hero initialization cannot wait forever for fonts',()=>{
 for(const lang of ['en','tr','ar','ja','zh','de','es','fr','it','pt','nl','ru','hi','az','id','ko']){
  const html=fs.readFileSync(lang+'/index.html','utf8');
  assert.match(html,/<\/header>\s*<script data-vertex-shell/);
  assert.match(html,/data-vertex-intro-bootstrap/);
  assert.doesNotMatch(html,/Uras Baz|İdil Başpınar/);
 }
 assert.match(fs.readFileSync('js/intro.js','utf8'),/Promise\.race/);
});
