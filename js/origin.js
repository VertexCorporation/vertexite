/* Origin is a scroll experience. All memberships remain reachable without motion. */
(()=>{'use strict';
const {plans,ui}=window.OriginText,lang=window.OriginLocale,tr=lang==='tr',esc=window.OriginEscape;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
document.querySelector('.origin-explore')?.addEventListener('click',event=>{event.preventDefault();document.getElementById('origin-memberships').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});document.getElementById('memberships-heading').focus({preventScroll:true});});
document.getElementById('memberships-heading').tabIndex=-1;
const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');reveal.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.origin-reveal').forEach(el=>reveal.observe(el));
document.querySelectorAll('[data-details]').forEach(button=>{
 const name=button.dataset.details,p=plans[name];if(!p)return;
 const panel=document.createElement('div');panel.className='origin-plan-benefits';panel.id='origin-benefits-'+name;panel.hidden=true;
 panel.innerHTML=`<ol>${p.benefits.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><details class="origin-inline-conditions"><summary>${esc(ui.conditions)}</summary><p>${esc(p.conditions)}</p></details>`;
 button.closest('.origin-plan-copy').append(panel);button.setAttribute('aria-controls',panel.id);button.setAttribute('aria-expanded','false');const initial=button.textContent;
 button.addEventListener('click',()=>{panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));button.textContent=panel.hidden?initial:ui.back;});
});
document.querySelector('[data-portfolio-heading]').textContent=ui.portfolio;
document.querySelector('[data-portfolio-lead]').textContent=ui.portfolioLead;
document.querySelector('[data-portfolio-conditions]').textContent=ui.conditions;
document.getElementById('origin-portfolio-rules').innerHTML=[...ui.portfolioRules,ui.activity,ui.endorsement].map(x=>`<p>${esc(x)}</p>`).join('');
const walls=document.getElementById('origin-walls'),portfolio=document.getElementById('origin-portfolio-list');
portfolio.textContent=ui.portfolioEmptyText;
function publicRow(row){const el=document.createElement('span');el.className='origin-wall-person';el.textContent=row.name;return el;}
function drawWall(tier,people){
 const valid=people.filter(row=>typeof row.name==='string'&&row.name.trim());if(!valid.length)return;
 const section=document.createElement('section'),title=document.createElement('h2'),viewport=document.createElement('div'),rail=document.createElement('div');
 title.textContent=tier+' '+(tr?'Duvarı':'Wall');section.className='origin-wall';section.append(title);viewport.className='origin-wall-viewport';rail.className='origin-wall-track';
 for(const row of valid)rail.append(publicRow(row));
 if(valid.length>=6){rail.classList.add('is-flowing');const copy=document.createElement('div');copy.className='origin-wall-duplicate';copy.setAttribute('aria-hidden','true');valid.forEach(row=>copy.append(publicRow(row)));rail.append(copy);rail.style.setProperty('--wall-duration',Math.max(30,valid.length*5)+'s');}
 viewport.append(rail);section.append(viewport);walls.append(section);walls.hidden=false;
}
async function loadCommunity(){try{
 const response=await fetch('https://europe-west1-vertex-ai-1618.cloudfunctions.net/getPublicOriginCommunity',{signal:AbortSignal.timeout(12000)});if(!response.ok)throw Error();const data=await response.json();
 for(const tier of ['NODE','EDGE','GRAPH','NETWORK'])drawWall(tier,data.walls?.[tier]||[]);
 if(Array.isArray(data.startups)&&data.startups.length){portfolio.replaceChildren();for(const row of data.startups){const card=document.createElement('article');card.className='origin-startup';const name=document.createElement('h3'),description=document.createElement('p'),meta=document.createElement('small');name.textContent=row.name;description.textContent=row.description;meta.textContent=[row.sector,row.tier,row.founder].filter(Boolean).join(' · ');card.append(name,description,meta);try{const url=new URL(row.website);if(url.protocol==='https:'){const link=document.createElement('a');link.href=url.href;link.rel='noopener noreferrer';link.target='_blank';link.textContent=tr?'Girişimi keşfet ↗':'Explore startup ↗';card.append(link);}}catch{}portfolio.append(card);}}
 }catch{/* Empty walls stay absent; never fabricate participants. */}}
loadCommunity();
})();
