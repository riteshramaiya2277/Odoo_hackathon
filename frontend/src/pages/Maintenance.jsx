import React, { useState, useEffect } from 'react';
import { Download, Plus, Search, Filter, Wrench, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

export default function Maintenance() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchLogs = async () => {
    try {
      const res = await api.get('/maintenanceLogs');
      setLogs(res.data);
    } catch (error) {
      console.error('Error fetching maintenance logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/maintenanceLogs', data);
      setIsModalOpen(false);
      reset();
      fetchLogs();
    } catch (err) {
      console.error('Failed to add log:', err);
      alert('Failed to add log');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return <span className="badge badge-green">Completed</span>;
      case 'Active': return <span className="badge badge-blue">Active</span>;
      default: return <span className="badge badge-amber">{status || 'Scheduled'}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Maintenance Logs</h1>
          <p className="text-sm text-gray-500 mt-1">Track vehicle repairs, routine servicing, and associated costs.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </button>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Log
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
              placeholder="Search by vehicle or description..." 
              className="bg-transparent border-none outline-none ml-2 w-full text-sm"
            />
          </div>
          <div className="flex gap-4 items-center text-sm text-gray-600">
            <button className="flex items-center gap-1 hover:text-gray-900"><Filter className="w-4 h-4"/> Status</button>
            <div className="pl-4 border-l border-gray-200 text-gray-500">
              Showing {logs.length} logs
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Cost ($)</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">Loading logs...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">No logs found.</td></tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {log.vehicle?.registrationNumber || 'Unknown Vehicle'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Wrench className="w-3.5 h-3.5 text-gray-400" />
                        {log.maintenanceType}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{log.description}</td>
                    <td className="px-6 py-4 font-mono font-medium text-gray-900">${log.maintenanceCost}</td>
                    <td className="px-6 py-4 text-gray-600">{new Date(log.startDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(log.status)}</td>
                  </tr>
                ))
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
              <h2 className="text-xl font-bold text-gray-900">Add Maintenance Log</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Type</label>
                  <select {...register("maintenanceType", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary">
                    <option value="Routine">Routine</option>
                    <option value="Repair">Repair</option>
                    <option value="Inspection">Inspection</option>
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost ($)</label>
                  <input type="number" {...register("maintenanceCost")} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input {...register("description")} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" {...register("startDate", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select {...register("status")} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary">
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Log</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
