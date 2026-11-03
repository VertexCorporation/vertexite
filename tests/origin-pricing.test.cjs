'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('checkout pricing cannot paint the placeholder plan before its actual plan is initialized',()=>{
 const plans=Object.fromEntries(['NODE','EDGE','GRAPH','NETWORK'].map(n=>[n,{price:''}]));
 const nodes={'checkout-plan':{textContent:'GRAPH'},'checkout-price':{textContent:'',after(node){nodes[node.id]=node;}}};
 const document={querySelector:()=>null,getElementById:id=>nodes[id]||null,createElement:()=>({})};
 const window={OriginLocale:'tr',OriginText:{plans}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../js/origin-pricing.js'),'utf8'),{window,document,Intl,Number,Object,fetch(){throw Error('checkout must use its own config load');}});
 assert.equal(nodes['checkout-campaign'],undefined);assert.equal(nodes['checkout-price'].textContent,'');
 nodes['checkout-plan'].textContent='NETWORK';window.OriginPricing.applyAll({GRAPH:{kind:'launch',amount:50000},NETWORK:{kind:'launch',amount:100000}});
 assert.match(nodes['checkout-price'].textContent,/1\.000/);assert.match(nodes['checkout-campaign'].textContent,/İlk 1 katılımcı/);assert.match(nodes['checkout-campaign'].textContent,/2\.500/);assert.ok(!nodes['checkout-campaign'].textContent.includes('İlk 5'));
});
