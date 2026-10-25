/* Shared public team presentation for directory cards and biographies. */
(function(){'use strict';
 const aliases={linkedin:'linkedin',instagram:'instagram',x:'x',twitter:'x',tiktok:'tiktok',mail:'email',email:'email','e-mail':'email'};
 const labels={linkedin:'LinkedIn',instagram:'Instagram',x:'X',tiktok:'TikTok',email:'Email'};
 function normalize(link){
  const key=aliases[String(link?.label||'').trim().toLowerCase()];
  if(!key||typeof link.url!=='string'||link.url.length>2048)return null;
  const value=link.url.trim();let href;
  if(key==='email'){
   const address=value.replace(/^mailto:/i,'');
   if(address.length>254||!/^[A-Za-z0-9.!#$&'*+\/=^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,63}$/.test(address))return null;
   href='mailto:'+address;
  }else{
   try{const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password)return null;href=u.href;}catch{return null;}
  }
  return {key,label:labels[key],href,icon:'/assets/'+key+'.svg'};
 }
 const designTitles={"tr":"Tasarım Direktörü (CDO)","en":"Chief Design Officer (CDO)","de":"Designvorstand (CDO)","es":"Director de Diseño (CDO)","fr":"Directeur du Design (CDO)","it":"Direttore del Design (CDO)","ja":"最高デザイン責任者 (CDO)","ko":"최고디자인책임자 (CDO)","pt":"Diretor de Design (CDO)","ru":"Директор по дизайну (CDO)","zh":"首席设计官 (CDO)","ar":"الرئيس التنفيذي للتصميم (CDO)","hi":"मुख्य डिजाइन अधिकारी (CDO)","id":"Direktur Desain (CDO)","nl":"Directeur Ontwerp (CDO)","az":"Dizayn Direktoru (CDO)"};
 function roleTitle(card,lang){
  return (card.positionCode||card.position)==='CDO' ? designTitles[lang]||designTitles.en : card.position;
 }
 function biography(card,lang){
  const bios=card?.biographies;
  const value=code=>Object.hasOwn(bios||{},code)&&typeof bios[code]==='string'?bios[code].trim():'';
  return value(lang)||value(card?.bioSourceLang)||
   (typeof card?.bio==='string'?card.bio.trim():'')||value('en')||value('tr');
 }
 window.VertexTeamLinks={normalize,roleTitle,biography};
})();
