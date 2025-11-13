import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi08() {
  return (
    <MateriLayout title="String Methods">
      <Section title="String Basics">
        <CodeBlock language="python">
{`# Strings are immutable sequences of characters
text = "Hello, World!"
print(len(text))  # 13

# Strings can be indexed and sliced
print(text[0])      # H
print(text[-1])     # !
print(text[0:5])    # Hello
print(text[7:])     # World!
print(text[::-1])   # !dlroW ,olleH (reverse)`}
        </CodeBlock>
      </Section>

      <Section title="Case Conversion Methods">
        <CodeBlock language="python">
{`text = "Hello World"

# Upper case
print(text.upper())  # HELLO WORLD

# Lower case
print(text.lower())  # hello world

# Title case (capitalize each word)
print(text.title())  # Hello World

# Capitalize first letter only
print(text.capitalize())  # Hello world

# Swap case
print(text.swapcase())  # hELLO wORLD

# Case checking
print(text.isupper())  # False
print(text.islower())  # False
print(text.istitle())  # True`}
        </CodeBlock>
      </Section>

      <Section title="String Searching">
        <CodeBlock language="python">
{`text = "Hello World, Welcome to Python"

# Find substring (returns index or -1)
index = text.find("World")
print(index)  # 6
print(text.find("Java"))  # -1 (not found)

# Find from right
index = text.rfind("o")
print(index)  # 25 (last 'o')

# Index (like find, but raises ValueError if not found)
try:
    index = text.index("Java")
except ValueError:
    print("Not found")

# Count occurrences
count = text.count("o")
print(count)  # 4

# Check start/end
print(text.startswith("Hello"))  # True
print(text.endswith("Python"))   # True
print(text.startswith("World", 6))  # True (start from index 6)`}
        </CodeBlock>
      </Section>

      <Section title="String Replacement">
        <CodeBlock language="python">
{`text = "Hello World"

# Replace all occurrences
new_text = text.replace("World", "Python")
print(new_text)  # Hello Python

# Replace with limit
text = "one one one one"
new_text = text.replace("one", "two", 2)
print(new_text)  # two two one one

# Strings are immutable!
original = "Hello"
original.replace("H", "J")  # Creates new string
print(original)  # Still "Hello"`}
        </CodeBlock>
      </Section>

      <Section title="String Split & Join">
        <CodeBlock language="python">
{`# Split (default: split by whitespace)
text = "Hello World Python"
words = text.split()
print(words)  # ['Hello', 'World', 'Python']

# Split by delimiter
text = "apple,banana,cherry"
fruits = text.split(",")
print(fruits)  # ['apple', 'banana', 'cherry']

# Split with max splits
text = "a-b-c-d-e"
parts = text.split("-", 2)
print(parts)  # ['a', 'b', 'c-d-e']

# Split lines
text = "Line 1\\nLine 2\\nLine 3"
lines = text.splitlines()
print(lines)  # ['Line 1', 'Line 2', 'Line 3']

# Join (opposite of split)
words = ["Hello", "World", "Python"]
text = " ".join(words)
print(text)  # Hello World Python

fruits = ["apple", "banana", "cherry"]
text = ", ".join(fruits)
print(text)  # apple, banana, cherry`}
        </CodeBlock>
      </Section>

      <Section title="String Stripping">
        <CodeBlock language="python">
{`# Remove whitespace from both ends
text = "  Hello World  "
print(text.strip())  # "Hello World"

# Remove from left
print(text.lstrip())  # "Hello World  "

# Remove from right
print(text.rstrip())  # "  Hello World"

# Remove specific characters
text = "***Hello***"
print(text.strip("*"))  # "Hello"

text = "xxxHelloxxx"
print(text.strip("x"))  # "Hello"

# Remove prefix/suffix (Python 3.9+)
text = "TestHelloTest"
print(text.removeprefix("Test"))  # "HelloTest"
print(text.removesuffix("Test"))  # "TestHello"`}
        </CodeBlock>
      </Section>

      <Section title="String Formatting">
        <h3>1. f-strings (Python 3.6+, RECOMMENDED)</h3>
        <CodeBlock language="python">
{`name = "Budi"
age = 25
price = 1234.5678

# Basic f-string
message = f"Hello, {name}!"
print(message)  # Hello, Budi!

# Expressions
print(f"{name} will be {age + 1} next year")

# Formatting numbers
print(f"Price: ${'{price:.2f}'}")  # Price: $1234.57
print(f"Price: ${'{price:,.2f}'}") # Price: $1,234.57

# Padding and alignment
print(f"{'{name:>10}'}")  # Right align
print(f"{'{name:<10}'}")  # Left align
print(f"{'{name:^10}'}")  # Center

# Multiple values
print(f"{'{name}'} is {'{age}'} years old")`}
        </CodeBlock>

        <h3>2. format() Method</h3>
        <CodeBlock language="python">
{`# Positional
message = "Hello, {}!".format("Budi")
message = "{} is {} years old".format("Budi", 25)

# Named
message = "{name} is {age} years old".format(name="Budi", age=25)

# Index
message = "{0} {1} {0}".format("Hello", "World")  # Hello World Hello`}
        </CodeBlock>

        <h3>3. % Operator (Old Style)</h3>
        <CodeBlock language="python">
{`name = "Budi"
age = 25
message = "%s is %d years old" % (name, age)
print(message)  # Budi is 25 years old`}
        </CodeBlock>
      </Section>

      <Section title="String Validation">
        <CodeBlock language="python">
{`# Check if all characters are alphabetic
print("Hello".isalpha())     # True
print("Hello123".isalpha())  # False

# Check if all characters are digits
print("12345".isdigit())     # True
print("123.45".isdigit())    # False

# Check if all characters are alphanumeric
print("Hello123".isalnum())  # True
print("Hello 123".isalnum()) # False (space)

# Check if all characters are whitespace
print("   ".isspace())       # True
print("  a  ".isspace())     # False

# Check if string is valid identifier
print("variable_name".isidentifier())  # True
print("123variable".isidentifier())    # False

# Check if all characters are printable
print("Hello\\nWorld".isprintable())   # False (\\n not printable)
print("Hello World".isprintable())     # True`}
        </CodeBlock>
      </Section>

      <Section title="String Padding & Alignment">
        <CodeBlock language="python">
{`text = "Hello"

# Center (pad both sides)
print(text.center(10))      # "  Hello   "
print(text.center(10, "*")) # "**Hello***"

# Left justify
print(text.ljust(10))       # "Hello     "
print(text.ljust(10, "-"))  # "Hello-----"

# Right justify
print(text.rjust(10))       # "     Hello"
print(text.rjust(10, "-"))  # "-----Hello"

# Zero fill (for numbers)
number = "42"
print(number.zfill(5))      # "00042"`}
        </CodeBlock>
      </Section>

      <Section title="Practical Examples">
        <h3>1. Email Validator</h3>
        <CodeBlock language="python">
{`def validate_email(email):
    email = email.strip().lower()
    
    if "@" not in email:
        return False
    
    if email.count("@") != 1:
        return False
    
    if email.startswith("@") or email.endswith("@"):
        return False
    
    local, domain = email.split("@")
    
    if not local or not domain:
        return False
    
    if "." not in domain:
        return False
    
    return True

print(validate_email("user@example.com"))    # True
print(validate_email("invalid.email"))       # False
print(validate_email("user@@example.com"))   # False`}
        </CodeBlock>

        <h3>2. Text Statistics</h3>
        <CodeBlock language="python">
{`def text_stats(text):
    words = text.split()
    
    stats = {
        "characters": len(text),
        "words": len(words),
        "lines": text.count("\\n") + 1,
        "uppercase": sum(1 for c in text if c.isupper()),
        "lowercase": sum(1 for c in text if c.islower()),
        "digits": sum(1 for c in text if c.isdigit()),
        "spaces": text.count(" ")
    }
    
    return stats

text = "Hello World 123"
for key, value in text_stats(text).items():
    print(f"{key}: {value}")`}
        </CodeBlock>

        <h3>3. Password Strength Checker</h3>
        <CodeBlock language="python">
{`def check_password_strength(password):
    score = 0
    feedback = []
    
    if len(password) >= 8:
        score += 1
    else:
        feedback.append("At least 8 characters")
    
    if any(c.isupper() for c in password):
        score += 1
    else:
        feedback.append("Include uppercase letter")
    
    if any(c.islower() for c in password):
        score += 1
    else:
        feedback.append("Include lowercase letter")
    
    if any(c.isdigit() for c in password):
        score += 1
    else:
        feedback.append("Include digit")
    
    if any(c in "!@#$%^&*()" for c in password):
        score += 1
    else:
        feedback.append("Include special character")
    
    strength = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"]
    
    return {
        "score": score,
        "strength": strength[score],
        "feedback": feedback
    }

result = check_password_strength("Pass123!")
print(f"Strength: {result['strength']}")
for tip in result['feedback']:
    print(f"- {tip}")`}
        </CodeBlock>

        <h3>4. Slug Generator (URL-friendly)</h3>
        <CodeBlock language="python">
{`def create_slug(title):
    # Convert to lowercase
    slug = title.lower()
    
    # Replace spaces with hyphens
    slug = slug.replace(" ", "-")
    
    # Remove special characters
    allowed = "abcdefghijklmnopqrstuvwxyz0123456789-"
    slug = "".join(c for c in slug if c in allowed)
    
    # Remove multiple consecutive hyphens
    while "--" in slug:
        slug = slug.replace("--", "-")
    
    # Remove leading/trailing hyphens
    slug = slug.strip("-")
    
    return slug

print(create_slug("Hello World! Python 2024"))  # hello-world-python-2024
print(create_slug("My @awesome# Blog Post"))   # my-awesome-blog-post`}
        </CodeBlock>

        <h3>5. Name Formatter</h3>
        <CodeBlock language="python">
{`def format_name(name):
    # Strip and title case
    name = name.strip().title()
    
    # Handle multiple spaces
    words = name.split()
    name = " ".join(words)
    
    return name

print(format_name("  john   DOE  "))      # John Doe
print(format_name("MARY jane SMITH"))     # Mary Jane Smith

def get_initials(name):
    words = name.strip().split()
    initials = "".join(word[0].upper() for word in words if word)
    return initials

print(get_initials("John Doe"))           # JD
print(get_initials("Mary Jane Smith"))    # MJS`}
        </CodeBlock>
      </Section>

      <Section title="Common Mistakes">
        <h3>1. Strings are Immutable</h3>
        <CodeBlock language="python">
{`# ❌ This doesn't modify original string
text = "hello"
text.upper()  # Creates new string but doesn't assign
print(text)   # Still "hello"

# Correct: assign result
text = "hello"
text = text.upper()
print(text)   # "HELLO"`}
        </CodeBlock>

        <h3>2. Split Returns List</h3>
        <CodeBlock language="python">
{`# ❌ Can't directly access
text = "Hello World"
# first_word = text.split()[0]  # OK if not empty

# Better: check first
words = text.split()
if words:
    first_word = words[0]`}
        </CodeBlock>
      </Section>

      <Section title="Best Practices">
        <ul>
          <li>Use f-strings untuk formatting (Python 3.6+)</li>
          <li>Use <code>strip()</code> untuk clean user input</li>
          <li><code>startswith()</code> dan <code>endswith()</code> lebih readable daripada slicing</li>
          <li><code>in</code> operator untuk check substring</li>
          <li><code>join()</code> lebih efficient daripada concatenation dalam loop</li>
          <li>Remember: strings are immutable, methods return new strings</li>
        </ul>
      </Section>

      <Section title="Summary">
        <ul>
          <li>Case: upper, lower, title, capitalize, swapcase</li>
          <li>Search: find, rfind, index, count, startswith, endswith</li>
          <li>Replace: replace</li>
          <li>Split/Join: split, join, splitlines</li>
          <li>Strip: strip, lstrip, rstrip</li>
          <li>Formatting: f-strings (recommended), format(), %</li>
          <li>Validation: isalpha, isdigit, isalnum, isspace, etc.</li>
          <li>Padding: center, ljust, rjust, zfill</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
