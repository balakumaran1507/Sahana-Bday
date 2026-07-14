import React, { useEffect, useRef, useState } from 'react';

const Hero = ({ onNext }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowCenter, setWindowCenter] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    setTimeout(() => {
      onNext();
    }, 3000);
  };

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
        background: 'url(/bg-morning.png) center/cover no-repeat', // Base morning sky
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.2); }
          50% { box-shadow: 0 0 80px rgba(168, 85, 247, 0.5); }
        }
      `}</style>

      {/* High-Performance Noise Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        opacity: isTransitioning ? 0.15 : 0.05, 
        transition: 'opacity 1.5s ease-in',
        mixBlendMode: 'overlay',
        zIndex: 98,
        pointerEvents: 'none'
      }} />

      {/* Transition Overlay (Night BG) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'url(/bg-night.png) center/cover no-repeat',
        zIndex: 99, 
        pointerEvents: 'none',
        opacity: isTransitioning ? 1 : 0,
        transition: 'opacity 3s ease-in-out'
      }} />

      {/* The BIG Purple Flower Decors */}
      <img 
        src="/Purple-Flower.png" 
        alt="Big Purple Flower Left" 
        style={{ 
          position: 'absolute', bottom: '-15%', left: '-10%', width: '600px', opacity: 0.9, zIndex: 1,
          transform: `translate(${offsetX * -40}px, ${offsetY * 40}px) rotate(${offsetX * 5}deg)`,
          transition: 'transform 0.2s ease-out',
          pointerEvents: 'none',
          filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))'
        }} 
      />
      <img 
        src="/Purple-Flower.png" 
        alt="Big Purple Flower Right" 
        style={{ 
          position: 'absolute', top: '-15%', right: '-10%', width: '500px', opacity: 0.8, zIndex: 1,
          transform: `translate(${offsetX * 40}px, ${offsetY * -40}px) rotate(${offsetY * -15}deg)`,
          transition: 'transform 0.2s ease-out',
          pointerEvents: 'none',
          filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))'
        }} 
      />

      {/* Central Dark Glass Card for Perfect Readability */}
      <div 
        className="fade-in" 
        style={{ 
          maxWidth: '550px', width: '90%', position: 'relative', zIndex: 10,
          background: 'rgba(5, 5, 10, 0.65)', // Dark frosted glass
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '30px',
          padding: '60px 40px',
          transform: `translate(${offsetX * -15}px, ${offsetY * -15}px)`, 
          transition: 'transform 0.3s ease-out',
          margin: '0 auto',
          marginTop: '18vh',
          animation: 'pulseGlow 8s infinite',
          boxShadow: '0 30px 60px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', color: '#e0e0e0' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '8px', textTransform: 'uppercase' }}>
            Exclusive Event
          </span>
        </div>
        
        {/* Dynamic Image Content Replacement */}
        <img 
          src="/Nabeelah-Happy-Birthday-Night.png" 
          alt="Happy Birthday Nabeelah"
          style={{
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto 30px',
            display: 'block',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
          }}
        />
        
        <p style={{ 
          margin: '0 0 40px 0', 
          fontSize: '1.1rem', 
          lineHeight: '1.8', 
          color: '#dcdcdc',
          fontFamily: 'var(--font-main)',
          fontWeight: 400,
          letterSpacing: '0.5px'
        }}>
          Today is all about celebrating the most amazing person in my world. I've created something magical just for you.
        </p>

        {/* Vibrant Solid Button */}
        <button 
          onClick={handleBeginClick}
          style={{
            padding: '16px 50px',
            fontSize: '1rem',
            fontFamily: 'var(--font-main)',
            fontWeight: 600,
            color: '#fff',
            background: 'linear-gradient(135deg, #a855f7, #ec4899)', // Purple to Pink gradient
            border: 'none',
            borderRadius: '40px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            boxShadow: '0 10px 25px rgba(168, 85, 247, 0.4)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(168, 85, 247, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(168, 85, 247, 0.4)';
          }}
        >
          Enter
        </button>
      </div>

      <div style={{ position: 'absolute', bottom: '30px', zIndex: 10, width: '100%' }}>
        <span style={{ 
          fontSize: '0.9rem', 
          fontFamily: 'var(--font-cute)', 
          fontWeight: 600, 
          color: 'rgba(255,255,255,0.9)',
          letterSpacing: '2px',
          textShadow: '0 2px 5px rgba(0,0,0,0.9)'
        }}>
          MADE WITH ENDLESS LOVE FOR YOUR SPECIAL DAY
        </span>
      </div>
    </div>
  );
};

export default Hero;
