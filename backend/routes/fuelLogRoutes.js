const express = require('express');
const router = express.Router();
const FuelLog = require('../models/FuelLog');

// GET all fuel logs
router.get('/', async (req, res) => {
  try {
    const fuelLogs = await FuelLog.find().populate('vehicle').populate('trip').populate('filledBy');
    res.json(fuelLogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single fuel log
router.get('/:id', async (req, res) => {
  try {
    const fuelLog = await FuelLog.findById(req.params.id).populate('vehicle').populate('trip').populate('filledBy');
    if (!fuelLog) return res.status(404).json({ message: 'Log not found' });
    res.json(fuelLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new fuel log
router.post('/', async (req, res) => {
  const fuelLog = new FuelLog(req.body);
  try {
    const newLog = await fuelLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update fuel log
router.put('/:id', async (req, res) => {
  try {
    const updatedLog = await FuelLog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedLog) return res.status(404).json({ message: 'Log not found' });
    res.json(updatedLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE fuel log
router.delete('/:id', async (req, res) => {
  try {
    const log = await FuelLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
