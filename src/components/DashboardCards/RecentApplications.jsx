import React from 'react';
import { Eye, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApplications } from '../../context/ApplicationContext';
import { useTheme } from '../../context/ThemeContext';

export default function RecentApplications({ onViewDetails }) {
  const { applications } = useApplications();
  const { isDark } = useTheme();

  const recent = applications.slice(0, 5);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Applied': return 'badge-applied';
      case 'Under Review': return 'badge-under-review';
      case 'Shortlisted': return 'badge-shortlisted';
      case 'Interview Scheduled': return 'badge-interview';
      case 'Offer Received': return 'badge-offer';
      case 'Selected': return 'badge-selected';
      case 'Rejected': return 'badge-rejected';
      default: return 'badge-applied';
    }
  };

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: isDark ? '#FFFFFF' : '#172033' }}>
            Recent Applications
          </h3>
          <p style={{ fontSize: '0.75rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
            Latest tracked opportunities
          </p>
        </div>
        <Link
          to="/applications"
          style={{
            fontSize: '0.8rem',
            fontWeight: '600',
            color: '#4F8CFF',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {recent.map((app) => (
          <div
            key={app.id}
            onClick={() => onViewDetails(app)}
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              background: isDark ? '#0F162A' : '#F8FAFC',
              border: `1px solid ${isDark ? '#1F293D' : '#F1F5F9'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#4F8CFF';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isDark ? '#1F293D' : '#F1F5F9';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: app.color || '#4F8CFF',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {app.companyName.charAt(0)}
              </div>
              <div style={{ minWidth: 0 }}>
                <h5
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    color: isDark ? '#FFFFFF' : '#172033',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {app.companyName}
                </h5>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: isDark ? '#A0AEC0' : '#64748B',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {app.jobPosition}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <span className={`badge ${getStatusBadgeClass(app.status)}`} style={{ fontSize: '0.7rem' }}>
                {app.status}
              </span>
              <Eye size={16} color={isDark ? '#64748B' : '#94A3B8'} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
