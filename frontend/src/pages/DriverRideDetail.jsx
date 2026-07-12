
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle, Clock, User } from 'lucide-react';
import useTrip from '../hooks/useTrip';

const DriverRideDetail = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const { driverTrips, acceptTrip, startTrip, completeTrip, fetchDriverTrips } = useTrip();
  const [loading, setLoading] = useState(false);

  const trip = driverTrips.find(t => t._id === tripId);

  useEffect(() => {
    if (!trip) {
      fetchDriverTrips();
    }
  }, [trip, fetchDriverTrips]);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading ride details...</div>
      </div>
    );
  }

  const handleAccept = async () => {
    setLoading(true);
    try {
      await acceptTrip(tripId);
    } catch (error) {
      alert('Failed to accept ride');
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      await startTrip(tripId);
    } catch (error) {
      alert('Failed to start ride');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      await completeTrip(tripId);
      navigate('/driver');
    } catch (error) {
      alert('Failed to complete ride');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-4 py-4 flex items-center gap-3 shadow-sm z-20 sticky top-0">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Ride Details</h1>
      </div>

      <div className="px-4 py-4 flex-1">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">{trip.driver?.name || 'Rider'}</h2>
              <p className="text-sm text-gray-500">Rating: 4.8 ★</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">₹{trip.price || '200'}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-green-600 mt-1" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-500 uppercase">Pickup</div>
                <div className="text-gray-900 font-medium">{trip.source}</div>
              </div>
            </div>
            <div className="w-0.5 h-6 bg-gray-300 ml-2" />
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-600 mt-1" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-500 uppercase">Destination</div>
                <div className="text-gray-900 font-medium">{trip.destination}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-gray-500" />
            <div className="text-sm font-semibold text-gray-700">Ride Status</div>
          </div>
          <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${
            trip.status === 'requested' ? 'bg-yellow-100 text-yellow-700' :
            trip.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
            trip.status === 'in-progress' ? 'bg-purple-100 text-purple-700' :
            'bg-green-100 text-green-700'
          }`}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        {trip.status === 'requested' && (
          <button
            onClick={handleAccept}
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold p-4 rounded-xl shadow-sm flex items-center justify-center gap-2 hover:bg-green-700 transition-colors active:scale-[0.98] disabled:opacity-50"
          >
            <CheckCircle className="w-5 h-5" /> {loading ? 'Accepting...' : 'Accept Ride'}
          </button>
        )}
        {trip.status === 'accepted' && (
          <button
            onClick={handleStart}
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold p-4 rounded-xl shadow-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors active:scale-[0.98] disabled:opacity-50"
          >
            <MapPin className="w-5 h-5" /> {loading ? 'Starting...' : 'Start Ride'}
          </button>
        )}
        {trip.status === 'in-progress' && (
          <button
            onClick={handleComplete}
            disabled={loading}
            className="w-full bg-purple-600 text-white font-semibold p-4 rounded-xl shadow-sm flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors active:scale-[0.98] disabled:opacity-50"
          >
            <CheckCircle className="w-5 h-5" /> {loading ? 'Completing...' : 'Complete Ride'}
          </button>
        )}
        {trip.status === 'completed' && (
          <button
            onClick={() => navigate('/driver')}
            className="w-full bg-gray-600 text-white font-semibold p-4 rounded-xl shadow-sm flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors active:scale-[0.98]"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default DriverRideDetail;
