import React, { useState, useEffect } from 'react';
import { Plus, MapPin, Truck, Calendar, X, MoreVertical } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchTrips = async () => {
    try {
      const res = await api.get('/trips');
      setTrips(res.data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/trips', { ...data, status: 'Draft' });
      setIsModalOpen(false);
      reset();
      fetchTrips();
    } catch (err) {
      console.error('Failed to add trip:', err);
      alert('Failed to add trip');
    }
  };

  const columns = [
    { id: 'Draft', title: 'Draft / Planning', color: 'bg-gray-100', dot: 'bg-gray-400' },
    { id: 'Dispatched', title: 'Dispatched (Active)', color: 'bg-blue-50', dot: 'bg-blue-500' },
    { id: 'Completed', title: 'Completed', color: 'bg-green-50', dot: 'bg-green-500' },
    { id: 'Cancelled', title: 'Cancelled', color: 'bg-red-50', dot: 'bg-red-500' }
  ];

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-start shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Trip Board</h1>
          <p className="text-sm text-gray-500 mt-1">Manage dispatch workflows and monitor active routes.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Create Trip
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map(col => {
          const colTrips = trips.filter(t => t.status === col.id || (!t.status && col.id === 'Draft'));
          
          return (
            <div key={col.id} className={`flex-1 min-w-[320px] rounded-xl flex flex-col ${col.color} border border-gray-200/60`}>
              {/* Column Header */}
              <div className="p-4 border-b border-gray-200/60 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${col.dot}`}></div>
                  <h3 className="font-semibold text-gray-700">{col.title}</h3>
                </div>
                <span className="bg-white/60 text-gray-600 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                  {colTrips.length}
                </span>
              </div>
              
              {/* Column Body */}
              <div className="p-3 flex-1 overflow-y-auto space-y-3">
                {colTrips.map(trip => (
                  <div key={trip._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-gray-500 font-mono">{trip.tripNumber || `TRP-${trip._id.slice(-4).toUpperCase()}`}</span>
                      <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 text-sm mb-3">
                      {trip.source} <span className="text-gray-400 mx-1">→</span> {trip.destination}
                    </h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <Calendar className="w-3.5 h-3.5 mr-2 text-gray-400" />
                        {new Date().toLocaleDateString()} {/* Mock date */}
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <Truck className="w-3.5 h-3.5 mr-2 text-gray-400" />
                        {trip.vehicle?.registrationNumber || 'Unassigned Vehicle'}
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <MapPin className="w-3.5 h-3.5 mr-2 text-gray-400" />
                        {trip.distanceKm || trip.plannedDistance || 0} km • {trip.cargoWeightKg || 0} kg
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">
                          {trip.driver?.name ? trip.driver.name.charAt(0) : '?'}
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                          {trip.driver?.name || 'Unassigned'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {colTrips.length === 0 && !loading && (
                  <div className="h-24 flex items-center justify-center border-2 border-dashed border-gray-300/50 rounded-lg text-sm text-gray-400">
                    No trips
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Create Trip Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Create New Trip</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trip Number</label>
                  <input {...register("tripNumber")} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" placeholder="e.g. TRP-1045" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <input {...register("source", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" placeholder="e.g. Warehouse A" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input {...register("destination", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" placeholder="e.g. Client B" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
                  <input type="number" {...register("distanceKm")} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cargo Weight (kg)</label>
                  <input type="number" {...register("cargoWeight")} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                </div>
              </div>

              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Create Draft</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
