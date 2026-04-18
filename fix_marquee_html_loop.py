import re
import glob

# For all translated and root HTML files
for fpath in glob.glob('*/index.html') + ['en/index.html', 'tr/index.html']:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Needs way more duplicates so it doesn't look empty when sliding
    # The current has 2 sets. Let's change the marquee-content completely.
    new_logos = """
          <!-- İŞ BİRLİKÇİLERİ LOGOLARI -->
          <a href="#" class="marquee-item"><img src="../assets/partners/fal.webp" alt="Fal.ai" onerror="this.src='../assets/favicon.webp'"></a>
          <a href="#" class="marquee-item"><img src="../assets/partners/openrouter.webp" alt="OpenRouter" onerror="this.src='../assets/favicon.webp'"></a>
          <a href="#" class="marquee-item"><img src="../assets/partners/googlecloud.webp" alt="Google Cloud" onerror="this.src='../assets/favicon.webp'"></a>
          <a href="#" class="marquee-item"><img src="../assets/partners/cloudflare.webp" alt="Cloudflare" onerror="this.src='../assets/favicon.webp'"></a>
"""
    # 4 sets of logos ensures enough width for smooth 50% translation without empty spaces
    content = re.sub(
        r'<div class="marquee-content">.*?</div>',
        f'<div class="marquee-content">{new_logos * 6}\n        </div>',
        content,
        flags=re.DOTALL
    )
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
print("done html")
