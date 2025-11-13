import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi04() {
  return (
    <MateriLayout
      title="Control Flow & Functions"
      intro="Control flow memungkinkan program membuat keputusan dan mengulang code. Functions membantu mengorganisir code menjadi reusable blocks. Mari kuasai fundamental ini untuk membuat logic yang powerful!"
    >
      {/* If-Else */}
      <Section id="if-else" heading="If-Else Statements">
        <p>
          Conditional statements untuk membuat keputusan dalam program.
        </p>

        <CodeBlock language="dart">
{`// Simple if
int age = 20;
if (age >= 18) {
  print('You are an adult');
}

// If-else
if (age >= 18) {
  print('Adult');
} else {
  print('Minor');
}

// If-else if-else
int score = 85;
if (score >= 90) {
  print('Grade: A');
} else if (score >= 80) {
  print('Grade: B');
} else if (score >= 70) {
  print('Grade: C');
} else if (score >= 60) {
  print('Grade: D');
} else {
  print('Grade: F');
}

// Nested if
bool hasLicense = true;
int age = 20;
if (age >= 17) {
  if (hasLicense) {
    print('Can drive');
  } else {
    print('Need license');
  }
} else {
  print('Too young to drive');
}

// Logical operators in conditions
bool isStudent = true;
int age = 20;
if (age >= 18 && isStudent) {
  print('Adult student - eligible for discount');
}

if (age < 13 || age > 65) {
  print('Eligible for special pricing');
}`}
        </CodeBlock>

        <Note type="tip">
          Gunakan ternary operator untuk simple if-else:<br/>
          <code>String status = age &gt;= 18 ? 'Adult' : 'Minor';</code>
        </Note>
      </Section>

      {/* Switch Case */}
      <Section id="switch-case" heading="Switch Case">
        <p>
          Switch statement untuk multiple conditional branches yang lebih readable.
        </p>

        <CodeBlock language="dart">
{`String day = 'Monday';

switch (day) {
  case 'Monday':
    print('Start of work week');
    break;
  case 'Tuesday':
  case 'Wednesday':
  case 'Thursday':
    print('Mid week');
    break;
  case 'Friday':
    print('End of work week');
    break;
  case 'Saturday':
  case 'Sunday':
    print('Weekend!');
    break;
  default:
    print('Invalid day');
}

// With int
int month = 3;
switch (month) {
  case 1:
  case 2:
  case 12:
    print('Winter');
    break;
  case 3:
  case 4:
  case 5:
    print('Spring');
    break;
  case 6:
  case 7:
  case 8:
    print('Summer');
    break;
  case 9:
  case 10:
  case 11:
    print('Fall');
    break;
  default:
    print('Invalid month');
}`}
        </CodeBlock>

        <Note type="warning">
          Jangan lupa <code>break</code>! Tanpa break, execution akan continue ke case berikutnya 
          (fall-through). Gunakan fall-through dengan hati-hati.
        </Note>
      </Section>

      {/* Loops */}
      <Section id="loops" heading="Loops">
        <Subsection id="for-loop" heading="For Loop">
          <CodeBlock language="dart">
{`// Traditional for loop
for (int i = 0; i < 5; i++) {
  print('Count: $i');
}
// Output: 0, 1, 2, 3, 4

// For-in loop (iterate collection)
var fruits = ['apple', 'banana', 'orange'];
for (var fruit in fruits) {
  print('Fruit: $fruit');
}

// For loop with list
var numbers = [1, 2, 3, 4, 5];
for (var i = 0; i < numbers.length; i++) {
  print('Number at index $i: \${numbers[i]}');
}

// Reverse loop
for (var i = 5; i > 0; i--) {
  print('Countdown: $i');
}

// Step by 2
for (var i = 0; i < 10; i += 2) {
  print('Even: $i');
}

// Nested loops
for (var i = 1; i <= 3; i++) {
  for (var j = 1; j <= 3; j++) {
    print('$i x $j = \${i * j}');
  }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="while-loop" heading="While Loop">
          <CodeBlock language="dart">
{`// While loop - check condition first
int count = 0;
while (count < 5) {
  print('Count: $count');
  count++;
}

// Do-while loop - execute first, then check
int i = 0;
do {
  print('Number: $i');
  i++;
} while (i < 5);

// While with condition
bool isRunning = true;
int counter = 0;
while (isRunning) {
  print('Running: $counter');
  counter++;
  if (counter >= 5) {
    isRunning = false;
  }
}

// Infinite loop (be careful!)
// while (true) {
//   print('This runs forever');
//   break;  // Need break to exit
// }`}
          </CodeBlock>
        </Subsection>

        <Subsection id="foreach" heading="forEach Method">
          <CodeBlock language="dart">
{`// forEach with list
var numbers = [1, 2, 3, 4, 5];
numbers.forEach((number) {
  print('Number: $number');
});

// Shorter syntax
numbers.forEach((n) => print('N: $n'));

// With index using asMap()
numbers.asMap().forEach((index, value) {
  print('Index $index: $value');
});

// forEach with map
var person = {
  'name': 'John',
  'age': 25,
  'city': 'Jakarta'
};
person.forEach((key, value) {
  print('$key: $value');
});`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Break & Continue */}
      <Section id="break-continue" heading="Break & Continue">
        <CodeBlock language="dart">
{`// break - exit loop immediately
for (var i = 0; i < 10; i++) {
  if (i == 5) {
    break;  // Stop when i is 5
  }
  print(i);
}
// Output: 0, 1, 2, 3, 4

// continue - skip current iteration
for (var i = 0; i < 10; i++) {
  if (i % 2 == 0) {
    continue;  // Skip even numbers
  }
  print(i);
}
// Output: 1, 3, 5, 7, 9

// break in nested loop
outerLoop:
for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    if (i == 1 && j == 1) {
      break outerLoop;  // Break outer loop
    }
    print('$i, $j');
  }
}

// continue in nested loop
for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    if (j == 1) {
      continue;  // Skip j = 1
    }
    print('$i, $j');
  }
}`}
        </CodeBlock>

        <Note type="info">
          <strong>break</strong> menghentikan loop sepenuhnya.<br/>
          <strong>continue</strong> skip iterasi saat ini, lanjut ke iterasi berikutnya.
        </Note>
      </Section>

      {/* Functions */}
      <Section id="functions" heading="Functions">
        <p>
          Functions adalah building blocks untuk mengorganisir code menjadi reusable pieces.
        </p>

        <Subsection id="basic-functions" heading="Basic Functions">
          <CodeBlock language="dart">
{`// Function with no parameters and no return
void greet() {
  print('Hello, World!');
}

// Function with parameters
void greetPerson(String name) {
  print('Hello, $name!');
}

// Function with return value
int add(int a, int b) {
  return a + b;
}

// Type inference for return type
add(int a, int b) => a + b;  // Returns int automatically

// Call functions
greet();                     // Hello, World!
greetPerson('John');         // Hello, John!
int sum = add(5, 3);         // 8
print(sum);`}
          </CodeBlock>
        </Subsection>

        <Subsection id="arrow-functions" heading="Arrow Functions (=>)">
          <p>
            Arrow syntax untuk single-expression functions (lebih concise).
          </p>

          <CodeBlock language="dart">
{`// Traditional function
int multiply(int a, int b) {
  return a * b;
}

// Arrow function (same as above)
int multiply(int a, int b) => a * b;

// More examples
String getFullName(String first, String last) => '$first $last';
bool isEven(int number) => number % 2 == 0;
double calculateArea(double width, double height) => width * height;

// With void
void printSum(int a, int b) => print('Sum: \${a + b}');

// Call arrow functions
print(multiply(4, 5));              // 20
print(getFullName('John', 'Doe'));  // John Doe
print(isEven(4));                   // true
printSum(10, 20);                   // Sum: 30`}
          </CodeBlock>

          <Note type="tip">
            Arrow functions hanya untuk <strong>single expression</strong>. Jika butuh multiple statements, 
            gunakan function body dengan curly braces.
          </Note>
        </Subsection>

        <Subsection id="optional-parameters" heading="Optional Parameters">
          <CodeBlock language="dart">
{`// Optional positional parameters [...]
String greet(String name, [String? title]) {
  if (title != null) {
    return 'Hello, $title $name';
  }
  return 'Hello, $name';
}

// Call with or without optional parameter
print(greet('John'));           // Hello, John
print(greet('John', 'Dr.'));    // Hello, Dr. John

// Optional with default value
String greet2(String name, [String title = 'Mr.']) {
  return 'Hello, $title $name';
}

print(greet2('John'));          // Hello, Mr. John
print(greet2('Jane', 'Ms.'));   // Hello, Ms. Jane

// Multiple optional parameters
int sum(int a, [int b = 0, int c = 0]) {
  return a + b + c;
}

print(sum(5));          // 5
print(sum(5, 3));       // 8
print(sum(5, 3, 2));    // 10`}
          </CodeBlock>
        </Subsection>

        <Subsection id="named-parameters" heading="Named Parameters">
          <CodeBlock language="dart">
{`// Named parameters {parameter: value}
void createUser({String? name, int? age, String? email}) {
  print('User: $name, Age: $age, Email: $email');
}

// Call with named parameters (any order!)
createUser(name: 'John', age: 25, email: 'john@email.com');
createUser(age: 25, name: 'John');  // Order doesn't matter
createUser(name: 'Jane');           // Some optional

// Required named parameters
void createUser2({required String name, required int age, String? email}) {
  print('User: $name, Age: $age, Email: $email');
}

// Must provide required parameters
createUser2(name: 'John', age: 25);  // ✅ OK
// createUser2(name: 'John');        // ❌ ERROR - age is required

// Named with default values
void createUser3({String name = 'Guest', int age = 0, String? email}) {
  print('User: $name, Age: $age');
}

createUser3();                       // User: Guest, Age: 0
createUser3(name: 'John');           // User: John, Age: 0
createUser3(name: 'Jane', age: 25);  // User: Jane, Age: 25`}
          </CodeBlock>

          <Note type="success">
            <strong>Named parameters sangat powerful untuk functions dengan banyak parameters!</strong><br/>
            Lebih readable dan tidak perlu ingat urutan parameters.
          </Note>
        </Subsection>

        <Subsection id="mixing-parameters" heading="Mixing Parameter Types">
          <CodeBlock language="dart">
{`// Positional + Optional positional
String format(String text, [bool uppercase = false, bool addDots = false]) {
  var result = text;
  if (uppercase) result = result.toUpperCase();
  if (addDots) result = result.split('').join('.');
  return result;
}

print(format('hello'));                 // hello
print(format('hello', true));           // HELLO
print(format('hello', true, true));     // H.E.L.L.O

// Positional + Named parameters
void sendEmail(String to, String subject, {String? body, bool urgent = false}) {
  print('To: $to');
  print('Subject: $subject');
  if (body != null) print('Body: $body');
  if (urgent) print('[URGENT]');
}

sendEmail('john@email.com', 'Meeting');
sendEmail('jane@email.com', 'Report', body: 'See attachment', urgent: true);

// Cannot mix optional positional and named parameters!
// void invalid(String a, [String? b], {String? c}) { }  // ❌ ERROR`}
          </CodeBlock>
        </Subsection>

        <Subsection id="anonymous-functions" heading="Anonymous Functions (Lambdas)">
          <CodeBlock language="dart">
{`// Anonymous function (function without name)
var numbers = [1, 2, 3, 4, 5];

// Long form
numbers.forEach((number) {
  print('Number: $number');
});

// Short form (arrow function)
numbers.forEach((number) => print('Number: $number'));

// Assign to variable
var multiply = (int a, int b) {
  return a * b;
};
print(multiply(4, 5));  // 20

// Arrow syntax
var add = (int a, int b) => a + b;
print(add(3, 7));       // 10

// Use in map/filter
var doubled = numbers.map((n) => n * 2).toList();
print(doubled);  // [2, 4, 6, 8, 10]

var evens = numbers.where((n) => n % 2 == 0).toList();
print(evens);  // [2, 4]

// As callback
void executeOperation(int a, int b, Function operation) {
  var result = operation(a, b);
  print('Result: $result');
}

executeOperation(10, 5, (a, b) => a + b);  // Result: 15
executeOperation(10, 5, (a, b) => a * b);  // Result: 50`}
          </CodeBlock>

          <Note type="info">
            Anonymous functions berguna untuk callbacks, event handlers, dan functional programming operations 
            seperti map, filter, reduce.
          </Note>
        </Subsection>

        <Subsection id="higher-order-functions" heading="Higher-Order Functions">
          <p>
            Functions yang menerima function sebagai parameter atau return function.
          </p>

          <CodeBlock language="dart">
{`// Function that accepts function as parameter
void repeat(int times, void Function() action) {
  for (var i = 0; i < times; i++) {
    action();
  }
}

repeat(3, () => print('Hello'));
// Output:
// Hello
// Hello
// Hello

// Function that returns function
Function makeMultiplier(int factor) {
  return (int number) => number * factor;
}

var multiplyBy2 = makeMultiplier(2);
var multiplyBy10 = makeMultiplier(10);

print(multiplyBy2(5));   // 10
print(multiplyBy10(5));  // 50

// Practical example: Calculator
int calculate(int a, int b, int Function(int, int) operation) {
  return operation(a, b);
}

int add(int a, int b) => a + b;
int subtract(int a, int b) => a - b;
int multiply(int a, int b) => a * b;

print(calculate(10, 5, add));       // 15
print(calculate(10, 5, subtract));  // 5
print(calculate(10, 5, multiply));  // 50
print(calculate(10, 5, (a, b) => a ~/ b));  // 2 (division)`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Scope */}
      <Section id="scope" heading="Variable Scope">
        <CodeBlock language="dart">
{`// Global scope
String globalName = 'Global';

void main() {
  // Function scope
  String functionName = 'Function';
  
  print(globalName);    // ✅ Accessible
  print(functionName);  // ✅ Accessible
  
  if (true) {
    // Block scope
    String blockName = 'Block';
    print(globalName);    // ✅ Accessible
    print(functionName);  // ✅ Accessible
    print(blockName);     // ✅ Accessible
  }
  
  // print(blockName);    // ❌ ERROR - not accessible outside block
}

// Example with shadowing
int count = 0;  // Global

void increment() {
  int count = 10;  // Local - shadows global
  count++;
  print(count);  // 11 (local count)
}

void printGlobal() {
  print(count);  // 0 (global count)
}`}
        </CodeBlock>

        <Note type="warning">
          <strong>Variable shadowing</strong> (local variable dengan nama sama seperti outer variable) 
          bisa membingungkan. Gunakan nama yang jelas untuk avoid shadowing.
        </Note>
      </Section>

      {/* Praktik */}
      <Section id="practice" heading="Latihan Praktik">
        <CodeBlock language="dart">
{`void main() {
  // 1. FizzBuzz Challenge
  for (var i = 1; i <= 30; i++) {
    if (i % 15 == 0) {
      print('FizzBuzz');
    } else if (i % 3 == 0) {
      print('Fizz');
    } else if (i % 5 == 0) {
      print('Buzz');
    } else {
      print(i);
    }
  }
  
  // 2. Calculator function
  double calculator(double a, double b, String operation) {
    switch (operation) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b != 0 ? a / b : 0;
      default:
        return 0;
    }
  }
  
  print(calculator(10, 5, '+'));  // 15.0
  print(calculator(10, 5, '*'));  // 50.0
  
  // 3. Find prime numbers
  bool isPrime(int number) {
    if (number < 2) return false;
    for (var i = 2; i <= number ~/ 2; i++) {
      if (number % i == 0) return false;
    }
    return true;
  }
  
  print('Prime numbers 1-20:');
  for (var i = 1; i <= 20; i++) {
    if (isPrime(i)) {
      print(i);
    }
  }
  
  // 4. Sum of array with filter
  List<int> numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  int sumWhere(List<int> nums, bool Function(int) condition) {
    return nums.where(condition).reduce((a, b) => a + b);
  }
  
  var evenSum = sumWhere(numbers, (n) => n % 2 == 0);
  var oddSum = sumWhere(numbers, (n) => n % 2 != 0);
  
  print('Sum of evens: $evenSum');  // 30
  print('Sum of odds: $oddSum');    // 25
}`}
        </CodeBlock>
      </Section>

      {/* Rangkuman */}
      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>✅ <strong>If-Else:</strong> Conditional logic untuk decision making</li>
          <li>✅ <strong>Switch-Case:</strong> Multiple conditions yang lebih readable</li>
          <li>✅ <strong>Loops:</strong> for, while, do-while, forEach untuk iteration</li>
          <li>✅ <strong>Break & Continue:</strong> Control loop execution</li>
          <li>✅ <strong>Functions:</strong> Basic, arrow, optional, named parameters</li>
          <li>✅ <strong>Anonymous Functions:</strong> Lambdas untuk callbacks</li>
          <li>✅ <strong>Higher-Order Functions:</strong> Functions sebagai parameters/return values</li>
        </ul>

        <Note type="success">
          <strong>Next:</strong> Di materi berikutnya, kita akan belajar OOP (Classes, Objects, Inheritance) 
          untuk membuat code yang lebih terstruktur dan maintainable!
        </Note>
      </Section>
    </MateriLayout>
  );
}
