import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  FileText,
  Save,
  CheckCircle2,
  X,
  Plus,
  Camera,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useApplications } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Profile() {
  const { profile, updateProfile } = useApplications();
  const { user, updateUser } = useAuth();
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    fullName: profile.fullName || user?.fullName || 'Alex Harrison',
    email: profile.email || user?.email || 'alex.harrison@careermail.com',
    phoneNumber: profile.phoneNumber || user?.phoneNumber || '+1 (555) 234-8901',
    profilePicture: profile.profilePicture || user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    careerObjective: profile.careerObjective || '',
    preferredJobLocation: profile.preferredJobLocation || 'San Francisco, CA / Remote Global',
    targetSalary: profile.targetSalary || '$175,000 - $210,000'
  });

  const [skills, setSkills] = useState(profile.skills || [
    "React.js", "Three.js", "WebGL", "TypeScript", "Tailwind CSS", "UI/UX Architecture"
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Preset avatar choices
  const PRESET_AVATARS = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
  ];

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...formData,
      skills: skills
    };

    updateProfile(updated);
    updateUser({
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      avatar: formData.profilePicture
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ padding: '28px 24px 60px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: '900',
            color: isDark ? '#FFF' : '#172033',
            letterSpacing: '-0.03em'
          }}
        >
          Candidate Profile & Career Objective
        </h1>
        <p style={{ fontSize: '0.85rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
          Manage your candidate credentials, skills repository, and compensation target preferences.
        </p>
      </div>

      {savedSuccess && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#10B981',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px'
          }}
        >
          <CheckCircle2 size={18} />
          <span>Profile changes saved to LocalStorage successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Top Card: Avatar & Basic Information */}
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            padding: '28px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 4px 20px rgba(15,23,42,0.05)'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033', marginBottom: '20px' }}>
            Personal Information
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <img
              src={formData.profilePicture}
              alt="Profile"
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #4F8CFF',
                boxShadow: '0 4px 15px rgba(79, 140, 255, 0.3)'
              }}
            />

            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: '600', color: isDark ? '#A0AEC0' : '#64748B' }}>
                Select Profile Avatar Preset
              </span>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                {PRESET_AVATARS.map((av, idx) => (
                  <img
                    key={idx}
                    src={av}
                    alt="Preset"
                    onClick={() => setFormData({ ...formData, profilePicture: av })}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      border: formData.profilePicture === av ? '2.5px solid #4F8CFF' : '1px solid #CBD5E1',
                      transition: 'transform 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                required
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Job Location</label>
              <input
                type="text"
                className="form-input"
                value={formData.preferredJobLocation}
                onChange={(e) => setFormData({ ...formData, preferredJobLocation: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Salary Range</label>
              <input
                type="text"
                className="form-input"
                value={formData.targetSalary}
                onChange={(e) => setFormData({ ...formData, targetSalary: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '8px' }}>
            <label className="form-label">Career Objective / Professional Summary</label>
            <textarea
              className="form-textarea"
              style={{ minHeight: '90px' }}
              value={formData.careerObjective}
              onChange={(e) => setFormData({ ...formData, careerObjective: e.target.value })}
            />
          </div>
        </div>

        {/* Skills Tag Management */}
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            padding: '28px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 4px 20px rgba(15,23,42,0.05)'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033', marginBottom: '8px' }}>
            Technical Skills & Specializations
          </h3>
          <p style={{ fontSize: '0.8rem', color: isDark ? '#A0AEC0' : '#64748B', marginBottom: '18px' }}>
            Tags used for matching job descriptions and tracking technical strengths.
          </p>

          {/* Active Skills Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
            {skills.map((skill) => (
              <span
                key={skill}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  background: isDark ? '#1F293D' : '#EEF2FF',
                  color: isDark ? '#FFFFFF' : '#4338CA',
                  border: `1px solid ${isDark ? '#29344D' : '#C7D2FE'}`,
                  fontSize: '0.825rem',
                  fontWeight: '600'
                }}
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  style={{
                    color: isDark ? '#A0AEC0' : '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>

          {/* Add Skill Field */}
          <div style={{ display: 'flex', gap: '8px', maxWidth: '420px' }}>
            <input
              type="text"
              placeholder="e.g. Next.js, Docker, WebGL"
              className="form-input"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(e);
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="btn btn-secondary"
            >
              <Plus size={16} /> Add
            </button>
          </div>
        </div>

        {/* Save Changes Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button type="submit" className="btn btn-primary btn-lg">
            <Save size={18} /> Save Candidate Profile
          </button>
        </div>
      </form>
    </div>
  );
}
