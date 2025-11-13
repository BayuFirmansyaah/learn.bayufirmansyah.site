import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi18() {
  return (
    <MateriLayout title="Regular Expressions">
      <Section title="Introduction to Regex">
        <p>Regular expressions (regex) untuk pattern matching dalam strings.</p>
        <CodeBlock language="python">
{`import re

# Basic pattern matching
text = "Hello World"
pattern = r"World"

if re.search(pattern, text):
    print("Pattern found!")  # Pattern found!`}
        </CodeBlock>
      </Section>

      <Section title="Common Patterns">
        <CodeBlock language="python">
{`import re

# \\d - digit
re.search(r"\\d", "abc123")  # Finds '1'

# \\w - word character (alphanumeric + _)
re.search(r"\\w+", "hello_world")  # Finds 'hello_world'

# \\s - whitespace
re.search(r"\\s", "hello world")  # Finds ' '

# . - any character
re.search(r"h.llo", "hello")  # Matches

# * - 0 or more
re.search(r"ab*c", "ac")  # Matches (0 b's)

# + - 1 or more
re.search(r"ab+c", "abbbc")  # Matches

# ? - 0 or 1
re.search(r"colou?r", "color")  # Matches

# {n} - exactly n
re.search(r"\\d{3}", "123")  # Matches 3 digits

# {n,m} - between n and m
re.search(r"\\d{2,4}", "12345")  # Finds '1234'`}
        </CodeBlock>
      </Section>

      <Section title="re.search() vs re.match() vs re.findall()">
        <CodeBlock language="python">
{`import re

text = "Contact: 123-456-7890 or 098-765-4321"

# search - finds first match anywhere
match = re.search(r"\\d{3}", text)
print(match.group())  # 123

# match - matches from start only
match = re.match(r"Contact", text)
print(match.group())  # Contact

# findall - finds all matches
numbers = re.findall(r"\\d{3}-\\d{3}-\\d{4}", text)
print(numbers)  # ['123-456-7890', '098-765-4321']`}
        </CodeBlock>
      </Section>

      <Section title="Groups and Capturing">
        <CodeBlock language="python">
{`import re

# Groups with ()
text = "Name: Budi, Age: 25"
pattern = r"Name: (\\w+), Age: (\\d+)"

match = re.search(pattern, text)
if match:
    name = match.group(1)  # Budi
    age = match.group(2)   # 25
    print(f"Name: {name}, Age: {age}")

# Named groups
pattern = r"Name: (?P<name>\\w+), Age: (?P<age>\\d+)"
match = re.search(pattern, text)
if match:
    print(match.group('name'))  # Budi
    print(match.group('age'))   # 25`}
        </CodeBlock>
      </Section>

      <Section title="re.sub() - Replace">
        <CodeBlock language="python">
{`import re

# Replace phone numbers
text = "Call me at 123-456-7890"
result = re.sub(r"\\d{3}-\\d{3}-\\d{4}", "XXX-XXX-XXXX", text)
print(result)  # Call me at XXX-XXX-XXXX

# Replace with captured groups
text = "Date: 2024-01-15"
result = re.sub(r"(\\d{4})-(\\d{2})-(\\d{2})", r"\\3/\\2/\\1", text)
print(result)  # Date: 15/01/2024`}
        </CodeBlock>
      </Section>

      <Section title="Practical Examples">
        <h3>1. Email Validation</h3>
        <CodeBlock language="python">
{`import re

def is_valid_email(email):
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    return bool(re.match(pattern, email))

print(is_valid_email("user@example.com"))  # True
print(is_valid_email("invalid.email"))     # False`}
        </CodeBlock>

        <h3>2. Extract URLs</h3>
        <CodeBlock language="python">
{`import re

text = """
Visit https://example.com or http://test.org
for more info.
"""

urls = re.findall(r"https?://[\\w.-]+", text)
print(urls)  # ['https://example.com', 'http://test.org']`}
        </CodeBlock>

        <h3>3. Phone Number Formatter</h3>
        <CodeBlock language="python">
{`import re

def format_phone(phone):
    # Remove non-digits
    digits = re.sub(r"\\D", "", phone)
    
    # Format as (XXX) XXX-XXXX
    if len(digits) == 10:
        return re.sub(r"(\\d{3})(\\d{3})(\\d{4})", r"(\\1) \\2-\\3", digits)
    return phone

print(format_phone("1234567890"))      # (123) 456-7890
print(format_phone("123-456-7890"))    # (123) 456-7890`}
        </CodeBlock>
      </Section>

      <Section title="Compile Patterns for Reuse">
        <CodeBlock language="python">
{`import re

# Compile pattern for better performance
email_pattern = re.compile(r"^[\\w.-]+@[\\w.-]+\\.\\w+$")

# Reuse compiled pattern
emails = [
    "user@example.com",
    "test@test.org",
    "invalid.email"
]

for email in emails:
    if email_pattern.match(email):
        print(f"{email} is valid")`}
        </CodeBlock>
      </Section>

      <Section title="Summary">
        <ul>
          <li>re module: Python regex library</li>
          <li>Patterns: \\d (digit), \\w (word), \\s (space), . (any)</li>
          <li>Quantifiers: * (0+), + (1+), ? (0/1), {`{n,m}`}</li>
          <li>re.search(), re.match(), re.findall()</li>
          <li>Groups: () for capturing, (?P&lt;name&gt;) for named</li>
          <li>re.sub() for replacement</li>
          <li>re.compile() for reuse and performance</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
