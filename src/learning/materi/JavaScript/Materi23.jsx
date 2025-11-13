import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi23() {
  return (
    <MateriLayout
      title="Testing & Debugging"
      description="Pelajari testing dan debugging techniques di JavaScript"
    >
      <Section id="pengenalan-testing" heading="Pengenalan Testing">
        <p>
          Testing adalah proses verify bahwa code works as expected. Types: Unit testing, 
          Integration testing, E2E testing.
        </p>
        
        <Note type="info">
          <strong>Testing Pyramid:</strong> Banyak unit tests, beberapa integration tests, sedikit E2E tests.
        </Note>
      </Section>

      <Section id="unit-testing-dengan-jest" heading="Unit Testing dengan Jest">
        <p>Jest adalah popular testing framework untuk JavaScript.</p>

        <h3 className="text-lg font-semibold mb-2">Installation</h3>
        <CodeBlock language="bash">
{`# Install Jest
npm install --save-dev jest

# package.json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Basic Test</h3>
        <CodeBlock language="javascript">
{`// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

// math.test.js
import { add, subtract, multiply, divide } from './math';

describe('Math functions', () => {
  test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });
  
  test('subtracts two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(0, 5)).toBe(-5);
  });
  
  test('multiplies two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-2, 3)).toBe(-6);
  });
  
  test('divides two numbers', () => {
    expect(divide(6, 2)).toBe(3);
    expect(divide(5, 2)).toBe(2.5);
  });
  
  test('throws error on division by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero');
  });
});

