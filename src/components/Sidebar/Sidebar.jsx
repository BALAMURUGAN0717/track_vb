import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Kanban,
  Calendar,
  BarChart2,
  User,
  Shield,
  PlusCircle,
  ScanFace,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../context/ApplicationContext';
import { useTheme } from '../../context/ThemeContext';
import FaceVerificationModal from '../FaceVerification/FaceVerificationModal';

export default function Sidebar({ onOpenAddModal }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showFaceModal, setShowFaceModal] = useState(false);

  const { logout, user } = useAuth();
  const { applications } = useApplications();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const activeAppsCount = applications.filter((a) => a.status !== 'Rejected').length;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Applications', path: '/applications', icon: Briefcase, badge: applications.length },
    { name: 'Kanban Board', path: '/kanban', icon: Kanban },
    { name: 'Interviews', path: '/interviews', icon: Calendar },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Security & Privacy', path: '/security', icon: Shield }
  ];

  return (
    <>
      <aside
        style={{
          width: collapsed ? '80px' : '260px',
          minHeight: 'calc(100vh - 70px)',
          background: isDark ? '#0F162A' : '#FFFFFF',
          borderRight: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: collapsed ? '20px 10px' : '20px 16px',
          transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'sticky',
          top: '70px',
          zIndex: 60,
          flexShrink: 0
        }}
        className="app-sidebar"
      >
        {/* Top: Collapse toggle & Quick Add */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'space-between',
              marginBottom: '20px'
            }}
          >
            {!collapsed && (
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  color: isDark ? '#64748B' : '#94A3B8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                Workspace
              </span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: isDark ? '#1A243D' : '#F1F5F9',
                color: isDark ? '#A0AEC0' : '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`
              }}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => {
              if (onOpenAddModal) onOpenAddModal();
              else navigate('/add-application');
            }}
            className="btn btn-primary"
            style={{
              width: '100%',
              marginBottom: '24px',
              padding: collapsed ? '10px' : '11px 16px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '10px',
              fontSize: '0.875rem'
            }}
            title="Add New Application"
          >
            <PlusCircle size={18} />
            {!collapsed && <span>New Application</span>}
          </button>

          {/* Nav Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                title={collapsed ? item.name : undefined}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'space-between',
                  gap: '12px',
                  padding: collapsed ? '11px' : '10px 14px',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? '#FFFFFF' : isDark ? '#A0AEC0' : '#475569',
                  background: isActive
                    ? 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)'
                    : 'transparent',
                  boxShadow: isActive ? '0 4px 14px rgba(79, 140, 255, 0.35)' : 'none',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <item.icon size={19} />
                  {!collapsed && <span>{item.name}</span>}
                </div>
                {!collapsed && item.badge !== undefined && (
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '2px 7px',
                      borderRadius: '8px',
                      background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                      color: 'inherit'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions: Face lock test & User Mini Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
          {/* Face Lock Demo shortcut card */}
          {!collapsed ? (
            <div
              style={{
                padding: '14px',
                borderRadius: '14px',
                background: isDark
                  ? 'linear-gradient(135deg, rgba(79, 140, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                  : 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)',
                border: `1px solid ${isDark ? 'rgba(79, 140, 255, 0.25)' : '#E0E7FF'}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ScanFace size={18} color="#4F8CFF" />
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: isDark ? '#FFF' : '#1E293B' }}>
                  Face Lock Demo
                </span>
              </div>
              <p style={{ fontSize: '0.72rem', color: isDark ? '#A0AEC0' : '#64748B', lineHeight: 1.35 }}>
                Test client-side camera biometric verification.
              </p>
              <button
                onClick={() => setShowFaceModal(true)}
                className="btn btn-secondary btn-sm"
                style={{
                  fontSize: '0.75rem',
                  padding: '6px 10px',
                  background: isDark ? '#151D32' : '#FFFFFF',
                  color: '#4F8CFF',
                  borderColor: isDark ? '#29344D' : '#CBD5E1'
                }}
              >
                Launch Scanner
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowFaceModal(true)}
              title="Launch Face Lock Scanner"
              style={{
                width: '44px',
                height: '44px',
                margin: '0 auto',
                borderRadius: '12px',
                background: isDark ? '#1A243D' : '#EEF2FF',
                color: '#4F8CFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: '1px solid rgba(79, 140, 255, 0.3)'
              }}
            >
              <ScanFace size={20} />
            </button>
          )}

          {/* User Log out button */}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            title={collapsed ? 'Log out' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '10px',
              padding: '10px',
              borderRadius: '10px',
              color: '#EF4444',
              background: 'transparent',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <LogOut size={18} />
            {!collapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Face Verification Modal instance */}
      <FaceVerificationModal
        isOpen={showFaceModal}
        onClose={() => setShowFaceModal(false)}
        onSuccess={() => {
          setShowFaceModal(false);
        }}
      />

      <style>{`
        @media (max-width: 900px) {
          .app-sidebar {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
