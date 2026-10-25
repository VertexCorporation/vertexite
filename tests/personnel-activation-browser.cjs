'use strict';
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
try{for(const scenario of ['success','expired','missing','stale-client-status','activation-failure']){
 const page=await browser.newPage({viewport:{width:320,height:720}}),calls=[],errors=[];page.on('pageerror',e=>errors.push(e.message));await page.exposeFunction('__record',async(name,data)=>calls.push({name,data}));
 await page.route('**/*',async route=>{const u=new URL(route.request().url());
  if(u.hostname==='www.gstatic.com'){
   let source='';if(u.pathname.endsWith('firebase-app.js'))source='export const initializeApp=()=>({});';
   else if(u.pathname.endsWith('firebase-functions.js'))source=`export const getFunctions=()=>({});export const httpsCallable=(_,name)=>async data=>{await window.__record(name,data);if(name==='exchangePersonnelInvitation'){${scenario==='expired'?"throw Object.assign(Error('expired'),{code:'functions/permission-denied'});":"return {data:{url:'https://vertexishere.com/actions.html?mode=resetPassword&oobCode=fixture&personnel=1&lang=tr'}};"}}${scenario==='activation-failure'?"throw Error('fixture unavailable');":"return {data:{verified:true}};"}};`;
   else if(u.pathname.endsWith('firebase-auth.js'))source=`export const getAuth=()=>({}),applyActionCode=async()=>{},verifyPasswordResetCode=async()=>'member@example.invalid',confirmPasswordReset=async()=>window.__record('confirmPasswordReset'),signInWithEmailAndPassword=async()=>{await window.__record('signIn');return {user:{emailVerified:${scenario!=='stale-client-status'},reload:async()=>{}}}},signOut=async()=>window.__record('signOut');`;
   return route.fulfill({contentType:'text/javascript',body:source});
  }
  if(u.hostname==='vertexishere.com'&&['/activate.html','/actions.html'].includes(u.pathname))return route.fulfill({contentType:'text/html',body:fs.readFileSync(path.join(__dirname,'..',u.pathname.slice(1)),'utf8')});
  return route.fulfill({body:'',contentType:'text/plain'});
 });
 await page.goto('https://vertexishere.com/activate.html'+(scenario==='missing'?'':'#token='+'a'.repeat(43)));await page.waitForFunction(()=>location.hash==='');assert.equal(calls.length,0,'opening an email must not consume or exchange the invitation');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 if(scenario==='missing'){assert(await page.locator('#begin').isHidden());}
 else if(scenario==='expired'){await page.locator('#begin').click();await page.waitForFunction(()=>document.getElementById('status').textContent.includes('süresi'));assert.equal(await page.locator('#begin').isDisabled(),false);}
 else{await page.locator('#begin').click();await page.waitForURL('**/actions.html?**');await page.locator('#new-password').fill('OnlyATest123!');await page.locator('#submit-btn').click();await page.waitForFunction(()=>document.getElementById('status-view').classList.contains('hidden')===false);assert.equal(calls.filter(c=>c.name==='confirmPasswordReset').length,1);assert.equal(calls.filter(c=>c.name==='signIn').length,1);assert.equal(calls.filter(c=>c.name==='signOut').length,1);assert.equal(calls.filter(c=>c.name==='completePersonnelActivation').length,1);assert.equal(await page.locator('#new-password').inputValue(),'');assert.equal(await page.locator('#subtitle a').getAttribute('href'),'https://admin.vertexishere.com/');}
 assert.deepEqual(errors,[]);console.log('PASS personnel invitation:',scenario);await page.close();
}}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
