import os
import re

root_dir = '/Users/selimdogan/vertexite'
exclude_dirs = {'.git', 'dist', 'node_modules', '_tools', '.github'}

def extract_card_block(text, start_index):
    # start_index should be the index of <div class="card...
    # We walk forward counting divs
    count = 0
    i = start_index
    # Scan until we consume the opening div
    # (naive scan, identifying <div and </div tags)
    
    # Actually, let's just iterate characters and look for tags
    # This is safer
    
    while i < len(text):
        if text[i:i+4] == '<div':
            count += 1
            i += 4
        elif text[i:i+5] == '</div':
            count -= 1
            i += 5
        else:
            i += 1
        
        if count == 0:
            return text[start_index:i+1] # +1 to include '>'
            
    return None

def process_file(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Locate team section and grid
    pattern_grid_start = r'(<section id="team".*?)(<div class="centered-grid">)'
    match_start = re.search(pattern_grid_start, content, re.DOTALL)
    
    if not match_start:
        print(f"  Team grid not found.")
        return

    grid_start_idx = match_start.end(2)
    
    # We need to find where the grid ENDS.
    # We can use the same balancing logic starting from grid_start_idx with count=1
    # But first, let's just identify the CARDS inside the grid.
    # The grid ends when the count drops to 0 relative to grid_start_idx?
    # No, that captures one huge block.
    
    # Strategy:
    # 1. Capture the block from <div class="centered-grid"> until its closing div.
    # 2. Inside that block, identify card blocks.
    
    scanner_idx = match_start.start(2) # Start of <div class="centered-grid">
    
    # Extract the full grid content
    count = 0
    i = scanner_idx
    # Find full grid HTML first
    while i < len(content):
        if content[i:i+4] == '<div':
            count += 1
            i += 4
        elif content[i:i+5] == '</div':
            count -= 1
            i += 5
            if count == 0:
                break
        else:
            i += 1
            
    grid_full_html = content[scanner_idx:i+1] # This includes <div class="centered-grid">...</div>
    grid_inner_html = grid_full_html[len('<div class="centered-grid">'):-6] # Strip wrapper
    
    # Now parse cards from grid_inner_html
    # We look for <div class="card fade-up team-card">
    # We also want to capture the COMMENT preceding it if any.
    # Comments: <!-- Name -->
    
    cards = []
    
    # We iterate manually again through the inner html
    idx = 0
    last_idx = 0
    
    # Find all start indices of cards
    card_marker = '<div class="card fade-up team-card">'
    
    while True:
        start_find = grid_inner_html.find(card_marker, idx)
        if start_find == -1:
            break
            
        # Extract this card fully
        card_html_raw = extract_card_block(grid_inner_html, start_find)
        if not card_html_raw:
             print("Error extracting card block")
             break
        
        # Capture preceding content (comments/whitespace) since last card end
        preceding = grid_inner_html[last_idx:start_find]
        
        # Store as tuple (preceding, card_html)
        cards.append({'pre': preceding, 'html': card_html_raw})
        
        idx = start_find + len(card_html_raw)
        last_idx = idx
        
    last_chunk = grid_inner_html[last_idx:] # Trailing whitespace/newlines
    
    # Identify target cards
    mir_card = None
    selim_card = None
    other_cards = []
    
    for c in cards:
        if "Mir Emir Kaya" in c['html']:
            mir_card = c
        elif "Selim Doğan" in c['html']:
            selim_card = c
        else:
            other_cards.append(c)
            
    # Reassemble in order: Others, Mir, Selim
    if not mir_card or not selim_card:
        print("  Could not find both Selim and Mir, skipping reorder.")
        return
        
    # Reconstruct inner html
    # We define a standard separator or just use the existing 'pre' blocks?
    # The 'pre' blocks might contain the comment for the specific person.
    # We should keep the comment with the person.
    
    # So we simply reorder the objects.
    final_order = other_cards + [mir_card, selim_card]
    
    new_inner_html = ""
    for item in final_order:
        new_inner_html += item['pre'] + item['html']
        
    new_inner_html += last_chunk
    
    # Replace in original content
    # content has grid_full_html at scanner_idx
    new_full_html = '<div class="centered-grid">' + new_inner_html + '</div>'
    
    new_content = content[:scanner_idx] + new_full_html + content[scanner_idx + len(grid_full_html):]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"  Updated {filepath}")


for dirpath, dirnames, filenames in os.walk(root_dir):
    dirnames[:] = [d for d in dirnames if d not in exclude_dirs]
    for filename in filenames:
        if filename == 'index.html':
            process_file(os.path.join(dirpath, filename))
