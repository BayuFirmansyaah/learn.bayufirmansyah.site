import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../component';

export default function Materi19() {
  return (
    <MateriLayout title="Input Validation & Sanitization">
      <Section id="why-validation" heading="Why Validate Input?">
        <ul>
          <li><strong>Security:</strong> Prevent injection attacks (SQL, NoSQL, XSS)</li>
          <li><strong>Data Integrity:</strong> Ensure data meets requirements</li>
          <li><strong>User Experience:</strong> Provide clear error messages</li>
          <li><strong>Business Logic:</strong> Enforce business rules</li>
        </ul>
      </Section>

      <Section id="express-validator" heading="Express Validator">
        <CodeBlock language="bash">
{`npm install express-validator`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// Validation rules
app.post('/register',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail(),
    
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
      .matches(/\\d/)
      .withMessage('Password must contain a number'),
    
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    
    body('age')
      .optional()
      .isInt({ min: 0, max: 120 })
      .withMessage('Age must be between 0 and 120')
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }
    
    // Process valid data
    res.json({
      success: true,
      message: 'User registered successfully'
    });
  }
);

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="validation-methods" heading="Common Validation Methods">
        <CodeBlock language="javascript">
{`const { body, param, query } = require('express-validator');

// String validators
body('username')
  .isString()
  .isLength({ min: 3, max: 20 })
  .matches(/^[a-zA-Z0-9_]+$/)
  .withMessage('Username can only contain letters, numbers, and underscores');

body('email')
  .isEmail()
  .normalizeEmail()
  .custom(async (email) => {
    const user = await User.findOne({ email });
    if (user) {
      throw new Error('Email already exists');
    }
  });

// Number validators
body('age')
  .isInt({ min: 18, max: 100 })
  .toInt();

body('price')
  .isFloat({ min: 0 })
  .toFloat();

// Boolean validators
body('isActive')
  .isBoolean()
  .toBoolean();

// Date validators
body('birthdate')
  .isISO8601()
  .toDate();

// Array validators
body('tags')
  .isArray({ min: 1, max: 5 })
  .withMessage('Must provide 1-5 tags');

body('tags.*')
  .isString()
  .trim();

// URL validators
body('website')
  .optional()
  .isURL();

// Custom validators
body('password')
  .custom((value, { req }) => {
    if (value !== req.body.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    return true;
  });

// Conditional validation
body('country')
  .if(body('hasAddress').equals('true'))
  .notEmpty()
  .withMessage('Country is required when address is provided');

// Sanitization
body('name')
  .trim()              // Remove whitespace
  .escape()            // HTML escape
  .toLowerCase();

body('email')
  .normalizeEmail();   // Standardize email format`}
        </CodeBlock>
      </Section>

      <Section id="validation-middleware" heading="Validation Middleware">
        <CodeBlock language="javascript">
{`const { validationResult } = require('express-validator');

// Reusable validation middleware
const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      return next();
    }
    
    res.status(422).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
        value: err.value
      }))
    });
  };
};

// Define validation rules
const registerValidation = [
  body('name').trim().isLength({ min: 2, max: 50 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
];

const updateProfileValidation = [
  body('name').optional().trim().isLength({ min: 2, max: 50 }),
  body('bio').optional().trim().isLength({ max: 500 }),
  body('website').optional().isURL()
];

// Use in routes
app.post('/register', validate(registerValidation), registerController);
app.put('/profile', validate(updateProfileValidation), updateProfileController);`}
        </CodeBlock>
      </Section>

      <Section id="custom-validators" heading="Custom Validators">
        <CodeBlock language="javascript">
{`const { body } = require('express-validator');

// Custom validator functions
const isStrongPassword = (value) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
  if (!regex.test(value)) {
    throw new Error('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
  }
  return true;
};

const isValidUsername = async (value) => {
  // Check if username is reserved
  const reserved = ['admin', 'root', 'system'];
  if (reserved.includes(value.toLowerCase())) {
    throw new Error('Username is reserved');
  }
  
  // Check if username exists
  const user = await User.findOne({ username: value });
  if (user) {
    throw new Error('Username already taken');
  }
  
  return true;
};

const isValidPhoneNumber = (value) => {
  const regex = /^\\+?[1-9]\\d{1,14}$/;
  if (!regex.test(value)) {
    throw new Error('Invalid phone number format');
  }
  return true;
};

// Use custom validators
body('password').custom(isStrongPassword);
body('username').custom(isValidUsername);
body('phone').custom(isValidPhoneNumber);

// Custom validator with context
body('newPassword')
  .custom((value, { req }) => {
    if (value === req.body.currentPassword) {
      throw new Error('New password must be different from current password');
    }
    return true;
  });

// Async custom validator
body('email')
  .custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) {
      return Promise.reject('Email already in use');
    }
  });`}
        </CodeBlock>
      </Section>

      <Section id="sanitization" heading="Input Sanitization">
        <CodeBlock language="javascript">
{`const { body } = require('express-validator');

// String sanitization
body('name')
  .trim()                    // Remove whitespace
  .escape()                  // Escape HTML characters
  .blacklist('<>')          // Remove specific characters
  .stripLow()               // Remove control characters
  .customSanitizer(value => {
    return value.replace(/\\s+/g, ' '); // Replace multiple spaces with single
  });

// Email sanitization
body('email')
  .normalizeEmail({
    gmail_remove_dots: false,
    gmail_remove_subaddress: false
  })
  .toLowerCase();

// Number sanitization
body('price')
  .toFloat()
  .customSanitizer(value => {
    return Math.round(value * 100) / 100; // Round to 2 decimals
  });

body('quantity')
  .toInt()
  .customSanitizer(value => {
    return Math.max(1, value); // Minimum 1
  });

// Boolean sanitization
body('isActive')
  .toBoolean(true); // 'true', '1', 'yes' → true

// Date sanitization
body('startDate')
  .toDate();

// Array sanitization
body('tags')
  .toArray()
  .customSanitizer(tags => {
    return tags.map(tag => tag.trim().toLowerCase());
  });

// URL sanitization
body('website')
  .trim()
  .customSanitizer(url => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  });

// Remove XSS
const sanitizeHtml = require('sanitize-html');

body('bio')
  .customSanitizer(value => {
    return sanitizeHtml(value, {
      allowedTags: ['b', 'i', 'em', 'strong'],
      allowedAttributes: {}
    });
  });`}
        </CodeBlock>
      </Section>

      <Section id="joi-validation" heading="Joi Validation (Alternative)">
        <CodeBlock language="bash">
{`npm install joi`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const Joi = require('joi');

// Define schema
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  
  email: Joi.string().email().required(),
  
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain uppercase, lowercase, and number'
    }),
  
  age: Joi.number().integer().min(18).max(100).optional(),
  
  role: Joi.string().valid('user', 'admin').default('user'),
  
  tags: Joi.array().items(Joi.string()).min(1).max(5),
  
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    zip: Joi.string().pattern(/^\\d{5}$/).required()
  }).optional()
});

