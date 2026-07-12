const mongoose = require('mongoose');

const maintenanceLogSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  maintenanceType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  serviceCenter: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  maintenanceDate: {
    type: String,
    required: true
  },
  expectedCompletion: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('MaintenanceLog', maintenanceLogSchema);
