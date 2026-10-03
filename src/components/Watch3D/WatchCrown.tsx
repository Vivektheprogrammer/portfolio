import React, { useMemo, useState } from 'react';
import * as THREE from 'three';
import { horologyAudio } from '../../audio/soundEffects';

interface WatchCrownProps {
  isRealTime?: boolean;
  onToggleRealTime?: () => void;
  onFlipToCaseback?: () => void;
}

export const WatchCrown: React.FC<WatchCrownProps> = ({
  onFlipToCaseback,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Crown fluting ridges
  const flutes = useMemo(() => {
    const items = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 0.22;
      const y = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      items.push({ i, y, z, rotX: angle });
    }
    return items;
  }, []);

  return (
    <group position={[2.52, 0, 0.05]}>
      {/* Crown Guard Top Shoulder */}
      <mesh position={[-0.08, 0.35, 0]} castShadow>
        <boxGeometry args={[0.22, 0.22, 0.28]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.96} roughness={0.25} />
      </mesh>

      {/* Crown Guard Bottom Shoulder */}
      <mesh position={[-0.08, -0.35, 0]} castShadow>
        <boxGeometry args={[0.22, 0.22, 0.28]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.96} roughness={0.25} />
      </mesh>

      {/* Interactive Crown Body */}
      <group
        position={[0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          horologyAudio.playCrownPull();
          onFlipToCaseback?.();
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
      >
        {/* Crown Stem Tube */}
        <mesh position={[-0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.3} />
        </mesh>

        {/* Crown Main Knurled Cylinder */}
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.22, 32]} />
          <meshStandardMaterial
            color={isHovered ? '#38bdf8' : '#e2e8f0'}
            metalness={0.98}
            roughness={0.16}
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
            <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.3} />
          </mesh>
        ))}

        {/* Polished Crown Cap */}
        <mesh position={[0.11, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial
            color={isHovered ? '#38bdf8' : '#f8fafc'}
            metalness={0.99}
            roughness={0.08}
          />
        </mesh>

        {/* Invisible Hit Area */}
        <mesh visible={false}>
          <sphereGeometry args={[0.35, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>
    </group>
  );
};
