const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Role = require('../models/Role');
const { auth, adminAuth } = require('../middleware/auth');

// GET all users - Admin only
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find().populate('role');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single user - Admin only
router.get('/:id', auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('role');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new user - Admin only
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const foundRole = await Role.findById(role);
    if (!foundRole) {
      return res.status(400).json({ message: 'Role not found' });
    }
    const newUser = new User({
      name,
      email,
      password,
      phone,
      role: foundRole._id,
      status: 'active'
    });
    await newUser.save();
    await newUser.populate('role');
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update user - Admin only
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    }).populate('role');
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE user - Admin only
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
