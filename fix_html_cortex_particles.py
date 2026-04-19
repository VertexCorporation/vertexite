import glob
import re
import os

langs = [d for d in os.listdir('.') if os.path.isdir(d) and len(d) <= 2]

# Also do root
all_htmls = glob.glob('*/index.html') + glob.glob('*.html')
all_htmls = list(set(all_htmls))

for fpath in all_htmls:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Cortex link
    dl_link = 'download.html'
    if 'tr/' in fpath or fpath == 'tr/index.html': # Handle root TR too if needed
        dl_link = 'indir.html'
        
    content = content.replace('href="https://github.com/VertexCorporation/Cortex"', f'href="{dl_link}"')
    
    # Also remove target="_blank" if it links locally now
    # Find cortex link line and remove target
    content = re.sub(rf'<a href="{dl_link}" target="_blank"', f'<a href="{dl_link}"', content)
    
    # 2. Remove particle canvas
    content = re.sub(r'<canvas id="particle-canvas"[^>]*></canvas>', '', content)
    content = re.sub(r'<canvas id="particle-canvas"></canvas>', '', content)
    
    # Also I will inject beautiful geometric background elements
    geometric_blocks = """
    <!-- Geometric Background Objects -->
    <div class="geo-bg">
      <div class="geo-blob geo-blob-1"></div>
      <div class="geo-blob geo-blob-2"></div>
      <div class="geo-blob geo-blob-3"></div>
    </div>
"""
    if '<div class="geo-bg">' not in content:
        # Place just inside body
        content = content.replace('<body>', f'<body>\n  {geometric_blocks}')

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)

print("HTML manipulations completed")
