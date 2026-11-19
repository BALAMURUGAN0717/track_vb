import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function StatCard({
  title,
  count,
  icon: Icon,
  gradient,
  trend,
  color,
  progress,
  description
}) {
  const { isDark } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        background: isDark ? '#151D32' : '#FFFFFF',
        borderRadius: '18px',
        border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
        boxShadow: isDark
          ? '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(79, 140, 255, 0.05)'
          : '0 10px 30px -5px rgba(15, 23, 42, 0.06)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default'
      }}
    >
      {/* Background Subtle Gradient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: color || '#4F8CFF',
          filter: 'blur(45px)',
          opacity: isDark ? 0.2 : 0.12,
          pointerEvents: 'none'
        }}
      />

      {/* Header: Title & Icon */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '0.825rem',
            fontWeight: '600',
            color: isDark ? '#A0AEC0' : '#64748B',
            textTransform: 'capitalize'
          }}
        >
          {title}
        </span>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: gradient || 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: `0 4px 14px ${color ? color + '40' : 'rgba(79, 140, 255, 0.35)'}`
          }}
        >
          <Icon size={20} />
        </div>
      </div>

      {/* Counter */}
      <div style={{ margin: '14px 0 10px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span
            style={{
              fontSize: '2.1rem',
              fontWeight: '800',
              color: isDark ? '#FFFFFF' : '#172033',
              letterSpacing: '-0.03em',
              lineHeight: 1
            }}
          >
            {count}
          </span>
          {trend && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                color: trend.startsWith('+') || trend.includes('High') ? '#10B981' : '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                background: isDark ? 'rgba(16, 185, 129, 0.12)' : '#ECFDF5',
                padding: '2px 6px',
                borderRadius: '6px'
              }}
            >
              <TrendingUp size={12} />
              {trend}
            </span>
          )}
        </div>
        {description && (
          <p style={{ fontSize: '0.75rem', color: isDark ? '#64748B' : '#94A3B8', marginTop: '6px' }}>
            {description}
          </p>
        )}
      </div>

      {/* Progress Bar */}
      {progress !== undefined && (
        <div style={{ marginTop: '8px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.7rem',
              color: isDark ? '#A0AEC0' : '#64748B',
              marginBottom: '4px'
            }}
          >
            <span>Target Volume</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div
            style={{
              width: '100%',
              height: '5px',
              borderRadius: '3px',
              background: isDark ? '#1F293D' : '#F1F5F9',
              overflow: 'hidden'
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                height: '100%',
                borderRadius: '3px',
                background: color || 'var(--gradient-primary)'
              }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
