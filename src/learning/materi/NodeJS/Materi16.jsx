import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi16() {
  return (
    <MateriLayout title="Mongoose ODM Advanced">
      <Section id="schema-types" heading="Advanced Schema Types">
        <CodeBlock language="javascript">
{`const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // String with validators
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters'],
    uppercase: true // Convert to uppercase
  },
  
  // String with enum
  category: {
    type: String,
    enum: {
      values: ['electronics', 'clothing', 'food'],
      message: '{VALUE} is not a valid category'
    },
    required: true
  },
  
  // Number with validators
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
    max: [1000000, 'Price too high'],
    validate: {
      validator: function(v) {
        return v > 0;
      },
      message: 'Price must be greater than 0'
    }
  },
  
  // Array of strings
  tags: {
    type: [String],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one tag is required'
    }
  },
  
  // Array of objects (subdocuments)
  variants: [{
    size: String,
    color: String,
    stock: {
      type: Number,
      default: 0
    }
  }],
  
  // Nested object
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['cm', 'inch'],
      default: 'cm'
    }
  },
  
  // Mixed type (any type)
  metadata: mongoose.Schema.Types.Mixed,
  
  // ObjectId reference
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Date with default
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true // Cannot be changed
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  // Boolean
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Custom getter/setter
  discountPercentage: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
}, {
  // Schema options
  timestamps: true, // Auto add createdAt & updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Product = mongoose.model('Product', productSchema);`}
        </CodeBlock>
      </Section>

      <Section id="virtuals" heading="Virtual Properties">
        <CodeBlock language="javascript">
{`const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

// Virtual getter
userSchema.virtual('fullName').get(function() {
  return \`\${this.firstName} \${this.lastName}\`;
});

// Virtual setter
userSchema.virtual('fullName').set(function(name) {
  const parts = name.split(' ');
  this.firstName = parts[0];
  this.lastName = parts[1];
});

// Virtual populate (references)
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author'
});

const User = mongoose.model('User', userSchema);

// Usage
const user = new User({
  firstName: 'John',
  lastName: 'Doe'
});

console.log(user.fullName); // "John Doe"

user.fullName = 'Jane Smith';
console.log(user.firstName); // "Jane"
console.log(user.lastName); // "Smith"

// Virtual populate
const userWithPosts = await User.findById(userId)
  .populate('posts');`}
        </CodeBlock>
      </Section>

      <Section id="middleware" heading="Mongoose Middleware (Hooks)">
        <CodeBlock language="javascript">
{`const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isActive: { type: Boolean, default: true }
});

// PRE HOOKS
// Pre-save (runs before saving document)
userSchema.pre('save', async function(next) {
  console.log('Pre-save hook');
  
  // Only hash if password is modified
  if (!this.isModified('password')) return next();
  
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-validate
userSchema.pre('validate', function(next) {
  console.log('Pre-validate hook');
  
  // Custom validation logic
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  
  next();
});

// Pre-remove
userSchema.pre('remove', async function(next) {
  console.log('Pre-remove hook - cleaning up');
  
  // Delete related data
  await Post.deleteMany({ author: this._id });
  next();
});

// Pre-find (query middleware)
userSchema.pre(/^find/, function(next) {
  // Only find active users by default
  this.where({ isActive: true });
  next();
});

// POST HOOKS
// Post-save
userSchema.post('save', function(doc, next) {
  console.log('User saved:', doc.name);
  
  // Send welcome email
  // sendWelcomeEmail(doc.email);
  
  next();
});

// Post-remove
userSchema.post('remove', function(doc, next) {
  console.log('User removed:', doc.name);
  next();
});

// Error handling middleware
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Email already exists'));
  } else {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

// Usage
const user = new User({
  name: 'John',
  email: 'JOHN@EXAMPLE.COM',
  password: 'password123'
});

await user.save(); 
// 1. Pre-validate → email lowercased
// 2. Pre-save → password hashed
// 3. Post-save → log & email sent`}
        </CodeBlock>
      </Section>

      <Section id="instance-methods" heading="Instance & Static Methods">
        <CodeBlock language="javascript">
{`const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date
});

// INSTANCE METHODS (called on document instances)
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.incrementLoginAttempts = function() {
  // Lock account after 5 attempts
  if (this.loginAttempts + 1 >= 5 && !this.lockUntil) {
    this.lockUntil = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
  }
  this.loginAttempts += 1;
  return this.save();
};

userSchema.methods.resetLoginAttempts = function() {
  this.loginAttempts = 0;
  this.lockUntil = undefined;
  return this.save();
};

userSchema.methods.isLocked = function() {
  return this.lockUntil && this.lockUntil > Date.now();
};

userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email
  };
};

// STATIC METHODS (called on Model)
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

userSchema.statics.search = function(query) {
  return this.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ]
  });
};

// QUERY HELPERS
userSchema.query.byEmail = function(email) {
  return this.where({ email: email.toLowerCase() });
};

userSchema.query.active = function() {
  return this.where({ isActive: true });
};

const User = mongoose.model('User', userSchema);

// Usage of instance methods
const user = await User.findById(userId);
const isMatch = await user.comparePassword('password123');
const profile = user.getPublicProfile();

if (user.isLocked()) {
  throw new Error('Account is locked');
}

// Usage of static methods
const userByEmail = await User.findByEmail('john@example.com');
const activeUsers = await User.findActive();
const searchResults = await User.search('john');

// Usage of query helpers
const users = await User.find()
  .byEmail('john@example.com')
  .active();`}
        </CodeBlock>
      </Section>

      <Section id="plugins" heading="Mongoose Plugins">
        <CodeBlock language="javascript">
{`// Create reusable plugin
function timestampPlugin(schema, options) {
  schema.add({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  schema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
}

// Slug plugin
function slugPlugin(schema, options) {
  const field = options?.field || 'title';
  
  schema.add({
    slug: { type: String, unique: true, index: true }
  });
  
  schema.pre('save', function(next) {
    if (this.isModified(field)) {
      this.slug = this[field]
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    next();
  });
}

// Pagination plugin
function paginationPlugin(schema) {
  schema.statics.paginate = async function(query = {}, options = {}) {
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const skip = (page - 1) * limit;
    
    const [results, total] = await Promise.all([
      this.find(query).skip(skip).limit(limit),
      this.countDocuments(query)
    ]);
    
    return {
      results,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    };
  };
}

// Use plugins
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

postSchema.plugin(timestampPlugin);
postSchema.plugin(slugPlugin, { field: 'title' });
postSchema.plugin(paginationPlugin);

const Post = mongoose.model('Post', postSchema);

// Usage
const post = new Post({
  title: 'My First Post',
  content: 'Content here...'
});

await post.save();
console.log(post.slug); // "my-first-post"
console.log(post.createdAt);

const { results, pagination } = await Post.paginate(
  { isPublished: true },
  { page: 1, limit: 10 }
);

// Popular third-party plugins
// npm install mongoose-paginate-v2
// npm install mongoose-unique-validator
// npm install mongoose-slug-generator`}
        </CodeBlock>
      </Section>

      <Section id="transactions" heading="Transactions">
        <CodeBlock language="javascript">
{`const mongoose = require('mongoose');

// Transactions require replica set
async function transferMoney(fromUserId, toUserId, amount) {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // Deduct from sender
    const sender = await User.findById(fromUserId).session(session);
    if (sender.balance < amount) {
      throw new Error('Insufficient balance');
    }
    sender.balance -= amount;
    await sender.save({ session });
    
    // Add to receiver
    const receiver = await User.findById(toUserId).session(session);
    receiver.balance += amount;
    await receiver.save({ session });
    
    // Commit transaction
    await session.commitTransaction();
    console.log('Transaction successful');
    
  } catch (error) {
    // Rollback on error
    await session.abortTransaction();
    console.error('Transaction failed:', error.message);
    throw error;
    
  } finally {
    session.endSession();
  }
}

// Alternative: with callback
async function withTransactionCallback() {
  const session = await mongoose.startSession();
  
  await session.withTransaction(async () => {
    // All operations here are in transaction
    const user = await User.findById(userId).session(session);
    user.balance += 100;
    await user.save({ session });
    
    const post = new Post({ title: 'New Post', author: userId });
    await post.save({ session });
  });
  
  session.endSession();
}`}
        </CodeBlock>
      </Section>

      <Section id="indexes" heading="Indexes">
        <CodeBlock language="javascript">
{`const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,    // Creates unique index
    index: true      // Creates regular index
  },
  name: {
    type: String,
    index: true
  },
  age: Number,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere' // Geospatial index
    }
  }
});

// Compound index
userSchema.index({ name: 1, age: -1 }); // 1 = ascending, -1 = descending

// Text index for full-text search
userSchema.index({ name: 'text', bio: 'text' });

// Sparse index (only documents with field)
userSchema.index({ phone: 1 }, { sparse: true });

// TTL index (auto-delete after time)
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const User = mongoose.model('User', userSchema);

// Ensure indexes are created
User.createIndexes();

// Text search
const results = await User.find({ $text: { $search: 'john developer' } });

// Geospatial query
const nearby = await User.find({
  location: {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      $maxDistance: 5000 // 5km
    }
  }
});`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Use virtuals</strong> untuk computed properties</li>
          <li><strong>Implement middleware</strong> untuk business logic</li>
          <li><strong>Create custom methods</strong> untuk reusable functionality</li>
          <li><strong>Use plugins</strong> untuk common functionality</li>
          <li><strong>Index frequently queried fields</strong> untuk performance</li>
          <li><strong>Use transactions</strong> untuk atomic operations</li>
          <li><strong>Validate at schema level</strong> untuk data integrity</li>
          <li><strong>Use lean()</strong> untuk read-only operations (faster)</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Advanced schema types dengan validators, enums, nested objects</li>
          <li>Virtual properties untuk computed fields tanpa storage</li>
          <li>Middleware (hooks) untuk pre/post operations</li>
          <li>Instance methods untuk document-specific operations</li>
          <li>Static methods untuk model-level operations</li>
          <li>Plugins untuk reusable functionality across schemas</li>
          <li>Transactions untuk atomic multi-document operations</li>
          <li>Indexes untuk query optimization dan constraints</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
