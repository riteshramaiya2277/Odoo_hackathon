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
      const [vehiclesRes, driversRes] = await Promise.all([
        api.get('/vehicles'),
        api.get('/drivers')
      ]);
      setAvailableVehicles(vehiclesRes.data.filter(v => v.status === 'Available'));
      setAvailableDrivers(driversRes.data.filter(d => d.status === 'Available'));
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
