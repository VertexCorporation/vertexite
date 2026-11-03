(function(){"use strict";const interfaceTranslations = {
  selectedCountryAriaLabel: "تغيير الدولة لرقم الهاتف، المحددة ${countryName} (${dialCode})",
  noCountrySelected: "اختر دولة لرقم الهاتف",
  countryListAriaLabel: "قائمة الدول",
  searchPlaceholder: "بحث",
  clearSearchAriaLabel: "مسح البحث",
  closeCountrySelectorAriaLabel: "إغلاق",
  searchEmptyState: "لم يتم العثور على نتائج",
  searchSummaryAria(count) {
    if (count === 0) {
      return "لم يتم العثور على نتائج";
    }
    if (count === 1) {
      return "تم العثور على نتيجة واحدة";
    }
    if (count === 2) {
      return "تم العثور على نتيجتين";
    }
    if (count % 100 >= 3 && count % 100 <= 10) {
      return `تم العثور على ${count} نتائج`;
    }
    return `تم العثور على ${count} نتيجة`;
  }
};
window.VertexPhoneUI=interfaceTranslations;
    const langToCountry = {
        'tr': 'tr', 'en': 'us', 'ar': 'ae', 'az': 'az', 'de': 'de', 'es': 'es', 'fr': 'fr', 'hi': 'in',
        'id': 'id', 'it': 'it', 'ja': 'jp', 'ko': 'kr', 'nl': 'nl', 'pt': 'pt', 'ru': 'ru', 'zh': 'cn'
    };
    const defaultCountry = langToCountry['ar'] || 'us';
    
    const phoneInput = document.querySelector("#joinPhone");
    phoneInput.autocomplete="tel"; phoneInput.inputMode="tel";
    const iti = window.intlTelInput(phoneInput, {
      initialCountry: defaultCountry,
      loadUtils: () => import("/assets/vendor/intl-tel-input/js/utils.js"),
      countrySearch: true, countryNameLocale: document.documentElement.lang, uiTranslations:window.VertexPhoneUI, strictMode:false,
      separateDialCode: true,
      formatAsYouType: true
    });

    
    // Form Logic
    const termsCheck = document.getElementById('termsCheck');
    const doctrineCheck = document.getElementById('doctrineCheck');
    const contractCheck = document.getElementById('contractCheck');
    const submitBtn = document.getElementById('submitBtn');
    const birthDateInput = document.getElementById('joinBirthDate');
    birthDateInput.max = new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);
    
    window.validateVertexPhone=async function(){try{if(iti.promise)await iti.promise;}catch{}const valid=iti.isValidNumber()===true;phoneInput.setCustomValidity(valid?'':"أدخل رقم هاتف دوليًا صالحًا.");phoneInput.setAttribute('aria-invalid',String(!valid));return valid;};phoneInput.addEventListener('input',()=>{phoneInput.setCustomValidity('');phoneInput.removeAttribute('aria-invalid');});phoneInput.addEventListener('countrychange',()=>{phoneInput.setCustomValidity('');phoneInput.removeAttribute('aria-invalid');});
    const reqErr = 'يرجى ملء هذا الحقل.';
    const emailErr = 'يرجى إدخال بريد إلكتروني صحيح.';
    const formInputs = document.querySelectorAll('#joinForm input[required], #joinForm textarea[required], #joinForm select[required]');
    
    formInputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            if (this.validity.valueMissing) {
                this.setCustomValidity(reqErr);
            } else if (this.type === 'email' && this.validity.typeMismatch) {
                this.setCustomValidity(emailErr);
            } else {
                this.setCustomValidity('');
            }
        });
        
        input.addEventListener('input', function(e) {
            this.setCustomValidity(''); 
        });
    });

window.BeaconPhone=iti;})();