import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Navigation, MapPin, Truck, LayoutDashboard, Settings, MoreHorizontal } from 'lucide-react';
import MapComponent from '../components/MapComponent';
import { Sidebar } from '../components/Sidebar';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const quickLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Truck, label: 'Fleet', path: '/vehicles' },
    { icon: Settings, label: 'Maintenance', path: '/maintenance' },
    { icon: MoreHorizontal, label: 'More', action: () => setIsSidebarOpen(true) },
  ];

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden flex flex-col">
      {/* Map Background */}
      <div className="absolute inset-0">
        <MapComponent />
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 pointer-events-none">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-white p-3 rounded-full shadow-lg pointer-events-auto transition-transform active:scale-95"
        >
          <Menu className="w-6 h-6 text-black" />
        </button>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Bottom Sheet */}
      <div className="bottom-sheet flex flex-col">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
        
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Good {new Date().getHours() < 12 ? 'Morning' : 'Evening'}, {user ? user.fullName?.split(' ')[0] : 'User'}
          </h2>
        </div>

        {/* Fleet Quick Actions (Admin Mode) */}
        <div className="flex justify-between items-start mb-6 px-2">
          {quickLinks.map((link, i) => (
            <button 
              key={i} 
              onClick={() => link.path ? navigate(link.path) : link.action()}
              className="flex flex-col items-center gap-2 group focus:outline-none"
            >
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <link.icon className="w-6 h-6 text-black" />
              </div>
              <span className="text-xs font-semibold text-gray-600">{link.label}</span>
            </button>
          ))}
        </div>

        <div
          onClick={() => navigate('/search')}
          className="bg-gray-100 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-200 transition-colors mb-4"
        >
          <Search className="w-6 h-6 text-black" />
          <span className="text-xl font-bold text-gray-800">Where to?</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="bg-gray-200 p-2.5 rounded-full">
              <Navigation className="w-5 h-5 text-black" />
            </div>
            <div className="border-b border-gray-100 flex-1 pb-3">
              <h3 className="font-semibold text-gray-900 text-lg">Current Location</h3>
              <p className="text-sm text-gray-500">Pick up from here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
