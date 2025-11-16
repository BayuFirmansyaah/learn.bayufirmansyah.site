import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi15() {
  return (
    <MateriLayout title="MongoDB & Database Integration">
      <Section id="what-is-mongodb" heading="What is MongoDB?">
        <p>
          MongoDB adalah NoSQL database yang stores data dalam flexible, JSON-like documents. 
          MongoDB adalah document-oriented database yang sangat cocok untuk Node.js applications.
        </p>
        
        <ul>
          <li><strong>Document-based:</strong> Data stored as BSON documents (similar to JSON)</li>
          <li><strong>Schema-less:</strong> Flexible structure, no fixed schema required</li>
          <li><strong>Scalable:</strong> Easy horizontal scaling</li>
          <li><strong>High Performance:</strong> Fast read/write operations</li>
        </ul>

        <Note type="info">
          <strong>MongoDB Concepts:</strong>
          <ul>
            <li>Database → Collection → Document</li>
            <li>Similar to: Database → Table → Row (SQL)</li>
          </ul>
        </Note>
      </Section>

      <Section id="installation" heading="MongoDB Installation">
        <CodeBlock language="bash">
{`# Install MongoDB driver
npm install mongodb

# Or install Mongoose (ODM - Object Document Mapper)
npm install mongoose

# Install MongoDB locally (macOS)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Or use MongoDB Atlas (Cloud)
# https://www.mongodb.com/cloud/atlas`}
        </CodeBlock>
      </Section>

      <Section id="native-driver" heading="Native MongoDB Driver">
        <CodeBlock language="javascript">
{`const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');
    
    // Get database and collection
    const database = client.db('myapp');
    const users = database.collection('users');
    
    // Insert document
    const result = await users.insertOne({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      createdAt: new Date()
    });
    console.log('Inserted document:', result.insertedId);
    
    // Find documents
    const allUsers = await users.find({}).toArray();
    console.log('All users:', allUsers);
    
    // Find one document
    const user = await users.findOne({ email: 'john@example.com' });
    console.log('User:', user);
    
    // Update document
    await users.updateOne(
      { email: 'john@example.com' },
      { $set: { age: 31 } }
    );
    
    // Delete document
    await users.deleteOne({ email: 'john@example.com' });
    
  } finally {
    await client.close();
  }
}

connectToDatabase().catch(console.error);`}
        </CodeBlock>
      </Section>

      <Section id="mongoose" heading="Mongoose ODM">
        <CodeBlock language="javascript">
{`const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB with Mongoose');
});

// Define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\\S+@\\S+\\.\\S+$/, 'Please provide valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;`}
        </CodeBlock>
      </Section>

      <Section id="crud-operations" heading="CRUD Operations with Mongoose">
        <CodeBlock language="javascript">
{`const User = require('./models/User');

// CREATE
async function createUser() {
  try {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      age: 30
    });
    
    await user.save();
    console.log('User created:', user);
    
    // Alternative: create()
    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123'
    });
    
    // Insert many
    await User.insertMany([
      { name: 'User 1', email: 'user1@example.com', password: 'pass123' },
      { name: 'User 2', email: 'user2@example.com', password: 'pass123' }
    ]);
    
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
}

// READ
async function readUsers() {
  // Find all
  const users = await User.find();
  
  // Find with conditions
  const activeUsers = await User.find({ isActive: true });
  
  // Find one
  const user = await User.findOne({ email: 'john@example.com' });
  
  // Find by ID
  const userById = await User.findById('507f1f77bcf86cd799439011');
  
  // Find with select (specific fields)
  const usersNameEmail = await User.find().select('name email -_id');
  
  // Find with limit and skip (pagination)
  const page = 1;
  const limit = 10;
  const paginatedUsers = await User.find()
    .limit(limit)
    .skip((page - 1) * limit);
  
  // Find with sort
  const sortedUsers = await User.find().sort({ createdAt: -1 }); // Descending
  
  // Count documents
  const count = await User.countDocuments({ isActive: true });
}

// UPDATE
async function updateUser() {
  // Update one
  const result = await User.updateOne(
    { email: 'john@example.com' },
    { $set: { age: 31, updatedAt: new Date() } }
  );
  
  // Update many
  await User.updateMany(
    { isActive: false },
    { $set: { isActive: true } }
  );
  
  // Find and update (returns updated document)
  const user = await User.findOneAndUpdate(
    { email: 'john@example.com' },
    { $set: { age: 32 } },
    { new: true } // Return updated document
  );
  
  // Find by ID and update
  const updatedUser = await User.findByIdAndUpdate(
    '507f1f77bcf86cd799439011',
    { $set: { name: 'John Updated' } },
    { new: true }
  );
}

// DELETE
async function deleteUser() {
  // Delete one
  await User.deleteOne({ email: 'john@example.com' });
  
  // Delete many
  await User.deleteMany({ isActive: false });
  
  // Find and delete (returns deleted document)
  const deleted = await User.findOneAndDelete({ email: 'john@example.com' });
  
  // Find by ID and delete
  await User.findByIdAndDelete('507f1f77bcf86cd799439011');
}`}
        </CodeBlock>
      </Section>

      <Section id="query-operators" heading="Query Operators">
        <CodeBlock language="javascript">
{`// Comparison operators
await User.find({ age: { $gt: 18 } });        // Greater than
await User.find({ age: { $gte: 18 } });       // Greater than or equal
await User.find({ age: { $lt: 65 } });        // Less than
await User.find({ age: { $lte: 65 } });       // Less than or equal
await User.find({ age: { $ne: 30 } });        // Not equal
await User.find({ age: { $in: [25, 30, 35] } }); // In array
await User.find({ age: { $nin: [25, 30] } }); // Not in array

// Logical operators
await User.find({ 
  $and: [
    { age: { $gte: 18 } },
    { isActive: true }
  ]
});

await User.find({ 
  $or: [
    { role: 'admin' },
    { role: 'moderator' }
  ]
});

await User.find({ 
  age: { $not: { $lt: 18 } }
});

// Element operators
await User.find({ email: { $exists: true } });
await User.find({ age: { $type: 'number' } });

// Array operators
await User.find({ 
  tags: { $all: ['nodejs', 'express'] }
});
await User.find({ 
  tags: { $size: 3 }
});

// String search (regex)
await User.find({ 
  name: { $regex: 'john', $options: 'i' } // Case-insensitive
});`}
        </CodeBlock>
      </Section>

      <Section id="schema-methods" heading="Schema Methods & Virtuals">
        <CodeBlock language="javascript">
{`const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String
});

// Instance methods
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email
  };
};

// Static methods
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

userSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

// Virtual properties
userSchema.virtual('fullName').get(function() {
  return \`\${this.firstName} \${this.lastName}\`;
});

userSchema.virtual('fullName').set(function(name) {
  const parts = name.split(' ');
  this.firstName = parts[0];
  this.lastName = parts[1];
});

// Middleware (hooks)
// Pre-save hook
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Post-save hook
userSchema.post('save', function(doc, next) {
  console.log('User saved:', doc.name);
  next();
});

// Pre-remove hook
userSchema.pre('remove', function(next) {
  console.log('Removing user:', this.name);
  // Cleanup related data
  next();
});

const User = mongoose.model('User', userSchema);

// Usage
const user = new User({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123'
});

await user.save(); // Password will be hashed

console.log(user.fullName); // "John Doe"

const isMatch = await user.comparePassword('password123');
const profile = user.getPublicProfile();

const foundUser = await User.findByEmail('john@example.com');
const activeUsers = await User.findActive();`}
        </CodeBlock>
      </Section>

      <Section id="relationships" heading="Relationships in MongoDB">
        <CodeBlock language="javascript">
{`// One-to-Many: Embedding
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema);

// Create post with embedded comments
const post = new Post({
  title: 'My First Post',
  content: 'Content here...',
  author: userId,
  comments: [
    { user: userId, text: 'Great post!' }
  ],
  tags: ['nodejs', 'express']
});

await post.save();

// Populate (join)
const postWithAuthor = await Post.findById(postId)
  .populate('author', 'name email')
  .populate('comments.user', 'name');

console.log(postWithAuthor.author.name);

// One-to-Many: Referencing
const userSchema = new mongoose.Schema({
  name: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

// Many-to-Many
const studentSchema = new mongoose.Schema({
  name: String,
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

const courseSchema = new mongoose.Schema({
  title: String,
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});`}
        </CodeBlock>
      </Section>

      <Section id="express-integration" heading="Express + MongoDB Integration">
        <CodeBlock language="javascript">
{`// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

// controllers/userController.js
const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        error: 'Email already exists' 
      });
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;

// app.js
const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/users');

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`}
        </CodeBlock>
      </Section>

      <Section id="aggregation" heading="Aggregation Pipeline">
        <CodeBlock language="javascript">
{`// Aggregation for complex queries
const User = require('./models/User');

// Group by role and count
const roleCounts = await User.aggregate([
  {
    $group: {
      _id: '$role',
      count: { $sum: 1 },
      avgAge: { $avg: '$age' }
    }
  }
]);

// Match, group, and sort
const stats = await User.aggregate([
  { $match: { isActive: true } },
  {
    $group: {
      _id: '$role',
      count: { $sum: 1 },
      totalAge: { $sum: '$age' }
    }
  },
  { $sort: { count: -1 } }
]);

// Lookup (join)
const postsWithAuthors = await Post.aggregate([
  {
    $lookup: {
      from: 'users',
      localField: 'author',
      foreignField: '_id',
      as: 'authorInfo'
    }
  },
  { $unwind: '$authorInfo' },
  {
    $project: {
      title: 1,
      content: 1,
      'authorInfo.name': 1,
      'authorInfo.email': 1
    }
  }
]);`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Use Mongoose</strong> untuk schema validation dan better DX</li>
          <li><strong>Index important fields</strong> untuk better query performance</li>
          <li><strong>Use select()</strong> untuk only fetch needed fields</li>
          <li><strong>Implement pagination</strong> untuk large datasets</li>
          <li><strong>Handle validation errors</strong> properly</li>
          <li><strong>Use transactions</strong> untuk atomic operations</li>
          <li><strong>Connection pooling</strong> already handled by MongoDB driver</li>
          <li><strong>Use environment variables</strong> untuk database URLs</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>MongoDB adalah NoSQL document database, perfect untuk Node.js</li>
          <li>Mongoose provides schema, validation, dan better developer experience</li>
          <li>CRUD operations: create(), find(), updateOne(), deleteOne()</li>
          <li>Query operators: $gt, $lt, $in, $regex untuk complex queries</li>
          <li>Schema methods, virtuals, dan middleware untuk business logic</li>
          <li>Relationships: embedding vs referencing, populate() untuk joins</li>
          <li>Aggregation pipeline untuk complex data analysis</li>
          <li>Integration dengan Express untuk full-stack applications</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
