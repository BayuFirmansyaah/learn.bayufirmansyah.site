import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi23() {
  return (
    <MateriLayout title="Security Best Practices">
      <Section id="intro" heading="Why Security Matters?">
        <ul>
          <li><strong>Data Protection:</strong> Protect user data dari unauthorized access</li>
          <li><strong>Trust:</strong> Users trust you dengan their sensitive information</li>
          <li><strong>Compliance:</strong> Meet regulatory requirements (GDPR, HIPAA)</li>
          <li><strong>Reputation:</strong> Security breaches damage reputation</li>
          <li><strong>Financial:</strong> Prevent financial losses dari attacks</li>
        </ul>
      </Section>

      <Section id="helmet" heading="Helmet - Security Headers">
        <CodeBlock language="bash">
{`npm install helmet`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const express = require('express');
const helmet = require('helmet');

const app = express();

// Use helmet with default settings
app.use(helmet());

// Or configure specific headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  })
);

// Helmet sets these headers:
// X-DNS-Prefetch-Control
// X-Frame-Options
// Strict-Transport-Security
// X-Download-Options
// X-Content-Type-Options
// X-Permitted-Cross-Domain-Policies

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="rate-limiting" heading="Rate Limiting">
        <CodeBlock language="bash">
{`npm install express-rate-limit`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const rateLimit = require('express-rate-limit');

// Basic rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
});

// Apply to all requests
app.use(limiter);

// Specific limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 requests per 15 minutes
  skipSuccessfulRequests: true, // Don't count successful requests
  message: 'Too many login attempts, please try again later.'
});

app.post('/api/auth/login', authLimiter, loginController);
app.post('/api/auth/register', authLimiter, registerController);

// Custom key generator (by user ID instead of IP)
const userLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  keyGenerator: (req) => req.user?.id || req.ip
});

app.use('/api/', userLimiter);`}
        </CodeBlock>
      </Section>

      <Section id="cors" heading="CORS Configuration">
        <CodeBlock language="bash">
{`npm install cors`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const cors = require('cors');

// Allow all origins (NOT recommended for production)
app.use(cors());

// Configure CORS
const corsOptions = {
  origin: function (origin, callback) {
    const whitelist = [
      'https://myapp.com',
      'https://www.myapp.com',
      'http://localhost:3000'
    ];
    
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Enable pre-flight for specific routes
app.options('/api/users', cors(corsOptions));

// Dynamic origin
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*'
}));`}
        </CodeBlock>
      </Section>

      <Section id="input-validation" heading="Input Validation & Sanitization">
        <CodeBlock language="javascript">
{`const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

// Validate and sanitize input
app.post('/api/posts',
  [
    body('title')
      .trim()
      .isLength({ min: 3, max: 100 })
      .escape(),
    
    body('content')
      .trim()
      .isLength({ min: 10 })
      .customSanitizer(value => {
        return sanitizeHtml(value, {
          allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
          allowedAttributes: {
            'a': ['href']
          }
        });
      }),
    
    body('email')
      .isEmail()
      .normalizeEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Process sanitized input
  }
);

// Prevent NoSQL injection
const sanitizeQuery = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  for (let key in obj) {
    if (key.startsWith('$')) {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      sanitizeQuery(obj[key]);
    }
  }
  
  return obj;
};

app.post('/api/users/search', (req, res) => {
  const query = sanitizeQuery(req.body.query);
  // Safe to use query now
});`}
        </CodeBlock>
      </Section>

      <Section id="authentication" heading="Authentication Security">
        <CodeBlock language="javascript">
{`const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Hash passwords
async function hashPassword(password) {
  const saltRounds = 12; // Higher = more secure but slower
  return await bcrypt.hash(password, saltRounds);
}

// Compare passwords
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// Generate JWT with expiration
function generateToken(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { 
      expiresIn: '1h',
      issuer: 'myapp',
      audience: 'myapp-users'
    }
  );
}

// Verify JWT
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'myapp',
      audience: 'myapp-users'
    });
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Auth middleware
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.userId);
    
    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Implement refresh tokens
const refreshTokens = new Map(); // Use Redis in production

function generateRefreshToken(userId) {
  const token = crypto.randomBytes(40).toString('hex');
  refreshTokens.set(token, userId);
  return token;
}

app.post('/api/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  const userId = refreshTokens.get(refreshToken);
  
  if (!userId) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
  
  const accessToken = generateToken(userId);
  res.json({ accessToken });
});`}
        </CodeBlock>
      </Section>

      <Section id="sql-injection" heading="Prevent SQL/NoSQL Injection">
        <h3>SQL Injection Prevention</h3>
        <CodeBlock language="javascript">
{`// ❌ BAD: Vulnerable to SQL injection
const query = \`SELECT * FROM users WHERE email = '\${req.body.email}'\`;

// ✅ GOOD: Use parameterized queries
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [req.body.email]);

// Or with named parameters
const query = 'SELECT * FROM users WHERE email = :email';
db.query(query, { email: req.body.email });`}
        </CodeBlock>

        <h3>NoSQL Injection Prevention</h3>
        <CodeBlock language="javascript">
{`// ❌ BAD: Vulnerable to NoSQL injection
User.findOne({ email: req.body.email });
// If req.body.email = { $gt: "" }, returns first user!

// ✅ GOOD: Validate input type
const email = String(req.body.email);
User.findOne({ email });

// ✅ GOOD: Use schema validation
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v),
      message: 'Invalid email format'
    }
  }
});

// ✅ GOOD: Sanitize queries
const sanitize = require('mongo-sanitize');
const email = sanitize(req.body.email);
User.findOne({ email });`}
        </CodeBlock>
      </Section>

      <Section id="xss-prevention" heading="XSS Prevention">
        <CodeBlock language="javascript">
{`// 1. Escape user input
const escape = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

// 2. Sanitize HTML
const sanitizeHtml = require('sanitize-html');

const cleanHtml = sanitizeHtml(userInput, {
  allowedTags: ['b', 'i', 'em', 'strong'],
  allowedAttributes: {}
});

// 3. Set Content Security Policy
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"],
  }
}));

// 4. Use httpOnly cookies
res.cookie('token', token, {
  httpOnly: true, // Prevents JavaScript access
  secure: true, // HTTPS only
  sameSite: 'strict', // CSRF protection
  maxAge: 3600000 // 1 hour
});`}
        </CodeBlock>
      </Section>

      <Section id="csrf" heading="CSRF Protection">
        <CodeBlock language="bash">
{`npm install csurf`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

// Setup CSRF protection
const csrfProtection = csrf({ cookie: true });

// Apply to forms
app.get('/form', csrfProtection, (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/process', csrfProtection, (req, res) => {
  res.json({ message: 'Data processed' });
});

// In HTML form:
// <input type="hidden" name="_csrf" value="<%= csrfToken %>">

// For API with tokens
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next(); // Skip CSRF for API routes
  }
  csrfProtection(req, res, next);
});`}
        </CodeBlock>
      </Section>

      <Section id="secure-headers" heading="Secure Headers">
        <CodeBlock language="javascript">
{`app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS filter
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // HSTS - Force HTTPS
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy
  res.setHeader(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()'
  );
  
  next();
});`}
        </CodeBlock>
      </Section>

      <Section id="dependency-security" heading="Dependency Security">
        <CodeBlock language="bash">
{`# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix (may break things)
npm audit fix --force

