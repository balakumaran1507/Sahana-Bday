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
    }, 1500);
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', 
        position: 'relative',
        background: 'url(/bg-morning.png) center/cover no-repeat', // Base morning sky
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.4); }
          50% { box-shadow: 0 0 80px rgba(255, 255, 255, 0.7); }
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

      {/* Transition Overlay (Solid Black) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: '#000',
        zIndex: 99, 
        pointerEvents: 'none',
        opacity: isTransitioning ? 1 : 0,
        transition: 'opacity 1.5s ease-in-out'
      }} />

      {/* The BIG Purple Flower Decors */}
      <img 
        src="/Purple-Flower.png" 
        alt="Big Purple Flower Left" 
        style={{ 
          position: 'absolute', 
          bottom: windowCenter.x * 2 < 768 ? '5%' : '-15%', 
          left: windowCenter.x * 2 < 768 ? '-5%' : '-10%', 
          width: windowCenter.x * 2 < 768 ? '300px' : '600px', 
          opacity: windowCenter.x * 2 < 768 ? 0.35 : 0.9, 
          zIndex: 1,
          transform: `translate(${offsetX * -40}px, ${offsetY * 40}px) rotate(${offsetX * 5}deg)`,
          transition: 'transform 0.2s ease-out, width 0.3s, opacity 0.3s',
          pointerEvents: 'none',
          filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))'
        }} 
      />
      <img 
        src="/Purple-Flower.png" 
        alt="Big Purple Flower Right" 
        style={{ 
          position: 'absolute', 
          top: windowCenter.x * 2 < 768 ? '5%' : '-15%', 
          right: windowCenter.x * 2 < 768 ? '-5%' : '-10%', 
          width: windowCenter.x * 2 < 768 ? '250px' : '500px', 
          opacity: windowCenter.x * 2 < 768 ? 0.35 : 0.8, 
          zIndex: 1,
          transform: `translate(${offsetX * 40}px, ${offsetY * -40}px) rotate(${offsetY * -15}deg)`,
          transition: 'transform 0.2s ease-out, width 0.3s, opacity 0.3s',
          pointerEvents: 'none',
          filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))'
        }} 
      />

      {/* Central Light Glass Card for Perfect Elegance */}
      <div 
        className="fade-in" 
        style={{ 
          maxWidth: '550px', width: '90%', position: 'relative', zIndex: 10,
          background: 'rgba(255, 255, 255, 0.4)', // Beautiful light frosted glass
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          border: '1px solid rgba(255, 255, 255, 0.7)',
          borderRadius: '24px',
          padding: windowCenter.x * 2 < 768 ? '30px 20px' : '50px 40px',
          transform: `translate(${offsetX * -15}px, ${offsetY * -15}px)`, 
          transition: 'transform 0.3s ease-out, padding 0.3s',
          animation: 'pulseGlow 8s infinite',
          boxShadow: '0 20px 50px rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.8)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', color: '#555' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '6px', textTransform: 'uppercase' }}>
            Exclusive Event
          </span>
        </div>
        
        {/* Beautiful Typography replacing the image */}
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          marginBottom: '15px', 
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          color: '#2d3748', // Elegant dark slate
          letterSpacing: '1px',
          lineHeight: '1.2'
        }}>
          Happy Birthday,<br/>
          <span style={{ color: '#d53f8c', fontFamily: 'var(--font-cute)' }}>Beautiful.</span>
        </h1>
        
        <div style={{ width: '40px', height: '3px', background: '#d53f8c', borderRadius: '2px', margin: '20px auto 30px', opacity: 0.5 }} />
        
        <p style={{ 
          margin: '0 0 40px 0', 
          fontSize: '1.1rem', 
          lineHeight: '1.7', 
          color: '#4a5568',
          fontFamily: 'var(--font-main)',
          fontWeight: 500
        }}>
          Today is all about celebrating Nabeelah, she deserves to be put on a pedestal, at least today! I've created something magical just for you.
        </p>

        {/* Premium Refined Button */}
        <button 
          onClick={handleBeginClick}
          style={{
            padding: '14px 45px',
            fontSize: '0.95rem',
            fontFamily: 'var(--font-main)',
            fontWeight: 700,
            color: '#fff',
            background: '#d53f8c',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            boxShadow: '0 8px 20px rgba(213, 63, 140, 0.4)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 25px rgba(213, 63, 140, 0.6)';
            e.currentTarget.style.background = '#b83280';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(213, 63, 140, 0.4)';
            e.currentTarget.style.background = '#d53f8c';
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
