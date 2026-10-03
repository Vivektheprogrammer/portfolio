import React, { useMemo, useState } from 'react';
import * as THREE from 'three';
import { createDialTexture, createDialBumpMap, createDateTexture } from './materials';
import { horologyAudio } from '../../audio/soundEffects';

interface WatchDialProps {
  selectedHour: number;
  onSelectHour: (hour: number) => void;
  activeMinute: number | null;
}

export const WatchDial: React.FC<WatchDialProps> = ({
  selectedHour,
  onSelectHour,
}) => {
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  // Generate procedural textures once
  const dialMap = useMemo(() => createDialTexture(), []);
  const dialBump = useMemo(() => createDialBumpMap(), []);

  // Current day of month for the date window
  const currentDay = useMemo(() => {
    return new Date().getDate().toString().padStart(2, '0');
  }, []);

  const dateMap = useMemo(() => createDateTexture(currentDay), [currentDay]);

  // 12 hour positions around the dial (0° at 12 o'clock, clockwise)
  const hourIndices = useMemo(() => {
    const items = [];
    for (let h = 1; h <= 12; h++) {
      // Angle: 12 is at 0 rad (top), 3 is at -PI/2 (right)
      const angle = -(h % 12) * (Math.PI / 6) + Math.PI / 2;
      const radius = 1.38; // Radius of hour indices
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotZ = angle - Math.PI / 2;
      items.push({ hour: h, x, y, rotZ, angle });
    }
    return items;
  }, []);

  // 60 minute ticks around the chapter ring
  const minuteTicks = useMemo(() => {
    const ticks = [];
    for (let m = 0; m < 60; m++) {
      const isHour = m % 5 === 0;
      const angle = -(m / 60) * Math.PI * 2 + Math.PI / 2;
      const rInner = isHour ? 1.62 : 1.66;
      const rOuter = 1.72;
      const x1 = Math.cos(angle) * rInner;
      const y1 = Math.sin(angle) * rInner;
      const x2 = Math.cos(angle) * rOuter;
      const y2 = Math.sin(angle) * rOuter;
      const rotZ = angle - Math.PI / 2;
      ticks.push({ m, isHour, x: (x1 + x2) / 2, y: (y1 + y2) / 2, rotZ, length: rOuter - rInner });
    }
    return ticks;
  }, []);

  return (
    <group position={[0, 0, 0.12]}>
      {/* Main Textured Dial Base with Brand Plate and Horizontal Guilloché */}
      <mesh receiveShadow>
        <circleGeometry args={[1.78, 64]} />
        <meshStandardMaterial
          map={dialMap}
          bumpMap={dialBump}
          bumpScale={0.015}
          roughness={0.28}
          metalness={0.65}
          color="#ffffff"
        />
      </mesh>

      {/* Inner Chapter Ring / Flange Bevel */}
      <mesh position={[0, 0, 0.04]}>
        <ringGeometry args={[1.75, 1.82, 64]} />
        <meshStandardMaterial
          color="#0d233a"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Minute Track Marks */}
      {minuteTicks.map((tick) => (
        <mesh
          key={`tick-${tick.m}`}
          position={[tick.x, tick.y, 0.005]}
          rotation={[0, 0, tick.rotZ]}
        >
          <planeGeometry args={[tick.isHour ? 0.024 : 0.012, tick.length]} />
          <meshBasicMaterial
            color={tick.isHour ? '#f8fafc' : '#bae6fd'}
            transparent={!tick.isHour}
            opacity={tick.isHour ? 1 : 0.6}
          />
        </mesh>
      ))}

      {/* Date Window at 3 o'clock (x ~ 1.05, y = 0) */}
      <group position={[1.05, 0, 0.01]}>
        {/* Outer Silver Bezel Frame */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.38, 0.3]} />
          <meshStandardMaterial
            color="#f1f5f9"
            metalness={0.98}
            roughness={0.12}
          />
        </mesh>
        {/* Sharp High-Contrast Date Numeral Disc */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.32, 0.24]} />
          <meshBasicMaterial map={dateMap} />
        </mesh>
      </group>

      {/* 12 Hour Markers & Interactive Hit Targets */}
      {hourIndices.map(({ hour, x, y, rotZ }) => {
        const isSelected = selectedHour === hour;
        const isHovered = hoveredHour === hour;
        const isTwelve = hour === 12;
        const isThree = hour === 3;

        // At 3 o'clock, we have the date window, so marker is shorter
        const markerLength = isTwelve ? 0.32 : isThree ? 0.16 : 0.28;
        const markerWidth = isTwelve ? 0.08 : 0.065;
        const markerX = isThree ? x + 0.18 : x;

        return (
          <group
            key={`hour-marker-${hour}`}
            position={[markerX, y, 0.02]}
            rotation={[0, 0, rotZ]}
            onClick={(e) => {
              e.stopPropagation();
              horologyAudio.playMarkerSelect();
              onSelectHour(hour);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredHour(hour);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredHour(null);
              document.body.style.cursor = 'auto';
            }}
          >
            {/* 3D Applied Silver Index Base */}
            <mesh castShadow position={[0, 0, 0.015]}>
              <boxGeometry args={[markerWidth, markerLength, 0.03]} />
              <meshStandardMaterial
                color={
                  isSelected
                    ? '#38bdf8'
                    : isHovered
                    ? '#7dd3fc'
                    : '#f1f5f9'
                }
                metalness={0.94}
                roughness={0.12}
              />
            </mesh>

            {/* Inlay Channel */}
            <mesh position={[0, 0, 0.032]}>
              <boxGeometry args={[markerWidth * 0.65, markerLength * 0.7, 0.005]} />
              <meshBasicMaterial
                color={
                  isSelected
                    ? '#38bdf8'
                    : isHovered
                    ? '#a5f3fc'
                    : '#ffffff'
                }
              />
            </mesh>

            {/* If 12 o'clock, add second parallel baton for authentic luxury watch style */}
            {isTwelve && (
              <group position={[0.1, 0, 0]}>
                <mesh castShadow position={[0, 0, 0.015]}>
                  <boxGeometry args={[markerWidth, markerLength, 0.03]} />
                  <meshStandardMaterial
                    color={isSelected ? '#38bdf8' : isHovered ? '#7dd3fc' : '#f1f5f9'}
                    metalness={0.94}
                    roughness={0.12}
                  />
                </mesh>
                <mesh position={[0, 0, 0.032]}>
                  <boxGeometry args={[markerWidth * 0.65, markerLength * 0.7, 0.005]} />
                  <meshBasicMaterial
                    color={isSelected ? '#38bdf8' : '#ffffff'}
                  />
                </mesh>
              </group>
            )}

            {/* Large Invisible Hit Sphere for reliable touch & mouse clicking */}
            <mesh position={[0, 0, 0.02]} visible={false}>
              <sphereGeometry args={[0.26, 8, 8]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
