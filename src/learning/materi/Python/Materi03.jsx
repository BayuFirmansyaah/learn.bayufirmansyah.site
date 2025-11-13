import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi03() {
  return (
    <MateriLayout title="Operators">
      <Section id="arithmetic-operators" heading="Arithmetic Operators">
        <p>Operator untuk operasi matematika dasar:</p>
        <CodeBlock language="python">
{`# Addition
result = 10 + 5  # 15

# Subtraction
result = 10 - 5  # 5

# Multiplication
result = 10 * 5  # 50

# Division (selalu return float)
result = 10 / 3  # 3.3333...

# Floor Division (bulatkan ke bawah)
result = 10 // 3  # 3
result = -10 // 3 # -4 (ke arah negatif)

# Modulus (sisa bagi)
result = 10 % 3  # 1

# Exponentiation (pangkat)
result = 2 ** 3  # 8 (2^3)
result = 9 ** 0.5  # 3.0 (akar kuadrat)

# Precedence (urutan prioritas)
result = 2 + 3 * 4  # 14 (multiplication first)
result = (2 + 3) * 4  # 20 (parentheses first)`}
        </CodeBlock>

        <Note type="info">
          Urutan prioritas: () → ** → * / // % → + -
        </Note>
      </Section>

      <Section id="assignment-operators" heading="Assignment Operators">
        <CodeBlock language="python">
{`# Basic assignment
x = 10

# Compound assignment
x += 5   # x = x + 5 (15)
x -= 3   # x = x - 3 (12)
x *= 2   # x = x * 2 (24)
x /= 4   # x = x / 4 (6.0)
x //= 2  # x = x // 2 (3.0)
x %= 2   # x = x % 2 (1.0)
x **= 3  # x = x ** 3 (1.0)

# Multiple assignment
a, b, c = 10, 20, 30

# Swap values
a, b = b, a
print(a, b)  # 20 10

# Chain assignment
x = y = z = 0`}
        </CodeBlock>
      </Section>

      <Section id="comparison-operators" heading="Comparison Operators">
        <p>Operator untuk membandingkan nilai (return boolean):</p>
        <CodeBlock language="python">
{`# Equal to
result = 10 == 10  # True
result = 10 == 5   # False

# Not equal to
result = 10 != 5   # True

# Greater than
result = 10 > 5    # True

# Less than
result = 10 < 5    # False

# Greater than or equal
result = 10 >= 10  # True

# Less than or equal
result = 10 <= 5   # False

# Chaining comparisons
age = 25
result = 18 <= age < 65  # True (adult range)
result = 0 < x < 100     # True jika x antara 0 dan 100`}
        </CodeBlock>

        <Note type="warning">
          Gunakan <code>==</code> untuk compare values, <code>is</code> untuk compare identity (sama object).
        </Note>

        <CodeBlock language="python">
{`# == vs is
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)  # True (same values)
print(a is b)  # False (different objects)
print(a is c)  # True (same object)

# For None, use 'is'
x = None
if x is None:  # Correct
    print("x is None")
    
if x == None:  # ❌ Works, but not recommended
    print("x equals None")`}
        </CodeBlock>
      </Section>

      <Section id="logical-operators" heading="Logical Operators">
        <CodeBlock language="python">
{`# AND - True jika kedua True
result = True and True   # True
result = True and False  # False

# OR - True jika salah satu True
result = True or False   # True
result = False or False  # False

# NOT - Negasi
result = not True        # False
result = not False       # True

# Practical example
age = 25
has_license = True

# Check if can drive
can_drive = age >= 17 and has_license
print(can_drive)  # True

# Check if discount applies
is_student = True
is_senior = False
gets_discount = is_student or is_senior
print(gets_discount)  # True

# Complex conditions
score = 85
passed = score >= 60 and not (score < 0 or score > 100)
print(passed)  # True`}
        </CodeBlock>

        <h3>Short-circuit Evaluation</h3>
        <CodeBlock language="python">
{`# AND - stops jika ketemu False
def check1():
    print("Check 1")
    return False

def check2():
    print("Check 2")
    return True

result = check1() and check2()
# Output: Check 1
# check2() tidak dijalankan karena check1() False

# OR - stops jika ketemu True
result = check2() or check1()
# Output: Check 2
# check1() tidak dijalankan karena check2() True`}
        </CodeBlock>
      </Section>

      <Section id="identity-operators" heading="Identity Operators">
        <CodeBlock language="python">
{`# is - check if same object
a = [1, 2, 3]
b = a
c = [1, 2, 3]

print(a is b)      # True (same object)
print(a is c)      # False (different objects)
print(a == c)      # True (same values)

# is not
print(a is not c)  # True

# Use case: None checking
value = None
if value is None:
    print("Value is None")

# Small integers are cached (-5 to 256)
x = 100
y = 100
print(x is y)  # True (same object, cached)

x = 1000
y = 1000
print(x is y)  # False (different objects)`}
        </CodeBlock>
      </Section>

      <Section id="membership-operators" heading="Membership Operators">
        <CodeBlock language="python">
{`# in - check if value exists
numbers = [1, 2, 3, 4, 5]
print(3 in numbers)      # True
print(10 in numbers)     # False

# not in
print(10 not in numbers) # True

# Works with strings
text = "Python Programming"
print("Python" in text)     # True
print("Java" not in text)   # True

# With dictionaries (checks keys)
user = {"name": "Budi", "age": 25}
print("name" in user)       # True
print("email" in user)      # False

# With tuples
coordinates = (10, 20, 30)
print(20 in coordinates)    # True`}
        </CodeBlock>
      </Section>

      <Section id="bitwise-operators" heading="Bitwise Operators">
        <p>Operator untuk operasi bit-level (jarang dipakai untuk beginner):</p>
        <CodeBlock language="python">
{`# AND
result = 5 & 3   # 1 (0101 & 0011 = 0001)

# OR
result = 5 | 3   # 7 (0101 | 0011 = 0111)

# XOR
result = 5 ^ 3   # 6 (0101 ^ 0011 = 0110)

# NOT (one's complement)
result = ~5      # -6

# Left shift
result = 5 << 1  # 10 (0101 << 1 = 1010)

# Right shift
result = 5 >> 1  # 2 (0101 >> 1 = 0010)

# Practical use: Fast multiply/divide by 2
x = 8
fast_multiply = x << 2  # 32 (multiply by 4)
fast_divide = x >> 2    # 2 (divide by 4)`}
        </CodeBlock>
      </Section>

      <Section id="operator-precedence" heading="Operator Precedence">
        <p>Urutan prioritas operator (dari tertinggi ke terendah):</p>
        <CodeBlock language="python">
{`# 1. () - Parentheses
result = (2 + 3) * 4  # 20

# 2. ** - Exponentiation
result = 2 ** 3 ** 2  # 512 (right-to-left)

# 3. +x, -x, ~x - Unary operators
result = -5

# 4. *, /, //, % - Multiplication, Division
result = 2 + 3 * 4  # 14

# 5. +, - - Addition, Subtraction
result = 10 - 5 + 2  # 7

# 6. <<, >> - Bitwise shifts
result = 8 >> 1 + 1  # 2

# 7. & - Bitwise AND
# 8. ^ - Bitwise XOR
# 9. | - Bitwise OR

# 10. ==, !=, >, <, >=, <=, is, in - Comparisons
result = 5 < 10 == True  # True

# 11. not - Logical NOT
result = not False  # True

# 12. and - Logical AND
result = True and False  # False

# 13. or - Logical OR
result = True or False  # True

# Complex example
result = 2 + 3 * 4 ** 2 > 50 and not (10 < 5)
# 4 ** 2 = 16
# 3 * 16 = 48
# 2 + 48 = 50
# 50 > 50 = False
# 10 < 5 = False
# not False = True
# False and True = False
print(result)  # False`}
        </CodeBlock>

        <Note type="info">
          Gunakan parentheses untuk clarity, jangan terlalu andalkan precedence rules!
        </Note>
      </Section>

      <Section id="ternary-operator" heading="Ternary Operator">
        <CodeBlock language="python">
{`# Syntax: value_if_true if condition else value_if_false

age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)  # Adult

# Nested ternary (hindari jika terlalu complex)
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C"
print(grade)  # B

# Dalam function return
def get_discount(is_member):
    return 0.2 if is_member else 0.0

discount = get_discount(True)  # 0.2

# Dengan expression
x = 10
y = 20
max_value = x if x > y else y
print(max_value)  # 20`}
        </CodeBlock>
      </Section>

      <Section id="walrus-operator" heading="Walrus Operator (:=)">
        <p>Python 3.8+: Assignment expression</p>
        <CodeBlock language="python">
{`# Without walrus
# Harus assign dulu baru check
user_input = input("Enter name: ")
if len(user_input) > 5:
    print(f"Long name: {user_input}")

# With walrus operator (:=)
# Assign dan check dalam satu line
if (n := len(input("Enter name: "))) > 5:
    print(f"Length: {n}")

# Practical example: loop dengan condition
# Without walrus
while True:
    line = input("Enter text (or 'quit'): ")
    if line == 'quit':
        break
    print(f"You entered: {line}")

# With walrus
while (line := input("Enter text (or 'quit'): ")) != 'quit':
    print(f"You entered: {line}")`}
        </CodeBlock>
      </Section>

      <Section id="operator-overloading-preview" heading="Operator Overloading Preview">
        <CodeBlock language="python">
{`# Python allows custom operator behavior for classes

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    # Overload + operator
    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)
    
    # Overload == operator
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    def __repr__(self):
        return f"Point({self.x}, {self.y})"

p1 = Point(1, 2)
p2 = Point(3, 4)
p3 = p1 + p2  # Uses __add__
print(p3)     # Point(4, 6)

print(p1 == Point(1, 2))  # True (uses __eq__)`}
        </CodeBlock>
      </Section>

      <Section id="practical-examples" heading="Practical Examples">
        <h3>1. Even/Odd Checker</h3>
        <CodeBlock language="python">
{`number = int(input("Enter a number: "))
result = "Even" if number % 2 == 0 else "Odd"
print(f"{number} is {result}")`}
        </CodeBlock>

        <h3>2. Leap Year Checker</h3>
        <CodeBlock language="python">
{`year = int(input("Enter year: "))

# Leap year rules:
# - Divisible by 4
# - NOT divisible by 100, OR divisible by 400
is_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)

print(f"{year} is {'a leap' if is_leap else 'not a leap'} year")`}
        </CodeBlock>

        <h3>3. Grade Calculator</h3>
        <CodeBlock language="python">
{`score = int(input("Enter score (0-100): "))

# Validate input
if not (0 <= score <= 100):
    print("Invalid score")
elif score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
elif score >= 60:
    grade = 'D'
else:
    grade = 'F'

passed = grade != 'F'
print(f"Grade: {grade}")
print(f"Status: {'Passed' if passed else 'Failed'}")`}
        </CodeBlock>

        <h3>4. BMI Calculator</h3>
        <CodeBlock language="python">
{`weight = float(input("Weight (kg): "))
height = float(input("Height (m): "))

bmi = weight / (height ** 2)

if bmi < 18.5:
    category = "Underweight"
elif 18.5 <= bmi < 25:
    category = "Normal"
elif 25 <= bmi < 30:
    category = "Overweight"
else:
    category = "Obese"

print(f"BMI: {bmi:.2f}")
print(f"Category: {category}")`}
        </CodeBlock>
      </Section>

      <Section id="common-mistakes" heading="Common Mistakes">
        <h3>1. Using = instead of ==</h3>
        <CodeBlock language="python">
{`# ❌ Assignment, not comparison
if x = 10:  # SyntaxError
    print("Equal")

# Comparison
if x == 10:
    print("Equal")`}
        </CodeBlock>

        <h3>2. Division Confusion</h3>
        <CodeBlock language="python">
{`# / always returns float
print(10 / 5)   # 2.0 (not 2)

# Use // for integer division
print(10 // 5)  # 2

# Modulus for remainder
print(10 % 3)   # 1`}
        </CodeBlock>

        <h3>3. Logical Operator Confusion</h3>
        <CodeBlock language="python">
{`# ❌ Wrong: checking multiple values
if x == 1 or 2 or 3:  # Always True!
    pass

# Correct
if x == 1 or x == 2 or x == 3:
    pass

# Better: use 'in'
if x in [1, 2, 3]:
    pass`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li>Gunakan parentheses untuk clarity dalam complex expressions</li>
          <li>Prefer <code>is</code> untuk None checking</li>
          <li>Use <code>in</code> untuk membership testing, bukan multiple OR</li>
          <li>Ternary operator untuk simple conditions saja</li>
          <li>Avoid nested ternary (hard to read)</li>
          <li>Use short-circuit evaluation untuk performance</li>
          <li>Comparison chaining: <code>a &lt; x &lt; b</code> lebih readable</li>
        </ul>
      </Section>

      <Section id="summary" heading="Summary">
        <ul>
          <li>Arithmetic: +, -, *, /, //, %, **</li>
          <li>Assignment: =, +=, -=, *=, etc.</li>
          <li>Comparison: ==, !=, &gt;, &lt;, &gt;=, &lt;=</li>
          <li>Logical: and, or, not</li>
          <li>Identity: is, is not</li>
          <li>Membership: in, not in</li>
          <li>Ternary: value_if_true if condition else value_if_false</li>
          <li>Precedence: () → ** → * / // % → + - → comparisons → not → and → or</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
