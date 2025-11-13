import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi17() {
  return (
    <MateriLayout title="Context Managers">
      <Section id="what-are-context-managers" heading="What are Context Managers?">
        <p>Context manager mengatur setup dan cleanup resources (files, connections, locks).</p>
        <CodeBlock language="python">
{`# with statement uses context manager
with open('file.txt', 'r') as f:
    content = f.read()
# File automatically closed after block

# Without context manager (manual)
f = open('file.txt', 'r')
try:
    content = f.read()
finally:
    f.close()  # Must remember to close`}
        </CodeBlock>
      </Section>

      <Section id="creating-context-manager-classbased" heading="Creating Context Manager (Class-based)">
        <CodeBlock language="python">
{`class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        print(f"Opening {self.filename}")
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Closing {self.filename}")
        if self.file:
            self.file.close()
        # Return False to propagate exceptions
        return False

with FileManager('test.txt', 'w') as f:
    f.write("Hello World")
# Output:
# Opening test.txt
# Closing test.txt`}
        </CodeBlock>
      </Section>

      <Section id="creating-context-manager-contextlib" heading="Creating Context Manager (contextlib)">
        <CodeBlock language="python">
{`from contextlib import contextmanager

@contextmanager
def file_manager(filename, mode):
    print(f"Opening {filename}")
    file = open(filename, mode)
    try:
        yield file
    finally:
        print(f"Closing {filename}")
        file.close()

with file_manager('test.txt', 'w') as f:
    f.write("Hello")`}
        </CodeBlock>
      </Section>

      <Section id="database-connection-manager" heading="Database Connection Manager">
        <CodeBlock language="python">
{`import sqlite3
from contextlib import contextmanager

@contextmanager
def database_connection(db_name):
    conn = sqlite3.connect(db_name)
    try:
        yield conn
    finally:
        conn.commit()
        conn.close()

with database_connection('app.db') as conn:
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS users (id, name)")
    cursor.execute("INSERT INTO users VALUES (1, 'Budi')")
# Connection automatically committed and closed`}
        </CodeBlock>
      </Section>

      <Section id="timer-context-manager" heading="Timer Context Manager">
        <CodeBlock language="python">
{`import time
from contextlib import contextmanager

@contextmanager
def timer(label):
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        print(f"{label}: {end - start:.2f}s")

with timer("Processing"):
    time.sleep(2)
    # Do work here
# Output: Processing: 2.00s`}
        </CodeBlock>
      </Section>

      <Section id="multiple-context-managers" heading="Multiple Context Managers">
        <CodeBlock language="python">
{`# Multiple with statements
with open('input.txt', 'r') as infile, \\
     open('output.txt', 'w') as outfile:
    content = infile.read()
    outfile.write(content.upper())

# Nested context managers
with open('file1.txt', 'r') as f1:
    with open('file2.txt', 'w') as f2:
        f2.write(f1.read())`}
        </CodeBlock>
      </Section>

      <Section id="practical-temporary-directory" heading="Practical: Temporary Directory">
        <CodeBlock language="python">
{`import os
import shutil
from contextlib import contextmanager

@contextmanager
def temporary_directory(dirname):
    os.makedirs(dirname)
    try:
        yield dirname
    finally:
        shutil.rmtree(dirname)

with temporary_directory('temp_work') as tmpdir:
    # Use temporary directory
    with open(f'{tmpdir}/data.txt', 'w') as f:
        f.write("Temporary data")
    # Process files...
# Directory automatically deleted`}
        </CodeBlock>
      </Section>

      <Section id="summary" heading="Summary">
        <ul>
          <li>Context manager: Manages resource setup/cleanup</li>
          <li>with statement: Cleaner resource management</li>
          <li>Class-based: __enter__() dan __exit__()</li>
          <li>@contextmanager decorator: Easier with yield</li>
          <li>Use cases: files, DB connections, locks, timers</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
