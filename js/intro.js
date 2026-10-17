// Fit the server-rendered first frame before the scroll scene initializes.
// The heading stays one line even if fonts finish loading or the viewport changes.
(function fitFirstFrame() {
  var title = document.querySelector('.story-static-content .story-title');
  if (!title) return;
  function fit() {
    if (!title.closest('.story-static-content')) {
      window.removeEventListener('resize', fit);
      return;
    }
    var available = Math.max(1, window.innerWidth - (window.innerWidth < 700 ? 28 : 40));
    var naturalWidth = Math.max(1, title.scrollWidth);
    var scale = Math.min(1, available / naturalWidth);
    title.style.transform = 'translateX(-50%) scale(' + scale.toFixed(4) + ')';
  }
  fit();
  window.addEventListener('resize', fit, {passive:true});
  if (document.fonts) document.fonts.ready.then(fit);
})();

setTimeout(async function () {
  'use strict';

  var hero = document.querySelector('.hero#home');
  var statsSection = document.querySelector('.stats');
  var sponsorsSection = document.querySelector('.partners-static');
  if (!hero || !window.d3 || !window.topojson) return;

  // Match the first HTML frame before measuring or replacing its title.
  if(document.fonts){await document.fonts.load('112px Anton');await document.fonts.ready;}
  var originalTitle = hero.querySelector('h1');
  var originalLede = hero.querySelector('.lede');
  var originalActions = Array.prototype.slice.call(hero.querySelectorAll('.hero-actions a'));
  var joinAction=document.querySelector('.nav-right a.btn[href*="join"],.nav-right a.btn[href*="katil"]');
  var originalLogos = sponsorsSection ? sponsorsSection.querySelector('.partners-logos') : null;
  var sponsorLogoMarkup = originalLogos ? originalLogos.innerHTML : '';
  // A second visual-only copy makes the rightward CSS marquee seamless.
  var sponsorLoopMarkup = sponsorLogoMarkup.replace(/<img\b/g, '<img aria-hidden="true"');
  var lang = (document.documentElement.lang || 'en').toLowerCase().split('-')[0];
  var scrollCopy={"tr":"Kaydır","en":"Scroll","de":"Scrollen","fr":"Défiler","es":"Desplazar","it":"Scorri","pt":"Rolar","nl":"Scrollen","ru":"Прокрутите","ar":"مرّر","hi":"स्क्रॉल करें","id":"Gulir","ja":"スクロール","ko":"스크롤","zh":"滚动","az":"Sürüşdür"};
  var sponsorCopy = {
    tr: 'Destekleyenler', en: 'Sponsored by', de: 'Unterstützt von', fr: 'Soutenu par',
    es: 'Patrocinado por', it: 'Con il supporto di', pt: 'Patrocinado por', nl: 'Mede mogelijk gemaakt door',
    ru: 'При поддержке', ar: 'بدعم من', hi: 'द्वारा समर्थित', id: 'Didukung oleh',
    ja: 'スポンサー', ko: '후원', zh: '合作伙伴', az: 'Dəstəkləyənlər'
  };
  // Public-facing values are supplied by Vertex; verify against analytics/HR before publishing updates.
  var proofStatsLabels = {"en":["Countries Reached","Total Downloads","People Who Worked at Vertex","Monthly Active Users","Average Team Age","Years Active","Social Media Reach"],"tr":["Ulaşılan Ülke","Toplam İndirme","Emektar Sayısı","Aylık Aktif Kullanıcı","Ortalama Yaş","Faaliyet Süresi (Yıl)","Sosyal Medya Erişimi"],"de":["Erreichte Länder","Downloads insgesamt","Ehemalige und aktuelle Mitwirkende","Monatlich Aktive Nutzer","Durchschnittsalter","Aktive Jahre","Social-Media-Reichweite"],"fr":["Pays touchés","Téléchargements","Personnes ayant contribué","Utilisateurs actifs mensuels","Âge moyen de l'équipe","Années d'activité","Portée sur les réseaux"],"es":["Países alcanzados","Descargas totales","Personas que han colaborado","Usuarios activos mensuales","Edad media del equipo","Años de actividad","Alcance en redes sociales"],"it":["Paesi raggiunti","Download totali","Persone che hanno contribuito","Utenti attivi mensili","Età media del team","Anni di attività","Copertura sui social"],"pt":["Países alcançados","Downloads totais","Pessoas que contribuíram","Utilizadores ativos mensais","Idade média da equipa","Anos de atividade","Alcance nas redes sociais"],"nl":["Bereikte landen","Totale downloads","Mensen die hebben bijgedragen","Maandelijks actieve gebruikers","Gemiddelde teamleeftijd","Jaren actief","Bereik op sociale media"],"ru":["Страны присутствия","Всего загрузок","Участники за всё время","Активные пользователи в месяц","Средний возраст команды","Лет работы","Охват в соцсетях"],"ar":["الدول التي وصلنا إليها","إجمالي التنزيلات","المساهمون عبر السنوات","المستخدمون النشطون شهريًا","متوسط عمر الفريق","سنوات النشاط","الوصول عبر التواصل الاجتماعي"],"hi":["जुड़े हुए देश","कुल डाउनलोड","अब तक के योगदानकर्ता","मासिक सक्रिय उपयोगकर्ता","टीम की औसत उम्र","सक्रिय वर्ष","सोशल मीडिया पहुँच"],"id":["Negara yang dijangkau","Total unduhan","Orang yang pernah berkontribusi","Pengguna aktif bulanan","Usia rata-rata tim","Tahun beroperasi","Jangkauan media sosial"],"ja":["展開国数","累計ダウンロード","これまでの貢献者","月間アクティブユーザー","チームの平均年齢","活動年数","SNSリーチ"],"ko":["진출 국가","누적 다운로드","역대 기여 인원","월간 활성 사용자","팀 평균 연령","활동 기간(년)","소셜 미디어 도달"],"zh":["覆盖国家","累计下载","历年贡献者","月活跃用户","团队平均年龄","运营年数","社交媒体触达"],"az":["Əhatə olunan ölkələr","Ümumi endirmələr","İndiyədək töhfə verənlər","Aylıq aktiv istifadəçilər","Komandanın orta yaşı","Fəaliyyət ili","Sosial media əhatəsi"]};
  var proofStatsValues = {
    tr: ['190+', '100B+', '1B+', '10B+', '16', '3', '10M+'],
    default: ['190+', '100K+', '1K+', '10K+', '16', '3', '10M+']
  };

  var identityCopy = {
    "en": [
      "A vertex is the point where two or more lines meet. In anatomy, it represents the highest point; in astronomy, the zenith; in geometry, a fundamental structural element; in network theory, the node where connections converge; and in optics, the point where light comes into focus.",
      "That's why we chose the name Vertex, which encompasses all these meanings and more. Founded in Istanbul in 2023, we began operating in over 190 countries. In line with the meaning of Vertex, we will demonstrate our full potential and reach the top together; we will bring prosperity to humanity and shape the technologies of tomorrow."
    ],
    "tr": [
      "Vertex, iki veya daha fazla doğrunun birleştiği noktadır. Anatomide en yüksek noktayı; astronomide başucu noktasını; geometride temel bir yapı elemanını; ağ teorisinde bağlantıların birleştiği merkez düğümü; optikte ise ışığın odaklandığı noktayı temsil eder.",
      "İşte bu yüzden bütün bu anlamları ve daha fazlasını kapsayan Vertex ismini seçtik. 2023 yılında İstanbul'da kurulduk ve 190'dan fazla ülkede faaliyet göstermeye başladık. Vertex isminin anlamına uygun olarak potansiyelimizin tamamını ortaya koyup hep birlikte zirveye ulaşacağız; insanlığa refah sağlayacak ve geleceğin teknolojilerine yön vereceğiz."
    ],
    "de": [
      "Ein Vertex ist der Punkt, an dem sich zwei oder mehr Linien treffen. In der Anatomie bezeichnet er den höchsten Punkt, in der Astronomie den Zenit, in der Geometrie ein grundlegendes Strukturelement, in der Netzwerktheorie den Knotenpunkt, an dem Verbindungen zusammenlaufen, und in der Optik den Punkt, an dem Licht gebündelt wird.",
      "Deshalb haben wir den Namen Vertex gewählt, der all diese Bedeutungen und mehr vereint. Wir wurden 2023 in Istanbul gegründet und nahmen unsere Tätigkeit in über 190 Ländern auf. Im Sinne unseres Namens werden wir unser volles Potenzial entfalten und gemeinsam den Gipfel erreichen, zum Wohlstand der Menschheit beitragen und die Technologien von morgen gestalten."
    ],
    "fr": [
      "Un vertex est le point où deux lignes ou plus se rencontrent. En anatomie, il représente le point le plus élevé ; en astronomie, le zénith ; en géométrie, un élément structurel fondamental ; en théorie des réseaux, le nœud où convergent les connexions ; et en optique, le point où la lumière se concentre.",
      "C'est pourquoi nous avons choisi le nom Vertex, qui réunit toutes ces significations et bien d'autres. Fondés à Istanbul en 2023, nous avons commencé à exercer nos activités dans plus de 190 pays. Fidèles au sens de notre nom, nous révélerons tout notre potentiel et atteindrons ensemble les sommets ; nous contribuerons à la prospérité de l'humanité et façonnerons les technologies de demain."
    ],
    "es": [
      "Un vértice es el punto donde se encuentran dos o más líneas. En anatomía, representa el punto más alto; en astronomía, el cenit; en geometría, un elemento estructural fundamental; en teoría de redes, el nodo donde convergen las conexiones; y en óptica, el punto donde se concentra la luz.",
      "Por eso elegimos el nombre Vertex, que reúne todos estos significados y muchos más. Fundada en Estambul en 2023, nuestra organización comenzó a operar en más de 190 países. Fieles al significado de Vertex, desplegaremos todo nuestro potencial y alcanzaremos juntos la cima; contribuiremos al bienestar de la humanidad y daremos forma a las tecnologías del mañana."
    ],
    "it": [
      "Un vertice è il punto in cui si incontrano due o più linee. In anatomia rappresenta il punto più alto; in astronomia, lo zenit; in geometria, un elemento strutturale fondamentale; nella teoria delle reti, il nodo in cui convergono le connessioni; e in ottica, il punto in cui la luce si concentra.",
      "Ecco perché abbiamo scelto il nome Vertex, che racchiude tutti questi significati e molti altri. Fondata a Istanbul nel 2023, la nostra organizzazione ha iniziato a operare in oltre 190 Paesi. Fedeli al significato di Vertex, esprimeremo tutto il nostro potenziale e raggiungeremo insieme la vetta, contribuendo al benessere dell'umanità e plasmando le tecnologie di domani."
    ],
    "pt": [
      "Um vértice é o ponto onde duas ou mais linhas se encontram. Na anatomia, representa o ponto mais alto; na astronomia, o zênite; na geometria, um elemento estrutural fundamental; na teoria das redes, o nó onde as conexões convergem; e na óptica, o ponto onde a luz se concentra.",
      "Foi por isso que escolhemos o nome Vertex, que reúne todos estes significados e muitos outros. Fundada em Istambul em 2023, a nossa organização começou a atuar em mais de 190 países. Fiéis ao significado de Vertex, vamos alcançar todo o nosso potencial e chegar juntos ao topo, contribuindo para a prosperidade da humanidade e moldando as tecnologias de amanhã."
    ],
    "nl": [
      "Een vertex is het punt waar twee of meer lijnen samenkomen. In de anatomie staat het voor het hoogste punt, in de astronomie voor het zenit, in de meetkunde voor een fundamenteel bouwelement, in de netwerktheorie voor het knooppunt waar verbindingen samenkomen en in de optica voor het punt waar licht wordt gebundeld.",
      "Daarom kozen we de naam Vertex, die al deze betekenissen en meer omvat. We zijn in 2023 opgericht in Istanbul en begonnen actief te worden in meer dan 190 landen. In lijn met de betekenis van Vertex willen we ons volledige potentieel benutten en samen de top bereiken, bijdragen aan de welvaart van de mensheid en de technologieën van morgen vormgeven."
    ],
    "ru": [
      "Вершина — это точка, в которой сходятся две или более линии. В анатомии она обозначает самую высокую точку, в астрономии — зенит, в геометрии — основополагающий структурный элемент, в теории сетей — узел пересечения связей, а в оптике — точку фокусировки света.",
      "Именно поэтому мы выбрали название Vertex, объединяющее все эти значения и многое другое. Основанная в Стамбуле в 2023 году, наша компания начала работать более чем в 190 странах. Следуя смыслу названия Vertex, мы раскроем весь свой потенциал и вместе достигнем вершины, будем способствовать процветанию человечества и создавать технологии будущего."
    ],
    "ar": [
      "الرأس هو النقطة التي يلتقي عندها خطان أو أكثر. وفي علم التشريح يمثّل أعلى نقطة، وفي علم الفلك سمت الرأس، وفي الهندسة عنصرًا بنيويًا أساسيًا، وفي نظرية الشبكات العقدة التي تتلاقى عندها الروابط، وفي البصريات النقطة التي يتركز فيها الضوء.",
      "لهذا اخترنا اسم Vertex الذي يجمع هذه المعاني كلها وأكثر. تأسسنا في إسطنبول عام 2023 وبدأنا العمل في أكثر من 190 دولة. وانطلاقًا من معنى اسم Vertex، سنطلق كامل إمكاناتنا ونصل معًا إلى القمة، وسنسهم في ازدهار البشرية ونشكّل تقنيات الغد."
    ],
    "hi": [
      "वर्टेक्स वह बिंदु है जहाँ दो या अधिक रेखाएँ मिलती हैं। शरीर रचना विज्ञान में यह सबसे ऊँचे बिंदु का, खगोल विज्ञान में शीर्ष बिंदु का, ज्यामिति में एक मूलभूत संरचनात्मक तत्व का, नेटवर्क सिद्धांत में संपर्कों के संगम का और प्रकाशिकी में प्रकाश के केंद्रित होने वाले बिंदु का प्रतीक है।",
      "इसीलिए हमने Vertex नाम चुना, जिसमें ये सभी अर्थ और बहुत कुछ समाहित है। 2023 में इस्तांबुल में स्थापित होने के बाद हमने 190 से अधिक देशों में कार्य करना शुरू किया। Vertex नाम की भावना के अनुरूप हम अपनी पूरी क्षमता को सामने लाकर साथ मिलकर शिखर तक पहुँचेंगे, मानवता की समृद्धि में योगदान देंगे और कल की तकनीकों को आकार देंगे।"
    ],
    "id": [
      "Vertex adalah titik pertemuan dua garis atau lebih. Dalam anatomi, istilah ini melambangkan titik tertinggi; dalam astronomi, zenit; dalam geometri, elemen struktur mendasar; dalam teori jaringan, simpul tempat berbagai koneksi bertemu; dan dalam optik, titik tempat cahaya terfokus.",
      "Itulah alasan kami memilih nama Vertex, yang mencakup semua makna tersebut dan lebih banyak lagi. Didirikan di Istanbul pada 2023, kami mulai beroperasi di lebih dari 190 negara. Sesuai makna Vertex, kami akan mengembangkan seluruh potensi kami dan bersama-sama mencapai puncak, meningkatkan kesejahteraan umat manusia, serta membentuk teknologi masa depan."
    ],
    "ja": [
      "頂点とは、2本以上の線が交わる点です。解剖学では最も高い位置、天文学では天頂、幾何学では基本的な構成要素、ネットワーク理論ではつながりが集まる中心のノード、光学では光が集まる焦点を意味します。",
      "私たちがVertexという名前を選んだのは、こうした意味のすべて、そしてそれ以上の可能性を込めたかったからです。2023年にイスタンブールで設立され、190を超える国々で活動を開始しました。Vertexの名にふさわしく、私たちは可能性を最大限に引き出し、共に頂点を目指し、人類の繁栄に貢献しながら未来のテクノロジーを形づくります。"
    ],
    "ko": [
      "버텍스는 두 개 이상의 선이 만나는 점입니다. 해부학에서는 가장 높은 지점, 천문학에서는 천정, 기하학에서는 기본적인 구조 요소, 네트워크 이론에서는 연결이 모이는 중심 노드, 광학에서는 빛이 집중되는 초점을 뜻합니다.",
      "우리가 Vertex라는 이름을 선택한 이유는 이 모든 의미와 그 이상의 가능성을 담고 있기 때문입니다. 2023년 이스탄불에서 설립된 우리는 190개 이상의 국가에서 활동을 시작했습니다. Vertex라는 이름에 걸맞게 잠재력을 온전히 발휘하고 함께 정상에 오르며, 인류의 번영에 기여하고 미래의 기술을 만들어 나가겠습니다."
    ],
    "zh": [
      "顶点是两条或多条线相交的点。在解剖学中，它代表最高点；在天文学中，它是天顶；在几何学中，它是基本结构元素；在网络理论中，它是连接汇聚的中心节点；在光学中，它是光线聚焦之处。",
      "这正是我们选择 Vertex 这个名字的原因：它涵盖了所有这些含义，甚至更多。我们于 2023 年在伊斯坦布尔创立，并开始在 190 多个国家开展业务。秉承 Vertex 之名的寓意，我们将充分释放潜能，携手登上高峰，为人类创造繁荣，并塑造未来的科技。"
    ],
    "az": [
      "Vertex iki və ya daha çox xəttin birləşdiyi nöqtədir. Anatomiyada ən yüksək nöqtəni, astronomiyada zeniti, həndəsədə əsas struktur elementini, şəbəkə nəzəriyyəsində əlaqələrin qovuşduğu mərkəzi düyünü, optikada isə işığın fokuslandığı nöqtəni ifadə edir.",
      "Məhz buna görə bütün bu mənaları və daha artığını özündə birləşdirən Vertex adını seçdik. 2023-cü ildə İstanbulda təsis olunduq və 190-dan çox ölkədə fəaliyyətə başladıq. Vertex adının mənasına uyğun olaraq bütün potensialımızı ortaya qoyub birlikdə zirvəyə çatacaq, bəşəriyyətin rifahına töhfə verəcək və gələcəyin texnologiyalarını formalaşdıracağıq."
    ]
  };

  var title = originalTitle ? originalTitle.textContent.trim() : 'The Peak of Technology';
  var identity = identityCopy[lang] || identityCopy.en;
  var sponsorLabel = sponsorCopy[lang] || sponsorCopy.en;

  function actionMarkup(action, className) {
    if (!action) return '';
    return '<a class="btn ' + className + '" href="' + action.getAttribute('href') + '">' + action.textContent.trim() + '</a>';
  }

  // Keep the same semantic heading across first paint and the scroll scene.
  // There is no second title to crossfade into and no reflow into two lines.
  var preservedTitle = originalTitle;
  hero.classList.add('story-hero');hero.classList.remove('story-static');
  hero.innerHTML = '' +
    '<div class="story-stage">' +

      '<div class="story-geometry" aria-hidden="true"><svg viewBox="0 0 800 800" fill="none" stroke="currentColor"><circle cx="400" cy="400" r="300"/><circle cx="400" cy="400" r="210"/><ellipse cx="400" cy="400" rx="110" ry="300"/><ellipse cx="400" cy="400" rx="230" ry="300"/><ellipse cx="400" cy="400" rx="300" ry="105"/><path d="M400 100 660 250 660 550 400 700 140 550 140 250Z M140 250 660 550 M660 250 140 550 M400 100V700 M100 400H700 M140 250H660 M140 550H660 M250 140 550 660 M550 140 250 660"/><circle cx="400" cy="100" r="5"/><circle cx="660" cy="250" r="5"/><circle cx="140" cy="550" r="5"/></svg></div>' +
      '<div class="story-sponsors"><span>' + sponsorLabel + '</span><div class="story-sponsor-viewport">' +
        '<div class="story-sponsor-track"><div class="story-sponsor-group">' + sponsorLogoMarkup + '</div>' +
        '<div class="story-sponsor-group" aria-hidden="true">' + sponsorLoopMarkup + '</div></div>' +
      '</div></div>' +
      '<div class="story-proof" role="group" aria-label="Vertex statistics"><div class="story-proof-viewport">' +
        '<div class="story-proof-track"><div class="story-proof-group"></div><div class="story-proof-group" aria-hidden="true"></div></div>' +
      '</div></div>' +
      '<div class="story-globe-wrap"><canvas class="story-globe" aria-label="Graphic globe focused on Türkiye"></canvas></div>' +
      '<p class="story-statement"></p>' +
      '<p class="story-metrics"></p>' +
      '<div class="story-actions">' + actionMarkup(originalActions[0], 'btn-primary') + actionMarkup(joinAction || originalActions[1], 'btn-ghost') + '</div>' +
      '<div class="story-scroll-cue" aria-hidden="true"><span></span>'+(scrollCopy[lang]||scrollCopy.en)+'</div>' +
    '</div>';

  if (statsSection) statsSection.classList.add('story-relocated');
  if (sponsorsSection) sponsorsSection.classList.add('story-relocated');

  var stage = hero.querySelector('.story-stage');
  if (preservedTitle) {
    stage.querySelector('.story-geometry').after(preservedTitle);
  } else {
    var fallbackTitle = document.createElement('h1');
    fallbackTitle.className = 'story-title';
    fallbackTitle.textContent = title;
    stage.querySelector('.story-geometry').after(fallbackTitle);
  }
  var header = document.querySelector('header');
  var geometry = hero.querySelector('.story-geometry');
  var lastGlobeFrame = '';
  var titleEl = hero.querySelector('.story-title');
  // One-line title: measure its natural (untransformed) width and fit it inside the viewport.
  // Fonts and orientation changes remeasure the exact same heading, not cloned words.
  titleEl.textContent = title;
  titleEl.setAttribute('aria-label', title);
  var titleLayout = null;
  function measureTitle() {
    titleLayout = {
      width: Math.max(1, titleEl.scrollWidth),
      height: titleEl.scrollHeight
    };
  }
  measureTitle();
  if (document.fonts) document.fonts.ready.then(function(){measureTitle();requestRender();});
  var sponsorsEl = hero.querySelector('.story-sponsors');
  var proofEl = hero.querySelector('.story-proof');
  var proofGroups = proofEl.querySelectorAll('.story-proof-group');
  var proofLabels = proofStatsLabels[lang] || proofStatsLabels.en;
  var proofValues = lang === 'tr' ? proofStatsValues.tr : proofStatsValues.default;
  for (var pi = 0; pi < proofLabels.length; pi++) {
    var item = document.createElement('div');
    item.className = 'story-proof-item';
    var label = document.createElement('span');
    label.className = 'story-proof-label';
    label.textContent = proofLabels[pi];
    var value = document.createElement('strong');
    value.className = 'story-proof-value';
    value.textContent = proofValues[pi];
    item.appendChild(label);
    item.appendChild(value);
    proofGroups[0].appendChild(item);
    proofGroups[1].appendChild(item.cloneNode(true));
  }
  proofEl.setAttribute('aria-label', lang === 'tr' ? 'Vertex istatistikleri' : 'Vertex statistics');
  var globeWrap = hero.querySelector('.story-globe-wrap');
  var canvas = hero.querySelector('.story-globe');
  var statementEl = hero.querySelector('.story-statement');
  var metricsEl = hero.querySelector('.story-metrics');
  statementEl.textContent = identity[0];
  metricsEl.textContent = identity[1];
  var actionsEl = hero.querySelector('.story-actions');
  var cueEl = hero.querySelector('.story-scroll-cue');
  actionsEl.addEventListener('click',function(event){var link=event.target.closest('a');if(!link)return;var href=link.getAttribute('href');if(href&&href.charAt(0)==='#'){var target=document.querySelector(href);if(target){event.preventDefault();event.stopPropagation();target.style.animation='none';window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-(header?header.offsetHeight:0),behavior:'instant'});history.replaceState(null,'',href);}}});
  var context = canvas.getContext('2d');
  if(!context)return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var worldFeatures = null;
  var turkey = null;
  var spreadCountries = [];
  var graticule = d3.geoGraticule10();
  var ticking = false;

  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
  function phase(value, start, end) { return clamp((value - start) / (end - start), 0, 1); }
  function smooth(value) { return value * value * (3 - 2 * value); }
  function mix(start, end, amount) { return start + (end - start) * amount; }
  function reveal(element, amount, distance) {
    amount = smooth(clamp(amount, 0, 1));
    element.style.opacity = amount.toFixed(3);
    element.style.transform = 'translate3d(-50%,' + ((1 - amount) * distance).toFixed(2) + 'px,0)';
  }

  function drawGlobe(progress, turkeyFill, worldSpread) {
    if (!worldFeatures) return;
    var cssSize = globeWrap.clientWidth;
    var dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    var visualScale = 2.5;
    var size = Math.max(700, Math.min(window.innerWidth < 700 ? 1100 : 1920, Math.round(cssSize * visualScale * dpr)));
    if (canvas.width !== size || canvas.height !== size) {
      canvas.width = size;
      canvas.height = size;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
    }

    var signature = [progress.toFixed(3), size, document.documentElement.getAttribute('data-theme')].join(':');
    if(signature === lastGlobeFrame)return;
    lastGlobeFrame = signature;
    var centre = size / 2;
    var radius = size * .445;
    var turn = smooth(phase(progress, .23, .54));
    var longitude = mix(-102, 28.9784, turn) + 360 * smooth(phase(progress,.80,.97));
    var latitude = mix(12, 41.0082, turn);
    var projection = d3.geoOrthographic()
      .translate([centre, centre])
      .scale(radius)
      .rotate([-longitude, -latitude])
      .clipAngle(90)
      .precision(.3);
    var path = d3.geoPath(projection, context);
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    var ocean = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
    var land = dark ? '#4d5158' : '#c8c9c5';
    var spreadLand = dark ? '#ffffff' : '#000000';
    var border = dark ? '#0e1013' : '#fafaf9';

    context.clearRect(0, 0, size, size);
    context.beginPath(); path({ type: 'Sphere' });
    context.fillStyle = ocean; context.fill();
    context.beginPath(); path(graticule);
    context.strokeStyle = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.09)';
    context.lineWidth = Math.max(.65, size * .00095); context.stroke();

    worldFeatures.forEach(function (country) {
      context.beginPath(); path(country);
      context.fillStyle = land; context.fill();
      context.strokeStyle = border;
      context.lineWidth = Math.max(.55, size * .0011); context.stroke();
    });

    if (turkey) {
      context.save();
      context.globalAlpha = smooth(turkeyFill);
      context.beginPath(); path(turkey);
      context.fillStyle = '#e11d2e'; context.fill();
      context.strokeStyle = dark ? '#ffffff' : '#9f1120';
      context.lineWidth = Math.max(1, size * .0021); context.stroke();
      context.restore();
    }

    if (worldSpread > 0 && spreadCountries.length) {
      spreadCountries.forEach(function (country, index) {
        var order = index / Math.max(1, spreadCountries.length - 1);
        var countryFade = smooth(phase(worldSpread, order * .84, order * .84 + .16));
        if (countryFade <= 0) return;
        context.save();
        context.globalAlpha = countryFade;
        context.beginPath(); path(country);
        context.fillStyle = spreadLand; context.fill();
        context.strokeStyle = dark ? '#11141a' : '#ffffff';
        context.lineWidth = Math.max(.5, size * .0010); context.stroke();
        context.restore();
      });
    }

    context.beginPath(); path({ type: 'Sphere' });
    context.strokeStyle = dark ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.28)';
    context.lineWidth = Math.max(.7, size * .0017); context.stroke();
  }

  function render() {
    var bounds=hero.getBoundingClientRect();
    if(bounds.bottom<0||bounds.top>window.innerHeight){if(header){header.style.transform='';header.style.opacity='';header.style.pointerEvents='';header.inert=false;}ticking=false;return;}
    var travel = Math.max(1, hero.offsetHeight - stage.offsetHeight);
    var progress = reduced ? 1 : clamp((window.scrollY - hero.offsetTop) / travel, 0, 1);
    var sponsorIn = phase(progress, .06, .17) * (1 - phase(progress, .25, .34));
    var globeIn = phase(progress, .10, .30);
    // The first story starts as Türkiye turns red; the second waits until the world has filled.
    // Each paragraph owns a long, non-overlapping scroll interval for unhurried reading.
    var turkeyFill = phase(progress, .42, .56);
    var worldSpread = phase(progress, .50, .79);
    var statementIn = phase(progress, .42, .50) * (1 - phase(progress, .73, .79));
    var metricsIn = phase(progress, .79, .85) * (1 - phase(progress, .955, .985));
    // Restore the opening composition before the navigation and final buttons return.
    // The globe must vanish first; then the title returns to its original position.
    var ending=smooth(phase(progress,.955,1));
    var actionsIn = Math.max(1-phase(progress,.015,.09),phase(progress,.97,.995));
    var titleLift = reduced ? 0 : smooth(phase(progress,.015,.26)) * (1-smooth(phase(progress,.925,.965)));

    var headerHide = reduced ? 0 : smooth(phase(progress,.035,.16)) * (1-smooth(phase(progress,.965,.995)));
    if(header){header.style.transform=headerHide===0?'none':'translate3d(0,'+(-110*headerHide).toFixed(2)+'%,0)';header.style.opacity=String(1-headerHide);header.inert=headerHide>.95;header.style.pointerEvents=headerHide>.95?'none':'';}
    stage.style.setProperty('--story-header-space',((1-headerHide)*68).toFixed(1)+'px');
    var geometryOpacity=reduced?0:Math.max(1-smooth(phase(progress,.10,.30)),ending);
    geometry.style.opacity=String(geometryOpacity);
    // One title uses a consistent difference blend against both ocean and land.
    titleEl.style.mixBlendMode='difference';
    titleEl.style.color='#fff';
    geometry.style.transform='translate3d(-50%,-50%,0) scale('+mix(1,1.4,smooth(phase(progress,.05,.30))*(1-ending))+') rotate('+mix(0,18,phase(progress,0,.30)*(1-ending))+'deg)';
    var layout = titleLayout;
    var lift = -Math.min(76, stage.clientHeight * .08) * titleLift;
    var fit = Math.min(1, Math.max(0.05, (stage.clientWidth - (window.innerWidth < 700 ? 28 : 40)) / layout.width));
    // Move up while shrinking, then grow back smoothly; never change line count or opacity.
    var shrink = smooth(phase(progress, .015, .24));
    var grow = smooth(phase(progress, .28, .56));
    var motionScale = mix(mix(1, .84, shrink), 1, grow);
    var scale = fit * motionScale;
    titleEl.style.transform = 'translate3d(-50%,' + lift.toFixed(2) + 'px,0) scale(' + scale.toFixed(4) + ')';
    titleEl.style.opacity = '1';
    // Use the actual transformed single-line heading to place sponsors and paragraphs.
    var titleBottom = titleEl.getBoundingClientRect().bottom - stage.getBoundingClientRect().top;
    actionsEl.style.top = (titleBottom + 26) + 'px';
    actionsEl.style.pointerEvents = actionsIn < .05 ? 'none' : '';
    actionsEl.inert = actionsIn < .05;
    if(!reduced){
      // Keep the new statistics card directly below sponsors without colliding with the headline.
      var sponsorsHeight = sponsorsEl.offsetHeight;
      var proofHeight = proofEl.offsetHeight;
      var combinedHeight = sponsorsHeight + proofHeight + 14;
      var targetTop = Math.max(titleBottom + 20, Math.min(306, window.innerHeight * .34));
      var sponsorTop = Math.max(titleBottom + 12, Math.min(targetTop, stage.clientHeight - combinedHeight - 34));
      sponsorsEl.style.top = sponsorTop + 'px';
      proofEl.style.top = (sponsorTop + sponsorsHeight + 14) + 'px';
      [statementEl,metricsEl].forEach(function(panel){panel.style.top=Math.max(titleBottom+24,Math.min(306,window.innerHeight*.34))+'px';});
    }
    reveal(sponsorsEl, sponsorIn, 28);
    reveal(proofEl, sponsorIn, 28);
    reveal(globeWrap, globeIn, 42);
    reveal(statementEl, statementIn, 34);
    reveal(metricsEl, metricsIn, 34);
    reveal(actionsEl, actionsIn, 28);
    // Fully hide the globe before the heading settles back under the restored header.
    canvas.style.opacity = String(reduced?0:1-smooth(phase(progress,.875,.93)));
    globeWrap.style.setProperty('--ending-scale',String(mix(1,.72,smooth(phase(progress,.80,.93)))));
    cueEl.style.opacity = String(1 - phase(progress, .02, .12));
    drawGlobe(progress, turkeyFill, worldSpread);
    ticking = false;
  }

  function requestRender() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(render);
    }
  }

  Promise.all([
    fetch('../assets/geo/countries-110m.json', { credentials: 'same-origin' }),
    fetch('../assets/geo/turkiye-detail.json', { credentials: 'same-origin' })
  ])
    .then(function (responses) {
      responses.forEach(function (response) { if (!response.ok) throw new Error(response.status); });
      return Promise.all(responses.map(function (response) { return response.json(); }));
    })
    .then(function (data) {
      var worldTopology = data[0];
      worldFeatures = topojson.feature(worldTopology, worldTopology.objects.countries).features;
      turkey = data[1];
      spreadCountries = worldFeatures
        .filter(function (country) { return String(country.id) !== '792'; })
        .sort(function (a, b) {
          return d3.geoDistance(d3.geoCentroid(a), [28.9784, 41.0082]) -
            d3.geoDistance(d3.geoCentroid(b), [28.9784, 41.0082]);
        });
      render();
    })
    .catch(function () { globeWrap.style.display = 'none'; });

  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', function(){measureTitle();requestRender();}, { passive: true });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) requestRender(); });
  new MutationObserver(requestRender).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  render();
  stage.classList.add('story-ready');
},750);
