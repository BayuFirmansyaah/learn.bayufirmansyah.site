import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi05() {
  return (
    <MateriLayout title="Functions">
      <Section id="defining-functions" heading="Defining Functions">
        <CodeBlock language="python">
{`# Basic function
def greet():
    print("Hello!")

greet()  # Call function

# Function dengan parameter
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Budi")  # Hello, Budi!

# Function dengan multiple parameters
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8

# Function dengan default parameter
def greet_person(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet_person("Budi")              # Hello, Budi!
greet_person("Ani", "Hi")         # Hi, Ani!
greet_person("Citra", greeting="Hey")  # Hey, Citra!`}
        </CodeBlock>
      </Section>

      <Section id="return-statement" heading="Return Statement">
        <CodeBlock language="python">
{`# Return single value
def square(x):
    return x ** 2

result = square(5)  # 25

# Return multiple values (tuple)
def get_user():
    name = "Budi"
    age = 25
    return name, age  # Returns tuple

name, age = get_user()  # Tuple unpacking
print(name, age)  # Budi 25

# Early return
def is_adult(age):
    if age >= 18:
        return True
    return False

# No return (implicitly returns None)
def print_info(name):
    print(f"Name: {name}")
    # return None (implicit)

result = print_info("Budi")
print(result)  # None`}
        </CodeBlock>
      </Section>

      <Section id="arguments-types" heading="Arguments Types">
        <h3>1. Positional Arguments</h3>
        <CodeBlock language="python">
{`def describe_person(name, age, city):
    print(f"{name}, {age} years old, from {city}")

describe_person("Budi", 25, "Jakarta")  # Order matters`}
        </CodeBlock>

        <h3>2. Keyword Arguments</h3>
        <CodeBlock language="python">
{`describe_person(name="Budi", age=25, city="Jakarta")
describe_person(city="Jakarta", name="Budi", age=25)  # Order doesn't matter

# Mix positional and keyword
describe_person("Budi", age=25, city="Jakarta")`}
        </CodeBlock>

        <h3>3. Default Parameters</h3>
        <CodeBlock language="python">
{`def create_user(name, age=18, role="user"):
    return {
        "name": name,
        "age": age,
        "role": role
    }

user1 = create_user("Budi")                    # Uses defaults
user2 = create_user("Ani", 25)                 # Override age
user3 = create_user("Citra", role="admin")     # Override role`}
        </CodeBlock>

        <h3>4. *args (Variable Positional Arguments)</h3>
        <CodeBlock language="python">
{`def sum_all(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3))           # 6
print(sum_all(1, 2, 3, 4, 5))     # 15

# *args is a tuple
def print_args(*args):
    print(type(args))  # <class 'tuple'>
    print(args)

print_args(1, 2, 3)  # (1, 2, 3)`}
        </CodeBlock>

        <h3>5. **kwargs (Variable Keyword Arguments)</h3>
        <CodeBlock language="python">
{`def create_profile(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

create_profile(name="Budi", age=25, city="Jakarta")
# Output:
# name: Budi
# age: 25
# city: Jakarta

# **kwargs is a dictionary
def print_kwargs(**kwargs):
    print(type(kwargs))  # <class 'dict'>
    print(kwargs)

print_kwargs(a=1, b=2)  # {'a': 1, 'b': 2}`}
        </CodeBlock>

        <h3>6. Combining All Argument Types</h3>
        <CodeBlock language="python">
{`# Order: positional, *args, keyword-only, **kwargs
def complex_function(pos1, pos2, *args, key1="default", **kwargs):
    print(f"Positional: {pos1}, {pos2}")
    print(f"Args: {args}")
    print(f"Key1: {key1}")
    print(f"Kwargs: {kwargs}")

complex_function(1, 2, 3, 4, key1="value", extra="data")
# Positional: 1, 2
# Args: (3, 4)
# Key1: value
# Kwargs: {'extra': 'data'}`}
        </CodeBlock>
      </Section>

      <Section id="lambda-functions" heading="Lambda Functions">
        <p>Anonymous functions (one-liner):</p>
        <CodeBlock language="python">
{`# Regular function
def square(x):
    return x ** 2

# Lambda equivalent
square = lambda x: x ** 2
print(square(5))  # 25

# Lambda dengan multiple parameters
add = lambda x, y: x + y
print(add(3, 5))  # 8

# Common use: dengan map, filter, sorted
numbers = [1, 2, 3, 4, 5]

# map: apply function to all items
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# filter: keep items that return True
even = list(filter(lambda x: x % 2 == 0, numbers))
print(even)  # [2, 4]

# sorted: custom sort key
users = [
    {"name": "Budi", "age": 25},
    {"name": "Ani", "age": 22},
    {"name": "Citra", "age": 30}
]
sorted_users = sorted(users, key=lambda u: u["age"])
print([u["name"] for u in sorted_users])  # ['Ani', 'Budi', 'Citra']`}
        </CodeBlock>

        <Note type="info">
          Lambda functions best untuk simple operations. Untuk logic complex, gunakan def.
        </Note>
      </Section>

      <Section id="scope-global-variables" heading="Scope & Global Variables">
        <CodeBlock language="python">
{`# Global scope
global_var = "I'm global"

def my_function():
    # Local scope
    local_var = "I'm local"
    print(global_var)  # Can access global
    print(local_var)

my_function()
# print(local_var)  # NameError

# Modify global variable
counter = 0

def increment():
    global counter  # Must declare global to modify
    counter += 1

increment()
print(counter)  # 1

# Nested function scope
def outer():
    outer_var = "outer"
    
    def inner():
        # Can access outer_var
        print(outer_var)
    
    inner()

outer()  # outer

# nonlocal keyword (for nested functions)
def outer():
    count = 0
    
    def inner():
        nonlocal count  # Modify outer function variable
        count += 1
    
    inner()
    print(count)  # 1

outer()`}
        </CodeBlock>
      </Section>

      <Section id="docstrings" heading="Docstrings">
        <CodeBlock language="python">
{`def calculate_area(radius):
    """
    Calculate the area of a circle.
    
    Args:
        radius (float): The radius of the circle
    
    Returns:
        float: The area of the circle
    
    Example:
        >>> calculate_area(5)
        78.53981633974483
    """
    import math
    return math.pi * radius ** 2

# Access docstring
print(calculate_area.__doc__)

# help() function
help(calculate_area)`}
        </CodeBlock>
      </Section>

      <Section id="recursion" heading="Recursion">
        <CodeBlock language="python">
{`# Factorial using recursion
def factorial(n):
    if n == 0 or n == 1:  # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case

print(factorial(5))  # 120

# Fibonacci
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(7))  # 13

# Countdown
def countdown(n):
    if n <= 0:
        print("Blastoff!")
    else:
        print(n)
        countdown(n - 1)

countdown(5)  # 5, 4, 3, 2, 1, Blastoff!`}
        </CodeBlock>

        <Note type="warning">
          Recursion dapat menyebabkan stack overflow jika terlalu dalam. Gunakan iterasi untuk large inputs.
        </Note>
      </Section>

      <Section id="higherorder-functions" heading="Higher-Order Functions">
        <CodeBlock language="python">
{`# Function sebagai parameter
def apply_operation(x, y, operation):
    return operation(x, y)

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

print(apply_operation(5, 3, add))       # 8
print(apply_operation(5, 3, multiply))  # 15

# Function returning function
def make_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15`}
        </CodeBlock>
      </Section>

      <Section id="decorators-preview" heading="Decorators (Preview)">
        <CodeBlock language="python">
{`# Simple decorator
def uppercase_decorator(func):
    def wrapper():
        result = func()
        return result.upper()
    return wrapper

@uppercase_decorator
def greet():
    return "hello"

print(greet())  # HELLO

# Equivalent to:
# greet = uppercase_decorator(greet)`}
        </CodeBlock>
      </Section>

      <Section id="type-hints-python-35" heading="Type Hints (Python 3.5+)">
        <CodeBlock language="python">
{`# Type hints untuk better code documentation
def add(a: int, b: int) -> int:
    return a + b

def greet(name: str) -> str:
    return f"Hello, {name}!"

# Complex types
from typing import List, Dict, Optional, Union

def process_items(items: List[int]) -> int:
    return sum(items)

def get_user(user_id: int) -> Optional[Dict[str, str]]:
    # Returns dict or None
    if user_id > 0:
        return {"name": "Budi", "email": "budi@example.com"}
    return None

def calculate(x: Union[int, float]) -> float:
    # Accepts int or float
    return x * 2.5`}
        </CodeBlock>

        <Note type="info">
          Type hints tidak di-enforce oleh Python runtime, tapi berguna untuk IDE autocomplete dan type checking tools.
        </Note>
      </Section>

      <Section id="practical-examples" heading="Practical Examples">
        <h3>1. Temperature Converter</h3>
        <CodeBlock language="python">
{`def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    return (fahrenheit - 32) * 5/9

def convert_temperature(value, unit):
    if unit.lower() == 'c':
        return celsius_to_fahrenheit(value)
    elif unit.lower() == 'f':
        return fahrenheit_to_celsius(value)
    else:
        return "Invalid unit"

print(convert_temperature(25, 'C'))  # 77.0
print(convert_temperature(77, 'F'))  # 25.0`}
        </CodeBlock>

        <h3>2. Password Validator</h3>
        <CodeBlock language="python">
{`def validate_password(password):
    """Validate password meets requirements"""
    if len(password) < 8:
        return False, "Password must be at least 8 characters"
    
    if not any(c.isupper() for c in password):
        return False, "Password must contain uppercase letter"
    
    if not any(c.islower() for c in password):
        return False, "Password must contain lowercase letter"
    
    if not any(c.isdigit() for c in password):
        return False, "Password must contain digit"
    
    return True, "Password is valid"

is_valid, message = validate_password("Pass123")
print(message)`}
        </CodeBlock>

        <h3>3. Statistics Calculator</h3>
        <CodeBlock language="python">
{`def calculate_stats(numbers):
    """Calculate basic statistics"""
    if not numbers:
        return None
    
    total = sum(numbers)
    count = len(numbers)
    mean = total / count
    
    sorted_nums = sorted(numbers)
    if count % 2 == 0:
        median = (sorted_nums[count//2 - 1] + sorted_nums[count//2]) / 2
    else:
        median = sorted_nums[count//2]
    
    return {
        "count": count,
        "sum": total,
        "mean": mean,
        "median": median,
        "min": min(numbers),
        "max": max(numbers)
    }

nums = [10, 20, 30, 40, 50]
stats = calculate_stats(nums)
for key, value in stats.items():
    print(f"{key}: {value}")`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li>Function names: lowercase with underscores (snake_case)</li>
          <li>One function, one responsibility (Single Responsibility Principle)</li>
          <li>Use docstrings untuk documentation</li>
          <li>Default parameters di akhir parameter list</li>
          <li>Avoid mutable default arguments (list, dict)</li>
          <li>Return early untuk reduce nesting</li>
          <li>Keep functions short (max 50-100 lines)</li>
          <li>Use type hints untuk better IDE support</li>
        </ul>
      </Section>

      <Section id="common-mistakes" heading="Common Mistakes">
        <h3>1. Mutable Default Arguments</h3>
        <CodeBlock language="python">
{`# ❌ Bug: list shared across calls
def add_item(item, items=[]):
    items.append(item)
    return items

list1 = add_item("apple")   # ['apple']
list2 = add_item("banana")  # ['apple', 'banana'] ⚠️

# Correct: use None as default
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items`}
        </CodeBlock>

        <h3>2. Forgetting Return</h3>
        <CodeBlock language="python">
{`# ❌ No return
def add(a, b):
    result = a + b  # Forgot return

x = add(5, 3)
print(x)  # None

# Correct
def add(a, b):
    return a + b`}
        </CodeBlock>
      </Section>

      <Section id="summary" heading="Summary">
        <ul>
          <li>def keyword untuk define functions</li>
          <li>Parameters: positional, keyword, default, *args, **kwargs</li>
          <li>return untuk mengembalikan nilai</li>
          <li>Lambda untuk simple anonymous functions</li>
          <li>Scope: local, global, nonlocal</li>
          <li>Docstrings untuk documentation</li>
          <li>Recursion untuk self-referential problems</li>
          <li>Type hints untuk better code documentation</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
