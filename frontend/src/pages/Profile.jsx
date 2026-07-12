import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MapPin, CreditCard, Clock, LogOut, ChevronRight, Star } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-4 py-4 flex items-center shadow-sm z-20 sticky top-0">
        <button onClick={() => navigate(-1)} className="p-2 mr-4 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Account</h1>
      </div>

      <div className="px-6 py-8">
        <div className="flex items-center gap-6 mb-10">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random&size=200`}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover shadow-sm"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{user?.name || 'Guest User'}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-semibold text-gray-600 uppercase tracking-wide">
                <Star className="w-3 h-3 inline-block mr-1 text-black fill-current" /> 5.0
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div onClick={() => navigate('/edit-account')} className="p-5 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <User className="w-6 h-6 text-black" />
              <h3 className="font-semibold text-gray-900 text-lg">Edit Account</h3>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div onClick={() => navigate('/saved-places')} className="p-5 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-black" />
              <h3 className="font-semibold text-gray-900 text-lg">Saved Places</h3>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div onClick={() => navigate('/payment')} className="p-5 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <CreditCard className="w-6 h-6 text-black" />
              <h3 className="font-semibold text-gray-900 text-lg">Payment</h3>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div onClick={() => navigate('/my-trips')} className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <Clock className="w-6 h-6 text-black" />
              <h3 className="font-semibold text-gray-900 text-lg">Trips</h3>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-white text-black border border-gray-200 font-semibold p-4 rounded-xl shadow-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors active:scale-[0.98]"
        >
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
