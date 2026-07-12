const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: [true, 'Please add a registration number'],
    unique: true,
    trim: true
  },
  vehicleName: {
    type: String,
    required: [true, 'Please add a vehicle name/model']
  },
  vehicleType: {
    type: String,
    required: [true, 'Please select a vehicle type'],
    enum: ['Truck', 'Van', 'Car', 'Semi-Trailer', 'Refrigerated']
  },
  maxLoadCapacity: {
    type: Number,
    required: [true, 'Please specify max load capacity in kg']
  },
  odometer: {
    type: Number,
    default: 0
  },
  region: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'On Trip', 'In Shop', 'Suspended', 'Retired'],
    default: 'Available'
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
