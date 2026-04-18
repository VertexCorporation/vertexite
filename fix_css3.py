with open('css/main.css', 'r', encoding='utf-8') as f:
    text = f.read()

# remove any leftover corrupted import
text = text.replace("}@import 'components/_marquee.css';", "}\n")

# insert properly after _stats.css
if "@import 'components/_marquee.css';" not in text:
    text = text.replace("@import 'components/_stats.css';", "@import 'components/_stats.css';\n@import 'components/_marquee.css';")

with open('css/main.css', 'w', encoding='utf-8') as f:
    f.write(text)
