import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi03() {
  return (
    <MateriLayout
      title="Operators"
      intro="Master semua operators di JavaScript - arithmetic, comparison, logical, assignment, dan operators lainnya untuk manipulasi data."
    >
      <Section id="arithmetic" heading="Arithmetic Operators">
        <p>
          Operators untuk operasi matematika.
        </p>

        <CodeBlock language="javascript">
{`let a = 10;
let b = 3;

// Basic arithmetic
console.log(a + b);   // 13  Addition
console.log(a - b);   // 7   Subtraction
console.log(a * b);   // 30  Multiplication
console.log(a / b);   // 3.333... Division
console.log(a % b);   // 1   Modulus (remainder)
console.log(a ** b);  // 1000 Exponentiation (10^3)

// Increment & Decrement
let count = 5;
count++;        // 6  (sama dengan: count = count + 1)
count--;        // 5  (sama dengan: count = count - 1)

// Prefix vs Postfix
let x = 5;
let y = x++;    // y = 5, x = 6 (assign dulu, increment kemudian)
let z = ++x;    // z = 7, x = 7 (increment dulu, assign kemudian)

console.log(x);  // 7
console.log(y);  // 5
console.log(z);  // 7`}
        </CodeBlock>

        <Note type="warning">
          Division by zero tidak error di JavaScript, hasilnya <code>Infinity</code> atau <code>-Infinity</code>.
        </Note>
      </Section>

      <Section id="assignment" heading="Assignment Operators">
        <p>
          Operators untuk assign values ke variables.
        </p>

        <CodeBlock language="javascript">
{`let x = 10;  // Basic assignment

// Compound assignment
x += 5;   // x = x + 5  →  x = 15
x -= 3;   // x = x - 3  →  x = 12
x *= 2;   // x = x * 2  →  x = 24
x /= 4;   // x = x / 4  →  x = 6
x %= 4;   // x = x % 4  →  x = 2
x **= 3;  // x = x ** 3 →  x = 8

// Multiple assignment
let a, b, c;
a = b = c = 10;  // All are 10

// Destructuring assignment
let [first, second] = [1, 2];
console.log(first);   // 1
console.log(second);  // 2`}
        </CodeBlock>
      </Section>

      <Section id="comparison" heading="Comparison Operators">
        <p>
          Operators untuk compare values. Returns <code>true</code> atau <code>false</code>.
        </p>

        <Subsection id="equality" heading="Equality Operators">
          <CodeBlock language="javascript">
{`// Loose equality (==) - converts types
console.log(5 == "5");      // true  (string converted to number)
console.log(1 == true);     // true  (true converted to 1)
console.log(0 == false);    // true  (false converted to 0)
console.log(null == undefined); // true

// Strict equality (===) - no type conversion
console.log(5 === "5");     // false (different types)
console.log(1 === true);    // false (different types)
console.log(5 === 5);       // true  (same value & type)

// Inequality
console.log(5 != "5");      // false (loose inequality)
console.log(5 !== "5");     // true  (strict inequality)`}
          </CodeBlock>

          <Note type="info">
            <strong>Best Practice:</strong> Always use <code>===</code> dan <code>!==</code> (strict) untuk avoid unexpected type coercion bugs.
          </Note>
        </Subsection>

        <Subsection id="relational" heading="Relational Operators">
          <CodeBlock language="javascript">
{`let a = 10;
let b = 5;

console.log(a > b);    // true   Greater than
console.log(a < b);    // false  Less than
console.log(a >= 10);  // true   Greater than or equal
console.log(b <= 5);   // true   Less than or equal

// String comparison (lexicographical)
console.log("apple" < "banana");  // true  (alphabetical)
console.log("Z" < "a");           // true  (uppercase < lowercase)
console.log("10" < "2");          // true  (string comparison, not numeric!)

// Number comparison
console.log(10 < 2);              // false (numeric comparison)`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="logical" heading="Logical Operators">
        <p>
          Operators untuk combine atau invert boolean values.
        </p>

        <Subsection id="and-or-not" heading="AND, OR, NOT">
          <CodeBlock language="javascript">
{`let age = 25;
let hasLicense = true;

// AND (&&) - both must be true
console.log(age >= 18 && hasLicense);  // true
console.log(age >= 18 && false);       // false

// OR (||) - at least one must be true
console.log(age >= 18 || hasLicense);  // true
console.log(false || true);            // true
console.log(false || false);           // false

// NOT (!) - inverts boolean
console.log(!true);        // false
console.log(!false);       // true
console.log(!(age >= 18)); // false

// Combining operators
let canDrive = (age >= 18) && (hasLicense || age >= 21);
console.log(canDrive);  // true`}
          </CodeBlock>
        </Subsection>

        <Subsection id="short-circuit" heading="Short-Circuit Evaluation">
          <CodeBlock language="javascript">
{`// AND (&&) - stops at first falsy
let result1 = false && console.log("Not executed");
// console.log tidak dijalankan karena false sudah ketemu

let result2 = true && "Hello";  // "Hello"
let result3 = false && "Hello"; // false

// OR (||) - stops at first truthy
let result4 = true || console.log("Not executed");
// console.log tidak dijalankan karena true sudah ketemu

let result5 = false || "Default";  // "Default"
let result6 = null || undefined || "Fallback";  // "Fallback"

// Practical use: default values
let username = userInput || "Guest";
let port = config.port || 3000;`}
          </CodeBlock>
        </Subsection>

        <Subsection id="nullish" heading="Nullish Coalescing (ES2020)">
          <p>
            <code>??</code> operator returns right side jika left side adalah <code>null</code> atau <code>undefined</code>.
          </p>

          <CodeBlock language="javascript">
{`// Problem dengan || operator
let count = 0;
let result1 = count || 10;  // 10 (0 is falsy, tapi valid value!)

// Solution: ?? operator
let result2 = count ?? 10;   // 0  (0 is not null/undefined)

let username = null ?? "Guest";       // "Guest"
let age = undefined ?? 18;            // 18
let score = 0 ?? 100;                 // 0 (tetap 0)
let text = "" ?? "Default";           // "" (tetap empty string)

// Practical use
let userAge = userData?.age ?? 25;    // Default to 25 if null/undefined`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="ternary" heading="Ternary (Conditional) Operator">
        <p>
          Shorthand untuk <code>if-else</code> statement. Format: <code>condition ? valueIfTrue : valueIfFalse</code>
        </p>

        <CodeBlock language="javascript">
{`let age = 20;

// Ternary operator
let status = age >= 18 ? "Adult" : "Minor";
console.log(status);  // "Adult"

// Equivalent if-else
let status2;
if (age >= 18) {
  status2 = "Adult";
} else {
  status2 = "Minor";
}

// Nested ternary (not recommended, hard to read)
let category = age < 13 ? "Child" : age < 18 ? "Teen" : "Adult";

// Better: use if-else for complex conditions
let category2;
if (age < 13) {
  category2 = "Child";
} else if (age < 18) {
  category2 = "Teen";
} else {
  category2 = "Adult";
}

// Practical use
let discount = isMember ? 0.2 : 0;
let message = hasError ? "Error occurred" : "Success";
let display = isLoggedIn ? userName : "Guest";`}
        </CodeBlock>

        <Note type="warning">
          Avoid deeply nested ternary operators. Use <code>if-else</code> untuk better readability.
        </Note>
      </Section>

      <Section id="string-operators" heading="String Operators">
        <p>
          Operator <code>+</code> untuk concatenate (join) strings.
        </p>

        <CodeBlock language="javascript">
{`let firstName = "Budi";
let lastName = "Santoso";

// String concatenation
let fullName = firstName + " " + lastName;
console.log(fullName);  // "Budi Santoso"

// Number + String = String
let age = 25;
let message = "Umur: " + age;
console.log(message);  // "Umur: 25"

// Template literals (better way)
let greeting = \`Hello, \${firstName} \${lastName}!\`;
console.log(greeting);  // "Hello, Budi Santoso!"

// Compound assignment
let str = "Hello";
str += " World";  // str = str + " World"
console.log(str);  // "Hello World"`}
        </CodeBlock>
      </Section>

      <Section id="typeof-delete" heading="typeof & delete Operators">
        <Subsection id="typeof-op" heading="typeof Operator">
          <CodeBlock language="javascript">
{`console.log(typeof 42);        // "number"
console.log(typeof "hello");   // "string"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (historical bug)
console.log(typeof {});        // "object"
console.log(typeof []);        // "object"
console.log(typeof function(){}); // "function"

// Use in conditions
let value = 42;
if (typeof value === "number") {
  console.log("It's a number!");
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="delete-op" heading="delete Operator">
          <CodeBlock language="javascript">
{`let user = {
  name: "Budi",
  age: 25,
  city: "Jakarta"
};

// Delete property
delete user.age;
console.log(user);  // { name: "Budi", city: "Jakarta" }

// Cannot delete variables
let x = 10;
delete x;  // Does nothing
console.log(x);  // 10

// Delete array element (creates hole)
let arr = [1, 2, 3, 4];
delete arr[2];
console.log(arr);  // [1, 2, undefined, 4]
console.log(arr.length);  // 4 (length unchanged)`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="operator-precedence" heading="Operator Precedence">
        <p>
          Order of operations (sama seperti matematika: perkalian before penjumlahan).
        </p>

        <CodeBlock language="javascript">
{`// Precedence determines order
let result1 = 2 + 3 * 4;  // 14 (not 20) - multiplication first
let result2 = (2 + 3) * 4; // 20 - parentheses override

// Common precedence (high to low)
// 1. Parentheses ()
// 2. Exponentiation **
// 3. Unary +, -, !, ++, --
// 4. Multiplication *, Division /, Modulus %
// 5. Addition +, Subtraction -
// 6. Comparison <, >, <=, >=
// 7. Equality ==, ===, !=, !==
// 8. Logical AND &&
// 9. Logical OR ||
// 10. Ternary ? :
// 11. Assignment =, +=, -=, etc.

// Examples
let a = 5;
let b = 10;
let c = 15;

let result3 = a + b * c;     // 155 (not 225)
let result4 = (a + b) * c;   // 225
let result5 = a < b && b < c; // true
let result6 = a > b || b < c; // true (second condition is true)`}
        </CodeBlock>

        <Note type="info">
          <strong>Tip:</strong> When in doubt, use parentheses untuk make order explicit dan improve readability.
        </Note>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li> Arithmetic: +, -, *, /, %, ** (exponentiation)</li>
          <li> Comparison: Always use === dan !== (strict equality)</li>
          <li> Logical: && (AND), || (OR), ! (NOT)</li>
          <li> Nullish coalescing ?? untuk handle null/undefined</li>
          <li> Ternary operator untuk simple if-else shorthand</li>
          <li> typeof untuk check data type</li>
          <li> Short-circuit evaluation: && dan || stop early</li>
          <li> Use parentheses untuk control precedence</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
