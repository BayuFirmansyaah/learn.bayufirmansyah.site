import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi14() {
  return (
    <MateriLayout title="REST API Design & Best Practices">
      <Section id="what-is-rest" heading="What is REST?">
        <p>
          REST (Representational State Transfer) adalah architectural style untuk designing networked applications. 
          REST API uses HTTP methods untuk perform operations on resources.
        </p>
        
        <ul>
          <li><strong>Stateless:</strong> Each request contains all necessary information</li>
          <li><strong>Client-Server:</strong> Separation of concerns</li>
          <li><strong>Cacheable:</strong> Responses can be cached</li>
          <li><strong>Uniform Interface:</strong> Consistent way to interact with resources</li>
          <li><strong>Layered System:</strong> Client doesn't know if connected directly to end server</li>
        </ul>
      </Section>

      <Section id="http-methods" heading="HTTP Methods">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

app.use(express.json());

// GET - Retrieve resource(s)
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.get('/api/users/:id', (req, res) => {
  res.json({ user: { id: req.params.id } });
});

// POST - Create new resource
app.post('/api/users', (req, res) => {
  const user = req.body;
  // Create user in database
  res.status(201).json(user);
});

// PUT - Update entire resource
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  // Replace entire user
  res.json({ id, ...userData });
});

// PATCH - Partially update resource
app.patch('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  // Update only provided fields
  res.json({ id, updates });
});

// DELETE - Remove resource
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  // Delete user from database
  res.status(204).send();
});

app.listen(3000);`}
        </CodeBlock>

        <Note type="info">
          <strong>HTTP Methods:</strong>
          <ul>
            <li>GET: Safe, idempotent - retrieve data</li>
            <li>POST: Not safe, not idempotent - create data</li>
            <li>PUT: Not safe, idempotent - replace data</li>
            <li>PATCH: Not safe, not idempotent - update data</li>
            <li>DELETE: Not safe, idempotent - delete data</li>
          </ul>
        </Note>
      </Section>

      <Section id="resource-naming" heading="Resource Naming Conventions">
        <CodeBlock language="javascript">
{`// ✅ Good - Use nouns, not verbs
GET    /api/users              // Get all users
GET    /api/users/:id          // Get user by ID
POST   /api/users              // Create user
PUT    /api/users/:id          // Update user
DELETE /api/users/:id          // Delete user

// Collection and document pattern
GET    /api/users              // Collection
GET    /api/users/:id          // Document
GET    /api/users/:id/posts    // Nested collection
GET    /api/users/:id/posts/:postId  // Nested document

// ❌ Bad - Don't use verbs
GET    /api/getUsers
POST   /api/createUser
PUT    /api/updateUser/:id
DELETE /api/deleteUser/:id

// ✅ Good - Use plural nouns
/api/users
/api/products
/api/orders

// ✅ Good - Use hyphens for multi-word resources
/api/blog-posts
/api/user-profiles
/api/order-items

