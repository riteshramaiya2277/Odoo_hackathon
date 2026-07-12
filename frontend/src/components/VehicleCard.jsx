import React from 'react';

// Using a fallback image if we don't have real vehicle images
const getVehicleImage = (type) => {
  const images = {
    'Mini Truck': 'https://img.icons8.com/color/96/pickup.png',
    'Light Truck': 'https://img.icons8.com/color/96/truck.png',
    'Truck': 'https://img.icons8.com/color/96/semi-truck-side-view.png',
    'Heavy Truck': 'https://img.icons8.com/color/96/dump-truck.png',
    'Pickup': 'https://img.icons8.com/color/96/suv.png',
  };
  return images[type] || 'https://img.icons8.com/color/96/car.png';
};

export const VehicleCard = ({ vehicle, isSelected, onClick, price, eta }) => {
  return (
    <div 
      onClick={onClick}
      className={`p-4 border-2 rounded-xl mb-3 flex items-center justify-between cursor-pointer transition-all duration-200 ${
        isSelected ? 'border-black bg-gray-50 shadow-md' : 'border-transparent hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center gap-4">
        <img 
          src={getVehicleImage(vehicle.vehicleType)} 
          alt={vehicle.vehicleName} 
          className="w-16 h-16 object-contain"
        />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg">{vehicle.vehicleName}</h3>
            {/* Displaying max capacity as a badge */}
            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-700">
              {vehicle.maxLoadCapacity}kg
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {eta} • {vehicle.vehicleType}
          </p>
        </div>
      </div>
      <div className="text-right">
        <h3 className="font-bold text-lg">₹{price}</h3>
      </div>
    </div>
  );
};
