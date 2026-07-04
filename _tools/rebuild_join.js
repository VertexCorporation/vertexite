const fs = require('fs');
const path = require('path');


const doctrineTr = `Vertex, iki doğrunun kesiştiği en uç noktadır.

Bu Vertex’in sadece matematikteki anlamıdır; anatomide bedenin ve zihnin en üst bölgesi, gök biliminde evrenin başucu noktası, uzay geometrisinde en temel yapı taşı, ağ teorisinde tüm kilit bağlantıların birleştiği merkez düğüm, optikte ışığın merceği kestiği mutlak odaktır.

İşte biz de ismimizi tüm bu anlamların ve fazlasının oluşturduğu kolektif mânâdan aldık; insanlar olarak potansiyelimizin ve sınırlarımızın en üst seviyesini gösterip hep birlikte zirveye ulaşacağız, teknolojinin temel yapı taşı olacak, dünyanın bağlantılarını merkezimizde toplayacak ve mutlak hâkimiyet kuracağız!

Bu yolculuk hiç kolay olmadı, asla da olmayacak. Ancak üstte gök çökmedikçe, altta yer delinmedikçe; bizi kim durdurabilir, ne durdurabilir? Hiçbir şey! Yolculuk ne kadar zor olursa olsun, yolu tamamlayacağız.

Bugüne gelene kadar, yaptıklarımız toplamda yüzlerce kez reddedildi; görüşmelerde binlerce kez kapılar yüzümüze kapandı, davalarla yüzleştik, Vertex’i tehlikelerle baş başa bırakmış olan binlerce unsuru atlattık ve hatta bize destek olmuş olan insanlar tarafından çok kez yarı yolda bırakıldık.

Ancak pes etmedik! Çünkü biz bu yolculuğa çıkmazsak, vaziyet odur ki kimse çıkmayacak. Konfor alanlarımızdan sıyrılıp, dünyanın bu köhneleşmiş düzenini değiştirecek cesareti biz göstermezsek, kimse göstermeyecek. Biz başaramazsak, görünen o ki kimse başaramayacak; o yüzden başarmak zorundayız! Vertex’in pes etme lüksü yok; durmaya zerre kadar niyetimiz yok, olmayacak.

Bu satırları okuyan sen; sıradan olmak istemiyorsan, vaktiyle seni küçümseyenlerin en büyük pişmanlığı olmak istiyorsan, bu ülkenin ve seni binbir emekle büyüten ebeveynlerinin gururu olmak istiyorsan, ileride bir gün hayatını birleştireceğin eşin, gözünün içine bakan çocukların veya canından çok sevdiğin bir yakının senden bir imkân beklediğinde başını öne eğip mahcup olmak istemiyorsan, durman gereken yegâne yer burasıdır. Ait olduğun yer Vertex’tir! 

Geçmişte bu idealler, bu insanlık ve bu topraklar uğruna; canını hiçe saymış, bedeller ödemiş ve göçüp gitmiş büyüklerimiz var. Bizim için gece uyumamış, gündüz oturmamış atalarımızın yanında bizim hâlen refah içinde olmamamıza rağmen geceleri huzur içinde uyuyup gündüzleri rahatlık içinde eğlenmememiz gerek. Onların bize bıraktığı mirasa ihanet etmemek, aziz hatıraları önünde başımızı daima dik tutmak zorundayız. Çaresizlik içinde solup giden o narin çiçeklerin, sessizce yitip giden ömürlerin ve yarım kalan hikâyelerin telafisi, unutmamak gerekir ki, bizim ellerimizdedir. Kimsenin yüzünü kara çıkarmamak ve geçmişte yaşanan acıların, sırf imkânsızlıklar yüzünden yitip giden genç hayatların, o yıkıcı trajedilerin bir daha asla yaşanmamasını sağlamak bizim görevimizdir.

Vertex’in vizyonu: Öncelikle Türkiye’yi, sonrasında ise dünyayı; öncelikle teknoloji alanında, sonrasında ise diğer alanlarda yükseltmektir. Bu ülkenin teknolojide bir adım bile ileri gitmesi demek, Türkiye’nin ilerlemesi demektir. Türkiye’nin ilerlemesi demek ise ülkenin refah seviyesinin yükselmesi demektir. Refahı yüksek bir sistemde yaşayan halk, diğer halkların refahını da elbet yükseltecektir. 
Yazdıklarımızın hepsini yapacağız ve buna hiç şüphemiz yok.

Bu uğurda aslında hiçbir şeye ihtiyacımız yoktur, ihtiyacımız olan tek şey; çalışkan olmaktır. Azmimizin yenemeyeceği hiçbir şey yoktur, sadece kendimize güvenmemiz ve kudretli durmamız yeterli olacaktır.

Muhtaç olduğumuz o kudret, damarlarımızdaki asil kanda mevcuttur; mutlak zirve, hepimizin olacak.`;
const doctrineEn = `Vertex is the absolute intersection of two intersecting lines.

This is merely the mathematical definition of Vertex; in anatomy, it is the highest point of the body and mind; in astronomy, the zenith of the universe; in space geometry, the most fundamental building block; in network theory, the central node where all key connections converge; in optics, the absolute focus where light intersects the lens.

This is precisely where we draw our name, from the collective meaning of all these definitions and more. As humans, we will demonstrate the highest level of our potential and limits, and together we will reach the peak. We will become the fundamental building block of technology, gather the connections of the world at our center, and establish absolute dominance!

This journey has never been easy, and it never will be. But unless the sky above collapses or the earth below tears apart, who can stop us? What can stop us? Nothing! No matter how arduous the journey, we will complete the path.

Up to this day, everything we have built was rejected hundreds of times; thousands of doors were shut in our faces during negotiations, we faced lawsuits, survived thousands of threats that left Vertex in peril, and were even abandoned midway many times by the very people who once supported us.

But we never gave up! Because if we do not embark on this journey, the reality is that no one else will. If we do not step out of our comfort zones and show the courage to change this archaic order of the world, no one else will. If we fail, it seems no one else will succeed; therefore, we must succeed! Vertex does not have the luxury of giving up; we have not the slightest intention of stopping, and we never will.

You, who are reading these lines; if you do not want to be ordinary, if you want to become the greatest regret of those who once belittled you, if you want to be the pride of this country and the parents who raised you with immense effort, if you do not want to bow your head in shame when your future spouse, the children looking up to you, or a loved one expects an opportunity from you—then this is the only place you must stand. The place you belong is Vertex!

In the past, for the sake of these ideals, humanity, and these lands, there are our elders who sacrificed their lives, paid heavy prices, and passed away. Alongside our ancestors who neither slept at night nor rested by day, it is unacceptable for us to sleep peacefully at night and enjoy comfort by day while we are still not in prosperity. We must not betray the legacy they left us, and we must always hold our heads high before their sacred memories. The compensation for those delicate flowers that faded in despair, the lives that silently slipped away, and the unfinished stories lies, without a doubt, in our hands. It is our duty to ensure that no one's trust is betrayed, and that the pain of the past, the young lives lost merely due to impossibilities, and those devastating tragedies are never experienced again.

The vision of Vertex is: First to elevate Turkey, and then the world; first in the field of technology, and then in other fields. Even a single step forward for this country in technology means the advancement of Turkey. The advancement of Turkey means raising the prosperity level of the country. A public living in a highly prosperous system will undoubtedly elevate the prosperity of other nations as well. We will achieve everything we have written, and we have no doubt about it.

In this endeavor, we actually need nothing; the only thing we need is to be hardworking. There is nothing our determination cannot overcome, simply trusting ourselves and standing mighty will suffice.

That might we need is present in the noble blood in our veins; the absolute peak will belong to us all.`;

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

