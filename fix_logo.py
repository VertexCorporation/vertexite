import os
import glob
import re

html_files = glob.glob("**/*.html", recursive=True)

for path in html_files:
    if "node_modules" in path or ".git" in path or "dist" in path:
        continue

    # How many levels down from root?
    depth = path.count("/")
    if depth == 0:
        asset_path = "assets/favicon.webp"
    else:
        # e.g. en/index.html -> depth 1 -> ../assets/favicon.webp
        # en/docs/index.html -> depth 2 -> ../../assets/favicon.webp
        asset_path = "../" * depth + "assets/favicon.webp"

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace <a href="..." class="logo">Vertex</a>
    # We use a non-greedy logic to preserve the href link if it exists
    # Find all a tags with class="logo".
    # Sometimes it has style: <a href="#" class="logo" style="...">Vertex</a>
    
    # Use re.sub with a function to ensure we don't duplicate logos if this script is run multiple times
    if 'class="nav-logo-icon"' not in content:
        # For header logo
        content = re.sub(
            r'<a([^>]*?)class="logo"([^>]*?)>Vertex</a>',
            f'<a\\1class="logo"\\2><img src="{asset_path}" alt="Vertex Logo" class="nav-logo-icon">Vertex</a>',
            content
        )

        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated Logo: {path}")

print("Logo update complete!")
