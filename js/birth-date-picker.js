(function vertexBirthPicker(){
"use strict";
const words={
tr:["Doğum tarihi seçin","Lütfen doğum tarihi seçin","Önceki ay","Sonraki ay","Takvimi aç","Ay","Yıl"],
en:["Select date of birth","Date of birth is required","Previous month","Next month","Open calendar","Month","Year"],
de:["Geburtsdatum auswählen","Geburtsdatum erforderlich","Vorheriger Monat","Nächster Monat","Kalender öffnen","Monat","Jahr"],
fr:["Choisir la date de naissance","Date de naissance requise","Mois précédent","Mois suivant","Ouvrir le calendrier","Mois","Année"],
es:["Elegir fecha de nacimiento","Fecha de nacimiento obligatoria","Mes anterior","Mes siguiente","Abrir calendario","Mes","Año"],
it:["Seleziona la data di nascita","Data di nascita obbligatoria","Mese precedente","Mese successivo","Apri il calendario","Mese","Anno"],
pt:["Escolher data de nascimento","Data de nascimento obrigatória","Mês anterior","Mês seguinte","Abrir calendário","Mês","Ano"],
nl:["Geboortedatum kiezen","Geboortedatum is verplicht","Vorige maand","Volgende maand","Kalender openen","Maand","Jaar"],
ru:["Выберите дату рождения","Дата рождения обязательна","Предыдущий месяц","Следующий месяц","Открыть календарь","Месяц","Год"],
ar:["اختر تاريخ الميلاد","تاريخ الميلاد مطلوب","الشهر السابق","الشهر التالي","افتح التقويم","الشهر","السنة"],
hi:["जन्म तिथि चुनें","जन्म तिथि आवश्यक है","पिछला महीना","अगला महीना","कैलेंडर खोलें","महीना","साल"],
id:["Pilih tanggal lahir","Tanggal lahir wajib diisi","Bulan sebelumnya","Bulan berikutnya","Buka kalender","Bulan","Tahun"],
ja:["生年月日を選択","生年月日は必須です","前の月","次の月","カレンダーを開く","月","年"],
ko:["생년월일 선택","생년월일을 입력하세요","이전 달","다음 달","달력 열기","월","년"],
zh:["选择出生日期","必须填写出生日期","上个月","下个月","打开日历","月份","年份"],
az:["Doğum tarixini seçin","Doğum tarixi tələb olunur","Əvvəlki ay","Növbəti ay","Təqvimi aç","Ay","İl"]
};
const node=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
const pad=n=>String(n).padStart(2,"0");
const toISO=(y,m,d)=>`${y}-${pad(m+1)}-${pad(d)}`;
function parse(value){if(!/^\d{4}-\d\d-\d\d$/.test(value||""))return null;const [y,m,d]=value.split("-").map(Number);const dt=new Date(y,m-1,d,12);return dt.getFullYear()===y&&dt.getMonth()===m-1&&dt.getDate()===d?dt:null}
function init(){
const source=document.getElementById("joinBirthDate");
if(!source||source.type!=="date"||source.dataset.vertexPicker)return;
const lang=(document.documentElement.lang||"en").split("-")[0].toLowerCase(),i18n=words[lang]||words.en,locale=lang==="zh"?"zh-CN":lang==="pt"?"pt-PT":lang;
const today=new Date(),maxDate=parse(source.max)||today,maxISO=toISO(maxDate.getFullYear(),maxDate.getMonth(),maxDate.getDate()),maxYear=maxDate.getFullYear(),minYear=Math.max(1900,maxYear-123);
let year=Math.max(minYear,maxYear-18),month=today.getMonth(),opened=false;
const anchor=node("div","vx-birth-anchor");source.parentNode.insertBefore(anchor,source);anchor.append(source);
source.classList.add("vx-birth-source");source.tabIndex=-1;source.setAttribute("aria-hidden","true");source.dataset.vertexPicker="ready";
const trigger=node("button","vx-birth-trigger");trigger.type="button";trigger.id="vx-birth-trigger";trigger.setAttribute("aria-haspopup","dialog");trigger.setAttribute("aria-expanded","false");trigger.setAttribute("aria-label",i18n[4]);
const display=node("span","vx-birth-value vx-birth-placeholder","GG.AA.YYYY");const icon=node("span","vx-birth-icon");icon.setAttribute("aria-hidden","true");
icon.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 10h18"/></svg>';
trigger.append(display,icon);anchor.append(trigger);
const label=anchor.parentElement?.querySelector('label[for="joinBirthDate"]');if(label)label.htmlFor=trigger.id;
const error=node("span","vx-birth-error",i18n[1]);error.hidden=true;error.setAttribute("role","alert");anchor.after(error);
const panel=node("div","vx-date-panel");panel.id="vx-birth-calendar";panel.hidden=true;panel.setAttribute("role","dialog");panel.setAttribute("aria-label",i18n[0]);trigger.setAttribute("aria-controls",panel.id);document.body.append(panel);
const header=node("div","vx-date-head"),previous=node("button","vx-date-arrow","‹"),next=node("button","vx-date-arrow","›");previous.type=next.type="button";previous.setAttribute("aria-label",i18n[2]);next.setAttribute("aria-label",i18n[3]);
const selects=node("div","vx-date-selects"),monthSelect=node("select","vx-date-month"),yearSelect=node("select","vx-date-year");monthSelect.setAttribute("aria-label",i18n[5]);yearSelect.setAttribute("aria-label",i18n[6]);
for(let m=0;m<12;m++){const opt=node("option","",new Intl.DateTimeFormat(locale,{month:"long"}).format(new Date(2024,m,1)));opt.value=String(m);monthSelect.append(opt)}
for(let y=maxYear;y>=minYear;y--){const opt=node("option","",String(y));opt.value=String(y);yearSelect.append(opt)}
selects.append(monthSelect,yearSelect);header.append(previous,selects,next);
const weekdays=node("div","vx-date-weekdays"),grid=node("div","vx-date-grid");grid.setAttribute("role","grid");
for(let d=0;d<7;d++)weekdays.append(node("span","",new Intl.DateTimeFormat(locale,{weekday:"short"}).format(new Date(2024,0,d+1))));
panel.append(header,weekdays,grid);
function showValue(){const dt=parse(source.value);display.textContent=dt?new Intl.DateTimeFormat(locale,{day:"2-digit",month:"2-digit",year:"numeric"}).format(dt):"GG.AA.YYYY";display.classList.toggle("vx-birth-placeholder",!dt);trigger.classList.toggle("vx-birth-invalid",!error.hidden)}
function render(){
monthSelect.value=String(month);yearSelect.value=String(year);
previous.disabled=year===minYear&&month===0;next.disabled=year===maxYear&&month>=maxDate.getMonth();
grid.replaceChildren();const offset=(new Date(year,month,1).getDay()+6)%7;for(let k=0;k<offset;k++)grid.append(node("span","vx-date-empty"));
const days=new Date(year,month+1,0).getDate();
for(let day=1;day<=days;day++){
const value=toISO(year,month,day),btn=node("button","vx-date-day",String(day));btn.type="button";btn.setAttribute("role","gridcell");btn.setAttribute("aria-label",new Intl.DateTimeFormat(locale,{year:"numeric",month:"long",day:"numeric"}).format(new Date(year,month,day)));btn.setAttribute("aria-selected",value===source.value?"true":"false");
if(value===source.value)btn.classList.add("is-selected");if(value===maxISO)btn.classList.add("is-today");btn.disabled=value>maxISO;
btn.addEventListener("click",()=>{source.value=value;error.hidden=true;trigger.removeAttribute("aria-invalid");source.dispatchEvent(new Event("input",{bubbles:true}));source.dispatchEvent(new Event("change",{bubbles:true}));showValue();close();trigger.focus({preventScroll:true})});grid.append(btn)
}}
function step(delta){const date=new Date(year,month+delta,1);if(date.getFullYear()<minYear||date.getFullYear()>maxYear||(date.getFullYear()===maxYear&&date.getMonth()>maxDate.getMonth()))return;year=date.getFullYear();month=date.getMonth();render()}
function position(){
if(!opened)return;const rect=trigger.getBoundingClientRect();if(rect.bottom<0||rect.top>window.innerHeight){close();return}
const width=Math.min(348,window.innerWidth-24);panel.style.width=`${width}px`;panel.style.left=`${Math.max(12,Math.min(rect.left,window.innerWidth-width-12))}px`;panel.style.maxHeight=`${Math.max(220,window.innerHeight-24)}px`;
const height=panel.offsetHeight,below=window.innerHeight-rect.bottom,top=below>=height+8||below>=rect.top?rect.bottom+8:rect.top-height-8;
panel.style.top=`${Math.max(12,Math.min(top,window.innerHeight-height-12))}px`;
}
function close(){if(!opened)return;opened=false;panel.hidden=true;trigger.setAttribute("aria-expanded","false");window.removeEventListener("resize",position);window.removeEventListener("scroll",position,true)}
function toggle(){
if(opened){close();return}const dt=parse(source.value);if(dt){year=dt.getFullYear();month=dt.getMonth()}render();opened=true;panel.hidden=false;trigger.setAttribute("aria-expanded","true");position();window.addEventListener("resize",position);window.addEventListener("scroll",position,true)
}
trigger.addEventListener("click",toggle);previous.addEventListener("click",()=>step(-1));next.addEventListener("click",()=>step(1));
monthSelect.addEventListener("change",()=>{month=Number(monthSelect.value);if(year===maxYear&&month>maxDate.getMonth())month=maxDate.getMonth();render()});
yearSelect.addEventListener("change",()=>{year=Number(yearSelect.value);if(year===maxYear&&month>maxDate.getMonth())month=maxDate.getMonth();render()});
document.addEventListener("pointerdown",e=>{if(opened&&!panel.contains(e.target)&&!anchor.contains(e.target))close()});
document.addEventListener("keydown",e=>{if(opened&&e.key==="Escape"){e.preventDefault();close();trigger.focus({preventScroll:true})}});
source.addEventListener("invalid",e=>{e.preventDefault();error.hidden=false;trigger.setAttribute("aria-invalid","true");showValue();trigger.focus({preventScroll:true})});
source.addEventListener("change",()=>{error.hidden=true;trigger.removeAttribute("aria-invalid");showValue()});
source.form?.addEventListener("reset",()=>requestAnimationFrame(()=>{error.hidden=true;trigger.removeAttribute("aria-invalid");showValue();close()}));
showValue();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();