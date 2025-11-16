import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi12() {
  return (
    <MateriLayout title="Serving Static Files & Assets">
      <Section id="express-static" heading="express.static() Middleware">
        <p>
          Express menyediakan built-in middleware <code>express.static</code> untuk 
          serve static files seperti images, CSS files, dan JavaScript files.
        </p>
        
        <CodeBlock language="javascript">
{`const express = require('express');
const path = require('path');
const app = express();

// Serve static files from 'public' directory
app.use(express.static('public'));

// Now files in public/ are accessible:
// http://localhost:3000/style.css
// http://localhost:3000/images/logo.png
// http://localhost:3000/js/script.js

app.listen(3000);`}
        </CodeBlock>

        <Note type="info">
          <strong>File structure:</strong>
          <pre>{`
public/
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    └── logo.png
          `}</pre>
        </Note>
      </Section>

      <Section id="virtual-path" heading="Virtual Path Prefix">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Mount static middleware at /static path
app.use('/static', express.static('public'));

// Now files are accessible at:
// http://localhost:3000/static/style.css
// http://localhost:3000/static/images/logo.png
// http://localhost:3000/static/js/script.js

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="multiple-directories" heading="Multiple Static Directories">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Multiple static directories (checked in order)
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(express.static('files'));

// Different paths for different directories
app.use('/css', express.static('public/stylesheets'));
app.use('/js', express.static('public/scripts'));
app.use('/images', express.static('public/images'));

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="absolute-path" heading="Using Absolute Paths">
        <CodeBlock language="javascript">
{`const express = require('express');
const path = require('path');
const app = express();

// Best practice: Use absolute path
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Multiple directories with absolute paths
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3000);`}
        </CodeBlock>

        <Note type="tip">
          <strong>Why absolute paths?</strong> Prevents issues when running app dari different directories.
        </Note>
      </Section>

      <Section id="static-options" heading="Static Middleware Options">
        <CodeBlock language="javascript">
{`const express = require('express');
const path = require('path');
const app = express();

// With options
app.use(express.static('public', {
  // Directory index file
  index: 'index.html',           // Default: 'index.html'
  
  // Enable/disable directory listing
  dotfiles: 'ignore',            // 'allow', 'deny', 'ignore'
  
  // Enable/disable ETag generation
  etag: true,
  
  // Custom extensions to try
  extensions: ['html', 'htm'],
  
  // Set Cache-Control header
  maxAge: '1d',                  // 1 day (can use ms, 1h, 30m, etc.)
  
  // Custom redirect function
  redirect: true,
  
  // Set custom headers
  setHeaders: (res, filePath, stat) => {
    res.set('X-Custom-Header', 'MyValue');
    
    // Cache images for 1 year
    if (filePath.endsWith('.jpg') || filePath.endsWith('.png')) {
      res.set('Cache-Control', 'public, max-age=31536000');
    }
  },
  
  // Fallthrough - call next() if file not found
  fallthrough: true,
  
  // Serve hidden files
  dotfiles: 'allow'
}));

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="caching" heading="Caching Static Files">
        <CodeBlock language="javascript">
{`const express = require('express');
const path = require('path');
const app = express();

// Cache static files
app.use('/static', express.static('public', {
  maxAge: '1y',  // Cache for 1 year
  setHeaders: (res, filePath) => {
    // Different cache times for different file types
    if (filePath.endsWith('.html')) {
      res.set('Cache-Control', 'public, max-age=3600'); // 1 hour
    } else if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
      res.set('Cache-Control', 'public, max-age=31536000'); // 1 year
    } else if (filePath.endsWith('.jpg') || filePath.endsWith('.png')) {
      res.set('Cache-Control', 'public, max-age=31536000'); // 1 year
    }
  }
}));

// Disable caching for development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });
}

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="compression" heading="Compression for Static Files">
        <CodeBlock language="bash">
{`npm install compression`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();

// Enable compression for all responses
app.use(compression({
  level: 6,              // Compression level (0-9)
  threshold: 1024,       // Minimum size to compress (bytes)
  filter: (req, res) => {
    // Don't compress if client doesn't support it
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Use compression filter by default
    return compression.filter(req, res);
  }
}));

// Serve static files (will be compressed)
app.use(express.static('public'));

app.listen(3000);`}
        </CodeBlock>

        <Note type="tip">
          <strong>Compression reduces bandwidth:</strong> Text files (HTML, CSS, JS) dapat reduced 
          hingga 70-90% size.
        </Note>
      </Section>

      <Section id="file-upload-serving" heading="Serving Uploaded Files">
        <CodeBlock language="bash">
{`npm install multer`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    message: 'File uploaded successfully',
    file: {
      filename: req.file.filename,
      url: \`http://localhost:3000/uploads/\${req.file.filename}\`
    }
  });
});

// Upload form
app.get('/', (req, res) => {
  res.send(\`
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="file">
      <button type="submit">Upload</button>
    </form>
  \`);
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="spa-routing" heading="Single Page Application (SPA) Routing">
        <CodeBlock language="javascript">
{`const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// API routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'API response' });
});

