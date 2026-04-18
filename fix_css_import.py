with open('css/main.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if "@import 'components/_marquee.css';" in line:
        continue # remove invalid import at the bottom
    new_lines.append(line)

# insert it at the correct place
for i, line in enumerate(new_lines):
    if "@import 'components/_stats.css';" in line:
        new_lines.insert(i+1, "@import 'components/_marquee.css';\n")
        break

with open('css/main.css', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
