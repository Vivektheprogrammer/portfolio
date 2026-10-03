import React, { useState } from 'react';
import { HelpCircle, X, Compass, Clock, Sliders, RotateCw, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { horologyAudio } from '../../audio/soundEffects';

interface WatchGuideProps {
  onSelectHour: (hour: number) => void;
  onFlipToCaseback: () => void;
  isOpen: boolean;
  onClose: () => void;
  isDrawerOpen?: boolean;
}

export const WatchGuide: React.FC<WatchGuideProps> = ({
  onSelectHour,
  onFlipToCaseback,
  isOpen,
  onClose,
  isDrawerOpen = false,
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
      id: 'crown',
      icon: <RotateCw size={20} color="#38bdf8" />,
      title: 'Crown & Exhibition Caseback',
      badge: '3D Flip & Movement',
      actionText: 'Flip Watch 180°',
      onAction: () => {
        onFlipToCaseback();
        onClose();
      },
      desc: 'Click the stainless steel crown on the right side at 3 o\'clock (or click the rotor on the back) to flip the watch 180° and view the custom mechanical caliber movement and PoetByte portal.',
    },
    {
      id: 'orbit',
      icon: <Compass size={20} color="#38bdf8" />,
      title: '360° Spatial Inspection',
      badge: '3D Drag & Orbit',
      actionText: 'Drag on Canvas',
      desc: 'Click and drag anywhere around the watch in 3D space to orbit, tilt, and admire the craftsmanship, brushed steel case, and live sweeping watch hands from every angle.',
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
            background: 'rgba(2, 6, 14, 0.85)',
            backdropFilter: 'blur(16px)',
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
              maxWidth: '680px',
              width: '100%',
              maxHeight: '88vh',
              overflowY: 'auto',
              borderRadius: '16px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              padding: '2rem',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(56, 189, 248, 0.15)', paddingBottom: '1rem' }}>
              <div>
                <span className="font-mono" style={{ fontSize: '0.7rem', color: '#38bdf8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  HOROLOGICAL NAVIGATION MANUAL
                </span>
                <h2 className="font-serif" style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f8fafc', margin: '0.2rem 0 0 0' }}>
                  Controlling the Portfolio via the Watch
                </h2>
              </div>
              <button
                onClick={onClose}
                className="steel-button"
                style={{ padding: '0.45rem', borderRadius: '50%', minWidth: '36px', minHeight: '36px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Subtitle */}
            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              This entire portfolio is an interactive 3D timepiece. There are no static list menus—every section, technical skill, and deep dive is controlled directly by interacting with physical parts of the watch:
            </p>

            {/* Guide Steps Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {guideSteps.map((step) => (
                <div
                  key={step.id}
                  style={{
                    background: 'rgba(10, 20, 35, 0.65)',
                    border: '1px solid rgba(56, 189, 248, 0.18)',
                    borderRadius: '12px',
                    padding: '1.1rem 1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '8px',
                          background: 'rgba(56, 189, 248, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {step.icon}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                          {step.title}
                        </h4>
                        <span className="font-mono" style={{ fontSize: '0.68rem', color: '#38bdf8' }}>
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
                        className="steel-button"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.72rem', gap: '0.3rem' }}
                      >
                        <span>{step.actionText}</span>
                        <ChevronRight size={12} />
                      </button>
                    )}
                  </div>

                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.55, margin: '0.25rem 0 0 0' }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick 12-Hour Reference Chart */}
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(4, 8, 16, 0.75)', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.12)' }}>
              <span className="font-mono" style={{ fontSize: '0.68rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>
                12-Hour Dial Quick Reference Map
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.45rem' }}>
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
                    }}
                  >
                    <span className="font-mono" style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700 }}>
                      {h.toString().padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>{l}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Dismiss Button */}
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={onClose}
                className="steel-button active"
                style={{ padding: '0.55rem 1.5rem', fontSize: '0.85rem' }}
              >
                <CheckCircle2 size={16} />
                <span>Got It • Explore Watch</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
