/* Shared legal reader v1. Source snapshots remain readable during an outage. */
(() => {
  'use strict';
  const endpoint = 'https://europe-west1-vertex-ai-1618.cloudfunctions.net/getPublicLegalDocument';
  const tags = new Set([
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'P',
    'BR',
    'HR',
    'UL',
    'OL',
    'LI',
    'STRONG',
    'B',
    'EM',
    'I',
    'U',
    'S',
    'A',
    'BLOCKQUOTE',
    'TABLE',
    'THEAD',
    'TBODY',
    'TR',
    'TH',
    'TD',
    'DIV',
    'SECTION',
    'ARTICLE',
    'SPAN',
    'SMALL',
    'SUP',
    'SUB',
  ]);
  const discard = new Set([
    'SCRIPT',
    'STYLE',
    'IFRAME',
    'OBJECT',
    'EMBED',
    'FORM',
    'INPUT',
    'BUTTON',
    'TEXTAREA',
    'SELECT',
    'LINK',
    'META',
    'SVG',
    'MATH',
    'TEMPLATE',
  ]);
  function safeFragment(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    for (const node of [...template.content.querySelectorAll('*')]) {
      if (!tags.has(node.tagName)) {
        if (discard.has(node.tagName)) node.remove();
        else node.replaceWith(...node.childNodes);
        continue;
      }
      for (const attr of [...node.attributes]) {
        const allowed =
          ['class', 'lang', 'dir'].includes(attr.name) ||
          (node.tagName === 'A' && ['href', 'title'].includes(attr.name)) ||
          (['TD', 'TH'].includes(node.tagName) && ['colspan', 'rowspan'].includes(attr.name));
        if (!allowed) node.removeAttribute(attr.name);
      }
      if (node.tagName === 'A') {
        const href = node.getAttribute('href');
        if (href) {
          const url = new URL(href, location.href);
          if (!['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol)) node.removeAttribute('href');
        }
        node.setAttribute('rel', 'noopener noreferrer');
      }
    }
    return template.content;
  }
  const messages = {
    tr: [
      'Güncel metin yükleniyor…',
      'Güncel sürüm',
      'Güncel metne ulaşılamadı. Bu sayfada kayıtlı kaynak sürüm gösteriliyor.',
    ],
    en: [
      'Loading current text…',
      'Current version',
      'Current text unavailable. Showing the source version saved with this page.',
    ],
    de: [
      'Aktueller Text wird geladen…',
      'Aktuelle Version',
      'Aktueller Text nicht verfügbar. Die mit dieser Seite gespeicherte Quellversion wird angezeigt.',
    ],
    fr: [
      'Chargement du texte actuel…',
      'Version actuelle',
      'Texte actuel indisponible. La version source enregistrée avec cette page est affichée.',
    ],
    es: [
      'Cargando texto actual…',
      'Versión actual',
      'Texto actual no disponible. Se muestra la versión guardada con esta página.',
    ],
    it: [
      'Caricamento del testo attuale…',
      'Versione attuale',
      'Testo attuale non disponibile. È mostrata la versione salvata con questa pagina.',
    ],
    pt: [
      'A carregar o texto atual…',
      'Versão atual',
      'Texto atual indisponível. É apresentada a versão guardada com esta página.',
    ],
    nl: [
      'Actuele tekst laden…',
      'Huidige versie',
      'Actuele tekst niet beschikbaar. De bij deze pagina opgeslagen versie wordt getoond.',
    ],
    az: [
      'Cari mətn yüklənir…',
      'Cari versiya',
      'Cari mətn əlçatan deyil. Bu səhifədə saxlanılan mənbə versiyası göstərilir.',
    ],
    ru: [
      'Загрузка актуального текста…',
      'Текущая версия',
      'Актуальный текст недоступен. Показана версия, сохранённая на этой странице.',
    ],
    ar: ['جارٍ تحميل النص الحالي…', 'الإصدار الحالي', 'النص الحالي غير متاح. تُعرض النسخة المحفوظة مع هذه الصفحة.'],
    hi: [
      'वर्तमान पाठ लोड हो रहा है…',
      'वर्तमान संस्करण',
      'वर्तमान पाठ उपलब्ध नहीं है। इस पृष्ठ के साथ सहेजा गया संस्करण दिखाया जा रहा है।',
    ],
    id: [
      'Memuat teks terkini…',
      'Versi terkini',
      'Teks terkini tidak tersedia. Menampilkan versi yang tersimpan dengan halaman ini.',
    ],
    ja: [
      '最新の文書を読み込み中…',
      '現在のバージョン',
      '最新の文書を取得できません。このページに保存された版を表示しています。',
    ],
    ko: [
      '최신 문서를 불러오는 중…',
      '현재 버전',
      '최신 문서를 불러올 수 없습니다. 이 페이지에 저장된 버전을 표시합니다.',
    ],
    zh: ['正在加载最新文本…', '当前版本', '无法获取最新文本。正在显示随此页面保存的版本。'],
  };
  async function load(target) {
    const id = target.dataset.legalDocument;
    const message = messages[document.documentElement.lang?.split('-')[0]] || messages.en;
    const status = document.createElement('p');
    status.className = 'legal-source-status';
    status.setAttribute('role', 'status');
    status.textContent = message[0];
    target.after(status);
    target.setAttribute('aria-busy', 'true');
    const controller = new AbortController(),
      timer = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(endpoint + '?id=' + encodeURIComponent(id), {
        signal: controller.signal,
        credentials: 'omit',
      });
      if (!response.ok) throw new Error('LEGAL_UNAVAILABLE');
      const data = await response.json();
      if (
        data.schemaVersion !== 1 ||
        data.id !== id ||
        typeof data.html !== 'string' ||
        data.html.length > 180000 ||
        !Number.isSafeInteger(data.version) ||
        data.version < 0 ||
        !/^[a-f0-9]{64}$/.test(data.hash)
      )
        throw new Error('LEGAL_INVALID_RESPONSE');
      target.replaceChildren(safeFragment(data.html));
      target.dataset.legalVersion = String(data.version);
      target.dataset.legalHash = data.hash;
      status.textContent = message[1] + ': ' + data.version;
      if (target.id === 'doctrineScroll') {
        const check = document.getElementById('doctrineCheck');
        if (check) {
          check.checked = false;
          check.dispatchEvent(new Event('change', { bubbles: true }));
        }
        target.scrollTop = 0;
      } else if (data.title) document.title = data.title;
      document.dispatchEvent(
        new CustomEvent('vertex:legal-loaded', { detail: { id, version: data.version, hash: data.hash } }),
      );
    } catch {
      target.dataset.legalFallback = 'true';
      status.textContent = message[2];
    } finally {
      clearTimeout(timer);
      target.removeAttribute('aria-busy');
    }
  }
  document.querySelectorAll('[data-legal-document]').forEach((target) => {
    void load(target);
  });
})();
