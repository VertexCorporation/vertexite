
import os
import json
import glob

# --- Configuration ---
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_FILE = os.path.join(ROOT_DIR, 'en', 'index.html')
JSON_FILES = ['translations_1.json', 'translations_2.json', 'translations_3.json', 'translations_4.json']

# All supported languages (New + Existing)
ALL_LANGS = [
    'en', 'tr', 'hi',  # Existing
    'ar', 'az', 'pt', 'nl', 'id', 'it', 'es', 'ru', 'fr', 'ja', 'ko', 'zh', 'de' # New
]

LANG_NAMES = {
    'en': 'English', 'tr': 'Türkçe', 'hi': 'Hindi',
    'ar': 'العربية', 'az': 'Azərbaycan', 'pt': 'Português', 'nl': 'Nederlands',
    'id': 'Indonesia', 'it': 'Italiano', 'es': 'Español', 'ru': 'Русский',
    'fr': 'Français', 'ja': '日本語', 'ko': '한국어', 'zh': '简体中文', 'de': 'Deutsch'
}

# English Source Map (Key -> Original English Text)
ENGLISH_MAP = {
    "page_title": "Vertex | The Peak of Technology",
    "meta_description": "Vertex - Turkiye's youngest tech company. Pioneering in AI with Cortex & Mergen, mobile gaming, and next-gen software solutions.",
    # "nav_home" -> "Home" (Too common, handle carefully or contextually? content is safe to replace if unique)
    # Actually, let's substitute larger blocks or specific lines if possible, or use the keys.
    # Given the simplicity, I'll do direct replacements but be careful.
    
    "hero_badge": "Turkiye's Youngest Tech Company",
    # "hero_title": Can't easily replace HTML with HTML in string replace without being exact.
    # The JSON has HTML: <span class="gradient-text">The Peak of Technology</span><br>Shaping the Future
    
    "hero_desc": "Founded by Turkiye's brightest young talents, Vertex is revolutionizing the world of AI and software.",
    "stats_target": "Target Downloads",
    "stats_active": "Active Users",
    "stats_age": "Average Age",
    "stats_countries": "Countries",
    
    "about_youth_title": "Young Innovators",
    "about_youth_desc": "Our team, averaging 15 years old, represents the next generation of tech visionaries dedicated to\n                pushing boundaries and creating revolutionary solutions.",
    # Note: Newlines/whitespace in about_youth_desc might break simple replace. I'll need to normalization.
    
    "about_multi_title": "Multidisciplinary Expertise",
    "about_multi_desc": "We innovate across a wide range of skills, from software development to AI, gaming, music\n                production, and browser technologies.",
    
    "about_global_title": "Global Vision",
    "about_global_desc": "We are dedicated to positioning Turkiye as a global technology leader by developing world-class\n                products.",

    "projects_title": "Our Projects",
    
    # Projects
    "project_cortex_desc": "A revolutionary online and offline AI platform with advanced capabilities.",
    "project_mergen_desc": "Scalable AI architecture designed for high-performance data processing and machine learning models.",
    "project_drome_desc": "An innovative programming language offering versatile and efficient tools for developers.",
    "project_solar_desc": "A next-generation web browser built from scratch for performance and privacy.",
    "project_allstar_desc": "Our mobile game that reached 5 million+ people in 48 hours with 20,000+ downloads.",
    "project_ally_desc": "Your intelligent health assistant. Providing real-time monitoring and personalized wellness advice.",
    
    "tech_title": "Our Technology Ecosystem",
    "tech_subtitle": "We use the most powerful tools and modern languages to build the future.",
    "tech_ai": "Artificial Intelligence",
    "tech_web": "Web Technologies",
    "tech_mobile": "Mobile App",
    "tech_game": "Game Development",
    
    "vision_title": "2030 Vision",
    "vision_desc": "By 2030, Vertex aims to establish a global presence in all\n              markets worldwide, reaching millions of active users on our platforms and becoming a recognized leading\n              force in the global technology industry.",
    "vision_subdesc": "We are committed to continuous innovation, developing our own operating\n              system, and further expanding our AI capabilities to shape the digital future.",
    
    "team_title": "Our Team",
    "role_ceo": "Co-Founder & CEO",
    "role_cto": "Co-Founder & CTO",
    "role_architect": "Chief Architect",
    "role_marketing": "Chief Marketing",
    "role_senior_web": "Senior Web Developer",
    "role_app_dev": "App Developer",
    
    "cta_title": "Be Part of the Future",
    "cta_desc": "Push the boundaries of technology with Vertex. Explore our projects or join our team.",
    "cta_btn_explore": "Explore Projects",
    "cta_btn_contact": "Contact Us",
    
    "footer_brand_desc": "Turkiye's youngest tech company. Revolutionizing AI, software, and gaming with an average age of 15.",
    "footer_col_projects": "Projects",
    "footer_col_company": "Company",
    "footer_col_contact": "Contact",
    
    "footer_link_about": "About Us",
    # "footer_link_team": "Team", # Duplicate
    # "footer_link_vision": "Vision", # Duplicate
    "footer_link_email": "Send Email",
    "footer_rights": "© 2025 Vertex Corporation. All rights reserved.",
    "footer_privacy": "Privacy Policy",
    "footer_terms": "Terms of Use",
    "footer_cookie": "Cookie Policy"   
}

