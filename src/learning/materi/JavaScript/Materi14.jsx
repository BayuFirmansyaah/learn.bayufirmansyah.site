import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi14() {
  return (
    <MateriLayout
      title="Error Handling"
      description="Pelajari cara menangani error dengan try/catch, throw, dan custom errors di JavaScript"
    >
      <Section id="pengenalan-error-handling" heading="Pengenalan Error Handling">
        <p>
          Error handling adalah proses menangani error yang terjadi saat program berjalan. 
          Dengan error handling yang baik, program tidak crash dan memberikan feedback yang jelas.
        </p>
        
        <Note type="info">
          Error yang tidak ditangani akan stop program execution dan menampilkan error di console.
          Good error handling membuat aplikasi lebih robust dan user-friendly.
        </Note>
      </Section>

      <Section id="trycatchfinally" heading="Try...Catch...Finally">
        <h3 className="text-lg font-semibold mb-2">Basic Try...Catch</h3>
        
        <CodeBlock language="javascript">
{`// Tanpa try/catch - program crash
// console.log(undefinedVariable);  // ReferenceError: undefinedVariable is not defined

// Dengan try/catch - program tetap jalan
try {
  console.log(undefinedVariable);
} catch (error) {
  console.error('Error occurred:', error.message);
}
console.log('Program continues...');

// Contoh: Parse JSON
const jsonString = '{ invalid json }';

try {
  const data = JSON.parse(jsonString);
  console.log(data);
} catch (error) {
  console.error('Failed to parse JSON:', error.message);
}

// Catch different error types
try {
  // Some code
  const result = JSON.parse('invalid');
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error('JSON syntax error:', error.message);
  } else if (error instanceof TypeError) {
    console.error('Type error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Finally Block</h3>
        <p>Finally block selalu dijalankan, regardless of success or error.</p>
        
        <CodeBlock language="javascript">
{`function processData() {
  try {
    console.log('Processing...');
    // Simulate error
    throw new Error('Processing failed');
  } catch (error) {
    console.error('Error:', error.message);
    return 'error';
  } finally {
    console.log('Cleanup completed');  // Selalu dijalankan
  }
}

processData();
// Output:
// "Processing..."
// "Error: Processing failed"
// "Cleanup completed"

// Use case: Clean up resources
function readFile(filename) {
  const file = openFile(filename);
  
  try {
    const content = file.read();
    return content;
  } catch (error) {
    console.error('Failed to read file:', error);
    return null;
  } finally {
    file.close();  // Always close file
  }
}

// Finally dengan return
function test() {
  try {
    return 'try';
  } finally {
    console.log('finally');  // Runs before return!
  }
}

console.log(test());
// Output:
// "finally"
// "try"`}
        </CodeBlock>
      </Section>

      <Section id="throwing-errors" heading="Throwing Errors">
        <h3 className="text-lg font-semibold mb-2">Throw Statement</h3>
        
        <CodeBlock language="javascript">
{`// Throw string (not recommended)
function divide(a, b) {
  if (b === 0) {
    throw 'Cannot divide by zero';
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (error) {
  console.error(error);  // "Cannot divide by zero"
}

// Throw Error object (recommended)
function validateAge(age) {
  if (age < 0) {
    throw new Error('Age cannot be negative');
  }
  if (age < 18) {
    throw new Error('Must be 18 or older');
  }
  return true;
}

try {
  validateAge(15);
} catch (error) {
  console.error('Validation error:', error.message);
}

// Re-throw error
function processUser(user) {
  try {
    validateAge(user.age);
  } catch (error) {
    console.error('User validation failed');
    throw error;  // Re-throw untuk handle di level lebih tinggi
  }
}

try {
  processUser({ name: 'John', age: 15 });
} catch (error) {
  console.error('Final error handler:', error.message);
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Error Types</h3>
        
        <CodeBlock language="javascript">
{`// Built-in Error types
try {
  // SyntaxError
  eval('{ invalid }');
} catch (error) {
  console.log(error instanceof SyntaxError);  // true
}

try {
  // ReferenceError
  console.log(nonExistentVariable);
} catch (error) {
  console.log(error instanceof ReferenceError);  // true
}

try {
  // TypeError
  null.toString();
} catch (error) {
  console.log(error instanceof TypeError);  // true
}

try {
  // RangeError
  const arr = new Array(-1);
} catch (error) {
  console.log(error instanceof RangeError);  // true
}

// Throw specific error types
function validateEmail(email) {
  if (typeof email !== 'string') {
    throw new TypeError('Email must be a string');
  }
  if (!email.includes('@')) {
    throw new Error('Invalid email format');
  }
  return true;
}`}
        </CodeBlock>
      </Section>

      <Section id="custom-error-classes" heading="Custom Error Classes">
        <CodeBlock language="javascript">
{`// Create custom error class
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class DatabaseError extends Error {
  constructor(message, query) {
    super(message);
    this.name = 'DatabaseError';
    this.query = query;
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(\`\${resource} with id \${id} not found\`);
    this.name = 'NotFoundError';
    this.resource = resource;
    this.id = id;
  }
}

// Usage
function validateUser(user) {
  if (!user.email) {
    throw new ValidationError('Email is required', 'email');
  }
  if (!user.email.includes('@')) {
    throw new ValidationError('Invalid email format', 'email');
  }
  return true;
}

try {
  validateUser({ name: 'John' });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(\`Validation failed for field: \${error.field}\`);
    console.error(\`Message: \${error.message}\`);
  } else {
    console.error('Unexpected error:', error);
  }
}

// API error handling example
class ApiError extends Error {
  constructor(message, statusCode, response) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.response = response;
  }
}

async function fetchUser(id) {
  const response = await fetch(\`https://api.example.com/users/\${id}\`);
  
  if (!response.ok) {
    throw new ApiError(
      'Failed to fetch user',
      response.status,
      await response.json()
    );
  }
  
  return await response.json();
}

try {
  const user = await fetchUser(999);
} catch (error) {
  if (error instanceof ApiError) {
    console.error(\`API Error (\${error.statusCode}):\`, error.message);
    console.error('Response:', error.response);
  } else {
    console.error('Network error:', error);
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="async-error-handling" heading="Async Error Handling">
        <h3 className="text-lg font-semibold mb-2">Try/Catch dengan Async/Await</h3>
        
        <CodeBlock language="javascript">
{`// Basic async error handling
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}

// Multiple async operations
async function loadUserData(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchPosts(userId);
    const comments = await fetchComments(userId);
    
    return { user, posts, comments };
  } catch (error) {
    console.error('Failed to load user data:', error);
    return null;
  }
}

// Specific error handling
async function getUserProfile(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (response.status === 404) {
      throw new NotFoundError('User', userId);
    }
    
    if (!response.ok) {
      throw new ApiError('Failed to fetch user', response.status);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof NotFoundError) {
      console.error('User not found');
      return null;
    }
    if (error instanceof ApiError) {
      console.error('API error:', error.statusCode);
      throw error;
    }
    console.error('Network error:', error);
    throw error;
  }
}

// Wrapper pattern untuk error handling
async function safeAsync(asyncFn) {
  try {
    const result = await asyncFn();
    return [null, result];
  } catch (error) {
    return [error, null];
  }
}

// Usage
const [error, user] = await safeAsync(() => fetchUser(1));
if (error) {
  console.error('Error:', error);
} else {
  console.log('User:', user);
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Promise Error Handling</h3>
        
        <CodeBlock language="javascript">
{`// With .catch()
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
  .finally(() => console.log('Request completed'));

// Global unhandled rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// Create promise with error handling
function fetchWithRetry(url, retries = 3) {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        resolve(data);
        return;
      } catch (error) {
        if (i === retries - 1) {
          reject(error);
        }
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  });
}`}
        </CodeBlock>
      </Section>

      <Section id="error-boundaries-react-context" heading="Error Boundaries (React Context)">
        <CodeBlock language="javascript">
{`// Error boundary wrapper for async operations
class ErrorHandler {
  constructor(onError) {
    this.onError = onError || console.error;
  }
  
  async execute(asyncFn) {
    try {
      return await asyncFn();
    } catch (error) {
      this.onError(error);
      return null;
    }
  }
  
  wrap(fn) {
    return async (...args) => {
      try {
        return await fn(...args);
      } catch (error) {
        this.onError(error);
        return null;
      }
    };
  }
}

// Usage
const errorHandler = new ErrorHandler((error) => {
  console.error('Application error:', error);
  // Send to error tracking service
  // trackError(error);
});

const fetchUser = errorHandler.wrap(async (id) => {
  const response = await fetch(\`/api/users/\${id}\`);
  return await response.json();
});

const user = await fetchUser(1);
// Errors automatically caught and logged`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Gunakan Error Objects, Bukan Strings</strong>
            <CodeBlock language="javascript">
{`// ❌ Buruk
throw 'Something went wrong';

// Baik
throw new Error('Something went wrong');`}
            </CodeBlock>
          </div>

          <div>
            <strong>2. Be Specific dengan Error Messages</strong>
            <CodeBlock language="javascript">
{`// ❌ Buruk - tidak informatif
throw new Error('Invalid input');

// Baik - jelas dan actionable
throw new Error('Email must be a valid email address with @ symbol');`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Gunakan Custom Error Classes</strong>
            <CodeBlock language="javascript">
{`// Memudahkan error handling
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

try {
  throw new ValidationError('Invalid email', 'email');
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(\`Fix field: \${error.field}\`);
  }
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Always Handle Async Errors</strong>
            <CodeBlock language="javascript">
{`// Always use try/catch dengan async/await
async function fetchData() {
  try {
    const data = await fetch('/api/data');
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>5. Don't Swallow Errors</strong>
            <CodeBlock language="javascript">
{`// ❌ Buruk - error hilang
try {
  riskyOperation();
} catch (error) {
  // Empty catch - BAD!
}

// Baik - log atau re-throw
try {
  riskyOperation();
} catch (error) {
  console.error('Operation failed:', error);
  throw error;  // Or handle appropriately
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>6. Use Finally untuk Cleanup</strong>
            <CodeBlock language="javascript">
{`// Cleanup selalu dijalankan
let connection;
try {
  connection = await database.connect();
  await connection.query('SELECT * FROM users');
} catch (error) {
  console.error('Database error:', error);
} finally {
  if (connection) {
    await connection.close();
  }
}`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <Section id="common-error-patterns" heading="Common Error Patterns">
        <CodeBlock language="javascript">
{`// Pattern 1: Validation with early return
function processOrder(order) {
  if (!order) {
    throw new Error('Order is required');
  }
  if (!order.items || order.items.length === 0) {
    throw new Error('Order must contain at least one item');
  }
  if (order.total < 0) {
    throw new Error('Order total cannot be negative');
  }
  
  // Process order...
  return { success: true };
}

// Pattern 2: Try-catch in loop
async function processMultipleItems(items) {
  const results = [];
  const errors = [];
  
  for (const item of items) {
    try {
      const result = await processItem(item);
      results.push(result);
    } catch (error) {
      errors.push({ item, error });
    }
  }
  
  return { results, errors };
}

// Pattern 3: Graceful degradation
async function getUserWithFallback(userId) {
  try {
    return await fetchUserFromAPI(userId);
  } catch (error) {
    console.warn('API failed, using cache:', error);
    try {
      return await getUserFromCache(userId);
    } catch (cacheError) {
      console.error('Cache also failed:', cacheError);
      return getDefaultUser();
    }
  }
}

// Pattern 4: Error aggregation
class ErrorCollector {
  constructor() {
    this.errors = [];
  }
  
  add(error, context) {
    this.errors.push({ error, context, timestamp: Date.now() });
  }
  
  hasErrors() {
    return this.errors.length > 0;
  }
  
  getErrors() {
    return this.errors;
  }
  
  clear() {
    this.errors = [];
  }
}

const collector = new ErrorCollector();

try {
  validateEmail(email);
} catch (error) {
  collector.add(error, 'email validation');
}

try {
  validateAge(age);
} catch (error) {
  collector.add(error, 'age validation');
}

if (collector.hasErrors()) {
  console.error('Validation failed:', collector.getErrors());
}`}
        </CodeBlock>
      </Section>

      <Section id="rangkuman" heading="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Konsep Penting:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Try/Catch:</strong> Menangani errors tanpa crash program</li>
            <li><strong>Finally:</strong> Code yang selalu dijalankan (cleanup)</li>
            <li><strong>Throw:</strong> Membuat dan melempar error</li>
            <li><strong>Error Types:</strong> Error, TypeError, ReferenceError, SyntaxError, RangeError</li>
            <li><strong>Custom Errors:</strong> Extend Error class untuk specific error types</li>
            <li><strong>Async Errors:</strong> Try/catch dengan async/await</li>
            <li><strong>Error Messages:</strong> Specific dan actionable</li>
            <li><strong>Don't Swallow:</strong> Always log or re-throw errors</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
