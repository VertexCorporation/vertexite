const fs = require('fs');

const path = 'verify.html';
let html = fs.readFileSync(path, 'utf8');

const startIndex = html.indexOf('<script>');
const endIndex = html.indexOf('</script>') + 9;

const newScript = `<script>
document.addEventListener('DOMContentLoaded', async () => {
    const langs = {
        en: {
            title: "Certificate Verification | Vertex",
            verifying: "Verifying",
            waitDesc: "Please wait while we check this certificate in our secure database.",
            validTitle: "Certificate Valid",
            validDesc: "This certificate is authentic and securely registered in the Vertex database.",
            homeLink: "Return to Vertex",
            errorTitle: "Invalid Certificate",
            errorDesc: "This certificate could not be found or has been revoked. If you believe this is an error, please contact Vertex Support.",
            lblIssuedTo: "Issued To:",
            lblType: "Type:",
            lblDate: "Date Issued:",
            valType: "Merit Certificate"
        },
        tr: {
            title: "Sertifika Doğrulama | Vertex",
            verifying: "Doğrulanıyor",
            waitDesc: "Lütfen sertifika güvenli veritabanımızda kontrol edilirken bekleyin.",
            validTitle: "Sertifika Geçerli",
            validDesc: "Bu sertifika orijinaldir ve Vertex veritabanına güvenli bir şekilde kaydedilmiştir.",
            homeLink: "Ana Sayfaya Dön",
            errorTitle: "Geçersiz Sertifika",
            errorDesc: "Bu sertifika bulunamadı veya iptal edilmiş. Bunun bir hata olduğunu düşünüyorsanız, lütfen Vertex Destek ile iletişime geçin.",
            lblIssuedTo: "Verilen Kişi:",
            lblType: "Tür:",
            lblDate: "Veriliş Tarihi:",
            valType: "Liyakat Sertifikası"
        },
        az: {
            title: "Sertifikatın Təsdiqi | Vertex",
            verifying: "Təsdiqlənir",
            waitDesc: "Sertifikat təhlükəsiz məlumat bazamızda yoxlanılarkən lütfən gözləyin.",
            validTitle: "Sertifikat Etibarlıdır",
            validDesc: "Bu sertifikat orijinaldır və Vertex məlumat bazasında təhlükəsiz şəkildə qeydiyyata alınıb.",
            homeLink: "Əsas Səhifəyə Qayıt",
            errorTitle: "Etibarsız Sertifikat",
            errorDesc: "Bu sertifikat tapılmadı və ya ləğv edilib. Bunun xəta olduğunu düşünürsünüzsə, lütfən Vertex Dəstək ilə əlaqə saxlayın.",
            lblIssuedTo: "Verilən Şəxs:",
            lblType: "Növ:",
            lblDate: "Verilmə Tarixi:",
            valType: "Ləyaqət Sertifikatı"
        },
        ar: {
            title: "التحقق من الشهادة | Vertex",
            verifying: "جاري التحقق",
            waitDesc: "يرجى الانتظار بينما نتحقق من هذه الشهادة في قاعدة بياناتنا الآمنة.",
            validTitle: "الشهادة صالحة",
            validDesc: "هذه الشهادة أصلية ومسجلة بشكل آمن في قاعدة بيانات Vertex.",
            homeLink: "العودة إلى الصفحة الرئيسية",
            errorTitle: "شهادة غير صالحة",
            errorDesc: "تعذر العثور على هذه الشهادة أو تم إبطالها. إذا كنت تعتقد أن هذا خطأ، يرجى الاتصال بدعم Vertex.",
            lblIssuedTo: "صدرت لـ:",
            lblType: "النوع:",
            lblDate: "تاريخ الإصدار:",
            valType: "شهادة جدارة"
        },
        de: {
            title: "Zertifikatsüberprüfung | Vertex",
            verifying: "Überprüfung läuft",
            waitDesc: "Bitte warten Sie, während wir dieses Zertifikat in unserer sicheren Datenbank überprüfen.",
            validTitle: "Zertifikat gültig",
            validDesc: "Dieses Zertifikat ist authentisch und sicher in der Vertex-Datenbank registriert.",
            homeLink: "Zurück zur Startseite",
            errorTitle: "Ungültiges Zertifikat",
            errorDesc: "Dieses Zertifikat konnte nicht gefunden werden oder wurde widerrufen. Wenn Sie glauben, dass dies ein Fehler ist, wenden Sie sich bitte an den Vertex-Support.",
            lblIssuedTo: "Ausgestellt für:",
            lblType: "Typ:",
            lblDate: "Ausstellungsdatum:",
            valType: "Verdienstzertifikat"
        },
        es: {
            title: "Verificación de Certificado | Vertex",
            verifying: "Verificando",
            waitDesc: "Por favor, espere mientras verificamos este certificado en nuestra base de datos segura.",
            validTitle: "Certificado Válido",
            validDesc: "Este certificado es auténtico y está registrado de forma segura en la base de datos de Vertex.",
            homeLink: "Volver a Inicio",
            errorTitle: "Certificado Inválido",
            errorDesc: "Este certificado no se pudo encontrar o ha sido revocado. Si cree que se trata de un error, póngase en contacto con el soporte de Vertex.",
            lblIssuedTo: "Emitido a:",
            lblType: "Tipo:",
            lblDate: "Fecha de Emisión:",
            valType: "Certificado de Mérito"
        },
        fr: {
            title: "Vérification du Certificat | Vertex",
            verifying: "Vérification en cours",
            waitDesc: "Veuillez patienter pendant que nous vérifions ce certificat dans notre base de données sécurisée.",
            validTitle: "Certificat Valide",
            validDesc: "Ce certificat est authentique et enregistré de manière sécurisée dans la base de données Vertex.",
            homeLink: "Retour à l'Accueil",
            errorTitle: "Certificat Invalide",
            errorDesc: "Ce certificat est introuvable ou a été révoqué. Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'assistance Vertex.",
            lblIssuedTo: "Délivré à:",
            lblType: "Type:",
            lblDate: "Date de Délivrance:",
            valType: "Certificat de Mérite"
        },
        hi: {
            title: "प्रमाणपत्र सत्यापन | Vertex",
            verifying: "सत्यापन हो रहा है",
            waitDesc: "कृपया प्रतीक्षा करें जबकि हम अपने सुरक्षित डेटाबेस में इस प्रमाणपत्र की जांच कर रहे हैं।",
            validTitle: "प्रमाणपत्र मान्य है",
            validDesc: "यह प्रमाणपत्र प्रामाणिक है और Vertex डेटाबेस में सुरक्षित रूप से पंजीकृत है।",
            homeLink: "होम पेज पर लौटें",
            errorTitle: "अमान्य प्रमाणपत्र",
            errorDesc: "यह प्रमाणपत्र नहीं मिला या रद्द कर दिया गया है। यदि आपको लगता है कि यह एक त्रुटि है, तो कृपया Vertex समर्थन से संपर्क करें।",
            lblIssuedTo: "जारी किया गया:",
            lblType: "प्रकार:",
            lblDate: "जारी करने की तिथि:",
            valType: "योग्यता प्रमाणपत्र"
        },
        id: {
            title: "Verifikasi Sertifikat | Vertex",
            verifying: "Memverifikasi",
            waitDesc: "Harap tunggu sementara kami memeriksa sertifikat ini di database aman kami.",
            validTitle: "Sertifikat Valid",
            validDesc: "Sertifikat ini asli dan terdaftar secara aman di database Vertex.",
            homeLink: "Kembali ke Beranda",
            errorTitle: "Sertifikat Tidak Valid",
            errorDesc: "Sertifikat ini tidak dapat ditemukan atau telah dicabut. Jika Anda yakin ini adalah kesalahan, silakan hubungi Dukungan Vertex.",
            lblIssuedTo: "Dikeluarkan Kepada:",
            lblType: "Tipe:",
            lblDate: "Tanggal Dikeluarkan:",
            valType: "Sertifikat Prestasi"
        },
        it: {
            title: "Verifica Certificato | Vertex",
            verifying: "Verifica in corso",
            waitDesc: "Attendere prego mentre verifichiamo questo certificato nel nostro database sicuro.",
            validTitle: "Certificato Valido",
            validDesc: "Questo certificato è autentico e registrato in modo sicuro nel database Vertex.",
            homeLink: "Torna alla Home",
            errorTitle: "Certificato Non Valido",
            errorDesc: "Questo certificato non è stato trovato o è stato revocato. Se ritieni che si tratti di un errore, contatta il supporto Vertex.",
            lblIssuedTo: "Rilasciato a:",
            lblType: "Tipo:",
            lblDate: "Data di Rilascio:",
            valType: "Certificato di Merito"
        },
        ja: {
            title: "証明書の確認 | Vertex",
            verifying: "確認中",
            waitDesc: "安全なデータベースでこの証明書を確認しています。しばらくお待ちください。",
            validTitle: "有効な証明書",
            validDesc: "この証明書は本物であり、Vertexデータベースに安全に登録されています。",
            homeLink: "ホームに戻る",
            errorTitle: "無効な証明書",
            errorDesc: "この証明書は見つからなかったか、取り消されています。エラーだと思われる場合は、Vertexサポートにお問い合わせください。",
            lblIssuedTo: "発行先:",
            lblType: "種類:",
            lblDate: "発行日:",
            valType: "功労証明書"
        },
        ko: {
            title: "인증서 확인 | Vertex",
            verifying: "확인 중",
            waitDesc: "안전한 데이터베이스에서 이 인증서를 확인하는 동안 잠시 기다려 주십시오.",
            validTitle: "유효한 인증서",
            validDesc: "이 인증서는 진짜이며 Vertex 데이터베이스에 안전하게 등록되어 있습니다.",
            homeLink: "홈으로 돌아가기",
            errorTitle: "잘못된 인증서",
            errorDesc: "이 인증서를 찾을 수 없거나 해지되었습니다. 오류라고 생각되면 Vertex 지원팀에 문의하십시오.",
            lblIssuedTo: "발급 대상:",
            lblType: "유형:",
            lblDate: "발급일:",
            valType: "공로 인증서"
        },
        nl: {
            title: "Certificaatverificatie | Vertex",
            verifying: "Verifiëren",
            waitDesc: "Even geduld a.u.b. terwijl we dit certificaat in onze beveiligde database controleren.",
            validTitle: "Geldig Certificaat",
            validDesc: "Dit certificaat is authentiek en veilig geregistreerd in de Vertex-database.",
            homeLink: "Terug naar Home",
            errorTitle: "Ongeldig Certificaat",
            errorDesc: "Dit certificaat kon niet worden gevonden of is ingetrokken. Als u denkt dat dit een fout is, neem dan contact op met Vertex Support.",
            lblIssuedTo: "Uitgegeven aan:",
            lblType: "Type:",
            lblDate: "Datum van uitgifte:",
            valType: "Certificaat van Verdienste"
        },
        pt: {
            title: "Verificação de Certificado | Vertex",
            verifying: "Verificando",
            waitDesc: "Aguarde enquanto verificamos este certificado em nosso banco de dados seguro.",
            validTitle: "Certificado Válido",
            validDesc: "Este certificado é autêntico e registrado com segurança no banco de dados da Vertex.",
            homeLink: "Voltar ao Início",
            errorTitle: "Certificado Inválido",
            errorDesc: "Este certificado não pôde ser encontrado ou foi revogado. Se você acredita que isso é um erro, entre em contato com o Suporte da Vertex.",
            lblIssuedTo: "Emitido para:",
            lblType: "Tipo:",
            lblDate: "Data de Emissão:",
            valType: "Certificado de Mérito"
        },
        ru: {
            title: "Проверка сертификата | Vertex",
            verifying: "Проверка",
            waitDesc: "Пожалуйста, подождите, пока мы проверяем этот сертификат в нашей безопасной базе данных.",
            validTitle: "Сертификат действителен",
            validDesc: "Этот сертификат является подлинным и надежно зарегистрирован в базе данных Vertex.",
            homeLink: "Вернуться на главную",
            errorTitle: "Недействительный сертификат",
            errorDesc: "Этот сертификат не найден или был отозван. Если вы считаете, что это ошибка, обратитесь в службу поддержки Vertex.",
            lblIssuedTo: "Выдан:",
            lblType: "Тип:",
            lblDate: "Дата выдачи:",
            valType: "Сертификат за заслуги"
        },
        zh: {
            title: "证书验证 | Vertex",
            verifying: "验证中",
            waitDesc: "请稍候，我们正在安全的数据库中检查此证书。",
            validTitle: "证书有效",
            validDesc: "此证书是真实的，并安全注册在Vertex数据库中。",
            homeLink: "返回主页",
            errorTitle: "无效证书",
            errorDesc: "无法找到此证书或该证书已被吊销。如果您认为这是一个错误，请联系Vertex支持。",
            lblIssuedTo: "颁发给:",
            lblType: "类型:",
            lblDate: "颁发日期:",
            valType: "荣誉证书"
        }
    };

    function applyLang(langCode) {
        const d = langs[langCode] || langs['en'];
        document.title = d.title;
        document.querySelector('#loadingState h1').textContent = d.verifying;
        document.querySelector('#loadingState .desc').textContent = d.waitDesc;
        
        document.querySelector('#successState h1').textContent = d.validTitle;
        document.querySelector('#successState .desc').textContent = d.validDesc;
        document.querySelectorAll('#successState .home-link').forEach(el => el.textContent = d.homeLink);
        
        document.querySelector('#errorState h1').textContent = d.errorTitle;
        document.querySelector('#errorState .desc').textContent = d.errorDesc;
        document.querySelectorAll('#errorState .home-link').forEach(el => el.textContent = d.homeLink);
        
        document.querySelectorAll('.cert-label')[0].textContent = d.lblIssuedTo;
        document.querySelectorAll('.cert-label')[1].textContent = d.lblType;
        document.querySelectorAll('.cert-label')[2].textContent = d.lblDate;
        
        return d;
    }

    // Determine initial language based on browser
    let userLang = navigator.language.substring(0, 2);
    if (!langs[userLang]) userLang = 'en';
    applyLang(userLang);

    // Extract ID from URL path: /verify/[ID]
    const pathParts = window.location.pathname.split('/');
    const certId = pathParts[pathParts.length - 1] === '' ? pathParts[pathParts.length - 2] : pathParts[pathParts.length - 1];

    const loadingState = document.getElementById('loadingState');
    const successState = document.getElementById('successState');
    const errorState = document.getElementById('errorState');
    const certDetails = document.getElementById('certDetails');

    if (!certId || certId === 'verify' || certId === 'verify.html') {
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
        return;
    }

    try {
        // Fetch from Firebase Firestore REST API
        const response = await fetch('https://firestore.googleapis.com/v1/projects/vertex-ai-1618/databases/(default)/documents/contributors/' + certId);
        
        if (response.ok) {
            const data = await response.json();
            
            // Extract fields from Firestore REST API format
            const fields = data.fields || {};
            const name = fields.name ? fields.name.stringValue : 'Unknown';
            const lang = fields.language ? fields.language.stringValue : 'en';
            
            const hasVerified = fields.hasVerified ? fields.hasVerified.booleanValue : false;
            
            if (!hasVerified) {
                throw new Error('Certificate pending or rejected');
            }
            
            // Re-apply language based on the user's registered application language
            const d = applyLang(langs[lang] ? lang : 'en');
            
            // Format date from document createTime
            const dateObj = new Date(data.createTime);
            const dateStr = dateObj.toLocaleDateString('en-GB'); // DD/MM/YYYY

            // Populate UI
            document.getElementById('certName').textContent = name;
            document.getElementById('certType').textContent = d.valType;
            document.getElementById('certDate').textContent = dateStr;
            
            loadingState.style.display = 'none';
            successState.style.display = 'block';
        } else {
            throw new Error('Certificate not found');
        }
    } catch (err) {
        console.error(err);
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
    }
});
</script>`;

html = html.substring(0, startIndex) + newScript + html.substring(endIndex);
fs.writeFileSync(path, html);
