import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

export default function StatusPieChart({ applications = [] }) {
  const { isDark } = useTheme();

  const STATUS_CONFIG = {
    'Applied': { color: '#3B82F6', label: 'Applied' },
    'Under Review': { color: '#F59E0B', label: 'Under Review' },
    'Shortlisted': { color: '#8B5CF6', label: 'Shortlisted' },
    'Interview Scheduled': { color: '#06B6D4', label: 'Interview' },
    'Offer Received': { color: '#10B981', label: 'Offer Received' },
    'Selected': { color: '#059669', label: 'Selected' },
    'Rejected': { color: '#EF4444', label: 'Rejected' }
  };

  // Dynamic count map
  const counts = {};
  applications.forEach((app) => {
    const status = app.status || 'Applied';
    counts[status] = (counts[status] || 0) + 1;
  });

  const chartData = Object.keys(counts).map((key) => ({
    name: key,
    value: counts[key],
    color: STATUS_CONFIG[key]?.color || '#94A3B8'
  }));

  const total = applications.length || 1;

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = Math.round((data.value / total) * 100);
      return (
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            borderRadius: '10px',
            padding: '8px 12px',
            fontSize: '0.8rem',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: data.payload.color
              }}
            />
            <span style={{ fontWeight: '700', color: isDark ? '#FFF' : '#172033' }}>
              {data.name}
            </span>
          </div>
          <p style={{ color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
            <strong>{data.value}</strong> applications ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: '8px',
          width: '100%',
          marginTop: '12px'
        }}
      >
        {chartData.map((item) => (
          <div
            key={item.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              color: isDark ? '#A0AEC0' : '#64748B'
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: item.color,
                flexShrink: 0
              }}
            />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.name}: <strong>{item.value}</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
