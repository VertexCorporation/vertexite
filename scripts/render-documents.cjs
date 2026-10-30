const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
class Element{
 constructor(tag){this.tag=tag;this.attrs={};this.dataset={};this.children=[];this.style={setProperty:(k,v)=>{this.attrs.style=(this.attrs.style||'')+k+':'+v+';'}};}
 setAttribute(k,v){this.attrs[k]=v;}append(...nodes){this.children.push(...nodes);}appendChild(n){this.append(n);return n;}replaceChildren(...nodes){this.children=nodes;}
 toString(){if(this.tag==='fragment')return this.children.join('');let attrs={...this.attrs};for(const k of ['className','href','target','rel'])if(this[k])attrs[k==='className'?'class':k]=this[k];for(const [k,v] of Object.entries(this.dataset))attrs['data-'+k]=v;return '<'+this.tag+Object.entries(attrs).map(([k,v])=>' '+k+'="'+escape(v)+'"').join('')+'>'+(this.innerHTML||escape(this.textContent||''))+this.children.join('')+'</'+this.tag+'>';}
}
for(const lang of ['ar','az','de','en','es','fr','hi','id','it','ja','ko','nl','pt','ru','tr','zh']){
 const grid=new Element('div');const context={window:{},document:{readyState:'complete',documentElement:{lang},querySelector:()=>grid,createElement:t=>new Element(t),createElementNS:(_,t)=>new Element(t),createDocumentFragment:()=>new Element('fragment')}};
 vm.createContext(context);for(const file of ['more-info-translations.js','more-info.js'])vm.runInContext(fs.readFileSync(path.join(root,'js',file),'utf8'),context);
 if(grid.children[0]?.children.length!==9)throw Error('Expected nine documents: '+lang);
 const file=path.join(root,lang,'index.html');let html=fs.readFileSync(file,'utf8');html=html.replace(/<div class="more-info-grid" id="more-info-grid"(?: data-ready="true")?>[\s\S]*?<\/div>(?=\s*<\/div>\s*<\/section>)/,'<div class="more-info-grid" id="more-info-grid" data-ready="true">'+grid.children.join('')+'</div>');fs.writeFileSync(file,html);
}
