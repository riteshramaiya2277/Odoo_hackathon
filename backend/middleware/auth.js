const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'transitops-secret-key';

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).populate('role');
    
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Admin authorization middleware
const adminAuth = (req, res, next) => {
  if (!req.user || req.user.role.name !== 'Admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
  next();
};

module.exports = { auth, adminAuth };
