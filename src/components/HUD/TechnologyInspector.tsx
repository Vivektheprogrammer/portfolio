import React from 'react';
import { BEZEL_MARKERS, BezelMarker } from '../../data/portfolioData';
import { Cpu, X, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { horologyAudio } from '../../audio/soundEffects';

interface TechnologyInspectorProps {
  minute: number | null;
  onClose: () => void;
  onSelectHour: (hour: number) => void;
}

export const TechnologyInspector: React.FC<TechnologyInspectorProps> = ({
  minute,
  onClose,
  onSelectHour,
}) => {
  if (minute === null) return null;

  const marker = BEZEL_MARKERS.find((b) => b.minute === minute) || BEZEL_MARKERS[0];

  return (
    <div
      className="glass-panel"
      style={{
        position: 'fixed',
        bottom: '1.75rem',
        left: '1.75rem',
        maxWidth: '400px',
        width: 'calc(100% - 3.5rem)',
        zIndex: 35,
        borderRadius: '12px',
        padding: '1.25rem',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        boxShadow: '0 16px 36px -8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(56, 189, 248, 0.15)',
        animation: 'fadeInUp 0.3s ease-out forwards',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.55rem' }}>
        <div>
          <span className="font-mono" style={{ fontSize: '0.64rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', padding: '0.12rem 0.4rem', borderRadius: '4px' }}>
            BEZEL TELEMETRY • {marker.minute === 0 ? '60' : marker.minute.toString().padStart(2, '0')} MIN
          </span>
          <h3 className="font-tech" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem' }}>
            {marker.name}
          </h3>
          <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
            {marker.category}
          </p>
        </div>

        <button
          onClick={() => {
            horologyAudio.playCrownPull();
            onClose();
          }}
          className="steel-button"
          style={{ padding: '0.25rem', minWidth: '28px', minHeight: '28px' }}
        >
          <X size={13} />
        </button>
      </div>

      <p style={{ fontSize: '0.78rem', color: '#e2e8f0', lineHeight: 1.45, marginBottom: '0.75rem' }}>
        {marker.description}
      </p>

      {/* Related Skills Tags */}
      <div style={{ marginBottom: '1rem' }}>
        <h4 className="font-mono" style={{ fontSize: '0.68rem', color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          VERIFIED COMPETENCIES
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {marker.relatedSkills.map((sk, i) => (
            <span
              key={i}
              className="glass-pill"
              style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', color: '#7dd3fc' }}
            >
              {sk}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Navigation to Projects or Skills */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => {
            onSelectHour(3); // Go to projects
            onClose();
          }}
          className="steel-button active"
          style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem', padding: '0.45rem' }}
        >
          <Layers size={13} />
          View Projects
        </button>
        <button
          onClick={() => {
            onSelectHour(4); // Go to skills
            onClose();
          }}
          className="steel-button"
          style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem', padding: '0.45rem' }}
        >
          <Cpu size={13} />
          All Skills
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
