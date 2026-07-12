const mongoose = require('mongoose');

const fuelLogSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  fuelQuantity: {
    type: Number,
    required: true
  },
  fuelPricePerLiter: {
    type: Number,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  },
  fuelStation: {
    type: String,
    required: true
  },
  filledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('FuelLog', fuelLogSchema);