// ❌ Bad - Don't use underscores or camelCase in URLs
/api/blog_posts
/api/blogPosts`}
        </CodeBlock>
      </Section>

      <Section id="status-codes" heading="HTTP Status Codes">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

app.use(express.json());

// 2xx Success
app.get('/success', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

app.post('/created', (req, res) => {
  res.status(201).json({ message: 'Created', id: 123 });
});

app.delete('/no-content', (req, res) => {
  res.status(204).send(); // No content
});

// 3xx Redirection
app.get('/redirect', (req, res) => {
  res.redirect(301, '/new-location'); // Permanent redirect
  res.redirect(302, '/temporary');     // Temporary redirect
});

// 4xx Client Errors
app.get('/bad-request', (req, res) => {
  res.status(400).json({ error: 'Bad Request' });
});

app.get('/unauthorized', (req, res) => {
  res.status(401).json({ error: 'Unauthorized' });
});

app.get('/forbidden', (req, res) => {
  res.status(403).json({ error: 'Forbidden' });
});

app.get('/not-found', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.post('/conflict', (req, res) => {
  res.status(409).json({ error: 'Conflict - Resource already exists' });
});

app.post('/validation-error', (req, res) => {
  res.status(422).json({ 
    error: 'Validation Error',
    details: [
      { field: 'email', message: 'Invalid email' }
    ]
  });
});

app.get('/rate-limit', (req, res) => {
  res.status(429).json({ error: 'Too Many Requests' });
});

// 5xx Server Errors
app.get('/server-error', (req, res) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

app.get('/not-implemented', (req, res) => {
  res.status(501).json({ error: 'Not Implemented' });
});

app.get('/service-unavailable', (req, res) => {
  res.status(503).json({ error: 'Service Unavailable' });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="response-format" heading="Response Format">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Consistent response structure
const successResponse = (data, message = 'Success') => ({
  success: true,
  message,
  data
});

const errorResponse = (message, errors = null) => ({
  success: false,
  message,
  ...(errors && { errors })
});

// Success responses
app.get('/api/users', (req, res) => {
  const users = [{ id: 1, name: 'John' }];
  res.json(successResponse(users, 'Users retrieved successfully'));
});

app.get('/api/users/:id', (req, res) => {
  const user = { id: 1, name: 'John' };
  res.json(successResponse(user));
});

app.post('/api/users', (req, res) => {
  const user = { id: 1, ...req.body };
  res.status(201).json(successResponse(user, 'User created successfully'));
});

// Error responses
app.get('/api/users/:id', (req, res) => {
  res.status(404).json(errorResponse('User not found'));
});

app.post('/api/users', (req, res) => {
  const errors = [
    { field: 'email', message: 'Email is required' },
    { field: 'password', message: 'Password too short' }
  ];
  res.status(422).json(errorResponse('Validation failed', errors));
});

// Pagination response
app.get('/api/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const total = 100;
  
  res.json({
    success: true,
    data: [/* products */],
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="filtering-sorting-pagination" heading="Filtering, Sorting & Pagination">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Mock database
let products = [
  { id: 1, name: 'Laptop', price: 1000, category: 'electronics', inStock: true },
  { id: 2, name: 'Phone', price: 500, category: 'electronics', inStock: false },
  { id: 3, name: 'Shirt', price: 30, category: 'clothing', inStock: true },
  { id: 4, name: 'Shoes', price: 80, category: 'clothing', inStock: true }
];

app.get('/api/products', (req, res) => {
  let result = [...products];
  
  // 1. Filtering
  // ?category=electronics
  if (req.query.category) {
    result = result.filter(p => p.category === req.query.category);
  }
  
  // ?inStock=true
  if (req.query.inStock !== undefined) {
    const inStock = req.query.inStock === 'true';
    result = result.filter(p => p.inStock === inStock);
  }
  
  // ?minPrice=50&maxPrice=500
  if (req.query.minPrice) {
    result = result.filter(p => p.price >= parseFloat(req.query.minPrice));
  }
  if (req.query.maxPrice) {
    result = result.filter(p => p.price <= parseFloat(req.query.maxPrice));
  }
  
  // 2. Searching
  // ?search=laptop
  if (req.query.search) {
    const search = req.query.search.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(search)
    );
  }
  
  // 3. Sorting
  // ?sort=price or ?sort=-price (descending)
  if (req.query.sort) {
    const sortField = req.query.sort.replace('-', '');
    const sortOrder = req.query.sort.startsWith('-') ? -1 : 1;
    
    result.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1 * sortOrder;
      if (a[sortField] > b[sortField]) return 1 * sortOrder;
      return 0;
    });
  }
  
  // 4. Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const total = result.length;
  const paginatedResult = result.slice(startIndex, endIndex);
  
  // 5. Field selection
  // ?fields=id,name,price
  if (req.query.fields) {
    const fields = req.query.fields.split(',');
    paginatedResult = paginatedResult.map(item => {
      const selectedFields = {};
      fields.forEach(field => {
        if (item[field] !== undefined) {
          selectedFields[field] = item[field];
        }
      });
      return selectedFields;
    });
  }
  
  res.json({
    success: true,
    data: paginatedResult,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: endIndex < total,
      hasPrev: page > 1
    },
    filters: {
      category: req.query.category,
      inStock: req.query.inStock,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      search: req.query.search
    }
  });
});

app.listen(3000);

// Example requests:
// GET /api/products?category=electronics
// GET /api/products?category=electronics&inStock=true
// GET /api/products?minPrice=50&maxPrice=500
// GET /api/products?search=laptop
// GET /api/products?sort=price
// GET /api/products?sort=-price
// GET /api/products?page=2&limit=5
// GET /api/products?fields=id,name,price
// GET /api/products?category=electronics&sort=price&page=1&limit=10`}
        </CodeBlock>
      </Section>

      <Section id="versioning" heading="API Versioning">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Method 1: URL Versioning (Most common)
