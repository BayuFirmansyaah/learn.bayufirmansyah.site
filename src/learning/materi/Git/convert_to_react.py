#!/usr/bin/env python3
"""
Convert Git materi files from object format to React component format.
Automatically parses sections, code blocks, notes, and generates proper JSX.
"""

import re
import sys
from pathlib import Path

def escape_jsx(text):
    """Escape special characters for JSX."""
    # Replace < and > that are not part of HTML tags
    text = text.replace('<file>', '&lt;file&gt;')
    text = text.replace('<your message>', '&lt;your message&gt;')
    text = text.replace('<command>', '&lt;command&gt;')
    text = text.replace('<type>', '&lt;type&gt;')
    text = text.replace('<subject>', '&lt;subject&gt;')
    text = text.replace('<body (optional)>', '&lt;body (optional)&gt;')
    text = text.replace('<footer (optional)>', '&lt;footer (optional)&gt;')
    return text

def parse_object_file(filepath):
    """Parse object format materi file and extract metadata."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract basic info
    title_match = re.search(r'title:\s*["\'](.+?)["\']', content)
    intro_match = re.search(r'intro:\s*["\'](.+?)["\']', content, re.DOTALL)
    
    title = title_match.group(1) if title_match else "Untitled"
    intro = intro_match.group(1) if intro_match else ""
    intro = intro.replace('\\n', ' ').strip()
    
    # Parse sections
    sections = []
    section_pattern = r'\{[^}]*?id:\s*["\'](.+?)["\'][^}]*?heading:\s*["\'](.+?)["\'][^}]*?content:\s*\[(.*?)\][^}]*?\}'
    
    for match in re.finditer(section_pattern, content, re.DOTALL):
        section_id = match.group(1)
        heading = match.group(2)
        content_block = match.group(3)
        
        # Parse content array
        paragraphs = re.findall(r'["\'](.+?)["\']', content_block)
        
        # Check for code blocks
        code_match = re.search(r'code:\s*\{[^}]*?language:\s*["\'](.+?)["\'][^}]*?example:\s*`([^`]+?)`', match.group(0), re.DOTALL)
        code_caption_match = re.search(r'caption:\s*["\'](.+?)["\']', match.group(0))
        
        # Check for notes
        note_match = re.search(r'note:\s*\{[^}]*?type:\s*["\'](.+?)["\'][^}]*?content:\s*["\'](.+?)["\']', match.group(0), re.DOTALL)
        
        # Check for subsections
        subsection_match = re.search(r'subsections:\s*\[(.*?)\]', match.group(0), re.DOTALL)
        
        sections.append({
            'id': section_id,
            'heading': heading,
            'paragraphs': paragraphs,
            'code': {
                'language': code_match.group(1) if code_match else None,
                'example': code_match.group(2).strip() if code_match else None,
                'caption': code_caption_match.group(1) if code_caption_match else None
            } if code_match else None,
            'note': {
                'type': note_match.group(1) if note_match else None,
                'content': note_match.group(2) if note_match else None
            } if note_match else None,
            'has_subsections': subsection_match is not None
        })
    
    return {
        'title': title,
        'intro': intro,
        'sections': sections
    }

def generate_react_component(data, materi_num):
    """Generate React component from parsed data."""
    
    component = f'''import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, {{ Subsection }} from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi{materi_num:02d}() {{
  return (
    <MateriLayout
      title="{data['title']}"
      intro="{escape_jsx(data['intro'])}"
    >
'''
    
    # Generate sections
    for section in data['sections']:
        component += f'''      <Section id="{section['id']}" heading="{escape_jsx(section['heading'])}">
'''
        
        # Add paragraphs
        for para in section['paragraphs']:
            component += f'''        <p>
          {escape_jsx(para)}
        </p>
'''
        
        # Add code block if exists
        if section['code'] and section['code']['example']:
            caption_attr = f' caption="{escape_jsx(section["code"]["caption"])}"' if section['code']['caption'] else ''
            code_content = section['code']['example'].replace('`', '')
            component += f'''
        <CodeBlock language="{section['code']['language']}"{caption_attr}>
{{`{code_content}`}}
        </CodeBlock>
'''
        
        # Add note if exists
        if section['note']:
            component += f'''
        <Note type="{section['note']['type']}">
          {escape_jsx(section['note']['content'])}
        </Note>
'''
        
        component += '''      </Section>

'''
    
    component += '''    </MateriLayout>
  );
}
'''
    
    return component

def convert_file(input_file, output_file, materi_num):
    """Convert a single materi file."""
    print(f"Converting {input_file.name}...")
    
    # Parse object format
    data = parse_object_file(input_file)
    
    # Generate React component
    react_code = generate_react_component(data, materi_num)
    
    # Write to output
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(react_code)
    
    print(f"✓ Created {output_file.name}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 convert_to_react.py <materi_number>")
        print("Example: python3 convert_to_react.py 3")
        print("Or: python3 convert_to_react.py all (convert Materi03-20)")
        sys.exit(1)
    
    base_dir = Path(__file__).parent
    
    if sys.argv[1] == 'all':
        # Convert Materi03-20 (skip 01, 02 already done, 18 already done)
        to_convert = list(range(3, 21))
        to_convert.remove(18)  # Skip Materi18 (already converted)
        
        for num in to_convert:
            input_file = base_dir / f"Materi{num:02d}.jsx"
            if input_file.exists():
                output_file = base_dir / f"Materi{num:02d}_new.jsx"
                try:
                    convert_file(input_file, output_file, num)
                except Exception as e:
                    print(f"✗ Error converting Materi{num:02d}: {e}")
    else:
        num = int(sys.argv[1])
        input_file = base_dir / f"Materi{num:02d}.jsx"
        output_file = base_dir / f"Materi{num:02d}_new.jsx"
        
        if not input_file.exists():
            print(f"Error: {input_file} not found")
            sys.exit(1)
        
        convert_file(input_file, output_file, num)

if __name__ == '__main__':
    main()
