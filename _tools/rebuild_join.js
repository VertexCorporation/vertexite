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
const { contractTr, contractEn } = require('./contracts.js');

const langs = {
    'tr': { folder: 'tr', file: 'aramiza-katil.html', title: 'Aramıza Katıl', desc: "Vertex'in bir parçası ol.",
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

const localizationMap = {
    'tr': { terms: 'hizmet-sartlari.html', privacy: 'gizlilik-politikasi.html' },
    'ar': { terms: 'shurut-al-khidma.html', privacy: 'siyasat-al-khususiyya.html' },
    'az': { terms: 'xidmet-sertleri.html', privacy: 'mexfilik-siyaseti.html' },
    'de': { terms: 'nutzungsbedingungen.html', privacy: 'datenschutzrichtlinie.html' },
    'es': { terms: 'terminos-de-servicio.html', privacy: 'politica-de-privacidad.html' },
    'fr': { terms: 'conditions-d-utilisation.html', privacy: 'politique-de-confidentialite.html' },
    'hi': { terms: 'seva-ki-shartein.html', privacy: 'gopaniyata-niti.html' },
    'id': { terms: 'syarat-layanan.html', privacy: 'kebijakan-privasi.html' },
    'it': { terms: 'termini-di-servizio.html', privacy: 'informativa-sulla-privacy.html' },
    'ja': { terms: 'riyou-kiyaku.html', privacy: 'puraibashi-porishi.html' },
    'ko': { terms: 'iyong-yakgwan.html', privacy: 'gaein-jeongbo-cheori-bangchim.html' },
    'nl': { terms: 'servicevoorwaarden.html', privacy: 'privacybeleid.html' },
    'pt': { terms: 'termos-de-servico.html', privacy: 'politica-de-privacidade.html' },
    'ru': { terms: 'usloviya-obsluzhivaniya.html', privacy: 'politika-konfidencialnosti.html' },
    'zh': { terms: 'fuwu-tiaokuan.html', privacy: 'yinsi-zhengce.html' },
    'en': { terms: 'terms-of-service.html', privacy: 'privacy-policy.html' }
};

const uiLangs = {
    'tr': { tos: 'Hizmet Şartları', priv: 'Gizlilik Politikası', doc: 'Vertex Doktrini', read: 'Okudum', wait: 'saniye daha',
        age: 'Lütfen 0 ile 123 arasında geçerli bir yaş giriniz.', req: 'Lütfen bu alanı doldurun.', mail: 'Lütfen geçerli bir e-posta adresi girin.',
        dup: 'Bu e-posta veya telefon numarası zaten kayıtlı.', cFile: 'vertex-kadro-sozlesmesi.html', cTitle: 'Vertex Kadro Sözleşmesi',
        sTitle: 'BAŞVURUNUZ ALINMIŞTIR!', sDesc: 'Vertex, başvurunuzu inceleyecek ve gerekli görmesi halinde sizlere sağlamış olduğunuz iletişim bilgileri üzerinden dönüş yapacaktır.<br><br>İlginiz için teşekkür ederiz.',
        agreeFormat: '<a href="{tf}" target="_blank"><b>{tos}</b></a> ve <a href="{pf}" target="_blank"><b>{priv}</b></a>\'nı kabul ediyorum.',
        docFormat: '<a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>\'ni okudum.',
        cFormat: '<a href="{cf}" target="_blank"><b>{ct}</b></a>\'ni okuduğumu ve onayladığımı beyan ederim.'
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
    'fr': { tos: 'Conditions d\'Utilisation', priv: 'Politique de Confidentialité', doc: 'Doctrine Vertex', read: 'J\'ai lu', wait: 'secondes restantes', age: 'Veuillez entrer un âge valide.', req: 'Veuillez remplir ce champ.', mail: 'Veuillez entrer un email valide.', dup: 'Cet email ou téléphone est déjà enregistré.', cFile: 'vertex-team-contract.html', cTitle: 'Contrat d\'Équipe Vertex', sTitle: 'CANDIDATURE REÇUE !', sDesc: 'Vertex examinera votre candidature et vous contactera si nécessaire.<br><br>Merci pour votre intérêt.',
        agreeFormat: 'J\'accepte les <a href="{tf}" target="_blank"><b>{tos}</b></a> et la <a href="{pf}" target="_blank"><b>{priv}</b></a>.',
        docFormat: 'J\'ai lu la <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>.', cFormat: 'Je déclare avoir lu et approuvé le <a href="{cf}" target="_blank"><b>{ct}</b></a>.' },
    'hi': { tos: 'सेवा की शर्तें', priv: 'गोपनीयता नीति', doc: 'Vertex सिद्धांत', read: 'मैंने पढ़ लिया है', wait: 'सेकंड शेष', age: 'कृपया एक मान्य आयु दर्ज करें।', req: 'कृपया इस फ़ील्ड को भरें।', mail: 'कृपया एक मान्य ईमेल दर्ज करें।', dup: 'यह ईमेल या फोन पहले से पंजीकृत है।', cFile: 'vertex-team-contract.html', cTitle: 'Vertex टीम अनुबंध', sTitle: 'आवेदन प्राप्त हुआ!', sDesc: 'Vertex आपके आवेदन की समीक्षा करेगा और आवश्यक होने पर आपसे संपर्क करेगा।<br><br>आपकी रुचि के लिए धन्यवाद।',
        agreeFormat: 'मैं <a href="{tf}" target="_blank"><b>{tos}</b></a> और <a href="{pf}" target="_blank"><b>{priv}</b></a> स्वीकार करता हूँ।',
        docFormat: 'मैंने <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a> पढ़ लिया है।', cFormat: 'मैं घोषणा करता हूँ कि मैंने <a href="{cf}" target="_blank"><b>{ct}</b></a> पढ़ और स्वीकृत कर लिया है।' },
    'id': { tos: 'Syarat Layanan', priv: 'Kebijakan Privasi', doc: 'Doktrin Vertex', read: 'Saya telah membaca', wait: 'detik tersisa', age: 'Silakan masukkan usia yang valid.', req: 'Harap isi bidang ini.', mail: 'Silakan masukkan email yang valid.', dup: 'Email atau telepon ini sudah terdaftar.', cFile: 'vertex-team-contract.html', cTitle: 'Kontrak Tim Vertex', sTitle: 'APLIKASI DITERIMA!', sDesc: 'Vertex akan meninjau aplikasi Anda dan menghubungi Anda jika diperlukan.<br><br>Terima kasih atas minat Anda.',
        agreeFormat: 'Saya menerima <a href="{tf}" target="_blank"><b>{tos}</b></a> dan <a href="{pf}" target="_blank"><b>{priv}</b></a>.',
        docFormat: 'Saya telah membaca <a href="javascript:void(0)" id="openDoctrineBtn"><b>{doc}</b></a>.', cFormat: 'Saya menyatakan bahwa saya telah membaca dan menyetujui <a href="{cf}" target="_blank"><b>{ct}</b></a>.' },
    'it': { tos: 'Termini di Servizio', priv: 'Informativa sulla Privacy', doc: 'Dottrina Vertex', read: 'Ho letto', wait: 'secondi rimanenti', age: 'Inserisci un\'età valida.', req: 'Compila questo campo.', mail: 'Inserisci un\'email valida.', dup: 'Questa email o telefono è già registrato.', cFile: 'vertex-team-contract.html', cTitle: 'Contratto Team Vertex', sTitle: 'CANDIDATURA RICEVUTA!', sDesc: 'Vertex valuterà la tua candidatura e ti contatterà se necessario.<br><br>Grazie per l\'interesse.',
        agreeFormat: 'Accetto i <a href="{tf}" target="_blank"><b>{tos}</b></a> e l\'<a href="{pf}" target="_blank"><b>{priv}</b></a>.',
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

@keyframes joinFadeInUp {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
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
    opacity: 0;
    animation: joinFadeInUp 1s ease-out forwards;
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
    white-space: nowrap;
}
.checkbox-label a {
    color: var(--primary);
    text-decoration: none;
    transition: color 0.3s;
}
.checkbox-label a:hover {
    text-decoration: underline;
}
@media (max-width: 768px) {
    .checkbox-label {
        white-space: normal;
    }
}


.checkbox-label input[type="checkbox"] {
    width: 24px !important;
    height: 24px !important;
    min-width: 24px !important;
    min-height: 24px !important;
    max-width: 24px !important;
    max-height: 24px !important;
    flex-shrink: 0;
    display: block;
    box-sizing: border-box;
    aspect-ratio: 1 / 1;
    margin: 0;

    appearance: none;
    -webkit-appearance: none;
    
    
    border: 2px solid var(--border-color);
    border-radius: 6px;
    background-color: transparent;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
    
}
.checkbox-label input[type="checkbox"]:checked {
    background-color: var(--primary);
    border-color: var(--primary);
}
.checkbox-label input[type="checkbox"]:checked::after {
    content: '';
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    border: solid var(--btn-text-color);
    border-width: 0 2px 2px 0;
    animation: checkAnim 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
@keyframes checkAnim {
    0% { height: 0; width: 0; opacity: 0; }
    100% { height: 11px; width: 4px; opacity: 1; }
}


.join-submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* intl-tel-input theme overrides */
.iti__country-list {
    background-color: var(--bg-card) !important;
    color: var(--text-color) !important;
    border: 1px solid var(--border-color) !important;
}
.iti__country-name {
    color: var(--text-color) !important;
}
.iti__country:hover, .iti__country.iti__highlight {
    background-color: var(--bg-elevated) !important;
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
 text-align: center;}

.doctrine-text-container {
    padding: 5px 25px 15px 25px;
    overflow-y: auto;
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--text-muted);
    flex: 1;
    white-space: pre-line;
    text-align: center;
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.doctrine-text-container::-webkit-scrollbar {
    display: none;
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

/* Success Modal CSS */
.success-modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);
    z-index: 9999; display: none; align-items: center; justify-content: center;
    padding: 20px; opacity: 0; transition: opacity 0.3s ease;
}
.success-modal-overlay.show { opacity: 1; }
.success-modal-content {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 24px;
    max-width: 500px; width: 100%;
    padding: 40px; text-align: center;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    outline: 2px solid var(--primary);
    outline-offset: -10px;
}
.success-svg { 
    width: 80px; height: 80px; border-radius: 50%; display: block; 
    stroke-width: 4; stroke: var(--primary); stroke-miterlimit: 10; 
    margin: 0 auto 20px auto; box-shadow: inset 0px 0px 0px var(--primary); 
    animation: successFill .4s ease-in-out .4s forwards, successScale .3s ease-in-out .9s both; 
}
.success-circle { 
    stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 4; stroke-miterlimit: 10; 
    stroke: var(--primary); fill: none; 
    animation: successStroke .6s cubic-bezier(0.65, 0, 0.45, 1) forwards; 
}
.success-check { 
    transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; 
    animation: successStroke .3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards; 
}
@keyframes successStroke { 100% { stroke-dashoffset: 0; } }
@keyframes successScale { 0%, 100% { transform: none; } 50% { transform: scale3d(1.1, 1.1, 1); } }
@keyframes successFill { 100% { box-shadow: inset 0px 0px 0px 30px transparent; } }

.success-modal-content h3 { font-size: 1.8rem; margin-bottom: 15px; color: var(--text-color); }
.success-modal-content p { font-size: 1.1rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 30px; }
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
                <input type="url" id="joinLinkedin" pattern="https?://.*" title="Must start with http:// or https://">
            </div>
            <div class="form-group">
                <label>${info.labels[5]}</label>
                <input type="url" id="joinGithub" pattern="https?://.*" title="Must start with http:// or https://">
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
                    <input type="checkbox" id="contractCheck" required>
                    <span>${info.contractLabel}</span>
                </label>
                <label class="checkbox-label" id="doctrineLabelWrapper">
                    <input type="checkbox" id="doctrineCheck" required>
                    <span>${info.doctrineLabel}</span>
                </label>
            </div>

            <button type="submit" class="join-submit-btn" id="submitBtn" disabled>${info.submitBtn}</button>
            </form>
    </div>
</div>

<!-- Doctrine Modal -->
<div class="doctrine-modal-overlay" id="doctrineModal">
    <div class="doctrine-modal-content">
        <h2>Vertex</h2>
        <div class="doctrine-text-container" id="doctrineScroll">
            ${info.doctrineText}
        </div>
        <button type="button" class="doctrine-read-btn disabled" id="doctrineReadBtn" disabled>${info.readBtn} (10 ${info.waitSec})</button>
    </div>
</div>

<!-- Success Modal -->
<div class="success-modal-overlay" id="successModal">
    <div class="success-modal-content">
        <svg class="success-svg" viewBox="0 0 52 52">
            <circle class="success-circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="success-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        <h3>${info.successTitle}</h3>
        <p>${info.successDesc}</p>
        <button type="button" class="join-submit-btn" onclick="window.location.href='index.html'">${info.backBtn}</button>
    </div>
</div>

    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/intlTelInput.min.js"></script>
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

    const langToCountry = {
        'tr': 'tr', 'en': 'us', 'ar': 'ae', 'az': 'az', 'de': 'de', 'es': 'es', 'fr': 'fr', 'hi': 'in',
        'id': 'id', 'it': 'it', 'ja': 'jp', 'ko': 'kr', 'nl': 'nl', 'pt': 'pt', 'ru': 'ru', 'zh': 'cn'
    };
    const defaultCountry = langToCountry['${info.folder}'] || 'us';
    
    const phoneInput = document.querySelector("#joinPhone");
    const iti = window.intlTelInput(phoneInput, {
      initialCountry: defaultCountry,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.js",
      separateDialCode: true,
      preferredCountries: ['tr', 'gb']
    });

    
    // Form Logic
    const termsCheck = document.getElementById('termsCheck');
    const doctrineCheck = document.getElementById('doctrineCheck');
    const contractCheck = document.getElementById('contractCheck');
    const submitBtn = document.getElementById('submitBtn');
    const ageInput = document.getElementById('joinAge');
    
    function checkFormValidity() {
        if (termsCheck.checked && doctrineCheck.checked && contractCheck.checked) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }
    
    termsCheck.addEventListener('change', checkFormValidity);
    contractCheck.addEventListener('change', checkFormValidity);
    doctrineCheck.addEventListener('change', checkFormValidity);

    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9+]/g, '');
    });

    // Modal Logic
    const modal = document.getElementById('doctrineModal');
    const openBtn = document.getElementById('openDoctrineBtn');
    const readBtn = document.getElementById('doctrineReadBtn');
    const scrollBox = document.getElementById('doctrineScroll');
    
    let timerInterval = null;
    let secondsLeft = 10;
    let timerStarted = false;

    function tickTimer() {
        secondsLeft--;
        if (secondsLeft > 0) {
            readBtn.innerText = '${info.readBtn} (' + secondsLeft + ' ${info.waitSec})';
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            readBtn.innerText = '${info.readBtn}';
            readBtn.disabled = false;
            readBtn.classList.remove('disabled');
            readBtn.classList.add('active');
        }
    }

    function startTimer() {
        if(timerStarted) return;
        timerStarted = true;
        
        readBtn.innerText = '${info.readBtn} (' + secondsLeft + ' ${info.waitSec})';
        timerInterval = setInterval(tickTimer, 1000);
    }

    function resetTimer() {
        if (secondsLeft <= 0) return; // Already finished
        clearInterval(timerInterval);
        timerInterval = null;
        timerStarted = false;
        secondsLeft = 10;
        readBtn.innerText = '${info.readBtn}';
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (timerStarted && secondsLeft > 0) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
        } else {
            if (timerStarted && secondsLeft > 0 && !timerInterval) {
                timerInterval = setInterval(tickTimer, 1000);
            }
        }
    });

    const doctrineLabelWrapper = document.getElementById('doctrineLabelWrapper');
    
    // Fallback for direct btn calls if any
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
        setTimeout(() => {
            if (scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight - 50) {
                startTimer();
            }
        }, 100);
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            resetTimer();
        }
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
        checkFormValidity();
    });

    doctrineCheck.addEventListener('click', (e) => {
        if (!readBtn.classList.contains('active')) {
            e.preventDefault();
            openBtn.click();
        }
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
            phone: iti.getNumber(),
            age: document.getElementById('joinAge').value,
            linkedin: document.getElementById('joinLinkedin').value,
            github: document.getElementById('joinGithub').value,
            about: document.getElementById('joinAbout').value,
            language: '${info.folder}'
        };

        const checkUrl = 'https://firestore.googleapis.com/v1/projects/vertex-ai-1618/databases/(default)/documents:runQuery';
        const checkQuery = {
            structuredQuery: {
                from: [{ collectionId: 'contributors' }],
                where: {
                    compositeFilter: {
                        op: 'OR',
                        filters: [
                            { fieldFilter: { field: { fieldPath: 'email' }, op: 'EQUAL', value: { stringValue: data.email } } },
                            { fieldFilter: { field: { fieldPath: 'phone' }, op: 'EQUAL', value: { stringValue: data.phone } } }
                        ]
                    }
                }
            }
        };

        fetch(checkUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(checkQuery)
        })
        .then(res => res.json())
        .then(queryRes => {
            if (queryRes.length > 0 && queryRes[0].document) {
                alert('${info.dupErr}');
                btn.textContent = originalText;
                btn.disabled = false;
                return;
            }
            // Proceed to create
            return fetch('https://europe-west1-vertex-ai-1618.cloudfunctions.net/createVertexContributor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) throw new Error('Network error');
                return response.json();
            })
            .then(result => {
                const successModal = document.getElementById('successModal');
                successModal.style.display = 'flex';
                setTimeout(() => successModal.classList.add('show'), 10);
                document.getElementById('joinForm').reset();
            });
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
            
            const itiCss = `\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/css/intlTelInput.css" />
<style>
.iti { width: 100%; }
.iti__flag-container, .iti__selected-flag { background: transparent !important; }
.iti__flag { background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/img/flags.png"); }
@media (min-resolution: 2x) { .iti__flag { background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/img/flags@2x.png"); } }
</style>\n`;
            
            headerHtml = headerHtml.replace('</head>', itiCss + formCss + '\n</head>');
            
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

            // 3. Generate Contract Page using en/terms-of-service.html template
            const tosPath = path.join(baseDir, 'en', 'terms-of-service.html');
            const tosHtml = fs.readFileSync(tosPath, 'utf-8');
            
            const containerStart = tosHtml.indexOf('<div class="container">');
            const tosHeader = tosHtml.substring(0, containerStart + '<div class="container">'.length);
            const tosFooter = '\n  </div>\n</body>\n</html>';
            
            let contractHeaderHtml = tosHeader.replace(/<title>.*?<\/title>/, `<title>${info.contractTitle} | Vertex</title>`);
            contractHeaderHtml = contractHeaderHtml.replace(/<meta property="og:.*?>/g, '');
            contractHeaderHtml = contractHeaderHtml.replace(/<meta name="twitter:.*?>/g, '');
            contractHeaderHtml = contractHeaderHtml.replace('</head>', `  <meta property="og:title" content="${info.contractTitle} | Vertex" />
  <meta property="og:description" content="Vertex ${info.contractTitle}" />
  <meta property="og:url" content="https://vertexishere.com/${lang}/${info.contractFile}" />
  <meta property="og:image" content="https://vertexishere.com/assets/favicon.webp" />
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${info.contractTitle} | Vertex" />
  <meta name="twitter:description" content="Vertex ${info.contractTitle}" />
  <meta name="twitter:image" content="https://vertexishere.com/assets/favicon.webp" />
</head>`);

            
            // Format the contract content for HTML
            let formattedContent = info.contractContent.trim();
            // Remove the first line (title) because we already use <h1>
            let firstNewline = formattedContent.indexOf('\n');
            if (firstNewline !== -1) {
                formattedContent = formattedContent.substring(firstNewline).trim();
            }
            
            // Format headings
            formattedContent = formattedContent.split('\n').map(line => {
                let trimmed = line.trim();
                if (trimmed.match(/^(?:\d+\.\s+.*|Onay Beyanı|Consent Statement|Giriş ve Kapsam|Introduction and Scope)$/)) {
                    return `\n<h2 style="margin-top: 40px; margin-bottom: 10px; font-size: 1.5em; color: var(--text-primary-color);">${trimmed}</h2>`;
                }
                return line;
            }).join('\n');
            
            const contractHtml = `
            <h1 style="margin-bottom: 30px;">${info.contractTitle}</h1>
            <div style="white-space: pre-line; line-height: 1.7; color: var(--text-secondary-color); font-size: 1.05rem; padding-bottom: 50px;" class="contract-text-body">
${formattedContent}
            </div>
            `;
            
            const contractPageContent = contractHeaderHtml + '\n' + contractHtml + '\n  </div>\n</body>\n</html>';
            const contractFilePath = path.join(baseDir, lang, info.contractFile);
            fs.writeFileSync(contractFilePath, contractPageContent);
            console.log('Generated contract page for:', contractFilePath);
        }
    }
});
