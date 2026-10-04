import React from 'react';
import { HOUR_SECTIONS } from '../../data/portfolioData';
import { WatchFinish, WATCH_FINISHES } from '../Watch3D/materials';
import { horologyAudio } from '../../audio/soundEffects';
import { RotateCw, ChevronLeft, ChevronRight, BookOpen, X, Sparkles } from 'lucide-react';

interface CrownSettingBarProps {
  isOpen: boolean;
  selectedHour: number;
  onSelectHour: (hour: number) => void;
  onOpenSection: (hour: number) => void;
  onClose: () => void;
  finish: WatchFinish;
  onChangeFinish: (finish: WatchFinish) => void;
  isMobile: boolean;
}

export const CrownSettingBar: React.FC<CrownSettingBarProps> = ({
  isOpen,
  selectedHour,
  onSelectHour,
  onOpenSection,
  onClose,
  finish,
  onChangeFinish,
  isMobile,
}) => {
  if (!isOpen) return null;

  const currentSection = HOUR_SECTIONS[selectedHour] || HOUR_SECTIONS[12];

  const handleStep = (step: number) => {
    horologyAudio.playCrownRatchet();
    let next = selectedHour + step;
    if (next > 12) next = 1;
    if (next < 1) next = 12;
    onSelectHour(next);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: isMobile ? '16px' : '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 90,
        width: isMobile ? 'calc(100% - 1.5rem)' : 'auto',
        maxWidth: isMobile ? '440px' : '780px',
        background: 'linear-gradient(135deg, rgba(8, 16, 32, 0.94) 0%, rgba(4, 8, 18, 0.97) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(56, 189, 248, 0.45)',
        borderRadius: isMobile ? '16px' : '999px',
        padding: isMobile ? '0.65rem 0.85rem' : '0.45rem 0.85rem',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.88), 0 0 24px rgba(56, 189, 248, 0.2)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        gap: isMobile ? '0.55rem' : '0.85rem',
        boxSizing: 'border-box',
        animation: 'fadeInUp 0.25s ease-out',
      }}
    >
      {/* Top / Left: Stepper + Hour Display */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', width: isMobile ? '100%' : 'auto', justifyContent: 'space-between' }}>
        {/* Crown Active Pill Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '999px',
            padding: '0.25rem 0.55rem',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#38bdf8',
              boxShadow: '0 0 6px #38bdf8',
              display: 'inline-block',
            }}
          />
          <span style={{ fontSize: '0.66rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.04em' }}>
            CROWN
          </span>
        </div>

        {/* Stepper Buttons & Time Display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flex: isMobile ? 1 : 'none', justifyContent: 'center' }}>
          <button
            onClick={() => handleStep(-1)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              color: '#38bdf8',
              width: '26px',
              height: '26px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              touchAction: 'manipulation',
            }}
            title="Previous Hour"
          >
            <ChevronLeft size={15} />
          </button>

          <div style={{ textAlign: 'center', padding: '0 0.4rem', minWidth: isMobile ? '120px' : '145px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff', fontFamily: 'monospace' }}>
              {selectedHour.toString().padStart(2, '0')}:00
            </span>
            <span style={{ fontSize: '0.74rem', color: '#93c5fd', fontWeight: 700, marginLeft: '0.35rem' }}>
              {currentSection.title}
            </span>
          </div>

          <button
            onClick={() => handleStep(1)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              color: '#38bdf8',
              width: '26px',
              height: '26px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              touchAction: 'manipulation',
            }}
            title="Next Hour"
          >
            <ChevronRight size={15} />
          </button>
        </div>

        {isMobile && (
          <button
            onClick={() => {
              horologyAudio.playCrownPush();
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              color: '#94a3b8',
              width: '24px',
              height: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            title="Close"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Divider on Desktop */}
      {!isMobile && (
        <div style={{ width: '1px', height: '22px', background: 'rgba(255, 255, 255, 0.15)' }} />
      )}

      {/* Bottom Row on Mobile / Right Group on Desktop */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-start' }}>
        {/* Metal Finish Dot Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          {(['steel', 'gold', 'black', 'titanium'] as WatchFinish[]).map((f) => {
            const isSelected = finish === f;
            const fMat = WATCH_FINISHES[f];
            const label = f === 'steel' ? '316L' : f === 'gold' ? 'Gold' : f === 'black' ? 'DLC' : 'Ti';
            return (
              <button
                key={f}
                onClick={() => {
                  horologyAudio.playMarkerSelect();
                  onChangeFinish(f);
                }}
                style={{
                  background: isSelected ? 'rgba(56, 189, 248, 0.28)' : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '999px',
                  padding: '0.22rem 0.48rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.28rem',
                  transition: 'all 0.15s ease',
                  touchAction: 'manipulation',
                }}
                title={fMat.name}
              >
                <span
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: fMat.primary,
                    display: 'inline-block',
                  }}
                />
                <span style={{ fontSize: '0.62rem', color: isSelected ? '#38bdf8' : '#cbd5e1', fontWeight: 700 }}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons: Live Time + Read Dossier */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginLeft: isMobile ? 'auto' : '0.35rem' }}>
          <button
            onClick={() => {
              horologyAudio.playCrownPush();
              onClose();
            }}
            style={{
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              border: '1px solid rgba(56, 189, 248, 0.6)',
              borderRadius: '999px',
              color: '#ffffff',
              fontSize: '0.7rem',
              fontWeight: 800,
              padding: '0.32rem 0.65rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              boxShadow: '0 2px 10px rgba(2, 132, 199, 0.4)',
              touchAction: 'manipulation',
              whiteSpace: 'nowrap',
            }}
            title="Push Crown In and Return to Live Clock"
          >
            <RotateCw size={12} />
            <span>Live Time</span>
          </button>

          <button
            onClick={() => {
              horologyAudio.playCrownPush();
              onOpenSection(selectedHour);
            }}
            style={{
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '999px',
              color: '#38bdf8',
              fontSize: '0.7rem',
              fontWeight: 800,
              padding: '0.32rem 0.65rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              touchAction: 'manipulation',
              whiteSpace: 'nowrap',
            }}
            title="Read Full Portfolio Dossier for this Hour"
          >
            <BookOpen size={12} />
            <span>Read</span>
          </button>

          {!isMobile && (
            <button
              onClick={() => {
                horologyAudio.playCrownPush();
                onClose();
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                color: '#94a3b8',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '0.2rem',
              }}
              title="Close"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