// Validation middleware
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Return all errors
      stripUnknown: true // Remove unknown fields
    });
    
    if (error) {
      const errors = error.details.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return res.status(422).json({
        success: false,
        errors
      });
    }
    
    // Replace req.body with validated value
    req.body = value;
    next();
  };
};

// Use in routes
app.post('/register', validateRequest(registerSchema), (req, res) => {
  // req.body is now validated and sanitized
  res.json({ success: true });
});`}
        </CodeBlock>
      </Section>

      <Section id="complete-example" heading="Complete Validation Example">
        <CodeBlock language="javascript">
{`const express = require('express');
const { body, param, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// Validation middleware
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.param,
          message: err.msg
        }))
      });
    }
    next();
  };
};

// Validation rules
const userValidation = {
  create: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be 2-50 characters'),
    
    body('email')
      .isEmail()
      .withMessage('Invalid email')
      .normalizeEmail()
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) throw new Error('Email already exists');
      }),
    
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/)
      .withMessage('Password must contain uppercase, lowercase, and number'),
    
    body('age')
      .optional()
      .isInt({ min: 18, max: 100 })
      .withMessage('Age must be 18-100')
      .toInt()
  ],
  
  update: [
    param('id')
      .isMongoId()
      .withMessage('Invalid user ID'),
    
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 }),
    
    body('bio')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Bio must be max 500 characters')
  ]
};

// Routes with validation
app.post('/users', 
  validate(userValidation.create),
  async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  }
);

app.put('/users/:id',
  validate(userValidation.update),
  async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: user });
  }
);

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Validate on server</strong>, never trust client-side validation</li>
          <li><strong>Sanitize all input</strong> untuk prevent XSS attacks</li>
          <li><strong>Use whitelist approach</strong> - allow only expected input</li>
          <li><strong>Provide clear error messages</strong> untuk better UX</li>
          <li><strong>Validate data types</strong> dan ranges</li>
          <li><strong>Use parameterized queries</strong> untuk prevent SQL injection</li>
          <li><strong>Limit input length</strong> untuk prevent DoS</li>
          <li><strong>Escape HTML</strong> dalam user-generated content</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Input validation adalah critical untuk security dan data integrity</li>
          <li>Express-validator provides chainable validation methods</li>
          <li>Sanitization cleans and normalizes input data</li>
          <li>Custom validators untuk complex business logic</li>
          <li>Joi adalah alternative dengan schema-based validation</li>
          <li>Always validate on server-side, never trust client</li>
          <li>Return clear, specific error messages untuk each field</li>
          <li>Combine validation dengan sanitization untuk best results</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
