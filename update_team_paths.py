#!/usr/bin/env python3
"""Update team member image paths from assets/ to assets/team/"""

import os
import re
from pathlib import Path

# List of team member image files
team_images = [
    'ATATURKCU', 'BAHADIRGURBUZ', 'EKINONAL', 'KEREMARDA', 'MUSTAFACAKI',
    'MEHTAPKUCUK', 'FAZLIOZLEMIS', 'GOKALPBAYLAN', 'IBRAHIMBAYGUN', 'MURATCOSKUN',
    'emre_baldemir', 'ekin_burcak', 'elif_irem_sahin', 'mehmet_uras', 'selim'
]

# Find all HTML files
html_files = list(Path('c:\\Users\\Arda\\Desktop\\vertex\\vertexite').rglob('*.html'))

updated = 0
for html_file in html_files:
    content = html_file.read_text(encoding='utf-8')
    original_content = content
    
    # Update image paths for each team member
    for member in team_images:
        # Match patterns like ../assets/MEMBERNAME.jpg, .webp, .jpeg
        pattern = r'(\.\./)?assets/(' + re.escape(member) + r'\.(jpg|jpeg|webp|png))'
        replacement = r'../assets/team/\2'
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    
    # Write back if changed
    if content != original_content:
        html_file.write_text(content, encoding='utf-8')
        print(f"✅ Updated: {html_file}")
        updated += 1
    else:
        print(f"⏭️  No changes: {html_file}")

print(f"\n✨ Total files updated: {updated}")
