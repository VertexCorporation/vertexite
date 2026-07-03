const fs = require('fs');
const path = require('path');

const langs = {
    'tr': { folder: 'tr', file: 'aramiza-katil.html', title: 'Aramıza Katıl', desc: 'Vertex ekibinin bir parçası ol.',
        labels: ['Ad Soyad', 'E-posta', 'Telefon Numarası (Opsiyonel)', 'Yaş', 'LinkedIn Bağlantısı (Opsiyonel)', 'GitHub Bağlantısı (Opsiyonel)', 'Kendinden bahset'],
        submitBtn: 'Başvuruyu Gönder', backBtn: '← Ana Sayfaya Dön', success: 'Başvurunuz alındı!', error: 'Bir hata oluştu.'
    },
    'en': { folder: 'en', file: 'join-us.html', title: 'Join Us', desc: 'Become a part of the Vertex team.',
        labels: ['Full Name', 'Email', 'Phone Number (Optional)', 'Age', 'LinkedIn URL (Optional)', 'GitHub URL (Optional)', 'Tell us about yourself'],
        submitBtn: 'Submit Application', backBtn: '← Back to Home', success: 'Application received!', error: 'An error occurred.'
    },
    'ar': { folder: 'ar', file: 'join-us.html', title: 'انضم إلينا', desc: 'كن جزءًا من فريق Vertex.',
        labels: ['الاسم الكامل', 'البريد الإلكتروني', 'رقم الهاتف (اختياري)', 'العمر', 'رابط LinkedIn (اختياري)', 'رابط GitHub (اختياري)', 'تحدث عن نفسك'],
        submitBtn: 'إرسال الطلب', backBtn: '← العودة للصفحة الرئيسية', success: 'تم استلام الطلب!', error: 'حدث خطأ.'
    },
    'az': { folder: 'az', file: 'join-us.html', title: 'Bizə Qoşulun', desc: 'Vertex komandasının bir hissəsi olun.',
        labels: ['Ad Soyad', 'E-poçt', 'Telefon Nömrəsi (İstəyə görə)', 'Yaş', 'LinkedIn Linki (İstəyə görə)', 'GitHub Linki (İstəyə görə)', 'Özünüz haqqında danışın'],
        submitBtn: 'Müraciəti Göndər', backBtn: '← Ana Səhifəyə Qayıt', success: 'Müraciət qəbul edildi!', error: 'Xəta baş verdi.'
    },
    'de': { folder: 'de', file: 'join-us.html', title: 'Begleiten Sie uns', desc: 'Werden Sie Teil des Vertex-Teams.',
        labels: ['Vollständiger Name', 'E-Mail', 'Telefonnummer (Optional)', 'Alter', 'LinkedIn URL (Optional)', 'GitHub URL (Optional)', 'Erzählen Sie uns von sich'],
        submitBtn: 'Bewerbung einreichen', backBtn: '← Zurück zur Startseite', success: 'Bewerbung erhalten!', error: 'Ein Fehler ist aufgetreten.'
    },
    'es': { folder: 'es', file: 'join-us.html', title: 'Únete a nosotros', desc: 'Conviértete en parte del equipo de Vertex.',
        labels: ['Nombre Completo', 'Correo Electrónico', 'Número de Teléfono (Opcional)', 'Edad', 'URL de LinkedIn (Opcional)', 'URL de GitHub (Opcional)', 'Cuéntanos sobre ti'],
        submitBtn: 'Enviar Solicitud', backBtn: '← Volver al Inicio', success: '¡Solicitud recibida!', error: 'Ocurrió un error.'
    },
    'fr': { folder: 'fr', file: 'join-us.html', title: 'Rejoignez-nous', desc: 'Faites partie de l\'équipe Vertex.',
        labels: ['Nom Complet', 'E-mail', 'Numéro de Téléphone (Optionnel)', 'Âge', 'URL LinkedIn (Optionnel)', 'URL GitHub (Optionnel)', 'Parlez-nous de vous'],
        submitBtn: 'Soumettre la Candidature', backBtn: '← Retour à l\'Accueil', success: 'Candidature reçue !', error: 'Une erreur s\'est produite.'
    },
    'hi': { folder: 'hi', file: 'join-us.html', title: 'हमसे जुड़ें', desc: 'Vertex टीम का हिस्सा बनें।',
        labels: ['पूरा नाम', 'ईमेल', 'फोन नंबर (वैकल्पिक)', 'आयु', 'लिंक्डइन यूआरएल (वैकल्पिक)', 'गिटहब यूआरएल (वैकल्पिक)', 'अपने बारे में बताएं'],
        submitBtn: 'आवेदन जमा करें', backBtn: '← होम पर वापस जाएं', success: 'आवेदन प्राप्त हुआ!', error: 'एक त्रुटि हुई।'
    },
    'id': { folder: 'id', file: 'join-us.html', title: 'Bergabunglah dengan Kami', desc: 'Menjadi bagian dari tim Vertex.',
        labels: ['Nama Lengkap', 'Email', 'Nomor Telepon (Opsional)', 'Usia', 'URL LinkedIn (Opsional)', 'URL GitHub (Opsional)', 'Ceritakan tentang diri Anda'],
        submitBtn: 'Kirim Aplikasi', backBtn: '← Kembali ke Beranda', success: 'Aplikasi diterima!', error: 'Terjadi kesalahan.'
    },
    'it': { folder: 'it', file: 'join-us.html', title: 'Unisciti a noi', desc: 'Diventa parte del team Vertex.',
        labels: ['Nome e Cognome', 'Email', 'Numero di Telefono (Opzionale)', 'Età', 'URL LinkedIn (Opzionale)', 'URL GitHub (Opzionale)', 'Parlaci di te'],
        submitBtn: 'Invia Candidatura', backBtn: '← Torna alla Home', success: 'Candidatura ricevuta!', error: 'Si è verificato un errore.'
    },
    'ja': { folder: 'ja', file: 'join-us.html', title: '参加する', desc: 'Vertexチームの一員になりましょう。',
        labels: ['氏名', 'メールアドレス', '電話番号（任意）', '年齢', 'LinkedIn URL（任意）', 'GitHub URL（任意）', '自己紹介'],
        submitBtn: '応募を送信', backBtn: '← ホームに戻る', success: '応募を受け付けました！', error: 'エラーが発生しました。'
    },
    'ko': { folder: 'ko', file: 'join-us.html', title: '합류하기', desc: 'Vertex 팀의 일원이 되십시오.',
        labels: ['성명', '이메일', '전화번호 (선택)', '나이', 'LinkedIn URL (선택)', 'GitHub URL (선택)', '자기소개'],
        submitBtn: '지원서 제출', backBtn: '← 홈으로 돌아가기', success: '지원서가 접수되었습니다!', error: '오류가 발생했습니다.'
    },
    'nl': { folder: 'nl', file: 'join-us.html', title: 'Doe met ons mee', desc: 'Word onderdeel van het Vertex-team.',
        labels: ['Volledige Naam', 'E-mail', 'Telefoonnummer (Optioneel)', 'Leeftijd', 'LinkedIn URL (Optioneel)', 'GitHub URL (Optioneel)', 'Vertel ons over jezelf'],
        submitBtn: 'Sollicitatie indienen', backBtn: '← Terug naar Home', success: 'Sollicitatie ontvangen!', error: 'Er is een fout opgetreden.'
    },
    'pt': { folder: 'pt', file: 'join-us.html', title: 'Junte-se a nós', desc: 'Faça parte da equipe Vertex.',
        labels: ['Nome Completo', 'E-mail', 'Número de Telefone (Opcional)', 'Idade', 'URL do LinkedIn (Opcional)', 'URL do GitHub (Opcional)', 'Conte-nos sobre você'],
        submitBtn: 'Enviar Candidatura', backBtn: '← Voltar para o Início', success: 'Candidatura recebida!', error: 'Ocorreu um erro.'
    },
    'ru': { folder: 'ru', file: 'join-us.html', title: 'Присоединяйтесь к нам', desc: 'Станьте частью команды Vertex.',
        labels: ['Полное имя', 'Электронная почта', 'Номер телефона (необязательно)', 'Возраст', 'URL LinkedIn (необязательно)', 'URL GitHub (необязательно)', 'Расскажите о себе'],
        submitBtn: 'Отправить заявку', backBtn: '← Вернуться на главную', success: 'Заявка получена!', error: 'Произошла ошибка.'
    },
    'zh': { folder: 'zh', file: 'join-us.html', title: '加入我们', desc: '成为Vertex团队的一员。',
        labels: ['姓名', '电子邮件', '电话号码（可选）', '年龄', 'LinkedIn 链接（可选）', 'GitHub 链接（可选）', '介绍一下你自己'],
        submitBtn: '提交申请', backBtn: '← 返回首页', success: '申请已收到！', error: '发生错误。'
    }
};

