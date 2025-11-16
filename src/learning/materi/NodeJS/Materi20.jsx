import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi20() {
  return (
    <MateriLayout title="Environment Variables & Configuration">
      <Section id="intro" heading="What are Environment Variables?">
        <p>Environment variables adalah variabel yang disimpan di environment sistem dan dapat diakses oleh aplikasi. Berguna untuk:</p>
        <ul>
          <li><strong>Security:</strong> Menyimpan sensitive data (API keys, passwords)</li>
          <li><strong>Flexibility:</strong> Konfigurasi berbeda untuk setiap environment</li>
          <li><strong>Portability:</strong> Same code, different configurations</li>
          <li><strong>Best Practice:</strong> Tidak hardcode credentials dalam code</li>
        </ul>
      </Section>

      <Section id="dotenv" heading="Using dotenv">
        <CodeBlock language="bash">
{`npm install dotenv`}
        </CodeBlock>

        <p>Create <code>.env</code> file di root project:</p>
        <CodeBlock language="bash">
{`# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=27017
DB_NAME=myapp
DB_USER=admin
DB_PASSWORD=secret123

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=7d

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# External APIs
STRIPE_SECRET_KEY=sk_test_xxxxx
AWS_ACCESS_KEY_ID=AKIAXXXXX
AWS_SECRET_ACCESS_KEY=xxxxx
AWS_REGION=us-east-1

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# App Settings
MAX_FILE_SIZE=5242880
ALLOWED_ORIGINS=http://localhost:3000,https://myapp.com`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`// Load environment variables at app start
require('dotenv').config();

const express = require('express');
const app = express();

// Access environment variables
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(\`Server running in \${NODE_ENV} mode on port \${PORT}\`);

app.listen(PORT);`}
        </CodeBlock>

        <Note type="warning">
          <strong>Never commit .env file</strong> to version control! Add to <code>.gitignore</code>
        </Note>
      </Section>

      <Section id="gitignore" heading="Protecting .env File">
        <p>Create or update <code>.gitignore</code>:</p>
        <CodeBlock language="bash">
{`# Environment variables
.env
.env.local
.env.*.local

# Dependencies
node_modules/

# Logs
logs/
*.log

# OS files
.DS_Store
Thumbs.db`}
        </CodeBlock>

        <p>Create <code>.env.example</code> template for developers:</p>
        <CodeBlock language="bash">
{`# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=27017
DB_NAME=
DB_USER=
DB_PASSWORD=

# JWT
JWT_SECRET=
JWT_EXPIRE=7d

# Email Service
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

# External APIs
STRIPE_SECRET_KEY=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1`}
        </CodeBlock>
      </Section>

      <Section id="config-module" heading="Config Module">
        <p>Create <code>config/config.js</code> untuk centralize configuration:</p>
        <CodeBlock language="javascript">
{`require('dotenv').config();

const config = {
  // Environment
  env: process.env.NODE_ENV || 'development',
  
  // Server
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || 'localhost'
  },
  
  // Database
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    name: process.env.DB_NAME || 'myapp',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    
    get uri() {
      if (this.user && this.password) {
        return \`mongodb://\${this.user}:\${this.password}@\${this.host}:\${this.port}/\${this.name}\`;
      }
      return \`mongodb://\${this.host}:\${this.port}/\${this.name}\`;
    }
  },
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-key',
    expiresIn: process.env.JWT_EXPIRE || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRE || '30d'
  },
  
  // Email
  email: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    },
    from: process.env.EMAIL_FROM || 'noreply@myapp.com'
  },
  
  // AWS
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
    s3Bucket: process.env.AWS_S3_BUCKET
  },
  
  // Redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD
  },
  
  // App settings
  app: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5242880, // 5MB
    allowedOrigins: process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',') 
      : ['http://localhost:3000'],
    uploadPath: process.env.UPLOAD_PATH || './uploads'
  }
};

// Validation
const requiredEnvVars = ['DB_NAME', 'JWT_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(\`Missing required environment variables: \${missingVars.join(', ')}\`);
  process.exit(1);
}

module.exports = config;`}
        </CodeBlock>

        <p>Usage:</p>
        <CodeBlock language="javascript">
{`const config = require('./config/config');

// Database connection
mongoose.connect(config.database.uri);

// JWT signing
const token = jwt.sign({ userId }, config.jwt.secret, {
  expiresIn: config.jwt.expiresIn
});

// Server start
app.listen(config.server.port, () => {
  console.log(\`Server running on port \${config.server.port}\`);
});`}
        </CodeBlock>
      </Section>

      <Section id="multiple-environments" heading="Multiple Environments">
        <p>Create environment-specific files:</p>
        <CodeBlock language="bash">
{`.env.development
.env.staging
.env.production`}
        </CodeBlock>

        <p><strong>.env.development:</strong></p>
        <CodeBlock language="bash">
{`NODE_ENV=development
PORT=3000
DB_NAME=myapp_dev
DEBUG=true
LOG_LEVEL=debug`}
        </CodeBlock>

        <p><strong>.env.production:</strong></p>
        <CodeBlock language="bash">
{`NODE_ENV=production
PORT=8080
DB_NAME=myapp_prod
DEBUG=false
LOG_LEVEL=error`}
        </CodeBlock>

        <p>Load specific environment:</p>
        <CodeBlock language="javascript">
{`const path = require('path');
const dotenv = require('dotenv');

// Determine environment
const env = process.env.NODE_ENV || 'development';

// Load environment-specific file
const envFile = \`.env.\${env}\`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log(\`Loaded \${envFile}\`);`}
        </CodeBlock>

        <p>Package.json scripts:</p>
        <CodeBlock language="json">
{`{
  "scripts": {
    "start": "node app.js",
    "dev": "NODE_ENV=development nodemon app.js",
    "prod": "NODE_ENV=production node app.js",
    "staging": "NODE_ENV=staging node app.js"
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="type-conversion" heading="Type Conversion & Validation">
        <CodeBlock language="javascript">
{`// config/env.js
function getEnv(key, defaultValue, parser = String) {
  const value = process.env[key];
  
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(\`Missing required environment variable: \${key}\`);
  }
  
  try {
    return parser(value);
  } catch (error) {
    throw new Error(\`Invalid value for \${key}: \${value}\`);
  }
}

// Type parsers
const parsers = {
  string: (value) => String(value),
  
  int: (value) => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) throw new Error('Not a valid integer');
    return parsed;
  },
  
  float: (value) => {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) throw new Error('Not a valid float');
    return parsed;
  },
  
  boolean: (value) => {
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;
    throw new Error('Not a valid boolean');
  },
  
  array: (value, separator = ',') => {
    return value.split(separator).map(item => item.trim());
  },
  
  json: (value) => {
    try {
      return JSON.parse(value);
    } catch {
      throw new Error('Not valid JSON');
    }
  }
};

// Usage
const config = {
  port: getEnv('PORT', 3000, parsers.int),
  debug: getEnv('DEBUG', false, parsers.boolean),
  allowedOrigins: getEnv('ALLOWED_ORIGINS', [], parsers.array),
  features: getEnv('FEATURES', '{}', parsers.json)
};

module.exports = { getEnv, parsers, config };`}
        </CodeBlock>
      </Section>

      <Section id="secrets-management" heading="Secrets Management">
        <h3>1. Local Development</h3>
        <CodeBlock language="bash">
{`# Use .env file
# Add to .gitignore`}
        </CodeBlock>

        <h3>2. Production - Environment Variables</h3>
        <CodeBlock language="bash">
{`# Heroku
heroku config:set DB_PASSWORD=secret123
heroku config:set JWT_SECRET=super-secret

# AWS Elastic Beanstalk
eb setenv DB_PASSWORD=secret123 JWT_SECRET=super-secret

# Docker
docker run -e DB_PASSWORD=secret123 -e JWT_SECRET=super-secret myapp

# Linux
export DB_PASSWORD=secret123
export JWT_SECRET=super-secret`}
        </CodeBlock>

        <h3>3. AWS Secrets Manager</h3>
        <CodeBlock language="javascript">
{`const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager({ region: 'us-east-1' });

async function getSecret(secretName) {
  try {
    const data = await secretsManager.getSecretValue({ 
      SecretId: secretName 
    }).promise();
    
    return JSON.parse(data.SecretString);
  } catch (error) {
    console.error('Error retrieving secret:', error);
    throw error;
  }
}

// Usage
const dbCredentials = await getSecret('prod/database');
const config = {
  database: {
    host: dbCredentials.host,
    user: dbCredentials.username,
    password: dbCredentials.password
  }
};`}
        </CodeBlock>

        <h3>4. HashiCorp Vault</h3>
        <CodeBlock language="javascript">
{`const vault = require('node-vault')({
  endpoint: 'http://127.0.0.1:8200',
  token: process.env.VAULT_TOKEN
});

async function getVaultSecret(path) {
  const result = await vault.read(path);
  return result.data;
}

// Usage
const secrets = await getVaultSecret('secret/data/myapp');
const config = {
  jwt: {
    secret: secrets.jwt_secret
  }
};`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Never commit secrets</strong> to version control</li>
          <li><strong>Use .env.example</strong> untuk document required variables</li>
          <li><strong>Validate environment variables</strong> at startup</li>
          <li><strong>Use different configs</strong> untuk each environment</li>
          <li><strong>Provide defaults</strong> untuk non-sensitive values</li>
          <li><strong>Use type conversion</strong> (string to number/boolean)</li>
          <li><strong>Rotate secrets regularly</strong> in production</li>
          <li><strong>Limit access</strong> to production secrets</li>
          <li><strong>Use secrets management tools</strong> untuk production</li>
          <li><strong>Document all variables</strong> in README</li>
        </ul>
      </Section>

      <Section id="config-package" heading="Config Package (Alternative)">
        <CodeBlock language="bash">
{`npm install config`}
        </CodeBlock>

        <p>Create <code>config/default.json</code>:</p>
        <CodeBlock language="json">
{`{
  "server": {
    "port": 3000,
    "host": "localhost"
  },
  "database": {
    "host": "localhost",
    "port": 27017,
    "name": "myapp"
  }
}`}
        </CodeBlock>

        <p>Create <code>config/production.json</code>:</p>
        <CodeBlock language="json">
{`{
  "server": {
    "port": 8080
  },
  "database": {
    "host": "prod-db.example.com",
    "name": "myapp_prod"
  }
}`}
        </CodeBlock>

        <p>Usage:</p>
        <CodeBlock language="javascript">
{`const config = require('config');

const port = config.get('server.port');
const dbName = config.get('database.name');

console.log(\`Port: \${port}, Database: \${dbName}\`);`}
        </CodeBlock>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Environment variables untuk store configuration dan secrets</li>
          <li>dotenv loads variables dari .env file</li>
          <li>Never commit .env file, use .env.example instead</li>
          <li>Create config module untuk centralize configuration</li>
          <li>Use different .env files untuk different environments</li>
          <li>Validate dan convert environment variable types</li>
          <li>Use secrets management tools untuk production</li>
          <li>Provide sensible defaults untuk non-sensitive values</li>
          <li>Document all required environment variables</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
