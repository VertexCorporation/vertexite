import os
import re

root_dir = '/Users/selimdogan/vertexite'
exclude_dirs = {'.git', 'dist', 'node_modules', '_tools', '.github'}

# Names to move to the end, in order (Mir first, then Selim, so Selim ends up last)
target_names = ["Mir Emir Kaya", "Selim Doğan"]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the Team Section Grid
    team_section_match = re.search(r'(<section id="team".*?<div class="centered-grid">)(.*?)(</div>\s*</div>\s*</section>)', content, re.DOTALL)
    
    if not team_section_match:
        print(f"Team section not found in {filepath}")
        return

    start_part = team_section_match.group(1)
    grid_content = team_section_match.group(2)
    end_part = team_section_match.group(3)

    # Split into cards
    # We look for the start of a card div or a comment preceding it
    # Pattern: (optional comment)\n<div class="card fade-up team-card">...</div>
    
    # Simple split by identifying the start tag
    # We assume the file is well-formatted with consistent indentation
    
    # Let's find all occurrences of <div class="card fade-up team-card"> and their positions
    card_starts = [m.start() for m in re.finditer(r'<div class="card fade-up team-card">', grid_content)]
    
    if not card_starts:
        print(f"No cards found in {filepath}")
        return
        
    cards = []
    for i in range(len(card_starts)):
        start_idx = card_starts[i]
        end_idx = card_starts[i+1] if i + 1 < len(card_starts) else len(grid_content)
        
        # Check for preceding comment (up to the previous newline) within the previous slice?
        # Actually, let's just grab the chunk from start_idx up to next start_idx
        # But we need to handle the comment which is BEFORE the div.
        
        # Better approach: Split by regex lookahead?
        # Or simply regex match all full blocks: (comment)?\s*<div class="card...</div>
        pass

    # Regex to capture individual cards nicely
    # Captures optional comment, whitespace, and the div block ending with </div>
    # We rely on the fact that </section> is outside grid_content, but the closing </div> of <div class="centered-grid"> is also outside (handled by group(3) above, but wait. group(3) matches </div></div></section>.
    # So grid_content shouldn't have the closing div of centered-grid.
    # But regex greedy/lazy match might be tricky.
    
    # Revised approach for parsing cards in grid_content:
    # We split by the pattern that starts a card, preserving the delimiters.
    # Pattern: \s*(?:<!--.*?-->\s*)?<div class="card fade-up team-card">
    
    # Let's clean up grid_content specifically.
    
    # Extract all matches of full cards
    # We assume the content inside the card does not contain <div class="card fade-up team-card">
    # We also need to capture comments like <!-- Name -->
    
    card_pattern = re.compile(r'(\s*(?:<!--.*?-->\s*)?<div class="card fade-up team-card">.*?</div>)', re.DOTALL)
    
    found_cards = card_pattern.findall(grid_content)
    
    if not found_cards:
        # Fallback if findall fails (e.g. nested divs messing up regex dotall matching closing div?)
        # Since we know the internal structure is simple:
        # The card div closes with </div>. Inside it has <h3>, <p>, <div>social</div>.
        # It does NOT have other divs with class 'card fade-up team-card'.
        # But it effectively ends when the next one starts OR when the grid ends.
        print(f"Regex split failed in {filepath}, trying manual split")
        return

    # Identify cards
    regular_cards = []
    mir_card = None
    selim_card = None
    
    for card_html in found_cards:
        if "Mir Emir Kaya" in card_html:
            mir_card = card_html
        elif "Selim Doğan" in card_html:
            selim_card = card_html
        else:
            regular_cards.append(card_html)
            
    if not mir_card or not selim_card:
        print(f"Could not find target members in {filepath}")
        # might be missing in some file? Just proceed with what we found
    
    # Construct new order
    # Current request: ..., Mir Emir Kaya, Selim Doğan (last)
    new_cards = regular_cards
    if mir_card:
        new_cards.append(mir_card)
    if selim_card:
        new_cards.append(selim_card)
        
    new_grid_content = "".join(new_cards)
    
    # Avoid duplicate whitespace buildup if any
    # new_grid_content = re.sub(r'\n\s*\n', '\n', new_grid_content)
    
    # Reassemble file
    new_content = content[:team_section_match.start(2)] + new_grid_content + content[team_section_match.end(2):]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Processesd {filepath}")

for dirpath, dirnames, filenames in os.walk(root_dir):
    dirnames[:] = [d for d in dirnames if d not in exclude_dirs]
    for filename in filenames:
        if filename == 'index.html':
            process_file(os.path.join(dirpath, filename))

