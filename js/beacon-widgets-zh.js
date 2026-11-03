(function(){"use strict";const interfaceTranslations = {
  selectedCountryAriaLabel: "更改电话号码的国家，已选择 ${countryName}（${dialCode}）",
  noCountrySelected: "选择电话号码的国家",
  countryListAriaLabel: "国家名单",
  searchPlaceholder: "搜索",
  clearSearchAriaLabel: "清除搜索",
  closeCountrySelectorAriaLabel: "关闭",
  searchEmptyState: "未找到结果",
  searchSummaryAria(count) {
    if (count === 0) {
      return "未找到结果";
    }
    return `找到 ${count} 个结果`;
  }
};
window.VertexPhoneUI=interfaceTranslations;
    const langToCountry = {
        'tr': 'tr', 'en': 'us', 'ar': 'ae', 'az': 'az', 'de': 'de', 'es': 'es', 'fr': 'fr', 'hi': 'in',
        'id': 'id', 'it': 'it', 'ja': 'jp', 'ko': 'kr', 'nl': 'nl', 'pt': 'pt', 'ru': 'ru', 'zh': 'cn'
    };
    const defaultCountry = langToCountry['zh'] || 'us';
    
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
    
    window.validateVertexPhone=async function(){try{if(iti.promise)await iti.promise;}catch{}const valid=iti.isValidNumber()===true;phoneInput.setCustomValidity(valid?'':"请输入有效的国际电话号码。");phoneInput.setAttribute('aria-invalid',String(!valid));return valid;};phoneInput.addEventListener('input',()=>{phoneInput.setCustomValidity('');phoneInput.removeAttribute('aria-invalid');});phoneInput.addEventListener('countrychange',()=>{phoneInput.setCustomValidity('');phoneInput.removeAttribute('aria-invalid');});
    const reqErr = '请填写此字段。';
    const emailErr = '请输入有效的电子邮箱。';
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