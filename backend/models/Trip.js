const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  tripNumber: {
    type: String,
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true
  },
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  cargoWeightKg: {
    type: Number,
    required: true
  },
  distanceKm: {
    type: Number,
    required: true
  },
  fuelUsed: {
    type: Number,
    required: true
  },
  fuelCost: {
    type: Number,
    required: true
  },
  tollCost: {
    type: Number,
    required: true
  },
  otherExpense: {
    type: Number,
    required: true
  },
  operationalCost: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Trip', tripSchema);
