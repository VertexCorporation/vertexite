/* Join Us only: keep one action visible while checking the embedded booker in the background. */
(() => {
 const form=document.getElementById('joinForm');if(!form||!document.body.classList.contains('vertex-join-page'))return;
 const translations={tr:['Bilgileriniz','Mülakat Tarihi','Mülakat Tarihi Seç','Bilgilere Dön','Başvuru seçenekleri hazırlanıyor…'],en:['Your Details','Interview Date','Choose an Interview Date','Back to Details','Preparing application options…'],de:['Ihre Angaben','Interviewtermin','Interviewtermin auswählen','Zurück zu den Angaben','Bewerbungsoptionen werden vorbereitet…'],fr:['Vos informations',"Date de l’entretien",'Choisir une date','Retour aux informations','Préparation des options…'],es:['Tus datos','Fecha de entrevista','Elegir fecha','Volver a los datos','Preparando opciones…'],it:['I tuoi dati','Data del colloquio','Scegli una data','Torna ai dati','Preparazione delle opzioni…'],pt:['Seus dados','Data da entrevista','Escolher data','Voltar aos dados','Preparando opções…'],nl:['Uw gegevens','Gespreksdatum','Kies een datum','Terug naar gegevens','Opties worden voorbereid…'],ru:['Ваши данные','Дата собеседования','Выбрать дату','Вернуться к данным','Подготовка вариантов…'],ar:['بياناتك','موعد المقابلة','اختيار موعد','العودة إلى البيانات','جارٍ إعداد الخيارات…'],hi:['आपकी जानकारी','साक्षात्कार की तारीख','तारीख चुनें','जानकारी पर वापस जाएं','विकल्प तैयार हो रहे हैं…'],id:['Data Anda','Tanggal wawancara','Pilih tanggal','Kembali ke data','Menyiapkan pilihan…'],ja:['あなたの情報','面接日時','日時を選ぶ','情報に戻る','選択肢を準備中…'],ko:['지원자 정보','면접 날짜','날짜 선택','정보로 돌아가기','옵션 준비 중…'],zh:['您的信息','面试日期','选择日期','返回信息','正在准备选项…'],az:['Məlumatlarınız','Müsahibə tarixi','Tarix seçin','Məlumatlara qayıt','Seçimlər hazırlanır…']};
 const [detailsLabel,dateLabel,nextLabel,backLabel]=translations[document.documentElement.lang]||translations.en;
 const interview=form.querySelector('.interview-section'),submit=document.getElementById('submitBtn');if(!interview||!submit)return;
 const details=document.createElement('div'),date=document.createElement('div'),actions=document.createElement('div'),back=document.createElement('button');
 details.id='applicationDetails';date.id='applicationDate';details.className='application-step';date.className='application-step application-calendar-probe';actions.className='application-actions';details.setAttribute('aria-label',detailsLabel);date.setAttribute('aria-label',dateLabel);date.setAttribute('aria-hidden','true');date.inert=true;
 [...form.children].forEach(field=>{if(field!==interview&&field!==submit)details.append(field);});date.append(interview);
 back.type='button';back.className='btn application-back-btn';back.textContent=backLabel;date.append(back);details.append(actions);
 const submitLabel=submit.textContent;submit.hidden=false;submit.style.display='';submit.removeAttribute('aria-hidden');actions.append(submit);form.append(details,date);
 const feedback=document.getElementById('interviewStatusBox');if(feedback){feedback.classList.add('application-feedback');feedback.setAttribute('aria-live','polite');form.append(feedback);}
 let mode='pending',booked=false,transition=0,resetVersion=0,waitingForMode=false,resolveMode;
 const modeReady=new Promise(resolve=>{resolveMode=resolve;});form.dataset.applicationMode=mode;window.applicationStepsEnabled=true;
 function toDetails(){transition++;details.hidden=false;date.hidden=true;back.disabled=false;}
 function activate(available){
  if(booked||mode==='direct'||available&&mode!=='pending')return;
  clearTimeout(healthTimer);mode=available?'calendar':'direct';form.dataset.applicationMode=mode;date.classList.remove('application-calendar-probe');date.removeAttribute('aria-hidden');date.inert=false;date.hidden=true;
  submit.textContent=available?nextLabel:submitLabel;
  if(!available){toDetails();date.remove();}
  resolveMode();
 }
 async function chooseDate(){
  if(mode!=='calendar')return;
  if(window.validateVertexPhone&&!await window.validateVertexPhone()){document.getElementById('joinPhone').reportValidity();return;}
  const invalid=[...details.querySelectorAll('input,textarea,select')].find(input=>!input.checkValidity());if(invalid){invalid.reportValidity();return;}
  const ticket=++transition,reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(!reduced&&details.animate)await details.animate([{opacity:1},{opacity:0}],{duration:120,easing:'ease-out'}).finished.catch(()=>{});if(ticket!==transition||mode!=='calendar')return;
  details.hidden=true;date.hidden=false;if(!reduced&&date.animate)date.animate([{opacity:0},{opacity:1}],{duration:180,easing:'ease-out'});form.scrollIntoView({block:'start',behavior:'auto'});back.focus({preventScroll:true});
 }
 const healthTimer=setTimeout(()=>activate(false),10000);
 window.JoinApplicationCalendar={ready:()=>activate(true),unavailable:()=>activate(false),booked:()=>{if(mode==='pending')activate(true);booked=true;clearTimeout(healthTimer);},get mode(){return mode;}};
 back.addEventListener('click',()=>{if(mode==='calendar'){toDetails();details.querySelector('input,textarea,select')?.focus({preventScroll:true});}});
 form.addEventListener('submit',event=>{
  if(mode==='direct'||booked)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(mode==='calendar'&&!details.hidden){void chooseDate();return;}
  if(mode==='pending'&&!waitingForMode){
   waitingForMode=true;const version=resetVersion;submit.setAttribute('aria-busy','true');
   modeReady.then(()=>{waitingForMode=false;submit.removeAttribute('aria-busy');if(version===resetVersion&&!submit.disabled&&form.checkValidity())form.requestSubmit(submit);});
  }
 },true);
 form.addEventListener('reset',()=>{resetVersion++;booked=false;if(mode==='calendar')toDetails();});
})();
