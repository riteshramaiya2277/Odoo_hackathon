
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MapPin, Home, Briefcase, Star, X } from 'lucide-react';

const SavedPlaces = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([
    { id: 1, name: 'Home', address: '123 Main St, New York, NY', type: 'home' },
    { id: 2, name: 'Work', address: '456 Business Ave, New York, NY', type: 'work' },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddPlace = (e) => {
    e.preventDefault();
    // In real app, this would save to backend
    alert('Place saved successfully!');
    setIsAddModalOpen(false);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'home': return <Home className="w-5 h-5" />;
      case 'work': return <Briefcase className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm z-20 sticky top-0">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 mr-4 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Saved Places</h1>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Plus className="w-6 h-6 text-black" />
        </button>
      </div>

      <div className="px-6 py-8">
        <div className="space-y-4">
          {places.map(place => (
            <div key={place.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                {getIcon(place.type)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{place.name}</h3>
                <p className="text-sm text-gray-500">{place.address}</p>
              </div>
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Add Place Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Add Saved Place</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddPlace} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Place Name</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="e.g. Gym" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="Enter address" />
              </div>
              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-gray-200 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save Place</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPlaces;
