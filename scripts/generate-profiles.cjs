const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const languages = [
  'ar', 'az', 'de', 'en', 'es', 'fr', 'hi', 'id',
  'it', 'ja', 'ko', 'nl', 'pt', 'ru', 'tr', 'zh'
];

const linksTitles = {
  tr: 'Bağlantılar',
  en: 'Links',
  de: 'Links',
  fr: 'Liens',
  es: 'Enlaces',
  it: 'Link',
  pt: 'Links',
  nl: 'Links',
  ru: 'Ссылки',
  ar: 'الروابط',
  hi: 'लिंक्स',
  id: 'Tautan',
  ja: 'リンク',
  ko: '링크',
  zh: '链接',
  az: 'Keçidlər'
};

const biographies = {
  tr: `<p>Öğretmen babamla sürekli yer değiştirirken derin yoksulluğa; sokaklara kaybettiğimiz arkadaşlara ve sağlık hizmetlerine erişemeyen ailelere tanık oldum. Motivasyonum, bu acıları ortadan kaldırmak. Atatürk’ün Türkiye’yi kalkındırma yolculuğunu başlatmasının üzerinden bir yüzyıl geçti; onun görevi henüz tamamlanmadı.</p><p>Nihai hedefim küresel Eudaimonia, yani insanların gerçek anlamda esenliğe ve refaha ulaşması. Anlamlı bir etkiyi büyütmenin en hızlı yolunu sunduğu için teknolojiyi seçtim.</p><p>Lise öğrencileri olarak onlarca ret ve hukuki engelle karşılaşmamıza rağmen Cortex’i geliştirdik ve pazarlama harcaması yapmadan dünya genelinde organik olarak 100.000’den fazla kullanıcıya ulaştık.</p><p>Vertex’te geçirdiğim üç yılda binlerce insana, yüzlerce zorlukta liderlik ettim. Her insanın içinde saklı bir kıvılcım olduğuna inanıyorum. En büyük gücüm, bu kıvılcımları ortak bir ateşe dönüştürmek.</p><p>Teknopark Lisesi’ni iki puanla kaçırdım. Öğrenci olarak giremediğim yere bir girişim kurup CEO olarak döndüm. Üç yıl sonra Vertex, Teknopark’ın kuluçka programına girdi. Bir kapı kapandı; ben de başka bir kapıyı açtım.</p><p>On yıl içinde dünyanın en büyük şirketlerinden birine liderlik etmeyi; teknolojiyle Türkiye’yi kalkındırmayı ve dünya çapında refahı ilerletmeyi hedefliyorum. Benim için bu, çoktan yazılmış bir kader; tek görevim onu yaşamak.</p>`,

  en: `<p>Moving constantly with my teacher father, I witnessed extreme poverty; friends lost to the streets and families denied healthcare. My motivation is eradicating this suffering. A century after Atatürk began uplifting Türkiye, his mission remains unfinished.</p><p>My ultimate goal is global Eudaimonia, true human prosperity. I chose technology because it offers the fastest way to scale meaningful impact.</p><p>Despite dozens of rejections and legal hurdles as high schoolers, we built Cortex and organically reached 100,000+ global users without marketing spend.</p><p>Over three years at Vertex, I've led thousands of people through hundreds of challenges. I believe everyone carries a hidden spark, and my greatest strength is turning those sparks into collective fire.</p><p>I missed Teknopark High School by two points. Unable to enter as a student, I founded a startup and returned as a CEO. Three years later, Vertex entered Teknopark's incubation. One door closed, so I kicked down another.</p><p>In ten years, I intend to lead one of the world's largest companies, using technology to uplift Türkiye and advance prosperity worldwide. To me, this is already written destiny; my only job is to live it out.</p>`,

  de: `<p>Als ich mit meinem Vater, einem Lehrer, ständig umzog, erlebte ich extreme Armut; Freunde, die an die Straße verloren gingen, und Familien, denen die medizinische Versorgung verwehrt blieb. Meine Motivation ist es, dieses Leiden zu beenden. Ein Jahrhundert nachdem Atatürk begann, die Türkei aufzubauen, bleibt seine Mission unvollendet.</p><p>Mein oberstes Ziel ist globale Eudaimonia – wahrer menschlicher Wohlstand. Ich habe mich für Technologie entschieden, weil sie den schnellsten Weg bietet, bedeutende Wirkung zu skalieren.</p><p>Trotz dutzender Absagen und rechtlicher Hürden als Oberschüler bauten wir Cortex auf und erreichten ohne Marketingbudget organisch über 100.000 weltweite Nutzer.</p><p>In über drei Jahren bei Vertex habe ich Tausende von Menschen durch Hunderte von Herausforderungen geführt. Ich glaube, dass jeder Mensch einen verborgenen Funken in sich trägt, und meine größte Stärke ist es, diese Funken in ein gemeinsames Feuer zu verwandeln.</p><p>Ich habe die Teknopark-Oberschule um zwei Punkte verfehlt. Da ich nicht als Schüler eintreten konnte, gründete ich ein Startup und kehrte als CEO zurück. Drei Jahre später zog Vertex in die Inkubation von Teknopark ein. Eine Tür schloss sich, also trat ich eine andere ein.</p><p>In zehn Jahren beabsichtige ich, eines der größten Unternehmen der Welt zu leiten und Technologie einzusetzen, um die Türkei voranzubringen und den weltweiten Wohlstand zu fördern. Für mich ist dies ein bereits geschriebenes Schicksal; meine einzige Aufgabe ist es, es zu leben.</p>`,

  fr: `<p>En déménageant constamment avec mon père enseignant, j'ai été témoin d'une pauvreté extrême; des amis perdus dans la rue et des familles privées de soins. Ma motivation est d'éradiquer cette souffrance. Un siècle après qu'Atatürk a commencé à élever la Turquie, sa mission demeure inachevée.</p><p>Mon objectif ultime est l'Eudaimonia globale, la véritable prospérité humaine. J'ai choisi la technologie parce qu'elle offre le moyen le plus rapide d'amplifier un impact significatif.</p><p>Malgré des dizaines de refus et d'obstacles juridiques en tant que lycéens, nous avons développé Cortex et atteint organiquement plus de 100 000 utilisateurs dans le monde, sans aucun budget marketing.</p><p>Au cours de plus de trois ans chez Vertex, j'ai guidé des milliers de personnes à travers des centaines de défis. Je crois que chacun porte en soi une étincelle cachée, et ma plus grande force est de transformer ces étincelles en un feu collectif.</p><p>J'ai manqué le lycée Teknopark de deux points. Ne pouvant y entrer en tant qu'élève, j'ai fondé une startup et j'y suis retourné en tant que PDG. Trois ans plus tard, Vertex a rejoint l'incubateur de Teknopark. Une porte s'est fermée, alors j'en ai enfoncé une autre.</p><p>Dans dix ans, j'ai l'intention de diriger l'une des plus grandes entreprises du monde, en utilisant la technologie pour élever la Turquie et faire progresser la prospérité à l'échelle mondiale. Pour moi, c'est un destin déjà écrit; mon seul devoir est de l'accomplir.</p>`,

  es: `<p>Al mudarme constantemente con mi padre maestro, fui testigo de la pobreza extrema; amigos perdidos en las calles y familias sin acceso a la atención médica. Mi motivación es erradicar este sufrimiento. Un siglo después de que Atatürk comenzara a levantar a Turquía, su misión sigue inconclusa.</p><p>Mi objetivo final es la Eudaimonia global, la verdadera prosperidad humana. Elegí la tecnología porque ofrece la forma más rápida de escalar un impacto significativo.</p><p>A pesar de decenas de rechazos y obstáculos legales como estudiantes de secundaria, creamos Cortex y alcanzamos de forma orgánica a más de 100.000 usuarios globales sin gastar en marketing.</p><p>A lo largo de más de tres años en Vertex, he liderado a miles de personas a través de cientos de desafíos. Creo que todos llevan una chispa oculta, y mi mayor fortaleza es convertir esas chispas en un fuego colectivo.</p><p>Me quedé a dos puntos de entrar a la preparatoria Teknopark. Incapaz de entrar como estudiante, fundé una startup y regresé como CEO. Tres años después, Vertex ingresó a la incubadora de Teknopark. Se cerró una puerta, así que derribé otra.</p><p>En diez años, pretendo liderar una de las empresas más grandes del mundo, utilizando la tecnología para impulsar a Turquía y avanzar la prosperidad global. Para mí, este ya es un destino escrito; mi único trabajo es vivirlo.</p>`,

  it: `<p>Trasferendomi continuamente con mio padre insegnante, ho assistito a una povertà estrema; amici persi per strada e famiglie a cui venivano negati i servizi sanitari. La mia motivazione è sradicare questa sofferenza. Un secolo dopo che Atatürk ha iniziato a risollevare la Turchia, la sua missione è ancora incompiuta.</p><p>Il mio obiettivo finale è l'Eudaimonia globale, la vera prosperità umana. Ho scelto la tecnologia perché offre il modo più rapido per ampliare un impatto significativo.</p><p>Nonostante dozzine di rifiuti e ostacoli legali affrontati da studenti delle superiori, abbiamo creato Cortex e raggiunto organicamente oltre 100.000 utenti in tutto il mondo senza alcuna spesa di marketing.</p><p>In oltre tre anni in Vertex, ho guidato migliaia di persone attraverso centinaia di sfide. Credo che ognuno porti con sé una scintilla nascosta, e la mia più grande forza è trasformare quelle scintille in un fuoco collettivo.</p><p>Ho mancato il liceo Teknopark per due punti. Non potendo entrare come studente, ho fondato una startup e sono tornato come CEO. Tre anni dopo, Vertex è entrata nell'incubatore di Teknopark. Si è chiusa una porta, così ne ho sfondata un'altra.</p><p>Tra dieci anni intendo guidare una delle aziende più grandi del mondo, usando la tecnologia per risollevare la Turchia e promuovere la prosperità globale. Per me questo è un destino già scritto; il mio unico compito è viverlo.</p>`,

  pt: `<p>Mudando-me constantemente com meu pai professor, testemunhei a pobreza extrema; amigos perdidos para as ruas e famílias sem acesso à saúde. Minha motivação é erradicar esse sofrimento. Um século após Atatürk começar a erguer a Turquia, sua missão permanece inacabada.</p><p>Meu objetivo final é a Eudaimonia global, a verdadeira prosperidade humana. Escolhi a tecnologia porque ela oferece a maneira mais rápida de escalar um impacto significativo.</p><p>Apesar de dezenas de rejeições e barreiras legais como estudantes do ensino médio, criamos o Cortex e alcançamos organicamente mais de 100.000 usuários globais sem gastos com marketing.</p><p>Ao longo de mais de três anos na Vertex, liderei milhares de pessoas em centenas de desafios. Acredito que todos carregam uma faísca oculta, e minha maior força é transformar essas faíscas em um fogo coletivo.</p><p>Fiquei a dois pontos de entrar no ensino médio Teknopark. Incapaz de entrar como estudante, fundei uma startup e retornei como CEO. Três anos depois, a Vertex entrou na incubadora do Teknopark. Uma porta se fechou, então derrubei outra.</p><p>Em dez anos, pretendo liderar uma das maiores empresas do mundo, usando a tecnologia para elevar a Turquia e promover a prosperidade global. Para mim, este já é um destino escrito; meu único trabalho é vivê-lo.</p>`,

  nl: `<p>Doordat ik voortdurend verhuisde met mijn vader die leraar was, was ik getuige van extreme armoede; vrienden die verloren gingen aan de straat en gezinnen die geen gezondheidszorg kregen. Mijn motivatie is het uitbannen van dit lijden. Een eeuw nadat Atatürk begon met het opbouwen van Turkije, is zijn missie nog onvoltooid.</p><p>Mijn uiteindelijke doel is wereldwijde Eudaimonia, ware menselijke welvaart. Ik koos voor technologie omdat dit de snelste manier is om betekenisvolle impact op te schalen.</p><p>Ondanks tientallen afwijzingen en juridische hindernissen als middelbare scholieren, bouwden we Cortex en bereikten organisch meer dan 100.000 wereldwijde gebruikers zonder marketingbudget.</p><p>In meer dan drie jaar bij Vertex heb ik duizenden mensen door honderden uitdagingen geleid. Ik geloof dat iedereen een verborgen vonk in zich draagt, en mijn grootste kracht is om die vonken om te zetten in een gezamenlijk vuur.</p><p>Ik miste de Teknopark High School op twee punten na. Omdat ik er als leerling niet binnenkwam, richtte ik een startup op en keerde terug als CEO. Drie jaar later werd Vertex opgenomen in de incubator van Teknopark. Eén deur sloot, dus schopte ik een andere open.</p><p>Over tien jaar ben ik van plan een van de grootste bedrijven ter wereld te leiden, technologie in te zetten om Turkije vooruit te helpen en de wereldwijde welvaart te bevorderen. Voor mij is dit een al geschreven lotsbestemming; mijn enige taak is het waar te maken.</p>`,

  ru: `<p>Постоянно переезжая с отцом-учителем, я своими глазами видел крайнюю нищету: друзей, потерянных на улице, и семьи, лишенные медицинской помощи. Моя цель — положить конец этим страданиям. Спустя столетие после того, как Ататюрк начал возрождение Турции, его миссия остается незавершенной.</p><p>Моя высшая цель — глобальная Эвдемония, подлинное человеческое процветание. Я выбрал технологии, потому что они открывают самый быстрый путь к масштабным позитивным переменам.</p><p>Несмотря на десятки отказов и юридических барьеров в школьные годы, мы создали Cortex и органически привлекли более 100 000 пользователей по всему миру без единого доллара на маркетинг.</p><p>За три с лишним года в Vertex я провел тысячи людей через сотни испытаний. Я верю, что в каждом скрыта искра, и моя главная сила — превращать эти искры в общее пламя.</p><p>Мне не хватило двух баллов для поступления в лицей Текнопарк. Не сумев войти туда учеником, я основал стартап и вернулся как CEO. Спустя три года Vertex вошел в инкубатор Текнопарка. Одна дверь закрылась — и я выбил другую.</p><p>Через десять лет я намерен возглавить одну из крупнейших компаний мира, используя технологии для подъема Турции и роста благополучия во всем мире. Для меня это предначертанная судьба, и моя единственная задача — воплотить ее в жизнь.</p>`,

  az: `<p>Müəllim atamla daim yer dəyişdirərkən dərin yoxsulluğa; küçələrdə itirdiyimiz dostlara və səhiyyə xidmətlərindən məhrum qalan ailələrə şahid oldum. Məqsədim bu əzabları aradan qaldırmaqdır. Atatürkün Türkiyəni yüksəltmək yoluna çıxmasından bir əsr keçsə də, onun missiyası hələ tamamlanmayıb.</p><p>Əsas məqsədim qlobal Eudaimonia — insanların həqiqi rifaha və səadətə çatmasıdır. Əhəmiyyətli təsiri böyütməyin ən sürətli yolunu təqdim etdiyi üçün texnologiyanı seçdim.</p><p>Orta məktəb şagirdləri olaraq onlarla rədd cavabı və hüquqi maneələrlə qarşılaşsaq da, Cortex-i qurduq və heç bir marketinq xərci çəkmədən dünya üzrə üzvi şəkildə 100.000-dən çox istifadəçiyə çatdıq.</p><p>Vertex-də keçirdiyim üç ildən artıq müddətdə minlərlə insana, yüzlərlə çətinlikdə liderlik etdim. İnanıram ki, hər bir insanın daxilində gizli bir qığılcım var və mənim ən böyük gücüm bu qığılcımları ortaq bir alova çevirməkdir.</p><p>Teknopark Liseyini iki balla qaçırdım. Şagird kimi daxil ola bilmədiyim yerə startap qurub CEO kimi qayıtdım. Üç il sonra Vertex Teknoparkın inkubasiya mərkəzinə qəbul olundu. Bir qapı bağlandı, mən isə başqa bir qapını açdım.</p><p>On il ərzində dünyanın ən böyük şirkətlərindən birinə rəhbərlik etməyi, texnologiya ilə Türkiyəni ucaltmağı və bütün dünyada rifahı irəli aparmağı hədəfləyirəm. Mənim üçün bu artıq yazılmış bir taledir; yeganə vəzifəm onu yaşamaqdır.</p>`,

  ar: `<p>بسبب تنقلي المستمر مع والدي المعلم، شهدتُ الفقر المدقع؛ أصدقاء فقدناهم في الشوارع وعائلات حُرمت من الرعاية الصحية. دافعي الأكبر هو القضاء على هذه المعاناة. بعد قرن من بدء أتاتورك مسيرة النهوض بتركيا، لا تزال رسالته بحاجة إلى إكمال.</p><p>هدفي الأسمى هو تحقيق &quot;اليودايمونيا&quot; العالمية، أي الازدهار والرفاه الحقيقي للبشرية. اخترت التكنولوجيا لأنها توفر أسرع مسار لتوسيع نطاق التأثير ذي المعنى.</p><p>على الرغم من عشرات الرفض والعقبات القانونية ونحن طلاب في الثانوية، قمنا بتطوير Cortex ووصلنا بشكل طبيعي إلى أكثر من 100,000 مستخدم حول العالم دون إنفاق فلس واحد على التسويق.</p><p>خلال أكثر من ثلاث سنوات في Vertex، قدتُ آلاف الأشخاص عبر مئات التحديات. أؤمن أن كل إنسان يحمل شرارة خفية، وأعظم قوتي تكمن في تحويل تلك الشرارات إلى شعلة جماعية.</p><p>فاتني الالتحاق بثانوية تكنوبارك بفارق نقطتين فقط. ولأنني لم أتمكن من الدخول كطالب، أسست شركة ناشئة وعدت كرئيس تنفيذي. وبعد ثلاث سنوات، انضمت Vertex إلى حاضنة أعمال تكنوبارك. أُغلق باب، ففتحت باباً آخر بقوة.</p><p>في غضون عشر سنوات، أعتزم قيادة واحدة من أكبر الشركات في العالم، مستخدماً التكنولوجيا للنهوض بتركيا وتعزيز الازدهار عالمياً. بالنسبة لي، هذا قدر كُتب بالفعل، ومهمتي الوحيدة هي أن أعيشه.</p>`,

  hi: `<p>अपने शिक्षक पिता के साथ लगातार यात्रा करते हुए, मैंने अत्यधिक गरीबी देखी; दोस्तों को गलियों में खोते और परिवारों को स्वास्थ्य सेवा से वंचित होते देखा। मेरी प्रेरणा इस पीड़ा को समाप्त करना है। अतातुर्क द्वारा तुर्किये के उत्थान की शुरुआत के एक सदी बाद भी, उनका मिशन अभी अधूरा है।</p><p>मेरा अंतिम लक्ष्य वैश्विक यूडेमोनिया (Eudaimonia) यानी सच्ची मानवीय समृद्धि है। मैंने तकनीक को चुना क्योंकि यह सार्थक प्रभाव को सबसे तेज़ी से विस्तार देने का माध्यम है।</p><p>हाई स्कूल के छात्रों के रूप में दर्जनों अस्वीकृतियों और कानूनी बाधाओं के बावजूद, हमने Cortex बनाया और बिना किसी मार्केटिंग खर्च के विश्व स्तर पर 100,000+ उपयोगकर्ताओं तक जैविक रूप से पहुंचे।</p><p>Vertex में तीन से अधिक वर्षों में, मैंने सैकड़ों चुनौतियों में हज़ारों लोगों का नेतृत्व किया है। मेरा मानना है कि हर व्यक्ति में एक छिपी हुई चिंगारी होती है, और मेरी सबसे बड़ी ताकत उन चिंगारियों को एक सामूहिक मशाल में बदलना है।</p><p>मैं टेक्नोपार्क हाई स्कूल में दाखिले से सिर्फ दो अंकों से चूक गया। एक छात्र के रूप में प्रवेश न पा सकने पर, मैंने एक स्टार्टअप शुरू किया और सीईओ के रूप में लौटा। तीन साल बाद, Vertex टेक्नोपार्क के इन्क्यूबेशन में शामिल हुआ। एक दरवाज़ा बंद हुआ, तो मैंने दूसरा खोल दिया।</p><p>दस वर्षों में, मेरा इरादा दुनिया की सबसे बड़ी कंपनियों में से एक का नेतृत्व करने का है, तकनीक का उपयोग करके तुर्किये का उत्थान करने और दुनिया भर में समृद्धि को आगे बढ़ाने का है। मेरे लिए, यह पहले से लिखी हुई नियति है; मेरा एकमात्र काम इसे जीना है।</p>`,

  id: `<p>Terus berpindah bersama ayah saya yang seorang guru, saya menyaksikan kemiskinan ekstrem; teman-teman yang terjerumus ke jalanan dan keluarga yang tidak mendapat layanan kesehatan. Motivasi saya adalah memberantas penderitaan ini. Satu abad setelah Atatürk mulai memajukan Türkiye, misinya masih belum tuntas.</p><p>Tujuan utama saya adalah Eudaimonia global, kemakmuran manusia yang sejati. Saya memilih teknologi karena menawarkan cara tercepat untuk memperluas dampak yang bermakna.</p><p>Meskipun menghadapi puluhan penolakan dan hambatan hukum saat masih duduk di bangku SMA, kami membangun Cortex dan secara organik menjangkau lebih dari 100.000 pengguna global tanpa biaya pemasaran.</p><p>Selama lebih dari tiga tahun di Vertex, saya telah memimpin ribuan orang melalui ratusan tantangan. Saya percaya setiap orang membawa percikan tersembunyi, dan kekuatan terbesar saya adalah mengubah percikan-percikan itu menjadi api bersama.</p><p>Saya gagal masuk SMA Teknopark hanya selisih dua poin. Karena tidak bisa masuk sebagai murid, saya mendirikan startup dan kembali sebagai CEO. Tiga tahun kemudian, Vertex masuk inkubasi Teknopark. Satu pintu tertutup, maka saya mendobrak pintu lainnya.</p><p>Dalam sepuluh tahun, saya bertekad memimpin salah satu perusahaan terbesar di dunia, memanfaatkan teknologi untuk memajukan Türkiye dan meningkatkan kemakmuran global. Bagi saya, ini adalah takdir yang telah tertulis; tugas saya hanyalah menjalaninya.</p>`,

  ja: `<p>教師である父と共に転居を繰り返す中で、私は極度の貧困を目の当たりにしました。路上へと消えていった友人たちや、医療を受けられない家族たちです。私の原動力は、この苦しみを根絶することです。アタテュルクがトルコの復興を始めてから一世紀が経ちましたが、その使命はまだ完結していません。</p><p>私の究極の目標は、真の人類の繁栄であるグローバル・エウダイモニア（Eudaimonia）です。有意義なインパクトを最も迅速に拡大できる手段として、私はテクノロジーを選びました。</p><p>高校生の頃、数々の拒絶や法的障害に直面しながらも、私たちはCortexを開発し、マーケティング費用を一切かけずに世界中で10万人以上のユーザーにオーガニックに届けました。</p><p>Vertexでの3年以上の間、私は何百もの課題を通じて何千人もの人々を導いてきました。誰もが内に秘めた火花を持っていると信じており、私の最大の強みは、その火花を集団の炎へと変えることです。</p><p>私はわずか2点差でテクノパーク高校への入学を逃しました。生徒として入れなかった場所に、私はスタートアップを創業し、CEOとして戻ってきました。その3年後、Vertexはテクノパークのインキュベーション施設へと入居しました。一つの扉が閉ざされたなら、別の扉をこじ開ければいいのです。</p><p>10年以内に、私は世界最大級の企業を率い、テクノロジーによってトルコを発展させ、世界規模の繁栄を推進するつもりです。私にとって、これはすでに記された運命であり、私の務めはそれを生き抜くことだけです。</p>`,

  ko: `<p>교사이신 아버지를 따라 끊임없이 이사를 다니며 극심한 빈곤을 목격했습니다. 거리로 내몰린 친구들과 의료 혜택을 받지 못하는 가족들이었습니다. 저의 동기는 이러한 고통을 없애는 것입니다. 아타튀르크가 튀르키예의 부흥을 시작한 지 한 세기가 지났지만, 그의 사명은 아직 끝나지 않았습니다. </p><p>저의 궁극적인 목표는 진정한 인류의 번영인 글로벌 에우다이모니아(Eudaimonia)입니다. 유의미한 영향력을 가장 빠르게 확장할 수 있는 길이었기에 기술을 선택했습니다.</p><p>고등학생 시절 수십 번의 거절과 법적 장벽에 부딪히면서도 우리는 Cortex를 개발했고, 마케팅 비용 없이 유기적으로 전 세계 10만 명 이상의 사용자에게 도달했습니다.</p><p>Vertex에서의 3년 넘는 시간 동안 수천 명의 사람들과 수백 가지의 도전을 함께 헤쳐나갔습니다. 저는 모든 사람이 내면에 숨겨진 불꽃을 지니고 있다고 믿으며, 저의 가장 큰 강점은 그 불꽃들을 모아 하나의 거대한 불꽃으로 피워내는 것입니다.</p><p>저는 단 2점 차이로 테크노파크 고등학교 입학을 놓쳤습니다. 학생으로 들어가지 못한 곳에 스타트업을 창업하여 CEO로 돌아왔습니다. 3년 후, Vertex는 테크노파크 인큐베이션에 입주했습니다. 한쪽 문이 닫히면, 다른 문을 박차고 열면 됩니다.</p><p>10년 안에 저는 세계 최대 규모의 기업 중 하나를 이끌며, 기술을 통해 튀르키예를 도약시키고 전 세계의 번영을 이끌어갈 것입니다. 저에게 이것은 이미 쓰여진 운명이며, 저의 유일한 역할은 그것을 실현하는 것입니다.</p>`,

  zh: `<p>随着当教师的父亲不断迁徙，我亲眼目睹了极度的贫困：走上歧途的朋友，以及求医无门的家庭。我的动力正是消除这种苦难。在阿塔图尔克开启振兴土耳其之路一个世纪后，他的使命仍未完成。</p><p>我的终极目标是实现全球至善繁荣（Eudaimonia），即全人类真正的幸福与昌盛。我选择科技，是因为它能以最快的方式将深远的影响力规模化。</p><p>尽管高中时面临数十次拒绝和法律障碍，我们依然创立了Cortex，并在零营销预算的情况下，自然增长吸引了全球超过10万名用户。</p><p>在Vertex的三年多里，我带领成千上万人跨越了数百次挑战。我相信每个人心中都蕴藏着微光，而我最大的力量，就是将这些微光凝聚成燎原之火。</p><p>我曾以两分之差与科技园高中失之交臂。既然无法以学生的身份进入，我便创办了一家初创公司，以CEO的身份归来。三年后，Vertex成功入驻科技园孵化器。一扇门关闭了，我便踹开另一扇门。</p><p>十年之内，我立志掌舵全球顶尖企业之一，用科技振兴土耳其，并推动全世界的共同繁荣。对我而言，这已是注定的命运，而我唯一的使命就是去活出它。</p>`
};

