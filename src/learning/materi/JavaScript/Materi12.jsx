import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi12() {
  return (
    <MateriLayout
      title="ES6+ Features"
      description="Pelajari fitur-fitur modern JavaScript dari ES6 (ES2015) hingga terbaru"
    >
      <Section title="Pengenalan ES6+">
        <p>
          ECMAScript 2015 (ES6) dan versi-versi selanjutnya membawa banyak fitur baru yang membuat 
          JavaScript lebih powerful, expressive, dan mudah ditulis. Mari pelajari fitur-fitur penting!
        </p>
        
        <Note type="info">
          ES6+ adalah istilah untuk fitur JavaScript modern dari ES2015 ke atas. Browser modern 
          sudah support sebagian besar fitur ini.
        </Note>
      </Section>

      <Section title="Destructuring">
        <h3 className="text-lg font-semibold mb-2">Array Destructuring</h3>
        
        <CodeBlock language="javascript">
{`// Basic destructuring
const colors = ['red', 'green', 'blue'];
const [first, second, third] = colors;
console.log(first);   // "red"
console.log(second);  // "green"

// Skip elements
const [, , third] = colors;
console.log(third);  // "blue"

// Rest operator
const numbers = [1, 2, 3, 4, 5];
const [one, two, ...rest] = numbers;
console.log(one);   // 1
console.log(two);   // 2
console.log(rest);  // [3, 4, 5]

// Default values
const [a = 10, b = 20] = [5];
console.log(a);  // 5
console.log(b);  // 20 (default)

// Swapping variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y);  // 2 1`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Object Destructuring</h3>
        
        <CodeBlock language="javascript">
{`const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com',
  address: {
    city: 'Jakarta',
    country: 'Indonesia'
  }
};

// Basic destructuring
const { name, age } = user;
console.log(name);  // "John"
console.log(age);   // 30

// Rename variables
const { name: userName, age: userAge } = user;
console.log(userName);  // "John"

// Default values
const { name, role = 'User' } = user;
console.log(role);  // "User" (default, karena tidak ada di object)

// Nested destructuring
const { address: { city, country } } = user;
console.log(city);  // "Jakarta"

// Rest operator
const { name, ...otherDetails } = user;
console.log(otherDetails);  // { age: 30, email: '...', address: {...} }

// Function parameters
function greetUser({ name, age }) {
  console.log(\`Hello \${name}, you are \${age} years old\`);
}
greetUser(user);`}
        </CodeBlock>
      </Section>

      <Section title="Spread & Rest Operators">
        <h3 className="text-lg font-semibold mb-2">Spread Operator (...)</h3>
        
        <CodeBlock language="javascript">
{`// Array spread
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined);  // [1, 2, 3, 4, 5, 6]

// Copy array
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original);  // [1, 2, 3] (tidak berubah)
console.log(copy);      // [1, 2, 3, 4]

// Object spread
const person = { name: 'Alice', age: 25 };
const employee = { ...person, role: 'Developer', salary: 50000 };
console.log(employee);
// { name: 'Alice', age: 25, role: 'Developer', salary: 50000 }

// Merge objects (properties di kanan override yang di kiri)
const defaults = { theme: 'dark', lang: 'en' };
const userPrefs = { lang: 'id' };
const settings = { ...defaults, ...userPrefs };
console.log(settings);  // { theme: 'dark', lang: 'id' }

// Function arguments
function sum(a, b, c) {
  return a + b + c;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers));  // 6

// String spread
const str = 'Hello';
const chars = [...str];
console.log(chars);  // ['H', 'e', 'l', 'l', 'o']`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Rest Parameters</h3>
        
        <CodeBlock language="javascript">
{`// Collect remaining arguments
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4, 5));  // 15

// Combine with regular parameters
function multiply(multiplier, ...numbers) {
  return numbers.map(num => num * multiplier);
}
console.log(multiply(2, 1, 2, 3));  // [2, 4, 6]

// Destructuring with rest
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(rest);   // [2, 3, 4, 5]`}
        </CodeBlock>
      </Section>

      <Section title="Enhanced Object Literals">
        <CodeBlock language="javascript">
{`const name = 'Alice';
const age = 25;

// Property shorthand
const person = { name, age };  // Same as { name: name, age: age }
console.log(person);  // { name: 'Alice', age: 25 }

// Method shorthand
const calculator = {
  add(a, b) {  // Same as add: function(a, b)
    return a + b;
  },
  multiply(a, b) {
    return a * b;
  }
};
console.log(calculator.add(2, 3));  // 5

// Computed property names
const propName = 'score';
const student = {
  name: 'Bob',
  [propName]: 95,
  ['test_' + (1 + 1)]: 'passed'
};
console.log(student);  // { name: 'Bob', score: 95, test_2: 'passed' }`}
        </CodeBlock>
      </Section>

      <Section title="Default Parameters">
        <CodeBlock language="javascript">
{`// Basic default parameters
function greet(name = 'Guest', message = 'Hello') {
  return \`\${message}, \${name}!\`;
}
console.log(greet());              // "Hello, Guest!"
console.log(greet('Alice'));       // "Hello, Alice!"
console.log(greet('Bob', 'Hi'));   // "Hi, Bob!"

// Default parameter expressions
function createUser(name, role = 'user', id = Date.now()) {
  return { name, role, id };
}
console.log(createUser('Alice'));

// Previous parameters in defaults
function calculatePrice(price, tax = price * 0.1) {
  return price + tax;
}
console.log(calculatePrice(100));  // 110

// With destructuring
function configure({ host = 'localhost', port = 8080 } = {}) {
  console.log(\`Server: \${host}:\${port}\`);
}
configure({ host: 'example.com' });  // "Server: example.com:8080"
configure();  // "Server: localhost:8080"`}
        </CodeBlock>
      </Section>

      <Section title="Template Literals Lanjutan">
        <CodeBlock language="javascript">
{`// Multiline strings
const html = \`
  <div class="card">
    <h2>Title</h2>
    <p>Description</p>
  </div>
\`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] ? \`<mark>\${values[i]}</mark>\` : '';
    return result + str + value;
  }, '');
}

const name = 'Alice';
const age = 25;
const output = highlight\`Name: \${name}, Age: \${age}\`;
console.log(output);
// "Name: <mark>Alice</mark>, Age: <mark>25</mark>"

// Styled components pattern (simplified)
function css(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] || '');
  }, '');
}

const primaryColor = '#007bff';
const styles = css\`
  .button {
    background-color: \${primaryColor};
    padding: 10px 20px;
  }
\`;`}
        </CodeBlock>
      </Section>

      <Section title="Optional Chaining (?.)">
        <CodeBlock language="javascript">
{`const user = {
  name: 'Alice',
  address: {
    city: 'Jakarta'
  }
};

// ❌ Without optional chaining (bisa error)
// console.log(user.profile.bio);  // TypeError: Cannot read property 'bio' of undefined

// With optional chaining
console.log(user.profile?.bio);  // undefined (no error)
console.log(user.address?.city);  // "Jakarta"
console.log(user.address?.country);  // undefined

// Optional chaining with methods
const obj = {
  method() {
    return 'called';
  }
};
console.log(obj.method?.());      // "called"
console.log(obj.missing?.());     // undefined (no error)

// Optional chaining with arrays
const users = [{name: 'Alice'}, {name: 'Bob'}];
console.log(users[0]?.name);   // "Alice"
console.log(users[5]?.name);   // undefined
console.log(users?.[0]?.name); // "Alice"

// Combine with nullish coalescing
const city = user.address?.city ?? 'Unknown';
console.log(city);  // "Jakarta"`}
        </CodeBlock>
      </Section>

      <Section title="Nullish Coalescing (??)">
        <CodeBlock language="javascript">
{`// ?? returns right side only if left is null/undefined
const value1 = null ?? 'default';
console.log(value1);  // "default"

const value2 = undefined ?? 'default';
console.log(value2);  // "default"

const value3 = 0 ?? 'default';
console.log(value3);  // 0 (not "default"!)

const value4 = '' ?? 'default';
console.log(value4);  // "" (not "default"!)

const value5 = false ?? 'default';
console.log(value5);  // false (not "default"!)

// Compare with OR operator (||)
console.log(0 || 'default');    // "default" (0 is falsy)
console.log(0 ?? 'default');    // 0 (0 is not null/undefined)

console.log('' || 'default');   // "default" ('' is falsy)
console.log('' ?? 'default');   // "" ('' is not null/undefined)

// Use case: Config with 0 or false as valid values
function configure(options) {
  const timeout = options.timeout ?? 5000;  // Use ?? not ||
  const retries = options.retries ?? 3;
  const debug = options.debug ?? false;
  
  console.log({ timeout, retries, debug });
}

configure({ timeout: 0, retries: 0, debug: false });
// { timeout: 0, retries: 0, debug: false }  ← Correct!

// With || would give: { timeout: 5000, retries: 3, debug: false }`}
        </CodeBlock>
      </Section>

      <Section title="For...of Loop">
        <CodeBlock language="javascript">
{`// Iterate arrays
const colors = ['red', 'green', 'blue'];
for (const color of colors) {
  console.log(color);
}

// With index using entries()
for (const [index, color] of colors.entries()) {
  console.log(\`\${index}: \${color}\`);
}

// Iterate strings
for (const char of 'Hello') {
  console.log(char);  // H, e, l, l, o
}

// Iterate Sets
const numbers = new Set([1, 2, 3, 4, 5]);
for (const num of numbers) {
  console.log(num);
}

// Iterate Maps
const map = new Map([
  ['name', 'Alice'],
  ['age', 25]
]);
for (const [key, value] of map) {
  console.log(\`\${key}: \${value}\`);
}

// ℹ️ for...of untuk VALUES, for...in untuk KEYS
const arr = ['a', 'b', 'c'];
for (const value of arr) {
  console.log(value);  // "a", "b", "c"
}
for (const index in arr) {
  console.log(index);  // "0", "1", "2"
}`}
        </CodeBlock>
      </Section>

      <Section title="Map & Set">
        <h3 className="text-lg font-semibold mb-2">Map</h3>
        <CodeBlock language="javascript">
{`// Create Map
const map = new Map();
map.set('name', 'Alice');
map.set('age', 25);
map.set(1, 'one');
map.set(true, 'yes');

// Get values
console.log(map.get('name'));  // "Alice"
console.log(map.get(1));       // "one"

// Check existence
console.log(map.has('name'));  // true
console.log(map.has('email')); // false

// Size
console.log(map.size);  // 4

// Delete
map.delete('age');

// Iterate
for (const [key, value] of map) {
  console.log(\`\${key}: \${value}\`);
}

// Convert to array
const entries = [...map];
const keys = [...map.keys()];
const values = [...map.values()];

// Clear all
map.clear();

// Initialize with array
const userMap = new Map([
  ['name', 'Bob'],
  ['age', 30]
]);`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Set</h3>
        <CodeBlock language="javascript">
{`// Create Set (unique values)
const set = new Set();
set.add(1);
set.add(2);
set.add(2);  // Ignored (duplicate)
set.add(3);
console.log(set);  // Set(3) {1, 2, 3}

// Initialize with array
const numbers = new Set([1, 2, 2, 3, 3, 4]);
console.log(numbers);  // Set(4) {1, 2, 3, 4}

// Check existence
console.log(numbers.has(2));  // true
console.log(numbers.has(5));  // false

// Size
console.log(numbers.size);  // 4

// Delete
numbers.delete(2);

// Iterate
for (const num of numbers) {
  console.log(num);
}

// Convert to array
const arr = [...numbers];

// Remove duplicates from array
const withDupes = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(withDupes)];
console.log(unique);  // [1, 2, 3, 4]

// Clear all
numbers.clear();`}
        </CodeBlock>
      </Section>

      <Section title="Symbols">
        <CodeBlock language="javascript">
{`// Create unique symbol
const sym1 = Symbol('description');
const sym2 = Symbol('description');
console.log(sym1 === sym2);  // false (always unique)

// Use as object key
const PASSWORD = Symbol('password');
const user = {
  name: 'Alice',
  [PASSWORD]: 'secret123'
};

console.log(user.name);       // "Alice"
console.log(user[PASSWORD]);  // "secret123"
console.log(user.password);   // undefined

// Symbols tidak muncul di Object.keys()
console.log(Object.keys(user));  // ["name"]

// Get symbols
console.log(Object.getOwnPropertySymbols(user));  // [Symbol(password)]

// Well-known symbols
const obj = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        return i < 3 ? { value: i++, done: false } : { done: true };
      }
    };
  }
};

for (const value of obj) {
  console.log(value);  // 0, 1, 2
}`}
        </CodeBlock>
      </Section>

      <Section title="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Gunakan Destructuring untuk Parameter</strong>
            <CodeBlock language="javascript">
{`// Clear dan flexible
function createUser({ name, email, role = 'user' }) {
  return { name, email, role };
}

createUser({ name: 'Alice', email: 'alice@example.com' });`}
            </CodeBlock>
          </div>

          <div>
            <strong>2. Gunakan Spread untuk Immutable Updates</strong>
            <CodeBlock language="javascript">
{`// Immutable
const user = { name: 'Alice', age: 25 };
const updatedUser = { ...user, age: 26 };  // New object`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Optional Chaining untuk Nested Access</strong>
            <CodeBlock language="javascript">
{`// Safe
const city = user.address?.city ?? 'Unknown';`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Use ?? for Default Values (not ||)</strong>
            <CodeBlock language="javascript">
{`// Correct untuk 0 dan false
const timeout = config.timeout ?? 5000;
const enabled = config.enabled ?? true;`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <Section title="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Fitur ES6+ yang Penting:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Destructuring:</strong> Extract values dari array/object</li>
            <li><strong>Spread (...):</strong> Copy/merge arrays dan objects</li>
            <li><strong>Rest (...):</strong> Collect remaining arguments/elements</li>
            <li><strong>Default Parameters:</strong> Fallback values untuk function parameters</li>
            <li><strong>Optional Chaining (?.):</strong> Safe property access</li>
            <li><strong>Nullish Coalescing (??):</strong> Default untuk null/undefined only</li>
            <li><strong>For...of:</strong> Iterate over iterable values</li>
            <li><strong>Map & Set:</strong> New collection types</li>
            <li><strong>Symbols:</strong> Unique identifiers</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
