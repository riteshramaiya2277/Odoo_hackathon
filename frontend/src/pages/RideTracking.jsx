import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Share, Navigation } from 'lucide-react';
import MapComponent from '../components/MapComponent';
import useTrip from '../hooks/useTrip';

const RideTracking = () => {
  const navigate = useNavigate();
  const { assignedDriver, assignedVehicle, pickup, destination, setTripStatus } = useTrip();
  const [progress, setProgress] = useState(0);
  const [etaMinutes, setEtaMinutes] = useState(15);

  useEffect(() => {
    if (!assignedDriver) {
      navigate('/home');
      return;
    }
    setTripStatus('active');

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate('/completed');
          return 100;
        }
        return prev + 5;
      });
      setEtaMinutes((prev) => Math.max(1, prev - 1));
    }, 1500);

    return () => clearInterval(interval);
  }, [assignedDriver, navigate, setTripStatus]);

  if (!assignedDriver) return null;

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col overflow-hidden">
      <div className="flex-1 relative">
        <MapComponent pickupLocation={pickup} destinationLocation={destination} />
        
        {/* Floating ETA Card */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-3 z-10 flex flex-col items-center border border-gray-100">
          <span className="text-xl font-bold text-gray-900 tracking-tight">{etaMinutes} min</span>
          <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">to destination</span>
        </div>
      </div>

      <div className="bottom-sheet h-[45%] flex flex-col">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="text-center mb-6 px-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Trip in progress</h2>
          <p className="text-gray-500 font-medium truncate mt-1">{destination || 'Your destination'}</p>
        </div>

        {/* Progress Bar */}
        <div className="px-6 mb-6">
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-black h-full rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100 px-4">
          <div className="flex items-center gap-4">
             <img 
                src={`https://i.pravatar.cc/150?u=${assignedDriver.name}`} 
                alt={assignedDriver.name} 
                className="w-14 h-14 rounded-full object-cover shadow-sm"
              />
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{assignedDriver.name}</h3>
                <p className="text-sm font-medium text-gray-500">{assignedVehicle?.registrationNumber || 'MH12 AB 1234'}</p>
              </div>
          </div>
          <div className="flex gap-2">
             <button className="p-3.5 bg-gray-50 rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
               <Shield className="w-5 h-5" />
             </button>
             <button className="p-3.5 bg-gray-50 rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
               <Share className="w-5 h-5" />
             </button>
          </div>
        </div>

        <div className="px-4 mt-auto">
          <button 
            className="w-full bg-gray-100 text-red-600 font-semibold py-4 rounded-xl flex items-center justify-center transition-all hover:bg-red-50 active:scale-[0.98]"
            onClick={() => navigate('/home')}
          >
            Cancel Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideTracking;
