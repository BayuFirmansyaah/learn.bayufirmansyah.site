import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi25() {
  return (
    <MateriLayout
      title="Build Production App"
      description="Pelajari cara build dan deploy production-ready JavaScript applications"
    >
      <Section title="Pengenalan Production Build">
        <p>
          Production build adalah optimized version of your app untuk deployment. 
          Includes: minification, bundling, optimization, environment configuration.
        </p>
        
        <Note type="info">
          <strong>Goals:</strong> Fast load time, small bundle size, optimized performance, secure configuration.
        </Note>
      </Section>

      <Section title="Environment Variables">
        <p>Environment variables store configuration yang berbeda per environment.</p>

        <h3 className="text-lg font-semibold mb-2">.env Files</h3>
        <CodeBlock language="bash">
{`# .env.development
NODE_ENV=development
API_URL=http://localhost:3000/api
DEBUG=true
ENABLE_LOGGING=true

# .env.production
NODE_ENV=production
API_URL=https://api.yourapp.com
DEBUG=false
ENABLE_LOGGING=false
SENTRY_DSN=your-sentry-dsn

# .env.local (never commit - for secrets)
DATABASE_PASSWORD=secret123
JWT_SECRET=your-secret-key
API_KEY=your-api-key`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Using Environment Variables</h3>
        <CodeBlock language="javascript">
{`// Node.js (with dotenv)
import dotenv from 'dotenv';
dotenv.config();

const config = {
  apiUrl: process.env.API_URL,
  enableLogging: process.env.ENABLE_LOGGING === 'true',
  environment: process.env.NODE_ENV
};

// Vite (VITE_ prefix)
const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  mode: import.meta.env.MODE  // development/production
};

// Webpack (DefinePlugin)
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL)
    })
  ]
};

// Usage
console.log(process.env.API_URL);

// ✅ Validation
function getConfig() {
  const required = ['API_URL', 'JWT_SECRET'];
  
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(\`Missing required env variable: \${key}\`);
    }
  }
  
  return {
    apiUrl: process.env.API_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: parseInt(process.env.PORT || '3000')
  };
}

const config = getConfig();`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">.gitignore</h3>
        <CodeBlock language="bash">
{`# Environment files
.env
.env.local
.env.*.local

# Commit these (no secrets):
# .env.example
# .env.development
# .env.production

# Dependencies
node_modules/

# Build output
dist/
build/
.next/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp`}
        </CodeBlock>
      </Section>

      <Section title="Build Process">
        <h3 className="text-lg font-semibold mb-2">Webpack Production Build</h3>
        <CodeBlock language="javascript">
{`// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    mode: isProduction ? 'production' : 'development',
    
    entry: './src/index.js',
    
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction 
        ? '[name].[contenthash].js'  // Cache busting
        : '[name].js',
      clean: true
    },
    
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true  // Remove console.logs
            }
          }
        }),
        new CssMinimizerPlugin()
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\\\/]node_modules[\\\\/]/,
            name: 'vendors',
            priority: -10
          }
        }
      }
    },
    
    module: {
      rules: [
        {
          test: /\\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\\.css$/,
          use: [
            isProduction 
              ? MiniCssExtractPlugin.loader 
              : 'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        }
      ]
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true
        } : false
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      })
    ],
    
    devtool: isProduction ? 'source-map' : 'eval-source-map'
  };
};

// package.json scripts
{
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "build:analyze": "webpack-bundle-analyzer dist/stats.json"
  }
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Vite Production Build</h3>
        <CodeBlock language="javascript">
{`// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash', 'axios']
        }
      }
    },
    chunkSizeWarningLimit: 500
  },
  server: {
    port: 3000
  }
});

// package.json scripts
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}`}
        </CodeBlock>
      </Section>

      <Section title="Code Optimization">
        <h3 className="text-lg font-semibold mb-2">Tree Shaking</h3>
        <CodeBlock language="javascript">
{`// ✅ Named imports (tree-shakeable)
import { debounce, throttle } from 'lodash-es';

// ❌ Default import (imports everything)
import _ from 'lodash';

