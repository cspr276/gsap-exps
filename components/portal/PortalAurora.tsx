export default function PortalAurora() {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 right-0 h-[170px] sm:h-[210px] overflow-hidden -z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. Full-width continuous spread horizontal aurora ribbon */}
      <div
        className="absolute -top-[40px] -left-[10%] -right-[10%] h-[110px] sm:h-[140px] blur-[55px] sm:blur-[70px] opacity-80 dark:opacity-40 transform-gpu mix-blend-multiply dark:mix-blend-screen"
        style={{
          background:
            'linear-gradient(90deg, rgba(56, 189, 248, 0.28) 0%, rgba(45, 212, 191, 0.34) 18%, rgba(163, 230, 53, 0.38) 45%, rgba(251, 191, 36, 0.22) 65%, rgba(192, 132, 252, 0.32) 85%, rgba(129, 140, 248, 0.22) 100%)',
        }}
      />

      {/* 2. Wide stretched soft accent: Teal / Cyan (spread across left half) */}
      <div
        className="absolute -top-[50px] -left-[5%] w-[55vw] min-w-[500px] h-[100px] sm:h-[130px] rounded-[100%] blur-[65px] sm:blur-[80px] opacity-70 dark:opacity-30 transform-gpu mix-blend-multiply dark:mix-blend-screen"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(45, 212, 191, 0.36) 0%, rgba(52, 211, 153, 0.2) 55%, transparent 80%)',
        }}
      />

      {/* 3. Wide stretched soft accent: Lime / Green (spread across center) */}
      <div
        className="absolute -top-[60px] left-[20%] w-[60vw] min-w-[600px] h-[110px] sm:h-[140px] rounded-[100%] blur-[60px] sm:blur-[75px] opacity-65 dark:opacity-30 transform-gpu mix-blend-multiply dark:mix-blend-screen"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(163, 230, 53, 0.38) 0%, rgba(132, 204, 22, 0.15) 60%, transparent 85%)',
        }}
      />

      {/* 4. Wide stretched soft accent: Lilac / Violet / Sky (spread across right half) */}
      <div
        className="absolute -top-[50px] right-[-5%] w-[55vw] min-w-[500px] h-[100px] sm:h-[130px] rounded-[100%] blur-[70px] sm:blur-[85px] opacity-65 dark:opacity-30 transform-gpu mix-blend-multiply dark:mix-blend-screen"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(192, 132, 252, 0.32) 0%, rgba(129, 140, 248, 0.18) 55%, transparent 80%)',
        }}
      />

      {/* Smooth bottom fade into pure page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAFAFA] dark:to-[#09090b] transition-colors" />
    </div>
  );
}
