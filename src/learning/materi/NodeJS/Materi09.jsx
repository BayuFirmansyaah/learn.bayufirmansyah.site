import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi09() {
  return (
    <MateriLayout title="Express Middleware">
      <Section id="what-is-middleware" heading="What is Middleware?">
        <p>
          Middleware adalah functions yang memiliki access ke request object (req), 
          response object (res), dan next middleware function dalam application's 
          request-response cycle.
        </p>
        
        <CodeBlock language="javascript">
{`// Basic middleware structure
function myMiddleware(req, res, next) {
  // Do something
  console.log('Middleware executed');
  
  // Pass control to next middleware
  next();
}

// Or terminate the request-response cycle
function authMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}`}
        </CodeBlock>

        <Note type="info">
          <strong>Middleware can:</strong>
          <ul>
            <li>Execute any code</li>
            <li>Modify req dan res objects</li>
            <li>End request-response cycle</li>
            <li>Call next middleware in stack</li>
          </ul>
        </Note>
      </Section>

      <Section id="application-middleware" heading="Application-Level Middleware">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Middleware for all routes
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  console.log('Time:', Date.now());
  next();
});

// Middleware for specific path
app.use('/admin', (req, res, next) => {
  console.log('Admin route accessed');
  next();
});

// Multiple middleware functions
app.use(
  (req, res, next) => {
    console.log('First middleware');
    next();
  },
  (req, res, next) => {
    console.log('Second middleware');
    next();
  }
);

// Routes
app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/admin/dashboard', (req, res) => {
  res.send('Admin Dashboard');
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="router-middleware" heading="Router-Level Middleware">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();
const router = express.Router();

// Middleware for all routes in this router
router.use((req, res, next) => {
  console.log('Router middleware');
  next();
});

// Middleware for specific routes
router.use('/users/:id', (req, res, next) => {
  console.log(\`Accessing user \${req.params.id}\`);
  next();
});

// Routes
router.get('/users', (req, res) => {
  res.json({ users: [] });
});

router.get('/users/:id', (req, res) => {
  res.json({ user: { id: req.params.id } });
});

// Mount router
app.use('/api', router);

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="built-in-middleware" heading="Built-in Middleware">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// 1. express.json() - Parse JSON request bodies
app.use(express.json());

// 2. express.urlencoded() - Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// 3. express.static() - Serve static files
app.use(express.static('public'));

// Multiple static directories
app.use('/assets', express.static('assets'));
app.use('/files', express.static('files'));

// Routes
app.post('/api/data', (req, res) => {
  console.log(req.body); // Available because of express.json()
  res.json({ received: req.body });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="third-party-middleware" heading="Third-Party Middleware">
        <CodeBlock language="bash">
{`# Install popular middleware packages
npm install cors
npm install morgan
npm install helmet
npm install compression
npm install cookie-parser`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const app = express();

// 1. CORS - Enable Cross-Origin Resource Sharing
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

// 2. Morgan - HTTP request logger
app.use(morgan('dev')); // 'combined', 'common', 'dev', 'short', 'tiny'

// 3. Helmet - Security headers
app.use(helmet());

// 4. Compression - Gzip compression
app.use(compression());

// 5. Cookie Parser - Parse cookies
app.use(cookieParser());

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  console.log('Cookies:', req.cookies);
  res.json({ message: 'All middleware active' });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="custom-middleware" heading="Custom Middleware">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// 1. Logger middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(\`[\${timestamp}] \${req.method} \${req.url}\`);
  next();
};

// 2. Request timing middleware
const requestTimer = (req, res, next) => {
  req.startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - req.startTime;
    console.log(\`Request took \${duration}ms\`);
  });
  
  next();
};

// 3. Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // Verify token (simplified)
  if (token === 'Bearer valid-token') {
    req.user = { id: 1, name: 'John' };
    next();
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// 4. Role-based authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    next();
  };
};

// 5. Validate request body
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

// Use middleware
app.use(logger);
app.use(requestTimer);

// Public route
app.get('/public', (req, res) => {
  res.json({ message: 'Public route' });
});

// Protected route
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

// Admin only route
app.get('/admin', 
  authenticate, 
  authorize('admin'), 
  (req, res) => {
    res.json({ message: 'Admin route' });
  }
);

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="error-handling-middleware" heading="Error-Handling Middleware">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

app.use(express.json());

// Routes
app.get('/error', (req, res, next) => {
  // Pass error to error handler
  const error = new Error('Something went wrong!');
  error.status = 500;
  next(error);
});

app.get('/async-error', async (req, res, next) => {
  try {
    throw new Error('Async error');
  } catch (error) {
    next(error);
  }
});

// 404 handler (must be after all routes)
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handling middleware (must have 4 parameters!)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    error: {
      message,
      status,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

app.listen(3000);`}
        </CodeBlock>

        <Note type="warning">
          <strong>Error middleware must have 4 parameters:</strong> <code>(err, req, res, next)</code>
        </Note>
      </Section>

      <Section id="async-error-handling" heading="Async Error Handling">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Wrapper for async route handlers
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Or install express-async-handler
// npm install express-async-handler
// const asyncHandler = require('express-async-handler');

// Async routes without try-catch
app.get('/users', asyncHandler(async (req, res) => {
  // Simulate database query
  const users = await fetchUsersFromDB();
  res.json(users);
}));

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await fetchUserById(req.params.id);
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }
  res.json(user);
}));