# Simple keys map for buttons/nav that might appear multiple times or be ambiguous.
# I will use a more targeted replacement for these or just accept global replacement.
SIMPLE_MAP = {
    "nav_home": "Home",
    "nav_projects": "Projects",
    "nav_tech": "Technologies",
    "nav_team": "Team", 
    "nav_contact": "Contact", # Be careful, might match "Contact Us" partially? No.
    "nav_view_projects": "View Projects",
    "hero_btn_explore": "Start Exploring",
    "hero_btn_vision": "Our Vision",
}

def load_translations():
    combined = {}
    for fname in JSON_FILES:
        fpath = os.path.join(ROOT_DIR, fname)
        if os.path.exists(fpath):
            with open(fpath, 'r', encoding='utf-8') as f:
                data = json.load(f)
                combined.update(data)
    return combined

def generate_hreflang_block(current_lang):
    lines = []
    lines.append('  <!-- 🌍 Hreflang Tags -->')
    for lang in ALL_LANGS:
        lines.append(f'  <link rel="alternate" hreflang="{lang}" href="https://vertexishere.com/{lang}/" />')
    lines.append('  <link rel="alternate" hreflang="x-default" href="https://vertexishere.com/en/" />')
    return '\n'.join(lines)

def generate_lang_switcher(current_lang):
    # This replaces the entire inner HTML of <div class="lang-menu"> ... </div>
    # and the trigger button text.
    
    # We won't replace the logic in the HTML easily with regex for the menu items. 
    # Instead, we will construct the whole <div class="language-dropdown"> block.
    
    current_lang_upper = current_lang.upper()
    if len(current_lang) > 2: current_lang_upper = current_lang[:2].upper() # Just in case
    
    menu_items = []
    for lang in ALL_LANGS:
        active_class = ' active' if lang == current_lang else ''
        code_upper = lang.upper()
        if lang == 'zh': code_upper = 'ZH' # Simplified Chinese
        
        # Link logic: relative path ".. / {lang} /"
        menu_items.append(f'            <a href="../{lang}/" class="lang-item{active_class}">{LANG_NAMES[lang]}</a>')
    
    menu_html = '\n'.join(menu_items)
    
    html = f'''        <div class="language-dropdown">
          <button class="lang-btn-trigger">
          <span class="lang-text">{current_lang_upper}</span> ▼
          </button>
          <div class="lang-menu">
{menu_html}
          </div>
        </div>'''
    return html

