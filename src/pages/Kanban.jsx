import React, { useState } from 'react';
import { Layers, Plus, Sparkles, Info } from 'lucide-react';
import KanbanBoard from '../components/KanbanBoard/KanbanBoard';
import AddApplication from './AddApplication';
import { useApplications } from '../context/ApplicationContext';
import { useTheme } from '../context/ThemeContext';

export default function Kanban() {
  const { applications } = useApplications();
  const { isDark } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div style={{ padding: '28px 24px 60px 24px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: '900',
                color: isDark ? '#FFF' : '#172033',
                letterSpacing: '-0.03em'
              }}
            >
              3D Interactive Kanban Board
            </h1>
            <span
              style={{
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 100%)',
                color: '#FFF',
                fontSize: '0.7rem',
                fontWeight: '700'
              }}
            >
              Drag & Drop
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
            Drag cards between columns to advance stages. Dropping on Offer or Selected unleashes celebratory confetti!
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
          style={{ padding: '10px 18px', fontSize: '0.875rem' }}
        >
          <Plus size={16} /> Add Application
        </button>
      </div>

      {/* Kanban Board Container */}
      <KanbanBoard />

      {/* Add Application Modal instance */}
      {showAddModal && (
        <AddApplication isModal={true} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
