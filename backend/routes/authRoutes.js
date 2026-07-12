const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

const JWT_SECRET = process.env.JWT_SECRET || 'transitops-secret-key';

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('role');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    // For demo, just check password (in production, use bcrypt!)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      id: user._id,
      fullName: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    // Find role by name
    const foundRole = await Role.findOne({ name: role || 'Driver' });
    const newUser = new User({
      name,
      email,
      password,
      phone,
      role: foundRole._id,
      status: 'active'
    });
    await newUser.save();
    
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      id: newUser._id,
      fullName: newUser.name,
      email: newUser.email,
      role: foundRole,
      phone: newUser.phone
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).populate('role');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      fullName: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone
    });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out' });
});

module.exports = router;