app.get('/api/v1/users', (req, res) => {
  res.json({ version: 'v1', users: [] });
});

app.get('/api/v2/users', (req, res) => {
  res.json({ version: 'v2', users: [], metadata: {} });
});

// Method 2: Header Versioning
app.get('/api/users', (req, res) => {
  const version = req.headers['api-version'] || 'v1';
  
  if (version === 'v1') {
    res.json({ version: 'v1', users: [] });
  } else if (version === 'v2') {
    res.json({ version: 'v2', users: [], metadata: {} });
  }
});

// Method 3: Accept Header (Content Negotiation)
app.get('/api/users', (req, res) => {
  const acceptHeader = req.headers['accept'];
  
  if (acceptHeader.includes('application/vnd.api.v1+json')) {
    res.json({ version: 'v1', users: [] });
  } else if (acceptHeader.includes('application/vnd.api.v2+json')) {
    res.json({ version: 'v2', users: [] });
  }
});

// Organized with routers
const v1Router = express.Router();
const v2Router = express.Router();

v1Router.get('/users', (req, res) => {
  res.json({ version: 'v1', users: [] });
});

v2Router.get('/users', (req, res) => {
  res.json({ version: 'v2', users: [], metadata: {} });
});

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

app.listen(3000);`}
        </CodeBlock>

        <Note type="tip">
          <strong>Best Practice:</strong> URL versioning (/api/v1/) adalah most common dan easiest to implement.
        </Note>
      </Section>

      <Section id="hateoas" heading="HATEOAS (Hypermedia)">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// HATEOAS - Include links to related resources
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  res.json({
    data: {
      id,
      name: 'John Doe',
      email: 'john@example.com'
    },
    links: {
      self: \`/api/users/\${id}\`,
      posts: \`/api/users/\${id}/posts\`,
      comments: \`/api/users/\${id}/comments\`,
      update: {
        href: \`/api/users/\${id}\`,
        method: 'PUT'
      },
      delete: {
        href: \`/api/users/\${id}\`,
        method: 'DELETE'
      }
    }
  });
});

// Collection with links
app.get('/api/users', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  
  res.json({
    data: [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ],
    links: {
      self: \`/api/users?page=\${page}\`,
      next: page < 10 ? \`/api/users?page=\${page + 1}\` : null,
      prev: page > 1 ? \`/api/users?page=\${page - 1}\` : null,
      first: '/api/users?page=1',
      last: '/api/users?page=10'
    }
  });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="authentication" heading="Authentication in REST APIs">
        <CodeBlock language="javascript">
{`const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const SECRET_KEY = 'your-secret-key';

// 1. API Key Authentication
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  next();
};

// 2. Bearer Token (JWT) Authentication
const jwtAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Validate credentials (simplified)
  if (email === 'user@example.com' && password === 'password') {
    const token = jwt.sign(
      { id: 1, email },
      SECRET_KEY,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      token,
      user: { id: 1, email }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Protected routes
app.get('/api/users', jwtAuth, (req, res) => {
  res.json({ users: [], requestedBy: req.user });
});

app.get('/api/admin', jwtAuth, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  res.json({ message: 'Admin data' });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="rate-limiting" heading="Rate Limiting">
        <CodeBlock language="bash">
{`npm install express-rate-limit`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Basic rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false
});

// Apply to all routes
app.use(limiter);

// Different limits for different routes
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true // Don't count successful requests
});

app.post('/api/auth/login', authLimiter, (req, res) => {
  res.json({ message: 'Login' });
});

