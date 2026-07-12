import { useState, useEffect } from 'react';
import apiClient from '../api/axiosClient';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await apiClient.get('/vehicles');
        setVehicles(res.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Loading...</div>
      </div>
    );
  }

  const getStatusStyles = (status) => {
    const styles = {
      'Available': { 
        backgroundColor: 'rgba(16, 185, 129, 0.1)', 
        color: 'var(--success-color)' 
      },
      'On Trip': { 
        backgroundColor: 'rgba(245, 158, 11, 0.1)', 
        color: 'var(--warning-color)' 
      },
      'In Shop': { 
        backgroundColor: 'rgba(239, 68, 68, 0.1)', 
        color: 'var(--danger-color)' 
      },
      'Retired': { 
        backgroundColor: 'rgba(100, 116, 139, 0.1)', 
        color: 'var(--secondary-color)' 
      }
    };
    return styles[status] || styles['Available'];
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Vehicles</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Manage your fleet vehicles</p>
      </div>
      
      <div style={{ 
        backgroundColor: 'var(--card-background)', 
        borderRadius: '1rem', 
        boxShadow: 'var(--shadow-md)', 
        border: '1px solid var(--border-color)', 
        overflow: 'hidden' 
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--background-color)' }}>
              <th style={{ 
                padding: '1rem 1.5rem', 
                textAlign: 'left', 
                fontWeight: 600, 
                color: 'var(--text-secondary)', 
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Registration Number</th>
              <th style={{ 
                padding: '1rem 1.5rem', 
                textAlign: 'left', 
                fontWeight: 600, 
                color: 'var(--text-secondary)', 
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Name</th>
              <th style={{ 
                padding: '1rem 1.5rem', 
                textAlign: 'left', 
                fontWeight: 600, 
                color: 'var(--text-secondary)', 
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Type</th>
              <th style={{ 
                padding: '1rem 1.5rem', 
                textAlign: 'left', 
                fontWeight: 600, 
                color: 'var(--text-secondary)', 
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Max Load (kg)</th>
              <th style={{ 
                padding: '1rem 1.5rem', 
                textAlign: 'left', 
                fontWeight: 600, 
                color: 'var(--text-secondary)', 
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Odometer</th>
              <th style={{ 
                padding: '1rem 1.5rem', 
                textAlign: 'left', 
                fontWeight: 600, 
                color: 'var(--text-secondary)', 
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Region</th>
              <th style={{ 
                padding: '1rem 1.5rem', 
                textAlign: 'left', 
                fontWeight: 600, 
                color: 'var(--text-secondary)', 
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={index} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--background-color)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                <td style={{ padding: '1rem 1.5rem' }}>{vehicle.registrationNumber}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{vehicle.vehicleName}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{vehicle.vehicleType}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{vehicle.maxLoadCapacity}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{vehicle.odometer}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{vehicle.region}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    padding: '0.375rem 0.75rem', 
                    borderRadius: '0.5rem', 
                    fontSize: '0.75rem', 
                    fontWeight: 600,
                    ...getStatusStyles(vehicle.status)
                  }}>
                    {vehicle.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vehicles;
