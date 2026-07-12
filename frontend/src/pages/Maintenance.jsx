import { useState, useEffect } from 'react';
import apiClient from '../api/axiosClient';

function Maintenance() {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        const res = await apiClient.get('/maintenances');
        setMaintenances(res.data);
      } catch (error) {
        console.error('Error fetching maintenances:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMaintenances();
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
      'Active': { backgroundColor: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-color)' },
      'Completed': { backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' }
    };
    return styles[status] || styles['Active'];
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Maintenance</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Manage vehicle maintenance</p>
      </div>

      <div style={{ backgroundColor: 'var(--card-background)', borderRadius: '1rem', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--background-color)' }}>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cost</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Start Date</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>End Date</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {maintenances.map((maintenance, index) => (
              <tr key={index} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--background-color)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                <td style={{ padding: '1rem 1.5rem' }}>{maintenance.maintenanceType}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{maintenance.description}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{maintenance.maintenanceCost}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{maintenance.startDate}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{maintenance.endDate || '-'}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 600, ...getStatusStyles(maintenance.status) }}>
                    {maintenance.status}
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

export default Maintenance;
