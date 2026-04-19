import os
import glob

# HTML dosyalarini bul
html_files = glob.glob("**/*.html", recursive=True)

for file_path in html_files:
    if "node_modules" in file_path or ".git" in file_path or "dist" in file_path:
        continue
        
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if '10k+' in content or '10K+' in content:
            new_content = content.replace('10k+', '50K+').replace('10K+', '50K+')
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {file_path}")
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
print("Finished!")
