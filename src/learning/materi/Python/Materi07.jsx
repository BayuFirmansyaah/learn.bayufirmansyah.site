import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi07() {
  return (
    <MateriLayout title="Dictionaries & Sets">
      <Section title="Dictionaries">
        <p>
          Dictionary adalah collection yang unordered (Python 3.7+ ordered by insertion), 
          mutable, dan indexed dengan key-value pairs. Key harus unique.
        </p>

        <h3>Creating Dictionaries</h3>
        <CodeBlock language="python">
{`# Empty dictionary
empty_dict = {}
empty_dict = dict()

# Dictionary dengan values
user = {
    "name": "Budi",
    "age": 25,
    "city": "Jakarta"
}

# Dict with different value types
mixed = {
    "name": "Budi",
    "age": 25,
    "scores": [85, 90, 88],
    "active": True
}

# Using dict() constructor
person = dict(name="Ani", age=22, city="Bandung")

# From list of tuples
pairs = [("a", 1), ("b", 2), ("c", 3)]
my_dict = dict(pairs)`}
        </CodeBlock>

        <h3>Accessing Values</h3>
        <CodeBlock language="python">
{`user = {"name": "Budi", "age": 25, "city": "Jakarta"}

# Access by key
print(user["name"])  # Budi

# Get method (safer, returns None if key not found)
print(user.get("name"))    # Budi
print(user.get("email"))   # None
print(user.get("email", "N/A"))  # N/A (default value)

# Check if key exists
if "name" in user:
    print(user["name"])

# KeyError if key doesn't exist
# print(user["email"])  # KeyError!`}
        </CodeBlock>

        <h3>Modifying Dictionaries</h3>
        <CodeBlock language="python">
{`user = {"name": "Budi", "age": 25}

# Add/Update key
user["city"] = "Jakarta"  # Add new key
user["age"] = 26          # Update existing

# Update multiple keys
user.update({"email": "budi@example.com", "phone": "08123456"})

# Remove key
del user["city"]          # Raises KeyError if not exists
removed = user.pop("age") # Remove and return value
removed = user.pop("nonexistent", None)  # Returns None if not found

# Remove last inserted (Python 3.7+)
last_item = user.popitem()

# Clear all items
user.clear()`}
        </CodeBlock>

        <h3>Dictionary Methods</h3>
        <CodeBlock language="python">
{`user = {"name": "Budi", "age": 25, "city": "Jakarta"}

# Get all keys
keys = user.keys()
print(list(keys))  # ['name', 'age', 'city']

# Get all values
values = user.values()
print(list(values))  # ['Budi', 25, 'Jakarta']

# Get all key-value pairs
items = user.items()
print(list(items))  # [('name', 'Budi'), ('age', 25), ('city', 'Jakarta')]

# Copy dictionary
user_copy = user.copy()

# setdefault: get value or set if not exists
email = user.setdefault("email", "default@example.com")
print(user)  # Now has 'email' key

# fromkeys: create dict with same value for all keys
keys = ["a", "b", "c"]
default_dict = dict.fromkeys(keys, 0)
print(default_dict)  # {'a': 0, 'b': 0, 'c': 0}`}
        </CodeBlock>

        <h3>Looping Dictionaries</h3>
        <CodeBlock language="python">
{`user = {"name": "Budi", "age": 25, "city": "Jakarta"}

# Loop keys (default)
for key in user:
    print(key)

# Loop keys explicitly
for key in user.keys():
    print(key)

# Loop values
for value in user.values():
    print(value)

# Loop key-value pairs (most common)
for key, value in user.items():
    print(f"{key}: {value}")`}
        </CodeBlock>

        <h3>Nested Dictionaries</h3>
        <CodeBlock language="python">
{`users = {
    "user1": {
        "name": "Budi",
        "age": 25,
        "city": "Jakarta"
    },
    "user2": {
        "name": "Ani",
        "age": 22,
        "city": "Bandung"
    }
}

# Access nested values
print(users["user1"]["name"])  # Budi

# Loop nested dict
for user_id, user_data in users.items():
    print(f"\\n{user_id}:")
    for key, value in user_data.items():
        print(f"  {key}: {value}")`}
        </CodeBlock>
      </Section>

      <Section title="Dictionary Comprehension">
        <CodeBlock language="python">
{`# Basic dict comprehension
squares = {x: x**2 for x in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# With condition
even_squares = {x: x**2 for x in range(10) if x % 2 == 0}

# From two lists
keys = ["a", "b", "c"]
values = [1, 2, 3]
my_dict = {k: v for k, v in zip(keys, values)}

# Transform existing dict
user = {"name": "budi", "city": "jakarta"}
upper_dict = {k: v.upper() for k, v in user.items()}
print(upper_dict)  # {'name': 'BUDI', 'city': 'JAKARTA'}`}
        </CodeBlock>
      </Section>

      <Section title="Sets">
        <p>
          Set adalah collection yang unordered, unindexed, tidak allow duplicates, dan mutable.
        </p>

        <h3>Creating Sets</h3>
        <CodeBlock language="python">
{`# Empty set (must use set(), not {})
empty_set = set()  # ✅
# empty = {}  # ❌ This is dict!

# Set with values
fruits = {"apple", "banana", "cherry"}
numbers = {1, 2, 3, 4, 5}

# Duplicates automatically removed
duplicates = {1, 2, 2, 3, 3, 3}
print(duplicates)  # {1, 2, 3}

# From list (remove duplicates)
my_list = [1, 2, 2, 3, 3, 4]
unique = set(my_list)
print(unique)  # {1, 2, 3, 4}

# From string
chars = set("hello")
print(chars)  # {'h', 'e', 'l', 'o'}`}
        </CodeBlock>

        <h3>Set Operations</h3>
        <CodeBlock language="python">
{`fruits = {"apple", "banana", "cherry"}

# Add item
fruits.add("date")

# Add multiple items
fruits.update(["elderberry", "fig"])
fruits.update(["grape"], {"honeydew"})

# Remove item
fruits.remove("banana")  # Raises KeyError if not exists
fruits.discard("banana") # No error if not exists

# Remove and return arbitrary item
item = fruits.pop()

# Clear all items
fruits.clear()

# Length
print(len(fruits))`}
        </CodeBlock>

        <h3>Set Mathematical Operations</h3>
        <CodeBlock language="python">
{`set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

# Union (gabungan semua)
union = set1 | set2
union = set1.union(set2)
print(union)  # {1, 2, 3, 4, 5, 6, 7, 8}

# Intersection (irisan/sama)
intersection = set1 & set2
intersection = set1.intersection(set2)
print(intersection)  # {4, 5}

# Difference (di set1 tapi tidak di set2)
diff = set1 - set2
diff = set1.difference(set2)
print(diff)  # {1, 2, 3}

# Symmetric Difference (XOR - di salah satu tapi tidak di kedua)
sym_diff = set1 ^ set2
sym_diff = set1.symmetric_difference(set2)
print(sym_diff)  # {1, 2, 3, 6, 7, 8}

# Subset (all items in set1 ada di set2?)
set_a = {1, 2}
set_b = {1, 2, 3, 4}
print(set_a.issubset(set_b))  # True
print(set_a <= set_b)         # True

# Superset (all items in set2 ada di set1?)
print(set_b.issuperset(set_a))  # True
print(set_b >= set_a)           # True

# Disjoint (tidak ada irisan?)
set_x = {1, 2, 3}
set_y = {4, 5, 6}
print(set_x.isdisjoint(set_y))  # True`}
        </CodeBlock>

        <h3>Frozen Sets</h3>
        <p>Immutable version of set:</p>
        <CodeBlock language="python">
{`# Create frozen set
frozen = frozenset([1, 2, 3, 4, 5])

# Can be used as dict key (regular set cannot)
my_dict = {
    frozen: "valid"  # ✅
    # {1, 2, 3}: "error"  # ❌ unhashable type: 'set'
}

# Supports all read operations
print(len(frozen))
print(3 in frozen)

# Cannot modify
# frozen.add(6)  # AttributeError`}
        </CodeBlock>
      </Section>

      <Section title="Practical Examples">
        <h3>1. Remove Duplicates</h3>
        <CodeBlock language="python">
{`# From list
numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5]
unique_numbers = list(set(numbers))
print(unique_numbers)

# Preserve order (Python 3.7+)
from collections import OrderedDict
unique_ordered = list(OrderedDict.fromkeys(numbers))

# Or using dict (Python 3.7+)
unique_ordered = list(dict.fromkeys(numbers))`}
        </CodeBlock>

        <h3>2. Word Frequency Counter</h3>
        <CodeBlock language="python">
{`text = "hello world hello python world"
words = text.split()

# Count frequencies
freq = {}
for word in words:
    freq[word] = freq.get(word, 0) + 1

print(freq)  # {'hello': 2, 'world': 2, 'python': 1}

# Using Counter (easier)
from collections import Counter
freq = Counter(words)
print(freq.most_common(2))  # [('hello', 2), ('world', 2)]`}
        </CodeBlock>

        <h3>3. Student Grade Manager</h3>
        <CodeBlock language="python">
{`students = {
    "101": {"name": "Budi", "grade": 85},
    "102": {"name": "Ani", "grade": 92},
    "103": {"name": "Citra", "grade": 78}
}

def add_student(student_id, name, grade):
    students[student_id] = {"name": name, "grade": grade}

def get_student(student_id):
    return students.get(student_id, "Not found")

def average_grade():
    grades = [s["grade"] for s in students.values()]
    return sum(grades) / len(grades)

print(f"Average grade: {average_grade():.2f}")

# Find top student
top_student = max(students.items(), key=lambda x: x[1]["grade"])
print(f"Top student: {top_student[1]['name']}")`}
        </CodeBlock>

        <h3>4. Set Operations - Tags System</h3>
        <CodeBlock language="python">
{`post1_tags = {"python", "programming", "tutorial"}
post2_tags = {"python", "data-science", "tutorial"}
post3_tags = {"javascript", "web-dev", "tutorial"}

# Common tags between post1 and post2
common = post1_tags & post2_tags
print(f"Common tags: {common}")

# All unique tags
all_tags = post1_tags | post2_tags | post3_tags
print(f"All tags: {all_tags}")

# Tags only in post1
unique_to_post1 = post1_tags - post2_tags
print(f"Unique to post1: {unique_to_post1}")`}
        </CodeBlock>

        <h3>5. Cache/Memoization with Dict</h3>
        <CodeBlock language="python">
{`# Fibonacci with caching
cache = {}

def fibonacci(n):
    if n in cache:
        return cache[n]
    
    if n <= 1:
        return n
    
    result = fibonacci(n - 1) + fibonacci(n - 2)
    cache[n] = result
    return result

print(fibonacci(50))  # Fast dengan cache!

# Or use functools.lru_cache
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci_cached(n):
    if n <= 1:
        return n
    return fibonacci_cached(n - 1) + fibonacci_cached(n - 2)`}
        </CodeBlock>
      </Section>

      <Section title="Common Mistakes">
        <h3>1. Mutable Default Arguments</h3>
        <CodeBlock language="python">
{`# ❌ Bug: dict shared across calls
def add_score(name, score, scores={}):
    scores[name] = score
    return scores

result1 = add_score("Budi", 85)   # {'Budi': 85}
result2 = add_score("Ani", 90)    # {'Budi': 85, 'Ani': 90} ⚠️

# ✅ Correct
def add_score(name, score, scores=None):
    if scores is None:
        scores = {}
    scores[name] = score
    return scores`}
        </CodeBlock>

        <h3>2. Empty Set vs Empty Dict</h3>
        <CodeBlock language="python">
{`# ❌ This is dict, not set!
empty = {}
print(type(empty))  # <class 'dict'>

# ✅ Correct for empty set
empty_set = set()
print(type(empty_set))  # <class 'set'>`}
        </CodeBlock>

        <h3>3. Modifying Dict While Iterating</h3>
        <CodeBlock language="python">
{`# ❌ RuntimeError
user = {"name": "Budi", "age": 25, "city": "Jakarta"}
for key in user:
    if key == "age":
        del user[key]  # RuntimeError!

# ✅ Iterate over copy of keys
for key in list(user.keys()):
    if key == "age":
        del user[key]

# ✅ Better: dict comprehension
user = {k: v for k, v in user.items() if k != "age"}`}
        </CodeBlock>
      </Section>

      <Section title="Best Practices">
        <ul>
          <li>✅ Use <code>get()</code> untuk safe access, hindari KeyError</li>
          <li>✅ Dict comprehension untuk transform data</li>
          <li>✅ Use <code>in</code> untuk check key existence</li>
          <li>✅ Sets untuk remove duplicates dan membership testing (O(1))</li>
          <li>✅ Use <code>collections.Counter</code> untuk frequency counting</li>
          <li>✅ Avoid mutable default arguments (dict, list, set)</li>
          <li>✅ frozenset untuk immutable sets (dapat jadi dict key)</li>
        </ul>
      </Section>

      <Section title="Summary">
        <ul>
          <li>✅ <strong>Dictionary:</strong> Key-value pairs, ordered (3.7+), mutable, keys unique</li>
          <li>✅ Dict methods: get, keys, values, items, update, pop, clear</li>
          <li>✅ Dict comprehension: <code>{`{k: v for k, v in ...}`}</code></li>
          <li>✅ <strong>Set:</strong> Unordered, unique items, mathematical operations</li>
          <li>✅ Set operations: union, intersection, difference, symmetric_difference</li>
          <li>✅ frozenset untuk immutable version</li>
          <li>✅ Use sets untuk unique items dan fast membership testing</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