// Simulated async functions
async function fetchUsersFromDB() {
  return [{ id: 1, name: 'John' }];
}

async function fetchUserById(id) {
  return { id, name: 'John' };
}

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message
  });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="middleware-order" heading="Middleware Execution Order">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// 1. First - Global middleware
app.use((req, res, next) => {
  console.log('1. Global middleware');
  next();
});

// 2. Built-in middleware
app.use(express.json());

// 3. Third-party middleware
// app.use(cors());
// app.use(morgan('dev'));

// 4. Custom middleware
app.use((req, res, next) => {
  console.log('4. Custom middleware');
  req.customData = 'Added by middleware';
  next();
});

// 5. Route-specific middleware
app.get('/test',
  (req, res, next) => {
    console.log('5. Route middleware 1');
    next();
  },
  (req, res, next) => {
    console.log('6. Route middleware 2');
    next();
  },
  (req, res) => {
    console.log('7. Route handler');
    res.json({ data: req.customData });
  }
);

// 8. 404 handler
app.use((req, res, next) => {
  console.log('8. 404 handler');
  res.status(404).json({ error: 'Not found' });
});

// 9. Error handler
app.use((err, req, res, next) => {
  console.log('9. Error handler');
  res.status(500).json({ error: err.message });
});

app.listen(3000);`}
        </CodeBlock>

        <Note type="tip">
          <strong>Order matters!</strong> Middleware executes in the order it's defined.
        </Note>
      </Section>

      <Section id="practical-example" heading="Practical Example: Complete Middleware Setup">
        <CodeBlock language="javascript">
{`const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

// 1. Security & CORS
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));

// 2. Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// 3. Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. Request tracking
app.use((req, res, next) => {
  req.requestId = \`\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
  console.log(\`[\${req.requestId}] \${req.method} \${req.url}\`);
  next();
});

// 5. API key validation (for specific routes)
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  next();
};

// 6. Rate limiting (simple implementation)
const rateLimits = new Map();

const rateLimit = (maxRequests = 100, windowMs = 60000) => {
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    
    if (!rateLimits.has(key)) {
      rateLimits.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const limit = rateLimits.get(key);
    
    if (now > limit.resetTime) {
      limit.count = 1;
      limit.resetTime = now + windowMs;
      return next();
    }
    
    if (limit.count >= maxRequests) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    
    limit.count++;
    next();
  };
};

// Public routes
app.get('/public', (req, res) => {
  res.json({ message: 'Public endpoint' });
});

// Protected routes with API key
app.use('/api', validateApiKey, rateLimit(100, 60000));

app.get('/api/data', (req, res) => {
  res.json({ data: 'Protected data' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    requestId: req.requestId
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(\`[\${req.requestId}] Error:\`, err);
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    requestId: req.requestId,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Order middleware correctly</strong> - security first, then parsing, then routes</li>
          <li><strong>Always call next()</strong> atau send response untuk avoid hanging requests</li>
          <li><strong>Use error middleware</strong> dengan 4 parameters untuk handle errors</li>
          <li><strong>Keep middleware focused</strong> - single responsibility</li>
          <li><strong>Use async handlers</strong> untuk properly handle async errors</li>
          <li><strong>Add logging</strong> untuk better debugging</li>
          <li><strong>Implement security middleware</strong> (helmet, cors, rate limiting)</li>
          <li><strong>Validate input early</strong> dengan validation middleware</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Middleware functions have access to req, res, dan next</li>
          <li>Application-level middleware dengan <code>app.use()</code></li>
          <li>Router-level middleware dengan <code>router.use()</code></li>
          <li>Built-in middleware: json, urlencoded, static</li>
          <li>Third-party middleware: cors, morgan, helmet, compression</li>
          <li>Custom middleware untuk authentication, validation, logging</li>
          <li>Error-handling middleware must have 4 parameters</li>
          <li>Middleware order is critical untuk proper execution</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
