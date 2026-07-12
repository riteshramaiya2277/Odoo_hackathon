const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const { auth, adminAuth } = require('../middleware/auth');

// GET all trips - Admin only
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const trips = await Trip.find().populate('vehicle').populate('driver');
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single trip - Admin only
router.get('/:id', auth, adminAuth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate('vehicle').populate('driver');
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new trip - Admin only
router.post('/', auth, adminAuth, async (req, res) => {
  const trip = new Trip(req.body);
  try {
    const newTrip = await trip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update trip - Admin only
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedTrip) return res.status(404).json({ message: 'Trip not found' });
    res.json(updatedTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE trip - Admin only
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
