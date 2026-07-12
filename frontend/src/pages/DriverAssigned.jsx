import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, ShieldCheck, Star } from 'lucide-react';
import MapComponent from '../components/MapComponent';
import useTrip from '../hooks/useTrip';

const DriverAssigned = () => {
  const navigate = useNavigate();
  const { assignedDriver, assignedVehicle, pickup, destination } = useTrip();

  useEffect(() => {
    if (!assignedDriver) {
      navigate('/home');
    }
  }, [assignedDriver, navigate]);

  if (!assignedDriver) return null;

  const otp = Math.floor(1000 + Math.random() * 9000);

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 relative">
        <MapComponent pickupLocation={pickup} destinationLocation={destination} />
      </div>

      {/* Bottom Sheet */}
      <div className="bottom-sheet h-auto max-h-[75%] overflow-y-auto">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Arriving in 3 mins</h2>
          <p className="text-gray-500 font-medium mt-1">Please meet your driver at the pickup point</p>
        </div>

        {/* Driver Info */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl mb-4 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={`https://i.pravatar.cc/150?u=${assignedDriver.name}`} 
                alt={assignedDriver.name} 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-2 py-0.5 shadow-sm border border-gray-100 flex items-center gap-1 text-xs font-bold">
                {Math.floor(assignedDriver.safetyScore / 20 * 10) / 10 || "4.9"}
                <Star className="w-3 h-3 text-black fill-current" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">{assignedDriver.name}</h3>
              <p className="text-sm text-gray-500 font-medium">{assignedVehicle?.vehicleName || 'Toyota Prius'}</p>
            </div>
          </div>
          <div className="text-right">
            <h3 className="font-bold text-2xl tracking-wider text-gray-900">{assignedVehicle?.registrationNumber || 'MH12 AB 1234'}</h3>
            <p className="text-sm text-gray-500 font-medium">License Plate</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <button className="flex-1 bg-gray-100 py-3.5 rounded-xl flex justify-center items-center gap-2 font-semibold text-gray-900 hover:bg-gray-200 transition-colors active:scale-95">
            <Phone className="w-5 h-5" /> Call
          </button>
          <button className="flex-1 bg-gray-100 py-3.5 rounded-xl flex justify-center items-center gap-2 font-semibold text-gray-900 hover:bg-gray-200 transition-colors active:scale-95">
            <MessageCircle className="w-5 h-5" /> Message
          </button>
        </div>

        {/* PIN Code */}
        <div className="flex justify-between items-center px-4 py-3 mb-6 border-l-4 border-black">
          <div>
            <p className="text-sm text-gray-500 font-medium">Provide this PIN to your driver</p>
            <p className="text-3xl font-bold tracking-[0.2em] text-gray-900 mt-1">{otp}</p>
          </div>
          <ShieldCheck className="w-8 h-8 text-black opacity-80" />
        </div>

        <div className="flex gap-4">
          <button 
            className="flex-1 btn-secondary"
            onClick={() => navigate('/home')}
          >
            Cancel Trip
          </button>
          <button 
            className="flex-1 btn-primary"
            onClick={() => navigate('/ride-tracking')}
          >
            Start Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverAssigned;
