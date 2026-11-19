import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

export default function JobSourceBarChart({ applications = [] }) {
  const { isDark } = useTheme();

  const sourceCounts = {
    LinkedIn: 0,
    Indeed: 0,
    Naukri: 0,
    'Company Website': 0,
    Referral: 0,
    Other: 0
  };

  applications.forEach((app) => {
    const src = app.jobSource || 'Other';
    if (sourceCounts[src] !== undefined) {
      sourceCounts[src] += 1;
    } else {
      sourceCounts.Other += 1;
    }
  });

  const chartData = Object.keys(sourceCounts).map((key) => ({
    source: key,
    count: sourceCounts[key]
  }));

  const colors = ['#0A66C2', '#2164F3', '#3B82F6', '#8B5CF6', '#10B981', '#64748B'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
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
          <p style={{ fontWeight: '700', color: isDark ? '#FFF' : '#172033' }}>{label}</p>
          <p style={{ color: '#4F8CFF', marginTop: '2px' }}>
            Applications: <strong>{payload[0]?.value}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '260px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1F293D' : '#F1F5F9'} vertical={false} />
          <XAxis
            dataKey="source"
            stroke={isDark ? '#64748B' : '#94A3B8'}
            tickLine={false}
            tick={{ fontSize: 11 }}
            angle={-20}
            textAnchor="end"
          />
          <YAxis
            stroke={isDark ? '#64748B' : '#94A3B8'}
            tickLine={false}
            tick={{ fontSize: 12 }}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
