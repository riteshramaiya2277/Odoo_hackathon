
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle, Clock, LogOut } from 'lucide-react';
import useTrip from '../hooks/useTrip';
import useAuth from '../hooks/useAuth';

const DriverDashboard = () => {
  const navigate = useNavigate();
  const { driverTrips, driverTripsLoading, fetchDriverTrips } = useTrip();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const requestedTrips = driverTrips.filter(trip => trip.status === 'requested');
  const activeTrips = driverTrips.filter(trip => ['accepted', 'in-progress'].includes(trip.status));
  const completedTrips = driverTrips.filter(trip => trip.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm z-20 sticky top-0">
        <h1 className="text-xl font-bold tracking-tight">Driver Dashboard</h1>
        <button onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <LogOut className="w-6 h-6" />
        </button>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-gray-900">{requestedTrips.length}</div>
            <div className="text-sm text-gray-500">Requested</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-blue-600">{activeTrips.length}</div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-green-600">{completedTrips.length}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5" /> Available Rides
          </h2>
          {driverTripsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : requestedTrips.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-gray-500">No available rides right now</div>
            </div>
          ) : (
            <div className="space-y-3">
              {requestedTrips.map(trip => (
                <div key={trip._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/driver/ride/${trip._id}`)}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">{trip.source}</span>
                          <div className="w-4 h-0.5 border-l border-dashed border-gray-400 my-1 ml-1"></div>
                          <span className="text-sm font-semibold text-gray-900">{trip.destination}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{formatDate(trip.startDate)}</span>
                        <span className="text-sm font-bold text-green-600">₹{trip.price || '200'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {activeTrips.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" /> Active Rides
            </h2>
            <div className="space-y-3">
              {activeTrips.map(trip => (
                <div key={trip._id} className="bg-white rounded-xl shadow-sm border border-blue-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/driver/ride/${trip._id}`)}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">{trip.source}</span>
                          <div className="w-4 h-0.5 border-l border-dashed border-gray-400 my-1 ml-1"></div>
                          <span className="text-sm font-semibold text-gray-900">{trip.destination}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          trip.status === 'accepted' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {trip.status === 'accepted' ? 'Accepted' : 'In Progress'}
                        </span>
                        <span className="text-sm font-bold text-green-600">₹{trip.price || '200'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {completedTrips.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" /> Completed Rides
            </h2>
            <div className="space-y-3">
              {completedTrips.slice(0, 5).map(trip => (
                <div key={trip._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">{trip.source}</span>
                          <div className="w-4 h-0.5 border-l border-dashed border-gray-400 my-1 ml-1"></div>
                          <span className="text-sm font-semibold text-gray-900">{trip.destination}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{formatDate(trip.startDate)}</span>
                        <span className="text-sm font-bold text-green-600">₹{trip.price || '200'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
