import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, Home, Briefcase, Clock, X, Map } from 'lucide-react';
import useTrip from '../hooks/useTrip';

const RideSearch = () => {
  const navigate = useNavigate();
  const { pickup, setPickup, destination, setDestination, fetchAvailableOptions } = useTrip();
  const inputRef = useRef(null);
  const [activeInput, setActiveInput] = useState('destination');

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
    { name: "Home", address: "123 Main St, New York", icon: Home },
    { name: "Work", address: "456 Tech Park, New York", icon: Briefcase },
    { name: "JFK Airport", address: "Queens, NY", icon: MapPin },
    { name: "Central Park", address: "Manhattan, NY", icon: Map },
  ];

  const quickSuggestions = [
    { name: "Times Square", address: "Midtown Manhattan, NY" },
    { name: "Brooklyn Bridge", address: "Brooklyn, NY" },
    { name: "Empire State Building", address: "350 5th Ave, NY" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-100 z-20">
        <button onClick={() => navigate(-1)} className="p-2 mr-3 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-xl font-bold tracking-tight text-gray-900">Plan your ride</h1>
      </div>

      {/* Search Inputs */}
      <div className="bg-white px-6 py-6 relative">
        <div className="absolute left-11 top-9 bottom-10 w-[2px] bg-gray-200"></div>
        
        {/* Pickup Input */}
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <div className="bg-blue-100 p-2 rounded-full border-4 border-white">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
          </div>
          <div className={`flex-1 rounded-xl flex items-center px-4 py-3 transition-all ${activeInput === 'pickup' ? 'bg-blue-50 ring-2 ring-blue-500' : 'bg-gray-100'}`} onClick={() => setActiveInput('pickup')}>
            <input 
              type="text" 
              placeholder="Choose your pickup point" 
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onFocus={() => setActiveInput('pickup')}
              className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500 font-medium"
            />
            {pickup && (
              <button onClick={(e) => { e.stopPropagation(); setPickup(''); }} className="p-1 hover:bg-gray-200 rounded-full">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>
        
        {/* Destination Input */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-black p-2 rounded-sm border-4 border-white">
            <div className="w-2 h-2 bg-white" />
          </div>
          <div className={`flex-1 rounded-xl flex items-center px-4 py-3 transition-all ${activeInput === 'destination' ? 'bg-gray-50 ring-2 ring-gray-300' : 'bg-gray-100'}`} onClick={() => setActiveInput('destination')}>
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Where to?" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => setActiveInput('destination')}
              className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500 font-medium"
            />
            {destination && (
              <button onClick={(e) => { e.stopPropagation(); setDestination(''); }} className="p-1 hover:bg-gray-200 rounded-full">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Locations */}
      <div className="flex-1 bg-gray-50 px-6 py-6 overflow-y-auto">
        {/* Saved Places */}
        <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Saved places
        </h3>
        <div className="flex flex-col gap-2 mb-6">
          {mockLocations.map((loc, i) => {
            const Icon = loc.icon;
            return (
              <div 
                key={i} 
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 cursor-pointer hover:shadow-md transition-all"
                onClick={() => {
                  if (activeInput === 'pickup') setPickup(loc.name);
                  else setDestination(loc.name);
                }}
              >
                <div className="bg-gray-100 p-3 rounded-full">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{loc.name}</h4>
                  <p className="text-sm text-gray-500 line-clamp-1">{loc.address}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Suggestions */}
        <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
          <Search className="w-5 h-5" />
          Popular spots
        </h3>
        <div className="flex flex-col gap-2">
          {quickSuggestions.map((loc, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 cursor-pointer hover:shadow-md transition-all"
              onClick={() => {
                if (activeInput === 'pickup') setPickup(loc.name);
                else setDestination(loc.name);
              }}
            >
              <div className="bg-blue-50 p-3 rounded-full">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{loc.name}</h4>
                <p className="text-sm text-gray-500 line-clamp-1">{loc.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 bg-white border-t border-gray-100">
        <button 
          onClick={handleSearch}
          className="btn-primary w-full py-4 text-lg"
        >
          Confirm Route
        </button>
      </div>
    </div>
  );
};

export default RideSearch;
