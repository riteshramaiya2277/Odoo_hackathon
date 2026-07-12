import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaCircle } from 'react-icons/fa';
import useTrip from '../hooks/useTrip';

const RideSearch = () => {
  const navigate = useNavigate();
  const { pickup, setPickup, destination, setDestination, fetchAvailableOptions } = useTrip();
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the destination input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = () => {
    if (pickup && destination) {
      fetchAvailableOptions();
      navigate('/options');
    } else {
      alert("Please enter both pickup and destination");
    }
  };

  const mockLocations = [
    { name: "Mumbai Port", address: "Mumbai, Maharashtra" },
    { name: "Pune MIDC", address: "Pune, Maharashtra" },
    { name: "Delhi Hub", address: "New Delhi, Delhi" },
    { name: "Bangalore IT Park", address: "Bangalore, Karnataka" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-4 flex items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 mr-2">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Plan Trip</h1>
      </div>

      {/* Search Inputs */}
      <div className="px-6 py-4 relative shadow-sm">
        <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gray-300"></div>
        
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <div className="bg-white p-1"><FaCircle size={12} className="text-gray-400" /></div>
          <input 
            type="text" 
            placeholder="Pickup location" 
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full bg-gray-100 p-3 rounded-lg outline-none focus:bg-gray-200 transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-white p-1"><FaMapMarkerAlt size={14} className="text-black" /></div>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Where to?" 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-gray-100 p-3 rounded-lg outline-none focus:bg-gray-200 transition-colors"
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6">
        <button 
          onClick={handleSearch}
          className="w-full bg-black text-white font-bold text-lg p-4 rounded-lg"
        >
          Find Vehicles
        </button>
      </div>

      {/* Suggested Locations */}
      <div className="px-6 mt-2">
        <h3 className="font-bold text-gray-500 mb-4">Suggested Terminals</h3>
        {mockLocations.map((loc, i) => (
          <div 
            key={i} 
            className="flex items-center gap-4 py-3 border-b cursor-pointer hover:bg-gray-50"
            onClick={() => {
              if (!pickup) setPickup(loc.name);
              else setDestination(loc.name);
            }}
          >
            <div className="bg-gray-200 p-2 rounded-full">
              <FaMapMarkerAlt className="text-gray-600" />
            </div>
            <div>
              <h4 className="font-bold">{loc.name}</h4>
              <p className="text-sm text-gray-500">{loc.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideSearch;
