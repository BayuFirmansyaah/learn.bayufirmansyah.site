import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi17() {
  return (
    <MateriLayout title="Authentication & JWT">
      <Section id="authentication-basics" heading="Authentication vs Authorization">
        <ul>
          <li><strong>Authentication:</strong> Verifying WHO you are (login)</li>
          <li><strong>Authorization:</strong> Verifying WHAT you can access (permissions)</li>
        </ul>
        
        <Note type="info">
          <strong>Common Auth Methods:</strong>
          <ul>
            <li>Session-based (cookies)</li>
            <li>Token-based (JWT)</li>
            <li>OAuth (Google, Facebook login)</li>
            <li>API Keys</li>
          </ul>
        </Note>
      </Section>

      <Section id="jwt-intro" heading="JSON Web Tokens (JWT)">
        <p>
          JWT adalah compact, URL-safe token yang contains encoded JSON object. 
          JWT consists of 3 parts: Header, Payload, Signature.
        </p>
        
        <CodeBlock language="bash">
{`npm install jsonwebtoken bcrypt`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const jwt = require('jsonwebtoken');

// JWT Structure: xxxxx.yyyyy.zzzzz
// Header.Payload.Signature

// Create token
const payload = {
  userId: 123,
  email: 'user@example.com',
  role: 'user'
};

const secret = 'your-secret-key'; // Store in .env
const options = {
  expiresIn: '24h' // Token expires in 24 hours
};

const token = jwt.sign(payload, secret, options);
console.log(token);

// Verify token
try {
  const decoded = jwt.verify(token, secret);
  console.log(decoded);
  // { userId: 123, email: '...', role: 'user', iat: ..., exp: ... }
} catch (error) {
  console.error('Invalid token:', error.message);
}

// Decode without verification (unsafe!)
const decoded = jwt.decode(token);`}
        </CodeBlock>
      </Section>

      <Section id="password-hashing" heading="Password Hashing with Bcrypt">
        <CodeBlock language="javascript">
{`const bcrypt = require('bcrypt');

// Hash password
async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

// Compare password
async function comparePassword(password, hash) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

// Usage
const password = 'myPassword123';
const hash = await hashPassword(password);
console.log('Hash:', hash);

const isValid = await comparePassword('myPassword123', hash);
console.log('Valid:', isValid); // true

const isInvalid = await comparePassword('wrongPassword', hash);
console.log('Invalid:', isInvalid); // false`}
        </CodeBlock>

        <Note type="warning">
          <strong>NEVER store passwords in plain text!</strong> Always hash passwords before storing.
        </Note>
      </Section>

      <Section id="user-model" heading="User Model with Authentication">
        <CodeBlock language="javascript">
{`// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\\S+@\\S+\\.\\S+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Don't include in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  refreshToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
  const jwt = require('jsonwebtoken');
  
  return jwt.sign(
    { 
      id: this._id,
      email: this.email,
      role: this.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '24h' }
  );
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function() {
  const jwt = require('jsonwebtoken');
  
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  
  this.refreshToken = refreshToken;
  return refreshToken;
};

module.exports = mongoose.model('User', userSchema);`}
        </CodeBlock>
      </Section>

      <Section id="auth-controller" heading="Authentication Controller">
        <CodeBlock language="javascript">
{`// controllers/authController.js
const User = require('../models/User');

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Email already registered'
      });
    }
    
    // Create user
    const user = await User.create({ name, email, password });
    
    // Generate tokens
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    await user.save();
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        accessToken,
        refreshToken
      }
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }
    
    // Find user (include password field)
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Generate tokens
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    await user.save();
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        accessToken,
        refreshToken
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get current user
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Refresh access token
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: 'Refresh token required'
      });
    }
    
    // Verify refresh token
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Find user
    const user = await User.findOne({
      _id: decoded.id,
      refreshToken
    });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid refresh token'
      });
    }
    
    // Generate new access token
    const accessToken = user.generateAuthToken();
    
    res.json({
      success: true,
      data: { accessToken }
    });
    
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid refresh token'
    });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.refreshToken = undefined;
    await user.save();
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};`}
        </CodeBlock>
      </Section>

      <Section id="auth-middleware" heading="Authentication Middleware">
        <CodeBlock language="javascript">
{`// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - require authentication
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Get token from header
    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User no longer exists'
      });
    }
    
    // Add user to request
    req.user = user;
    next();
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};

// Authorize specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: \`User role '\${req.user.role}' is not authorized to access this route\`
      });
    }
    next();
  };
};`}
        </CodeBlock>
      </Section>

      <Section id="protected-routes" heading="Protected Routes">
        <CodeBlock language="javascript">
{`// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.get('/me', protect, authController.me);
router.post('/logout', protect, authController.logout);

module.exports = router;

// routes/users.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const userController = require('../controllers/userController');

// All routes require authentication
router.use(protect);

// Regular users can access
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

// Only admin can access
router.get('/', authorize('admin'), userController.getAllUsers);
router.delete('/:id', authorize('admin'), userController.deleteUser);

module.exports = router;

// app.js
const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="password-reset" heading="Password Reset Flow">
        <CodeBlock language="javascript">
{`const crypto = require('crypto');

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  // Hash and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  // Set expire (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
  return resetToken;
};

// Forgot password controller
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'No user with that email'
      });
    }
    
    // Generate reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save();
    
    // Create reset URL
    const resetUrl = \`\${req.protocol}://\${req.get('host')}/api/auth/reset-password/\${resetToken}\`;
    
    // Send email (pseudo-code)
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Password Reset',
    //   html: \`Click here to reset: \${resetUrl}\`
    // });
    
    res.json({
      success: true,
      message: 'Password reset email sent',
      resetToken // Remove in production!
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Reset password controller
exports.resetPassword = async (req, res) => {
  try {
    // Hash token from URL
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    
    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }
    
    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    
    // Generate new tokens
    const accessToken = user.generateAuthToken();
    
    res.json({
      success: true,
      message: 'Password reset successful',
      data: { accessToken }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Security Best Practices">
        <ul>
          <li><strong>Store JWT secret</strong> in environment variables</li>
          <li><strong>Use HTTPS</strong> in production untuk secure transmission</li>
          <li><strong>Set short expiration</strong> untuk access tokens (15min - 1h)</li>
          <li><strong>Use refresh tokens</strong> untuk long-term authentication</li>
          <li><strong>Hash passwords</strong> dengan bcrypt (salt rounds ≥ 10)</li>
          <li><strong>Validate input</strong> untuk prevent injection attacks</li>
          <li><strong>Implement rate limiting</strong> untuk login attempts</li>
          <li><strong>Never expose sensitive data</strong> dalam JWT payload</li>
          <li><strong>Logout = invalidate tokens</strong> (blacklist atau delete refresh token)</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>JWT adalah stateless token-based authentication method</li>
          <li>JWT consists of: Header.Payload.Signature</li>
          <li>Always hash passwords dengan bcrypt before storing</li>
          <li>Use middleware untuk protect routes dan check authorization</li>
          <li>Implement refresh tokens untuk better security</li>
          <li>Password reset flow: generate token → send email → verify token → reset</li>
          <li>Store JWT secret dan sensitive data dalam environment variables</li>
          <li>Combine authentication middleware dengan role-based authorization</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
