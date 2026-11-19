import React, { useState } from 'react';
import KanbanCard from './KanbanCard';
import { useTheme } from '../../context/ThemeContext';

export default function KanbanColumn({
  title,
  color,
  applications,
  columnIndex,
  totalColumns,
  onDragStart,
  onDropCard,
  onViewDetails,
  onMoveColumn
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { isDark } = useTheme();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    onDropCard(title);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        width: '300px',
        minWidth: '290px',
        maxHeight: 'calc(100vh - 200px)',
        background: isDark
          ? isDragOver
            ? 'rgba(79, 140, 255, 0.12)'
            : '#0F162A'
          : isDragOver
          ? '#EEF2FF'
          : '#F1F5F9',
        borderRadius: '18px',
        border: `1.5px ${isDragOver ? 'dashed #4F8CFF' : `solid ${isDark ? '#222D46' : '#E2E8F0'}`}`,
        display: 'flex',
        flexDirection: 'column',
        padding: '14px',
        transition: 'all 0.2s ease',
        flexShrink: 0
      }}
    >
      {/* Column Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
          paddingBottom: '10px',
          borderBottom: `1px solid ${isDark ? '#1F293D' : '#E2E8F0'}`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 8px ${color}`
            }}
          />
          <h4
            style={{
              fontSize: '0.9rem',
              fontWeight: '700',
              color: isDark ? '#FFFFFF' : '#172033'
            }}
          >
            {title}
          </h4>
        </div>

        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: '700',
            padding: '2px 8px',
            borderRadius: '10px',
            background: isDark ? '#1E293B' : '#E2E8F0',
            color: isDark ? '#A0AEC0' : '#475569'
          }}
        >
          {applications.length}
        </span>
      </div>

      {/* Cards Scroll Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          overflowY: 'auto',
          paddingRight: '2px',
          flex: 1
        }}
      >
        {applications.length === 0 ? (
          <div
            style={{
              padding: '24px 12px',
              textAlign: 'center',
              color: isDark ? '#64748B' : '#94A3B8',
              fontSize: '0.75rem',
              border: `1px dashed ${isDark ? '#1F293D' : '#CBD5E1'}`,
              borderRadius: '12px'
            }}
          >
            Drop applications here
          </div>
        ) : (
          applications.map((app) => (
            <KanbanCard
              key={app.id}
              application={app}
              onDragStart={onDragStart}
              onViewDetails={onViewDetails}
              onMoveColumn={onMoveColumn}
              canMoveLeft={columnIndex > 0}
              canMoveRight={columnIndex < totalColumns - 1}
            />
          ))
        )}
      </div>
    </div>
  );
}
