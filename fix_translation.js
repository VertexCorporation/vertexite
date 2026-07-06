const fs = require('fs');

let content = fs.readFileSync('_tools/rebuild_join.js', 'utf8');

const regex = /Object\.keys\(langs\)\.forEach\(key => \{[\s\S]*?contractTitle = 'Vertex Team Contract';\n    \}/;

const replacement = `const uiLangs = {
    'tr': { tos: 'Hizmet Şartları', priv: 'Gizlilik Politikası', doc: 'Vertex Doktrini', read: 'Okudum', wait: 'saniye daha',
        age: 'Lütfen 0 ile 123 arasında geçerli bir yaş giriniz.', req: 'Lütfen bu alanı doldurun.', mail: 'Lütfen geçerli bir e-posta adresi girin.',
        dup: 'Bu e-posta veya telefon numarası zaten kayıtlı.', cFile: 'vertex-kadro-sozlesmesi.html', cTitle: 'Vertex Kadro Sözleşmesi',
        sTitle: 'BAŞVURUNUZ ALINMIŞTIR!', sDesc: 'Vertex, başvurunuzu inceleyecek ve gerekli görmesi halinde sizlere sağlamış olduğunuz iletişim bilgileri üzerinden dönüş yapacaktır.<br><br>İlginiz için teşekkür ederiz.',
        agreeFormat: '<a href="{tf}" target="_blank"><b>{tos}</b></a> ve <a href="{pf}" target="_blank"><b>{priv}</b></a>\\'nı kabul ediyorum.',
        docFormat: '<a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>\\'ni okudum.',
        cFormat: '<a href="{cf}" target="_blank"><b>{ct}</b></a>\\'ni okuduğumu ve onayladığımı beyan ederim.'
    },
    'az': { tos: 'Xidmət Şərtləri', priv: 'Məxfilik Siyasəti', doc: 'Vertex Doktrinası', read: 'Oxudum', wait: 'saniyə qaldı',
        age: 'Zəhmət olmasa düzgün yaş daxil edin.', req: 'Bu sahəni doldurun.', mail: 'Düzgün e-poçt daxil edin.', dup: 'Bu e-poçt və ya telefon artıq qeydiyyatdan keçib.',
        cFile: 'vertex-kadro-sozlesmesi.html', cTitle: 'Vertex Komanda Müqaviləsi', sTitle: 'MÜRACİƏT QƏBUL EDİLDİ!', sDesc: 'Vertex müraciətinizi nəzərdən keçirəcək və lazım gələrsə sizinlə əlaqə saxlayacaq.<br><br>Marağınıza görə təşəkkür edirik.',
        agreeFormat: '<a href="{tf}" target="_blank"><b>{tos}</b></a> və <a href="{pf}" target="_blank"><b>{priv}</b></a> ilə razılaşıram.',
        docFormat: '<a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>ni oxudum.',
        cFormat: '<a href="{cf}" target="_blank"><b>{ct}</b></a>ni oxuduğumu və təsdiqlədiyimi bəyan edirəm.'
    },
    'ar': { tos: 'شروط الخدمة', priv: 'سياسة الخصوصية', doc: 'عقيدة Vertex', read: 'قرأت', wait: 'ثواني متبقية', age: 'يرجى إدخال عمر صحيح.', req: 'يرجى ملء هذا الحقل.', mail: 'يرجى إدخال بريد إلكتروني صحيح.', dup: 'البريد أو الهاتف مسجل مسبقاً.', cFile: 'vertex-team-contract.html', cTitle: 'عقد فريق Vertex', sTitle: 'تم استلام الطلب!', sDesc: 'ستقوم Vertex بمراجعة طلبك والتواصل معك عند الضرورة.<br><br>شكراً لاهتمامك.',
        agreeFormat: 'أوافق على <a href="{tf}" target="_blank"><b>{tos}</b></a> و <a href="{pf}" target="_blank"><b>{priv}</b></a>.',
        docFormat: 'لقد قرأت <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>.', cFormat: 'أقر بأنني قرأت وأوافق على <a href="{cf}" target="_blank"><b>{ct}</b></a>.' },
    'de': { tos: 'Nutzungsbedingungen', priv: 'Datenschutzrichtlinie', doc: 'Vertex-Doktrin', read: 'Gelesen', wait: 'Sekunden übrig', age: 'Bitte geben Sie ein gültiges Alter ein.', req: 'Bitte füllen Sie dieses Feld aus.', mail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.', dup: 'Diese E-Mail oder Telefonnummer ist bereits registriert.', cFile: 'vertex-team-contract.html', cTitle: 'Vertex-Teamvertrag', sTitle: 'BEWERBUNG ERHALTEN!', sDesc: 'Vertex wird Ihre Bewerbung prüfen und Sie gegebenenfalls kontaktieren.<br><br>Danke für Ihr Interesse.',
        agreeFormat: 'Ich akzeptiere die <a href="{tf}" target="_blank"><b>{tos}</b></a> und die <a href="{pf}" target="_blank"><b>{priv}</b></a>.',
        docFormat: 'Ich habe die <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a> gelesen.', cFormat: 'Ich erkläre, dass ich den <a href="{cf}" target="_blank"><b>{ct}</b></a> gelesen habe und genehmige.' },
    'es': { tos: 'Términos de Servicio', priv: 'Política de Privacidad', doc: 'Doctrina Vertex', read: 'He leído', wait: 'segundos restantes', age: 'Por favor, introduzca una edad válida.', req: 'Por favor, rellene este campo.', mail: 'Por favor, introduzca un correo electrónico válido.', dup: 'Este correo o teléfono ya está registrado.', cFile: 'vertex-team-contract.html', cTitle: 'Contrato de Equipo Vertex', sTitle: '¡SOLICITUD RECIBIDA!', sDesc: 'Vertex revisará su solicitud y se pondrá en contacto con usted si es necesario.<br><br>Gracias por su interés.',
        agreeFormat: 'Acepto los <a href="{tf}" target="_blank"><b>{tos}</b></a> y la <a href="{pf}" target="_blank"><b>{priv}</b></a>.',
        docFormat: 'He leído la <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>.', cFormat: 'Declaro que he leído y apruebo el <a href="{cf}" target="_blank"><b>{ct}</b></a>.' },
    'fr': { tos: 'Conditions d\\'Utilisation', priv: 'Politique de Confidentialité', doc: 'Doctrine Vertex', read: 'J\\'ai lu', wait: 'secondes restantes', age: 'Veuillez entrer un âge valide.', req: 'Veuillez remplir ce champ.', mail: 'Veuillez entrer un email valide.', dup: 'Cet email ou téléphone est déjà enregistré.', cFile: 'vertex-team-contract.html', cTitle: 'Contrat d\\'Équipe Vertex', sTitle: 'CANDIDATURE REÇUE !', sDesc: 'Vertex examinera votre candidature et vous contactera si nécessaire.<br><br>Merci pour votre intérêt.',
        agreeFormat: 'J\\'accepte les <a href="{tf}" target="_blank"><b>{tos}</b></a> et la <a href="{pf}" target="_blank"><b>{priv}</b></a>.',
        docFormat: 'J\\'ai lu la <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>.', cFormat: 'Je déclare avoir lu et approuvé le <a href="{cf}" target="_blank"><b>{ct}</b></a>.' },
    'hi': { tos: 'सेवा की शर्तें', priv: 'गोपनीयता नीति', doc: 'Vertex सिद्धांत', read: 'मैंने पढ़ लिया है', wait: 'सेकंड शेष', age: 'कृपया एक मान्य आयु दर्ज करें।', req: 'कृपया इस फ़ील्ड को भरें।', mail: 'कृपया एक मान्य ईमेल दर्ज करें।', dup: 'यह ईमेल या फोन पहले से पंजीकृत है।', cFile: 'vertex-team-contract.html', cTitle: 'Vertex टीम अनुबंध', sTitle: 'आवेदन प्राप्त हुआ!', sDesc: 'Vertex आपके आवेदन की समीक्षा करेगा और आवश्यक होने पर आपसे संपर्क करेगा।<br><br>आपकी रुचि के लिए धन्यवाद।',
        agreeFormat: 'मैं <a href="{tf}" target="_blank"><b>{tos}</b></a> और <a href="{pf}" target="_blank"><b>{priv}</b></a> स्वीकार करता हूँ।',
        docFormat: 'मैंने <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a> पढ़ लिया है।', cFormat: 'मैं घोषणा करता हूँ कि मैंने <a href="{cf}" target="_blank"><b>{ct}</b></a> पढ़ और स्वीकृत कर लिया है।' },
    'id': { tos: 'Syarat Layanan', priv: 'Kebijakan Privasi', doc: 'Doktrin Vertex', read: 'Saya telah membaca', wait: 'detik tersisa', age: 'Silakan masukkan usia yang valid.', req: 'Harap isi bidang ini.', mail: 'Silakan masukkan email yang valid.', dup: 'Email atau telepon ini sudah terdaftar.', cFile: 'vertex-team-contract.html', cTitle: 'Kontrak Tim Vertex', sTitle: 'APLIKASI DITERIMA!', sDesc: 'Vertex akan meninjau aplikasi Anda dan menghubungi Anda jika diperlukan.<br><br>Terima kasih atas minat Anda.',
        agreeFormat: 'Saya menerima <a href="{tf}" target="_blank"><b>{tos}</b></a> dan <a href="{pf}" target="_blank"><b>{priv}</b></a>.',
        docFormat: 'Saya telah membaca <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>.', cFormat: 'Saya menyatakan bahwa saya telah membaca dan menyetujui <a href="{cf}" target="_blank"><b>{ct}</b></a>.' },
    'it': { tos: 'Termini di Servizio', priv: 'Informativa sulla Privacy', doc: 'Dottrina Vertex', read: 'Ho letto', wait: 'secondi rimanenti', age: 'Inserisci un\\'età valida.', req: 'Compila questo campo.', mail: 'Inserisci un\\'email valida.', dup: 'Questa email o telefono è già registrato.', cFile: 'vertex-team-contract.html', cTitle: 'Contratto Team Vertex', sTitle: 'CANDIDATURA RICEVUTA!', sDesc: 'Vertex valuterà la tua candidatura e ti contatterà se necessario.<br><br>Grazie per l\\'interesse.',
        agreeFormat: 'Accetto i <a href="{tf}" target="_blank"><b>{tos}</b></a> e l\\'<a href="{pf}" target="_blank"><b>{priv}</b></a>.',
        docFormat: 'Ho letto la <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>.', cFormat: 'Dichiaro di aver letto e approvato il <a href="{cf}" target="_blank"><b>{ct}</b></a>.' },
    'ja': { tos: '利用規約', priv: 'プライバシーポリシー', doc: 'Vertexドクトリン', read: '読みました', wait: '秒残り', age: '有効な年齢を入力してください。', req: 'このフィールドに入力してください。', mail: '有効なメールアドレスを入力してください。', dup: 'このメールまたは電話番号はすでに登録されています。', cFile: 'vertex-team-contract.html', cTitle: 'Vertexチーム契約', sTitle: '応募を受け付けました！', sDesc: 'Vertexはあなたの応募を審査し、必要に応じて連絡します。<br><br>ご関心をお寄せいただきありがとうございます。',
        agreeFormat: '<a href="{tf}" target="_blank"><b>{tos}</b></a>および<a href="{pf}" target="_blank"><b>{priv}</b></a>に同意します。',
        docFormat: '<a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>を読みました。', cFormat: '<a href="{cf}" target="_blank"><b>{ct}</b></a>を読み、承認したことを宣言します。' },
    'ko': { tos: '이용약관', priv: '개인정보처리방침', doc: 'Vertex 독트린', read: '읽었음', wait: '초 남음', age: '유효한 나이를 입력하세요.', req: '이 필드를 작성하세요.', mail: '유효한 이메일을 입력하세요.', dup: '이 이메일 또는 전화번호는 이미 등록되었습니다.', cFile: 'vertex-team-contract.html', cTitle: 'Vertex 팀 계약', sTitle: '지원서 접수 완료!', sDesc: 'Vertex에서 지원서를 검토한 후 필요시 연락드리겠습니다.<br><br>관심을 가져주셔서 감사합니다.',
        agreeFormat: '<a href="{tf}" target="_blank"><b>{tos}</b></a> 및 <a href="{pf}" target="_blank"><b>{priv}</b></a>에 동의합니다.',
        docFormat: '본인은 <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>을(를) 읽었습니다.', cFormat: '본인은 <a href="{cf}" target="_blank"><b>{ct}</b></a>을(를) 읽고 승인함을 선언합니다.' },
    'nl': { tos: 'Servicevoorwaarden', priv: 'Privacybeleid', doc: 'Vertex-doctrine', read: 'Gelezen', wait: 'seconden over', age: 'Voer een geldige leeftijd in.', req: 'Vul dit veld in.', mail: 'Voer een geldig e-mailadres in.', dup: 'Deze e-mail of telefoon is al geregistreerd.', cFile: 'vertex-team-contract.html', cTitle: 'Vertex-teamcontract', sTitle: 'SOLLICITATIE ONTVANGEN!', sDesc: 'Vertex zal uw sollicitatie beoordelen en indien nodig contact met u opnemen.<br><br>Bedankt voor uw interesse.',
        agreeFormat: 'Ik accepteer de <a href="{tf}" target="_blank"><b>{tos}</b></a> en het <a href="{pf}" target="_blank"><b>{priv}</b></a>.',
        docFormat: 'Ik heb de <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a> gelezen.', cFormat: 'Ik verklaar dat ik het <a href="{cf}" target="_blank"><b>{ct}</b></a> heb gelezen en goedgekeurd.' },
    'pt': { tos: 'Termos de Serviço', priv: 'Política de Privacidade', doc: 'Doutrina Vertex', read: 'Eu li', wait: 'segundos restantes', age: 'Por favor, insira uma idade válida.', req: 'Por favor, preencha este campo.', mail: 'Por favor, insira um email válido.', dup: 'Este email ou telefone já está registrado.', cFile: 'vertex-team-contract.html', cTitle: 'Contrato de Equipe Vertex', sTitle: 'CANDIDATURA RECEBIDA!', sDesc: 'A Vertex analisará sua candidatura e entrará em contato se necessário.<br><br>Obrigado pelo seu interesse.',
        agreeFormat: 'Eu aceito os <a href="{tf}" target="_blank"><b>{tos}</b></a> e a <a href="{pf}" target="_blank"><b>{priv}</b></a>.',
        docFormat: 'Eu li a <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>.', cFormat: 'Declaro que li e aprovo o <a href="{cf}" target="_blank"><b>{ct}</b></a>.' },
    'ru': { tos: 'Условия обслуживания', priv: 'Политика конфиденциальности', doc: 'Доктрина Vertex', read: 'Я прочитал', wait: 'секунд осталось', age: 'Пожалуйста, введите корректный возраст.', req: 'Пожалуйста, заполните это поле.', mail: 'Пожалуйста, введите корректный email.', dup: 'Этот email или телефон уже зарегистрирован.', cFile: 'vertex-team-contract.html', cTitle: 'Контракт команды Vertex', sTitle: 'ЗАЯВКА ПОЛУЧЕНА!', sDesc: 'Vertex рассмотрит вашу заявку и свяжется с вами при необходимости.<br><br>Спасибо за интерес.',
        agreeFormat: 'Я принимаю <a href="{tf}" target="_blank"><b>{tos}</b></a> и <a href="{pf}" target="_blank"><b>{priv}</b></a>.',
        docFormat: 'Я прочитал <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>.', cFormat: 'Я заявляю, что прочитал и одобряю <a href="{cf}" target="_blank"><b>{ct}</b></a>.' },
    'zh': { tos: '服务条款', priv: '隐私政策', doc: 'Vertex教义', read: '我已阅读', wait: '秒剩余', age: '请输入有效的年龄。', req: '请填写此字段。', mail: '请输入有效的电子邮箱。', dup: '该邮箱或电话已注册。', cFile: 'vertex-team-contract.html', cTitle: 'Vertex团队合同', sTitle: '申请已收到！', sDesc: 'Vertex将审核您的申请，并在需要时与您联系。<br><br>感谢您的关注。',
        agreeFormat: '我接受<a href="{tf}" target="_blank"><b>{tos}</b></a>和<a href="{pf}" target="_blank"><b>{priv}</b></a>。',
        docFormat: '我已阅读<a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>。', cFormat: '我声明已阅读并批准<a href="{cf}" target="_blank"><b>{ct}</b></a>。' },
    'en': { tos: 'Terms of Service', priv: 'Privacy Policy', doc: 'Vertex Doctrine', read: 'I have read', wait: 'seconds left', age: 'Please enter a valid age between 0 and 123.', req: 'Please fill out this field.', mail: 'Please enter a valid email address.', dup: 'This email or phone number is already registered.', cFile: 'vertex-team-contract.html', cTitle: 'Vertex Team Contract', sTitle: 'APPLICATION RECEIVED!', sDesc: 'Vertex will review your application and, if deemed necessary, will contact you using the provided contact information.<br><br>Thank you for your interest.',
        agreeFormat: 'I accept the <a href="{tf}" target="_blank"><b>{tos}</b></a> and <a href="{pf}" target="_blank"><b>{priv}</b></a>.',
        docFormat: 'I have read the <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>.', cFormat: 'I declare that I have read and approve the <a href="{cf}" target="_blank"><b>{ct}</b></a>.' }
};

Object.keys(langs).forEach(key => {
    let tf = localizationMap[key] ? localizationMap[key].terms : 'terms-of-service.html';
    let pf = localizationMap[key] ? localizationMap[key].privacy : 'privacy-policy.html';
    let ui = uiLangs[key] || uiLangs['en'];

    langs[key].agreeTerms = ui.agreeFormat.replace('{tf}', tf).replace('{pf}', pf).replace('{tos}', ui.tos).replace('{priv}', ui.priv);
    langs[key].doctrineLabel = ui.docFormat.replace('{doc}', ui.doc);
    langs[key].doctrineTitle = ui.doc;
    langs[key].doctrineText = (key === 'tr' || key === 'az') ? doctrineTr : doctrineEn;
    langs[key].readBtn = ui.read;
    langs[key].waitSec = ui.wait;
    langs[key].ageErr = ui.age;
    langs[key].reqErr = ui.req;
    langs[key].emailErr = ui.mail;
    langs[key].dupErr = ui.dup;
    langs[key].contractFile = ui.cFile;
    langs[key].contractLabel = ui.cFormat.replace('{cf}', ui.cFile).replace('{ct}', ui.cTitle);
    langs[key].successTitle = ui.sTitle;
    langs[key].successDesc = ui.sDesc;
    langs[key].contractContent = (key === 'tr' || key === 'az') ? contractTr : contractEn;
    langs[key].contractTitle = ui.cTitle;
}
`;

content = content.replace(regex, replacement);
fs.writeFileSync('_tools/rebuild_join.js', content);
