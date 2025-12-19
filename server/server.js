// server/server.js
// Express server for handling contact form submissions with SMTP email
import express from 'express';
import cors from 'cors';
import { handleContactSubmission, handleAdvertiseSubmission } from './contactEmailHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Contact form endpoint
app.post('/api/contact', handleContactSubmission);

// Advertise form endpoint
app.post('/api/advertise', handleAdvertiseSubmission);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
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

