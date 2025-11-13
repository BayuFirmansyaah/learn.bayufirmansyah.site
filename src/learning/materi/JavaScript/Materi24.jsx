import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi24() {
  return (
    <MateriLayout
      title="Security Best Practices"
      description="Pelajari security practices untuk JavaScript applications"
    >
      <Section title="Pengenalan Security">
        <p>
          Security adalah protecting applications dari attacks dan vulnerabilities. 
          Common threats: XSS, CSRF, Injection, Authentication issues.
        </p>
        
        <Note type="warning">
          <strong>OWASP Top 10:</strong> List of most critical web application security risks.
        </Note>
      </Section>

      <Section title="Cross-Site Scripting (XSS)">
        <p>
          XSS adalah injection attack dimana attacker injects malicious scripts 
          ke dalam trusted websites.
        </p>

        <h3 className="text-lg font-semibold mb-2">Stored XSS</h3>
        <CodeBlock language="javascript">
{`// ❌ Vulnerable (user input directly in HTML)
const userComment = '<script>alert("XSS")</script>';
document.getElementById('comments').innerHTML = userComment;
// Script executes!

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

const safeComment = escapeHtml(userComment);
document.getElementById('comments').innerHTML = safeComment;
// Shows as text, not executed

// Use textContent (not innerHTML)
document.getElementById('comments').textContent = userComment;
// Always safe, treats as text

// Sanitize with DOMPurify
import DOMPurify from 'dompurify';

const dirty = '<img src=x onerror=alert("XSS")>';
const clean = DOMPurify.sanitize(dirty);
document.getElementById('content').innerHTML = clean;`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Reflected XSS</h3>
        <CodeBlock language="javascript">
{`// ❌ Vulnerable (URL parameter in HTML)
const params = new URLSearchParams(window.location.search);
const name = params.get('name');
document.getElementById('greeting').innerHTML = \`Hello, \${name}!\`;
// URL: ?name=<script>alert("XSS")</script>

// Escape or use textContent
document.getElementById('greeting').textContent = \`Hello, \${name}!\`;

// Validate input
function isValidName(name) {
  return /^[a-zA-Z\\s]+$/.test(name);
}

if (isValidName(name)) {
  document.getElementById('greeting').textContent = \`Hello, \${name}!\`;
} else {
  document.getElementById('greeting').textContent = 'Hello, Guest!';
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">DOM-based XSS</h3>
        <CodeBlock language="javascript">
{`// ❌ Vulnerable
const hash = window.location.hash.substring(1);
document.getElementById('content').innerHTML = hash;

// Safe
document.getElementById('content').textContent = hash;

// Validate before use
function isSafeHash(hash) {
  // Only allow alphanumeric
  return /^[a-zA-Z0-9]+$/.test(hash);
}

if (isSafeHash(hash)) {
  document.getElementById('content').textContent = hash;
}`}
        </CodeBlock>
      </Section>

      <Section title="Cross-Site Request Forgery (CSRF)">
        <p>
          CSRF adalah attack yang tricks user into executing unwanted actions 
          on authenticated application.
        </p>

        <CodeBlock language="javascript">
{`// ❌ Vulnerable API endpoint
app.post('/transfer', (req, res) => {
  const { to, amount } = req.body;
  // Transfer money (no CSRF protection!)
});

// Use CSRF tokens
// Server generates token
const csrfToken = generateToken();
res.cookie('csrf-token', csrfToken);

// Client includes token in requests
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': getCookie('csrf-token')
  },
  body: JSON.stringify({ to: 'Alice', amount: 100 })
});

// Server verifies token
app.post('/transfer', (req, res) => {
  const token = req.headers['x-csrf-token'];
  
  if (!isValidToken(token)) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  
  // Process transfer
});

// SameSite cookies
res.cookie('session', sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'  // Prevent cross-site requests
});

// Check Referer header
app.post('/transfer', (req, res) => {
  const referer = req.headers.referer;
  
  if (!referer || !referer.startsWith('https://yoursite.com')) {
    return res.status(403).json({ error: 'Invalid referer' });
  }
  
  // Process request
});`}
        </CodeBlock>
      </Section>

      <Section title="Input Validation">
        <CodeBlock language="javascript">
{`// Validate all user input
class Validator {
  static isEmail(email) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  }
  
  static isPhone(phone) {
    return /^\\d{10}$/.test(phone);
  }
  
  static isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
  }
  
  static isSafeString(str) {
    // No < > & ' "
    return !/[<>&'""]/.test(str);
  }
  
  static isInRange(num, min, max) {
    return typeof num === 'number' && num >= min && num <= max;
  }
  
  static sanitizeFilename(filename) {
    // Remove path traversal
    return filename.replace(/\\.\\.\\/+/g, '');
  }
}

