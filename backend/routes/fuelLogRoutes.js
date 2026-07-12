const express = require('express');
const router = express.Router();
const FuelLog = require('../models/FuelLog');

router.get('/', async (req, res) => {
  try {
    const fuelLogs = await FuelLog.find().populate('vehicle').populate('trip').populate('filledBy');
    res.json(fuelLogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
