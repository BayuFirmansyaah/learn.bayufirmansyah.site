import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi22() {
  return (
    <MateriLayout
      title="API Integration"
      description="Pelajari cara integrate dengan REST APIs di JavaScript"
    >
      <Section id="pengenalan-api-integration" heading="Pengenalan API Integration">
        <p>
          API (Application Programming Interface) adalah interface yang memungkinkan komunikasi 
          antara applications. REST API adalah architectural style yang paling populer.
        </p>
        
        <Note type="info">
          <strong>HTTP Methods:</strong> GET (read), POST (create), PUT/PATCH (update), DELETE (delete)
        </Note>
      </Section>

      <Section id="fetch-api" heading="Fetch API">
        <p>Fetch API adalah modern way untuk make HTTP requests di browser.</p>

        <h3 className="text-lg font-semibold mb-2">Basic GET Request</h3>
        <CodeBlock language="javascript">
{`// Simple GET request
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// With async/await (cleaner)
async function getUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Usage
const users = await getUsers();
console.log(users);`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">POST Request</h3>
        <CodeBlock language="javascript">
{`async function createUser(userData) {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Usage
const newUser = await createUser({
  name: 'Alice',
  email: 'alice@example.com'
});`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">PUT/PATCH Request</h3>
        <CodeBlock language="javascript">
{`// PUT (replace entire resource)
async function updateUser(id, userData) {
  const response = await fetch(\`https://api.example.com/users/\${id}\`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  return response.json();
}

// PATCH (partial update)
async function patchUser(id, updates) {
  const response = await fetch(\`https://api.example.com/users/\${id}\`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  
  return response.json();
}

// Usage
await updateUser(1, { name: 'Alice', email: 'alice@example.com' });
await patchUser(1, { name: 'Alice Updated' });`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">DELETE Request</h3>
        <CodeBlock language="javascript">
{`async function deleteUser(id) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${id}\`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    // Some APIs return no content (204)
    if (response.status === 204) {
      return { success: true };
    }
    
    return response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Usage
await deleteUser(1);`}
        </CodeBlock>
      </Section>

      <Section id="api-client-class" heading="API Client Class">
        <p>Create reusable API client dengan error handling dan authentication.</p>

        <CodeBlock language="javascript">
{`class ApiClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    this.token = options.token || null;
  }
  
  setToken(token) {
    this.token = token;
  }
  
  getHeaders() {
    const headers = { ...this.defaultHeaders };
    
    if (this.token) {
      headers['Authorization'] = \`Bearer \${this.token}\`;
    }
    
    return headers;
  }
  
  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers
      }
    };
    
    try {
      const response = await fetch(url, config);
      
      // Handle errors
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || \`HTTP error! status: \${response.status}\`);
      }
      
      // Handle no content
      if (response.status === 204) {
        return null;
      }
      
      return response.json();
    } catch (error) {
      console.error(\`API Error [\${options.method || 'GET'}] \${url}:\`, error);
      throw error;
    }
  }
  
  get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? \`\${endpoint}?\${queryString}\` : endpoint;
    
    return this.request(url, {
      method: 'GET'
    });
  }
  
  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  
  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
  
  patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }
  
  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
}

// Usage
const api = new ApiClient('https://api.example.com');

// Set token after login
api.setToken('your-jwt-token');

// Make requests
const users = await api.get('/users');
const user = await api.get('/users/1');
const newUser = await api.post('/users', { name: 'Alice' });
await api.put('/users/1', { name: 'Alice Updated' });
await api.delete('/users/1');

// With query params
const filteredUsers = await api.get('/users', { 
  role: 'admin', 
  page: 1 
});`}
        </CodeBlock>
      </Section>

      <Section id="authentication" heading="Authentication">
        <h3 className="text-lg font-semibold mb-2">JWT (JSON Web Token)</h3>
        <CodeBlock language="javascript">
{`class AuthService {
  constructor(apiClient) {
    this.api = apiClient;
    this.tokenKey = 'auth_token';
  }
  
  async login(email, password) {
    try {
      const response = await this.api.post('/auth/login', {
        email,
        password
      });
      
      const { token, user } = response;
      
      // Store token
      localStorage.setItem(this.tokenKey, token);
      
      // Set token in API client
      this.api.setToken(token);
      
      return { token, user };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
  
  async register(userData) {
    try {
      const response = await this.api.post('/auth/register', userData);
      
      const { token, user } = response;
      
      localStorage.setItem(this.tokenKey, token);
      this.api.setToken(token);
      
      return { token, user };
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }
  
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.api.setToken(null);
  }
  
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
  
  isAuthenticated() {
    return !!this.getToken();
  }
  
  // Initialize token on page load
  initializeAuth() {
    const token = this.getToken();
    if (token) {
      this.api.setToken(token);
    }
  }
  
  // Refresh token
  async refreshToken() {
    try {
      const response = await this.api.post('/auth/refresh');
      const { token } = response;
      
      localStorage.setItem(this.tokenKey, token);
      this.api.setToken(token);
      
      return token;
    } catch (error) {
      // Refresh failed, logout
      this.logout();
      throw error;
    }
  }
}

// Usage
const api = new ApiClient('https://api.example.com');
const auth = new AuthService(api);

// Initialize on page load
auth.initializeAuth();

// Login
try {
  const { user } = await auth.login('alice@example.com', 'password123');
  console.log('Logged in:', user);
} catch (error) {
  console.error('Login error:', error.message);
}

// Check authentication
if (auth.isAuthenticated()) {
  // User is logged in
}

// Logout
auth.logout();`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Protected Routes</h3>
        <CodeBlock language="javascript">
{`// Middleware untuk check authentication
function requireAuth() {
  if (!auth.isAuthenticated()) {
    window.location.href = '/login';
    throw new Error('Authentication required');
  }
}

// Protected API calls
async function getProfile() {
  requireAuth();
  return api.get('/profile');
}

async function updateProfile(data) {
  requireAuth();
  return api.put('/profile', data);
}`}
        </CodeBlock>
      </Section>

      <Section id="error-handling" heading="Error Handling">
        <CodeBlock language="javascript">
{`class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

class ApiClient {
  // ... previous code
  
  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers
      }
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        throw new ApiError(
          errorData.message || 'Request failed',
          response.status,
          errorData
        );
      }
      
      if (response.status === 204) {
        return null;
      }
      
      return response.json();
    } catch (error) {
      // Network error
      if (error instanceof TypeError) {
        throw new ApiError('Network error', 0);
      }
      
      // Re-throw API errors
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError('Unknown error', 0);
    }
  }
}

// Usage with error handling
async function fetchUserWithErrorHandling(id) {
  try {
    const user = await api.get(\`/users/\${id}\`);
    return user;
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.status) {
        case 401:
          console.error('Unauthorized. Please login.');
          // Redirect to login
          break;
        case 403:
          console.error('Forbidden. You do not have permission.');
          break;
        case 404:
          console.error('User not found.');
          break;
        case 500:
          console.error('Server error. Please try again later.');
          break;
        default:
          console.error('Error:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="request-cancellation" heading="Request Cancellation">
        <p>Use AbortController untuk cancel ongoing requests.</p>

        <CodeBlock language="javascript">
{`// Cancel single request
const controller = new AbortController();

fetch('https://api.example.com/users', {
  signal: controller.signal
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Request cancelled');
    }
  });

// Cancel after 5 seconds
setTimeout(() => {
  controller.abort();
}, 5000);

// Cancel previous search requests
let searchController = null;

async function search(query) {
  // Cancel previous request
  if (searchController) {
    searchController.abort();
  }
  
  // Create new controller
  searchController = new AbortController();
  
  try {
    const response = await fetch(\`/api/search?q=\${query}\`, {
      signal: searchController.signal
    });
    
    const results = await response.json();
    return results;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Search cancelled');
      return null;
    }
    throw error;
  }
}

// In API Client
class ApiClient {
  // ... previous code
  
  async request(endpoint, options = {}) {
    const controller = new AbortController();
    const timeout = options.timeout || 30000;  // 30s default
    
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
    
    const config = {
      ...options,
      signal: controller.signal,
      headers: {
        ...this.getHeaders(),
        ...options.headers
      }
    };
    
    try {
      const url = \`\${this.baseURL}\${endpoint}\`;
      const response = await fetch(url, config);
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      throw error;
    }
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="retry-logic" heading="Retry Logic">
        <CodeBlock language="javascript">
{`async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      return response.json();
    } catch (error) {
      lastError = error;
      console.log(\`Attempt \${i + 1} failed, retrying...\`);
      
      // Exponential backoff: 1s, 2s, 4s...
      const delay = Math.pow(2, i) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

// In API Client
class ApiClient {
  // ... previous code
  
  async requestWithRetry(endpoint, options = {}, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.request(endpoint, options);
      } catch (error) {
        lastError = error;
        
        // Don't retry on client errors (4xx)
        if (error.status >= 400 && error.status < 500) {
          throw error;
        }
        
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt - 1) * 1000;
          console.log(\`Retry \${attempt}/\${maxRetries} in \${delay}ms\`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  }
}

// Usage
const data = await api.requestWithRetry('/users', {}, 3);`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Always Handle Errors</strong>
            <CodeBlock language="javascript">
{`try {
  const data = await api.get('/users');
} catch (error) {
  console.error('Error:', error);
  // Show user-friendly message
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>2. Use Loading States</strong>
            <CodeBlock language="javascript">
{`let isLoading = true;
try {
  const data = await api.get('/users');
  // Update UI with data
} finally {
  isLoading = false;
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Validate Responses</strong>
            <CodeBlock language="javascript">
{`const data = await api.get('/user/1');
if (!data || !data.id) {
  throw new Error('Invalid response');
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Use Request Timeouts</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Prevent hanging requests dengan AbortController
            </p>
          </div>

          <div>
            <strong>5. Secure Authentication Tokens</strong>
            <CodeBlock language="javascript">
{`// Store in httpOnly cookie (server-side)
// Or localStorage with XSS protection
// ❌ Don't expose in URL or client-side code`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <Section id="rangkuman" heading="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Konsep Penting:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Fetch API:</strong> Modern way untuk HTTP requests</li>
            <li><strong>HTTP Methods:</strong> GET, POST, PUT, PATCH, DELETE</li>
            <li><strong>Headers:</strong> Content-Type, Authorization</li>
            <li><strong>Authentication:</strong> JWT tokens, Bearer auth</li>
            <li><strong>Error Handling:</strong> Status codes, try/catch</li>
            <li><strong>AbortController:</strong> Cancel requests, timeouts</li>
            <li><strong>Retry Logic:</strong> Exponential backoff</li>
          </ul>
          
          <h3 className="font-semibold mt-4 mb-3">Best Practices:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>Create reusable API client class</li>
            <li>Handle all errors gracefully</li>
            <li>Use loading states</li>
            <li>Implement request timeouts</li>
            <li>Validate API responses</li>
            <li>Store tokens securely</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
