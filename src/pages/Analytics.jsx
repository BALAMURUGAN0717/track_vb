import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Percent,
  Award,
  XCircle,
  Briefcase,
  PieChart as PieIcon,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import MonthlyApplicationChart from '../components/Charts/MonthlyApplicationChart';
import StatusPieChart from '../components/Charts/StatusPieChart';
import JobSourceBarChart from '../components/Charts/JobSourceBarChart';
import { useApplications } from '../context/ApplicationContext';
import { useTheme } from '../context/ThemeContext';

export default function Analytics() {
  const { applications, interviews } = useApplications();
  const { isDark } = useTheme();

  const [dateRange, setDateRange] = useState('all'); // 'all' | '30days' | 'year'

  // Dynamic calculations from applications
  const totalApps = applications.length;

  const interviewCount = applications.filter(
    (a) => a.status === 'Interview Scheduled' || a.status === 'Offer Received' || a.status === 'Selected'
  ).length;

  const offersAndSelectedCount = applications.filter(
    (a) => a.status === 'Offer Received' || a.status === 'Selected'
  ).length;

  const rejectedCount = applications.filter((a) => a.status === 'Rejected').length;

  // Real rates (avoiding division by zero)
  const interviewConversionRate = totalApps > 0 ? Math.round((interviewCount / totalApps) * 100) : 0;
  const selectionRate = totalApps > 0 ? Math.round((offersAndSelectedCount / totalApps) * 100) : 0;
  const rejectionRate = totalApps > 0 ? Math.round((rejectedCount / totalApps) * 100) : 0;

  // Work Mode Breakdown
  const remoteCount = applications.filter((a) => a.workMode === 'Remote').length;
  const hybridCount = applications.filter((a) => a.workMode === 'Hybrid').length;
  const onsiteCount = applications.filter((a) => a.workMode === 'On-site').length;

  return (
    <div style={{ padding: '28px 24px 60px 24px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: '900',
                color: isDark ? '#FFF' : '#172033',
                letterSpacing: '-0.03em'
              }}
            >
              Career Performance & Analytics
            </h1>
            <span
              style={{
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
                color: '#FFF',
                fontSize: '0.72rem',
                fontWeight: '700'
              }}
            >
              Live Data
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
            Accurate conversion funnels and interview ratios computed directly from your records.
          </p>
        </div>

        {/* Date Range Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select
            className="form-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{ width: 'auto', minWidth: '150px' }}
          >
            <option value="all">All-Time Metrics</option>
            <option value="30days">Last 30 Days</option>
            <option value="year">2026 Season</option>
          </select>
        </div>
      </div>

      {/* 4 Core Dynamic KPI Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '18px',
          marginBottom: '28px'
        }}
      >
        {/* Total Apps */}
        <div className="card-3d" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: '600', color: isDark ? '#A0AEC0' : '#64748B' }}>
              Total Tracked
            </span>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(79, 140, 255, 0.15)', color: '#4F8CFF' }}>
              <Briefcase size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: isDark ? '#FFF' : '#172033' }}>
            {totalApps}
          </h2>
          <p style={{ fontSize: '0.75rem', color: '#4F8CFF', marginTop: '4px' }}>
            Pipeline application base
          </p>
        </div>

        {/* Interview Conversion Rate */}
        <div className="card-3d" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: '600', color: isDark ? '#A0AEC0' : '#64748B' }}>
              Interview Rate
            </span>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', color: '#06B6D4' }}>
              <Percent size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#06B6D4' }}>
            {interviewConversionRate}%
          </h2>
          <p style={{ fontSize: '0.75rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
            {interviewCount} of {totalApps} led to interviews
          </p>
        </div>

        {/* Selection Rate */}
        <div className="card-3d" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: '600', color: isDark ? '#A0AEC0' : '#64748B' }}>
              Offer / Selection Rate
            </span>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <Award size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#10B981' }}>
            {selectionRate}%
          </h2>
          <p style={{ fontSize: '0.75rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
            {offersAndSelectedCount} offers & selections won
          </p>
        </div>

        {/* Rejection Rate */}
        <div className="card-3d" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: '600', color: isDark ? '#A0AEC0' : '#64748B' }}>
              Rejection Rate
            </span>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' }}>
              <XCircle size={18} />
            </div>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#EF4444' }}>
            {rejectionRate}%
          </h2>
          <p style={{ fontSize: '0.75rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
            {rejectedCount} closed opportunities
          </p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '24px',
          marginBottom: '28px'
        }}
      >
        {/* Monthly Trend Area Chart */}
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            padding: '24px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(15, 23, 42, 0.05)'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033', marginBottom: '6px' }}>
            Monthly Application & Interview Velocity
          </h3>
          <p style={{ fontSize: '0.8rem', color: isDark ? '#A0AEC0' : '#64748B', marginBottom: '16px' }}>
            Volume trend comparing submitted applications to active interview schedules.
          </p>
          <MonthlyApplicationChart applications={applications} />
        </div>

        {/* Application Status Distribution */}
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            padding: '24px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(15, 23, 42, 0.05)'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033', marginBottom: '6px' }}>
            Lifecycle Status Distribution
          </h3>
          <p style={{ fontSize: '0.8rem', color: isDark ? '#A0AEC0' : '#64748B', marginBottom: '16px' }}>
            Percentage breakdown of applications currently in each funnel stage.
          </p>
          <StatusPieChart applications={applications} />
        </div>
      </div>

      {/* Lower Row: Job Source Analysis & Work Mode Breakdown */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Source Analysis Bar Chart */}
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            padding: '24px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(15, 23, 42, 0.05)'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033', marginBottom: '6px' }}>
            Job Source Channel Performance
          </h3>
          <p style={{ fontSize: '0.8rem', color: isDark ? '#A0AEC0' : '#64748B', marginBottom: '16px' }}>
            Submissions distribution across LinkedIn, Indeed, Referrals, Naukri, and Company Sites.
          </p>
          <JobSourceBarChart applications={applications} />
        </div>

        {/* Work Mode Breakdown */}
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            padding: '24px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(15, 23, 42, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033', marginBottom: '6px' }}>
              Work Mode Distribution
            </h3>
            <p style={{ fontSize: '0.8rem', color: isDark ? '#A0AEC0' : '#64748B', marginBottom: '20px' }}>
              Ratio of Remote, Hybrid, and On-site opportunities in your pipeline.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Remote */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '4px' }}>
                  <span style={{ color: isDark ? '#FFF' : '#172033', fontWeight: '600' }}>Remote</span>
                  <span style={{ color: '#4F8CFF', fontWeight: '700' }}>
                    {remoteCount} ({totalApps > 0 ? Math.round((remoteCount / totalApps) * 100) : 0}%)
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', background: isDark ? '#1F293D' : '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${totalApps > 0 ? (remoteCount / totalApps) * 100 : 0}%`, height: '100%', background: '#4F8CFF', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Hybrid */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '4px' }}>
                  <span style={{ color: isDark ? '#FFF' : '#172033', fontWeight: '600' }}>Hybrid</span>
                  <span style={{ color: '#8B5CF6', fontWeight: '700' }}>
                    {hybridCount} ({totalApps > 0 ? Math.round((hybridCount / totalApps) * 100) : 0}%)
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', background: isDark ? '#1F293D' : '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${totalApps > 0 ? (hybridCount / totalApps) * 100 : 0}%`, height: '100%', background: '#8B5CF6', borderRadius: '4px' }} />
                </div>
              </div>

              {/* On-site */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '4px' }}>
                  <span style={{ color: isDark ? '#FFF' : '#172033', fontWeight: '600' }}>On-site</span>
                  <span style={{ color: '#F59E0B', fontWeight: '700' }}>
                    {onsiteCount} ({totalApps > 0 ? Math.round((onsiteCount / totalApps) * 100) : 0}%)
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', background: isDark ? '#1F293D' : '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${totalApps > 0 ? (onsiteCount / totalApps) * 100 : 0}%`, height: '100%', background: '#F59E0B', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: isDark ? '#0E1528' : '#F8FAFC',
              border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
              marginTop: '20px',
              fontSize: '0.775rem',
              color: isDark ? '#A0AEC0' : '#64748B'
            }}
          >
            💡 <strong>Insight:</strong> Remote and Hybrid roles maintain the strongest interview engagement ratios across your searches.
          </div>
        </div>
      </div>
    </div>
  );
}
