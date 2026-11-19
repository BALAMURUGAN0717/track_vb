import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Globe,
  FileText,
  Save,
  ArrowLeft,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useApplications } from '../context/ApplicationContext';
import { useTheme } from '../context/ThemeContext';

export default function AddApplication({ isModal = false, onClose }) {
  const { addApplication } = useApplications();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    jobPosition: '',
    jobDescription: '',
    jobLocation: '',
    jobType: 'Full Time',
    workMode: 'Remote',
    salaryRange: '$140,000 - $175,000',
    appliedDate: new Date().toISOString().split('T')[0],
    applicationDeadline: '',
    jobSource: 'LinkedIn',
    jobUrl: '',
    resumeUsed: 'Senior_Frontend_Architect_v2.pdf',
    priority: 'Medium',
    status: 'Applied',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName.trim() || !formData.jobPosition.trim() || !formData.jobLocation.trim()) {
      return;
    }

    addApplication(formData);
    setSubmitted(true);

    setTimeout(() => {
      if (onClose) onClose();
      else navigate('/applications');
    }, 800);
  };

  const content = (
    <div
      style={{
        background: isDark ? '#151D32' : '#FFFFFF',
        borderRadius: '24px',
        border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
        boxShadow: isDark ? '0 25px 60px rgba(0,0,0,0.5)' : '0 20px 50px rgba(15,23,42,0.08)',
        padding: '32px',
        width: '100%',
        maxWidth: '840px',
        margin: '0 auto'
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              boxShadow: '0 6px 16px rgba(79, 140, 255, 0.4)'
            }}
          >
            <Briefcase size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033', letterSpacing: '-0.02em' }}>
              Add Job Application
            </h2>
            <p style={{ fontSize: '0.8rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
              Record all opportunity parameters for 3D tracking & analytics
            </p>
          </div>
        </div>

        {!isModal && (
          <button
            onClick={() => navigate('/applications')}
            className="btn btn-secondary btn-sm"
          >
            <ArrowLeft size={16} /> Back to Applications
          </button>
        )}
      </div>

      {submitted && (
        <div
          style={{
            padding: '14px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#10B981',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px'
          }}
        >
          <CheckCircle2 size={18} />
          <span>Application created with unique ID! Redirecting to tracker...</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
          {/* Company Name */}
          <div className="form-group">
            <label className="form-label">Company Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Netflix, Stripe, Google"
              className="form-input"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
          </div>

          {/* Job Position */}
          <div className="form-group">
            <label className="form-label">Job Position / Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Senior Frontend Engineer"
              className="form-input"
              value={formData.jobPosition}
              onChange={(e) => setFormData({ ...formData, jobPosition: e.target.value })}
            />
          </div>

          {/* Job Location */}
          <div className="form-group">
            <label className="form-label">Job Location *</label>
            <input
              type="text"
              required
              placeholder="e.g. San Francisco, CA / Remote"
              className="form-input"
              value={formData.jobLocation}
              onChange={(e) => setFormData({ ...formData, jobLocation: e.target.value })}
            />
          </div>

          {/* Salary Range */}
          <div className="form-group">
            <label className="form-label">Salary Range *</label>
            <input
              type="text"
              required
              placeholder="e.g. $140,000 - $175,000"
              className="form-input"
              value={formData.salaryRange}
              onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
            />
          </div>

          {/* Job Type */}
          <div className="form-group">
            <label className="form-label">Job Type *</label>
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

          {/* Work Mode */}
          <div className="form-group">
            <label className="form-label">Work Mode *</label>
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

          {/* Job Source */}
          <div className="form-group">
            <label className="form-label">Job Source *</label>
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

          {/* Priority */}
          <div className="form-group">
            <label className="form-label">Target Priority</label>
            <select
              className="form-select"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {/* Applied Date */}
          <div className="form-group">
            <label className="form-label">Applied Date *</label>
            <input
              type="date"
              required
              className="form-input"
              value={formData.appliedDate}
              onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
            />
          </div>

          {/* Application Deadline */}
          <div className="form-group">
            <label className="form-label">Application Deadline</label>
            <input
              type="date"
              className="form-input"
              value={formData.applicationDeadline}
              onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
            />
          </div>

          {/* Resume Used */}
          <div className="form-group">
            <label className="form-label">Resume Used</label>
            <input
              type="text"
              placeholder="e.g. Senior_Frontend_v3.pdf"
              className="form-input"
              value={formData.resumeUsed}
              onChange={(e) => setFormData({ ...formData, resumeUsed: e.target.value })}
            />
          </div>

          {/* Initial Status */}
          <div className="form-group">
            <label className="form-label">Initial Status</label>
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
            </select>
          </div>
        </div>

        {/* Job Posting URL */}
        <div className="form-group" style={{ marginTop: '12px' }}>
          <label className="form-label">Job Posting URL</label>
          <input
            type="url"
            placeholder="https://company.com/careers/job-id"
            className="form-input"
            value={formData.jobUrl}
            onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
          />
        </div>

        {/* Job Description */}
        <div className="form-group">
          <label className="form-label">Job Description / Responsibilities</label>
          <textarea
            placeholder="Key stack requirements, team scope, compensation notes..."
            className="form-textarea"
            value={formData.jobDescription}
            onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
          />
        </div>

        {/* Additional Notes */}
        <div className="form-group">
          <label className="form-label">Additional Notes</label>
          <textarea
            placeholder="Recruiter contact info, referral name, next steps..."
            className="form-textarea"
            style={{ minHeight: '70px' }}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          {isModal && (
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary btn-lg">
            <Save size={18} /> Save & Track Application
          </button>
        </div>
      </form>
    </div>
  );

  if (isModal) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 140,
          background: 'rgba(5, 8, 18, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <div style={{ maxHeight: '90vh', overflowY: 'auto', width: '100%' }}>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '36px 24px', maxWidth: '1240px', margin: '0 auto' }}>
      {content}
    </div>
  );
}
