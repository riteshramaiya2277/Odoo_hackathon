import React from 'react';

const MapComponent = ({ pickupLocation, destinationLocation }) => {
  return (
    <div className="absolute inset-0 z-0 bg-gray-200">
      <div 
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')`,
          filter: 'grayscale(100%) opacity(70%)'
        }}
      />
      {/* Decorative center marker */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-4 h-4 bg-black rounded-full border-2 border-white shadow-lg animate-pulse" />
      </div>
    </div>
  );
};

export default React.memo(MapComponent);
