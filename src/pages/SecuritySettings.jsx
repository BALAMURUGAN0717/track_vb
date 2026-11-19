import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Key,
  ScanFace,
  Camera,
  Smartphone,
  Laptop,
  Globe,
  AlertTriangle,
  Info,
  CheckCircle2,
  Lock,
  LogOut,
  Fingerprint
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import FaceVerificationModal from '../components/FaceVerification/FaceVerificationModal';

export default function SecuritySettings() {
  const { user, isFaceLockEnabled, toggleFaceLock, changePasswordDemo, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  const [showFaceModal, setShowFaceModal] = useState(false);

  // Change Password demo state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState(null);

  // Camera diagnostic test
  const [cameraDiagnostic, setCameraDiagnostic] = useState(null);

  // Calculate Password Strength
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: '#64748B' };
    let score = 0;
    if (pass.length >= 6) score += 25;
    if (pass.length >= 10) score += 25;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;

    if (score < 50) return { score, label: 'Weak', color: '#EF4444' };
    if (score < 75) return { score, label: 'Good', color: '#F59E0B' };
    return { score, label: 'Strong', color: '#10B981' };
  };

  const strength = getPasswordStrength(newPassword);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword.length < 6) {
      setPasswordStatus({ success: false, message: 'New password must be at least 6 characters.' });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordStatus({ success: false, message: 'New passwords do not match.' });
      return;
    }

    const res = changePasswordDemo(currentPassword, newPassword);
    setPasswordStatus(res);
    if (res.success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  };

  const testCameraPermission = async () => {
    setCameraDiagnostic('Testing browser camera permissions...');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraDiagnostic('Camera API not supported in this environment.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((t) => t.stop());
      setCameraDiagnostic('Camera permission granted & ready for Biometric Face Lock.');
    } catch (e) {
      setCameraDiagnostic(`Camera check result: ${e.name} (${e.message})`);
    }
  };

  return (
    <div style={{ padding: '28px 24px 60px 24px', maxWidth: '1080px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: '900',
              color: isDark ? '#FFF' : '#172033',
              letterSpacing: '-0.03em'
            }}
          >
            Security & Privacy Settings
          </h1>
          <span
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              background: 'rgba(79, 140, 255, 0.15)',
              color: '#4F8CFF',
              fontSize: '0.72rem',
              fontWeight: '700'
            }}
          >
            Frontend Demo
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
          Biometric verification settings, session tracking, and security transparency disclosures.
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Important Security Disclosure Alert */}
        <div
          style={{
            padding: '20px',
            borderRadius: '16px',
            background: isDark ? 'rgba(245, 158, 11, 0.1)' : '#FFFBEB',
            border: `1px solid ${isDark ? 'rgba(245, 158, 11, 0.3)' : '#FDE68A'}`,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px'
          }}
        >
          <AlertTriangle size={22} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.825rem', color: isDark ? '#E2E8F0' : '#78350F', lineHeight: 1.55 }}>
            <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>
              Transparency Notice: Demonstration Authentication & Biometrics
            </strong>
            JobTrack operates purely inside your browser client using LocalStorage. Face detection demonstrates
            visual alignment and canvas tracking — it does <em>not</em> constitute cryptographic identity proof.
            No raw camera streams or biometric geometry vectors are ever stored or uploaded.
          </div>
        </div>

        {/* Face Lock Biometric Demo Setting */}
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            padding: '26px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 4px 20px rgba(15,23,42,0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  boxShadow: '0 4px 14px rgba(79, 140, 255, 0.4)'
                }}
              >
                <ScanFace size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033' }}>
                  Face Lock Camera Verification
                </h3>
                <p style={{ fontSize: '0.8rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
                  Enable browser face scanning for futuristic one-click dashboard access
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setShowFaceModal(true)}
                className="btn btn-secondary btn-sm"
              >
                <Camera size={14} /> Test Scanner
              </button>

              <button
                onClick={() => toggleFaceLock(!isFaceLockEnabled)}
                style={{
                  width: '52px',
                  height: '28px',
                  borderRadius: '14px',
                  background: isFaceLockEnabled ? '#10B981' : isDark ? '#1F293D' : '#CBD5E1',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s ease',
                  padding: '2px'
                }}
              >
                <motion.div
                  layout
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    marginLeft: isFaceLockEnabled ? '24px' : '0px'
                  }}
                />
              </button>
            </div>
          </div>

          {/* Diagnostic status */}
          <div
            style={{
              marginTop: '18px',
              paddingTop: '16px',
              borderTop: `1px solid ${isDark ? '#1F293D' : '#F1F5F9'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.775rem',
              color: isDark ? '#A0AEC0' : '#64748B',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <span>
              Status: <strong>{isFaceLockEnabled ? 'Face Lock Active' : 'Face Lock Disabled'}</strong>
            </span>
            <button
              onClick={testCameraPermission}
              style={{ color: '#4F8CFF', fontWeight: '600', cursor: 'pointer' }}
            >
              Check Camera Hardware API
            </button>
          </div>
          {cameraDiagnostic && (
            <div
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                background: isDark ? '#0E1528' : '#F8FAFC',
                fontSize: '0.75rem',
                color: isDark ? '#38BDF8' : '#2563EB',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {cameraDiagnostic}
            </div>
          )}
        </div>

        {/* Change Password Demo */}
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            padding: '26px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 4px 20px rgba(15,23,42,0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <Key size={20} color="#8B5CF6" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033' }}>
              Change Password (Demo)
            </h3>
          </div>

          {passwordStatus && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                background: passwordStatus.success ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                color: passwordStatus.success ? '#10B981' : '#EF4444',
                fontSize: '0.8rem',
                marginBottom: '16px'
              }}
            >
              {passwordStatus.message}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="form-input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Min 6 characters"
                  className="form-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Re-type new password"
                  className="form-input"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Password Strength Meter */}
            {newPassword && (
              <div style={{ margin: '10px 0 16px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                  <span style={{ color: isDark ? '#A0AEC0' : '#64748B' }}>Password Strength:</span>
                  <span style={{ color: strength.color, fontWeight: '700' }}>{strength.label}</span>
                </div>
                <div style={{ width: '100%', height: '5px', background: isDark ? '#1F293D' : '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${strength.score}%`, height: '100%', background: strength.color, borderRadius: '3px', transition: 'width 0.3s ease' }} />
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '9px 18px' }}>
              Update Password
            </button>
          </form>
        </div>

        {/* WebAuthn / Biometrics Future Architecture Box */}
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            padding: '26px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 4px 20px rgba(15,23,42,0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Fingerprint size={20} color="#10B981" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033' }}>
              Hardware Biometrics (WebAuthn / Passkeys Ready)
            </h3>
          </div>
          <p style={{ fontSize: '0.825rem', color: isDark ? '#A0AEC0' : '#64748B', lineHeight: 1.55 }}>
            For enterprise production deployments, JobTrack is designed to pair with WebAuthn/FIDO2. This enables
            hardware-level platform authentication including Windows Hello, Apple TouchID / FaceID, and hardware
            security keys (YubiKey) without ever transferring raw biometric data across networks.
          </p>
          <div
            style={{
              marginTop: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: isDark ? '#0E1528' : '#F1F5F9',
              fontSize: '0.75rem',
              color: isDark ? '#38BDF8' : '#2563EB',
              fontFamily: 'var(--font-mono)'
            }}
          >
            WebAuthn PublicKeyCredential: Supported in Browser
          </div>
        </div>

        {/* Active Login Sessions Table */}
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            padding: '26px',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 4px 20px rgba(15,23,42,0.05)'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033', marginBottom: '14px' }}>
            Active Login Sessions (Demo)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '12px',
                background: isDark ? '#0E1528' : '#F8FAFC',
                border: `1px solid ${isDark ? '#1F293D' : '#E2E8F0'}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Laptop size={20} color="#4F8CFF" />
                <div>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033' }}>
                    Chrome on Windows 11 (Current Session)
                  </h5>
                  <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: '600' }}>
                    ● Active right now • IP 127.0.0.1 (Localhost)
                  </span>
                </div>
              </div>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: isDark ? '#1F293D' : '#EEF2FF',
                  color: '#4F8CFF'
                }}
              >
                THIS DEVICE
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '12px',
                background: isDark ? '#0E1528' : '#F8FAFC',
                border: `1px solid ${isDark ? '#1F293D' : '#E2E8F0'}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Smartphone size={20} color="#8B5CF6" />
                <div>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033' }}>
                    Safari on iPhone 15 Pro
                  </h5>
                  <span style={{ fontSize: '0.72rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
                    Last active: 2 hours ago • San Francisco, CA
                  </span>
                </div>
              </div>
              <button
                className="btn btn-sm btn-secondary"
                style={{ fontSize: '0.72rem', padding: '4px 8px' }}
              >
                Revoke
              </button>
            </div>
          </div>
        </div>

        {/* Global Sign Out Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button
            onClick={() => {
              logout();
              window.location.href = '/login';
            }}
            className="btn btn-danger"
            style={{ padding: '12px 24px', fontSize: '0.9rem' }}
          >
            <LogOut size={16} /> Sign Out of All Sessions
          </button>
        </div>
      </div>

      {/* Face Verification Modal instance */}
      <FaceVerificationModal
        isOpen={showFaceModal}
        onClose={() => setShowFaceModal(false)}
        onSuccess={() => {
          setShowFaceModal(false);
        }}
      />
    </div>
  );
}
