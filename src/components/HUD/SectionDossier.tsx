import React from 'react';
import { HOUR_SECTIONS } from '../../data/portfolioData';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { horologyAudio } from '../../audio/soundEffects';

// Section components
import { HomeSection } from '../Sections/HomeSection';
import { AboutSection } from '../Sections/AboutSection';
import { ExperienceSection } from '../Sections/ExperienceSection';
import { ProjectsSection } from '../Sections/ProjectsSection';
import { SkillsSection } from '../Sections/SkillsSection';
import { ResumeSection } from '../Sections/ResumeSection';
import { PoetByteSection } from '../Sections/PoetByteSection';
import { AchievementsSection } from '../Sections/AchievementsSection';
import { ContactSection } from '../Sections/ContactSection';
import { PlaygroundSection } from '../Sections/PlaygroundSection';
import { MoreSection } from '../Sections/MoreSection';
import { FutureSection } from '../Sections/FutureSection';

interface SectionDossierProps {
  selectedHour: number;
  onSelectHour: (hour: number) => void;
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  isRealTime: boolean;
  onToggleRealTime: () => void;
  isCasebackView: boolean;
  onFlipToCaseback: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onSelectMinute: (minute: number) => void;
  isExploded?: boolean;
  onToggleExplode?: () => void;
  isMatrixMode?: boolean;
  onToggleMatrixMode?: () => void;
  isTurbo?: boolean;
  onToggleTurbo?: () => void;
}

export const SectionDossier: React.FC<SectionDossierProps> = ({
  selectedHour,
  onSelectHour,
  isOpen,
  onClose,
  isMobile,
  isRealTime,
  onToggleRealTime,
  isCasebackView,
  onFlipToCaseback,
  isMuted,
  onToggleMute,
  onSelectMinute,
  isExploded,
  onToggleExplode,
  isMatrixMode,
  onToggleMatrixMode,
  isTurbo,
  onToggleTurbo,
}) => {
  if (!isOpen) return null;

  const currentSection = HOUR_SECTIONS[selectedHour] || HOUR_SECTIONS[12];

  const handlePrev = () => {
    let prev = selectedHour - 1;
    if (prev < 1) prev = 12;
    horologyAudio.playMarkerSelect();
    onSelectHour(prev);
  };

  const handleNext = () => {
    let next = selectedHour + 1;
    if (next > 12) next = 1;
    horologyAudio.playMarkerSelect();
    onSelectHour(next);
  };

  // Render appropriate section body
  const renderSectionContent = () => {
    switch (selectedHour) {
      case 12:
        return (
          <HomeSection
            onSelectHour={onSelectHour}
            onSelectMinute={onSelectMinute}
            onFlipToCaseback={onFlipToCaseback}
          />
        );
      case 1:
        return <AboutSection />;
      case 2:
        return <ExperienceSection />;
      case 3:
        return <ProjectsSection />;
      case 4:
        return <SkillsSection />;
      case 5:
        return <ResumeSection />;
      case 6:
        return (
          <PoetByteSection
            onFlipToCaseback={onFlipToCaseback}
            isCasebackView={isCasebackView}
          />
        );
      case 7:
        return <AchievementsSection />;
      case 8:
        return <MoreSection />;
      case 9:
        return <ContactSection />;
      case 10:
        return (
          <PlaygroundSection
            isCasebackView={isCasebackView}
            onFlipToCaseback={onFlipToCaseback}
            isMuted={isMuted}
            onToggleMute={onToggleMute}
            onSelectMinute={onSelectMinute}
            isExploded={isExploded}
            onToggleExplode={onToggleExplode}
            isMatrixMode={isMatrixMode}
            onToggleMatrixMode={onToggleMatrixMode}
            isTurbo={isTurbo}
            onToggleTurbo={onToggleTurbo}
          />
        );
      case 11:
        return <FutureSection />;
      default:
        return <HomeSection onSelectHour={onSelectHour} onSelectMinute={onSelectMinute} onFlipToCaseback={onFlipToCaseback} />;
    }
  };

  return (
    <>
      {/* Mobile Area (tapping top watch area closes drawer) */}
      {isMobile && (
        <div
          onClick={() => {
            horologyAudio.playCrownPull();
            onClose();
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '48vh',
            zIndex: 25,
          }}
        />
      )}

      <aside
        className={`glass-panel custom-scroll dossier-container ${isMobile ? 'dossier-mobile' : 'dossier-desktop'}`}
        style={{
          position: 'fixed',
          zIndex: 30,
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          boxShadow: isMobile
            ? '0 -20px 50px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(56, 189, 248, 0.2)'
            : '-20px 0 50px rgba(0, 0, 0, 0.85), inset 1px 0 0 rgba(56, 189, 248, 0.2)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Mobile Pull Handle Indicator */}
        {isMobile && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              padding: '0.45rem 0 0.15rem 0',
              background: 'rgba(7, 12, 20, 0.96)',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '4px',
                borderRadius: '999px',
                background: 'rgba(148, 163, 184, 0.5)',
              }}
            />
          </div>
        )}

        {/* Dossier Header Control Bar */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'rgba(7, 12, 20, 0.96)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(56, 189, 248, 0.18)',
            flexShrink: 0,
            padding: isMobile ? '0.45rem 0.85rem' : '0.55rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Navigation Stepper (Prev / Next Hour) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <button
              onClick={handlePrev}
              className="steel-button"
              style={{ padding: '0.25rem 0.45rem', fontSize: '0.68rem', minHeight: '30px', minWidth: '30px' }}
              title="Previous Hour Marker"
            >
              <ChevronLeft size={13} />
            </button>
            <div className="glass-pill" style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', textAlign: 'center' }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700 }}>
                {selectedHour.toString().padStart(2, '0')} : 00
              </span>
            </div>
            <button
              onClick={handleNext}
              className="steel-button"
              style={{ padding: '0.25rem 0.45rem', fontSize: '0.68rem', minHeight: '30px', minWidth: '30px' }}
              title="Next Hour Marker"
            >
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Hour Section Title Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className="font-serif" style={{ fontSize: isMobile ? '0.76rem' : '0.84rem', color: '#f8fafc', fontWeight: 700, letterSpacing: '0.04em' }}>
              {currentSection.label}
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              horologyAudio.playCrownPull();
              onClose();
            }}
            className="steel-button"
            style={{ padding: '0.25rem', minWidth: '28px', minHeight: '28px' }}
            title="Minimize Dossier"
          >
            <X size={14} />
          </button>
        </div>

        {/* Dossier Body Content */}
        <div style={{ padding: isMobile ? '0.9rem 0.85rem 3.5rem 0.85rem' : '1.85rem 1.65rem 3.5rem 1.65rem', flex: 1, minHeight: 0 }}>
          {renderSectionContent()}
        </div>

        <style>{`
          .dossier-desktop {
            top: 64px;
            right: 0;
            bottom: 0;
            width: clamp(480px, 42vw, 680px);
            animation: slideInRight 0.35s var(--ease-horological) forwards;
          }

          .dossier-mobile {
            left: 0;
            right: 0;
            bottom: 0;
            max-height: 44vh;
            border-top-left-radius: 14px;
            border-top-right-radius: 14px;
            background: linear-gradient(180deg, rgba(8, 14, 26, 0.98) 0%, rgba(4, 7, 14, 0.99) 100%);
            border-top: 1px solid rgba(56, 189, 248, 0.35);
            animation: slideInBottom 0.3s var(--ease-horological) forwards;
          }

          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes slideInBottom {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}</style>
      </aside>
    </>
  );
};
