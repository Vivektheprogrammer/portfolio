import React from 'react';
import { Clock, ArrowRight, Compass } from 'lucide-react';

export const FutureSection: React.FC = () => {
  const items = [
    "Systems I haven't built yet.",
    "Problems I haven't solved yet.",
    "Ideas I haven't explored yet.",
    "Stories I haven't written yet.",
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={18} color="#38bdf8" />
          <span className="font-mono" style={{ fontSize: '0.78rem', color: '#38bdf8', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            HOUR 11 · FUTURE HORIZONS
          </span>
        </div>
        <h2 className="font-serif" style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.04em' }}>
          THE NEXT HOUR
        </h2>
        <div className="font-tech" style={{ fontSize: '1rem', color: '#7dd3fc', lineHeight: 1.6, marginTop: '0.2rem' }}>
          <p style={{ margin: 0 }}>Some destinations are planned.</p>
          <p style={{ margin: 0 }}>Others are built along the way.</p>
        </div>
      </div>

      {/* Main Feature Panel */}
      <div
        className="glass-panel"
        style={{
          padding: '2rem 1.8rem',
          borderRadius: '12px',
          background: 'linear-gradient(145deg, rgba(14, 38, 70, 0.55) 0%, rgba(6, 12, 24, 0.85) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', borderBottom: '1px solid rgba(56, 189, 248, 0.15)', paddingBottom: '1rem' }}>
          <span className="font-mono" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.08em' }}>
            11:00 — RESERVED FOR WHAT COMES NEXT
          </span>
        </div>

        {/* List of unbuilt / unsolved items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.85rem 1.1rem',
                borderRadius: '8px',
                background: 'rgba(15, 23, 42, 0.65)',
                border: '1px solid rgba(56, 189, 248, 0.15)',
              }}
            >
              <ArrowRight size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
              <span className="font-tech" style={{ fontSize: '0.95rem', color: '#f1f5f9', letterSpacing: '0.02em' }}>
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Statement */}
        <div
          style={{
            marginTop: '0.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(56, 189, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.8rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Compass size={16} color="#4ade80" />
            <span className="font-mono" style={{ fontSize: '0.82rem', color: '#4ade80', letterSpacing: '0.15em', fontWeight: 700 }}>
              THE WATCH KEEPS MOVING.
            </span>
          </div>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: '#64748b' }}>
            NEXT CYCLE → 12:00
          </span>
        </div>
      </div>
    </div>
  );
};
