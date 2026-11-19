import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '68px',
        height: '34px',
        borderRadius: '20px',
        padding: '3px',
        background: isDark
          ? 'linear-gradient(135deg, #151D32 0%, #0B1020 100%)'
          : 'linear-gradient(135deg, #EEF2FF 0%, #E2E8F0 100%)',
        border: `1.5px solid ${isDark ? '#29344D' : '#CBD5E1'}`,
        cursor: 'pointer',
        boxShadow: isDark
          ? '0 2px 10px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.05)'
          : '0 2px 8px rgba(79, 140, 255, 0.15), inset 0 1px 2px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Sun Icon (Left) */}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          color: isDark ? '#64748B' : '#F59E0B',
          zIndex: 1,
          transition: 'color 0.2s ease'
        }}
      >
        <Sun size={16} />
      </span>

      {/* Moon Icon (Right) */}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          color: isDark ? '#818CF8' : '#94A3B8',
          zIndex: 1,
          transition: 'color 0.2s ease'
        }}
      >
        <Moon size={15} />
      </span>

      {/* Sliding Knob */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
        style={{
          position: 'absolute',
          top: '3px',
          left: isDark ? '36px' : '3px',
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          background: isDark
            ? 'linear-gradient(135deg, #8B5CF6 0%, #4F8CFF 100%)'
            : 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
          boxShadow: isDark
            ? '0 0 12px rgba(139, 92, 246, 0.6)'
            : '0 2px 6px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </button>
  );
}
