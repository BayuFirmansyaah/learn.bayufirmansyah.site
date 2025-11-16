import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi06() {
  return (
    <MateriLayout title="Async Programming - Callbacks, Promises, Async/Await">
      <Section id="asynchronous-nature" heading="Asynchronous Nature of Node.js">
        <p>
          Node.js adalah single-threaded tapi menggunakan asynchronous non-blocking I/O model. 
          Ini memungkinkan handle ribuan concurrent connections tanpa create multiple threads.
        </p>
        
        <Note type="info">
          <strong>Event Loop:</strong> Mechanism yang memungkinkan Node.js perform non-blocking 
          operations walaupun JavaScript adalah single-threaded.
        </Note>
      </Section>

      <Section id="callbacks" heading="Callbacks">
        <p>
          Callback adalah function yang passed sebagai argument ke function lain dan akan 
          diexecute setelah operation selesai.
        </p>
        <CodeBlock language="javascript">
{`const fs = require('fs');

// Asynchronous callback
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('File content:', data);
});

console.log('This runs before readFile completes!');

// Callback pattern
function fetchUserData(userId, callback) {
  setTimeout(() => {
    const users = {
      1: { name: 'Alice', age: 25 },
      2: { name: 'Bob', age: 30 }
    };
    
    const user = users[userId];
    if (user) {
      callback(null, user); // null = no error
    } else {
      callback(new Error('User not found'), null);
    }
  }, 1000);
}

// Usage
fetchUserData(1, (err, user) => {
  if (err) {
    console.error('Error:', err.message);
    return;
  }
  console.log('User:', user);
});`}
        </CodeBlock>
      </Section>

      <Section id="callback-hell" heading="Callback Hell (Pyramid of Doom)">
        <CodeBlock language="javascript">
{`// BAD: Nested callbacks
getUser(userId, (err, user) => {
  if (err) {
    console.error(err);
  } else {
    getPosts(user.id, (err, posts) => {
      if (err) {
        console.error(err);
      } else {
        getComments(posts[0].id, (err, comments) => {
          if (err) {
            console.error(err);
          } else {
            // More nesting...
            console.log(comments);
          }
        });
      }
    });
  }
});

// This becomes unreadable and hard to maintain!`}
        </CodeBlock>

        <Note type="warning">
          <strong>Callback Hell Problems:</strong>
          <ul>
            <li>Hard to read dan maintain</li>
            <li>Error handling repetitive</li>
            <li>Difficult to reason about flow</li>
          </ul>
        </Note>
      </Section>

      <Section id="promises" heading="Promises">
        <p>
          Promise adalah object representing eventual completion (or failure) of asynchronous 
          operation. Lebih readable dan easier to chain daripada callbacks.
        </p>
        <CodeBlock language="javascript">
{`// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    
    if (success) {
      resolve('Operation succeeded!');
    } else {
      reject(new Error('Operation failed'));
    }
  }, 1000);
});

// Using promise
myPromise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });

// Promise-based function
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = {
        1: { name: 'Alice', age: 25 },
        2: { name: 'Bob', age: 30 }
      };
      
      const user = users[userId];
      if (user) {
        resolve(user);
      } else {
        reject(new Error('User not found'));
      }
    }, 1000);
  });
}

// Usage
fetchUserData(1)
  .then(user => {
    console.log('User:', user);
    return fetchUserData(2); // Chain another promise
  })
  .then(user => {
    console.log('Second user:', user);
  })
  .catch(error => {
    console.error('Error:', error.message);
  })
  .finally(() => {
    console.log('Cleanup operations');
  });`}
        </CodeBlock>
      </Section>

      <Section id="promise-methods" heading="Promise Methods">
        <CodeBlock language="javascript">
{`// Promise.all - Wait for all promises
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log('All resolved:', results); // [1, 2, 3]
  })
  .catch(error => {
    // If any promise rejects, catch is called
    console.error('One failed:', error);
  });

// Promise.race - First to settle wins
const slow = new Promise(resolve => setTimeout(() => resolve('slow'), 2000));
const fast = new Promise(resolve => setTimeout(() => resolve('fast'), 100));

Promise.race([slow, fast])
  .then(result => {
    console.log('Winner:', result); // 'fast'
  });

// Promise.allSettled - Wait for all, regardless of rejection
const p1 = Promise.resolve('success');
const p2 = Promise.reject('failure');
const p3 = Promise.resolve('another success');

Promise.allSettled([p1, p2, p3])
  .then(results => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 'success' },
    //   { status: 'rejected', reason: 'failure' },
    //   { status: 'fulfilled', value: 'another success' }
    // ]
  });

// Promise.any - First fulfilled promise
Promise.any([p1, p2, p3])
  .then(result => {
    console.log('First success:', result); // 'success'
  });

// Promisify callback-based function
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Or use fs.promises
const fsPromises = require('fs').promises;

fsPromises.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));`}
        </CodeBlock>
      </Section>

      <Section id="async-await" heading="Async/Await">
        <p>
          Async/await adalah syntactic sugar untuk Promises, making asynchronous code look 
          synchronous. Lebih readable dan easier to understand.
        </p>
        <CodeBlock language="javascript">
{`// Async function returns a promise
async function fetchData() {
  return 'Data fetched';
}

fetchData().then(data => console.log(data));

// Await pauses execution until promise resolves
async function getUserData(userId) {
  try {
    const user = await fetchUser(userId);
    console.log('User:', user);
    
    const posts = await fetchPosts(user.id);
    console.log('Posts:', posts);
    
    const comments = await fetchComments(posts[0].id);
    console.log('Comments:', comments);
    
    return comments;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw if needed
  }
}

// Helper functions
function fetchUser(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id: userId, name: 'Alice' }), 500);
  });
}

function fetchPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, title: 'Post 1' }]), 500);
  });
}

function fetchComments(postId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ text: 'Comment 1' }]), 500);
  });
}

// Usage
getUserData(1)
  .then(comments => console.log('Final:', comments))
  .catch(err => console.error('Failed:', err));`}
        </CodeBlock>

        <Note type="tip">
          <strong>Benefits of Async/Await:</strong>
          <ul>
            <li>Code looks synchronous - easier to read</li>
            <li>Error handling dengan try-catch (familiar pattern)</li>
            <li>Debugging easier - stack traces more meaningful</li>
          </ul>
        </Note>
      </Section>

      <Section id="parallel-async" heading="Parallel Async Operations">
        <CodeBlock language="javascript">
{`// Sequential (slow - waits for each)
async function sequentialFetch() {
  const user = await fetchUser(1);      // 1 second
  const posts = await fetchPosts(1);    // 1 second
  const comments = await fetchComments(1); // 1 second
  // Total: 3 seconds
  return { user, posts, comments };
}

// Parallel (fast - all at once)
async function parallelFetch() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
  ]);
  // Total: 1 second (they run simultaneously)
  return { user, posts, comments };
}

// Parallel with individual error handling
async function parallelWithErrors() {
  const results = await Promise.allSettled([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(\`Request \${index} succeeded:\`, result.value);
    } else {
      console.error(\`Request \${index} failed:\`, result.reason);
    }
  });
}

// Process array items concurrently (controlled parallelism)
async function processInBatches(items, batchSize, processor) {
  const results = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(item => processor(item))
    );
    results.push(...batchResults);
  }
  
  return results;
}

// Usage
const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
processInBatches(userIds, 3, fetchUser)
  .then(users => console.log('All users:', users));`}
        </CodeBlock>
      </Section>

      <Section id="error-handling" heading="Error Handling">
        <CodeBlock language="javascript">
{`// Try-catch with async/await
async function safeFetch() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    return null;
  }
}

// Multiple try-catch blocks
async function complexOperation() {
  let user, posts;
  
  try {
    user = await fetchUser(1);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
  
  try {
    posts = await fetchPosts(user.id);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    // Continue with empty posts
    posts = [];
  }
  
  return { user, posts };
}

// Finally block
async function withCleanup() {
  let connection;
  try {
    connection = await database.connect();
    const data = await connection.query('SELECT * FROM users');
    return data;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  } finally {
    // Always runs, even if error
    if (connection) {
      await connection.close();
      console.log('Connection closed');
    }
  }
}

// Global unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic
});

// Example that triggers unhandled rejection
async function badFunction() {
  throw new Error('Something went wrong');
}

// This promise rejection is not caught
badFunction(); // Will trigger unhandledRejection event`}
        </CodeBlock>
      </Section>

      <Section id="practical-examples" heading="Practical Examples">
        <h3 className="text-lg font-semibold mb-2">1. API Request with Retry Logic</h3>
        <CodeBlock language="javascript">
{`async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(\`Attempt \${i + 1} failed:\`, error.message);
      
      if (i === retries - 1) {
        // Last retry failed
        throw error;
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
}

// Usage
fetchWithRetry('https://api.example.com/data', {}, 3)
  .then(data => console.log('Data:', data))
  .catch(err => console.error('All retries failed:', err));`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">2. Rate Limiter</h3>
        <CodeBlock language="javascript">
{`class RateLimiter {
  constructor(maxRequests, perMilliseconds) {
    this.maxRequests = maxRequests;
    this.perMilliseconds = perMilliseconds;
    this.requests = [];
  }

  async acquire() {
    const now = Date.now();
    
    // Remove old requests outside time window
    this.requests = this.requests.filter(
      time => now - time < this.perMilliseconds
    );
    
    if (this.requests.length >= this.maxRequests) {
      // Wait until oldest request expires
      const oldestRequest = this.requests[0];
      const waitTime = this.perMilliseconds - (now - oldestRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.acquire(); // Try again
    }
    
    this.requests.push(now);
  }

  async execute(fn) {
    await this.acquire();
    return fn();
  }
}

// Usage: Max 5 requests per second
const limiter = new RateLimiter(5, 1000);

async function makeApiCalls() {
  const promises = [];
  
  for (let i = 0; i < 20; i++) {
    promises.push(
      limiter.execute(async () => {
        console.log(\`Request \${i} at \${new Date().toISOString()}\`);
        return fetch(\`https://api.example.com/data/\${i}\`);
      })
    );
  }
  
  await Promise.all(promises);
  console.log('All requests completed');
}

makeApiCalls();`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">3. Async Queue</h3>
        <CodeBlock language="javascript">
{`class AsyncQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  async add(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }

    this.running++;
    const { fn, resolve, reject } = this.queue.shift();

    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process(); // Process next item
    }
  }
}

// Usage: Process max 3 tasks concurrently
const queue = new AsyncQueue(3);

const tasks = Array.from({ length: 10 }, (_, i) => {
  return () => new Promise(resolve => {
    console.log(\`Task \${i} started\`);
    setTimeout(() => {
      console.log(\`Task \${i} completed\`);
      resolve(i);
    }, 1000);
  });
});

Promise.all(tasks.map(task => queue.add(task)))
  .then(results => console.log('All tasks completed:', results));`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Prefer async/await</strong> over callbacks dan raw promises</li>
          <li><strong>Always handle errors</strong> dengan try-catch atau .catch()</li>
          <li><strong>Use Promise.all()</strong> untuk parallel operations</li>
          <li><strong>Don't mix callbacks dan promises</strong> - stick to one pattern</li>
          <li><strong>Handle unhandled rejections</strong> globally</li>
          <li><strong>Use finally</strong> untuk cleanup operations</li>
          <li><strong>Avoid blocking</strong> dengan CPU-intensive synchronous operations</li>
          <li><strong>Consider rate limiting</strong> untuk external API calls</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Node.js adalah asynchronous dan non-blocking by nature</li>
          <li>Callbacks adalah traditional pattern - can lead to callback hell</li>
          <li>Promises provide cleaner async code dengan chaining</li>
          <li>Async/await adalah modern, preferred way - looks synchronous</li>
          <li>Promise.all() untuk parallel operations</li>
          <li>Always handle errors dengan try-catch atau .catch()</li>
          <li>Understanding async patterns essential untuk Node.js development</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
