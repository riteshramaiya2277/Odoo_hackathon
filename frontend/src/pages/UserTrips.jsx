
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';
import useTrip from '../hooks/useTrip';

const UserTrips = () => {
  const navigate = useNavigate();
  const { trips, tripsLoading } = useTrip();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-4 py-4 flex items-center shadow-sm z-20 sticky top-0">
        <button onClick={() => navigate(-1)} className="p-2 mr-4 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">My Trips</h1>
      </div>

      <div className="px-6 py-6">
        {tripsLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <Clock className="w-16 h-16 mx-auto text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips yet</h3>
            <p className="text-gray-500">Book your first ride to see your trip history here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trips.map((trip) => (
              <div key={trip._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      trip.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {trip.status.toUpperCase()}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(trip.startDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₹{trip.price}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <p className="text-sm text-gray-700">{trip.source}</p>
                  </div>
                  <div className="w-px h-4 bg-gray-200 ml-[7px]" />
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <p className="text-sm text-gray-700">{trip.destination}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
                  <p className="text-gray-600">
                    {trip.vehicle?.vehicleName || 'Vehicle'} • {trip.driver?.name || 'Driver'}
                  </p>
                  <p className="text-gray-500 text-xs">#{trip.tripNumber}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTrips;
