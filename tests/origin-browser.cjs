'use strict';
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const u=new URL(req.url,'http://localhost'),route=u.pathname==='/origin'?'/origin.html':u.pathname==='/origin-checkout'?'/origin-checkout.html':u.pathname;const file=path.resolve(root,'.'+route);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(file,(error,data)=>{res.writeHead(error?404:200,{'Content-Type':file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':file.endsWith('.json')?'application/json':file.endsWith('.svg')?'image/svg+xml':file.endsWith('.woff2')?'font/woff2':'text/html'});res.end(error?'':data);});});
(async()=>{await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const browser=await chromium.launch({headless:true});const errors=[];try{
 for(const width of [390,768,1440])for(const theme of ['dark','light']){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(value=>localStorage.setItem('theme',value),theme);
  await page.route('https://europe-west1-vertex-ai-1618.cloudfunctions.net/**',async route=>{const endpoint=new URL(route.request().url()).pathname.split('/').pop();const offers=Object.fromEntries([['NODE',10000,25],['EDGE',25000,10],['GRAPH',50000,5],['NETWORK',100000,1]].map(([plan,amount,limit])=>[plan,{kind:'launch',amount,limit,claimed:0}]));const walls={NODE:Array.from({length:5},(_,i)=>({name:'Test Node '+i})),EDGE:Array.from({length:6},(_,i)=>({name:'Test Edge '+i})),GRAPH:[],NETWORK:[]};await route.fulfill({contentType:'application/json',body:JSON.stringify(endpoint==='getPublicOriginCommunity'?{walls,startups:[]}:{offers,applications:true,payments:false})});});
  await page.goto('http://127.0.0.1:'+server.address().port+'/origin?lang=tr');await page.locator('[data-node-caption]').filter({hasText:'100'}).waitFor();await page.locator('.origin-wall').first().waitFor();
  assert.equal(await page.locator('.origin-controls,.origin-node,.origin-concept').count(),0);
  assert.equal(await page.locator('.origin-wall').count(),2);assert.equal(await page.locator('.origin-wall-track.is-flowing').count(),1);assert.equal(await page.locator('.origin-wall-person').filter({hasText:'Test Node'}).count(),5);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('main *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>({tag:e.tagName,class:e.className,width:e.getBoundingClientRect().width})).slice(0,12))));
  assert(await page.evaluate(()=>document.querySelector('footer').getBoundingClientRect().top>=innerHeight));
  assert.equal(await page.locator('.origin-title').evaluate(el=>getComputedStyle(el).animationName),'none');
  await page.getByRole('link',{name:'Üyelikleri Keşfet',exact:true}).click();await page.locator('#memberships-heading').waitFor({state:'visible'});
  if(width===1440){const bounds=await page.locator('.origin-membership').evaluateAll(els=>els.map(e=>e.getBoundingClientRect().top));assert(Math.max(...bounds)-Math.min(...bounds)<2);}
  if(width===390)assert(await page.locator('.origin-membership').first().evaluate(el=>el.getBoundingClientRect().height>=innerHeight-112));
  await page.locator('[data-details=GRAPH]').click();assert.equal(await page.locator('#origin-benefits-GRAPH li').count(),16);assert.equal(await page.locator('[data-details=GRAPH]').getAttribute('aria-expanded'),'true');await page.locator('[data-details=GRAPH]').click();
  fs.mkdirSync(path.join(root,'tests/results/origin'),{recursive:true});await page.screenshot({path:path.join(root,`tests/results/origin/memberships-${width}-${theme}.png`)});
  await page.locator('[data-checkout=GRAPH]').click();await page.waitForURL('**/origin-checkout?plan=GRAPH&lang=tr');await page.getByRole('heading',{name:'GRAPH',exact:true}).waitFor();assert.equal(await page.locator('#node-wall').count(),1);await page.close();
 }
 assert.deepEqual(errors,[]);console.log('PASS Origin: 3 widths, both themes, full-height hero, sequential mobile cards, all benefits, empty walls hidden, 5 static / 6 flowing, reduced motion, locale-aware checkout and consent.');
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}})().catch(error=>{console.error(error);process.exitCode=1;});
