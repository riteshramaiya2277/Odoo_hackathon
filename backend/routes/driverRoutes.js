const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');

router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
