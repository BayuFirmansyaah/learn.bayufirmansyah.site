import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi10() {
  return (
    <MateriLayout
      title="Events & Event Handling"
      description="Pelajari cara menangani interaksi user seperti click, input, submit, dan berbagai event lainnya"
    >
      {/* Intro */}
      <Section title="Pengenalan Events">
        <p>
          Events adalah aksi atau kejadian yang terjadi di halaman web, seperti user mengklik 
          tombol, mengetik di input, scroll halaman, dll. JavaScript dapat "mendengarkan" dan 
          merespons events ini untuk membuat halaman web interaktif.
        </p>
        
        <CodeBlock language="javascript">
{`// Contoh: Menangani klik tombol
const button = document.querySelector('button');

button.addEventListener('click', function() {
  alert('Button diklik!');
});

// Event types umum:
// - Mouse: click, dblclick, mousedown, mouseup, mousemove, mouseenter, mouseleave
// - Keyboard: keydown, keyup, keypress
// - Form: submit, input, change, focus, blur
// - Window: load, resize, scroll
// - Dan masih banyak lagi...`}
        </CodeBlock>
        
        <Note type="info">
          Event-driven programming adalah paradigma di mana flow program ditentukan oleh 
          events yang terjadi, bukan eksekusi sequential.
        </Note>
      </Section>

      {/* addEventListener */}
      <Section title="addEventListener()">
        <h3 className="text-lg font-semibold mb-2">Syntax Dasar</h3>
        <p>Method modern dan direkomendasikan untuk menangani events.</p>
        
        <CodeBlock language="javascript">
{`// Syntax: element.addEventListener(eventType, callback, options)

const button = document.querySelector('#myButton');

// Basic usage
button.addEventListener('click', function() {
  console.log('Button clicked!');
});

// Dengan arrow function
button.addEventListener('click', () => {
  console.log('Button clicked with arrow function!');
});

// Dengan named function
function handleClick() {
  console.log('Button clicked with named function!');
}
button.addEventListener('click', handleClick);

// Multiple event listeners pada element yang sama
button.addEventListener('click', () => console.log('First'));
button.addEventListener('click', () => console.log('Second'));
// Keduanya akan dijalankan!`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">removeEventListener()</h3>
        <p>Menghapus event listener yang sudah ditambahkan.</p>
        
        <CodeBlock language="javascript">
{`const button = document.querySelector('button');

// Harus menggunakan named function untuk bisa di-remove
function handleClick() {
  console.log('Clicked!');
}

// Add
button.addEventListener('click', handleClick);

// Remove
button.removeEventListener('click', handleClick);

// ⚠️ Tidak bisa remove jika menggunakan anonymous function
button.addEventListener('click', function() {
  console.log('Cannot be removed!');
});
// Tidak ada cara untuk remove listener di atas

// Use case: One-time listener
function handleClickOnce() {
  console.log('This only runs once');
  button.removeEventListener('click', handleClickOnce);
}
button.addEventListener('click', handleClickOnce);

// Atau gunakan option { once: true }
button.addEventListener('click', () => {
  console.log('This only runs once');
}, { once: true });`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Event Listener Options</h3>
        <p>Parameter ketiga addEventListener menerima options.</p>
        
        <CodeBlock language="javascript">
{`const button = document.querySelector('button');

// Option: capture (default: false)
button.addEventListener('click', handler, { capture: true });

// Option: once (run handler hanya sekali)
button.addEventListener('click', () => {
  console.log('This runs only once');
}, { once: true });

// Option: passive (improve scroll performance)
document.addEventListener('touchmove', handler, { passive: true });

// Multiple options
button.addEventListener('click', handler, {
  capture: false,
  once: true,
  passive: false
});`}
        </CodeBlock>
      </Section>

      {/* Event Object */}
      <Section title="Event Object">
        <h3 className="text-lg font-semibold mb-2">Mengakses Event Object</h3>
        <p>Setiap event handler menerima object yang berisi informasi tentang event.</p>
        
        <CodeBlock language="javascript">
{`const button = document.querySelector('button');

button.addEventListener('click', function(event) {
  // event (atau sering ditulis 'e') adalah Event object
  console.log(event);
  
  // Properties umum
  console.log(event.type);           // "click"
  console.log(event.target);         // Element yang trigger event
  console.log(event.currentTarget);  // Element dengan event listener
  console.log(event.timeStamp);      // Waktu event terjadi
  
  // Mouse event properties
  console.log(event.clientX);        // X coordinate (viewport)
  console.log(event.clientY);        // Y coordinate (viewport)
  console.log(event.pageX);          // X coordinate (page)
  console.log(event.pageY);          // Y coordinate (page)
  console.log(event.button);         // Mouse button (0=left, 1=middle, 2=right)
});

// Keyboard event properties
const input = document.querySelector('input');
input.addEventListener('keydown', (e) => {
  console.log(e.key);                // Key yang ditekan (e.g., "a", "Enter")
  console.log(e.code);               // Physical key code (e.g., "KeyA")
  console.log(e.keyCode);            // Numeric key code (deprecated)
  console.log(e.ctrlKey);            // true jika Ctrl ditekan
  console.log(e.shiftKey);           // true jika Shift ditekan
  console.log(e.altKey);             // true jika Alt ditekan
  console.log(e.metaKey);            // true jika Cmd/Windows key ditekan
});`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">preventDefault()</h3>
        <p>Mencegah default behavior dari event.</p>
        
        <CodeBlock language="javascript">
{`// Prevent form submission
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();  // Tidak submit form
  console.log('Form tidak disubmit, akan diproses dengan JavaScript');
  
  // Process form data
  const formData = new FormData(form);
  console.log(formData.get('username'));
});

// Prevent link navigation
const link = document.querySelector('a');
link.addEventListener('click', (e) => {
  e.preventDefault();  // Tidak navigasi ke href
  console.log('Link tidak diikuti');
});

// Prevent context menu
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();  // Disable right-click menu
  console.log('Context menu disabled');
});

// Contoh: Custom form validation
form.addEventListener('submit', (e) => {
  const username = form.querySelector('#username').value;
  
  if (username.length < 3) {
    e.preventDefault();
    alert('Username minimal 3 karakter');
  }
});`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">stopPropagation()</h3>
        <p>Menghentikan event bubbling/capturing ke parent elements.</p>
        
        <CodeBlock language="javascript">
{`// HTML: <div class="parent"><button class="child">Click</button></div>

const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

parent.addEventListener('click', () => {
  console.log('Parent clicked');
});

child.addEventListener('click', (e) => {
  console.log('Child clicked');
  e.stopPropagation();  // Tidak akan trigger parent listener
});

// Tanpa stopPropagation, output: "Child clicked" kemudian "Parent clicked"
// Dengan stopPropagation, output: hanya "Child clicked"

// stopImmediatePropagation() - stop propagation + stop other listeners di element yang sama
child.addEventListener('click', (e) => {
  console.log('First child listener');
  e.stopImmediatePropagation();
});

child.addEventListener('click', () => {
  console.log('Second child listener');  // Tidak akan jalan
});`}
        </CodeBlock>
      </Section>

      {/* Event Types */}
      <Section title="Jenis-jenis Event">
        <h3 className="text-lg font-semibold mb-2">Mouse Events</h3>
        
        <CodeBlock language="javascript">
{`const box = document.querySelector('.box');

// click - satu klik penuh (mousedown + mouseup)
box.addEventListener('click', (e) => {
  console.log('Clicked at', e.clientX, e.clientY);
});

// dblclick - double click
box.addEventListener('dblclick', () => {
  console.log('Double clicked');
});

// mousedown - mouse button ditekan
box.addEventListener('mousedown', () => {
  console.log('Mouse button pressed');
});

// mouseup - mouse button dilepas
box.addEventListener('mouseup', () => {
  console.log('Mouse button released');
});

// mousemove - mouse bergerak di atas element
box.addEventListener('mousemove', (e) => {
  console.log('Mouse position:', e.clientX, e.clientY);
});

// mouseenter - mouse masuk ke element (tidak bubble)
box.addEventListener('mouseenter', () => {
  console.log('Mouse entered');
});

// mouseleave - mouse keluar dari element (tidak bubble)
box.addEventListener('mouseleave', () => {
  console.log('Mouse left');
});

// mouseover - mouse masuk ke element atau child (bubble)
box.addEventListener('mouseover', () => {
  console.log('Mouse over');
});

// mouseout - mouse keluar dari element atau child (bubble)
box.addEventListener('mouseout', () => {
  console.log('Mouse out');
});

// contextmenu - right click
box.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  console.log('Right clicked');
});`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Keyboard Events</h3>
        
        <CodeBlock language="javascript">
{`const input = document.querySelector('input');

// keydown - key ditekan (fires continuously saat ditahan)
input.addEventListener('keydown', (e) => {
  console.log('Key down:', e.key);
  
  // Detect specific keys
  if (e.key === 'Enter') {
    console.log('Enter pressed');
  }
  
  // Detect key combinations
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();  // Prevent browser save
    console.log('Ctrl+S pressed - custom save');
  }
});

// keyup - key dilepas
input.addEventListener('keyup', (e) => {
  console.log('Key up:', e.key);
});

// keypress - karakter key ditekan (deprecated, gunakan keydown)
input.addEventListener('keypress', (e) => {
  console.log('Key pressed:', e.key);
});

// Contoh: Prevent non-numeric input
const numberInput = document.querySelector('#number');
numberInput.addEventListener('keydown', (e) => {
  // Allow: backspace, delete, tab, escape, enter
  if ([8, 9, 27, 13, 46].includes(e.keyCode)) return;
  
  // Prevent if not a number
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
});`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Form Events</h3>
        
        <CodeBlock language="javascript">
{`const form = document.querySelector('form');
const input = document.querySelector('input');

// submit - form disubmit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Form submitted');
  
  // Get form data
  const formData = new FormData(form);
  console.log(formData.get('username'));
});

// input - value berubah (setiap keystroke)
input.addEventListener('input', (e) => {
  console.log('Current value:', e.target.value);
});

// change - value berubah dan input loses focus
input.addEventListener('change', (e) => {
  console.log('Final value:', e.target.value);
});

// focus - input mendapat focus
input.addEventListener('focus', () => {
  console.log('Input focused');
  input.classList.add('focused');
});

// blur - input kehilangan focus
input.addEventListener('blur', () => {
  console.log('Input blurred');
  input.classList.remove('focused');
});

// select - text dalam input diselect
input.addEventListener('select', () => {
  console.log('Text selected');
});

// Contoh: Live validation
const emailInput = document.querySelector('#email');
const errorMsg = document.querySelector('.error');

emailInput.addEventListener('input', (e) => {
  const email = e.target.value;
  if (email && !email.includes('@')) {
    errorMsg.textContent = 'Email harus mengandung @';
    errorMsg.style.display = 'block';
  } else {
    errorMsg.style.display = 'none';
  }
});`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Window & Document Events</h3>
        
        <CodeBlock language="javascript">
{`// load - semua resource (HTML, CSS, images) sudah loaded
window.addEventListener('load', () => {
  console.log('Page fully loaded');
});

// DOMContentLoaded - HTML parsed, sebelum CSS/images loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready');
  // Bisa mulai manipulasi DOM
});

// resize - window di-resize
window.addEventListener('resize', () => {
  console.log('Window size:', window.innerWidth, window.innerHeight);
});

// scroll - page di-scroll
window.addEventListener('scroll', () => {
  console.log('Scroll position:', window.scrollY);
});

// beforeunload - sebelum leave page
window.addEventListener('beforeunload', (e) => {
  // Confirm sebelum leave (e.g., ada unsaved changes)
  e.preventDefault();
  e.returnValue = '';  // Required for some browsers
});

// Contoh: Sticky header on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

// Contoh: Responsive layout based on window size
function checkWindowSize() {
  if (window.innerWidth < 768) {
    console.log('Mobile view');
  } else {
    console.log('Desktop view');
  }
}

window.addEventListener('resize', checkWindowSize);
window.addEventListener('load', checkWindowSize);`}
        </CodeBlock>
      </Section>

      {/* Event Bubbling & Capturing */}
      <Section title="Event Bubbling & Capturing">
        <h3 className="text-lg font-semibold mb-2">Event Propagation</h3>
        <p>
          Event di DOM melalui 3 fase: Capturing → Target → Bubbling. 
          Default-nya, event listener berjalan di Bubbling phase.
        </p>
        
        <CodeBlock language="javascript">
{`// HTML: <div class="outer"><div class="inner"><button>Click</button></div></div>

const outer = document.querySelector('.outer');
const inner = document.querySelector('.inner');
const button = document.querySelector('button');

// Bubbling phase (default) - dari dalam ke luar
button.addEventListener('click', () => console.log('Button'));
inner.addEventListener('click', () => console.log('Inner'));
outer.addEventListener('click', () => console.log('Outer'));

// Klik button, output:
// "Button"
// "Inner"
// "Outer"

// Capturing phase - dari luar ke dalam
button.addEventListener('click', () => console.log('Button'), true);
inner.addEventListener('click', () => console.log('Inner'), true);
outer.addEventListener('click', () => console.log('Outer'), true);

// Klik button, output:
// "Outer"
// "Inner"
// "Button"

// Stop propagation
inner.addEventListener('click', (e) => {
  console.log('Inner');
  e.stopPropagation();  // Outer listener tidak akan jalan
});`}
        </CodeBlock>

        <Note type="info">
          Bubbling lebih umum digunakan. Capturing jarang dipakai kecuali untuk kasus khusus.
        </Note>
      </Section>

      {/* Event Delegation */}
      <Section title="Event Delegation">
        <h3 className="text-lg font-semibold mb-2">Konsep Event Delegation</h3>
        <p>
          Memanfaatkan event bubbling untuk attach listener ke parent element, 
          menangani event dari children elements. Sangat efisien untuk dynamic content.
        </p>
        
        <CodeBlock language="javascript">
{`// ❌ Buruk - attach listener ke setiap item
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', handleClick);
});
// Problem: item baru tidak punya listener!

// ✅ Baik - gunakan event delegation
const list = document.querySelector('.list');
list.addEventListener('click', (e) => {
  // Check if clicked element is an item
  if (e.target.classList.contains('item')) {
    handleClick(e);
  }
});

// Atau gunakan closest() untuk nested elements
list.addEventListener('click', (e) => {
  const item = e.target.closest('.item');
  if (item) {
    console.log('Item clicked:', item.textContent);
  }
});

// Contoh: Dynamic todo list
const todoList = document.querySelector('#todoList');

// Event delegation untuk delete buttons
todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const todoItem = e.target.closest('.todo-item');
    todoItem.remove();
  }
});

// Event delegation untuk checkboxes
todoList.addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    const todoItem = e.target.closest('.todo-item');
    todoItem.classList.toggle('completed');
  }
});

// Tambah todo baru (listener tetap bekerja!)
function addTodo(text) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.innerHTML = \`
    <input type="checkbox">
    <span>\${text}</span>
    <button class="delete-btn">Delete</button>
  \`;
  todoList.appendChild(li);
}`}
        </CodeBlock>

        <Note type="tip">
          Event delegation menghemat memory dan otomatis handle dynamic elements. 
          Gunakan untuk list, tables, atau konten yang sering berubah.
        </Note>
      </Section>

      {/* Custom Events */}
      <Section title="Custom Events">
        <h3 className="text-lg font-semibold mb-2">Membuat Custom Event</h3>
        <p>Membuat dan dispatch event custom untuk komunikasi antar komponen.</p>
        
        <CodeBlock language="javascript">
{`// Membuat custom event
const myEvent = new CustomEvent('myCustomEvent', {
  detail: {
    message: 'Hello from custom event',
    timestamp: Date.now()
  },
  bubbles: true,      // Event bisa bubble
  cancelable: true    // Event bisa di-cancel
});

// Listen custom event
document.addEventListener('myCustomEvent', (e) => {
  console.log('Custom event fired!');
  console.log('Detail:', e.detail);
});

// Dispatch custom event
document.dispatchEvent(myEvent);

// Contoh: User login event
function login(username) {
  // Simulate login
  console.log('User logged in:', username);
  
  // Dispatch custom event
  const loginEvent = new CustomEvent('userLogin', {
    detail: { username, timestamp: Date.now() }
  });
  document.dispatchEvent(loginEvent);
}

// Listen untuk user login
document.addEventListener('userLogin', (e) => {
  console.log('User logged in:', e.detail.username);
  updateUI(e.detail.username);
});

login('john_doe');

// Contoh: Data update event
const dataStore = {
  data: {},
  
  update(key, value) {
    this.data[key] = value;
    
    // Notify listeners
    const event = new CustomEvent('dataUpdate', {
      detail: { key, value }
    });
    document.dispatchEvent(event);
  }
};

document.addEventListener('dataUpdate', (e) => {
  console.log(\`Data updated: \${e.detail.key} = \${e.detail.value}\`);
});

dataStore.update('username', 'Alice');`}
        </CodeBlock>
      </Section>

      {/* Best Practices */}
      <Section title="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Gunakan addEventListener, Bukan Inline Handlers</strong>
            <CodeBlock language="javascript">
{`<!-- ❌ Buruk - inline handler -->
<button onclick="handleClick()">Click</button>

// ✅ Baik - addEventListener
const button = document.querySelector('button');
button.addEventListener('click', handleClick);`}
            </CodeBlock>
          </div>

          <div>
            <strong>2. Gunakan Event Delegation untuk Dynamic Content</strong>
            <CodeBlock language="javascript">
{`// ❌ Buruk - listener tidak bekerja untuk element baru
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handler);
});

// ✅ Baik - listener bekerja untuk semua item (termasuk yang baru)
document.querySelector('.container').addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    handler(e);
  }
});`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Remove Event Listeners Saat Tidak Dibutuhkan</strong>
            <CodeBlock language="javascript">
{`// Prevent memory leaks
function handleClick() {
  console.log('Clicked');
}

button.addEventListener('click', handleClick);

// Remove saat tidak dibutuhkan
button.removeEventListener('click', handleClick);`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Gunakan passive: true untuk Scroll Events</strong>
            <CodeBlock language="javascript">
{`// ✅ Improve scroll performance
document.addEventListener('scroll', handler, { passive: true });
document.addEventListener('touchmove', handler, { passive: true });`}
            </CodeBlock>
          </div>

          <div>
            <strong>5. Throttle/Debounce untuk Frequent Events</strong>
            <CodeBlock language="javascript">
{`// Throttle - limit execution frequency
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

window.addEventListener('scroll', throttle(() => {
  console.log('Scrolling...');
}, 200));

// Debounce - execute after delay of inactivity
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

searchInput.addEventListener('input', debounce((e) => {
  search(e.target.value);
}, 500));`}
            </CodeBlock>
          </div>

          <div>
            <strong>6. Check event.target vs event.currentTarget</strong>
            <CodeBlock language="javascript">
{`button.addEventListener('click', (e) => {
  // target: element yang di-click (bisa child element)
  console.log(e.target);
  
  // currentTarget: element dengan event listener (selalu button)
  console.log(e.currentTarget);
  
  // this juga merujuk ke currentTarget (kecuali arrow function)
  console.log(this === e.currentTarget);  // true
});`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      {/* Summary */}
      <Section title="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Konsep Penting:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Events:</strong> Aksi/kejadian yang dapat ditangani oleh JavaScript</li>
            <li><strong>addEventListener:</strong> Method modern untuk attach event listeners</li>
            <li><strong>Event Object:</strong> Parameter yang berisi informasi tentang event</li>
            <li><strong>preventDefault:</strong> Mencegah default behavior dari event</li>
            <li><strong>stopPropagation:</strong> Menghentikan event bubbling ke parent</li>
            <li><strong>Event Types:</strong> Mouse, keyboard, form, window events, dll</li>
            <li><strong>Event Propagation:</strong> Capturing phase → Target → Bubbling phase</li>
            <li><strong>Event Delegation:</strong> Attach listener ke parent untuk handle children</li>
            <li><strong>Custom Events:</strong> Membuat event sendiri dengan CustomEvent</li>
          </ul>
          
          <h3 className="font-semibold mt-4 mb-3">Event Types yang Sering Digunakan:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>click, dblclick - mouse clicks</li>
            <li>mouseenter, mouseleave - mouse hover</li>
            <li>keydown, keyup - keyboard input</li>
            <li>input, change - form input changes</li>
            <li>submit - form submission</li>
            <li>focus, blur - input focus</li>
            <li>scroll - page/element scrolling</li>
            <li>DOMContentLoaded - DOM ready</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
