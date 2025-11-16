import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi11() {
  return (
    <MateriLayout title="Template Engines (EJS, Pug)">
      <Section id="what-is-template-engine" heading="What is a Template Engine?">
        <p>
          Template engine memungkinkan kita menggunakan static template files dalam aplikasi. 
          Pada runtime, template engine mengganti variables dalam template file dengan actual values, 
          dan transforms template menjadi HTML file yang dikirim ke client.
        </p>
        
        <Note type="info">
          <strong>Popular Template Engines:</strong> EJS, Pug (Jade), Handlebars, Mustache, Nunjucks
        </Note>
      </Section>

      <Section id="ejs-setup" heading="EJS (Embedded JavaScript)">
        <CodeBlock language="bash">
{`npm install ejs`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`// app.js
const express = require('express');
const app = express();

// Set EJS as template engine
app.set('view engine', 'ejs');

// Set views directory (default is ./views)
app.set('views', './views');

// Route
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Home Page',
    user: { name: 'John', age: 25 }
  });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="ejs-syntax" heading="EJS Syntax">
        <CodeBlock language="html">
{`<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <!-- Output (escaped) -->
  <h1><%= title %></h1>
  <p>Welcome, <%= user.name %>!</p>
  
  <!-- Output (unescaped - dangerous!) -->
  <div><%- htmlContent %></div>
  
  <!-- JavaScript code -->
  <% const greeting = 'Hello World'; %>
  <p><%= greeting %></p>
  
  <!-- Conditionals -->
  <% if (user.age >= 18) { %>
    <p>You are an adult</p>
  <% } else { %>
    <p>You are a minor</p>
  <% } %>
  
  <!-- Loops -->
  <ul>
    <% for (let i = 0; i < 5; i++) { %>
      <li>Item <%= i %></li>
    <% } %>
  </ul>
  
  <!-- Array iteration -->
  <% const fruits = ['Apple', 'Banana', 'Orange']; %>
  <ul>
    <% fruits.forEach(fruit => { %>
      <li><%= fruit %></li>
    <% }); %>
  </ul>
</body>
</html>`}
        </CodeBlock>

        <Note type="warning">
          <strong>&lt;%= %&gt;</strong> escapes HTML (safe), <strong>&lt;%- %&gt;</strong> does NOT escape (dangerous for user input)
        </Note>
      </Section>

      <Section id="ejs-partials" heading="EJS Partials & Includes">
        <CodeBlock language="html">
{`<!-- views/partials/header.ejs -->
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</header>

<!-- views/partials/footer.ejs -->
<footer>
  <p>&copy; 2024 My Website</p>
</footer>

<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <!-- Include header -->
  <%- include('partials/header') %>
  
  <main>
    <h1><%= title %></h1>
    <p><%= content %></p>
  </main>
  
  <!-- Include footer -->
  <%- include('partials/footer') %>
</body>
</html>

<!-- Include with data -->
<%- include('partials/user-card', { user: currentUser }) %>`}
        </CodeBlock>
      </Section>

      <Section id="ejs-practical" heading="EJS Practical Example">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Mock data
const products = [
  { id: 1, name: 'Laptop', price: 1000, image: 'laptop.jpg' },
  { id: 2, name: 'Phone', price: 500, image: 'phone.jpg' },
  { id: 3, name: 'Tablet', price: 300, image: 'tablet.jpg' }
];

// Home page
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Welcome to Our Store',
    featured: products.slice(0, 2)
  });
});

// Products page
app.get('/products', (req, res) => {
  res.render('products', {
    title: 'All Products',
    products
  });
});

// Product detail page
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).render('404', { 
      title: 'Product Not Found' 
    });
  }
  
  res.render('product-detail', {
    title: product.name,
    product
  });
});

app.listen(3000);`}
        </CodeBlock>

        <CodeBlock language="html">
{`<!-- views/products.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <%- include('partials/header') %>
  
  <main>
    <h1><%= title %></h1>
    
    <% if (products.length === 0) { %>
      <p>No products available</p>
    <% } else { %>
      <div class="products-grid">
        <% products.forEach(product => { %>
          <div class="product-card">
            <img src="/images/<%= product.image %>" alt="<%= product.name %>">
            <h3><%= product.name %></h3>
            <p class="price">$<%= product.price %></p>
            <a href="/products/<%= product.id %>">View Details</a>
          </div>
        <% }); %>
      </div>
    <% } %>
  </main>
  
  <%- include('partials/footer') %>
</body>
</html>`}
        </CodeBlock>
      </Section>

      <Section id="pug-setup" heading="Pug (formerly Jade)">
        <CodeBlock language="bash">
{`npm install pug`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`// app.js
const express = require('express');
const app = express();

// Set Pug as template engine
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home Page',
    message: 'Welcome to Pug!'
  });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="pug-syntax" heading="Pug Syntax">
        <CodeBlock language="pug">
{`//- views/index.pug
doctype html
html
  head
    title= title
  body
    //- Heading
    h1= title
    
    //- Paragraph
    p= message
    
    //- Attributes
    a(href='/' class='btn btn-primary') Home
    img(src='image.jpg' alt='Image')
    
    //- ID and classes shorthand
    div#container
    div.card.shadow
    button#submit-btn.btn.btn-success Submit
    
    //- Interpolation
    p Welcome, #{user.name}!
    
    //- Conditionals
    if user.isAdmin
      p You are an admin
    else if user.isModerator
      p You are a moderator
    else
      p You are a regular user
    
    //- Loops
    ul
      each item in items
        li= item
    
    //- Loop with index
    ul
      each item, index in items
        li #{index + 1}. #{item}
    
    //- Loop empty check
    ul
      each user in users
        li= user.name
      else
        li No users found`}
        </CodeBlock>
      </Section>

      <Section id="pug-advanced" heading="Pug Advanced Features">
        <CodeBlock language="pug">
{`//- views/layout.pug
doctype html
html
  head
    title= title
    block styles
      link(rel='stylesheet' href='/css/style.css')
  body
    include partials/header
    
    block content
    
    include partials/footer
    
    block scripts
      script(src='/js/main.js')

//- views/home.pug
extends layout

block content
  main
    h1 Welcome
    p This is the home page

//- views/about.pug
extends layout

block append styles
  link(rel='stylesheet' href='/css/about.css')

block content
  main
    h1 About Us
    p Learn more about our company

//- Mixins (reusable components)
mixin user-card(user)
  .card
    img(src=user.avatar alt=user.name)
    h3= user.name
    p= user.email

//- Use mixin
each user in users
  +user-card(user)

//- Mixin with default values
mixin button(text, type='button', className='btn')
  button(type=type class=className)= text

+button('Submit', 'submit', 'btn btn-primary')
+button('Cancel')

//- Case/When (switch statement)
case status
  when 'active'
    p.text-success Active
  when 'pending'
    p.text-warning Pending
  when 'inactive'
    p.text-danger Inactive
  default
    p.text-muted Unknown`}
        </CodeBlock>
      </Section>

      <Section id="comparison" heading="EJS vs Pug Comparison">
        <CodeBlock language="html">
{`<!-- EJS -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1><%= title %></h1>
  <% if (user.isAdmin) { %>
    <p>Admin Panel</p>
  <% } %>
  <ul>
    <% items.forEach(item => { %>
      <li><%= item.name %></li>
    <% }); %>
  </ul>
</body>
</html>`}
        </CodeBlock>

        <CodeBlock language="pug">
{`//- Pug
doctype html
html
  head
    title= title
  body
    h1= title
    if user.isAdmin
      p Admin Panel
    ul
      each item in items
        li= item.name`}
        </CodeBlock>

        <Note type="tip">
          <strong>EJS:</strong> HTML-like, easier for beginners<br/>
          <strong>Pug:</strong> More concise, whitespace-sensitive, steeper learning curve
        </Note>
      </Section>

      <Section id="handlebars" heading="Handlebars (Bonus)">
        <CodeBlock language="bash">
{`npm install express-handlebars`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

// Setup Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    users: [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 }
    ]
  });
});

app.listen(3000);`}
        </CodeBlock>

        <CodeBlock language="handlebars">
{`<!-- views/home.handlebars -->
<!DOCTYPE html>
<html>
<head>
  <title>{{title}}</title>
</head>
<body>
  <h1>{{title}}</h1>
  
  <!-- If/else -->
  {{#if users.length}}
    <ul>
      {{#each users}}
        <li>{{name}} - {{age}} years old</li>
      {{/each}}
    </ul>
  {{else}}
    <p>No users found</p>
  {{/if}}
  
  <!-- Partials -->
  {{> header}}
  {{> footer}}
</body>
</html>`}
        </CodeBlock>
      </Section>

      <Section id="practical-full-example" heading="Complete Example: Blog with EJS">
        <CodeBlock language="javascript">
{`const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Mock data
const posts = [
  { 
    id: 1, 
    title: 'First Post', 
    content: 'This is the first post',
    author: 'John',
    date: new Date('2024-01-01'),
    comments: [
      { user: 'Jane', text: 'Great post!' }
    ]
  }
];

// Home - list posts
app.get('/', (req, res) => {
  res.render('index', {
    title: 'My Blog',
    posts
  });
});

// Single post
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  
  if (!post) {
    return res.status(404).render('404', { title: 'Post Not Found' });
  }
  
  res.render('post', {
    title: post.title,
    post
  });
});

// Create post form
app.get('/posts/new', (req, res) => {
  res.render('new-post', { title: 'Create Post' });
});

// Handle post creation
app.post('/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: 'Admin',
    date: new Date(),
    comments: []
  };
  
  posts.push(newPost);
  res.redirect('/');
});

app.listen(3000);`}
        </CodeBlock>

        <CodeBlock language="html">
{`<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <%- include('partials/header', { title }) %>
  
  <main class="container">
    <div class="posts">
      <% if (posts.length === 0) { %>
        <p>No posts yet. <a href="/posts/new">Create one!</a></p>
      <% } else { %>
        <% posts.forEach(post => { %>
          <article class="post-card">
            <h2><a href="/posts/<%= post.id %>"><%= post.title %></a></h2>
            <p class="meta">
              By <%= post.author %> on 
              <%= post.date.toLocaleDateString() %>
            </p>
            <p><%= post.content.substring(0, 150) %>...</p>
            <a href="/posts/<%= post.id %>">Read more</a>
          </article>
        <% }); %>
      <% } %>
    </div>
  </main>
  
  <%- include('partials/footer') %>
</body>
</html>

<!-- views/post.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <%- include('partials/header', { title }) %>
  
  <main class="container">
    <article>
      <h1><%= post.title %></h1>
      <p class="meta">
        By <%= post.author %> on 
        <%= post.date.toLocaleDateString() %>
      </p>
      <div class="content">
        <%= post.content %>
      </div>
      
      <section class="comments">
        <h2>Comments (<%= post.comments.length %>)</h2>
        <% if (post.comments.length === 0) { %>
          <p>No comments yet.</p>
        <% } else { %>
          <% post.comments.forEach(comment => { %>
            <div class="comment">
              <strong><%= comment.user %></strong>
              <p><%= comment.text %></p>
            </div>
          <% }); %>
        <% } %>
      </section>
    </article>
  </main>
  
  <%- include('partials/footer') %>
</body>
</html>`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Escape user input</strong> dengan &lt;%= %&gt; (EJS) untuk prevent XSS</li>
          <li><strong>Use partials/includes</strong> untuk reusable components</li>
          <li><strong>Keep logic minimal</strong> dalam templates - logic belongs in routes/controllers</li>
          <li><strong>Use layouts</strong> untuk consistent page structure</li>
          <li><strong>Cache compiled templates</strong> in production</li>
          <li><strong>Separate concerns</strong> - templates untuk presentation only</li>
          <li><strong>Use mixins/helpers</strong> untuk reusable template logic</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Template engines generate HTML dinamically dengan data dari server</li>
          <li>EJS: HTML-like syntax, easy to learn, &lt;%= %&gt; untuk output</li>
          <li>Pug: Minimal whitespace-based syntax, lebih concise</li>
          <li>Use includes/partials untuk reusable components</li>
          <li>Layouts untuk consistent page structure</li>
          <li>Always escape user input untuk prevent XSS attacks</li>
          <li>Choose EJS untuk familiarity atau Pug untuk conciseness</li>
          <li>Modern alternative: Use React/Vue untuk frontend + API backend</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
