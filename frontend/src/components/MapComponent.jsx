import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const defaultCenter = {
  lat: 19.0760, // Mumbai coordinates
  lng: 72.8777
};

const MapComponent = ({ pickupLocation, destinationLocation, showDirections }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "" // Empty string will show development map
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // In a real app, you would use DirectionsService to get the route based on pickup/destination
  // For this demo, we just show markers if provided

  return isLoaded ? (
    <div className="absolute inset-0 z-0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {pickupLocation && <Marker position={defaultCenter} label="P" />}
        {/* Mocking route/destination for demo */}
      </GoogleMap>
    </div>
  ) : <div className="absolute inset-0 z-0 bg-gray-200 animate-pulse flex items-center justify-center">Loading Map...</div>;
};

export default React.memo(MapComponent);
