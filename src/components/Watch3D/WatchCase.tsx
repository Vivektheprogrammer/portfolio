import React from 'react';

export const WatchCase: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Outer Circular Silver Case Bezel Rim (Hollow Ring from 2.26 to 2.44) */}
      <mesh position={[0, 0, 0.22]} receiveShadow castShadow>
        <ringGeometry args={[2.26, 2.44, 64]} />
        <meshStandardMaterial
          color="#f1f5f9"
          metalness={0.98}
          roughness={0.12}
        />
      </mesh>

      {/* Outer Side Case Wall (HOLLOW Cylinder with openEnded = true) */}
      <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.44, 2.44, 0.42, 64, 1, true]} />
        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.98}
          roughness={0.16}
          side={2}
        />
      </mesh>

      {/* Polished Chamfer Step Ring */}
      <mesh position={[0, 0, 0.23]}>
        <ringGeometry args={[2.42, 2.45, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.99}
          roughness={0.05}
        />
      </mesh>

      {/* Case Back Outer Steel Rim Step (Hollow Ring from 2.18 to 2.44) */}
      <mesh position={[0, 0, -0.19]} receiveShadow castShadow>
        <ringGeometry args={[2.18, 2.44, 64]} />
        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.98}
          roughness={0.16}
          side={2}
        />
      </mesh>

      {/* Top Left Lug */}
      <mesh position={[-1.16, 2.46, 0.05]} rotation={[-0.08, 0, 0.05]} castShadow>
        <boxGeometry args={[0.34, 0.62, 0.32]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.98} roughness={0.15} />
      </mesh>

      {/* Top Right Lug */}
      <mesh position={[1.16, 2.46, 0.05]} rotation={[-0.08, 0, -0.05]} castShadow>
        <boxGeometry args={[0.34, 0.62, 0.32]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.98} roughness={0.15} />
      </mesh>

      {/* Bottom Left Lug */}
      <mesh position={[-1.16, -2.46, 0.05]} rotation={[0.08, 0, -0.05]} castShadow>
        <boxGeometry args={[0.34, 0.62, 0.32]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.98} roughness={0.15} />
      </mesh>

      {/* Bottom Right Lug */}
      <mesh position={[1.16, -2.46, 0.05]} rotation={[0.08, 0, 0.05]} castShadow>
        <boxGeometry args={[0.34, 0.62, 0.32]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.98} roughness={0.15} />
      </mesh>

      {/* Crown Protectors at 3 o'clock */}
      <mesh position={[2.42, 0.28, 0.05]} castShadow>
        <boxGeometry args={[0.18, 0.2, 0.24]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.98} roughness={0.12} />
      </mesh>
      <mesh position={[2.42, -0.28, 0.05]} castShadow>
        <boxGeometry args={[0.18, 0.2, 0.24]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.98} roughness={0.12} />
      </mesh>
    </group>
  );
};
