import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaShareAlt } from 'react-icons/fa';
import MapComponent from '../components/MapComponent';
import { BottomSheet } from '../components/BottomSheet';
import { Button } from '../components/UI';
import useTrip from '../hooks/useTrip';

const RideTracking = () => {
  const navigate = useNavigate();
  const { assignedDriver, assignedVehicle, pickup, destination, setTripStatus } = useTrip();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!assignedDriver) {
      navigate('/home');
      return;
    }
    setTripStatus('active');

    // Simulate trip progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate('/completed');
          return 100;
        }
        return prev + 5;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [assignedDriver, navigate, setTripStatus]);

  if (!assignedDriver) return null;

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 relative">
        <MapComponent pickupLocation={pickup} destinationLocation={destination} />
      </div>

      <BottomSheet isOpen={true} onClose={() => {}}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">En Route to Destination</h2>
          <p className="text-gray-500">Drop-off at {destination}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between mb-6 pb-6 border-b">
          <div className="flex items-center gap-4">
             <img 
                src={`https://i.pravatar.cc/150?u=${assignedDriver.name}`} 
                alt={assignedDriver.name} 
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-bold">{assignedDriver.name}</h3>
                <p className="text-sm text-gray-500">{assignedVehicle?.registrationNumber}</p>
              </div>
          </div>
          <div className="flex gap-3">
             <button className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
               <FaShieldAlt />
             </button>
             <button className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
               <FaShareAlt />
             </button>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="primary" onClick={() => navigate('/completed')}>
            End Trip (Demo)
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default RideTracking;
