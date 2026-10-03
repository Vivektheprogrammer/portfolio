import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface WatchHandsProps {
  selectedHour: number;
  selectedMinute: number | null;
  isRealTime?: boolean;
  isTurbo?: boolean;
}

export const WatchHands: React.FC<WatchHandsProps> = ({ isTurbo }) => {
  const hourHandRef = useRef<THREE.Group>(null);
  const minuteHandRef = useRef<THREE.Group>(null);
  const secondHandRef = useRef<THREE.Group>(null);
  const turboAccumulator = useRef<number>(0);

  useFrame((_, delta) => {
    if (isTurbo) {
      turboAccumulator.current -= delta * 16;
      if (secondHandRef.current) secondHandRef.current.rotation.z = turboAccumulator.current;
      if (minuteHandRef.current) minuteHandRef.current.rotation.z = turboAccumulator.current / 60;
      if (hourHandRef.current) hourHandRef.current.rotation.z = turboAccumulator.current / 720;
      return;
    }

    const now = new Date();
    const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
    const minutes = now.getMinutes() + seconds / 60;
    const hours = (now.getHours() % 12) + minutes / 60;

    // Continuously sweeping and ticking live local real-time clock
    const targetHourAngle = -(hours / 12) * Math.PI * 2;
    const targetMinuteAngle = -(minutes / 60) * Math.PI * 2;
    const targetSecondAngle = -(seconds / 60) * Math.PI * 2;

    const lerpFactor = Math.min(delta * 8, 0.35);

    if (hourHandRef.current) {
      let currentZ = hourHandRef.current.rotation.z;
      const diff = ((targetHourAngle - currentZ + Math.PI) % (Math.PI * 2)) - Math.PI;
      hourHandRef.current.rotation.z = currentZ + diff * lerpFactor;
    }

    if (minuteHandRef.current) {
      let currentZ = minuteHandRef.current.rotation.z;
      const diff = ((targetMinuteAngle - currentZ + Math.PI) % (Math.PI * 2)) - Math.PI;
      minuteHandRef.current.rotation.z = currentZ + diff * lerpFactor;
    }

    // High-beat smooth second hand sweep
    if (secondHandRef.current) {
      secondHandRef.current.rotation.z = targetSecondAngle;
    }
  });

  return (
    <group position={[0, 0, 0.16]}>
      {/* Center Pin / Cannon Pinion Cap */}
      <mesh position={[0, 0, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.05, 32]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Central jewel / inner cap */}
      <mesh position={[0, 0, 0.072]}>
        <sphereGeometry args={[0.032, 16, 16]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* HOUR HAND */}
      <group ref={hourHandRef} position={[0, 0, 0.015]}>
        {/* Main Obelisk Body */}
        <mesh castShadow position={[0, 0.44, 0]}>
          <boxGeometry args={[0.09, 0.88, 0.016]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.2} />
        </mesh>

        {/* Luminous Inlay Channel */}
        <mesh position={[0, 0.48, 0.009]}>
          <boxGeometry args={[0.045, 0.62, 0.005]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Arrow Pointed Tip */}
        <mesh position={[0, 0.92, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.065, 0.065, 0.016]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.2} />
        </mesh>
      </group>

      {/* MINUTE HAND */}
      <group ref={minuteHandRef} position={[0, 0, 0.028]}>
        {/* Main Obelisk Body (Longer & Sleeker) */}
        <mesh castShadow position={[0, 0.65, 0]}>
          <boxGeometry args={[0.075, 1.3, 0.014]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.95} roughness={0.18} />
        </mesh>

        {/* Luminous Inlay Channel */}
        <mesh position={[0, 0.72, 0.008]}>
          <boxGeometry args={[0.038, 0.98, 0.005]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Arrow Pointed Tip */}
        <mesh position={[0, 1.34, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.054, 0.054, 0.014]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.95} roughness={0.18} />
        </mesh>
      </group>

      {/* SECOND HAND (Slender needle with vibrant cyan/silver counterbalance) */}
      <group ref={secondHandRef} position={[0, 0, 0.042]}>
        {/* Needle Shaft */}
        <mesh position={[0, 0.68, 0]}>
          <boxGeometry args={[0.016, 1.45, 0.008]} />
          <meshBasicMaterial color="#e0f2fe" />
        </mesh>

        {/* Needle Tip Arrow */}
        <mesh position={[0, 1.42, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.04, 0.04, 0.009]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Counterbalance Tail */}
        <mesh position={[0, -0.32, 0]}>
          <boxGeometry args={[0.024, 0.38, 0.008]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>

        {/* Circular Counterweight Balance */}
        <mesh position={[0, -0.22, 0]}>
          <circleGeometry args={[0.048, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>
    </group>
  );
};
