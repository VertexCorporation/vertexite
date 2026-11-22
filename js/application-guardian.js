(() => {
  'use strict';
  const birth = document.getElementById('joinBirthDate');
  if (!birth?.form) return;
  const form = birth.form;
  const applicantEmail = document.getElementById('joinEmail');
  const tr = document.documentElement.lang === 'tr';
  const copy = tr ? {
    heading:'Veli bilgilendirmesi',
    detail:'Başvurunu gönderdiğinde velin veya yasal temsilcin, programa ilişkin bilgi ve onay bağlantısını e-postayla alacak.',
    name:'Velinin veya yasal temsilcinin adı soyadı',
    email:'Velinin veya yasal temsilcinin e-posta adresi',
    age:'Başvurmak için 13 yaşının üzerinde olmalı ve 14 yaşını doldurmuş olmalısın.',
    different:'Velinin e-posta adresi başvuru adresinden farklı olmalı.',
    fullName:'Velinin adını ve soyadını gir.',
    pending:'Başvurun alındı. Velinin e-posta adresine bilgilendirme ve onay bağlantısı gönderdik. Üyeliğin için veli onayı gerekiyor.'
  } : {
    heading:'Guardian information',
    detail:'When you apply, your parent or legal guardian will receive programme information and an approval link by email.',
    name:'Parent or legal guardian’s full name',
    email:'Parent or legal guardian’s email address',
    age:'You must be at least 14 years old to apply.',
    different:'The guardian’s email address must be different from yours.',
    fullName:'Enter the guardian’s first and last name.',
    pending:'Your application has been received. We emailed your guardian the programme information and an approval link. Guardian approval is required for membership.'
  };

  const group = document.createElement('section');
  group.className = 'application-guardian';
  group.hidden = true;
  group.setAttribute('aria-labelledby','guardianHeading');
  const heading = document.createElement('h2');
  heading.id = 'guardianHeading';
  heading.textContent = copy.heading;
  const detail = document.createElement('p');
  detail.id = 'guardianDetail';
  detail.textContent = copy.detail;

  function addField(id, type, caption, max) {
    const wrapper = document.createElement('div');
    wrapper.className = 'form-group';
    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = caption;
    const field = document.createElement('input');
    field.id = id;
    field.type = type;
    field.maxLength = max;
    field.autocomplete = 'off';
    field.disabled = true;
    field.setAttribute('aria-describedby','guardianDetail');
    wrapper.append(label,field);
    group.append(wrapper);
    return field;
  }

  group.append(heading,detail);
  const name = addField('joinGuardianName','text',copy.name,128);
  const email = addField('joinGuardianEmail','email',copy.email,254);
  birth.closest('.form-group').after(group);
  const warning = document.createElement('p');
  warning.id = 'joinAgeWarning';
  warning.className = 'application-age-warning';
  warning.setAttribute('role','alert');
  warning.hidden = true;
  warning.textContent = copy.age;
  birth.closest('.form-group').append(warning);

  function validateFields() {
    name.setCustomValidity(!name.disabled && name.value.trim() && !/\s/u.test(name.value.trim()) ? copy.fullName : '');
    email.setCustomValidity(!email.disabled && email.value && email.value.trim().toLowerCase() === applicantEmail.value.trim().toLowerCase() ? copy.different : '');
  }

  function refresh() {
    const today = new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const parts = Object.fromEntries(today.map(({type,value}) => [type,value]));
    const iso = parts.year + '-' + parts.month + '-' + parts.day;
    const age = birth.value && birth.value <= iso
      ? Number(parts.year) - Number(birth.value.slice(0,4)) - (iso.slice(5) < birth.value.slice(5) ? 1 : 0)
      : null;
    const underAge = age !== null && age < 14;
    const needsGuardian = age !== null && age >= 14 && age < 18;
    birth.setCustomValidity(underAge ? copy.age : '');
    warning.hidden = !underAge;
    const trigger = document.getElementById('vx-birth-trigger');
    if (trigger) {
      trigger.setAttribute('aria-describedby',underAge ? 'vx-birth-help joinAgeWarning' : 'vx-birth-help');
      if (underAge) trigger.setAttribute('aria-invalid','true');
    }
    group.hidden = !needsGuardian;
    for (const field of [name,email]) {
      field.required = needsGuardian;
      field.disabled = !needsGuardian;
      if (!needsGuardian) field.value = '';
    }
    validateFields();
  }
  birth.addEventListener('input',refresh);
  // The calendar widget clears its empty-field error on change first.
  birth.addEventListener('change',() => queueMicrotask(refresh));
  form.addEventListener('reset',() => queueMicrotask(refresh));
  for (const field of [name,email,applicantEmail]) field.addEventListener('input',validateFields);
  window.VertexApplicationGuardian = {
    payload:() => group.hidden ? {} : {guardianName:name.value.trim(),guardianEmail:email.value.trim()},
    showPending(result,modal) {
      if (result.guardianConsentStatus !== 'pending') return;
      const message = modal.querySelector('.success-modal-content p');
      if (message) message.textContent = copy.pending;
    }
  };
  refresh();
})();
