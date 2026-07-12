import React, { useState, useEffect } from 'react';
import { Download, Plus, Search, Filter, AlertTriangle, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchVehicles = async () => {
    try {
      const res = await api.get('/vehicles');
      setVehicles(res.data);
    } catch (err) {
      console.error('Failed to fetch vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/vehicles', data);
      setIsModalOpen(false);
      reset();
      fetchVehicles();
    } catch (err) {
      console.error('Failed to add vehicle:', err);
      alert('Failed to add vehicle');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available': return <span className="badge badge-green">Available</span>;
      case 'On Trip': return <span className="badge badge-blue">On Trip</span>;
      case 'In Shop': return <span className="badge badge-amber">In Shop</span>;
      case 'Maintenance': return <span className="badge badge-amber">Maintenance</span>;
      default: return <span className="badge badge-red">{status || 'Unknown'}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Vehicle Registry</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your active fleet assets and track statuses.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </button>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Vehicle
          </button>
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
              placeholder="Search by registration or type..." 
              className="bg-transparent border-none outline-none ml-2 w-full text-sm"
            />
          </div>
          <div className="flex gap-4 items-center text-sm text-gray-600">
            <button className="flex items-center gap-1 hover:text-gray-900"><Filter className="w-4 h-4"/> Status</button>
            <button className="flex items-center gap-1 hover:text-gray-900">Vehicle Type</button>
            <div className="pl-4 border-l border-gray-200 text-gray-500">
              Showing {vehicles.length} vehicles
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Registration #</th>
                <th className="px-6 py-4">Type / Model</th>
                <th className="px-6 py-4">Max Load</th>
                <th className="px-6 py-4">Odometer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">Loading vehicles...</td></tr>
              ) : vehicles.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">No vehicles found.</td></tr>
              ) : (
                vehicles.map((v) => (
                  <tr key={v._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{v.registrationNumber}</td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{v.brand} {v.model}</div>
                      <div className="text-xs text-gray-500">{v.year}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{v.capacityKg || 'N/A'} kg</td>
                    <td className="px-6 py-4 font-mono text-gray-600">{v.odometer?.toLocaleString()} km</td>
                    <td className="px-6 py-4">{getStatusBadge(v.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:text-primaryHover text-sm font-medium">View Details</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Add New Vehicle</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                  <input {...register("registrationNumber", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" placeholder="e.g. TX-4402" />
                  {errors.registrationNumber && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input {...register("brand", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" placeholder="e.g. Volvo" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input {...register("model", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" placeholder="e.g. VNL 860" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input type="number" {...register("year")} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Load Capacity (kg)</label>
                  <input type="number" {...register("capacityKg")} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial Odometer (km)</label>
                  <input type="number" {...register("odometer")} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                </div>
              </div>

              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
