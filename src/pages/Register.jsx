import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { register } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please recheck.');
      return;
    }

    const res = register(formData);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } else {
      setError(res.message || 'Registration failed.');
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        background: isDark
          ? 'radial-gradient(ellipse at 50% 30%, #151D32 0%, #0B1020 80%)'
          : 'radial-gradient(ellipse at 50% 30%, #EEF2FF 0%, #F5F7FF 80%)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: '100%',
          maxWidth: '520px',
          background: isDark ? '#151D32' : '#FFFFFF',
          borderRadius: '24px',
          border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
          boxShadow: isDark
            ? '0 25px 60px rgba(0,0,0,0.6), 0 0 30px rgba(79, 140, 255, 0.15)'
            : '0 25px 60px rgba(15, 23, 42, 0.12)',
          padding: '36px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 12px auto',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              boxShadow: '0 8px 20px rgba(79, 140, 255, 0.4)'
            }}
          >
            <Briefcase size={24} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033', letterSpacing: '-0.02em' }}>
            Create Your Account
          </h2>
          <p style={{ fontSize: '0.875rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
            Join JobTrack to manage your applications and interviews
          </p>
        </div>

        {/* Success message */}
        {success && (
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
              marginBottom: '18px'
            }}
          >
            <CheckCircle2 size={18} />
            <span>Account created successfully! Launching your 3D dashboard...</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#EF4444',
              fontSize: '0.825rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '18px'
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                placeholder="e.g. Alex Harrison"
                className="form-input"
                style={{ paddingLeft: '40px' }}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              <User
                size={16}
                color={isDark ? '#64748B' : '#94A3B8'}
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  placeholder="alex@domain.com"
                  className="form-input"
                  style={{ paddingLeft: '40px' }}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Mail
                  size={16}
                  color={isDark ? '#64748B' : '#94A3B8'}
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="form-input"
                  style={{ paddingLeft: '40px' }}
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
                <Phone
                  size={16}
                  color={isDark ? '#64748B' : '#94A3B8'}
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Min 6 characters"
                  className="form-input"
                  style={{ paddingLeft: '40px', paddingRight: '36px' }}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Lock
                  size={16}
                  color={isDark ? '#64748B' : '#94A3B8'}
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: isDark ? '#64748B' : '#94A3B8',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Re-type password"
                  className="form-input"
                  style={{ paddingLeft: '40px' }}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <Lock
                  size={16}
                  color={isDark ? '#64748B' : '#94A3B8'}
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '13px', fontSize: '0.95rem', marginTop: '12px' }}
          >
            Create Account <ArrowRight size={16} />
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '22px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#4F8CFF', fontWeight: '700' }}>
            Log In
          </Link>
        </p>

        <div
          style={{
            marginTop: '18px',
            paddingTop: '16px',
            borderTop: `1px solid ${isDark ? '#1F293D' : '#F1F5F9'}`,
            fontSize: '0.7rem',
            color: isDark ? '#64748B' : '#94A3B8',
            textAlign: 'center'
          }}
        >
          Frontend Demonstration Authentication • LocalStorage Persistence
        </div>
      </motion.div>
    </div>
  );
}