// Usage
function createUser(data) {
  const errors = [];
  
  if (!Validator.isEmail(data.email)) {
    errors.push('Invalid email');
  }
  
  if (!Validator.isSafeString(data.name)) {
    errors.push('Invalid name');
  }
  
  if (!Validator.isInRange(data.age, 0, 150)) {
    errors.push('Invalid age');
  }
  
  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }
  
  // Create user
}

// Whitelist approach (better than blacklist)
function sanitizeInput(input, allowedChars = /^[a-zA-Z0-9\\s]+$/) {
  if (!allowedChars.test(input)) {
    throw new Error('Input contains invalid characters');
  }
  return input;
}

// Length limits
function validateUsername(username) {
  if (username.length < 3 || username.length > 20) {
    throw new Error('Username must be 3-20 characters');
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    throw new Error('Username can only contain letters, numbers, underscore');
  }
  return username;
}`}
        </CodeBlock>
      </Section>

      <Section title="Authentication & Authorization">
        <h3 className="text-lg font-semibold mb-2">Secure Password Handling</h3>
        <CodeBlock language="javascript">
{`// ❌ Never store plain text passwords!
users.push({ username, password });  // BAD!

// Hash passwords (server-side)
import bcrypt from 'bcrypt';

// Register
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
users.push({ username, password: hashedPassword });

// Login
const user = users.find(u => u.username === username);
const isValid = await bcrypt.compare(password, user.password);

// Password requirements
function validatePassword(password) {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('At least 8 characters');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('At least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('At least one uppercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('At least one number');
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('At least one special character');
  }
  
  return errors;
}

// Rate limiting (prevent brute force)
const loginAttempts = new Map();

async function login(username, password) {
  const key = username;
  const attempts = loginAttempts.get(key) || 0;
  
  if (attempts >= 5) {
    throw new Error('Too many attempts. Try again later.');
  }
  
  const user = await findUser(username);
  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    loginAttempts.set(key, attempts + 1);
    throw new Error('Invalid credentials');
  }
  
  loginAttempts.delete(key);
  return generateToken(user);
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">JWT Security</h3>
        <CodeBlock language="javascript">
{`// Secure JWT implementation
import jwt from 'jsonwebtoken';

// Generate token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,  // Strong secret from env
    { 
      expiresIn: '1h',  // Short expiration
      issuer: 'yourapp.com'
    }
  );
}

// Verify token
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Store tokens securely
// Server: httpOnly cookie (best)
res.cookie('token', token, {
  httpOnly: true,  // Not accessible via JS
  secure: true,    // HTTPS only
  sameSite: 'strict',
  maxAge: 3600000  // 1 hour
});

// Client: If must use localStorage, encrypt
function storeToken(token) {
  // Encrypt before storing
  const encrypted = encryptToken(token);
  localStorage.setItem('token', encrypted);
}

// ❌ Don't store in localStorage without encryption
localStorage.setItem('token', token);  // Vulnerable to XSS!`}
        </CodeBlock>
      </Section>

      <Section title="Content Security Policy (CSP)">
        <p>CSP adalah security layer that helps prevent XSS attacks.</p>

        <CodeBlock language="javascript">
{`// Server response headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://cdn.example.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' https://fonts.googleapis.com; " +
    "connect-src 'self' https://api.example.com;"
  );
  next();
});

// Meta tag (alternative)
// <meta http-equiv="Content-Security-Policy" 
//       content="default-src 'self'; script-src 'self'">

// Strict CSP (no 'unsafe-inline')
// Use nonce for inline scripts
const nonce = generateNonce();
res.setHeader(
  'Content-Security-Policy',
  \`script-src 'nonce-\${nonce}'\`
);

// HTML
// <script nonce="\${nonce}">
//   console.log('Allowed');
// </script>`}
        </CodeBlock>
      </Section>

      <Section title="HTTPS & Secure Communication">
        <CodeBlock language="javascript">
{`// Always use HTTPS
// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(\`https://\${req.headers.host}\${req.url}\`);
  }
  next();
});

// Strict-Transport-Security header
app.use((req, res, next) => {
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  next();
});

// Secure cookies
res.cookie('session', sessionId, {
  secure: true,      // HTTPS only
  httpOnly: true,    // Not accessible via JS
  sameSite: 'strict'
});

// Don't expose sensitive data in URLs
// ❌ Bad
fetch('/api/reset-password?token=secret123');

// Good
fetch('/api/reset-password', {
  method: 'POST',
  body: JSON.stringify({ token: 'secret123' })
});`}
        </CodeBlock>
      </Section>

      <Section title="Dependency Security">
        <CodeBlock language="bash">
{`# Audit dependencies regularly
npm audit
npm audit fix

# Check for known vulnerabilities
npm install -g snyk
snyk test

# Keep dependencies updated
npm outdated
npm update

# Use package-lock.json
# Commit package-lock.json to ensure consistent versions

# Avoid suspicious packages
# - Check npm downloads
# - Check GitHub stars
# - Read package code before installing
# - Use tools like npm-safe

# Remove unused dependencies
npm prune

# Check for typosquatting
# Be careful with package names (eslint vs esIint)`}
        </CodeBlock>
      </Section>

      <Section title="Secure Coding Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Never Trust User Input</strong>
            <CodeBlock language="javascript">
{`// Always validate and sanitize
function processInput(input) {
  // Validate
  if (!isValid(input)) {
    throw new Error('Invalid input');
  }
  
  // Sanitize
  const clean = sanitize(input);
  
  // Use
  return process(clean);
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>2. Use Environment Variables</strong>
            <CodeBlock language="javascript">
{`// ❌ Hardcoded secrets
const API_KEY = 'abc123secret';

// Environment variables
const API_KEY = process.env.API_KEY;

// .env (never commit!)
API_KEY=abc123secret
DATABASE_URL=postgres://...

// .gitignore
.env
.env.local`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Implement Rate Limiting</strong>
            <CodeBlock language="javascript">
{`import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100  // Max 100 requests per window
});

