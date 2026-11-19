import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

export default function MonthlyApplicationChart({ applications = [] }) {
  const { isDark } = useTheme();

  // Aggregate applications dynamically by month
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonthIdx = new Date().getMonth();

  // Build last 6 months buckets
  const dataMap = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(currentMonthIdx - i);
    const key = `${monthNames[d.getMonth()]}`;
    dataMap[key] = { month: key, count: 0, interviews: 0 };
  }

  applications.forEach((app) => {
    if (app.appliedDate) {
      const appDate = new Date(app.appliedDate);
      const m = monthNames[appDate.getMonth()];
      if (dataMap[m]) {
        dataMap[m].count += 1;
        if (app.status === 'Interview Scheduled' || app.status === 'Offer Received' || app.status === 'Selected') {
          dataMap[m].interviews += 1;
        }
      }
    }
  });

  const chartData = Object.values(dataMap);

  // Custom Glassmorphic Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            borderRadius: '12px',
            padding: '10px 14px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            fontSize: '0.8rem'
          }}
        >
          <p style={{ fontWeight: '700', color: isDark ? '#FFFFFF' : '#172033', marginBottom: '4px' }}>
            {label} 2026
          </p>
          <p style={{ color: '#4F8CFF', margin: '2px 0' }}>
            Applications: <strong>{payload[0]?.value || 0}</strong>
          </p>
          {payload[1] && (
            <p style={{ color: '#8B5CF6', margin: '2px 0' }}>
              Interviews/Offers: <strong>{payload[1]?.value || 0}</strong>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '280px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F8CFF" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#4F8CFF" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? '#1F293D' : '#F1F5F9'}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke={isDark ? '#64748B' : '#94A3B8'}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke={isDark ? '#64748B' : '#94A3B8'}
            tickLine={false}
            tick={{ fontSize: 12 }}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#4F8CFF"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorApplications)"
            name="Applications"
          />
          <Area
            type="monotone"
            dataKey="interviews"
            stroke="#8B5CF6"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorInterviews)"
            name="Interviews"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
