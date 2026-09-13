'use client';

import React from 'react';
import { Activity, Shield, Sparkles, Cpu, Layers } from 'lucide-react';

interface ProductMediaProps {
  activeServiceIndex?: number;
  videoSrc?: string;
  className?: string;
}

export default function ProductMedia({
  activeServiceIndex = 0,
  videoSrc,
  className = ''
}: ProductMediaProps) {
  /*
   * NOTE FOR USER:
   * To replace the image with a video later, simply pass `videoSrc="/path-to-video.mp4"`
   * or uncomment the video tag below.
   */

  return (
    <div
      className={`relative w-full h-full rounded-3xl overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl shadow-black/90 group select-none ${className}`}
    >
      {/* Dynamic Background: Video or High-res Tech Visual */}
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-neutral-950">
          {/* Cybernetic High-Tech Canvas / Image Graphic */}
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop"
            alt="Product Platform Preview"
            className="w-full h-full object-cover object-center opacity-80 mix-blend-screen scale-105 transition-transform duration-700 group-hover:scale-100"
          />

          {/* Holographic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-transparent to-neutral-950/60" />
        </div>
      )}

      {/* Cyber Grid & HUD Matrix Pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Top Glass Toolbar */}
      <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between border-b border-white/10 bg-neutral-950/40 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[11px] font-mono text-neutral-400">nexus_core_orchestrator.env</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          SYNAPSE ACTIVE
        </div>
      </div>

      {/* Center Simulated UI / Telemetry HUD */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 z-10 pointer-events-none">
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl max-w-md shadow-xl">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono">
            <span>PIPELINE TELEMETRY</span>
            <span className="text-emerald-400 font-semibold">99.98% OPTIMAL</span>
          </div>
          <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 rounded-full w-4/5 animate-pulse" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <div className="text-neutral-500">LATENCY</div>
              <div className="text-white font-medium text-xs mt-0.5">1.8ms</div>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <div className="text-neutral-500">THROUGHPUT</div>
              <div className="text-white font-medium text-xs mt-0.5">48.2k/s</div>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <div className="text-neutral-500">INTEGRITY</div>
              <div className="text-white font-medium text-xs mt-0.5">Zk-Verified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Corner Accents */}
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/20 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/20 rounded-bl-lg pointer-events-none" />
    </div>
  );
}
