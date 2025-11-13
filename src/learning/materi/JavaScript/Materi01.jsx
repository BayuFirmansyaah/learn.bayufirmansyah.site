import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi01() {
  return (
    <MateriLayout
      title="Pengenalan JavaScript"
      intro="Belajar tentang JavaScript - bahasa pemrograman paling populer untuk web development. Dari sejarah, kegunaan, hingga membuat program pertama."
    >
      <Section id="apa-itu-js" heading="Apa itu JavaScript?">
        <p>
          <strong>JavaScript</strong> adalah bahasa pemrograman yang digunakan untuk membuat website interaktif dan dynamic. Awalnya dibuat oleh Brendan Eich di Netscape tahun 1995 dalam waktu 10 hari saja!
        </p>

        <p>
          JavaScript adalah salah satu dari 3 core technologies untuk web development:
        </p>
        <ul>
          <li><strong>HTML</strong> - Structure (kerangka website)</li>
          <li><strong>CSS</strong> - Style (tampilan/desain)</li>
          <li><strong>JavaScript</strong> - Behavior (interaksi & logic)</li>
        </ul>

        <Note type="info">
          JavaScript bukan Java! Meskipun namanya mirip, keduanya adalah bahasa yang berbeda total. JavaScript dinamai begitu untuk marketing purposes saat Java sedang populer.
        </Note>
      </Section>

      <Section id="kegunaan" heading="Kegunaan JavaScript">
        <Subsection id="frontend" heading="Frontend Development">
          <ul>
            <li>Membuat website interaktif (forms, animations, modal)</li>
            <li>Single Page Applications (SPA) dengan React, Vue, Angular</li>
            <li>Progressive Web Apps (PWA)</li>
            <li>Mobile apps dengan React Native, Ionic</li>
          </ul>
        </Subsection>

        <Subsection id="backend" heading="Backend Development">
          <ul>
            <li>Server-side programming dengan Node.js</li>
            <li>REST APIs dan GraphQL</li>
            <li>Real-time applications dengan WebSocket</li>
            <li>Database operations (MongoDB, MySQL, PostgreSQL)</li>
          </ul>
        </Subsection>

        <Subsection id="other" heading="Other Use Cases">
          <ul>
            <li>Desktop apps dengan Electron (VS Code, Discord, Slack)</li>
            <li>Game development dengan Phaser, Three.js</li>
            <li>IoT (Internet of Things) dengan Johnny-Five</li>
            <li>Machine Learning dengan TensorFlow.js</li>
          </ul>
        </Subsection>
      </Section>

      <Section id="setup" heading="Setup Environment">
        <p>
          Untuk menjalankan JavaScript, kamu butuh:
        </p>

        <Subsection id="browser" heading="1. Browser (Easiest)">
          <p>
            Semua modern browsers (Chrome, Firefox, Safari, Edge) sudah punya JavaScript engine built-in.
          </p>

          <p><strong>Cara run JavaScript di browser:</strong></p>
          <ol>
            <li>Buka browser (misal Chrome)</li>
            <li>Klik kanan → Inspect / Inspect Element</li>
            <li>Pilih tab "Console"</li>
            <li>Ketik code JavaScript langsung!</li>
          </ol>

          <CodeBlock language="javascript">
{`// Ketik di Console browser
console.log("Hello World!");
alert("Ini alert box");
2 + 2  // Output: 4`}
          </CodeBlock>
        </Subsection>

        <Subsection id="nodejs" heading="2. Node.js (Recommended)">
          <p>
            <strong>Node.js</strong> adalah JavaScript runtime untuk run JavaScript di luar browser (di computer/server).
          </p>

          <p><strong>Install Node.js:</strong></p>
          <ol>
            <li>Download dari <a href="https://nodejs.org" target="_blank">nodejs.org</a></li>
            <li>Install (pilih LTS version)</li>
            <li>Verify: <code>node --version</code></li>
          </ol>

          <CodeBlock language="bash">
{`# Check Node.js installed
node --version
# Output: v20.10.0

# Run JavaScript file
node app.js

# Open Node.js REPL (interactive mode)
node`}
          </CodeBlock>
        </Subsection>

        <Subsection id="editor" heading="3. Code Editor">
          <p>Gunakan code editor untuk write JavaScript code:</p>
          <ul>
            <li><strong>VS Code</strong> (Recommended) - Free, extensions, debugging</li>
            <li><strong>Sublime Text</strong> - Lightweight & fast</li>
            <li><strong>WebStorm</strong> - Full-featured IDE (paid)</li>
          </ul>
        </Subsection>
      </Section>

      <Section id="first-program" heading="Program Pertama">
        <Subsection id="console" heading="Console.log - Output ke Console">
          <p>
            <code>console.log()</code> adalah cara paling common untuk output/print data.
          </p>

          <CodeBlock language="javascript">
{`// Output text
console.log("Hello World!");

// Output numbers
console.log(42);

// Output multiple values
console.log("Umur:", 25, "tahun");

// Output variables
let name = "Budi";
console.log("Halo", name);`}
          </CodeBlock>
        </Subsection>

        <Subsection id="html-integration" heading="JavaScript di HTML">
          <p>
            Ada 3 cara untuk add JavaScript ke HTML:
          </p>

          <p><strong>1. Inline JavaScript (Not Recommended):</strong></p>
          <CodeBlock language="html">
{`<button onclick="alert('Clicked!')">Click Me</button>`}
          </CodeBlock>

          <p><strong>2. Internal JavaScript:</strong></p>
          <CodeBlock language="html">
{`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World</h1>
  
  <script>
    console.log("JavaScript running!");
    alert("Page loaded!");
  </script>
</body>
</html>`}
          </CodeBlock>

          <p><strong>3. External JavaScript (Best Practice):</strong></p>
          <CodeBlock language="html">
{`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World</h1>
  
  <!-- Load JS file -->
  <script src="app.js"></script>
</body>
</html>`}
          </CodeBlock>

          <CodeBlock language="javascript">
{`// app.js
console.log("External JS loaded!");

// Code here can access HTML elements
document.querySelector('h1').style.color = 'blue';`}
          </CodeBlock>

          <Note type="warning">
            <strong>Best Practice:</strong> Taruh <code>&lt;script&gt;</code> tag di akhir <code>&lt;body&gt;</code> agar HTML load dulu sebelum JavaScript runs. Atau gunakan <code>defer</code> attribute.
          </Note>
        </Subsection>
      </Section>

      <Section id="comments" heading="Comments">
        <p>
          Comments adalah text yang diabaikan oleh JavaScript engine. Berguna untuk dokumentasi.
        </p>

        <CodeBlock language="javascript">
{`// Single line comment
// Ini tidak dijalankan

/* 
  Multi-line comment
  Bisa beberapa baris
  Untuk dokumentasi panjang
*/

let age = 25;  // Inline comment

// TODO: Implement this function later
// FIXME: Bug on line 42`}
        </CodeBlock>
      </Section>

      <Section id="syntax-basics" heading="Syntax Basics">
        <Subsection id="statements" heading="Statements">
          <p>
            Statement adalah instruksi untuk JavaScript. Diakhiri dengan <strong>semicolon (;)</strong>
          </p>

          <CodeBlock language="javascript">
{`let x = 5;         // Statement
let y = 10;        // Another statement
console.log(x + y); // Statement with function call

// Semicolon optional (tapi recommended)
let a = 1
let b = 2  // Works, but not recommended`}
          </CodeBlock>
        </Subsection>

        <Subsection id="case-sensitive" heading="Case Sensitive">
          <p>
            JavaScript is <strong>case sensitive</strong>. <code>name</code>, <code>Name</code>, dan <code>NAME</code> adalah variables yang berbeda.
          </p>

          <CodeBlock language="javascript">
{`let name = "Budi";
let Name = "Ani";
let NAME = "Charlie";

console.log(name);  // "Budi"
console.log(Name);  // "Ani"
console.log(NAME);  // "Charlie"

// Function names juga case sensitive
console.log("test");  //  Works
Console.log("test");  // ❌ Error: Console is not defined`}
          </CodeBlock>
        </Subsection>

        <Subsection id="whitespace" heading="Whitespace & Line Breaks">
          <p>
            JavaScript mengabaikan extra spaces, tabs, dan line breaks (mostly).
          </p>

          <CodeBlock language="javascript">
{`// These are all the same:
let sum = 1 + 2;
let sum=1+2;
let sum = 1     +     2;

// Line breaks untuk readability
let result = (10 + 20 + 30 + 40 + 50) / 5;

// Better:
let result = (
  10 + 20 + 30 + 
  40 + 50
) / 5;`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li> Use meaningful variable names: <code>userAge</code> bukan <code>x</code></li>
          <li> Always use <code>let</code> atau <code>const</code>, avoid <code>var</code></li>
          <li> Add semicolons di akhir statements</li>
          <li> Use comments untuk explain complex logic</li>
          <li> Indent code properly (2 atau 4 spaces)</li>
          <li> Use camelCase untuk variable names: <code>firstName</code></li>
          <li> Keep functions small dan focused</li>
          <li> Test code di browser console atau Node.js</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li> JavaScript adalah bahasa untuk web interactivity</li>
          <li> Bisa run di browser (Console) atau Node.js</li>
          <li> 3 ways to add JS to HTML: inline, internal, external</li>
          <li> <code>console.log()</code> untuk output data</li>
          <li> Use comments (<code>//</code> atau <code>/* */</code>) untuk dokumentasi</li>
          <li> JavaScript is case sensitive</li>
          <li> Follow best practices untuk clean code</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
