import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Star, Download } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <button className="btn-primary max-w-xs" onClick={() => navigate('/home')}>Go Home</button>
      </div>
    );
  }

  const fare = assignedVehicle?.price || 450;
  
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-center mt-12 mb-6">
          <CheckCircle2 className="w-20 h-20 text-black" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-center text-gray-900 mb-2">Trip completed</h1>
        <p className="text-center text-gray-500 font-medium mb-10">We hope you enjoyed your ride.</p>

        {/* Receipt Card */}
        <div className="bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100">
          <h2 className="text-sm uppercase tracking-wider font-bold text-gray-500 mb-4">Trip Summary</h2>
          <div className="flex justify-between mb-4">
            <span className="text-gray-500 font-medium">Route</span>
            <span className="font-semibold text-right text-gray-900 line-clamp-2 max-w-[60%]">{pickup} to {destination}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-500 font-medium">Vehicle</span>
            <span className="font-semibold text-gray-900">{assignedVehicle?.vehicleName || 'UberX'}</span>
          </div>
          <div className="flex justify-between mb-6">
            <span className="text-gray-500 font-medium">Driver</span>
            <span className="font-semibold text-gray-900">{assignedDriver?.name || 'John'}</span>
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
            <span className="text-gray-900 font-bold text-lg">Total</span>
            <span className="font-bold text-3xl tracking-tight text-gray-900">₹{fare}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="text-center">
          <h2 className="font-bold text-xl text-gray-900 mb-4">Rate your driver</h2>
          <div className="flex justify-center gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)} className="focus:outline-none transition-transform active:scale-90">
                <Star className={`w-10 h-10 ${star <= rating ? 'text-black fill-current' : 'text-gray-200'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 pb-4">
        <button className="flex items-center justify-center gap-2 text-gray-700 font-semibold py-2 hover:text-black transition-colors">
          <Download className="w-5 h-5" /> Download Receipt
        </button>
        <button className="btn-primary" onClick={handleDone}>Done</button>
      </div>
    </div>
  );
};

export default RideCompleted;
