import os
import glob
import re

html_files = glob.glob('*/index.html') + ['en/index.html', 'tr/index.html', 'hi/index.html']
html_files = list(set(html_files)) # deduplicate

for fpath in html_files:
    if os.path.isfile(fpath):
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Simplify Heading (regex to match both english and translated)
        # In english: <br>Shaping the Future</h1>
        # In TR: <br>Geleceği Şekillendiriyoruz</h1>
        # Let's just remove <br> and whatever follows until </h1>
        content = re.sub(r'<br>[^<]*</h1>', '</h1>', content)

        # Add Marquee after Hero Section
        if 'collaborators-section' not in content:
            marquee_html = '''
    </section>

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
    </section>'''
            content = content.replace('</section>\n\n    <!-- Statistics Section', marquee_html + '\n\n    <!-- Statistics Section')

        # Add Footer Details
        if 'Vertex Corporation Ltd' not in content:
            # Replaces the copyright block
            footer_regex = re.compile(r'<div class="copyright">[\s\n]*&copy; [0-9]+ Vertex Corporation. All rights reserved.[\s\n]*</div>', re.DOTALL | re.IGNORECASE)
            new_footer = '''<div class="copyright">
          &copy; 2026 Vertex Corporation Ltd. All rights reserved.<br>
          <span style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-top: 8px;">20 Wenlock Road, London, N1 7GU, United Kingdom | +44 7400 412824</span>
        </div>'''
            if footer_regex.search(content):
                content = footer_regex.sub(new_footer, content)
            else:
                # Try just replacing the specific string if regex fails
                content = content.replace('© 2025 Vertex Corporation. All rights reserved.', '&copy; 2026 Vertex Corporation Ltd. All rights reserved.<br><span style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-top: 8px;">20 Wenlock Road, London, N1 7GU, United Kingdom | +44 7400 412824</span>')

        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
print("HTML fix done.")
