import React, { useState, useEffect } from 'react';
import NavigationButtons from './NavigationButtons';

const images = [
  '/memory-1.jpeg', 
  '/memory-2.jpeg', 
  '/memory-3.jpeg', 
  '/memory-4.jpeg', 
  '/memory-5.jpeg'
];

const PhotoGallery = ({ onNext, onPrev }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations right after mount
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="page-section fade-in"
      style={{ 
        minHeight: '100vh', 
        background: 'url(/Memories-bg.avif) center/cover no-repeat',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative',
        overflow: 'hidden',
        padding: '20px'
      }}
    >
      {/* Soft, Cute Pink Overlay for the background */}
      <div style={{
        position: 'absolute', inset: 0, 
        background: 'rgba(255, 182, 193, 0.45)',
        mixBlendMode: 'soft-light',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute', inset: 0, 
        background: 'rgba(255, 255, 255, 0.3)', 
        backdropFilter: 'blur(8px)',
        zIndex: 0
      }} />

      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.8) translateY(30px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        
        .collage-img {
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
          cursor: pointer;
        }
        .collage-img:hover {
          transform: scale(1.03) translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
          z-index: 20;
        }
      `}</style>

      {/* Header */}
      <div style={{ 
        position: 'relative', 
        textAlign: 'center',
        zIndex: 10,
        marginBottom: '40px',
        animation: loaded ? 'popIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' : 'none',
        opacity: 0
      }}>
        <h2 style={{ 
          fontFamily: 'var(--font-heading)', 
          color: '#fff', 
          fontSize: '3rem',
          letterSpacing: '2px',
          textShadow: '0 4px 15px rgba(255, 105, 180, 0.5)',
          margin: 0
        }}>
          Our Album
        </h2>
        <p style={{ color: '#fff', fontFamily: 'var(--font-main)', marginTop: '10px', fontWeight: 500, fontSize: '1.1rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          Every moment with you is magic ✨
        </p>
      </div>

      {/* Grid Collage Album */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '15px',
        maxWidth: '900px',
        width: '100%',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(255, 105, 180, 0.15), inset 0 2px 0 rgba(255,255,255,0.7)',
        border: '1px solid rgba(255,255,255,0.6)'
      }}>
        
        {images.map((src, idx) => {
          const isHero = idx === 0;
          
          return (
            <div 
              key={idx} 
              className="collage-img"
              style={{
                gridColumn: isHero ? 'span 2' : 'span 1',
                gridRow: isHero ? 'span 2' : 'span 1',
                aspectRatio: isHero ? 'auto' : '1 / 1',
                height: isHero ? '100%' : 'auto',
                minHeight: isHero ? '350px' : 'auto',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#eee',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                opacity: 0,
                animation: loaded ? `popIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards ${idx * 0.15 + 0.3}s` : 'none'
              }}
            >
              <img 
                src={src} 
                style={{ 
                  width: '100%', 
                  height: '100%',
                  objectFit: 'cover',
                  userSelect: 'none', 
                  pointerEvents: 'none',
                  display: 'block'
                }} 
                alt={`Memory ${idx + 1}`} 
                draggable="false"
              />
            </div>
          )
        })}

      </div>

      {/* Global Navigation */}
      <div style={{ position: 'relative', marginTop: '50px', zIndex: 20 }}>
        <NavigationButtons onNext={onNext} onPrev={onPrev} nextText="Next Chapter →" />
      </div>

    </div>
  );
};

export default PhotoGallery;
