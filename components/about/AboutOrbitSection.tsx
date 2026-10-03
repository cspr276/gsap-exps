'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface OrbitItem {
  id: string;
  image: string;
  title: string;
  baseSize: number; // in px on desktop
}

const ORBIT_ITEMS: OrbitItem[] = [
  { id: '1', image: '/services/reality-01.jpg', title: 'Clinical Research', baseSize: 105 },
  { id: '2', image: '/services/hero-datacenter.jpg', title: 'Compute Clusters', baseSize: 85 },
  { id: '3', image: '/cards/card_06.jpg', title: 'Orbital Telemetry', baseSize: 95 },
  { id: '4', image: '/services/reality-02.jpg', title: 'Silicon Hardware', baseSize: 75 },
  { id: '5', image: '/services/ai-agent-evaluation.webp', title: 'Autonomous Systems', baseSize: 110 },
  { id: '6', image: '/cards/card_04.jpg', title: 'Simulation Physics', baseSize: 90 },
  { id: '7', image: '/services/reality-03.jpg', title: 'Robotics & Vision', baseSize: 100 },
  { id: '8', image: '/cards/card_05.jpg', title: 'Cryptographic Security', baseSize: 80 },
  { id: '9', image: '/services/benchmarking-frameworks.webp', title: 'Empirical Metrics', baseSize: 100 },
  { id: '10', image: '/cards/card_07.jpg', title: 'WASM Sandboxes', baseSize: 75 },
  { id: '11', image: '/cards/card_08.jpg', title: 'Optical Sensors', baseSize: 90 },
  { id: '12', image: '/services/hero-bg.webp', title: 'Frontier Neural Models', baseSize: 85 },
];

export default function AboutOrbitSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [dimensions, setDimensions] = useState({ rx: 460, ry: 210 });

  // Update ellipse radii dynamically based on viewport width
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ rx: 175, ry: 135 });
      } else if (width < 1024) {
        setDimensions({ rx: 320, ry: 170 });
      } else {
        setDimensions({ rx: 480, ry: 220 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Single animation object tracking angle rotation
      const rotationState = { angle: 0 };
      const totalItems = ORBIT_ITEMS.length;

      // Update positions of all items along the ellipse
      const updateOrbitPositions = () => {
        const { rx, ry } = dimensions;

        itemsRef.current.forEach((el, index) => {
          if (!el) return;

          // Base angle evenly spaced around circle + current animated angle rotation
          const baseAngle = (index / totalItems) * Math.PI * 2;
          const theta = baseAngle + rotationState.angle;

          // Parametric equation of ellipse
          const x = rx * Math.cos(theta);
          const y = ry * Math.sin(theta);

          // Depth illusion based on vertical position
          // Top (sin < 0) is further back; Bottom (sin > 0) is closer to camera
          const depthProgress = (Math.sin(theta) + 1) / 2; // 0 (far) to 1 (near)
          const scale = 0.72 + depthProgress * 0.48; // 0.72 to 1.2
          const opacity = 0.55 + depthProgress * 0.45; // 0.55 to 1.0
          const zIndex = Math.round(depthProgress * 30);

          gsap.set(el, {
            x,
            y,
            scale,
            opacity,
            zIndex,
            force3D: true,
          });
        });
      };

      // Initial placement
      updateOrbitPositions();

      // 1. Scroll-linked orbital rotation: scrolling rotates the orbit
      const scrollTrigger = ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          // Rotates ~2.5 radians (approx 140 degrees) over the scroll pass
          rotationState.angle = self.progress * (Math.PI * 1.6);
          updateOrbitPositions();
        },
      });

      // 2. Subtle continuous idle drift so the orbit stays gently alive even when stationary
      let reqId: number;
      let lastTime = performance.now();

      const idleTick = (now: number) => {
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        // Slow continuous rotation (0.08 rad/sec)
        rotationState.angle += dt * 0.08;
        updateOrbitPositions();

        reqId = requestAnimationFrame(idleTick);
      };

      reqId = requestAnimationFrame(idleTick);

      return () => {
        scrollTrigger.kill();
        cancelAnimationFrame(reqId);
      };
    },
    { scope: containerRef, dependencies: [dimensions] }
  );

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full min-h-[85vh] sm:min-h-[95vh] flex items-center justify-center bg-[#09090b] overflow-hidden py-24 sm:py-32 border-b border-neutral-900 select-none"
    >
      {/* Ambient background illumination */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_65%)]" />

      {/* Floating Orbital Track (Images rotate in an ellipse around the center) */}
      <div
        ref={orbitContainerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {ORBIT_ITEMS.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-auto group cursor-pointer"
          >
            <div
              style={{
                width: `${Math.round(item.baseSize * (dimensions.rx / 480))}px`,
                height: `${Math.round(item.baseSize * (dimensions.rx / 480))}px`,
              }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-neutral-900 shadow-[0_16px_36px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:scale-110 group-hover:border-white/40 group-hover:shadow-black"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="120px"
                className="object-cover object-center brightness-[0.88] group-hover:brightness-105 transition-[filter] duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* Center Static Content: Heading, Subtitle & Action (Reference Design) */}
      <div className="relative z-30 max-w-2xl mx-auto px-4 text-center pointer-events-auto">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-400 font-semibold block mb-4">
          FRONTIER INTELLIGENCE &bull; ASSURANCE SUITE
        </span>

        <h2 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.08] mb-6">
          Artificial Intelligence
          <br />
          <span className="font-sans font-medium text-white">Real </span>
          <span className="font-serif italic font-normal text-[#c7af93]">Assurance</span>
        </h2>

        <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed mb-8">
          Calibrated evaluation rubrics, red-teaming vectors, and continuous telemetry across real-world enterprise infrastructure.
        </p>

        <a
          href="#coverage-dual-wave"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-xl hover:scale-105 cursor-pointer"
        >
          <span>Explore Coverage</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
