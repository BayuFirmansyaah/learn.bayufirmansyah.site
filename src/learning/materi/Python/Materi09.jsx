import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi09() {
  return (
    <MateriLayout title="File Handling">
      <Section id="opening-files" heading="Opening Files">
        <CodeBlock language="python">
{`# Open file (read mode - default)
file = open("data.txt", "r")

# File modes:
# 'r' - Read (default)
# 'w' - Write (overwrite)
# 'a' - Append
# 'x' - Exclusive creation (fails if exists)
# 'r+' - Read and write
# 't' - Text mode (default)
# 'b' - Binary mode

# Open for writing
file = open("output.txt", "w")

# Open for appending
file = open("log.txt", "a")

# Binary mode
file = open("image.png", "rb")`}
        </CodeBlock>

        <Note type="warning">
          Jangan lupa close file setelah selesai menggunakan <code>file.close()</code>
        </Note>
      </Section>

      <Section id="reading-files" heading="Reading Files">
        <h3>1. read() - Read Entire File</h3>
        <CodeBlock language="python">
{`# Read entire file as string
file = open("data.txt", "r")
content = file.read()
print(content)
file.close()

# Read first N characters
file = open("data.txt", "r")
first_10 = file.read(10)
file.close()`}
        </CodeBlock>

        <h3>2. readline() - Read One Line</h3>
        <CodeBlock language="python">
{`file = open("data.txt", "r")
line1 = file.readline()
line2 = file.readline()
file.close()

print(line1)  # First line
print(line2)  # Second line`}
        </CodeBlock>

        <h3>3. readlines() - Read All Lines as List</h3>
        <CodeBlock language="python">
{`file = open("data.txt", "r")
lines = file.readlines()  # List of strings
file.close()

for line in lines:
    print(line.strip())  # Remove \\n`}
        </CodeBlock>

        <h3>4. Loop Through File (Best Practice)</h3>
        <CodeBlock language="python">
{`file = open("data.txt", "r")
for line in file:
    print(line.strip())
file.close()`}
        </CodeBlock>
      </Section>

      <Section id="writing-files" heading="Writing Files">
        <CodeBlock language="python">
{`# Write mode (overwrites existing file)
file = open("output.txt", "w")
file.write("Hello World\\n")
file.write("Second line\\n")
file.close()

# Write multiple lines
lines = ["Line 1\\n", "Line 2\\n", "Line 3\\n"]
file = open("output.txt", "w")
file.writelines(lines)
file.close()

# Append mode (adds to end)
file = open("log.txt", "a")
file.write("New log entry\\n")
file.close()`}
        </CodeBlock>
      </Section>

      <Section id="with-statement-context-manager" heading="with Statement (Context Manager)">
        <p>Best practice - automatically closes file:</p>
        <CodeBlock language="python">
{`# Reading with 'with'
with open("data.txt", "r") as file:
    content = file.read()
    print(content)
# File automatically closed here

# Writing with 'with'
with open("output.txt", "w") as file:
    file.write("Hello World\\n")

# Multiple files
with open("input.txt", "r") as infile, \\
     open("output.txt", "w") as outfile:
    content = infile.read()
    outfile.write(content.upper())`}
        </CodeBlock>

        <Note type="success">
          Selalu gunakan <code>with</code> statement untuk file handling - lebih aman dan clean!
        </Note>
      </Section>

      <Section id="file-existence-info" heading="File Existence & Info">
        <CodeBlock language="python">
{`import os

# Check if file exists
if os.path.exists("data.txt"):
    print("File exists")

# Check if it's a file
if os.path.isfile("data.txt"):
    print("It's a file")

# Check if it's a directory
if os.path.isdir("mydir"):
    print("It's a directory")

# Get file size
size = os.path.getsize("data.txt")
print(f"Size: {size} bytes")

# Get file info
import os.path
stat = os.stat("data.txt")
print(f"Modified: {stat.st_mtime}")
print(f"Size: {stat.st_size}")`}
        </CodeBlock>
      </Section>

      <Section id="file-operations" heading="File Operations">
        <CodeBlock language="python">
{`import os
import shutil

# Rename file
os.rename("old.txt", "new.txt")

# Delete file
os.remove("file.txt")

# Copy file
shutil.copy("source.txt", "destination.txt")

# Move file
shutil.move("file.txt", "newdir/file.txt")

# Create directory
os.mkdir("newdir")

# Create nested directories
os.makedirs("parent/child/grandchild")

# Remove directory
os.rmdir("emptydir")  # Only empty dir

# Remove directory with contents
shutil.rmtree("dirwithfiles")

# List files in directory
files = os.listdir(".")
for file in files:
    print(file)`}
        </CodeBlock>
      </Section>

      <Section id="working-with-paths" heading="Working with Paths">
        <CodeBlock language="python">
{`import os

# Get current working directory
cwd = os.getcwd()
print(cwd)

# Change directory
os.chdir("/path/to/dir")

# Join paths (cross-platform)
path = os.path.join("folder", "subfolder", "file.txt")

# Get absolute path
abs_path = os.path.abspath("file.txt")

# Get directory name
dirname = os.path.dirname("/path/to/file.txt")  # /path/to

# Get file name
basename = os.path.basename("/path/to/file.txt")  # file.txt

# Split path
dir_path, filename = os.path.split("/path/to/file.txt")

# Split extension
name, ext = os.path.splitext("file.txt")  # ('file', '.txt')`}
        </CodeBlock>
      </Section>

      <Section id="working-with-csv-files" heading="Working with CSV Files">
        <CodeBlock language="python">
{`import csv

# Reading CSV
with open("data.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)  # Each row is a list

# Reading CSV with header
with open("data.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row)  # Each row is a dict

# Writing CSV
data = [
    ["Name", "Age", "City"],
    ["Budi", "25", "Jakarta"],
    ["Ani", "22", "Bandung"]
]

with open("output.csv", "w", newline='') as file:
    writer = csv.writer(file)
    writer.writerows(data)

# Writing CSV with DictWriter
data = [
    {"name": "Budi", "age": 25, "city": "Jakarta"},
    {"name": "Ani", "age": 22, "city": "Bandung"}
]

with open("output.csv", "w", newline='') as file:
    fieldnames = ["name", "age", "city"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(data)`}
        </CodeBlock>
      </Section>

      <Section id="working-with-json-files" heading="Working with JSON Files">
        <CodeBlock language="python">
{`import json

# Writing JSON
data = {
    "name": "Budi",
    "age": 25,
    "skills": ["Python", "JavaScript"]
}

with open("data.json", "w") as file:
    json.dump(data, file, indent=2)

# Reading JSON
with open("data.json", "r") as file:
    data = json.load(file)
    print(data["name"])

# JSON string to dict
json_string = '{"name": "Budi", "age": 25}'
data = json.loads(json_string)

# Dict to JSON string
data = {"name": "Budi", "age": 25}
json_string = json.dumps(data, indent=2)
print(json_string)`}
        </CodeBlock>
      </Section>

      <Section id="practical-examples" heading="Practical Examples">
        <h3>1. Line Counter</h3>
        <CodeBlock language="python">
{`def count_lines(filename):
    try:
        with open(filename, 'r') as file:
            lines = file.readlines()
            return len(lines)
    except FileNotFoundError:
        print(f"File '{filename}' not found")
        return 0

count = count_lines("data.txt")
print(f"Total lines: {count}")`}
        </CodeBlock>

        <h3>2. Find and Replace in File</h3>
        <CodeBlock language="python">
{`def find_replace(filename, find_text, replace_text):
    try:
        # Read file
        with open(filename, 'r') as file:
            content = file.read()
        
        # Replace
        new_content = content.replace(find_text, replace_text)
        
        # Write back
        with open(filename, 'w') as file:
            file.write(new_content)
        
        print("Replace successful")
    except Exception as e:
        print(f"Error: {e}")

find_replace("data.txt", "old", "new")`}
        </CodeBlock>

        <h3>3. Log File Writer</h3>
        <CodeBlock language="python">
{`from datetime import datetime

def write_log(message, filename="app.log"):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = f"[{timestamp}] {message}\\n"
    
    with open(filename, 'a') as file:
        file.write(log_entry)

write_log("Application started")
write_log("User logged in")
write_log("Error occurred")`}
        </CodeBlock>

        <h3>4. File Statistics</h3>
        <CodeBlock language="python">
{`def file_stats(filename):
    try:
        with open(filename, 'r') as file:
            content = file.read()
            
        stats = {
            "characters": len(content),
            "words": len(content.split()),
            "lines": content.count('\\n') + 1,
            "size_bytes": os.path.getsize(filename)
        }
        
        return stats
    except Exception as e:
        return {"error": str(e)}

import os
stats = file_stats("data.txt")
for key, value in stats.items():
    print(f"{key}: {value}")`}
        </CodeBlock>

        <h3>5. Config File Manager</h3>
        <CodeBlock language="python">
{`import json

class ConfigManager:
    def __init__(self, config_file="config.json"):
        self.config_file = config_file
        self.config = self.load()
    
    def load(self):
        try:
            with open(self.config_file, 'r') as file:
                return json.load(file)
        except FileNotFoundError:
            return {}
    
    def save(self):
        with open(self.config_file, 'w') as file:
            json.dump(self.config, file, indent=2)
    
    def get(self, key, default=None):
        return self.config.get(key, default)
    
    def set(self, key, value):
        self.config[key] = value
        self.save()

# Usage
config = ConfigManager()
config.set("app_name", "MyApp")
config.set("version", "1.0.0")
print(config.get("app_name"))`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li>Always use <code>with</code> statement (context manager)</li>
          <li>Handle exceptions (FileNotFoundError, PermissionError, etc.)</li>
          <li>Use <code>os.path.join()</code> untuk cross-platform paths</li>
          <li>Close files properly (atau gunakan <code>with</code>)</li>
          <li>Use binary mode ('rb', 'wb') untuk non-text files</li>
          <li>Specify encoding untuk text files: <code>open(file, 'r', encoding='utf-8')</code></li>
          <li>Use <code>newline=''</code> saat menulis CSV</li>
        </ul>
      </Section>

      <Section id="summary" heading="Summary">
        <ul>
          <li>File modes: 'r', 'w', 'a', 'x', 'r+', 'b'</li>
          <li>Read methods: read(), readline(), readlines()</li>
          <li>Write methods: write(), writelines()</li>
          <li>Use <code>with</code> statement untuk auto-close</li>
          <li>os module untuk file operations (rename, remove, exists)</li>
          <li>csv module untuk CSV files</li>
          <li>json module untuk JSON files</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
