const fs = require('fs');
const path = require('path');

const langs = {
    'tr': { folder: 'tr', file: 'aramiza-katil.html', title: 'Aramıza Katıl', desc: 'Vertex ekibinin bir parçası ol.',
        labels: ['Ad Soyad', 'E-posta', 'Telefon Numarası', 'Yaş', 'LinkedIn Bağlantısı (Opsiyonel)', 'GitHub Bağlantısı (Opsiyonel)', 'Kendinden bahset'],
        submitBtn: 'Başvuruyu Gönder', backBtn: '← Ana Sayfaya Dön', success: 'Başvurunuz alındı!', error: 'Bir hata oluştu.',
        joinNav: 'Aramıza Katıl'
    },
    'en': { folder: 'en', file: 'join-us.html', title: 'Join Us', desc: 'Become a part of the Vertex team.',
        labels: ['Full Name', 'Email', 'Phone Number', 'Age', 'LinkedIn URL (Optional)', 'GitHub URL (Optional)', 'Tell us about yourself'],
        submitBtn: 'Submit Application', backBtn: '← Back to Home', success: 'Application received!', error: 'An error occurred.',
        joinNav: 'Join Us'
    },
    'ar': { folder: 'ar', file: 'join-us.html', title: 'انضم إلينا', desc: 'كن جزءًا من فريق Vertex.',
        labels: ['الاسم الكامل', 'البريد الإلكتروني', 'رقم الهاتف', 'العمر', 'رابط LinkedIn (اختياري)', 'رابط GitHub (اختياري)', 'تحدث عن نفسك'],
        submitBtn: 'إرسال الطلب', backBtn: '← العودة للصفحة الرئيسية', success: 'تم استلام الطلب!', error: 'حدث خطأ.',
        joinNav: 'انضم إلينا'
    },
    'az': { folder: 'az', file: 'join-us.html', title: 'Bizə Qoşulun', desc: 'Vertex komandasının bir hissəsi olun.',
        labels: ['Ad Soyad', 'E-poçt', 'Telefon Nömrəsi', 'Yaş', 'LinkedIn Linki (İstəyə görə)', 'GitHub Linki (İstəyə görə)', 'Özünüz haqqında danışın'],
        submitBtn: 'Müraciəti Göndər', backBtn: '← Ana Səhifəyə Qayıt', success: 'Müraciət qəbul edildi!', error: 'Xəta baş verdi.',
        joinNav: 'Bizə Qoşulun'
    },
    'de': { folder: 'de', file: 'join-us.html', title: 'Begleiten Sie uns', desc: 'Werden Sie Teil des Vertex-Teams.',
        labels: ['Vollständiger Name', 'E-Mail', 'Telefonnummer', 'Alter', 'LinkedIn URL (Optional)', 'GitHub URL (Optional)', 'Erzählen Sie uns von sich'],
        submitBtn: 'Bewerbung einreichen', backBtn: '← Zurück zur Startseite', success: 'Bewerbung erhalten!', error: 'Ein Fehler ist aufgetreten.',
        joinNav: 'Begleiten Sie uns'
    },
    'es': { folder: 'es', file: 'join-us.html', title: 'Únete a nosotros', desc: 'Conviértete en parte del equipo de Vertex.',
        labels: ['Nombre Completo', 'Correo Electrónico', 'Número de Teléfono', 'Edad', 'URL de LinkedIn (Opcional)', 'URL de GitHub (Opcional)', 'Cuéntanos sobre ti'],
        submitBtn: 'Enviar Solicitud', backBtn: '← Volver al Inicio', success: '¡Solicitud recibida!', error: 'Ocurrió un error.',
        joinNav: 'Únete a nosotros'
    },
    'fr': { folder: 'fr', file: 'join-us.html', title: 'Rejoignez-nous', desc: 'Faites partie de l\'équipe Vertex.',
        labels: ['Nom Complet', 'E-mail', 'Numéro de Téléphone', 'Âge', 'URL LinkedIn (Optionnel)', 'URL GitHub (Optionnel)', 'Parlez-nous de vous'],
        submitBtn: 'Soumettre la Candidature', backBtn: '← Retour à l\'Accueil', success: 'Candidature reçue !', error: 'Une erreur s\'est produite.',
        joinNav: 'Rejoignez-nous'
    },
    'hi': { folder: 'hi', file: 'join-us.html', title: 'हमसे जुड़ें', desc: 'Vertex टीम का हिस्सा बनें।',
        labels: ['पूरा नाम', 'ईमेल', 'फोन नंबर', 'आयु', 'लिंक्डइन यूआरएल (वैकल्पिक)', 'गिटहब यूआरएल (वैकल्पिक)', 'अपने बारे में बताएं'],
        submitBtn: 'आवेदन जमा करें', backBtn: '← होम पर वापस जाएं', success: 'आवेदन प्राप्त हुआ!', error: 'एक त्रुटि हुई।',
        joinNav: 'हमसे जुड़ें'
    },
    'id': { folder: 'id', file: 'join-us.html', title: 'Bergabunglah dengan Kami', desc: 'Menjadi bagian dari tim Vertex.',
        labels: ['Nama Lengkap', 'Email', 'Nomor Telepon', 'Usia', 'URL LinkedIn (Opsional)', 'URL GitHub (Opsional)', 'Ceritakan tentang diri Anda'],
        submitBtn: 'Kirim Aplikasi', backBtn: '← Kembali ke Beranda', success: 'Aplikasi diterima!', error: 'Terjadi kesalahan.',
        joinNav: 'Bergabunglah dengan Kami'
    },
    'it': { folder: 'it', file: 'join-us.html', title: 'Unisciti a noi', desc: 'Diventa parte del team Vertex.',
        labels: ['Nome e Cognome', 'Email', 'Numero di Telefono', 'Età', 'URL LinkedIn (Opzionale)', 'URL GitHub (Opzionale)', 'Parlaci di te'],
        submitBtn: 'Invia Candidatura', backBtn: '← Torna alla Home', success: 'Candidatura ricevuta!', error: 'Si è verificato un errore.',
        joinNav: 'Unisciti a noi'
    },
    'ja': { folder: 'ja', file: 'join-us.html', title: '参加する', desc: 'Vertexチームの一員になりましょう。',
        labels: ['氏名', 'メールアドレス', '電話番号', '年齢', 'LinkedIn URL（任意）', 'GitHub URL（任意）', '自己紹介'],
        submitBtn: '応募を送信', backBtn: '← ホームに戻る', success: '応募を受け付けました！', error: 'エラーが発生しました。',
        joinNav: '参加する'
    },
    'ko': { folder: 'ko', file: 'join-us.html', title: '합류하기', desc: 'Vertex 팀의 일원이 되십시오.',
        labels: ['성명', '이메일', '전화번호', '나이', 'LinkedIn URL (선택)', 'GitHub URL (선택)', '자기소개'],
        submitBtn: '지원서 제출', backBtn: '← 홈으로 돌아가기', success: '지원서가 접수되었습니다!', error: '오류가 발생했습니다.',
        joinNav: '합류하기'
    },
    'nl': { folder: 'nl', file: 'join-us.html', title: 'Doe met ons mee', desc: 'Word onderdeel van het Vertex-team.',
        labels: ['Volledige Naam', 'E-mail', 'Telefoonnummer', 'Leeftijd', 'LinkedIn URL (Optioneel)', 'GitHub URL (Optioneel)', 'Vertel ons over jezelf'],
        submitBtn: 'Sollicitatie indienen', backBtn: '← Terug naar Home', success: 'Sollicitatie ontvangen!', error: 'Er is een fout opgetreden.',
        joinNav: 'Doe met ons mee'
    },
    'pt': { folder: 'pt', file: 'join-us.html', title: 'Junte-se a nós', desc: 'Faça parte da equipe Vertex.',
        labels: ['Nome Completo', 'E-mail', 'Número de Telefone', 'Idade', 'URL do LinkedIn (Opcional)', 'URL do GitHub (Opcional)', 'Conte-nos sobre você'],
        submitBtn: 'Enviar Candidatura', backBtn: '← Voltar para o Início', success: 'Candidatura recebida!', error: 'Ocorreu um erro.',
        joinNav: 'Junte-se a nós'
    },
    'ru': { folder: 'ru', file: 'join-us.html', title: 'Присоединяйтесь к нам', desc: 'Станьте частью команды Vertex.',
        labels: ['Полное имя', 'Электронная почта', 'Номер телефона', 'Возраст', 'URL LinkedIn (необязательно)', 'URL GitHub (необязательно)', 'Расскажите о себе'],
        submitBtn: 'Отправить заявку', backBtn: '← Вернуться на главную', success: 'Заявка получена!', error: 'Произошла ошибка.',
        joinNav: 'Присоединяйтесь'
    },
    'zh': { folder: 'zh', file: 'join-us.html', title: '加入我们', desc: '成为Vertex团队的一员。',
        labels: ['姓名', '电子邮件', '电话号码', '年龄', 'LinkedIn 链接（可选）', 'GitHub 链接（可选）', '介绍一下你自己'],
        submitBtn: '提交申请', backBtn: '← 返回首页', success: '申请已收到！', error: '发生错误。',
        joinNav: '加入我们'
    }
};

