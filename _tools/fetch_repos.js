// GitHub API'den repo verisi çek (saatlik cache ile)
const ORG = 'VertexCorporation';
const CACHE_KEY = 'vertex_repos_cache';
const HOUR_KEY = 'vertex_repos_hour';

async function fetchRepos() {
  try {
    const now = new Date();
    const currentHour = now.getHours();
    const cachedHour = parseInt(localStorage.getItem(HOUR_KEY) || '-1');
    
    // Aynı saatte ise cache'den döndür
    if (cachedHour === currentHour) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        console.log(`✅ Cache'den yükleniyor (Saat: ${currentHour}:00)`);
        const cached_repos = JSON.parse(cached);
        console.log(`📊 İlk repo: ${cached_repos[0].name} (${cached_repos[0].stars} ⭐)`);
        return cached_repos;
      }
    }
    
    // Yeni saate girdiyse API'den çek
    console.log(`🔄 API'den çekiliyor (Saat: ${currentHour}:00)...`);
    const response = await fetch(`https://api.github.com/users/${ORG}/repos?per_page=100`);
    const repos = await response.json();
    
    const processed = repos.map(repo => ({
      name: repo.name,
      description: repo.description || 'No description',
      language: repo.language || 'Other',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url
    }));
    
    // Star'a göre sırala (yüksekten düşüğe) - b - a = büyükleri başa
    processed.sort((a, b) => b.stars - a.stars);
    
    console.log(`📊 İlk 3 repo:`);
    processed.slice(0, 3).forEach(r => console.log(`  ⭐ ${r.name}: ${r.stars} stars`));
    
    // Cache'e kaydet
    localStorage.setItem(CACHE_KEY, JSON.stringify(processed));
    localStorage.setItem(HOUR_KEY, String(currentHour));
    console.log(`✅ ${processed.length} repo kaydedildi (Saat: ${currentHour}:00)`);
    
    return processed;
  } catch (error) {
    console.error('API Error:', error);
    
    // Hata durumunda cache'den döndür
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      console.log('⚠️  API hatası, cache kullanılıyor');
      return JSON.parse(cached);
    }
    return [];
  }
}

function createRepoCard(repo, lang = 'en') {
  const translations = {
    en: { view: 'Explore Repo', active: 'Active' },
    tr: { view: 'Repo\'yu İncele', active: 'Aktif' },
    hi: { view: 'रिपो देखें', active: 'सक्रिय' },
    ar: { view: 'استكشاف المستودع', active: 'نشط' },
    de: { view: 'Repo erkunden', active: 'Aktiv' },
    fr: { view: 'Explorer le Repo', active: 'Actif' },
    es: { view: 'Explorar Repo', active: 'Activo' },
    pt: { view: 'Explorar Repo', active: 'Ativo' },
    ru: { view: 'Посмотреть репо', active: 'Активно' },
    ja: { view: 'リポを表示', active: 'アクティブ' },
    ko: { view: '리포 보기', active: '활성' },
    zh: { view: '查看仓库', active: '活跃' },
    it: { view: 'Esplora Repo', active: 'Attivo' },
    nl: { view: 'Repo verkennen', active: 'Actief' },
    id: { view: 'Jelajahi Repo', active: 'Aktif' },
    az: { view: 'Repo\'yu Kəş Et', active: 'Aktiv' }
  };

  const t = translations[lang] || translations.en;
  const langColor = {
    'Python': '#3572A5',
    'JavaScript': '#F1E05A',
    'TypeScript': '#2B7A0B',
    'HTML': '#E34C26',
    'Dart': '#00B4AB',
    'C#': '#239120',
    'Other': '#858585'
  };

  return `
    <div class="repo-card">
      <div class="repo-header">
        <div class="repo-title">
          <svg class="repo-icon" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
          </svg>
          ${repo.name}
        </div>
        <span class="repo-status">${t.active}</span>
      </div>
      <p class="repo-desc">${repo.description}</p>
      <div class="repo-meta">
        <span class="meta-item"><span class="repo-lang-color" style="background: ${langColor[repo.language] || langColor['Other']};"></span>${repo.language}</span>
        <span class="meta-item">⭐ ${repo.stars}</span>
        <span class="meta-item">🔱 ${repo.forks}</span>
      </div>
      <a href="${repo.url}" target="_blank" class="btn btn-outline btn-repo">${t.view}</a>
    </div>`;
}

// HTML sayfasında kullan:
// <div id="repo-grid" class="repo-grid fade-up"></div>
// <script src="_tools/fetch_repos.js"></script>
// <script>
//   (async () => {
//     const repos = await fetchRepos();
//     const grid = document.getElementById('repo-grid');
//     grid.innerHTML = repos.map(r => createRepoCard(r, 'en')).join('');
//   })();
// </script>
