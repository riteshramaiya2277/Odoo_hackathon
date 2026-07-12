import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa';
import MapComponent from '../components/MapComponent';
import { Sidebar } from '../components/Sidebar';
import { BottomSheet } from '../components/BottomSheet';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden">
      <MapComponent />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 pointer-events-none">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-white p-3 rounded-full shadow-md pointer-events-auto"
        >
          <FaBars size={20} />
        </button>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Bottom Sheet for Search */}
      <BottomSheet isOpen={true} onClose={() => { }}>
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold">Good {new Date().getHours() < 12 ? 'Morning' : 'Evening'}, {user ? user.fullName.split(' ')[0] : 'User'}</h2>
          <p className="text-gray-500 text-sm">Where to ship today?</p>
        </div>

        <div
          onClick={() => navigate('/search')}
          className="bg-gray-100 rounded-xl p-4 flex items-center gap-3 cursor-pointer shadow-inner"
        >
          <FaSearch className="text-gray-500" />
          <span className="text-xl font-bold text-gray-700">Enter destination</span>
        </div>

        <div className="mt-6 flex items-center gap-4 border-b pb-4 cursor-pointer">
          <div className="bg-gray-200 p-3 rounded-full">
            <FaLocationArrow className="text-black" />
          </div>
          <div>
            <h3 className="font-bold">Current Location</h3>
            <p className="text-sm text-gray-500">Pick up from here</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 cursor-pointer">
          <div className="bg-gray-200 p-3 rounded-full">
            <FaMapMarkerAlt className="text-black" />
          </div>
          <div>
            <h3 className="font-bold">Recent: Pune Hub</h3>
            <p className="text-sm text-gray-500">Maharashtra, India</p>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default Home;
