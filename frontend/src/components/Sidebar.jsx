import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, LayoutDashboard, Route, Truck, 
  Users, Droplet, Wrench, FileText, LogOut 
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Route, label: 'Trips', path: '/trips' },
    { icon: Truck, label: 'Vehicles', path: '/vehicles' },
    { icon: Users, label: 'Drivers', path: '/drivers' },
    { icon: Droplet, label: 'Fuel Expenses', path: '/fuel' },
    { icon: Wrench, label: 'Maintenance', path: '/maintenance' },
    { icon: FileText, label: 'Reports', path: '/reports' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 bottom-0 w-3/4 max-w-sm bg-white z-50 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div 
              className="p-6 bg-black text-white flex items-center gap-4 cursor-pointer hover:bg-gray-900 transition-colors"
              onClick={() => { onClose(); navigate('/profile'); }}
            >
              <div className="bg-gray-800 p-2 rounded-full border-2 border-gray-700">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">{user?.fullName || 'Guest User'}</h2>
                <p className="text-sm font-medium text-gray-400">{user?.role || 'Admin / Rider'}</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 py-4 overflow-y-auto hide-scrollbar">
              <h3 className="px-6 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Fleet Management</h3>
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => { onClose(); navigate(item.path); }}
                  className="w-full flex items-center gap-4 px-6 py-3.5 text-left hover:bg-gray-50 transition-colors"
                >
                  <item.icon className="w-5 h-5 text-gray-600" />
                  <span className="text-base font-semibold text-gray-800">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors rounded-xl font-semibold"
              >
                <LogOut className="w-5 h-5" />
                <span>Log out</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
