/* Single localized, data-driven biography page for the 10 executive roles. */
(function(){
'use strict';
const locales=['ar','az','de','en','es','fr','hi','id','it','ja','ko','nl','pt','ru','tr','zh'];
const lang=locales.includes(location.pathname.split('/')[1])?location.pathname.split('/')[1]:'en';
const copy={
tr:['Ekibe Dön','Bağlantılar','Yönetici profili bulunamadı.','Ekip profilini görüntüleyemiyoruz.'],
en:['Back to Team','Links','Profile unavailable.','Unable to load this profile.'],
de:['Zurück zum Team','Links','Profil nicht verfügbar.','Profil konnte nicht geladen werden.'],
fr:["Retour à l’équipe",'Liens','Profil indisponible.','Impossible de charger le profil.'],
es:['Volver al equipo','Enlaces','Perfil no disponible.','No se pudo cargar el perfil.'],
it:['Torna al team','Collegamenti','Profilo non disponibile.','Impossibile caricare il profilo.'],
pt:['Voltar à equipa','Ligações','Perfil indisponível.','Não foi possível carregar o perfil.'],
nl:['Terug naar het team','Links','Profiel niet beschikbaar.','Kan profiel niet laden.'],
ru:['К команде','Ссылки','Профиль недоступен.','Не удалось загрузить профиль.'],
ar:['العودة للفريق','روابط','الملف الشخصي غير متاح.','تعذر تحميل الملف الشخصي.'],
hi:['टीम पर लौटें','लिंक','प्रोफ़ाइल उपलब्ध नहीं है।','प्रोफ़ाइल नहीं खुल सका।'],
id:['Kembali ke tim','Tautan','Profil tidak tersedia.','Gagal memuat profil.'],
ja:['チームに戻る','リンク','プロフィールはありません。','読み込めませんでした。'],
ko:['팀으로 돌아가기','링크','프로필을 사용할 수 없습니다.','프로필을 불러올 수 없습니다.'],
zh:['返回团队','链接','资料不可用。','无法加载资料。'],
az:['Komandaya qayıt','Bağlantılar','Profil mövcud deyil.','Profil yüklənmədi.']
};
const words=copy[lang]||copy.en;
document.documentElement.lang=lang;
if(lang==='ar')document.documentElement.dir='rtl';
const el=id=>document.getElementById(id);
el('vp-links-title').textContent=words[1];
function unavailable(msg){
 el('vp-content').hidden=true;el('vp-error').hidden=false;
 el('vp-error').textContent=msg;document.title=msg+' | Vertex';
}
function safeUrl(value){
 try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password?url.href:null;}catch{return null}
}
async function load(){
 const id=new URLSearchParams(location.search).get('id');
 if(!id||!/^[a-zA-Z0-9_-]{1,128}$/.test(id)){unavailable(words[2]);return}
 try{
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),12000);
  let response;
  try{response=await fetch('https://listsiteteam-o5h7dmtija-ew.a.run.app/',{
   method:'POST',headers:{'Content-Type':'application/json'},credentials:'omit',
   body:JSON.stringify({data:{lang}}),signal:controller.signal
  });}finally{clearTimeout(timeout)}
  if(!response.ok)throw Error('Network');
  const result=(await response.json()).result;
  const card=Array.isArray(result?.cards)?result.cards.find(x=>x.id===id):null;
  const biography=window.VertexTeamLinks.biography(card,lang);
  if(!card||!biography){unavailable(words[2]);return}
  document.title=card.name+' | Vertex';
  el('vp-name').textContent=card.name;
  el('vp-role').textContent=window.VertexTeamLinks.roleTitle(card,lang)+' · Vertex';
  const photo=safeUrl(card.imageUrl);
  if(photo){const img=document.createElement('img');img.alt=card.name;img.src=photo;img.width=160;img.height=160;el('vp-photo').append(img)}
  const bio=el('vp-bio');bio.replaceChildren();
  biography.split(/\n\s*\n/).forEach(paragraph=>{const p=document.createElement('p');p.textContent=paragraph.trim();bio.append(p)});
  const links=el('vp-links');links.replaceChildren();
  for(const normalized of window.VertexTeamLinks.ordered(card.links)){
   const a=document.createElement('a');a.className='vp-link';a.href=normalized.href;if(normalized.key!=='email'){a.target='_blank';a.rel='noopener noreferrer';}
   const logo=document.createElement('img');logo.alt='';
   logo.src=normalized.icon;
   const text=document.createElement('span');text.textContent=normalized.label+(normalized.key==='email'?'':' ↗');a.append(logo,text);links.append(a);
  }
  el('vp-links-pane').hidden=!links.children.length;
  el('vp-content').hidden=false;el('vp-error').hidden=true;
 }catch(error){unavailable(words[3]);console.warn('[profile] unavailable',error)}
}
// Language switching keeps the selected person on the equivalent profile route.
const profileId=new URLSearchParams(location.search).get('id');
if(profileId&&/^[a-zA-Z0-9_-]{1,128}$/.test(profileId)){
 document.querySelectorAll('.lang-row').forEach(link=>{
  const target=new URL(link.href);target.pathname=target.pathname.replace(/\/$/,'')+'/profile.html';
  target.searchParams.set('id',profileId);link.href=target.href;
 });
}
load();
})();
