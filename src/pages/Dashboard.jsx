import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Award,
  XCircle,
  Clock,
  Plus,
  ArrowUpRight,
  Sparkles,
  Layers,
  Activity,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StatCard from '../components/DashboardCards/StatCard';
import MonthlyApplicationChart from '../components/Charts/MonthlyApplicationChart';
import StatusPieChart from '../components/Charts/StatusPieChart';
import RecentApplications from '../components/DashboardCards/RecentApplications';
import UpcomingInterviewsWidget from '../components/DashboardCards/UpcomingInterviewsWidget';
import ApplicationDetailModal from '../components/JobCard/ApplicationDetailModal';
import EditApplicationModal from '../components/JobCard/EditApplicationModal';
import AddApplication from './AddApplication';
import { useApplications } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Dashboard() {
  const { applications, interviews, recentActivity } = useApplications();
  const { user } = useAuth();
  const { isDark } = useTheme();

  const [selectedApp, setSelectedApp] = useState(null);
  const [editingApp, setEditingApp] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Dynamic statistics calculations
  const totalApplications = applications.length;
  const interviewsScheduled = applications.filter((a) => a.status === 'Interview Scheduled').length;
  const offersReceived = applications.filter((a) => a.status === 'Offer Received').length;
  const selectedJobs = applications.filter((a) => a.status === 'Selected').length;
  const rejectedApplications = applications.filter((a) => a.status === 'Rejected').length;
  const upcomingInterviews = interviews.filter((i) => i.status === 'Upcoming').length;

  return (
    <div style={{ padding: '28px 24px 60px 24px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Top Welcome Bar */}
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
                color: isDark ? '#FFFFFF' : '#172033',
                letterSpacing: '-0.03em'
              }}
            >
              Welcome back, {user?.fullName?.split(' ')[0] || 'Candidate'}!
            </h1>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(79, 140, 255, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                border: '1px solid rgba(79, 140, 255, 0.3)',
                color: '#4F8CFF',
                fontSize: '0.75rem',
                fontWeight: '700'
              }}
            >
              Live SaaS View
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
            Track application pipeline velocity, upcoming technical screens, and offer negotiations.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary"
            style={{ padding: '10px 18px', fontSize: '0.875rem' }}
          >
            <Plus size={16} /> Quick Add Application
          </button>
          <Link to="/kanban" className="btn btn-secondary" style={{ padding: '10px 16px', fontSize: '0.875rem' }}>
            <Layers size={16} /> 3D Kanban
          </Link>
        </div>
      </div>

      {/* 6 Statistic Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '18px',
          marginBottom: '28px'
        }}
      >
        {/* 1. Total Applications */}
        <StatCard
          title="Total Applications"
          count={totalApplications}
          icon={Briefcase}
          gradient="linear-gradient(135deg, #4F8CFF 0%, #3B82F6 100%)"
          color="#4F8CFF"
          trend="+12% this mo"
          progress={Math.min((totalApplications / 15) * 100, 100)}
          description="Active tracked searches"
        />

        {/* 2. Interviews Scheduled */}
        <StatCard
          title="Interviews Scheduled"
          count={interviewsScheduled}
          icon={Calendar}
          gradient="linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)"
          color="#06B6D4"
          trend="In Progress"
          progress={totalApplications > 0 ? (interviewsScheduled / totalApplications) * 100 : 0}
          description="Technical & system rounds"
        />

        {/* 3. Offers Received */}
        <StatCard
          title="Offers Received"
          count={offersReceived}
          icon={CheckCircle2}
          gradient="linear-gradient(135deg, #10B981 0%, #059669 100%)"
          color="#10B981"
          trend="Negotiating"
          progress={totalApplications > 0 ? (offersReceived / totalApplications) * 100 : 0}
          description="Ready for decision"
        />

        {/* 4. Selected Jobs */}
        <StatCard
          title="Selected Jobs"
          count={selectedJobs}
          icon={Award}
          gradient="linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
          color="#8B5CF6"
          trend="Hired"
          progress={totalApplications > 0 ? (selectedJobs / totalApplications) * 100 : 0}
          description="Accepted career milestones"
        />

        {/* 5. Rejected Applications */}
        <StatCard
          title="Rejected Applications"
          count={rejectedApplications}
          icon={XCircle}
          gradient="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
          color="#EF4444"
          trend="Archive"
          progress={totalApplications > 0 ? (rejectedApplications / totalApplications) * 100 : 0}
          description="Closed hiring loops"
        />

        {/* 6. Upcoming Interviews */}
        <StatCard
          title="Upcoming Interviews"
          count={upcomingInterviews}
          icon={Clock}
          gradient="linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
          color="#F59E0B"
          trend="Countdown"
          progress={upcomingInterviews * 25}
          description="Live preparation calendar"
        />
      </div>

      {/* Charts Grid: Monthly Volume Area Chart + Status Donut Chart */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '20px',
          marginBottom: '28px'
        }}
      >
        {/* Monthly Trend Area Chart */}
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            padding: '22px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(15, 23, 42, 0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: isDark ? '#FFFFFF' : '#172033' }}>
                Application Velocity Trends
              </h3>
              <p style={{ fontSize: '0.75rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
                Monthly tracked submissions vs. interview conversion
              </p>
            </div>
            <span
              style={{
                fontSize: '0.72rem',
                padding: '3px 8px',
                borderRadius: '6px',
                background: isDark ? '#1F293D' : '#F1F5F9',
                color: '#4F8CFF',
                fontWeight: '600'
              }}
            >
              Last 6 Months
            </span>
          </div>

          <MonthlyApplicationChart applications={applications} />
        </div>

        {/* Status Pie Chart */}
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            padding: '22px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(15, 23, 42, 0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: isDark ? '#FFFFFF' : '#172033' }}>
                Pipeline Distribution
              </h3>
              <p style={{ fontSize: '0.75rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
                Status breakdown of all active records
              </p>
            </div>
            <Link
              to="/analytics"
              style={{
                fontSize: '0.75rem',
                color: '#4F8CFF',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              Analytics <ArrowUpRight size={12} />
            </Link>
          </div>

          <StatusPieChart applications={applications} />
        </div>
      </div>

      {/* Lower Row: Recent Applications + Upcoming Interviews + Recent Activity */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px'
        }}
      >
        {/* Recent Applications Card */}
        <RecentApplications
          onViewDetails={(app) => setSelectedApp(app)}
        />

        {/* Upcoming Next Interview Widget */}
        <UpcomingInterviewsWidget />

        {/* Live Activity Feed */}
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            padding: '22px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(15, 23, 42, 0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: isDark ? '#FFFFFF' : '#172033' }}>
                Recent Activity
              </h3>
              <p style={{ fontSize: '0.75rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
                Audit trail of changes & moves
              </p>
            </div>
            <Activity size={18} color="#4F8CFF" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto' }}>
            {recentActivity.map((act) => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontSize: '0.8rem',
                  paddingBottom: '10px',
                  borderBottom: `1px solid ${isDark ? '#1F293D' : '#F1F5F9'}`
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: act.type === 'offer' ? '#10B981' : act.type === 'interview' ? '#06B6D4' : '#4F8CFF',
                    marginTop: '5px',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ color: isDark ? '#FFFFFF' : '#172033', lineHeight: 1.35 }}>
                    {act.action}
                  </p>
                  <span style={{ fontSize: '0.7rem', color: isDark ? '#64748B' : '#94A3B8' }}>
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      <ApplicationDetailModal
        application={selectedApp}
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        onEdit={(app) => {
          setSelectedApp(null);
          setEditingApp(app);
        }}
      />

      {/* Edit Application Modal */}
      <EditApplicationModal
        application={editingApp}
        isOpen={!!editingApp}
        onClose={() => setEditingApp(null)}
      />

      {/* Add Application Modal instance */}
      {showAddModal && (
        <AddApplication isModal={true} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
