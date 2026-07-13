import React, { useEffect, useRef, useState } from 'react';

const FLOWER_URLS = [
  '/flower1.png', '/flower2.png', '/flower3.png', '/flower4.png', '/flower5.png',
  '/flower6.png', '/flower7.png', '/flower8.png', '/flower9.png', '/flower10.png',
];

const FlowerTransition = ({ onMidpoint, onComplete }) => {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('pouring'); // 'pouring' -> 'done'

  useEffect(() => {
    // 1. Timing logic
    const midpointTimer = setTimeout(() => onMidpoint(), 2000); // Screen is densely covered at 2s
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 5500); // Max animation duration

    // 2. Canvas setup
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Handle resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // 3. Preload all images
    const images = [];
    let loadedCount = 0;
    
    FLOWER_URLS.forEach((url, i) => {
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

    // 4. Particle System
    const particles = [];
    const NUM_FLOWERS = 200; // Easily handles 200+ with 0 lag on canvas

    const startAnimation = () => {
      // Generate particles
      for (let i = 0; i < NUM_FLOWERS; i++) {
        const size = 100 + Math.random() * 250; 
        particles.push({
          img: images[Math.floor(Math.random() * images.length)],
          x: -50 + Math.random() * (canvas.width + 100), // Allow spawning off-edges slightly
          y: -size - (Math.random() * 1000), // Negative starting Y creates staggered delay implicitly!
          size: size,
          speedY: 4 + Math.random() * 6, // Fall speed in pixels per frame
          rotation: Math.random() * Math.PI * 2, // Current rotation in radians
          rotationSpeed: (Math.random() - 0.5) * 0.05 // Spin speed
        });
      }

      // We want to force a massive cluster to fall exactly around the 1.5s - 2.5s mark.
      // So we'll artificially group a ton of them at a specific negative Y distance.
      for (let i = 0; i < 100; i++) {
        const size = 200 + Math.random() * 300; // Even bigger for the dense wall
        particles.push({
          img: images[Math.floor(Math.random() * images.length)],
          x: -50 + Math.random() * (canvas.width + 100),
          y: -(canvas.height * 1.5) - (Math.random() * 500), // Grouped to fall in simultaneously
          size: size,
          speedY: 6 + Math.random() * 5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03
        });
      }

      // Render Loop
      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
          // Update physics
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;

          // Only draw if within vertical screen bounds
          if (p.y > -p.size * 2 && p.y < canvas.height + p.size) {
            ctx.save();
            // Translate to center of flower for correct rotation
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
  }, [onMidpoint, onComplete]);

  if (phase === 'done') return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: 'none',
        display: 'block' // removes tiny inline-block bottom margin
      }}
    />
  );
};

export default FlowerTransition;
