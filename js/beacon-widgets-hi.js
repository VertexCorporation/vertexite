(function(){"use strict";const interfaceTranslations = {
  selectedCountryAriaLabel: "फ़ोन नंबर के लिए देश बदलें, चयनित ${countryName} (${dialCode})",
  noCountrySelected: "फ़ोन नंबर के लिए देश चुनें",
  countryListAriaLabel: "देशों की सूची",
  searchPlaceholder: "खोज",
  clearSearchAriaLabel: "खोज साफ़ करें",
  closeCountrySelectorAriaLabel: "बंद करें",
  searchEmptyState: "कोई परिणाम नहीं मिला",
  searchSummaryAria(count) {
    if (count === 0) {
      return "कोई परिणाम नहीं मिला";
    }
    if (count === 1) {
      return "1 परिणाम मिला";
    }
    return `${count} परिणाम मिले`;
  }
};
window.VertexPhoneUI=interfaceTranslations;
    const langToCountry = {
        'tr': 'tr', 'en': 'us', 'ar': 'ae', 'az': 'az', 'de': 'de', 'es': 'es', 'fr': 'fr', 'hi': 'in',
        'id': 'id', 'it': 'it', 'ja': 'jp', 'ko': 'kr', 'nl': 'nl', 'pt': 'pt', 'ru': 'ru', 'zh': 'cn'
    };
    const defaultCountry = langToCountry['hi'] || 'us';
    
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
    
    window.validateVertexPhone=async function(){try{if(iti.promise)await iti.promise;}catch{}const valid=iti.isValidNumber()===true;phoneInput.setCustomValidity(valid?'':"मान्य अंतरराष्ट्रीय फ़ोन नंबर दर्ज करें।");phoneInput.setAttribute('aria-invalid',String(!valid));return valid;};phoneInput.addEventListener('input',()=>{phoneInput.setCustomValidity('');phoneInput.removeAttribute('aria-invalid');});phoneInput.addEventListener('countrychange',()=>{phoneInput.setCustomValidity('');phoneInput.removeAttribute('aria-invalid');});
    const reqErr = 'कृपया इस फ़ील्ड को भरें।';
    const emailErr = 'कृपया एक मान्य ईमेल दर्ज करें।';
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