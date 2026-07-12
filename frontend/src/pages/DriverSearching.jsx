import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useTrip from '../hooks/useTrip';

const DriverSearching = () => {
  const navigate = useNavigate();
  const { assignDriverAndVehicle, selectedVehicleType } = useTrip();

  useEffect(() => {
    // Simulate searching delay
    const timer = setTimeout(() => {
      assignDriverAndVehicle();
      navigate('/assigned');
    }, 3000);

    return () => clearTimeout(timer);
  }, [assignDriverAndVehicle, navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="relative w-48 h-48 mb-8">
        {/* Pulse effect */}
        <motion.div
          animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 bg-blue-500 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1.5], opacity: [0.8, 0.4, 0] }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 bg-blue-400 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full z-10 shadow-lg">
          <img
            src="https://img.icons8.com/color/96/truck.png"
            alt="Vehicle"
            className="w-20 h-20 object-contain"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2">Connecting you to a driver</h2>
      <p className="text-gray-500 text-center max-w-xs">
        We are finding the nearest {selectedVehicleType?.vehicleType || 'vehicle'} for your route.
      </p>

      <div className="mt-12 w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-black"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default DriverSearching;
