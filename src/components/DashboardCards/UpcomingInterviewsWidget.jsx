import React, { useState, useEffect } from 'react';
import { Calendar, Video, Clock, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApplications } from '../../context/ApplicationContext';
import { useTheme } from '../../context/ThemeContext';

export default function UpcomingInterviewsWidget() {
  const { interviews } = useApplications();
  const { isDark } = useTheme();

  const upcoming = interviews.filter((i) => i.status === 'Upcoming');
  const nextInterview = upcoming[0];

  // Live countdown calculation
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!nextInterview) {
      setTimeLeft('No interviews scheduled');
      return;
    }

    const calculateCountdown = () => {
      const interviewDateTime = new Date(`${nextInterview.interviewDate}T${nextInterview.interviewTime}:00`);
      const now = new Date();
      const diffMs = interviewDateTime - now;

      if (diffMs <= 0) {
        setTimeLeft('Interview time / In session');
        return;
      }

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m`);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000); // update every minute

    return () => clearInterval(interval);
  }, [nextInterview]);

  return (
    <div
      style={{
        background: isDark ? '#151D32' : '#FFFFFF',
        borderRadius: '20px',
        border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
        padding: '22px',
        boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(15, 23, 42, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: isDark ? '#FFFFFF' : '#172033' }}>
            Next Interview
          </h3>
          <p style={{ fontSize: '0.75rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
            Live preparation countdown
          </p>
        </div>
        <Link
          to="/interviews"
          style={{
            fontSize: '0.8rem',
            fontWeight: '600',
            color: '#4F8CFF',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          All ({upcoming.length}) <ArrowRight size={14} />
        </Link>
      </div>

      {nextInterview ? (
        <div
          style={{
            padding: '16px',
            borderRadius: '16px',
            background: isDark
              ? 'linear-gradient(135deg, rgba(79, 140, 255, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)'
              : 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)',
            border: `1px solid ${isDark ? 'rgba(79, 140, 255, 0.3)' : '#E0E7FF'}`
          }}
        >
          {/* Top row: Company & Countdown Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span
              style={{
                fontSize: '0.95rem',
                fontWeight: '800',
                color: isDark ? '#FFFFFF' : '#1E293B'
              }}
            >
              {nextInterview.companyName}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: '700',
                background: '#4F8CFF',
                color: '#FFFFFF',
                padding: '3px 8px',
                borderRadius: '6px'
              }}
            >
              <Clock size={12} />
              {timeLeft}
            </span>
          </div>

          <h5 style={{ fontSize: '0.85rem', fontWeight: '600', color: isDark ? '#38BDF8' : '#2563EB', marginBottom: '8px' }}>
            {nextInterview.round}
          </h5>

          <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem', color: isDark ? '#A0AEC0' : '#64748B', marginBottom: '14px' }}>
            <span>📅 {nextInterview.interviewDate} at {nextInterview.interviewTime}</span>
            <span>📹 {nextInterview.mode}</span>
          </div>

          {nextInterview.meetingLink && (
            <a
              href={nextInterview.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
            >
              <Video size={14} /> Join Meeting Room
            </a>
          )}
        </div>
      ) : (
        <div style={{ padding: '28px', textAlign: 'center', color: isDark ? '#A0AEC0' : '#64748B' }}>
          <Calendar size={32} style={{ opacity: 0.3, marginBottom: '8px' }} />
          <p style={{ fontSize: '0.85rem' }}>No upcoming interviews scheduled</p>
          <Link to="/interviews" className="btn btn-outline btn-sm" style={{ marginTop: '12px' }}>
            Schedule Interview
          </Link>
        </div>
      )}
    </div>
  );
}
