const express = require('express');
const router = express.Router();
const MaintenanceLog = require('../models/MaintenanceLog');

// GET all maintenance logs
router.get('/', async (req, res) => {
  try {
    const maintenanceLogs = await MaintenanceLog.find().populate('vehicle');
    res.json(maintenanceLogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single maintenance log
router.get('/:id', async (req, res) => {
  try {
    const maintenanceLog = await MaintenanceLog.findById(req.params.id).populate('vehicle');
    if (!maintenanceLog) return res.status(404).json({ message: 'Log not found' });
    res.json(maintenanceLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new maintenance log
router.post('/', async (req, res) => {
  const maintenanceLog = new MaintenanceLog(req.body);
  try {
    const newLog = await maintenanceLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update maintenance log
router.put('/:id', async (req, res) => {
  try {
    const updatedLog = await MaintenanceLog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedLog) return res.status(404).json({ message: 'Log not found' });
    res.json(updatedLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE maintenance log
router.delete('/:id', async (req, res) => {
  try {
    const log = await MaintenanceLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
