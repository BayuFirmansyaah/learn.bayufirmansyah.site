import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi06() {
  return (
    <MateriLayout title="Lists & Tuples">
      <Section title="Lists">
        <p>
          List adalah collection yang ordered, mutable (bisa diubah), dan allow duplicate values.
        </p>

        <h3>Creating Lists</h3>
        <CodeBlock language="python">
{`# Empty list
empty_list = []
empty_list = list()

# List dengan values
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True, None]

# List dari range
nums = list(range(5))  # [0, 1, 2, 3, 4]

# Nested list (list of lists)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]`}
        </CodeBlock>

        <h3>Accessing Elements</h3>
        <CodeBlock language="python">
{`fruits = ["apple", "banana", "cherry", "date", "elderberry"]

# Indexing (0-based)
print(fruits[0])    # apple
print(fruits[2])    # cherry
print(fruits[-1])   # elderberry (last item)
print(fruits[-2])   # date (second from last)

# Slicing [start:stop:step]
print(fruits[1:3])   # ['banana', 'cherry']
print(fruits[:3])    # ['apple', 'banana', 'cherry']
print(fruits[2:])    # ['cherry', 'date', 'elderberry']
print(fruits[::2])   # ['apple', 'cherry', 'elderberry'] (every 2nd)
print(fruits[::-1])  # Reverse list

# Length
print(len(fruits))   # 5`}
        </CodeBlock>

        <h3>Modifying Lists</h3>
        <CodeBlock language="python">
{`fruits = ["apple", "banana", "cherry"]

# Change item
fruits[1] = "blueberry"
print(fruits)  # ['apple', 'blueberry', 'cherry']

# Change multiple items
fruits[0:2] = ["apricot", "blackberry"]
print(fruits)  # ['apricot', 'blackberry', 'cherry']

# Append (add to end)
fruits.append("date")
print(fruits)  # ['apricot', 'blackberry', 'cherry', 'date']

# Insert at specific position
fruits.insert(1, "banana")
print(fruits)  # ['apricot', 'banana', 'blackberry', 'cherry', 'date']

# Extend (add multiple items)
fruits.extend(["elderberry", "fig"])
# or: fruits += ["elderberry", "fig"]

# Remove by value
fruits.remove("banana")  # Removes first occurrence

# Remove by index
del fruits[0]  # Delete first item
popped = fruits.pop()  # Remove and return last item
popped = fruits.pop(1)  # Remove and return item at index 1

# Clear all items
fruits.clear()  # []`}
        </CodeBlock>

        <h3>List Methods</h3>
        <CodeBlock language="python">
{`numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5]

# Sort (modifies original)
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 5, 6, 9]

# Sort descending
numbers.sort(reverse=True)

# Sorted (returns new list, original unchanged)
original = [3, 1, 4, 1, 5]
sorted_list = sorted(original)
print(original)     # [3, 1, 4, 1, 5] (unchanged)
print(sorted_list)  # [1, 1, 3, 4, 5]

# Reverse (modifies original)
numbers.reverse()

# Count occurrences
count = numbers.count(1)  # 2

# Find index
index = numbers.index(5)  # First occurrence of 5

# Copy list
fruits = ["apple", "banana"]
fruits_copy = fruits.copy()
# or: fruits_copy = fruits[:]
# or: fruits_copy = list(fruits)`}
        </CodeBlock>

        <h3>List Operations</h3>
        <CodeBlock language="python">
{`# Concatenation
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list1 + list2  # [1, 2, 3, 4, 5, 6]

# Repetition
repeated = [0] * 5  # [0, 0, 0, 0, 0]

# Membership
fruits = ["apple", "banana", "cherry"]
print("apple" in fruits)      # True
print("grape" not in fruits)  # True

# Min, Max, Sum (for numeric lists)
numbers = [3, 1, 4, 1, 5]
print(min(numbers))  # 1
print(max(numbers))  # 5
print(sum(numbers))  # 14`}
        </CodeBlock>

        <h3>Looping Lists</h3>
        <CodeBlock language="python">
{`fruits = ["apple", "banana", "cherry"]

# Loop through items
for fruit in fruits:
    print(fruit)

# Loop with index
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# Loop with enumerate (better)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Loop with enumerate (custom start)
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}: {fruit}")`}
        </CodeBlock>
      </Section>

      <Section title="Tuples">
        <p>
          Tuple adalah collection yang ordered, immutable (tidak bisa diubah), dan allow duplicate values.
        </p>

        <h3>Creating Tuples</h3>
        <CodeBlock language="python">
{`# Empty tuple
empty_tuple = ()
empty_tuple = tuple()

# Tuple dengan values
fruits = ("apple", "banana", "cherry")
numbers = (1, 2, 3, 4, 5)
mixed = (1, "hello", 3.14, True)

# Single item tuple (perlu comma!)
single = (1,)  # Tuple
not_tuple = (1)  # Just integer in parentheses

# Tuple tanpa parentheses (tuple packing)
coordinates = 10, 20, 30  # Valid tuple
print(type(coordinates))  # <class 'tuple'>

# Convert list to tuple
my_list = [1, 2, 3]
my_tuple = tuple(my_list)`}
        </CodeBlock>

        <h3>Accessing Tuple Elements</h3>
        <CodeBlock language="python">
{`fruits = ("apple", "banana", "cherry", "date")

# Indexing
print(fruits[0])   # apple
print(fruits[-1])  # date

# Slicing (sama seperti list)
print(fruits[1:3])  # ('banana', 'cherry')
print(fruits[:2])   # ('apple', 'banana')

# Length
print(len(fruits))  # 4

# Looping
for fruit in fruits:
    print(fruit)`}
        </CodeBlock>

        <h3>Tuple Immutability</h3>
        <CodeBlock language="python">
{`fruits = ("apple", "banana", "cherry")

# ❌ Cannot modify
# fruits[1] = "blueberry"  # TypeError

# ❌ Cannot add
# fruits.append("date")  # AttributeError

# ✅ Can create new tuple
new_fruits = fruits + ("date",)

# Workaround: convert to list, modify, convert back
fruits_list = list(fruits)
fruits_list[1] = "blueberry"
fruits = tuple(fruits_list)`}
        </CodeBlock>

        <h3>Tuple Methods</h3>
        <CodeBlock language="python">
{`numbers = (1, 2, 3, 2, 4, 2, 5)

# Count
count = numbers.count(2)  # 3

# Index (first occurrence)
index = numbers.index(4)  # 4

# That's it! Tuples only have 2 methods
# (because they're immutable)`}
        </CodeBlock>

        <h3>Tuple Unpacking</h3>
        <CodeBlock language="python">
{`# Basic unpacking
coordinates = (10, 20, 30)
x, y, z = coordinates
print(x, y, z)  # 10 20 30

# Swap values
a, b = 5, 10
a, b = b, a  # Swap!
print(a, b)  # 10 5

# Unpacking dengan * (rest)
numbers = (1, 2, 3, 4, 5)
first, *middle, last = numbers
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5

# Function returning multiple values (tuple)
def get_user():
    return "Budi", 25, "Jakarta"

name, age, city = get_user()

# Ignore values dengan _
name, _, city = get_user()  # Ignore age`}
        </CodeBlock>
      </Section>

      <Section title="Lists vs Tuples">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Feature</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>List</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tuple</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Syntax</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>[1, 2, 3]</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>(1, 2, 3)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Mutable</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>✅ Yes</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>❌ No</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Performance</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Slower</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Faster</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Use Case</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Data berubah</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Data tetap</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Methods</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Banyak</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>2 only</td>
            </tr>
          </tbody>
        </table>

        <Note type="info">
          Gunakan <strong>tuple</strong> untuk data yang tidak berubah (coordinates, config, return values).
          Gunakan <strong>list</strong> untuk data yang perlu dimodifikasi.
        </Note>
      </Section>

      <Section title="Practical Examples">
        <h3>1. Shopping List Manager</h3>
        <CodeBlock language="python">
{`shopping_list = []

while True:
    print("\\n1. Add item")
    print("2. Remove item")
    print("3. Show list")
    print("4. Clear list")
    print("5. Quit")
    
    choice = input("Choose: ")
    
    if choice == '1':
        item = input("Item: ")
        shopping_list.append(item)
        print(f"Added: {item}")
    
    elif choice == '2':
        if shopping_list:
            item = input("Remove: ")
            if item in shopping_list:
                shopping_list.remove(item)
                print(f"Removed: {item}")
            else:
                print("Not found")
        else:
            print("List is empty")
    
    elif choice == '3':
        if shopping_list:
            print("\\nShopping List:")
            for i, item in enumerate(shopping_list, 1):
                print(f"{i}. {item}")
        else:
            print("List is empty")
    
    elif choice == '4':
        shopping_list.clear()
        print("List cleared")
    
    elif choice == '5':
        break`}
        </CodeBlock>

        <h3>2. Grade Statistics</h3>
        <CodeBlock language="python">
{`grades = [85, 92, 78, 90, 88, 76, 95, 89]

# Statistics
average = sum(grades) / len(grades)
highest = max(grades)
lowest = min(grades)
sorted_grades = sorted(grades, reverse=True)

print(f"Average: {average:.2f}")
print(f"Highest: {highest}")
print(f"Lowest: {lowest}")
print(f"Sorted: {sorted_grades}")

# Count grades by category
a_count = sum(1 for g in grades if g >= 90)
b_count = sum(1 for g in grades if 80 <= g < 90)
c_count = sum(1 for g in grades if 70 <= g < 80)

print(f"A grades: {a_count}")
print(f"B grades: {b_count}")
print(f"C grades: {c_count}")`}
        </CodeBlock>

        <h3>3. Matrix Operations</h3>
        <CodeBlock language="python">
{`matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Print matrix
for row in matrix:
    print(row)

# Access element
print(matrix[1][2])  # 6 (row 1, col 2)

# Sum all elements
total = sum(sum(row) for row in matrix)
print(f"Total: {total}")

# Transpose
transposed = [[matrix[j][i] for j in range(len(matrix))] 
              for i in range(len(matrix[0]))]

for row in transposed:
    print(row)`}
        </CodeBlock>

        <h3>4. RGB Color Storage (Tuple)</h3>
        <CodeBlock language="python">
{`# Colors as immutable tuples
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

def describe_color(color):
    r, g, b = color
    return f"RGB({r}, {g}, {b})"

print(describe_color(RED))   # RGB(255, 0, 0)
print(describe_color(GREEN)) # RGB(0, 255, 0)

# List of color tuples
palette = [RED, GREEN, BLUE, WHITE, BLACK]
for color in palette:
    print(describe_color(color))`}
        </CodeBlock>
      </Section>

      <Section title="Common Mistakes">
        <h3>1. Modifying List While Looping</h3>
        <CodeBlock language="python">
{`# ❌ Dangerous
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # Skips elements!

# ✅ Loop over copy
numbers = [1, 2, 3, 4, 5]
for num in numbers[:]:
    if num % 2 == 0:
        numbers.remove(num)

# ✅ Better: list comprehension
numbers = [num for num in numbers if num % 2 != 0]`}
        </CodeBlock>

        <h3>2. Single Item Tuple</h3>
        <CodeBlock language="python">
{`# ❌ Not a tuple
single = (1)
print(type(single))  # <class 'int'>

# ✅ Tuple needs comma
single = (1,)
print(type(single))  # <class 'tuple'>`}
        </CodeBlock>

        <h3>3. Shallow vs Deep Copy</h3>
        <CodeBlock language="python">
{`# Shallow copy issue
original = [[1, 2], [3, 4]]
copy = original.copy()
copy[0][0] = 999
print(original)  # [[999, 2], [3, 4]] ⚠️ Modified!

# Deep copy solution
import copy
original = [[1, 2], [3, 4]]
deep = copy.deepcopy(original)
deep[0][0] = 999
print(original)  # [[1, 2], [3, 4]] ✅`}
        </CodeBlock>
      </Section>

      <Section title="Best Practices">
        <ul>
          <li>✅ Use <code>list</code> untuk data yang berubah, <code>tuple</code> untuk data konstan</li>
          <li>✅ List comprehension lebih readable daripada loop+append</li>
          <li>✅ Use <code>enumerate()</code> untuk loop dengan index</li>
          <li>✅ Tuple unpacking untuk cleaner code</li>
          <li>✅ Avoid modifying list saat loop, gunakan copy atau comprehension</li>
          <li>✅ Use tuples untuk multiple return values dari function</li>
          <li>✅ Single item tuple needs trailing comma: <code>(item,)</code></li>
        </ul>
      </Section>

      <Section title="Summary">
        <ul>
          <li>✅ <strong>List:</strong> Mutable, ordered collection dengan banyak methods</li>
          <li>✅ <strong>Tuple:</strong> Immutable, ordered collection, lebih cepat</li>
          <li>✅ Indexing & slicing sama untuk keduanya</li>
          <li>✅ List methods: append, insert, remove, pop, sort, reverse, dll</li>
          <li>✅ Tuple methods: count, index saja (karena immutable)</li>
          <li>✅ Tuple unpacking untuk extract values</li>
          <li>✅ Use tuple untuk data yang tidak berubah (coordinates, config, constants)</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
