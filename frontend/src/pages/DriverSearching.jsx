import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import useTrip from '../hooks/useTrip';

const DriverSearching = () => {
  const navigate = useNavigate();
  const { assignDriverAndVehicle, selectedVehicleType } = useTrip();

  useEffect(() => {
    const timer = setTimeout(() => {
      assignDriverAndVehicle();
      navigate('/driver-assigned');
    }, 3000);

    return () => clearTimeout(timer);
  }, [assignDriverAndVehicle, navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-8 left-0 right-0 flex justify-center">
        <div className="bg-gray-100 rounded-full px-4 py-2 shadow-sm flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-500 animate-pulse" />
          <span className="text-sm font-medium text-gray-700">Connecting...</span>
        </div>
      </div>

      <div className="relative w-40 h-40 mb-12">
        <motion.div
          animate={{ scale: [1, 1.6, 2.2], opacity: [0.3, 0.1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 bg-gray-400 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1.7], opacity: [0.5, 0.2, 0] }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 bg-gray-300 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full z-10 shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
            <div className="w-8 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">Looking for nearby drivers</h2>
      <p className="text-gray-500 text-center max-w-xs font-medium">
        We are finding the nearest {selectedVehicleType?.vehicleName || 'vehicle'} for you.
      </p>

      <div className="absolute bottom-10 left-6 right-6">
        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-black"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DriverSearching;