// For all other routes, serve index.html (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);`}
        </CodeBlock>

        <Note type="info">
          <strong>SPA Pattern:</strong> Perfect untuk React, Vue, Angular apps. 
          Server serves same index.html untuk all routes, frontend handles routing.
        </Note>
      </Section>

      <Section id="security" heading="Security Considerations">
        <CodeBlock language="javascript">
{`const express = require('express');
const path = require('path');
const app = express();

// 1. Prevent directory traversal
app.use('/files', express.static('public', {
  dotfiles: 'deny',  // Deny access to hidden files
  index: false       // Disable directory listing
}));

// 2. Validate file paths
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  
  // Validate filename (no path traversal)
  if (filename.includes('..') || filename.includes('/')) {
    return res.status(400).json({ error: 'Invalid filename' });
  }
  
  const filePath = path.join(__dirname, 'files', filename);
  res.download(filePath);
});

// 3. Restrict file types
app.post('/upload', upload.single('file'), (req, res) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  
  if (!allowedTypes.includes(req.file.mimetype)) {
    // Delete uploaded file
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'Invalid file type' });
  }
  
  res.json({ success: true });
});

// 4. Set security headers
app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block'
  });
  next();
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="cdn" heading="CDN Integration">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Configuration
const CDN_URL = process.env.CDN_URL || '';
const isProduction = process.env.NODE_ENV === 'production';

// Helper function to get asset URL
function assetUrl(path) {
  return isProduction ? \`\${CDN_URL}\${path}\` : path;
}

// Make helper available to templates
app.locals.assetUrl = assetUrl;

// In production, serve from CDN
if (isProduction) {
  app.locals.cdnUrl = CDN_URL;
} else {
  app.use('/static', express.static('public'));
}

// Routes
app.get('/', (req, res) => {
  res.send(\`
    <link rel="stylesheet" href="\${assetUrl('/static/css/style.css')}">
    <script src="\${assetUrl('/static/js/app.js')}"></script>
    <img src="\${assetUrl('/static/images/logo.png')}">
  \`);
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="practical-example" heading="Practical Example: Complete Static File Setup">
        <CodeBlock language="javascript">
{`const express = require('express');
const path = require('path');
const compression = require('compression');
const multer = require('multer');
const fs = require('fs');

const app = express();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 1. Compression
app.use(compression());

// 2. Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Static files with caching
// Public assets (long cache)
app.use('/static', express.static('public', {
  maxAge: '1y',
  etag: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.set('Cache-Control', 'public, max-age=3600');
    }
  }
}));

// User uploads (shorter cache)
app.use('/uploads', express.static('uploads', {
  maxAge: '7d',
  etag: true
}));

// 4. File upload configuration
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Routes
app.get('/', (req, res) => {
  res.send(\`
    <!DOCTYPE html>
    <html>
    <head>
      <title>File Upload</title>
      <link rel="stylesheet" href="/static/css/style.css">
    </head>
    <body>
      <h1>Upload File</h1>
      <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="file" required>
        <button type="submit">Upload</button>
      </form>
      <script src="/static/js/app.js"></script>
    </body>
    </html>
  \`);
});

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    message: 'File uploaded successfully',
    file: {
      filename: req.file.filename,
      size: req.file.size,
      url: \`/uploads/\${req.file.filename}\`
    }
  });
});

// Download endpoint
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  
  // Validate filename
  if (filename.includes('..') || filename.includes('/')) {
    return res.status(400).json({ error: 'Invalid filename' });
  }
  
  const filePath = path.join(uploadDir, filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  res.download(filePath);
});

// List uploaded files
app.get('/files', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading directory' });
    }
    
    const fileList = files.map(filename => ({
      filename,
      url: \`/uploads/\${filename}\`,
      downloadUrl: \`/download/\${filename}\`
    }));
    
    res.json(fileList);
  });
});

// Error handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Use absolute paths</strong> dengan <code>path.join(__dirname)</code></li>
          <li><strong>Enable compression</strong> untuk reduce bandwidth</li>
          <li><strong>Set proper cache headers</strong> untuk better performance</li>
          <li><strong>Validate file uploads</strong> - check type, size, filename</li>
          <li><strong>Prevent directory traversal</strong> attacks</li>
          <li><strong>Use CDN</strong> in production untuk faster delivery</li>
          <li><strong>Separate static assets</strong> by type (css, js, images)</li>
          <li><strong>Enable ETag</strong> untuk efficient caching</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li><code>express.static()</code> serves static files (CSS, JS, images)</li>
          <li>Mount static middleware dengan virtual path prefix</li>
          <li>Use multiple static directories dengan different paths</li>
          <li>Always use absolute paths dengan <code>path.join(__dirname)</code></li>
          <li>Configure caching dengan maxAge dan setHeaders options</li>
          <li>Enable compression untuk reduce file sizes</li>
          <li>Secure file uploads dengan validation dan sanitization</li>
          <li>Use CDN in production untuk better performance</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
