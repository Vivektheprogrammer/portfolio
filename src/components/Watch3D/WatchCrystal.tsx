import React from 'react';

export const WatchCrystal: React.FC = () => {
  return (
    <group position={[0, 0, 0.25]}>
      {/* Subtle Anti-Reflective Sapphire Crystal Sheen Ring */}
      <mesh>
        <ringGeometry args={[1.74, 1.84, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};


