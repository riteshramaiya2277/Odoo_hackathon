const express = require('express');
const router = express.Router();
const ActivityLog = require('../models/ActivityLog');
const { auth, adminAuth } = require('../middleware/auth');

// GET all activity logs - Admin only
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const activityLogs = await ActivityLog.find().populate('user');
    res.json(activityLogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single activity log - Admin only
router.get('/:id', auth, adminAuth, async (req, res) => {
  try {
    const activityLog = await ActivityLog.findById(req.params.id).populate('user');
    if (!activityLog) return res.status(404).json({ message: 'Activity log not found' });
    res.json(activityLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new activity log - Admin only
router.post('/', auth, adminAuth, async (req, res) => {
  const activityLog = new ActivityLog(req.body);
  try {
    const newActivityLog = await activityLog.save();
    res.status(201).json(newActivityLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update activity log - Admin only
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const updatedActivityLog = await ActivityLog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedActivityLog) return res.status(404).json({ message: 'Activity log not found' });
    res.json(updatedActivityLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE activity log - Admin only
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const activityLog = await ActivityLog.findByIdAndDelete(req.params.id);
    if (!activityLog) return res.status(404).json({ message: 'Activity log not found' });
    res.json({ message: 'Activity log deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
