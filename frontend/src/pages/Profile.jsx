import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUserEdit, FaHistory, FaCreditCard, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white p-6 pt-12 pb-24 relative rounded-b-3xl">
        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 p-2">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-center text-xl font-bold">Profile</h1>
      </div>

      <div className="px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center mb-6">
          <img 
            src={`https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=random`} 
            alt="Profile" 
            className="w-24 h-24 rounded-full border-4 border-white shadow -mt-16 mb-4"
          />
          <h2 className="text-2xl font-bold">{user?.fullName || 'Guest User'}</h2>
          <p className="text-gray-500 mb-4">{user?.email || 'guest@example.com'}</p>
          <div className="flex gap-2">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">{user?.role || 'Rider'}</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">{user?.phone || 'No Phone'}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b flex items-center gap-4 cursor-pointer hover:bg-gray-50">
            <div className="bg-blue-50 p-3 rounded-full text-blue-600"><FaUserEdit size={20} /></div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">Edit Profile</h3>
            </div>
          </div>
          <div className="p-4 border-b flex items-center gap-4 cursor-pointer hover:bg-gray-50">
            <div className="bg-green-50 p-3 rounded-full text-green-600"><FaMapMarkerAlt size={20} /></div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">Saved Places</h3>
            </div>
          </div>
          <div className="p-4 border-b flex items-center gap-4 cursor-pointer hover:bg-gray-50">
            <div className="bg-purple-50 p-3 rounded-full text-purple-600"><FaCreditCard size={20} /></div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">Payment Methods</h3>
            </div>
          </div>
          <div className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50">
            <div className="bg-orange-50 p-3 rounded-full text-orange-600"><FaHistory size={20} /></div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">Ride History</h3>
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full bg-white text-red-500 font-bold p-4 rounded-2xl shadow-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
        >
          <FaSignOutAlt /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
