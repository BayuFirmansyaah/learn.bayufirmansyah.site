import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi05() {
  return (
    <MateriLayout title="Streams & Buffers">
      <Section id="what-are-streams" heading="What are Streams?">
        <p>
          Streams adalah collections of data yang mungkin tidak tersedia all at once, dan 
          tidak perlu fit di memory. Streams memungkinkan kita process data piece by piece.
        </p>
        
        <Note type="info">
          <strong>Keuntungan Streams:</strong>
          <ul>
            <li>Memory efficient - process large files tanpa load semuanya ke memory</li>
            <li>Time efficient - mulai processing sebelum semua data available</li>
            <li>Composability - pipe streams bersama untuk complex operations</li>
          </ul>
        </Note>
      </Section>

      <Section id="types-of-streams" heading="Types of Streams">
        <ul>
          <li><strong>Readable:</strong> Stream untuk read data (e.g., fs.createReadStream)</li>
          <li><strong>Writable:</strong> Stream untuk write data (e.g., fs.createWriteStream)</li>
          <li><strong>Duplex:</strong> Stream yang readable dan writable (e.g., TCP socket)</li>
          <li><strong>Transform:</strong> Duplex stream yang modify data saat read/write (e.g., compression)</li>
        </ul>
      </Section>

      <Section id="readable-streams" heading="Readable Streams">
        <CodeBlock language="javascript">
{`const fs = require('fs');

// Create readable stream
const readStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024 // 64KB chunks (default: 64KB)
});

// Event: 'data' - emitted when chunk available
readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length, 'bytes');
});

// Event: 'end' - emitted when no more data
readStream.on('end', () => {
  console.log('Finished reading file');
});

// Event: 'error' - emitted on error
readStream.on('error', (err) => {
  console.error('Error:', err);
});

// Event: 'open' - emitted when file opened
readStream.on('open', (fd) => {
  console.log('File opened, descriptor:', fd);
});

// Event: 'close' - emitted when stream closed
readStream.on('close', () => {
  console.log('Stream closed');
});

// Pause and resume
readStream.pause();
console.log('Stream paused');

setTimeout(() => {
  readStream.resume();
  console.log('Stream resumed');
}, 1000);`}
        </CodeBlock>
      </Section>

      <Section id="writable-streams" heading="Writable Streams">
        <CodeBlock language="javascript">
{`const fs = require('fs');

// Create writable stream
const writeStream = fs.createWriteStream('output.txt', {
  encoding: 'utf8'
});

// Write data
writeStream.write('First line\\n');
writeStream.write('Second line\\n');
writeStream.write('Third line\\n');

// End stream (no more writes)
writeStream.end('Last line\\n');

// Events
writeStream.on('finish', () => {
  console.log('All data written');
});

writeStream.on('error', (err) => {
  console.error('Error:', err);
});

// Check if writable
if (writeStream.writable) {
  writeStream.write('Can write\\n');
}

// Handle backpressure
function writeMillionTimes(writer, data, encoding, callback) {
  let i = 1000000;
  write();
  
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // Last time - use callback
        writer.write(data, encoding, callback);
      } else {
        // Continue writing
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    
    if (i > 0) {
      // Had to stop early - buffer full
      // Resume when drained
      writer.once('drain', write);
    }
  }
}

const writer = fs.createWriteStream('big-file.txt');
writeMillionTimes(writer, 'Hello\\n', 'utf8', () => {
  console.log('Done writing 1 million lines');
});`}
        </CodeBlock>

        <Note type="tip">
          <strong>Backpressure:</strong> Ketika write() returns false, stop writing dan 
          wait untuk 'drain' event sebelum continue.
        </Note>
      </Section>

      <Section id="piping-streams" heading="Piping Streams">
        <p>
          Pipe adalah cara paling simple untuk connect streams. Output dari readable stream 
          langsung masuk ke writable stream.
        </p>
        <CodeBlock language="javascript">
{`const fs = require('fs');

// Simple pipe: copy file
const source = fs.createReadStream('input.txt');
const destination = fs.createWriteStream('output.txt');

source.pipe(destination);

// Pipe handles backpressure automatically!

// Multiple pipes (chaining)
const zlib = require('zlib');

fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())                    // Compress
  .pipe(fs.createWriteStream('input.txt.gz')); // Write compressed

// Decompress
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())                  // Decompress
  .pipe(fs.createWriteStream('output.txt'));  // Write decompressed

// Pipe with error handling
source
  .on('error', err => console.error('Read error:', err))
  .pipe(destination)
  .on('error', err => console.error('Write error:', err))
  .on('finish', () => console.log('Copy complete'));

// Pipe to multiple destinations
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

const input = fs.createReadStream('file.txt');
const output = fs.createWriteStream('file-copy.txt');

input.pipe(output);  // Copy file
input.pipe(hash);    // Calculate hash simultaneously

hash.on('finish', () => {
  console.log('SHA256:', hash.digest('hex'));
});`}
        </CodeBlock>
      </Section>

      <Section id="transform-streams" heading="Transform Streams">
        <CodeBlock language="javascript">
{`const { Transform } = require('stream');

// Create custom transform stream
class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    // Transform data
    const upperChunk = chunk.toString().toUpperCase();
    // Push transformed data
    this.push(upperChunk);
    // Signal done
    callback();
  }
}

// Usage
const fs = require('fs');
const upperCase = new UpperCaseTransform();

fs.createReadStream('input.txt')
  .pipe(upperCase)
  .pipe(fs.createWriteStream('output.txt'));

// Line counter transform
class LineCounter extends Transform {
  constructor() {
    super();
    this.lineCount = 0;
  }

  _transform(chunk, encoding, callback) {
    const lines = chunk.toString().split('\\n');
    this.lineCount += lines.length - 1; // -1 because last split might be incomplete
    this.push(chunk);
    callback();
  }

  _flush(callback) {
    console.log(\`Total lines: \${this.lineCount}\`);
    callback();
  }
}

const counter = new LineCounter();
fs.createReadStream('file.txt')
  .pipe(counter)
  .pipe(process.stdout);

// CSV to JSON transform
class CSVToJSON extends Transform {
  constructor() {
    super({ objectMode: true }); // Work with objects
    this.headers = null;
  }

  _transform(chunk, encoding, callback) {
    const lines = chunk.toString().split('\\n');
    
    lines.forEach(line => {
      if (!this.headers) {
        this.headers = line.split(',');
      } else if (line.trim()) {
        const values = line.split(',');
        const obj = {};
        this.headers.forEach((header, i) => {
          obj[header] = values[i];
        });
        this.push(JSON.stringify(obj) + '\\n');
      }
    });
    
    callback();
  }
}

const csvToJson = new CSVToJSON();
fs.createReadStream('data.csv')
  .pipe(csvToJson)
  .pipe(fs.createWriteStream('data.json'));`}
        </CodeBlock>
      </Section>

      <Section id="buffers" heading="Buffers">
        <p>
          Buffer adalah temporary storage untuk binary data. Used extensively dalam streams, 
          file operations, dan network communications.
        </p>
        <CodeBlock language="javascript">
{`// Create buffers
const buf1 = Buffer.alloc(10);              // Allocate 10 bytes (filled with 0)
const buf2 = Buffer.allocUnsafe(10);        // Faster but contains old data
const buf3 = Buffer.from([1, 2, 3, 4, 5]); // From array
const buf4 = Buffer.from('Hello');          // From string
const buf5 = Buffer.from('Hello', 'utf8');  // With encoding

// Buffer properties
console.log(buf4.length);        // 5
console.log(buf4.toString());    // 'Hello'
console.log(buf4.toString('hex')); // '48656c6c6f'

// Write to buffer
const buf = Buffer.alloc(10);
buf.write('Hello', 'utf8');
console.log(buf.toString()); // 'Hello'

// Read from buffer
console.log(buf[0]);         // 72 (ASCII code for 'H')

// Modify buffer
buf[0] = 74;                 // Change 'H' to 'J'
console.log(buf.toString()); // 'Jello'

// Buffer comparison
const buf6 = Buffer.from('ABC');
const buf7 = Buffer.from('ABD');
console.log(buf6.compare(buf7)); // -1 (buf6 < buf7)

// Buffer concatenation
const buf8 = Buffer.from('Hello ');
const buf9 = Buffer.from('World');
const result = Buffer.concat([buf8, buf9]);
console.log(result.toString()); // 'Hello World'

// Buffer slice
const buf10 = Buffer.from('Hello World');
const slice = buf10.slice(0, 5);
console.log(slice.toString()); // 'Hello'

// Note: slice creates view, not copy
slice[0] = 74;
console.log(buf10.toString()); // 'Jello World' (original changed!)

// Copy buffer
const buf11 = Buffer.from('Hello');
const buf12 = Buffer.alloc(buf11.length);
buf11.copy(buf12);
console.log(buf12.toString()); // 'Hello'

// Fill buffer
const buf13 = Buffer.alloc(10);
buf13.fill('a');
console.log(buf13.toString()); // 'aaaaaaaaaa'`}
        </CodeBlock>
      </Section>

      <Section id="practical-examples" heading="Practical Examples">
        <h3 className="text-lg font-semibold mb-2">1. Progress Bar for File Download</h3>
        <CodeBlock language="javascript">
{`const fs = require('fs');
const https = require('https');

function downloadWithProgress(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    let downloadedBytes = 0;
    let totalBytes = 0;

    https.get(url, (response) => {
      totalBytes = parseInt(response.headers['content-length'], 10);
      
      response.on('data', (chunk) => {
        downloadedBytes += chunk.length;
        const percent = ((downloadedBytes / totalBytes) * 100).toFixed(2);
        process.stdout.write(\`\\rDownloading... \${percent}%\`);
      });

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log('\\nDownload complete!');
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// Usage
downloadWithProgress(
  'https://example.com/large-file.zip',
  'downloaded.zip'
);`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">2. Log File Rotation</h3>
        <CodeBlock language="javascript">
{`const fs = require('fs');
const path = require('path');

class RotatingFileStream {
  constructor(filename, maxSize = 10 * 1024 * 1024) { // 10MB default
    this.filename = filename;
    this.maxSize = maxSize;
    this.currentSize = 0;
    this.stream = null;
    this.createStream();
  }

  createStream() {
    const exists = fs.existsSync(this.filename);
    
    if (exists) {
      const stats = fs.statSync(this.filename);
      this.currentSize = stats.size;
    }

    this.stream = fs.createWriteStream(this.filename, { flags: 'a' });
  }

  rotate() {
    // Close current stream
    this.stream.end();

    // Rename current file
    const timestamp = Date.now();
    const rotatedName = \`\${this.filename}.\${timestamp}\`;
    fs.renameSync(this.filename, rotatedName);

    // Create new stream
    this.currentSize = 0;
    this.createStream();
  }

  write(data) {
    const size = Buffer.byteLength(data);

    if (this.currentSize + size > this.maxSize) {
      this.rotate();
    }

    this.stream.write(data);
    this.currentSize += size;
  }

  end() {
    this.stream.end();
  }
}

// Usage
const logger = new RotatingFileStream('app.log', 1024 * 1024); // 1MB

for (let i = 0; i < 100000; i++) {
  logger.write(\`Log entry \${i}\\n\`);
}

logger.end();`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">3. CSV Parser Stream</h3>
        <CodeBlock language="javascript">
{`const { Transform } = require('stream');
const fs = require('fs');

class CSVParser extends Transform {
  constructor(options = {}) {
    super({ objectMode: true });
    this.headers = null;
    this.buffer = '';
  }

  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString();
    const lines = this.buffer.split('\\n');
    
    // Keep last incomplete line in buffer
    this.buffer = lines.pop();

    lines.forEach(line => {
      if (!this.headers) {
        this.headers = line.split(',').map(h => h.trim());
      } else if (line.trim()) {
        const values = line.split(',').map(v => v.trim());
        const obj = {};
        
        this.headers.forEach((header, i) => {
          obj[header] = values[i] || '';
        });
        
        this.push(obj);
      }
    });

    callback();
  }

  _flush(callback) {
    // Process remaining buffer
    if (this.buffer.trim()) {
      const values = this.buffer.split(',').map(v => v.trim());
      const obj = {};
      
      this.headers.forEach((header, i) => {
        obj[header] = values[i] || '';
      });
      
      this.push(obj);
    }
    callback();
  }
}

// Usage
const parser = new CSVParser();

fs.createReadStream('data.csv')
  .pipe(parser)
  .on('data', (row) => {
    console.log('Row:', row);
  })
  .on('end', () => {
    console.log('Parsing complete');
  });`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Use streams</strong> untuk large files untuk avoid memory issues</li>
          <li><strong>Handle errors</strong> on all streams di pipe chain</li>
          <li><strong>Respect backpressure</strong> - check write() return value</li>
          <li><strong>Use pipe()</strong> untuk automatic backpressure handling</li>
          <li><strong>Close streams</strong> properly dengan end() atau destroy()</li>
          <li><strong>Use objectMode</strong> untuk streams that work dengan objects</li>
          <li><strong>Buffer.alloc()</strong> over allocUnsafe() untuk security</li>
          <li><strong>Consider pipeline()</strong> utility untuk better error handling</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Streams process data piece by piece - memory efficient</li>
          <li>4 types: Readable, Writable, Duplex, Transform</li>
          <li>Use pipe() untuk connect streams dengan automatic backpressure</li>
          <li>Transform streams untuk modify data in-flight</li>
          <li>Buffers untuk temporary storage of binary data</li>
          <li>Always handle errors on streams</li>
          <li>Streams ideal untuk large files, network data, real-time processing</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
