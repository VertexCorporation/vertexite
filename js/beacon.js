/* Front-end only: validate and review; never submit or persist applicant data. */
(function(){'use strict';const form=document.getElementById('beacon-form');if(!form)return;
const birth=form.elements.birthDate;birth.max=new Date().toISOString().slice(0,10);
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;
const list=document.getElementById('beacon-review-fields');list.replaceChildren();
form.querySelectorAll('.beacon-field').forEach(field=>{const input=field.querySelector('input,select,textarea');if(!input.value)return;const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=field.querySelector('label').textContent;dd.textContent=input.value;list.append(dt,dd)});
form.hidden=true;const review=document.getElementById('beacon-review');review.hidden=false;review.focus();});
document.getElementById('beacon-edit').addEventListener('click',()=>{document.getElementById('beacon-review').hidden=true;form.hidden=false;form.querySelector('input').focus()});})();