import React, { useState } from 'react';
import { HOUR_SECTIONS, BEZEL_MARKERS } from '../../data/portfolioData';
import { horologyAudio } from '../../audio/soundEffects';

interface DialInteractiveOverlayProps {
  selectedHour: number;
  onSelectHour: (hour: number) => void;
  selectedMinute: number | null;
  onSelectMinute: (minute: number) => void;
  isMobile: boolean;
  isDrawerOpen: boolean;
}

export const DialInteractiveOverlay: React.FC<DialInteractiveOverlayProps> = ({
  selectedHour,
  onSelectHour,
  selectedMinute,
  onSelectMinute,
  isMobile,
  isDrawerOpen,
}) => {
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  // If mobile drawer is open and covers most of screen, keep overlay minimal
  if (isMobile && isDrawerOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: isMobile ? '50%' : '1.5rem',
        top: isMobile ? 'auto' : '50%',
        bottom: isMobile ? '5rem' : 'auto',
        transform: isMobile ? 'translateX(-50%)' : 'translateY(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: isMobile ? 'row' : 'column',
        gap: '0.3rem',
        background: 'rgba(6, 11, 19, 0.75)',
        backdropFilter: 'blur(12px)',
        padding: '0.45rem',
        borderRadius: '12px',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
        maxHeight: isMobile ? 'auto' : '82vh',
        maxWidth: isMobile ? '92vw' : 'auto',
        overflowX: isMobile ? 'auto' : 'hidden',
        overflowY: isMobile ? 'hidden' : 'auto',
      }}
      className="custom-scroll"
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.2rem 0.4rem', marginBottom: isMobile ? 0 : '0.2rem' }}>
        <span className="font-mono" style={{ fontSize: '0.62rem', color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', writingMode: isMobile ? 'horizontal-tb' : 'horizontal-tb', whiteSpace: 'nowrap' }}>
          {isMobile ? 'HOURS' : 'INDEX'}
        </span>
      </div>

      {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h) => {
        const isSelected = selectedHour === h;
        const sec = HOUR_SECTIONS[h];
        return (
          <button
            key={`overlay-hour-${h}`}
            onClick={() => {
              horologyAudio.playMarkerSelect();
              onSelectHour(h);
            }}
            onMouseEnter={() => setHoveredHour(h)}
            onMouseLeave={() => setHoveredHour(null)}
            className={`steel-button ${isSelected ? 'active' : ''}`}
            style={{
              padding: isMobile ? '0.35rem 0.55rem' : '0.35rem 0.7rem',
              fontSize: '0.72rem',
              borderRadius: '6px',
              justifyContent: 'flex-start',
              minWidth: isMobile ? '38px' : '110px',
              minHeight: '34px',
              gap: '0.4rem',
            }}
            title={`${h.toString().padStart(2, '0')}:00 — ${sec.label}`}
          >
            <span className="font-mono" style={{ color: isSelected ? '#38bdf8' : '#7dd3fc', fontWeight: 700, fontSize: '0.74rem' }}>
              {h.toString().padStart(2, '0')}
            </span>
            <span className={isMobile ? 'hide-mobile' : ''} style={{ fontSize: '0.72rem', color: isSelected ? '#ffffff' : '#cbd5e1' }}>
              {sec.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
