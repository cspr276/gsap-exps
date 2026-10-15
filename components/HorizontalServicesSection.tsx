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

const EXTENDED_SERVICES: ExtendedServiceItem[] = [
  {
    num: '01',
    category: 'SERVICE / 01',
    title: 'Requirement Definition & Rubrics',
    desc: 'Define measurable quality goals, task-grounded rubrics, scene boundaries, and delivery standards.',
    image: '/services/ai-agent-evaluation.webp',
    link: '/services/ai-agent-evaluation-benchmarking'
  },
  {
    num: '02',
    category: 'SERVICE / 02',
    title: 'Model Security & Adversarial Testing',
    desc: 'Adversarial red-teaming, prompt injection vectors, jailbreak assessments, and severity-graded triages.',
    image: '/services/reality-02.jpg',
    link: '/services/ai-model-security-testing'
  },
  {
    num: '03',
    category: 'SERVICE / 03',
    title: 'Real-Time Attack Detection',
    desc: 'Sub-millisecond runtime mitigation identifying prompt exploits, data leakage, and automated abuse.',
    image: '/services/reality-03.jpg',
    link: '/services/ai-attack-detection-systems'
  },
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

  // Responsive dimensions
  const [dimensions, setDimensions] = useState({
    radius: 460,
    cardWidth: 310,
    cardHeight: 440
  });

  const updateDimensions = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    if (w < 640) {
      setDimensions({
        radius: 290,
        cardWidth: 235,
        cardHeight: 360
      });
    } else if (w < 1024) {
      setDimensions({
        radius: 370,
        cardWidth: 270,
        cardHeight: 400
      });
    } else {
      setDimensions({
        radius: 460,
        cardWidth: 310,
        cardHeight: 440
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  // Main 3D cylinder rotation animation loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const count = EXTENDED_SERVICES.length;
    const angleStep = 360 / count;

    const frame = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Auto-rotate when not paused or dragging
      // 12.5 degrees per second -> full rotation in ~28.8s
      if (!isPausedRef.current && !isDraggingRef.current) {
        rotationRef.current = (rotationRef.current - 12.5 * dt) % 360;
      }

      const currentRot = rotationRef.current;
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${currentRot}deg)`;
      }

      // Dynamically calculate and apply opacities based on distance from the viewer
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const baseAngle = idx * angleStep;
        const apparentAngle = (baseAngle + currentRot) % 360;
        // Normalize angle to [-180, 180]
        const diff = ((apparentAngle + 180) % 360 + 360) % 360 - 180;
        const cosVal = Math.cos((diff * Math.PI) / 180);

        if (hoveredIndexRef.current === idx) {
          // On hover: full opacity
          card.style.opacity = '1';
          card.style.pointerEvents = 'auto';
        } else if (cosVal > 0) {
          // Front-facing cards: smooth falloff from 1.0 (center) to ~0.35 (sides)
          const norm = Math.pow(cosVal, 1.35);
          const opacity = 0.35 + 0.65 * norm;
          card.style.opacity = opacity.toFixed(3);
          card.style.pointerEvents = cosVal > 0.25 ? 'auto' : 'none';
        } else {
          // Back-facing cards: hidden / culled
          card.style.opacity = '0.05';
          card.style.pointerEvents = 'none';
        }
      });

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Hover handlers: pause rotation & highlight card
  const handleCardEnter = (idx: number) => {
    isPausedRef.current = true;
    hoveredIndexRef.current = idx;
  };

  const handleCardLeave = () => {
    isPausedRef.current = false;
    hoveredIndexRef.current = null;
  };

  // Pointer / Drag handlers for tactile touch & mouse dragging
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
    rotationRef.current = (rotationRef.current + deltaX * 0.22) % 360;
    startXRef.current = e.clientX;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // If the user was dragging, don't trigger the navigation link
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const { radius, cardWidth, cardHeight } = dimensions;
  const angleStep = 360 / EXTENDED_SERVICES.length;

  return (
    <section
      id="capabilities"
      className="relative z-30 lg:-mt-[100vh] w-full min-h-[780px] lg:min-h-screen bg-neutral-950 text-white pt-20 sm:pt-24 pb-16 flex flex-col justify-between items-center overflow-hidden border-t border-neutral-800/80 shadow-[0_-30px_70px_rgba(0,0,0,0.95)]"
    >
      {/* Section Header */}
      <div className="px-6 sm:px-12 lg:px-20 max-w-4xl text-center mx-auto mb-8 sm:mb-12 flex-shrink-0">
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

      {/* 3D Cylindrical Rotating Carousel Stage */}
      <div
        ref={stageRef}
        className="relative w-full overflow-hidden flex items-center justify-center select-none cursor-grab active:cursor-grabbing my-auto"
        style={{
          perspective: '1300px',
          perspectiveOrigin: '50% 50%',
          height: `${cardHeight + 80}px`
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* 3D Rotating Ring */}
        <div
          ref={ringRef}
          className="relative will-change-transform"
          style={{
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
            transformStyle: 'preserve-3d'
          }}
        >
          {EXTENDED_SERVICES.map((item, idx) => {
            const cardAngle = idx * angleStep;

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
                className="group absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden bg-[#0e131f]/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer flex flex-col justify-between transition-[border-color,box-shadow] duration-300 hover:border-white/30"
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  willChange: 'transform, opacity'
                }}
              >
                {/* Top Half: Photo with Large Translucent Number */}
                <div className="relative w-full h-[52%] overflow-hidden bg-neutral-900 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none"
                  />
                  {/* Bottom Image Gradient Overlay into Dark Body */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e131f] via-[#0e131f]/35 to-black/25 pointer-events-none" />

                  {/* Large Light Cyan/White Translucent Number in Top-Left Corner */}
                  <span className="absolute top-3.5 left-4 font-mono text-2xl sm:text-3xl font-light tracking-tight text-cyan-200/85 select-none drop-shadow-md">
                    {item.num}
                  </span>

                  {/* Subtle Minimalist Indicator Dot in Top-Right Corner */}
                  <span className="absolute top-4.5 right-4 w-1.5 h-1.5 rounded-full bg-white/40" />
                </div>

                {/* Bottom Half: Category, Title, Description, and Progress Line */}
                <div className="p-5 sm:p-6 flex flex-col justify-between h-[48%] bg-[#0e131f]">
                  <div>
                    {/* Category Label */}
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-1 block">
                      {item.category}
                    </span>

                    {/* Service Title */}
                    <h3 className="font-display font-bold text-base sm:text-lg text-white tracking-tight leading-snug line-clamp-1 mb-1.5 group-hover:text-cyan-100 transition-colors">
                      {item.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-neutral-300 text-xs sm:text-[13px] leading-relaxed line-clamp-2 font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Subtle Bottom Progress Line Indicator */}
                  <div className="w-full h-[2px] bg-white/10 rounded-full mt-4 overflow-hidden">
                    <div className="w-1/3 h-full bg-white/40 rounded-full" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Subtle Hint */}
      <div className="text-center mt-6 flex-shrink-0">
        <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest">
          Hover to inspect module • Drag or swipe to rotate
        </span>
      </div>
    </section>
  );
}
