import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi17() {
  return (
    <MateriLayout
      title="Functional Programming"
      description="Pelajari paradigma functional programming di JavaScript"
    >
      <Section id="pengenalan-functional-programming" heading="Pengenalan Functional Programming">
        <p>
          Functional Programming (FP) adalah paradigma yang memperlakukan computation sebagai 
          evaluasi mathematical functions, menghindari changing state dan mutable data.
        </p>
        
        <Note type="info">
          <strong>Core Concepts:</strong> Pure Functions, Immutability, Higher-Order Functions, 
          Function Composition, Declarative Code.
        </Note>
      </Section>

      <Section id="pure-functions" heading="Pure Functions">
        <p>
          Pure function adalah function yang:
          1) Selalu return value yang sama untuk input yang sama
          2) Tidak memiliki side effects (tidak modify external state)
        </p>

        <CodeBlock language="javascript">
{`// ❌ Impure function (modifies external state)
let total = 0;
function addToTotal(value) {
  total += value;  // Side effect!
  return total;
}

// Pure function
function add(a, b) {
  return a + b;
}

// ❌ Impure (depends on external state)
let multiplier = 2;
function multiply(x) {
  return x * multiplier;  // Depends on external variable
}

// Pure (all inputs as parameters)
function multiply(x, multiplier) {
  return x * multiplier;
}

// ❌ Impure (modifies input)
function addItem(arr, item) {
  arr.push(item);  // Mutates input!
  return arr;
}

// Pure (returns new array)
function addItem(arr, item) {
  return [...arr, item];  // New array
}

// ❌ Impure (random output)
function getRandomNumber() {
  return Math.random();  // Different output setiap call
}

// Pure
function getDoubled(numbers) {
  return numbers.map(n => n * 2);
}

console.log(getDoubled([1, 2, 3]));  // Always [2, 4, 6]`}
        </CodeBlock>
      </Section>

      <Section id="immutability" heading="Immutability">
        <p>Immutability berarti tidak modify data yang ada, selalu create new data.</p>

        <h3 className="text-lg font-semibold mb-2">Array Immutability</h3>
        <CodeBlock language="javascript">
{`const numbers = [1, 2, 3, 4, 5];

// ❌ Mutable operations
numbers.push(6);       // Modifies original
numbers.pop();         // Modifies original
numbers.splice(1, 1);  // Modifies original

// Immutable operations
const newNumbers1 = [...numbers, 6];        // Add to end
const newNumbers2 = [0, ...numbers];        // Add to start
const newNumbers3 = numbers.slice(0, -1);   // Remove last
const newNumbers4 = numbers.filter((n, i) => i !== 1);  // Remove at index

// Map, filter, reduce (always return new array)
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Update element immutably
const updateAt = (arr, index, newValue) => {
  return arr.map((item, i) => i === index ? newValue : item);
};

const updated = updateAt([1, 2, 3], 1, 99);  // [1, 99, 3]`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Object Immutability</h3>
        <CodeBlock language="javascript">
{`const user = { name: 'Alice', age: 25 };

// ❌ Mutable
user.age = 26;  // Modifies original

// Immutable (create new object)
const updatedUser = { ...user, age: 26 };

// Nested object update
const state = {
  user: { name: 'Alice', address: { city: 'NYC' } },
  theme: 'dark'
};

// ❌ Mutable
state.user.address.city = 'LA';

// Immutable
const newState = {
  ...state,
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city: 'LA'
    }
  }
};

// Helper function untuk deep update
function updateObject(obj, path, value) {
  const [head, ...rest] = path;
  
  return {
    ...obj,
    [head]: rest.length === 0
      ? value
      : updateObject(obj[head], rest, value)
  };
}

const updated = updateObject(state, ['user', 'address', 'city'], 'LA');`}
        </CodeBlock>
      </Section>

      <Section id="higherorder-functions" heading="Higher-Order Functions">
        <p>
          Higher-order function adalah function yang:
          1) Menerima function sebagai argument, atau
          2) Return function sebagai result
        </p>

        <CodeBlock language="javascript">
{`// Function yang return function
function multiplyBy(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Function yang accept function
function applyOperation(arr, operation) {
  return arr.map(operation);
}

const numbers = [1, 2, 3, 4, 5];
const squared = applyOperation(numbers, n => n * n);
const doubled = applyOperation(numbers, n => n * 2);

// Practical: Create reusable filters
function createFilter(property, value) {
  return function(obj) {
    return obj[property] === value;
  };
}

const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'admin' }
];

const isAdmin = createFilter('role', 'admin');
const admins = users.filter(isAdmin);

// Array methods are higher-order functions
numbers.map(n => n * 2);       // map accepts function
numbers.filter(n => n > 2);    // filter accepts function
numbers.reduce((a, b) => a + b, 0);  // reduce accepts function`}
        </CodeBlock>
      </Section>

      <Section id="function-composition" heading="Function Composition">
        <p>Function composition adalah menggabungkan functions untuk create new function.</p>

        <CodeBlock language="javascript">
{`// Manual composition
function double(x) {
  return x * 2;
}

function addOne(x) {
  return x + 1;
}

function square(x) {
  return x * x;
}

// Manual: addOne(double(square(3)))
const result = addOne(double(square(3)));  // 19

// Compose helper (right to left)
const compose = (...fns) => x => 
  fns.reduceRight((acc, fn) => fn(acc), x);

const compute = compose(addOne, double, square);
console.log(compute(3));  // 19 (square(3) -> double(9) -> addOne(18))

// Pipe helper (left to right)
const pipe = (...fns) => x => 
  fns.reduce((acc, fn) => fn(acc), x);

const compute2 = pipe(square, double, addOne);
console.log(compute2(3));  // 19

// Practical example: Data transformation
const users = [
  { name: 'alice', age: 25, active: true },
  { name: 'bob', age: 30, active: false },
  { name: 'charlie', age: 35, active: true }
];

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const getActiveUsers = users => users.filter(u => u.active);
const getUserNames = users => users.map(u => u.name);
const capitalizeNames = names => names.map(capitalize);

// Compose the pipeline
const getActiveUserNames = pipe(
  getActiveUsers,
  getUserNames,
  capitalizeNames
);

console.log(getActiveUserNames(users));  // ["Alice", "Charlie"]

// Point-free style (no explicit parameter)
const getAges = pipe(
  getActiveUsers,
  users => users.map(u => u.age)
);

console.log(getAges(users));  // [25, 35]`}
        </CodeBlock>
      </Section>

      <Section id="currying" heading="Currying">
        <p>
          Currying adalah teknik transform function dengan multiple parameters 
          menjadi sequence of functions dengan single parameter.
        </p>

        <CodeBlock language="javascript">
{`// Regular function
function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3));  // 6

// Curried version
function addCurried(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(addCurried(1)(2)(3));  // 6

// Arrow function (cleaner)
const addCurriedArrow = a => b => c => a + b + c;
console.log(addCurriedArrow(1)(2)(3));  // 6

// Partial application
const add5 = addCurriedArrow(5);
const add5And3 = add5(3);
console.log(add5And3(2));  // 10

// Generic curry helper
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, [...args, ...nextArgs]);
      };
    }
  };
}

// Usage
function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply);
console.log(curriedMultiply(2)(3)(4));  // 24
console.log(curriedMultiply(2, 3)(4));  // 24
console.log(curriedMultiply(2)(3, 4));  // 24

// Practical: Reusable filters
const hasProperty = curry((prop, value, obj) => obj[prop] === value);

const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' }
];

const isAdmin = hasProperty('role', 'admin');
const admins = users.filter(isAdmin);

const isAlice = hasProperty('name', 'Alice');
const alice = users.find(isAlice);`}
        </CodeBlock>
      </Section>

      <Section id="partial-application" heading="Partial Application">
        <p>Partial application adalah fixing beberapa arguments of a function.</p>

        <CodeBlock language="javascript">
{`// Manual partial application
function greet(greeting, name) {
  return \`\${greeting}, \${name}!\`;
}

function sayHello(name) {
  return greet('Hello', name);
}

console.log(sayHello('Alice'));  // "Hello, Alice!"

// Generic partial helper
function partial(fn, ...fixedArgs) {
  return function(...remainingArgs) {
    return fn(...fixedArgs, ...remainingArgs);
  };
}

const sayHello2 = partial(greet, 'Hello');
const sayHi = partial(greet, 'Hi');

console.log(sayHello2('Bob'));  // "Hello, Bob!"
console.log(sayHi('Charlie'));  // "Hi, Charlie!"

// Practical: Event handlers
function logEvent(level, message, timestamp) {
  console.log(\`[\${level}] \${timestamp}: \${message}\`);
}

const logError = partial(logEvent, 'ERROR');
const logInfo = partial(logEvent, 'INFO');

logError('Database connection failed', Date.now());
logInfo('User logged in', Date.now());

// With bind
const logWarning = logEvent.bind(null, 'WARNING');
logWarning('Memory usage high', Date.now());`}
        </CodeBlock>
      </Section>

      <Section id="functors-monads-basics" heading="Functors & Monads (Basics)">
        <h3 className="text-lg font-semibold mb-2">Functor (Mappable)</h3>
        <p>Functor adalah container yang memiliki map method.</p>

        <CodeBlock language="javascript">
{`// Array is a functor
[1, 2, 3].map(x => x * 2);  // [2, 4, 6]

// Custom functor: Maybe (handle null/undefined)
class Maybe {
  constructor(value) {
    this.value = value;
  }
  
  static of(value) {
    return new Maybe(value);
  }
  
  isNothing() {
    return this.value === null || this.value === undefined;
  }
  
  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this.value));
  }
  
  getOrElse(defaultValue) {
    return this.isNothing() ? defaultValue : this.value;
  }
}

// Usage
const result = Maybe.of(5)
  .map(x => x * 2)
  .map(x => x + 1)
  .getOrElse(0);

console.log(result);  // 11

const result2 = Maybe.of(null)
  .map(x => x * 2)  // Skipped
  .map(x => x + 1)  // Skipped
  .getOrElse(0);

console.log(result2);  // 0

// Practical: Safe property access
function getProp(prop) {
  return obj => Maybe.of(obj).map(o => o[prop]);
}

const user = { name: 'Alice', address: { city: 'NYC' } };

const city = Maybe.of(user)
  .map(u => u.address)
  .map(a => a.city)
  .getOrElse('Unknown');

console.log(city);  // "NYC"`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Monad (Chainable)</h3>
        <p>Monad adalah functor dengan flatMap/chain method.</p>

        <CodeBlock language="javascript">
{`class Maybe {
  constructor(value) {
    this.value = value;
  }
  
  static of(value) {
    return new Maybe(value);
  }
  
  isNothing() {
    return this.value === null || this.value === undefined;
  }
  
  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this.value));
  }
  
  // Monad method: flatMap/chain
  flatMap(fn) {
    return this.isNothing() ? this : fn(this.value);
  }
  
  getOrElse(defaultValue) {
    return this.isNothing() ? defaultValue : this.value;
  }
}

// Function yang return Maybe
function divide(a, b) {
  return b === 0 ? Maybe.of(null) : Maybe.of(a / b);
}

// Chain operations
const result = Maybe.of(10)
  .flatMap(x => divide(x, 2))    // Maybe(5)
  .flatMap(x => divide(x, 0))    // Maybe(null)
  .flatMap(x => divide(x, 2))    // Skipped
  .getOrElse('Error');

console.log(result);  // "Error"

// Without flatMap (creates nested Maybe)
const nested = Maybe.of(10)
  .map(x => divide(x, 2));  // Maybe(Maybe(5)) - nested!

// With flatMap (flattens)
const flat = Maybe.of(10)
  .flatMap(x => divide(x, 2));  // Maybe(5) - flat!`}
        </CodeBlock>
      </Section>

      <Section id="recursion" heading="Recursion">
        <p>Functional programming sering menggunakan recursion instead of loops.</p>

        <CodeBlock language="javascript">
{`// ❌ Imperative (loop)
function sumImperative(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

// Functional (recursion)
function sumRecursive(numbers) {
  if (numbers.length === 0) return 0;
  const [head, ...tail] = numbers;
  return head + sumRecursive(tail);
}

console.log(sumRecursive([1, 2, 3, 4, 5]));  // 15

// Tail recursion (optimizable)
function sumTailRecursive(numbers, acc = 0) {
  if (numbers.length === 0) return acc;
  const [head, ...tail] = numbers;
  return sumTailRecursive(tail, acc + head);
}

// Factorial
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5));  // 120

// Fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Fibonacci (tail recursive, efficient)
function fibTail(n, a = 0, b = 1) {
  if (n === 0) return a;
  return fibTail(n - 1, b, a + b);
}

console.log(fibTail(10));  // 55

// Flatten nested array
function flatten(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

console.log(flatten([1, [2, [3, 4], 5], 6]));  // [1, 2, 3, 4, 5, 6]`}
        </CodeBlock>
      </Section>

      <Section id="realworld-examples" heading="Real-World Examples">
        <h3 className="text-lg font-semibold mb-2">Data Pipeline</h3>
        <CodeBlock language="javascript">
{`const data = [
  { name: 'Alice', age: 25, salary: 50000, department: 'Engineering' },
  { name: 'Bob', age: 30, salary: 60000, department: 'Sales' },
  { name: 'Charlie', age: 35, salary: 70000, department: 'Engineering' },
  { name: 'David', age: 28, salary: 55000, department: 'Sales' }
];

// Functional pipeline
const getAverageSalaryByDepartment = pipe(
  // Filter by department
  dept => employees => employees.filter(e => e.department === dept),
  
  // Extract salaries
  employees => employees.map(e => e.salary),
  
  // Calculate average
  salaries => salaries.reduce((sum, s) => sum + s, 0) / salaries.length
);

const engAvg = getAverageSalaryByDepartment('Engineering')(data);
console.log(engAvg);  // 60000

// Reusable transformations
const prop = key => obj => obj[key];
const filter = predicate => arr => arr.filter(predicate);
const map = fn => arr => arr.map(fn);
const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

const getAvgAge = pipe(
  map(prop('age')),
  average
);

console.log(getAvgAge(data));  // 29.5`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Validation Pipeline</h3>
        <CodeBlock language="javascript">
{`// Validation functions
const isRequired = field => value => 
  value ? null : \`\${field} is required\`;

const minLength = (field, min) => value =>
  value.length >= min ? null : \`\${field} must be at least \${min} characters\`;

const isEmail = field => value =>
  /^[^@]+@[^@]+\\.[^@]+$/.test(value) ? null : \`\${field} must be a valid email\`;

const isNumber = field => value =>
  !isNaN(value) ? null : \`\${field} must be a number\`;

const inRange = (field, min, max) => value =>
  value >= min && value <= max 
    ? null 
    : \`\${field} must be between \${min} and \${max}\`;

// Compose validators
const validate = (value, ...validators) => {
  const errors = validators
    .map(validator => validator(value))
    .filter(error => error !== null);
  
  return errors.length === 0 ? { valid: true } : { valid: false, errors };
};

// Usage
const emailValidation = validate(
  'test@example.com',
  isRequired('Email'),
  isEmail('Email')
);

const ageValidation = validate(
  25,
  isRequired('Age'),
  isNumber('Age'),
  inRange('Age', 18, 65)
);

console.log(emailValidation);  // { valid: true }
console.log(ageValidation);    // { valid: true }`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Prefer Pure Functions</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Easier to test, debug, dan reason about. No side effects.
            </p>
          </div>

          <div>
            <strong>2. Avoid Mutations</strong>
            <CodeBlock language="javascript">
{`// Immutable
const updated = { ...obj, key: newValue };
const newArr = [...arr, newItem];`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Use Declarative Code</strong>
            <CodeBlock language="javascript">
{`// ❌ Imperative (how)
const result = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    result.push(arr[i] * 2);
  }
}

// Declarative (what)
const result = arr
  .filter(n => n % 2 === 0)
  .map(n => n * 2);`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Compose Small Functions</strong>
            <CodeBlock language="javascript">
{`// Break into small, reusable pieces
const isEven = n => n % 2 === 0;
const double = n => n * 2;
const processEvens = pipe(filter(isEven), map(double));`}
            </CodeBlock>
          </div>

          <div>
            <strong>5. Handle Errors Functionally</strong>
            <CodeBlock language="javascript">
{`// Use Maybe/Either instead of throw
const result = divide(10, 0)
  .getOrElse('Division by zero');`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <Section id="rangkuman" heading="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Konsep Penting:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Pure Functions:</strong> Same input → same output, no side effects</li>
            <li><strong>Immutability:</strong> Never modify data, always create new</li>
            <li><strong>Higher-Order Functions:</strong> Functions yang accept/return functions</li>
            <li><strong>Composition:</strong> Combine small functions into complex operations</li>
            <li><strong>Currying:</strong> Transform multi-param function into sequence of single-param</li>
            <li><strong>Partial Application:</strong> Fix some arguments, create new function</li>
            <li><strong>Functors:</strong> Containers dengan map method</li>
            <li><strong>Monads:</strong> Functors dengan flatMap untuk chaining</li>
          </ul>
          
          <h3 className="font-semibold mt-4 mb-3">Benefits:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>Easier to test (pure functions)</li>
            <li>Easier to debug (no side effects)</li>
            <li>Better code reusability</li>
            <li>More predictable code</li>
            <li>Easier parallelization</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
