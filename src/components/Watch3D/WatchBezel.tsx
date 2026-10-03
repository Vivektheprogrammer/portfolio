import React, { useMemo, useState } from 'react';
import * as THREE from 'three';
import { createBezelTexture } from './materials';
import { BEZEL_MARKERS } from '../../data/portfolioData';
import { horologyAudio } from '../../audio/soundEffects';

interface WatchBezelProps {
  activeMinute: number | null;
  onSelectMinute: (minute: number) => void;
  bezelRotationAngle?: number;
}

export const WatchBezel: React.FC<WatchBezelProps> = ({
  activeMinute,
  onSelectMinute,
  bezelRotationAngle = 0,
}) => {
  const [hoveredMinute, setHoveredMinute] = useState<number | null>(null);

  // High-resolution procedural bezel texture with deep navy finish and crisp white typography
  const bezelMap = useMemo(() => createBezelTexture(), []);

  // Bezel markers click hit targets at 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55
  const markers = useMemo(() => {
    return BEZEL_MARKERS.map((bm) => {
      const angle = -(bm.minute / 60) * Math.PI * 2 + Math.PI / 2;
      const radius = 2.05;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotZ = angle - Math.PI / 2;
      return {
        ...bm,
        x,
        y,
        rotZ,
      };
    });
  }, []);

  // Outer knurled coin-edge teeth for the bezel grip ring
  const coinEdgeTeeth = useMemo(() => {
    const teeth = [];
    const count = 90;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 2.26;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      teeth.push({ i, x, y, rotZ: angle });
    }
    return teeth;
  }, []);

  return (
    <group position={[0, 0, 0.22]} rotation={[0, 0, bezelRotationAngle]}>
      {/* Outer Coin Edge Steel Grip Ring Base */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <ringGeometry args={[1.76, 2.3, 64]} />
        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.96}
          roughness={0.25}
        />
      </mesh>

      {/* 3D Knurled Coin Edge Grips */}
      {coinEdgeTeeth.map((t) => (
        <mesh
          key={`tooth-${t.i}`}
          position={[t.x, t.y, 0.005]}
          rotation={[0, 0, t.rotZ]}
        >
          <boxGeometry args={[0.025, 0.06, 0.03]} />
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.96}
            roughness={0.25}
          />
        </mesh>
      ))}

      {/* Main Bezel Face with Crisp Navy & White Horological Markings */}
      <mesh position={[0, 0, 0.015]} receiveShadow>
        <ringGeometry args={[1.76, 2.27, 64]} />
        <meshStandardMaterial
          map={bezelMap}
          roughness={0.22}
          metalness={0.85}
          color="#ffffff"
        />
      </mesh>

      {/* Interactive Hit Areas for each Bezel Technology Minute position */}
      {markers.map((marker) => {
        const isSelected = activeMinute === marker.minute;
        const isHovered = hoveredMinute === marker.minute;

        return (
          <group
            key={`bezel-hit-${marker.minute}`}
            position={[marker.x, marker.y, 0.025]}
            rotation={[0, 0, marker.rotZ]}
            onClick={(e) => {
              e.stopPropagation();
              horologyAudio.playBezelClick();
              onSelectMinute(marker.minute);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredMinute(marker.minute);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredMinute(null);
              document.body.style.cursor = 'auto';
            }}
          >
            {/* Glowing Accent Indicator when Selected or Hovered */}
            {(isSelected || isHovered) && (
              <mesh position={[0, 0, 0.005]}>
                <circleGeometry args={[0.12, 16]} />
                <meshBasicMaterial
                  color="#38bdf8"
                  transparent
                  opacity={isSelected ? 0.45 : 0.25}
                />
              </mesh>
            )}

            {/* Invisible Hit Area Box */}
            <mesh visible={false}>
              <boxGeometry args={[0.32, 0.26, 0.08]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
