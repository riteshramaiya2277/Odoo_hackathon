import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MapComponent from '../components/MapComponent';
import { VehicleCard } from '../components/VehicleCard';
import useTrip from '../hooks/useTrip';

const RideOptions = () => {
  const navigate = useNavigate();
  const { pickup, destination, availableVehicles, selectedVehicleType, setSelectedVehicleType } = useTrip();
  const [uniqueVehicleTypes, setUniqueVehicleTypes] = useState([]);

  useEffect(() => {
    if (!pickup || !destination) {
      navigate('/home');
      return;
    }

    if (availableVehicles && availableVehicles.length > 0) {
      const types = availableVehicles; // Already have price and eta in mock data
      types.sort((a,b) => a.price - b.price);
      setUniqueVehicleTypes(types);
      if(types.length > 0 && !selectedVehicleType) {
        setSelectedVehicleType(types[0]);
      }
    } else {
      // Mock Uber-like options if no real vehicles are available
      const mockTypes = [
        { vehicleName: 'Economy', vehicleType: 'economy', price: 150, eta: '5 min', capacity: 4 },
        { vehicleName: 'Comfort', vehicleType: 'comfort', price: 250, eta: '8 min', capacity: 4 },
        { vehicleName: 'Premium', vehicleType: 'premium', price: 400, eta: '12 min', capacity: 4 },
        { vehicleName: 'Bike', vehicleType: 'bike', price: 50, eta: '3 min', capacity: 1 },
      ];
      setUniqueVehicleTypes(mockTypes);
      setSelectedVehicleType(mockTypes[0]);
    }
  }, [availableVehicles, pickup, destination, navigate, selectedVehicleType, setSelectedVehicleType]);

  const handleConfirm = () => {
    if (selectedVehicleType) {
      navigate('/driver-searching');
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col">
      {/* Map Background */}
      <div className="flex-1 relative">
        <MapComponent pickupLocation={pickup} destinationLocation={destination} />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-lg z-10 transition-transform active:scale-95"
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Bottom Sheet Options */}
      <div className="bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] z-20 flex flex-col h-[55%]">
        <div className="p-4 border-b border-gray-100 text-center relative flex-shrink-0">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />
          <h2 className="text-xl font-bold tracking-tight text-gray-900">Choose a ride</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {uniqueVehicleTypes.map((v, i) => (
            <VehicleCard 
              key={i}
              vehicle={v}
              price={v.price}
              eta={v.eta}
              isSelected={selectedVehicleType?.vehicleType === v.vehicleType}
              onClick={() => setSelectedVehicleType(v)}
            />
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 bg-white flex-shrink-0 text-center">
          <p className="text-xs text-gray-500 font-medium mb-3">We'll show the estimated fare before booking.</p>
          <button 
            className="btn-primary" 
            onClick={handleConfirm} 
            disabled={!selectedVehicleType}
          >
            Confirm {selectedVehicleType?.vehicleName || 'Ride'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideOptions;
