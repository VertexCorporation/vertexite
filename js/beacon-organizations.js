/* Only the public organization projection is requested; applicant records stay private. */
(() => {
 const section=document.getElementById('beacon-organizations');if(!section)return;
 const viewport=section.querySelector('.beacon-logos-viewport'),track=section.querySelector('.beacon-logos-track'),reduced=matchMedia('(prefers-reduced-motion:reduce)');let rows=[];
 function logo(row){const item=document.createElement('div');item.className='beacon-organization';const image=document.createElement('img');image.src=row.logoUrl;image.alt='';image.loading='lazy';image.decoding='async';const label=document.createElement('span');label.textContent=row.name;item.append(image,label);return item;}
 function render(){track.replaceChildren();track.classList.remove('is-flowing');if(!rows.length){section.hidden=true;return;}section.hidden=false;
  if(rows.length<6||reduced.matches){rows.forEach(row=>track.append(logo(row)));return;}
  const group=document.createElement('div');group.className='beacon-logos-group';rows.forEach(row=>group.append(logo(row)));track.append(group);
  const cycle=rows.length*(142+24);const copies=Math.max(2,Math.ceil(viewport.clientWidth/cycle)+1);for(let n=1;n<copies;n++){const clone=group.cloneNode(true);clone.setAttribute('aria-hidden','true');track.append(clone);}
  track.style.setProperty('--cycle-width',cycle+'px');track.style.setProperty('--flow-duration',Math.max(30,cycle/24)+'s');track.classList.add('is-flowing');
 }
 fetch('https://europe-west1-vertex-ai-1618.cloudfunctions.net/getPublicBeaconOrganizations',{credentials:'omit',signal:AbortSignal.timeout(12000)}).then(response=>{if(!response.ok)throw Error('unavailable');return response.json();}).then(data=>{rows=(Array.isArray(data.organizations)?data.organizations:[]).filter(row=>typeof row.name==='string'&&row.name.trim()&&typeof row.logoUrl==='string'&&row.logoUrl.startsWith('https://firebasestorage.googleapis.com/'));render();}).catch(()=>{section.hidden=true;});
 new ResizeObserver(()=>{if(rows.length>=6)render();}).observe(viewport);reduced.addEventListener('change',render);
})();