app.use('/api/', limiter);`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Log Security Events</strong>
            <CodeBlock language="javascript">
{`function securityLog(event, details) {
  console.log({
    timestamp: new Date(),
    event,
    details,
    ip: req.ip,
    user: req.user?.id
  });
  
  // Send to monitoring service
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>5. Handle Errors Safely</strong>
            <CodeBlock language="javascript">
{`// ❌ Expose stack traces in production
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.stack });  // BAD!
});

// Generic error messages
app.use((err, req, res, next) => {
  console.error(err);  // Log internally
  res.status(500).json({ 
    error: 'Internal server error'  // Generic message
  });
});`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <Section title="Security Checklist">
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Essential Security Measures:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Escape/sanitize all user input</li>
            <li>Use HTTPS everywhere</li>
            <li>Implement CSP headers</li>
            <li>Hash passwords with bcrypt</li>
            <li>Use httpOnly, secure cookies</li>
            <li>Validate all input (whitelist approach)</li>
            <li>Implement CSRF protection</li>
            <li>Rate limit API endpoints</li>
            <li>Keep dependencies updated (npm audit)</li>
            <li>Use environment variables for secrets</li>
            <li>Enable CORS properly</li>
            <li>Log security events</li>
            <li>Handle errors safely (no stack traces)</li>
            <li>Implement authentication timeouts</li>
            <li>Use secure headers (helmet.js)</li>
          </ul>
        </div>
      </Section>

      <Section title="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Key Security Concepts:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>XSS:</strong> Escape HTML, use textContent, sanitize with DOMPurify</li>
            <li><strong>CSRF:</strong> Use CSRF tokens, SameSite cookies</li>
            <li><strong>Input Validation:</strong> Whitelist approach, sanitize all input</li>
            <li><strong>Authentication:</strong> Hash passwords (bcrypt), secure JWT</li>
            <li><strong>CSP:</strong> Prevent XSS with Content-Security-Policy</li>
            <li><strong>HTTPS:</strong> Always use HTTPS, secure cookies</li>
            <li><strong>Dependencies:</strong> npm audit, keep updated</li>
            <li><strong>Rate Limiting:</strong> Prevent brute force attacks</li>
          </ul>
          
          <h3 className="font-semibold mt-4 mb-3">Remember:</h3>
          <p className="text-sm">
            Security is not one-time task. Regular audits, updates, and monitoring are essential.
            Never trust user input. Always validate, sanitize, and escape.
          </p>
        </div>
      </Section>
    </MateriLayout>
  );
}
