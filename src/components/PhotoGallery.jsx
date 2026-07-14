import React, { useState } from 'react';
import NavigationButtons from './NavigationButtons';

const images = [
  '/memory-1.jpeg', 
  '/memory-2.jpeg', 
  '/memory-3.jpeg', 
  '/memory-4.jpeg', 
  '/memory-5.jpeg'
];

const PhotoGallery = ({ onNext, onPrev }) => {
  const [printedCount, setPrintedCount] = useState(0);
  const [printingState, setPrintingState] = useState('idle'); // idle, sliding, developing, flying

  const handlePrint = () => {
    if (printingState !== 'idle' || printedCount >= images.length) return;
    
    setPrintingState('sliding'); // Card slides out
    
    setTimeout(() => {
      setPrintingState('developing'); // Photo fades in
    }, 1000);
    
    setTimeout(() => {
      setPrintingState('flying'); // Card flies to corner
    }, 4000);
    
    setTimeout(() => {
      setPrintedCount(c => c + 1);
      setPrintingState('idle'); // Reset for next
    }, 5000);
  };

  return (
    <div className="page-section fade-in" style={{ 
      minHeight: '100vh', 
      background: 'url(/Memories-bg.avif) center/cover no-repeat',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, 
        background: 'rgba(255, 182, 193, 0.45)', mixBlendMode: 'soft-light', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', inset: 0, 
        background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', zIndex: 0
      }} />

      {/* Header text */}
      <div style={{ position: 'absolute', top: '10%', textAlign: 'center', zIndex: 10 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: 0, textShadow: '0 4px 15px rgba(255, 105, 180, 0.5)' }}>
          Print Our Memories
        </h2>
        <p style={{ color: '#fff', fontFamily: 'var(--font-main)', fontSize: '1.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)', fontWeight: 600 }}>
          {printedCount < images.length ? "Click the camera to print a photo!" : "All memories printed! ❤️"}
        </p>
      </div>

      {/* Camera & Polaroid Area */}
      <div 
        style={{ position: 'relative', zIndex: 10, cursor: printedCount < images.length ? 'pointer' : 'default', marginTop: '20px' }} 
        onClick={handlePrint}
      >
        
        {/* Animated Polaroid Card (only renders if we are printing) */}
        {printingState !== 'idle' && (
          <div style={{
            position: 'absolute',
            bottom: '30px', // start hidden behind the camera body
            left: '50%',
            marginLeft: '-110px',
            width: '220px',
            height: '280px',
            background: '#fff',
            padding: '10px 10px 40px 10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            borderRadius: '4px',
            zIndex: 5, // Behind camera
            // State-based transforms
            transform: printingState === 'sliding' ? 'translateY(190px) scale(1) rotate(0deg)'
                     : printingState === 'developing' ? 'translateY(190px) scale(1.1) rotate(0deg)'
                     : printingState === 'flying' ? 'translate(35vw, 40vh) scale(0.1) rotate(360deg)'
                     : 'translateY(0) scale(0)',
            opacity: printingState === 'flying' ? 0 : 1,
            transition: printingState === 'sliding' ? 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1)' 
                      : printingState === 'developing' ? 'transform 3s ease-out'
                      : printingState === 'flying' ? 'transform 1s cubic-bezier(0.5, 0, 0.2, 1), opacity 0.8s ease-in 0.2s'
                      : 'none',
          }}>
             <div style={{ width: '100%', height: '100%', background: '#222', overflow: 'hidden' }}>
                <img 
                  src={images[printedCount]} 
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    opacity: printingState === 'sliding' ? 0 : 1,
                    transition: 'opacity 2s ease-in'
                  }} 
                  alt={`Printing memory ${printedCount + 1}`}
                />
             </div>
             <div style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center', fontFamily: 'var(--font-cute)', color: '#444', fontSize: '1.2rem', left: 0, fontWeight: 'bold' }}>
               Memory #{printedCount + 1}
             </div>
          </div>
        )}

        {/* The Camera (Foreground) */}
        <img 
          src="/polaroid_camera.png" 
          alt="Vintage Polaroid Camera" 
          style={{
            width: '450px',
            maxWidth: '90vw',
            position: 'relative',
            zIndex: 10,
            mixBlendMode: 'multiply', // Blends white bg to pure transparent
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
            transition: 'transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)',
            transform: printingState === 'sliding' ? 'scale(0.97) translateY(5px)' : 'scale(1)' // Physical click bump
          }}
        />
      </div>

      {/* Album in Bottom Right */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        right: '5%',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: printingState === 'flying' ? 'pulseAlbum 1s ease 0.8s' : 'none'
      }}>
        <style>{`
          @keyframes pulseAlbum {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); filter: drop-shadow(0 0 20px rgba(255, 105, 180, 0.8)); }
          }
        `}</style>
        <div style={{
          width: '70px', height: '90px',
          background: 'linear-gradient(135deg, #d53f8c, #a855f7)',
          borderRadius: '4px 12px 12px 4px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.4), inset -5px 0 15px rgba(0,0,0,0.2)',
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ position: 'absolute', left: '8px', width: '2px', height: '100%', background: 'rgba(0,0,0,0.3)' }} />
          <span style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.2rem', transform: 'rotate(-90deg)', letterSpacing: '2px' }}>
            Album
          </span>
        </div>
        <div style={{ 
          marginTop: '10px', fontFamily: 'var(--font-main)', color: '#fff', fontWeight: 700, 
          background: 'rgba(0,0,0,0.5)', padding: '4px 15px', borderRadius: '20px',
          backdropFilter: 'blur(5px)'
        }}>
          {printedCount} / {images.length}
        </div>
      </div>

      {/* Global Navigation (Visible when all printed) */}
      <div style={{ 
        position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 20,
        opacity: printedCount >= images.length ? 1 : 0,
        pointerEvents: printedCount >= images.length ? 'auto' : 'none',
        transition: 'opacity 1.5s ease 0.5s'
      }}>
        <NavigationButtons onNext={onNext} onPrev={onPrev} nextText="Next Chapter →" />
      </div>

    </div>
  );
};

export default PhotoGallery;
