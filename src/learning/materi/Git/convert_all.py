#!/usr/bin/env python3
"""
Convert all Git materi from object format to React component format
"""

import os
import json

# Since we need to keep the detailed content from Materi01-07
# and the placeholder content from Materi08-20,
# Let's just create a simple conversion that wraps the existing object export
# into a React component that returns MateriLayout with the data

# For now, let's just confirm which files need conversion
for i in range(1, 21):
    filename = f"Materi{i:02d}.jsx"
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            first_line = f.readline().strip()
            if first_line.startswith('//') or first_line.startswith('const'):
                print(f"{filename}: Object format - needs conversion")
            elif first_line.startswith('import'):
                print(f"{filename}: React format - OK")
    else:
        print(f"{filename}: Missing!")

