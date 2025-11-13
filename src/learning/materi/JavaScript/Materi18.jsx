import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi18() {
  return (
    <MateriLayout
      title="JavaScript Engine & Memory Management"
      description="Pelajari cara kerja JavaScript engine, event loop, dan memory management"
    >
      <Section id="javascript-engine" heading="JavaScript Engine">
        <p>
          JavaScript engine adalah program yang executes JavaScript code. Popular engines: 
          V8 (Chrome, Node.js), SpiderMonkey (Firefox), JavaScriptCore (Safari).
        </p>

        <Note type="info">
          <strong>V8 Process:</strong> Parser → AST → Bytecode → Optimized Machine Code (JIT Compilation)
        </Note>

        <h3 className="text-lg font-semibold mb-2 mt-4">Execution Context</h3>
        <CodeBlock language="javascript">
{`// Execution context contains:
// 1. Variable Environment (var, function declarations)
// 2. Lexical Environment (let, const)
// 3. this binding

// Global Execution Context
var globalVar = 'global';

function outer() {
  // Function Execution Context
  var outerVar = 'outer';
  
  function inner() {
    // Nested Function Execution Context
    var innerVar = 'inner';
    console.log(globalVar);  // Access global
    console.log(outerVar);   // Access outer (closure)
    console.log(innerVar);   // Access local
  }
  
  inner();
}

outer();

// Creation phase vs Execution phase
console.log(hoisted);  // undefined (not ReferenceError)
var hoisted = 'value';

// console.log(notHoisted);  // ReferenceError
// let notHoisted = 'value';`}
        </CodeBlock>
      </Section>

      <Section id="call-stack" heading="Call Stack">
        <p>
          Call stack adalah data structure yang track function calls. LIFO (Last In, First Out).
        </p>

        <CodeBlock language="javascript">
{`function first() {
  console.log('First function');
  second();
  console.log('First function again');
}

function second() {
  console.log('Second function');
  third();
  console.log('Second function again');
}

function third() {
  console.log('Third function');
}

first();

// Call stack visualization:
// 1. Push first()
// 2. Push second()
// 3. Push third()
// 4. Pop third()
// 5. Pop second()
// 6. Pop first()

// Stack overflow
function recursiveWithoutBase() {
  recursiveWithoutBase();  // Infinite recursion
}

// recursiveWithoutBase();  // RangeError: Maximum call stack size exceeded

// Safe recursion with base case
function countdown(n) {
  if (n <= 0) return;  // Base case
  console.log(n);
  countdown(n - 1);
}

countdown(5);`}
        </CodeBlock>
      </Section>

      <Section id="memory-heap" heading="Memory Heap">
        <p>
          Heap adalah memory space untuk object allocation. Unstructured, non-contiguous memory.
        </p>

        <CodeBlock language="javascript">
{`// Primitive types → Stack (fixed size)
let num = 42;
let str = 'hello';
let bool = true;

// Reference types → Heap (dynamic size)
let obj = { name: 'Alice' };
let arr = [1, 2, 3];
let func = function() {};

// Variable di stack, data di heap
let person1 = { name: 'Alice' };
let person2 = person1;  // Copy reference (not data)

person2.name = 'Bob';
console.log(person1.name);  // "Bob" (same object in heap)

// Create new object
let person3 = { ...person1 };  // Shallow copy
person3.name = 'Charlie';
console.log(person1.name);  // "Bob" (different objects)`}
        </CodeBlock>
      </Section>

      <Section id="event-loop" heading="Event Loop">
        <p>
          Event loop adalah mechanism yang allows JavaScript (single-threaded) 
          untuk perform non-blocking operations.
        </p>

        <Note type="info">
          <strong>Components:</strong> Call Stack, Web APIs, Callback Queue (Macrotask Queue), 
          Microtask Queue, Event Loop
        </Note>

        <h3 className="text-lg font-semibold mb-2 mt-4">How Event Loop Works</h3>
        <CodeBlock language="javascript">
{`console.log('1. Start');

setTimeout(() => {
  console.log('2. setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise');
});

console.log('4. End');

// Output:
// 1. Start
// 4. End
// 3. Promise (microtask first!)
// 2. setTimeout

// Why?
// 1. "Start" → synchronous, immediate
// 2. setTimeout → Web API, goes to Macrotask Queue
// 3. Promise → goes to Microtask Queue
// 4. "End" → synchronous, immediate
// 5. Call stack empty → check Microtask Queue → "Promise"
// 6. Microtask Queue empty → check Macrotask Queue → "setTimeout"`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Microtasks vs Macrotasks</h3>
        <CodeBlock language="javascript">
{`// Microtasks (high priority):
// - Promise callbacks (.then, .catch, .finally)
// - queueMicrotask()
// - MutationObserver

// Macrotasks (low priority):
// - setTimeout, setInterval
// - setImmediate (Node.js)
// - I/O operations
// - UI rendering

console.log('Script start');

setTimeout(() => {
  console.log('setTimeout 1');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
  })
  .then(() => {
    console.log('Promise 2');
  });

setTimeout(() => {
  console.log('setTimeout 2');
}, 0);

console.log('Script end');

// Output:
// Script start
// Script end
// Promise 1 (microtask)
// Promise 2 (microtask)
// setTimeout 1 (macrotask)
// setTimeout 2 (macrotask)

// Event loop order:
// 1. Execute synchronous code (call stack)
// 2. Execute ALL microtasks
// 3. Execute ONE macrotask
// 4. Execute ALL microtasks (again)
// 5. Repeat 3-4`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Practical Example</h3>
        <CodeBlock language="javascript">
{`console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

Promise.resolve()
  .then(() => {
    console.log('4');
    setTimeout(() => {
      console.log('5');
    }, 0);
  })
  .then(() => {
    console.log('6');
  });

console.log('7');

// Output: 1, 7, 4, 6, 2, 3, 5

// Breakdown:
// 1. "1" → sync
// 2. setTimeout → macrotask queue
// 3. Promise → microtask queue
// 4. "7" → sync
// 5. Call stack empty → execute microtasks
//    - "4" → also schedules setTimeout (macrotask)
//    - "6"
// 6. Microtasks done → execute macrotask
//    - "2" → also schedules Promise (microtask)
// 7. Execute microtask: "3"
// 8. Execute next macrotask: "5"`}
        </CodeBlock>
      </Section>

      <Section id="garbage-collection" heading="Garbage Collection">
        <p>
          Garbage collection adalah automatic memory management. JavaScript uses 
          mark-and-sweep algorithm.
        </p>

        <h3 className="text-lg font-semibold mb-2">How It Works</h3>
        <CodeBlock language="javascript">
{`// Mark-and-sweep:
// 1. Start from roots (global object, call stack)
// 2. Mark all reachable objects
// 3. Sweep (delete) unmarked objects

// Reachable object (not collected)
let person = { name: 'Alice' };

// Unreachable object (will be collected)
function createObject() {
  let temp = { data: 'temporary' };
  // temp is unreachable after function returns
}
createObject();

// Reference counting issue: Circular references
function createCircular() {
  let obj1 = {};
  let obj2 = {};
  
  obj1.ref = obj2;
  obj2.ref = obj1;  // Circular reference
  
  // In old browsers (IE): memory leak
  // Modern browsers: mark-and-sweep handles this
}

createCircular();`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Memory Leaks</h3>
        <CodeBlock language="javascript">
{`// 1. Global variables (never collected)
function leak1() {
  // Forgot 'let' - creates global
  leakedVar = 'oops';
}

// 2. Forgotten timers
function leak2() {
  setInterval(() => {
    // This keeps running even if not needed
    console.log('tick');
  }, 1000);
  
  // Fix: clearInterval when done
  const id = setInterval(() => {}, 1000);
  // Later: clearInterval(id);
}

// 3. Event listeners not removed
function leak3() {
  const button = document.getElementById('btn');
  button.addEventListener('click', handleClick);
  
  // Fix: remove when done
  // button.removeEventListener('click', handleClick);
}

// 4. Closures holding references
function leak4() {
  const hugeArray = new Array(1000000).fill('data');
  
  return function() {
    // Closure keeps hugeArray in memory
    console.log(hugeArray[0]);
  };
}

const fn = leak4();  // hugeArray is retained

// 5. Detached DOM nodes
function leak5() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  
  const reference = div;
  document.body.removeChild(div);
  
  // 'reference' still points to div (memory leak)
  // Fix: reference = null;
}

// 6. Cache without limits
const cache = {};
function leak6(key, value) {
  cache[key] = value;  // Cache grows forever
  
  // Fix: Use WeakMap or implement LRU cache
}

// Better: WeakMap (auto garbage collected)
const weakCache = new WeakMap();
function betterCache(obj, value) {
  weakCache.set(obj, value);
  // When obj is no longer referenced, entry is auto-removed
}`}
        </CodeBlock>
      </Section>

      <Section id="weakmap-weakset" heading="WeakMap & WeakSet">
        <p>WeakMap dan WeakSet hold weak references, allowing garbage collection.</p>

        <CodeBlock language="javascript">
{`// Regular Map prevents garbage collection
const map = new Map();
let obj = { data: 'value' };
map.set(obj, 'metadata');

obj = null;  // obj is still in map (not collected)

// WeakMap allows garbage collection
const weakMap = new WeakMap();
let obj2 = { data: 'value' };
weakMap.set(obj2, 'metadata');

obj2 = null;  // obj2 can be collected (weak reference)

// Use case: Private data
const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, { name });
  }
  
  getName() {
    return privateData.get(this).name;
  }
}

let user = new User('Alice');
console.log(user.getName());  // "Alice"

user = null;  // User instance and its private data are both collected

// WeakSet
const weakSet = new WeakSet();
let obj3 = { id: 1 };
weakSet.add(obj3);

console.log(weakSet.has(obj3));  // true
obj3 = null;  // Can be collected

// Limitations:
// - Keys must be objects (not primitives)
// - Not iterable (no .keys(), .values(), .forEach())
// - No .size property`}
        </CodeBlock>
      </Section>

      <Section id="performance-optimization" heading="Performance Optimization">
        <h3 className="text-lg font-semibold mb-2">1. Avoid Memory Leaks</h3>
        <CodeBlock language="javascript">
{`class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }
  
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    
    // Return unsubscribe function
    return () => this.off(event, callback);
  }
  
  off(event, callback) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }
  
  emit(event, data) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(cb => cb(data));
  }
}

// Usage with cleanup
const emitter = new EventEmitter();
const unsubscribe = emitter.on('data', (data) => {
  console.log(data);
});

// Clean up when done
unsubscribe();`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">2. Object Pooling</h3>
        <CodeBlock language="javascript">
{`// Reuse objects instead of creating new ones
class ObjectPool {
  constructor(createFn, resetFn) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.available = [];
  }
  
  acquire() {
    if (this.available.length > 0) {
      return this.available.pop();
    }
    return this.createFn();
  }
  
  release(obj) {
    this.resetFn(obj);
    this.available.push(obj);
  }
}

// Example: Particle system
const particlePool = new ObjectPool(
  () => ({ x: 0, y: 0, vx: 0, vy: 0 }),
  (particle) => {
    particle.x = 0;
    particle.y = 0;
    particle.vx = 0;
    particle.vy = 0;
  }
);

// Acquire particle
const particle = particlePool.acquire();
particle.x = 100;
particle.y = 200;

// Release back to pool
particlePool.release(particle);`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">3. Avoid Blocking Event Loop</h3>
        <CodeBlock language="javascript">
{`// ❌ Blocking (freezes UI)
function processHeavy(data) {
  for (let i = 0; i < 1000000; i++) {
    // Heavy computation
  }
}

// Non-blocking (chunked)
async function processHeavyAsync(data, chunkSize = 1000) {
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    
    // Process chunk
    chunk.forEach(item => {
      // Process item
    });
    
    // Yield to event loop
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}

// Web Worker (separate thread)
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ data: largeData });

worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

// worker.js
self.onmessage = (e) => {
  const result = processHeavy(e.data.data);
  self.postMessage(result);
};`}
        </CodeBlock>
      </Section>

      <Section id="debugging-memory" heading="Debugging Memory">
        <CodeBlock language="javascript">
{`// Chrome DevTools Memory Profiler:
// 1. Open DevTools → Memory tab
// 2. Take heap snapshot
// 3. Compare snapshots to find leaks

// Programmatic memory usage (Node.js)
if (typeof process !== 'undefined') {
  const usage = process.memoryUsage();
  console.log(\`Heap used: \${usage.heapUsed / 1024 / 1024} MB\`);
  console.log(\`Heap total: \${usage.heapTotal / 1024 / 1024} MB\`);
  console.log(\`External: \${usage.external / 1024 / 1024} MB\`);
}

// Performance API (browser)
if (typeof performance !== 'undefined' && performance.memory) {
  console.log(\`Used JS heap: \${performance.memory.usedJSHeapSize / 1024 / 1024} MB\`);
  console.log(\`Total JS heap: \${performance.memory.totalJSHeapSize / 1024 / 1024} MB\`);
}

// Monitor performance
function measurePerformance(fn, label) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(\`\${label} took \${(end - start).toFixed(2)}ms\`);
}

measurePerformance(() => {
  const arr = new Array(1000000).fill(0).map((_, i) => i);
}, 'Create array');`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Clean Up Event Listeners</strong>
            <CodeBlock language="javascript">
{`// Always remove when done
element.removeEventListener('click', handler);`}
            </CodeBlock>
          </div>

          <div>
            <strong>2. Clear Timers</strong>
            <CodeBlock language="javascript">
{`const id = setInterval(() => {}, 1000);
clearInterval(id);`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Null References saat Selesai</strong>
            <CodeBlock language="javascript">
{`let largeData = fetchLargeData();
// Use largeData...
largeData = null;  // Allow GC`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Use WeakMap untuk Private Data</strong>
            <CodeBlock language="javascript">
{`const privateData = new WeakMap();
class MyClass {
  constructor(data) {
    privateData.set(this, data);
  }
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>5. Avoid Global Variables</strong>
            <CodeBlock language="javascript">
{`// ❌ Global (never collected)
globalVar = 'value';

// Local scope
function doWork() {
  const localVar = 'value';
}`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <Section id="rangkuman" heading="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Konsep Penting:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Call Stack:</strong> Track function calls (LIFO)</li>
            <li><strong>Heap:</strong> Memory untuk objects (unstructured)</li>
            <li><strong>Event Loop:</strong> Enables non-blocking I/O (single-threaded)</li>
            <li><strong>Microtasks:</strong> High priority (Promises, queueMicrotask)</li>
            <li><strong>Macrotasks:</strong> Low priority (setTimeout, setInterval)</li>
            <li><strong>Garbage Collection:</strong> Automatic memory management (mark-and-sweep)</li>
            <li><strong>Memory Leaks:</strong> Global vars, forgotten timers, event listeners</li>
            <li><strong>WeakMap/WeakSet:</strong> Weak references (allow GC)</li>
          </ul>
          
          <h3 className="font-semibold mt-4 mb-3">Best Practices:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>Remove event listeners when done</li>
            <li>Clear timers (clearInterval, clearTimeout)</li>
            <li>Null references untuk large data</li>
            <li>Avoid blocking event loop (use async)</li>
            <li>Use WeakMap untuk private data</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
