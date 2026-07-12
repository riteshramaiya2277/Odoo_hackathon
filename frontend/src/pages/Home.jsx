import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Navigation, MapPin, User, Truck, LayoutDashboard, Settings, Star, Zap, Shield, ArrowRight } from 'lucide-react';
import MapComponent from '../components/MapComponent';
import useAuth from '../hooks/useAuth';

const MobileSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const riderMenuItems = [
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Admin Dashboard', path: '/dashboard' },
    { icon: Truck, label: 'Vehicles', path: '/vehicles' },
  ];

  const menuItems = user?.role?.name === 'Admin' 
    ? [...adminMenuItems, ...riderMenuItems] 
    : riderMenuItems;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              {user ? user.fullName?.charAt(0) : 'U'}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{user?.fullName || 'User'}</div>
              <div className="text-xs text-gray-500">{user?.role?.name || 'Rider'}</div>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-2">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <item.icon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button
            onClick={() => {
              logout();
              navigate('/login');
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden flex flex-col">
      {/* Map Background */}
      <div className="absolute inset-0">
        <MapComponent />
      </div>

      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-[100]">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-white p-3 rounded-full shadow-lg transition-transform active:scale-95 hover:bg-gray-50"
        >
          <Menu className="w-6 h-6 text-black" />
        </button>
        
        <button
          onClick={() => navigate('/profile')}
          className="bg-white p-3 rounded-full shadow-lg transition-transform active:scale-95 hover:bg-gray-50"
        >
          <User className="w-6 h-6 text-black" />
        </button>
      </div>

      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end">
        {/* Bottom Sheet */}
        <div className="bottom-sheet flex flex-col">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
          
          {/* Hero Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user ? user.fullName?.split(' ')[0] : 'User'}!
            </h1>
            <p className="text-gray-600">Ready for your next ride?</p>
          </div>

          {/* Show admin quick links only if user is admin */}
          {user?.role?.name === 'Admin' && (
            <div className="flex justify-between items-start mb-6 px-2">
              {[
                { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
                { icon: Truck, label: 'Fleet', path: '/vehicles' },
                { icon: Settings, label: 'Settings', path: '/settings' },
              ].map((link, i) => (
                <button 
                  key={i} 
                  onClick={() => navigate(link.path)}
                  className="flex flex-col items-center gap-2 group focus:outline-none"
                >
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <link.icon className="w-6 h-6 text-black" />
                  </div>
                  <span className="text-xs font-semibold text-gray-600">{link.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Where To Button */}
          <div
            onClick={() => navigate('/search')}
            className="bg-black text-white rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:bg-gray-800 transition-colors mb-6 shadow-lg"
          >
            <Search className="w-6 h-6" />
            <span className="text-xl font-bold">Where to?</span>
            <ArrowRight className="w-5 h-5 ml-auto" />
          </div>

          {/* Current Location */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 mb-6 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="bg-blue-100 p-3 rounded-full">
              <Navigation className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg">Current Location</h3>
              <p className="text-sm text-gray-500">Pick up from here</p>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-4">
            <h3 className="font-bold text-gray-900 mb-4">Why choose us?</h3>
            <div className="grid grid-cols-3 gap-3">
              <FeatureCard 
                icon={Star}
                title="Rated 4.9"
                description="Best in class service"
              />
              <FeatureCard 
                icon={Zap}
                title="Quick Pickup"
                description="Arrives in minutes"
              />
              <FeatureCard 
                icon={Shield}
                title="Safe & Secure"
                description="Your safety first"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-400 pt-4">
            © 2024 TransitOps. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
