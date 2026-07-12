import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [assignedDriver, setAssignedDriver] = useState(null);
  const [assignedVehicle, setAssignedVehicle] = useState(null);
  const [tripStatus, setTripStatus] = useState('idle'); // idle, searching, assigned, active, completed
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(false);
  const [driverTrips, setDriverTrips] = useState([]);
  const [driverTripsLoading, setDriverTripsLoading] = useState(false);

  const fetchTrips = async () => {
    if (!user) return;
    setTripsLoading(true);
    try {
      const response = await api.get('/trips/my-trips');
      setTrips(response.data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setTripsLoading(false);
    }
  };

  const fetchDriverTrips = async () => {
    if (!user) return;
    setDriverTripsLoading(true);
    try {
      const response = await api.get('/trips/driver-requests');
      setDriverTrips(response.data);
    } catch (error) {
      console.error('Error fetching driver trips:', error);
    } finally {
      setDriverTripsLoading(false);
    }
  };

  const addTrip = async (tripData) => {
    try {
      const response = await api.post('/trips', tripData);
      setTrips(prev => [response.data, ...prev]);
      return response.data;
    } catch (error) {
      console.error('Error adding trip:', error);
      throw error;
    }
  };

  const updateTrip = async (id, tripData) => {
    try {
      const response = await api.put(`/trips/${id}`, tripData);
      setTrips(prev => prev.map(t => t._id === id ? response.data : t));
      setDriverTrips(prev => prev.map(t => t._id === id ? response.data : t));
      return response.data;
    } catch (error) {
      console.error('Error updating trip:', error);
      throw error;
    }
  };

  const acceptTrip = async (id) => {
    try {
      const response = await api.post(`/trips/${id}/accept`);
      setDriverTrips(prev => prev.map(t => t._id === id ? response.data : t));
      return response.data;
    } catch (error) {
      console.error('Error accepting trip:', error);
      throw error;
    }
  };

  const startTrip = async (id) => {
    try {
      const response = await api.post(`/trips/${id}/start`);
      setDriverTrips(prev => prev.map(t => t._id === id ? response.data : t));
      return response.data;
    } catch (error) {
      console.error('Error starting trip:', error);
      throw error;
    }
  };

  const completeTrip = async (id) => {
    try {
      const response = await api.post(`/trips/${id}/complete`);
      setDriverTrips(prev => prev.map(t => t._id === id ? response.data : t));
      return response.data;
    } catch (error) {
      console.error('Error completing trip:', error);
      throw error;
    }
  };

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

  // Fetch trips when user logs in
  useEffect(() => {
    if (user && !authLoading) {
      fetchTrips();
      // Check if user is driver and fetch driver trips
      if (user.role?.name === 'Driver' || user.role?.name === 'Admin') {
        fetchDriverTrips();
      }
    }
  }, [user, authLoading]);

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
      resetTrip,
      trips,
      tripsLoading,
      fetchTrips,
      addTrip,
      updateTrip,
      driverTrips,
      driverTripsLoading,
      fetchDriverTrips,
      acceptTrip,
      startTrip,
      completeTrip
    }}>
      {children}
    </TripContext.Provider>
  );
};
