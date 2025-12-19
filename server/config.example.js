// server/config.example.js
// Copy this file to config.js and update with your actual credentials

export const SMTP_CONFIG = {
  host: 'smtp.email.ap-singapore-1.oci.oraclecloud.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your-smtp-username-here',
    pass: 'your-smtp-password-here'
  },
  tls: {
    rejectUnauthorized: false // For development; set to true in production
  }
};

export const EMAIL_CONFIG = {
  from: '"Wijeya Newspapers Limited" <noreply@dailymirror.lk>',
  adminEmail: 'vinujak777@gmail.com'
};

export const SERVER_CONFIG = {
  port: process.env.PORT || 3001,
  corsOrigins: [
    'http://localhost:5175',
    'http://localhost:5173',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:3000'
  ]
};

