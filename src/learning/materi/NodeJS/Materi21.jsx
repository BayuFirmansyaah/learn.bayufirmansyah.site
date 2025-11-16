import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi21() {
  return (
    <MateriLayout title="Logging & Debugging">
      <Section id="why-logging" heading="Why Logging?">
        <ul>
          <li><strong>Debugging:</strong> Track down bugs dan errors</li>
          <li><strong>Monitoring:</strong> Monitor application health</li>
          <li><strong>Auditing:</strong> Track user activities</li>
          <li><strong>Performance:</strong> Identify bottlenecks</li>
          <li><strong>Security:</strong> Detect suspicious activities</li>
        </ul>
      </Section>

      <Section id="console-logging" heading="Basic Console Logging">
        <CodeBlock language="javascript">
{`// Console methods
console.log('Info message');
console.info('Information');
console.warn('Warning message');
console.error('Error occurred');
console.debug('Debug info');

// Object logging
const user = { id: 1, name: 'John' };
console.log('User:', user);
console.log('User:', JSON.stringify(user, null, 2));

// Table format
console.table([
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
]);

// Timing
console.time('operation');
// ... some code ...
console.timeEnd('operation'); // operation: 123.456ms

// Stack trace
console.trace('Show stack trace');

// Group messages
console.group('User Details');
console.log('Name: John');
console.log('Age: 30');
console.groupEnd();`}
        </CodeBlock>

        <Note type="warning">
          Console.log is synchronous and can block the event loop. Use proper logging libraries for production.
        </Note>
      </Section>

      <Section id="winston" heading="Winston Logger">
        <CodeBlock language="bash">
{`npm install winston`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const winston = require('winston');

// Create logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    // Write all logs with level 'error' to error.log
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    
    // Write all logs to combined.log
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

// Add console transport for development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Log messages
logger.error('Error message');
logger.warn('Warning message');
logger.info('Info message');
logger.debug('Debug message');

// Log with metadata
logger.info('User logged in', {
  userId: 123,
  ip: '192.168.1.1'
});

// Log error with stack trace
try {
  throw new Error('Something went wrong');
} catch (error) {
  logger.error('Error occurred:', { error });
}

module.exports = logger;`}
        </CodeBlock>
      </Section>

      <Section id="winston-formats" heading="Custom Log Formats">
        <CodeBlock language="javascript">
{`const winston = require('winston');
const { combine, timestamp, printf, colorize, align } = winston.format;

// Custom format
const customFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = \`\${timestamp} [\${level}]: \${message}\`;
  
  if (Object.keys(metadata).length > 0) {
    msg += \` \${JSON.stringify(metadata)}\`;
  }
  
  return msg;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

// Pretty format for console
const consoleFormat = combine(
  colorize(),
  timestamp({ format: 'HH:mm:ss' }),
  align(),
  printf(info => \`\${info.timestamp} \${info.level}: \${info.message}\`)
);

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: consoleFormat }),
    new winston.transports.File({ 
      filename: 'logs/app.log',
      format: winston.format.json()
    })
  ]
});`}
        </CodeBlock>
      </Section>

      <Section id="log-rotation" heading="Log Rotation">
        <CodeBlock language="bash">
{`npm install winston-daily-rotate-file`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const winston = require('winston');
require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d' // Keep logs for 14 days
});

transport.on('rotate', (oldFilename, newFilename) => {
  console.log('Log file rotated:', newFilename);
});

const logger = winston.createLogger({
  transports: [
    transport,
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '30d'
    })
  ]
});

