import React, { useState, useEffect } from 'react';
import { X, Save, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApplications } from '../../context/ApplicationContext';
import { useTheme } from '../../context/ThemeContext';

export default function EditApplicationModal({ application, isOpen, onClose }) {
  const { updateApplication } = useApplications();
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    companyName: '',
    jobPosition: '',
    jobDescription: '',
    jobLocation: '',
    jobType: 'Full Time',
    workMode: 'Remote',
    salaryRange: '',
    appliedDate: '',
    applicationDeadline: '',
    jobSource: 'LinkedIn',
    jobUrl: '',
    resumeUsed: '',
    priority: 'Medium',
    status: 'Applied',
    notes: ''
  });

  useEffect(() => {
    if (application) {
      setFormData({
        companyName: application.companyName || '',
        jobPosition: application.jobPosition || '',
        jobDescription: application.jobDescription || '',
        jobLocation: application.jobLocation || '',
        jobType: application.jobType || 'Full Time',
        workMode: application.workMode || 'Remote',
        salaryRange: application.salaryRange || '',
        appliedDate: application.appliedDate || '',
        applicationDeadline: application.applicationDeadline || '',
        jobSource: application.jobSource || 'LinkedIn',
        jobUrl: application.jobUrl || '',
        resumeUsed: application.resumeUsed || '',
        priority: application.priority || 'Medium',
        status: application.status || 'Applied',
        notes: application.notes || ''
      });
    }
  }, [application]);

  if (!isOpen || !application) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateApplication(application.id, formData);
    onClose();
  };

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
          maxWidth: '720px',
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
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033' }}>
              Edit Job Application
            </h3>
            <span style={{ fontSize: '0.75rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
              Updating ID: {application.id} ({application.companyName})
            </span>
          </div>
          <button onClick={onClose} style={{ color: isDark ? '#A0AEC0' : '#64748B' }}>
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Company Name *</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Job Position / Role *</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.jobPosition}
                onChange={(e) => setFormData({ ...formData, jobPosition: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location *</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.jobLocation}
                onChange={(e) => setFormData({ ...formData, jobLocation: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Salary Range</label>
              <input
                type="text"
                className="form-input"
                value={formData.salaryRange}
                onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Job Type</label>
              <select
                className="form-select"
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Work Mode</label>
              <select
                className="form-select"
                value={formData.workMode}
                onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Applied">Applied</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Offer Received">Offer Received</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Applied Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.appliedDate}
                onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Application Deadline</label>
              <input
                type="date"
                className="form-input"
                value={formData.applicationDeadline}
                onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Job Source</label>
              <select
                className="form-select"
                value={formData.jobSource}
                onChange={(e) => setFormData({ ...formData, jobSource: e.target.value })}
              >
                <option value="LinkedIn">LinkedIn</option>
                <option value="Naukri">Naukri</option>
                <option value="Indeed">Indeed</option>
                <option value="Company Website">Company Website</option>
                <option value="Referral">Referral</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Resume Used</label>
              <input
                type="text"
                className="form-input"
                value={formData.resumeUsed}
                onChange={(e) => setFormData({ ...formData, resumeUsed: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '8px' }}>
            <label className="form-label">Job Description</label>
            <textarea
              className="form-textarea"
              value={formData.jobDescription}
              onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="form-textarea"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
