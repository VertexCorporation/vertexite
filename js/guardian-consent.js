(() => {
  'use strict';
  const get = id => document.getElementById(id);
  const status = get('guardianStatus');
  const section = get('guardianInformation');
  const form = get('guardianDecision');
  const key = location.hash.slice(1);
  const endpoint = 'https://europe-west1-vertex-ai-1618.cloudfunctions.net/guardianApplicationConsent';
  let notice, english = false;
  if (key) history.replaceState(null,'',location.pathname);

  function setStatus(tr,en) { status.textContent = english ? en : tr; }
  async function request(action) {
    const response = await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({key,action,version:notice?.version,declaration:form.querySelector('input').checked}),
      cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:AbortSignal.timeout(12000)});
    if (!response.ok) throw Object.assign(new Error('Consent request unsuccessful'),{status:response.status});
    return response.json();
  }
  function errorMessage(error) {
    if (error.status === 404 || error.status === 410) {
      section.hidden = true;
      setStatus('Bağlantı geçersiz veya süresi dolmuş. Yeni bağlantı için Vertex ile iletişime geçin.',
        'This link is invalid or expired. Contact Vertex for a new link.');
      return;
    }
    setStatus('İşlem şu anda tamamlanamadı. E-postadaki bağlantıdan yeniden deneyin.',
      'This request could not be completed. Try again from the email link.');
  }
  function showDecision(value) {
    section.hidden = true;
    if (value === 'approved') setStatus('Katılım onayınız kaydedildi.','Your approval has been recorded.');
    else setStatus('Onay vermediğiniz kaydedildi.','Your decision to decline has been recorded.');
  }
  if (!key) { errorMessage({status:404}); return; }
  request('view').then(result => {
    english = result.language === 'en';
    if (english) {
      document.documentElement.lang = 'en';
      document.title = 'Guardian consent | Vertex';
      get('guardianTitle').textContent = 'Vertex Experience Programme';
      get('guardianPrivacyTitle').textContent = 'Privacy information';
      get('guardianPrivacyLink').textContent = 'Vertex Privacy Policy';
      get('guardianPrivacyLink').href = '/privacy-policy';
      get('guardianApprove').textContent = 'Approve participation';
      get('guardianDecline').textContent = 'Decline participation';
    }
    if (result.status !== 'pending') { showDecision(result.status); return; }
    notice = result.notice;
    get('guardianApplicant').textContent = result.applicantName;
    for (const text of notice.paragraphs) {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      get('guardianProgramme').append(paragraph);
    }
    get('guardianPrivacy').textContent = notice.notice;
    get('guardianDeclaration').textContent = notice.declaration;
    status.textContent = '';
    section.hidden = false;
  }).catch(errorMessage);
  form.addEventListener('submit',async event => {
    event.preventDefault();
    if (!notice || !event.submitter || form.getAttribute('aria-busy') === 'true') return;
    form.setAttribute('aria-busy','true');
    const buttons = [...form.querySelectorAll('button')];
    buttons.forEach(button => { button.disabled = true; });
    try { showDecision((await request(event.submitter.value)).status); }
    catch (error) { errorMessage(error); }
    finally {
      form.removeAttribute('aria-busy');
      buttons.forEach(button => { button.disabled = false; });
    }
  });
})();
