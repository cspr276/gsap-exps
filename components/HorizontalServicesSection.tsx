'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

interface ExtendedServiceItem {
  num: string;
  category: string;
  title: string;
  desc: string;
  image: string;
  link: string;
}

// Only remaining services (leaving 01, 02, 03 which already appear in the preceding section)
const REMAINING_SERVICES: ExtendedServiceItem[] = [
  {
    num: '04',
    category: 'SERVICE / 04',
    title: 'Data Annotation & Gold Standards',
    desc: 'High-quality domain-specific data labeling, supervised fine-tuning, and calibrated human ranking.',
    image: '/cards/card_04.jpg',
    link: '/services/data-annotation'
  },
  {
    num: '05',
    category: 'SERVICE / 05',
    title: 'Enterprise AI Agents & Systems',
    desc: 'Autonomous agent clusters, production workflows, and deterministic reliability architectures.',
    image: '/cards/card_05.jpg',
    link: '/services/enterprise-ai-agents'
  },
  {
    num: '06',
    category: 'SERVICE / 06',
    title: 'Agent Readiness & Risk Assessment',
    desc: 'Pre-deployment audits, failure taxonomies, and architectural risk mitigation strategies.',
    image: '/cards/card_06.jpg',
    link: '/services/agent-readiness-risk-assessment'
  },
  {
    num: '07',
    category: 'SERVICE / 07',
    title: 'Continuous Monitoring & Regression',
    desc: 'Live canary evaluations, automated regression suites, and 24/7 delta tracking post-launch.',
    image: '/cards/card_07.jpg',
    link: '/services/continuous-monitoring-regression-testing'
  },
  {
    num: '08',
    category: 'SERVICE / 08',
    title: 'Supervised Fine-Tuning & Alignment',
    desc: 'Domain-calibrated model improvement loops bridging foundation models to production performance.',
    image: '/cards/card_08.jpg',
    link: '/services/sft-rlhf'
  }
];

