import React, { useState, useEffect, useCallback } from 'react';
import { Monitor, X } from 'lucide-react';
import { WatchScene } from './components/Watch3D/WatchScene';
import { TopHeader } from './components/HUD/TopHeader';
import { SectionDossier } from './components/HUD/SectionDossier';
import { TechnologyInspector } from './components/HUD/TechnologyInspector';
import { WatchGuide } from './components/HUD/WatchGuide';
import { CaliberTerminal } from './components/HUD/CaliberTerminal';
import { WebGLFallback } from './components/Fallback/WebGLFallback';

import { WatchFinish } from './components/Watch3D/materials';
import { horologyAudio } from './audio/soundEffects';

export const App: React.FC = () => {
  const [selectedHour, setSelectedHour] = useState<number>(12);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
  const [isRealTime, setIsRealTime] = useState<boolean>(true);
  const [isCasebackView, setIsCasebackView] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean>(true);
  const [showDesktopTip, setShowDesktopTip] = useState<boolean>(true);

  // Luxury Watch Crown (0: Pushed in / Live Time, 1: Material Setting, 2: Profile/Time Setting) & Finish State
  const [crownPosition, setCrownPosition] = useState<number>(0);
  const [watchFinish, setWatchFinish] = useState<WatchFinish>('steel');

  // Crazy Interactive Caliber Engine States
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isMatrixMode, setIsMatrixMode] = useState<boolean>(false);
  const [isTurbo, setIsTurbo] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Check viewport and WebGL availability
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
      const isMobileUA = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isNarrow = window.innerWidth < 1024;

      // Mobile devices (even when 'Desktop site' is turned on in browser) use bottom sheet
      // Actual desktops/laptops (wide screen with mouse) use side drawer
      const isMobileMode = isMobileUA || (isTouchDevice && isNarrow) || window.innerWidth < 900;
      setIsMobile(isMobileMode);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Detect WebGL capability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsWebGLSupported(!!gl);
    } catch {
      setIsWebGLSupported(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handler for selecting an hour
  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
    setIsDrawerOpen(true);
    // If selecting hour 6 (PoetByte), toggle caseback view
    if (hour === 6) {
      setIsCasebackView(true);
    } else if (isCasebackView) {
      setIsCasebackView(false);
    }
  }, [isCasebackView]);

  // Handler for 2-stage crown pull / push (0 -> 1 -> 2 -> 0)
  const handleCycleCrown = useCallback(() => {
    setCrownPosition((prev) => {
      const next = (prev + 1) % 3;
      if (next === 1) {
        // 1st pull: Material Finish / Colour mode
        setIsRealTime(false);
        setIsDrawerOpen(false);
        horologyAudio.playCrownPull();
      } else if (next === 2) {
        // 2nd pull: Profile Chapters / Time mode
        setIsRealTime(false);
        horologyAudio.playCrownPull();
      } else {
        // Pushed back in: automatically return to current live time!
        setIsRealTime(true);
        horologyAudio.playCrownPush();
      }
      return next;
    });
  }, []);

  // Handler for cycling watch finish / metal material
  const handleCycleFinish = useCallback(() => {
    const finishes: WatchFinish[] = ['steel', 'gold', 'black', 'titanium'];
    setWatchFinish((prev) => {
      const idx = finishes.indexOf(prev);
      const next = finishes[(idx + 1) % finishes.length];
      horologyAudio.playCrownRatchet();
      return next;
    });
  }, []);

  // Handler for selecting a minute from bezel
  const handleSelectMinute = useCallback((minute: number) => {
    setSelectedMinute(minute);
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'f' || e.key === 'F') {
        setIsCasebackView((prev) => !prev);
      } else if (e.key === 't' || e.key === 'T') {
        setIsRealTime((prev) => !prev);
      } else if (e.key === 'e' || e.key === 'E') {
        setIsExploded((prev) => !prev);
      } else if (e.key === 'c' || e.key === 'C') {
        setIsTerminalOpen((prev) => !prev);
      } else if (e.key === 'p' || e.key === 'P' || e.key === 'w' || e.key === 'W') {
        handleCycleCrown();
      } else if (e.key === 'm' || e.key === 'M') {
        handleCycleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCycleCrown, handleCycleFinish]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#04070d' }}>
      {/* Clean Top Header with Brand on Left and GUIDE on Right */}
      <TopHeader
        onSelectHour={handleSelectHour}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Friendly Mobile Note: Prefer Desktop for Best 3D Horological Experience */}
      {isMobile && showDesktopTip && !isDrawerOpen && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 38,
            width: 'calc(100% - 1.5rem)',
            maxWidth: '430px',
            background: 'linear-gradient(135deg, rgba(8, 20, 38, 0.95) 0%, rgba(4, 10, 20, 0.98) 100%)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '10px',
            padding: '0.55rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.65rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7), 0 0 16px rgba(56, 189, 248, 0.15)',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', minWidth: 0, flex: 1 }}>
            <Monitor size={15} color="#38bdf8" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.74rem', color: '#e2e8f0', lineHeight: 1.4 }}>
              <strong style={{ color: '#38bdf8' }}>Tip:</strong> For the ultimate 3D watchmaking experience, we recommend viewing on a <strong>Desktop / Laptop</strong>.
            </span>
          </div>
          <button
            onClick={() => setShowDesktopTip(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '50%',
              color: '#94a3b8',
              cursor: 'pointer',
              width: '22px',
              height: '22px',
              minWidth: '22px',
              minHeight: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              flexShrink: 0,
            }}
            title="Dismiss tip"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Interactive Caliber Hacker Terminal */}
      <CaliberTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        isExploded={isExploded}
        onToggleExplode={() => setIsExploded((prev) => !prev)}
        isCasebackView={isCasebackView}
        onFlipToCaseback={() => setIsCasebackView((prev) => !prev)}
        isMatrixMode={isMatrixMode}
        onToggleMatrixMode={() => setIsMatrixMode((prev) => !prev)}
        isTurbo={isTurbo}
        onToggleTurbo={() => setIsTurbo((prev) => !prev)}
        onSelectHour={handleSelectHour}
      />

      {/* Interactive Watch Operation Guide */}
      <WatchGuide
        onSelectHour={handleSelectHour}
        onFlipToCaseback={() => setIsCasebackView((prev) => !prev)}
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        isDrawerOpen={isDrawerOpen}
        onCycleFinish={handleCycleFinish}
        onCycleCrown={handleCycleCrown}
        crownPosition={crownPosition}
      />

      {/* Primary 3D Watch Experience or 2D WebGL Fallback */}
      <main style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
        {isWebGLSupported ? (
          <WatchScene
            selectedHour={selectedHour}
            onSelectHour={handleSelectHour}
            selectedMinute={selectedMinute}
            onSelectMinute={handleSelectMinute}
            isRealTime={isRealTime}
            onToggleRealTime={() => setIsRealTime((prev) => !prev)}
            isCasebackView={isCasebackView}
            onDrawerOpen={isDrawerOpen}
            isDrawerOpen={isDrawerOpen}
            isMobile={isMobile}
            onOpenPoetByte={() => window.open('https://poetbyte.vercel.app/', '_blank')}
            isExploded={isExploded}
            isMatrixMode={isMatrixMode}
            isTurbo={isTurbo}
            crownPosition={crownPosition}
            onCycleCrown={handleCycleCrown}
            finish={watchFinish}
            onChangeFinish={setWatchFinish}
            onCycleFinish={handleCycleFinish}
          />
        ) : (
          <WebGLFallback
            selectedHour={selectedHour}
            onSelectHour={handleSelectHour}
            selectedMinute={selectedMinute}
            onSelectMinute={handleSelectMinute}
            isCasebackView={isCasebackView}
            onFlipToCaseback={() => setIsCasebackView((prev) => !prev)}
          />
        )}
      </main>

      {/* Technology Detail Drawer when Bezel Minute is clicked */}
      <TechnologyInspector
        minute={selectedMinute}
        onClose={() => setSelectedMinute(null)}
        onSelectHour={handleSelectHour}
      />

      {/* Master Section Dossier / Content Reader */}
      <SectionDossier
        selectedHour={selectedHour}
        onSelectHour={handleSelectHour}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        isMobile={isMobile}
        isRealTime={isRealTime}
        onToggleRealTime={() => setIsRealTime((prev) => !prev)}
        isCasebackView={isCasebackView}
        onFlipToCaseback={() => setIsCasebackView((prev) => !prev)}
        isMuted={false}
        onToggleMute={() => {}}
        onSelectMinute={handleSelectMinute}
        isExploded={isExploded}
        onToggleExplode={() => setIsExploded((prev) => !prev)}
        isMatrixMode={isMatrixMode}
        onToggleMatrixMode={() => setIsMatrixMode((prev) => !prev)}
        isTurbo={isTurbo}
        onToggleTurbo={() => setIsTurbo((prev) => !prev)}
      />
    </div>
  );
};

export default App;
