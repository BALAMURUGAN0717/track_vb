import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Video, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApplications } from '../../context/ApplicationContext';
import { useTheme } from '../../context/ThemeContext';

export default function AddInterviewModal({ isOpen, onClose, interviewToEdit = null }) {
  const { applications, addInterview, updateInterview } = useApplications();
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    applicationId: '',
    companyName: '',
    jobRole: '',
    interviewDate: '',
    interviewTime: '10:00',
    round: 'Technical Round 1',
    mode: 'Google Meet',
    meetingLink: '',
    notes: ''
  });

  useEffect(() => {
    if (interviewToEdit) {
      setFormData({
        applicationId: interviewToEdit.applicationId || '',
        companyName: interviewToEdit.companyName || '',
        jobRole: interviewToEdit.jobRole || '',
        interviewDate: interviewToEdit.interviewDate || '',
        interviewTime: interviewToEdit.interviewTime || '10:00',
        round: interviewToEdit.round || 'Technical Round 1',
        mode: interviewToEdit.mode || 'Google Meet',
        meetingLink: interviewToEdit.meetingLink || '',
        notes: interviewToEdit.notes || ''
      });
    } else {
      // Default tomorrow date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setFormData({
        applicationId: '',
        companyName: '',
        jobRole: '',
        interviewDate: tomorrow.toISOString().split('T')[0],
        interviewTime: '14:00',
        round: 'Technical Round 1',
        mode: 'Google Meet',
        meetingLink: 'https://meet.google.com/',
        notes: ''
      });
    }
  }, [interviewToEdit, isOpen]);

  const handleAppSelect = (e) => {
    const appId = e.target.value;
    const selected = applications.find((a) => a.id === appId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        applicationId: appId,
        companyName: selected.companyName,
        jobRole: selected.jobPosition
      }));
    } else {
      setFormData((prev) => ({ ...prev, applicationId: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName.trim() || !formData.interviewDate) return;

    if (interviewToEdit) {
      updateInterview(interviewToEdit.id, formData);
    } else {
      addInterview(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 160,
        background: 'rgba(5, 8, 18, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          background: isDark ? '#151D32' : '#FFFFFF',
          borderRadius: '24px',
          border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: isDark ? '#0E1528' : '#F8FAFC'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF'
              }}
            >
              <Calendar size={18} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033' }}>
              {interviewToEdit ? 'Edit Interview Schedule' : 'Schedule New Interview'}
            </h3>
          </div>
          <button onClick={onClose} style={{ color: isDark ? '#A0AEC0' : '#64748B' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '24px' }}>
          {/* Link Existing Application */}
          {!interviewToEdit && (
            <div className="form-group">
              <label className="form-label">Link to Tracked Job Application (Optional)</label>
              <select
                className="form-select"
                value={formData.applicationId}
                onChange={handleAppSelect}
              >
                <option value="">-- Choose Application or Enter Custom --</option>
                {applications.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.companyName} – {app.jobPosition}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Company Name *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Google"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Job Role *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Senior Frontend Engineer"
                value={formData.jobRole}
                onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Interview Date *</label>
              <input
                type="date"
                required
                className="form-input"
                value={formData.interviewDate}
                onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Interview Time *</label>
              <input
                type="time"
                required
                className="form-input"
                value={formData.interviewTime}
                onChange={(e) => setFormData({ ...formData, interviewTime: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Interview Round</label>
              <select
                className="form-select"
                value={formData.round}
                onChange={(e) => setFormData({ ...formData, round: e.target.value })}
              >
                <option value="Recruiter Phone Screen">Recruiter Phone Screen</option>
                <option value="Technical Round 1">Technical Round 1</option>
                <option value="Technical Round 2">Technical Round 2</option>
                <option value="System Design">System Design</option>
                <option value="Live Pair Programming">Live Pair Programming</option>
                <option value="Behavioral & Values">Behavioral & Values</option>
                <option value="Hiring Manager Interview">Hiring Manager Interview</option>
                <option value="Final Executive Round">Final Executive Round</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Interview Mode</label>
              <select
                className="form-select"
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
              >
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom">Zoom</option>
                <option value="Microsoft Teams">Microsoft Teams</option>
                <option value="On-site">On-site</option>
                <option value="Phone Call">Phone Call</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Meeting Link / Address</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://meet.google.com/..."
              value={formData.meetingLink}
              onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Preparation Notes & Questions</label>
            <textarea
              className="form-textarea"
              placeholder="Key concepts, architecture questions, topics to revise..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} /> Save Interview
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
