import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi14() {
  return (
    <MateriLayout title="List Comprehension & Generator Expressions">
      <Section title="List Comprehension Basics">
        <CodeBlock language="python">
{`# Traditional way
squares = []
for x in range(10):
    squares.append(x ** 2)

# List comprehension (better)
squares = [x ** 2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
evens = [x for x in range(20) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# With if-else
labels = ["even" if x % 2 == 0 else "odd" for x in range(5)]
print(labels)  # ['even', 'odd', 'even', 'odd', 'even']`}
        </CodeBlock>
      </Section>

      <Section title="Nested List Comprehension">
        <CodeBlock language="python">
{`# Flatten 2D list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Create matrix
matrix = [[i*j for j in range(1, 4)] for i in range(1, 4)]
print(matrix)  # [[1, 2, 3], [2, 4, 6], [3, 6, 9]]`}
        </CodeBlock>
      </Section>

      <Section title="Dict Comprehension">
        <CodeBlock language="python">
{`# Create dict
squares = {x: x**2 for x in range(6)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Filter dict
prices = {"apple": 0.5, "banana": 0.3, "orange": 0.7}
cheap = {k: v for k, v in prices.items() if v < 0.6}
print(cheap)  # {'apple': 0.5, 'banana': 0.3}

# Transform dict
upper_prices = {k.upper(): v for k, v in prices.items()}
print(upper_prices)  # {'APPLE': 0.5, 'BANANA': 0.3, 'ORANGE': 0.7}`}
        </CodeBlock>
      </Section>

      <Section title="Set Comprehension">
        <CodeBlock language="python">
{`# Unique squares
squares = {x**2 for x in [1, 2, 2, 3, 3, 4]}
print(squares)  # {1, 4, 9, 16}

# Filter unique
numbers = [1, 2, 2, 3, 3, 4, 5, 5]
evens = {x for x in numbers if x % 2 == 0}
print(evens)  # {2, 4}`}
        </CodeBlock>
      </Section>

      <Section title="Generator Expressions">
        <p>Sama seperti list comprehension, tapi lebih memory efficient (lazy evaluation):</p>
        <CodeBlock language="python">
{`# List comprehension (creates entire list in memory)
squares_list = [x**2 for x in range(1000000)]

# Generator expression (creates items on-demand)
squares_gen = (x**2 for x in range(1000000))

# Use generator
for square in squares_gen:
    if square > 100:
        break
    print(square)

# sum() with generator
total = sum(x**2 for x in range(1000))  # Efficient!`}
        </CodeBlock>
      </Section>

      <Section title="Practical Examples">
        <h3>1. Text Processing</h3>
        <CodeBlock language="python">
{`text = "Hello World Python"
# Extract words
words = [word for word in text.split()]

# Lowercase all
lower_words = [word.lower() for word in words]

# Filter long words
long_words = [w for w in words if len(w) > 5]
print(long_words)  # ['Python']`}
        </CodeBlock>

        <h3>2. Data Transformation</h3>
        <CodeBlock language="python">
{`users = [
    {"name": "Budi", "age": 25},
    {"name": "Ani", "age": 22},
    {"name": "Citra", "age": 30}
]

# Extract names
names = [user["name"] for user in users]

# Filter adults
adults = [u for u in users if u["age"] >= 18]

# Create lookup dict
lookup = {u["name"]: u["age"] for u in users}`}
        </CodeBlock>
      </Section>

      <Section title="Summary">
        <ul>
          <li>✅ List comprehension: [expr for item in iterable if condition]</li>
          <li>✅ Dict comprehension: {`{k: v for item in iterable}`}</li>
          <li>✅ Set comprehension: {`{expr for item in iterable}`}</li>
          <li>✅ Generator expression: (expr for item in iterable)</li>
          <li>✅ Lebih readable dan efficient daripada loops</li>
          <li>✅ Generators untuk large data (memory efficient)</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