// Run tests: npm test`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Jest Matchers</h3>
        <CodeBlock language="javascript">
{`// Equality
expect(value).toBe(5);              // Strict equality (===)
expect(value).toEqual({ a: 1 });    // Deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeGreaterThanOrEqual(3);
expect(value).toBeLessThan(5);
expect(value).toBeLessThanOrEqual(5);
expect(value).toBeCloseTo(0.3);     // Floating point

// Strings
expect(value).toMatch(/pattern/);
expect(value).toContain('substring');

// Arrays
expect(array).toContain(item);
expect(array).toHaveLength(3);
expect(array).toEqual(expect.arrayContaining([1, 2]));

// Objects
expect(obj).toHaveProperty('key');
expect(obj).toMatchObject({ a: 1 });

// Errors
expect(() => fn()).toThrow();
expect(() => fn()).toThrow('error message');
expect(() => fn()).toThrow(Error);

// Not
expect(value).not.toBe(5);`}
        </CodeBlock>
      </Section>

      <Section id="testing-async-code" heading="Testing Async Code">
        <CodeBlock language="javascript">
{`// Function to test
export async function fetchUser(id) {
  const response = await fetch(\`https://api.example.com/users/\${id}\`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}

// Test with async/await
test('fetches user data', async () => {
  const user = await fetchUser(1);
  expect(user).toHaveProperty('id', 1);
  expect(user).toHaveProperty('name');
});

// Test with .resolves
test('fetches user data', () => {
  return expect(fetchUser(1)).resolves.toHaveProperty('id', 1);
});

// Test rejection with .rejects
test('throws error for invalid user', () => {
  return expect(fetchUser(999)).rejects.toThrow('User not found');
});

// Test with done callback
test('fetches user data', (done) => {
  fetchUser(1).then(user => {
    expect(user.id).toBe(1);
    done();
  });
});`}
        </CodeBlock>
      </Section>

      <Section id="mocking" heading="Mocking">
        <p>Mocking adalah replace real implementations with test doubles.</p>

        <h3 className="text-lg font-semibold mb-2">Mock Functions</h3>
        <CodeBlock language="javascript">
{`// Create mock function
const mockFn = jest.fn();

// Call mock
mockFn('arg1', 'arg2');

// Assertions
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenCalledTimes(1);

// Mock return value
const mockAdd = jest.fn().mockReturnValue(5);
expect(mockAdd(2, 3)).toBe(5);

// Mock implementation
const mockCalculate = jest.fn((a, b) => a + b);
expect(mockCalculate(2, 3)).toBe(5);

// Mock resolved value (async)
const mockFetch = jest.fn().mockResolvedValue({ id: 1, name: 'Alice' });
const user = await mockFetch();
expect(user.name).toBe('Alice');

// Mock rejected value
const mockFetchError = jest.fn().mockRejectedValue(new Error('Failed'));
await expect(mockFetchError()).rejects.toThrow('Failed');`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Mock Modules</h3>
        <CodeBlock language="javascript">
{`// api.js
export async function getUser(id) {
  const response = await fetch(\`https://api.example.com/users/\${id}\`);
  return response.json();
}

// userService.js
import { getUser } from './api';

export async function getUserName(id) {
  const user = await getUser(id);
  return user.name;
}

// userService.test.js
import { getUserName } from './userService';
import * as api from './api';

// Mock the entire module
jest.mock('./api');

test('gets user name', async () => {
  // Setup mock
  api.getUser.mockResolvedValue({ id: 1, name: 'Alice' });
  
  // Test
  const name = await getUserName(1);
  
  // Assertions
  expect(name).toBe('Alice');
  expect(api.getUser).toHaveBeenCalledWith(1);
});

// Mock specific function
jest.mock('./api', () => ({
  getUser: jest.fn().mockResolvedValue({ id: 1, name: 'Alice' })
}));`}
        </CodeBlock>
      </Section>

      <Section id="setup-teardown" heading="Setup & Teardown">
        <CodeBlock language="javascript">
{`let database;

// Before all tests in suite
beforeAll(() => {
  database = new Database();
  database.connect();
});

// After all tests in suite
afterAll(() => {
  database.disconnect();
});

// Before each test
beforeEach(() => {
  database.clear();
});

// After each test
afterEach(() => {
  database.reset();
});

describe('User operations', () => {
  test('creates user', () => {
    const user = database.createUser({ name: 'Alice' });
    expect(user).toHaveProperty('id');
  });
  
  test('deletes user', () => {
    const user = database.createUser({ name: 'Bob' });
    database.deleteUser(user.id);
    expect(database.getUser(user.id)).toBeNull();
  });
});`}
        </CodeBlock>
      </Section>

      <Section id="test-coverage" heading="Test Coverage">
        <CodeBlock language="bash">
{`# Run with coverage
npm test -- --coverage

# Coverage report shows:
# - % Statements covered
# - % Branches covered
# - % Functions covered
# - % Lines covered

# jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/index.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};`}
        </CodeBlock>
      </Section>

      <Section id="debugging-dengan-chrome-devtools" heading="Debugging dengan Chrome DevTools">
        <h3 className="text-lg font-semibold mb-2">Console Methods</h3>
        <CodeBlock language="javascript">
{`// Basic logging
console.log('Message');
console.info('Info');
console.warn('Warning');
console.error('Error');

// Styled console
console.log('%cStyled text', 'color: blue; font-size: 20px');

// Group logs
console.group('Group name');
console.log('Item 1');
console.log('Item 2');
console.groupEnd();

// Table
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
console.table(users);

// Time measurement
console.time('operation');
// ... code
console.timeEnd('operation');

// Count
console.count('counter');  // counter: 1
console.count('counter');  // counter: 2

// Trace
function foo() {
  function bar() {
    console.trace('Trace');
  }
  bar();
}
foo();

// Assert
console.assert(value > 0, 'Value must be positive');

// Clear console
console.clear();`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Breakpoints</h3>
        <CodeBlock language="javascript">
{`// Programmatic breakpoint
function process(data) {
  // Code stops here in DevTools
  debugger;
  
  // Continue processing
  return data.map(item => item * 2);
}

// Conditional breakpoint in DevTools:
// Right-click line number → Add conditional breakpoint
// Condition: i === 50

// Logpoints (no code change needed):
// Right-click line number → Add logpoint
// Message: "Value is", value`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Performance Profiling</h3>
        <CodeBlock language="javascript">
{`// Performance API
performance.mark('start-operation');

// ... operation

performance.mark('end-operation');
performance.measure('operation', 'start-operation', 'end-operation');

const measures = performance.getEntriesByType('measure');
console.log(measures[0].duration);

// Memory profiling
if (performance.memory) {
  console.log('Used heap:', performance.memory.usedJSHeapSize);
  console.log('Total heap:', performance.memory.totalJSHeapSize);
}`}
        </CodeBlock>
      </Section>

      <Section id="debugging-nodejs" heading="Debugging Node.js">
        <CodeBlock language="bash">
{`# Start with inspector
node --inspect app.js
node --inspect-brk app.js  # Break on first line

# Chrome DevTools
# Open chrome://inspect
# Click "inspect" on your process

# VS Code debugging (launch.json)
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "\${workspaceFolder}/app.js"
    }
  ]
}

# Debug npm scripts
{
  "type": "node",
  "request": "launch",
  "name": "npm test",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "test"],
  "port": 9229
}`}
        </CodeBlock>
      </Section>

      <Section id="common-debugging-techniques" heading="Common Debugging Techniques">
        <div className="space-y-3">
          <div>
            <strong>1. Binary Search Debugging</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Comment out half code, test, repeat. Find problematic section.
            </p>
          </div>

          <div>
            <strong>2. Rubber Duck Debugging</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Explain code line-by-line to rubber duck (or colleague). Often find issue while explaining.
            </p>
          </div>

          <div>
            <strong>3. Print Debugging</strong>
            <CodeBlock language="javascript">
{`// Add strategic console.logs
function process(data) {
  console.log('Input:', data);
  
  const result = transform(data);
  console.log('After transform:', result);
  
  const filtered = result.filter(x => x > 0);
  console.log('After filter:', filtered);
  
  return filtered;
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Isolate the Problem</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Create minimal reproducible example. Remove unrelated code.
            </p>
          </div>

          <div>
            <strong>5. Check Assumptions</strong>
            <CodeBlock language="javascript">
{`// Verify assumptions
console.assert(typeof value === 'number', 'Value should be number');
console.assert(array.length > 0, 'Array should not be empty');`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <Section id="error-tracking" heading="Error Tracking">
        <CodeBlock language="javascript">
{`// Global error handler (browser)
window.addEventListener('error', (event) => {
  console.error('Global error:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
  
  // Send to error tracking service
  // trackError(event.error);
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
  // trackError(event.reason);
});

// Error boundary (React-like)
class ErrorBoundary {
  constructor(component) {
    this.component = component;
  }
  
  execute(fn) {
    try {
      return fn();
    } catch (error) {
      console.error('Error in component:', error);
      this.component.showError(error);
      // trackError(error);
    }
  }
}

// Usage with Sentry (popular service)
// import * as Sentry from '@sentry/browser';
// 
// Sentry.init({
//   dsn: 'your-dsn',
//   environment: 'production'
// });
// 
// try {
//   // code
// } catch (error) {
//   Sentry.captureException(error);
// }`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Write Tests First (TDD)</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Write test → Run (fails) → Write code → Run (passes) → Refactor
            </p>
          </div>

          <div>
            <strong>2. Test Edge Cases</strong>
            <CodeBlock language="javascript">
{`test('handles edge cases', () => {
  expect(divide(0, 5)).toBe(0);
  expect(() => divide(5, 0)).toThrow();
  expect(divide(-6, 2)).toBe(-3);
});`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Keep Tests Simple</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              One concept per test. Easy to understand what failed.
            </p>
          </div>

          <div>
            <strong>4. Use Descriptive Test Names</strong>
            <CodeBlock language="javascript">
{`// ❌ Bad
test('works', () => { });

// Good
test('returns user object when valid ID provided', () => { });`}
            </CodeBlock>
          </div>

          <div>
            <strong>5. Mock External Dependencies</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Don't make real API calls in tests. Use mocks.
            </p>
          </div>
        </div>
      </Section>

      <Section id="rangkuman" heading="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Testing:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Jest:</strong> Popular testing framework</li>
            <li><strong>Matchers:</strong> toBe, toEqual, toHaveProperty, etc.</li>
            <li><strong>Async Testing:</strong> async/await, .resolves, .rejects</li>
            <li><strong>Mocking:</strong> jest.fn(), jest.mock()</li>
            <li><strong>Setup:</strong> beforeAll, afterAll, beforeEach, afterEach</li>
            <li><strong>Coverage:</strong> Aim for 80%+ coverage</li>
          </ul>
          
          <h3 className="font-semibold mt-4 mb-3">Debugging:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>console.log(), console.table(), console.trace()</li>
            <li>debugger statement, breakpoints</li>
            <li>Chrome DevTools (Sources, Performance, Memory)</li>
            <li>Error tracking (Sentry, Rollbar)</li>
            <li>Isolate problem, check assumptions</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
