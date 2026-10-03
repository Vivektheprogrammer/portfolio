import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface CameraRigProps {
  selectedHour: number;
  isCasebackView: boolean;
  isDrawerOpen: boolean;
  isMobile: boolean;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  selectedHour,
  isCasebackView,
  isDrawerOpen,
  isMobile,
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const isUserInteracting = useRef(false);
  const isTransitioning = useRef(true);

  // Target camera position calculations on programmatic section change
  const targetPos = useRef(new THREE.Vector3(0, 0, isMobile ? 7.6 : 6.4));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    isTransitioning.current = true;
    if (isMobile) {
      if (isDrawerOpen) {
        // Shift camera down so the full watch is centered in the upper visible area
        targetPos.current.set(0, -1.9, 7.6);
        targetLookAt.current.set(0, -1.9, 0);
      } else {
        targetPos.current.set(0, 0, 7.6);
        targetLookAt.current.set(0, 0, 0);
      }
    } else {
      if (isDrawerOpen) {
        targetPos.current.set(1.5, 0, 6.6);
        targetLookAt.current.set(1.5, 0, 0);
      } else {
        targetPos.current.set(0, 0, 6.4);
        targetLookAt.current.set(0, 0, 0);
      }
    }
  }, [selectedHour, isDrawerOpen, isMobile, isCasebackView]);

  useFrame((_, delta) => {
    // Only reposition when a programmatic chapter/view change is active
    if (isTransitioning.current && !isUserInteracting.current && controlsRef.current) {
      const lerpSpeed = Math.min(delta * 2.8, 0.12);
      camera.position.lerp(targetPos.current, lerpSpeed);
      controlsRef.current.target.lerp(targetLookAt.current, lerpSpeed);
      controlsRef.current.update();

      // Once arrived at target, release control so user has total orbit freedom
      if (
        camera.position.distanceTo(targetPos.current) < 0.06 &&
        controlsRef.current.target.distanceTo(targetLookAt.current) < 0.06
      ) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={3.0}
      maxDistance={12.0}
      minPolarAngle={0.05}
      maxPolarAngle={Math.PI - 0.05}
      dampingFactor={0.07}
      enableDamping={true}
      rotateSpeed={isMobile ? 1.2 : 0.9}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      }}
      onStart={() => {
        isUserInteracting.current = true;
        isTransitioning.current = false; // Give full freedom to user's drag
      }}
      onEnd={() => {
        isUserInteracting.current = false;
      }}
    />
  );
};

