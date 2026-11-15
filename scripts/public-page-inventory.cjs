// Static public pages plus a separate, live biography sitemap. No guessed dates.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()&&!['.git','node_modules','tests','assets','docs','test-results','lighthouse-results'].includes(e.name)?walk(path.join(dir,e.name)):e.isFile()&&e.name.endsWith('.html')?[path.join(dir,e.name)]:[]);}
function inventory(){return walk(root).flatMap(file=>{
 const html=fs.readFileSync(file,'utf8'),relative=path.relative(root,file).replaceAll(path.sep,'/');
 const canonical=html.match(/<link(?=[^>]*rel="canonical")(?=[^>]*href="([^"]+)")[^>]*>/)?.[1];
 const noindex=/<meta(?=[^>]*name="robots")(?=[^>]*content="[^"]*noindex)[^>]*>/i.test(html);
 if(noindex||!canonical||relative==='index.html')return [];
 const url=new URL(canonical);if(url.origin!=='https://vertexishere.com'||url.search||url.hash)return [];
 const type=/\/index.html$/.test(relative)?'homepage':/beacon/.test(relative)?'beacon':/join-us|aramiza-katil/.test(relative)?'application':/documentation/.test(relative)?'documentation':/origin/.test(relative)?'origin':/privacy|gizlilik|policy|terms|kosullar|contract/.test(relative)?'legal':'public';
 return [{file:relative,url:canonical,type}];
 }).sort((a,b)=>a.url.localeCompare(b.url));}
module.exports={inventory};
if(require.main===module)console.log(JSON.stringify(inventory(),null,2));