const hreflangs = languages.map(l => `<link rel="alternate" hreflang="${l}" href="https://vertexishere.com/${l}/mustafa-caki">`).join('') +
  `<link rel="alternate" hreflang="x-default" href="https://vertexishere.com/en/mustafa-caki">`;

// Embedded critical styling guarantees 160px photo box and 20px link icons regardless of stylesheet cache status
const criticalStyle = `<style>
.profile-heading{display:flex;align-items:center;gap:32px;margin-bottom:48px;position:static;background:none;border:0;backdrop-filter:none;}
.profile-photo-box{width:160px;height:160px;min-width:160px;max-width:160px;aspect-ratio:1;border:1px solid var(--border-strong,#333);background:var(--surface,#15171B);border-radius:16px;overflow:hidden;display:flex;align-items:flex-end;justify-content:center;position:relative;flex-shrink:0;}
.profile-photo-box img{width:100%;height:100%;max-width:100%;max-height:100%;object-fit:cover;object-position:center 15%;display:block;}
.profile-link-icon{width:20px!important;height:20px!important;min-width:20px!important;max-width:20px!important;max-height:20px!important;flex-shrink:0!important;display:inline-block!important;vertical-align:middle;}
.profile-links a{display:flex!important;align-items:center!important;gap:12px!important;margin-top:14px!important;color:var(--text-muted)!important;text-decoration:none!important;font-size:15px!important;}
.profile-links a:hover{color:var(--text)!important;}
@media(max-width:700px){
  .profile-heading{gap:20px;}
  .profile-photo-box{width:110px!important;height:110px!important;min-width:110px!important;max-width:110px!important;border-radius:14px!important;}
}
</style>`;

