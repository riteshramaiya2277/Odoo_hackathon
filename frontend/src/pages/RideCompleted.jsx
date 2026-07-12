import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Star, Download } from 'lucide-react';
import useTrip from '../hooks/useTrip';
import { Button } from '../components/UI';

const RideCompleted = () => {
  const navigate = useNavigate();
  const { assignedDriver, assignedVehicle, pickup, destination, resetTrip, addTrip } = useTrip();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);

  const handleDone = async () => {
    setSaving(true);
    try {
      // Create new trip
      const tripData = {
        tripNumber: `TRIP-${Date.now().toString().slice(-6)}`,
        source: pickup,
        destination: destination,
        vehicle: assignedVehicle,
        driver: assignedDriver,
        price: assignedVehicle?.price || 450,
        status: 'completed'
      };
      await addTrip(tripData);
      resetTrip();
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('Failed to save trip');
      resetTrip();
      navigate('/home');
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadReceipt = () => {
    // Create a simple receipt as a text file for demo purposes
    const receiptText = `
TRANSITOPS RIDE RECEIPT
------------------------
Route: ${pickup} to ${destination}
Driver: ${assignedDriver?.name || 'N/A'}
Vehicle: ${assignedVehicle?.vehicleName || 'N/A'}
Total Fare: ₹${assignedVehicle?.price || 450}
Rating Given: ${rating} stars
Feedback: ${feedback || 'No feedback provided'}
------------------------
Thank you for riding with us!
    `.trim();

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transitops-ride-receipt.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!assignedDriver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Button onClick={() => navigate('/home')} className="max-w-xs">Go Home</Button>
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
          {/* Optional Feedback */}
          <div className="mt-4">
            <textarea
              placeholder="Any feedback for your ride?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 resize-none focus:ring-2 focus:ring-black outline-none transition-all"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 pb-4">
        <button 
          onClick={handleDownloadReceipt}
          className="flex items-center justify-center gap-2 text-gray-700 font-semibold py-2 hover:text-black transition-colors"
        >
          <Download className="w-5 h-5" /> Download Receipt
        </button>
        <Button onClick={handleDone} disabled={saving}>
          {saving ? 'Saving...' : 'Done'}
        </Button>
      </div>
    </div>
  );
};

export default RideCompleted;