const baseDir = path.join(__dirname, '..');

const formCss = `
<style>
/* CSS Variables are inherited from index.html data-theme */
.join-page-wrapper {
    position: relative;
    padding: 60px 20px;
    min-height: calc(100vh - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.triangle-bg {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
}

.triangle {
    position: absolute;
    width: 0; height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 35px solid rgba(var(--primary-rgb), 0.1);
    animation: floatup 15s linear infinite;
}

@keyframes floatup {
    0% { transform: translateY(110vh) rotate(0deg) scale(1); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-10vh) rotate(360deg) scale(1.5); opacity: 0; }
}

.join-form-container {
    max-width: 800px;
    width: 100%;
    background: var(--bg-card); /* Integrates with light/dark theme! */
    border: 1px solid var(--border-color);
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    z-index: 1;
}

.join-header {
    text-align: center;
    margin-bottom: 30px;
}

.join-header h1 {
    font-size: 2.5rem;
    margin: 0 0 10px;
    background: var(--gradient-main);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.join-header p {
    color: var(--text-muted);
    font-size: 1.1rem;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.form-group.full-width { grid-column: 1 / -1; }

.join-form-container label {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-color);
    margin-left: 5px;
}

.join-form-container input, .join-form-container textarea {
    width: 100%;
    padding: 14px 18px;
    background: var(--bg-elevated, rgba(128,128,128,0.05));
    border: 1px solid var(--border-color);
    border-radius: 12px;
    color: var(--text-color);
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

.join-form-container input:focus, .join-form-container textarea:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
}

.join-form-container textarea {
    resize: vertical;
    min-height: 120px;
}

.join-submit-btn {
    grid-column: 1 / -1;
    padding: 16px;
    background: var(--primary);
    color: var(--btn-text-color);
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
}
.join-submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(var(--primary-rgb), 0.2);
}

@media (max-width: 768px) {
    .form-grid { grid-template-columns: 1fr; }
    .join-form-container { padding: 25px 20px; }
}
</style>
`;

