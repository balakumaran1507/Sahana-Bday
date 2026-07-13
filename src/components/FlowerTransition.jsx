import React, { useEffect, useState, useMemo } from 'react';

const FLOWERS = [
  '/flower1.png', '/flower2.png', '/flower3.png', '/flower4.png', '/flower5.png',
  '/flower6.png', '/flower7.png', '/flower8.png', '/flower9.png', '/flower10.png',
];

// Deterministically generate flower particle configs
function generateFlowers(count) {
  return Array.from({ length: count }, (_, i) => {
    const src = FLOWERS[i % FLOWERS.length];
    const size = 80 + (i * 37 % 120);          // 80–200px
    const left = (i * 7.3 + 5) % 95;           // 5–100vw spread
    const delay = (i * 0.09) % 1.5;            // 0–1.5s stagger
    const duration = 1.2 + (i * 0.11 % 0.8);   // 1.2–2.0s fall
    const rotate = (i * 23 % 60) - 30;         // -30 to 30 deg
    const swayX = (i % 2 === 0 ? 1 : -1) * (10 + (i * 17 % 30)); // sway left/right
    return { src, size, left, delay, duration, rotate, swayX, id: i };
  });
}

const FLOWER_COUNT = 40;

const FlowerTransition = ({ onComplete }) => {
  const [phase, setPhase] = useState('raining');   // 'raining' | 'sweeping' | 'done'
  const flowers = useMemo(() => generateFlowers(FLOWER_COUNT), []);

  useEffect(() => {
    // After ~2.2s start the sweep-away phase
    const sweepTimer = setTimeout(() => setPhase('sweeping'), 2200);
    // After sweep (~1s) signal parent to show the page
    const doneTimer  = setTimeout(() => { setPhase('done'); onComplete(); }, 3300);
    return () => { clearTimeout(sweepTimer); clearTimeout(doneTimer); };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      overflow: 'hidden',
      pointerEvents: 'none',
      background: phase === 'sweeping' ? 'transparent' : '#f5ece4',
      transition: 'background 0.8s ease',
    }}>
      {flowers.map(f => (
        <img
          key={f.id}
          src={f.src}
          alt=""
          draggable="false"
          onContextMenu={e => e.preventDefault()}
          style={{
            position: 'absolute',
            top: phase === 'sweeping' ? '110vh' : '-180px',
            left: `${f.left}vw`,
            width: `${f.size}px`,
            transform: `rotate(${f.rotate}deg)`,
            pointerEvents: 'none',
            willChange: 'transform, top',
            transition: phase === 'raining'
              ? `top ${f.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${f.delay}s,
                 transform ${f.duration}s ease ${f.delay}s`
              : `top 0.9s cubic-bezier(0.55, 0, 1, 0.45) ${f.id * 0.012}s`,
            ...(phase === 'raining' && {
              // Dynamic values injected inline so each flower has its own sway
              animation: `sway${f.id % 4} ${f.duration}s ease ${f.delay}s`,
            }),
          }}
        />
      ))}

      {/* We use a dynamic keyframe injection for a few sway patterns */}
      <style>{`
        /* 4 sway patterns so flowers don't all move identically */
        @keyframes sway0 { 0% { margin-left: 0; } 25% { margin-left: 15px; } 75% { margin-left: -12px; } 100% { margin-left: 0; } }
        @keyframes sway1 { 0% { margin-left: 0; } 30% { margin-left: -18px; } 70% { margin-left: 10px; } 100% { margin-left: 0; } }
        @keyframes sway2 { 0% { margin-left: 0; } 40% { margin-left: 20px; } 80% { margin-left: -8px; } 100% { margin-left: 0; } }
        @keyframes sway3 { 0% { margin-left: 0; } 20% { margin-left: -14px; } 60% { margin-left: 16px; } 100% { margin-left: 0; } }
      `}</style>
    </div>
  );
};

export default FlowerTransition;
