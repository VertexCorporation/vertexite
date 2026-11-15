const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const source=fs.readFileSync('_worker.js','utf8')+'\nexport {renderProfile,renderSitemap,biography,profileUrl,founder,safeUrl};';
const worker=import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const template=fs.readFileSync('tr/profile.html','utf8');
const langs=['ar','az','de','en','es','fr','hi','id','it','ja','ko','nl','pt','ru','tr','zh'];
const card={id:'public-ceo',name:'Mustafa Çakı',position:'CEO',positionCode:'CEO',imageUrl:'https://images.example.com/photo.png',bioSourceLang:'tr',biographies:Object.fromEntries(langs.map(l=>[l,'Public biography '+l+'\n\nA second paragraph.'])),links:[{label:'LinkedIn',url:'https://linkedin.com/in/example'},{label:'Email',url:'mailto:hello@example.com'}]};
test('all languages render indexable names, biographies, canonical and matching Person markup without JavaScript',async()=>{
 const {renderProfile}=await worker;
 for(const lang of langs){const html=renderProfile(template,card,lang);
  assert.match(html,/<h1 id="vp-name">Mustafa Çakı<\/h1>/);
  assert(html.includes('<p>Public biography '+lang+'</p>'));
  assert.match(html,/id="vp-content" data-server-rendered="true"/);
  assert.match(html,/<meta name="robots" content="index,follow,max-image-preview:large">/);
  assert(html.includes('rel="canonical" href="https://vertexishere.com/'+lang+'/mustafa-caki"'));
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
  assert.match(html,/<meta name="description" content="Mustafa Çakı/);
  const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema['@type'],'ProfilePage');assert.equal(schema.mainEntity['@type'],'Person');assert.equal(schema.mainEntity.name,'Mustafa Çakı');
  assert.equal(schema.mainEntity.sameAs.length,1);assert.equal(schema.inLanguage,lang);
  const data=JSON.parse(html.match(/id="vp-data">([\s\S]*?)<\/script>/)[1]);assert.deepEqual(Object.keys(data.card.biographies),[lang]);
  assert.equal(data.urls.tr,'https://vertexishere.com/tr/mustafa-caki');
 }
});
test('names, biography, URLs and JSON cannot inject HTML; replacement tokens remain literal',async()=>{
 const {renderProfile}=await worker;
 const dirty={...card,name:'$& </title><img src=x onerror=alert(1)>',imageUrl:'javascript:alert(1)',biographies:{tr:'</script><script>alert(1)</script> $&'},links:[{label:'LinkedIn',url:'javascript:alert(1)'},{label:'Email',url:'mailto:ok@example.com?bcc=bad@example.com'}]};
 const html=renderProfile(template,dirty,'tr');assert(!html.includes('<img src=x'));assert(!html.includes('<script>alert(1)</script>'));assert(!html.includes('href="javascript:'));assert(!html.includes('bcc='));assert(html.includes('$&amp; &lt;/title&gt;'));assert(!html.includes('name="twitter:image"'));
 const data=JSON.parse(html.match(/id="vp-data">([\s\S]*?)<\/script>/)[1]);assert.equal(data.card.name,dirty.name);
});
test('sitemap contains every actual translation and no invented modification date or empty profile',async()=>{
 const {renderSitemap,renderProfile}=await worker;
 const other={...card,id:'other',name:'Someone Else',positionCode:'CTO',biographies:{en:'A real biography'},bio:undefined,bioSourceLang:'en'};
 const xml=renderSitemap([card,other,{...other,id:'empty',biographies:{}}]);
 assert.equal((xml.match(/<loc>/g)||[]).length,17);assert(!xml.includes('id=empty'));assert(!xml.includes('<lastmod>'));
 assert(xml.includes('/en/profile?id=other'));assert(!xml.includes('/tr/profile?id=other'));
 assert.match(renderProfile(template,other,'tr'),/content="noindex,follow"/);
 assert.match(renderProfile(template,card,'tr',false),/content="noindex,follow"/);
});
test('HTTP profile routes return 200, alias redirects, real 404/503 and HEAD; no private headers are forwarded',async()=>{
 const {default:handler}=await worker;const original=global.fetch;let calls=0;
 const other={...card,id:'other',name:'Someone Else',positionCode:'CTO'};
 const env={ASSETS:{fetch:async req=>{assert.equal(new URL(req.url).pathname,'/tr/profile');return new Response(template,{headers:{'Content-Type':'text/html'}});}}};
 const ctx={waitUntil:()=>{}};
 global.fetch=async(url,options)=>{calls++;assert.equal(url,'https://listsiteteam-o5h7dmtija-ew.a.run.app/');assert.deepEqual(Object.keys(options.headers),['Content-Type']);assert(!JSON.stringify(options).includes('SECRET'));return new Response(JSON.stringify({result:{cards:[card,other]}}));};
 try{
  let response=await handler.fetch(new Request('https://vertexishere.com/tr/mustafa-caki',{headers:{Cookie:'SECRET',Authorization:'SECRET'}}),env,ctx);
  assert.equal(response.status,200);assert.equal(response.headers.get('X-Vertex-Profile'),'server-rendered-v1');assert((await response.text()).includes('<p>Public biography tr</p>'));
  response=await handler.fetch(new Request('https://vertexishere.com/tr/profile?id=public-ceo'),env,ctx);assert.equal(response.status,301);assert.equal(response.headers.get('Location'),'https://vertexishere.com/tr/mustafa-caki');
  response=await handler.fetch(new Request('https://vertexishere.com/tr/profile?id=other'),env,ctx);assert.equal(response.status,200);
  response=await handler.fetch(new Request('https://vertexishere.com/tr/profile?id=missing'),env,ctx);assert.equal(response.status,404);assert.equal(response.headers.get('X-Robots-Tag'),'noindex');
  response=await handler.fetch(new Request('https://vertexishere.com/tr/mustafa-caki',{method:'HEAD'}),env,ctx);assert.equal(response.status,200);assert.equal(await response.text(),'');assert.equal(calls,1);
  response=await handler.fetch(new Request('https://vertexishere.com/tr/profile',{method:'POST'}),env,ctx);assert.equal(response.status,405);
  global.fetch=async()=>{throw Error('offline');};response=await handler.fetch(new Request('https://vertexishere.com/ja/mustafa-caki'),env,ctx);assert.equal(response.status,503);assert.equal(response.headers.get('Retry-After'),'60');
 }finally{global.fetch=original;}
});
test('routing excludes console, checkout, legal pages and ordinary assets',()=>{
 const routes=JSON.parse(fs.readFileSync('_routes.json','utf8'));
 assert(!routes.include.includes('/*'));assert(routes.include.includes('/sitemap-profiles.xml'));
 assert(routes.include.every(p=>/profile|mustafa-caki/.test(p)));
 assert(fs.readFileSync('robots.txt','utf8').includes('Sitemap: https://vertexishere.com/sitemap-profiles.xml'));
});
