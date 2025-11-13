import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi20() {
  return (
    <MateriLayout
      title="Performance & Optimization"
      description="Pelajari teknik optimasi performance di JavaScript"
    >
      <Section title="Pengenalan Performance Optimization">
        <p>
          Performance optimization adalah meningkatkan speed, responsiveness, dan efficiency 
          of your code. Fokus pada: Load time, Runtime performance, Memory usage.
        </p>
        
        <Note type="info">
          <strong>Golden Rule:</strong> Measure first, then optimize. Premature optimization is the root of all evil.
        </Note>
      </Section>

      <Section title="Debounce">
        <p>
          Debounce adalah delay execution until after wait time has elapsed since last call.
          Berguna untuk expensive operations (search, resize, scroll).
        </p>

        <CodeBlock language="javascript">
{`function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Usage: Search input
const searchInput = document.getElementById('search');

function performSearch(query) {
  console.log('Searching for:', query);
  // API call here
}

const debouncedSearch = debounce(performSearch, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
  // Only calls performSearch after 300ms of no typing
});

// With immediate option
function debounceImmediate(func, wait, immediate = false) {
  let timeout;
  
  return function(...args) {
    const callNow = immediate && !timeout;
    
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func(...args);
    }, wait);
    
    if (callNow) func(...args);
  };
}

// Practical: Window resize
const handleResize = debounce(() => {
  console.log('Window resized:', window.innerWidth, window.innerHeight);
  // Recalculate layout
}, 250);

window.addEventListener('resize', handleResize);`}
        </CodeBlock>
      </Section>

      <Section title="Throttle">
        <p>
          Throttle adalah limit execution to once per specified time period.
          Berguna untuk continuous events (scroll, mousemove).
        </p>

        <CodeBlock language="javascript">
{`function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Usage: Scroll event
function handleScroll() {
  console.log('Scrolled:', window.scrollY);
  // Update UI
}

const throttledScroll = throttle(handleScroll, 100);
window.addEventListener('scroll', throttledScroll);
// Calls max once per 100ms

// Advanced throttle (trailing call)
function throttleAdvanced(func, limit) {
  let inThrottle;
  let lastFunc;
  let lastRan;
  
  return function(...args) {
    if (!inThrottle) {
      func(...args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Comparison
const debounced = debounce(() => console.log('Debounced'), 1000);
const throttled = throttle(() => console.log('Throttled'), 1000);

// Rapid calls:
// Debounced: Only after 1s of no calls
// Throttled: Once per 1s interval`}
        </CodeBlock>
      </Section>

      <Section title="Memoization">
        <p>Memoization adalah cache function results untuk avoid redundant calculations.</p>

        <CodeBlock language="javascript">
{`// Simple memoization
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('Cache hit');
      return cache.get(key);
    }
    
    console.log('Cache miss, computing...');
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Expensive function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoize(fibonacci);

console.time('First call');
console.log(memoizedFib(40));  // Slow
console.timeEnd('First call');

console.time('Second call');
console.log(memoizedFib(40));  // Fast (cached)
console.timeEnd('Second call');

// Memoize with size limit (LRU cache)
function memoizeLRU(fn, maxSize = 100) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      // Move to end (most recent)
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    
    const result = fn(...args);
    
    // Remove oldest if at capacity
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, result);
    return result;
  };
}

// React-style useMemo simulation
let memoCache = null;
let memoDeps = null;

function useMemo(factory, deps) {
  if (!memoDeps || !depsEqual(deps, memoDeps)) {
    memoCache = factory();
    memoDeps = deps;
  }
  return memoCache;
}

function depsEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((val, i) => val === b[i]);
}

// Usage
const expensiveValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);`}
        </CodeBlock>
      </Section>

      <Section title="Lazy Loading">
        <p>Lazy loading adalah defer loading resources until needed.</p>

        <h3 className="text-lg font-semibold mb-2">Lazy Load Images</h3>
        <CodeBlock language="javascript">
{`// Native lazy loading
// <img src="image.jpg" loading="lazy" alt="..." />

// Intersection Observer approach
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;  // Load actual image
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px'  // Start loading 50px before visible
});

// Observe all lazy images
document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// HTML: <img data-src="real-image.jpg" src="placeholder.jpg" />

// Lazy load modules (dynamic import)
async function loadModule() {
  const module = await import('./heavy-module.js');
  module.doSomething();
}

// Load on button click
document.getElementById('btn').addEventListener('click', async () => {
  const { default: Component } = await import('./Component.js');
  new Component();
});

// Lazy load with loading indicator
async function lazyLoadWithIndicator(importFn) {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
  
  try {
    const module = await importFn();
    return module;
  } finally {
    loader.style.display = 'none';
  }
}

// Usage
const module = await lazyLoadWithIndicator(() => import('./module.js'));`}
        </CodeBlock>
      </Section>

      <Section title="Code Splitting">
        <p>Code splitting adalah break code into smaller chunks yang dapat loaded on demand.</p>

        <CodeBlock language="javascript">
{`// Webpack code splitting
// 1. Entry points
module.exports = {
  entry: {
    app: './src/app.js',
    admin: './src/admin.js'
  }
};

// 2. Dynamic import (recommended)
button.addEventListener('click', async () => {
  const module = await import(/* webpackChunkName: "my-chunk" */ './module.js');
  module.run();
});

// 3. SplitChunksPlugin (automatic)
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

// React lazy loading
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

// Route-based code splitting
const routes = [
  {
    path: '/home',
    component: lazy(() => import('./pages/Home'))
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/About'))
  }
];`}
        </CodeBlock>
      </Section>

      <Section title="Virtual Scrolling">
        <p>Virtual scrolling adalah render hanya visible items dalam large lists.</p>

        <CodeBlock language="javascript">
{`class VirtualScroll {
  constructor(container, items, itemHeight) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight);
    this.totalHeight = items.length * itemHeight;
    this.scrollTop = 0;
    
    this.init();
  }
  
  init() {
    // Create spacer
    this.spacer = document.createElement('div');
    this.spacer.style.height = \`\${this.totalHeight}px\`;
    this.container.appendChild(this.spacer);
    
    // Create viewport
    this.viewport = document.createElement('div');
    this.viewport.style.position = 'absolute';
    this.viewport.style.top = '0';
    this.viewport.style.width = '100%';
    this.container.appendChild(this.viewport);
    
    // Listen scroll
    this.container.addEventListener('scroll', () => {
      this.scrollTop = this.container.scrollTop;
      this.render();
    });
    
    this.render();
  }
  
  render() {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(
      startIndex + this.visibleCount + 1,
      this.items.length
    );
    
    const offsetY = startIndex * this.itemHeight;
    this.viewport.style.transform = \`translateY(\${offsetY}px)\`;
    
    // Render visible items
    this.viewport.innerHTML = '';
    for (let i = startIndex; i < endIndex; i++) {
      const item = document.createElement('div');
      item.style.height = \`\${this.itemHeight}px\`;
      item.textContent = this.items[i];
      this.viewport.appendChild(item);
    }
  }
}

// Usage
const container = document.getElementById('scroll-container');
const items = Array.from({ length: 10000 }, (_, i) => \`Item \${i + 1}\`);

new VirtualScroll(container, items, 50);

// Libraries: react-window, react-virtualized`}
        </CodeBlock>
      </Section>

      <Section title="Web Workers">
        <p>Web Workers run JavaScript in background thread untuk avoid blocking UI.</p>

        <CodeBlock language="javascript">
{`// main.js
const worker = new Worker('worker.js');

// Send message to worker
worker.postMessage({ data: [1, 2, 3, 4, 5], operation: 'sum' });

// Receive message from worker
worker.onmessage = (e) => {
  console.log('Result from worker:', e.data);
};

worker.onerror = (error) => {
  console.error('Worker error:', error.message);
};

// Terminate worker when done
// worker.terminate();

// worker.js
self.onmessage = (e) => {
  const { data, operation } = e.data;
  
  let result;
  
  switch (operation) {
    case 'sum':
      result = data.reduce((a, b) => a + b, 0);
      break;
    case 'average':
      result = data.reduce((a, b) => a + b, 0) / data.length;
      break;
    default:
      result = null;
  }
  
  // Send result back to main thread
  self.postMessage(result);
};

// Heavy computation example
function processLargeData(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('processor-worker.js');
    
    worker.postMessage(data);
    
    worker.onmessage = (e) => {
      resolve(e.data);
      worker.terminate();
    };
    
    worker.onerror = (error) => {
      reject(error);
      worker.terminate();
    };
  });
}

// Usage
const result = await processLargeData(largeArray);`}
        </CodeBlock>
      </Section>

      <Section title="Performance Measurement">
        <CodeBlock language="javascript">
{`// Performance API
const start = performance.now();
// ... code to measure
const end = performance.now();
console.log(\`Execution time: \${(end - start).toFixed(2)}ms\`);

// console.time/timeEnd
console.time('operation');
// ... code
console.timeEnd('operation');

// Performance Observer
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(\`\${entry.name}: \${entry.duration}ms\`);
  }
});

observer.observe({ entryTypes: ['measure'] });

// Mark and measure
performance.mark('start-task');
// ... do task
performance.mark('end-task');
performance.measure('task-duration', 'start-task', 'end-task');

// Memory usage (Chrome)
if (performance.memory) {
  console.log(\`Used JS heap: \${performance.memory.usedJSHeapSize / 1024 / 1024} MB\`);
  console.log(\`Total JS heap: \${performance.memory.totalJSHeapSize / 1024 / 1024} MB\`);
}

// Long Task Observer
const longTaskObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.warn(\`Long task detected: \${entry.duration}ms\`);
  }
});

longTaskObserver.observe({ entryTypes: ['longtask'] });`}
        </CodeBlock>
      </Section>

      <Section title="Optimization Techniques">
        <div className="space-y-3">
          <div>
            <strong>1. Avoid Reflows/Repaints</strong>
            <CodeBlock language="javascript">
{`// ❌ Multiple reflows
element.style.width = '100px';
element.style.height = '100px';
element.style.margin = '10px';

// Single reflow
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';

// Or use classes
element.classList.add('styled');`}
            </CodeBlock>
          </div>

          <div>
            <strong>2. Use Document Fragment</strong>
            <CodeBlock language="javascript">
{`// ❌ Multiple DOM updates
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  document.body.appendChild(div);  // Reflow each time
}

// Batch with fragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment);  // Single reflow`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Use requestAnimationFrame</strong>
            <CodeBlock language="javascript">
{`// ❌ setInterval for animations
setInterval(() => {
  element.style.left = \`\${x}px\`;
}, 16);

// requestAnimationFrame
function animate() {
  element.style.left = \`\${x}px\`;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Event Delegation</strong>
            <CodeBlock language="javascript">
{`// ❌ Banyak listeners
items.forEach(item => {
  item.addEventListener('click', handleClick);
});

// Single listener di parent
parent.addEventListener('click', (e) => {
  if (e.target.matches('.item')) {
    handleClick(e);
  }
});`}
            </CodeBlock>
          </div>

          <div>
            <strong>5. Use will-change (CSS)</strong>
            <CodeBlock language="javascript">
{`// Tell browser property will change
element.style.willChange = 'transform, opacity';

// Animate
element.style.transform = 'translateX(100px)';

// Remove after animation
element.addEventListener('transitionend', () => {
  element.style.willChange = 'auto';
});`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <Section title="Best Practices">
        <div className="space-y-2">
          <div>
            <strong>1. Measure Before Optimizing</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use Chrome DevTools Performance tab, measure first!
            </p>
          </div>

          <div>
            <strong>2. Optimize Critical Path</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Focus pada code yang runs most frequently atau blocks user.
            </p>
          </div>

          <div>
            <strong>3. Use Debounce untuk Input Events</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Search, resize, input validation.
            </p>
          </div>

          <div>
            <strong>4. Use Throttle untuk Scroll Events</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Scroll, mousemove, continuous events.
            </p>
          </div>

          <div>
            <strong>5. Lazy Load Everything Possible</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Images, components, routes, modules.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Optimization Techniques:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Debounce:</strong> Delay execution until after wait time</li>
            <li><strong>Throttle:</strong> Limit execution to once per interval</li>
            <li><strong>Memoization:</strong> Cache function results</li>
            <li><strong>Lazy Loading:</strong> Load resources on demand</li>
            <li><strong>Code Splitting:</strong> Break into smaller chunks</li>
            <li><strong>Virtual Scrolling:</strong> Render only visible items</li>
            <li><strong>Web Workers:</strong> Run heavy tasks in background</li>
            <li><strong>Event Delegation:</strong> Single listener di parent</li>
          </ul>
          
          <h3 className="font-semibold mt-4 mb-3">When to Use:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>Debounce: Search, input validation, resize</li>
            <li>Throttle: Scroll, mousemove, continuous events</li>
            <li>Memoization: Expensive calculations</li>
            <li>Web Workers: Heavy computations, image processing</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
