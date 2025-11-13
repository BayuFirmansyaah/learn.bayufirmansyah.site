import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi15() {
  return (
    <MateriLayout
      title="Local Storage & Session Storage"
      description="Pelajari cara menyimpan data di browser dengan Web Storage API"
    >
      <Section id="pengenalan-web-storage" heading="Pengenalan Web Storage">
        <p>
          Web Storage API memungkinkan kita menyimpan data key-value di browser. Ada 2 jenis: 
          localStorage (persisten) dan sessionStorage (temporary, hilang saat tab ditutup).
        </p>
        
        <Note type="info">
          <strong>Kapasitas:</strong> ~5-10MB per domain. <strong>Tipe data:</strong> Hanya string. 
          <strong>Akses:</strong> Synchronous (blocking). <strong>Scope:</strong> Same-origin policy.
        </Note>
      </Section>

      <Section id="localstorage" heading="localStorage">
        <h3 className="text-lg font-semibold mb-2">Basic Operations</h3>
        
        <CodeBlock language="javascript">
{`// Set item
localStorage.setItem('username', 'Alice');
localStorage.setItem('theme', 'dark');

// Get item
const username = localStorage.getItem('username');
console.log(username);  // "Alice"

// Check if key exists
if (localStorage.getItem('theme')) {
  console.log('Theme is set');
}

// Remove item
localStorage.removeItem('theme');

// Clear all items
localStorage.clear();

// Get number of items
console.log(localStorage.length);

// Access by index
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(\`\${key}: \${value}\`);
}

// Property access (alternative syntax)
localStorage.username = 'Bob';
console.log(localStorage.username);  // "Bob"
delete localStorage.username;`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Storing Objects</h3>
        <p>localStorage hanya menyimpan string, gunakan JSON untuk objects.</p>
        
        <CodeBlock language="javascript">
{`// Store object
const user = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
};

localStorage.setItem('user', JSON.stringify(user));

// Retrieve object
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser.name);  // "Alice"

// Store array
const todos = [
  { id: 1, text: 'Learn JavaScript', done: false },
  { id: 2, text: 'Build a project', done: false }
];

localStorage.setItem('todos', JSON.stringify(todos));

// Retrieve array
const storedTodos = JSON.parse(localStorage.getItem('todos'));
console.log(storedTodos.length);  // 2

// Helper functions
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

function getFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to get from localStorage:', error);
    return defaultValue;
  }
}

// Usage
saveToStorage('settings', { theme: 'dark', lang: 'en' });
const settings = getFromStorage('settings', { theme: 'light', lang: 'en' });`}
        </CodeBlock>
      </Section>

      <Section id="sessionstorage" heading="sessionStorage">
        <p>
          sessionStorage sama dengan localStorage, tapi data hilang saat tab/window ditutup.
          Data persisten selama tab tetap buka (refresh page OK).
        </p>
        
        <CodeBlock language="javascript">
{`// API sama persis dengan localStorage
sessionStorage.setItem('temp', 'value');
console.log(sessionStorage.getItem('temp'));
sessionStorage.removeItem('temp');
sessionStorage.clear();

// Use case: Form data sementara
function saveFormData() {
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  
  sessionStorage.setItem('formDraft', JSON.stringify(formData));
}

function loadFormData() {
  const draft = sessionStorage.getItem('formDraft');
  if (draft) {
    const formData = JSON.parse(draft);
    document.getElementById('name').value = formData.name || '';
    document.getElementById('email').value = formData.email || '';
    document.getElementById('message').value = formData.message || '';
  }
}

// Auto-save form data
const form = document.querySelector('form');
form.addEventListener('input', saveFormData);

// Load on page load
window.addEventListener('load', loadFormData);

// Clear after successful submit
form.addEventListener('submit', (e) => {
  // ... submit logic
  sessionStorage.removeItem('formDraft');
});`}
        </CodeBlock>
      </Section>

      <Section id="storage-events" heading="Storage Events">
        <p>Storage events dipicu saat localStorage berubah di tab/window lain.</p>
        
        <CodeBlock language="javascript">
{`// Listen untuk storage changes (hanya untuk tab lain!)
window.addEventListener('storage', (e) => {
  console.log('Storage changed:');
  console.log('Key:', e.key);          // Key yang berubah
  console.log('Old value:', e.oldValue);
  console.log('New value:', e.newValue);
  console.log('URL:', e.url);          // URL yang trigger perubahan
  console.log('Storage:', e.storageArea); // localStorage atau sessionStorage
});

// Use case: Sync UI across tabs
// Tab 1: Update theme
localStorage.setItem('theme', 'dark');

// Tab 2: Detect change dan update UI
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    document.body.className = e.newValue;
    console.log('Theme changed to:', e.newValue);
  }
});

// Sync logout across tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'user' && e.newValue === null) {
    console.log('User logged out in another tab');
    window.location.href = '/login';
  }
});`}
        </CodeBlock>
      </Section>

      <Section id="practical-examples" heading="Practical Examples">
        <h3 className="text-lg font-semibold mb-2">Theme Switcher</h3>
        
        <CodeBlock language="javascript">
{`class ThemeManager {
  constructor() {
    this.key = 'theme';
    this.loadTheme();
  }
  
  loadTheme() {
    const theme = localStorage.getItem(this.key) || 'light';
    this.applyTheme(theme);
  }
  
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Update toggle button
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.checked = theme === 'dark';
    }
  }
  
  setTheme(theme) {
    localStorage.setItem(this.key, theme);
    this.applyTheme(theme);
  }
  
  toggleTheme() {
    const current = localStorage.getItem(this.key) || 'light';
    const newTheme = current === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}

const themeManager = new ThemeManager();

// Toggle button
document.getElementById('theme-toggle')?.addEventListener('change', (e) => {
  themeManager.toggleTheme();
});`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Shopping Cart</h3>
        
        <CodeBlock language="javascript">
{`class ShoppingCart {
  constructor() {
    this.key = 'cart';
    this.items = this.load();
  }
  
  load() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }
  
  save() {
    localStorage.setItem(this.key, JSON.stringify(this.items));
  }
  
  addItem(product) {
    const existing = this.items.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    
    this.save();
  }
  
  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
  }
  
  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.save();
      }
    }
  }
  
  getTotal() {
    return this.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }
  
  clear() {
    this.items = [];
    localStorage.removeItem(this.key);
  }
  
  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

const cart = new ShoppingCart();

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const product = {
      id: e.target.dataset.id,
      name: e.target.dataset.name,
      price: parseFloat(e.target.dataset.price)
    };
    cart.addItem(product);
    updateCartUI();
  });
});

function updateCartUI() {
  document.getElementById('cart-count').textContent = cart.getItemCount();
  document.getElementById('cart-total').textContent = \`$\${cart.getTotal().toFixed(2)}\`;
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">User Preferences</h3>
        
        <CodeBlock language="javascript">
{`class UserPreferences {
  constructor() {
    this.key = 'userPrefs';
    this.defaults = {
      language: 'en',
      notifications: true,
      autoSave: true,
      fontSize: 'medium',
      itemsPerPage: 10
    };
    this.prefs = this.load();
  }
  
  load() {
    try {
      const stored = localStorage.getItem(this.key);
      const prefs = stored ? JSON.parse(stored) : {};
      return { ...this.defaults, ...prefs };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...this.defaults };
    }
  }
  
  save() {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.prefs));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }
  
  get(key) {
    return this.prefs[key];
  }
  
  set(key, value) {
    this.prefs[key] = value;
    this.save();
  }
  
  update(updates) {
    this.prefs = { ...this.prefs, ...updates };
    this.save();
  }
  
  reset() {
    this.prefs = { ...this.defaults };
    this.save();
  }
}

const prefs = new UserPreferences();

// Usage
console.log(prefs.get('language'));  // "en"
prefs.set('language', 'id');
prefs.update({ fontSize: 'large', itemsPerPage: 20 });`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Recent Searches</h3>
        
        <CodeBlock language="javascript">
{`class RecentSearches {
  constructor(maxItems = 10) {
    this.key = 'recentSearches';
    this.maxItems = maxItems;
    this.searches = this.load();
  }
  
  load() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }
  
  save() {
    localStorage.setItem(this.key, JSON.stringify(this.searches));
  }
  
  add(query) {
    // Remove duplicates
    this.searches = this.searches.filter(s => s !== query);
    
    // Add to front
    this.searches.unshift(query);
    
    // Limit size
    if (this.searches.length > this.maxItems) {
      this.searches = this.searches.slice(0, this.maxItems);
    }
    
    this.save();
  }
  
  remove(query) {
    this.searches = this.searches.filter(s => s !== query);
    this.save();
  }
  
  clear() {
    this.searches = [];
    localStorage.removeItem(this.key);
  }
  
  getAll() {
    return [...this.searches];
  }
}

const recentSearches = new RecentSearches(5);

// Add search
document.querySelector('#search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.querySelector('#search-input').value;
  if (query) {
    recentSearches.add(query);
    performSearch(query);
  }
});

