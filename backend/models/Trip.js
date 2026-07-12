const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  tripNumber: {
    type: String,
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.Mixed, // Can be ObjectId (admin) or object (rider)
    default: null
  },
  driver: {
    type: mongoose.Schema.Types.Mixed, // Can be ObjectId (admin) or object (rider/driver)
    default: null
  },
  driverUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
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
    default: 0
  },
  distanceKm: {
    type: Number,
    default: 0
  },
  fuelUsed: {
    type: Number,
    default: 0
  },
  fuelCost: {
    type: Number,
    default: 0
  },
  tollCost: {
    type: Number,
    default: 0
  },
  otherExpense: {
    type: Number,
    default: 0
  },
  operationalCost: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['requested', 'accepted', 'in-progress', 'completed', 'cancelled', 'Draft', 'Dispatched', 'Cancelled']
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
});

module.exports = mongoose.model('Trip', tripSchema);
