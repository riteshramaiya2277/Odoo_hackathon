import { useContext } from 'react';
import { TripContext } from '../context/TripContext';

const useTrip = () => {
  return useContext(TripContext);
};

export default useTrip;
