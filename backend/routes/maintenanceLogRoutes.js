const express = require('express');
const router = express.Router();
const MaintenanceLog = require('../models/MaintenanceLog');

router.get('/', async (req, res) => {
  try {
    const maintenanceLogs = await MaintenanceLog.find().populate('vehicle');
    res.json(maintenanceLogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
