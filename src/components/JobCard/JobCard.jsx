import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useApplications } from '../../context/ApplicationContext';
import { useTheme } from '../../context/ThemeContext';

export default function JobCard({ application, onViewDetails, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { updateStatus, deleteApplication } = useApplications();
  const { isDark } = useTheme();

  const STATUSES = [
    'Applied',
    'Under Review',
    'Shortlisted',
    'Interview Scheduled',
    'Offer Received',
    'Selected',
    'Rejected'
  ];

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

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete application for ${application.companyName}?`)) {
      deleteApplication(application.id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card-3d"
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      }}
    >
      {/* Top Row: Company initial/logo & Status dropdown */}
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: application.color || 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '1.15rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                flexShrink: 0
              }}
            >
              {application.companyName.charAt(0)}
            </div>
            <div>
              <h4
                style={{
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  color: isDark ? '#FFFFFF' : '#172033',
                  lineHeight: 1.2
                }}
              >
                {application.companyName}
              </h4>
              <span
                style={{
                  fontSize: '0.675rem',
                  fontFamily: 'var(--font-mono)',
                  color: isDark ? '#A0AEC0' : '#64748B'
                }}
              >
                {application.id}
              </span>
            </div>
          </div>

          {/* Status selector badge */}
          <div style={{ position: 'relative' }}>
            <select
              value={application.status}
              onChange={(e) => updateStatus(application.id, e.target.value)}
              className={`badge ${getStatusBadgeClass(application.status)}`}
              style={{
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                paddingRight: '22px',
                border: 'none',
                outline: 'none',
                background: undefined // keep class background
              }}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s} style={{ background: isDark ? '#151D32' : '#FFFFFF', color: isDark ? '#FFF' : '#172033' }}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                opacity: 0.6
              }}
            />
          </div>
        </div>

        {/* Job Position */}
        <h5
          style={{
            fontSize: '0.95rem',
            fontWeight: '600',
            color: isDark ? '#FFFFFF' : '#1E293B',
            marginBottom: '12px',
            lineHeight: 1.35
          }}
        >
          {application.jobPosition}
        </h5>

        {/* Attributes pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.725rem',
              color: isDark ? '#A0AEC0' : '#64748B',
              background: isDark ? '#1F293D' : '#F1F5F9',
              padding: '4px 8px',
              borderRadius: '6px'
            }}
          >
            <MapPin size={12} />
            {application.jobLocation}
          </span>
          <span
            style={{
              fontSize: '0.725rem',
              color: '#4F8CFF',
              background: isDark ? 'rgba(79, 140, 255, 0.1)' : '#EEF2FF',
              padding: '4px 8px',
              borderRadius: '6px',
              fontWeight: '500'
            }}
          >
            {application.workMode}
          </span>
          {application.salaryRange && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                fontSize: '0.725rem',
                color: '#10B981',
                background: isDark ? 'rgba(16, 185, 129, 0.1)' : '#ECFDF5',
                padding: '4px 8px',
                borderRadius: '6px',
                fontWeight: '600'
              }}
            >
              <DollarSign size={12} />
              {application.salaryRange}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Applied date & Action buttons */}
      <div
        style={{
          borderTop: `1px solid ${isDark ? '#29344D' : '#F1F5F9'}`,
          paddingTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.725rem',
            color: isDark ? '#64748B' : '#94A3B8'
          }}
        >
          <Calendar size={13} />
          {application.appliedDate}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            onClick={() => onViewDetails(application)}
            title="View Details"
            className="btn btn-sm btn-secondary"
            style={{ padding: '6px 8px', fontSize: '0.75rem' }}
          >
            <Eye size={14} /> Details
          </button>
          <button
            onClick={() => onEdit(application)}
            title="Edit Application"
            style={{
              padding: '6px',
              borderRadius: '8px',
              color: isDark ? '#A0AEC0' : '#64748B',
              cursor: 'pointer'
            }}
          >
            <Edit size={14} />
          </button>
          <button
            onClick={handleDelete}
            title="Delete Application"
            style={{
              padding: '6px',
              borderRadius: '8px',
              color: '#EF4444',
              cursor: 'pointer'
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
