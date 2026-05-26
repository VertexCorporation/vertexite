#!/usr/bin/env python3
"""
Moderate WebP compression - quality 80 for better balance
"""
import os
from PIL import Image

IMAGES = [
    ('assets/cortex.webp', 80),
    ('assets/solar.webp', 80),
    ('assets/allstar.webp', 80),
    ('assets/drome.webp', 80),
]

def optimize_webp(file_path, quality=80):
    """Optimize WebP image with moderate compression"""
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return False
    
    try:
        original_size = os.path.getsize(file_path) / 1024
        
        img = Image.open(file_path)
        img.save(file_path, 'WEBP', quality=quality, method=6)
        
        new_size = os.path.getsize(file_path) / 1024
        saved = original_size - new_size
        percent = (saved / original_size) * 100 if original_size > 0 else 0
        
        status = "✅" if saved > 0.5 else "⚠️"
        print(f"{status} {file_path}: {original_size:.1f} → {new_size:.1f} KiB (saved {saved:.1f} KiB)")
        
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == '__main__':
    print("🎯 Moderate WebP Optimization (Quality 80)\n" + "="*50)
    
    total_original = 0
    total_new = 0
    
    for img_path, quality in IMAGES:
        if os.path.exists(img_path):
            original = os.path.getsize(img_path) / 1024
            optimize_webp(img_path, quality)
            new = os.path.getsize(img_path) / 1024
            total_original += original
            total_new += new
    
    print("="*50)
    if total_original > 0:
        total_saved = total_original - total_new
        print(f"\n📊 Total: {total_original:.1f} → {total_new:.1f} KiB")
        print(f"💾 Total saved: {total_saved:.1f} KiB")
    print("✨ Complete!")
