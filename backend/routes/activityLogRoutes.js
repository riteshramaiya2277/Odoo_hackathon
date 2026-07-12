const express = require('express');
const router = express.Router();
const ActivityLog = require('../models/ActivityLog');

router.get('/', async (req, res) => {
  try {
    const activityLogs = await ActivityLog.find().populate('user');
    res.json(activityLogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