// Display recent searches
function displayRecentSearches() {
  const searches = recentSearches.getAll();
  const html = searches.map(query => \`
    <li>
      <button onclick="performSearch('\${query}')">\${query}</button>
      <button onclick="recentSearches.remove('\${query}')">×</button>
    </li>
  \`).join('');
  document.querySelector('#recent-searches').innerHTML = html;
}`}
        </CodeBlock>
      </Section>

      <Section id="storage-wrapper-class" heading="Storage Wrapper Class">
        <CodeBlock language="javascript">
{`class Storage {
  constructor(type = 'local') {
    this.storage = type === 'session' ? sessionStorage : localStorage;
  }
  
  set(key, value, expiresIn = null) {
    const item = {
      value,
      expires: expiresIn ? Date.now() + expiresIn : null
    };
    this.storage.setItem(key, JSON.stringify(item));
  }
  
  get(key, defaultValue = null) {
    try {
      const itemStr = this.storage.getItem(key);
      if (!itemStr) return defaultValue;
      
      const item = JSON.parse(itemStr);
      
      // Check expiration
      if (item.expires && Date.now() > item.expires) {
        this.remove(key);
        return defaultValue;
      }
      
      return item.value;
    } catch (error) {
      console.error('Failed to get from storage:', error);
      return defaultValue;
    }
  }
  
  remove(key) {
    this.storage.removeItem(key);
  }
  
  clear() {
    this.storage.clear();
  }
  
  has(key) {
    return this.storage.getItem(key) !== null;
  }
  
  keys() {
    return Object.keys(this.storage);
  }
  
  size() {
    return this.storage.length;
  }
  
  // Get storage size in bytes
  getSize() {
    let size = 0;
    for (let key in this.storage) {
      if (this.storage.hasOwnProperty(key)) {
        size += this.storage[key].length + key.length;
      }
    }
    return size;
  }
}

// Usage
const storage = new Storage('local');

// Set with expiration (1 hour)
storage.set('token', 'abc123', 60 * 60 * 1000);

// Get
const token = storage.get('token');
console.log(token);  // "abc123" or null if expired

// Check existence
if (storage.has('token')) {
  console.log('Token exists');
}

// Get all keys
console.log(storage.keys());

// Get storage size
console.log(\`Storage size: \${storage.getSize()} bytes\`);`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Always Use Try/Catch</strong>
            <CodeBlock language="javascript">
{`// Handle QuotaExceededError
try {
  localStorage.setItem('key', largeData);
} catch (error) {
  if (error.name === 'QuotaExceededError') {
    console.error('Storage quota exceeded');
    // Clear old data or notify user
  }
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>2. Validate Data saat Load</strong>
            <CodeBlock language="javascript">
{`function loadSettings() {
  try {
    const data = localStorage.getItem('settings');
    const settings = JSON.parse(data);
    
    // Validate structure
    if (!settings || typeof settings !== 'object') {
      return getDefaultSettings();
    }
    
    return settings;
  } catch (error) {
    return getDefaultSettings();
  }
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Jangan Simpan Sensitive Data</strong>
            <CodeBlock language="javascript">
{`// ❌ JANGAN simpan di localStorage
localStorage.setItem('password', 'secret123');  // BAD!
localStorage.setItem('creditCard', '1234-5678');  // BAD!

// Simpan token dengan expiration
const token = { value: 'abc123', expires: Date.now() + 3600000 };
localStorage.setItem('token', JSON.stringify(token));`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Gunakan Namespace untuk Keys</strong>
            <CodeBlock language="javascript">
{`// Avoid key conflicts
const APP_PREFIX = 'myapp_';

function setItem(key, value) {
  localStorage.setItem(APP_PREFIX + key, value);
}

function getItem(key) {
  return localStorage.getItem(APP_PREFIX + key);
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>5. Implement Expiration</strong>
            <CodeBlock language="javascript">
{`function setWithExpiry(key, value, ttl) {
  const item = {
    value: value,
    expiry: Date.now() + ttl
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  
  const item = JSON.parse(itemStr);
  if (Date.now() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <Section id="localstorage-vs-sessionstorage-vs-cookies" heading="localStorage vs sessionStorage vs Cookies">
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border px-4 py-2">Feature</th>
                <th className="border px-4 py-2">localStorage</th>
                <th className="border px-4 py-2">sessionStorage</th>
                <th className="border px-4 py-2">Cookies</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Capacity</td>
                <td className="border px-4 py-2">~5-10MB</td>
                <td className="border px-4 py-2">~5-10MB</td>
                <td className="border px-4 py-2">~4KB</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Expiration</td>
                <td className="border px-4 py-2">Never</td>
                <td className="border px-4 py-2">Tab close</td>
                <td className="border px-4 py-2">Set manually</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Sent to server</td>
                <td className="border px-4 py-2">No</td>
                <td className="border px-4 py-2">No</td>
                <td className="border px-4 py-2">Yes (every request)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Access</td>
                <td className="border px-4 py-2">Client only</td>
                <td className="border px-4 py-2">Client only</td>
                <td className="border px-4 py-2">Client & Server</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="rangkuman" heading="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Konsep Penting:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>localStorage:</strong> Persistent storage, tidak expire</li>
            <li><strong>sessionStorage:</strong> Temporary storage, hilang saat tab ditutup</li>
            <li><strong>API:</strong> setItem, getItem, removeItem, clear, key</li>
            <li><strong>Data Type:</strong> Hanya string, gunakan JSON.stringify/parse untuk objects</li>
            <li><strong>Capacity:</strong> ~5-10MB per domain</li>
            <li><strong>Storage Events:</strong> Detect changes dari tab lain</li>
            <li><strong>Security:</strong> Jangan simpan sensitive data (passwords, credit cards)</li>
            <li><strong>Error Handling:</strong> Handle QuotaExceededError</li>
          </ul>
          
          <h3 className="font-semibold mt-4 mb-3">Use Cases:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>User preferences (theme, language, settings)</li>
            <li>Shopping cart data</li>
            <li>Form drafts (sessionStorage)</li>
            <li>Recent searches</li>
            <li>Cache untuk API responses</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
