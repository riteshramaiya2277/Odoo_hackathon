import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import MapComponent from '../components/MapComponent';
import { VehicleCard } from '../components/VehicleCard';
import { Button } from '../components/UI';
import useTrip from '../hooks/useTrip';

const RideOptions = () => {
  const navigate = useNavigate();
  const { pickup, destination, availableVehicles, selectedVehicleType, setSelectedVehicleType } = useTrip();

  // Deduplicate vehicles by type to show options
  const [uniqueVehicleTypes, setUniqueVehicleTypes] = useState([]);

  useEffect(() => {
    if (!pickup || !destination) {
      navigate('/home');
      return;
    }

    if (availableVehicles.length > 0) {
      const types = [];
      const map = new Map();
      for (const item of availableVehicles) {
        if(!map.has(item.vehicleType)){
            map.set(item.vehicleType, true);
            types.push({
                ...item,
                // Mock dynamic pricing/eta based on max load
                price: Math.floor(item.maxLoadCapacity * 1.5 + 500),
                eta: Math.floor(Math.random() * 15 + 5) + ' min'
            });
        }
      }
      // Sort by price ascending
      types.sort((a,b) => a.price - b.price);
      setUniqueVehicleTypes(types);
      if(types.length > 0 && !selectedVehicleType) {
        setSelectedVehicleType(types[0]);
      }
    }
  }, [availableVehicles, pickup, destination, navigate, selectedVehicleType, setSelectedVehicleType]);

  const handleConfirm = () => {
    if (selectedVehicleType) {
      navigate('/searching');
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col">
      {/* Map Background */}
      <div className="flex-1 relative">
        <MapComponent pickupLocation={pickup} destinationLocation={destination} />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-md z-10"
        >
          <FaArrowLeft size={20} />
        </button>
      </div>

      {/* Bottom Sheet Options */}
      <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20 flex flex-col h-1/2">
        <div className="p-4 border-b text-center relative flex-shrink-0">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />
          <h2 className="text-xl font-bold">Choose a Vehicle</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {uniqueVehicleTypes.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Fetching available vehicles...
            </div>
          ) : (
            uniqueVehicleTypes.map((v, i) => (
              <VehicleCard 
                key={i}
                vehicle={v}
                price={v.price}
                eta={v.eta}
                isSelected={selectedVehicleType?.vehicleType === v.vehicleType}
                onClick={() => setSelectedVehicleType(v)}
              />
            ))
          )}
        </div>

        <div className="p-4 border-t bg-white flex-shrink-0">
          <Button onClick={handleConfirm} disabled={!selectedVehicleType}>
            Confirm {selectedVehicleType?.vehicleType || 'Vehicle'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RideOptions;
