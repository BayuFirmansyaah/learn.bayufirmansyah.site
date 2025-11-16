import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi02() {
  return (
    <MateriLayout title="Core Modules - File System & Path">
      <Section id="fs-module" heading="File System (fs) Module">
        <p>
          Module <code>fs</code> menyediakan API untuk berinteraksi dengan file system. 
          Semua operasi memiliki versi synchronous dan asynchronous.
        </p>
        
        <Note type="warning">
          <strong>Synchronous vs Asynchronous:</strong> Synchronous methods block execution, 
          asynchronous tidak. Untuk server applications, selalu gunakan async methods.
        </Note>
      </Section>

      <Section id="reading-files" heading="Reading Files">
        <h3 className="text-lg font-semibold mb-2">Asynchronous (Recommended)</h3>
        <CodeBlock language="javascript">
{`const fs = require('fs');

// Callback-based
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

// Promise-based (Node.js 10+)
const fsPromises = require('fs').promises;

async function readFileAsync() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}

readFileAsync();

// Or using promises directly
fs.promises.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Synchronous (Blocking)</h3>
        <CodeBlock language="javascript">
{`const fs = require('fs');

try {
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log('File content:', data);
} catch (err) {
  console.error('Error:', err);
}

// Warning: This blocks the entire process!
// Only use in scripts or CLI tools`}
        </CodeBlock>
      </Section>

      <Section id="writing-files" heading="Writing Files">
        <CodeBlock language="javascript">
{`const fs = require('fs').promises;

// Write file (overwrite if exists)
async function writeFile() {
  try {
    await fs.writeFile('output.txt', 'Hello Node.js!', 'utf8');
    console.log('File written successfully');
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

writeFile();

// Append to file
async function appendFile() {
  try {
    await fs.appendFile('log.txt', 'New log entry\\n', 'utf8');
    console.log('Data appended');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Write JSON data
async function writeJSON() {
  const data = {
    name: 'John',
    age: 30,
    city: 'New York'
  };
  
  try {
    await fs.writeFile('data.json', JSON.stringify(data, null, 2));
    console.log('JSON file written');
  } catch (err) {
    console.error('Error:', err);
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="file-operations" heading="File Operations">
        <CodeBlock language="javascript">
{`const fs = require('fs').promises;

// Check if file exists
async function fileExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

// Get file stats
async function getFileInfo(path) {
  try {
    const stats = await fs.stat(path);
    console.log('Size:', stats.size, 'bytes');
    console.log('Created:', stats.birthtime);
    console.log('Modified:', stats.mtime);
    console.log('Is file:', stats.isFile());
    console.log('Is directory:', stats.isDirectory());
  } catch (err) {
    console.error('Error:', err);
  }
}

// Copy file
async function copyFile(source, destination) {
  try {
    await fs.copyFile(source, destination);
    console.log('File copied successfully');
  } catch (err) {
    console.error('Error copying file:', err);
  }
}

// Rename/Move file
async function renameFile(oldPath, newPath) {
  try {
    await fs.rename(oldPath, newPath);
    console.log('File renamed');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Delete file
async function deleteFile(path) {
  try {
    await fs.unlink(path);
    console.log('File deleted');
  } catch (err) {
    console.error('Error:', err);
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="directory-operations" heading="Directory Operations">
        <CodeBlock language="javascript">
{`const fs = require('fs').promises;

// Create directory
async function createDir(path) {
  try {
    await fs.mkdir(path);
    console.log('Directory created');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Create nested directories
async function createNestedDir(path) {
  try {
    await fs.mkdir(path, { recursive: true });
    console.log('Nested directories created');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Read directory contents
async function readDir(path) {
  try {
    const files = await fs.readdir(path);
    console.log('Files:', files);
    
    // With file types
    const entries = await fs.readdir(path, { withFileTypes: true });
    entries.forEach(entry => {
      console.log(entry.name, entry.isDirectory() ? '[DIR]' : '[FILE]');
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

// Remove directory
async function removeDir(path) {
  try {
    await fs.rmdir(path);
    console.log('Directory removed');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Remove directory recursively (Node.js 14+)
async function removeRecursive(path) {
  try {
    await fs.rm(path, { recursive: true, force: true });
    console.log('Directory and contents removed');
  } catch (err) {
    console.error('Error:', err);
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="streams" heading="File Streams">
        <p>
          Streams memungkinkan kita membaca/menulis file dalam chunks, efisien untuk file besar.
        </p>
        <CodeBlock language="javascript">
{`const fs = require('fs');

// Read stream
const readStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024 // 64KB chunks
});

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length, 'bytes');
});

readStream.on('end', () => {
  console.log('Finished reading file');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});

// Write stream
const writeStream = fs.createWriteStream('output.txt');

writeStream.write('First line\\n');
writeStream.write('Second line\\n');
writeStream.end('Last line\\n');

writeStream.on('finish', () => {
  console.log('Finished writing');
});

// Pipe streams (copy file efficiently)
const source = fs.createReadStream('input.txt');
const destination = fs.createWriteStream('output.txt');

source.pipe(destination);

source.on('end', () => {
  console.log('File copied');
});`}
        </CodeBlock>

        <Note type="tip">
          <strong>Streams advantage:</strong> Memory efficient - hanya load sebagian file 
          ke memory, bukan entire file.
        </Note>
      </Section>

      <Section id="path-module" heading="Path Module">
        <p>
          Module <code>path</code> menyediakan utilities untuk bekerja dengan file dan 
          directory paths.
        </p>
        <CodeBlock language="javascript">
{`const path = require('path');

// Join paths
const filePath = path.join('folder', 'subfolder', 'file.txt');
console.log(filePath);
// folder/subfolder/file.txt (atau folder\\subfolder\\file.txt di Windows)

// Resolve absolute path
const absolutePath = path.resolve('folder', 'file.txt');
console.log(absolutePath);
// /Users/username/project/folder/file.txt

// Get directory name
const dirname = path.dirname('/folder/subfolder/file.txt');
console.log(dirname);  // /folder/subfolder

// Get base name (file name)
const basename = path.basename('/folder/file.txt');
console.log(basename);  // file.txt

// Get extension
const ext = path.extname('file.txt');
console.log(ext);  // .txt

// Parse path
const parsed = path.parse('/folder/subfolder/file.txt');
console.log(parsed);
// {
//   root: '/',
//   dir: '/folder/subfolder',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// Format path from object
const formatted = path.format({
  dir: '/folder/subfolder',
  base: 'file.txt'
});
console.log(formatted);  // /folder/subfolder/file.txt

// Normalize path
const normalized = path.normalize('/folder//subfolder/../file.txt');
console.log(normalized);  // /folder/file.txt

// Check if path is absolute
console.log(path.isAbsolute('/folder/file.txt'));  // true
console.log(path.isAbsolute('folder/file.txt'));   // false

// Platform-specific separator
console.log(path.sep);  // '/' on Unix, '\\' on Windows`}
        </CodeBlock>
      </Section>

      <Section id="practical-examples" heading="Practical Examples">
        <h3 className="text-lg font-semibold mb-2">1. Read and Process JSON File</h3>
        <CodeBlock language="javascript">
{`const fs = require('fs').promises;
const path = require('path');

async function readConfig() {
  try {
    const filePath = path.join(__dirname, 'config.json');
    const data = await fs.readFile(filePath, 'utf8');
    const config = JSON.parse(data);
    return config;
  } catch (err) {
    console.error('Error reading config:', err);
    return null;
  }
}

async function main() {
  const config = await readConfig();
  console.log('Config:', config);
}

main();`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">2. List All Files in Directory</h3>
        <CodeBlock language="javascript">
{`const fs = require('fs').promises;
const path = require('path');

async function listAllFiles(dirPath, arrayOfFiles = []) {
  const files = await fs.readdir(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      arrayOfFiles = await listAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  }

  return arrayOfFiles;
}

// Usage
listAllFiles('./src')
  .then(files => {
    console.log('All files:');
    files.forEach(file => console.log(file));
  })
  .catch(err => console.error('Error:', err));`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">3. Simple File Logger</h3>
        <CodeBlock language="javascript">
{`const fs = require('fs').promises;
const path = require('path');

class FileLogger {
  constructor(logDir = 'logs') {
    this.logDir = logDir;
    this.logFile = path.join(logDir, \`app-\${this.getDate()}.log\`);
  }

  getDate() {
    return new Date().toISOString().split('T')[0];
  }

  getTimestamp() {
    return new Date().toISOString();
  }

  async ensureLogDir() {
    try {
      await fs.mkdir(this.logDir, { recursive: true });
    } catch (err) {
      console.error('Error creating log directory:', err);
    }
  }

  async log(level, message) {
    await this.ensureLogDir();
    const logEntry = \`[\${this.getTimestamp()}] [\${level}] \${message}\\n\`;
    
    try {
      await fs.appendFile(this.logFile, logEntry);
    } catch (err) {
      console.error('Error writing to log:', err);
    }
  }

  async info(message) {
    await this.log('INFO', message);
  }

  async error(message) {
    await this.log('ERROR', message);
  }

  async warn(message) {
    await this.log('WARN', message);
  }
}

// Usage
const logger = new FileLogger();

async function main() {
  await logger.info('Application started');
  await logger.warn('This is a warning');
  await logger.error('An error occurred');
}

main();`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">4. Watch File Changes</h3>
        <CodeBlock language="javascript">
{`const fs = require('fs');

// Watch single file
fs.watch('config.json', (eventType, filename) => {
  console.log(\`Event: \${eventType}\`);
  console.log(\`File: \${filename}\`);
  
  if (eventType === 'change') {
    console.log('File was modified');
  }
});

// Watch directory
fs.watch('./src', { recursive: true }, (eventType, filename) => {
  console.log(\`\${filename} was \${eventType}d\`);
});

console.log('Watching for file changes...');`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Always use async methods</strong> di server applications untuk avoid blocking</li>
          <li><strong>Handle errors properly</strong> dengan try-catch atau .catch()</li>
          <li><strong>Use path.join()</strong> untuk cross-platform compatibility</li>
          <li><strong>Close file descriptors</strong> jika menggunakan fs.open()</li>
          <li><strong>Use streams</strong> untuk large files untuk avoid memory issues</li>
          <li><strong>Validate file paths</strong> untuk prevent directory traversal attacks</li>
          <li><strong>Set proper permissions</strong> saat create files/directories</li>
          <li><strong>Use __dirname</strong> untuk resolve paths relatif ke current file</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Module <code>fs</code> untuk file system operations (read, write, delete, dll)</li>
          <li>Gunakan async methods (<code>fs.promises</code>) untuk non-blocking I/O</li>
          <li>Streams efisien untuk handle large files</li>
          <li>Module <code>path</code> untuk manipulate file paths dengan aman</li>
          <li>Always handle errors untuk robust applications</li>
          <li><code>__dirname</code> dan <code>__filename</code> untuk path resolution</li>
          <li>File watching untuk monitor changes real-time</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
