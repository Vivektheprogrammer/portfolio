import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  createCasebackRingTexture,
  createCaliberGenevaTexture,
  createRotorTexture,
} from './materials';
import { horologyAudio } from '../../audio/soundEffects';

interface WatchCasebackProps {
  onOpenPoetByte?: () => void;
  onFlipToDial?: () => void;
}

export const WatchCaseback: React.FC<WatchCasebackProps> = ({
  onOpenPoetByte,
  onFlipToDial,
}) => {
  const rotorRef = useRef<THREE.Group>(null);
  const balanceWheelRef = useRef<THREE.Group>(null);
  const escapeWheelRef = useRef<THREE.Group>(null);

  // Procedural high-resolution textures
  const casebackRingMap = useMemo(() => createCasebackRingTexture(), []);
  const genevaStripeMap = useMemo(() => createCaliberGenevaTexture(), []);
  const rotorMap = useMemo(() => createRotorTexture(), []);

  // Smooth realistic physical oscillation for rotor and high-beat balance wheel
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // High-beat Glucydur balance wheel oscillation (4 Hz / 28,800 vph)
    if (balanceWheelRef.current) {
      balanceWheelRef.current.rotation.z = Math.sin(t * 24) * 1.95;
    }

    // Micro escapement tick rotation
    if (escapeWheelRef.current) {
      escapeWheelRef.current.rotation.z = t * 6;
    }

    // Heavy automatic rotor pendulum inertia (natural gravitation sway)
    if (rotorRef.current) {
      rotorRef.current.rotation.z =
        Math.sin(t * 1.4) * 0.95 +
        Math.cos(t * 0.75) * 0.5 +
        Math.sin(t * 3.2) * 0.12;
    }
  });

  // 8 Ruby jewel bearings in gold chatons with blued steel screws
  const jewels = [
    { x: 0.42, y: 0.32, size: 0.04 },
    { x: -0.38, y: 0.45, size: 0.038 },
    { x: -0.52, y: -0.18, size: 0.042 },
    { x: 0.28, y: -0.42, size: 0.038 },
    { x: 0, y: 0, size: 0.052 }, // Center pinion
    { x: 0.48, y: -0.15, size: 0.036 },
    { x: -0.18, y: 0.22, size: 0.038 },
    { x: -0.46, y: -0.38, size: 0.046 }, // Balance staff jewel
  ];

  // 6 Caseback tool removal wrench notches (signature luxury diver/dress watch detail)
  const wrenchNotches = [0, 60, 120, 180, 240, 300];

  return (
    <group
      position={[0, 0, -0.22]}
      rotation={[0, Math.PI, 0]}
      onClick={(e) => {
        e.stopPropagation();
        horologyAudio.playFlip();
        onFlipToDial?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'auto';
      }}
    >
      {/* ========================================================
          1. OUTER 316L POLISHED STEEL CASEBACK BEZEL & ENGRAVED RIM
          ======================================================== */}
      {/* Outer Laser-Engraved Steel Ring */}
      <mesh receiveShadow position={[0, 0, 0.006]}>
        <ringGeometry args={[1.22, 2.22, 64]} />
        <meshStandardMaterial
          map={casebackRingMap}
          metalness={0.97}
          roughness={0.16}
        />
      </mesh>

      {/* Caseback Outer Chamfer Step */}
      <mesh position={[0, 0, 0.014]}>
        <ringGeometry args={[2.2, 2.34, 64]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.99} roughness={0.08} />
      </mesh>

      {/* Caseback Inner Glass Retaining Bezel */}
      <mesh position={[0, 0, 0.016]}>
        <ringGeometry args={[1.18, 1.25, 64]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.98} roughness={0.12} />
      </mesh>

      {/* 6 Machined Caseback Removal Wrench Notches */}
      {wrenchNotches.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = Math.cos(rad) * 2.08;
        const y = Math.sin(rad) * 2.08;
        return (
          <group key={`wrench-notch-${deg}`} position={[x, y, 0.012]} rotation={[0, 0, rad]}>
            <mesh>
              <boxGeometry args={[0.18, 0.07, 0.025]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.4} />
            </mesh>
          </group>
        );
      })}

      {/* 6 Peripheral Polished Screws */}
      {[30, 90, 150, 210, 270, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = Math.cos(rad) * 1.88;
        const y = Math.sin(rad) * 1.88;
        return (
          <group key={`caseback-screw-${deg}`} position={[x, y, 0.01]}>
            <mesh>
              <circleGeometry args={[0.065, 16]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.99} roughness={0.08} />
            </mesh>
            <mesh position={[0, 0, 0.003]}>
              <planeGeometry args={[0.09, 0.016]} />
              <meshBasicMaterial color="#090d16" />
            </mesh>
          </group>
        );
      })}

      {/* ========================================================
          2. INTERNAL CALIBER MOVEMENT (Inside Exhibition Glass)
          ======================================================== */}
      <group position={[0, 0, -0.04]}>
        {/* Main Movement Baseplate with Rhodium / Côtes de Genève Finish */}
        <mesh position={[0, 0, 0]}>
          <circleGeometry args={[1.18, 64]} />
          <meshStandardMaterial
            map={genevaStripeMap}
            metalness={0.95}
            roughness={0.2}
            color="#cbd5e1"
          />
        </mesh>

        {/* Underlying Perlage Circular Graining Lower Plate */}
        <mesh position={[0, 0, 0.005]}>
          <circleGeometry args={[1.14, 64]} />
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.92}
            roughness={0.35}
          />
        </mesh>

        {/* 3D Caliber Bridge 1 (Train Wheel Bridge - Top Half) */}
        <mesh position={[-0.15, 0.28, 0.014]}>
          <ringGeometry args={[0.22, 0.88, 32, 1, 0, Math.PI * 1.15]} />
          <meshStandardMaterial
            map={genevaStripeMap}
            metalness={0.97}
            roughness={0.18}
            color="#f1f5f9"
          />
        </mesh>

        {/* 3D Caliber Bridge 2 (Barrel & Winding Bridge - Right Half) */}
        <mesh position={[0.35, -0.15, 0.014]}>
          <ringGeometry args={[0.18, 0.65, 32, 1, Math.PI * 0.8, Math.PI * 0.9]} />
          <meshStandardMaterial
            map={genevaStripeMap}
            metalness={0.97}
            roughness={0.18}
            color="#e2e8f0"
          />
        </mesh>

        {/* 3D Caliber Bridge Chamfered Polished Edges */}
        <mesh position={[-0.15, 0.28, 0.018]}>
          <ringGeometry args={[0.86, 0.89, 32, 1, 0, Math.PI * 1.15]} />
          <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.05} />
        </mesh>

        {/* --- GOLDEN GEAR TRAIN WHEELS --- */}
        {/* Center Wheel (Gold) */}
        <group position={[0.22, 0.15, 0.016]}>
          <mesh rotation={[0, 0, 0.4]}>
            <ringGeometry args={[0.12, 0.34, 28]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.97} roughness={0.15} />
          </mesh>
          {/* Wheel Spokes */}
          {[0, 72, 144, 216, 288].map((deg) => (
            <mesh key={`center-spoke-${deg}`} rotation={[0, 0, (deg * Math.PI) / 180]}>
              <boxGeometry args={[0.024, 0.32, 0.005]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.97} roughness={0.15} />
            </mesh>
          ))}
        </group>

        {/* Third Wheel (Gold) */}
        <group position={[-0.26, -0.12, 0.016]}>
          <mesh>
            <ringGeometry args={[0.08, 0.28, 24]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.97} roughness={0.15} />
          </mesh>
          {[0, 90, 180, 270].map((deg) => (
            <mesh key={`third-spoke-${deg}`} rotation={[0, 0, (deg * Math.PI) / 180]}>
              <boxGeometry args={[0.02, 0.26, 0.005]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.97} roughness={0.15} />
            </mesh>
          ))}
        </group>

        {/* Fourth / Second Wheel (Gold with Steel Pinion) */}
        <group position={[0, -0.42, 0.016]}>
          <mesh>
            <ringGeometry args={[0.06, 0.22, 20]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.97} roughness={0.15} />
          </mesh>
        </group>

        {/* Escape Wheel (Fast rotating pinion) */}
        <group ref={escapeWheelRef} position={[-0.42, -0.16, 0.018]}>
          <mesh>
            <ringGeometry args={[0.04, 0.16, 16]} />
            <meshStandardMaterial color="#eab308" metalness={0.98} roughness={0.12} />
          </mesh>
        </group>

        {/* --- BALANCE WHEEL & ESCAPEMENT ASSEMBLY AT 7 O'CLOCK --- */}
        <group position={[-0.46, -0.38, 0.02]}>
          {/* Balance Bridge (Balance Cock) in Geneva-striped Rhodium */}
          <mesh position={[0.1, 0.1, 0.008]}>
            <ringGeometry args={[0.08, 0.36, 24, 1, Math.PI * 0.2, Math.PI * 0.8]} />
            <meshStandardMaterial
              map={genevaStripeMap}
              color="#e2e8f0"
              metalness={0.96}
              roughness={0.18}
            />
          </mesh>

          {/* Swan Neck Fine Regulator Spring (Polished Steel) */}
          <mesh position={[0.06, 0.08, 0.015]}>
            <ringGeometry args={[0.12, 0.16, 16, 1, 0, Math.PI * 0.9]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.99} roughness={0.06} />
          </mesh>
          <mesh position={[-0.04, 0.14, 0.016]}>
            <boxGeometry args={[0.02, 0.08, 0.008]} />
            <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Glucydur Oscillating Balance Wheel Rim & Hairspring */}
          <group ref={balanceWheelRef}>
            {/* Gold Balance Wheel Rim */}
            <mesh>
              <ringGeometry args={[0.26, 0.34, 32]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.98} roughness={0.12} />
            </mesh>

            {/* 8 Peripheral Micro-Adjustment Gold Timing Screws on Rim */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const sx = Math.cos(rad) * 0.34;
              const sy = Math.sin(rad) * 0.34;
              return (
                <mesh key={`bal-screw-${deg}`} position={[sx, sy, 0.003]}>
                  <sphereGeometry args={[0.016, 8, 8]} />
                  <meshStandardMaterial color="#f59e0b" metalness={0.99} roughness={0.1} />
                </mesh>
              );
            })}

            {/* 4 Cross Arms */}
            <mesh position={[0, 0, 0.002]}>
              <boxGeometry args={[0.62, 0.035, 0.006]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.98} roughness={0.12} />
            </mesh>
            <mesh position={[0, 0, 0.002]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[0.62, 0.035, 0.006]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.98} roughness={0.12} />
            </mesh>

            {/* Blued Steel Hairspring Spiral Coil */}
            <mesh position={[0, 0, 0.006]}>
              <ringGeometry args={[0.06, 0.22, 24]} />
              <meshStandardMaterial color="#0284c7" metalness={0.92} roughness={0.25} />
            </mesh>
          </group>

          {/* Incabloc Shock Protection Setting with Ruby Core */}
          <group position={[0, 0, 0.024]}>
            {/* Gold Chaton */}
            <mesh>
              <ringGeometry args={[0.04, 0.08, 16]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.98} roughness={0.15} />
            </mesh>
            {/* Ruby Jewel */}
            <mesh position={[0, 0, 0.004]}>
              <sphereGeometry args={[0.042, 16, 16]} />
              <meshStandardMaterial color="#e11d48" metalness={0.25} roughness={0.08} />
            </mesh>
            {/* Lyre-shaped Spring (Incabloc) */}
            <mesh position={[0, 0, 0.009]}>
              <ringGeometry args={[0.065, 0.078, 16, 1, 0, Math.PI * 1.4]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.99} roughness={0.08} />
            </mesh>
          </group>
        </group>

        {/* --- 8 SYNTHETIC RUBY JEWEL BEARINGS IN GOLD CHATONS --- */}
        {jewels.map((j, idx) => (
          <group key={`jewel-${idx}`} position={[j.x, j.y, 0.022]}>
            {/* Polished 18K Gold Chaton Setting */}
            <mesh>
              <ringGeometry args={[j.size, j.size * 1.7, 16]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.97} roughness={0.15} />
            </mesh>
            {/* Pigeon-Blood Synthetic Corundum Ruby */}
            <mesh position={[0, 0, 0.005]}>
              <sphereGeometry args={[j.size * 0.9, 16, 16]} />
              <meshStandardMaterial
                color="#f43f5e"
                metalness={0.25}
                roughness={0.08}
                transparent
                opacity={0.92}
              />
            </mesh>
            {/* Thermal Blued Steel Micro-Screws Securing Chaton */}
            <mesh position={[j.size * 1.5, 0, 0.006]}>
              <circleGeometry args={[0.016, 8]} />
              <meshStandardMaterial color="#0284c7" metalness={0.92} roughness={0.2} />
            </mesh>
            <mesh position={[-j.size * 1.5, 0, 0.006]}>
              <circleGeometry args={[0.016, 8]} />
              <meshStandardMaterial color="#0284c7" metalness={0.92} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* --- SKELETONIZED OSCILLATING WINDING ROTOR (2-TONE TUNGSTEN & 24K GOLD) --- */}
        <group ref={rotorRef} position={[0, 0, 0.038]}>
          {/* Heavy 24K Gold Outer Semi-Circular Inertia Rim with Laser Inscription */}
          <mesh position={[0, 0.44, 0]}>
            <ringGeometry args={[0.3, 1.15, 64, 1, 0, Math.PI]} />
            <meshStandardMaterial
              map={rotorMap}
              metalness={0.98}
              roughness={0.14}
            />
          </mesh>

          {/* Polished Gold Bevel Rim */}
          <mesh position={[0, 0.44, 0.006]}>
            <ringGeometry args={[1.13, 1.16, 64, 1, 0, Math.PI]} />
            <meshStandardMaterial color="#fef08a" metalness={0.99} roughness={0.06} />
          </mesh>

          {/* Inner Skeletonized Rhodium Cutout Bridge with Côtes de Genève */}
          <mesh position={[0, 0.38, 0.008]}>
            <ringGeometry args={[0.45, 0.98, 32, 1, Math.PI * 0.12, Math.PI * 0.76]} />
            <meshStandardMaterial
              map={genevaStripeMap}
              color="#cbd5e1"
              metalness={0.96}
              roughness={0.18}
            />
          </mesh>

          {/* Central Ball Bearing Hub Ring */}
          <mesh position={[0, 0, 0.012]}>
            <cylinderGeometry args={[0.28, 0.28, 0.025, 32]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.1} />
          </mesh>

          {/* 7 Ceramic Ball Bearings in Hub */}
          {[0, 51.4, 102.8, 154.2, 205.6, 257, 308.4].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const bx = Math.cos(rad) * 0.18;
            const by = Math.sin(rad) * 0.18;
            return (
              <mesh key={`ball-${deg}`} position={[bx, by, 0.026]}>
                <sphereGeometry args={[0.022, 12, 12]} />
                <meshStandardMaterial color="#f8fafc" metalness={0.99} roughness={0.05} />
              </mesh>
            );
          })}

          {/* Central Rotor Ruby Jewel Cap */}
          <mesh position={[0, 0, 0.03]}>
            <sphereGeometry args={[0.054, 16, 16]} />
            <meshStandardMaterial color="#e11d48" metalness={0.3} roughness={0.08} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          3. EXHIBITION SAPPHIRE CRYSTAL LENS (AR COATING)
          ======================================================== */}
      <mesh position={[0, 0, 0.024]}>
        <circleGeometry args={[1.22, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.04}
          metalness={0.96}
          transparent
          opacity={0.16}
        />
      </mesh>
    </group>
  );
};
