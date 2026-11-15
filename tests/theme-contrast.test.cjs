const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const css=fs.readFileSync('css/site-design.css','utf8');
const luminance=hex=>{const values=hex.replace('#','').match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return values[0]*.2126+values[1]*.7152+values[2]*.0722;};
test('muted text meets WCAG AA contrast on body and card surfaces in light and dark themes',()=>{
 for(const rule of css.split('\n').slice(1,3)){
  const vars=Object.fromEntries([...rule.matchAll(/(--[a-z0-9-]+):\s*(#[0-9A-Fa-f]{6})/g)].map(m=>[m[1],m[2]]));
  assert(vars['--text-muted']);
  for(const name of ['--bg','--surface','--surface-2']){
   const a=luminance(vars['--text-muted']),b=luminance(vars[name]),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
   assert(ratio>=4.5,name+' contrast '+ratio.toFixed(2));
  }
 }
});
