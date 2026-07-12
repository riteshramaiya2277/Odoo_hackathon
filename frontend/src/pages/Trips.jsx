import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuPlus, LuMap } from 'react-icons/lu';
import apiClient from '../api/axiosClient';
import Badge from '../components/Badge';

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Trips</h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage your active and scheduled trips</div>
        </div>
        <Link to="/trips/new" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LuPlus size={16} /> Add Trip
          </button>
        </Link>
      </div>

      {trips.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--card-background)',
          borderRadius: '1rem',
          padding: '4rem 2rem',
          border: '1px dashed var(--border-color)',
          textAlign: 'center',
          gap: '1rem'
        }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--background-color)', borderRadius: '50%', color: 'var(--text-secondary)' }}>
            <LuMap size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No trips scheduled</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Create your first trip to get started.</p>
          </div>
          <Link to="/trips/new" style={{ textDecoration: 'none', marginTop: '0.5rem' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LuPlus size={16} /> Create Trip
            </button>
          </Link>
        </div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Source</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Destination</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Cargo (kg)</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Distance (km)</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip, index) => (
                <tr key={index} style={{ borderTop: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>{trip.source}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{trip.destination}</td>
                  <td style={{ padding: '1rem 1.5rem' }} className="text-mono">{trip.cargoWeight}</td>
                  <td style={{ padding: '1rem 1.5rem' }} className="text-mono">{trip.plannedDistance}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    {trip.tripStatus === 'Draft' && <Badge type="neutral">Draft</Badge>}
                    {trip.tripStatus === 'Dispatched' && <Badge type="info">Dispatched</Badge>}
                    {trip.tripStatus === 'Completed' && <Badge type="success">Completed</Badge>}
                    {trip.tripStatus === 'Cancelled' && <Badge type="danger">Cancelled</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Trips;
