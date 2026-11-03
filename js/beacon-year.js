/* Signed historical years; there is no year zero. */
(() => {
 const select=document.getElementById('beacon-year');if(!select)return;
 const locale=document.documentElement.lang||'en';
 const formatter=new Intl.DateTimeFormat(locale,{year:'numeric',era:'short',timeZone:'UTC'});
 const fragment=document.createDocumentFragment();
 for(let year=new Date().getFullYear();year>=-1881;year--){
  if(year===0)continue;
  const option=document.createElement('option');option.value=String(year);
  const date=new Date(0);date.setUTCFullYear(year<0?year+1:year,0,1);
  option.textContent=year>0?String(year):formatter.format(date);
  fragment.append(option);
 }
 select.append(fragment);
})();
