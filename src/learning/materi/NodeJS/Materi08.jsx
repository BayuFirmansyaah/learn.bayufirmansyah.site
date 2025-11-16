import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi08() {
  return (
    <MateriLayout title="Express Routing & Route Parameters">
      <Section id="routing-basics" heading="Routing Basics">
        <p>
          Routing menentukan bagaimana aplikasi responds to client request ke specific 
          endpoint (URI/path) dan HTTP method.
        </p>
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Basic route structure
app.METHOD(PATH, HANDLER);

// Examples
app.get('/', (req, res) => {
  res.send('GET request to homepage');
});

app.post('/users', (req, res) => {
  res.send('POST request to /users');
});

app.put('/users/:id', (req, res) => {
  res.send('PUT request to /users/:id');
});

app.delete('/users/:id', (req, res) => {
  res.send('DELETE request to /users/:id');
});`}
        </CodeBlock>
      </Section>

      <Section id="route-parameters" heading="Route Parameters">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Single parameter
app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json({ userId });
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Optional parameter using ?
app.get('/users/:userId/posts/:postId?', (req, res) => {
  // postId is optional
  res.json(req.params);
});

// Parameter with regex pattern
app.get('/users/:id(\\\\d+)', (req, res) => {
  // Only matches if id is numeric
  res.json({ userId: req.params.id });
});

// Wildcard parameter (*)
app.get('/files/*', (req, res) => {
  const filePath = req.params[0];
  res.json({ filePath });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="query-parameters" heading="Query Parameters">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Query parameters: /search?q=nodejs&page=2&limit=10
app.get('/search', (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  
  res.json({
    query: q,
    page: parseInt(page),
    limit: parseInt(limit)
  });
});

// Filter with multiple query params
app.get('/products', (req, res) => {
  const { category, minPrice, maxPrice, sort } = req.query;
  
  let products = [
    { id: 1, name: 'Laptop', price: 1000, category: 'electronics' },
    { id: 2, name: 'Phone', price: 500, category: 'electronics' },
    { id: 3, name: 'Shirt', price: 30, category: 'clothing' }
  ];
  
  // Filter by category
  if (category) {
    products = products.filter(p => p.category === category);
  }
  
  // Filter by price range
  if (minPrice) {
    products = products.filter(p => p.price >= parseInt(minPrice));
  }
  if (maxPrice) {
    products = products.filter(p => p.price <= parseInt(maxPrice));
  }
  
  // Sort
  if (sort === 'price') {
    products.sort((a, b) => a.price - b.price);
  }
  
  res.json(products);
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="route-handlers" heading="Multiple Route Handlers">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Multiple handlers (executed in sequence)
app.get('/users/:id',
  (req, res, next) => {
    console.log('Handler 1');
    next(); // Pass to next handler
  },
  (req, res, next) => {
    console.log('Handler 2');
    next();
  },
  (req, res) => {
    console.log('Handler 3 - Final');
    res.send('User data');
  }
);

// Array of handlers
const validateUser = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'User ID required' });
  }
  next();
};

const checkAuth = (req, res, next) => {
  // Check authentication
  const isAuthenticated = true; // Your auth logic
  if (!isAuthenticated) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

const getUser = (req, res) => {
  res.json({ userId: req.params.id, name: 'John' });
};

app.get('/users/:id', [validateUser, checkAuth, getUser]);

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="route-chaining" heading="Route Chaining">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Chain route handlers with app.route()
app.route('/users')
  .get((req, res) => {
    res.json({ message: 'Get all users' });
  })
  .post((req, res) => {
    res.json({ message: 'Create user' });
  });

app.route('/users/:id')
  .get((req, res) => {
    res.json({ message: \`Get user \${req.params.id}\` });
  })
  .put((req, res) => {
    res.json({ message: \`Update user \${req.params.id}\` });
  })
  .delete((req, res) => {
    res.json({ message: \`Delete user \${req.params.id}\` });
  });

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="express-router-detailed" heading="Express Router (Detailed)">
        <CodeBlock language="javascript">
{`// routes/products.js
const express = require('express');
const router = express.Router();

// Middleware specific to this router
router.use((req, res, next) => {
  console.log('Products router middleware');
  next();
});

// GET /products
router.get('/', (req, res) => {
  res.json({ products: [] });
});

// GET /products/:id
router.get('/:id', (req, res) => {
  res.json({ product: { id: req.params.id } });
});

// POST /products
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Product created' });
});

// PUT /products/:id
router.put('/:id', (req, res) => {
  res.json({ message: 'Product updated' });
});

// DELETE /products/:id
router.delete('/:id', (req, res) => {
  res.status(204).send();
});

module.exports = router;

// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ users: [] });
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

module.exports = router;

// app.js
const express = require('express');
const app = express();

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

app.use(express.json());

// Mount routers
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

