import React, { useState, useEffect } from 'react';
import { Download, Plus, Search, Filter, Droplet, DollarSign, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

export default function FuelExpenses() {
  const [logs, setLogs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchData = async () => {
    try {
      const [logsRes, vehiclesRes, tripsRes] = await Promise.all([
        api.get('/fuelLogs'),
        api.get('/vehicles'),
        api.get('/trips')
      ]);
      setLogs(logsRes.data);
      setVehicles(vehiclesRes.data);
      setTrips(tripsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/fuelLogs', data);
      setIsModalOpen(false);
      reset();
      fetchData();
    } catch (err) {
      console.error('Failed to add log:', err);
      alert('Failed to add log');
    }
  };

  // Calculate some simple stats
  const totalLiters = logs.reduce((acc, log) => acc + (Number(log.fuelQuantity) || 0), 0);
  const totalCost = logs.reduce((acc, log) => acc + (Number(log.totalCost) || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Fuel Logs</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor fuel consumption and track fueling history.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </button>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Fuel Log
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Fuel Cost</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">${totalCost.toLocaleString()}</h2>
            </div>
            <div className="p-2 bg-red-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="card flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Volume</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">{totalLiters.toLocaleString()} L</h2>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Droplet className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Cost per Liter</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">
                ${totalLiters > 0 ? (totalCost / totalLiters).toFixed(2) : '0.00'}
              </h2>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <Droplet className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card p-0 overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 w-80 border border-gray-100">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by vehicle..." 
              className="bg-transparent border-none outline-none ml-2 w-full text-sm"
            />
          </div>
          <div className="flex gap-4 items-center text-sm text-gray-600">
            <div className="pl-4 border-l border-gray-200 text-gray-500">
              Showing {logs.length} records
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Trip</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Volume (Liters)</th>
                <th className="px-6 py-4">Cost ($)</th>
                <th className="px-6 py-4">Fuel Station</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">Loading logs...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">No logs found.</td></tr>
              ) : (
                logs.map((log) => {
                  return (
                    <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {log.vehicle?.registrationNumber || 'Unknown Vehicle'}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{log.trip?.tripNumber || 'Unknown Trip'}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(log.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-blue-600 font-medium">{log.fuelQuantity} L</td>
                      <td className="px-6 py-4 text-red-600 font-medium">${log.totalCost}</td>
                      <td className="px-6 py-4 text-gray-500">{log.fuelStation}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Add Fuel Log</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
                  <select {...register("vehicle", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary">
                    <option value="">Select Vehicle</option>
                    {vehicles.map(v => (
                      <option key={v._id} value={v._id}>{v.registrationNumber} ({v.brand} {v.model})</option>
                    ))}
                  </select>
                  {errors.vehicle && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trip</label>
                  <select {...register("trip", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary">
                    <option value="">Select Trip</option>
                    {trips.map(t => (
                      <option key={t._id} value={t._id}>{t.tripNumber} ({t.source} → {t.destination})</option>
                    ))}
                  </select>
                  {errors.trip && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" {...register("date", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                  {errors.date && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Station</label>
                  <input {...register("fuelStation", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" placeholder="e.g. Shell" />
                  {errors.fuelStation && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Volume (Liters)</label>
                  <input type="number" step="0.01" {...register("fuelQuantity", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                  {errors.fuelQuantity && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Liter ($)</label>
                  <input type="number" step="0.01" {...register("fuelPricePerLiter", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                  {errors.fuelPricePerLiter && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Cost ($)</label>
                  <input type="number" step="0.01" {...register("totalCost", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                  {errors.totalCost && <span className="text-xs text-red-500">Required</span>}
                </div>
              </div>

              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Fuel Log</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
