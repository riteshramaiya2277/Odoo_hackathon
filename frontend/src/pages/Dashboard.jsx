import { useState, useEffect } from 'react';
import { FaTruck, FaTruckMoving, FaWrench, FaRoute, FaClipboardList, FaUserTie, FaChartPie } from 'react-icons/fa';
import apiClient from '../api/axiosClient';

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesRes, driversRes, tripsRes] = await Promise.all([
          apiClient.get('/vehicles'),
          apiClient.get('/drivers'),
          apiClient.get('/trips')
        ]);
        setVehicles(vehiclesRes.data);
        setDrivers(driversRes.data);
        setTrips(tripsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Loading...</div>
      </div>
    );
  }

  const activeVehicles = vehicles.filter(v => v.status === 'On Trip').length;
  const availableVehicles = vehicles.filter(v => v.status === 'Available').length;
  const inMaintenanceVehicles = vehicles.filter(v => v.status === 'In Shop').length;
  const activeTrips = trips.filter(t => t.tripStatus === 'Dispatched').length;
  const pendingTrips = trips.filter(t => t.tripStatus === 'Draft').length;
  const driversOnDuty = drivers.filter(d => d.status === 'On Trip').length;
  const totalActiveVehicles = vehicles.filter(v => v.status !== 'Retired').length;
  const fleetUtilization = totalActiveVehicles > 0 ? Math.round((activeVehicles / totalActiveVehicles) * 100) : 0;

  const stats = [
    { label: 'Active Vehicles', value: activeVehicles, icon: FaTruckMoving, color: 'var(--primary-color)' },
    { label: 'Available Vehicles', value: availableVehicles, icon: FaTruck, color: 'var(--success-color)' },
    { label: 'Vehicles in Maintenance', value: inMaintenanceVehicles, icon: FaWrench, color: 'var(--warning-color)' },
    { label: 'Active Trips', value: activeTrips, icon: FaRoute, color: 'var(--primary-color)' },
    { label: 'Pending Trips', value: pendingTrips, icon: FaClipboardList, color: 'var(--secondary-color)' },
    { label: 'Drivers On Duty', value: driversOnDuty, icon: FaUserTie, color: 'var(--primary-color)' },
    { label: 'Fleet Utilization', value: `${fleetUtilization}%`, icon: FaChartPie, color: 'var(--success-color)' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Overview of your fleet operations</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              style={{
                backgroundColor: 'var(--card-background)',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-color)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '0.75rem',
                  backgroundColor: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color
                }}>
                  <Icon size={24} />
                </div>
              </div>
              <p style={{ 
                fontSize: '2.5rem', 
                fontWeight: 700, 
                color: 'var(--text-primary)', 
                marginBottom: '0.25rem' 
              }}>
                {stat.value}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
