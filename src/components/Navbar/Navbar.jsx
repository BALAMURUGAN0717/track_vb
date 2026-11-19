import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Layers,
  Calendar,
  BarChart3,
  User,
  Shield,
  Menu,
  X,
  ScanFace,
  LogOut,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import NotificationPanel from '../NotificationPanel/NotificationPanel';
import FaceVerificationModal from '../FaceVerification/FaceVerificationModal';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [faceModalOpen, setFaceModalOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isLanding = location.pathname === '/';

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: Layers },
    { label: 'Applications', path: '/applications', icon: Briefcase },
    { label: 'Kanban 3D', path: '/kanban', icon: Layers },
    { label: 'Interviews', path: '/interviews', icon: Calendar },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 }
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 80,
          background: isDark ? 'rgba(11, 16, 32, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
          transition: 'all 0.3s ease'
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 24px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo */}
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(79, 140, 255, 0.45)'
              }}
            >
              <Briefcase size={22} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: '800',
                    letterSpacing: '-0.03em',
                    background: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  JobTrack
                </span>
                <span
                  style={{
                    background: isDark ? 'rgba(79, 140, 255, 0.15)' : '#EEF2FF',
                    color: '#4F8CFF',
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '6px',
                    border: '1px solid rgba(79, 140, 255, 0.3)'
                  }}
                >
                  3D AI
                </span>
              </div>
              <span style={{ fontSize: '0.68rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '-2px' }}>
                Career Management SaaS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px'
            }}
            className="desktop-nav"
          >
            {isLanding ? (
              <>
                <a
                  href="#features"
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: isDark ? '#A0AEC0' : '#475569',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#4F8CFF')}
                  onMouseLeave={(e) => (e.target.style.color = isDark ? '#A0AEC0' : '#475569')}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: isDark ? '#A0AEC0' : '#475569',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#4F8CFF')}
                  onMouseLeave={(e) => (e.target.style.color = isDark ? '#A0AEC0' : '#475569')}
                >
                  How It Works
                </a>
                <a
                  href="#testimonials"
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: isDark ? '#A0AEC0' : '#475569',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#4F8CFF')}
                  onMouseLeave={(e) => (e.target.style.color = isDark ? '#A0AEC0' : '#475569')}
                >
                  Reviews
                </a>
                <a
                  href="#faq"
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: isDark ? '#A0AEC0' : '#475569',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#4F8CFF')}
                  onMouseLeave={(e) => (e.target.style.color = isDark ? '#A0AEC0' : '#475569')}
                >
                  FAQ
                </a>
              </>
            ) : (
              navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? '600' : '500',
                      color: isActive ? '#4F8CFF' : isDark ? '#A0AEC0' : '#475569',
                      background: isActive
                        ? isDark
                          ? 'rgba(79, 140, 255, 0.12)'
                          : '#EEF2FF'
                        : 'transparent',
                      border: isActive
                        ? '1px solid rgba(79, 140, 255, 0.25)'
                        : '1px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <link.icon size={16} />
                    {link.label}
                  </Link>
                );
              })
            )}
          </nav>

          {/* Right Action Icons & Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notification Panel (When authenticated) */}
            {isAuthenticated && <NotificationPanel />}

            {/* Face Lock Demo Button */}
            <button
              onClick={() => setFaceModalOpen(true)}
              className="btn btn-secondary btn-sm"
              title="Open Face Lock Biometric Demo"
              style={{
                display: 'none',
                gap: '6px',
                color: isDark ? '#38BDF8' : '#2563EB',
                borderColor: isDark ? 'rgba(56, 189, 248, 0.4)' : '#BFDBFE'
              }}
              id="face-lock-pill"
            >
              <ScanFace size={16} />
              <span>Face Lock</span>
            </button>

            {/* Auth Buttons or User Avatar */}
            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: isDark ? '#151D32' : '#FFFFFF',
                    border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
                    cursor: 'pointer',
                    boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user?.fullName || 'User'}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ display: 'none', flexDirection: 'column', textAlign: 'left' }} className="user-name-box">
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: isDark ? '#FFF' : '#172033' }}>
                      {user?.fullName || 'Alex Harrison'}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
                      Pro Candidate
                    </span>
                  </div>
                  <ChevronDown size={14} color={isDark ? '#A0AEC0' : '#64748B'} />
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <>
                    <div
                      onClick={() => setUserDropdownOpen(false)}
                      style={{ position: 'fixed', inset: 0, zIndex: 95 }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '48px',
                        right: 0,
                        width: '210px',
                        background: isDark ? '#151D32' : '#FFFFFF',
                        border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
                        borderRadius: '14px',
                        boxShadow: isDark ? '0 15px 35px rgba(0,0,0,0.6)' : '0 15px 35px rgba(0,0,0,0.1)',
                        padding: '6px',
                        zIndex: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                      }}
                    >
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          color: isDark ? '#FFF' : '#172033'
                        }}
                      >
                        <User size={15} /> My Profile
                      </Link>
                      <Link
                        to="/security"
                        onClick={() => setUserDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          color: isDark ? '#FFF' : '#172033'
                        }}
                      >
                        <Shield size={15} /> Security & Face Lock
                      </Link>
                      <div style={{ height: '1px', background: isDark ? '#29344D' : '#E2E8F0', margin: '4px 0' }} />
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                          navigate('/login');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          color: '#EF4444',
                          textAlign: 'left'
                        }}
                      >
                        <LogOut size={15} /> Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Log In
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
                background: isDark ? '#151D32' : '#FFFFFF',
                color: isDark ? '#FFFFFF' : '#172033',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px 24px 24px 24px',
              background: isDark ? '#0F162A' : '#FFFFFF',
              borderTop: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {isLanding ? (
              <>
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ padding: '8px 0', color: isDark ? '#FFF' : '#172033', fontSize: '0.95rem' }}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ padding: '8px 0', color: isDark ? '#FFF' : '#172033', fontSize: '0.95rem' }}
                >
                  How It Works
                </a>
                <a
                  href="#testimonials"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ padding: '8px 0', color: isDark ? '#FFF' : '#172033', fontSize: '0.95rem' }}
                >
                  Testimonials
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ padding: '8px 0', color: isDark ? '#FFF' : '#172033', fontSize: '0.95rem' }}
                >
                  FAQ
                </a>
              </>
            ) : (
              navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 0',
                    color: location.pathname === link.path ? '#4F8CFF' : isDark ? '#FFF' : '#172033',
                    fontSize: '0.95rem'
                  }}
                >
                  <link.icon size={18} /> {link.label}
                </Link>
              ))
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setFaceModalOpen(true);
              }}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start' }}
            >
              <ScanFace size={18} /> Face Lock Biometric Demo
            </button>
          </div>
        )}
      </header>

      {/* Face Verification Modal instance */}
      <FaceVerificationModal
        isOpen={faceModalOpen}
        onClose={() => setFaceModalOpen(false)}
        onSuccess={() => {
          setFaceModalOpen(false);
          navigate('/dashboard');
        }}
      />

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
          .user-name-box {
            display: flex !important;
          }
          #face-lock-pill {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
