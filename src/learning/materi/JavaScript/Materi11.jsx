import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi11() {
  return (
    <MateriLayout
      title="Asynchronous JavaScript"
      description="Pelajari cara menangani operasi asynchronous dengan Callbacks, Promises, dan Async/Await"
    >
      {/* Intro */}
      <Section title="Pengenalan Asynchronous Programming">
        <p>
          JavaScript adalah single-threaded, artinya hanya bisa menjalankan satu task pada satu waktu. 
          Asynchronous programming memungkinkan kita menjalankan operasi yang memakan waktu (seperti 
          fetch data dari API, read file, timer) tanpa memblokir eksekusi code lainnya.
        </p>
        
        <CodeBlock language="javascript">
{`// Synchronous (Blocking)
console.log('Start');
// Misalnya operasi yang lama (simulasi dengan loop)
for (let i = 0; i < 1000000000; i++) {}  // Block selama beberapa detik
console.log('End');  // Harus tunggu loop selesai

// Asynchronous (Non-blocking)
console.log('Start');
setTimeout(() => {
  console.log('After 2 seconds');
}, 2000);
console.log('End');  // Langsung dijalankan, tidak tunggu setTimeout

// Output:
// "Start"
// "End"
// "After 2 seconds" (setelah 2 detik)`}
        </CodeBlock>
        
        <Note type="info">
          Asynchronous operations penting untuk: API calls, file operations, timers, 
          event handlers, database queries, dan operasi I/O lainnya.
        </Note>
      </Section>

      {/* Callbacks */}
      <Section title="Callbacks">
        <h3 className="text-lg font-semibold mb-2">Callback Functions</h3>
        <p>Callback adalah function yang dipass sebagai argument ke function lain untuk dieksekusi nanti.</p>
        
        <CodeBlock language="javascript">
{`// Callback sederhana
function greet(name, callback) {
  console.log('Hello ' + name);
  callback();
}

greet('Alice', function() {
  console.log('Callback executed');
});

// Asynchronous callback
function fetchUser(id, callback) {
  setTimeout(() => {
    const user = { id: id, name: 'John Doe' };
    callback(user);
  }, 1000);
}

fetchUser(1, (user) => {
  console.log('User:', user);
});

// Callback dengan error handling (Node.js style)
function readFile(filename, callback) {
  setTimeout(() => {
    const error = filename ? null : new Error('Filename required');
    const data = filename ? 'File content' : null;
    callback(error, data);
  }, 1000);
}

readFile('test.txt', (error, data) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Data:', data);
  }
});`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Callback Hell (Pyramid of Doom)</h3>
        <p>Masalah ketika banyak callback nested, code jadi sulit dibaca dan maintain.</p>
        
        <CodeBlock language="javascript">
{`// ❌ Callback Hell
getUser(1, (user) => {
  getOrders(user.id, (orders) => {
    getOrderDetails(orders[0].id, (details) => {
      getPayment(details.paymentId, (payment) => {
        console.log('Payment:', payment);
        // Semakin dalam... sulit dibaca!
      });
    });
  });
});

// Solusi: Gunakan Promises atau Async/Await (dijelaskan di bawah)`}
        </CodeBlock>
      </Section>

      {/* Promises */}
      <Section title="Promises">
        <h3 className="text-lg font-semibold mb-2">Membuat dan Menggunakan Promise</h3>
        <p>
          Promise adalah object yang merepresentasikan eventual completion (or failure) dari 
          operasi asynchronous. Promise punya 3 state: pending, fulfilled, rejected.
        </p>
        
        <CodeBlock language="javascript">
{`// Membuat Promise
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true;
  
  setTimeout(() => {
    if (success) {
      resolve('Operation successful!');  // Fulfilled
    } else {
      reject('Operation failed!');  // Rejected
    }
  }, 1000);
});

// Menggunakan Promise dengan then/catch
myPromise
  .then((result) => {
    console.log('Success:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  })
  .finally(() => {
    console.log('Promise settled (fulfilled or rejected)');
  });

// Contoh: Fetch user
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id) {
        resolve({ id: id, name: 'John Doe', email: 'john@example.com' });
      } else {
        reject(new Error('User ID required'));
      }
    }, 1000);
  });
}

fetchUser(1)
  .then((user) => {
    console.log('User:', user);
    return user.id;  // Return value jadi input untuk then berikutnya
  })
  .then((userId) => {
    console.log('User ID:', userId);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Promise Chaining</h3>
        <p>Menghindari callback hell dengan chaining promises.</p>
        
        <CodeBlock language="javascript">
{`// Promise chaining - lebih readable
fetchUser(1)
  .then((user) => fetchOrders(user.id))
  .then((orders) => fetchOrderDetails(orders[0].id))
  .then((details) => fetchPayment(details.paymentId))
  .then((payment) => {
    console.log('Payment:', payment);
  })
  .catch((error) => {
    console.error('Error in chain:', error);  // Catch semua error
  });

// Contoh praktis: Sequential operations
function loginUser(email, password) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, email }), 500);
  });
}