const template = (langInfo, langCode) => `<!DOCTYPE html>
<html lang="${langCode}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${langInfo.title} | Vertex</title>
    <style>
        :root {
            --primary: #8a2be2;
            --secondary: #4b0082;
            --bg-color: #0d0d12;
            --text-color: #ffffff;
            --input-bg: rgba(255, 255, 255, 0.05);
            --border-color: rgba(255, 255, 255, 0.1);
        }

        body, html {
            margin: 0;
            padding: 0;
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow-x: hidden;
            min-height: 100vh;
        }

        /* Animated Triangles Background */
        .background-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            overflow: hidden;
            background: radial-gradient(circle at center, #1a0b2e 0%, var(--bg-color) 100%);
        }

        .triangle {
            position: absolute;
            width: 0;
            height: 0;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-bottom: 35px solid rgba(138, 43, 226, 0.15);
            animation: floatup 15s linear infinite;
        }

        @keyframes floatup {
            0% { transform: translateY(110vh) rotate(0deg) scale(1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-10vh) rotate(360deg) scale(1.5); opacity: 0; }
        }

        .container {
            max-width: 800px;
            margin: 50px auto;
            padding: 40px;
            background: rgba(20, 20, 30, 0.6);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
        }

        .header h1 {
            font-size: 3rem;
            margin: 0 0 10px 0;
            background: linear-gradient(135deg, #b87aff, #6a11cb);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .header p {
            color: #a0a0b0;
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

        .form-group.full-width {
            grid-column: 1 / -1;
        }

        label {
            font-size: 0.9rem;
            font-weight: 500;
            color: #d0d0e0;
            margin-left: 5px;
        }

        input, textarea {
            width: 100%;
            padding: 15px 20px;
            background: var(--input-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            color: white;
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }

        input:focus, textarea:focus {
            border-color: var(--primary);
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 15px rgba(138, 43, 226, 0.2);
        }

        textarea {
            resize: vertical;
            min-height: 120px;
        }

        .submit-btn {
            grid-column: 1 / -1;
            padding: 18px;
            background: linear-gradient(135deg, #8a2be2, #4b0082);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
            box-shadow: 0 10px 20px rgba(138, 43, 226, 0.3);
        }

        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 25px rgba(138, 43, 226, 0.4);
        }

        .submit-btn:active {
            transform: translateY(0);
        }

        .back-link {
            display: block;
            text-align: center;
            margin-top: 30px;
            color: #a0a0b0;
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s;
        }

        .back-link:hover {
            color: white;
        }

        @media (max-width: 768px) {
            .form-grid {
                grid-template-columns: 1fr;
            }
            .container {
                margin: 20px;
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body dir="${langCode === 'ar' ? 'rtl' : 'ltr'}">
    <div class="background-container" id="bg-container"></div>

    <div class="container">
        <div class="header">
            <h1>${langInfo.title}</h1>
            <p>${langInfo.desc}</p>
        </div>

        <form id="joinForm" class="form-grid">
            <div class="form-group">
                <label>${langInfo.labels[0]}</label>
                <input type="text" id="joinName" required>
            </div>
            
            <div class="form-group">
                <label>${langInfo.labels[1]}</label>
                <input type="email" id="joinEmail" required>
            </div>

            <div class="form-group">
                <label>${langInfo.labels[2]}</label>
                <input type="tel" id="joinPhone">
            </div>

            <div class="form-group">
                <label>${langInfo.labels[3]}</label>
                <input type="number" id="joinAge" required min="13" max="100">
            </div>

            <div class="form-group">
                <label>${langInfo.labels[4]}</label>
                <input type="url" id="joinLinkedin">
            </div>

            <div class="form-group">
                <label>${langInfo.labels[5]}</label>
                <input type="url" id="joinGithub">
            </div>

            <div class="form-group full-width">
                <label>${langInfo.labels[6]}</label>
                <textarea id="joinAbout" required></textarea>
            </div>

            <button type="submit" class="submit-btn" id="submitBtn">${langInfo.submitBtn}</button>
        </form>

        <a href="index.html" class="back-link">${langInfo.backBtn}</a>
    </div>

    <script>
        // Generate floating triangles
        const bgContainer = document.getElementById('bg-container');
        for (let i = 0; i < 30; i++) {
            const triangle = document.createElement('div');
            triangle.className = 'triangle';
            triangle.style.left = Math.random() * 100 + 'vw';
            triangle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            triangle.style.animationDelay = (Math.random() * 10) + 's';
            triangle.style.opacity = Math.random() * 0.5 + 0.1;
            const size = Math.random() * 20 + 10;
            triangle.style.borderLeftWidth = size + 'px';
            triangle.style.borderRightWidth = size + 'px';
            triangle.style.borderBottomWidth = (size * 1.7) + 'px';
            bgContainer.appendChild(triangle);
        }

        // Form Submission
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
                about: document.getElementById('joinAbout').value
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
                alert('${langInfo.success}');
                document.getElementById('joinForm').reset();
            })
            .catch(error => {
                alert('${langInfo.error}');
                console.error(error);
            })
            .finally(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            });
        });
    </script>
</body>
</html>`;

const baseDir = path.join(__dirname, '..');

Object.keys(langs).forEach(langCode => {
    const info = langs[langCode];
    const targetDir = path.join(baseDir, info.folder);
    
    // Ensure the folder exists
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, info.file);
    fs.writeFileSync(filePath, template(info, langCode));
    console.log('Generated:', filePath);
});
