/* Front-end only: validate and review; never submit or persist applicant data. */
(function(){'use strict';const form=document.getElementById('joinForm');if(!form)return;
const birth=document.getElementById('joinBirthDate');birth.max=new Date().toISOString().slice(0,10);
form.addEventListener('submit',async event=>{event.preventDefault();if(window.validateVertexPhone&&!await window.validateVertexPhone()){document.getElementById('joinPhone').reportValidity();return;}if(!form.reportValidity())return;
const list=document.getElementById('beacon-review-fields');list.replaceChildren();
form.querySelectorAll('.form-group').forEach(field=>{const input=field.querySelector('input[name],select[name],textarea[name]');if(!input||!input.value)return;const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=field.querySelector('label').textContent;dd.textContent=input.id==='joinPhone'&&window.BeaconPhone?window.BeaconPhone.getNumber():input.value;list.append(dt,dd)});
form.hidden=true;const review=document.getElementById('beacon-review');review.hidden=false;review.focus();});
document.getElementById('beacon-edit').addEventListener('click',()=>{document.getElementById('beacon-review').hidden=true;form.hidden=false;form.querySelector('input').focus()});})();