/* Validate and preview before the explicit final submission below. */
(function(){'use strict';const form=document.getElementById('joinForm');if(!form)return;
const birth=document.getElementById('joinBirthDate');birth.max=new Date().toISOString().slice(0,10);
form.addEventListener('submit',async event=>{event.preventDefault();if(window.validateVertexPhone&&!await window.validateVertexPhone()){document.getElementById('joinPhone').reportValidity();return;}if(!form.reportValidity())return;
const list=document.getElementById('beacon-review-fields');list.replaceChildren();
form.querySelectorAll('.form-group').forEach(field=>{const input=field.querySelector('input[name],select[name],textarea[name]');if(!input||!input.value)return;const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=field.querySelector('label').textContent;dd.textContent=input.id==='joinPhone'&&window.BeaconPhone?window.BeaconPhone.getNumber():input.tagName==='SELECT'?input.selectedOptions[0].textContent:input.value;list.append(dt,dd)});
form.hidden=true;const review=document.getElementById('beacon-review');review.hidden=false;review.focus();});
document.getElementById('beacon-edit').addEventListener('click',()=>{document.getElementById('beacon-review').hidden=true;form.hidden=false;form.querySelector('input').focus()});})();
/* Explicit final submission. A retry reuses the same request ID and payload. */
(function(){'use strict';const send=document.getElementById('beacon-send'),form=document.getElementById('joinForm');if(!send||!form)return;
const status=document.getElementById('beacon-submit-status'),edit=document.getElementById('beacon-edit'),tr=document.documentElement.lang==='tr';let requestId=null,signature='',inFlight=false,submitted=false;
send.addEventListener('click',async()=>{if(inFlight||submitted)return;const data=Object.fromEntries(new FormData(form));data.phone=window.BeaconPhone?window.BeaconPhone.getNumber():data.phone;data.terms=form.elements.terms.checked;data.accurate=form.elements.accurate.checked;data.language=document.documentElement.lang||'en';
 const next=JSON.stringify(data);if(next!==signature){signature=next;requestId=crypto.randomUUID();}data.requestId=requestId;
 inFlight=true;send.disabled=true;edit.disabled=true;status.textContent=tr?'Gönderiliyor…':'Submitting…';const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);
 try{const response=await fetch('https://europe-west1-vertex-ai-1618.cloudfunctions.net/submitBeaconApplication',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:controller.signal,credentials:'omit'});const result=await response.json().catch(()=>null);if(!response.ok||result?.applicationId!==requestId||result?.status!=='received'){const error=new Error('submission_failed');error.status=response.status;throw error;}
 submitted=true;status.textContent=(tr?'Başvurun alındı. Referans: ':'Application received. Reference: ')+result.applicationId;send.hidden=true;edit.hidden=true;
 }catch(error){status.textContent=error.status===429?(tr?'Çok sayıda deneme yapıldı. Daha sonra tekrar dene.':'Too many attempts. Please try again later.'):(tr?'Başvuru henüz doğrulanamadı. Gönderildiğini varsayma; tekrar deneyebilirsin.':'Submission could not be confirmed. Please retry; do not assume it was received.');}
 finally{clearTimeout(timer);inFlight=false;if(!submitted){send.disabled=false;edit.disabled=false;}}
});})();
