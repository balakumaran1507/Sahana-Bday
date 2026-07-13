import React, { useEffect, useRef, useState } from 'react';

const FLOWER_URLS = [
  '/flower1.png', '/flower2.png', '/flower3.png', '/flower4.png', '/flower5.png',
  '/flower6.png', '/flower7.png', '/flower8.png', '/flower9.png', '/flower10.png',
];

const FlowerTransition = ({ onMidpoint, onComplete }) => {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('pouring');
  
  // Use refs to prevent the useEffect from re-triggering when App re-renders
  const onMidpointRef = useRef(onMidpoint);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onMidpointRef.current = onMidpoint;
    onCompleteRef.current = onComplete;
  }, [onMidpoint, onComplete]);

  useEffect(() => {
    // 1. Precise timing based on our curtain physics
    // Slower, taller curtain for a prolonged flow
    const midpointTimer = setTimeout(() => {
      if (onMidpointRef.current) onMidpointRef.current();
    }, 1200); 
    
    const doneTimer = setTimeout(() => {
      setPhase('done');
      if (onCompleteRef.current) onCompleteRef.current();
    }, 6500);

    // 2. Canvas setup
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // 3. Preload images
    const images = [];
    let loadedCount = 0;
    
    FLOWER_URLS.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FLOWER_URLS.length) {
          startAnimation();
        }
      };
      images.push(img);
    });

    // 4. Curtain Particle System
    const particles = [];
    
    const startAnimation = () => {
      const START_Y = -300; 
      // Taller curtain so it flows much longer
      const CURTAIN_HEIGHT = Math.max(3500, canvas.height * 3.5); 
      
      // Increased particle count to maintain extreme density over the taller curtain
      const NUM_FLOWERS = 800; 

      for (let i = 0; i < NUM_FLOWERS; i++) {
        const size = 150 + Math.random() * 300; 
        const yPos = START_Y - (Math.random() * CURTAIN_HEIGHT);
        
        particles.push({
          img: images[Math.floor(Math.random() * images.length)],
          x: -150 + Math.random() * (canvas.width + 300), 
          y: yPos,
          size: size,
          // Slower fall speed (approx 1000px/s) for a majestic graceful flow
          speedY: 16 + Math.random() * 4, 
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.04
        });
      }

      // Render Loop
      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;

          // Only draw if it's currently visible on screen
          if (p.y > -p.size && p.y < canvas.height + p.size) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.drawImage(p.img, -p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
          }
        });

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    };

    return () => {
      clearTimeout(midpointTimer);
      clearTimeout(doneTimer);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []); // Run strictly once to prevent restarts!

  if (phase === 'done') return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: 'none',
        display: 'block'
      }}
    />
  );
};

export default FlowerTransition;