// ✅ Import only what you need
import debounce from 'lodash-es/debounce';

// Side-effect free modules
// package.json
{
  "sideEffects": false  // All modules are side-effect free
}

// Or specify files with side effects
{
  "sideEffects": ["*.css", "src/polyfills.js"]
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Code Splitting</h3>
        <CodeBlock language="javascript">
{`// Dynamic imports
async function loadModule() {
  const { heavyFunction } = await import('./heavy-module.js');
  heavyFunction();
}

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

// Route-based splitting
const routes = [
  {
    path: '/',
    component: () => import('./pages/Home')
  },
  {
    path: '/about',
    component: () => import('./pages/About')
  }
];`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Remove Unused Code</h3>
        <CodeBlock language="javascript">
{`// ✅ Remove console.logs in production
if (process.env.NODE_ENV !== 'production') {
  console.log('Debug info');
}

// Or use terser to remove
// terserOptions: {
//   compress: {
//     drop_console: true
//   }
// }

// ✅ Remove dead code
const DEBUG = false;

if (DEBUG) {
  // This code will be removed in production
  console.log('Debug mode');
}

// ✅ Conditional imports
let logger;
if (process.env.NODE_ENV === 'development') {
  logger = require('./debug-logger');
} else {
  logger = require('./prod-logger');
}`}
        </CodeBlock>
      </Section>

      <Section title="Asset Optimization">
        <h3 className="text-lg font-semibold mb-2">Image Optimization</h3>
        <CodeBlock language="javascript">
{`// Webpack image optimization
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\\.(png|jpg|jpeg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024  // Inline images < 8kb
          }
        }
      }
    ]
  }
};

// Use image-webpack-loader
{
  test: /\\.(png|jpg|jpeg|gif)$/,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: { quality: 75 },
        pngquant: { quality: [0.65, 0.9] }
      }
    }
  ]
}

// Modern formats (WebP, AVIF)
// <picture>
//   <source srcset="image.avif" type="image/avif">
//   <source srcset="image.webp" type="image/webp">
//   <img src="image.jpg" alt="...">
// </picture>

// Lazy load images
const images = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

images.forEach(img => observer.observe(img));`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Font Optimization</h3>
        <CodeBlock language="css">
{`/* Preload critical fonts */
/* <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin> */

/* Use font-display */
@font-face {
  font-family: 'MyFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;  /* Show fallback immediately */
}

/* Subset fonts (only needed characters) */
/* Use tools like glyphhanger */`}
        </CodeBlock>
      </Section>

      <Section title="Performance Monitoring">
        <CodeBlock language="javascript">
{`// Performance API
performance.mark('app-start');

// ... app loads

performance.mark('app-ready');
performance.measure('app-load-time', 'app-start', 'app-ready');

const measure = performance.getEntriesByName('app-load-time')[0];
console.log('Load time:', measure.duration);

// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);  // Cumulative Layout Shift
getFID(sendToAnalytics);  // First Input Delay
getFCP(sendToAnalytics);  // First Contentful Paint
getLCP(sendToAnalytics);  // Largest Contentful Paint
getTTFB(sendToAnalytics); // Time to First Byte

// Error tracking with Sentry
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0
});

// Track custom events
Sentry.captureMessage('User clicked button');

// Performance monitoring
const transaction = Sentry.startTransaction({
  op: 'page-load',
  name: 'Home Page'
});

// ... page loads

transaction.finish();`}
        </CodeBlock>
      </Section>

      <Section title="Deployment">
        <h3 className="text-lg font-semibold mb-2">Static Hosting (Vercel, Netlify)</h3>
        <CodeBlock language="bash">
{`# Vercel
npm i -g vercel
vercel login
vercel  # Deploy

# vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "API_URL": "@api-url"
  }
}

# Netlify
npm i -g netlify-cli
netlify login
netlify deploy --prod

# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200  # SPA redirect`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Docker Deployment</h3>
        <CodeBlock language="dockerfile">
{`# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

# Production image
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]`}
        </CodeBlock>

        <CodeBlock language="bash">
{`# Build and run
docker build -t myapp .
docker run -p 80:80 myapp

# docker-compose.yml
version: '3'
services:
  app:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">CI/CD (GitHub Actions)</h3>
        <CodeBlock language="yaml">
{`# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        env:
          API_URL: \${{ secrets.API_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'`}
        </CodeBlock>
      </Section>

      <Section title="Production Checklist">
        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Before Deployment:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>✅ Environment variables configured</li>
            <li>✅ Production build tested locally</li>
            <li>✅ Code minified and uglified</li>
            <li>✅ Bundle size analyzed and optimized</li>
            <li>✅ Images optimized (compressed, lazy loaded)</li>
            <li>✅ Fonts optimized (woff2, font-display: swap)</li>
            <li>✅ Remove console.logs</li>
            <li>✅ Error tracking configured (Sentry)</li>
            <li>✅ Analytics configured (Google Analytics, etc.)</li>
            <li>✅ Performance monitoring setup</li>
            <li>✅ Security headers configured (CSP, HSTS)</li>
            <li>✅ HTTPS enabled</li>
            <li>✅ CDN configured (if needed)</li>
            <li>✅ Caching strategy implemented</li>
            <li>✅ Database backups automated</li>
            <li>✅ Monitoring/alerts configured</li>
            <li>✅ Documentation updated</li>
          </ul>
        </div>
      </Section>

      <Section title="Post-Deployment">
        <CodeBlock language="javascript">
{`// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
    version: process.env.APP_VERSION
  });
});

// Monitoring
setInterval(() => {
  const usage = process.memoryUsage();
  console.log({
    memory: {
      rss: \`\${(usage.rss / 1024 / 1024).toFixed(2)} MB\`,
      heapUsed: \`\${(usage.heapUsed / 1024 / 1024).toFixed(2)} MB\`
    },
    uptime: process.uptime()
  });
}, 60000);  // Every minute

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  
  // Close server
  server.close(async () => {
    console.log('Server closed');
    
    // Close database connections
    await database.disconnect();
    
    process.exit(0);
  });
});`}
        </CodeBlock>
      </Section>

      <Section title="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Use Environment-Specific Configs</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              .env.development, .env.production, never commit .env.local
            </p>
          </div>

          <div>
            <strong>2. Optimize Bundle Size</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Code splitting, tree shaking, lazy loading, analyze bundle
            </p>
          </div>

          <div>
            <strong>3. Monitor Performance</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Web Vitals, error tracking, analytics, health checks
            </p>
          </div>

          <div>
            <strong>4. Automate Deployment</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              CI/CD pipeline, automated tests, rollback strategy
            </p>
          </div>

          <div>
            <strong>5. Security First</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              HTTPS, security headers, input validation, dependency audits
            </p>
          </div>
        </div>
      </Section>

      <Section title="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Production Essentials:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Environment Variables:</strong> .env files, never commit secrets</li>
            <li><strong>Build Process:</strong> Minification, bundling, optimization</li>
            <li><strong>Code Optimization:</strong> Tree shaking, code splitting, lazy loading</li>
            <li><strong>Asset Optimization:</strong> Image compression, font optimization</li>
            <li><strong>Performance:</strong> Web Vitals, monitoring, profiling</li>
            <li><strong>Deployment:</strong> Static hosting, Docker, CI/CD</li>
            <li><strong>Monitoring:</strong> Error tracking, analytics, health checks</li>
          </ul>
          
          <h3 className="font-semibold mt-4 mb-3">Deployment Platforms:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>Vercel - Best for Next.js, React apps</li>
            <li>Netlify - Best for static sites, JAMstack</li>
            <li>AWS - Full control, scalable</li>
            <li>Docker - Containerized deployment</li>
            <li>Heroku - Easy Node.js deployment</li>
          </ul>
          
          <p className="mt-4 text-sm font-semibold">
            🎉 Selamat! Anda telah menyelesaikan 25 materi JavaScript. 
            Sekarang saatnya build amazing projects!
          </p>
        </div>
      </Section>
    </MateriLayout>
  );
}
