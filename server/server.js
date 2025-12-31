import { authenticateJWT, generateToken } from './auth.js';
// Example protected route
app.get('/api/protected', authenticateJWT, (req, res) => {
  res.json({ success: true, message: 'You have accessed a protected route!', user: req.user });
});
// server/server.js
// Express server for handling contact form submissions with SMTP email

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import csurf from 'csurf';
import multer from 'multer';
import { fileTypeFromBuffer } from 'file-type';
import { handleContactSubmission, handleAdvertiseSubmission, contactValidation, advertiseValidation } from './contactEmailHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;


// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://apis.google.com'],
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'", 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:3000', 'http://localhost:3001'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}));

app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CSRF Protection
app.use(csurf({ cookie: true }));

// File upload setup (for secure file uploads)
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: async (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    let buffer = Buffer.alloc(0);
    file.stream.on('data', (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
    });
    file.stream.on('end', async () => {
      const type = await fileTypeFromBuffer(buffer);
      if (type && allowedTypes.includes(type.mime)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type'));
      }
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});


// Contact form endpoint (with file upload example)
app.post('/api/contact', upload.none(), contactValidation, handleContactSubmission);

// Advertise form endpoint (with file upload example)
app.post('/api/advertise', upload.none(), advertiseValidation, handleAdvertiseSubmission);


// Error handling middleware
app.use((err, req, res, next) => {
  // Hide stack traces and sensitive info in production
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Contact form server running on http://localhost:${PORT}`);
  console.log(`📧 SMTP email service is active`);
  console.log(`✅ Ready to handle contact form submissions`);
  console.log(`✅ Ready to handle advertise form submissions`);
});

export default app;

