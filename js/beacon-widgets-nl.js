(function(){"use strict";const interfaceTranslations = {
  selectedCountryAriaLabel: "Land van telefoonnummer wijzigen, geselecteerd ${countryName} (${dialCode})",
  noCountrySelected: "Selecteer land van telefoonnummer",
  countryListAriaLabel: "Lijst met landen",
  searchPlaceholder: "Zoekopdracht",
  clearSearchAriaLabel: "Zoekopdracht wissen",
  closeCountrySelectorAriaLabel: "Sluiten",
  searchEmptyState: "Geen resultaten gevonden",
  searchSummaryAria(count) {
    if (count === 0) {
      return "Geen resultaten gevonden";
    }
    if (count === 1) {
      return "1 resultaat gevonden";
    }
    return `${count} resultaten gevonden`;
  }
};
window.VertexPhoneUI=interfaceTranslations;
    const langToCountry = {
        'tr': 'tr', 'en': 'us', 'ar': 'ae', 'az': 'az', 'de': 'de', 'es': 'es', 'fr': 'fr', 'hi': 'in',
        'id': 'id', 'it': 'it', 'ja': 'jp', 'ko': 'kr', 'nl': 'nl', 'pt': 'pt', 'ru': 'ru', 'zh': 'cn'
    };
    const defaultCountry = langToCountry['nl'] || 'us';
    
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
    
    window.validateVertexPhone=async function(){try{if(iti.promise)await iti.promise;}catch{}const valid=iti.isValidNumber()===true;phoneInput.setCustomValidity(valid?'':"Voer een geldig internationaal telefoonnummer in.");phoneInput.setAttribute('aria-invalid',String(!valid));return valid;};phoneInput.addEventListener('input',()=>{phoneInput.setCustomValidity('');phoneInput.removeAttribute('aria-invalid');});phoneInput.addEventListener('countrychange',()=>{phoneInput.setCustomValidity('');phoneInput.removeAttribute('aria-invalid');});
    const reqErr = 'Vul dit veld in.';
    const emailErr = 'Voer een geldig e-mailadres in.';
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