import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard() {
  const [data, setData] = useState({
    roles: [],
    users: [],
    vehicles: [],
    drivers: [],
    trips: [],
    maintenanceLogs: [],
    fuelLogs: [],
    expenses: [],
    notifications: [],
    activityLogs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          rolesRes,
          usersRes,
          vehiclesRes,
          driversRes,
          tripsRes,
          maintenanceLogsRes,
          fuelLogsRes,
          expensesRes,
          notificationsRes,
          activityLogsRes
        ] = await Promise.all([
          api.get('/roles'),
          api.get('/users'),
          api.get('/vehicles'),
          api.get('/drivers'),
          api.get('/trips'),
          api.get('/maintenanceLogs'),
          api.get('/fuelLogs'),
          api.get('/expenses'),
          api.get('/notifications'),
          api.get('/activityLogs')
        ]);

        setData({
          roles: rolesRes.data,
          users: usersRes.data,
          vehicles: vehiclesRes.data,
          drivers: driversRes.data,
          trips: tripsRes.data,
          maintenanceLogs: maintenanceLogsRes.data,
          fuelLogs: fuelLogsRes.data,
          expenses: expensesRes.data,
          notifications: notificationsRes.data,
          activityLogs: activityLogsRes.data
        });
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Vehicles */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.vehicles.map(vehicle => (
            <div key={vehicle._id} className="border rounded-lg p-4">
              <h3 className="font-bold">{vehicle.registrationNumber}</h3>
              <p>{vehicle.brand} {vehicle.model} ({vehicle.year})</p>
              <p>Status: {vehicle.status}</p>
              <p>Odometer: {vehicle.odometer} km</p>
            </div>
          ))}
        </div>
      </section>

      {/* Drivers */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Drivers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.drivers.map(driver => (
            <div key={driver._id} className="border rounded-lg p-4">
              <h3 className="font-bold">{driver.name}</h3>
              <p>License: {driver.licenseNumber}</p>
              <p>Status: {driver.status}</p>
              <p>Experience: {driver.experience} years</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trips */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.trips.map(trip => (
            <div key={trip._id} className="border rounded-lg p-4">
              <h3 className="font-bold">{trip.tripNumber}</h3>
              <p>{trip.source} → {trip.destination}</p>
              <p>Status: {trip.status}</p>
              <p>Distance: {trip.distanceKm} km</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
