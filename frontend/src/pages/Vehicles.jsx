import React from 'react';
import { LuDownload, LuPlus, LuSearch, LuFilter, LuTriangleAlert, LuTruck, LuCirclePlus } from 'react-icons/lu';
import Badge from '../components/Badge';

// Mock Data
const vehiclesData = [
  { id: '1', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=150', reg: 'TX-4402-B', type: 'HEAVY TRUCK', driverName: 'Marcus Chen', driverAvatar: 'https://i.pravatar.cc/150?u=marcus', fuel: 82, mileage: '42,560', status: 'On Trip' },
  { id: '2', image: 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?auto=format&fit=crop&q=80&w=150', reg: 'NY-8891-Z', type: 'DELIVERY VAN', driverName: 'Sarah Jenkins', driverAvatar: 'https://i.pravatar.cc/150?u=sarah', fuel: 12, mileage: '12,400', status: 'Critical' },
  { id: '3', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=150', reg: 'CA-2211-M', type: 'LUXURY SEDAN', driverName: 'David Miller', driverAvatar: 'https://i.pravatar.cc/150?u=david', fuel: 95, mileage: '8,200', status: 'Active' },
  { id: '4', image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=150', reg: 'FL-0012-G', type: 'HEAVY TRUCK', driverName: 'Robert Vance', driverAvatar: 'https://i.pravatar.cc/150?u=robert', fuel: 45, mileage: '88,200', status: 'Maintenance' },
  { id: '5', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=150', reg: 'TX-9982-K', type: 'UTILITY SUV', driverName: 'Elena Rodriguez', driverAvatar: 'https://i.pravatar.cc/150?u=elena', fuel: 88, mileage: '24,500', status: 'Active' },
];

export default function Vehicles() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Vehicle Inventory</h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Fleet Management • <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Active Assets</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LuDownload size={16} /> Export CSV
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LuPlus size={16} /> Add Vehicle
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card" style={{ padding: 0 }}>
        {/* Filter Bar */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--background-color)', borderRadius: 'var(--border-radius)', padding: '0.5rem 1rem', width: '320px' }}>
            <LuSearch color="var(--text-secondary)" size={16} />
            <input 
              type="text" 
              placeholder="Search by registration, driver, or type..." 
              style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', marginLeft: '0.5rem', width: '100%', fontSize: '0.875rem' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><LuFilter size={14}/> Status ⌄</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Vehicle Type ⌄</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Region ⌄</div>
            <div style={{ paddingLeft: '1rem', borderLeft: '1px solid var(--border-color)' }}>Showing 12 of 248 vehicles</div>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Image</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Registration # ↑↓</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Driver</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Fuel</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Mileage (km)</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehiclesData.map((item, idx) => (
              <tr key={idx} style={{ borderTop: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <img src={item.image} alt={item.reg} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ fontWeight: 600 }}>{item.reg}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{item.type}</div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={item.driverAvatar} alt={item.driverName} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <span style={{ fontWeight: 500 }}>{item.driverName}</span>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: item.fuel < 20 ? 'var(--danger-color)' : 'var(--text-secondary)' }}>{item.fuel}%</span>
                    <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.fuel}%`, height: '100%', backgroundColor: item.fuel < 20 ? 'var(--danger-color)' : 'var(--success-color)' }}></div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }} className="text-mono">{item.mileage}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  {item.status === 'On Trip' && <Badge type="neutral">{item.status}</Badge>}
                  {item.status === 'Critical' && <Badge type="danger" icon={<LuTriangleAlert size={12}/>}>Critical</Badge>}
                  {item.status === 'Active' && <Badge type="neutral">{item.status}</Badge>}
                  {item.status === 'Maintenance' && <Badge type="neutral">{item.status}</Badge>}
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <button className="outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <div>Showing 5 of 248 entries</div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span>Previous</span>
            <span style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-accent)', color: 'white', borderRadius: '4px', fontWeight: 500 }}>1</span>
            <span style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
            <span style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
            <span>...</span>
            <span style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>24</span>
            <span>Next</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--background-color)', borderRadius: '8px', color: 'var(--text-primary)' }}>
            <LuTriangleAlert size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Pending Service</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>4 vehicles are overdue for scheduled fitness checks.</p>
            <a href="#" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Review Alerts</a>
          </div>
        </div>
        
        <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--background-color)', borderRadius: '8px', color: 'var(--text-primary)' }}>
            <LuTruck size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Operational Utilization</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>Currently 82% of the fleet is active on route cycles.</p>
            <a href="#" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>View Maps</a>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', backgroundColor: '#F8FAFC', border: '1px dashed var(--info-color)' }}>
          <div style={{ padding: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', color: 'var(--info-color)' }}>
            <LuCirclePlus size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Expansion Ready</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>Onboarding 2 new semi-trailer units for the Midwest region.</p>
            <a href="#" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--info-color)' }}>Add New Units</a>
          </div>
        </div>
      </div>

    </div>
  );
}
