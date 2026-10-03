import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float, Loader, Environment } from '@react-three/drei';
import { WatchModel } from './WatchModel';
import { CameraRig } from './CameraRig';

interface WatchSceneProps {
  selectedHour: number;
  onSelectHour: (hour: number) => void;
  selectedMinute: number | null;
  onSelectMinute: (minute: number) => void;
  isRealTime: boolean;
  onToggleRealTime: () => void;
  isCasebackView: boolean;
  onFlipToCaseback?: () => void;
  onDrawerOpen?: boolean;
  isDrawerOpen: boolean;
  isMobile: boolean;
  onOpenPoetByte?: () => void;
  isExploded?: boolean;
  isMatrixMode?: boolean;
  isTurbo?: boolean;
}

export const WatchScene: React.FC<WatchSceneProps> = ({
  selectedHour,
  onSelectHour,
  selectedMinute,
  onSelectMinute,
  isRealTime,
  onToggleRealTime,
  isCasebackView,
  onFlipToCaseback,
  isDrawerOpen,
  isMobile,
  onOpenPoetByte,
  isExploded = false,
  isMatrixMode = false,
  isTurbo = false,
}) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: isMobile ? 50 : 42 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
      >
        {/* Studio HDRI Environment Reflections for photorealistic steel & glass */}
        <Environment preset="city" environmentIntensity={isMatrixMode ? 0.04 : 0.88} />

        {/* Ambient & Studio Lights */}
        <ambientLight intensity={isMatrixMode ? 0.05 : 0.65} color={isMatrixMode ? '#001a0a' : '#0f172a'} />
        
        {/* Key Front Studio Spotlight */}
        <directionalLight
          position={[5, 8, 7]}
          intensity={isMatrixMode ? 0.1 : 2.2}
          color="#ffffff"
          castShadow
        />

        {/* Front Dial Rim Light */}
        <directionalLight
          position={[-6, 4, 3]}
          intensity={isMatrixMode ? 0.05 : 1.4}
          color="#38bdf8"
        />

        {/* Front Fill Light */}
        <pointLight
          position={[0, -5, 4]}
          intensity={isMatrixMode ? 0.05 : 0.8}
          color="#93c5fd"
        />

        {/* REAR STUDIO LIGHTS FOR HYPER-REALISTIC CASEBACK & ROTOR */}
        {/* Key Rear Spotlight (Illuminating Caliber Bridges & Wrench Notches) */}
        <directionalLight
          position={[0, 6, -8]}
          intensity={isMatrixMode ? 0.1 : 2.6}
          color="#ffffff"
        />

        {/* Rear Gold Specular Light (Illuminating 24K Gold Rotor & Balance Wheel) */}
        <pointLight
          position={[4, 3, -6]}
          intensity={isMatrixMode ? 0.05 : 2.0}
          color="#fbbf24"
        />

        {/* Rear Cyan Rim Light (Illuminating AR Sapphire Crystal & Blued Screws) */}
        <pointLight
          position={[-4, -3, -6]}
          intensity={isMatrixMode ? 0.05 : 1.6}
          color="#38bdf8"
        />

        {/* Rear Bottom Fill */}
        <directionalLight
          position={[0, -6, -5]}
          intensity={isMatrixMode ? 0.05 : 1.2}
          color="#cbd5e1"
        />


        <Suspense fallback={null}>
          <group scale={isMobile ? [0.44, 0.44, 0.44] : [0.52, 0.52, 0.52]}>
            <WatchModel
              selectedHour={selectedHour}
              onSelectHour={onSelectHour}
              selectedMinute={selectedMinute}
              onSelectMinute={onSelectMinute}
              isRealTime={isRealTime}
              onToggleRealTime={onToggleRealTime}
              isCasebackView={isCasebackView}
              onFlipToCaseback={onFlipToCaseback}
              onOpenPoetByte={onOpenPoetByte}
              isExploded={isExploded}
              isMatrixMode={isMatrixMode}
              isTurbo={isTurbo}
            />
          </group>

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -2.8, 0]}
            opacity={0.5}
            scale={7}
            blur={2.0}
            far={3.5}
            color="#020617"
          />

          <CameraRig
            selectedHour={selectedHour}
            isCasebackView={isCasebackView}
            isDrawerOpen={isDrawerOpen}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{ background: 'rgba(4, 7, 13, 0.96)' }}
        innerStyles={{ width: '260px', height: '2px', background: '#1e293b' }}
        barStyles={{ background: '#38bdf8' }}
        dataStyles={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '0.8rem',
          color: '#cbd5e1',
          letterSpacing: '0.15em',
          textTransform: 'uppercase'
        }}
        dataInterpolation={(p) => `HOROLOGY ENGINE • INITIALIZING ${p.toFixed(0)}%`}
      />
    </div>
  );
};
