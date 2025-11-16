import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi22() {
  return (
    <MateriLayout title="Testing with Jest & Supertest">
      <Section id="intro" heading="Why Testing?">
        <ul>
          <li><strong>Quality:</strong> Catch bugs before production</li>
          <li><strong>Confidence:</strong> Refactor code safely</li>
          <li><strong>Documentation:</strong> Tests describe expected behavior</li>
          <li><strong>Maintenance:</strong> Easier to maintain codebase</li>
          <li><strong>Regression:</strong> Prevent old bugs from returning</li>
        </ul>
      </Section>

      <Section id="setup" heading="Setup Jest & Supertest">
        <CodeBlock language="bash">
{`npm install --save-dev jest supertest
npm install --save-dev @types/jest @types/supertest  # For TypeScript`}
        </CodeBlock>

        <p>Update <code>package.json</code>:</p>
        <CodeBlock language="json">
{`{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": ["/node_modules/"],
    "testMatch": ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"]
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="unit-testing" heading="Unit Testing">
        <p><strong>utils/math.js:</strong></p>
        <CodeBlock language="javascript">
{`function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

module.exports = { add, subtract, multiply, divide };`}
        </CodeBlock>

        <p><strong>utils/math.test.js:</strong></p>
        <CodeBlock language="javascript">
{`const { add, subtract, multiply, divide } = require('./math');

describe('Math utilities', () => {
  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    
    test('adds negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });
    
    test('adds zero', () => {
      expect(add(5, 0)).toBe(5);
    });
  });
  
  describe('subtract', () => {
    test('subtracts two numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });
  });
  
  describe('multiply', () => {
    test('multiplies two numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });
  });
  
  describe('divide', () => {
    test('divides two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });
    
    test('throws error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });
  });
});`}
        </CodeBlock>
      </Section>

      <Section id="api-testing" heading="API Testing with Supertest">
        <p><strong>app.js:</strong></p>
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

app.get('/users', (req, res) => {
  res.json({ success: true, data: users });
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ 
      success: false, 
      error: 'User not found' 
    });
  }
  
  res.json({ success: true, data: user });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ 
      success: false, 
      error: 'Name and email required' 
    });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ 
      success: false, 
      error: 'User not found' 
    });
  }
  
  users.splice(index, 1);
  res.json({ success: true, message: 'User deleted' });
});

// Export app without listening (for testing)
module.exports = app;`}
        </CodeBlock>

        <p><strong>app.test.js:</strong></p>
        <CodeBlock language="javascript">
{`const request = require('supertest');
const app = require('./app');

describe('User API', () => {
  describe('GET /users', () => {
    test('should return all users', async () => {
      const response = await request(app)
        .get('/users')
        .expect(200)
        .expect('Content-Type', /json/);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });
  
  describe('GET /users/:id', () => {
    test('should return user by id', async () => {
      const response = await request(app)
        .get('/users/1')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', 1);
      expect(response.body.data).toHaveProperty('name');
      expect(response.body.data).toHaveProperty('email');
    });
    
    test('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/users/999')
        .expect(404);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('User not found');
    });
  });
  
  describe('POST /users', () => {
    test('should create new user', async () => {
      const newUser = {
        name: 'Alice',
        email: 'alice@example.com'
      };
      
      const response = await request(app)
        .post('/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /json/);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.name).toBe(newUser.name);
      expect(response.body.data.email).toBe(newUser.email);
    });
    
    test('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/users')
        .send({ email: 'test@example.com' })
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('required');
    });
  });
  
  describe('DELETE /users/:id', () => {
    test('should delete user', async () => {
      const response = await request(app)
        .delete('/users/1')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User deleted');
    });
    
    test('should return 404 for non-existent user', async () => {
      await request(app)
        .delete('/users/999')
        .expect(404);
    });
  });
});`}
        </CodeBlock>
      </Section>

      <Section id="setup-teardown" heading="Setup & Teardown">
        <CodeBlock language="javascript">
{`describe('User API with database', () => {
  // Run before all tests
  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URI);
  });
  
  // Run after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  // Run before each test
  beforeEach(async () => {
    await User.deleteMany({});
    await User.create([
      { name: 'John', email: 'john@example.com' },
      { name: 'Jane', email: 'jane@example.com' }
    ]);
  });
  
  // Run after each test
  afterEach(async () => {
    // Clean up
  });
  
  test('should fetch users from database', async () => {
    const users = await User.find();
    expect(users).toHaveLength(2);
  });
});`}
        </CodeBlock>
      </Section>

      <Section id="mocking" heading="Mocking">
        <h3>1. Mock Functions</h3>
        <CodeBlock language="javascript">
{`// Create mock function
const mockCallback = jest.fn(x => x * 2);

// Use mock
[1, 2, 3].forEach(mockCallback);

// Assertions
expect(mockCallback).toHaveBeenCalledTimes(3);
expect(mockCallback).toHaveBeenCalledWith(1);
expect(mockCallback).toHaveBeenCalledWith(2);
expect(mockCallback).toHaveBeenCalledWith(3);

// Check return values
expect(mockCallback.mock.results[0].value).toBe(2);
expect(mockCallback.mock.results[1].value).toBe(4);`}
        </CodeBlock>

        <h3>2. Mock Modules</h3>
        <CodeBlock language="javascript">
{`// userService.js
const axios = require('axios');

async function getUser(id) {
  const response = await axios.get(\`https://api.example.com/users/\${id}\`);
  return response.data;
}

module.exports = { getUser };

// userService.test.js
const axios = require('axios');
const { getUser } = require('./userService');

// Mock axios
jest.mock('axios');

describe('User Service', () => {
  test('should fetch user from API', async () => {
    const mockUser = { id: 1, name: 'John' };
    
    // Mock axios.get to return mockUser
    axios.get.mockResolvedValue({ data: mockUser });
    
    const user = await getUser(1);
    
    expect(axios.get).toHaveBeenCalledWith('https://api.example.com/users/1');
    expect(user).toEqual(mockUser);
  });
  
  test('should handle API errors', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));
    
    await expect(getUser(1)).rejects.toThrow('API Error');
  });
});`}
        </CodeBlock>

        <h3>3. Mock Database</h3>
        <CodeBlock language="javascript">
{`// userController.js
const User = require('./models/User');

async function getAllUsers() {
  return await User.find();
}

module.exports = { getAllUsers };

// userController.test.js
const User = require('./models/User');
const { getAllUsers } = require('./userController');

jest.mock('./models/User');

describe('User Controller', () => {
  test('should return all users', async () => {
    const mockUsers = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ];
    
    User.find.mockResolvedValue(mockUsers);
    
    const users = await getAllUsers();
    
    expect(User.find).toHaveBeenCalled();
    expect(users).toEqual(mockUsers);
    expect(users).toHaveLength(2);
  });
});`}
        </CodeBlock>
      </Section>

      <Section id="async-testing" heading="Async Testing">
        <CodeBlock language="javascript">
{`// Using async/await
test('should fetch data', async () => {
  const data = await fetchData();
  expect(data).toBe('data');
});

// Using promises
test('should fetch data', () => {
  return fetchData().then(data => {
    expect(data).toBe('data');
  });
});

// Using done callback
test('should fetch data', (done) => {
  fetchData((data) => {
    expect(data).toBe('data');
    done();
  });
});

// Testing rejections
test('should handle error', async () => {
  await expect(fetchData()).rejects.toThrow('Error');
});

// Using try/catch
test('should handle error', async () => {
  try {
    await fetchData();
  } catch (error) {
    expect(error.message).toBe('Error');
  }
});`}
        </CodeBlock>
      </Section>

      <Section id="coverage" heading="Test Coverage">
        <CodeBlock language="bash">
{`# Run tests with coverage
npm test -- --coverage

# Generate HTML coverage report
npm test -- --coverage --coverageReporters=html

# Coverage for specific files
npm test -- --coverage --collectCoverageFrom="src/**/*.js"`}
        </CodeBlock>

        <p>Configure coverage thresholds in <code>package.json</code>:</p>
        <CodeBlock language="json">
{`{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="integration-testing" heading="Integration Testing">
        <CodeBlock language="javascript">
{`const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');
const User = require('./models/User');

describe('User Integration Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URI);
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  beforeEach(async () => {
    await User.deleteMany({});
  });
  
  describe('User Registration Flow', () => {
    test('should register, login, and fetch profile', async () => {
      // 1. Register
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123'
        })
        .expect(201);
      
      expect(registerRes.body.success).toBe(true);
      expect(registerRes.body.data.user).toHaveProperty('id');
      
      // 2. Login
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'password123'
        })
        .expect(200);
      
      expect(loginRes.body.data).toHaveProperty('token');
      const token = loginRes.body.data.token;
      
      // 3. Get Profile
      const profileRes = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', \`Bearer \${token}\`)
        .expect(200);
      
      expect(profileRes.body.data.name).toBe('John Doe');
      expect(profileRes.body.data.email).toBe('john@example.com');
    });
  });
});`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Testing Best Practices">
        <ul>
          <li><strong>Test one thing at a time</strong> - each test should test one behavior</li>
          <li><strong>Use descriptive test names</strong> - clearly state what is being tested</li>
          <li><strong>Follow AAA pattern</strong> - Arrange, Act, Assert</li>
          <li><strong>Keep tests independent</strong> - tests should not depend on each other</li>
          <li><strong>Use test database</strong> - never use production database</li>
          <li><strong>Clean up after tests</strong> - reset state in afterEach/afterAll</li>
          <li><strong>Mock external dependencies</strong> - APIs, databases, etc.</li>
          <li><strong>Test edge cases</strong> - empty arrays, null values, errors</li>
          <li><strong>Aim for high coverage</strong> - but don't sacrifice quality for 100%</li>
          <li><strong>Run tests in CI/CD</strong> - automate testing pipeline</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Testing ensures code quality dan prevents bugs</li>
          <li>Jest adalah comprehensive testing framework untuk Node.js</li>
          <li>Supertest untuk testing HTTP endpoints</li>
          <li>Unit tests focus on individual functions/modules</li>
          <li>Integration tests check how components work together</li>
          <li>Mock external dependencies untuk isolated testing</li>
          <li>Use beforeEach/afterEach untuk setup dan cleanup</li>
          <li>Aim for high test coverage dengan meaningful tests</li>
          <li>Test edge cases dan error handling</li>
          <li>Automate tests dalam CI/CD pipeline</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
