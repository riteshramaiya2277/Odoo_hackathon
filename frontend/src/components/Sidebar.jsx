import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Route, Truck,
  Users, Droplet, Wrench, FileText, Settings, LogOut, Navigation
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Truck, label: 'Vehicles', path: '/vehicles' },
    { icon: Users, label: 'Drivers', path: '/drivers' },
    { icon: Route, label: 'Trips', path: '/trips' },
    { icon: Wrench, label: 'Maintenance', path: '/maintenance' },
    { icon: Droplet, label: 'Fuel & Expenses', path: '/fuel' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-secondary text-white h-screen flex flex-col flex-shrink-0 shadow-xl">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800 bg-gray-900">
        <Navigation className="w-6 h-6 text-primary mr-3" />
        <h1 className="text-xl font-bold tracking-tight text-white">Transit<span className="text-primary">Ops</span></h1>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 hide-scrollbar">
        {menuItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                  ? 'bg-primary text-white font-semibold shadow-sm'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 border border-gray-600">
            <span className="font-bold text-white text-sm">
              {user ? user.fullName?.charAt(0) : 'U'}
            </span>
          </div>
          <div className="overflow-hidden text-left">
            <h3 className="text-sm font-semibold text-white truncate">{user?.fullName || 'Guest User'}</h3>
            <p className="text-xs text-gray-400 truncate">{user?.role?.name || 'Fleet Manager'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
};
