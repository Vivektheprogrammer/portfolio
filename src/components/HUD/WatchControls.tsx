import React from 'react';
import { RotateCw, Moon, Sun, Layers } from 'lucide-react';
import { horologyAudio } from '../../audio/soundEffects';

interface WatchControlsProps {
  isCasebackView: boolean;
  onFlipToCaseback: () => void;
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
  selectedHour: number;
}

export const WatchControls: React.FC<WatchControlsProps> = ({
  isCasebackView,
  onFlipToCaseback,
  isDrawerOpen,
  onToggleDrawer,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        left: '1.25rem',
        zIndex: 25,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4rem',
        background: 'rgba(7, 12, 20, 0.82)',
        backdropFilter: 'blur(12px)',
        padding: '0.4rem 0.6rem',
        borderRadius: '10px',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        boxShadow: '0 12px 28px rgba(0,0,0,0.5)',
      }}
    >
      {/* Flip Caseback View */}
      <button
        onClick={() => {
          horologyAudio.playFlip();
          onFlipToCaseback();
        }}
        className={`steel-button ${isCasebackView ? 'active' : ''}`}
        style={{ fontSize: '0.74rem', padding: '0.4rem 0.65rem' }}
        title="Flip Watch to Inspect Exhibition Caliber"
      >
        <RotateCw size={13} />
        <span>{isCasebackView ? 'Dial View' : 'Flip Caseback'}</span>
      </button>

      {/* Toggle Dossier Panel */}
      <button
        onClick={onToggleDrawer}
        className={`steel-button ${isDrawerOpen ? 'active' : ''}`}
        style={{ fontSize: '0.74rem', padding: '0.4rem 0.65rem' }}
        title="Toggle Section Information Dossier"
      >
        <Layers size={13} />
        <span>{isDrawerOpen ? 'Close Dossier' : 'Open Dossier'}</span>
      </button>
    </div>
  );
};
