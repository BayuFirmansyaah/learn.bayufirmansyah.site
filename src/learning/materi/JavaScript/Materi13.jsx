import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi13() {
  return (
    <MateriLayout
      title="Array Advanced Methods"
      description="Pelajari method array tingkat lanjut untuk data transformation dan manipulation"
    >
      <Section title="Array Method Tingkat Lanjut">
        <p>
          JavaScript menyediakan method-method powerful untuk manipulasi array. Method ini 
          sangat berguna untuk data transformation, filtering, dan aggregation.
        </p>
        
        <Note type="info">
          Sebagian besar method ini menggunakan higher-order functions (menerima function sebagai parameter)
          dan tidak mengubah array original (immutable).
        </Note>
      </Section>

      <Section title="find() & findIndex()">
        <h3 className="text-lg font-semibold mb-2">find() - Mencari Element Pertama</h3>
        
        <CodeBlock language="javascript">
{`const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
];

// Find user dengan id = 2
const user = users.find(user => user.id === 2);
console.log(user);  // { id: 2, name: 'Bob', age: 30 }

// Find user dengan age > 30
const olderUser = users.find(user => user.age > 30);
console.log(olderUser);  // { id: 3, name: 'Charlie', age: 35 }

// Jika tidak ditemukan, return undefined
const notFound = users.find(user => user.id === 999);
console.log(notFound);  // undefined

// Use case: Check if element exists
const hasAdmin = users.find(user => user.role === 'admin');
if (hasAdmin) {
  console.log('Admin found');
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">findIndex() - Mencari Index</h3>
        
        <CodeBlock language="javascript">
{`const numbers = [10, 20, 30, 40, 50];

// Find index dari number > 25
const index = numbers.findIndex(num => num > 25);
console.log(index);  // 2 (index dari 30)

// Jika tidak ditemukan, return -1
const notFound = numbers.findIndex(num => num > 100);
console.log(notFound);  // -1

// Use case: Update element
const userIndex = users.findIndex(u => u.id === 2);
if (userIndex !== -1) {
  users[userIndex].age = 31;  // Update age
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">findLast() & findLastIndex() [ES2023]</h3>
        
        <CodeBlock language="javascript">
{`const numbers = [1, 5, 10, 15, 20, 25];

// Find last element > 10
const lastBig = numbers.findLast(num => num > 10);
console.log(lastBig);  // 25

// Find last index > 10
const lastIndex = numbers.findLastIndex(num => num > 10);
console.log(lastIndex);  // 5`}
        </CodeBlock>
      </Section>

      <Section title="every() & some()">
        <h3 className="text-lg font-semibold mb-2">every() - Semua Harus True</h3>
        
        <CodeBlock language="javascript">
{`const numbers = [2, 4, 6, 8, 10];

// Check if all numbers are even
const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven);  // true

// Check if all numbers > 5
const allBig = numbers.every(num => num > 5);
console.log(allBig);  // false (karena 2 dan 4 tidak > 5)

// Use case: Validation
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];

const allAdults = users.every(user => user.age >= 18);
console.log(allAdults);  // true

// Form validation
const formData = {
  username: 'alice',
  email: 'alice@example.com',
  password: 'secret123'
};

const requiredFields = ['username', 'email', 'password'];
const allFilled = requiredFields.every(field => formData[field]);
console.log(allFilled);  // true`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">some() - Minimal Satu True</h3>
        
        <CodeBlock language="javascript">
{`const numbers = [1, 3, 5, 7, 10];

// Check if ada number genap
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven);  // true (karena ada 10)

// Check if ada number > 100
const hasBig = numbers.some(num => num > 100);
console.log(hasBig);  // false

// Use case: Check permissions
const permissions = ['read', 'write', 'delete'];
const canModify = permissions.some(p => p === 'write' || p === 'delete');
console.log(canModify);  // true

// Check if array has any truthy value
const values = [0, '', null, undefined, 'something'];
const hasTruthy = values.some(v => v);
console.log(hasTruthy);  // true`}
        </CodeBlock>
      </Section>

      <Section title="flat() & flatMap()">
        <h3 className="text-lg font-semibold mb-2">flat() - Flatten Nested Arrays</h3>
        
        <CodeBlock language="javascript">
{`// Flatten 1 level (default)
const nested = [1, 2, [3, 4], 5];
const flattened = nested.flat();
console.log(flattened);  // [1, 2, 3, 4, 5]

// Flatten multiple levels
const deepNested = [1, [2, [3, [4, [5]]]]];
console.log(deepNested.flat(1));  // [1, 2, [3, [4, [5]]]]
console.log(deepNested.flat(2));  // [1, 2, 3, [4, [5]]]
console.log(deepNested.flat(Infinity));  // [1, 2, 3, 4, 5]

// Remove empty slots
const withHoles = [1, 2, , 4, 5];
const cleaned = withHoles.flat();
console.log(cleaned);  // [1, 2, 4, 5]

// Use case: Flatten grouped data
const groups = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
const allNumbers = groups.flat();
console.log(allNumbers);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">flatMap() - Map + Flat</h3>
        
        <CodeBlock language="javascript">
{`// flatMap = map + flat (1 level)
const numbers = [1, 2, 3];

// Dengan map + flat
const mapped = numbers.map(x => [x, x * 2]).flat();
console.log(mapped);  // [1, 2, 2, 4, 3, 6]

// Dengan flatMap (lebih efisien)
const flatMapped = numbers.flatMap(x => [x, x * 2]);
console.log(flatMapped);  // [1, 2, 2, 4, 3, 6]

// Use case: Expand array
const sentences = [
  'Hello world',
  'JavaScript is awesome'
];

const words = sentences.flatMap(sentence => sentence.split(' '));
console.log(words);
// ['Hello', 'world', 'JavaScript', 'is', 'awesome']

// Use case: Filter + map in one go
const users = [
  { name: 'Alice', orders: [1, 2] },
  { name: 'Bob', orders: [] },
  { name: 'Charlie', orders: [3, 4, 5] }
];

const allOrders = users.flatMap(user => user.orders);
console.log(allOrders);  // [1, 2, 3, 4, 5]`}
        </CodeBlock>
      </Section>

      <Section title="at() Method">
        <CodeBlock language="javascript">
{`const arr = ['a', 'b', 'c', 'd', 'e'];

// Positive index
console.log(arr.at(0));   // "a"
console.log(arr.at(2));   // "c"

// Negative index (from end)
console.log(arr.at(-1));  // "e" (last)
console.log(arr.at(-2));  // "d" (second last)

// Out of bounds
console.log(arr.at(10));  // undefined

// Compare with bracket notation
console.log(arr[0]);      // "a" (OK)
console.log(arr[-1]);     // undefined (doesn't work!)
console.log(arr.at(-1));  // "e" (works!)

// Get last element
const lastOld = arr[arr.length - 1];  // Old way
const lastNew = arr.at(-1);           // New way (cleaner)`}
        </CodeBlock>
      </Section>

      <Section title="Array.from()">
        <CodeBlock language="javascript">
{`// Convert array-like to array
const divs = document.querySelectorAll('div');  // NodeList
const divsArray = Array.from(divs);
divsArray.forEach(div => console.log(div));

// Convert string to array
const chars = Array.from('Hello');
console.log(chars);  // ['H', 'e', 'l', 'l', 'o']

// With map function
const numbers = Array.from([1, 2, 3], x => x * 2);
console.log(numbers);  // [2, 4, 6]

// Generate range
const range = Array.from({ length: 5 }, (_, i) => i);
console.log(range);  // [0, 1, 2, 3, 4]

const rangeFrom1 = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(rangeFrom1);  // [1, 2, 3, 4, 5]

// Clone array
const original = [1, 2, 3];
const cloned = Array.from(original);

// Convert Set to Array
const set = new Set([1, 2, 3, 3, 4]);
const arr = Array.from(set);
console.log(arr);  // [1, 2, 3, 4]

// Convert Map to Array
const map = new Map([['a', 1], ['b', 2]]);
const mapArray = Array.from(map);
console.log(mapArray);  // [['a', 1], ['b', 2]]`}
        </CodeBlock>
      </Section>

      <Section title="Array.of()">
        <CodeBlock language="javascript">
{`// Create array from arguments
const arr1 = Array.of(1, 2, 3);
console.log(arr1);  // [1, 2, 3]

// Fix Array constructor ambiguity
console.log(Array(3));       // [empty × 3] (length 3)
console.log(Array.of(3));    // [3] (element 3)

console.log(Array(1, 2, 3)); // [1, 2, 3]
console.log(Array.of(1, 2, 3)); // [1, 2, 3]

// Single element
console.log(Array.of(undefined)); // [undefined]
console.log(Array.of());          // []`}
        </CodeBlock>
      </Section>

      <Section title="includes() vs indexOf()">
        <CodeBlock language="javascript">
{`const numbers = [1, 2, 3, NaN, 5];

// includes() - return boolean
console.log(numbers.includes(2));    // true
console.log(numbers.includes(10));   // false
console.log(numbers.includes(NaN));  // true (can find NaN!)

// indexOf() - return index
console.log(numbers.indexOf(2));     // 1
console.log(numbers.indexOf(10));    // -1
console.log(numbers.indexOf(NaN));   // -1 (cannot find NaN)

// includes() with fromIndex
const fruits = ['apple', 'banana', 'orange', 'apple'];
console.log(fruits.includes('apple', 2));  // true (found at index 3)

// Use includes() for existence check
if (numbers.includes(3)) {
  console.log('Found 3');
}

// Use indexOf() when you need the position
const index = fruits.indexOf('banana');
if (index !== -1) {
  fruits[index] = 'grape';  // Replace
}`}
        </CodeBlock>
      </Section>

      <Section title="toSorted(), toReversed(), toSpliced() [ES2023]">
        <p>Method immutable baru yang tidak mengubah array original.</p>
        
        <CodeBlock language="javascript">
{`const numbers = [3, 1, 4, 1, 5];

// toSorted() - tidak mengubah original
const sorted = numbers.toSorted();
console.log(sorted);   // [1, 1, 3, 4, 5]
console.log(numbers);  // [3, 1, 4, 1, 5] (unchanged)

// sort() - mengubah original (old way)
const numbers2 = [3, 1, 4, 1, 5];
numbers2.sort();
console.log(numbers2);  // [1, 1, 3, 4, 5] (mutated!)

// toReversed()
const reversed = numbers.toReversed();
console.log(reversed);  // [5, 1, 4, 1, 3]
console.log(numbers);   // [3, 1, 4, 1, 5] (unchanged)

// toSpliced(start, deleteCount, ...items)
const spliced = numbers.toSpliced(2, 1, 99, 88);
console.log(spliced);   // [3, 1, 99, 88, 1, 5]
console.log(numbers);   // [3, 1, 4, 1, 5] (unchanged)

// with() - replace element at index [ES2023]
const replaced = numbers.with(2, 999);
console.log(replaced);  // [3, 1, 999, 1, 5]
console.log(numbers);   // [3, 1, 4, 1, 5] (unchanged)`}
        </CodeBlock>
      </Section>

      <Section title="group() & groupToMap() [ES2024]">
        <CodeBlock language="javascript">
{`const products = [
  { name: 'Laptop', category: 'Electronics', price: 1000 },
  { name: 'Phone', category: 'Electronics', price: 500 },
  { name: 'Shirt', category: 'Clothing', price: 50 },
  { name: 'Pants', category: 'Clothing', price: 80 }
];

// Group by category
const grouped = Object.groupBy(products, product => product.category);
console.log(grouped);
// {
//   Electronics: [{ name: 'Laptop', ... }, { name: 'Phone', ... }],
//   Clothing: [{ name: 'Shirt', ... }, { name: 'Pants', ... }]
// }

// Group by price range
const byPriceRange = Object.groupBy(products, product => {
  if (product.price < 100) return 'cheap';
  if (product.price < 1000) return 'medium';
  return 'expensive';
});

// groupToMap() - return Map instead of Object
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];

// Before ES2024: Manual grouping
function groupBy(array, keyFn) {
  return array.reduce((result, item) => {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {});
}

const byAge = groupBy(users, user => user.age);
console.log(byAge);
// { 25: [Alice, Charlie], 30: [Bob] }`}
        </CodeBlock>
      </Section>

      <Section title="Chaining Methods">
        <CodeBlock language="javascript">
{`const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 35, active: true },
  { name: 'David', age: 28, active: true }
];

// Complex data transformation dengan method chaining
const result = users
  .filter(user => user.active)              // Only active users
  .filter(user => user.age >= 28)           // Age >= 28
  .map(user => ({ ...user, senior: true })) // Add senior flag
  .sort((a, b) => b.age - a.age)            // Sort by age desc
  .map(user => user.name);                  // Get names only

console.log(result);  // ['Charlie', 'David']

// Real-world example: Calculate total price
const cart = [
  { name: 'Laptop', price: 1000, quantity: 1, discount: 0.1 },
  { name: 'Mouse', price: 50, quantity: 2, discount: 0 },
  { name: 'Keyboard', price: 100, quantity: 1, discount: 0.2 }
];

const total = cart
  .map(item => ({
    ...item,
    subtotal: item.price * item.quantity,
    finalPrice: item.price * item.quantity * (1 - item.discount)
  }))
  .reduce((sum, item) => sum + item.finalPrice, 0);

console.log(\`Total: $\${total}\`);  // Total: $1180`}
        </CodeBlock>
      </Section>

      <Section title="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Gunakan find() daripada filter()[0]</strong>
            <CodeBlock language="javascript">
{`// ❌ Inefficient
const user = users.filter(u => u.id === 1)[0];

// ✅ Efficient (stops at first match)
const user = users.find(u => u.id === 1);`}
            </CodeBlock>
          </div>

          <div>
            <strong>2. Gunakan some()/every() untuk Checks</strong>
            <CodeBlock language="javascript">
{`// ❌ Unnecessary filter
if (users.filter(u => u.age > 18).length > 0) {}

// ✅ Direct check
if (users.some(u => u.age > 18)) {}`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Gunakan flatMap() daripada map().flat()</strong>
            <CodeBlock language="javascript">
{`// ❌ Two iterations
const result = arr.map(x => [x, x * 2]).flat();

// ✅ One iteration
const result = arr.flatMap(x => [x, x * 2]);`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Prefer Immutable Methods</strong>
            <CodeBlock language="javascript">
{`// ✅ Immutable (ES2023)
const sorted = numbers.toSorted();
const reversed = numbers.toReversed();

// Original array tetap tidak berubah`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <Section title="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Method Array Tingkat Lanjut:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>find/findIndex:</strong> Cari element/index pertama yang match</li>
            <li><strong>every/some:</strong> Check if all/any elements match condition</li>
            <li><strong>flat/flatMap:</strong> Flatten nested arrays</li>
            <li><strong>at():</strong> Access dengan negative index</li>
            <li><strong>Array.from():</strong> Convert array-like/iterable ke array</li>
            <li><strong>includes():</strong> Check existence (better than indexOf untuk NaN)</li>
            <li><strong>toSorted/toReversed:</strong> Immutable sort/reverse (ES2023)</li>
            <li><strong>Object.groupBy():</strong> Group array by key (ES2024)</li>
            <li><strong>Method Chaining:</strong> Combine multiple operations</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
