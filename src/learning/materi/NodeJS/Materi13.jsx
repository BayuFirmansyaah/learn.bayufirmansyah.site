import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi13() {
  return (
    <MateriLayout title="Error Handling & Debugging">
      <Section id="error-types" heading="Types of Errors">
        <ul>
          <li><strong>Syntax Errors:</strong> Code yang tidak valid, detected sebelum execution</li>
          <li><strong>Runtime Errors:</strong> Terjadi during execution (undefined variable, null reference)</li>
          <li><strong>Logic Errors:</strong> Code runs tapi produces wrong results</li>
          <li><strong>Async Errors:</strong> Errors dalam async operations (promises, callbacks)</li>
        </ul>
      </Section>

      <Section id="try-catch" heading="try...catch Statement">
        <CodeBlock language="javascript">
{`// Basic try-catch
try {
  const data = JSON.parse('invalid json');
} catch (error) {
  console.error('Error:', error.message);
}

// With finally
try {
  const file = openFile('data.txt');
  processFile(file);
} catch (error) {
  console.error('Error processing file:', error);
} finally {
  // Always executes (cleanup code)
  closeFile(file);
}

// Catch specific errors
try {
  riskyOperation();
} catch (error) {
  if (error instanceof TypeError) {
    console.error('Type error occurred');
  } else if (error instanceof ReferenceError) {
    console.error('Reference error occurred');
  } else {
    console.error('Unknown error:', error);
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="throwing-errors" heading="Throwing Errors">
        <CodeBlock language="javascript">
{`// Throw built-in Error
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (error) {
  console.error(error.message); // Division by zero
}

// Throw different error types
function validateUser(user) {
  if (!user) {
    throw new ReferenceError('User is undefined');
  }
  if (typeof user.age !== 'number') {
    throw new TypeError('Age must be a number');
  }
  if (user.age < 0) {
    throw new RangeError('Age cannot be negative');
  }
}

// Custom Error class
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.statusCode = 400;
  }
}

function validateEmail(email) {
  if (!email.includes('@')) {
    throw new ValidationError('Invalid email format', 'email');
  }
}

try {
  validateEmail('invalid');
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(\`\${error.field}: \${error.message}\`);
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="express-error-handling" heading="Express Error Handling">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

app.use(express.json());

// Synchronous error handling
app.get('/sync-error', (req, res) => {
  throw new Error('Synchronous error');
  // Express automatically catches and passes to error handler
});

// Async error handling (manual)
app.get('/async-error', async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    next(error); // Pass to error handler
  }
});

// Async error handling with wrapper
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

app.get('/user/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new Error('User not found');
  }
  res.json(user);
}));

// 404 handler (must be after all routes)
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handling middleware (must have 4 parameters!)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    error: {
      message,
      status,
      ...(process.env.NODE_ENV === 'development' && { 
        stack: err.stack,
        details: err
      })
    }
  });
});

app.listen(3000);`}
        </CodeBlock>

        <Note type="warning">
          <strong>Error middleware MUST have 4 parameters:</strong> (err, req, res, next)
        </Note>
      </Section>

      <Section id="custom-errors" heading="Custom Error Classes">
        <CodeBlock language="javascript">
{`// Base API Error class
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error classes
class NotFoundError extends APIError {
  constructor(resource = 'Resource') {
    super(\`\${resource} not found\`, 404);
  }
}

class ValidationError extends APIError {
  constructor(message, field) {
    super(message, 400);
    this.field = field;
  }
}

class UnauthorizedError extends APIError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

class ForbiddenError extends APIError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

class ConflictError extends APIError {
  constructor(message) {
    super(message, 409);
  }
}

// Usage in routes
const express = require('express');
const app = express();

app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError('User');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

app.post('/users', async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email || !email.includes('@')) {
      throw new ValidationError('Invalid email format', 'email');
    }
    
    const existing = await User.findByEmail(email);
    if (existing) {
      throw new ConflictError('User with this email already exists');
    }
    
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// Error handler
app.use((err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      error: {
        name: err.name,
        message: err.message,
        ...(err.field && { field: err.field })
      }
    });
  }
  
  // Unknown errors
  console.error('Unknown error:', err);
  res.status(500).json({
    error: {
      message: 'Internal Server Error'
    }
  });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="async-error-patterns" heading="Async Error Handling Patterns">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Pattern 1: try-catch
app.get('/pattern1/:id', async (req, res, next) => {
  try {
    const data = await fetchData(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Pattern 2: Async handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/pattern2/:id', asyncHandler(async (req, res) => {
  const data = await fetchData(req.params.id);
  res.json(data);
}));

// Pattern 3: express-async-errors (npm package)
// Just require it and all async errors are automatically caught
require('express-async-errors');

app.get('/pattern3/:id', async (req, res) => {
  const data = await fetchData(req.params.id); // Errors auto-caught
  res.json(data);
});

// Pattern 4: Promise chain
app.get('/pattern4/:id', (req, res, next) => {
  fetchData(req.params.id)
    .then(data => res.json(data))
    .catch(next);
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="debugging" heading="Debugging Techniques">
        <CodeBlock language="javascript">
{`// 1. Console logging
console.log('Debug info:', variable);
console.error('Error:', error);
console.warn('Warning:', warning);
console.table([{ id: 1, name: 'John' }]);
console.time('Operation');
// ... code
console.timeEnd('Operation'); // Operation: 123.456ms

// 2. Debug module
const debug = require('debug')('app:server');
debug('Server started on port %d', 3000);

// Run with: DEBUG=app:* node app.js

// 3. Node.js inspector
// Run: node --inspect app.js
// Or: node --inspect-brk app.js (breaks at first line)
// Open: chrome://inspect

// 4. VS Code debugging
// Create .vscode/launch.json:
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "\${workspaceFolder}/app.js",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}

// 5. Logging middleware
const morgan = require('morgan');
app.use(morgan('dev'));

// Custom logging middleware
app.use((req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next();
});

// 6. Error logging
app.use((err, req, res, next) => {
  console.error('Error details:');
  console.error('Message:', err.message);
  console.error('Stack:', err.stack);
  console.error('Request:', {
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query
  });
  next(err);
});`}
        </CodeBlock>
      </Section>

      <Section id="logging" heading="Production Logging">
        <CodeBlock language="bash">
{`npm install winston
npm install morgan`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const winston = require('winston');
const morgan = require('morgan');
const express = require('express');

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Write all logs to file
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

// Also log to console in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

const app = express();

// HTTP request logging with Morgan
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Request ID middleware
app.use((req, res, next) => {
  req.id = \`\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
  logger.info('Request started', {
    requestId: req.id,
    method: req.method,
    url: req.url
  });
  next();
});

// Routes
app.get('/test', (req, res) => {
  logger.info('Test route accessed', { requestId: req.id });
  res.json({ message: 'Success' });
});

// Error logging
app.use((err, req, res, next) => {
  logger.error('Error occurred', {
    requestId: req.id,
    error: {
      message: err.message,
      stack: err.stack,
      statusCode: err.statusCode
    },
    request: {
      method: req.method,
      url: req.url,
      body: req.body
    }
  });
  
  res.status(err.statusCode || 500).json({
    error: {
      message: err.message,
      requestId: req.id
    }
  });
});

app.listen(3000);

// Export logger for use in other modules
module.exports = { logger };`}
        </CodeBlock>
      </Section>

      <Section id="error-monitoring" heading="Error Monitoring Services">
        <CodeBlock language="bash">
{`# Popular error monitoring services
npm install @sentry/node
npm install newrelic
npm install rollbar`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`// Sentry integration
const Sentry = require('@sentry/node');
const express = require('express');

const app = express();

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0
});

// Request handler must be first middleware
app.use(Sentry.Handlers.requestHandler());

// Routes
app.get('/test', (req, res) => {
  res.json({ message: 'Success' });
});

app.get('/error', (req, res) => {
  throw new Error('Test error for Sentry');
});

// Error handler must be before other error middleware
app.use(Sentry.Handlers.errorHandler());

// Custom error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message
  });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="practical-example" heading="Complete Error Handling System">
        <CodeBlock language="javascript">
{`const express = require('express');
const winston = require('winston');

// Custom error classes
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends APIError {
  constructor(resource = 'Resource') {
    super(\`\${resource} not found\`, 404);
  }
}

class ValidationError extends APIError {
  constructor(errors) {
    super('Validation failed', 400);
    this.errors = errors;
  }
}

// Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// Async handler
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const app = express();
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  req.startTime = Date.now();
  logger.info(\`\${req.method} \${req.url}\`);
  next();
});

// Routes
app.get('/users/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Simulate database query
  const user = await findUser(id);
  
  if (!user) {
    throw new NotFoundError('User');
  }
  
  res.json(user);
}));

app.post('/users', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Validation
  const errors = [];
  if (!email || !email.includes('@')) {
    errors.push({ field: 'email', message: 'Invalid email' });
  }
  if (!password || password.length < 6) {
    errors.push({ field: 'password', message: 'Password too short' });
  }
  
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  
  const user = await createUser({ email, password });
  res.status(201).json(user);
}));

// 404 handler
app.use((req, res, next) => {
  throw new NotFoundError('Route');
});

// Error handler
app.use((err, req, res, next) => {
  // Log error
  logger.error('Error occurred', {
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack
    },
    request: {
      method: req.method,
      url: req.url,
      body: req.body
    },
    duration: Date.now() - req.startTime
  });
  
  // Handle different error types
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: {
        message: err.message,
        errors: err.errors
      }
    });
  }
  
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message
      }
    });
  }
  
  // Unknown errors
  res.status(500).json({
    error: {
      message: 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { 
        details: err.message 
      })
    }
  });
});

// Graceful shutdown
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection:', { reason, promise });
  process.exit(1);
});

const server = app.listen(3000, () => {
  logger.info('Server started on port 3000');
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

// Mock functions
async function findUser(id) {
  return id === '1' ? { id: 1, name: 'John' } : null;
}

async function createUser(data) {
  return { id: 1, ...data };
}`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Always use try-catch</strong> untuk async operations</li>
          <li><strong>Create custom error classes</strong> untuk different scenarios</li>
          <li><strong>Log all errors</strong> dengan context information</li>
          <li><strong>Never expose sensitive info</strong> dalam error messages</li>
          <li><strong>Use error monitoring services</strong> in production</li>
          <li><strong>Handle 404s explicitly</strong> dengan dedicated middleware</li>
          <li><strong>Implement graceful shutdown</strong> untuk cleanup</li>
          <li><strong>Use async error handlers</strong> atau express-async-errors</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Use try-catch untuk handle synchronous dan async errors</li>
          <li>Create custom error classes yang extend Error</li>
          <li>Express error middleware must have 4 parameters</li>
          <li>Use async handler wrapper untuk cleaner code</li>
          <li>Implement structured logging dengan Winston</li>
          <li>Use error monitoring services (Sentry, etc.) in production</li>
          <li>Always log errors dengan request context</li>
          <li>Handle uncaughtException dan unhandledRejection events</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
