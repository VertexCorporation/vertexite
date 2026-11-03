(function(){"use strict";const interfaceTranslations = {
  selectedCountryAriaLabel: "Cambia il paese del numero di telefono, selezionato ${countryName} (${dialCode})",
  noCountrySelected: "Seleziona il paese del numero di telefono",
  countryListAriaLabel: "Elenco dei paesi",
  searchPlaceholder: "Ricerca",
  clearSearchAriaLabel: "Cancella ricerca",
  closeCountrySelectorAriaLabel: "Chiudi",
  searchEmptyState: "Nessun risultato trovato",
  searchSummaryAria(count) {
    if (count === 0) {
      return "Nessun risultato trovato";
    }
    if (count === 1) {
      return "1 risultato trovato";
    }
    return `${count} risultati trovati`;
  }
};
window.VertexPhoneUI=interfaceTranslations;
    const langToCountry = {
        'tr': 'tr', 'en': 'us', 'ar': 'ae', 'az': 'az', 'de': 'de', 'es': 'es', 'fr': 'fr', 'hi': 'in',
        'id': 'id', 'it': 'it', 'ja': 'jp', 'ko': 'kr', 'nl': 'nl', 'pt': 'pt', 'ru': 'ru', 'zh': 'cn'
    };
    const defaultCountry = langToCountry['it'] || 'us';
    
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
    
    window.validateVertexPhone=async function(){try{if(iti.promise)await iti.promise;}catch{}const valid=iti.isValidNumber()===true;phoneInput.setCustomValidity(valid?'':"Inserisci un numero internazionale valido.");phoneInput.setAttribute('aria-invalid',String(!valid));return valid;};phoneInput.addEventListener('input',()=>{phoneInput.setCustomValidity('');phoneInput.removeAttribute('aria-invalid');});phoneInput.addEventListener('countrychange',()=>{phoneInput.setCustomValidity('');phoneInput.removeAttribute('aria-invalid');});
    const reqErr = 'Compila questo campo.';
    const emailErr = "Inserisci un'email valida.";
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