const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find().populate('vehicle').populate('driver');
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
