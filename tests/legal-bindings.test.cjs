'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const rows=require('./fixtures/legal-source-bodies.json');
test('every bound document retains its exact original body and stable legal ID',()=>{
 for(const row of rows){
  const source=fs.readFileSync(path.join(root,row.path),'utf8');
  assert(source.includes('data-legal-document="'+row.id+'"'),row.path);
  assert.match(source,/<script defer src="\/js\/legal-reader.js\?v=1"><\/script>/);
  const preserved=source.replace(/ data-legal-document="[^"]+"/g,'').replace(/<script defer src="\/js\/legal-reader.js\?v=1"><\/script>\n/g,'').split(/<body\b/)[1];
  assert.equal(crypto.createHash('sha256').update(preserved).digest('hex'),row.hash,row.path);
 }
});
