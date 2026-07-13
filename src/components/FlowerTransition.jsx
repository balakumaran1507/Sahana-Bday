import React, { useEffect, useState, useMemo } from 'react';

const FLOWERS = [
  '/flower1.png', '/flower2.png', '/flower3.png', '/flower4.png', '/flower5.png',
  '/flower6.png', '/flower7.png', '/flower8.png', '/flower9.png', '/flower10.png',
];

// Generate a continuous stream of flowers
function generateStreamFlowers(count) {
  return Array.from({ length: count }, (_, i) => {
    const src = FLOWERS[i % FLOWERS.length];
    
    // Large sizes for maximum coverage
    const size = 150 + Math.random() * 300; 
    
    // Spread horizontally across the screen, allowing some bleed over the edges
    const left = -20 + Math.random() * 120; 
    
    // Delays range from 0s to 3.0s to create a continuous pour
    // We heavily weight the middle to ensure a solid wall of flowers
    const delay = Math.random() * 3.0; 
    
    // Fall duration: 1.2s to 2.5s (smooth, gravity-like fall)
    const duration = 1.2 + Math.random() * 1.3; 
    
    // Gentle spin
    const rotateStart = Math.random() * 360;
    const rotateEnd = rotateStart + (-90 + Math.random() * 180); 
    
    const zIndex = Math.floor(Math.random() * 100);
    
    return { src, size, left, delay, duration, rotateStart, rotateEnd, zIndex, id: i };
  });
}

const FlowerTransition = ({ onMidpoint, onComplete }) => {
  const [phase, setPhase] = useState('pouring'); // 'pouring' -> 'done'
  
  // 150 huge flowers creates a solid wall of imagery as they overlap
  const flowers = useMemo(() => generateStreamFlowers(150), []); 

  useEffect(() => {
    // The screen is heavily covered with falling flowers around the 2.0s mark.
    // Swap the background page seamlessly!
    const midpointTimer = setTimeout(() => {
      onMidpoint();
    }, 2000);

    // The longest delay is 3.0s + 2.5s duration = 5.5s absolute max.
    // We end the transition at 5.5s.
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 5500);

    return () => {
      clearTimeout(midpointTimer);
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
      {flowers.map(f => (
        <img
          key={f.id}
          src={f.src}
          alt=""
          style={{
            position: 'absolute',
            left: `${f.left}vw`,
            top: '-50vh', // Start way above screen
            width: `${f.size}px`,
            zIndex: f.zIndex,
            // Injecting CSS variables for the keyframes
            '--r-start': `${f.rotateStart}deg`,
            '--r-end': `${f.rotateEnd}deg`,
            animation: `continuousFall ${f.duration}s cubic-bezier(0.35, 0, 0.25, 1) ${f.delay}s forwards`,
            opacity: 0 // Start hidden until animation triggers
          }}
        />
      ))}

      <style>{`
        @keyframes continuousFall {
          0% { 
            transform: translateY(0) rotate(var(--r-start)); 
            opacity: 0; 
          }
          10% { 
            opacity: 1; 
          }
          90% { 
            opacity: 1; 
          }
          100% { 
            transform: translateY(180vh) rotate(var(--r-end)); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  );
};

export default FlowerTransition;