function getUserProfile(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ userId, name: 'John', bio: 'Developer' }), 500);
  });
}

function getUserPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' }
    ]), 500);
  });
}

// Chain
loginUser('john@example.com', 'password123')
  .then((user) => {
    console.log('Logged in:', user.email);
    return getUserProfile(user.id);
  })
  .then((profile) => {
    console.log('Profile:', profile.name);
    return getUserPosts(profile.userId);
  })
  .then((posts) => {
    console.log('Posts:', posts.length);
  })
  .catch((error) => {
    console.error('Login flow error:', error);
  });`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Promise Static Methods</h3>
        <p>Methods untuk handle multiple promises.</p>
        
        <CodeBlock language="javascript">
{`// Promise.all() - tunggu SEMUA promises selesai
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve) => setTimeout(() => resolve('foo'), 1000));
const promise3 = fetch('https://api.example.com/data').then(r => r.json());

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results);  // [3, 'foo', {...}]
  })
  .catch((error) => {
    console.error('One of the promises failed:', error);
  });

// Promise.race() - return promise pertama yang selesai (fulfilled/rejected)
Promise.race([
  fetch('https://api.example.com/fast'),
  fetch('https://api.example.com/slow')
])
  .then((result) => {
    console.log('Fastest result:', result);
  });

// Timeout pattern dengan race
function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}

// Promise.allSettled() - tunggu SEMUA selesai (tidak peduli fulfilled/rejected)
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
])
  .then((results) => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 1 },
    //   { status: 'rejected', reason: 'error' },
    //   { status: 'fulfilled', value: 3 }
    // ]
  });

// Promise.any() - return promise pertama yang FULFILLED (ignore rejected)
Promise.any([
  Promise.reject('error 1'),
  Promise.resolve('success'),
  Promise.reject('error 2')
])
  .then((result) => {
    console.log(result);  // "success"
  })
  .catch((error) => {
    console.error('All promises rejected:', error);
  });`}
        </CodeBlock>
      </Section>

      {/* Async/Await */}
      <Section title="Async/Await">
        <h3 className="text-lg font-semibold mb-2">Async Functions</h3>
        <p>
          Async/await adalah syntax sugar di atas promises yang membuat asynchronous code 
          terlihat seperti synchronous code, lebih mudah dibaca.
        </p>
        
        <CodeBlock language="javascript">
{`// Async function selalu return Promise
async function getData() {
  return 'Data';  // Automatically wrapped in Promise.resolve()
}

getData().then((data) => console.log(data));  // "Data"

// Await hanya bisa digunakan di dalam async function
async function fetchUserData() {
  // Await "menunggu" promise selesai
  const user = await fetchUser(1);
  console.log('User:', user);
  
  const orders = await fetchOrders(user.id);
  console.log('Orders:', orders);
  
  return { user, orders };
}

fetchUserData()
  .then((data) => console.log('All data:', data))
  .catch((error) => console.error('Error:', error));

// Contoh: Rewrite promise chain dengan async/await
async function loginFlow() {
  const user = await loginUser('john@example.com', 'password123');
  console.log('Logged in:', user.email);
  
  const profile = await getUserProfile(user.id);
  console.log('Profile:', profile.name);
  
  const posts = await getUserPosts(profile.userId);
  console.log('Posts:', posts.length);
  
  return { user, profile, posts };
}

