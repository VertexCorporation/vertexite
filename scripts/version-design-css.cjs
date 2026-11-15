const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),check=process.argv.includes('--check'),hash=file=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex').slice(0,12);
const version=hash('css/site-design.css'),fontVersion=hash('assets/fonts/fonts.css');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()&&!['.git','node_modules','assets','docs','tests','test-results','lighthouse-results'].includes(e.name)?walk(path.join(dir,e.name)):e.isFile()&&e.name.endsWith('.html')?[path.join(dir,e.name)]:[]);}
let count=0;for(const file of walk(root)){const before=fs.readFileSync(file,'utf8'),after=before.replace(/((?:\.\.\/|\/)css\/site-design\.css)(?:\?[^"'<>\s]*)?/g,'$1?v='+version).replace(/((?:\.\.\/|\/)assets\/fonts\/fonts\.css)(?:\?[^"'<>\s]*)?/g,'$1?v='+fontVersion);if(before!==after){if(check)throw Error(path.relative(root,file)+': run node scripts/version-design-css.cjs');fs.writeFileSync(file,after);count++;}}
console.log('CSS revisions:',version,fontVersion,'updated pages:',count);
