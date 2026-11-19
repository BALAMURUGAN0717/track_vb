import React from 'react';
import { MapPin, Calendar, DollarSign, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function KanbanCard({
  application,
  onDragStart,
  onViewDetails,
  onMoveColumn,
  canMoveLeft,
  canMoveRight
}) {
  const { isDark } = useTheme();

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return <span className="badge badge-priority-high">High</span>;
      case 'Medium':
        return <span className="badge badge-priority-medium">Medium</span>;
      default:
        return <span className="badge badge-priority-low">Low</span>;
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, application.id)}
      style={{
        background: isDark ? '#151D32' : '#FFFFFF',
        borderRadius: '14px',
        border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
        padding: '14px',
        boxShadow: isDark
          ? '0 6px 16px rgba(0,0,0,0.4)'
          : '0 4px 12px rgba(15, 23, 42, 0.05)',
        cursor: 'grab',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        position: 'relative',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = isDark
          ? '0 10px 24px rgba(79, 140, 255, 0.2)'
          : '0 10px 20px rgba(79, 140, 255, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = isDark
          ? '0 6px 16px rgba(0,0,0,0.4)'
          : '0 4px 12px rgba(15, 23, 42, 0.05)';
      }}
    >
      {/* Top: Company Initial + Name + Priority */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: application.color || '#4F8CFF',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {application.companyName.charAt(0)}
          </div>
          <span style={{ fontSize: '0.875rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033' }}>
            {application.companyName}
          </span>
        </div>
        {getPriorityBadge(application.priority)}
      </div>

      {/* Role */}
      <h5
        style={{
          fontSize: '0.825rem',
          fontWeight: '600',
          color: isDark ? '#E2E8F0' : '#334155',
          lineHeight: 1.35
        }}
      >
        {application.jobPosition}
      </h5>

      {/* Salary & Location */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <MapPin size={11} /> {application.jobLocation}
        </span>
        {application.salaryRange && (
          <span style={{ color: '#10B981', fontWeight: '600' }}>
            {application.salaryRange}
          </span>
        )}
      </div>

      {/* Footer: Date & Quick Actions */}
      <div
        style={{
          borderTop: `1px solid ${isDark ? '#222D46' : '#F1F5F9'}`,
          paddingTop: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span style={{ fontSize: '0.675rem', color: isDark ? '#64748B' : '#94A3B8' }}>
          {application.appliedDate}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {canMoveLeft && (
            <button
              onClick={() => onMoveColumn(application.id, -1)}
              title="Move to Previous Column"
              style={{
                padding: '3px',
                borderRadius: '6px',
                color: isDark ? '#A0AEC0' : '#64748B',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={14} />
            </button>
          )}

          <button
            onClick={() => onViewDetails(application)}
            title="View Details"
            style={{
              padding: '3px 6px',
              fontSize: '0.7rem',
              borderRadius: '6px',
              background: isDark ? '#1F293D' : '#EEF2FF',
              color: '#4F8CFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '3px'
            }}
          >
            <Eye size={12} /> Details
          </button>

          {canMoveRight && (
            <button
              onClick={() => onMoveColumn(application.id, 1)}
              title="Move to Next Column"
              style={{
                padding: '3px',
                borderRadius: '6px',
                color: isDark ? '#A0AEC0' : '#64748B',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
