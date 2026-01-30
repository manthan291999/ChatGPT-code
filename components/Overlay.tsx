'use client';

import { motion } from 'framer-motion';

const projects = [
  'Robotic Kinematics',
  'Autonomous Nav',
  'Steel Quality Viz',
];

type OverlayProps = {
  onProjectHover: (project: string | null) => void;
};

export default function Overlay({ onProjectHover }: OverlayProps) {
  return (
    <div className="relative z-10 min-h-screen text-white pointer-events-none">
      <div className="absolute inset-0 noise-layer scanline-layer" aria-hidden />
      <main className="relative px-6 pb-24 pt-16 md:px-16">
        <section className="grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-mono text-sm uppercase tracking-[0.4em] text-neon-blue"
            >
              System Booting
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-syncopate text-4xl uppercase leading-tight md:text-6xl"
            >
              Manthan Mittal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="max-w-lg text-lg text-slate-200"
            >
              Bridging OT &amp; IT // Industrial AI &amp; Robotics
            </motion.p>
          </div>
          <div className="space-y-6 border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="font-syncopate text-lg uppercase">Experience</h2>
            <ul className="space-y-4 text-sm text-slate-200">
              <li>
                <p className="text-neon-orange">KM Steel (AI Lead)</p>
                <p>Reduced downtime 15% using LSTM on motor vibration data.</p>
              </li>
              <li>
                <p className="text-neon-blue">Silver Touch</p>
                <p>Real-time Android Chat App (Firebase).</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-20 grid gap-12 md:grid-cols-[0.6fr_1fr]">
          <div className="space-y-4">
            <h2 className="font-syncopate text-xl uppercase text-neon-blue">
              Projects / Live Glass Deck
            </h2>
            <p className="text-sm text-slate-300">
              Hover a project to rewire the scene.
            </p>
            <ul className="space-y-3 text-lg">
              {projects.map((project) => (
                <li key={project}>
                  <span
                    className="pointer-events-auto cursor-pointer uppercase tracking-[0.2em] text-slate-200 transition hover:text-neon-orange"
                    onMouseEnter={() => onProjectHover(project)}
                    onMouseLeave={() => onProjectHover(null)}
                  >
                    {project}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-end gap-6 border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
            <h3 className="font-syncopate text-xl uppercase">Core Stack</h3>
            <p className="text-sm text-slate-200">
              ROS2, Gazebo, PyTorch, C++, Python, Next.js.
            </p>
            <div className="grid gap-2 text-xs uppercase tracking-[0.3em] text-neon-orange">
              <span className="text-glow">Robotics // LIDAR</span>
              <span>Industrial AI Systems</span>
              <span>Digital Twin Visualization</span>
            </div>
          </div>
        </section>

        <section className="mt-24 grid gap-10 md:grid-cols-[1fr_1fr]">
          <div className="border border-white/10 bg-white/5 p-6">
            <h2 className="font-syncopate text-xl uppercase text-neon-orange">
              Telemetry
            </h2>
            <p className="mt-4 text-sm text-slate-300">
              Continuous sensor fusion for industrial uptime, visualized as a living
              machine. Diagnostics, anomaly detection, and autonomous response loops
              remain in constant motion.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-6 border border-white/10 bg-black/50 p-6">
            <h3 className="font-syncopate text-xl uppercase text-neon-blue">
              Systems Feed
            </h3>
            <div className="space-y-2 text-xs uppercase tracking-[0.3em] text-slate-400">
              <span className="block">Steel Line 04 // Stable</span>
              <span className="block">Vision Node 09 // Active</span>
              <span className="block">ROS2 Cluster // Synced</span>
            </div>
          </div>
        </section>

        <div className="h-[40vh]" />
      </main>
    </div>
  );
}