module.exports = logger;`}
        </CodeBlock>
      </Section>

      <Section id="morgan" heading="HTTP Request Logging (Morgan)">
        <CodeBlock language="bash">
{`npm install morgan`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const fs = require('fs');
const path = require('path');

const app = express();

// Create a write stream
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

// Development: colored output
app.use(morgan('dev'));

// Production: write to file
app.use(morgan('combined', { stream: accessLogStream }));

// Custom format
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :response-time ms - :body'));

// Integration with Winston
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'logs/http.log' })
  ]
});

app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="request-id" heading="Request ID Tracking">
        <CodeBlock language="bash">
{`npm install express-request-id`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const express = require('express');
const addRequestId = require('express-request-id')();
const logger = require('./logger');

const app = express();
app.use(addRequestId);

// Add request ID to all logs
app.use((req, res, next) => {
  req.logger = logger.child({ requestId: req.id });
  next();
});

// Use in routes
app.get('/users', (req, res) => {
  req.logger.info('Fetching users', { userId: req.user.id });
  
  try {
    const users = getUsers();
    req.logger.info('Users fetched successfully', { count: users.length });
    res.json(users);
  } catch (error) {
    req.logger.error('Error fetching users', { error });
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="debugging" heading="Debugging with Debug Module">
        <CodeBlock language="bash">
{`npm install debug`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const debug = require('debug');

// Create debuggers for different namespaces
const dbDebug = debug('app:database');
const httpDebug = debug('app:http');
const authDebug = debug('app:auth');

// Use in code
dbDebug('Connected to database');
httpDebug('Request received: %s %s', req.method, req.url);
authDebug('User authenticated: %o', { userId: 123 });

// With timing
const timedDebug = debug('app:performance');
timedDebug('Operation started');
// ... operation ...
timedDebug('Operation completed in %dms', Date.now() - start);`}
        </CodeBlock>

        <p>Enable debugging:</p>
        <CodeBlock language="bash">
{`# Enable all
DEBUG=* node app.js

# Enable specific namespace
DEBUG=app:database node app.js

# Enable multiple
DEBUG=app:database,app:http node app.js

# Enable with wildcard
DEBUG=app:* node app.js

# Exclude specific
DEBUG=*,-app:auth node app.js`}
        </CodeBlock>
      </Section>

      <Section id="error-logging" heading="Error Logging Middleware">
        <CodeBlock language="javascript">
{`const logger = require('./logger');

// Log all errors
const errorLogger = (err, req, res, next) => {
  logger.error('Error occurred', {
    error: {
      message: err.message,
      stack: err.stack,
      status: err.status || 500
    },
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
      ip: req.ip,
      user: req.user?.id
    }
  });
  
  next(err);
};

// Error response
const errorResponder = (err, req, res, next) => {
  const status = err.status || 500;
  
  res.status(status).json({
    success: false,
    error: {
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack
      })
    }
  });
};

// Usage
app.use(errorLogger);
app.use(errorResponder);`}
        </CodeBlock>
      </Section>

      <Section id="structured-logging" heading="Structured Logging">
        <CodeBlock language="javascript">
{`const logger = require('./logger');

// Log with structured data
logger.info('User action', {
  action: 'login',
  userId: 123,
  timestamp: new Date(),
  ip: req.ip,
  userAgent: req.get('user-agent')
});

logger.info('API request', {
  method: req.method,
  path: req.path,
  statusCode: res.statusCode,
  responseTime: Date.now() - req.startTime,
  userId: req.user?.id
});

logger.error('Database error', {
  error: error.message,
  query: sql,
  params: params,
  userId: req.user?.id
});

// Performance logging
logger.info('Performance metric', {
  operation: 'getUserById',
  duration: 45,
  success: true,
  cacheHit: false
});`}
        </CodeBlock>
      </Section>

      <Section id="production-logging" heading="Production Logging Setup">
        <CodeBlock language="javascript">
{`// config/logger.js
const winston = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, json, errors } = winston.format;

// File transport with rotation
const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d',
  maxSize: '20m',
  level: 'info'
});

const errorFileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d',
  maxSize: '20m',
  level: 'error'
});

// Create logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    errors({ stack: true }),
    timestamp(),
    json()
  ),
  defaultMeta: {
    service: 'myapp',
    environment: process.env.NODE_ENV
  },
  transports: [
    fileRotateTransport,
    errorFileTransport
  ]
});

// Console in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Handle uncaught exceptions
logger.exceptions.handle(
  new winston.transports.File({ filename: 'logs/exceptions.log' })
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', { reason, promise });
});

module.exports = logger;`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Use appropriate log levels</strong> (error, warn, info, debug)</li>
          <li><strong>Include context</strong> dalam log messages (user ID, request ID)</li>
          <li><strong>Use structured logging</strong> dengan JSON format</li>
          <li><strong>Implement log rotation</strong> untuk manage disk space</li>
          <li><strong>Don't log sensitive data</strong> (passwords, tokens, credit cards)</li>
          <li><strong>Use request IDs</strong> untuk trace requests across services</li>
          <li><strong>Log errors with stack traces</strong></li>
          <li><strong>Monitor logs</strong> dengan centralized logging (ELK, CloudWatch)</li>
          <li><strong>Set appropriate log levels</strong> untuk production</li>
          <li><strong>Performance: Avoid excessive logging</strong> dalam hot paths</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Logging essential untuk debugging, monitoring, dan auditing</li>
          <li>Winston provides flexible logging dengan multiple transports</li>
          <li>Morgan logs HTTP requests untuk web applications</li>
          <li>Debug module untuk development debugging</li>
          <li>Use log rotation untuk prevent disk space issues</li>
          <li>Structured logging with JSON untuk better analysis</li>
          <li>Include request IDs untuk trace requests</li>
          <li>Never log sensitive information</li>
          <li>Use appropriate log levels untuk different environments</li>
          <li>Monitor logs dengan centralized logging solutions</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
