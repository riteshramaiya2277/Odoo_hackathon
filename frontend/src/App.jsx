import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';

// Layout
import { Layout } from './components/Layout';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Fleet & Admin Features (TransitOps)
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import Drivers from './pages/Drivers';
import FuelExpenses from './pages/FuelExpenses';
import Maintenance from './pages/Maintenance';
import Reports from './pages/Reports';
import Trips from './pages/Trips';
import Vehicles from './pages/Vehicles';
import Settings from './pages/Settings'; // Assuming we'll need this soon, or it can be a dummy page for now

function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <Router>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected SaaS Layout Routes */}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-trip" element={<CreateTrip />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/fuel" element={<FuelExpenses />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </TripProvider>
    </AuthProvider>
  );
}

export default App;
