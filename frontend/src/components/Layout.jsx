import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaBell } from 'react-icons/fa';
import { LuLayoutDashboard, LuTruck, LuUser, LuMap, LuWrench, LuFileText, LuSettings, LuLogOut } from 'react-icons/lu';

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LuLayoutDashboard, label: 'Dashboard' },
    { path: '/vehicles', icon: LuTruck, label: 'Vehicles' },
    { path: '/drivers', icon: LuUser, label: 'Drivers' },
    { path: '/trips', icon: LuMap, label: 'Trips' },
    { path: '/maintenance', icon: LuWrench, label: 'Maintenance' },
    { path: '/reports', icon: LuFileText, label: 'Reports' },
    { path: '/settings', icon: LuSettings, label: 'Settings' }
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--card-background)',
      borderRight: '1px solid var(--border-color)',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 10
    }}>
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: 'var(--primary-color)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <h1 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--primary-color)', fontWeight: 700 }}>TransitOps</h1>
      </div>
      <nav style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (location.pathname !== '/' && item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius)',
                color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'rgba(30, 58, 138, 0.08)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'var(--background-color)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <button className="outline" style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          border: 'none',
          padding: '0.75rem 1rem',
          color: 'var(--text-secondary)',
          textAlign: 'left'
        }}>
          <LuLogOut size={20} />
          <span>Collapse</span>
        </button>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header style={{
      height: '72px',
      backgroundColor: 'var(--card-background)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 5
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--background-color)',
        borderRadius: 'var(--border-radius)',
        padding: '0.5rem 1rem',
        width: '400px'
      }}>
        <FaSearch color="var(--text-secondary)" size={14} />
        <input
          type="text"
          placeholder="Search fleet, drivers, or trips..."
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            outline: 'none',
            marginLeft: '0.5rem',
            width: '100%',
            color: 'var(--text-primary)',
            fontSize: '0.875rem'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button style={{
          background: 'none',
          border: 'none',
          padding: 0,
          color: 'var(--text-secondary)',
          position: 'relative',
          cursor: 'pointer'
        }}>
          <FaBell size={18} />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--danger-color)',
            borderRadius: '50%',
            border: '2px solid var(--card-background)'
          }}></span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border-color)' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Alex Rivera</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Fleet Manager</div>
          </div>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-accent)',
            backgroundImage: 'url("https://i.pravatar.cc/150?u=alex")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '10px',
              height: '10px',
              backgroundColor: 'var(--success-color)',
              borderRadius: '50%',
              border: '2px solid var(--card-background)'
            }}></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background-color)' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