const getFormHtml = (info) => `
<div class="join-page-wrapper">
    <div class="triangle-bg" id="join-triangles"></div>
    <div class="join-form-container">
        <div class="join-header">
            <h1>${info.title}</h1>
            <p>${info.desc}</p>
        </div>
        <form id="joinForm" class="form-grid">
            <div class="form-group">
                <label>${info.labels[0]}</label>
                <input type="text" id="joinName" required>
            </div>
            <div class="form-group">
                <label>${info.labels[1]}</label>
                <input type="email" id="joinEmail" required>
            </div>
            <div class="form-group">
                <label>${info.labels[2]}</label>
                <input type="tel" id="joinPhone" required> <!-- NOW REQUIRED -->
            </div>
            <div class="form-group">
                <label>${info.labels[3]}</label>
                <input type="number" id="joinAge" required min="13" max="100">
            </div>
            <div class="form-group">
                <label>${info.labels[4]}</label>
                <input type="url" id="joinLinkedin">
            </div>
            <div class="form-group">
                <label>${info.labels[5]}</label>
                <input type="url" id="joinGithub">
            </div>
            <div class="form-group full-width">
                <label>${info.labels[6]}</label>
                <textarea id="joinAbout" required></textarea>
            </div>
            <button type="submit" class="join-submit-btn" id="submitBtn">${info.submitBtn}</button>
        </form>
    </div>
</div>
<script>
    const bgContainer = document.getElementById('join-triangles');
    for (let i = 0; i < 20; i++) {
        const t = document.createElement('div');
        t.className = 'triangle';
        t.style.left = Math.random() * 100 + '%';
        t.style.animationDuration = (Math.random() * 10 + 10) + 's';
        t.style.animationDelay = '-' + (Math.random() * 20) + 's';
        t.style.opacity = Math.random() * 0.5 + 0.1;
        const size = Math.random() * 15 + 10;
        t.style.borderLeftWidth = size + 'px';
        t.style.borderRightWidth = size + 'px';
        t.style.borderBottomWidth = (size * 1.7) + 'px';
        bgContainer.appendChild(t);
    }

    document.getElementById('joinForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        const originalText = btn.textContent;
        btn.textContent = '...';
        btn.disabled = true;

        const data = {
            name: document.getElementById('joinName').value,
            email: document.getElementById('joinEmail').value,
            phone: document.getElementById('joinPhone').value,
            age: document.getElementById('joinAge').value,
            linkedin: document.getElementById('joinLinkedin').value,
            github: document.getElementById('joinGithub').value,
            about: document.getElementById('joinAbout').value,
            language: '${info.folder}'
        };

        fetch('https://europe-west1-vertex-ai-1618.cloudfunctions.net/createVertexContributor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        .then(result => {
            alert('${info.success}');
            document.getElementById('joinForm').reset();
        })
        .catch(error => {
            alert('${info.error}');
            console.error(error);
        })
        .finally(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        });
    });
</script>
`;

