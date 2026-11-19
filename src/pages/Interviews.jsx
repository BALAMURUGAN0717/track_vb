import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  Video,
  CheckCircle,
  LayoutGrid,
  List,
  Filter
} from 'lucide-react';
import InterviewCalendar from '../components/InterviewCalendar/InterviewCalendar';
import InterviewCard from '../components/InterviewCalendar/InterviewCard';
import AddInterviewModal from '../components/InterviewCalendar/AddInterviewModal';
import { useApplications } from '../context/ApplicationContext';
import { useTheme } from '../context/ThemeContext';

export default function Interviews() {
  const { interviews } = useApplications();
  const { isDark } = useTheme();

  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed' | 'calendar'
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);

  const upcomingInterviews = interviews.filter((i) => i.status === 'Upcoming');
  const completedInterviews = interviews.filter((i) => i.status === 'Completed');

  const displayedList = activeTab === 'upcoming' ? upcomingInterviews : completedInterviews;

  return (
    <div style={{ padding: '28px 24px 60px 24px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px'
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
              Interview Management Center
            </h1>
            <span
              style={{
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(6, 182, 212, 0.15)',
                color: '#06B6D4',
                fontSize: '0.72rem',
                fontWeight: '700'
              }}
            >
              Live Countdown
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
            Coordinate technical screens, system design rounds, meeting links, and prep notes.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingInterview(null);
            setShowAddModal(true);
          }}
          className="btn btn-primary"
          style={{ padding: '10px 18px', fontSize: '0.875rem' }}
        >
          <Plus size={16} /> Schedule Interview
        </button>
      </div>

      {/* Tabs Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px',
          borderBottom: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
          paddingBottom: '12px',
          flexWrap: 'wrap'
        }}
      >
        <button
          onClick={() => setActiveTab('upcoming')}
          className="btn btn-sm"
          style={{
            background: activeTab === 'upcoming' ? (isDark ? '#1F293D' : '#EEF2FF') : 'transparent',
            color: activeTab === 'upcoming' ? '#4F8CFF' : isDark ? '#A0AEC0' : '#64748B',
            fontWeight: activeTab === 'upcoming' ? '700' : '500',
            border: activeTab === 'upcoming' ? '1px solid rgba(79, 140, 255, 0.3)' : '1px solid transparent'
          }}
        >
          <Clock size={14} /> Upcoming ({upcomingInterviews.length})
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          className="btn btn-sm"
          style={{
            background: activeTab === 'calendar' ? (isDark ? '#1F293D' : '#EEF2FF') : 'transparent',
            color: activeTab === 'calendar' ? '#4F8CFF' : isDark ? '#A0AEC0' : '#64748B',
            fontWeight: activeTab === 'calendar' ? '700' : '500',
            border: activeTab === 'calendar' ? '1px solid rgba(79, 140, 255, 0.3)' : '1px solid transparent'
          }}
        >
          <CalendarIcon size={14} /> Monthly Calendar View
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className="btn btn-sm"
          style={{
            background: activeTab === 'completed' ? (isDark ? '#1F293D' : '#EEF2FF') : 'transparent',
            color: activeTab === 'completed' ? '#4F8CFF' : isDark ? '#A0AEC0' : '#64748B',
            fontWeight: activeTab === 'completed' ? '700' : '500',
            border: activeTab === 'completed' ? '1px solid rgba(79, 140, 255, 0.3)' : '1px solid transparent'
          }}
        >
          <CheckCircle size={14} /> Past & Completed ({completedInterviews.length})
        </button>
      </div>

      {/* Main View Display */}
      {activeTab === 'calendar' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          <InterviewCalendar
            onSelectDate={(dateStr) => setSelectedCalendarDate(dateStr)}
            onAddInterview={() => setShowAddModal(true)}
          />

          <div
            style={{
              background: isDark ? '#151D32' : '#FFFFFF',
              borderRadius: '20px',
              border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
              padding: '24px'
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033', marginBottom: '14px' }}>
              {selectedCalendarDate ? `Sessions on ${selectedCalendarDate}` : 'All Scheduled Sessions'}
            </h3>

            {interviews
              .filter((i) => !selectedCalendarDate || i.interviewDate === selectedCalendarDate)
              .map((item) => (
                <div key={item.id} style={{ marginBottom: '12px' }}>
                  <InterviewCard
                    interview={item}
                    onEdit={(intv) => {
                      setEditingInterview(intv);
                      setShowAddModal(true);
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      ) : (
        /* List / Grid View */
        displayedList.length === 0 ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              background: isDark ? '#151D32' : '#FFFFFF',
              borderRadius: '20px',
              border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`
            }}
          >
            <CalendarIcon size={44} style={{ opacity: 0.3, margin: '0 auto 12px auto' }} />
            <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033' }}>
              No {activeTab} interviews found
            </h4>
            <p style={{ fontSize: '0.85rem', color: isDark ? '#A0AEC0' : '#64748B', margin: '6px 0 16px 0' }}>
              Schedule your next hiring conversation or recruiter screening.
            </p>
            <button
              onClick={() => {
                setEditingInterview(null);
                setShowAddModal(true);
              }}
              className="btn btn-primary btn-sm"
            >
              <Plus size={14} /> Schedule Interview
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '20px'
            }}
          >
            {displayedList.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                onEdit={(intv) => {
                  setEditingInterview(intv);
                  setShowAddModal(true);
                }}
              />
            ))}
          </div>
        )
      )}

      {/* Add / Edit Interview Modal */}
      <AddInterviewModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingInterview(null);
        }}
        interviewToEdit={editingInterview}
      />
    </div>
  );
}
