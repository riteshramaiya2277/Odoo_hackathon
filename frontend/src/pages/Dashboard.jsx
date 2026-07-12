import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Truck, Activity, Wrench, Navigation, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

function Dashboard() {
  const [data, setData] = useState({
    vehicles: [],
    drivers: [],
    trips: [],
    maintenanceLogs: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesRes, driversRes, tripsRes, maintenanceLogsRes] = await Promise.all([
          api.get('/vehicles'),
          api.get('/drivers'),
          api.get('/trips'),
          api.get('/maintenanceLogs')
        ]);

        setData({
          vehicles: vehiclesRes.data,
          drivers: driversRes.data,
          trips: tripsRes.data,
          maintenanceLogs: maintenanceLogsRes.data,
          loading: false
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };
    fetchData();
  }, []);

  if (data.loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Calculate KPIs
  const activeVehicles = data.vehicles.filter(v => v.status === 'On Trip').length;
  const availableVehicles = data.vehicles.filter(v => v.status === 'Available').length;
  const inShopVehicles = data.vehicles.filter(v => v.status === 'In Shop').length;
  const utilizationPercent = data.vehicles.length > 0 
    ? Math.round((activeVehicles / data.vehicles.length) * 100) 
    : 0;

  const activeTrips = data.trips.filter(t => t.status === 'Dispatched').length;
  const pendingTrips = data.trips.filter(t => t.status === 'Draft').length;
  const driversOnDuty = data.drivers.filter(d => d.status === 'On Trip').length;

  // Chart Data
  const utilizationData = [
    { name: 'Mon', utilization: 65 },
    { name: 'Tue', utilization: 72 },
    { name: 'Wed', utilization: utilizationPercent },
    { name: 'Thu', utilization: 80 },
    { name: 'Fri', utilization: 85 },
    { name: 'Sat', utilization: 40 },
    { name: 'Sun', utilization: 30 },
  ];

  const tripStatusData = [
    { name: 'Completed', value: data.trips.filter(t => t.status === 'Completed').length || 5 },
    { name: 'Dispatched', value: activeTrips || 2 },
    { name: 'Draft', value: pendingTrips || 1 },
    { name: 'Cancelled', value: data.trips.filter(t => t.status === 'Cancelled').length || 0 },
  ];
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h1>
        <div className="flex gap-2">
          <button className="btn-secondary">Export PDF</button>
          <button className="btn-primary flex items-center gap-2">
            <Activity className="w-4 h-4" /> Live Map
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Fleet Utilization</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">{utilizationPercent}%</h2>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <span className="font-medium">+2%</span>
            <span className="text-gray-400 ml-2">from last week</span>
          </div>
        </div>

        <div className="card flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Vehicles</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">{activeVehicles} <span className="text-base font-normal text-gray-400">/ {data.vehicles.length}</span></h2>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-gray-500">{availableVehicles} available</span>
            <span className="text-amber-500">{inShopVehicles} in shop</span>
          </div>
        </div>

        <div className="card flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Trips</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">{activeTrips}</h2>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Navigation className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{pendingTrips} pending departure</span>
          </div>
        </div>

        <div className="card flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Drivers On Duty</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">{driversOnDuty}</h2>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${(driversOnDuty / Math.max(1, data.drivers.length)) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Fleet Utilization Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={utilizationData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="utilization" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Trip Status Breakdown</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tripStatusData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {tripStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {data.trips.slice(0, 2).map((trip, idx) => (
            <div key={`trip-${idx}`} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
              <div className="p-2 bg-blue-50 rounded-full text-blue-600 mt-1">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Trip {trip.tripNumber || `TRP-${100+idx}`} Dispatched</p>
                <p className="text-xs text-gray-500 mt-1">Driver {trip.driver?.name || 'Assigned'} is en route from {trip.source} to {trip.destination}.</p>
              </div>
              <span className="ml-auto text-xs text-gray-400">Just now</span>
            </div>
          ))}
          {data.maintenanceLogs.slice(0, 1).map((log, idx) => (
            <div key={`maint-${idx}`} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
              <div className="p-2 bg-amber-50 rounded-full text-amber-600 mt-1">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Maintenance Alert: {log.vehicle?.registrationNumber || 'Vehicle'}</p>
                <p className="text-xs text-gray-500 mt-1">{log.description || 'Routine checkup required.'}</p>
              </div>
              <span className="ml-auto text-xs text-gray-400">2h ago</span>
            </div>
          ))}
          <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
            <div className="p-2 bg-red-50 rounded-full text-red-600 mt-1">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">License Expiry Warning</p>
              <p className="text-xs text-gray-500 mt-1">Driver John Doe's license expires in 5 days.</p>
            </div>
            <span className="ml-auto text-xs text-gray-400">1d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
