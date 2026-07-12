const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');
const { auth, adminAuth } = require('../middleware/auth');

// GET all drivers - Admin only
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single driver - Admin only
router.get('/:id', auth, adminAuth, async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new driver - Admin only
router.post('/', auth, adminAuth, async (req, res) => {
  const driver = new Driver(req.body);
  try {
    const newDriver = await driver.save();
    res.status(201).json(newDriver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update driver - Admin only
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedDriver) return res.status(404).json({ message: 'Driver not found' });
    res.json(updatedDriver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE driver - Admin only
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json({ message: 'Driver deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
