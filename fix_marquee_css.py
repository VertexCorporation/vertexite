import re
with open('css/components/_marquee.css', 'r') as f:
    css = f.read()

# Make it non-moving if it's only 4? The user asked for "soldan sağa kayar".
# Let's adjust the marquee to look just like Lovable (and fix the flex shrinking, visibility & spacing).
# The user's icons are 620x620 (square), so a huge gap (100px) between squares makes it look sparse.
# Let's reduce padding/gap, ensure flex-shrink: 0, increase opacity to 0.7 maybe?
# Also, if they want "soldan sağa kayar", maybe infinite scrolling. 
css = css.replace('opacity(0.35)', 'opacity(0.7)')
css = css.replace('height: 48px;', 'height: 60px; /* larger for 1:1 logos */\n    flex-shrink: 0;')
css = css.replace('gap: 100px;', 'gap: 80px;')
css = css.replace('padding-left: 100px;', 'padding-left: 80px;')

# Lovable doesn't have extreme side gradients hiding them completely if there are few.
css = css.replace('width: 250px;', 'width: 120px;')

with open('css/components/_marquee.css', 'w') as f:
    f.write(css)