Object.keys(langs).forEach(lang => {
    const indexPath = path.join(baseDir, lang, 'index.html');
    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf-8');
        const info = langs[lang];
        
        // 1. Update mailto links to "Join Us" in all html files of the language directory
        const mailtoRegex = /<a href="mailto:contact@vertexishere\.com" class="([^"]*)".*?>.*?<\/a>/g;
        fs.readdirSync(path.join(baseDir, lang)).forEach(file => {
            if (file.endsWith('.html') && file !== info.file) {
                const filePath = path.join(baseDir, lang, file);
                let htmlContent = fs.readFileSync(filePath, 'utf-8');
                const newHtmlContent = htmlContent.replace(mailtoRegex, `<a href="${info.file}" class="$1">${info.joinNav}</a>`);
                if (htmlContent !== newHtmlContent) {
                    fs.writeFileSync(filePath, newHtmlContent);
                    console.log('Updated buttons in:', filePath);
                }
            }
        });
        
        // Refresh index content after potential update for layout wrapper
        content = fs.readFileSync(indexPath, 'utf-8');

        // 2. Generate join page using index.html as layout wrapper
        const mainStart = content.match(/<main[^>]*>/);
        const mainEnd = content.match(/<\/main>/);

        if (mainStart && mainEnd) {
            let headerHtml = content.substring(0, mainStart.index + mainStart[0].length);
            let footerHtml = content.substring(mainEnd.index);
            
            // Fix navigation links to point to index.html instead of the current page
            headerHtml = headerHtml.replace(/href="#([a-zA-Z0-9_-]+)"/g, 'href="index.html#$1"');
            footerHtml = footerHtml.replace(/href="#([a-zA-Z0-9_-]+)"/g, 'href="index.html#$1"');
            
            headerHtml = headerHtml.replace('</head>', formCss + '\n</head>');
            
            headerHtml = headerHtml.replace(/<title>.*?<\/title>/, `<title>${info.title} | Vertex</title>`);
            headerHtml = headerHtml.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${info.title} | Vertex">`);
            headerHtml = headerHtml.replace(/<meta property="og:description"\\s*content=".*?">/, `<meta property="og:description" content="${info.desc}">`);
            headerHtml = headerHtml.replace(/<meta property="og:url" content=".*?">/, `<meta property="og:url" content="https://vertexishere.com/${lang}/${info.file}">`);
            
            headerHtml = headerHtml.replace(/<meta name="twitter:title" content=".*?">/, `<meta name="twitter:title" content="${info.title} | Vertex">`);
            headerHtml = headerHtml.replace(/<meta name="twitter:description" content=".*?">/, `<meta name="twitter:description" content="${info.desc}">`);

            const joinPageContent = headerHtml + '\n' + getFormHtml(info) + '\n' + footerHtml;
            const targetFilePath = path.join(baseDir, lang, info.file);
            
            fs.writeFileSync(targetFilePath, joinPageContent);
            console.log('Generated integrated layout for:', targetFilePath);
        }
    }
});
