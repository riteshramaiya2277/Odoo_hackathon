import { useState, useEffect } from 'react';
import apiClient from '../api/axiosClient';

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await apiClient.get('/drivers');
        setDrivers(res.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
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
      'Available': { backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' },
      'On Trip': { backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning-color)' },
      'Off Duty': { backgroundColor: 'rgba(100, 116, 139, 0.1)', color: 'var(--secondary-color)' },
      'Suspended': { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)' }
    };
    return styles[status] || styles['Available'];
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Drivers</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Manage your drivers</p>
      </div>

      <div style={{ backgroundColor: 'var(--card-background)', borderRadius: '1rem', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--background-color)' }}>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>License Number</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>License Category</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>License Expiry Date</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Number</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Safety Score</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--background-color)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                <td style={{ padding: '1rem 1.5rem' }}>{driver.name}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{driver.licenseNumber}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{driver.licenseCategory}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{driver.licenseExpiryDate}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{driver.contactNumber}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{driver.safetyScore}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 600, ...getStatusStyles(driver.status) }}>
                    {driver.status}
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

export default Drivers;
