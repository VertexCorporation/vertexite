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
  assert(html.includes('rel="canonical" href="https://vertexishere.com/'+lang+'/mustafa"'));
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
  assert.match(html,/<meta name="description" content="Mustafa Çakı/);
  const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema['@type'],'ProfilePage');assert.equal(schema.mainEntity['@type'],'Person');assert.equal(schema.mainEntity.name,'Mustafa Çakı');
  assert.equal(schema.mainEntity.sameAs.length,1);assert.equal(schema.inLanguage,lang);
  const data=JSON.parse(html.match(/id="vp-data">([\s\S]*?)<\/script>/)[1]);assert.deepEqual(Object.keys(data.card.biographies),[lang]);
  assert.equal(data.urls.tr,'https://vertexishere.com/tr/mustafa');
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
  let response=await handler.fetch(new Request('https://vertexishere.com/tr/mustafa',{headers:{Cookie:'SECRET',Authorization:'SECRET'}}),env,ctx);
  assert.equal(response.status,200);assert.equal(response.headers.get('X-Vertex-Profile'),'server-rendered-v1');assert((await response.text()).includes('<p>Public biography tr</p>'));
  response=await handler.fetch(new Request('https://vertexishere.com/tr/mustafa-caki'),env,ctx);assert.equal(response.status,301);assert.equal(response.headers.get('Location'),'https://vertexishere.com/tr/mustafa');
  response=await handler.fetch(new Request('https://vertexishere.com/tr/profile?id=public-ceo'),env,ctx);assert.equal(response.status,301);assert.equal(response.headers.get('Location'),'https://vertexishere.com/tr/mustafa');
  response=await handler.fetch(new Request('https://vertexishere.com/tr/profile?id=other'),env,ctx);assert.equal(response.status,200);
  response=await handler.fetch(new Request('https://vertexishere.com/tr/profile?id=missing'),env,ctx);assert.equal(response.status,404);assert.equal(response.headers.get('X-Robots-Tag'),'noindex');
  response=await handler.fetch(new Request('https://vertexishere.com/tr/mustafa',{method:'HEAD'}),env,ctx);assert.equal(response.status,200);assert.equal(await response.text(),'');assert.equal(calls,1);
  response=await handler.fetch(new Request('https://vertexishere.com/tr/profile',{method:'POST'}),env,ctx);assert.equal(response.status,405);
  global.fetch=async()=>{throw Error('offline');};response=await handler.fetch(new Request('https://vertexishere.com/ja/mustafa'),env,ctx);assert.equal(response.status,503);assert.equal(response.headers.get('Retry-After'),'60');
 }finally{global.fetch=original;}
});
test('routing excludes console, checkout, legal pages and ordinary assets',()=>{
 const routes=JSON.parse(fs.readFileSync('_routes.json','utf8'));
 assert(!routes.include.includes('/*'));assert(routes.include.includes('/sitemap-profiles.xml'));
 assert(routes.include.every(p=>/profile|mustafa/.test(p)));
 assert(fs.readFileSync('robots.txt','utf8').includes('Sitemap: https://vertexishere.com/sitemap-profiles.xml'));
});
test('a corrupt edge cache entry triggers a fresh directory request with time for a cold start',async t=>{
 const {default:handler}=await worker;
 t.mock.method(AbortSignal,'timeout',ms=>{
  assert.equal(ms,20000);
  return new AbortController().signal;
 });
 t.mock.method(global,'fetch',async()=>Response.json({result:{cards:[card]}}));
 const oldCaches=global.caches;
 global.caches={default:{match:async()=>new Response('invalid JSON',{headers:{'X-Profile-Fetched-At':String(Date.now())}}),put:async()=>{}}};
 try{
  const env={ASSETS:{fetch:async()=>new Response(template,{headers:{'Content-Type':'text/html'}})}};
  const response=await handler.fetch(new Request('https://vertexishere.com/fr/mustafa'),env,{waitUntil:()=>{}});
  assert.equal(response.status,200);
  assert.match(await response.text(),/<p>Public biography fr<\/p>/);
 }finally{global.caches=oldCaches;}
});
test('a directory outage serves a non-cacheable profile shell and preserves HTTP errors',async t=>{
 const {default:handler}=await worker;
 t.mock.method(global,'fetch',async()=>new Response(null,{status:503}));
 for(const path of ['/az/mustafa','/az/profile?id=other','/sitemap-profiles.xml']){
  const url='https://vertexishere.com'+path;
  const env={ASSETS:{fetch:async req=>{
   assert.equal(new URL(req.url).pathname,'/az/profile');
   return new Response(template,{headers:{'Content-Type':'text/html'}});
  }}};
  const response=await handler.fetch(new Request(url),env,{});
  assert.equal(response.status,503);
  assert.equal(response.headers.get('X-Robots-Tag'),'noindex');
  assert.equal(response.headers.get('Cache-Control'),'no-store');
  const html=await response.text();
  if(path.endsWith('.xml')) assert.match(html,/<h1>Profile temporarily unavailable<\/h1>/);
  else assert.match(html,/<section[^>]+id="vp-content" hidden/);
  const head=await handler.fetch(new Request(url,{method:'HEAD'}),env,{});
  assert.equal(head.status,503);
  assert.equal(await head.text(),'');
 }
});
test('reading an aging edge-cache entry cannot extend the published data freshness window',async()=>{
 const {default:handler}=await worker,oldFetch=global.fetch,oldCaches=global.caches,oldNow=Date.now;
 let time=oldNow(),calls=0;const at=time-59000;Date.now=()=>time;
 global.caches={default:{match:async()=>new Response(JSON.stringify({cards:[card]}),{headers:{'X-Profile-Fetched-At':String(at)}}),put:async()=>{}}};
 global.fetch=async()=>{calls++;return new Response(JSON.stringify({result:{cards:[card]}}));};
 const env={ASSETS:{fetch:async()=>new Response(template,{headers:{'Content-Type':'text/html'}})}},ctx={waitUntil:()=>{}};
 try{
  await handler.fetch(new Request('https://vertexishere.com/de/mustafa'),env,ctx);assert.equal(calls,0);
  time+=2000;await handler.fetch(new Request('https://vertexishere.com/de/mustafa'),env,ctx);assert.equal(calls,1);
 }finally{global.fetch=oldFetch;global.caches=oldCaches;Date.now=oldNow;}
});
test('optimized public portraits are source-specific and new Console photos retain their live URL',async()=>{
 const map=JSON.parse(source.match(/const photoVariants = (.*);/)[1]);
 for(const asset of Object.values(map)){assert(fs.existsSync('.'+asset));assert(fs.statSync('.'+asset).size<100000);}
 const {renderProfile}=await worker,sourceUrl=Object.keys(map)[0];
 const html=renderProfile(template,{...card,imageUrl:sourceUrl+'?alt=media&token=rotated'},'tr');
 assert(html.includes('https://vertexishere.com'+map[sourceUrl]));
 const changed=renderProfile(template,{...card,imageUrl:'https://images.example.com/new-photo.png'},'tr');
 assert(changed.includes('https://images.example.com/new-photo.png'));
});
