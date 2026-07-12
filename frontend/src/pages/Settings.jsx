import React, { useState, useEffect, useContext } from 'react';
import { Users, Shield, Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const { register: registerUser, handleSubmit: handleSubmitUser, reset: resetUser, formState: { errors: userErrors } } = useForm();
  const { register: registerRole, handleSubmit: handleSubmitRole, reset: resetRole, formState: { errors: roleErrors } } = useForm();

  const fetchData = async () => {
    try {
      const [usersRes, rolesRes] = await Promise.all([
        api.get('/users'),
        api.get('/roles')
      ]);
      setUsers(usersRes.data);
      setRoles(rolesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitUser = async (data) => {
    try {
      await api.post('/users', data);
      setIsUserModalOpen(false);
      resetUser();
      fetchData();
    } catch (err) {
      console.error('Failed to add user:', err);
      alert('Failed to add user');
    }
  };

  const onSubmitRole = async (data) => {
    try {
      // Convert permissions string to array
      const permissionsArray = data.permissions.split(',').map(p => p.trim());
      await api.post('/roles', { ...data, permissions: permissionsArray });
      setIsRoleModalOpen(false);
      resetRole();
      fetchData();
    } catch (err) {
      console.error('Failed to add role:', err);
      alert('Failed to add role');
    }
  };

  const isAdmin = user?.role?.name === 'Admin';
  const isManager = user?.role?.name === 'Manager' || isAdmin;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage users, roles, and system configurations.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {isManager && (
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
              activeTab === 'users'
                ? 'bg-white text-primary border border-b-white border-gray-200'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Users
          </button>
        )}
        {isAdmin && (
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
              activeTab === 'roles'
                ? 'bg-white text-primary border border-b-white border-gray-200'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Shield className="w-4 h-4 inline mr-2" />
            Roles
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="card">
        {activeTab === 'users' && isManager && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
              <button className="btn-primary" onClick={() => setIsUserModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan="5" className="text-center py-8 text-gray-500">Loading users...</td></tr>
                  ) : users.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-8 text-gray-500">No users found.</td></tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                        <td className="px-4 py-3 text-gray-600">{u.email}</td>
                        <td className="px-4 py-3">
                          <span className="badge badge-blue">{u.role?.name || 'Unknown'}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{u.phone}</td>
                        <td className="px-4 py-3">
                          <span className={`badge ${u.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                            {u.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'roles' && isAdmin && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Role Management</h2>
              <button className="btn-primary" onClick={() => setIsRoleModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Role
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3">Role Name</th>
                    <th className="px-4 py-3">Permissions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan="2" className="text-center py-8 text-gray-500">Loading roles...</td></tr>
                  ) : roles.length === 0 ? (
                    <tr><td colSpan="2" className="text-center py-8 text-gray-500">No roles found.</td></tr>
                  ) : (
                    roles.map((r) => (
                      <tr key={r._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {r.permissions.map((p, idx) => (
                              <span key={idx} className="badge badge-gray">{p}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!isManager && !isAdmin && (
          <div className="text-center py-8">
            <p className="text-gray-500">You don't have permission to access settings.</p>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Add User</h2>
              <button onClick={() => setIsUserModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitUser(onSubmitUser)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input {...registerUser("name", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                {userErrors.name && <span className="text-xs text-red-500">Required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" {...registerUser("email", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                {userErrors.email && <span className="text-xs text-red-500">Required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" {...registerUser("password", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                {userErrors.password && <span className="text-xs text-red-500">Required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select {...registerUser("role", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary">
                  <option value="">Select Role</option>
                  {roles.map(r => (
                    <option key={r._id} value={r._id}>{r.name}</option>
                  ))}
                </select>
                {userErrors.role && <span className="text-xs text-red-500">Required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input {...registerUser("phone", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                {userErrors.phone && <span className="text-xs text-red-500">Required</span>}
              </div>
              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsUserModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Role Modal */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Add Role</h2>
              <button onClick={() => setIsRoleModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitRole(onSubmitRole)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                <input {...registerRole("name", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                {roleErrors.name && <span className="text-xs text-red-500">Required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions (comma separated)</label>
                <input {...registerRole("permissions", { required: true })} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary" placeholder="e.g. read, write, delete" />
                {roleErrors.permissions && <span className="text-xs text-red-500">Required</span>}
              </div>
              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsRoleModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Role</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
