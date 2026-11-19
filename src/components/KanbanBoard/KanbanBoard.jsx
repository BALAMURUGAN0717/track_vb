import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import ApplicationDetailModal from '../JobCard/ApplicationDetailModal';
import EditApplicationModal from '../JobCard/EditApplicationModal';
import { useApplications } from '../../context/ApplicationContext';
import { useTheme } from '../../context/ThemeContext';

export default function KanbanBoard() {
  const { applications, updateStatus } = useApplications();
  const { isDark } = useTheme();

  const [draggedAppId, setDraggedAppId] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [editingApp, setEditingApp] = useState(null);

  const COLUMNS = [
    { title: 'Applied', color: '#3B82F6' },
    { title: 'Under Review', color: '#F59E0B' },
    { title: 'Shortlisted', color: '#8B5CF6' },
    { title: 'Interview Scheduled', color: '#06B6D4' },
    { title: 'Offer Received', color: '#10B981' },
    { title: 'Selected', color: '#059669' },
    { title: 'Rejected', color: '#EF4444' }
  ];

  const handleDragStart = (e, appId) => {
    setDraggedAppId(appId);
    e.dataTransfer.setData('text/plain', appId);
  };

  const handleDropCard = (targetStatus) => {
    if (draggedAppId) {
      updateStatus(draggedAppId, targetStatus);
      setDraggedAppId(null);
    }
  };

  const handleMoveColumn = (appId, delta) => {
    const app = applications.find((a) => a.id === appId);
    if (!app) return;

    const currentIndex = COLUMNS.findIndex((c) => c.title === app.status);
    if (currentIndex === -1) return;

    const newIndex = currentIndex + delta;
    if (newIndex >= 0 && newIndex < COLUMNS.length) {
      updateStatus(appId, COLUMNS[newIndex].title);
    }
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '16px' }}>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
          minWidth: 'max-content',
          padding: '4px'
        }}
      >
        {COLUMNS.map((col, idx) => {
          const colApps = applications.filter((a) => a.status === col.title);

          return (
            <KanbanColumn
              key={col.title}
              title={col.title}
              color={col.color}
              applications={colApps}
              columnIndex={idx}
              totalColumns={COLUMNS.length}
              onDragStart={handleDragStart}
              onDropCard={handleDropCard}
              onViewDetails={(app) => setSelectedApp(app)}
              onMoveColumn={handleMoveColumn}
            />
          );
        })}
      </div>

      {/* Details Modal */}
      <ApplicationDetailModal
        application={selectedApp}
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        onEdit={(app) => {
          setSelectedApp(null);
          setEditingApp(app);
        }}
      />

      {/* Edit Modal */}
      <EditApplicationModal
        application={editingApp}
        isOpen={!!editingApp}
        onClose={() => setEditingApp(null)}
      />
    </div>
  );
}
