'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html','.css':'text/css','.js':'application/javascript','.svg':'image/svg+xml','.woff2':'font/woff2','.webp':'image/webp'};
const server=http.createServer((req,res)=>{
 let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 if(name.endsWith('/'))name+='index.html';
 const file=path.join(root,name);
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404);res.end();return;}
 res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true});
 fs.mkdirSync(path.join(root,'test-results'),{recursive:true});
 try{
  for(const lang of ['en','tr','ar'])for(const width of [320,390,600,768,1280,1440]){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const links=[{label:'LinkedIn',url:'https://linkedin.com/in/test'},{label:'Instagram',url:'https://instagram.com/test'},{label:'X',url:'https://x.com/test'},{label:'Email',url:'mailto:test@example.com'},{label:'TikTok',url:'https://tiktok.com/@test'},{label:'Website',url:'https://example.com'}];
   const cards=Array.from({length:6},(_,i)=>({id:'test-'+i,name:i?'Team Member '+i:'Mustafa Çakı',position:'Chief Executive Officer (CEO)',imageUrl:'https://vertexishere.com/assets/team/mustafa-caki-cutout.webp',links,bio:i===1?'':'A published biography.\n\nA second paragraph.'}));
   await page.route('**/*',route=>{
    if(route.request().url()==='https://vertexishere.com/assets/team/mustafa-caki-cutout.webp')return route.fulfill({contentType:'image/webp',body:fs.readFileSync(path.join(root,'assets/team/mustafa-caki-cutout.webp'))});
    if(route.request().url().includes('listsiteteam-'))return route.fulfill({json:{result:{cards,staff:[],mods:[],chefs:[],honors:[]}}});
    return route.request().url().startsWith(base)?route.continue():route.abort();
   });
   await page.goto(base+'/'+lang+'/');
   await page.locator('[data-profile-id="test-0"]').waitFor();
   const geometry=await page.evaluate(()=>{
    const rect=selector=>document.querySelector(selector).getBoundingClientRect();
    const content=rect('#projects .wrap'),feature=rect('.product-feature'),layout=rect('.product-layout'),tech=rect('.tech-card');
    const cards=[...document.querySelectorAll('#teamTrack .team-card')];
    return {layout:layout.width,feature:feature.width,available:content.width-parseFloat(getComputedStyle(document.querySelector('#projects .wrap')).paddingLeft)-parseFloat(getComputedStyle(document.querySelector('#projects .wrap')).paddingRight),tech:tech.width,
     portrait:rect('.team-photo-wrap').width,portraitHeight:rect('.team-photo-wrap').height,
     clipped:cards.some(card=>card.scrollHeight>card.clientHeight+1),
     socials:cards[0].querySelectorAll('.team-social a').length,
     fog:getComputedStyle(document.querySelector('.team-photo-wrap'),'::after').backgroundImage};
   });
   if(width<=860)assert.ok(Math.abs(geometry.feature-geometry.available)<2,JSON.stringify({width,lang,geometry}));
   if(width<=700)assert.ok(geometry.tech>width-90,'technology card must use phone width');
   assert.ok(Math.abs(geometry.portrait-geometry.portraitHeight)<2,'portrait must stay square');
   assert.equal(geometry.clipped,false,'team content must not clip');assert.equal(geometry.socials,5);
   assert.ok(geometry.fog.includes('linear-gradient'));
   assert.equal(await page.locator('.team-card.profile-unavailable .team-profile-link').count(),0);
   if(lang==='en'&&width===390){await page.locator('#projects').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,'test-results/mobile-projects.png')});}
   await page.locator('.team-profile-link').first().click();
   await page.locator('#vp-content:not([hidden])').waitFor();
   assert.equal(await page.locator('#siteHeader').count(),1);assert.equal(await page.locator('footer').count(),1);
   assert.equal(await page.locator('#vp-back').count(),0);assert.equal(await page.locator('#vp-photo img').count(),1);assert.equal(await page.locator('#vp-links a').count(),5);
   assert.equal(await page.locator('#vp-links a[href="mailto:test@example.com"]').count(),1);
   assert.ok((await page.locator('.lang-row').first().getAttribute('href')).includes('/profile.html?id=test-0'));
   assert.ok((await page.locator('.nav-links a').first().getAttribute('href')).includes('/'+lang+'/#home'));
   if(width<=768){
    await page.locator('#menuBtn').click();assert.equal(await page.locator('#menuBtn').getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Escape');assert.equal(await page.locator('#menuBtn').getAttribute('aria-expanded'),'false');
   }
   for(const theme of ['light','dark']){
    await page.locator('#themeBtn').click();
    await page.locator('.theme-option[data-mode="'+theme+'"]').click();
    const expected=theme==='dark'?'rgb(15, 15, 16)':'rgb(248, 249, 250)';
    await page.waitForFunction(color=>getComputedStyle(document.body).backgroundColor===color,expected);
   }
   if(lang==='en'&&width===390)await page.screenshot({path:path.join(root,'test-results/mobile-biography.png'),fullPage:true});
   assert.deepEqual(errors,[],lang+' '+width+' runtime errors');await page.close();
   console.log('PASS '+lang+' at '+width+'px');
  }
 }catch(error){for(const page of browser.contexts().flatMap(context=>context.pages()))await page.screenshot({path:path.join(root,'test-results/failure.png'),fullPage:true}).catch(()=>{});throw error;}finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
