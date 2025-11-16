import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi24() {
  return (
    <MateriLayout title="Deployment & Production">
      <Section id="intro" heading="Production vs Development">
        <table>
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Development</th>
              <th>Production</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Error Details</td>
              <td>Full stack traces</td>
              <td>Generic error messages</td>
            </tr>
            <tr>
              <td>Logging</td>
              <td>Verbose (debug level)</td>
              <td>Essential only (error, warn)</td>
            </tr>
            <tr>
              <td>Caching</td>
              <td>Disabled</td>
              <td>Enabled</td>
            </tr>
            <tr>
              <td>Performance</td>
              <td>Not critical</td>
              <td>Optimized</td>
            </tr>
            <tr>
              <td>Security</td>
              <td>Relaxed</td>
              <td>Strict</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section id="environment" heading="Environment Configuration">
        <p><strong>.env.production:</strong></p>
        <CodeBlock language="bash">
{`NODE_ENV=production
PORT=8080

# Database
DB_HOST=prod-db.example.com
DB_PORT=27017
DB_NAME=myapp_prod
DB_USER=produser
DB_PASSWORD=strong-password

# Security
JWT_SECRET=very-long-random-secret
SESSION_SECRET=another-random-secret

# External Services
REDIS_URL=redis://prod-redis:6379
AWS_REGION=us-east-1

# App Settings
LOG_LEVEL=error
ENABLE_CORS=true
ALLOWED_ORIGINS=https://myapp.com,https://www.myapp.com`}
        </CodeBlock>

        <p><strong>Production config:</strong></p>
        <CodeBlock language="javascript">
{`// config/production.js
module.exports = {
  env: 'production',
  port: process.env.PORT || 8080,
  
  database: {
    uri: process.env.DATABASE_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10, // Connection pooling
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  },
  
  cors: {
    origin: process.env.ALLOWED_ORIGINS.split(','),
    credentials: true
  },
  
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100
  },
  
  cache: {
    enabled: true,
    ttl: 300 // 5 minutes
  },
  
  logging: {
    level: 'error',
    file: true,
    console: false
  }
};`}
        </CodeBlock>
      </Section>

      <Section id="optimization" heading="Production Optimizations">
        <CodeBlock language="javascript">
{`const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

// 1. Compression
app.use(compression());

// 2. Security headers
app.use(helmet());

// 3. Trust proxy (for load balancers)
app.set('trust proxy', 1);

// 4. Disable x-powered-by header
app.disable('x-powered-by');

// 5. Static file caching
app.use(express.static('public', {
  maxAge: '1y',
  etag: true
}));

// 6. Enable keep-alive
const server = app.listen(PORT, () => {
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
});

// 7. Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});`}
        </CodeBlock>
      </Section>

      <Section id="pm2" heading="PM2 Process Manager">
        <CodeBlock language="bash">
{`# Install PM2 globally
npm install -g pm2

# Start app
pm2 start app.js

# Start with name
pm2 start app.js --name "myapp"

# Start with cluster mode (use all CPU cores)
pm2 start app.js -i max

# Start with watch mode
pm2 start app.js --watch

# List running apps
pm2 list

# Monitor apps
pm2 monit

# View logs
pm2 logs
pm2 logs myapp

# Restart app
pm2 restart myapp

# Stop app
pm2 stop myapp

# Delete app
pm2 delete myapp

# Save process list
pm2 save

# Startup script (auto-start on boot)
pm2 startup
pm2 save`}
        </CodeBlock>

        <p><strong>ecosystem.config.js:</strong></p>
        <CodeBlock language="javascript">
{`module.exports = {
  apps: [{
    name: 'myapp',
    script: './app.js',
    instances: 'max', // or number of instances
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8080
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    merge_logs: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
  }]
};

// Start with config
// pm2 start ecosystem.config.js --env production`}
        </CodeBlock>
      </Section>

      <Section id="heroku" heading="Heroku Deployment">
        <CodeBlock language="bash">
{`# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create myapp

# Add buildpack
heroku buildpacks:set heroku/nodejs

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
heroku config:set DATABASE_URL=your-database-url

# Deploy
git push heroku main

# View logs
heroku logs --tail

# Open app
heroku open

# Scale dynos
heroku ps:scale web=2

# Add MongoDB
heroku addons:create mongolab:sandbox

# Add Redis
heroku addons:create heroku-redis:hobby-dev`}
        </CodeBlock>

        <p><strong>Procfile:</strong></p>
        <CodeBlock language="text">
{`web: node app.js`}
        </CodeBlock>

        <p><strong>package.json:</strong></p>
        <CodeBlock language="json">
{`{
  "name": "myapp",
  "version": "1.0.0",
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  },
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="docker" heading="Docker Deployment">
        <p><strong>Dockerfile:</strong></p>
        <CodeBlock language="dockerfile">
{`# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Start app
CMD ["node", "app.js"]`}
        </CodeBlock>

        <p><strong>.dockerignore:</strong></p>
        <CodeBlock language="text">
{`node_modules
npm-debug.log
.git
.env
.env.local
.DS_Store
logs/
*.log`}
        </CodeBlock>

        <p><strong>docker-compose.yml:</strong></p>
        <CodeBlock language="yaml">
{`version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=mongo
      - REDIS_HOST=redis
    depends_on:
      - mongo
      - redis
    restart: unless-stopped
  
  mongo:
    image: mongo:6
    volumes:
      - mongo-data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
    restart: unless-stopped
  
  redis:
    image: redis:7-alpine
    volumes:
      - redis-data:/data
    restart: unless-stopped

volumes:
  mongo-data:
  redis-data:`}
        </CodeBlock>

        <CodeBlock language="bash">
{`# Build image
docker build -t myapp .

# Run container
docker run -p 3000:3000 myapp

# Using docker-compose
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop containers
docker-compose down`}
        </CodeBlock>
      </Section>

      <Section id="nginx" heading="Nginx Reverse Proxy">
        <p><strong>/etc/nginx/sites-available/myapp:</strong></p>
        <CodeBlock language="nginx">
{`upstream myapp {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name myapp.com www.myapp.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name myapp.com www.myapp.com;
    
    # SSL Certificate
    ssl_certificate /etc/letsencrypt/live/myapp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myapp.com/privkey.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    
    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    
    # Static files
    location /static {
        alias /var/www/myapp/public;
        expires 1y;
        access_log off;
    }
    
    # Proxy to Node.js
    location / {
        proxy_pass http://myapp;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Health check
    location /health {
        access_log off;
        return 200 "OK";
        add_header Content-Type text/plain;
    }
}`}
        </CodeBlock>

        <CodeBlock language="bash">
{`# Enable site
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d myapp.com -d www.myapp.com`}
        </CodeBlock>
      </Section>

      <Section id="monitoring" heading="Monitoring & Logging">
        <CodeBlock language="javascript">
{`// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    env: process.env.NODE_ENV
  });
});

