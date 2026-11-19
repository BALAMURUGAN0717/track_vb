import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ScanFace,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  X,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import FaceVerificationModal from '../components/FaceVerification/FaceVerificationModal';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [showFaceModal, setShowFaceModal] = useState(false);

  const { login, isFaceLockEnabled } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    const result = login(email, password, rememberMe);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Invalid credentials.');
    }
  };

  const handleFillDemo = () => {
    setEmail('demo@jobtrack.io');
    setPassword('password123');
    setError('');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (forgotEmail.trim()) {
      setForgotSubmitted(true);
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
          maxWidth: '460px',
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
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 14px auto',
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
            Welcome Back
          </h2>
          <p style={{ fontSize: '0.875rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '6px' }}>
            Log in to manage your career search & applications
          </p>
        </div>

        {/* Demo Fast Login Banner */}
        <div
          style={{
            padding: '12px 14px',
            borderRadius: '12px',
            background: isDark ? 'rgba(79, 140, 255, 0.1)' : '#EEF2FF',
            border: `1px solid ${isDark ? 'rgba(79, 140, 255, 0.25)' : '#C7D2FE'}`,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px'
          }}
        >
          <div style={{ fontSize: '0.775rem', color: isDark ? '#A0AEC0' : '#4338CA' }}>
            <strong>Demo Mode:</strong> <code style={{ fontFamily: 'var(--font-mono)' }}>demo@jobtrack.io</code>
          </div>
          <button
            onClick={handleFillDemo}
            className="btn btn-sm"
            style={{
              background: '#4F8CFF',
              color: '#FFF',
              fontSize: '0.72rem',
              padding: '4px 8px'
            }}
          >
            <Sparkles size={12} /> Auto Fill
          </button>
        </div>

        {/* Error notification */}
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

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                placeholder="name@company.com"
                className="form-input"
                style={{ paddingLeft: '40px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail
                size={16}
                color={isDark ? '#64748B' : '#94A3B8'}
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                style={{ fontSize: '0.775rem', color: '#4F8CFF', fontWeight: '600', cursor: 'pointer' }}
              >
                Forgot Password?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="form-input"
                style={{ paddingLeft: '40px', paddingRight: '40px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: isDark ? '#64748B' : '#94A3B8',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ accentColor: '#4F8CFF', width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="remember" style={{ fontSize: '0.825rem', color: isDark ? '#A0AEC0' : '#475569', cursor: 'pointer' }}>
              Remember me on this browser
            </label>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '13px', fontSize: '0.95rem' }}>
            Log In to JobTrack <ArrowRight size={16} />
          </button>
        </form>

        {/* Alternative: Face Lock Demo */}
        <div style={{ margin: '22px 0 16px 0', position: 'relative', textAlign: 'center' }}>
          <div style={{ height: '1px', background: isDark ? '#29344D' : '#E2E8F0', width: '100%' }} />
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: isDark ? '#151D32' : '#FFFFFF',
              padding: '0 12px',
              fontSize: '0.75rem',
              color: isDark ? '#64748B' : '#94A3B8',
              fontWeight: '600'
            }}
          >
            OR BIOMETRIC DEMO
          </span>
        </div>

        <button
          onClick={() => setShowFaceModal(true)}
          className="btn btn-secondary"
          style={{
            width: '100%',
            padding: '12px',
            color: isDark ? '#38BDF8' : '#2563EB',
            borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : '#BFDBFE'
          }}
        >
          <ScanFace size={18} /> Login with Face Lock (Demo)
        </button>

        {/* Register Footer Link */}
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '24px' }}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ color: '#4F8CFF', fontWeight: '700' }}>
            Create one free
          </Link>
        </p>

        {/* Security transparency note */}
        <div
          style={{
            marginTop: '20px',
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

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 110,
            padding: '16px'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '400px',
              background: isDark ? '#151D32' : '#FFFFFF',
              borderRadius: '20px',
              border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
              padding: '24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033' }}>
                Reset Password Demo
              </h3>
              <button onClick={() => setShowForgotModal(false)} style={{ color: isDark ? '#A0AEC0' : '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            {forgotSubmitted ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <CheckCircle2 size={40} color="#10B981" style={{ margin: '0 auto 10px auto' }} />
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033' }}>
                  Reset Link Dispatched (Demo)
                </h4>
                <p style={{ fontSize: '0.8rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '6px' }}>
                  In a production system, a secure email challenge would be sent to {forgotEmail}.
                </p>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="btn btn-primary btn-sm"
                  style={{ marginTop: '16px' }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit}>
                <p style={{ fontSize: '0.8rem', color: isDark ? '#A0AEC0' : '#64748B', marginBottom: '16px' }}>
                  Enter your email address and we will demonstrate sending password recovery instructions.
                </p>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    className="form-input"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                  <button type="button" onClick={() => setShowForgotModal(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Face Verification Modal */}
      <FaceVerificationModal
        isOpen={showFaceModal}
        onClose={() => setShowFaceModal(false)}
        onSuccess={() => {
          setShowFaceModal(false);
          login('demo@jobtrack.io', 'password123');
          navigate('/dashboard');
        }}
        isLoginMode={true}
      />
    </div>
  );
}
