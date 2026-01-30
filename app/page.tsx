'use client';

import { useEffect, useState } from 'react';
import LenisProvider from '@/components/LenisProvider';
import SceneCanvas from '@/components/SceneCanvas';
import Overlay from '@/components/Overlay';

export default function Home() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <LenisProvider />
      <SceneCanvas activeProject={activeProject} scrollProgress={scrollProgress} />
      <Overlay onProjectHover={setActiveProject} />
    </div>
  );
}
