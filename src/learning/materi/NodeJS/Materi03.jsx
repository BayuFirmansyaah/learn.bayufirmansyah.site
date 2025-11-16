import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi03() {
  return (
    <MateriLayout title="HTTP Module & Building Servers">
      <Section id="http-module" heading="HTTP Module">
        <p>
          Module <code>http</code> memungkinkan Node.js untuk transfer data melalui 
          Hyper Text Transfer Protocol (HTTP). Kita bisa create HTTP server dan client.
        </p>
      </Section>

      <Section id="basic-http-server" heading="Basic HTTP Server">
        <CodeBlock language="javascript">
{`const http = require('http');

const server = http.createServer((req, res) => {
  // req = request object
  // res = response object
  
  console.log('Request received');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\\n');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}/\`);
});`}
        </CodeBlock>
      </Section>

      <Section id="request-object" heading="Request Object">
        <CodeBlock language="javascript">
{`const http = require('http');

const server = http.createServer((req, res) => {
  // Request properties
  console.log('Method:', req.method);        // GET, POST, PUT, DELETE
  console.log('URL:', req.url);              // /path?query=value
  console.log('Headers:', req.headers);      // Request headers
  console.log('HTTP Version:', req.httpVersion);
  
  // Parse URL
  const url = new URL(req.url, \`http://\${req.headers.host}\`);
  console.log('Pathname:', url.pathname);    // /path
  console.log('Query:', url.searchParams);   // URLSearchParams object
  
  // Read request body (for POST/PUT)
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    console.log('Body:', body);
    res.end('Request processed');
  });
});

server.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="response-object" heading="Response Object">
        <CodeBlock language="javascript">
{`const http = require('http');

const server = http.createServer((req, res) => {
  // Set status code
  res.statusCode = 200;
  
  // Set headers
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Custom-Header', 'MyValue');
  
  // Or set multiple at once
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  
  // Send response
  res.write('Hello ');
  res.write('World!');
  res.end(); // Must call end()
  
  // Or combine write + end
  res.end('Hello World!');
});

server.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="routing" heading="Simple Routing">
        <CodeBlock language="javascript">
{`const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;
  
  // Route: GET /
  if (pathname === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home Page</h1>');
  }
  
  // Route: GET /about
  else if (pathname === '/about' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>About Page</h1>');
  }
  
  // Route: GET /api/users
  else if (pathname === '/api/users' && method === 'GET') {
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  }
  
  // Route: POST /api/users
  else if (pathname === '/api/users' && method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      const user = JSON.parse(body);
      console.log('New user:', user);
      
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User created', user }));
    });
  }
  
  // 404 Not Found
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`}
        </CodeBlock>
      </Section>

      <Section id="serving-files" heading="Serving Static Files">
        <CodeBlock language="javascript">
{`const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Build file path
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  
  // Get file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // Read and serve file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>');
      } else {
        // Server error
        res.writeHead(500);
        res.end(\`Server Error: \${err.code}\`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(3000, () => {
  console.log('Static file server running on port 3000');
});`}
        </CodeBlock>
      </Section>

      <Section id="http-methods" heading="Handling Different HTTP Methods">
        <CodeBlock language="javascript">
{`const http = require('http');

// In-memory data store
let todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build API', completed: false }
];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // GET /todos - Get all todos
  if (url === '/todos' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(todos));
  }
  
  // POST /todos - Create new todo
  else if (url === '/todos' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const newTodo = JSON.parse(body);
      newTodo.id = todos.length + 1;
      newTodo.completed = false;
      todos.push(newTodo);
      
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newTodo));
    });
  }
  
  // PUT /todos/:id - Update todo
  else if (url.startsWith('/todos/') && method === 'PUT') {
    const id = parseInt(url.split('/')[2]);
    let body = '';
    
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const updates = JSON.parse(body);
      const todoIndex = todos.findIndex(t => t.id === id);
      
      if (todoIndex !== -1) {
        todos[todoIndex] = { ...todos[todoIndex], ...updates };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos[todoIndex]));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Todo not found' }));
      }
    });
  }
  
  // DELETE /todos/:id - Delete todo
  else if (url.startsWith('/todos/') && method === 'DELETE') {
    const id = parseInt(url.split('/')[2]);
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Todo not found' }));
    }
  }
  
  // 404
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(3000, () => {
  console.log('Todo API running on port 3000');
});`}
        </CodeBlock>
      </Section>

      <Section id="http-client" heading="HTTP Client - Making Requests">
        <CodeBlock language="javascript">
{`const http = require('http');

// GET request
const options = {
  hostname: 'jsonplaceholder.typicode.com',
  port: 80,
  path: '/posts/1',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(\`Status Code: \${res.statusCode}\`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', JSON.parse(data));
  });
});

req.on('error', (err) => {
  console.error('Error:', err);
});

req.end();

// POST request
const postData = JSON.stringify({
  title: 'My Post',
  body: 'This is content',
  userId: 1
});

const postOptions = {
  hostname: 'jsonplaceholder.typicode.com',
  port: 80,
  path: '/posts',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const postReq = http.request(postOptions, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', JSON.parse(data)));
});

postReq.write(postData);
postReq.end();`}
        </CodeBlock>

        <Note type="tip">
          <strong>Alternative:</strong> Untuk production, gunakan libraries seperti 
          <code>axios</code> atau <code>node-fetch</code> yang lebih user-friendly.
        </Note>
      </Section>

      <Section id="https-module" heading="HTTPS Module">
        <CodeBlock language="javascript">
{`const https = require('https');
const fs = require('fs');

// Read SSL certificate
const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

// Create HTTPS server
const server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello Secure World!\\n');
});

server.listen(443, () => {
  console.log('HTTPS server running on port 443');
});

// Making HTTPS requests
https.get('https://api.github.com/users/github', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(JSON.parse(data));
  });
}).on('error', (err) => {
  console.error('Error:', err);
});`}
        </CodeBlock>
      </Section>

      <Section id="practical-example" heading="Practical Example: REST API">
        <CodeBlock language="javascript">
{`const http = require('http');
const url = require('url');

// Simple database
let products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Mouse', price: 20 }
];

// Helper functions
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function parseBody(req, callback) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => callback(JSON.parse(body)));
}

// Server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;
  
  // GET /api/products
  if (pathname === '/api/products' && method === 'GET') {
    sendJSON(res, 200, { products });
  }
  
  // GET /api/products/:id
  else if (pathname.match(/\\/api\\/products\\/\\d+/) && method === 'GET') {
    const id = parseInt(pathname.split('/')[3]);
    const product = products.find(p => p.id === id);
    
    if (product) {
      sendJSON(res, 200, { product });
    } else {
      sendJSON(res, 404, { error: 'Product not found' });
    }
  }
  
  // POST /api/products
  else if (pathname === '/api/products' && method === 'POST') {
    parseBody(req, (data) => {
      const newProduct = {
        id: products.length + 1,
        name: data.name,
        price: data.price
      };
      products.push(newProduct);
      sendJSON(res, 201, { product: newProduct });
    });
  }
  
  // PUT /api/products/:id
  else if (pathname.match(/\\/api\\/products\\/\\d+/) && method === 'PUT') {
    const id = parseInt(pathname.split('/')[3]);
    
    parseBody(req, (data) => {
      const index = products.findIndex(p => p.id === id);
      
      if (index !== -1) {
        products[index] = { ...products[index], ...data };
        sendJSON(res, 200, { product: products[index] });
      } else {
        sendJSON(res, 404, { error: 'Product not found' });
      }
    });
  }
  
  // DELETE /api/products/:id
  else if (pathname.match(/\\/api\\/products\\/\\d+/) && method === 'DELETE') {
    const id = parseInt(pathname.split('/')[3]);
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
      products.splice(index, 1);
      sendJSON(res, 200, { message: 'Product deleted' });
    } else {
      sendJSON(res, 404, { error: 'Product not found' });
    }
  }
  
  // 404
  else {
    sendJSON(res, 404, { error: 'Route not found' });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(\`API running on http://localhost:\${PORT}\`);
});`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Use framework</strong> seperti Express untuk production apps (lebih simple)</li>
          <li><strong>Always set Content-Type</strong> header untuk proper response handling</li>
          <li><strong>Handle errors</strong> untuk avoid server crashes</li>
          <li><strong>Use proper status codes</strong> (200, 201, 400, 404, 500, dll)</li>
          <li><strong>Enable CORS</strong> jika API akan diakses dari browser</li>
          <li><strong>Validate input</strong> sebelum process request</li>
          <li><strong>Use HTTPS</strong> untuk production servers</li>
          <li><strong>Set timeouts</strong> untuk avoid hanging connections</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Module <code>http</code> untuk create web servers dan clients</li>
          <li>Request object contains method, URL, headers, body</li>
          <li>Response object untuk send data back ke client</li>
          <li>Routing manual dengan check pathname dan method</li>
          <li>Serve static files dengan fs module dan MIME types</li>
          <li>Handle berbagai HTTP methods (GET, POST, PUT, DELETE)</li>
          <li>HTTPS module untuk secure connections</li>
          <li>Untuk production, better gunakan framework seperti Express</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
