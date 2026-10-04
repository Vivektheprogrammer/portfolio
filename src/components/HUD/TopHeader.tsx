import React from 'react';
import { Watch } from 'lucide-react';
import { horologyAudio } from '../../audio/soundEffects';

interface TopHeaderProps {
  onSelectHour: (hour: number) => void;
  onOpenGuide: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onSelectHour,
  onOpenGuide,
}) => {

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

      {/* Right Header Horological Controls - Clean Minimalist GUIDE only */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
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
            padding: '0.4rem 0.75rem',
            fontSize: '0.74rem',
            borderRadius: '7px',
          }}
          title="Interactive Guide: How to operate the 3D watch"
        >
          <Watch size={14} color="#38bdf8" />
          <span className="font-mono header-btn-label" style={{ fontWeight: 700, color: '#ffffff', letterSpacing: '0.05em' }}>
            GUIDE
          </span>
        </button>
      </div>
    </header>
  );
};
