with open('css/main.css', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("@import 'utils/_geo.css';\n", "")
text = text.replace("@import 'utils/_geo.css';", "")

if "@import 'utils/_geo.css';" not in text:
    text = text.replace("@import 'utils/_effects.css';", "@import 'utils/_effects.css';\n@import 'utils/_geo.css';")

with open('css/main.css', 'w', encoding='utf-8') as f:
    f.write(text)
