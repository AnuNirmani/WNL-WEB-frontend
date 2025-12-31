// server/auth.js
// Simple JWT authentication middleware and token generation
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret';
const JWT_EXPIRES_IN = '2h';

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ success: false, error: 'Invalid or expired token' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ success: false, error: 'Authorization token required' });
  }
}
