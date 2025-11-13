import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi06() {
  return (
    <MateriLayout
      title="Arrays"
      intro="Master arrays di JavaScript - creation, access, methods (map, filter, reduce, forEach), destructuring, spread operator, dan array manipulation."
    >
      <Section id="array-basics" heading="Array Basics">
        <p>
          <strong>Array</strong> adalah ordered collection of values. Bisa contain any data types.
        </p>

        <CodeBlock language="javascript">
{`// Create array
let fruits = ["Apple", "Banana", "Orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "text", true, null, { id: 1 }];
let empty = [];

// Array constructor (not common)
let arr = new Array(1, 2, 3);

// Access elements (0-based index)
console.log(fruits[0]);  // "Apple"
console.log(fruits[1]);  // "Banana"
console.log(fruits[2]);  // "Orange"

// Array length
console.log(fruits.length);  // 3

// Last element
console.log(fruits[fruits.length - 1]);  // "Orange"

// Modify element
fruits[1] = "Mango";
console.log(fruits);  // ["Apple", "Mango", "Orange"]`}
        </CodeBlock>
      </Section>

      <Section id="array-methods" heading="Array Methods">
        <Subsection id="add-remove" heading="Add/Remove Elements">
          <CodeBlock language="javascript">
{`let fruits = ["Apple", "Banana"];

// push() - Add to end
fruits.push("Orange");
console.log(fruits);  // ["Apple", "Banana", "Orange"]

// pop() - Remove from end
let last = fruits.pop();
console.log(last);    // "Orange"
console.log(fruits);  // ["Apple", "Banana"]

// unshift() - Add to start
fruits.unshift("Kiwi");
console.log(fruits);  // ["Kiwi", "Apple", "Banana"]

// shift() - Remove from start
let first = fruits.shift();
console.log(first);   // "Kiwi"
console.log(fruits);  // ["Apple", "Banana"]

// splice() - Add/remove at any position
let numbers = [1, 2, 3, 4, 5];

// Remove 2 elements from index 1
numbers.splice(1, 2);
console.log(numbers);  // [1, 4, 5]

// Add elements at index 1
numbers.splice(1, 0, 2, 3);
console.log(numbers);  // [1, 2, 3, 4, 5]

// Replace elements
numbers.splice(2, 1, 99);
console.log(numbers);  // [1, 2, 99, 4, 5]`}
          </CodeBlock>
        </Subsection>

        <Subsection id="search-methods" heading="Search Methods">
          <CodeBlock language="javascript">
{`let fruits = ["Apple", "Banana", "Orange", "Banana"];

// indexOf() - Find first index
console.log(fruits.indexOf("Banana"));     // 1
console.log(fruits.indexOf("Grape"));      // -1 (not found)

// lastIndexOf() - Find last index
console.log(fruits.lastIndexOf("Banana")); // 3

// includes() - Check if exists
console.log(fruits.includes("Apple"));     // true
console.log(fruits.includes("Grape"));     // false

// find() - Find first matching element
let numbers = [1, 5, 10, 15, 20];

let found = numbers.find(num => num > 10);
console.log(found);  // 15

// findIndex() - Find index of first match
let index = numbers.findIndex(num => num > 10);
console.log(index);  // 3

// some() - Check if at least one matches
let hasLarge = numbers.some(num => num > 15);
console.log(hasLarge);  // true

// every() - Check if all match
let allPositive = numbers.every(num => num > 0);
console.log(allPositive);  // true`}
          </CodeBlock>
        </Subsection>

        <Subsection id="slice-concat" heading="slice() & concat()">
          <CodeBlock language="javascript">
{`let fruits = ["Apple", "Banana", "Orange", "Mango", "Grape"];

// slice() - Extract portion (doesn't modify original)
let citrus = fruits.slice(1, 3);
console.log(citrus);  // ["Banana", "Orange"]
console.log(fruits);  // Original unchanged

let lastTwo = fruits.slice(-2);
console.log(lastTwo);  // ["Mango", "Grape"]

// concat() - Merge arrays
let veggies = ["Carrot", "Potato"];
let food = fruits.concat(veggies);
console.log(food);  // ["Apple", ..., "Carrot", "Potato"]

// Multiple concat
let drinks = ["Water", "Juice"];
let all = fruits.concat(veggies, drinks);
console.log(all);`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="iteration-methods" heading="Iteration Methods">
        <Subsection id="foreach" heading="forEach()">
          <p>
            Execute function untuk each element. Tidak return anything.
          </p>

          <CodeBlock language="javascript">
{`let numbers = [1, 2, 3, 4, 5];

// Basic forEach
numbers.forEach(num => {
  console.log(num);
});

// With index and array
numbers.forEach((num, index, arr) => {
  console.log(\`Index \${index}: \${num}\`);
});

// Practical use: Modify DOM elements
let ids = [1, 2, 3];
ids.forEach(id => {
  // Update UI for each id
  console.log(\`Processing ID: \${id}\`);
});`}
          </CodeBlock>
        </Subsection>

        <Subsection id="map" heading="map()">
          <p>
            Transform each element dan return new array.
          </p>

          <CodeBlock language="javascript">
{`let numbers = [1, 2, 3, 4, 5];

// Double each number
let doubled = numbers.map(num => num * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// Square each number
let squared = numbers.map(num => num * num);
console.log(squared);  // [1, 4, 9, 16, 25]

// Transform objects
let users = [
  { name: "Budi", age: 25 },
  { name: "Ani", age: 30 }
];

let names = users.map(user => user.name);
console.log(names);  // ["Budi", "Ani"]

// Map to new objects
let userSummary = users.map(user => ({
  name: user.name,
  isAdult: user.age >= 18
}));
console.log(userSummary);`}
          </CodeBlock>
        </Subsection>

        <Subsection id="filter" heading="filter()">
          <p>
            Filter elements yang match condition. Return new array.
          </p>

          <CodeBlock language="javascript">
{`let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Even numbers only
let evens = numbers.filter(num => num % 2 === 0);
console.log(evens);  // [2, 4, 6, 8, 10]

// Greater than 5
let large = numbers.filter(num => num > 5);
console.log(large);  // [6, 7, 8, 9, 10]

// Filter objects
let users = [
  { name: "Budi", age: 25, active: true },
  { name: "Ani", age: 17, active: false },
  { name: "Charlie", age: 30, active: true }
];

let adults = users.filter(user => user.age >= 18);
console.log(adults);  // Budi & Charlie

let activeAdults = users.filter(user => {
  return user.age >= 18 && user.active;
});
console.log(activeAdults);  // Budi & Charlie (active)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="reduce" heading="reduce()">
          <p>
            Reduce array to single value (sum, product, object, etc).
          </p>

          <CodeBlock language="javascript">
{`let numbers = [1, 2, 3, 4, 5];

// Sum all numbers
let sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum);  // 15

// Product of all numbers
let product = numbers.reduce((acc, num) => acc * num, 1);
console.log(product);  // 120

// Find maximum
let max = numbers.reduce((max, num) => num > max ? num : max);
console.log(max);  // 5

// Count occurrences
let fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];

let count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count);  // { apple: 3, banana: 2, orange: 1 }

// Group by property
let users = [
  { name: "Budi", role: "admin" },
  { name: "Ani", role: "user" },
  { name: "Charlie", role: "admin" }
];

let grouped = users.reduce((acc, user) => {
  if (!acc[user.role]) {
    acc[user.role] = [];
  }
  acc[user.role].push(user);
  return acc;
}, {});
console.log(grouped);`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="chaining" heading="Method Chaining">
        <p>
          Combine multiple array methods untuk powerful transformations.
        </p>

        <CodeBlock language="javascript">
{`let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Chain: filter → map → reduce
let result = numbers
  .filter(num => num % 2 === 0)  // Even numbers: [2, 4, 6, 8, 10]
  .map(num => num * 2)            // Double: [4, 8, 12, 16, 20]
  .reduce((sum, num) => sum + num, 0);  // Sum: 60

console.log(result);  // 60

// Real-world example: Process products
let products = [
  { name: "Laptop", price: 1000, category: "Electronics" },
  { name: "Phone", price: 500, category: "Electronics" },
  { name: "Shirt", price: 50, category: "Clothing" },
  { name: "Headphones", price: 100, category: "Electronics" }
];

// Get total price of electronics
let total = products
  .filter(p => p.category === "Electronics")
  .map(p => p.price)
  .reduce((sum, price) => sum + price, 0);

console.log(total);  // 1600

// Get expensive product names
let expensiveNames = products
  .filter(p => p.price > 100)
  .map(p => p.name);

console.log(expensiveNames);  // ["Laptop", "Phone"]`}
        </CodeBlock>
      </Section>

      <Section id="sort-reverse" heading="sort() & reverse()">
        <CodeBlock language="javascript">
{`let fruits = ["Banana", "Apple", "Orange", "Mango"];

// sort() - Alphabetical (modifies original!)
fruits.sort();
console.log(fruits);  // ["Apple", "Banana", "Mango", "Orange"]

// reverse() - Reverse order
fruits.reverse();
console.log(fruits);  // ["Orange", "Mango", "Banana", "Apple"]

// Sort numbers (need compare function!)
let numbers = [40, 100, 1, 5, 25, 10];

// ❌ Wrong (sorts as strings)
numbers.sort();
console.log(numbers);  // [1, 10, 100, 25, 40, 5] (wrong!)

// Correct (ascending)
numbers.sort((a, b) => a - b);
console.log(numbers);  // [1, 5, 10, 25, 40, 100]

// Descending
numbers.sort((a, b) => b - a);
console.log(numbers);  // [100, 40, 25, 10, 5, 1]

// Sort objects
let users = [
  { name: "Charlie", age: 30 },
  { name: "Budi", age: 25 },
  { name: "Ani", age: 28 }
];

// Sort by age
users.sort((a, b) => a.age - b.age);
console.log(users);  // Sorted by age ascending

// Sort by name
users.sort((a, b) => a.name.localeCompare(b.name));
console.log(users);  // Sorted alphabetically`}
        </CodeBlock>

        <Note type="warning">
          <code>sort()</code> dan <code>reverse()</code> modify original array! Use spread operator untuk avoid mutation: <code>[...arr].sort()</code>
        </Note>
      </Section>

      <Section id="destructuring" heading="Array Destructuring">
        <p>
          Extract values from array into separate variables.
        </p>

        <CodeBlock language="javascript">
{`// Basic destructuring
let fruits = ["Apple", "Banana", "Orange"];

let [first, second, third] = fruits;
console.log(first);   // "Apple"
console.log(second);  // "Banana"
console.log(third);   // "Orange"

// Skip elements
let [a, , c] = fruits;
console.log(a);  // "Apple"
console.log(c);  // "Orange" (skipped Banana)

// Rest operator
let numbers = [1, 2, 3, 4, 5];
let [one, two, ...rest] = numbers;
console.log(one);   // 1
console.log(two);   // 2
console.log(rest);  // [3, 4, 5]

// Default values
let [x, y, z = 0] = [1, 2];
console.log(z);  // 0 (default)

// Swap variables
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b);  // 2 1

// Function return values
function getCoords() {
  return [10, 20];
}

let [x, y] = getCoords();
console.log(x, y);  // 10 20`}
        </CodeBlock>
      </Section>

      <Section id="spread-operator" heading="Spread Operator">
        <p>
          Expand array elements dengan <code>...</code> syntax.
        </p>

        <CodeBlock language="javascript">
{`let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

// Combine arrays
let combined = [...arr1, ...arr2];
console.log(combined);  // [1, 2, 3, 4, 5, 6]

// Copy array
let copy = [...arr1];
copy[0] = 99;
console.log(arr1);  // [1, 2, 3] (original unchanged)
console.log(copy);  // [99, 2, 3]

// Add elements
let extended = [...arr1, 4, 5];
console.log(extended);  // [1, 2, 3, 4, 5]

// Function arguments
function sum(a, b, c) {
  return a + b + c;
}

let numbers = [1, 2, 3];
console.log(sum(...numbers));  // 6

// Math functions
let nums = [5, 2, 8, 1, 9];
console.log(Math.max(...nums));  // 9
console.log(Math.min(...nums));  // 1

// Merge with uniqueness
let a = [1, 2, 3];
let b = [3, 4, 5];
let unique = [...new Set([...a, ...b])];
console.log(unique);  // [1, 2, 3, 4, 5]`}
        </CodeBlock>
      </Section>

      <Section id="multidimensional" heading="Multi-dimensional Arrays">
        <CodeBlock language="javascript">
{`// 2D Array (Matrix)
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Access elements
console.log(matrix[0][0]);  // 1
console.log(matrix[1][2]);  // 6
console.log(matrix[2][1]);  // 8

// Iterate 2D array
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    console.log(matrix[i][j]);
  }
}

// With forEach
matrix.forEach(row => {
  row.forEach(val => console.log(val));
});

// Practical use: Game board
let board = [
  ["X", "O", "X"],
  ["O", "X", "O"],
  ["O", "X", "X"]
];

console.log(board[0][0]);  // "X" (top-left)`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li>Use <code>map()</code> untuk transform data</li>
          <li>Use <code>filter()</code> untuk filter data</li>
          <li>Use <code>reduce()</code> untuk aggregate data</li>
          <li>Chain methods untuk complex operations</li>
          <li>Use spread operator untuk copy/merge arrays</li>
          <li>Use destructuring untuk extract values</li>
          <li>Avoid mutating original array (use methods that return new array)</li>
          <li>Use <code>const</code> untuk arrays (content can change, but not reassign)</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Arrays store ordered collections of values</li>
          <li><code>push/pop</code> untuk add/remove from end</li>
          <li><code>unshift/shift</code> untuk add/remove from start</li>
          <li><code>map()</code> transform, <code>filter()</code> select, <code>reduce()</code> aggregate</li>
          <li><code>forEach()</code> iterate, <code>find()</code> search</li>
          <li>Method chaining untuk powerful transformations</li>
          <li>Destructuring untuk extract values</li>
          <li>Spread operator (<code>...</code>) untuk copy/merge</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
