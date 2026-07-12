import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';
import useAuth from './hooks/useAuth';

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
import Settings from './pages/Settings';

// User (Rider) Features (Uber-style)
import Home from './pages/Home';
import RideSearch from './pages/RideSearch';
import RideOptions from './pages/RideOptions';
import DriverSearching from './pages/DriverSearching';
import DriverAssigned from './pages/DriverAssigned';
import RideTracking from './pages/RideTracking';
import RideCompleted from './pages/RideCompleted';
import Profile from './pages/Profile';
import EditAccount from './pages/EditAccount';
import SavedPlaces from './pages/SavedPlaces';
import Payment from './pages/Payment';
import UserTrips from './pages/UserTrips';

// Protected Route Components
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role?.name !== 'Admin') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={user ? <Navigate to={user.role?.name === 'Admin' ? '/dashboard' : '/home'} replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/home" replace /> : <Register />} />

      {/* Protected User (Rider) Routes */}
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/search" element={
        <ProtectedRoute>
          <RideSearch />
        </ProtectedRoute>
      } />
      <Route path="/ride-options" element={
        <ProtectedRoute>
          <RideOptions />
        </ProtectedRoute>
      } />
      <Route path="/driver-searching" element={
        <ProtectedRoute>
          <DriverSearching />
        </ProtectedRoute>
      } />
      <Route path="/driver-assigned" element={
        <ProtectedRoute>
          <DriverAssigned />
        </ProtectedRoute>
      } />
      <Route path="/ride-tracking" element={
        <ProtectedRoute>
          <RideTracking />
        </ProtectedRoute>
      } />
      <Route path="/ride-completed" element={
        <ProtectedRoute>
          <RideCompleted />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/edit-account" element={
        <ProtectedRoute>
          <EditAccount />
        </ProtectedRoute>
      } />
      <Route path="/saved-places" element={
        <ProtectedRoute>
          <SavedPlaces />
        </ProtectedRoute>
      } />
      <Route path="/payment" element={
        <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      } />
      <Route path="/my-trips" element={
        <ProtectedRoute>
          <UserTrips />
        </ProtectedRoute>
      } />

      {/* Protected Admin Only Routes */}
      <Route element={
        <ProtectedRoute adminOnly={true}>
          <Layout />
        </ProtectedRoute>
      }>
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
      <Route path="/" element={
        <Navigate to={user ? (user.role?.name === 'Admin' ? '/dashboard' : '/home') : '/login'} replace />
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <Router>
          <AppRoutes />
        </Router>
      </TripProvider>
    </AuthProvider>
  );
}

export default App;
