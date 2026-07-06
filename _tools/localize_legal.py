import os
import time
import requests
import urllib.parse
from bs4 import BeautifulSoup

LANGUAGES = ['tr', 'ar', 'az', 'de', 'es', 'fr', 'hi', 'id', 'it', 'ja', 'ko', 'nl', 'pt', 'ru', 'zh']
BASE_DIR = '/home/baba/Documents/vertexite'

FILES_TO_TRANSLATE = ['terms-of-service.html', 'privacy-policy.html']

def translate_text(text, target_lang):
    if target_lang == 'zh':
        target_lang = 'zh-CN'
    url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl={target_lang}&dt=t&q={urllib.parse.quote(text)}"
    try:
        response = requests.get(url, timeout=10)
        data = response.json()
        return ''.join([sentence[0] for sentence in data[0]])
    except Exception as e:
        print(f"Failed to translate: {text[:20]}... Error: {e}")
        return text

def translate_html(html_content, target_lang):
    soup = BeautifulSoup(html_content, 'html.parser')
    
    tags_to_translate = soup.find_all(['h1', 'h2', 'h3', 'p', 'li', 'strong', 'title', 'th', 'td', 'span', 'a'])
    
    cache = {}
    
    for tag in tags_to_translate:
        if len(tag.find_all(True)) == 0 and tag.string and tag.string.strip():
            text = tag.string.strip()
            if len(text) > 1 and not text.isnumeric():
                if text not in cache:
                    cache[text] = translate_text(text, target_lang)
                    time.sleep(0.1)
                
                if cache[text]:
                    tag.string.replace_with(cache[text])

    html_tag = soup.find('html')
    if html_tag and html_tag.has_attr('lang'):
        html_tag['lang'] = target_lang

    return str(soup)

def main():
    for filename in FILES_TO_TRANSLATE:
        source_path = os.path.join(BASE_DIR, filename)
        if not os.path.exists(source_path):
            continue
            
        with open(source_path, 'r', encoding='utf-8') as f:
            original_html = f.read()

        for lang in LANGUAGES:
            print(f"Translating {filename} to {lang}...")
            translated_html = translate_html(original_html, lang)
            
            lang_dir = os.path.join(BASE_DIR, lang)
            os.makedirs(lang_dir, exist_ok=True)
            
            dest_path = os.path.join(lang_dir, filename)
            with open(dest_path, 'w', encoding='utf-8') as f:
                f.write(translated_html)
            print(f"Saved {lang}/{filename}")

if __name__ == '__main__':
    main()
