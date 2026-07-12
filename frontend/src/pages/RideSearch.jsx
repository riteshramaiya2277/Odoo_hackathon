import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search } from 'lucide-react';
import useTrip from '../hooks/useTrip';

const RideSearch = () => {
  const navigate = useNavigate();
  const { pickup, setPickup, destination, setDestination, fetchAvailableOptions } = useTrip();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = () => {
    if (pickup && destination) {
      fetchAvailableOptions();
      navigate('/ride-options');
    } else {
      alert("Please enter both pickup and destination");
    }
  };

  const mockLocations = [
    { name: "Home", address: "123 Main St, New York" },
    { name: "Work", address: "456 Tech Park, New York" },
    { name: "JFK Airport", address: "Queens, NY" },
    { name: "Central Park", address: "Manhattan, NY" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center shadow-sm z-20">
        <button onClick={() => navigate(-1)} className="p-2 mr-4 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Plan your ride</h1>
      </div>

      {/* Search Inputs */}
      <div className="bg-white px-6 pb-6 shadow-sm z-10 relative">
        <div className="absolute left-9 top-6 bottom-8 w-[2px] bg-gray-200"></div>
        
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <div className="bg-gray-200 p-1 rounded-full border-4 border-white"><div className="w-2 h-2 bg-black rounded-full" /></div>
          <div className="flex-1 bg-gray-100 rounded-xl flex items-center px-4 py-3 focus-within:ring-2 focus-within:ring-black transition-all">
            <input 
              type="text" 
              placeholder="Choose your pickup point" 
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500 font-medium"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-black p-1 rounded-sm border-4 border-white"><div className="w-2 h-2 bg-white" /></div>
          <div className="flex-1 bg-gray-100 rounded-xl flex items-center px-4 py-3 focus-within:ring-2 focus-within:ring-black transition-all">
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Where to?" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Suggested Locations */}
      <div className="flex-1 bg-white mt-2 px-6 py-4 overflow-y-auto">
        <h3 className="font-semibold text-gray-900 mb-4 text-lg">Recent places</h3>
        <div className="flex flex-col">
          {mockLocations.map((loc, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => {
                if (!pickup) setPickup(loc.name);
                else setDestination(loc.name);
              }}
            >
              <div className="bg-gray-100 p-3 rounded-full">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg">{loc.name}</h4>
                <p className="text-sm text-gray-500 line-clamp-1">{loc.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4 bg-white border-t border-gray-100">
        <button 
          onClick={handleSearch}
          className="btn-primary"
        >
          Confirm Route
        </button>
      </div>
    </div>
  );
};

export default RideSearch;
