import React, { useState, useEffect } from 'react';
import NavigationButtons from './NavigationButtons';

const Credits = ({ onNext, onPrev }) => {
  const [showSponsor, setShowSponsor] = useState(false);

  useEffect(() => {
    // Show sponsor logo and nav buttons after credits finish scrolling (e.g., 20 seconds)
    const timer = setTimeout(() => {
      setShowSponsor(true);
    }, 22000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      fontFamily: 'var(--font-main)'
    }}>
      
      <style>{`
        @keyframes scrollUp {
          0% { transform: translateY(100vh); }
          100% { transform: translateY(-150%); }
        }

        .credits-text {
          animation: scrollUp 20s linear forwards;
        }

        .sponsor-fade {
          opacity: 0;
          transition: opacity 3s ease;
        }
        .sponsor-fade.visible {
          opacity: 1;
        }
      `}</style>

      {/* Left Video Panel */}
      <div style={{ width: '25%', height: '100vh', position: 'relative' }}>
        <video 
          src="/End-Credits-1.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
        />
        {/* Soft gradient fade on the edge */}
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '50px', background: 'linear-gradient(to right, transparent, #000)' }} />
      </div>

      {/* Center Credits Panel */}
      <div style={{ width: '50%', height: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Scrolling Credits */}
        <div 
          className="credits-text" 
          style={{ 
            position: 'absolute', 
            width: '100%', 
            textAlign: 'center', 
            paddingTop: '50px',
            opacity: showSponsor ? 0 : 1, // Fade out when sponsor appears
            transition: 'opacity 2s ease'
          }}
        >
          <h1 style={{ fontSize: '2.5rem', marginBottom: '40px', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
            A Beautiful Journey
          </h1>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Starring</h3>
            <p style={{ fontSize: '1.5rem', letterSpacing: '1px' }}>Nabeelah Anjum</p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Created With Love By</h3>
            <p style={{ fontSize: '1.5rem', letterSpacing: '1px' }}>Your Name</p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Music</h3>
            <p style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>La petite fille de la mer</p>
            <p style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>Unakkul Naane</p>
            <p style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>Iraade</p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Special Thanks To</h3>
            <p style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>Everyone who made this possible.</p>
          </div>

          <div style={{ marginTop: '80px', marginBottom: '40px' }}>
            <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#aaa' }}>"To many more memories to come..."</p>
          </div>
        </div>

        {/* Sponsor Reveal */}
        <div className={`sponsor-fade ${showSponsor ? 'visible' : ''}`} style={{ 
          position: 'absolute', 
          top: '0', bottom: '0', left: '0', right: '0',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          pointerEvents: showSponsor ? 'auto' : 'none'
        }}>
          <p style={{ fontSize: '1.2rem', color: '#888', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '40px' }}>
            This website is sponsored by
          </p>
          <img src="/DMK-logo.png.png" alt="DMK Logo" style={{ maxWidth: '350px', objectFit: 'contain' }} />
          
          <div style={{ position: 'absolute', bottom: '50px' }}>
            <NavigationButtons onNext={onNext} onPrev={onPrev} nextText="Final Message →" prevText="Back" />
          </div>
        </div>

      </div>

      {/* Right Video Panel */}
      <div style={{ width: '25%', height: '100vh', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '50px', background: 'linear-gradient(to left, transparent, #000)', zIndex: 1 }} />
        <video 
          src="/End-Credits-1.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
        />
      </div>

    </div>
  );
};

export default Credits;
