const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { auth, adminAuth } = require('../middleware/auth');

// GET all roles - Admin only
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single role - Admin only
router.get('/:id', auth, adminAuth, async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new role - Admin only
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const newRole = new Role({ name, permissions });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update role - Admin only
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedRole) return res.status(404).json({ message: 'Role not found' });
    res.json(updatedRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE role - Admin only
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json({ message: 'Role deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
