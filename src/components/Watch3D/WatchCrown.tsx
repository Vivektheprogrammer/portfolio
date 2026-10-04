import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { horologyAudio } from '../../audio/soundEffects';
import { WatchFinish, WATCH_FINISHES, WATCH_FINISH_KEYS } from './materials';

interface WatchCrownProps {
  selectedHour: number;
  onSelectHour: (hour: number) => void;
  crownPosition: number; // 0 = Pushed in (Live Time), 1 = 1st Pull (Colour/Material), 2 = 2nd Pull (Profile/Chapter)
  onCycleCrown: () => void;
  finish: WatchFinish;
  onChangeFinish: (finish: WatchFinish) => void;
  onCycleFinish: (step?: number) => void;
}

export const WatchCrown: React.FC<WatchCrownProps> = ({
  selectedHour,
  onSelectHour,
  crownPosition,
  onCycleCrown,
  finish = 'steel',
  onChangeFinish,
  onCycleFinish,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const crownGroupRef = useRef<THREE.Group>(null);
  const crownBodyRef = useRef<THREE.Group>(null);
  const targetX = useRef<number>(2.52);
  const rotationX = useRef<number>(0);
  const dragStartY = useRef<number | null>(null);

  const mat = WATCH_FINISHES[finish] || WATCH_FINISHES.steel;

  // Sync physical 3D sliding position based on 0, 1, or 2 pulls (Realistic tight tolerances)
  useEffect(() => {
    if (crownPosition === 1) {
      targetX.current = 2.54; // 1st pull: subtle 0.06 notch (Finish/Colour setting)
    } else if (crownPosition === 2) {
      targetX.current = 2.60; // 2nd pull: tight 0.12 extension (Time/Profile setting)
    } else {
      targetX.current = 2.48; // Pushed in: flush and nestled snugly against case guards
    }
  }, [crownPosition]);

  // Step metal finish forwards (+1) or backwards (-1)
  const handleStepFinish = useCallback((dir: number) => {
    horologyAudio.playCrownRatchet();
    rotationX.current += dir * 0.6;
    const currentIndex = WATCH_FINISH_KEYS.indexOf(finish);
    const count = WATCH_FINISH_KEYS.length;
    const nextIndex = (currentIndex + dir + count) % count;
    onChangeFinish(WATCH_FINISH_KEYS[nextIndex]);
  }, [finish, onChangeFinish]);

  // Step profile chapter / hour (+1 or -1)
  const handleStepHour = useCallback((dir: number) => {
    horologyAudio.playCrownRatchet();
    rotationX.current += dir * 0.6;
    let next = selectedHour + dir;
    if (next > 12) next = 1;
    if (next < 1) next = 12;
    onSelectHour(next);
  }, [selectedHour, onSelectHour]);

  // Helper to determine if an event target is an interactive UI overlay (drawer, guide, dialog, etc.)
  const isTargetOnUI = (target: EventTarget | null): boolean => {
    if (!target || !(target instanceof Element)) return false;
    return Boolean(
      target.closest(
        '.custom-scroll, .glass-panel, .dossier-container, [role="dialog"], header, nav, button, a, input, textarea, select, aside, .watch-hint-pill'
      )
    );
  };

  // Desktop Mouse Wheel Listener when crown is pulled (Pos 1 or 2)
  useEffect(() => {
    if (crownPosition === 0) return;

    let wheelAccumulator = 0;
    const WHEEL_THRESHOLD = 45;

    const handleWheel = (e: WheelEvent) => {
      // If user is scrolling over guide, reading drawer, or any UI element, do NOT hijack scroll!
      if (isTargetOnUI(e.target)) return;

      e.preventDefault();
      wheelAccumulator += e.deltaY;
      if (Math.abs(wheelAccumulator) >= WHEEL_THRESHOLD) {
        const dir = wheelAccumulator > 0 ? 1 : -1;
        wheelAccumulator = 0;
        if (crownPosition === 1) {
          handleStepFinish(dir);
        } else if (crownPosition === 2) {
          handleStepHour(dir);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [crownPosition, handleStepFinish, handleStepHour]);

  // Mobile / Touch Drag Listener when crown is pulled (Pos 1 or 2)
  useEffect(() => {
    if (crownPosition === 0) return;

    let touchStartY: number | null = null;
    let touchAccumulator = 0;
    const TOUCH_THRESHOLD = 28; // Responsive swipe threshold in pixels

    const handleTouchStart = (e: TouchEvent) => {
      // If touch begins on a drawer, guide modal, or UI element, let native scrolling take place
      if (isTargetOnUI(e.target)) {
        touchStartY = null;
        return;
      }
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
        touchAccumulator = 0;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY === null || e.touches.length !== 1 || isTargetOnUI(e.target)) return;
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - touchStartY;
      touchAccumulator += deltaY;
      touchStartY = currentY;

      if (Math.abs(touchAccumulator) >= TOUCH_THRESHOLD) {
        const dir = touchAccumulator > 0 ? 1 : -1;
        touchAccumulator = 0;
        if (crownPosition === 1) {
          handleStepFinish(dir);
        } else if (crownPosition === 2) {
          handleStepHour(dir);
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartY = null;
      touchAccumulator = 0;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [crownPosition, handleStepFinish, handleStepHour]);

  // Crown fluting ridges
  const flutes = useMemo(() => {
    const items = [];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 0.22;
      const y = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      items.push({ i, y, z, rotX: angle });
    }
    return items;
  }, []);

  useFrame((_, delta) => {
    if (crownGroupRef.current) {
      crownGroupRef.current.position.x = THREE.MathUtils.lerp(
        crownGroupRef.current.position.x,
        targetX.current,
        Math.min(delta * 14, 0.4)
      );
    }
    if (crownBodyRef.current) {
      crownBodyRef.current.rotation.x = THREE.MathUtils.lerp(
        crownBodyRef.current.rotation.x,
        rotationX.current,
        Math.min(delta * 14, 0.4)
      );
    }
  });

  return (
    <group position={[0, 0, 0.05]}>
      {/* Interactive Sliding Crown Assembly */}
      <group
        ref={crownGroupRef}
        position={[2.48, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onCycleCrown();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setIsHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onPointerDown={(e) => {
          if (crownPosition === 0) return;
          e.stopPropagation();
          dragStartY.current = e.clientY;
        }}
        onPointerUp={() => {
          dragStartY.current = null;
        }}
        onPointerMove={(e) => {
          if (crownPosition === 0 || dragStartY.current === null) return;
          const deltaY = e.clientY - dragStartY.current;
          if (Math.abs(deltaY) > 22) {
            const dir = deltaY > 0 ? 1 : -1;
            if (crownPosition === 1) {
              handleStepFinish(dir);
            } else if (crownPosition === 2) {
              handleStepHour(dir);
            }
            dragStartY.current = e.clientY;
          }
        }}
      >
        {/* Exposed Polished Crown Stem Tube (Visible when pulled) */}
        <mesh position={[-0.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.075, 0.075, 0.14, 16]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.99} roughness={0.08} />
        </mesh>

        {/* Rotating Crown Body Group */}
        <group ref={crownBodyRef}>
          {/* Main Knurled Cylinder */}
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.22, 32]} />
            <meshStandardMaterial
              color={isHovered || crownPosition > 0 ? '#38bdf8' : mat.accent}
              metalness={mat.metalness}
              roughness={mat.roughness * 0.7}
            />
          </mesh>

          {/* Fluting Ridges */}
          {flutes.map((f) => (
            <mesh
              key={`flute-${f.i}`}
              position={[0, f.y, f.z]}
              rotation={[f.rotX, 0, 0]}
            >
              <boxGeometry args={[0.2, 0.02, 0.02]} />
              <meshStandardMaterial
                color={crownPosition > 0 ? '#bae6fd' : mat.secondary}
                metalness={mat.metalness}
                roughness={mat.roughness}
              />
            </mesh>
          ))}

          {/* Polished Crown Cap / Emblem */}
          <mesh position={[0.11, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <circleGeometry args={[0.2, 32]} />
            <meshStandardMaterial
              color={isHovered || crownPosition > 0 ? '#38bdf8' : mat.accent}
              metalness={mat.metalness}
              roughness={0.06}
            />
          </mesh>

          {/* Crown Emblem Star Inlay */}
          <mesh position={[0.115, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <ringGeometry args={[0.08, 0.12, 16]} />
            <meshBasicMaterial color={crownPosition > 0 ? '#0284c7' : '#0f172a'} />
          </mesh>
        </group>

        {/* Invisible Enlarged Hit Area for effortless clicking and dragging */}
        <mesh>
          <sphereGeometry args={[0.55, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
};
