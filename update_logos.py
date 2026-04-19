import glob
import re

for fpath in glob.glob('*/index.html') + ['en/index.html', 'tr/index.html']:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Değiştireceğimiz logolar .webp'den .svg'ye dönüyor
    content = content.replace('src="../assets/partners/fal.webp"', 'src="../assets/partners/fal.svg"')
    content = content.replace('src="../assets/partners/openrouter.webp"', 'src="../assets/partners/openrouter.svg"')
    content = content.replace('src="../assets/partners/googlecloud.webp"', 'src="../assets/partners/googlecloud.svg"')
    content = content.replace('src="../assets/partners/cloudflare.webp"', 'src="../assets/partners/cloudflare.svg"')

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
print("Logos sorted.")
