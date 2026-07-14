import React, { useEffect, useRef, useState } from 'react';

const Hero = ({ onNext }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowCenter, setWindowCenter] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

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
        background: 'radial-gradient(circle at center, #2a0845 0%, #000000 100%)', // Deep premium dark background
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        @keyframes floatSlow {
          0% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-30px) translateX(20px); }
          66% { transform: translateY(20px) translateX(-20px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
      `}</style>

      {/* Lightweight CSS Ambient Orbs (Replaces heavy WebGL canvas) */}
      <div style={{
        position: 'absolute', top: '20%', left: '15%', width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(255, 105, 180, 0.15) 0%, transparent 70%)',
        animation: 'pulseGlow 8s infinite, floatSlow 12s infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(255, 182, 193, 0.12) 0%, transparent 70%)',
        animation: 'pulseGlow 10s infinite reverse, floatSlow 15s infinite reverse',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 70%)',
        animation: 'pulseGlow 12s infinite',
        zIndex: 0
      }} />
      
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