// Now accessible at:
// /api/products
// /api/products/:id
// /api/users
// /api/users/:id

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="nested-routers" heading="Nested Routers">
        <CodeBlock language="javascript">
{`// routes/users.js
const express = require('express');
const router = express.Router();

// Import nested router
const postsRouter = require('./posts');

// User routes
router.get('/', (req, res) => {
  res.json({ users: [] });
});

router.get('/:userId', (req, res) => {
  res.json({ user: { id: req.params.userId } });
});

// Nest posts router under users
router.use('/:userId/posts', postsRouter);

module.exports = router;

// routes/posts.js
const express = require('express');
const router = express.Router({ mergeParams: true }); // Important!

// Now has access to :userId from parent router
router.get('/', (req, res) => {
  const { userId } = req.params;
  res.json({ userId, posts: [] });
});

router.get('/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, post: { id: postId } });
});

module.exports = router;

// app.js
const express = require('express');
const app = express();
const usersRouter = require('./routes/users');

app.use('/api/users', usersRouter);

// Routes now available:
// GET /api/users
// GET /api/users/:userId
// GET /api/users/:userId/posts
// GET /api/users/:userId/posts/:postId

app.listen(3000);`}
        </CodeBlock>

        <Note type="tip">
          <strong>mergeParams: true</strong> required untuk access parent router parameters 
          dalam nested router.
        </Note>
      </Section>

      <Section id="route-organization" heading="Route Organization">
        <CodeBlock language="javascript">
{`// Project structure
/*
project/
├── app.js
├── routes/
│   ├── index.js
│   ├── api/
│   │   ├── index.js
│   │   ├── users.js
│   │   ├── products.js
│   │   └── orders.js
│   └── auth/
│       ├── index.js
│       ├── login.js
│       └── register.js
└── controllers/
    ├── userController.js
    ├── productController.js
    └── orderController.js
*/

// routes/index.js
const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');
const authRoutes = require('./auth');

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

module.exports = router;

// routes/api/index.js
const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const productsRouter = require('./products');
const ordersRouter = require('./orders');

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

module.exports = router;

// routes/api/users.js
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;

// controllers/userController.js
exports.getAll = (req, res) => {
  res.json({ users: [] });
};

exports.getById = (req, res) => {
  res.json({ user: { id: req.params.id } });
};

exports.create = (req, res) => {
  res.status(201).json({ message: 'User created' });
};

exports.update = (req, res) => {
  res.json({ message: 'User updated' });
};

exports.delete = (req, res) => {
  res.status(204).send();
};

// app.js
const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(routes);

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="route-params-validation" heading="Route Parameter Validation">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

// Validate parameter using router.param()
app.param('userId', (req, res, next, id) => {
  // Validate ID format
  if (!/^\\d+$/.test(id)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }
  
  // Check if user exists (simulated)
  const user = { id, name: 'John' }; // Your database logic
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Attach user to request object
  req.user = user;
  next();
});

// Now all routes with :userId will validate first
app.get('/users/:userId', (req, res) => {
  res.json({ user: req.user });
});

app.put('/users/:userId', (req, res) => {
  res.json({ message: 'User updated', user: req.user });
});

app.delete('/users/:userId', (req, res) => {
  res.json({ message: 'User deleted', user: req.user });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="practical-example" heading="Practical Example: Blog API Routes">
        <CodeBlock language="javascript">
{`// routes/blog.js
const express = require('express');
const router = express.Router();

// GET /blog/posts - Get all posts with filtering & pagination
router.get('/posts', (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    category, 
    author, 
    sort = '-createdAt' 
  } = req.query;
  
  res.json({
    posts: [],
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: 0
    },
    filters: { category, author, sort }
  });
});

// GET /blog/posts/:slug - Get single post by slug
router.get('/posts/:slug', (req, res) => {
  const { slug } = req.params;
  res.json({ post: { slug, title: 'Post Title' } });
});

// GET /blog/posts/:postId/comments - Get comments for post
router.get('/posts/:postId/comments', (req, res) => {
  const { postId } = req.params;
  res.json({ comments: [], postId });
});

// POST /blog/posts/:postId/comments - Add comment
router.post('/posts/:postId/comments', (req, res) => {
  const { postId } = req.params;
  const { text, author } = req.body;
  res.status(201).json({ comment: { postId, text, author } });
});

// GET /blog/categories/:category/posts - Get posts by category
router.get('/categories/:category/posts', (req, res) => {
  const { category } = req.params;
  res.json({ category, posts: [] });
});

// GET /blog/authors/:authorId/posts - Get posts by author
router.get('/authors/:authorId/posts', (req, res) => {
  const { authorId } = req.params;
  res.json({ authorId, posts: [] });
});

module.exports = router;

// app.js
const express = require('express');
const app = express();
const blogRouter = require('./routes/blog');

app.use(express.json());
app.use('/blog', blogRouter);

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Use meaningful route names</strong> yang describe resource</li>
          <li><strong>Follow RESTful conventions</strong> untuk consistency</li>
          <li><strong>Organize routes by feature</strong> using routers</li>
          <li><strong>Separate route logic</strong> into controllers</li>
          <li><strong>Validate parameters</strong> early untuk prevent errors</li>
          <li><strong>Use query params</strong> untuk filtering, sorting, pagination</li>
          <li><strong>Use route params</strong> untuk identifying specific resources</li>
          <li><strong>Keep routes DRY</strong> dengan route chaining dan param validation</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Route parameters (<code>:param</code>) untuk dynamic values dalam URL</li>
          <li>Query parameters (<code>?key=value</code>) untuk filtering dan options</li>
          <li>Multiple handlers untuk validation, authentication, then response</li>
          <li>Route chaining dengan <code>app.route()</code> untuk DRY code</li>
          <li>Express Router untuk organize routes dalam separate modules</li>
          <li>Nested routers dengan <code>mergeParams</code> untuk complex routing</li>
          <li><code>router.param()</code> untuk automatic parameter validation</li>
          <li>Separate concerns: routes → controllers → models</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
