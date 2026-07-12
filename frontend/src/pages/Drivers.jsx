import React, { useState, useEffect } from 'react';
import { Download, Plus, Search, Filter, AlertTriangle, ShieldCheck, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchDrivers = async () => {
    try {
      const res = await api.get('/drivers');
      setDrivers(res.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/drivers', data);
      setIsModalOpen(false);
      reset();
      fetchDrivers();
    } catch (err) {
      console.error('Failed to add driver:', err);
      alert('Failed to add driver');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available': return <span className="badge badge-green">Available</span>;
      case 'On Trip': return <span className="badge badge-blue">On Trip</span>;
      case 'Off Duty': return <span className="badge px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border bg-gray-50 text-gray-600 border-gray-200">Off Duty</span>;
      case 'Suspended': return <span className="badge badge-red">Suspended</span>;
      default: return <span className="badge badge-amber">{status || 'Unknown'}</span>;
    }
  };

  const isLicenseExpiringSoon = (dateString) => {
    if (!dateString) return false;
    const expiry = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(expiry - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays < 30 && expiry > now;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Driver Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage personnel, track safety scores, and monitor licenses.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </button>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Driver
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
              placeholder="Search by name or license..." 
              className="bg-transparent border-none outline-none ml-2 w-full text-sm"
            />
          </div>
          <div className="flex gap-4 items-center text-sm text-gray-600">
            <button className="flex items-center gap-1 hover:text-gray-900"><Filter className="w-4 h-4"/> Status</button>
            <div className="pl-4 border-l border-gray-200 text-gray-500">
              Showing {drivers.length} drivers
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Driver Name</th>
                <th className="px-6 py-4">License Details</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Safety Score</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">Loading drivers...</td></tr>
              ) : drivers.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">No drivers found.</td></tr>
              ) : (
                drivers.map((d) => {
                  const score = d.safetyScore || 100;
                  const scoreColor = score >= 90 ? 'bg-green-500' : score >= 75 ? 'bg-amber-500' : 'bg-red-500';
                  const expiring = isLicenseExpiringSoon(d.licenseExpiry);

                  return (
                    <tr key={d._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                           <img src={`https://ui-avatars.com/api/?name=${d.name}&background=random`} alt={d.name} />
                        </div>
                        <span className="font-semibold text-gray-900">{d.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900 font-mono text-xs">{d.licenseNumber}</div>
                        <div className={`text-xs mt-1 flex items-center gap-1 ${expiring ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                          {expiring && <AlertTriangle className="w-3 h-3" />}
                          Expires: {new Date(d.licenseExpiry).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{d.phone}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 w-8">{score}</span>
                          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${scoreColor}`} style={{ width: `${score}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(d.status)}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary hover:text-primaryHover text-sm font-medium">View Profile</button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Driver Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Add New Driver</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input {...register("name", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" placeholder="e.g. John Doe" />
                  {errors.name && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                  <input {...register("licenseNumber", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" placeholder="e.g. DL-123456" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Expiry</label>
                  <input type="date" {...register("licenseExpiry", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input {...register("phone", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" placeholder="e.g. +1 555-1234" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Safety Score (0-100)</label>
                  <input type="number" defaultValue="100" {...register("safetyScore")} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                </div>
              </div>

              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Driver</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
