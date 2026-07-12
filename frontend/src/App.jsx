import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';

// Pages
import Splash from './pages/Splash';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import RideSearch from './pages/RideSearch';
import RideOptions from './pages/RideOptions';
import DriverSearching from './pages/DriverSearching';
import DriverAssigned from './pages/DriverAssigned';
import RideTracking from './pages/RideTracking';
import RideCompleted from './pages/RideCompleted';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<RideSearch />} />
            <Route path="/options" element={<RideOptions />} />
            <Route path="/searching" element={<DriverSearching />} />
            <Route path="/assigned" element={<DriverAssigned />} />
            <Route path="/tracking" element={<RideTracking />} />
            <Route path="/completed" element={<RideCompleted />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </TripProvider>
    </AuthProvider>
  );
}

export default App;
