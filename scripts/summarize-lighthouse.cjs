const fs=require('node:fs');
const root='lighthouse-results';
console.log('| Page / device | Performance | Accessibility | Best practices | SEO |\n| --- | ---: | ---: | ---: | ---: |');
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.json'))){
 const report=JSON.parse(fs.readFileSync(root+'/'+file,'utf8'));
 const keys=['performance','accessibility','best-practices','seo'];
 console.log('| '+file.replace('.json','')+' | '+keys.map(k=>Math.round(report.categories[k].score*100)).join(' | ')+' |');
}
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.json'))){
 const report=JSON.parse(fs.readFileSync(root+'/'+file,'utf8'));
 console.log('\n### '+file+'\n');
 for(const audit of Object.values(report.audits).filter(a=>a.score!==null&&a.score<1&&a.scoreDisplayMode!=='notApplicable')){
  console.log(audit.id+': '+audit.title+' — '+(audit.displayValue||''));
  if(audit.details?.items)console.log(JSON.stringify(audit.details.items).slice(0,18000));
 }
}
