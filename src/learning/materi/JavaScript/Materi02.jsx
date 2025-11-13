import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi02() {
  return (
    <MateriLayout
      title="Variables & Data Types"
      intro="Master variables di JavaScript - var, let, const, dan berbagai data types dari primitives hingga objects."
    >
      <Section id="variables" heading="Variables">
        <p>
          <strong>Variable</strong> adalah container untuk menyimpan data. Di JavaScript ada 3 cara declare variable: <code>var</code>, <code>let</code>, dan <code>const</code>.
        </p>

        <Subsection id="let" heading="let - Modern Variable">
          <p>
            <code>let</code> adalah cara modern untuk declare variable yang bisa diubah nilainya.
          </p>

          <CodeBlock language="javascript">
{`// Declare dan assign
let name = "Budi";
let age = 25;

// Bisa diubah
name = "Ani";
age = 26;

// Declare tanpa assign (undefined)
let city;
console.log(city);  // undefined

// Assign later
city = "Jakarta";

// Multiple declaration
let x = 1, y = 2, z = 3;`}
          </CodeBlock>
        </Subsection>

        <Subsection id="const" heading="const - Constant Variable">
          <p>
            <code>const</code> untuk declare variable yang nilainya tidak bisa diubah (immutable).
          </p>

          <CodeBlock language="javascript">
{`// Must assign saat declare
const PI = 3.14159;
const MAX_USERS = 100;

// ❌ Error: Cannot reassign const
PI = 3.14;  // TypeError

//  Untuk objects/arrays, isi bisa diubah
const user = { name: "Budi" };
user.name = "Ani";  //  OK
user.age = 25;      //  OK

const numbers = [1, 2, 3];
numbers.push(4);    //  OK
numbers[0] = 99;    //  OK

// ❌ Tapi tidak bisa reassign variable
user = {};          // Error
numbers = [];       // Error`}
          </CodeBlock>

          <Note type="info">
            <strong>Best Practice:</strong> Default gunakan <code>const</code>. Hanya gunakan <code>let</code> jika variable memang perlu diubah.
          </Note>
        </Subsection>

        <Subsection id="var" heading="var - Old Way (Avoid)">
          <p>
            <code>var</code> adalah cara lama declare variable. Avoid karena punya quirks & scope issues.
          </p>

          <CodeBlock language="javascript">
{`// var has function scope (not block scope)
function test() {
  var x = 1;
  if (true) {
    var x = 2;  // Same variable!
    console.log(x);  // 2
  }
  console.log(x);    // 2 (tidak isolated)
}

// With let (block scope)
function test2() {
  let x = 1;
  if (true) {
    let x = 2;  // Different variable
    console.log(x);  // 2
  }
  console.log(x);    // 1 (isolated)
}

// var hoisting (confusing)
console.log(age);  // undefined (no error!)
var age = 25;

// let throws error (better)
console.log(name);  // ReferenceError
let name = "Budi";`}
          </CodeBlock>

          <Note type="warning">
            <strong>Recommendation:</strong> Never use <code>var</code>. Always use <code>let</code> or <code>const</code>.
          </Note>
        </Subsection>
      </Section>

      <Section id="naming" heading="Variable Naming Rules">
        <p><strong>Rules (must follow):</strong></p>
        <ul>
          <li>Harus mulai dengan letter, underscore (_), atau dollar sign ($)</li>
          <li>Tidak boleh mulai dengan number</li>
          <li>Bisa contain letters, numbers, underscore, dollar sign</li>
          <li>Case sensitive: <code>name</code> ≠ <code>Name</code></li>
          <li>Tidak boleh reserved keywords (if, let, const, function, dll)</li>
        </ul>

        <CodeBlock language="javascript">
{`//  Valid names
let firstName = "Budi";
let first_name = "Budi";
let firstName1 = "Budi";
let $price = 100;
let _private = true;

// ❌ Invalid names
let 1name = "Budi";     // Start with number
let first-name = "Budi"; // Hyphen not allowed
let let = 5;            // Reserved keyword`}
        </CodeBlock>

        <p><strong>Conventions (best practices):</strong></p>
        <ul>
          <li>Use camelCase: <code>firstName</code>, <code>userAge</code>, <code>isActive</code></li>
          <li>Constants dengan UPPER_CASE: <code>MAX_SIZE</code>, <code>API_KEY</code></li>
          <li>Descriptive names: <code>userName</code> bukan <code>un</code></li>
          <li>Boolean prefix dengan <code>is</code>, <code>has</code>: <code>isActive</code>, <code>hasChildren</code></li>
        </ul>
      </Section>

      <Section id="data-types" heading="Data Types">
        <p>
          JavaScript punya <strong>8 data types</strong>: 7 primitives + 1 object.
        </p>

        <Subsection id="number" heading="1. Number">
          <p>
            Untuk integers dan floating-point numbers (tidak ada perbedaan).
          </p>

          <CodeBlock language="javascript">
{`let age = 25;           // Integer
let price = 99.99;      // Float
let negative = -10;
let billion = 1e9;      // 1000000000
let micro = 1e-6;       // 0.000001

// Special numeric values
let inf = Infinity;     // 1 / 0
let negInf = -Infinity;
let notNum = NaN;       // "text" / 2

// Check NaN
console.log(isNaN("hello"));  // true
console.log(isNaN(123));      // false

// Math operations
let sum = 10 + 5;       // 15
let product = 4 * 3;    // 12
let division = 10 / 3;  // 3.333...
let remainder = 10 % 3; // 1`}
          </CodeBlock>
        </Subsection>

        <Subsection id="string" heading="2. String">
          <p>
            Untuk text. Bisa pakai single quotes, double quotes, atau backticks.
          </p>

          <CodeBlock language="javascript">
{`let name = "Budi";       // Double quotes
let city = 'Jakarta';    // Single quotes
let message = \`Hello\`;   // Backticks (template literals)

// Template literals (ES6)
let firstName = "Budi";
let age = 25;
let greeting = \`Halo, nama saya \${firstName} dan umur saya \${age} tahun\`;
console.log(greeting);
// Output: Halo, nama saya Budi dan umur saya 25 tahun

// Multi-line strings
let multiLine = \`
  Baris pertama
  Baris kedua
  Baris ketiga
\`;

// String concatenation
let fullName = "Budi" + " " + "Santoso";
let better = \`\${firstName} Santoso\`;  // Better way

// Escape characters
let quote = "He said \"Hello\"";  // He said "Hello"
let path = "C:\\\\Users\\\\Budi";    // C:\\Users\\Budi
let newLine = "Line 1\\nLine 2";    // Line break`}
          </CodeBlock>
        </Subsection>

        <Subsection id="boolean" heading="3. Boolean">
          <p>
            Logical type: hanya <code>true</code> atau <code>false</code>.
          </p>

          <CodeBlock language="javascript">
{`let isActive = true;
let hasAccess = false;

// Comparison returns boolean
let isAdult = age >= 18;      // true or false
let isEqual = 5 === 5;        // true
let isGreater = 10 > 5;       // true

// Logical operations
let canAccess = isActive && hasAccess;  // AND
let shouldShow = isActive || hasAccess; // OR
let isNotActive = !isActive;            // NOT`}
          </CodeBlock>
        </Subsection>

        <Subsection id="null-undefined" heading="4. null & undefined">
          <p>
            <code>null</code> adalah "intentionally empty". <code>undefined</code> adalah "not assigned yet".
          </p>

          <CodeBlock language="javascript">
{`// undefined - variable declared tapi belum assigned
let x;
console.log(x);  // undefined

// null - explicitly set to "no value"
let y = null;
console.log(y);  // null

// Function tanpa return
function test() {
  // no return
}
console.log(test());  // undefined

// Property tidak exist
let user = { name: "Budi" };
console.log(user.age);  // undefined

// Best practice: use null untuk reset value
let data = { id: 1 };
data = null;  // Clear data intentionally`}
          </CodeBlock>
        </Subsection>

        <Subsection id="object" heading="5. Object">
          <p>
            Collection of key-value pairs. Complex data structure.
          </p>

          <CodeBlock language="javascript">
{`// Object literal
let user = {
  name: "Budi",
  age: 25,
  city: "Jakarta",
  isActive: true
};

// Access properties
console.log(user.name);    // Dot notation
console.log(user['age']);  // Bracket notation

// Modify
user.age = 26;
user.email = "budi@mail.com";  // Add new property

// Nested objects
let person = {
  name: "Budi",
  address: {
    city: "Jakarta",
    country: "Indonesia"
  }
};
console.log(person.address.city);  // Jakarta`}
          </CodeBlock>
        </Subsection>

        <Subsection id="array" heading="6. Array">
          <p>
            Ordered list of values. Special type of object.
          </p>

          <CodeBlock language="javascript">
{`// Array literal
let numbers = [1, 2, 3, 4, 5];
let fruits = ["Apple", "Banana", "Orange"];
let mixed = [1, "text", true, null, { id: 1 }];

// Access by index (0-based)
console.log(fruits[0]);  // "Apple"
console.log(fruits[1]);  // "Banana"

// Modify
fruits[1] = "Mango";

// Add item
fruits.push("Grape");    // Add to end
fruits.unshift("Kiwi");  // Add to start

// Array length
console.log(fruits.length);  // Number of items`}
          </CodeBlock>
        </Subsection>

        <Subsection id="symbol-bigint" heading="7. Symbol & BigInt">
          <p>
            Advanced types (tidak sering dipakai di beginner level).
          </p>

          <CodeBlock language="javascript">
{`// Symbol - unique identifier
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2);  // false (always unique)

// BigInt - very large integers
let bigNum = 9007199254740991n;  // Add 'n' suffix
let huge = BigInt("9999999999999999999999999999");

// Math dengan BigInt
let result = bigNum + 1n;  // Must use 'n'`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="typeof" heading="typeof Operator">
        <p>
          <code>typeof</code> untuk check data type of a variable.
        </p>

        <CodeBlock language="javascript">
{`console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (bug di JS!)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object" (arrays are objects)
console.log(typeof function(){}); // "function"
console.log(typeof Symbol());    // "symbol"
console.log(typeof 123n);        // "bigint"

// Check if array (karena typeof returns "object")
console.log(Array.isArray([]));        // true
console.log(Array.isArray({}));        // false`}
        </CodeBlock>
      </Section>

      <Section id="type-conversion" heading="Type Conversion">
        <Subsection id="to-string" heading="To String">
          <CodeBlock language="javascript">
{`// Explicit conversion
let num = 123;
let str = String(num);       // "123"
let str2 = num.toString();   // "123"

// Implicit (automatic)
let result = "Age: " + 25;   // "Age: 25"
let result2 = 25 + "";       // "25"`}
          </CodeBlock>
        </Subsection>

        <Subsection id="to-number" heading="To Number">
          <CodeBlock language="javascript">
{`// Explicit conversion
let str = "123";
let num = Number(str);        // 123
let num2 = parseInt(str);     // 123
let float = parseFloat("3.14"); // 3.14

// Implicit
let result = "10" - 5;        // 5 (minus converts to number)
let result2 = "10" * 2;       // 20
let result3 = +"123";         // 123 (unary plus)

// Invalid conversion
let invalid = Number("hello"); // NaN
let invalid2 = parseInt("abc"); // NaN`}
          </CodeBlock>
        </Subsection>

        <Subsection id="to-boolean" heading="To Boolean">
          <CodeBlock language="javascript">
{`// Explicit conversion
let bool = Boolean(1);        // true
let bool2 = Boolean(0);       // false

// Falsy values (converts to false)
Boolean(0)          // false
Boolean("")         // false
Boolean(null)       // false
Boolean(undefined)  // false
Boolean(NaN)        // false
Boolean(false)      // false

// Everything else is truthy
Boolean(1)          // true
Boolean("hello")    // true
Boolean({})         // true
Boolean([])         // true
Boolean(-1)         // true`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li> Use <code>const</code> by default, <code>let</code> jika perlu ubah</li>
          <li> Never use <code>var</code></li>
          <li> 7 primitive types: number, string, boolean, null, undefined, symbol, bigint</li>
          <li> Objects & arrays are reference types</li>
          <li> Use <code>typeof</code> untuk check type</li>
          <li> Type conversion: String(), Number(), Boolean()</li>
          <li> Falsy values: 0, "", null, undefined, NaN, false</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