# Use Snyk for better scanning
npm install -g snyk
snyk test
snyk monitor

# Keep dependencies updated
npm outdated
npm update`}
        </CodeBlock>

        <p><strong>package.json security:</strong></p>
        <CodeBlock language="json">
{`{
  "scripts": {
    "prestart": "npm audit",
    "security-check": "npm audit && snyk test"
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="environment-security" heading="Environment Variables Security">
        <CodeBlock language="javascript">
{`// ✅ DO: Use environment variables for secrets
const JWT_SECRET = process.env.JWT_SECRET;
const DB_PASSWORD = process.env.DB_PASSWORD;

// ❌ DON'T: Hardcode secrets
const JWT_SECRET = 'my-secret-key'; // BAD!

// ✅ DO: Validate required env vars at startup
const requiredEnvVars = ['JWT_SECRET', 'DB_PASSWORD', 'DB_HOST'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error(\`Missing env vars: \${missingVars.join(', ')}\`);
  process.exit(1);
}

// ✅ DO: Use strong, random secrets
// Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

// ❌ DON'T: Commit .env file
// Add to .gitignore:
// .env
// .env.local
// .env.*.local`}
        </CodeBlock>
      </Section>

      <Section id="security-checklist" heading="Security Checklist">
        <ul>
          <li>✅ Use HTTPS in production</li>
          <li>✅ Set security headers (use Helmet)</li>
          <li>✅ Implement rate limiting</li>
          <li>✅ Validate and sanitize all input</li>
          <li>✅ Use parameterized queries (prevent injection)</li>
          <li>✅ Hash passwords dengan bcrypt (min 12 rounds)</li>
          <li>✅ Use JWT dengan short expiration times</li>
          <li>✅ Implement CORS properly</li>
          <li>✅ Prevent XSS attacks</li>
          <li>✅ Use CSRF tokens for forms</li>
          <li>✅ Keep dependencies updated</li>
          <li>✅ Run security audits regularly</li>
          <li>✅ Use environment variables for secrets</li>
          <li>✅ Implement proper error handling</li>
          <li>✅ Log security events</li>
          <li>✅ Use httpOnly cookies</li>
          <li>✅ Implement account lockout after failed logins</li>
          <li>✅ Sanitize file uploads</li>
          <li>✅ Use Content Security Policy</li>
          <li>✅ Regular security testing</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Security adalah critical aspect dari web development</li>
          <li>Use Helmet untuk set security headers automatically</li>
          <li>Implement rate limiting untuk prevent abuse</li>
          <li>Configure CORS properly untuk control access</li>
          <li>Always validate dan sanitize user input</li>
          <li>Prevent injection attacks dengan parameterized queries</li>
          <li>Hash passwords dengan bcrypt, never store plain text</li>
          <li>Use HTTPS in production dengan HSTS header</li>
          <li>Implement CSRF protection untuk forms</li>
          <li>Keep dependencies updated dan run security audits</li>
          <li>Never commit secrets, use environment variables</li>
          <li>Follow security checklist for comprehensive protection</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
