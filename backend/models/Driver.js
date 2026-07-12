const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add driver name']
  },
  licenseNumber: {
    type: String,
    required: [true, 'Please add license number'],
    unique: true
  },
  licenseCategory: {
    type: String,
    required: true
  },
  licenseExpiryDate: {
    type: Date,
    required: [true, 'Please add license expiry date']
  },
  contactNumber: {
    type: String,
    required: true
  },
  safetyScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  status: {
    type: String,
    enum: ['Active', 'On Trip', 'Suspended', 'Leave'],
    default: 'Active'
  },
  hoursWorked: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Driver', driverSchema);
