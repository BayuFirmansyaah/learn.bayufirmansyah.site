import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi05() {
  return (
    <MateriLayout
      title="Functions"
      intro="Master functions di JavaScript - declaration, expression, arrow functions, parameters, return values, scope, dan function best practices."
    >
      <Section id="function-declaration" heading="Function Declaration">
        <p>
          Cara standard untuk define function dengan keyword <code>function</code>.
        </p>

        <CodeBlock language="javascript">
{`// Basic function
function greet() {
  console.log("Hello!");
}

// Call/invoke function
greet();  // Output: Hello!

// Function with parameters
function greetUser(name) {
  console.log("Hello, " + name + "!");
}

greetUser("Budi");    // Hello, Budi!
greetUser("Ani");     // Hello, Ani!

// Multiple parameters
function add(a, b) {
  console.log(a + b);
}

add(5, 3);   // 8
add(10, 20); // 30

// Function with return value
function multiply(a, b) {
  return a * b;
}

let result = multiply(5, 3);
console.log(result);  // 15

// Early return
function checkAge(age) {
  if (age < 18) {
    return "Minor";
  }
  return "Adult";
}

console.log(checkAge(15));  // "Minor"
console.log(checkAge(25));  // "Adult"`}
        </CodeBlock>

        <Note type="info">
          Function declarations are <strong>hoisted</strong> - bisa dipanggil sebelum didefinisikan di code.
        </Note>
      </Section>

      <Section id="function-expression" heading="Function Expression">
        <p>
          Assign function to a variable. NOT hoisted.
        </p>

        <CodeBlock language="javascript">
{`// Function expression
const greet = function() {
  console.log("Hello!");
};

greet();  // Hello!

// With parameters
const add = function(a, b) {
  return a + b;
};

console.log(add(5, 3));  // 8

// Named function expression (for debugging)
const multiply = function mult(a, b) {
  return a * b;
};

console.log(multiply(4, 5));  // 20

// ❌ Cannot call before declaration
// subtract(5, 3);  // Error!
const subtract = function(a, b) {
  return a - b;
};`}
        </CodeBlock>

        <Note type="warning">
          Function expressions are NOT hoisted. Must be declared before use.
        </Note>
      </Section>

      <Section id="arrow-functions" heading="Arrow Functions (ES6)">
        <p>
          Shorter syntax untuk function expressions. Popular di modern JavaScript.
        </p>

        <Subsection id="arrow-syntax" heading="Arrow Function Syntax">
          <CodeBlock language="javascript">
{`// Basic arrow function
const greet = () => {
  console.log("Hello!");
};

greet();  // Hello!

// With parameters
const add = (a, b) => {
  return a + b;
};

console.log(add(5, 3));  // 8

// Implicit return (one-liner)
const multiply = (a, b) => a * b;

console.log(multiply(4, 5));  // 20 (auto return)

// Single parameter (no parentheses needed)
const square = x => x * x;

console.log(square(5));  // 25

// No parameters (empty parentheses required)
const getRandom = () => Math.random();

console.log(getRandom());  // 0.xxxxx

// Implicit return object (wrap in parentheses)
const getUser = (name, age) => ({ name: name, age: age });

console.log(getUser("Budi", 25));  // { name: "Budi", age: 25 }`}
          </CodeBlock>
        </Subsection>

        <Subsection id="arrow-vs-regular" heading="Arrow vs Regular Functions">
          <CodeBlock language="javascript">
{`// Regular function - has its own 'this'
const person1 = {
  name: "Budi",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};

person1.greet();  // Hello, Budi

// Arrow function - inherits 'this' from parent
const person2 = {
  name: "Ani",
  greet: () => {
    console.log("Hello, " + this.name);  // 'this' is NOT person2!
  }
};

person2.greet();  // Hello, undefined

// Use arrow functions untuk callbacks
const numbers = [1, 2, 3, 4, 5];

// Regular function
const doubled1 = numbers.map(function(n) {
  return n * 2;
});

// Arrow function (cleaner!)
const doubled2 = numbers.map(n => n * 2);

console.log(doubled2);  // [2, 4, 6, 8, 10]`}
          </CodeBlock>

          <Note type="info">
            <strong>When to use arrow functions:</strong><br/>
             Callbacks (map, filter, forEach)<br/>
             Short one-liner functions<br/>
            ❌ Object methods (need <code>this</code>)<br/>
            ❌ Constructors (cannot use <code>new</code>)
          </Note>
        </Subsection>
      </Section>

      <Section id="parameters" heading="Function Parameters">
        <Subsection id="default-params" heading="Default Parameters">
          <CodeBlock language="javascript">
{`// Without default
function greet1(name) {
  console.log("Hello, " + name);
}

greet1();        // Hello, undefined
greet1("Budi");  // Hello, Budi

// With default parameters
function greet2(name = "Guest") {
  console.log("Hello, " + name);
}

greet2();        // Hello, Guest
greet2("Budi");  // Hello, Budi

// Multiple defaults
function createUser(name = "Anonymous", age = 0, role = "User") {
  return { name, age, role };
}

console.log(createUser());                    // { name: "Anonymous", age: 0, role: "User" }
console.log(createUser("Budi"));              // { name: "Budi", age: 0, role: "User" }
console.log(createUser("Budi", 25));          // { name: "Budi", age: 25, role: "User" }
console.log(createUser("Budi", 25, "Admin")); // { name: "Budi", age: 25, role: "Admin" }`}
          </CodeBlock>
        </Subsection>

        <Subsection id="rest-params" heading="Rest Parameters">
          <p>
            Collect multiple arguments into an array dengan <code>...</code> syntax.
          </p>

          <CodeBlock language="javascript">
{`// Rest parameters
function sum(...numbers) {
  let total = 0;
  for (let num of numbers) {
    total += num;
  }
  return total;
}

console.log(sum(1, 2, 3));          // 6
console.log(sum(1, 2, 3, 4, 5));    // 15
console.log(sum(10, 20, 30, 40));   // 100

// Combine with regular parameters
function multiply(multiplier, ...numbers) {
  return numbers.map(n => n * multiplier);
}

console.log(multiply(2, 1, 2, 3));  // [2, 4, 6]
console.log(multiply(3, 5, 10));    // [15, 30]

// Must be last parameter
function invalid(a, ...rest, b) {  // ❌ Error!
  // ...
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="return-values" heading="Return Values">
        <CodeBlock language="javascript">
{`// Return primitive
function add(a, b) {
  return a + b;
}

let result1 = add(5, 3);  // 8

// Return object
function createUser(name, age) {
  return {
    name: name,
    age: age,
    isActive: true
  };
}

let user = createUser("Budi", 25);
console.log(user);  // { name: "Budi", age: 25, isActive: true }

// Return array
function getCoordinates() {
  return [10, 20];
}

let [x, y] = getCoordinates();
console.log(x, y);  // 10 20

// Multiple return points
function checkAge(age) {
  if (age < 13) return "Child";
  if (age < 18) return "Teen";
  if (age < 65) return "Adult";
  return "Senior";
}

// No return = undefined
function noReturn() {
  console.log("No return statement");
}

let result2 = noReturn();  // undefined

// Early return (validation)
function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero!";
  }
  return a / b;
}

console.log(divide(10, 2));  // 5
console.log(divide(10, 0));  // "Cannot divide by zero!"`}
        </CodeBlock>
      </Section>

      <Section id="scope" heading="Function Scope">
        <Subsection id="local-scope" heading="Local Scope">
          <CodeBlock language="javascript">
{`// Variables declared inside function are local
function test() {
  let x = 10;      // Local variable
  const y = 20;    // Local constant
  console.log(x);  // 10
}

test();
// console.log(x);  // ❌ Error: x is not defined

// Each function has its own scope
function func1() {
  let message = "Function 1";
  console.log(message);
}

function func2() {
  let message = "Function 2";  // Different variable
  console.log(message);
}

func1();  // Function 1
func2();  // Function 2`}
          </CodeBlock>
        </Subsection>

        <Subsection id="global-scope" heading="Global Scope">
          <CodeBlock language="javascript">
{`// Global variable (accessible everywhere)
let globalVar = "I'm global";

function test1() {
  console.log(globalVar);  // Can access
}

function test2() {
  console.log(globalVar);  // Can also access
}

test1();  // I'm global
test2();  // I'm global

// Modify global variable
let counter = 0;

function increment() {
  counter++;  // Modifies global
}

increment();
increment();
console.log(counter);  // 2`}
          </CodeBlock>

          <Note type="warning">
            <strong>Best Practice:</strong> Avoid global variables. Use parameters and return values instead.
          </Note>
        </Subsection>

        <Subsection id="block-scope" heading="Block Scope">
          <CodeBlock language="javascript">
{`function test() {
  let x = 1;
  
  if (true) {
    let x = 2;  // Different variable (block scoped)
    console.log(x);  // 2
  }
  
  console.log(x);  // 1
}

test();

// var doesn't have block scope (another reason to avoid it)
function test2() {
  var y = 1;
  
  if (true) {
    var y = 2;  // Same variable!
    console.log(y);  // 2
  }
  
  console.log(y);  // 2 (modified!)
}

test2();`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="callback-functions" heading="Callback Functions">
        <p>
          Function yang di-pass sebagai argument ke function lain.
        </p>

        <CodeBlock language="javascript">
{`// Basic callback
function doSomething(callback) {
  console.log("Doing something...");
  callback();
}

function onComplete() {
  console.log("Done!");
}

doSomething(onComplete);
// Output:
// Doing something...
// Done!

// Anonymous callback
doSomething(function() {
  console.log("Anonymous callback");
});

// Arrow function callback
doSomething(() => {
  console.log("Arrow callback");
});

// Callback with parameters
function processArray(arr, callback) {
  let result = [];
  for (let item of arr) {
    result.push(callback(item));
  }
  return result;
}

let numbers = [1, 2, 3, 4, 5];

let doubled = processArray(numbers, x => x * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

let squared = processArray(numbers, x => x * x);
console.log(squared);  // [1, 4, 9, 16, 25]

// Real-world example: Array methods
numbers.forEach(num => console.log(num));
let evens = numbers.filter(num => num % 2 === 0);
let tripled = numbers.map(num => num * 3);`}
        </CodeBlock>
      </Section>

      <Section id="iife" heading="IIFE (Immediately Invoked Function Expression)">
        <p>
          Function yang langsung dijalankan setelah didefinisikan.
        </p>

        <CodeBlock language="javascript">
{`// Basic IIFE
(function() {
  console.log("I run immediately!");
})();

// IIFE with parameters
(function(name) {
  console.log("Hello, " + name);
})("Budi");

// Arrow IIFE
(() => {
  console.log("Arrow IIFE");
})();

// Return value from IIFE
let result = (function() {
  let x = 10;
  let y = 20;
  return x + y;
})();

console.log(result);  // 30

// Use case: Private variables
const counter = (function() {
  let count = 0;  // Private variable
  
  return {
    increment: function() {
      count++;
    },
    decrement: function() {
      count--;
    },
    getCount: function() {
      return count;
    }
  };
})();

counter.increment();
counter.increment();
console.log(counter.getCount());  // 2
// console.log(counter.count);    // undefined (private!)`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li> Use descriptive function names: <code>calculateTotal</code> bukan <code>calc</code></li>
          <li> Keep functions small dan focused (one thing)</li>
          <li> Use arrow functions untuk callbacks</li>
          <li> Use default parameters instead of checking undefined</li>
          <li> Return early untuk validation (guard clauses)</li>
          <li> Avoid side effects (pure functions better)</li>
          <li> Use rest parameters untuk flexible arguments</li>
          <li> Prefer <code>const</code> untuk function expressions</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li> Function declaration: hoisted, classic syntax</li>
          <li> Function expression: not hoisted, assign to variable</li>
          <li> Arrow functions: concise syntax, inherits <code>this</code></li>
          <li> Default parameters untuk optional arguments</li>
          <li> Rest parameters (<code>...args</code>) untuk variable arguments</li>
          <li> <code>return</code> untuk return values, early exit</li>
          <li> Scope: local (function), global, block (let/const)</li>
          <li> Callbacks: functions as arguments</li>
          <li> IIFE: immediately invoked, creates private scope</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
