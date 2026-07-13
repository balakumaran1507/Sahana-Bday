import React, { useEffect, useState, useMemo } from 'react';

const FLOWERS = [
  '/flower1.png', '/flower2.png', '/flower3.png', '/flower4.png', '/flower5.png',
  '/flower6.png', '/flower7.png', '/flower8.png', '/flower9.png', '/flower10.png',
];

// Generate a very dense array of flowers to completely cover the screen
function generateDenseFlowers(count) {
  return Array.from({ length: count }, (_, i) => {
    const src = FLOWERS[i % FLOWERS.length];
    // Large sizes for maximum coverage
    const size = 150 + Math.random() * 250; 
    // Random positioning across the screen
    const left = -10 + Math.random() * 110; 
    const topOffset = -20 + Math.random() * 120; // Spread vertically across the view
    // Delays for falling IN
    const delayIn = Math.random() * 1.5; 
    // Delays for falling OUT
    const delayOut = Math.random() * 1.0; 
    const rotate = -45 + Math.random() * 90; 
    const zIndex = Math.floor(Math.random() * 100);
    
    return { src, size, left, topOffset, delayIn, delayOut, rotate, zIndex, id: i };
  });
}

const FlowerTransition = ({ onMidpoint, onComplete }) => {
  const [phase, setPhase] = useState('fallingIn'); // 'fallingIn' -> 'covered' -> 'fallingOut' -> 'done'
  const flowers = useMemo(() => generateDenseFlowers(120), []); // 120 large flowers for full coverage

  useEffect(() => {
    // Phase 1: Flowers fall in to cover the screen (takes ~2s total with delays)
    const coverTimer = setTimeout(() => {
      setPhase('covered');
      // Swap the background page under the overlay!
      onMidpoint();
    }, 2000);

    // Phase 2: Start sweeping them away after a brief moment of full coverage
    const sweepTimer = setTimeout(() => {
      setPhase('fallingOut');
    }, 2800);

    // Phase 3: Transition is completely finished
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(coverTimer);
      clearTimeout(sweepTimer);
      clearTimeout(doneTimer);
    };
  }, [onMidpoint, onComplete]);

  if (phase === 'done') return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      {flowers.map(f => {
        // Calculate the Y position based on the phase
        let yPos = '-150vh'; // Start way above screen
        
        if (phase === 'fallingIn' || phase === 'covered') {
          // Move to cover position (randomly spread across the screen height)
          yPos = `${f.topOffset}vh`;
        } else if (phase === 'fallingOut') {
          // Drop way below screen
          yPos = '150vh';
        }

        return (
          <img
            key={f.id}
            src={f.src}
            alt=""
            style={{
              position: 'absolute',
              left: `${f.left}vw`,
              top: yPos,
              width: `${f.size}px`,
              transform: `rotate(${f.rotate}deg)`,
              zIndex: f.zIndex,
              // Springy fast transition for falling in, gravity-style transition for falling out
              transition: phase === 'fallingOut' 
                ? `top 1.2s cubic-bezier(0.55, 0.085, 0.68, 0.53) ${f.delayOut}s` 
                : `top 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${f.delayIn}s`,
              opacity: 1
            }}
          />
        );
      })}
    </div>
  );
};

export default FlowerTransition;
