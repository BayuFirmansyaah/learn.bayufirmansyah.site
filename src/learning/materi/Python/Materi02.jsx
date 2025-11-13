import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi02() {
  return (
    <MateriLayout title="Variables & Data Types">
      <Section title="Variables di Python">
        <p>
          Variable adalah container untuk menyimpan data. Di Python, kamu tidak perlu 
          mendeklarasikan tipe data secara eksplisit (dynamically typed).
        </p>

        <h3>Membuat Variable</h3>
        <CodeBlock language="python">
{`# Assignment sederhana
name = "Budi"
age = 25
height = 175.5
is_student = True

# Multiple assignment
x, y, z = 10, 20, 30

# Same value untuk multiple variables
a = b = c = 100

print(name, age, height, is_student)
# Output: Budi 25 175.5 True`}
        </CodeBlock>

        <Note type="info">
          Python menggunakan <code>=</code> untuk assignment, dan <code>==</code> untuk comparison.
        </Note>
      </Section>

      <Section title="Naming Rules & Conventions">
        <h3>Rules (Harus Diikuti)</h3>
        <ul>
          <li>Harus dimulai dengan huruf (a-z, A-Z) atau underscore (_)</li>
          <li>Bisa mengandung huruf, angka, dan underscore</li>
          <li>Case-sensitive (<code>name</code> ≠ <code>Name</code>)</li>
          <li>Tidak boleh pakai reserved keywords</li>
        </ul>

        <CodeBlock language="python">
{`# Valid variable names
user_name = "Budi"
_private = 100
name2 = "Test"
userName = "CamelCase"

# ❌ Invalid variable names
# 2name = "Error"      # dimulai dengan angka
# user-name = "Error"  # pakai dash
# class = "Error"      # reserved keyword`}
        </CodeBlock>

        <h3>Conventions (Best Practice)</h3>
        <CodeBlock language="python">
{`# snake_case untuk variables & functions (PEP 8)
user_name = "Budi"
total_amount = 1000

# PascalCase untuk Classes
class UserProfile:
    pass

# UPPERCASE untuk constants
MAX_SIZE = 100
API_KEY = "secret"

# _prefix untuk "private" (convention)
_internal_counter = 0`}
        </CodeBlock>
      </Section>

      <Section title="Built-in Data Types">
        <h3>1. Numeric Types</h3>
        
        <h4>Integer (int)</h4>
        <CodeBlock language="python">
{`# Integer - bilangan bulat
age = 25
negative = -100
large_number = 1_000_000  # underscore untuk readability

print(type(age))  # <class 'int'>

# Operasi integer
result = 10 + 5   # 15
result = 10 - 3   # 7
result = 10 * 2   # 20
result = 10 // 3  # 3 (floor division)
result = 10 % 3   # 1 (modulus)
result = 2 ** 3   # 8 (power)`}
        </CodeBlock>

        <h4>Float</h4>
        <CodeBlock language="python">
{`# Float - bilangan desimal
height = 175.5
pi = 3.14159
scientific = 1.5e3  # 1500.0

print(type(height))  # <class 'float'>

# Operasi float
result = 10.5 + 2.3   # 12.8
result = 10.0 / 3     # 3.3333333333333335
result = 10 / 3       # 3.3333333333333335 (selalu float)

# Float precision issues
print(0.1 + 0.2)  # 0.30000000000000004`}
        </CodeBlock>

        <h4>Complex</h4>
        <CodeBlock language="python">
{`# Complex numbers
z = 3 + 4j
w = complex(2, 5)  # 2+5j

print(z.real)  # 3.0
print(z.imag)  # 4.0
print(abs(z))  # 5.0 (magnitude)`}
        </CodeBlock>
      </Section>

      <Section title="String (str)">
        <h3>Membuat String</h3>
        <CodeBlock language="python">
{`# Single quotes
name = 'Budi'

# Double quotes
city = "Jakarta"

# Triple quotes (multi-line)
message = """
Ini adalah string
yang multi-line
"""

# Escape characters
text = "Dia berkata: \\"Hello!\\""
path = "C:\\\\Users\\\\Documents"  # C:\\Users\\Documents
newline = "Line 1\\nLine 2"

# Raw string (ignore escape)
raw = r"C:\\Users\\Documents"
print(raw)  # C:\\Users\\Documents`}
        </CodeBlock>

        <h3>String Operations</h3>
        <CodeBlock language="python">
{`# Concatenation
first_name = "Budi"
last_name = "Santoso"
full_name = first_name + " " + last_name
print(full_name)  # Budi Santoso

# Repetition
stars = "*" * 10
print(stars)  # **********

# Indexing (0-based)
text = "Python"
print(text[0])   # P
print(text[-1])  # n (dari belakang)

# Slicing
print(text[0:3])   # Pyt
print(text[:3])    # Pyt (dari awal)
print(text[3:])    # hon (sampai akhir)
print(text[-3:])   # hon (3 dari belakang)
print(text[::2])   # Pto (setiap 2 karakter)

# Length
print(len(text))   # 6`}
        </CodeBlock>

        <h3>String Formatting</h3>
        <CodeBlock language="python">
{`name = "Budi"
age = 25

# 1. f-string (Python 3.6+, RECOMMENDED)
message = f"Nama: {name}, Umur: {age}"
print(message)  # Nama: Budi, Umur: 25

# Expressions dalam f-string
print(f"Tahun depan umur saya {age + 1}")

# Formatting numbers
price = 1234.5678
print(f"Harga: Rp {price:,.2f}")  # Harga: Rp 1,234.57

# 2. format() method
message = "Nama: {}, Umur: {}".format(name, age)
message = "Nama: {0}, Umur: {1}".format(name, age)
message = "Nama: {n}, Umur: {a}".format(n=name, a=age)

# 3. % operator (old style)
message = "Nama: %s, Umur: %d" % (name, age)`}
        </CodeBlock>
      </Section>

      <Section title="Boolean (bool)">
        <CodeBlock language="python">
{`# Boolean values
is_active = True
is_logged_in = False

print(type(is_active))  # <class 'bool'>

# Boolean operations
result = True and False  # False
result = True or False   # True
result = not True        # False

# Comparison menghasilkan boolean
is_adult = age >= 18     # True jika age >= 18
is_equal = (10 == 10)    # True

# Truthy & Falsy values
# Falsy: False, 0, 0.0, "", [], {}, None
# Truthy: sisanya

if []:
    print("List kosong adalah Falsy")
else:
    print("Ini akan diprint")

if [1, 2, 3]:
    print("List berisi adalah Truthy")  # Ini akan diprint`}
        </CodeBlock>
      </Section>

      <Section title="None Type">
        <CodeBlock language="python">
{`# None - representasi "tidak ada nilai"
result = None
print(type(result))  # <class 'NoneType'>

# Checking None
if result is None:
    print("Result is None")

# Fungsi tanpa return menghasilkan None
def do_something():
    print("Hello")

x = do_something()  # Hello
print(x)            # None

# None vs empty
empty_string = ""
none_value = None

print(empty_string == None)  # False
print(none_value is None)    # True (use 'is' for None)`}
        </CodeBlock>
      </Section>

      <Section title="Type Conversion (Casting)">
        <h3>Explicit Conversion</h3>
        <CodeBlock language="python">
{`# String to Integer
age_str = "25"
age_int = int(age_str)
print(age_int + 5)  # 30

# String to Float
price_str = "99.99"
price_float = float(price_str)
print(price_float)  # 99.99

# Number to String
number = 42
number_str = str(number)
print("Number: " + number_str)

# Float to Integer (truncate)
float_num = 9.8
int_num = int(float_num)
print(int_num)  # 9

# String to Boolean (not intuitive!)
print(bool("False"))  # True (any non-empty string is True)
print(bool(""))       # False

# Integer to Boolean
print(bool(0))    # False
print(bool(1))    # True
print(bool(-1))   # True`}
        </CodeBlock>

        <h3>Error Handling saat Conversion</h3>
        <CodeBlock language="python">
{`# ValueError jika format salah
try:
    number = int("abc")  # ValueError
except ValueError:
    print("Cannot convert 'abc' to integer")

# Check before conversion
text = "123"
if text.isdigit():
    number = int(text)
    print(f"Converted: {number}")
else:
    print("Not a valid number")`}
        </CodeBlock>
      </Section>

      <Section title="Type Checking">
        <CodeBlock language="python">
{`# type() function
x = 42
print(type(x))        # <class 'int'>
print(type(x) == int) # True

# isinstance() - recommended untuk type checking
x = 42
print(isinstance(x, int))    # True
print(isinstance(x, float))  # False

# Multiple types
x = 10
print(isinstance(x, (int, float)))  # True

# Type checking dalam function
def process_number(num):
    if not isinstance(num, (int, float)):
        raise TypeError("Expected int or float")
    return num * 2

print(process_number(5))     # 10
# process_number("5")        # TypeError`}
        </CodeBlock>
      </Section>

      <Section title="Input dari User">
        <CodeBlock language="python">
{`# input() selalu return string
name = input("Masukkan nama: ")
print(f"Hello, {name}!")

# Convert input ke number
age_str = input("Masukkan umur: ")
age = int(age_str)
print(f"Tahun depan umur kamu {age + 1}")

# One-liner
age = int(input("Masukkan umur: "))

# Handle invalid input
try:
    age = int(input("Masukkan umur: "))
    print(f"Umur kamu: {age}")
except ValueError:
    print("Umur harus berupa angka!")`}
        </CodeBlock>
      </Section>

      <Section title="Constants Convention">
        <CodeBlock language="python">
{`# Python tidak punya true constants
# Convention: UPPERCASE untuk constants

# config.py
MAX_CONNECTIONS = 100
API_KEY = "secret_key_123"
DATABASE_URL = "postgresql://localhost/mydb"
PI = 3.14159

# Gunakan constants
import config
print(config.MAX_CONNECTIONS)

# Atau direct
MAX_RETRIES = 3
for attempt in range(MAX_RETRIES):
    print(f"Attempt {attempt + 1}")`}
        </CodeBlock>
      </Section>

      <Section title="Variable Scope - Preview">
        <CodeBlock language="python">
{`# Global variable
global_var = "I'm global"

def my_function():
    # Local variable
    local_var = "I'm local"
    print(global_var)  # bisa akses global
    print(local_var)

my_function()
# print(local_var)  # NameError: local_var not defined

# Modify global variable
counter = 0

def increment():
    global counter  # harus declare global
    counter += 1

increment()
print(counter)  # 1`}
        </CodeBlock>
      </Section>

      <Section title="Practical Examples">
        <h3>1. Calculator Sederhana</h3>
        <CodeBlock language="python">
{`# Simple calculator
num1 = float(input("Masukkan angka pertama: "))
num2 = float(input("Masukkan angka kedua: "))
operator = input("Operator (+, -, *, /): ")

if operator == "+":
    result = num1 + num2
elif operator == "-":
    result = num1 - num2
elif operator == "*":
    result = num1 * num2
elif operator == "/":
    if num2 != 0:
        result = num1 / num2
    else:
        result = "Error: Division by zero"
else:
    result = "Invalid operator"

print(f"Hasil: {result}")`}
        </CodeBlock>

        <h3>2. Temperature Converter</h3>
        <CodeBlock language="python">
{`# Celsius to Fahrenheit
celsius = float(input("Temperature in Celsius: "))
fahrenheit = (celsius * 9/5) + 32
print(f"{celsius}°C = {fahrenheit}°F")

# Fahrenheit to Celsius
fahrenheit = float(input("Temperature in Fahrenheit: "))
celsius = (fahrenheit - 32) * 5/9
print(f"{fahrenheit}°F = {celsius:.2f}°C")`}
        </CodeBlock>

        <h3>3. Age Calculator</h3>
        <CodeBlock language="python">
{`from datetime import datetime

birth_year = int(input("Tahun lahir: "))
current_year = datetime.now().year
age = current_year - birth_year

print(f"Umur kamu: {age} tahun")

if age >= 18:
    print("Kamu sudah dewasa")
else:
    years_left = 18 - age
    print(f"{years_left} tahun lagi menjadi dewasa")`}
        </CodeBlock>
      </Section>

      <Section title="Common Mistakes">
        <h3>1. Typo pada Variable Name</h3>
        <CodeBlock language="python">
{`# ❌ Typo
usrName = "Budi"
print(userName)  # NameError

# Consistent naming
user_name = "Budi"
print(user_name)`}
        </CodeBlock>

        <h3>2. Type Mismatch</h3>
        <CodeBlock language="python">
{`# ❌ Type error
age = "25"
result = age + 5  # TypeError: can only concatenate str

# Convert first
age = int("25")
result = age + 5  # 30`}
        </CodeBlock>

        <h3>3. Division Confusion</h3>
        <CodeBlock language="python">
{`# Regular division (always float)
result = 10 / 2   # 5.0 (float)

# Floor division (integer)
result = 10 // 3  # 3 (int)

# Modulus (remainder)
result = 10 % 3   # 1`}
        </CodeBlock>
      </Section>

      <Section title="Best Practices">
        <ul>
          <li>Gunakan nama variable yang descriptive: <code>user_age</code> lebih baik dari <code>x</code></li>
          <li>Follow PEP 8: snake_case untuk variables</li>
          <li>Gunakan f-strings untuk string formatting (Python 3.6+)</li>
          <li>Explicit type conversion lebih baik daripada implicit</li>
          <li>Use <code>isinstance()</code> untuk type checking, bukan <code>type() ==</code></li>
          <li>Constants pakai UPPERCASE</li>
          <li>Validate input dari user sebelum convert</li>
        </ul>
      </Section>

      <Section title="Summary">
        <ul>
          <li>Python adalah dynamically typed (tidak perlu declare type)</li>
          <li>Built-in types: int, float, complex, str, bool, None</li>
          <li>Type conversion: int(), float(), str(), bool()</li>
          <li>String formatting: f-string (recommended)</li>
          <li>input() selalu return string, convert sesuai kebutuhan</li>
          <li>Follow naming conventions (snake_case, UPPERCASE constants)</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
