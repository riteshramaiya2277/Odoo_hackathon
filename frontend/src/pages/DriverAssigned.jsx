import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhone, FaCommentDots, FaShieldAlt, FaStar } from 'react-icons/fa';
import MapComponent from '../components/MapComponent';
import { BottomSheet } from '../components/BottomSheet';
import { Button } from '../components/UI';
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

  // Generate random OTP
  const otp = Math.floor(1000 + Math.random() * 9000);

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 relative">
        <MapComponent pickupLocation={pickup} destinationLocation={destination} />
      </div>

      <BottomSheet isOpen={true} onClose={() => {}}>
        <div className="text-center mb-4 border-b pb-4">
          <h2 className="text-2xl font-bold">Arriving in 5 mins</h2>
          <p className="text-gray-500">Please wait at the pickup location</p>
        </div>

        {/* Driver Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={`https://i.pravatar.cc/150?u=${assignedDriver.name}`} 
                alt={assignedDriver.name} 
                className="w-16 h-16 rounded-full border-2 border-gray-200"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-2 shadow flex items-center gap-1 text-xs font-bold">
                <FaStar className="text-yellow-400" />
                {Math.floor(assignedDriver.safetyScore / 20 * 10) / 10}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg">{assignedDriver.name}</h3>
              <p className="text-sm text-gray-500">{assignedDriver.licenseCategory} License</p>
            </div>
          </div>
          <div className="text-right">
            <h3 className="font-bold text-xl">{assignedVehicle?.registrationNumber}</h3>
            <p className="text-sm text-gray-500">{assignedVehicle?.vehicleName}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button className="flex-1 bg-gray-100 py-3 rounded-xl flex justify-center items-center gap-2 font-bold hover:bg-gray-200">
            <FaPhone /> Call
          </button>
          <button className="flex-1 bg-gray-100 py-3 rounded-xl flex justify-center items-center gap-2 font-bold hover:bg-gray-200">
            <FaCommentDots /> Message
          </button>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mb-6 border">
          <div>
            <p className="text-sm text-gray-500">OTP for start</p>
            <p className="text-2xl font-bold tracking-widest">{otp}</p>
          </div>
          <FaShieldAlt className="text-blue-500 text-3xl" />
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate('/home')}>Cancel</Button>
          <Button onClick={() => navigate('/tracking')}>Boarded</Button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default DriverAssigned;
