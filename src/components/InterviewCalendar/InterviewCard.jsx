import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Edit, Trash2, ExternalLink, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApplications } from '../../context/ApplicationContext';
import { useTheme } from '../../context/ThemeContext';

export default function InterviewCard({ interview, onEdit }) {
  const { deleteInterview, updateInterview } = useApplications();
  const { isDark } = useTheme();

  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateCountdown = () => {
      if (interview.status === 'Completed') {
        setTimeLeft('Completed');
        return;
      }

      const interviewDate = new Date(`${interview.interviewDate}T${interview.interviewTime}:00`);
      const now = new Date();
      const diffMs = interviewDate - now;

      if (diffMs <= 0) {
        setTimeLeft('Happening now / In session');
        return;
      }

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

      if (days > 0) {
        setTimeLeft(`In ${days}d ${hours}h`);
      } else {
        setTimeLeft(`In ${hours}h ${minutes}m`);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000);
    return () => clearInterval(interval);
  }, [interview]);

  const handleDelete = () => {
    if (window.confirm(`Delete interview schedule for ${interview.companyName}?`)) {
      deleteInterview(interview.id);
    }
  };

  const handleMarkCompleted = () => {
    updateInterview(interview.id, {
      status: interview.status === 'Completed' ? 'Upcoming' : 'Completed'
    });
  };

  const isCompleted = interview.status === 'Completed';

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="card-3d"
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: isCompleted ? 0.75 : 1
      }}
    >
      <div>
        {/* Header: Company & Countdown Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {interview.companyName.charAt(0)}
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033' }}>
                {interview.companyName}
              </h4>
              <span style={{ fontSize: '0.72rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
                {interview.jobRole}
              </span>
            </div>
          </div>

          <span
            style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: '700',
              padding: '3px 8px',
              borderRadius: '6px',
              background: isCompleted
                ? isDark
                  ? '#1F293D'
                  : '#E2E8F0'
                : 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
              color: isCompleted ? (isDark ? '#A0AEC0' : '#64748B') : '#FFFFFF'
            }}
          >
            {timeLeft}
          </span>
        </div>

        {/* Round Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '8px',
            background: isDark ? 'rgba(6, 182, 212, 0.12)' : '#ECFEFF',
            color: '#06B6D4',
            fontSize: '0.775rem',
            fontWeight: '600',
            marginBottom: '14px'
          }}
        >
          <Video size={13} /> {interview.round}
        </div>

        {/* Date, Time & Mode */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: isDark ? '#A0AEC0' : '#475569', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} color="#4F8CFF" />
            <span>{interview.interviewDate} at {interview.interviewTime}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} color="#8B5CF6" />
            <span>Mode: <strong>{interview.mode}</strong></span>
          </div>
        </div>

        {/* Notes */}
        {interview.notes && (
          <div
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              background: isDark ? '#0F162A' : '#F8FAFC',
              border: `1px solid ${isDark ? '#1F293D' : '#E2E8F0'}`,
              fontSize: '0.75rem',
              color: isDark ? '#A0AEC0' : '#64748B',
              lineHeight: 1.4,
              marginBottom: '16px'
            }}
          >
            <strong>Prep Notes:</strong> {interview.notes}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div
        style={{
          borderTop: `1px solid ${isDark ? '#29344D' : '#F1F5F9'}`,
          paddingTop: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={handleMarkCompleted}
            className="btn btn-sm btn-secondary"
            title={isCompleted ? 'Mark as Upcoming' : 'Mark as Completed'}
            style={{
              fontSize: '0.75rem',
              padding: '6px 8px',
              color: isCompleted ? '#10B981' : isDark ? '#A0AEC0' : '#64748B'
            }}
          >
            <CheckCircle size={14} /> {isCompleted ? 'Completed' : 'Done'}
          </button>
          <button
            onClick={() => onEdit(interview)}
            title="Edit Interview"
            style={{ padding: '6px', borderRadius: '8px', color: isDark ? '#A0AEC0' : '#64748B', cursor: 'pointer' }}
          >
            <Edit size={14} />
          </button>
          <button
            onClick={handleDelete}
            title="Delete Interview"
            style={{ padding: '6px', borderRadius: '8px', color: '#EF4444', cursor: 'pointer' }}
          >
            <Trash2 size={14} />
          </button>
        </div>

        {interview.meetingLink && (
          <a
            href={interview.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary"
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
          >
            <ExternalLink size={13} /> Launch Link
          </a>
        )}
      </div>
    </motion.div>
  );
}
