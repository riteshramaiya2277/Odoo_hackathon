import React from 'react';
import { User } from 'lucide-react';

const getVehicleImage = (type) => {
  const t = type.toLowerCase();
  if (t.includes('economy') || t.includes('mini')) return 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100150ab/original/UberX.png';
  if (t.includes('comfort') || t.includes('light')) return 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569012915/assets/4f/599c47-7f5c-4544-a5d2-926babc8e113/original/UberXL.png';
  if (t.includes('premium') || t.includes('truck')) return 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/Black.png';
  if (t.includes('bike')) return 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1630531077/assets/3e/602333-6df8-4952-acc3-4e4f9b8c0bb4/original/UberMoto.png';
  
  return 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100150ab/original/UberX.png';
};

export const VehicleCard = ({ vehicle, isSelected, onClick, price, eta }) => {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl mb-3 flex items-center justify-between cursor-pointer transition-all duration-200 border-2 ${
        isSelected ? 'border-black bg-gray-50' : 'border-transparent hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-4">
        <img 
          src={getVehicleImage(vehicle.vehicleType || vehicle.vehicleName)} 
          alt={vehicle.vehicleName} 
          className="w-16 h-16 object-contain"
        />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg text-gray-900">{vehicle.vehicleName}</h3>
            <span className="flex items-center text-xs text-gray-600 font-medium">
              <User className="w-3 h-3 mr-0.5" />
              {vehicle.capacity || 4}
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            {eta} dropoff
          </p>
        </div>
      </div>
      <div className="text-right">
        <h3 className="font-semibold text-lg text-gray-900">₹{price}</h3>
      </div>
    </div>
  );
};
