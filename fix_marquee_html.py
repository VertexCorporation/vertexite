import re
import glob

# For all translated and root HTML files
for fpath in glob.glob('*/index.html') + ['en/index.html', 'tr/index.html']:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to add the text above exactly like lovable.
    # Determine the localized text for "Powered by our incredible partners" roughly?
    # Actually, we can just use a simple clean text or let it be handled generic
    title_text = "Powered by our technologies & infrastructure"
    if 'tr/' in fpath or fpath == 'tr/index.html':
        title_text = "Altyapımız ve teknolojilerimiz en iyiler tarafından desteklenmektedir"
    
    # Check if we already have a title
    if '<div class="collaborators-title">' not in content:
        # replace '<div class="marquee-container fade-up">' 
        # with '<div class="collaborators-title fade-up">Title</div>\n      <div class="marquee-container fade-up">'
        content = content.replace(
            '<div class="marquee-container fade-up">', 
            f'<div class="collaborators-title fade-up">{title_text}</div>\n      <div class="marquee-container fade-up">'
        )
        
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
print("done html")
