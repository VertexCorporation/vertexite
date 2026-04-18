import os
import glob
import re

html_files = glob.glob('*/index.html') + ['en/index.html', 'tr/index.html', 'hi/index.html']
html_files = list(set(html_files))

marquee_html = '''
    <!-- Partners / Collaborators Section -->
    <section class="collaborators-section">
      <div class="marquee-container fade-up">
        <div class="marquee-content">
          <!-- İŞ BİRLİKÇİLERİ LOGOLARI -->
          <a href="#" class="marquee-item"><img src="../assets/partners/fal.webp" alt="Fal.ai" onerror="this.src='../assets/favicon.webp'"></a>
          <a href="#" class="marquee-item"><img src="../assets/partners/openrouter.webp" alt="OpenRouter" onerror="this.src='../assets/favicon.webp'"></a>
          <a href="#" class="marquee-item"><img src="../assets/partners/googlecloud.webp" alt="Google Cloud" onerror="this.src='../assets/favicon.webp'"></a>
          <a href="#" class="marquee-item"><img src="../assets/partners/cloudflare.webp" alt="Cloudflare" onerror="this.src='../assets/favicon.webp'"></a>
          
          <!-- Sonsuz döngü için logolar (marquee animasyonu) -->
          <a href="#" class="marquee-item"><img src="../assets/partners/fal.webp" alt="Fal.ai" onerror="this.src='../assets/favicon.webp'"></a>
          <a href="#" class="marquee-item"><img src="../assets/partners/openrouter.webp" alt="OpenRouter" onerror="this.src='../assets/favicon.webp'"></a>
          <a href="#" class="marquee-item"><img src="../assets/partners/googlecloud.webp" alt="Google Cloud" onerror="this.src='../assets/favicon.webp'"></a>
          <a href="#" class="marquee-item"><img src="../assets/partners/cloudflare.webp" alt="Cloudflare" onerror="this.src='../assets/favicon.webp'"></a>
        </div>
      </div>
    </section>
'''

for fpath in html_files:
    if os.path.isfile(fpath):
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        if 'collaborators-section' not in content:
            # Find the closing tag of section id="home"
            # It should be </section> after the stats-container
            # We can find '<!-- About Section -->' and insert before it
            if '<!-- About Section -->' in content:
                content = content.replace('<!-- About Section -->', marquee_html + '\n    <!-- About Section -->')

        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
print("Done fix2.")
