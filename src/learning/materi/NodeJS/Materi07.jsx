import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi07() {
  return (
    <MateriLayout title="Pengenalan Express.js">
      <Section id="what-is-express" heading="What is Express.js?">
        <p>
          Express.js adalah minimal dan flexible Node.js web application framework yang 
          menyediakan robust set of features untuk web dan mobile applications.
        </p>
        
        <Note type="info">
          <strong>Express.js:</strong> Most popular Node.js framework, digunakan oleh Netflix, 
          Uber, IBM, dan ribuan companies lainnya.
        </Note>
      </Section>

      <Section id="why-express" heading="Why Use Express?">
        <ul>
          <li><strong>Simple & Minimalist:</strong> Easy to learn, tidak opinionated</li>
          <li><strong>Middleware System:</strong> Powerful plugin architecture</li>
          <li><strong>Routing:</strong> Clean dan flexible routing system</li>
          <li><strong>Template Engines:</strong> Support berbagai template engines</li>
          <li><strong>Large Ecosystem:</strong> Thousands of middleware available via npm</li>
          <li><strong>Performance:</strong> Fast dan efficient</li>
          <li><strong>Community:</strong> Huge community dan extensive documentation</li>
        </ul>
      </Section>

      <Section id="installation" heading="Installation & Setup">
        <CodeBlock language="bash">
{`# Create project directory
mkdir my-express-app
cd my-express-app

# Initialize package.json
npm init -y

# Install Express
npm install express

# Install dev dependencies
npm install --save-dev nodemon`}
        </CodeBlock>

        <p>Update <code>package.json</code> scripts:</p>
        <CodeBlock language="json">
{`{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="hello-world" heading="Hello World with Express">
        <CodeBlock language="javascript">
{`// app.js
const express = require('express');
const app = express();

// Define route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`}
        </CodeBlock>

        <p>Run the server:</p>
        <CodeBlock language="bash">
{`npm run dev
# Server running on http://localhost:3000`}
        </CodeBlock>

        <Note type="tip">
          <strong>Nodemon:</strong> Automatically restarts server ketika ada file changes.
        </Note>
      </Section>

      <Section id="basic-routing" heading="Basic Routing">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// GET request
app.get('/', (req, res) => {
  res.send('Home Page');
});

// POST request
app.post('/api/users', (req, res) => {
  res.send('Create user');
});

// PUT request
app.put('/api/users/:id', (req, res) => {
  res.send(\`Update user \${req.params.id}\`);
});

// DELETE request
app.delete('/api/users/:id', (req, res) => {
  res.send(\`Delete user \${req.params.id}\`);
});

// Handle all methods for a route
app.all('/api/test', (req, res) => {
  res.send(\`Method: \${req.method}\`);
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="response-methods" heading="Response Methods">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Send plain text
app.get('/text', (req, res) => {
  res.send('Plain text response');
});

// Send JSON
app.get('/json', (req, res) => {
  res.json({ message: 'JSON response', data: [1, 2, 3] });
});

// Send status code
app.get('/status', (req, res) => {
  res.status(201).json({ message: 'Created' });
});

// Send file
app.get('/file', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Redirect
app.get('/old-page', (req, res) => {
  res.redirect('/new-page');
});

// Download file
app.get('/download', (req, res) => {
  res.download(__dirname + '/file.pdf');
});

// Set headers and send
app.get('/custom', (req, res) => {
  res
    .set('Content-Type', 'text/plain')
    .set('X-Custom-Header', 'MyValue')
    .send('Response with custom headers');
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="request-object" heading="Request Object">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

app.get('/request-info', (req, res) => {
  const info = {
    // Request properties
    method: req.method,           // GET, POST, etc.
    url: req.url,                 // /request-info?name=john
    path: req.path,               // /request-info
    originalUrl: req.originalUrl, // Full URL
    protocol: req.protocol,       // http or https
    hostname: req.hostname,       // localhost
    ip: req.ip,                   // Client IP
    
    // Headers
    headers: req.headers,
    userAgent: req.get('User-Agent'),
    
    // Query parameters (?name=john&age=25)
    query: req.query,
    
    // Route parameters (/:id)
    params: req.params,
    
    // Check request type
    isJson: req.is('json'),
    isHtml: req.is('html')
  };
  
  res.json(info);
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="middleware-intro" heading="Middleware Introduction">
        <p>
          Middleware adalah functions yang memiliki access ke request object (req), 
          response object (res), dan next middleware function dalam request-response cycle.
        </p>
        
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Simple middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // Pass control to next middleware
});

// Middleware that modifies request
app.use((req, res, next) => {
  req.customProperty = 'Added by middleware';
  next();
});

// Route handler
app.get('/', (req, res) => {
  res.send(\`Custom property: \${req.customProperty}\`);
});

app.listen(3000);`}
        </CodeBlock>

        <Note type="info">
          <strong>next():</strong> Must be called untuk pass control ke next middleware, 
          otherwise request will hang.
        </Note>
      </Section>

      <Section id="built-in-middleware" heading="Built-in Middleware">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Routes
app.post('/api/data', (req, res) => {
  console.log('Body:', req.body); // Parsed by express.json()
  res.json({ received: req.body });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="express-router" heading="Express Router">
        <CodeBlock language="javascript">
{`// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

router.get('/:id', (req, res) => {
  res.json({ message: \`Get user \${req.params.id}\` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create user', data: req.body });
});

router.put('/:id', (req, res) => {
  res.json({ message: \`Update user \${req.params.id}\` });
});

router.delete('/:id', (req, res) => {
  res.json({ message: \`Delete user \${req.params.id}\` });
});

module.exports = router;

// app.js
const express = require('express');
const app = express();
const usersRouter = require('./routes/users');

app.use(express.json());

// Mount router
app.use('/api/users', usersRouter);

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="environment-variables" heading="Environment Variables">
        <CodeBlock language="bash">
{`# Install dotenv
npm install dotenv`}
        </CodeBlock>

        <p>Create <code>.env</code> file:</p>
        <CodeBlock language="bash">
{`PORT=3000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/myapp
API_KEY=your-secret-key`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`// app.js
require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('Environment:', NODE_ENV);
console.log('Database URL:', process.env.DATABASE_URL);

app.get('/', (req, res) => {
  res.json({
    environment: NODE_ENV,
    apiKey: process.env.API_KEY
  });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
        </CodeBlock>

        <Note type="warning">
          <strong>Security:</strong> Never commit <code>.env</code> file ke git! 
          Add to <code>.gitignore</code>.
        </Note>
      </Section>

      <Section id="practical-example" heading="Practical Example: Simple API">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// In-memory database
let todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Learn Express', completed: false }
];

// Routes
// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Get single todo
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

// Create todo
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update todo
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed ?? todo.completed;
  
  res.json(todo);
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(index, 1);
  res.status(204).send();
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(\`Todo API running on port \${PORT}\`);
});`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Use Router</strong> untuk organize routes by feature</li>
          <li><strong>Separate concerns</strong> - routes, controllers, models</li>
          <li><strong>Use environment variables</strong> untuk configuration</li>
          <li><strong>Handle errors</strong> properly dengan error middleware</li>
          <li><strong>Validate input</strong> untuk prevent bad data</li>
          <li><strong>Use proper status codes</strong> (200, 201, 400, 404, 500, dll)</li>
          <li><strong>Enable CORS</strong> jika API diakses dari different origin</li>
          <li><strong>Use compression</strong> untuk better performance</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Express.js adalah minimal dan flexible Node.js framework</li>
          <li>Simple routing dengan <code>app.get()</code>, <code>app.post()</code>, dll</li>
          <li>Response methods: <code>send()</code>, <code>json()</code>, <code>status()</code></li>
          <li>Request object berisi method, URL, headers, params, query, body</li>
          <li>Middleware functions memproses requests sebelum reach route handlers</li>
          <li>Router untuk organize routes dalam modules</li>
          <li>Environment variables dengan dotenv untuk configuration</li>
          <li>Express significantly simplifies building web servers vs raw http module</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