def main():
    translations = load_translations()
    
    with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
        template_content = f.read()

    # Normalize whitespace in template for consistent replacing of multi-line strings
    # Actually, let's just do targeted replacement. The "ENGLISH_MAP" values above 
    # for multi-line strings need to match exactly what's in the file.
    # I copied them from view_file output, but indentation matters.
    # I will be careful.
    
    # 1. Generate new language files
    for lang_code, trans_data in translations.items():
        print(f"Generating {lang_code}...")
        
        # Create directory
        lang_dir = os.path.join(ROOT_DIR, lang_code)
        os.makedirs(lang_dir, exist_ok=True)
        
        new_content = template_content
        
        # A. Basic Text Replacement
        # Order matters! Long strings first to avoid partial matches?
        # Re-sort ENGLISH_MAP by length of key (descending) is a good heuristic?
        # Actually value length.
        
        # Merge maps
        full_map = {**ENGLISH_MAP, **SIMPLE_MAP}
        
        # Replace specific large blocks first
        # Handle HTML in Hero Title specifically
        eng_hero_title = '<span class="gradient-text">The Peak of Technology</span><br>Shaping the Future'
        new_content = new_content.replace(eng_hero_title, trans_data.get('hero_title', eng_hero_title))
        
        # Handle simple map
        for key, val in full_map.items():
            if key == 'hero_title': continue # Handled above
            
            target_text = trans_data.get(key, val)
            
            # Use string replace. 
            # Note: This might replace "Vision" in "Global Vision" if we aren't careful.
            # But the keys are "Global Vision" (full string) vs "Vision" (nav).
            # If we replace "Global Vision" first, then "Vision", it works.
            # So sort by length of English string descending.
            pass

        # Let's sort keys by length of English string descending
        sorted_keys = sorted(full_map.keys(), key=lambda k: len(full_map[k]), reverse=True)
        
        for key in sorted_keys:
            if key == 'hero_title': continue
            
            original = full_map[key]
            translated = trans_data.get(key, original)
            
            # clean up newlines/indents in original for matching
            # The file content has newlines and spaces. 
            # I will try to match strict. If fail, I might need fuzzy or manual fix.
            
            # Problem: `about_youth_desc` in map has \n and spaces.
            # In file it has ... dedicated to\n                pushing ...
            # My map string: ... dedicated to\n                pushing ...
            # Should match if I copied correctly.
            
            new_content = new_content.replace(original, translated)

        # B. HTML Lang Attribute
        new_content = new_content.replace('<html lang="en">', f'<html lang="{lang_code}">')
        
        # C. RTL Support
        if trans_data.get('dir') == 'rtl':
             new_content = new_content.replace(f'<html lang="{lang_code}">', f'<html lang="{lang_code}" dir="rtl">')
             # Add RTL CSS patch if needed? 
             # Maybe just add a style block for RTL
             rtl_style = """
  <style>
    /* RTL Patch */
    html[dir="rtl"] { direction: rtl; text-align: right; }
    html[dir="rtl"] .nav-links { margin-right: auto; margin-left: 0; }
    html[dir="rtl"] .header-actions { margin-left: 0; margin-right: 0; }
  </style>
</head>"""
             new_content = new_content.replace('</head>', rtl_style)

        # D. Hreflang
        # Find the existing block and replace it.
        # Existing block starts with <!-- 🌍 Hreflang Tags --> and ends before <!-- 🖼️ Open Graph
        start_marker = '<!-- 🌍 Hreflang Tags -->'
        end_marker = '<!-- 🖼️ Open Graph'
        
        start_idx = new_content.find(start_marker)
        end_idx = new_content.find(end_marker)
        
        if start_idx != -1 and end_idx != -1:
            new_hreflang = generate_hreflang_block(lang_code) + '\n\n  '
            new_content = new_content[:start_idx] + new_hreflang + new_content[end_idx:]
            
        # E. Language Switcher
        # Find <div class="language-dropdown"> ... </div> (closing div is hard to find with simple find)
        # Use a distinctive start and end point.
        # content:
        # <div class="language-dropdown">
        #   <button ...
        #   ...
        #   </div>
        # </div>
        # <button class="theme-toggle-btn ...
        
        lang_start = new_content.find('<div class="language-dropdown">')
        lang_end = new_content.find('<button class="theme-toggle-btn', lang_start)
        
        # The </div> closing language-dropdown is just before that button (plus whitespace)
        # We can just replace the whole chunk from start to end (minus the button).
        if lang_start != -1 and lang_end != -1:
             # Find the last </div> before lang_end
             menu_close = new_content.rfind('</div>', lang_start, lang_end) # This is the inner div lang-menu
             dropdown_close = new_content.rfind('</div>', lang_start, menu_close) # This might be wrong.
             
             # Actually, simpler: replace the known block.
             # The block struct is consistent.
             # Let's regex it or just be careful.
             
             # I'll rely on the known structure in en/index.html
             # It ends with </div>\n        <button class="theme-toggle-btn
             
             # Let's use the replacement function created above and swap
             # But I need to identify the exact string to replace.
             pass
        
        # Let's try to reconstruct the *original* block to replace it.
        # It's better to replace the specific parts? No, the list changes.
        
        # Hardcoded original block in en/index.html:
        orig_lang_block = """<div class="language-dropdown">
          <button class="lang-btn-trigger">
          <span class="lang-text">EN</span> ▼
          </button>
          <div class="lang-menu">
            <a href="../tr/" class="lang-item">Turkish</a>
            <a href="../en/" class="lang-item active">English</a>
            <a href="../hi/" class="lang-item">Hindi</a>
          </div>
        </div>"""
        
        # Note: indentations might differ.
        # I'll regex replace the whole div.
        import re
        lang_div_pattern = re.compile(r'<div class="language-dropdown">.*?</div>\s*</div>', re.DOTALL)
        
        new_lang_block = generate_lang_switcher(lang_code)
        new_content = lang_div_pattern.sub(new_lang_block, new_content)

        # Save
        with open(os.path.join(lang_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(new_content)
            
    # 2. Update Existing Files (en, tr, hi)
    existing_langs = ['en', 'tr', 'hi']
    for lang in existing_langs:
        fpath = os.path.join(ROOT_DIR, lang, 'index.html')
        if os.path.exists(fpath):
            print(f"Updating {lang}...")
            with open(fpath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Update Hreflang
            start_marker = '<!-- 🌍 Hreflang Tags -->'
            end_marker = '<!-- 🖼️ Open Graph'
            start_idx = content.find(start_marker)
            end_idx = content.find(end_marker)
            if start_idx != -1 and end_idx != -1:
                new_hreflang = generate_hreflang_block(lang) + '\n\n  '
                content = content[:start_idx] + new_hreflang + content[end_idx:]
            
            # Update Lang Switcher
            import re
            lang_div_pattern = re.compile(r'<div class="language-dropdown">.*?</div>\s*</div>', re.DOTALL)
            new_lang_block = generate_lang_switcher(lang)
            content = lang_div_pattern.sub(new_lang_block, content)
            
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)

if __name__ == '__main__':
    main()
