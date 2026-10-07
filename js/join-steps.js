(() => {
  const form = document.getElementById('joinForm');
  if (!form) return;

  const translations = {
    tr: ['Bilgileriniz', 'Mülakat tarihi', 'Tarih seçimine geç', 'Bilgilere dön'],
    en: ['Your details', 'Interview date', 'Choose a date', 'Back to details'],
    de: ['Ihre Angaben', 'Interviewtermin', 'Termin auswählen', 'Zurück zu den Angaben'],
    fr: ['Vos informations', "Date de l’entretien", 'Choisir une date', 'Retour aux informations'],
    es: ['Tus datos', 'Fecha de entrevista', 'Elegir fecha', 'Volver a los datos'],
    it: ['I tuoi dati', 'Data del colloquio', 'Scegli una data', 'Torna ai dati'],
    pt: ['Seus dados', 'Data da entrevista', 'Escolher data', 'Voltar aos dados'],
    nl: ['Uw gegevens', 'Gespreksdatum', 'Kies een datum', 'Terug naar gegevens'],
    ru: ['Ваши данные', 'Дата собеседования', 'Выбрать дату', 'Вернуться к данным'],
    ar: ['بياناتك', 'موعد المقابلة', 'اختيار موعد', 'العودة إلى البيانات'],
    hi: ['आपकी जानकारी', 'साक्षात्कार की तारीख', 'तारीख चुनें', 'जानकारी पर वापस जाएं'],
    id: ['Data Anda', 'Tanggal wawancara', 'Pilih tanggal', 'Kembali ke data'],
    ja: ['あなたの情報', '面接日時', '日時を選ぶ', '情報に戻る'],
    ko: ['지원자 정보', '면접 날짜', '날짜 선택', '정보로 돌아가기'],
    zh: ['您的信息', '面试日期', '选择日期', '返回信息'],
    az: ['Məlumatlarınız', 'Müsahibə tarixi', 'Tarix seçin', 'Məlumatlara qayıt']
  };
  const [detailsLabel, dateLabel, nextLabel, backLabel] = translations[document.documentElement.lang] || translations.en;
  const details = document.createElement('div');
  const date = document.createElement('div');
  details.className = 'application-step';
  date.className = 'application-step';
  details.id = 'applicationDetails';
  date.id = 'applicationDate';
  details.setAttribute('aria-label', detailsLabel);
  date.setAttribute('aria-label', dateLabel);
  date.hidden = true;

  const fields = [...form.children];
  const interview = form.querySelector('.interview-section');
  const submit = document.getElementById('submitBtn');
  if (!interview || !submit) return;

  fields.forEach(field => {
    if (field === interview || field === submit) return;
    details.append(field);
  });
  date.append(interview);

  const nextActions = document.createElement('div');
  nextActions.className = 'application-actions';
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'btn btn-primary join-submit-btn';
  next.textContent = nextLabel;
  nextActions.append(next);
  details.append(nextActions);

  const dateActions = document.createElement('div');
  dateActions.className = 'application-actions';
  const back = document.createElement('button');
  back.type = 'button';
  back.className = 'btn application-back-btn';
  back.textContent = backLabel;
  dateActions.append(back, submit);
  date.append(dateActions);
  form.append(details, date);
  window.applicationStepsEnabled = true;

  function showStep(step) {
    const showDate = step === 2;
    details.hidden = showDate;
    date.hidden = !showDate;
    if (showDate) document.dispatchEvent(new Event('application:show-date'));
    form.scrollIntoView({ block: 'start', behavior: 'auto' });
    (showDate ? back : details.querySelector('input, textarea, select')).focus({ preventScroll: true });
  }

  next.addEventListener('click', () => {
    const invalid = [...details.querySelectorAll('input, textarea, select')].find(input => !input.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      return;
    }
    showStep(2);
  });
  back.addEventListener('click', () => showStep(1));
  form.addEventListener('submit', event => {
    if (details.hidden) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    next.click();
  }, true);
  form.addEventListener('reset', () => showStep(1));
})();