loginFlow()
  .then((data) => console.log('Complete:', data))
  .catch((error) => console.error('Error:', error));`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Error Handling dengan Try/Catch</h3>
        <p>Menggunakan try/catch untuk handle errors dalam async/await.</p>
        
        <CodeBlock language="javascript">
{`async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('Data:', data);
    return data;
    
  } catch (error) {
    console.error('Failed to fetch data:', error.message);
    throw error;  // Re-throw jika perlu
  } finally {
    console.log('Fetch attempt completed');
  }
}

// Multiple try/catch untuk granular error handling
async function complexOperation() {
  let user;
  
  try {
    user = await fetchUser(1);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return;  // Early return
  }
  
  try {
    const orders = await fetchOrders(user.id);
    console.log('Orders:', orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    // Continue execution
  }
  
  console.log('Operation completed');
}

// Wrapper untuk error handling
async function safeAsync(asyncFn) {
  try {
    const result = await asyncFn();
    return [null, result];  // [error, data]
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

        <h3 className="text-lg font-semibold mb-2 mt-4">Parallel Execution</h3>
        <p>Menjalankan multiple async operations secara parallel untuk performa lebih baik.</p>
        
        <CodeBlock language="javascript">
{`// ❌ Sequential (lambat) - total 3 detik
async function sequentialFetch() {
  const user = await fetchUser(1);      // 1 detik
  const posts = await fetchPosts();     // 1 detik
  const comments = await fetchComments(); // 1 detik
  return { user, posts, comments };
}

// Parallel (cepat) - total 1 detik (operasi berjalan bersamaan)
async function parallelFetch() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(),
    fetchComments()
  ]);
  return { user, posts, comments };
}

// Parallel dengan individual error handling
async function parallelWithErrorHandling() {
  const results = await Promise.allSettled([
    fetchUser(1),
    fetchPosts(),
    fetchComments()
  ]);
  
  const user = results[0].status === 'fulfilled' ? results[0].value : null;
  const posts = results[1].status === 'fulfilled' ? results[1].value : [];
  const comments = results[2].status === 'fulfilled' ? results[2].value : [];
  
  return { user, posts, comments };
}

// Mixed: Sequential dan Parallel
async function mixedFetch() {
  // Fetch user dulu (diperlukan untuk fetch orders)
  const user = await fetchUser(1);
  
  // Setelah dapat user, fetch orders dan profile secara parallel
  const [orders, profile] = await Promise.all([
    fetchOrders(user.id),
    fetchProfile(user.id)
  ]);
  
  return { user, orders, profile };
}`}
        </CodeBlock>
      </Section>

      {/* Best Practices */}
      <Section title="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Prefer Async/Await over Promises</strong>
            <CodeBlock language="javascript">
{`// ❌ Promise chains - harder to read
fetchUser(1)
  .then(user => fetchOrders(user.id))
  .then(orders => console.log(orders))
  .catch(error => console.error(error));

// Async/await - cleaner
async function getOrders() {
  try {
    const user = await fetchUser(1);
    const orders = await fetchOrders(user.id);
    console.log(orders);
  } catch (error) {
    console.error(error);
  }
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>2. Handle Errors Properly</strong>
            <CodeBlock language="javascript">
{`// Always handle errors
async function fetchData() {
  try {
    const data = await fetch('/api/data');
    return await data.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw new Error('Failed to fetch data');
  }
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Use Parallel Execution When Possible</strong>
            <CodeBlock language="javascript">
{`// ❌ Sequential when operations are independent
const user = await fetchUser();
const posts = await fetchPosts();

// Parallel for better performance
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts()
]);`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      {/* Summary */}
      <Section title="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Konsep Penting:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Asynchronous:</strong> Non-blocking operations untuk I/O tasks</li>
            <li><strong>Callbacks:</strong> Function yang dipass sebagai argument (old way, callback hell)</li>
            <li><strong>Promises:</strong> Object dengan state: pending, fulfilled, rejected</li>
            <li><strong>Promise Methods:</strong> .then(), .catch(), .finally() untuk handling</li>
            <li><strong>Promise.all():</strong> Tunggu semua promises, fail jika ada yang reject</li>
            <li><strong>Promise.race():</strong> Return promise tercepat (fulfilled/rejected)</li>
            <li><strong>Async/Await:</strong> Syntax sugar untuk promises, lebih readable</li>
            <li><strong>Try/Catch:</strong> Error handling dalam async/await</li>
            <li><strong>Parallel vs Sequential:</strong> Promise.all untuk operations yang independent</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
