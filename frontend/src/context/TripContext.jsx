import React, { createContext, useState } from 'react';
import api from '../services/api';

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [assignedDriver, setAssignedDriver] = useState(null);
  const [assignedVehicle, setAssignedVehicle] = useState(null);
  const [tripStatus, setTripStatus] = useState('idle'); // idle, searching, assigned, active, completed

  const fetchAvailableOptions = async () => {
    try {
      // Use mock data for demo purposes (since vehicles/drivers APIs are admin-only)
      setAvailableVehicles([
        { _id: '1', vehicleName: 'UberX', vehicleType: 'economy', brand: 'Toyota', model: 'Camry', capacity: 4, capacityKg: 500, registrationNumber: 'UBER-123', status: 'Available', price: 150, eta: '5 min' },
        { _id: '2', vehicleName: 'UberXL', vehicleType: 'comfort', brand: 'Honda', model: 'Odyssey', capacity: 6, capacityKg: 800, registrationNumber: 'UBER-456', status: 'Available', price: 250, eta: '8 min' },
        { _id: '3', vehicleName: 'UberBlack', vehicleType: 'premium', brand: 'Mercedes', model: 'E-Class', capacity: 4, capacityKg: 400, registrationNumber: 'UBER-789', status: 'Available', price: 400, eta: '12 min' }
      ]);
      
      setAvailableDrivers([
        { _id: '1', name: 'John Smith', experience: 5, status: 'Available', rating: 4.9, safetyScore: 95 },
        { _id: '2', name: 'Sarah Johnson', experience: 3, status: 'Available', rating: 4.8, safetyScore: 90 },
        { _id: '3', name: 'Mike Wilson', experience: 7, status: 'Available', rating: 5.0, safetyScore: 98 }
      ]);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const assignDriverAndVehicle = () => {
    if (availableDrivers.length > 0 && availableVehicles.length > 0) {
      // Pick random driver and vehicle for demo purposes
      const randomDriver = availableDrivers[Math.floor(Math.random() * availableDrivers.length)];
      let suitableVehicles = availableVehicles;
      if (selectedVehicleType) {
         suitableVehicles = availableVehicles.filter(v => v.vehicleType === selectedVehicleType.vehicleType);
      }
      const randomVehicle = suitableVehicles.length > 0 ? suitableVehicles[0] : availableVehicles[0];
      
      setAssignedDriver(randomDriver);
      setAssignedVehicle(randomVehicle);
      setTripStatus('assigned');
    } else {
      console.error('No drivers or vehicles available');
      setTripStatus('idle');
    }
  };

  const resetTrip = () => {
    setPickup('');
    setDestination('');
    setSelectedVehicleType(null);
    setAssignedDriver(null);
    setAssignedVehicle(null);
    setTripStatus('idle');
  };

  return (
    <TripContext.Provider value={{
      pickup, setPickup,
      destination, setDestination,
      selectedVehicleType, setSelectedVehicleType,
      availableVehicles,
      availableDrivers,
      assignedDriver,
      assignedVehicle,
      tripStatus, setTripStatus,
      fetchAvailableOptions,
      assignDriverAndVehicle,
      resetTrip
    }}>
      {children}
    </TripContext.Provider>
  );
};
