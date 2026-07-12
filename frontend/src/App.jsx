import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaTruck, FaUserTie, FaRoute, FaTools, FaGasPump, FaChartLine } from 'react-icons/fa';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Drivers from './pages/Drivers';
import Trips from './pages/Trips';
import Maintenance from './pages/Maintenance';
import FuelExpenses from './pages/FuelExpenses';
import Reports from './pages/Reports';
import './App.css';

function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/vehicles', icon: FaTruck, label: 'Vehicles' },
    { path: '/drivers', icon: FaUserTie, label: 'Drivers' },
    { path: '/trips', icon: FaRoute, label: 'Trips' },
    { path: '/maintenance', icon: FaTools, label: 'Maintenance' },
    { path: '/fuel-expenses', icon: FaGasPump, label: 'Fuel & Expenses' },
    { path: '/reports', icon: FaChartLine, label: 'Reports' }
  ];

  return (
    <aside style={{ 
      width: '260px', 
      backgroundColor: 'var(--card-background)', 
      borderRight: '1px solid var(--border-color)', 
      height: '100vh', 
      position: 'fixed', 
      left: 0, 
      top: 0, 
      boxShadow: 'var(--shadow-md)' 
    }}>
      <div style={{ 
        padding: '1.5rem', 
        borderBottom: '1px solid var(--border-color)', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem' 
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          backgroundColor: 'var(--primary-color)', 
          borderRadius: '0.75rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'white' 
        }}>
          <FaTruck size={20} />
        </div>
        <h1 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-primary)' }}>TransitOps</h1>
      </div>
      <nav style={{ padding: '1rem' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                marginBottom: '0.25rem',
                borderRadius: '0.5rem',
                color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                fontWeight: isActive ? 600 : 400,
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--background-color)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ 
          marginLeft: '260px', 
          padding: '2rem', 
          width: 'calc(100% - 260px)', 
          minHeight: '100vh' 
        }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/fuel-expenses" element={<FuelExpenses />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
