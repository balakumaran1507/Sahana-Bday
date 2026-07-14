import React, { useEffect, useState } from 'react';

const BdayNight = ({ onNext, onPrev }) => {
  const [opacity, setOpacity] = useState(1); // black overlay opacity (starts solid black)
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Fade in from black on mount
    const fadeInTimer = setTimeout(() => {
      setOpacity(0);
    }, 100);

    // Start fading out to black after 4.5 seconds
    const fadeOutTriggerTimer = setTimeout(() => {
      setIsTransitioning(true);
      setOpacity(1);
    }, 4500);

    // Call onNext to advance the slide after fade out completes (6.5 seconds total)
    const nextStepTimer = setTimeout(() => {
      onNext();
    }, 6500);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTriggerTimer);
      clearTimeout(nextStepTimer);
    };
  }, [onNext]);

  return (
    <div className="page-section" style={{
      minHeight: '100vh',
      background: '#030303',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Background Star twinkle animations */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${1.5 + (i % 2)}px`,
            height: `${1.5 + (i % 2)}px`,
            background: '#ffffff',
            borderRadius: '50%',
            top: `${(i * 19) % 95}%`,
            left: `${(i * 23) % 95}%`,
            opacity: 0.15 + (i % 4) * 0.15,
            animation: `twinkle 4s ease-in-out infinite alternate ${i * 0.2}s`
          }} />
        ))}
      </div>

      {/* Center Image card layout */}
      <div style={{
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '96vw',
        width: '95%',
        animation: 'bannerFloat 6s ease-in-out infinite alternate'
      }}>
        <div style={{
          position: 'relative',
          padding: '6px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.7)'
        }}>
          <img 
            src="/Nabeelah-Happy-Birthday-Night.png" 
            alt="Nabeelah Happy Birthday Night" 
            style={{
              width: '100%',
              maxHeight: '88vh',
              objectFit: 'contain',
              borderRadius: '18px',
              display: 'block',
              boxShadow: '0 15px 30px rgba(0,0,0,0.8)'
            }}
          />
        </div>
      </div>

      {/* Manual skip option for convenience */}
      <button 
        onClick={onNext}
        style={{
          position: 'absolute',
          bottom: '30px',
          right: '30px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          color: '#888',
          padding: '6px 14px',
          fontSize: '0.8rem',
          cursor: 'pointer',
          zIndex: 20,
          fontFamily: 'monospace',
          letterSpacing: '1px',
          transition: 'all 0.3s'
        }}
        onMouseOver={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          e.currentTarget.style.color = '#888';
        }}
      >
        SKIP
      </button>

      {/* Black cinematic transition overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: '#000',
        zIndex: 99,
        pointerEvents: 'none',
        opacity: opacity,
        transition: isTransitioning ? 'opacity 2.0s ease-in-out' : 'opacity 1.5s ease-in-out'
      }} />

      <style>{`
        @keyframes bannerFloat {
          from { transform: translateY(0); }
          to { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default BdayNight;
