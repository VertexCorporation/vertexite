
import os
import datetime

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
SITEMAP_FILE = os.path.join(ROOT_DIR, 'sitemap.xml')
BASE_URL = "https://vertexishere.com"

# All languages including en, tr, hi
LANGS = [
    'en', 'tr', 'hi',
    'ar', 'az', 'pt', 'nl', 'id', 'it', 'es', 'ru', 'fr', 'ja', 'ko', 'zh', 'de'
]

DATE = datetime.date.today().strftime("%Y-%m-%d")

def generate_sitemap():
    xml = []
    xml.append('<?xml version="1.0" encoding="UTF-8"?>')
    xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
    xml.append('        xmlns:xhtml="http://www.w3.org/1999/xhtml"')
    xml.append('        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">')
    xml.append('')

    # Helper for hreflang block (same for all URLs)
    def get_hreflang_tags():
        tags = []
        for l in LANGS:
            tags.append(f'    <xhtml:link rel="alternate" hreflang="{l}" href="{BASE_URL}/{l}/" />')
        tags.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{BASE_URL}/en/" />')
        return '\n'.join(tags)

    hreflang_block = get_hreflang_tags()

    # 1. Main Language Pages
    for lang in LANGS:
        xml.append(f'  <!-- {lang.upper()} MAIN PAGE -->')
        xml.append('  <url>')
        xml.append(f'    <loc>{BASE_URL}/{lang}/</loc>')
        xml.append(f'    <lastmod>{DATE}</lastmod>')
        xml.append('    <changefreq>daily</changefreq>')
        xml.append('    <priority>1.0</priority>')
        xml.append('')
        xml.append(hreflang_block)
        xml.append('')
        xml.append('    <image:image>')
        xml.append(f'      <image:loc>{BASE_URL}/assets/og-image.jpg</image:loc>')
        # Title could be customized but English fallback is fine for sitemap metadata usually
        xml.append('      <image:title>Vertex - The Peak of Technology</image:title>')
        xml.append('    </image:image>')
        xml.append('  </url>')
        xml.append('')

    # 2. Root Redirect Page
    xml.append('  <!-- 🌐 ROOT REDIRECT PAGE -->')
    xml.append('  <url>')
    xml.append(f'    <loc>{BASE_URL}/</loc>')
    xml.append(f'    <lastmod>{DATE}</lastmod>')
    xml.append('    <priority>0.5</priority>')
    xml.append('  </url>')

    xml.append('</urlset>')
    
    return '\n'.join(xml)

if __name__ == '__main__':
    content = generate_sitemap()
    with open(SITEMAP_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
