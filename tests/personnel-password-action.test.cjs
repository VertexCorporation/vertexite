const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../actions.html'),'utf8');
const start=source.indexOf('async function handleResetPassword('),end=source.indexOf('// --- 7.',start);
assert(start>=0&&end>start);
const factory=new Function('verifyPasswordResetCode','confirmPasswordReset','signInWithEmailAndPassword','signOut','httpsCallable','getFunctions','app','auth','updateText','showView','showStatusAnimation','passwordLabel','passwordInput','submitBtn','passwordResetForm','document','location','URLSearchParams','alert',source.slice(start,end)+';return handleResetPassword;');
test('password setup activates on the server and links directly to the console without a second verification step',async()=>{
 let submit,activation=0,reset=0,signedOut=0,mail=0,lastSubtitle='';const passwordInput={value:'NewPassword123!'},submitBtn={disabled:false};
 const user={emailVerified:false,reload:async()=>{},sendEmailVerification:async()=>{mail++;}};
 const run=factory(async()=> 'member@example.invalid',async()=>{reset++;},async()=>({user}),async()=>{signedOut++;},(_functions,name)=>async()=>{assert.equal(name,'completePersonnelActivation');activation++;},()=>({}),{}, {},(_title,subtitle)=>{lastSubtitle=subtitle;},()=>{},()=>{}, {},passwordInput,submitBtn,{addEventListener:(_name,fn)=>{submit=fn;}},{documentElement:{lang:'tr'}},{search:'?personnel=1'},URLSearchParams,()=>{});
 await run('native-fixture-code',{resetTitle:'Set password',resetSubtitle:'',passwordLabel:'Password',passwordPlaceholder:'',buttonDefault:'Save',buttonUpdating:'Saving',resetSuccessTitle:'Saved'});
 await submit({preventDefault(){}});
 assert.equal(reset,1);assert.equal(activation,1);assert.equal(signedOut,1);assert.equal(mail,0);assert.equal(passwordInput.value,'');assert.match(lastSubtitle,/https:\/\/admin\.vertexishere\.com\//);
});
