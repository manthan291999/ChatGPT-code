'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Scene from './Scene';

type SceneCanvasProps = {
  activeProject: string | null;
  scrollProgress: number;
};

export default function SceneCanvas({ activeProject, scrollProgress }: SceneCanvasProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={['#05070a']} />
        <fog attach="fog" args={['#05070a', 8, 20]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 6, 4]} intensity={1.2} color="#7dd3fc" />
        <directionalLight position={[-6, -2, -4]} intensity={0.6} color="#ff7a18" />
        <Suspense fallback={null}>
          <Scene activeProject={activeProject} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
