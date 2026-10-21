/* One public link policy for directory cards and biographies. */
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
 window.VertexTeamLinks={normalize};
})();
