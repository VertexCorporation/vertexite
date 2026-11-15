const fs=require('node:fs'),path=require('node:path');
const {inventory}=require('./public-page-inventory.cjs');
const rows=[...new Set(inventory().map(p=>p.url))];
const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+rows.map(url=>'  <url><loc>'+url.replaceAll('&','&amp;')+'</loc></url>').join('\n')+'\n</urlset>\n';
const file=path.resolve(__dirname,'../sitemap.xml');
if(process.argv.includes('--check')){if(fs.readFileSync(file,'utf8')!==xml)throw Error('Run node scripts/build-sitemap.cjs');}else{fs.writeFileSync(file,xml);console.log('Public sitemap:',rows.length,'canonical pages');}
