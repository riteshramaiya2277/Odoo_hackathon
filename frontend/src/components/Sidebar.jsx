import React from 'react';
import { FaUserCircle, FaHistory, FaCreditCard, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  const menuItems = [
    { icon: FaHistory, label: 'Trip History', path: '/history' },
    { icon: FaCreditCard, label: 'Wallet', path: '/wallet' },
    { icon: FaCog, label: 'Settings', path: '/settings' },
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
            className="fixed top-0 left-0 bottom-0 w-3/4 max-w-sm bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div 
              className="p-6 bg-black text-white flex items-center gap-4 cursor-pointer"
              onClick={() => { onClose(); navigate('/profile'); }}
            >
              <FaUserCircle size={50} />
              <div>
                <h2 className="text-xl font-bold">{user?.fullName || 'Guest User'}</h2>
                <p className="text-sm text-gray-300">{user?.role || 'Rider'}</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 py-4">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => { onClose(); navigate(item.path); }}
                  className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-100 transition-colors"
                >
                  <item.icon size={20} className="text-gray-600" />
                  <span className="text-lg font-medium text-gray-800">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-2 py-3 text-red-600 hover:bg-red-50 transition-colors rounded-lg"
              >
                <FaSignOutAlt size={20} />
                <span className="text-lg font-medium">Log out</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
