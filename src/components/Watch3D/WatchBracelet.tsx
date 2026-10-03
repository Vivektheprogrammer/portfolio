import React, { useMemo } from 'react';
import { createBraceletTexture } from './materials';

export const WatchBracelet: React.FC = () => {
  // Procedural brushed satin texture
  const braceletMap = useMemo(() => createBraceletTexture(), []);

  // Generate 8 progressive top and bottom articulated 3-piece Oyster bracelet links
  const links = useMemo(() => {
    const list = [];
    const count = 8;

    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      // Natural taper from 1.96 down to 1.38 at clasp
      const width = 1.96 - t * 0.58;
      const length = 0.38;
      // Progressive Y offsets starting immediately after the end-link (2.36 + 0.16 + 0.19 = 2.71)
      const yOffset = 2.71 + i * 0.395;
      // Ergonomic anatomically curved wrist profile
      const zOffset = 0.03 - Math.pow(i * 0.52, 1.45) * 0.42;
      const rotX = -(i * 0.13);

      // Top Links (+Y)
      list.push({
        id: `top-link-${i}`,
        index: i,
        y: yOffset,
        z: zOffset,
        width,
        length,
        rotX,
        isClasp: i === count - 1,
      });

      // Bottom Links (-Y)
      list.push({
        id: `bot-link-${i}`,
        index: i,
        y: -yOffset,
        z: zOffset,
        width,
        length,
        rotX: -rotX,
        isClasp: i === count - 1,
      });
    }
    return list;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* ========================================================
          SOLID FITTED END-LINKS (SEL) - Contoured between lugs
          ======================================================== */}
      {/* Top End-Link (y = 2.36) */}
      <group position={[0, 2.36, 0.04]}>
        {/* Outer Brushed Side Blocks */}
        <mesh position={[-0.62, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.68, 0.32, 0.24]} />
          <meshStandardMaterial
            map={braceletMap}
            metalness={0.98}
            roughness={0.28}
            color="#cbd5e1"
          />
        </mesh>
        <mesh position={[0.62, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.68, 0.32, 0.24]} />
          <meshStandardMaterial
            map={braceletMap}
            metalness={0.98}
            roughness={0.28}
            color="#cbd5e1"
          />
        </mesh>
        {/* Elevated Mirror-Polished Center Link */}
        <mesh position={[0, 0, 0.012]} castShadow receiveShadow>
          <boxGeometry args={[0.76, 0.34, 0.26]} />
          <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.05} />
        </mesh>
      </group>

      {/* Bottom End-Link (y = -2.36) */}
      <group position={[0, -2.36, 0.04]}>
        {/* Outer Brushed Side Blocks */}
        <mesh position={[-0.62, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.68, 0.32, 0.24]} />
          <meshStandardMaterial
            map={braceletMap}
            metalness={0.98}
            roughness={0.28}
            color="#cbd5e1"
          />
        </mesh>
        <mesh position={[0.62, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.68, 0.32, 0.24]} />
          <meshStandardMaterial
            map={braceletMap}
            metalness={0.98}
            roughness={0.28}
            color="#cbd5e1"
          />
        </mesh>
        {/* Elevated Mirror-Polished Center Link */}
        <mesh position={[0, 0, 0.012]} castShadow receiveShadow>
          <boxGeometry args={[0.76, 0.34, 0.26]} />
          <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.05} />
        </mesh>
      </group>

      {/* ========================================================
          ARTICULATED 3-PIECE BRACELET LINKS
          ======================================================== */}
      {links.map((link) => {
        const sideWidth = link.width * 0.285;
        const centerWidth = link.width * 0.39;
        const xOffset = (link.width - sideWidth) / 2;

        return (
          <group
            key={link.id}
            position={[0, link.y, link.z]}
            rotation={[link.rotX, 0, 0]}
          >
            {/* Left Brushed Satin Outer Link */}
            <mesh position={[-xOffset, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[sideWidth, link.length * 0.96, 0.18]} />
              <meshStandardMaterial
                map={braceletMap}
                color="#cbd5e1"
                metalness={0.98}
                roughness={0.28}
              />
            </mesh>

            {/* Mirror-Polished Center Link (Elevated with chamfered look) */}
            <mesh position={[0, 0, 0.016]} castShadow receiveShadow>
              <boxGeometry args={[centerWidth, link.length * 0.96, 0.2]} />
              <meshStandardMaterial
                color="#ffffff"
                metalness={0.99}
                roughness={0.05}
              />
            </mesh>

            {/* Right Brushed Satin Outer Link */}
            <mesh position={[xOffset, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[sideWidth, link.length * 0.96, 0.18]} />
              <meshStandardMaterial
                map={braceletMap}
                color="#cbd5e1"
                metalness={0.98}
                roughness={0.28}
              />
            </mesh>

            {/* Micro Bevel Highlights on Center Link */}
            <mesh position={[-centerWidth * 0.5, 0, 0.02]}>
              <boxGeometry args={[0.01, link.length * 0.94, 0.01]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh position={[centerWidth * 0.5, 0, 0.02]}>
              <boxGeometry args={[0.01, link.length * 0.94, 0.01]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Lateral Screw Pin Flanks (Removable Link Hardware) */}
            {link.index > 2 && (
              <>
                <group position={[-link.width * 0.5 - 0.005, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                  <mesh>
                    <circleGeometry args={[0.032, 12]} />
                    <meshStandardMaterial color="#f1f5f9" metalness={0.98} roughness={0.1} />
                  </mesh>
                  {/* Slotted Screw Head Line */}
                  <mesh position={[0, 0, 0.002]}>
                    <planeGeometry args={[0.045, 0.008]} />
                    <meshBasicMaterial color="#090d16" />
                  </mesh>
                </group>

                <group position={[link.width * 0.5 + 0.005, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                  <mesh>
                    <circleGeometry args={[0.032, 12]} />
                    <meshStandardMaterial color="#f1f5f9" metalness={0.98} roughness={0.1} />
                  </mesh>
                </group>
              </>
            )}

            {/* Inter-Link Shadow Gap Line */}
            <mesh position={[0, link.length * 0.48, 0]}>
              <boxGeometry args={[link.width * 0.98, 0.022, 0.16]} />
              <meshBasicMaterial color="#0b1120" />
            </mesh>

            {/* Stainless Steel Deployant Folding Clasp Terminal End-Piece for both ends */}
            {link.isClasp && (
              <group position={[0, link.length * 0.52 + 0.16, 0]}>
                {/* Outer Brushed Stainless Steel Clasp Cap */}
                <mesh castShadow receiveShadow>
                  <boxGeometry args={[link.width * 1.04, 0.34, 0.21]} />
                  <meshStandardMaterial
                    map={braceletMap}
                    color="#cbd5e1"
                    metalness={0.98}
                    roughness={0.24}
                  />
                </mesh>

                {/* Elevated Mirror-Polished Center Clasp Shield */}
                <mesh position={[0, 0, 0.015]} castShadow receiveShadow>
                  <boxGeometry args={[link.width * 0.46, 0.36, 0.23]} />
                  <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.05} />
                </mesh>

                {/* Safety Catch Bar (Beveled Edge) */}
                <mesh position={[0, 0.16, 0.02]}>
                  <boxGeometry args={[link.width * 0.98, 0.06, 0.19]} />
                  <meshStandardMaterial color="#94a3b8" metalness={0.98} roughness={0.2} />
                </mesh>

                {/* Twin Side Release Push-Buttons */}
                <mesh position={[-link.width * 0.52 - 0.02, 0, 0]}>
                  <boxGeometry args={[0.04, 0.18, 0.14]} />
                  <meshStandardMaterial color="#f1f5f9" metalness={0.99} roughness={0.1} />
                </mesh>
                <mesh position={[link.width * 0.52 + 0.02, 0, 0]}>
                  <boxGeometry args={[0.04, 0.18, 0.14]} />
                  <meshStandardMaterial color="#f1f5f9" metalness={0.99} roughness={0.1} />
                </mesh>

                {/* VR Horological Emblem Accent */}
                <mesh position={[0, 0, 0.12]}>
                  <circleGeometry args={[0.055, 16]} />
                  <meshStandardMaterial color="#38bdf8" metalness={0.92} roughness={0.15} />
                </mesh>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
};

