import React, { useState, useEffect } from 'react';
import { HOUR_SECTIONS } from '../../data/portfolioData';
import { Watch, RotateCw, Layers } from 'lucide-react';
import { horologyAudio } from '../../audio/soundEffects';

interface TopHeaderProps {
  selectedHour: number;
  onSelectHour: (hour: number) => void;
  isRealTime: boolean;
  onToggleRealTime: () => void;
  isCasebackView: boolean;
  onFlipToCaseback: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenNavModal: () => void;
  onOpenGuide: () => void;
  isExploded?: boolean;
  onToggleExplode?: () => void;
  isTerminalOpen?: boolean;
  onToggleTerminal?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  selectedHour,
  onSelectHour,
  isRealTime,
  onToggleRealTime,
  isCasebackView,
  onFlipToCaseback,
  isMuted,
  onToggleMute,
  onOpenNavModal,
  onOpenGuide,
  isExploded = false,
  onToggleExplode,
  isTerminalOpen = false,
  onToggleTerminal,
}) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentSection = HOUR_SECTIONS[selectedHour] || HOUR_SECTIONS[12];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        padding: '0.75rem 1.15rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(180deg, rgba(4, 7, 13, 0.96) 0%, rgba(4, 7, 13, 0.75) 80%, transparent 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.12)',
      }}
    >
      {/* Brand Identity / Home trigger */}
      <button
        onClick={() => onSelectHour(12)}
        style={{
          background: 'none',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          cursor: 'pointer',
          padding: 0,
          textAlign: 'left',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #071529 0%, #0369a1 100%)',
            border: '1.5px solid rgba(56, 189, 248, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(56, 189, 248, 0.25)',
          }}
        >
          <span className="font-serif" style={{ fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.05em' }}>
            VR
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="font-serif" style={{ fontSize: '0.96rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.08em' }}>
              VIVEK R
            </span>
          </div>
          <p className="font-mono header-brand-sub" style={{ fontSize: '0.62rem', color: '#94a3b8', letterSpacing: '0.04em', margin: 0 }}>
            <span className="hide-on-mobile">SOFTWARE DEVELOPMENT ENGINEER</span>
            <span className="hide-on-desktop">SOFTWARE DEV ENGINEER</span>
          </p>
        </div>
      </button>

      {/* Right Header Horological Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
        {/* Deconstruct / Explode 3D Caliber Toggle */}
        {onToggleExplode && (
          <button
            onClick={() => {
              horologyAudio.playMarkerSelect();
              onToggleExplode();
            }}
            className={`steel-button header-btn ${isExploded ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem 0.55rem',
              fontSize: '0.72rem',
              borderRadius: '6px',
              borderColor: isExploded ? '#38bdf8' : undefined,
            }}
            title={isExploded ? 'Lock / Reassemble Caliber' : 'Deconstruct 3D Caliber Layers'}
          >
            <Layers size={13} color={isExploded ? '#38bdf8' : '#cbd5e1'} />
            <span className="font-mono header-btn-label" style={{ fontWeight: 600, color: isExploded ? '#38bdf8' : '#e2e8f0' }}>
              {isExploded ? 'ASSEMBLE' : 'DECONSTRUCT'}
            </span>
          </button>
        )}

        {/* Flip to Exhibition Caseback / Dial Toggle Button */}
        <button
          onClick={() => {
            horologyAudio.playFlip();
            onFlipToCaseback();
          }}
          className="steel-button header-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.35rem 0.55rem',
            fontSize: '0.72rem',
            borderRadius: '6px',
            border: isCasebackView ? '1px solid #38bdf8' : '1px solid rgba(56, 189, 248, 0.25)',
            background: isCasebackView ? 'rgba(56, 189, 248, 0.15)' : 'rgba(15, 23, 42, 0.65)',
          }}
          title={isCasebackView ? 'Flip to Dial' : 'Flip to Exhibition Caliber'}
        >
          <RotateCw size={13} color={isCasebackView ? '#38bdf8' : '#cbd5e1'} />
          <span className="font-mono header-btn-label" style={{ fontWeight: 600, color: isCasebackView ? '#38bdf8' : '#e2e8f0' }}>
            {isCasebackView ? 'DIAL' : 'CALIBER'}
          </span>
        </button>

        {/* Watch Guide Modal Trigger */}
        <button
          onClick={() => {
            horologyAudio.playMarkerSelect();
            onOpenGuide();
          }}
          className="steel-button header-btn active"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.35rem 0.55rem',
            fontSize: '0.72rem',
            borderRadius: '6px',
          }}
          title="Interactive Guide: How to operate the 3D watch"
        >
          <Watch size={13} color="#38bdf8" />
          <span className="font-mono header-btn-label" style={{ fontWeight: 700, color: '#ffffff' }}>GUIDE</span>
        </button>
      </div>
    </header>
  );
};
