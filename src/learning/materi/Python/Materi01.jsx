import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi01() {
  return (
    <MateriLayout title="Instalasi & Pengenalan Python">
      <Section title="Apa itu Python?">
        <p>
          Python adalah bahasa pemrograman high-level yang dibuat oleh Guido van Rossum 
          dan dirilis pertama kali pada tahun 1991. Python dikenal karena sintaksnya 
          yang mudah dibaca dan dipahami, membuatnya ideal untuk pemula maupun expert.
        </p>
        <p>
          Python banyak digunakan untuk web development, data science, machine learning, 
          automation, scripting, dan berbagai aplikasi lainnya.
        </p>
      </Section>

      <Section title="Keunggulan Python">
        <ul>
          <li><strong>Mudah Dipelajari:</strong> Sintaks yang simpel dan readable</li>
          <li><strong>Versatile:</strong> Bisa untuk web, data science, AI, automation, dll</li>
          <li><strong>Library Lengkap:</strong> Ribuan library siap pakai (NumPy, Pandas, Django, Flask, dll)</li>
          <li><strong>Community Besar:</strong> Dokumentasi lengkap dan support komunitas yang aktif</li>
          <li><strong>Cross-Platform:</strong> Berjalan di Windows, macOS, Linux</li>
        </ul>
      </Section>

      <Section title="Instalasi Python">
        <h3>1. Download Python</h3>
        <p>
          Kunjungi <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">python.org/downloads</a> 
          dan download versi terbaru (Python 3.11+ recommended).
        </p>

        <h3>2. Install di Windows</h3>
        <ul>
          <li>Jalankan installer</li>
          <li>✅ <strong>PENTING:</strong> Centang "Add Python to PATH"</li>
          <li>Klik "Install Now"</li>
        </ul>

        <h3>3. Install di macOS</h3>
        <p>Gunakan Homebrew (recommended):</p>
        <CodeBlock language="bash">
{`brew install python3`}
        </CodeBlock>

        <h3>4. Install di Linux (Ubuntu/Debian)</h3>
        <CodeBlock language="bash">
{`sudo apt update
sudo apt install python3 python3-pip`}
        </CodeBlock>

        <h3>5. Verifikasi Instalasi</h3>
        <CodeBlock language="bash">
{`python --version
# atau
python3 --version

# Output: Python 3.11.x`}
        </CodeBlock>
      </Section>

      <Section title="Setup Environment">
        <h3>1. Install pip (Package Manager)</h3>
        <p>Biasanya sudah include, cek dengan:</p>
        <CodeBlock language="bash">
{`pip --version
# atau
pip3 --version`}
        </CodeBlock>

        <h3>2. Install Virtual Environment</h3>
        <CodeBlock language="bash">
{`# Install virtualenv
pip install virtualenv

# Create virtual environment
python -m venv myenv

# Activate (Windows)
myenv\\Scripts\\activate

# Activate (macOS/Linux)
source myenv/bin/activate

# Deactivate
deactivate`}
        </CodeBlock>

        <Note type="info">
          Virtual environment penting untuk isolasi dependencies per project agar tidak bentrok.
        </Note>
      </Section>

      <Section title="IDE & Text Editor Recommended">
        <h3>1. Visual Studio Code (Recommended untuk Pemula)</h3>
        <ul>
          <li>Free, lightweight, powerful</li>
          <li>Install extension: "Python" by Microsoft</li>
          <li>Autocomplete, debugging, linting built-in</li>
        </ul>

        <h3>2. PyCharm (Professional IDE)</h3>
        <ul>
          <li>IDE khusus Python dari JetBrains</li>
          <li>Ada versi Community (free) dan Professional (paid)</li>
          <li>Fitur lengkap untuk project besar</li>
        </ul>

        <h3>3. Jupyter Notebook (untuk Data Science)</h3>
        <CodeBlock language="bash">
{`pip install jupyter
jupyter notebook`}
        </CodeBlock>

        <h3>4. Sublime Text / Atom</h3>
        <p>Lightweight text editor dengan plugin Python.</p>
      </Section>

      <Section title="Hello World - Program Python Pertama">
        <h3>1. Menggunakan Python Interactive Shell</h3>
        <CodeBlock language="bash">
{`python
# atau
python3`}
        </CodeBlock>

        <p>Kemudian ketik:</p>
        <CodeBlock language="python">
{`print("Hello, World!")
# Output: Hello, World!`}
        </CodeBlock>

        <h3>2. Membuat File Python</h3>
        <p>Buat file <code>hello.py</code>:</p>
        <CodeBlock language="python">
{`# hello.py
print("Hello, World!")
print("Selamat datang di Python!")

# Multi-line string
message = """
Python adalah bahasa pemrograman
yang mudah dipelajari dan powerful!
"""
print(message)`}
        </CodeBlock>

        <p>Jalankan file:</p>
        <CodeBlock language="bash">
{`python hello.py
# atau
python3 hello.py`}
        </CodeBlock>
      </Section>

      <Section title="Struktur Dasar Python">
        <h3>1. Comments</h3>
        <CodeBlock language="python">
{`# Ini adalah single-line comment

"""
Ini adalah multi-line comment
atau docstring
"""

'''
Bisa juga pakai single quote
untuk multi-line comment
'''`}
        </CodeBlock>

        <h3>2. Indentation (PENTING!)</h3>
        <p>
          Python menggunakan indentation (spasi/tab) untuk menandai code block, 
          BUKAN curly braces seperti Java/JavaScript.
        </p>
        <CodeBlock language="python">
{`# BENAR ✅
if True:
    print("Ini benar")
    print("Masih di dalam if")

# SALAH ❌ - IndentationError
if True:
print("Error: tidak ada indentation")`}
        </CodeBlock>

        <Note type="warning">
          Gunakan 4 spasi untuk indentation (standard Python). Jangan mix spasi dan tab!
        </Note>

        <h3>3. Case Sensitivity</h3>
        <CodeBlock language="python">
{`name = "Budi"
Name = "Andi"
NAME = "Citra"

print(name)  # Budi
print(Name)  # Andi
print(NAME)  # Citra

# Ketiga variable ini BERBEDA!`}
        </CodeBlock>
      </Section>

      <Section title="Python Interactive Mode vs Script Mode">
        <h3>1. Interactive Mode (REPL)</h3>
        <p>Cocok untuk testing cepat, eksperimen, dan learning:</p>
        <CodeBlock language="python">
{`>>> 2 + 2
4
>>> name = "Python"
>>> print(name)
Python
>>> exit()  # keluar dari interactive mode`}
        </CodeBlock>

        <h3>2. Script Mode (.py file)</h3>
        <p>Untuk program yang lebih kompleks dan permanen:</p>
        <CodeBlock language="python">
{`# program.py
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))

# Jalankan: python program.py`}
        </CodeBlock>
      </Section>

      <Section title="Pip - Package Manager">
        <h3>Install Package</h3>
        <CodeBlock language="bash">
{`# Install package
pip install requests

# Install specific version
pip install requests==2.28.0

# Install multiple packages
pip install requests pandas numpy

# Install dari requirements.txt
pip install -r requirements.txt`}
        </CodeBlock>

        <h3>List & Uninstall Package</h3>
        <CodeBlock language="bash">
{`# List semua package terinstall
pip list

# Show detail package
pip show requests

# Uninstall package
pip uninstall requests

# Update package
pip install --upgrade requests`}
        </CodeBlock>

        <h3>Create requirements.txt</h3>
        <CodeBlock language="bash">
{`# Export semua package ke file
pip freeze > requirements.txt

# Isi file:
# requests==2.28.1
# pandas==1.5.3
# numpy==1.24.2`}
        </CodeBlock>
      </Section>

      <Section title="Python REPL Tips">
        <h3>Useful Commands di Interactive Mode</h3>
        <CodeBlock language="python">
{`# Help function
>>> help(print)
>>> help(str)

# Dir - lihat semua attributes/methods
>>> dir(str)
>>> dir([])

# Type checking
>>> type(42)
<class 'int'>
>>> type("hello")
<class 'str'>

# Previous result (_)
>>> 5 + 3
8
>>> _ + 2
10

# Clear screen
>>> import os
>>> os.system('clear')  # Linux/macOS
>>> os.system('cls')    # Windows`}
        </CodeBlock>
      </Section>

      <Section title="Python Style Guide (PEP 8)">
        <p>
          PEP 8 adalah style guide resmi Python. Beberapa aturan penting:
        </p>
        
        <h3>1. Naming Conventions</h3>
        <CodeBlock language="python">
{`# Variables & Functions: snake_case
user_name = "Budi"
def calculate_total():
    pass

# Classes: PascalCase
class UserProfile:
    pass

# Constants: UPPER_CASE
MAX_SIZE = 100
API_KEY = "secret123"

# Private (convention): prefix dengan _
_internal_var = "private"
def _helper_function():
    pass`}
        </CodeBlock>

        <h3>2. Line Length & Spacing</h3>
        <CodeBlock language="python">
{`# Max 79 karakter per line
# Gunakan line continuation jika panjang

# Spacing around operators
result = (a + b) * c

# No space around = in arguments
def function(name="default", age=20):
    pass

# 2 blank lines antara top-level functions/classes
def function_one():
    pass


def function_two():
    pass


class MyClass:
    pass`}
        </CodeBlock>

        <h3>3. Import Style</h3>
        <CodeBlock language="python">
{`# Standard library imports
import os
import sys

# Third-party imports
import requests
import pandas as pd

# Local imports
from myapp import models
from myapp.utils import helper

# ❌ Avoid wildcard imports
# from module import *

# ✅ Explicit imports
from math import sqrt, pi`}
        </CodeBlock>
      </Section>

      <Section title="Common Python Tools">
        <h3>1. Black (Code Formatter)</h3>
        <CodeBlock language="bash">
{`pip install black
black myfile.py
black .  # format semua files`}
        </CodeBlock>

        <h3>2. Pylint (Linter)</h3>
        <CodeBlock language="bash">
{`pip install pylint
pylint myfile.py`}
        </CodeBlock>

        <h3>3. pytest (Testing)</h3>
        <CodeBlock language="bash">
{`pip install pytest
pytest tests/`}
        </CodeBlock>

        <h3>4. IPython (Enhanced Interactive Shell)</h3>
        <CodeBlock language="bash">
{`pip install ipython
ipython`}
        </CodeBlock>
      </Section>

      <Section title="Contoh Program Sederhana">
        <CodeBlock language="python">
{`# program.py - Program interaktif sederhana

# Input dari user
name = input("Siapa nama kamu? ")
age = input("Berapa umur kamu? ")

# Convert string ke int
age = int(age)

# Processing
next_year = age + 1

# Output dengan f-string
print(f"Halo {name}!")
print(f"Umur kamu sekarang: {age} tahun")
print(f"Tahun depan kamu akan berusia {next_year} tahun")

# Conditional
if age >= 18:
    print("Kamu sudah dewasa!")
else:
    print(f"Kamu masih {18 - age} tahun lagi menjadi dewasa")

# Loop
print("\\nHitung mundur:")
for i in range(5, 0, -1):
    print(i)
print("🎉 Selamat belajar Python!")`}
        </CodeBlock>
      </Section>

      <Section title="Troubleshooting Common Issues">
        <h3>1. "python not found"</h3>
        <ul>
          <li>Pastikan Python sudah terinstall</li>
          <li>Cek "Add to PATH" saat instalasi</li>
          <li>Restart terminal/command prompt</li>
          <li>Coba gunakan <code>python3</code> instead of <code>python</code></li>
        </ul>

        <h3>2. "pip not found"</h3>
        <CodeBlock language="bash">
{`# Install pip manually
python -m ensurepip --upgrade

# atau download get-pip.py
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py`}
        </CodeBlock>

        <h3>3. "Permission Denied"</h3>
        <CodeBlock language="bash">
{`# Gunakan --user flag
pip install --user package_name

# atau gunakan virtual environment (recommended)`}
        </CodeBlock>

        <h3>4. IndentationError</h3>
        <ul>
          <li>Pastikan konsisten: 4 spasi (jangan tab)</li>
          <li>Set editor to "Spaces: 4" instead of "Tab"</li>
          <li>Gunakan formatter seperti Black</li>
        </ul>
      </Section>

      <Section title="Next Steps">
        <p>Setelah instalasi berhasil, kamu siap untuk:</p>
        <ul>
          <li>✅ Belajar Variables & Data Types (Materi 02)</li>
          <li>✅ Memahami Operators (Materi 03)</li>
          <li>✅ Control Flow - if/else, loops (Materi 04)</li>
          <li>✅ Functions (Materi 05)</li>
        </ul>

        <Note type="success">
          Selamat! Kamu sudah setup Python environment dan siap mulai coding! 🚀
        </Note>
      </Section>

      <Section title="Resources">
        <ul>
          <li><a href="https://docs.python.org/3/" target="_blank" rel="noopener noreferrer">Python Official Documentation</a></li>
          <li><a href="https://www.python.org/dev/peps/pep-0008/" target="_blank" rel="noopener noreferrer">PEP 8 Style Guide</a></li>
          <li><a href="https://realpython.com/" target="_blank" rel="noopener noreferrer">Real Python Tutorials</a></li>
          <li><a href="https://www.learnpython.org/" target="_blank" rel="noopener noreferrer">LearnPython.org</a></li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
