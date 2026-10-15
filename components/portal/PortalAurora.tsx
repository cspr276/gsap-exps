export default function PortalAurora() {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 right-0 h-[360px] sm:h-[440px] overflow-hidden -z-0 select-none"
      aria-hidden="true"
    >
      {/* Soft Aurora Glow Orbs (matching Screenshot 1 pastel colors) */}
      {/* 1. Mint / Emerald subtle wash on the left */}
      <div
        className="absolute -top-[100px] left-[5%] sm:left-[12%] w-[480px] sm:w-[620px] h-[320px] rounded-full blur-[100px] opacity-70 transform-gpu mix-blend-multiply"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(52, 211, 153, 0.35) 0%, rgba(45, 212, 191, 0.2) 45%, transparent 75%)',
        }}
      />

      {/* 2. Lime / Spring Green glow in the center */}
      <div
        className="absolute -top-[120px] left-[35%] sm:left-[38%] w-[440px] sm:w-[560px] h-[300px] rounded-full blur-[90px] opacity-65 transform-gpu mix-blend-multiply"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(163, 230, 53, 0.38) 0%, rgba(132, 204, 22, 0.18) 50%, transparent 75%)',
        }}
      />

      {/* 3. Soft Sky Blue / Cyan accent */}
      <div
        className="absolute -top-[90px] left-[20%] sm:left-[26%] w-[380px] sm:w-[480px] h-[260px] rounded-full blur-[95px] opacity-60 transform-gpu mix-blend-multiply"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.3) 0%, rgba(14, 165, 233, 0.15) 50%, transparent 75%)',
        }}
      />

      {/* 4. Soft Lavender / Lilac / Violet on the right */}
      <div
        className="absolute -top-[110px] right-[5%] sm:right-[15%] w-[420px] sm:w-[540px] h-[310px] rounded-full blur-[105px] opacity-60 transform-gpu mix-blend-multiply"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(192, 132, 252, 0.28) 0%, rgba(129, 140, 248, 0.16) 45%, transparent 75%)',
        }}
      />

      {/* Smooth bottom fade into pure page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAFAFA]" />
    </div>
  );
}
