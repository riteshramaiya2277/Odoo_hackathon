const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  capacityKg: {
    type: Number,
    required: true
  },
  fuelType: {
    type: String,
    required: true
  },
  odometer: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  insuranceExpiry: {
    type: String,
    required: true
  },
  fitnessExpiry: {
    type: String,
    required: true
  },
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
