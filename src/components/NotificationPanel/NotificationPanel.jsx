import React, { useState } from 'react';
import { Bell, Check, Trash2, Calendar, Clock, AlertCircle, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApplications } from '../../context/ApplicationContext';
import { useTheme } from '../../context/ThemeContext';

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newType, setNewType] = useState('reminder');
  const [permissionStatus, setPermissionStatus] = useState(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });

  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    addNotification
  } = useApplications();
  const { isDark } = useTheme();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRequestPermission = async () => {
    if ('Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setPermissionStatus(perm);
        if (perm === 'granted') {
          new Notification('JobTrack Notifications Enabled', {
            body: 'You will receive career alerts for upcoming interviews & deadlines.',
            icon: '/favicon.svg'
          });
        }
      } catch (err) {
        console.warn('Notification permission error:', err);
      }
    }
  };

  const handleCreateReminder = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addNotification({
      title: newTitle.trim(),
      message: newMessage.trim() || 'Custom career reminder',
      type: newType,
      link: '/applications'
    });

    setNewTitle('');
    setNewMessage('');
    setShowAddModal(false);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'interview':
        return <Calendar size={16} color="#06B6D4" />;
      case 'offer':
        return <Check size={16} color="#10B981" />;
      case 'deadline':
        return <AlertCircle size={16} color="#EF4444" />;
      default:
        return <Clock size={16} color="#8B5CF6" />;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications & Reminders"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: isDark ? 'rgba(21, 29, 50, 0.9)' : '#FFFFFF',
          border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
          color: isDark ? '#FFFFFF' : '#172033',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#EF4444',
              color: '#FFFFFF',
              fontSize: '0.7rem',
              fontWeight: '700',
              minWidth: '18px',
              height: '18px',
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 4px',
              boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 90
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                width: '360px',
                maxWidth: '90vw',
                maxHeight: '520px',
                background: isDark ? '#151D32' : '#FFFFFF',
                border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
                borderRadius: '16px',
                boxShadow: isDark
                  ? '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(79, 140, 255, 0.15)'
                  : '0 20px 40px rgba(15, 23, 42, 0.15)',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '14px 18px',
                  borderBottom: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033' }}>
                    Reminders & Alerts
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
                    {unreadCount} unread notification{unreadCount === 1 ? '' : 's'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => setShowAddModal(true)}
                    title="Add Reminder"
                    className="btn btn-sm btn-outline"
                    style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                  >
                    <Plus size={14} /> Add
                  </button>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      title="Mark all as read"
                      className="btn btn-sm btn-secondary"
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                    >
                      <Check size={14} /> All
                    </button>
                  )}
                </div>
              </div>

              {/* Browser notification banner */}
              {permissionStatus !== 'granted' && (
                <div
                  style={{
                    padding: '8px 16px',
                    background: isDark ? 'rgba(79, 140, 255, 0.12)' : '#EEF2FF',
                    borderBottom: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem'
                  }}
                >
                  <span style={{ color: isDark ? '#A0AEC0' : '#4F46E5' }}>
                    Enable browser desktop notifications?
                  </span>
                  <button
                    onClick={handleRequestPermission}
                    style={{
                      padding: '3px 8px',
                      background: '#4F8CFF',
                      color: '#FFF',
                      borderRadius: '6px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Enable
                  </button>
                </div>
              )}

              {/* Notification List */}
              <div style={{ overflowY: 'auto', maxHeight: '380px', padding: '8px' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '32px 16px', textAlign: 'center', color: isDark ? '#A0AEC0' : '#64748B' }}>
                    <Bell size={28} style={{ opacity: 0.3, marginBottom: '8px' }} />
                    <p style={{ fontSize: '0.85rem' }}>No active notifications</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        marginBottom: '6px',
                        background: notif.read
                          ? isDark
                            ? 'transparent'
                            : 'transparent'
                          : isDark
                          ? 'rgba(79, 140, 255, 0.08)'
                          : 'rgba(79, 140, 255, 0.06)',
                        border: `1px solid ${
                          notif.read ? (isDark ? '#1F293D' : '#F1F5F9') : 'rgba(79, 140, 255, 0.25)'
                        }`,
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'flex-start',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      <div
                        style={{
                          marginTop: '2px',
                          padding: '6px',
                          borderRadius: '8px',
                          background: isDark ? '#1A243D' : '#F8FAFC'
                        }}
                      >
                        {getTypeIcon(notif.type)}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <h5
                            style={{
                              fontSize: '0.85rem',
                              fontWeight: notif.read ? '600' : '700',
                              color: isDark ? '#FFF' : '#172033',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {notif.title}
                          </h5>
                          <span style={{ fontSize: '0.7rem', color: isDark ? '#64748B' : '#94A3B8' }}>
                            {notif.date}
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: '0.775rem',
                            color: isDark ? '#A0AEC0' : '#475569',
                            marginTop: '3px',
                            lineHeight: 1.4
                          }}
                        >
                          {notif.message}
                        </p>

                        <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                          {!notif.read && (
                            <button
                              onClick={() => markNotificationRead(notif.id)}
                              style={{
                                fontSize: '0.7rem',
                                color: '#4F8CFF',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              Mark read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notif.id)}
                            style={{
                              fontSize: '0.7rem',
                              color: '#EF4444',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '2px'
                            }}
                          >
                            <Trash2 size={11} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* LocalStorage disclaimer */}
              <div
                style={{
                  padding: '8px 14px',
                  background: isDark ? '#0F162A' : '#F8FAFC',
                  borderTop: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
                  fontSize: '0.675rem',
                  color: isDark ? '#64748B' : '#94A3B8',
                  textAlign: 'center'
                }}
              >
                Note: LocalStorage reminders run actively while JobTrack tab is open.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Custom Reminder Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
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
              maxWidth: '420px',
              background: isDark ? '#151D32' : '#FFFFFF',
              borderRadius: '16px',
              border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: isDark ? '#FFF' : '#172033' }}>
                Add Career Reminder
              </h3>
              <button onClick={() => setShowAddModal(false)} style={{ color: isDark ? '#A0AEC0' : '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateReminder}>
              <div className="form-group">
                <label className="form-label">Reminder Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Follow up on Google application"
                  className="form-input"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                >
                  <option value="reminder">Follow-up Reminder</option>
                  <option value="interview">Interview Alert</option>
                  <option value="deadline">Application Deadline</option>
                  <option value="offer">Offer Decision</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Details / Notes</label>
                <textarea
                  placeholder="Additional context or links..."
                  className="form-textarea"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
