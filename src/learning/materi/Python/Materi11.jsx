import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi11() {
  return (
    <MateriLayout title="Modules & Packages">
      <Section title="What are Modules?">
        <p>
          Module adalah file Python (.py) yang berisi functions, classes, dan variables 
          yang dapat diimport dan digunakan di program lain.
        </p>
      </Section>

      <Section title="Creating a Module">
        <CodeBlock language="python">
{`# mymodule.py
def greet(name):
    return f"Hello, {name}!"

def add(a, b):
    return a + b

PI = 3.14159`}
        </CodeBlock>
      </Section>

      <Section title="Importing Modules">
        <CodeBlock language="python">
{`# Import entire module
import mymodule

result = mymodule.add(5, 3)
print(mymodule.greet("Budi"))
print(mymodule.PI)

# Import specific items
from mymodule import greet, add

print(greet("Ani"))
print(add(10, 20))

# Import with alias
import mymodule as mm

print(mm.greet("Citra"))

# Import all (not recommended)
from mymodule import *`}
        </CodeBlock>
      </Section>

      <Section title="Built-in Modules">
        <CodeBlock language="python">
{`# math module
import math

print(math.sqrt(16))  # 4.0
print(math.pi)        # 3.141592653589793
print(math.ceil(4.2)) # 5
print(math.floor(4.8))# 4

# random module
import random

print(random.randint(1, 10))
print(random.choice(['a', 'b', 'c']))
print(random.random())  # 0.0 to 1.0

# datetime module
from datetime import datetime, timedelta

now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M:%S"))

tomorrow = now + timedelta(days=1)
print(tomorrow)

# os module
import os

print(os.getcwd())
print(os.listdir('.'))`}
        </CodeBlock>
      </Section>

      <Section title="Packages">
        <p>Package adalah directory yang berisi multiple modules dengan file __init__.py</p>

        <CodeBlock language="bash">
{`mypackage/
    __init__.py
    module1.py
    module2.py
    subpackage/
        __init__.py
        module3.py`}
        </CodeBlock>

        <CodeBlock language="python">
{`# Import from package
import mypackage.module1
from mypackage import module2
from mypackage.subpackage import module3

# __init__.py can have initialization code
# mypackage/__init__.py
print("Package initialized")
__all__ = ['module1', 'module2']`}
        </CodeBlock>
      </Section>

      <Section title="Module Search Path">
        <CodeBlock language="python">
{`import sys

# Python searches modules in these paths
for path in sys.path:
    print(path)

# Add custom path
sys.path.append('/path/to/modules')`}
        </CodeBlock>
      </Section>

      <Section title="if __name__ == '__main__'">
        <CodeBlock language="python">
{`# mymodule.py
def main():
    print("Running as main program")

def greet(name):
    return f"Hello, {name}!"

# Only runs if file executed directly
if __name__ == "__main__":
    main()

# When imported:
# import mymodule  # main() NOT called
# When run directly:
# python mymodule.py  # main() IS called`}
        </CodeBlock>
      </Section>

      <Section title="Summary">
        <ul>
          <li>Module = Python file dengan reusable code</li>
          <li>Import dengan: import, from...import</li>
          <li>Built-in modules: math, random, datetime, os, sys, etc.</li>
          <li>Package = directory dengan __init__.py</li>
          <li>Use <code>if __name__ == "__main__":</code> untuk executable code</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
