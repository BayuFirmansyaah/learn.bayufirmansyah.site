import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi03() {
  return (
    <MateriLayout
      title="Dart Fundamentals"
      intro="Dart adalah bahasa pemrograman modern yang digunakan oleh Flutter. Di materi ini, kita akan mempelajari fundamental Dart mulai dari variables, data types, operators, hingga null safety yang powerful."
    >
      {/* Variables */}
      <Section id="variables" heading="Variables">
        <p>
          Dart memiliki beberapa cara untuk declare variables dengan behavior berbeda.
        </p>

        <Subsection id="var-keyword" heading="var - Type Inference">
          <p>
            Menggunakan <code>var</code>, Dart akan otomatis detect type dari value yang di-assign.
          </p>

          <CodeBlock language="dart">
{`// Dart automatically infers type
var name = 'John';        // String
var age = 25;             // int
var height = 175.5;       // double
var isStudent = true;     // bool

// Type sudah fixed, tidak bisa reassign dengan type berbeda
name = 'Jane';            //  OK - same type
// name = 123;            // ❌ ERROR - different type

print('Name: $name, Age: $age');`}
          </CodeBlock>
        </Subsection>

        <Subsection id="final-const" heading="final vs const - Immutable Variables">
          <p>
            <strong>final</strong> dan <strong>const</strong> digunakan untuk membuat variable yang tidak bisa diubah (immutable), 
            tapi ada perbedaan penting:
          </p>

          <CodeBlock language="dart">
{`// final - Runtime constant (nilai bisa dari hasil computation)
final String name = 'John';
final currentTime = DateTime.now();        //  OK
final userInput = getUserInput();          //  OK

// Tidak bisa reassign
// name = 'Jane';                          // ❌ ERROR

// const - Compile-time constant (nilai harus sudah diketahui saat compile)
const String appName = 'MyApp';
const int maxUsers = 100;
const pi = 3.14159;
// const time = DateTime.now();            // ❌ ERROR - not compile-time

// const juga membuat object immutable
const colors = ['red', 'green', 'blue'];
// colors.add('yellow');                   // ❌ ERROR - cannot modify`}
          </CodeBlock>

          <Note type="tip">
            <strong>Rule of thumb:</strong><br/>
            • Gunakan <code>const</code> untuk values yang sudah pasti (constant math, strings, etc)<br/>
            • Gunakan <code>final</code> untuk values dari runtime computation<br/>
            • Gunakan <code>var</code> untuk values yang bisa berubah
          </Note>
        </Subsection>

        <Subsection id="explicit-types" heading="Explicit Type Declaration">
          <p>
            Anda juga bisa explicitly declare type untuk clarity:
          </p>

          <CodeBlock language="dart">
{`// Explicit types - more readable for complex code
String name = 'John';
int age = 25;
double height = 175.5;
bool isStudent = true;
List<String> hobbies = ['coding', 'gaming'];
Map<String, int> scores = {'math': 90, 'english': 85};

// Nullable types (will explain later)
String? middleName;      // Can be String or null
int? optionalAge;        // Can be int or null`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Data Types */}
      <Section id="data-types" heading="Data Types">
        <p>
          Dart adalah strongly typed language dengan built-in types yang powerful.
        </p>

        <Subsection id="numbers" heading="Numbers (int & double)">
          <CodeBlock language="dart">
{`// int - Integer numbers
int age = 25;
int hexValue = 0xFF;        // Hexadecimal
int bigNumber = 1000000;

// double - Floating-point numbers
double height = 175.5;
double pi = 3.14159;
double scientific = 1.5e3;  // 1500.0

// num - Parent class of int and double
num temperature = 36.5;     // Can be int or double
temperature = 37;           //  OK

// Conversion
int age = 25;
double ageDouble = age.toDouble();    // 25.0
String ageString = age.toString();    // '25'

double height = 175.5;
int heightInt = height.toInt();       // 175 (truncated)
int rounded = height.round();         // 176

// Parsing
int parsed = int.parse('123');        // 123
double parsedDouble = double.parse('3.14');  // 3.14

// Math operations
int sum = 10 + 5;           // 15
int diff = 10 - 5;          // 5
int product = 10 * 5;       // 50
double division = 10 / 3;   // 3.3333...
int intDiv = 10 ~/ 3;       // 3 (integer division)
int modulo = 10 % 3;        // 1 (remainder)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="strings" heading="Strings">
          <CodeBlock language="dart">
{`// String literals
String name = 'John';
String message = "Hello World";
String multiline = '''
This is a
multi-line
string
''';

// String interpolation - SUPER POWERFUL!
String firstName = 'John';
String lastName = 'Doe';
int age = 25;

// Using $ for simple variables
print('Name: $firstName $lastName');

// Using \${} for expressions
print('Full name: \${firstName.toUpperCase()} $lastName');
print('Age in 5 years: \${age + 5}');
print('Is adult: \${age >= 18}');

// String concatenation
String fullName = firstName + ' ' + lastName;
String greeting = 'Hello, ' + fullName + '!';

// String methods
String text = 'Hello World';
print(text.length);              // 11
print(text.toUpperCase());       // 'HELLO WORLD'
print(text.toLowerCase());       // 'hello world'
print(text.contains('World'));   // true
print(text.startsWith('Hello')); // true
print(text.endsWith('World'));   // true
print(text.substring(0, 5));     // 'Hello'
print(text.replaceAll('World', 'Dart'));  // 'Hello Dart'
print(text.split(' '));          // ['Hello', 'World']
print(text.trim());              // Remove whitespace

// Raw strings - no interpolation
String rawString = r'Text with $ and \n';  // Literal $, \n tidak di-process`}
          </CodeBlock>

          <Note type="info">
            String interpolation di Dart jauh lebih elegant dibanding Java/JavaScript concatenation!
          </Note>
        </Subsection>

        <Subsection id="booleans" heading="Booleans">
          <CodeBlock language="dart">
{`// bool - true or false
bool isStudent = true;
bool hasLicense = false;

// Boolean expressions
int age = 25;
bool isAdult = age >= 18;           // true
bool canDrive = age >= 17 && hasLicense;  // false

// Logical operators
bool a = true;
bool b = false;
print(a && b);   // false (AND)
print(a || b);   // true (OR)
print(!a);       // false (NOT)

// Comparison
print(5 == 5);   // true (equal)
print(5 != 3);   // true (not equal)
print(5 > 3);    // true
print(5 < 3);    // false
print(5 >= 5);   // true
print(5 <= 4);   // false`}
          </CodeBlock>
        </Subsection>

        <Subsection id="lists" heading="Lists (Arrays)">
          <CodeBlock language="dart">
{`// List - Ordered collection
List<String> fruits = ['apple', 'banana', 'orange'];
List<int> numbers = [1, 2, 3, 4, 5];

// Type inference
var colors = ['red', 'green', 'blue'];  // List<String>
var mixed = [1, 'two', 3.0, true];      // List<dynamic>

// Access elements
print(fruits[0]);        // 'apple'
print(fruits[1]);        // 'banana'
print(fruits.first);     // 'apple'
print(fruits.last);      // 'orange'

// Modify
fruits.add('grape');              // ['apple', 'banana', 'orange', 'grape']
fruits.insert(1, 'mango');        // Insert at index
fruits.remove('banana');          // Remove by value
fruits.removeAt(0);               // Remove by index
fruits.clear();                   // Remove all

// Properties
print(fruits.length);             // Number of elements
print(fruits.isEmpty);            // true if empty
print(fruits.isNotEmpty);         // true if not empty

// List operations
var nums = [1, 2, 3, 4, 5];
nums.forEach((n) => print(n));    // Iterate
var doubled = nums.map((n) => n * 2).toList();  // [2, 4, 6, 8, 10]
var evens = nums.where((n) => n % 2 == 0).toList();  // [2, 4]
var sum = nums.reduce((a, b) => a + b);  // 15

// Spread operator
var list1 = [1, 2, 3];
var list2 = [4, 5, 6];
var combined = [...list1, ...list2];  // [1, 2, 3, 4, 5, 6]

// Fixed-length list
var fixedList = List<int>.filled(5, 0);  // [0, 0, 0, 0, 0]`}
          </CodeBlock>
        </Subsection>

        <Subsection id="maps" heading="Maps (Dictionaries)">
          <CodeBlock language="dart">
{`// Map - Key-value pairs
Map<String, int> ages = {
  'John': 25,
  'Jane': 23,
  'Bob': 30
};

// Type inference
var person = {
  'name': 'John',
  'age': 25,
  'city': 'Jakarta'
};  // Map<String, Object>

// Access values
print(ages['John']);              // 25
print(person['name']);            // 'John'
print(ages['Unknown']);           // null (key doesn't exist)

// Modify
ages['Alice'] = 28;               // Add new entry
ages['John'] = 26;                // Update existing
ages.remove('Bob');               // Remove entry

// Properties
print(ages.length);               // Number of entries
print(ages.isEmpty);              // false
print(ages.keys);                 // ('John', 'Jane')
print(ages.values);               // (25, 23)
print(ages.containsKey('John'));  // true
print(ages.containsValue(25));    // true

// Iteration
ages.forEach((key, value) {
  print('$key is $value years old');
});

// Map operations
var entries = ages.entries;
var keysList = ages.keys.toList();
var valuesList = ages.values.toList();`}
          </CodeBlock>
        </Subsection>

        <Subsection id="sets" heading="Sets (Unique Collections)">
          <CodeBlock language="dart">
{`// Set - Unordered collection of unique items
Set<String> fruits = {'apple', 'banana', 'orange'};
var numbers = {1, 2, 3, 4, 5};  // Set<int>

// Duplicates automatically removed
var withDupes = {1, 2, 2, 3, 3, 3};  // {1, 2, 3}

// Add/Remove
fruits.add('grape');
fruits.add('apple');      // No effect - already exists
fruits.remove('banana');

// Set operations
var set1 = {1, 2, 3};
var set2 = {3, 4, 5};
print(set1.union(set2));        // {1, 2, 3, 4, 5}
print(set1.intersection(set2)); // {3}
print(set1.difference(set2));   // {1, 2}

// Check membership
print(fruits.contains('apple'));  // true`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Operators */}
      <Section id="operators" heading="Operators">
        <Subsection id="arithmetic" heading="Arithmetic Operators">
          <CodeBlock language="dart">
{`int a = 10;
int b = 3;

print(a + b);    // 13 - Addition
print(a - b);    // 7  - Subtraction
print(a * b);    // 30 - Multiplication
print(a / b);    // 3.333... - Division (returns double)
print(a ~/ b);   // 3  - Integer division
print(a % b);    // 1  - Modulo (remainder)

// Unary operators
print(-a);       // -10 - Negation
print(++a);      // 11 - Prefix increment (increment then return)
print(a++);      // 11 - Postfix increment (return then increment)
print(--a);      // 11 - Prefix decrement
print(a--);      // 11 - Postfix decrement`}
          </CodeBlock>
        </Subsection>

        <Subsection id="assignment" heading="Assignment Operators">
          <CodeBlock language="dart">
{`int x = 10;

x = 5;       // Simple assignment
x += 3;      // x = x + 3 (8)
x -= 2;      // x = x - 2 (6)
x *= 2;      // x = x * 2 (12)
x ~/= 3;     // x = x ~/ 3 (4)
x %= 3;      // x = x % 3 (1)

// Null-aware assignment
String? name;
name ??= 'Default';  // Only assign if name is null`}
          </CodeBlock>
        </Subsection>

        <Subsection id="comparison" heading="Comparison Operators">
          <CodeBlock language="dart">
{`int a = 10;
int b = 5;

print(a == b);   // false - Equal
print(a != b);   // true  - Not equal
print(a > b);    // true  - Greater than
print(a < b);    // false - Less than
print(a >= b);   // true  - Greater than or equal
print(a <= b);   // false - Less than or equal`}
          </CodeBlock>
        </Subsection>

        <Subsection id="logical" heading="Logical Operators">
          <CodeBlock language="dart">
{`bool a = true;
bool b = false;

print(a && b);   // false - AND (both must be true)
print(a || b);   // true  - OR (at least one true)
print(!a);       // false - NOT (invert)

// Short-circuit evaluation
bool result = false && expensiveFunction();  // expensiveFunction() not called`}
          </CodeBlock>
        </Subsection>

        <Subsection id="conditional" heading="Conditional (Ternary) Operator">
          <CodeBlock language="dart">
{`int age = 20;

// condition ? valueIfTrue : valueIfFalse
String status = age >= 18 ? 'Adult' : 'Minor';
print(status);  // 'Adult'

// Nested ternary (not recommended, hard to read)
String category = age < 13 ? 'Child' : age < 18 ? 'Teen' : 'Adult';`}
          </CodeBlock>
        </Subsection>

        <Subsection id="cascade" heading="Cascade Operator (..)">
          <CodeBlock language="dart">
{`// Cascade allows multiple operations on same object
var person = Person()
  ..name = 'John'
  ..age = 25
  ..city = 'Jakarta'
  ..printInfo();

// Without cascade (more verbose):
var person = Person();
person.name = 'John';
person.age = 25;
person.city = 'Jakarta';
person.printInfo();

// List example
var numbers = [1, 2, 3]
  ..add(4)
  ..add(5)
  ..remove(1);  // [2, 3, 4, 5]`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Null Safety */}
      <Section id="null-safety" heading="Null Safety">
        <p>
          Dart memiliki null safety yang powerful untuk menghindari null reference errors - 
          salah satu bug paling umum dalam programming!
        </p>

        <Subsection id="nullable-types" heading="Nullable vs Non-Nullable Types">
          <CodeBlock language="dart">
{`// Non-nullable - CANNOT be null
String name = 'John';
int age = 25;
// name = null;  // ❌ ERROR - cannot assign null

// Nullable - CAN be null (add ?)
String? middleName;        // null by default
int? optionalAge;
middleName = 'Smith';      //  OK
middleName = null;         //  OK

// Must check null before use
if (middleName != null) {
  print(middleName.length);  // Safe
}

// Or use ?. operator
print(middleName?.length);   // null if middleName is null`}
          </CodeBlock>
        </Subsection>

        <Subsection id="null-operators" heading="Null-aware Operators">
          <CodeBlock language="dart">
{`String? name;

// ?. - Null-aware access
print(name?.length);           // null (doesn't throw error)

// ?? - Null coalescing (default value)
String displayName = name ?? 'Guest';
print(displayName);            // 'Guest'

// ??= - Null-aware assignment
name ??= 'Default';            // Only assign if null

// ! - Null assertion (force unwrap)
String? maybeName = getName();
String definitelyName = maybeName!;  // Throws error if null
// Use with caution! Only if you're 100% sure it's not null

// Chaining
String? firstName = person?.name?.firstName ?? 'Unknown';`}
          </CodeBlock>

          <Note type="warning">
            <strong>Null assertion operator (!) harus digunakan dengan hati-hati!</strong><br/>
            Gunakan hanya jika Anda 100% yakin value tidak null. Lebih baik gunakan null check atau ?? operator.
          </Note>
        </Subsection>

        <Subsection id="late-keyword" heading="late Keyword">
          <CodeBlock language="dart">
{`// late - Initialize later (but before use)
late String description;

void initialize() {
  description = 'This is initialized later';
}

void use() {
  initialize();
  print(description);  //  OK - already initialized
}

// late with lazy initialization
class ExpensiveResource {
  late String data = loadData();  // Only loaded when first accessed
  
  String loadData() {
    print('Loading data...');
    return 'Expensive data';
  }
}

var resource = ExpensiveResource();  // loadData() NOT called yet
print(resource.data);                // NOW loadData() is called`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Type Inference */}
      <Section id="type-inference" heading="Type Inference">
        <p>
          Dart compiler sangat pintar dalam mendeteksi types secara otomatis.
        </p>

        <CodeBlock language="dart">
{`// Dart infers types automatically
var name = 'John';              // String
var age = 25;                   // int
var height = 175.5;             // double
var isStudent = true;           // bool
var hobbies = ['reading'];      // List<String>
var scores = {'math': 90};      // Map<String, int>

// Generic types
var numbers = <int>[1, 2, 3];   // List<int>
var data = <String, dynamic>{   // Map<String, dynamic>
  'name': 'John',
  'age': 25
};

// Function return type inference
var add = (int a, int b) => a + b;  // Function returns int

// When to use explicit types?
// - For clarity in complex code
// - When empty collections need specific type
List<String> names = [];        // Clear that it's List<String>
var names = <String>[];         // Also clear
var names = [];                 // Unclear - List<dynamic>`}
        </CodeBlock>

        <Note type="tip">
          <strong>Best Practice:</strong> Gunakan type inference (<code>var</code>) untuk local variables 
          yang jelas typenya. Gunakan explicit types untuk class fields dan function parameters untuk clarity.
        </Note>
      </Section>

      {/* Comments */}
      <Section id="comments" heading="Comments & Documentation">
        <CodeBlock language="dart">
{`// Single-line comment
int age = 25;  // Inline comment

/*
  Multi-line comment
  Useful for longer explanations
  or temporarily disabling code
*/

/// Documentation comment (use triple-slash)
/// This appears in IDE tooltips and generated documentation
/// 
/// You can use markdown:
/// - Lists
/// - **Bold text**
/// - code
/// 
/// Example:
/// var person = Person('John', 25);
class Person {
  /// The person's name
  String name;
  
  /// The person's age in years
  int age;
  
  /// Creates a new person with [name] and [age]
  Person(this.name, this.age);
  
  /// Returns a greeting message
  /// Example: print(person.greet());
  String greet() {
    return 'Hello, I am $name';
  }
}

// TODO: comments for tracking tasks
// TODO: Implement validation
// FIXME: This has a bug
// HACK: Temporary workaround`}
        </CodeBlock>

        <Note type="info">
          IDE akan highlight TODO, FIXME, dan HACK comments untuk easy tracking!
        </Note>
      </Section>

      {/* Praktik */}
      <Section id="practice" heading="Latihan Praktik">
        <p>
          Mari praktik menggunakan Dart fundamentals!
        </p>

        <CodeBlock language="dart">
{`void main() {
  // 1. Variables & Types
  var name = 'Budi';
  var age = 20;
  var gpa = 3.75;
  var isActive = true;
  
  print('Student: $name, Age: $age, GPA: $gpa, Active: $isActive');
  
  // 2. Lists
  var scores = [85, 90, 78, 92, 88];
  var average = scores.reduce((a, b) => a + b) / scores.length;
  print('Average score: $average');
  
  // 3. Maps
  var student = {
    'name': 'Budi',
    'nim': '12345',
    'major': 'Computer Science'
  };
  print('Student info: \${student['name']} - \${student['major']}');
  
  // 4. Null safety
  String? middleName;
  print('Middle name: \${middleName ?? 'No middle name'}');
  
  // 5. String manipulation
  var fullName = 'John Doe Smith';
  var names = fullName.split(' ');
  print('First name: \${names[0]}');
  print('Last name: \${names[names.length - 1]}');
  print('Initials: \${names.map((n) => n[0]).join('.')}');
  
  // 6. Conditional
  var grade = gpa >= 3.5 ? 'Excellent' : gpa >= 3.0 ? 'Good' : 'Fair';
  print('Grade: $grade');
  
  // 7. List operations
  var evenScores = scores.where((s) => s % 2 == 0).toList();
  var highScores = scores.where((s) => s >= 85).toList();
  print('Even scores: $evenScores');
  print('High scores: $highScores');
}`}
        </CodeBlock>

        <Note type="success">
          Coba run code di atas di <a href="https://dartpad.dev" target="_blank" rel="noopener">DartPad</a> 
          untuk eksperimen langsung!
        </Note>
      </Section>

      {/* Rangkuman */}
      <Section id="summary" heading="Rangkuman">
        <p>
          Di materi ini, kita telah mempelajari fundamental Dart:
        </p>
        <ul>
          <li> <strong>Variables:</strong> var, final, const, dan explicit types</li>
          <li> <strong>Data Types:</strong> int, double, String, bool, List, Map, Set</li>
          <li> <strong>String Interpolation:</strong> $ dan $&#123;&#125; untuk elegant string formatting</li>
          <li> <strong>Operators:</strong> Arithmetic, assignment, comparison, logical, cascade</li>
          <li> <strong>Null Safety:</strong> ?, ?., ??, ??=, ! untuk handle null dengan aman</li>
          <li> <strong>Type Inference:</strong> Dart pintar detect types otomatis</li>
          <li> <strong>Comments:</strong> //, /* */, /// untuk documentation</li>
        </ul>

        <Note type="success">
          <strong>Next:</strong> Di materi berikutnya, kita akan belajar Control Flow (if-else, loops) 
          dan Functions untuk membuat logic yang lebih complex!
        </Note>
      </Section>
    </MateriLayout>
  );
}