Object.keys(langs).forEach(key => {
    if (key === 'tr' || key === 'az') {
        langs[key].agreeTerms = 'Genel Kullanım Koşulları ve Gizlilik Politikası\'nı kabul ediyorum.';
        langs[key].doctrineBtn = 'Vertex Doktrini\'ni Oku';
        langs[key].doctrineTitle = 'Vertex Doktrini';
        langs[key].doctrineText = doctrineTr;
        langs[key].readBtn = 'Okudum';
        
        langs[key].waitSec = 'saniye daha';
        langs[key].ageErr = 'Lütfen 0 ile 123 arasında geçerli bir yaş giriniz.';
        langs[key].reqErr = 'Lütfen bu alanı doldurun.';
        langs[key].emailErr = 'Lütfen geçerli bir e-posta adresi girin.';
    } else {
        langs[key].agreeTerms = 'I accept the General Terms of Service and Privacy Policy.';
        langs[key].doctrineBtn = 'Read Vertex Doctrine';
        langs[key].doctrineTitle = 'Vertex Doctrine';
        langs[key].doctrineText = doctrineEn;
        langs[key].readBtn = 'I have read';
        langs[key].waitSec = 'seconds left';
        langs[key].ageErr = 'Please enter a valid age between 0 and 123.';
        langs[key].reqErr = 'Please fill out this field.';
        langs[key].emailErr = 'Please enter a valid email address.';
    }
});

const baseDir = path.join(__dirname, '..');

