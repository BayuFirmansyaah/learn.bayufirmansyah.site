import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi18() {
  return (
    <MateriLayout title="File Upload with Multer">
      <Section id="multer-intro" heading="What is Multer?">
        <p>
          Multer adalah Node.js middleware untuk handling multipart/form-data, 
          yang primarily digunakan untuk uploading files.
        </p>
        
        <CodeBlock language="bash">
{`npm install multer`}
        </CodeBlock>
      </Section>

      <Section id="basic-upload" heading="Basic File Upload">
        <CodeBlock language="javascript">
{`const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Basic configuration
const upload = multer({ dest: 'uploads/' });

// Single file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    message: 'File uploaded successfully',
    file: {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path
    }
  });
});

// Multiple files (same field)
app.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  
  res.json({
    message: 'Files uploaded successfully',
    files: req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size
    }))
  });
});

// Multiple fields
app.post('/upload-fields', upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 8 }
]), (req, res) => {
  res.json({
    message: 'Files uploaded successfully',
    files: {
      avatar: req.files.avatar,
      gallery: req.files.gallery
    }
  });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="storage-config" heading="Custom Storage Configuration">
        <CodeBlock language="javascript">
{`const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Ensure upload directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Dynamic destination based on file type
    let dest = 'uploads/';
    
    if (file.mimetype.startsWith('image/')) {
      dest += 'images/';
    } else if (file.mimetype === 'application/pdf') {
      dest += 'documents/';
    } else {
      dest += 'others/';
    }
    
    // Create directory if not exists
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    
    cb(null, \`\${basename}-\${uniqueSuffix}\${ext}\`);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({
    message: 'File uploaded successfully',
    file: req.file
  });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="file-validation" heading="File Validation & Filtering">
        <CodeBlock language="javascript">
{`const multer = require('multer');
const path = require('path');

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  
  // Check extension
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  
  // Check mimetype
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and PDF are allowed.'));
  }
};

// Configure multer with limits and filter
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
    files: 10                   // Max 10 files
  },
  fileFilter: fileFilter
});

// Image-only upload
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const imageUpload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: imageFilter
});

// Document-only upload
const documentFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and Word documents are allowed'));
  }
};

const documentUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: documentFilter
});

const app = express();

app.post('/upload/image', imageUpload.single('image'), (req, res) => {
  res.json({ file: req.file });
});

app.post('/upload/document', documentUpload.single('document'), (req, res) => {
  res.json({ file: req.file });
});`}
        </CodeBlock>
      </Section>

      <Section id="error-handling" heading="Error Handling">
        <CodeBlock language="javascript">
{`const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 1024 * 1024 } // 1MB
});

app.post('/upload', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          error: 'File too large. Maximum size is 1MB'
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          error: 'Too many files'
        });
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
          error: 'Unexpected field name'
        });
      }
      return res.status(400).json({
        error: err.message
      });
    } else if (err) {
      // Other errors (from fileFilter)
      return res.status(400).json({
        error: err.message
      });
    }
    
    // No error - file uploaded successfully
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded'
      });
    }
    
    res.json({
      message: 'File uploaded successfully',
      file: req.file
    });
  });
});

