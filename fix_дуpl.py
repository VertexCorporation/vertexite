import glob
for fpath in glob.glob('*/index.html') + ['en/index.html']:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace double title with single
    content = content.replace(
        '<div class="collaborators-title fade-up">Powered by our technologies & infrastructure</div>\n      <div class="collaborators-title fade-up">Powered by our technologies & infrastructure</div>',
        '<div class="collaborators-title fade-up">Powered by our technologies & infrastructure</div>'
    )
    content = content.replace(
        '<div class="collaborators-title fade-up">Altyapımız ve teknolojilerimiz en iyiler tarafından desteklenmektedir</div>\n      <div class="collaborators-title fade-up">Altyapımız ve teknolojilerimiz en iyiler tarafından desteklenmektedir</div>',
        '<div class="collaborators-title fade-up">Altyapımız ve teknolojilerimiz en iyiler tarafından desteklenmektedir</div>'
    )
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
