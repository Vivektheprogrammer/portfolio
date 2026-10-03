import React, { useEffect } from 'react';
import { HOUR_SECTIONS, BEZEL_MARKERS } from '../../data/portfolioData';
import { X, Clock, Cpu, ArrowRight } from 'lucide-react';
import { horologyAudio } from '../../audio/soundEffects';

interface AccessibleNavModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedHour: number;
  onSelectHour: (hour: number) => void;
  selectedMinute: number | null;
  onSelectMinute: (minute: number) => void;
}

export const AccessibleNavModal: React.FC<AccessibleNavModalProps> = ({
  isOpen,
  onClose,
  selectedHour,
  onSelectHour,
  selectedMinute,
  onSelectMinute,
}) => {
  // Keyboard Shortcuts: Esc to close, 1-9, 0, -, = for hours
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key >= '1' && e.key <= '9') {
        const h = parseInt(e.key, 10);
        onSelectHour(h);
        onClose();
      } else if (e.key === '0') {
        onSelectHour(10);
        onClose();
      } else if (e.key === '-') {
        onSelectHour(11);
        onClose();
      } else if (e.key === '=') {
        onSelectHour(12);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onSelectHour]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'rgba(4, 7, 13, 0.88)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel custom-scroll"
        style={{
          maxWidth: '850px',
          width: '100%',
          maxHeight: '88vh',
          overflowY: 'auto',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid rgba(56, 189, 248, 0.15)', paddingBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <Clock size={18} color="#38bdf8" />
              <span className="font-mono" style={{ fontSize: '0.75rem', color: '#38bdf8', letterSpacing: '0.12em' }}>
                HOROLOGICAL INDEX • ACCESSIBLE DIRECT NAVIGATION
              </span>
            </div>
            <h2 className="font-serif" style={{ fontSize: '1.8rem', color: '#f8fafc', fontWeight: 700 }}>
              Master Portfolio Directory
            </h2>
            <p className="font-tech" style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
              Select any 12-hour section or 60-minute bezel technology coordinate.
            </p>
          </div>

          <button
            onClick={() => {
              horologyAudio.playCrownPull();
              onClose();
            }}
            className="steel-button"
            style={{ padding: '0.45rem', minWidth: '36px', minHeight: '36px' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* 12 Hour Positions Grid */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 className="font-mono" style={{ fontSize: '0.8rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
            12 PRIMARY HOUR SECTIONS
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.65rem' }}>
            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h) => {
              const sec = HOUR_SECTIONS[h];
              const isSelected = selectedHour === h;
              return (
                <button
                  key={h}
                  onClick={() => {
                    horologyAudio.playMarkerSelect();
                    onSelectHour(h);
                    onClose();
                  }}
                  className={`steel-button ${isSelected ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span className="font-mono" style={{ color: isSelected ? '#38bdf8' : '#7dd3fc', fontWeight: 700, fontSize: '0.9rem' }}>
                      {h.toString().padStart(2, '0')}
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: isSelected ? '#ffffff' : '#f8fafc' }}>
                        {sec.label}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        {sec.title}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={14} color="#64748b" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Bezel Minute Technology Index */}
        <div>
          <h3 className="font-mono" style={{ fontSize: '0.8rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
            BEZEL 60-MINUTE TECHNOLOGY INDEX
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.5rem' }}>
            {BEZEL_MARKERS.map((bm) => {
              const isSelected = selectedMinute === bm.minute;
              return (
                <button
                  key={bm.minute}
                  onClick={() => {
                    horologyAudio.playBezelClick();
                    onSelectMinute(bm.minute);
                    onClose();
                  }}
                  className={`steel-button ${isSelected ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '6px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="font-mono" style={{ color: '#38bdf8', fontSize: '0.78rem' }}>
                      {bm.minute === 0 ? '60' : bm.minute.toString().padStart(2, '0')}m
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#e2e8f0' }}>
                      {bm.name}
                    </span>
                  </div>
                  <Cpu size={12} color="#64748b" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