// Global error handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  
  res.status(500).json({
    success: false,
    error: err.message
  });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="serving-files" heading="Serving Uploaded Files">
        <CodeBlock language="javascript">
{`const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve static files
app.use('/uploads', express.static('uploads'));

// Download file
app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  // Send file for download
  res.download(filePath);
});

// Stream file
app.get('/stream/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    'Content-Type': 'video/mp4', // Or detect mimetype
    'Content-Length': stat.size
  });
  
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

// Delete file
app.delete('/files/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  fs.unlinkSync(filePath);
  res.json({ message: 'File deleted successfully' });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="image-processing" heading="Image Processing">
        <CodeBlock language="bash">
{`npm install sharp`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Store in memory for processing
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'));
    }
  }
});

app.post('/upload/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    
    const filename = \`\${Date.now()}-\${Math.round(Math.random() * 1E9)}.jpg\`;
    const uploadPath = path.join(__dirname, 'uploads', filename);
    
    // Process image
    await sharp(req.file.buffer)
      .resize(800, 600, { fit: 'inside' }) // Resize
      .jpeg({ quality: 90 })               // Convert to JPEG
      .toFile(uploadPath);
    
    // Create thumbnail
    const thumbnailPath = path.join(__dirname, 'uploads', 'thumbnails', filename);
    await sharp(req.file.buffer)
      .resize(200, 200, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toFile(thumbnailPath);
    
    res.json({
      message: 'Image uploaded and processed',
      file: {
        filename,
        url: \`/uploads/\${filename}\`,
        thumbnail: \`/uploads/thumbnails/\${filename}\`
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`}
        </CodeBlock>
      </Section>

      <Section id="cloud-storage" heading="Cloud Storage (AWS S3)">
        <CodeBlock language="bash">
{`npm install aws-sdk
npm install multer-s3`}
        </CodeBlock>

        <CodeBlock language="javascript">
{`const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Configure AWS
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new aws.S3();

// Configure multer for S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, \`uploads/\${uniqueSuffix}-\${file.originalname}\`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({
    message: 'File uploaded to S3',
    file: {
      filename: req.file.key,
      url: req.file.location,
      size: req.file.size
    }
  });
});

// Delete from S3
app.delete('/files/:key', async (req, res) => {
  try {
    await s3.deleteObject({
      Bucket: process.env.S3_BUCKET,
      Key: req.params.key
    }).promise();
    
    res.json({ message: 'File deleted from S3' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`}
        </CodeBlock>
      </Section>

      <Section id="complete-example" heading="Complete File Upload API">
        <CodeBlock language="javascript">
{`const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = 'uploads/';
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure multer
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// File model (MongoDB)
const fileSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  mimetype: String,
  size: Number,
  path: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const File = mongoose.model('File', fileSchema);

// Upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Save file info to database
    const file = await File.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      uploadedBy: req.user?.id
    });
    
    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: file._id,
        filename: file.filename,
        originalName: file.originalName,
        size: file.size,
        url: \`/uploads/\${file.filename}\`
      }
    });
    
  } catch (error) {
    // Delete file if database save fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
});

// Get file info
app.get('/api/files/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.json({ success: true, file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download file
app.get('/api/files/:id/download', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    if (!fs.existsSync(file.path)) {
      return res.status(404).json({ error: 'File not found on disk' });
    }
    
    res.download(file.path, file.originalName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete file
app.delete('/api/files/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Delete from disk
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    
    // Delete from database
    await file.remove();
    
    res.json({ success: true, message: 'File deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files
app.use('/uploads', express.static('uploads'));

// Error handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: err.message });
});

app.listen(3000);`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li><strong>Validate file types</strong> di server-side</li>
          <li><strong>Limit file size</strong> untuk prevent DoS attacks</li>
          <li><strong>Generate unique filenames</strong> untuk avoid conflicts</li>
          <li><strong>Store files outside public directory</strong> untuk security</li>
          <li><strong>Scan uploaded files</strong> untuk viruses/malware</li>
          <li><strong>Use cloud storage</strong> (S3, GCS) untuk scalability</li>
          <li><strong>Implement proper error handling</strong></li>
          <li><strong>Clean up failed uploads</strong></li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Multer handles multipart/form-data untuk file uploads</li>
          <li>Configure storage dengan diskStorage() atau memoryStorage()</li>
          <li>Validate files dengan fileFilter function</li>
          <li>Set limits untuk fileSize dan file count</li>
          <li>Handle multer errors dengan proper error handling</li>
          <li>Process images dengan Sharp library</li>
          <li>Store files in cloud (AWS S3) untuk production</li>
          <li>Save file metadata to database untuk tracking</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