for (const lang of languages) {
  const indexFile = path.join(root, lang, 'index.html');
  if (!fs.existsSync(indexFile)) {
    console.error(`Index file not found for ${lang}: ${indexFile}`);
    continue;
  }
  let html = fs.readFileSync(indexFile, 'utf8');

  const isTr = lang === 'tr';
  const role = isTr ? 'Kurucu Ortak &amp; CEO' : 'Co-Founder &amp; CEO';
  const jobTitle = isTr ? 'Kurucu Ortak & CEO' : 'Co-Founder & CEO';
  const title = isTr ? 'Mustafa Çakı | Kurucu Ortak & CEO · Vertex' : 'Mustafa Çakı | Co-Founder & CEO · Vertex';
  const desc = isTr
    ? "Mustafa Çakı, Vertex Kurucu Ortağı ve CEO'su. Yaşamı, teknoloji vizyonu ve profesyonel bağlantıları."
    : 'Mustafa Çakı, Co-Founder & CEO of Vertex. His story, technology vision and professional links.';
  const bio = biographies[lang] || biographies.en;
  const linksTitle = linksTitles[lang] || 'Links';

  // 1. Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);

  // 2. Replace meta description
  html = html.replace(/<meta content="[^"]*" name="description"\/>/, `<meta content="${desc}" name="description"/>`);
  html = html.replace(/<meta name="description" content="[^"]*"\/>/, `<meta content="${desc}" name="description"/>`);

  // 3. Replace og:title, og:description, twitter:title, twitter:description, og:url
  html = html.replace(/<meta content="[^"]*" property="og:title"\/>/g, `<meta content="${title}" property="og:title"/>`);
  html = html.replace(/<meta content="[^"]*" property="og:description"\/>/g, `<meta content="${desc}" property="og:description"/>`);
  html = html.replace(/<meta content="[^"]*" name="twitter:title"\/>/g, `<meta content="${title}" name="twitter:title"/>`);
  html = html.replace(/<meta content="[^"]*" name="twitter:description"\/>/g, `<meta content="${desc}" name="twitter:description"/>`);
  html = html.replace(/<meta property="og:url" content="[^"]*">/g, `<meta property="og:url" content="https://vertexishere.com/${lang}/mustafa-caki">`);
  html = html.replace(/<meta property="og:image" content="[^"]*">/g, `<meta property="og:image" content="https://vertexishere.com/assets/team/mustafa-caki-cutout.webp?v=20261017v2">`);
  html = html.replace(/<meta name="twitter:image" content="[^"]*">/g, `<meta name="twitter:image" content="https://vertexishere.com/assets/team/mustafa-caki-cutout.webp?v=20261017v2">`);

  // 4. Clean up any existing hreflangs and canonical from index.html head
  html = html.replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*">/g, '');
  html = html.replace(/<link rel="canonical" href="[^"]*">/g, '');

  // 5. Build canonical and hreflang block + critical styles
  const seoHeadBlock = `${hreflangs}<link rel="canonical" href="https://vertexishere.com/${lang}/mustafa-caki">` +
    `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Person","name":"Mustafa Çakı","jobTitle":"${jobTitle}","url":"https://vertexishere.com/${lang}/mustafa-caki","image":"https://vertexishere.com/assets/team/mustafa-caki-cutout.webp?v=20261017v2","worksFor":{"@type":"Organization","name":"Vertex","url":"https://vertexishere.com"},"sameAs":["https://www.linkedin.com/in/mustawtfa/","https://www.instagram.com/mustawtfa/"]}</script>` +
    criticalStyle;

  html = html.replace('</head>', `${seoHeadBlock}</head>`);

  // 6. Fix header nav links so anchors like #home become /{lang}/#home
  html = html.replace(/href="#([a-zA-Z0-9_-]+)"/g, `href="/${lang}/#$1"`);

  // 7. Update language dropdown items to link directly to /{l}/mustafa-caki
  html = html.replace(/<div class="lang-panel" role="menu">([\s\S]*?)<\/div>/, (match, inner) => {
    let updatedInner = inner;
    for (const l of languages) {
      const reg = new RegExp(`href="[^"]*\\b${l}\\/?"`, 'g');
      updatedInner = updatedInner.replace(reg, `href="/${l}/mustafa-caki"`);
    }
    updatedInner = updatedInner.replace(/class="lang-row active"/g, 'class="lang-row"');
    const activeReg = new RegExp(`href="/${lang}/mustafa-caki"`, 'g');
    updatedInner = updatedInner.replace(activeReg, `href="/${lang}/mustafa-caki" class="lang-row active"`);
    updatedInner = updatedInner.replace(/class="lang-row"\s+class="lang-row active"/g, 'class="lang-row active"');
    return `<div class="lang-panel" role="menu">${updatedInner}</div>`;
  });

  // 8. Replace <main>...</main> with profile page
  const mainContent = `<main class="profile-page wrap"><article><header class="profile-heading"><div class="profile-photo-box" style="width:160px;height:160px;min-width:160px;max-width:160px;aspect-ratio:1;border:1px solid var(--border-strong,#333);background:var(--surface,#15171B);border-radius:16px;overflow:hidden;display:flex;align-items:flex-end;justify-content:center;position:relative;flex-shrink:0;"><img src="/assets/team/mustafa-caki-cutout.webp?v=20261017v2" alt="Mustafa Çakı" fetchpriority="high" width="160" height="160" style="width:100%;height:100%;max-width:100%;max-height:100%;object-fit:cover;object-position:center 15%;display:block;border-radius:15px;"></div><div><h1>Mustafa Çakı</h1><p>${role} · Vertex</p></div></header><div class="profile-layout"><div class="profile-bio">${bio}</div><aside class="profile-links"><h2>${linksTitle}</h2><a href="https://www.linkedin.com/in/mustawtfa/" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:12px;margin-top:14px;color:var(--text-muted);text-decoration:none;font-size:15px;"><svg class="profile-link-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="width:20px;height:20px;min-width:20px;max-width:20px;max-height:20px;flex-shrink:0;display:inline-block;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg><span>LinkedIn ↗</span></a><a href="https://www.instagram.com/mustawtfa/" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:12px;margin-top:14px;color:var(--text-muted);text-decoration:none;font-size:15px;"><svg class="profile-link-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:20px;height:20px;min-width:20px;max-width:20px;max-height:20px;flex-shrink:0;display:inline-block;"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg><span>Instagram ↗</span></a></aside></div></article></main>`;

  html = html.replace(/<main>[\s\S]*?<\/main>/, mainContent);
  html = html.replace(/<main class="profile-page wrap">[\s\S]*?<\/main>/, mainContent);

  // Preserve the shared portrait mask and biography entrance when regenerating.
  html = html.replace(/<link[^>]*href="\/css\/pages\/profile-photo-fog\.css[^"]*"[^>]*>/g, '');
  html = html.replace('</head>', '<link rel="stylesheet" href="/css/pages/profile-photo-fog.css?v=polish261026f"></head>');
  html = html.replace(/site-design\.js(?:\?v=[^"]*)?/g, 'site-design.js?v=polish261026f');

  // Bump site-design.css query param
  html = html.replace(/site-design\.css(?:\?v=[^"]*)?/g, 'site-design.css?v=caki20261017v2');

  const outFile = path.join(root, lang, 'mustafa-caki.html');
  fs.writeFileSync(outFile, html, 'utf8');
  console.log(`Generated: ${path.relative(root, outFile)} (${lang})`);
}

console.log('Profile generation complete for all 16 languages with full native translations.');