// Readiness check
app.get('/ready', async (req, res) => {
  try {
    // Check database
    await mongoose.connection.db.admin().ping();
    
    // Check Redis
    await redisClient.ping();
    
    res.status(200).json({ status: 'Ready' });
  } catch (error) {
    res.status(503).json({ 
      status: 'Not Ready',
      error: error.message 
    });
  }
});

// Error tracking with Sentry
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

// Application performance monitoring
const newrelic = require('newrelic');`}
        </CodeBlock>
      </Section>

      <Section id="checklist" heading="Production Deployment Checklist">
        <ul>
          <li>✅ Set NODE_ENV=production</li>
          <li>✅ Use environment variables untuk all secrets</li>
          <li>✅ Enable HTTPS dengan valid SSL certificate</li>
          <li>✅ Set up security headers (Helmet)</li>
          <li>✅ Implement rate limiting</li>
          <li>✅ Enable gzip compression</li>
          <li>✅ Configure CORS properly</li>
          <li>✅ Set up process manager (PM2)</li>
          <li>✅ Configure logging (Winston)</li>
          <li>✅ Set up error tracking (Sentry)</li>
          <li>✅ Implement health checks</li>
          <li>✅ Configure database connection pooling</li>
          <li>✅ Set up monitoring (New Relic, DataDog)</li>
          <li>✅ Configure automated backups</li>
          <li>✅ Set up CI/CD pipeline</li>
          <li>✅ Load testing</li>
          <li>✅ Security audit</li>
          <li>✅ Document deployment process</li>
          <li>✅ Set up alerting</li>
          <li>✅ Graceful shutdown handling</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Production environment requires different configuration dari development</li>
          <li>Use PM2 untuk process management dan clustering</li>
          <li>Heroku provides easy deployment untuk quick start</li>
          <li>Docker ensures consistent environment across deployments</li>
          <li>Nginx as reverse proxy untuk load balancing dan SSL</li>
          <li>Always use HTTPS in production dengan valid certificates</li>
          <li>Implement health checks untuk monitoring</li>
          <li>Set up proper logging dan error tracking</li>
          <li>Use environment variables untuk all configuration</li>
          <li>Enable compression dan caching untuk performance</li>
          <li>Follow production checklist sebelum deploying</li>
          <li>Monitor application performance continuously</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
