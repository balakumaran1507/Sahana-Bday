import React, { useEffect, useRef, useState } from 'react';

const Hero = ({ onNext }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowCenter, setWindowCenter] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Handle Mouse Move for Parallax and Canvas Interaction
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Canvas Particle Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles array
    const particles = [];
    const numParticles = 80;
    const colors = ['rgba(255, 182, 193, 0.6)', 'rgba(255, 105, 180, 0.4)', 'rgba(255, 215, 0, 0.5)'];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Global composite for glowing effect
      ctx.globalCompositeOperation = 'screen';

      particles.forEach((p) => {
        // Basic movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse interaction (repel)
        if (containerRef.current) {
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;
          
          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            p.x -= (dx / dist) * force * 5;
            p.y -= (dy / dist) * force * 5;
          }
        }

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        // Add subtle glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw connecting lines if close enough
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 182, 193, ${0.2 - dist/500})`;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]); // Re-bind when mousePos updates to use latest ref

  // Calculate parallax offsets based on mouse position from center
  const offsetX = (mousePos.x - windowCenter.x) / windowCenter.x;
  const offsetY = (mousePos.y - windowCenter.y) / windowCenter.y;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="page-section" 
      style={{ 
        minHeight: '100vh', 
        textAlign: 'center', 
        position: 'relative',
        background: 'radial-gradient(circle at center, #2a0845 0%, #000000 100%)', // Deep premium dark background
        overflow: 'hidden'
      }}
    >
      {/* Interactive WebGL-style Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      />
      
      {/* Parallax Decors */}
      <img 
        src="/pngegg.png" 
        alt="decor" 
        style={{ 
          position: 'absolute', top: '10%', left: '15%', width: '120px', opacity: 0.8, zIndex: 1,
          transform: `translate(${offsetX * -40}px, ${offsetY * -40}px) rotate(${offsetX * 10}deg)`,
          transition: 'transform 0.2s ease-out'
        }} 
      />
      <img 
        src="/pngegg (2).png" 
        alt="decor" 
        style={{ 
          position: 'absolute', top: '20%', right: '10%', width: '150px', opacity: 0.7, zIndex: 1,
          transform: `translate(${offsetX * 50}px, ${offsetY * 50}px) rotate(${offsetY * -15}deg)`,
          transition: 'transform 0.2s ease-out'
        }} 
      />
      <img 
        src="/pngegg (3).png" 
        alt="decor" 
        style={{ 
          position: 'absolute', bottom: '15%', left: '10%', width: '110px', opacity: 0.9, zIndex: 1,
          transform: `translate(${offsetX * -30}px, ${offsetY * 30}px) scale(${1 + Math.abs(offsetX * 0.1)})`,
          transition: 'transform 0.2s ease-out'
        }} 
      />
      <img 
        src="/flower1.png" 
        alt="decor" 
        style={{ 
          position: 'absolute', bottom: '25%', right: '15%', width: '130px', opacity: 0.6, zIndex: 1,
          transform: `translate(${offsetX * 60}px, ${offsetY * -60}px) rotate(${offsetX * 20}deg)`,
          transition: 'transform 0.2s ease-out'
        }} 
      />

      {/* Central Premium Card */}
      <div 
        className="fade-in" 
        style={{ 
          maxWidth: '500px', width: '90%', position: 'relative', zIndex: 10,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '30px',
          padding: '50px 40px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
          transform: `translate(${offsetX * -15}px, ${offsetY * -15}px)`, // Slight counter-parallax for the card itself
          transition: 'transform 0.3s ease-out'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', color: '#ffb6c1' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase' }}>
            Exclusive Event
          </span>
        </div>
        
        <h1 style={{ 
          fontSize: '2.8rem', 
          marginBottom: '15px', 
          fontFamily: 'var(--font-heading)',
          background: 'linear-gradient(45deg, #ff75a0, #ffb6c1, #ffd700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 10px 20px rgba(255, 117, 160, 0.2)'
        }}>
          Happy Birthday,<br/>Beautiful.
        </h1>
        
        <p style={{ 
          margin: '25px 0', 
          fontSize: '1.1rem', 
          lineHeight: '1.7', 
          color: '#dcdcdc',
          fontFamily: 'var(--font-main)'
        }}>
          Today is all about celebrating the most amazing person in my world. I've created something magical just for you on your special day.
        </p>

        <button 
          onClick={onNext}
          style={{
            marginTop: '20px',
            padding: '16px 40px',
            fontSize: '1.2rem',
            fontFamily: 'var(--font-heading)',
            color: '#fff',
            background: 'linear-gradient(90deg, #ff75a0, #ffb6c1)',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 10px 20px rgba(255, 117, 160, 0.4)',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 15px 25px rgba(255, 117, 160, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 117, 160, 0.4)';
          }}
        >
          Begin
        </button>
      </div>

      <div style={{ position: 'absolute', bottom: '30px', zIndex: 10, width: '100%' }}>
        <span style={{ 
          fontSize: '0.85rem', 
          fontFamily: 'var(--font-cute)', 
          fontWeight: 600, 
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '2px'
        }}>
          MADE WITH ENDLESS LOVE FOR YOUR SPECIAL DAY
        </span>
      </div>
    </div>
  );
};

export default Hero;
