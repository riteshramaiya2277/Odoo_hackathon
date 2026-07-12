const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const { auth, adminAuth } = require('../middleware/auth');

// GET all vehicles - Admin only
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('assignedDriver').populate('createdBy');
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single vehicle - Admin only
router.get('/:id', auth, adminAuth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('assignedDriver').populate('createdBy');
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new vehicle - Admin only
router.post('/', auth, adminAuth, async (req, res) => {
  const vehicle = new Vehicle(req.body);
  try {
    const newVehicle = await vehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update vehicle - Admin only
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(updatedVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE vehicle - Admin only
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
