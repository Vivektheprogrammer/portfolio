import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { WatchCase } from './WatchCase';
import { WatchDial } from './WatchDial';
import { WatchHands } from './WatchHands';
import { WatchBezel } from './WatchBezel';
import { WatchCrown } from './WatchCrown';
import { WatchCrystal } from './WatchCrystal';
import { WatchBracelet } from './WatchBracelet';
import { WatchCaseback } from './WatchCaseback';

interface WatchModelProps {
  selectedHour: number;
  onSelectHour: (hour: number) => void;
  selectedMinute: number | null;
  onSelectMinute: (minute: number) => void;
  isRealTime: boolean;
  onToggleRealTime: () => void;
  isCasebackView: boolean;
  onFlipToCaseback?: () => void;
  onOpenPoetByte?: () => void;
  isExploded?: boolean;
  isMatrixMode?: boolean;
  isTurbo?: boolean;
}

export const WatchModel: React.FC<WatchModelProps> = ({
  selectedHour,
  onSelectHour,
  selectedMinute,
  onSelectMinute,
  isRealTime,
  onToggleRealTime,
  isCasebackView,
  onFlipToCaseback,
  onOpenPoetByte,
  isExploded = false,
  isMatrixMode = false,
  isTurbo = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const crystalGroupRef = useRef<THREE.Group>(null);
  const bezelGroupRef = useRef<THREE.Group>(null);
  const handsGroupRef = useRef<THREE.Group>(null);
  const dialGroupRef = useRef<THREE.Group>(null);
  const casebackGroupRef = useRef<THREE.Group>(null);
  const braceletGroupRef = useRef<THREE.Group>(null);
  const matrixLightRef = useRef<THREE.PointLight>(null);

  const explodeProgress = useRef(0);
  const [showLabels, setShowLabels] = React.useState(false);

  // Store original materials keyed by mesh uuid so we can restore them
  const originalMaterials = useRef<Map<string, THREE.Material | THREE.Material[]>>(new Map());
  const matrixApplied = useRef(false);

  // Shared neon wireframe material for matrix mode
  const matrixMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#00ff88'),
    wireframe: true,
    transparent: true,
    opacity: 0.85,
  }), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // ── Matrix mode material swap ───────────────────────────────────────────
    if (isMatrixMode && !matrixApplied.current) {
      groupRef.current.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          // Skip invisible hit-area meshes (opacity=0 or visible=false)
          if (!mesh.visible) return;
          // Store original
          originalMaterials.current.set(mesh.uuid, mesh.material);
          // Apply a per-mesh matrix material so color can vary slightly
          const mat = matrixMaterial.clone();
          // Slight hue variation per layer z-position for depth
          const hue = 0.38 + (mesh.position.z + 2) * 0.015;
          mat.color.setHSL(hue, 1, 0.6);
          mesh.material = mat;
        }
      });
      matrixApplied.current = true;
    } else if (!isMatrixMode && matrixApplied.current) {
      // Restore all original materials
      groupRef.current.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          const orig = originalMaterials.current.get(mesh.uuid);
          if (orig) mesh.material = orig as THREE.Material;
        }
      });
      originalMaterials.current.clear();
      matrixApplied.current = false;
    }

    // Pulse the matrix neon light
    if (matrixLightRef.current) {
      const t = performance.now() * 0.002;
      matrixLightRef.current.intensity = isMatrixMode
        ? 6.0 + Math.sin(t * 2.7) * 2.5
        : 0;
    }

    // ── Explode logic ───────────────────────────────────────────────────────

    const targetExplode = isExploded ? 1.0 : 0.0;
    explodeProgress.current = THREE.MathUtils.lerp(explodeProgress.current, targetExplode, delta * 3.8);
    const p = explodeProgress.current;

    setShowLabels(p > 0.45);

    // Apply Z-offsets to separate floating mechanical tiers
    if (crystalGroupRef.current) crystalGroupRef.current.position.z = p * 2.1;
    if (bezelGroupRef.current) bezelGroupRef.current.position.z = p * 1.45;
    if (handsGroupRef.current) handsGroupRef.current.position.z = p * 0.88;
    if (dialGroupRef.current) dialGroupRef.current.position.z = p * 0.42;
    if (casebackGroupRef.current) casebackGroupRef.current.position.z = -p * 0.85;
    if (braceletGroupRef.current) braceletGroupRef.current.position.z = -p * 1.5;

    // Target rotation
    let targetRotY = isCasebackView ? Math.PI : 0;
    let targetRotX = 0;
    let targetRotZ = 0;

    if (isExploded) {
      // Dramatic perspective tilt when caliber is deconstructed
      targetRotX = 0.38;
      targetRotY = isCasebackView ? Math.PI + 0.4 : -0.45;
      targetRotZ = 0.08;
    } else if (!isCasebackView) {
      if (selectedHour === 12) {
        targetRotX = 0.05;
        targetRotZ = 0;
      } else {
        const angle = -(selectedHour % 12) * (Math.PI / 6) + Math.PI / 2;
        targetRotX = Math.sin(angle) * 0.08;
        targetRotZ = -Math.cos(angle) * 0.05;
      }
    }

    const lerpSpeed = Math.min(delta * 4.5, 0.2);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, lerpSpeed);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, lerpSpeed);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, lerpSpeed);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Matrix mode pulsing neon light — glows from inside the watch */}
      <pointLight
        ref={matrixLightRef}
        position={[0, 0, 1]}
        color="#00ff88"
        intensity={0}
        distance={12}
        decay={2}
      />

      {/* 1. FRONT SAPPHIRE CRYSTAL LAYER */}

      <group ref={crystalGroupRef}>
        <WatchCrystal />
        {showLabels && (
          <Html position={[2.6, 1.8, 0]} center distanceFactor={10}>
            <div
              className="glass-panel deconstruct-label"
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                background: 'rgba(8, 14, 28, 0.88)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              <div style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 700 }}>L01 · SAPPHIRE CRYSTAL</div>
              <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>AR Double Coating (Edge UI)</div>
            </div>
          </Html>
        )}
      </group>

      {/* 2. CERAMIC BEZEL RING LAYER */}
      <group ref={bezelGroupRef}>
        <WatchBezel activeMinute={selectedMinute} onSelectMinute={onSelectMinute} />
        {showLabels && (
          <Html position={[-2.8, 1.3, 0]} center distanceFactor={10}>
            <div
              className="glass-panel deconstruct-label"
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                background: 'rgba(8, 14, 28, 0.88)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              <div style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 700 }}>L02 · CERAMIC BEZEL</div>
              <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>60-Min Detent (Skills Index)</div>
            </div>
          </Html>
        )}
      </group>

      {/* 3. WATCH HANDS LAYER */}
      <group ref={handsGroupRef}>
        <WatchHands
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          isRealTime={isRealTime}
          isTurbo={isTurbo}
        />
        {showLabels && (
          <Html position={[2.7, 0.5, 0]} center distanceFactor={10}>
            <div
              className="glass-panel deconstruct-label"
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                background: 'rgba(8, 14, 28, 0.88)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              <div style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 700 }}>L03 · SUPER-LUMINOVA HANDS</div>
              <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Sweeping Concurrency Engine</div>
            </div>
          </Html>
        )}
      </group>

      {/* 4. SUNBURST DIAL LAYER */}
      <group ref={dialGroupRef}>
        <WatchDial
          selectedHour={selectedHour}
          onSelectHour={onSelectHour}
          activeMinute={selectedMinute}
        />
        {showLabels && (
          <Html position={[-2.8, -0.4, 0]} center distanceFactor={10}>
            <div
              className="glass-panel deconstruct-label"
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                background: 'rgba(8, 14, 28, 0.88)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              <div style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 700 }}>L04 · GUILLOCHÉ DIAL</div>
              <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>12-Hour Portfolio Navigation</div>
            </div>
          </Html>
        )}
      </group>

      {/* 5. MONOBLOC 316L CASE & CROWN LAYER (CENTER ANCHOR) */}
      <WatchCase />
      <WatchCrown
        isRealTime={isRealTime}
        onToggleRealTime={onToggleRealTime}
        onFlipToCaseback={onFlipToCaseback}
      />
      {showLabels && (
        <Html position={[3.1, -0.6, 0]} center distanceFactor={10}>
          <div
            className="glass-panel deconstruct-label"
            style={{
              padding: '0.3rem 0.65rem',
              borderRadius: '6px',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              background: 'rgba(8, 14, 28, 0.88)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 700 }}>L05 · 316L MONOBLOC CASE</div>
            <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>High-Performance Core Architecture</div>
          </div>
        </Html>
      )}

      {/* 6. CASEBACK & CALIBER MOVEMENT */}
      <group ref={casebackGroupRef}>
        <WatchCaseback
          onOpenPoetByte={onOpenPoetByte}
          onFlipToDial={onFlipToCaseback}
        />
        {showLabels && (
          <Html position={[-2.8, -1.5, 0]} center distanceFactor={10}>
            <div
              className="glass-panel deconstruct-label"
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                background: 'rgba(8, 14, 28, 0.88)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              <div style={{ fontSize: '0.68rem', color: '#fbbf24', fontWeight: 700 }}>L06 · CALIBER 3135 MOVEMENT</div>
              <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Caliber Mechanical Architecture</div>
            </div>
          </Html>
        )}
      </group>

      {/* 7. 24K SKELETON ROTOR & BRACELET */}
      <group ref={braceletGroupRef}>
        <WatchBracelet />
        {showLabels && (
          <Html position={[2.8, -2.0, 0]} center distanceFactor={10}>
            <div
              className="glass-panel deconstruct-label"
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                background: 'rgba(8, 14, 28, 0.88)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              <div style={{ fontSize: '0.68rem', color: '#fbbf24', fontWeight: 700 }}>L07 · 24K ROTOR & JUBILEE</div>
              <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Kinetic Cloud Auto-Scaler</div>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};
