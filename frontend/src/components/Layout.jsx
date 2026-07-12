import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2 w-96 border border-gray-100">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search fleet, drivers, or trips..."
          className="bg-transparent border-none outline-none ml-2 w-full text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-900">{user?.fullName || 'Alex Rivera'}</div>
            <div className="text-xs text-gray-500">{user?.role?.name || 'Fleet Manager'}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center relative">
            <img src={`https://ui-avatars.com/api/?name=${user?.fullName || 'Alex'}&background=2563EB&color=fff`} alt="Profile" className="rounded-full w-full h-full object-cover" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Layout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
