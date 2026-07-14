import React, { useEffect, useRef, useState } from 'react';

const Hero = ({ onNext }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowCenter, setWindowCenter] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle Mouse Move for Parallax
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

  const handleBeginClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // Wait for the 2.5s paint drop animation to finish before going to next screen
    setTimeout(() => {
      onNext();
    }, 3000);
  };

  // Calculate parallax offsets based on mouse position from center
  const offsetX = (mousePos.x - windowCenter.x) / windowCenter.x;
  const offsetY = (mousePos.y - windowCenter.y) / windowCenter.y;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="page-section fade-in" 
      style={{ 
        minHeight: '100vh', 
        textAlign: 'center', 
        position: 'relative',
        background: 'url(/bg-morning.png) center/cover no-repeat', // Start with morning
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes floatSlow {
          0% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-30px) translateX(20px); }
          66% { transform: translateY(20px) translateX(-20px); }
          100% { transform: translateY(0px) translateX(0px); }
        }

      `}</style>

      {/* High-Performance Noise / Film Grain Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        opacity: isTransitioning ? 0.15 : 0, // Fades in subtly
        transition: 'opacity 1.5s ease-in',
        mixBlendMode: 'overlay',
        zIndex: 98,
        pointerEvents: 'none'
      }} />

      {/* Smooth 3s Reveal Overlay (Night BG) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'url(/bg-night.png) center/cover no-repeat',
        zIndex: 99, 
        pointerEvents: 'none',
        opacity: isTransitioning ? 1 : 0, // Pure 3s fade
        transition: 'opacity 3s ease-in-out'
      }} />

      {/* Elegant Parallax Decors using newly renamed assets */}
      <img 
        src="/First-page-big flower.png" 
        alt="decor" 
        style={{ 
          position: 'absolute', top: '10%', right: '5%', width: '350px', opacity: 0.85, zIndex: 1,
          transform: `translate(${offsetX * 30}px, ${offsetY * 30}px) rotate(${offsetY * -10}deg)`,
          transition: 'transform 0.2s ease-out'
        }} 
      />
      <img 
        src="/First-page-Corner-Flower.png" 
        alt="decor" 
        style={{ 
          position: 'absolute', bottom: '5%', left: '5%', width: '280px', opacity: 0.9, zIndex: 1,
          transform: `translate(${offsetX * -30}px, ${offsetY * 30}px) rotate(${offsetX * 10}deg)`,
          transition: 'transform 0.2s ease-out'
        }} 
      />

      {/* Central Minimalist Card */}
      <div 
        className="fade-in" 
        style={{ 
          maxWidth: '500px', width: '90%', position: 'relative', zIndex: 10,
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '60px 40px',
          transform: `translate(${offsetX * -10}px, ${offsetY * -10}px)`, 
          transition: 'transform 0.3s ease-out',
          margin: '0 auto',
          marginTop: '15vh'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', color: '#ccc' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 400, letterSpacing: '6px', textTransform: 'uppercase' }}>
            Exclusive Event
          </span>
        </div>
        
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '20px', 
          fontFamily: 'var(--font-main)',
          fontWeight: 300,
          color: '#ffffff',
          letterSpacing: '1px'
        }}>
          Happy Birthday,<br/>Beautiful.
        </h1>
        
        <p style={{ 
          margin: '30px 0', 
          fontSize: '1rem', 
          lineHeight: '1.8', 
          color: '#a0a0a0',
          fontFamily: 'var(--font-main)',
          fontWeight: 300
        }}>
          Today is all about celebrating the most amazing person in my world. I've created something magical just for you on your special day.
        </p>

        <button 
          onClick={handleBeginClick}
          style={{
            marginTop: '30px',
            padding: '14px 45px',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-main)',
            fontWeight: 400,
            color: '#fff',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '3px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
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
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '2px',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)'
        }}>
          MADE WITH ENDLESS LOVE FOR YOUR SPECIAL DAY
        </span>
      </div>
    </div>
  );
};

export default Hero;
