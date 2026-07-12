import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LuTruck, LuArrowUpRight, LuArrowDownRight, LuUsers, LuWallet, LuTriangleAlert, LuShare2, LuCalendar, LuFilter, LuDownload } from 'react-icons/lu';
import Badge from '../components/Badge';

// Mock Data matching the design
const utilizationData = [
  { time: '06:00', value: 45 },
  { time: '08:00', value: 75 },
  { time: '10:00', value: 85 },
  { time: '12:00', value: 82 },
  { time: '14:00', value: 87 },
  { time: '16:00', value: 92 },
  { time: '18:00', value: 80 },
  { time: '20:00', value: 60 },
];

const vehicleStatusData = [
  { name: 'Active', value: 892, color: '#3B82F6' },
  { name: 'Idle', value: 245, color: '#10B981' },
  { name: 'Maintenance', value: 87, color: '#F59E0B' },
  { name: 'Out of Service', value: 24, color: '#EF4444' },
];

const maintenanceList = [
  { id: 'V-8802', name: 'Freightliner Cascadia', plate: 'TX-9921', status: 'Overdue', urgency: 'High', countdown: '-4 Days', cost: '$1,200' },
  { id: 'V-9120', name: 'Volvo VNL 860', plate: 'CA-4410', status: 'Due Today', urgency: 'Medium', countdown: '0 Days', cost: '$850' },
  { id: 'V-7731', name: 'Peterbilt 579', plate: 'FL-2291', status: 'Upcoming', urgency: 'Low', countdown: '3 Days', cost: '$450' },
  { id: 'V-8844', name: 'Kenworth T680', plate: 'NY-5562', status: 'Overdue', urgency: 'High', countdown: '-2 Days', cost: '$2,100' },
  { id: 'V-9001', name: 'Mack Anthem', plate: 'IL-1109', status: 'Upcoming', urgency: 'Low', countdown: '5 Days', cost: '$600' },
];

function KPICard({ title, value, change, changeType, icon: Icon, timeFrame = "VS LAST 24H", iconColor }) {
  const isPositive = changeType === 'positive';
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>{title}</span>
        <div style={{
          padding: '0.25rem',
          backgroundColor: 'var(--background-color)',
          borderRadius: '4px',
          color: iconColor || 'var(--text-secondary)'
        }}>
          <Icon size={16} />
        </div>
      </div>
      <div>
        <div className="text-2xl text-mono" style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{value}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600 }}>
          <span style={{
            color: isPositive ? 'var(--success-color)' : 'var(--danger-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            {isPositive ? <LuArrowUpRight size={14} /> : <LuArrowDownRight size={14} />}
            {change}
          </span>
          <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{timeFrame}</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Operational Overview</h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            System status: <span style={{ color: 'var(--success-color)', fontWeight: 500 }}>Optimal</span> • Last updated 2 mins ago
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LuCalendar size={16} /> Last 30 Days
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LuShare2 size={16} /> Share Dashboard
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem' }}>
        <KPICard title="Total Vehicles" value="1,248" change="+12%" changeType="positive" icon={LuTruck} iconColor="var(--info-color)" />
        <KPICard title="Vehicles On Trip" value="892" change="+5.4%" changeType="positive" icon={LuTruck} iconColor="var(--success-color)" />
        <KPICard title="Available Drivers" value="156" change="-2%" changeType="negative" icon={LuUsers} />
        <KPICard title="Today's Revenue" value="$42,500" change="+18%" changeType="positive" icon={LuWallet} />
        <KPICard title="Pending Maintenance" value="24" change="+3" changeType="negative" icon={LuTriangleAlert} />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Fleet Utilization</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Real-time active vehicle capacity across regions</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                <LuFilter size={14} /> Filter
              </button>
              <button className="outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                <LuDownload size={14} /> Export
              </button>
            </div>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={utilizationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--info-color)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--info-color)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} tickFormatter={(val) => `${val}%`} />
                <RechartsTooltip />
                <Area type="monotone" dataKey="value" stroke="var(--info-color)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Vehicle Status</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Current fleet distribution by state</p>
          </div>
          <div style={{ height: '220px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vehicleStatusData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {vehicleStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            {vehicleStatusData.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }}></div>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                </div>
                <span className="text-mono" style={{ fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maintenance Critical */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Maintenance Critical</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Assets requiring immediate technical intervention</p>
          </div>
          <a href="#" style={{ fontSize: '0.875rem', fontWeight: 500 }}>View All Maintenance</a>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Vehicle ID</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Asset Name</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Urgency</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Countdown</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Est. Cost</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceList.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }} className="text-mono">{item.id}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ fontWeight: 500 }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.plate}</div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  {item.status === 'Overdue' && <Badge type="danger">{item.status}</Badge>}
                  {item.status === 'Due Today' && <Badge type="warning">{item.status}</Badge>}
                  {item.status === 'Upcoming' && <Badge type="neutral">{item.status}</Badge>}
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{
                    color: item.urgency === 'High' ? 'var(--danger-color)' : item.urgency === 'Medium' ? 'var(--warning-color)' : 'var(--text-secondary)'
                  }}>
                    {item.urgency}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{item.countdown}</td>
                <td style={{ padding: '1rem 1.5rem' }} className="text-mono">{item.cost}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <a href="#" style={{ fontWeight: 500 }}>Schedule</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