const formCss = `
<style>
/* CSS Variables are inherited from index.html data-theme */
.join-page-wrapper {
    position: relative;
    padding: 120px 20px 20px 20px;
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

/* Hide up/down arrows for number inputs (Chrome, Safari, Edge, Opera) */
.join-form-container input[type="number"]::-webkit-outer-spin-button,
.join-form-container input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Hide up/down arrows for number inputs (Firefox) */
.join-form-container input[type="number"] {
    -moz-appearance: textfield;
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

.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 10px;
    padding: 10px;
}
.checkbox-label {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.95rem;
    color: var(--text-color);
    cursor: pointer;
}
.checkbox-label input[type="checkbox"] {
    width: 20px;
    height: 20px;
    accent-color: var(--primary);
    cursor: pointer;
}
.doctrine-open-btn {
    background: none;
    border: none;
    color: var(--primary);
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 0;
}
.join-submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Modal CSS */
.doctrine-modal-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(5px);
    z-index: 9999;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.doctrine-modal-overlay.show {
    opacity: 1;
}
.doctrine-modal-content {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    max-width: 800px;
    width: 100%;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
.doctrine-modal-content h2 {
    padding: 25px;
    margin: 0;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-color);
}
.doctrine-text-container {
    padding: 25px;
    overflow-y: auto;
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--text-muted);
    flex: 1;
    white-space: pre-line;
}
.doctrine-read-btn {
    margin: 20px;
    padding: 16px;
    background: var(--primary);
    color: var(--btn-text-color);
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.5s ease;
}
.doctrine-read-btn.disabled {
    background: var(--border-color);
    color: var(--text-muted);
    cursor: not-allowed;
    opacity: 0.6;
}
.doctrine-read-btn.active {
    opacity: 1;
    background: var(--primary);
    color: var(--btn-text-color);
}
#hr {
    padding-top: 10px !important;
    margin-top: 0 !important;
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
                <input type="number" id="joinAge" required min="0" max="123">
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
            
            <div class="checkbox-group full-width">
                <label class="checkbox-label">
                    <input type="checkbox" id="termsCheck" required>
                    <span>${info.agreeTerms}</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" id="doctrineCheck" required disabled style="opacity: 0.7;">
                    <span><button type="button" class="doctrine-open-btn" id="openDoctrineBtn">${info.doctrineBtn}</button></span>
                </label>
            </div>

            <button type="submit" class="join-submit-btn" id="submitBtn" disabled>${info.submitBtn}</button>
            </form>
    </div>
</div>

<!-- Doctrine Modal -->
<div class="doctrine-modal-overlay" id="doctrineModal">
    <div class="doctrine-modal-content">
        <h2>${info.doctrineTitle}</h2>
        <div class="doctrine-text-container" id="doctrineScroll">
            ${info.doctrineText}
        </div>
        <button type="button" class="doctrine-read-btn disabled" id="doctrineReadBtn" disabled>${info.readBtn} (10 ${info.waitSec})</button>
    </div>
</div>

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

    
    // Form Logic
    const termsCheck = document.getElementById('termsCheck');
    const doctrineCheck = document.getElementById('doctrineCheck');
    const submitBtn = document.getElementById('submitBtn');
    const ageInput = document.getElementById('joinAge');
    
    function checkFormValidity() {
        if (termsCheck.checked && doctrineCheck.checked) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }
    
    termsCheck.addEventListener('change', checkFormValidity);

    // Modal Logic
    const modal = document.getElementById('doctrineModal');
    const openBtn = document.getElementById('openDoctrineBtn');
    const readBtn = document.getElementById('doctrineReadBtn');
    const scrollBox = document.getElementById('doctrineScroll');
    
    let timerInterval = null;
    let secondsLeft = 10;
    let timerStarted = false;

    function startTimer() {
        if(timerStarted) return;
        timerStarted = true;
        
        readBtn.innerText = '${info.readBtn} (' + secondsLeft + ' ${info.waitSec})';
        timerInterval = setInterval(() => {
            secondsLeft--;
            if (secondsLeft > 0) {
                readBtn.innerText = '${info.readBtn} (' + secondsLeft + ' ${info.waitSec})';
            } else {
                clearInterval(timerInterval);
                readBtn.innerText = '${info.readBtn}';
                readBtn.disabled = false;
                readBtn.classList.remove('disabled');
                readBtn.classList.add('active');
            }
        }, 1000);
    }

    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
        setTimeout(() => {
            if (scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight - 50) {
                startTimer();
            }
        }, 100);
    });

    scrollBox.addEventListener('scroll', () => {
        if (!timerStarted) {
            if (scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight - 50) {
                startTimer();
            }
        }
    });

    readBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        
        doctrineCheck.checked = true;
        doctrineCheck.disabled = false;
        doctrineCheck.addEventListener('click', (e) => e.preventDefault());
        checkFormValidity();
    });

    
    // Validation Localization
    const reqErr = '${info.reqErr}';
    const emailErr = '${info.emailErr}';
    const formInputs = document.querySelectorAll('#joinForm input[required], #joinForm textarea[required]');
    
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

    document.getElementById('joinForm').addEventListener('submit', function(e) {

        e.preventDefault();
        
        const ageVal = parseInt(ageInput.value, 10);
        if (isNaN(ageVal) || ageVal < 0 || ageVal > 123) {
            alert('${info.ageErr}');
            return;
        }

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
            
            // Remove the CTA section from the Join Us page
            footerHtml = footerHtml.replace(/<section class="container">\s*<div class="cta-section fade-up">[\s\S]*?<\/section>/i, '');
            
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