app.post('/api/auth/register', strictLimiter, (req, res) => {
  res.json({ message: 'Register' });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="complete-example" heading="Complete REST API Example">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

app.use(express.json());

// Mock database
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' }
];

// Helper functions
const findUser = (id) => users.find(u => u.id === parseInt(id));
const findUserByEmail = (email) => users.find(u => u.email === email);

// GET /api/users - List users with filtering & pagination
app.get('/api/users', (req, res) => {
  let result = [...users];
  
  // Filter by role
  if (req.query.role) {
    result = result.filter(u => u.role === req.query.role);
  }
  
  // Search
  if (req.query.search) {
    const search = req.query.search.toLowerCase();
    result = result.filter(u => 
      u.name.toLowerCase().includes(search) ||
      u.email.toLowerCase().includes(search)
    );
  }
  
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const total = result.length;
  const startIndex = (page - 1) * limit;
  
  result = result.slice(startIndex, startIndex + limit);
  
  res.json({
    success: true,
    data: result,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});

// GET /api/users/:id - Get single user
app.get('/api/users/:id', (req, res) => {
  const user = findUser(req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: user,
    links: {
      self: \`/api/users/\${user.id}\`,
      update: { href: \`/api/users/\${user.id}\`, method: 'PUT' },
      delete: { href: \`/api/users/\${user.id}\`, method: 'DELETE' }
    }
  });
});

// POST /api/users - Create user
app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body;
  
  // Validation
  const errors = [];
  if (!name) errors.push({ field: 'name', message: 'Name is required' });
  if (!email || !email.includes('@')) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  
  if (errors.length > 0) {
    return res.status(422).json({
      success: false,
      error: 'Validation failed',
      errors
    });
  }
  
  // Check if email exists
  if (findUserByEmail(email)) {
    return res.status(409).json({
      success: false,
      error: 'User with this email already exists'
    });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: role || 'user'
  };
  
  users.push(newUser);
  
  res.status(201)
    .location(\`/api/users/\${newUser.id}\`)
    .json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
});

// PUT /api/users/:id - Update user
app.put('/api/users/:id', (req, res) => {
  const user = findUser(req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  const { name, email, role } = req.body;
  
  // Validation
  if (email && email !== user.email && findUserByEmail(email)) {
    return res.status(409).json({
      success: false,
      error: 'Email already in use'
    });
  }
  
  // Update user
  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;
  
  res.json({
    success: true,
    message: 'User updated successfully',
    data: user
  });
});

// DELETE /api/users/:id - Delete user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  users.splice(index, 1);
  res.status(204).send();
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(3000, () => {
  console.log('API running on port 3000');
});`}
        </CodeBlock>
      </Section>

      <Section id="best-practices-summary" heading="REST API Best Practices">
        <ul>
          <li><strong>Use nouns for resources</strong>, not verbs</li>
          <li><strong>Use plural nouns</strong> untuk collections</li>
          <li><strong>Use HTTP methods correctly</strong> (GET, POST, PUT, DELETE)</li>
          <li><strong>Return appropriate status codes</strong> (200, 201, 404, 500, dll)</li>
          <li><strong>Version your API</strong> (/api/v1/)</li>
          <li><strong>Implement pagination</strong> untuk large datasets</li>
          <li><strong>Support filtering dan sorting</strong></li>
          <li><strong>Use consistent response format</strong></li>
          <li><strong>Implement proper error handling</strong></li>
          <li><strong>Secure your API</strong> (authentication, rate limiting)</li>
          <li><strong>Document your API</strong> (Swagger, Postman)</li>
          <li><strong>Use HTTPS</strong> in production</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>REST uses HTTP methods untuk operations: GET, POST, PUT, PATCH, DELETE</li>
          <li>Use nouns untuk resource names, plural form untuk collections</li>
          <li>Return proper HTTP status codes untuk different scenarios</li>
          <li>Implement filtering, sorting, dan pagination untuk large datasets</li>
          <li>Use consistent response format across all endpoints</li>
          <li>Version your API dengan URL versioning (/api/v1/)</li>
          <li>Implement authentication (JWT, API keys) untuk security</li>
          <li>Use rate limiting untuk prevent abuse</li>
          <li>Include HATEOAS links untuk better API discoverability</li>
          <li>Document API dengan tools like Swagger</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
