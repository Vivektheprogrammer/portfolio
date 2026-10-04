import React, { useState } from 'react';
import { HelpCircle, X, Compass, Clock, Sliders, RotateCw, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { horologyAudio } from '../../audio/soundEffects';

interface WatchGuideProps {
  onSelectHour: (hour: number) => void;
  onFlipToCaseback: () => void;
  isOpen: boolean;
  onClose: () => void;
  isDrawerOpen?: boolean;
  onCycleFinish?: () => void;
  onCycleCrown?: () => void;
  crownPosition?: number;
}

export const WatchGuide: React.FC<WatchGuideProps> = ({
  onSelectHour,
  onFlipToCaseback,
  isOpen,
  onClose,
  isDrawerOpen = false,
  onCycleFinish,
  onCycleCrown,
  crownPosition = 0,
}) => {
  const [hasSeenHint, setHasSeenHint] = useState(false);

  const guideSteps = [
    {
      id: 'dial',
      icon: <Clock size={20} color="#38bdf8" />,
      title: '12 Dial Hour Markers',
      badge: 'Main Portfolio Chapters',
      actionText: 'Try Hour 03 (Projects)',
      onAction: () => {
        onSelectHour(3);
        onClose();
      },
      desc: 'Click directly on any of the 12 silver batons on the watch face to open that section (12: Home, 01: About, 02: Experience, 03: Projects, 04: Skills, 05: Resume, 06: PoetByte, 07: Achievements, 08: Contact, 09: Playground, 10: More, 11: Future).',
    },
    {
      id: 'bezel',
      icon: <Sliders size={20} color="#38bdf8" />,
      title: '60-Minute Bezel Numerals',
      badge: 'Technology Stack',
      actionText: 'Click Bezel 15 / 30 / 45',
      desc: 'Click any minute marker (5, 10, 15, 20... 60) on the outer navy bezel to inspect technical architectures and proficiencies (Java, Python, Spring Boot, PostgreSQL, AWS, Docker, Kubernetes).',
    },
    {
      id: 'crown-1',
      icon: <Sparkles size={20} color="#fbbf24" />,
      title: 'Crown Pull 1: Metal & Colour Setting',
      badge: '1st Notch Pull (P)',
      actionText: 'Pull 1 Click (P)',
      onAction: () => {
        if (onCycleCrown) onCycleCrown();
        onClose();
      },
      desc: 'Click the 3D crown knob once (or press "P") to pull to Position 1. Scroll your mouse wheel or swipe up/down on mobile to cycle case & bracelet finishes (316L Stainless Steel, 18k Rose Gold, DLC Stealth Black, Titanium).',
    },
    {
      id: 'crown-2',
      icon: <RotateCw size={20} color="#38bdf8" />,
      title: 'Crown Pull 2: Profile & Time Setting',
      badge: '2nd Notch Pull (P)',
      actionText: 'Pull 2 Clicks (P)',
      onAction: () => {
        if (onCycleCrown) onCycleCrown();
        onClose();
      },
      desc: 'Click the crown a 2nd time (or press "P") to pull to Position 2. Scroll your mouse wheel or swipe up/down on mobile to scrub through portfolio chapters (1–12), moving the hands and updating profiles in real time.',
    },
    {
      id: 'crown-push',
      icon: <CheckCircle2 size={20} color="#34d399" />,
      title: 'Crown Push In: Return to Live Time',
      badge: 'Automatic Sync',
      actionText: 'Push Crown In',
      onAction: () => {
        if (onCycleCrown) onCycleCrown();
        onClose();
      },
      desc: 'Click the crown again to push it back in flush. The hands will automatically sweep and synchronize with your current live local time.',
    },
    {
      id: 'orbit',
      icon: <Compass size={20} color="#38bdf8" />,
      title: '360° Spatial Inspection',
      badge: '3D Drag & Orbit',
      actionText: 'Drag on Canvas',
      desc: 'When the crown is pushed in, click and drag anywhere in 3D space to orbit, tilt, and admire the craftsmanship, brushed steel case, and sweeping watch hands from every angle.',
    },
    {
      id: 'caseback',
      icon: <RotateCw size={20} color="#fbbf24" />,
      title: 'Exhibition Sapphire Caseback',
      badge: 'Caliber Movement (F)',
      actionText: 'Flip Watch (F)',
      onAction: () => {
        onFlipToCaseback();
        onClose();
      },
      desc: 'Press "F" or select Hour 06 to flip the watch and admire the skeleton automatic caliber movement, 24K gold engraved rotor, and Swiss escapement.',
    },
  ];

  return (
    <>
      {/* Subtle Interaction Hint Banner with perfect horizontal alignment */}
      {!hasSeenHint && !isOpen && !isDrawerOpen && (
        <div
          className="watch-hint-pill"
          style={{
            position: 'fixed',
            bottom: '1.75rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 35,
            background: 'linear-gradient(180deg, rgba(8, 14, 26, 0.94) 0%, rgba(4, 8, 16, 0.98) 100%)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.75), 0 0 20px rgba(56, 189, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.65rem',
            borderRadius: '9999px',
            padding: '0.55rem 1rem 0.55rem 1.15rem',
            width: 'max-content',
            maxWidth: 'min(92vw, 460px)',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flex: 1, minWidth: 0 }}>
            <Sparkles size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.76rem', color: '#e2e8f0', fontWeight: 500, lineHeight: 1.4, textAlign: 'left' }}>
              Click any <strong style={{ color: '#38bdf8' }}>Hour Marker (1–12)</strong> or <strong style={{ color: '#7dd3fc' }}>Bezel Number</strong> to navigate
            </span>
          </div>
          <button
            onClick={() => setHasSeenHint(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '50%',
              color: '#94a3b8',
              cursor: 'pointer',
              width: '24px',
              height: '24px',
              minWidth: '24px',
              minHeight: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              flexShrink: 0,
              transition: 'all 0.2s ease',
            }}
            title="Dismiss hint"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Comprehensive Watch Operation Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(2, 6, 14, 0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(0.75rem, 3vw, 1.5rem)',
          }}
          onClick={onClose}
        >
          <div
            className="glass-panel custom-scroll guide-modal-container"
            style={{
              maxWidth: '680px',
              width: '100%',
              maxHeight: '88vh',
              overflowY: 'auto',
              borderRadius: '16px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              padding: '2rem',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95)',
              boxSizing: 'border-box',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(56, 189, 248, 0.15)', paddingBottom: '1rem' }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: '#38bdf8', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>
                  HOROLOGICAL NAVIGATION MANUAL
                </span>
                <h2 className="font-serif" style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.45rem)', fontWeight: 800, color: '#f8fafc', margin: '0.25rem 0 0 0', lineHeight: 1.25 }}>
                  Controlling the Portfolio via the Watch
                </h2>
              </div>
              <button
                onClick={onClose}
                className="steel-button"
                style={{ padding: '0.45rem', borderRadius: '50%', width: '38px', height: '38px', minWidth: '38px', minHeight: '38px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Close guide"
              >
                <X size={18} />
              </button>
            </div>

            {/* Live Crown State Indicator Banner */}
            <div
              style={{
                background: 'rgba(7, 16, 32, 0.75)',
                border: '1px solid rgba(56, 189, 248, 0.22)',
                borderRadius: '10px',
                padding: '0.75rem 0.9rem',
                marginBottom: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.45rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.35rem' }}>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  2-Stage Crown Quick Status
                </span>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 600 }}>
                  Shortcut: Press "P"
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.4rem' }}>
                <div
                  style={{
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px',
                    background: crownPosition === 0 ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.5)',
                    border: crownPosition === 0 ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span style={{ fontSize: '0.66rem', color: crownPosition === 0 ? '#38bdf8' : '#94a3b8', fontWeight: 700 }}>POS 0 • PUSHED IN</span>
                  <span style={{ fontSize: '0.62rem', color: '#cbd5e1' }}>Live Real Time Clock</span>
                </div>
                <div
                  style={{
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px',
                    background: crownPosition === 1 ? 'rgba(251, 191, 36, 0.2)' : 'rgba(15, 23, 42, 0.5)',
                    border: crownPosition === 1 ? '1px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span style={{ fontSize: '0.66rem', color: crownPosition === 1 ? '#fbbf24' : '#94a3b8', fontWeight: 700 }}>POS 1 • 1ST PULL</span>
                  <span style={{ fontSize: '0.62rem', color: '#cbd5e1' }}>Scroll: Change Metal & Colour</span>
                </div>
                <div
                  style={{
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px',
                    background: crownPosition === 2 ? 'rgba(56, 189, 248, 0.25)' : 'rgba(15, 23, 42, 0.5)',
                    border: crownPosition === 2 ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span style={{ fontSize: '0.66rem', color: crownPosition === 2 ? '#38bdf8' : '#94a3b8', fontWeight: 700 }}>POS 2 • 2ND PULL</span>
                  <span style={{ fontSize: '0.62rem', color: '#cbd5e1' }}>Scroll: Step Profile Chapters</span>
                </div>
              </div>
            </div>

            {/* Guide Steps Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {guideSteps.map((step) => (
                <div
                  key={step.id}
                  style={{
                    background: 'rgba(10, 20, 35, 0.65)',
                    border: '1px solid rgba(56, 189, 248, 0.18)',
                    borderRadius: '12px',
                    padding: '1rem 1.15rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.55rem',
                  }}
                >
                  <div className="guide-card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          minWidth: '36px',
                          minHeight: '36px',
                          borderRadius: '8px',
                          background: 'rgba(56, 189, 248, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {step.icon}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#f8fafc', margin: 0, lineHeight: 1.3 }}>
                          {step.title}
                        </h4>
                        <span className="font-mono" style={{ fontSize: '0.68rem', color: '#38bdf8', display: 'block', marginTop: '0.1rem' }}>
                          {step.badge}
                        </span>
                      </div>
                    </div>

                    {step.onAction && (
                      <button
                        onClick={() => {
                          horologyAudio.playMarkerSelect();
                          step.onAction?.();
                        }}
                        className="steel-button guide-card-action-btn"
                        style={{ padding: '0.4rem 0.85rem', fontSize: '0.72rem', gap: '0.35rem', flexShrink: 0, whiteSpace: 'nowrap' }}
                      >
                        <span>{step.actionText}</span>
                        <ChevronRight size={13} />
                      </button>
                    )}
                  </div>

                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick 12-Hour Reference Chart */}
            <div style={{ marginTop: '1.25rem', padding: '0.9rem', background: 'rgba(4, 8, 16, 0.75)', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.12)' }}>
              <span className="font-mono" style={{ fontSize: '0.68rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.55rem' }}>
                12-Hour Dial Quick Reference Map
              </span>
              <div className="guide-ref-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.45rem' }}>
                {[
                  { h: 12, l: 'Home' },
                  { h: 1, l: 'About' },
                  { h: 2, l: 'Experience' },
                  { h: 3, l: 'Projects' },
                  { h: 4, l: 'Skills' },
                  { h: 5, l: 'Resume' },
                  { h: 6, l: 'PoetByte' },
                  { h: 7, l: 'Achievements' },
                  { h: 8, l: 'Contact' },
                  { h: 9, l: 'Playground' },
                  { h: 10, l: 'More' },
                  { h: 11, l: 'Future' },
                ].map(({ h, l }) => (
                  <button
                    key={`map-${h}`}
                    onClick={() => {
                      onSelectHour(h);
                      onClose();
                    }}
                    style={{
                      background: 'rgba(15, 29, 50, 0.5)',
                      border: '1px solid rgba(56, 189, 248, 0.15)',
                      borderRadius: '6px',
                      padding: '0.35rem 0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      minHeight: '34px',
                    }}
                  >
                    <span className="font-mono" style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700 }}>
                      {h.toString().padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Dismiss Button */}
            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
              <button
                onClick={onClose}
                className="steel-button active"
                style={{
                  padding: '0.65rem 1.5rem',
                  fontSize: '0.82rem',
                  width: '100%',
                  maxWidth: '340px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.05em',
                  borderRadius: '8px',
                }}
              >
                <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap' }}>Got It • Explore Watch</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
