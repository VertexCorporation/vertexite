const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
test('critical extension faces preserve original fallbacks and match their published source/digest',()=>{
 const manifest=JSON.parse(fs.readFileSync('assets/fonts/critical-subsets.json','utf8')),css=fs.readFileSync('assets/fonts/fonts.css','utf8');
 assert.equal(manifest.faces.length,4);
 for(const face of manifest.faces){
  const bytes=fs.readFileSync('assets/fonts/'+face.file);assert.equal(bytes.toString('ascii',0,4),'wOF2');assert.equal(bytes.length,face.bytes);assert(bytes.length<6000);
  assert(face.file.includes(crypto.createHash('sha256').update(bytes).digest('hex').slice(0,12)));
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync('assets/fonts/'+face.source)).digest('hex'),face.sourceSha256);
  assert(css.includes('/assets/fonts/'+face.source));assert(css.includes('/assets/fonts/'+face.file));
  assert.equal(face.unicodeRange,'U+011E,U+011F,U+0130,U+015E,U+015F');
 }
 assert(fs.existsSync('assets/fonts/LICENSE-Anton-OFL.txt'));assert(fs.existsSync('assets/fonts/LICENSE-Ubuntu-UFL.txt'));
});
