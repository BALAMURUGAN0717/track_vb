import React, { useState } from 'react';
import {
  X,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  ExternalLink,
  FileText,
  Clock,
  CheckCircle,
  Tag,
  Edit3,
  Trash2,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useApplications } from '../../context/ApplicationContext';
import { useTheme } from '../../context/ThemeContext';

export default function ApplicationDetailModal({ application, isOpen, onClose, onEdit }) {
  const [newNote, setNewNote] = useState('');
  const { updateStatus, addNote, deleteApplication } = useApplications();
  const { isDark } = useTheme();

  if (!isOpen || !application) return null;

  const STATUS_STAGES = [
    'Applied',
    'Under Review',
    'Shortlisted',
    'Interview Scheduled',
    'Offer Received',
    'Selected'
  ];

  const currentStageIndex = STATUS_STAGES.indexOf(application.status);
  const isRejected = application.status === 'Rejected';

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addNote(application.id, newNote.trim());
    setNewNote('');
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the application for ${application.companyName}?`)) {
      deleteApplication(application.id);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 150,
        background: 'rgba(5, 8, 18, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          background: isDark ? '#151D32' : '#FFFFFF',
          borderRadius: '24px',
          border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
          boxShadow: isDark
            ? '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(79, 140, 255, 0.15)'
            : '0 25px 50px rgba(15, 23, 42, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: isDark ? '#0E1528' : '#F8FAFC'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: application.color || '#4F8CFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '1.2rem',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
              }}
            >
              {application.companyName.charAt(0)}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033' }}>
                  {application.companyName}
                </h3>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: isDark ? '#1F293D' : '#E2E8F0',
                    color: isDark ? '#A0AEC0' : '#475569'
                  }}
                >
                  {application.id}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
                {application.jobPosition}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              color: isDark ? '#A0AEC0' : '#64748B',
              background: isDark ? '#1F293D' : '#F1F5F9',
              padding: '6px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Progress Timeline */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033', marginBottom: '12px' }}>
              Application Progress Timeline
            </h4>
            {isRejected ? (
              <div
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#EF4444',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>● Status: Application Rejected by employer. Keep pushing forward!</span>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflowX: 'auto',
                  padding: '10px 4px'
                }}
              >
                {STATUS_STAGES.map((stage, idx) => {
                  const isCompleted = currentStageIndex >= idx;
                  const isCurrent = currentStageIndex === idx;

                  return (
                    <div
                      key={stage}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flex: 1,
                        minWidth: '70px',
                        position: 'relative',
                        zIndex: 2
                      }}
                    >
                      <button
                        onClick={() => updateStatus(application.id, stage)}
                        title={`Set status to ${stage}`}
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: isCurrent
                            ? '#4F8CFF'
                            : isCompleted
                            ? '#10B981'
                            : isDark
                            ? '#1F293D'
                            : '#E2E8F0',
                          color: '#FFFFFF',
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: isCurrent ? '3px solid rgba(79, 140, 255, 0.3)' : 'none',
                          boxShadow: isCurrent ? '0 0 10px #4F8CFF' : 'none',
                          cursor: 'pointer',
                          marginBottom: '6px'
                        }}
                      >
                        {isCompleted && !isCurrent ? '✓' : idx + 1}
                      </button>
                      <span
                        style={{
                          fontSize: '0.675rem',
                          fontWeight: isCurrent ? '700' : '500',
                          color: isCurrent
                            ? '#4F8CFF'
                            : isCompleted
                            ? isDark
                              ? '#FFF'
                              : '#172033'
                            : isDark
                            ? '#64748B'
                            : '#94A3B8',
                          textAlign: 'center',
                          lineHeight: 1.2
                        }}
                      >
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Metrics Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px',
              padding: '14px',
              borderRadius: '16px',
              background: isDark ? '#0F162A' : '#F8FAFC',
              border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`
            }}
          >
            <div>
              <span style={{ fontSize: '0.7rem', color: isDark ? '#64748B' : '#94A3B8' }}>Location</span>
              <p style={{ fontSize: '0.825rem', fontWeight: '600', color: isDark ? '#FFF' : '#172033', marginTop: '2px' }}>
                <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} />
                {application.jobLocation}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: isDark ? '#64748B' : '#94A3B8' }}>Work Mode</span>
              <p style={{ fontSize: '0.825rem', fontWeight: '600', color: '#4F8CFF', marginTop: '2px' }}>
                {application.workMode} ({application.jobType})
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: isDark ? '#64748B' : '#94A3B8' }}>Salary</span>
              <p style={{ fontSize: '0.825rem', fontWeight: '600', color: '#10B981', marginTop: '2px' }}>
                <DollarSign size={13} style={{ display: 'inline', marginRight: '2px' }} />
                {application.salaryRange}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: isDark ? '#64748B' : '#94A3B8' }}>Applied Date</span>
              <p style={{ fontSize: '0.825rem', fontWeight: '600', color: isDark ? '#FFF' : '#172033', marginTop: '2px' }}>
                <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                {application.appliedDate}
              </p>
            </div>
          </div>

          {/* Description & URLs */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033', marginBottom: '6px' }}>
              Job Description
            </h4>
            <p style={{ fontSize: '0.85rem', color: isDark ? '#A0AEC0' : '#475569', lineHeight: 1.5 }}>
              {application.jobDescription || 'No description provided.'}
            </p>
            <div style={{ display: 'flex', gap: '14px', marginTop: '10px', flexWrap: 'wrap' }}>
              {application.jobUrl && (
                <a
                  href={application.jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                  style={{ fontSize: '0.775rem' }}
                >
                  <ExternalLink size={13} /> View Job Posting
                </a>
              )}
              {application.resumeUsed && (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.775rem',
                    color: isDark ? '#A0AEC0' : '#64748B',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    background: isDark ? '#1F293D' : '#F1F5F9'
                  }}
                >
                  <FileText size={13} /> {application.resumeUsed}
                </span>
              )}
            </div>
          </div>

          {/* Notes & Activity Log */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033', marginBottom: '8px' }}>
              Interview & Progress Notes
            </h4>
            {application.notes ? (
              <div
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  background: isDark ? '#0E1528' : '#F8FAFC',
                  border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
                  fontSize: '0.8rem',
                  color: isDark ? '#A0AEC0' : '#475569',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.45,
                  maxHeight: '120px',
                  overflowY: 'auto'
                }}
              >
                {application.notes}
              </div>
            ) : (
              <p style={{ fontSize: '0.8rem', color: isDark ? '#64748B' : '#94A3B8' }}>No notes yet.</p>
            )}

            <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <input
                type="text"
                placeholder="Add a new update note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="form-input"
                style={{ fontSize: '0.825rem', padding: '8px 12px' }}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <Plus size={14} /> Add
              </button>
            </form>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: isDark ? '#0E1528' : '#F8FAFC'
          }}
        >
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-danger"
            style={{ fontSize: '0.8rem', padding: '8px 14px' }}
          >
            <Trash2 size={14} /> Delete Application
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                onClose();
                if (onEdit) onEdit(application);
              }}
              className="btn btn-sm btn-secondary"
              style={{ fontSize: '0.8rem', padding: '8px 14px' }}
            >
              <Edit3 size={14} /> Edit Details
            </button>
            <button
              onClick={onClose}
              className="btn btn-sm btn-primary"
              style={{ fontSize: '0.8rem', padding: '8px 16px' }}
            >
              Done
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
