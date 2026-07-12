
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import api from '../services/api';

const EditAccount = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone || ''
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.put(`/users/${user._id}`, data);
      alert('Account updated successfully!');
      navigate('/profile');
    } catch (err) {
      console.error('Failed to update account:', err);
      alert('Failed to update account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-4 py-4 flex items-center shadow-sm z-20 sticky top-0">
        <button onClick={() => navigate(-1)} className="p-2 mr-4 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Edit Account</h1>
      </div>

      <div className="px-6 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              {...register("name", { required: true })} 
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500" 
            />
            {errors.name && <span className="text-xs text-red-500">Required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              {...register("email", { required: true })} 
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500" 
            />
            {errors.email && <span className="text-xs text-red-500">Required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              {...register("phone")} 
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold p-4 rounded-xl shadow-sm flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors active:scale-[0.98] disabled:opacity-50"
          >
            <Save className="w-5 h-5" /> {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAccount;
