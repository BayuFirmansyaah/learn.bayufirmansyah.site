import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi10() {
  return (
    <MateriLayout title="Express Request & Response Objects">
      <Section id="request-object" heading="Request Object (req)">
        <p>
          Request object represents HTTP request dan contains properties untuk 
          request query string, parameters, body, HTTP headers, dan lainnya.
        </p>
        
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

app.use(express.json());

app.all('/request-demo', (req, res) => {
  const requestInfo = {
    // Basic info
    method: req.method,           // GET, POST, PUT, DELETE, etc.
    url: req.url,                 // /request-demo?name=john
    originalUrl: req.originalUrl, // Full URL with query
    path: req.path,               // /request-demo
    baseUrl: req.baseUrl,         // Base URL if using router
    
    // Protocol & host
    protocol: req.protocol,       // http or https
    secure: req.secure,           // true if https
    hostname: req.hostname,       // localhost
    subdomains: req.subdomains,   // Array of subdomains
    
    // Client info
    ip: req.ip,                   // Client IP address
    ips: req.ips,                 // Array of IPs (if behind proxy)
    
    // Request parameters
    params: req.params,           // Route parameters
    query: req.query,             // Query string parameters
    body: req.body,               // Request body (needs middleware)
    
    // Headers
    headers: req.headers,
    contentType: req.get('Content-Type'),
    userAgent: req.get('User-Agent'),
    
    // Cookies (needs cookie-parser)
    cookies: req.cookies,
    signedCookies: req.signedCookies
  };
  
  res.json(requestInfo);
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="request-properties" heading="Request Properties & Methods">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

app.use(express.json());

// Route parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  // req.params contains route parameters
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Query parameters
app.get('/search', (req, res) => {
  // req.query contains query string params
  const { q, page, limit } = req.query;
  res.json({ q, page, limit });
  // GET /search?q=nodejs&page=1&limit=10
});

// Request body
app.post('/users', (req, res) => {
  // req.body contains parsed body (needs express.json())
  const { name, email } = req.body;
  res.json({ name, email });
});

// Headers
app.get('/headers', (req, res) => {
  // Get specific header
  const auth = req.get('Authorization');
  const contentType = req.get('Content-Type');
  
  res.json({ auth, contentType, all: req.headers });
});

// Check content type
app.post('/data', (req, res) => {
  if (req.is('json')) {
    res.send('JSON data');
  } else if (req.is('application/x-www-form-urlencoded')) {
    res.send('Form data');
  } else {
    res.send('Unknown type');
  }
});

// Accept header
app.get('/content', (req, res) => {
  if (req.accepts('html')) {
    res.send('<h1>HTML response</h1>');
  } else if (req.accepts('json')) {
    res.json({ message: 'JSON response' });
  } else {
    res.send('Not acceptable');
  }
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="response-object" heading="Response Object (res)">
        <p>
          Response object represents HTTP response yang dikirim oleh Express app 
          ketika menerima HTTP request.
        </p>
        
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// res.send() - Send response (auto sets Content-Type)
app.get('/send', (req, res) => {
  res.send('Plain text');           // text/html
  res.send({ key: 'value' });       // application/json
  res.send([1, 2, 3]);              // application/json
  res.send(Buffer.from('binary'));   // application/octet-stream
});

// res.json() - Send JSON response
app.get('/json', (req, res) => {
  res.json({ message: 'Success', data: [1, 2, 3] });
});

// res.status() - Set status code
app.get('/status', (req, res) => {
  res.status(201).json({ message: 'Created' });
  res.status(404).json({ error: 'Not found' });
  res.status(500).json({ error: 'Server error' });
});

// res.sendStatus() - Set status and send text
app.get('/sendstatus', (req, res) => {
  res.sendStatus(200); // Sends "OK"
  res.sendStatus(404); // Sends "Not Found"
  res.sendStatus(500); // Sends "Internal Server Error"
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="response-methods" heading="Response Methods">
        <CodeBlock language="javascript">
{`const express = require('express');
const path = require('path');
const app = express();

// 1. res.redirect() - Redirect to URL
app.get('/old-page', (req, res) => {
  res.redirect('/new-page');
});

app.get('/redirect-301', (req, res) => {
  res.redirect(301, 'https://example.com'); // Permanent redirect
});

app.get('/redirect-back', (req, res) => {
  res.redirect('back'); // Redirect to previous page
});

// 2. res.sendFile() - Send file
app.get('/file', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(filePath);
});

// 3. res.download() - Download file
app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'files', 'document.pdf');
  res.download(filePath);
  
  // With custom filename
  res.download(filePath, 'custom-name.pdf');
  
  // With callback
  res.download(filePath, (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).send('Error downloading file');
    }
  });
});

// 4. res.render() - Render template
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/render', (req, res) => {
  res.render('index', { title: 'Home', user: 'John' });
});

// 5. res.type() - Set Content-Type
app.get('/type', (req, res) => {
  res.type('text/plain').send('Plain text');
  res.type('json').send({ key: 'value' });
  res.type('html').send('<h1>HTML</h1>');
  res.type('.pdf').send(buffer);
});

// 6. res.format() - Content negotiation
app.get('/format', (req, res) => {
  res.format({
    'text/plain': () => {
      res.send('Plain text');
    },
    'text/html': () => {
      res.send('<h1>HTML</h1>');
    },
    'application/json': () => {
      res.json({ message: 'JSON' });
    },
    default: () => {
      res.status(406).send('Not acceptable');
    }
  });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="response-headers" heading="Setting Response Headers">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// res.set() or res.header() - Set single or multiple headers
app.get('/headers', (req, res) => {
  // Single header
  res.set('Content-Type', 'text/plain');
  
  // Multiple headers
  res.set({
    'Content-Type': 'application/json',
    'X-Custom-Header': 'MyValue',
    'X-Powered-By': 'Express'
  });
  
  res.send('Check response headers');
});

// Chain methods
app.get('/chain', (req, res) => {
  res
    .status(200)
    .set('Content-Type', 'application/json')
    .set('X-Request-Id', '12345')
    .json({ message: 'Success' });
});

// res.append() - Append to header
app.get('/append', (req, res) => {
  res.append('Link', '<http://example.com/>; rel="canonical"');
  res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
  res.send('Headers appended');
});

// res.location() - Set Location header
app.get('/location', (req, res) => {
  res.location('/users/123');
  res.status(201).send('Created');
});

// res.links() - Set Link header
app.get('/links', (req, res) => {
  res.links({
    next: 'http://api.example.com/users?page=2',
    last: 'http://api.example.com/users?page=5'
  });
  res.send('Check Link header');
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="cookies" heading="Working with Cookies">
        <CodeBlock language="bash">
{`npm install cookie-parser`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser('secret-key')); // For signed cookies

// res.cookie() - Set cookie
app.get('/set-cookie', (req, res) => {
  // Simple cookie
  res.cookie('name', 'John');
  
  // Cookie with options
  res.cookie('userId', '123', {
    maxAge: 900000,      // 15 minutes in milliseconds
    httpOnly: true,      // Not accessible via JavaScript
    secure: true,        // Only sent over HTTPS
    sameSite: 'strict',  // CSRF protection
    path: '/',           // Cookie path
    domain: '.example.com' // Cookie domain
  });
  
  // Signed cookie
  res.cookie('session', 'abc123', { signed: true });
  
  res.send('Cookies set');
});

// req.cookies - Read cookies
app.get('/get-cookies', (req, res) => {
  console.log('Cookies:', req.cookies);
  console.log('Signed cookies:', req.signedCookies);
  
  res.json({
    cookies: req.cookies,
    signedCookies: req.signedCookies
  });
});

// res.clearCookie() - Delete cookie
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('name');
  res.clearCookie('userId', { path: '/' });
  res.send('Cookies cleared');
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="file-upload" heading="File Upload">
        <CodeBlock language="bash">
{`npm install multer`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Single file upload
app.post('/upload', upload.single('avatar'), (req, res) => {
  console.log('File:', req.file);
  console.log('Body:', req.body);
  
  res.json({
    message: 'File uploaded',
    file: req.file
  });
});

// Multiple files upload
app.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
  console.log('Files:', req.files);
  
  res.json({
    message: 'Files uploaded',
    files: req.files
  });
});

// Multiple fields
app.post('/upload-fields', upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 8 }
]), (req, res) => {
  console.log('Files:', req.files);
  
  res.json({
    message: 'Files uploaded',
    files: req.files
  });
});

// Error handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="content-negotiation" heading="Content Negotiation">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];
  
  res.format({
    // Client accepts text/html
    'text/html': () => {
      const html = \`
        <ul>
          \${users.map(u => \`<li>\${u.name}</li>\`).join('')}
        </ul>
      \`;
      res.send(html);
    },
    
    // Client accepts application/json
    'application/json': () => {
      res.json(users);
    },
    
    // Client accepts text/plain
    'text/plain': () => {
      const text = users.map(u => u.name).join('\\n');
      res.send(text);
    },
    
    // Client accepts application/xml
    'application/xml': () => {
      const xml = \`
        <users>
          \${users.map(u => \`<user><id>\${u.id}</id><name>\${u.name}</name></user>\`).join('')}
        </users>
      \`;
      res.type('xml').send(xml);
    },
    
    // Default response
    default: () => {
      res.status(406).send('Not Acceptable');
    }
  });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="practical-example" heading="Practical Example: Complete CRUD API">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory database
let products = [
  { id: 1, name: 'Laptop', price: 1000, category: 'electronics' },
  { id: 2, name: 'Phone', price: 500, category: 'electronics' }
];

// GET /api/products - List with filtering, sorting, pagination
app.get('/api/products', (req, res) => {
  let result = [...products];
  
  // Filter by category
  if (req.query.category) {
    result = result.filter(p => p.category === req.query.category);
  }
  
  // Filter by price range
  if (req.query.minPrice) {
    result = result.filter(p => p.price >= parseFloat(req.query.minPrice));
  }
  if (req.query.maxPrice) {
    result = result.filter(p => p.price <= parseFloat(req.query.maxPrice));
  }
  
  // Sort
  if (req.query.sort) {
    const [field, order] = req.query.sort.split(':');
    result.sort((a, b) => {
      if (order === 'desc') {
        return b[field] > a[field] ? 1 : -1;
      }
      return a[field] > b[field] ? 1 : -1;
    });
  }
  
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedResult = result.slice(startIndex, endIndex);
  
  res.json({
    data: paginatedResult,
    pagination: {
      page,
      limit,
      total: result.length,
      totalPages: Math.ceil(result.length / limit)
    }
  });
});

// GET /api/products/:id - Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

// POST /api/products - Create product
app.post('/api/products', (req, res) => {
  const { name, price, category } = req.body;
  
  // Validation
  if (!name || !price || !category) {
    return res.status(400).json({ 
      error: 'Name, price, and category are required' 
    });
  }
  
  const newProduct = {
    id: products.length + 1,
    name,
    price: parseFloat(price),
    category
  };
  
  products.push(newProduct);
  
  res.status(201)
    .location(\`/api/products/\${newProduct.id}\`)
    .json(newProduct);
});

// PUT /api/products/:id - Update product
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const { name, price, category } = req.body;
  
  if (name) product.name = name;
  if (price) product.price = parseFloat(price);
  if (category) product.category = category;
  
  res.json(product);
});

// DELETE /api/products/:id - Delete product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  products.splice(index, 1);
  res.status(204).send();
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Validate input</strong> dari req.body, req.params, req.query</li>
          <li><strong>Use proper status codes</strong> untuk different scenarios</li>
          <li><strong>Set appropriate headers</strong> (Content-Type, Cache-Control, dll)</li>
          <li><strong>Use content negotiation</strong> untuk support multiple formats</li>
          <li><strong>Implement pagination</strong> untuk large datasets</li>
          <li><strong>Handle file uploads safely</strong> dengan validation</li>
          <li><strong>Set secure cookie options</strong> (httpOnly, secure, sameSite)</li>
          <li><strong>Always send response</strong> untuk avoid hanging requests</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Request object (req) contains all request data - params, query, body, headers</li>
          <li>Response object (res) provides methods untuk send responses</li>
          <li>Common response methods: send(), json(), status(), redirect(), sendFile()</li>
          <li>Set headers dengan set(), append(), location(), links()</li>
          <li>Cookies dengan cookie-parser - set dengan cookie(), clear dengan clearCookie()</li>
          <li>File uploads dengan multer - configure storage, limits, validation</li>
          <li>Content negotiation dengan format() untuk multiple response types</li>
          <li>Always validate input dan use proper status codes</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
