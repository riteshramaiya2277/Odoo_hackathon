import { useState, useEffect } from 'react';
import apiClient from '../api/axiosClient';

function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await apiClient.get('/trips');
        setTrips(res.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
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
      'Draft': { backgroundColor: 'rgba(100, 116, 139, 0.1)', color: 'var(--secondary-color)' },
      'Dispatched': { backgroundColor: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-color)' },
      'Completed': { backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' },
      'Cancelled': { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)' }
    };
    return styles[status] || styles['Draft'];
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Trips</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Manage your trips</p>
      </div>

      <div style={{ backgroundColor: 'var(--card-background)', borderRadius: '1rem', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--background-color)' }}>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Destination</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cargo Weight (kg)</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Planned Distance (km)</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actual Distance (km)</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, index) => (
              <tr key={index} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--background-color)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                <td style={{ padding: '1rem 1.5rem' }}>{trip.source}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{trip.destination}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{trip.cargoWeight}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{trip.plannedDistance}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{trip.actualDistance || '-'}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 600, ...getStatusStyles(trip.tripStatus) }}>
                    {trip.tripStatus}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>{trip.remarks || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Trips;
