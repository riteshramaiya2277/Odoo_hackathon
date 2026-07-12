import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaCheckCircle, FaFileDownload } from 'react-icons/fa';
import { Button } from '../components/UI';
import useTrip from '../hooks/useTrip';

const RideCompleted = () => {
  const navigate = useNavigate();
  const { assignedDriver, assignedVehicle, pickup, destination, resetTrip } = useTrip();
  const [rating, setRating] = useState(0);

  const handleDone = () => {
    resetTrip();
    navigate('/home');
  };

  if (!assignedDriver) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => navigate('/home')}>Go Home</Button>
      </div>
    );
  }

  // Calculate some fake stats based on max load
  const fare = Math.floor(assignedVehicle.maxLoadCapacity * 1.5 + 500);
  
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-center mt-12 mb-6">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">Trip Completed</h1>
        <p className="text-center text-gray-500 mb-8">You have reached your destination</p>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Trip Summary</h2>
          <div className="flex justify-between mb-3">
            <span className="text-gray-500">Route</span>
            <span className="font-medium text-right">{pickup} <br/> to <br/> {destination}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-500">Vehicle</span>
            <span className="font-medium">{assignedVehicle.vehicleName} ({assignedVehicle.registrationNumber})</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-500">Driver</span>
            <span className="font-medium">{assignedDriver.name}</span>
          </div>
          <div className="border-t pt-3 mt-3 flex justify-between">
            <span className="text-gray-800 font-bold">Total Fare</span>
            <span className="font-bold text-xl">₹{fare}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <h2 className="font-bold mb-4">Rate your driver</h2>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)}>
                <FaStar size={32} className={star <= rating ? 'text-yellow-400' : 'text-gray-200'} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <button className="flex items-center justify-center gap-2 text-blue-600 font-bold py-2">
          <FaFileDownload /> Download Receipt
        </button>
        <Button onClick={handleDone}>Back to Home</Button>
      </div>
    </div>
  );
};

export default RideCompleted;
