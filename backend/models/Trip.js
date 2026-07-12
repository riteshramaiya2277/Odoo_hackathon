const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  source: {
    type: String,
    required: [true, 'Please add source location']
  },
  destination: {
    type: String,
    required: [true, 'Please add destination location']
  },
  cargoWeight: {
    type: Number,
    required: [true, 'Please specify cargo weight in kg']
  },
  cargoType: {
    type: String,
    required: true
  },
  plannedDistance: {
    type: Number,
    required: true
  },
  actualDistance: {
    type: Number
  },
  vehicle: {
    type: mongoose.Schema.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  driver: {
    type: mongoose.Schema.ObjectId,
    ref: 'Driver',
    required: true
  },
  tripStatus: {
    type: String,
    enum: ['Draft', 'Dispatched', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Draft'
  },
  remarks: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema);
