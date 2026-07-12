const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const { auth, adminAuth } = require('../middleware/auth');

// GET all trips - Admin only
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const trips = await Trip.find().populate('user').populate('driverUser');
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET user's own trips - Authenticated user
router.get('/my-trips', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort({ startDate: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET driver's requested trips and active trips
router.get('/driver-requests', auth, async (req, res) => {
  try {
    // Check if user is driver
    const isDriver = req.user.role?.name === 'Driver' || req.user.role?.name === 'Admin';
    if (!isDriver) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const trips = await Trip.find({ 
      $or: [
        { status: 'requested' },
        { driverUser: req.user._id }
      ]
    }).sort({ startDate: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Accept trip (driver only)
router.post('/:id/accept', auth, async (req, res) => {
  try {
    const isDriver = req.user.role?.name === 'Driver' || req.user.role?.name === 'Admin';
    if (!isDriver) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    
    if (trip.status !== 'requested') {
      return res.status(400).json({ message: 'Trip is not available for acceptance' });
    }
    
    trip.status = 'accepted';
    trip.driverUser = req.user._id;
    trip.driver = { name: req.user.name, _id: req.user._id };
    const updatedTrip = await trip.save();
    res.json(updatedTrip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start trip (driver only)
router.post('/:id/start', auth, async (req, res) => {
  try {
    const isDriver = req.user.role?.name === 'Driver' || req.user.role?.name === 'Admin';
    if (!isDriver) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    
    if (trip.status !== 'accepted' || (trip.driverUser && trip.driverUser.toString() !== req.user._id.toString())) {
      return res.status(400).json({ message: 'Cannot start this trip' });
    }
    
    trip.status = 'in-progress';
    const updatedTrip = await trip.save();
    res.json(updatedTrip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Complete trip (driver only)
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const isDriver = req.user.role?.name === 'Driver' || req.user.role?.name === 'Admin';
    if (!isDriver) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    
    if (trip.status !== 'in-progress' || (trip.driverUser && trip.driverUser.toString() !== req.user._id.toString())) {
      return res.status(400).json({ message: 'Cannot complete this trip' });
    }
    
    trip.status = 'completed';
    const updatedTrip = await trip.save();
    res.json(updatedTrip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single trip - Admin only OR trip owner OR assigned driver
router.get('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    
    // Check if user is admin OR trip owner OR assigned driver
    const isAdmin = req.user.role?.name === 'Admin';
    const isOwner = trip.user && trip.user.toString() === req.user._id.toString();
    const isDriver = trip.driverUser && trip.driverUser.toString() === req.user._id.toString();
    if (!isAdmin && !isOwner && !isDriver) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new trip - Admin only OR authenticated user
router.post('/', auth, async (req, res) => {
  try {
    // If user is not admin, auto-set user to current user
    const isAdmin = req.user.role?.name === 'Admin';
    const tripData = { ...req.body };
    if (!isAdmin) {
      tripData.user = req.user._id;
    }
    
    const trip = new Trip(tripData);
    const newTrip = await trip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update trip - Admin only OR trip owner OR assigned driver
router.put('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    
    const isAdmin = req.user.role?.name === 'Admin';
    const isOwner = trip.user && trip.user.toString() === req.user._id.toString();
    const isDriver = trip.driverUser && trip.driverUser.toString() === req.user._id.toString();
    if (!isAdmin && !isOwner && !isDriver) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
