import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi09() {
  return (
    <MateriLayout
      title="DOM Manipulation"
      description="Pelajari cara memanipulasi HTML dan CSS menggunakan JavaScript melalui Document Object Model (DOM)"
    >
      {/* Intro */}
      <Section id="pengenalan-dom" heading="Pengenalan DOM">
        <p>
          Document Object Model (DOM) adalah representasi struktur HTML dalam bentuk tree/pohon 
          yang dapat diakses dan dimanipulasi oleh JavaScript. DOM memungkinkan kita untuk 
          mengubah konten, struktur, dan style halaman web secara dinamis.
        </p>
        
        <CodeBlock language="html">
{`<!-- Struktur HTML -->
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1 id="title">Hello World</h1>
    <p class="text">This is a paragraph.</p>
    <button onclick="changeText()">Click Me</button>
  </body>
</html>

<!-- DOM Tree Structure:
document
  └── html
      ├── head
      │   └── title
      └── body
          ├── h1 (id="title")
          ├── p (class="text")
          └── button
-->`}
        </CodeBlock>
        
        <Note type="info">
          DOM bukan bagian dari JavaScript, melainkan Web API yang disediakan oleh browser. 
          JavaScript hanya bahasa yang digunakan untuk mengaksesnya.
        </Note>
      </Section>

      {/* Selecting Elements */}
      <Section id="memilih-elemen-dom" heading="Memilih Elemen DOM">
        <h3 className="text-lg font-semibold mb-2">getElementById()</h3>
        <p>Memilih elemen berdasarkan ID (hanya mengembalikan 1 elemen).</p>
        
        <CodeBlock language="javascript">
{`// HTML: <h1 id="title">Hello</h1>
const title = document.getElementById('title');
console.log(title);  // <h1 id="title">Hello</h1>
console.log(title.textContent);  // "Hello"

// Jika tidak ditemukan
const notFound = document.getElementById('not-exist');
console.log(notFound);  // null`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">getElementsByClassName()</h3>
        <p>Memilih semua elemen dengan class tertentu (mengembalikan HTMLCollection).</p>
        
        <CodeBlock language="javascript">
{`// HTML: <p class="text">Para 1</p>
//        <p class="text">Para 2</p>
const texts = document.getElementsByClassName('text');
console.log(texts);  // HTMLCollection(2)
console.log(texts[0].textContent);  // "Para 1"
console.log(texts.length);  // 2

// HTMLCollection bukan array, tapi bisa diiterasi
for (let i = 0; i < texts.length; i++) {
  console.log(texts[i].textContent);
}

// Convert ke array untuk menggunakan array methods
const textsArray = Array.from(texts);
textsArray.forEach(text => console.log(text.textContent));`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">getElementsByTagName()</h3>
        <p>Memilih semua elemen dengan tag tertentu.</p>
        
        <CodeBlock language="javascript">
{`// Memilih semua paragraph
const paragraphs = document.getElementsByTagName('p');
console.log(paragraphs.length);

// Memilih semua div
const divs = document.getElementsByTagName('div');

// Memilih semua elemen
const allElements = document.getElementsByTagName('*');
console.log(allElements.length);  // Semua elemen di halaman`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">querySelector() & querySelectorAll()</h3>
        <p>Memilih elemen menggunakan CSS selector (metode modern dan paling fleksibel).</p>
        
        <CodeBlock language="javascript">
{`// querySelector() - hanya mengembalikan elemen pertama yang cocok
const title = document.querySelector('#title');  // By ID
const firstText = document.querySelector('.text');  // By class
const firstButton = document.querySelector('button');  // By tag

// CSS selector yang lebih kompleks
const firstLink = document.querySelector('a[href^="https"]');
const activeItem = document.querySelector('.menu-item.active');
const firstChild = document.querySelector('ul > li:first-child');

// querySelectorAll() - mengembalikan NodeList (mirip array)
const allTexts = document.querySelectorAll('.text');
const allButtons = document.querySelectorAll('button');

// NodeList bisa langsung diiterasi dengan forEach
allTexts.forEach(text => {
  console.log(text.textContent);
});

// Combine multiple selectors
const elements = document.querySelectorAll('h1, h2, h3');
elements.forEach(heading => console.log(heading.tagName));

// Jika tidak ditemukan
console.log(document.querySelector('.not-exist'));  // null
console.log(document.querySelectorAll('.not-exist').length);  // 0`}
        </CodeBlock>

        <Note type="tip">
          Gunakan <code>querySelector()</code> dan <code>querySelectorAll()</code> karena 
          lebih fleksibel dan modern dibanding method lainnya.
        </Note>
      </Section>

      {/* Manipulating Content */}
      <Section id="mengubah-konten-elemen" heading="Mengubah Konten Elemen">
        <h3 className="text-lg font-semibold mb-2">textContent</h3>
        <p>Mengambil atau mengubah teks di dalam elemen (tanpa HTML).</p>
        
        <CodeBlock language="javascript">
{`const heading = document.querySelector('h1');

// Mengambil teks
console.log(heading.textContent);  // "Hello World"

// Mengubah teks
heading.textContent = "New Title";

// textContent menghapus semua child elements
const div = document.querySelector('.container');
div.textContent = "Just text";  // Semua HTML di dalam div dihapus`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">innerHTML</h3>
        <p>Mengambil atau mengubah HTML di dalam elemen.</p>
        
        <CodeBlock language="javascript">
{`const container = document.querySelector('.container');

// Mengambil HTML
console.log(container.innerHTML);
// Output: "<h2>Title</h2><p>Text</p>"

// Mengubah HTML
container.innerHTML = '<h1>New Title</h1><p>New paragraph</p>';

// Menambahkan HTML
container.innerHTML += '<button>Click Me</button>';

// ⚠️ Hati-hati dengan XSS attack!
const userInput = '<img src=x onerror="alert(\'XSS\')">';
container.innerHTML = userInput;  // BERBAHAYA!

// Lebih aman: escape user input atau gunakan textContent
container.textContent = userInput;  // Aman - dianggap sebagai text`}
        </CodeBlock>

        <Note type="warning">
          <code>innerHTML</code> bisa berbahaya jika digunakan dengan user input. 
          Selalu sanitize input atau gunakan <code>textContent</code> untuk text biasa.
        </Note>

        <h3 className="text-lg font-semibold mb-2 mt-4">innerText vs textContent</h3>
        <p>Perbedaan antara innerText dan textContent.</p>
        
        <CodeBlock language="javascript">
{`// HTML: <div>Hello <span style="display:none">Hidden</span> World</div>
const div = document.querySelector('div');

console.log(div.textContent);  // "Hello Hidden World" (include hidden)
console.log(div.innerText);    // "Hello World" (exclude hidden)

// innerText mempertimbangkan CSS styling
// textContent lebih cepat karena tidak perlu render calculation`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">value (untuk input elements)</h3>
        <p>Mengambil atau mengubah value dari input, textarea, select.</p>
        
        <CodeBlock language="javascript">
{`// HTML: <input type="text" id="username" />
const input = document.querySelector('#username');

// Mengambil value
console.log(input.value);

// Mengubah value
input.value = "John Doe";

// Clear input
input.value = "";

// Untuk checkbox
const checkbox = document.querySelector('#agree');
console.log(checkbox.checked);  // true atau false
checkbox.checked = true;

// Untuk select
const select = document.querySelector('#country');
console.log(select.value);  // value dari option yang dipilih
select.value = "USA";  // Mengubah option yang dipilih`}
        </CodeBlock>
      </Section>

      {/* Manipulating Attributes */}
      <Section id="mengubah-atribut-elemen" heading="Mengubah Atribut Elemen">
        <h3 className="text-lg font-semibold mb-2">getAttribute() & setAttribute()</h3>
        <p>Membaca dan mengubah atribut HTML.</p>
        
        <CodeBlock language="javascript">
{`const link = document.querySelector('a');

// Membaca atribut
console.log(link.getAttribute('href'));
console.log(link.getAttribute('target'));

// Mengubah atribut
link.setAttribute('href', 'https://google.com');
link.setAttribute('target', '_blank');
link.setAttribute('title', 'Go to Google');

// Menghapus atribut
link.removeAttribute('title');

// Mengecek keberadaan atribut
if (link.hasAttribute('href')) {
  console.log('Link has href attribute');
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Direct Property Access</h3>
        <p>Mengakses atribut standar HTML langsung sebagai property.</p>
        
        <CodeBlock language="javascript">
{`const img = document.querySelector('img');
const link = document.querySelector('a');
const input = document.querySelector('input');

// Property shortcut untuk atribut umum
console.log(img.src);
console.log(img.alt);
img.src = 'new-image.jpg';
img.alt = 'New image';

console.log(link.href);
console.log(link.target);
link.href = 'https://example.com'\;

console.log(input.type);
console.log(input.placeholder);
input.placeholder = 'Enter your name';

// Data attributes
// HTML: <div data-user-id="123" data-role="admin"></div>
const div = document.querySelector('div');
console.log(div.dataset.userId);   // "123"
console.log(div.dataset.role);     // "admin"
div.dataset.status = 'active';     // Menambah data-status="active"`}
        </CodeBlock>
      </Section>

      {/* Manipulating Classes */}
      <Section id="mengubah-class-css" heading="Mengubah Class CSS">
        <h3 className="text-lg font-semibold mb-2">classList</h3>
        <p>API modern untuk memanipulasi class CSS (lebih baik dari className).</p>
        
        <CodeBlock language="javascript">
{`const button = document.querySelector('button');

// Menambah class
button.classList.add('btn');
button.classList.add('btn-primary', 'btn-large');  // Multiple classes

// Menghapus class
button.classList.remove('btn-large');

// Toggle class (add jika tidak ada, remove jika ada)
button.classList.toggle('active');
button.classList.toggle('active');  // Toggle kembali

// Toggle dengan condition
const isActive = true;
button.classList.toggle('active', isActive);  // Sama dengan add('active')

// Mengecek class
if (button.classList.contains('btn-primary')) {
  console.log('Button is primary');
}

// Replace class
button.classList.replace('btn-primary', 'btn-secondary');

// Mendapatkan semua class sebagai array-like object
console.log(button.classList);  // DOMTokenList ['btn', 'btn-secondary']
console.log(button.classList.length);  // 2

// Iterasi classes
button.classList.forEach(className => {
  console.log(className);
});`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">className (Legacy)</h3>
        <p>Cara lama mengakses class (tidak direkomendasikan).</p>
        
        <CodeBlock language="javascript">
{`const button = document.querySelector('button');

// Membaca semua class sebagai string
console.log(button.className);  // "btn btn-primary"

// Mengubah class (REPLACE semua class!)
button.className = 'btn btn-secondary';

// Menambah class (harus manual)
button.className += ' active';  // Jangan lupa spasi!

// ⚠️ Lebih baik gunakan classList yang lebih modern dan aman`}
        </CodeBlock>
      </Section>

      {/* Manipulating Styles */}
      <Section id="mengubah-style-css" heading="Mengubah Style CSS">
        <h3 className="text-lg font-semibold mb-2">style Property</h3>
        <p>Mengubah inline style CSS secara langsung.</p>
        
        <CodeBlock language="javascript">
{`const box = document.querySelector('.box');

// Mengubah single style
box.style.color = 'red';
box.style.backgroundColor = 'blue';  // camelCase untuk property CSS
box.style.fontSize = '20px';
box.style.padding = '10px 20px';

// Membaca style (hanya inline styles!)
console.log(box.style.color);  // "red"

// Remove style
box.style.color = '';  // Atau null

// Mengubah multiple styles sekaligus
Object.assign(box.style, {
  color: 'white',
  backgroundColor: 'black',
  padding: '20px',
  borderRadius: '8px'
});

// ⚠️ Inline styles punya prioritas tinggi (override CSS file/class)`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">cssText</h3>
        <p>Mengubah multiple styles dengan CSS string.</p>
        
        <CodeBlock language="javascript">
{`const box = document.querySelector('.box');

// Set multiple styles sekaligus
box.style.cssText = 'color: red; background-color: blue; padding: 20px;';

// Append styles (hati-hati, ini replace semua!)
box.style.cssText += 'border: 1px solid black;';

// Lebih baik gunakan classList untuk styling dinamis
box.classList.add('highlight');  // Di CSS: .highlight { ... }`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">getComputedStyle()</h3>
        <p>Membaca computed style (actual style yang dirender, termasuk dari CSS files).</p>
        
        <CodeBlock language="javascript">
{`const box = document.querySelector('.box');

// Get computed styles
const styles = getComputedStyle(box);
console.log(styles.color);           // e.g., "rgb(255, 0, 0)"
console.log(styles.fontSize);        // e.g., "16px"
console.log(styles.display);         // e.g., "block"
console.log(styles.width);           // e.g., "300px" (calculated)

// Get specific property
const bgColor = getComputedStyle(box).backgroundColor;

// Get pseudo-element styles
const beforeStyles = getComputedStyle(box, '::before');
console.log(beforeStyles.content);

// ℹ️ getComputedStyle() read-only, tidak bisa diubah`}
        </CodeBlock>

        <Note type="tip">
          Untuk styling dinamis, lebih baik gunakan <code>classList</code> untuk 
          add/remove CSS classes daripada mengubah <code>style</code> langsung. 
          Ini lebih maintainable dan memisahkan concerns.
        </Note>
      </Section>

      {/* Creating and Removing Elements */}
      <Section id="membuat-dan-menghapus-elemen" heading="Membuat dan Menghapus Elemen">
        <h3 className="text-lg font-semibold mb-2">createElement() & appendChild()</h3>
        <p>Membuat elemen baru dan menambahkannya ke DOM.</p>
        
        <CodeBlock language="javascript">
{`// Membuat elemen baru
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
newDiv.classList.add('box');
newDiv.setAttribute('id', 'myBox');

// Menambahkan ke parent (di akhir)
const container = document.querySelector('.container');
container.appendChild(newDiv);

// Membuat elemen dengan innerHTML (alternatif, tapi kurang aman)
const button = document.createElement('button');
button.innerHTML = '<span>Click Me</span>';
button.onclick = () => alert('Clicked!');
container.appendChild(button);

// Contoh: Membuat list item
const ul = document.querySelector('ul');
const li = document.createElement('li');
li.textContent = 'New Item';
ul.appendChild(li);`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">insertBefore() & insertAdjacentElement()</h3>
        <p>Menambahkan elemen di posisi tertentu.</p>
        
        <CodeBlock language="javascript">
{`const container = document.querySelector('.container');
const referenceNode = document.querySelector('.item-2');

// insertBefore(newNode, referenceNode)
const newItem = document.createElement('div');
newItem.textContent = 'Inserted before item-2';
container.insertBefore(newItem, referenceNode);

// insertAdjacentElement() - lebih fleksibel
const box = document.querySelector('.box');
const newElement = document.createElement('p');
newElement.textContent = 'Adjacent element';

// Posisi: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
box.insertAdjacentElement('beforebegin', newElement);  // Sebelum box
box.insertAdjacentElement('afterbegin', newElement);   // Awal dalam box
box.insertAdjacentElement('beforeend', newElement);    // Akhir dalam box
box.insertAdjacentElement('afterend', newElement);     // Setelah box

// insertAdjacentHTML() - insert HTML string
box.insertAdjacentHTML('beforeend', '<button>Click</button>');`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">removeChild() & remove()</h3>
        <p>Menghapus elemen dari DOM.</p>
        
        <CodeBlock language="javascript">
{`const parent = document.querySelector('.container');
const child = document.querySelector('.item');

// Cara lama: removeChild()
parent.removeChild(child);

// Cara modern: remove() (langsung dari element)
child.remove();  // Lebih simple!

// Menghapus semua children
parent.innerHTML = '';  // Cara cepat tapi tidak rekomendasi
// Atau:
while (parent.firstChild) {
  parent.removeChild(parent.firstChild);
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">cloneNode()</h3>
        <p>Membuat salinan elemen.</p>
        
        <CodeBlock language="javascript">
{`const original = document.querySelector('.box');

// Shallow clone (tanpa children)
const shallowClone = original.cloneNode();

// Deep clone (dengan semua children)
const deepClone = original.cloneNode(true);

// Menambahkan clone ke DOM
document.body.appendChild(deepClone);

// ⚠️ Clone tidak termasuk event listeners!`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">replaceChild()</h3>
        <p>Mengganti elemen dengan elemen baru.</p>
        
        <CodeBlock language="javascript">
{`const parent = document.querySelector('.container');
const oldChild = document.querySelector('.old-item');
const newChild = document.createElement('div');
newChild.textContent = 'New Item';
newChild.classList.add('new-item');

// Replace
parent.replaceChild(newChild, oldChild);

// Cara modern: replaceWith()
oldChild.replaceWith(newChild);  // Lebih simple!`}
        </CodeBlock>
      </Section>

      {/* Traversing DOM */}
      <Section id="navigasi-dom-tree" heading="Navigasi DOM Tree">
        <h3 className="text-lg font-semibold mb-2">Parent, Children, Siblings</h3>
        <p>Navigasi hubungan antar elemen.</p>
        
        <CodeBlock language="javascript">
{`const element = document.querySelector('.item');

// Parent
console.log(element.parentElement);       // Parent element
console.log(element.parentNode);          // Parent node (bisa text/comment node)
console.log(element.closest('.container')); // Ancestor terdekat dengan selector

// Children
console.log(element.children);            // HTMLCollection of child elements
console.log(element.childNodes);          // NodeList (include text nodes)
console.log(element.firstElementChild);   // First child element
console.log(element.lastElementChild);    // Last child element
console.log(element.childElementCount);   // Jumlah children

// Siblings
console.log(element.nextElementSibling);     // Next sibling element
console.log(element.previousElementSibling); // Previous sibling element

// Contoh: Mengiterasi semua children
const parent = document.querySelector('.container');
Array.from(parent.children).forEach(child => {
  console.log(child.tagName);
});

// Contoh: Naik ke parent tertentu
const listItem = document.querySelector('li');
const list = listItem.closest('ul');  // Cari parent <ul>
console.log(list);`}
        </CodeBlock>
      </Section>

      {/* Best Practices */}
      <Section id="best-practices" heading="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Gunakan querySelector/querySelectorAll</strong>
            <CodeBlock language="javascript">
{`// ❌ Buruk
const element = document.getElementById('myId');

// Baik - lebih konsisten
const element = document.querySelector('#myId');`}
            </CodeBlock>
          </div>

          <div>
            <strong>2. Cache DOM Queries</strong>
            <CodeBlock language="javascript">
{`// ❌ Buruk - query berulang kali
for (let i = 0; i < 100; i++) {
  document.querySelector('.box').style.width = i + 'px';
}

// Baik - cache hasil query
const box = document.querySelector('.box');
for (let i = 0; i < 100; i++) {
  box.style.width = i + 'px';
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Gunakan classList daripada className</strong>
            <CodeBlock language="javascript">
{`// ❌ Buruk
element.className += ' active';

// Baik
element.classList.add('active');`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Gunakan textContent daripada innerHTML untuk Text</strong>
            <CodeBlock language="javascript">
{`// ❌ Buruk - XSS vulnerability
element.innerHTML = userInput;

// Baik - aman dari XSS
element.textContent = userInput;`}
            </CodeBlock>
          </div>

          <div>
            <strong>5. Gunakan CSS Classes untuk Styling Dinamis</strong>
            <CodeBlock language="javascript">
{`// ❌ Buruk - inline styles sulit maintain
element.style.color = 'red';
element.style.fontSize = '20px';
element.style.padding = '10px';

// Baik - gunakan CSS class
element.classList.add('highlight');
// CSS: .highlight { color: red; font-size: 20px; padding: 10px; }`}
            </CodeBlock>
          </div>

          <div>
            <strong>6. Minimize Reflows and Repaints</strong>
            <CodeBlock language="javascript">
{`// ❌ Buruk - banyak reflow
for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  document.body.appendChild(div);  // Reflow setiap loop!
}

// Baik - batch DOM changes
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment);  // Hanya 1 reflow`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      {/* Summary */}
      <Section id="rangkuman" heading="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Konsep Penting:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>DOM:</strong> Representasi tree dari HTML yang bisa dimanipulasi JavaScript</li>
            <li><strong>Selecting:</strong> querySelector() dan querySelectorAll() adalah method modern</li>
            <li><strong>Content:</strong> textContent untuk text, innerHTML untuk HTML, value untuk input</li>
            <li><strong>Attributes:</strong> getAttribute/setAttribute atau direct property access</li>
            <li><strong>Classes:</strong> classList API (add, remove, toggle, contains) untuk manipulasi class</li>
            <li><strong>Styles:</strong> style property untuk inline styles, classList untuk styling dinamis</li>
            <li><strong>Creating:</strong> createElement() + appendChild/insertBefore untuk membuat elemen</li>
            <li><strong>Removing:</strong> remove() atau removeChild() untuk menghapus elemen</li>
            <li><strong>Traversing:</strong> parentElement, children, nextElementSibling untuk navigasi</li>
          </ul>
          
          <h3 className="font-semibold mt-4 mb-3">Method yang Paling Sering Digunakan:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>querySelector() / querySelectorAll() - selecting elements</li>
            <li>textContent / innerHTML - manipulasi konten</li>
            <li>classList.add/remove/toggle - manipulasi class</li>
            <li>createElement() + appendChild() - membuat elemen</li>
            <li>addEventListener() - menangani events (akan dipelajari di materi selanjutnya)</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
