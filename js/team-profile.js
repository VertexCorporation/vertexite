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
let loading=false;
async function load(){
 if(loading)return;
 loading=true;
 el('vp-error').hidden=false;
 el('vp-error').textContent=lang==='tr'?'Profil yükleniyor…':'Loading profile…';
 const query=new URLSearchParams(location.search);
 const id=query.get('id'),slug=query.get('slug');
 const validId=!!id&&/^[a-zA-Z0-9_-]{1,128}$/.test(id);
 const founderSlug=!id&&slug==='mustafa-caki';
 if(!validId&&!founderSlug){unavailable(words[2]);loading=false;return}
 try{
  const cache=window.VertexPublicCache;
  const key='directory-bios-20261025:'+lang;
  const valid=value=>Array.isArray(value?.cards);
  async function request(){
   const response=await cache.fetchJSON('https://listsiteteam-o5h7dmtija-ew.a.run.app/',{
    method:'POST',headers:{'Content-Type':'application/json'},credentials:'omit',body:JSON.stringify({data:{lang}})
   },25000);
   if(!valid(response?.result))throw Error('Invalid directory');
   return response.result;
  }
  const snapshot=cache.read(key);
  const result=snapshot&&valid(snapshot.value)&&snapshot.value.cards.some(card=>
   (validId?card.id===id:card.positionCode==='CEO')&&window.VertexTeamLinks.biography(card,lang))
   ? snapshot.value : (await cache.load(key,request,valid,{ttl:0,cooldownMs:1000})).value;
  // Render the saved public biography immediately; refresh stale data for the next visit.
  if(snapshot&&result===snapshot.value&&snapshot.age>60000)request().then(value=>cache.save(key,value)).catch(()=>{});
  const isFounder=card=>card?.positionCode==='CEO'&&String(card.name||'').toLocaleLowerCase('tr').replace(/ı/g,'i').normalize('NFD').replace(/[\u0300-\u036f]/g,'')==='mustafa caki';
  const card=Array.isArray(result?.cards)?result.cards.find(x=>validId?x.id===id:isFounder(x)):null;
  const biography=window.VertexTeamLinks.biography(card,lang);
  if(!card||!biography){unavailable(words[2]);return}
  document.title=card.name+' | Vertex';
  el('vp-name').textContent=card.name;
  el('vp-role').textContent=window.VertexTeamLinks.roleTitle(card,lang)+' · Vertex';
  const photo=safeUrl(card.imageUrl);
  el('vp-photo').replaceChildren();
  if(photo){const img=document.createElement('img');img.alt=card.name;img.src=photo;img.width=160;img.height=160;el('vp-photo').append(img)}
  const bio=el('vp-bio');bio.replaceChildren();
  biography.split(/\n\s*\n/).forEach(paragraph=>{const p=document.createElement('p');p.textContent=paragraph.trim();bio.append(p)});
  const links=el('vp-links');links.replaceChildren();
  for(const normalized of window.VertexTeamLinks.ordered(card.links)){
   const a=document.createElement('a');a.className='vp-link';a.dataset.social=normalized.key;a.href=normalized.href;if(normalized.key!=='email'){a.target='_blank';a.rel='noopener noreferrer';}
   const logo=document.createElement('img');logo.alt='';
   logo.src=normalized.icon;
   const text=document.createElement('span');text.textContent=normalized.label+(normalized.key==='email'?'':' ↗');a.append(logo,text);links.append(a);
  }
  el('vp-links-pane').hidden=!links.children.length;
  el('vp-content').hidden=false;el('vp-error').hidden=true;
  // Notify the skyline after biography text and links are in the real layout.
  el('vp-content').dispatchEvent(new Event('vertex:profile-ready',{bubbles:true}));
 }catch(error){
  unavailable(words[3]);
  const retry=document.createElement('button');retry.type='button';retry.className='btn';
  retry.textContent=lang==='tr'?'Tekrar dene':'Try again';retry.addEventListener('click',load);el('vp-error').append(retry);
  console.warn('[profile] unavailable',error);
 }finally{loading=false;}
}
// Language switching keeps the selected person on the equivalent profile route.
const profileQuery=new URLSearchParams(location.search);
const profileId=profileQuery.get('id'),profileSlug=profileQuery.get('slug');
const preserveId=!!profileId&&/^[a-zA-Z0-9_-]{1,128}$/.test(profileId);
if(preserveId||(!profileId&&profileSlug==='mustafa-caki')){
 document.querySelectorAll('.lang-row').forEach(link=>{
  const target=new URL(link.href);target.pathname=target.pathname.replace(/\/$/,'')+'/profile.html';
  target.searchParams.set(preserveId?'id':'slug',preserveId?profileId:profileSlug);link.href=target.href;
 });
}
load();
})();
