import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi01() {
  return (
    <MateriLayout title="Pengenalan Node.js & Setup">
      <Section id="apa-itu-nodejs" heading="Apa itu Node.js?">
        <p>
          Node.js adalah runtime environment untuk JavaScript yang berjalan di server-side. 
          Dibangun di atas V8 JavaScript engine dari Chrome, Node.js memungkinkan kita 
          menjalankan JavaScript di luar browser.
        </p>
        <p>
          Node.js menggunakan model event-driven, non-blocking I/O yang membuatnya ringan 
          dan efisien, sempurna untuk aplikasi real-time yang data-intensive.
        </p>
        
        <Note type="info">
          <strong>Dibuat oleh:</strong> Ryan Dahl pada tahun 2009. Node.js sekarang dikelola 
          oleh OpenJS Foundation.
        </Note>
      </Section>

      <Section id="keunggulan-nodejs" heading="Keunggulan Node.js">
        <ul>
          <li><strong>JavaScript Everywhere:</strong> Gunakan JavaScript untuk frontend dan backend</li>
          <li><strong>Non-blocking I/O:</strong> Handle ribuan koneksi concurrent dengan performa tinggi</li>
          <li><strong>NPM Ecosystem:</strong> Akses ke 1.5 juta+ packages di npm registry</li>
          <li><strong>Fast Execution:</strong> V8 engine compile JavaScript ke machine code</li>
          <li><strong>Real-time Apps:</strong> Perfect untuk chat, gaming, collaboration tools</li>
          <li><strong>Scalability:</strong> Easy to scale horizontal dan vertical</li>
          <li><strong>Active Community:</strong> Large community dan enterprise support</li>
        </ul>
      </Section>

      <Section id="use-cases" heading="Use Cases Node.js">
        <ul>
          <li><strong>REST APIs:</strong> Build RESTful web services</li>
          <li><strong>Real-time Applications:</strong> Chat apps, live updates, collaborative tools</li>
          <li><strong>Microservices:</strong> Lightweight services architecture</li>
          <li><strong>Streaming Applications:</strong> Video/audio streaming</li>
          <li><strong>Command-line Tools:</strong> Build CLI utilities</li>
          <li><strong>IoT Applications:</strong> Handle device connections</li>
          <li><strong>Server-Side Rendering:</strong> Next.js, Nuxt.js apps</li>
        </ul>
      </Section>

      <Section id="instalasi-nodejs" heading="Instalasi Node.js">
        <h3 className="text-lg font-semibold mb-2">Windows & macOS</h3>
        <ol>
          <li>Download installer dari <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">nodejs.org</a></li>
          <li>Pilih LTS version (Long Term Support) untuk stability</li>
          <li>Run installer dan ikuti instruksi</li>
          <li>Restart terminal setelah instalasi</li>
        </ol>

        <h3 className="text-lg font-semibold mb-2 mt-4">Linux (Ubuntu/Debian)</h3>
        <CodeBlock language="bash">
{`# Install Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Menggunakan NVM (Node Version Manager)</h3>
        <CodeBlock language="bash">
{`# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, then install Node.js
nvm install --lts
nvm use --lts

# Switch between versions
nvm install 18
nvm use 18`}
        </CodeBlock>

        <Note type="tip">
          <strong>Recommended:</strong> Gunakan NVM untuk manage multiple Node.js versions, 
          terutama jika bekerja dengan banyak project berbeda.
        </Note>
      </Section>

      <Section id="verify-installation" heading="Verifikasi Instalasi">
        <CodeBlock language="bash">
{`# Check Node.js version
node --version
# Output: v20.x.x

# Check npm version
npm --version
# Output: 10.x.x

# Check installation path
which node
# macOS/Linux: /usr/local/bin/node

# Test Node.js
node -e "console.log('Hello Node.js!')"
# Output: Hello Node.js!`}
        </CodeBlock>
      </Section>

      <Section id="hello-world" heading="Hello World - First Node.js Program">
        <p>Buat file <code>hello.js</code>:</p>
        <CodeBlock language="javascript">
{`// hello.js
console.log('Hello, Node.js!');
console.log('Node version:', process.version);
console.log('Platform:', process.platform);

// Process object provides info about current process
console.log('Current directory:', process.cwd());
console.log('Memory usage:', process.memoryUsage());`}
        </CodeBlock>

        <p>Jalankan dengan:</p>
        <CodeBlock language="bash">
{`node hello.js

# Output:
# Hello, Node.js!
# Node version: v20.x.x
# Platform: darwin (or linux, win32)
# Current directory: /path/to/your/project
# Memory usage: { rss: 25x..., heapTotal: 4x..., ... }`}
        </CodeBlock>
      </Section>

      <Section id="node-repl" heading="Node.js REPL">
        <p>
          REPL (Read-Eval-Print Loop) adalah interactive shell untuk eksperimen cepat.
        </p>
        <CodeBlock language="bash">
{`# Start REPL
node

# Try some code
> console.log('Hello')
Hello
undefined

> const add = (a, b) => a + b
undefined

> add(5, 3)
8

> .help      // Show all commands
> .exit      // Exit REPL (or Ctrl+D)`}
        </CodeBlock>

        <Note type="tip">
          <strong>REPL Commands:</strong>
          <ul>
            <li><code>.help</code> - Show all commands</li>
            <li><code>.break</code> - Exit multiline expression</li>
            <li><code>.clear</code> - Clear context</li>
            <li><code>.save filename</code> - Save session to file</li>
            <li><code>.load filename</code> - Load file into session</li>
          </ul>
        </Note>
      </Section>

      <Section id="npm-basics" heading="NPM Basics">
        <p>
          NPM (Node Package Manager) adalah package manager untuk Node.js. Digunakan untuk 
          install, manage, dan share packages.
        </p>

        <CodeBlock language="bash">
{`# Initialize new project
npm init
# Or skip questions
npm init -y

# Install package
npm install express

# Install as dev dependency
npm install --save-dev nodemon

# Install globally
npm install -g typescript

# Install specific version
npm install express@4.18.0

# Update packages
npm update

# List installed packages
npm list
npm list --depth=0  # Only top-level

# Remove package
npm uninstall express`}
        </CodeBlock>
      </Section>

      <Section id="package-json" heading="package.json">
        <p>
          File <code>package.json</code> adalah manifest file yang contains metadata tentang 
          project dan dependencies.
        </p>
        <CodeBlock language="json">
{`{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "My first Node.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "keywords": ["node", "express"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}`}
        </CodeBlock>

        <Note type="info">
          <strong>Semantic Versioning:</strong>
          <ul>
            <li><code>^4.18.0</code> - Compatible dengan 4.x.x (patch & minor updates)</li>
            <li><code>~4.18.0</code> - Compatible dengan 4.18.x (patch updates only)</li>
            <li><code>4.18.0</code> - Exact version</li>
          </ul>
        </Note>
      </Section>

      <Section id="node-modules" heading="Node Modules System">
        <p>Node.js menggunakan CommonJS module system (dan ES Modules di versi modern).</p>

        <h3 className="text-lg font-semibold mb-2">CommonJS (Traditional)</h3>
        <CodeBlock language="javascript">
{`// math.js - Export module
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };

// app.js - Import module
const math = require('./math');
console.log(math.add(5, 3));      // 8
console.log(math.subtract(5, 3)); // 2

// Or destructure
const { add, subtract } = require('./math');
console.log(add(10, 5));  // 15`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">ES Modules (Modern)</h3>
        <CodeBlock language="javascript">
{`// math.mjs - Export module
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// app.mjs - Import module
import { add, subtract } from './math.mjs';
console.log(add(5, 3));      // 8
console.log(subtract(5, 3)); // 2

// Default export
export default function multiply(a, b) {
  return a * b;
}

// Import default
import multiply from './math.mjs';`}
        </CodeBlock>

        <Note type="tip">
          Untuk menggunakan ES Modules dengan <code>.js</code> extension, tambahkan 
          <code>"type": "module"</code> di <code>package.json</code>.
        </Note>
      </Section>

      <Section id="global-objects" heading="Global Objects">
        <CodeBlock language="javascript">
{`// __dirname - Current directory path
console.log(__dirname);
// /Users/username/project

// __filename - Current file path
console.log(__filename);
// /Users/username/project/app.js

// process - Current process info
console.log(process.env);        // Environment variables
console.log(process.argv);       // Command-line arguments
console.log(process.pid);        // Process ID
console.log(process.cwd());      // Current working directory

// global - Global namespace (like window in browser)
global.myVar = 'Hello';
console.log(global.myVar);

// setTimeout, setInterval (like in browser)
setTimeout(() => {
  console.log('After 1 second');
}, 1000);

// Buffer - Handle binary data
const buf = Buffer.from('Hello');
console.log(buf);  // <Buffer 48 65 6c 6c 6f>`}
        </CodeBlock>
      </Section>

      <Section id="built-in-modules" heading="Built-in Modules Preview">
        <p>Node.js hadir dengan banyak built-in modules:</p>
        <CodeBlock language="javascript">
{`// fs - File system operations
const fs = require('fs');

// path - File path utilities
const path = require('path');

// http - HTTP server
const http = require('http');

// os - Operating system info
const os = require('os');

// events - Event emitter
const events = require('events');

// Example: Get system info
console.log('Platform:', os.platform());
console.log('CPU Cores:', os.cpus().length);
console.log('Free Memory:', os.freemem());
console.log('Total Memory:', os.totalmem());`}
        </CodeBlock>
      </Section>

      <Section id="first-http-server" heading="First HTTP Server">
        <CodeBlock language="javascript">
{`// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\\n');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}/\`);
});`}
        </CodeBlock>

        <p>Jalankan:</p>
        <CodeBlock language="bash">
{`node server.js
# Open browser: http://localhost:3000`}
        </CodeBlock>
      </Section>

      <Section id="development-tools" heading="Development Tools">
        <h3 className="text-lg font-semibold mb-2">Nodemon - Auto Restart</h3>
        <CodeBlock language="bash">
{`# Install globally
npm install -g nodemon

# Or as dev dependency
npm install --save-dev nodemon

# Use nodemon instead of node
nodemon server.js

# Add to package.json scripts
{
  "scripts": {
    "dev": "nodemon server.js"
  }
}

# Then run
npm run dev`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">VS Code Extensions</h3>
        <ul>
          <li><strong>Node.js Extension Pack</strong> - Essential Node.js tools</li>
          <li><strong>REST Client</strong> - Test APIs directly in VS Code</li>
          <li><strong>ESLint</strong> - Linting for code quality</li>
          <li><strong>Prettier</strong> - Code formatting</li>
          <li><strong>npm Intellisense</strong> - Autocomplete npm modules</li>
        </ul>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Use LTS version</strong> untuk production applications</li>
          <li><strong>Version control</strong> package-lock.json untuk consistent installs</li>
          <li><strong>Never commit</strong> node_modules folder (add to .gitignore)</li>
          <li><strong>Use environment variables</strong> untuk sensitive data</li>
          <li><strong>Handle errors properly</strong> untuk avoid crashes</li>
          <li><strong>Use async/await</strong> untuk cleaner async code</li>
          <li><strong>Keep dependencies updated</strong> tapi test thoroughly</li>
          <li><strong>Use nodemon</strong> untuk development efficiency</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Node.js adalah JavaScript runtime untuk server-side development</li>
          <li>Non-blocking I/O dan event-driven architecture untuk performa tinggi</li>
          <li>NPM adalah package manager dengan 1.5M+ packages</li>
          <li>CommonJS dan ES Modules untuk organize code</li>
          <li>Built-in modules untuk file system, HTTP, OS operations, dll</li>
          <li>Setup mudah dengan installer atau NVM</li>
          <li>REPL untuk quick testing dan experimentation</li>
          <li>package.json untuk manage dependencies dan scripts</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