export default function HorizontalServicesSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const rotationRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const hoveredIndexRef = useRef<number | null>(null);

  // Dragging support
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);

  // Oval geometry & compact card dimensions
  const [dimensions, setDimensions] = useState({
    radiusX: 460,
    radiusZ: 160,
    cardWidth: 250,
    cardHeight: 350
  });

  const updateDimensions = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    if (w < 640) {
      setDimensions({
        radiusX: Math.min(Math.max(w * 0.42, 190), 250),
        radiusZ: 100,
        cardWidth: 195,
        cardHeight: 290
      });
    } else if (w < 1024) {
      setDimensions({
        radiusX: Math.min(w * 0.4, 380),
        radiusZ: 130,
        cardWidth: 225,
        cardHeight: 320
      });
    } else {
      setDimensions({
        radiusX: Math.min(w * 0.36, 480),
        radiusZ: 160,
        cardWidth: 250,
        cardHeight: 350
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  // Main 3D oval rotation animation loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const count = REMAINING_SERVICES.length;
    const angleStepRad = (2 * Math.PI) / count;

    const frame = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Reversed rotation direction: angle increases (+14 deg/s in radians)
      const speedRad = (14 * Math.PI) / 180;
      if (!isPausedRef.current && !isDraggingRef.current) {
        rotationRef.current = (rotationRef.current + speedRad * dt) % (2 * Math.PI);
      }

      const currentRot = rotationRef.current;
      const { radiusX, radiusZ } = dimensions;

      // Position each card along the 3D oval trajectory
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const cardAngle = currentRot + idx * angleStepRad;

        // Parametric Oval: wide X horizontal spread, shallow Z depth
        const x = Math.sin(cardAngle) * radiusX;
        const z = Math.cos(cardAngle) * radiusZ;

        // Subtle inward tilt facing toward the center/camera (-18 deg to +18 deg)
        const tiltY = -(x / radiusX) * 18;

        // Normalized Z depth: 1 at front (z = +radiusZ), 0 at back (z = -radiusZ)
        const normZ = Math.max(0, Math.min(1, (z + radiusZ) / (2 * radiusZ)));

        const isHovered = hoveredIndexRef.current === idx;

        // Depth-of-field blur & opacity calculation
        // Back cards have blur (~3.5px) and reduced opacity (~0.38)
        // Front cards have 0px blur and full opacity (1.0)
        let blurPx = 0;
        let opacity = 1;
        let scale = 0.85 + 0.15 * normZ;

        if (isHovered) {
          blurPx = 0;
          opacity = 1;
          scale = 1.03;
        } else {
          // As card goes to the back (normZ < 0.6), blur increases smoothly
          if (normZ < 0.6) {
            blurPx = ((0.6 - normZ) / 0.6) * 3.5;
          } else {
            blurPx = 0;
          }
          opacity = 0.38 + 0.62 * normZ;
        }

        // Apply 3D oval transform
        card.style.transform = `translate3d(${x}px, 0px, ${z}px) rotateY(${tiltY}deg) scale(${scale})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.filter = blurPx > 0.1 ? `blur(${blurPx.toFixed(1)}px)` : 'none';
        card.style.zIndex = isHovered ? '100' : String(Math.round(normZ * 40 + 10));
        card.style.pointerEvents = isHovered || normZ > 0.15 ? 'auto' : 'none';
      });

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [dimensions]);

  // Hover handlers: pause rotation & focus card
  const handleCardEnter = (idx: number) => {
    isPausedRef.current = true;
    hoveredIndexRef.current = idx;
  };

  const handleCardLeave = () => {
    isPausedRef.current = false;
    hoveredIndexRef.current = null;
  };

  // Drag handlers for tactile touch & mouse control
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    hasMovedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    if (Math.abs(deltaX) > 4) {
      hasMovedRef.current = true;
    }
    // Adjust rotation angle based on drag
    rotationRef.current = (rotationRef.current - deltaX * 0.005) % (2 * Math.PI);
    startXRef.current = e.clientX;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const { cardWidth, cardHeight } = dimensions;

  return (
    <section
      id="capabilities"
      className="relative z-30 lg:-mt-[100vh] w-full min-h-[640px] lg:min-h-screen bg-neutral-950 text-white pt-16 sm:pt-20 pb-16 flex flex-col justify-between items-center overflow-hidden border-t border-neutral-800/80 shadow-[0_-30px_70px_rgba(0,0,0,0.95)]"
    >
      {/* Section Header */}
      <div className="px-6 sm:px-12 lg:px-20 max-w-4xl text-center mx-auto mb-6 sm:mb-10 flex-shrink-0">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2 block">
          EXTENDED SERVICES
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white mb-3 leading-tight">
          ADDITIONAL PLATFORM MODULES
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm font-normal max-w-xl mx-auto">
          Explore our complete architectural capabilities across autonomous intelligence, model safety, and high-assurance evaluation.
        </p>
      </div>

      {/* 3D Oval Carousel Stage */}
      <div
        ref={stageRef}
        className="relative w-full overflow-hidden flex items-center justify-center select-none cursor-grab active:cursor-grabbing my-auto"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          height: `${cardHeight + 70}px`
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* 3D Oval Orbit Container */}
        <div
          ref={ringRef}
          className="relative will-change-transform flex items-center justify-center"
          style={{
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
            transformStyle: 'preserve-3d'
          }}
        >
          {REMAINING_SERVICES.map((item, idx) => {
            return (
              <Link
                key={item.num}
                href={item.link}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                onClick={handleCardClick}
                onMouseEnter={() => handleCardEnter(idx)}
                onMouseLeave={handleCardLeave}
                className="group absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden bg-black border border-neutral-800/80 flex flex-col justify-between shadow-2xl hover:border-neutral-500 transition-[border-color,box-shadow] duration-300"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity, filter'
                }}
              >
                {/* Top Half: Photo with Large Translucent Number */}
                <div className="relative w-full h-[52%] overflow-hidden bg-black flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none"
                  />
                  {/* Subtle Gradient into Pure Black Body */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                  {/* Large Translucent Number in Top-Left Corner */}
                  <span className="absolute top-3 left-3.5 font-mono text-xl sm:text-2xl font-light tracking-tight text-white/80 select-none drop-shadow-md">
                    {item.num}
                  </span>

                  {/* Minimalist Indicator Dot in Top-Right Corner */}
                  <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                </div>

                {/* Bottom Half: Category, Title, and Description (NO bottom progress line) */}
                <div className="p-4 sm:p-5 flex flex-col justify-between h-[48%] bg-black">
                  <div>
                    {/* Category Label */}
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-1 block">
                      {item.category}
                    </span>

                    {/* Service Title */}
                    <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-tight leading-snug line-clamp-1 mb-1.5 group-hover:text-neutral-200 transition-colors">
                      {item.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-neutral-300 text-[11px] sm:text-xs leading-relaxed line-clamp-2 font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
