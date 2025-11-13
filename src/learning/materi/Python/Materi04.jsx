import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi04() {
  return (
    <MateriLayout title="Control Flow">
      <Section title="if Statement">
        <p>
          if statement digunakan untuk menjalankan code berdasarkan kondisi tertentu.
        </p>

        <CodeBlock language="python">
{`# Basic if
age = 20
if age >= 18:
    print("Kamu sudah dewasa")

# if-else
age = 15
if age >= 18:
    print("Dewasa")
else:
    print("Masih anak-anak")

# if-elif-else
score = 85
if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
elif score >= 60:
    grade = 'D'
else:
    grade = 'F'

print(f"Grade: {grade}")`}
        </CodeBlock>

        <Note type="warning">
          Indentation sangat penting! Python menggunakan indentation (4 spasi) untuk menandai code block.
        </Note>
      </Section>

      <Section title="Nested if">
        <CodeBlock language="python">
{`# Nested if statements
age = 25
has_license = True

if age >= 17:
    if has_license:
        print("Boleh menyetir")
    else:
        print("Perlu SIM dulu")
else:
    print("Belum cukup umur")

# Lebih baik: combine conditions
if age >= 17 and has_license:
    print("Boleh menyetir")
elif age >= 17:
    print("Perlu SIM dulu")
else:
    print("Belum cukup umur")`}
        </CodeBlock>
      </Section>

      <Section title="for Loop">
        <h3>1. Loop dengan range()</h3>
        <CodeBlock language="python">
{`# Loop 0 sampai 4
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Loop dengan start dan stop
for i in range(2, 6):
    print(i)  # 2, 3, 4, 5

# Loop dengan step
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8

# Countdown
for i in range(5, 0, -1):
    print(i)  # 5, 4, 3, 2, 1`}
        </CodeBlock>

        <h3>2. Loop melalui Collection</h3>
        <CodeBlock language="python">
{`# Loop list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Loop string
name = "Python"
for char in name:
    print(char)  # P, y, t, h, o, n

# Loop dictionary
user = {"name": "Budi", "age": 25, "city": "Jakarta"}

# Loop keys (default)
for key in user:
    print(key)  # name, age, city

# Loop values
for value in user.values():
    print(value)

# Loop key-value pairs
for key, value in user.items():
    print(f"{key}: {value}")`}
        </CodeBlock>

        <h3>3. enumerate() - Loop dengan Index</h3>
        <CodeBlock language="python">
{`fruits = ["apple", "banana", "cherry"]

# Without enumerate
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# With enumerate (better)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Custom start index
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}: {fruit}")  # 1: apple, 2: banana, ...`}
        </CodeBlock>

        <h3>4. zip() - Loop Multiple Lists</h3>
        <CodeBlock language="python">
{`names = ["Budi", "Ani", "Citra"]
ages = [25, 22, 30]
cities = ["Jakarta", "Bandung", "Surabaya"]

# Loop multiple lists simultaneously
for name, age, city in zip(names, ages, cities):
    print(f"{name}, {age} tahun, dari {city}")

# Output:
# Budi, 25 tahun, dari Jakarta
# Ani, 22 tahun, dari Bandung
# Citra, 30 tahun, dari Surabaya`}
        </CodeBlock>
      </Section>

      <Section title="while Loop">
        <CodeBlock language="python">
{`# Basic while loop
count = 0
while count < 5:
    print(count)
    count += 1

# While dengan kondisi complex
password = ""
while password != "secret":
    password = input("Enter password: ")

print("Access granted!")

# Infinite loop (hati-hati!)
# while True:
#     print("This runs forever")

# While dengan break
while True:
    command = input("Enter command (or 'quit'): ")
    if command == 'quit':
        break
    print(f"Executing: {command}")`}
        </CodeBlock>
      </Section>

      <Section title="break Statement">
        <p>break digunakan untuk keluar dari loop sebelum selesai:</p>
        <CodeBlock language="python">
{`# Find first even number
numbers = [1, 3, 5, 8, 9, 10]
for num in numbers:
    if num % 2 == 0:
        print(f"First even: {num}")
        break

# Search in list
names = ["Budi", "Ani", "Citra", "Dedi"]
search = "Citra"
for name in names:
    if name == search:
        print(f"Found: {name}")
        break
else:
    print(f"{search} not found")

# Break dari nested loop
for i in range(3):
    for j in range(3):
        if i == j == 1:
            print(f"Breaking at i={i}, j={j}")
            break  # Only breaks inner loop
    print(f"Completed i={i}")`}
        </CodeBlock>
      </Section>

      <Section title="continue Statement">
        <p>continue skip current iteration dan lanjut ke iteration berikutnya:</p>
        <CodeBlock language="python">
{`# Skip odd numbers
for i in range(10):
    if i % 2 != 0:
        continue
    print(i)  # Only prints even numbers

# Skip empty strings
names = ["Budi", "", "Ani", "", "Citra"]
for name in names:
    if not name:
        continue
    print(name)  # Skip empty strings

# Process only valid data
numbers = [10, -5, 20, -3, 30]
total = 0
for num in numbers:
    if num < 0:
        continue
    total += num
print(f"Total: {total}")  # 60`}
        </CodeBlock>
      </Section>

      <Section title="else Clause dengan Loop">
        <p>
          else pada loop dijalankan jika loop selesai tanpa break:
        </p>
        <CodeBlock language="python">
{`# for-else
numbers = [1, 3, 5, 7, 9]
search = 8

for num in numbers:
    if num == search:
        print(f"Found: {num}")
        break
else:
    print(f"{search} not found")  # Ini akan diprint

# while-else
attempts = 0
max_attempts = 3

while attempts < max_attempts:
    password = input("Enter password: ")
    if password == "secret":
        print("Login successful")
        break
    attempts += 1
else:
    print("Too many failed attempts")

# Practical: check if all items valid
items = [10, 20, 30, 40]
for item in items:
    if item < 0:
        print("Invalid item found")
        break
else:
    print("All items are valid")`}
        </CodeBlock>
      </Section>

      <Section title="pass Statement">
        <p>pass adalah placeholder (tidak melakukan apa-apa):</p>
        <CodeBlock language="python">
{`# Empty function (akan diimplementasi nanti)
def coming_soon():
    pass  # TODO: implement later

# Empty class
class MyClass:
    pass

# Conditional placeholder
age = 20
if age < 18:
    pass  # TODO: handle minor case
else:
    print("Adult")

# Loop placeholder
for i in range(10):
    if i % 2 == 0:
        pass  # TODO: handle even numbers
    else:
        print(f"Odd: {i}")`}
        </CodeBlock>
      </Section>

      <Section title="match-case (Python 3.10+)">
        <p>Pattern matching (seperti switch-case di bahasa lain):</p>
        <CodeBlock language="python">
{`# Basic match-case
def http_status(status):
    match status:
        case 200:
            return "OK"
        case 404:
            return "Not Found"
        case 500:
            return "Server Error"
        case _:  # default case
            return "Unknown"

print(http_status(404))  # Not Found

# Match dengan OR
def day_type(day):
    match day:
        case "Saturday" | "Sunday":
            return "Weekend"
        case "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday":
            return "Weekday"
        case _:
            return "Invalid day"

# Match dengan pattern
def process_command(command):
    match command.split():
        case ["quit"]:
            print("Quitting...")
        case ["load", filename]:
            print(f"Loading {filename}")
        case ["save", filename]:
            print(f"Saving to {filename}")
        case _:
            print("Unknown command")

process_command("load data.txt")  # Loading data.txt

# Match dengan conditions (guard)
def describe_age(age):
    match age:
        case age if age < 0:
            return "Invalid age"
        case age if age < 18:
            return "Minor"
        case age if age < 65:
            return "Adult"
        case _:
            return "Senior"

print(describe_age(25))  # Adult`}
        </CodeBlock>

        <Note type="info">
          match-case hanya tersedia di Python 3.10+. Untuk versi lama, gunakan if-elif-else.
        </Note>
      </Section>

      <Section title="Practical Examples">
        <h3>1. Number Guessing Game</h3>
        <CodeBlock language="python">
{`import random

number = random.randint(1, 100)
attempts = 0
max_attempts = 7

print("Guess the number between 1 and 100")

while attempts < max_attempts:
    guess = int(input(f"Attempt {attempts + 1}/{max_attempts}: "))
    attempts += 1
    
    if guess == number:
        print(f"Correct! You won in {attempts} attempts!")
        break
    elif guess < number:
        print("Too low!")
    else:
        print("Too high!")
else:
    print(f"Game over! The number was {number}")`}
        </CodeBlock>

        <h3>2. Simple Menu System</h3>
        <CodeBlock language="python">
{`def show_menu():
    print("\\n=== MENU ===")
    print("1. Add item")
    print("2. Remove item")
    print("3. Show items")
    print("4. Quit")

items = []

while True:
    show_menu()
    choice = input("Choose option: ")
    
    if choice == '1':
        item = input("Enter item: ")
        items.append(item)
        print(f"Added: {item}")
    
    elif choice == '2':
        if items:
            item = input("Enter item to remove: ")
            if item in items:
                items.remove(item)
                print(f"Removed: {item}")
            else:
                print("Item not found")
        else:
            print("No items to remove")
    
    elif choice == '3':
        if items:
            print("\\nItems:")
            for i, item in enumerate(items, 1):
                print(f"{i}. {item}")
        else:
            print("No items")
    
    elif choice == '4':
        print("Goodbye!")
        break
    
    else:
        print("Invalid choice")`}
        </CodeBlock>

        <h3>3. Multiplication Table</h3>
        <CodeBlock language="python">
{`number = int(input("Enter number for multiplication table: "))
print(f"\\nMultiplication table for {number}:")

for i in range(1, 11):
    result = number * i
    print(f"{number} x {i:2} = {result:3}")`}
        </CodeBlock>

        <h3>4. Prime Number Checker</h3>
        <CodeBlock language="python">
{`number = int(input("Enter a number: "))

if number < 2:
    print(f"{number} is not prime")
else:
    is_prime = True
    for i in range(2, int(number ** 0.5) + 1):
        if number % i == 0:
            print(f"{number} is not prime (divisible by {i})")
            is_prime = False
            break
    else:
        print(f"{number} is prime")`}
        </CodeBlock>

        <h3>5. Pattern Printing</h3>
        <CodeBlock language="python">
{`# Triangle pattern
n = 5
for i in range(1, n + 1):
    print('*' * i)

# Output:
# *
# **
# ***
# ****
# *****

# Pyramid
n = 5
for i in range(1, n + 1):
    spaces = ' ' * (n - i)
    stars = '*' * (2 * i - 1)
    print(spaces + stars)

# Output:
#     *
#    ***
#   *****
#  *******
# *********`}
        </CodeBlock>
      </Section>

      <Section title="Common Mistakes">
        <h3>1. Off-by-One Error</h3>
        <CodeBlock language="python">
{`# ❌ Wrong: range(10) goes 0-9, not 1-10
for i in range(10):
    pass  # i: 0, 1, 2, ..., 9

# Correct: untuk 1-10
for i in range(1, 11):
    pass  # i: 1, 2, 3, ..., 10`}
        </CodeBlock>

        <h3>2. Modifying List While Looping</h3>
        <CodeBlock language="python">
{`# ❌ Dangerous: modifying list during iteration
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # Can skip elements!

# Correct: loop over copy
numbers = [1, 2, 3, 4, 5]
for num in numbers[:]:  # Loop over copy
    if num % 2 == 0:
        numbers.remove(num)

# Better: list comprehension
numbers = [num for num in numbers if num % 2 != 0]`}
        </CodeBlock>

        <h3>3. Infinite Loop</h3>
        <CodeBlock language="python">
{`# ❌ Lupa increment
count = 0
while count < 5:
    print(count)
    # Lupa: count += 1  # Infinite loop!

# Correct
count = 0
while count < 5:
    print(count)
    count += 1`}
        </CodeBlock>
      </Section>

      <Section title="Best Practices">
        <ul>
          <li>Gunakan <code>for</code> loop jika tahu berapa kali loop, <code>while</code> jika kondisi dinamis</li>
          <li>Prefer <code>enumerate()</code> daripada <code>range(len())</code></li>
          <li>Use <code>for-else</code> untuk search scenarios</li>
          <li>Avoid modifying collection saat loop, gunakan copy atau list comprehension</li>
          <li>Keep nesting minimal (max 2-3 levels)</li>
          <li>Use <code>break</code> untuk early exit, bukan flag variables</li>
          <li>Add comments untuk complex loop logic</li>
        </ul>
      </Section>

      <Section title="Summary">
        <ul>
          <li>if-elif-else untuk conditional branching</li>
          <li>for loop untuk iterating collections atau range</li>
          <li>while loop untuk kondisi yang tidak pasti</li>
          <li>break keluar dari loop, continue skip iteration</li>
          <li>else clause pada loop untuk "no break" scenario</li>
          <li>pass sebagai placeholder</li>
          <li>match-case (Python 3.10+) untuk pattern matching</li>
          <li>enumerate() untuk index+value, zip() untuk multiple lists</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
