const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { auth, adminAuth } = require('../middleware/auth');

// GET all notifications - Admin only
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single notification - Admin only
router.get('/:id', auth, adminAuth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new notification - Admin only
router.post('/', auth, adminAuth, async (req, res) => {
  const notification = new Notification(req.body);
  try {
    const newNotification = await notification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update notification - Admin only
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedNotification) return res.status(404).json({ message: 'Notification not found' });
    res.json(updatedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE notification - Admin only
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
