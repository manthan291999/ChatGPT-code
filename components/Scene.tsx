'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, PointMaterial } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const PROJECT_COLORS: Record<string, string> = {
  'Robotic Kinematics': '#4cc9f0',
  'Autonomous Nav': '#ff7a18',
  'Steel Quality Viz': '#ff3b30',
};

type SceneProps = {
  activeProject: string | null;
  scrollProgress: number;
};

export default function Scene({ activeProject, scrollProgress }: SceneProps) {
  const accent = activeProject ? PROJECT_COLORS[activeProject] : '#4cc9f0';

  return (
    <group>
      <LidarPoints accent={accent} />
      <RobotArm accent={accent} scrollProgress={scrollProgress} />
      <GlassProjects accent={accent} />
      <ParallaxCamera />
    </group>
  );
}

function LidarPoints({ accent }: { accent: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => {
    const count = 5000;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      data[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      data[i * 3 + 1] = radius * Math.cos(phi);
      data[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05;
      pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (materialRef.current) {
      materialRef.current.size = 0.06 + Math.sin(t * 3) * 0.02;
      materialRef.current.opacity = 0.6 + Math.sin(t * 2) * 0.2;
      materialRef.current.color = new THREE.Color(accent);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <PointMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        size={0.08}
        color={accent}
      />
    </points>
  );
}

function RobotArm({ accent, scrollProgress }: { accent: string; scrollProgress: number }) {
  const baseRef = useRef<THREE.Group>(null);
  const jointRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scrollRotation = scrollProgress * Math.PI * 1.2;
    if (baseRef.current) {
      baseRef.current.rotation.y = t * 0.2 + scrollRotation;
    }
    if (jointRef.current) {
      jointRef.current.rotation.z = Math.sin(t * 1.4) * 0.6 + scrollProgress * 0.8;
    }
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(t * 2.2) * 0.4 + scrollProgress * 1.4;
    }
  });

  return (
    <group ref={baseRef} position={[0, -1.5, 0]}>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[1.2, 1.6, 0.5, 24]} />
        <meshStandardMaterial color="#111820" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.4, 0.6, 2.2, 16]} />
        <meshStandardMaterial color="#1b2631" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh ref={jointRef} position={[0, 1.3, 0]}>
        <torusGeometry args={[0.6, 0.1, 16, 48]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.8, 1.8, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1.8, 0.3, 0.3]} />
        <meshStandardMaterial color="#202a36" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh ref={headRef} position={[2.1, 2.1, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 1.4, 20]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[2.1, 2.8, 0]}>
        <boxGeometry args={[0.5, 0.2, 1]} />
        <meshStandardMaterial color="#0f141c" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function GlassProjects({ accent }: { accent: string }) {
  return (
    <group position={[-2, 0.4, -2]}>
      {[0, 1, 2].map((index) => (
        <mesh key={index} position={[index * 1.5, -index * 0.2, index * 0.2]}>
          <planeGeometry args={[1.4, 0.9]} />
          <MeshTransmissionMaterial
            thickness={0.6}
            roughness={0.1}
            chromaticAberration={0.04}
            anisotropy={0.2}
            distortion={0.2}
            distortionScale={0.2}
            temporalDistortion={0.15}
            transmission={1}
            color={accent}
          />
        </mesh>
      ))}
    </group>
  );
}

function ParallaxCamera() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 1.2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.8 + 0.5, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
