'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync(require.resolve('../js/origin-locales.js'),'utf8');
const resolver=source.slice(source.indexOf('const names='),source.indexOf('const english='));
function resolve({query='',referrer='',browser='en',stored='',proof=false}={}){
 const result={};vm.runInNewContext(resolver+';result.locale=lang;result.names=Object.keys(names);',{result,location:{search:query,origin:'https://vertexishere.com'},document:{referrer},navigator:{language:browser},sessionStorage:{getItem:key=>key==='origin-purchase-proof'?(proof?'fixture':null):stored},URL,URLSearchParams});return result;
}
test('Origin resolves all site languages, regional variants, explicit choices and same-origin page entries',()=>{
 const expected=['en','tr','ar','az','de','es','fr','hi','id','it','ja','ko','nl','pt','ru','zh'];
 assert.deepEqual(Array.from(resolve().names),expected);
 for(const lang of expected){assert.equal(resolve({query:'?lang='+lang}).locale,lang);assert.equal(resolve({referrer:'https://vertexishere.com/'+lang+'/'}).locale,lang);}
 assert.equal(resolve({query:'?lang=pt-BR',browser:'tr'}).locale,'pt');assert.equal(resolve({browser:'zh-TW'}).locale,'zh');
 assert.equal(resolve({query:'?lang=ja',referrer:'https://vertexishere.com/fr/'}).locale,'ja');
 assert.equal(resolve({referrer:'https://untrusted.example/ar/',browser:'de-DE'}).locale,'de');
 assert.equal(resolve({query:'?lang=__proto__'}).locale,'en');assert.equal(resolve({query:'?lang=unsupported'}).locale,'en');
});
test('a verified return context preserves the chosen program language without changing normal entries',()=>{
 assert.equal(resolve({query:'?lang=en&session_id=fixture',stored:'fr',proof:true}).locale,'fr');
 assert.equal(resolve({query:'?lang=ja',stored:'fr',proof:true}).locale,'ja');
 assert.equal(resolve({query:'?lang=en&session_id=fixture',stored:'fr',proof:false}).locale,'en');
 assert.equal(resolve({query:'?lang=en&session_id=fixture',stored:'invalid',proof:true}).locale,'en');
});
