import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi21() {
  return (
    <MateriLayout
      title="Modern JavaScript Tools"
      description="Pelajari tools modern untuk JavaScript development"
    >
      <Section id="pengenalan-modern-tools" heading="Pengenalan Modern Tools">
        <p>
          Modern JavaScript development requires berbagai tools: package managers, bundlers, 
          transpilers, linters, formatters. Tools ini improve developer experience dan code quality.
        </p>
        
        <Note type="info">
          <strong>Essential Tools:</strong> npm/yarn, Webpack/Vite, Babel, ESLint, Prettier
        </Note>
      </Section>

      <Section id="npm-node-package-manager" heading="npm (Node Package Manager)">
        <p>npm adalah package manager default untuk Node.js ecosystem.</p>

        <h3 className="text-lg font-semibold mb-2">package.json</h3>
        <CodeBlock language="json">
{`{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My awesome project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "webpack --mode production",
    "test": "jest",
    "lint": "eslint src/**/*.js",
    "format": "prettier --write src/**/*.js"
  },
  "keywords": ["javascript", "example"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "webpack": "^5.75.0",
    "eslint": "^8.30.0",
    "jest": "^29.3.0"
  }
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Common npm Commands</h3>
        <CodeBlock language="bash">
{`# Initialize new project
npm init
npm init -y  # Skip questions

# Install dependencies
npm install express
npm i lodash --save  # Add to dependencies
npm i webpack --save-dev  # Add to devDependencies

# Install all dependencies from package.json
npm install

# Update packages
npm update
npm update express

# Remove package
npm uninstall express

# Global packages
npm install -g nodemon
npm uninstall -g nodemon

# Run scripts
npm start
npm run dev
npm run build
npm test

# List installed packages
npm list
npm list --depth=0  # Top-level only
npm list -g --depth=0  # Global packages

# Check outdated packages
npm outdated

# Security audit
npm audit
npm audit fix`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Semantic Versioning</h3>
        <CodeBlock language="javascript">
{`// package.json versions:
// "^4.18.0" - Compatible (4.x.x, but not 5.0.0)
// "~4.18.0" - Approximately (4.18.x only)
// "4.18.0" - Exact version
// "*" - Latest version (dangerous)
// ">=4.18.0" - Greater than or equal

// Version format: MAJOR.MINOR.PATCH
// 4.18.2
// ^ ^  ^
// | |  Bug fixes (patch)
// | New features, backwards compatible (minor)
// Breaking changes (major)`}
        </CodeBlock>
      </Section>

      <Section id="yarn" heading="Yarn">
        <p>Yarn adalah alternative package manager, faster dan more reliable.</p>

        <CodeBlock language="bash">
{`# Install yarn
npm install -g yarn

# Initialize project
yarn init
yarn init -y

# Add dependencies
yarn add express
yarn add webpack --dev

# Install all dependencies
yarn install
yarn  # shorthand

# Remove package
yarn remove express

# Upgrade packages
yarn upgrade
yarn upgrade express

# Run scripts
yarn start
yarn dev

# Global packages
yarn global add nodemon
yarn global remove nodemon

# Why Yarn?
# - Faster (parallel downloads)
# - yarn.lock (deterministic installs)
# - Better security
# - Offline cache`}
        </CodeBlock>
      </Section>

      <Section id="webpack" heading="Webpack">
        <p>Webpack adalah module bundler yang bundle JavaScript, CSS, images, etc.</p>

        <h3 className="text-lg font-semibold mb-2">webpack.config.js</h3>
        <CodeBlock language="javascript">
{`const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point
  entry: './src/index.js',
  
  // Output
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true  // Clean dist folder before build
  },
  
  // Mode: development, production, none
  mode: 'development',
  
  // Loaders (transform files)
  module: {
    rules: [
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\\.(png|jpg|gif|svg)$/,
        type: 'asset/resource'
      }
    ]
  },
  
  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  
  // Dev server
  devServer: {
    static: './dist',
    port: 3000,
    hot: true
  },
  
  // Source maps
  devtool: 'inline-source-map'
};`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Webpack Commands</h3>
        <CodeBlock language="bash">
{`# Install webpack
npm install --save-dev webpack webpack-cli

# Build
npx webpack
npx webpack --mode production

# Watch mode
npx webpack --watch

# Dev server
npm install --save-dev webpack-dev-server
npx webpack serve

# package.json scripts
"scripts": {
  "build": "webpack --mode production",
  "dev": "webpack serve --mode development"
}`}
        </CodeBlock>
      </Section>

      <Section id="vite" heading="Vite">
        <p>Vite adalah next-generation build tool, extremely fast dengan native ES modules.</p>

        <CodeBlock language="bash">
{`# Create Vite project
npm create vite@latest my-app
cd my-app
npm install
npm run dev

# Templates available:
# - vanilla (plain JS)
# - vue
# - react
# - preact
# - lit
# - svelte

# Manual setup
npm install --save-dev vite

# vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
});

# package.json scripts
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}

# Why Vite?
# - Instant server start (no bundling in dev)
# - Lightning fast HMR (Hot Module Replacement)
# - Optimized build (uses Rollup)
# - Native ES modules support`}
        </CodeBlock>
      </Section>

      <Section id="babel" heading="Babel">
        <p>Babel adalah JavaScript transpiler yang converts modern JS to older versions.</p>

        <CodeBlock language="bash">
{`# Install Babel
npm install --save-dev @babel/core @babel/cli @babel/preset-env

# .babelrc or babel.config.json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 0.25%, not dead"
    }]
  ],
  "plugins": []
}

# Compile
npx babel src --out-dir dist

# With Webpack
npm install --save-dev babel-loader

# webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Example Transformation</h3>
        <CodeBlock language="javascript">
{`// Input (ES6+)
const greet = (name) => \`Hello, \${name}!\`;
const [a, b] = [1, 2];
const obj = { a, b };

// Output (ES5)
var greet = function greet(name) {
  return "Hello, " + name + "!";
};
var a = 1, b = 2;
var obj = { a: a, b: b };`}
        </CodeBlock>
      </Section>

      <Section id="eslint" heading="ESLint">
        <p>ESLint adalah linting tool untuk identify and fix problems in JavaScript code.</p>

        <CodeBlock language="bash">
{`# Install ESLint
npm install --save-dev eslint

# Initialize config
npx eslint --init

# .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-unused-vars": "warn",
    "no-console": "off"
  }
}

# Lint files
npx eslint src/**/*.js

# Fix automatically
npx eslint src/**/*.js --fix

# Ignore files (.eslintignore)
node_modules/
dist/
build/

# package.json script
"scripts": {
  "lint": "eslint src/**/*.js",
  "lint:fix": "eslint src/**/*.js --fix"
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Popular Configs</h3>
        <CodeBlock language="bash">
{`# Airbnb style guide
npm install --save-dev eslint-config-airbnb-base

# .eslintrc.json
{
  "extends": "airbnb-base"
}

# Google style guide
npm install --save-dev eslint-config-google

# Standard style
npm install --save-dev eslint-config-standard`}
        </CodeBlock>
      </Section>

      <Section id="prettier" heading="Prettier">
        <p>Prettier adalah opinionated code formatter.</p>

        <CodeBlock language="bash">
{`# Install Prettier
npm install --save-dev prettier

# .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}

# Format files
npx prettier --write src/**/*.js

# Check formatting
npx prettier --check src/**/*.js

# .prettierignore
node_modules/
dist/
build/
package-lock.json

# package.json scripts
"scripts": {
  "format": "prettier --write src/**/*.js",
  "format:check": "prettier --check src/**/*.js"
}

# ESLint + Prettier integration
npm install --save-dev eslint-config-prettier eslint-plugin-prettier

# .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "prettier"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="git-hooks-dengan-husky" heading="Git Hooks dengan Husky">
        <p>Husky allows running scripts before git commands.</p>

        <CodeBlock language="bash">
{`# Install Husky
npm install --save-dev husky
npx husky install

# Add to package.json
"scripts": {
  "prepare": "husky install"
}

# Create pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm test"

# Install lint-staged (run on staged files only)
npm install --save-dev lint-staged

# package.json
"lint-staged": {
  "*.js": [
    "eslint --fix",
    "prettier --write"
  ]
}

# Update pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# Now linting runs automatically before commit!`}
        </CodeBlock>
      </Section>

      <Section id="typescript" heading="TypeScript">
        <p>TypeScript adds static typing to JavaScript.</p>

        <CodeBlock language="bash">
{`# Install TypeScript
npm install --save-dev typescript

# Initialize config
npx tsc --init

# tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}

# Compile
npx tsc

# Watch mode
npx tsc --watch

# package.json scripts
"scripts": {
  "build": "tsc",
  "dev": "tsc --watch"
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Basic TypeScript</h3>
        <CodeBlock language="typescript">
{`// Types
let name: string = 'Alice';
let age: number = 25;
let isActive: boolean = true;
let numbers: number[] = [1, 2, 3];

// Interface
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // Optional
}

const user: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com'
};

// Function
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Type alias
type ID = number | string;

function getUserById(id: ID): User | null {
  // ...
}`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Use package.json Scripts</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Centralize common commands di package.json
            </p>
          </div>

          <div>
            <strong>2. Lock Dependencies</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Commit package-lock.json atau yarn.lock
            </p>
          </div>

          <div>
            <strong>3. Use ESLint + Prettier</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Enforce code quality dan consistent formatting
            </p>
          </div>

          <div>
            <strong>4. Set Up Git Hooks</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Prevent bad code from being committed
            </p>
          </div>

          <div>
            <strong>5. Keep Dependencies Updated</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Run npm audit dan npm update regularly
            </p>
          </div>
        </div>
      </Section>

      <Section id="rangkuman" heading="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Essential Tools:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>npm/Yarn:</strong> Package managers</li>
            <li><strong>Webpack:</strong> Module bundler (configurable)</li>
            <li><strong>Vite:</strong> Next-gen build tool (fast)</li>
            <li><strong>Babel:</strong> Transpiler (modern JS → older JS)</li>
            <li><strong>ESLint:</strong> Linter (find problems)</li>
            <li><strong>Prettier:</strong> Code formatter</li>
            <li><strong>Husky:</strong> Git hooks</li>
            <li><strong>TypeScript:</strong> Static typing</li>
          </ul>
          
          <h3 className="font-semibold mt-4 mb-3">Workflow:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>npm install → Install dependencies</li>
            <li>npm run dev → Start dev server</li>
            <li>npm run lint → Check code quality</li>
            <li>npm run format → Format code</li>
            <li>npm run build → Build for production</li>
            <li>git commit → Husky runs hooks</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
