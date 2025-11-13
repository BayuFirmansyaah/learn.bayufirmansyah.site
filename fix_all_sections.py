#!/usr/bin/env python3
import re
import os
from pathlib import Path

def generate_id(title):
    """Generate id from title"""
    # Remove special characters, convert to lowercase, replace spaces with hyphens
    id_str = re.sub(r'[^a-zA-Z0-9\s]', '', title)
    id_str = id_str.lower().strip()
    id_str = re.sub(r'\s+', '-', id_str)
    return id_str

def fix_section_in_file(filepath):
    """Fix Section components in a file"""
    print(f"Processing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all <Section title="..." and replace with <Section id="..." heading="..."
    def replace_section(match):
        title = match.group(1)
        id_val = generate_id(title)
        return f'<Section id="{id_val}" heading="{title}"'
    
    # Pattern to match <Section title="..."
    pattern = r'<Section\s+title="([^"]+)"'
    new_content = re.sub(pattern, replace_section, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"✓ Fixed {filepath}")
        return True
    else:
        print(f"- No changes needed in {filepath}")
        return False

def main():
    # Process all materi folders
    folders = ['JavaScript', 'Kotlin', 'Flutter', 'Laravel']
    total_fixed = 0
    
    for folder in folders:
        materi_dir = Path(f'src/learning/materi/{folder}')
        
        if not materi_dir.exists():
            print(f"Skipping {folder} - directory not found")
            continue
        
        print(f"\n{'='*60}")
        print(f"Processing {folder}...")
        print(f"{'='*60}")
        
        folder_fixed = 0
        for jsx_file in materi_dir.glob('*.jsx'):
            if fix_section_in_file(jsx_file):
                folder_fixed += 1
        
        print(f"\n{folder}: Fixed {folder_fixed} files")
        total_fixed += folder_fixed
    
    print(f"\n{'='*60}")
    print(f"✓ All Done! Fixed {total_fixed} files total")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
