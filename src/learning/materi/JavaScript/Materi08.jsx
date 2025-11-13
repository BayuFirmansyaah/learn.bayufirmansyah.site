import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi08() {
  return (
    <MateriLayout
      title="String Methods"
      description="Pelajari berbagai method untuk memanipulasi string di JavaScript"
    >
      {/* Intro */}
      <Section title="Pengenalan String">
        <p>
          String adalah tipe data yang merepresentasikan teks. JavaScript menyediakan 
          banyak method built-in untuk memanipulasi string seperti mengubah format, 
          mencari karakter, memotong string, dan banyak lagi.
        </p>
        
        <CodeBlock language="javascript">
{`// Membuat string
const text1 = "Hello World";      // Double quotes
const text2 = 'JavaScript';        // Single quotes
const text3 = \`Template Literal\`; // Backticks

// String adalah immutable (tidak bisa diubah)
let str = "Hello";
str[0] = "h";  // Tidak mengubah string
console.log(str);  // Output: "Hello" (masih huruf besar)

// Harus buat string baru untuk mengubah
str = "h" + str.slice(1);
console.log(str);  // Output: "hello"`}
        </CodeBlock>
        
        <Note type="info">
          String di JavaScript bersifat <strong>immutable</strong>, artinya sekali dibuat 
          tidak bisa diubah. Method string selalu mengembalikan string baru.
        </Note>
      </Section>

      {/* Template Literals */}
      <Section title="Template Literals">
        <p>
          Template literals menggunakan backticks (`) dan memungkinkan interpolasi 
          variabel, multi-line string, dan expression embedding.
        </p>
        
        <CodeBlock language="javascript">
{`// Interpolasi variabel
const name = "Budi";
const age = 25;
const greeting = \`Halo, nama saya \${name} dan umur saya \${age} tahun\`;
console.log(greeting);
// Output: "Halo, nama saya Budi dan umur saya 25 tahun"

// Expression embedding
const price = 50000;
const quantity = 3;
console.log(\`Total: Rp \${price * quantity}\`);
// Output: "Total: Rp 150000"

// Multi-line string
const address = \`
  Jalan Merdeka No. 123
  Jakarta Pusat
  Indonesia
\`;
console.log(address);

// Tagged templates (advanced)
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? \`<mark>\${values[i]}</mark>\` : '');
  }, '');
}

const result = highlight\`Harga: \${price}, Jumlah: \${quantity}\`;
console.log(result);
// Output: "Harga: <mark>50000</mark>, Jumlah: <mark>3</mark>"`}
        </CodeBlock>
      </Section>

      {/* String Properties */}
      <Section title="String Properties">
        <h3 className="text-lg font-semibold mb-2">length</h3>
        <p>Mendapatkan panjang string (jumlah karakter).</p>
        
        <CodeBlock language="javascript">
{`const text = "JavaScript";
console.log(text.length);  // Output: 10

const empty = "";
console.log(empty.length);  // Output: 0

// Hati-hati dengan emoji dan Unicode
const emoji = "👋🏻";
console.log(emoji.length);  // Output: 4 (bukan 1!)

// Akses karakter dengan index
console.log(text[0]);     // Output: "J"
console.log(text[9]);     // Output: "t"
console.log(text[10]);    // Output: undefined`}
        </CodeBlock>
      </Section>

      {/* String Search Methods */}
      <Section title="Method Pencarian String">
        <h3 className="text-lg font-semibold mb-2">indexOf() & lastIndexOf()</h3>
        <p>Mencari posisi (index) dari substring atau karakter.</p>
        
        <CodeBlock language="javascript">
{`const text = "Hello World, Welcome to JavaScript World";

// indexOf() - mencari dari awal
console.log(text.indexOf("World"));        // Output: 6
console.log(text.indexOf("world"));        // Output: -1 (case-sensitive)
console.log(text.indexOf("o"));            // Output: 4 (o pertama)
console.log(text.indexOf("o", 5));         // Output: 7 (mulai dari index 5)

// lastIndexOf() - mencari dari akhir
console.log(text.lastIndexOf("World"));    // Output: 37
console.log(text.lastIndexOf("o"));        // Output: 39 (o terakhir)

// Mengecek apakah string mengandung substring
if (text.indexOf("JavaScript") !== -1) {
  console.log("Kata 'JavaScript' ditemukan!");
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">includes()</h3>
        <p>Mengecek apakah string mengandung substring (mengembalikan boolean).</p>
        
        <CodeBlock language="javascript">
{`const text = "Learn JavaScript Programming";

console.log(text.includes("JavaScript"));     // Output: true
console.log(text.includes("Python"));         // Output: false
console.log(text.includes("java"));           // Output: false (case-sensitive)
console.log(text.includes("Script", 10));     // Output: true (mulai dari index 10)

// Lebih mudah dibaca daripada indexOf !== -1
if (text.includes("JavaScript")) {
  console.log("Ini adalah materi JavaScript!");
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">startsWith() & endsWith()</h3>
        <p>Mengecek apakah string dimulai atau diakhiri dengan substring tertentu.</p>
        
        <CodeBlock language="javascript">
{`const filename = "document.pdf";
const url = "https://example.com/page"\;

// startsWith()
console.log(filename.startsWith("doc"));      // Output: true
console.log(url.startsWith("https://"));      // Output: true
console.log(url.startsWith("http://"));       // Output: false

// endsWith()
console.log(filename.endsWith(".pdf"));       // Output: true
console.log(filename.endsWith(".doc"));       // Output: false

// Dengan parameter panjang
const text = "Hello World";
console.log(text.startsWith("World", 6));     // Output: true (mulai dari index 6)
console.log(text.endsWith("Hello", 5));       // Output: true (5 karakter pertama)

// Use case: validasi file
function isImageFile(filename) {
  return filename.endsWith(".jpg") || 
         filename.endsWith(".png") || 
         filename.endsWith(".gif");
}

console.log(isImageFile("photo.jpg"));        // Output: true
console.log(isImageFile("document.pdf"));     // Output: false`}
        </CodeBlock>
      </Section>

      {/* String Extraction Methods */}
      <Section title="Method Ekstraksi String">
        <h3 className="text-lg font-semibold mb-2">slice()</h3>
        <p>Mengambil sebagian string berdasarkan index awal dan akhir.</p>
        
        <CodeBlock language="javascript">
{`const text = "JavaScript Programming";

// slice(start, end) - end tidak termasuk
console.log(text.slice(0, 10));      // Output: "JavaScript"
console.log(text.slice(11));         // Output: "Programming" (dari index 11 sampai akhir)
console.log(text.slice(-11));        // Output: "Programming" (11 karakter dari akhir)
console.log(text.slice(4, -1));      // Output: "Script Programmin"

// Mengambil karakter terakhir
console.log(text.slice(-1));         // Output: "g"

// Clone string
const clone = text.slice();
console.log(clone);                  // Output: "JavaScript Programming"`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">substring()</h3>
        <p>Mirip dengan slice(), tapi tidak mendukung index negatif.</p>
        
        <CodeBlock language="javascript">
{`const text = "JavaScript";

console.log(text.substring(0, 4));   // Output: "Java"
console.log(text.substring(4));      // Output: "Script"

// Jika start > end, akan ditukar otomatis
console.log(text.substring(4, 0));   // Output: "Java" (sama dengan substring(0, 4))

// Index negatif dianggap 0
console.log(text.substring(-3));     // Output: "JavaScript" (sama dengan substring(0))

// Lebih baik gunakan slice() karena lebih konsisten`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">substr() [Deprecated]</h3>
        <p>Mengambil string berdasarkan posisi awal dan panjang (tidak direkomendasikan).</p>
        
        <CodeBlock language="javascript">
{`const text = "JavaScript";

// substr(start, length)
console.log(text.substr(0, 4));      // Output: "Java"
console.log(text.substr(4, 6));      // Output: "Script"
console.log(text.substr(4));         // Output: "Script"

// ⚠️ Method ini deprecated, gunakan slice() sebagai gantinya`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">charAt() & charCodeAt()</h3>
        <p>Mendapatkan karakter atau kode karakter pada index tertentu.</p>
        
        <CodeBlock language="javascript">
{`const text = "Hello";

// charAt() - mendapatkan karakter
console.log(text.charAt(0));         // Output: "H"
console.log(text.charAt(4));         // Output: "o"
console.log(text.charAt(10));        // Output: "" (empty string, bukan undefined)

// charCodeAt() - mendapatkan kode Unicode
console.log(text.charCodeAt(0));     // Output: 72 (kode untuk 'H')
console.log(text.charCodeAt(1));     // Output: 101 (kode untuk 'e')

// Bracket notation lebih umum digunakan
console.log(text[0]);                // Output: "H" (sama dengan charAt(0))`}
        </CodeBlock>
      </Section>

      {/* String Transform Methods */}
      <Section title="Method Transformasi String">
        <h3 className="text-lg font-semibold mb-2">toUpperCase() & toLowerCase()</h3>
        <p>Mengubah string menjadi huruf besar atau kecil.</p>
        
        <CodeBlock language="javascript">
{`const text = "JavaScript Programming";

console.log(text.toUpperCase());     // Output: "JAVASCRIPT PROGRAMMING"
console.log(text.toLowerCase());     // Output: "javascript programming"

// Use case: perbandingan case-insensitive
const input = "HELLO";
const expected = "hello";
console.log(input.toLowerCase() === expected);  // Output: true

// Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

console.log(capitalize("jAVAsCRIPT"));  // Output: "Javascript"`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">trim(), trimStart(), trimEnd()</h3>
        <p>Menghapus whitespace di awal dan/atau akhir string.</p>
        
        <CodeBlock language="javascript">
{`const text = "   Hello World   ";

console.log(text.trim());            // Output: "Hello World"
console.log(text.trimStart());       // Output: "Hello World   "
console.log(text.trimEnd());         // Output: "   Hello World"

// Alias lama
console.log(text.trimLeft());        // Sama dengan trimStart()
console.log(text.trimRight());       // Sama dengan trimEnd()

// Use case: validasi input form
function validateInput(input) {
  const cleaned = input.trim();
  if (cleaned.length === 0) {
    return "Input tidak boleh kosong!";
  }
  return cleaned;
}

console.log(validateInput("   "));   // Output: "Input tidak boleh kosong!"`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">padStart() & padEnd()</h3>
        <p>Menambahkan karakter padding hingga mencapai panjang tertentu.</p>
        
        <CodeBlock language="javascript">
{`const num = "5";

// padStart(targetLength, padString)
console.log(num.padStart(3, "0"));   // Output: "005"
console.log(num.padStart(5, "*"));   // Output: "****5"

// padEnd(targetLength, padString)
console.log(num.padEnd(3, "0"));     // Output: "500"

// Use case: format nomor
const accountNumber = "12345";
console.log(accountNumber.padStart(10, "0"));  // Output: "0000012345"

// Use case: align text
const items = ["Apple", "Banana", "Cherry"];
items.forEach(item => {
  console.log(item.padEnd(10, ".") + " $5");
});
// Output:
// Apple..... $5
// Banana.... $5
// Cherry.... $5`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">repeat()</h3>
        <p>Mengulangi string sebanyak n kali.</p>
        
        <CodeBlock language="javascript">
{`const star = "*";
console.log(star.repeat(5));         // Output: "*****"

const text = "Ha";
console.log(text.repeat(3));         // Output: "HaHaHa"

// Use case: membuat separator
console.log("=".repeat(50));         // Output: ==================================================

// Use case: indentasi
function indent(text, level) {
  return "  ".repeat(level) + text;
}

console.log(indent("Hello", 0));     // Output: "Hello"
console.log(indent("Hello", 2));     // Output: "    Hello"`}
        </CodeBlock>
      </Section>

      {/* String Replace Methods */}
      <Section title="Method Replace String">
        <h3 className="text-lg font-semibold mb-2">replace()</h3>
        <p>Mengganti substring pertama yang ditemukan dengan string baru.</p>
        
        <CodeBlock language="javascript">
{`const text = "Hello World, Hello JavaScript";

// Hanya mengganti yang pertama
console.log(text.replace("Hello", "Hi"));
// Output: "Hi World, Hello JavaScript"

// Dengan regex untuk replace all
console.log(text.replace(/Hello/g, "Hi"));
// Output: "Hi World, Hi JavaScript"

// Case-insensitive dengan regex
console.log(text.replace(/hello/i, "Hi"));
// Output: "Hi World, Hello JavaScript"

// Dengan function
const price = "Harga: $100";
const converted = price.replace(/\$(\d+)/, (match, number) => {
  return "Rp " + (number * 15000);
});
console.log(converted);  // Output: "Harga: Rp 1500000"`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">replaceAll()</h3>
        <p>Mengganti semua kemunculan substring (ES2021).</p>
        
        <CodeBlock language="javascript">
{`const text = "Hello World, Hello JavaScript";

// Mengganti semua kemunculan
console.log(text.replaceAll("Hello", "Hi"));
// Output: "Hi World, Hi JavaScript"

// Juga bisa dengan regex
console.log(text.replaceAll(/Hello/g, "Hi"));
// Output: "Hi World, Hi JavaScript"

// Use case: sanitasi input
const userInput = "Hello <script>alert('XSS')</script>";
const safe = userInput
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");
console.log(safe);
// Output: "Hello &lt;script&gt;alert('XSS')&lt;/script&gt;"`}
        </CodeBlock>
      </Section>

      {/* Split & Join */}
      <Section title="Split & Join">
        <h3 className="text-lg font-semibold mb-2">split()</h3>
        <p>Memecah string menjadi array berdasarkan delimiter.</p>
        
        <CodeBlock language="javascript">
{`const text = "JavaScript,Python,Java,C++";

// Split dengan delimiter
console.log(text.split(","));
// Output: ["JavaScript", "Python", "Java", "C++"]

// Split dengan limit
console.log(text.split(",", 2));
// Output: ["JavaScript", "Python"]

// Split setiap karakter
console.log("Hello".split(""));
// Output: ["H", "e", "l", "l", "o"]

// Split dengan regex
const sentence = "Hello   World   JavaScript";
console.log(sentence.split(/\s+/));
// Output: ["Hello", "World", "JavaScript"]

// Use case: parsing CSV
const csv = "John,Doe,25,Jakarta";
const [firstName, lastName, age, city] = csv.split(",");
console.log(\`\${firstName} \${lastName}, \${age}, \${city}\`);
// Output: "John Doe, 25, Jakarta"`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">join() [Array Method]</h3>
        <p>Menggabungkan array menjadi string (method array, bukan string).</p>
        
        <CodeBlock language="javascript">
{`const words = ["JavaScript", "is", "awesome"];

// Join dengan delimiter
console.log(words.join(" "));
// Output: "JavaScript is awesome"

console.log(words.join("-"));
// Output: "JavaScript-is-awesome"

console.log(words.join(""));
// Output: "JavaScriptisawesome"

// Default delimiter adalah koma
console.log(words.join());
// Output: "JavaScript,is,awesome"

// Use case: membuat URL slug
function createSlug(title) {
  return title
    .toLowerCase()
    .split(" ")
    .join("-");
}

console.log(createSlug("Learn JavaScript Programming"));
// Output: "learn-javascript-programming"`}
        </CodeBlock>
      </Section>

      {/* String Comparison */}
      <Section title="Perbandingan String">
        <p>
          String dapat dibandingkan menggunakan operator perbandingan. 
          Perbandingan dilakukan berdasarkan nilai Unicode (lexicographical order).
        </p>
        
        <CodeBlock language="javascript">
{`// Perbandingan ==
console.log("hello" === "hello");    // Output: true
console.log("hello" === "Hello");    // Output: false (case-sensitive)

// Perbandingan <, >, <=, >=
console.log("a" < "b");              // Output: true
console.log("apple" < "banana");     // Output: true
console.log("10" < "2");             // Output: true (perbandingan string, bukan number!)

// localeCompare() untuk perbandingan yang lebih baik
const str1 = "a";
const str2 = "b";

console.log(str1.localeCompare(str2));   // Output: -1 (str1 < str2)
console.log(str2.localeCompare(str1));   // Output: 1 (str2 > str1)
console.log(str1.localeCompare(str1));   // Output: 0 (equal)

// Case-insensitive comparison
const name1 = "Alice";
const name2 = "alice";
console.log(name1.toLowerCase() === name2.toLowerCase());  // Output: true

// Sorting array of strings
const names = ["Charlie", "Alice", "Bob"];
names.sort((a, b) => a.localeCompare(b));
console.log(names);  // Output: ["Alice", "Bob", "Charlie"]`}
        </CodeBlock>
      </Section>

      {/* Escape Characters */}
      <Section title="Escape Characters">
        <p>
          Karakter khusus yang diawali dengan backslash (\) untuk merepresentasikan 
          karakter yang tidak bisa ditulis langsung.
        </p>
        
        <CodeBlock language="javascript">
{`// Newline
console.log("Hello\nWorld");
// Output:
// Hello
// World

// Tab
console.log("Name:\tJohn");
// Output: Name:John

// Quotes dalam string
console.log("He said, \"Hello\"");       // Output: He said, "Hello"
console.log('It\'s a beautiful day');    // Output: It's a beautiful day

// Backslash
console.log("Path: C:\\Users\\John");    // Output: Path: C:\Users\John

// Unicode character
console.log("\u00A9");                   // Output: © (copyright symbol)
console.log("\u2665");                   // Output: ♥ (heart symbol)

// Semua escape characters
const escapes = \`
\\n - Newline
\\t - Tab
\\r - Carriage return
\\b - Backspace
\\f - Form feed
\\' - Single quote
\\" - Double quote
\\\\ - Backslash
\\uXXXX - Unicode character
\`;
console.log(escapes);`}
        </CodeBlock>
      </Section>

      {/* Best Practices */}
      <Section title="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Gunakan Template Literals untuk String Kompleks</strong>
            <CodeBlock language="javascript">
{`// ❌ Buruk - sulit dibaca
const message = "Hello " + name + ", your balance is $" + balance;

// ✅ Baik - lebih mudah dibaca
const message = \`Hello \${name}, your balance is $\${balance}\`;`}
            </CodeBlock>
          </div>

          <div>
            <strong>2. Gunakan includes() Daripada indexOf()</strong>
            <CodeBlock language="javascript">
{`// ❌ Buruk
if (text.indexOf("JavaScript") !== -1) { }

// ✅ Baik - lebih jelas
if (text.includes("JavaScript")) { }`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Gunakan slice() Daripada substring() atau substr()</strong>
            <CodeBlock language="javascript">
{`// ✅ Baik - slice() lebih konsisten dan mendukung index negatif
const sub = text.slice(0, 5);
const last = text.slice(-3);`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Gunakan trim() untuk Input User</strong>
            <CodeBlock language="javascript">
{`// ✅ Selalu trim input user
const username = userInput.trim();
if (username.length === 0) {
  throw new Error("Username tidak boleh kosong");
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>5. Case-Insensitive Comparison</strong>
            <CodeBlock language="javascript">
{`// ✅ Convert ke lowercase/uppercase untuk perbandingan
if (input.toLowerCase() === expected.toLowerCase()) {
  // Match!
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>6. Gunakan replaceAll() untuk Replace Multiple</strong>
            <CodeBlock language="javascript">
{`// ❌ Buruk - hanya replace yang pertama
text.replace("old", "new");

// ✅ Baik - replace semua
text.replaceAll("old", "new");
// atau dengan regex
text.replace(/old/g, "new");`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      {/* Summary */}
      <Section title="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Konsep Penting:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>String Immutable:</strong> String tidak bisa diubah, method selalu return string baru</li>
            <li><strong>Template Literals:</strong> Gunakan backticks untuk interpolasi dan multi-line string</li>
            <li><strong>Search Methods:</strong> includes(), indexOf(), startsWith(), endsWith() untuk pencarian</li>
            <li><strong>Extract Methods:</strong> slice(), substring() untuk mengambil bagian string</li>
            <li><strong>Transform Methods:</strong> toUpperCase(), toLowerCase(), trim(), pad(), repeat()</li>
            <li><strong>Replace Methods:</strong> replace(), replaceAll() untuk mengganti substring</li>
            <li><strong>Split & Join:</strong> Konversi antara string dan array</li>
            <li><strong>Comparison:</strong> Gunakan localeCompare() untuk sorting yang benar</li>
          </ul>
          
          <h3 className="font-semibold mt-4 mb-3">Method yang Paling Sering Digunakan:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>Template literals untuk string interpolation</li>
            <li>includes() untuk mengecek keberadaan substring</li>
            <li>slice() untuk ekstraksi substring</li>
            <li>trim() untuk membersihkan whitespace</li>
            <li>toLowerCase()/toUpperCase() untuk transformasi case</li>
            <li>split() dan join() untuk konversi string ↔ array</li>
            <li>replace()/replaceAll() untuk mengganti substring</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
