import React, { useEffect, useState } from 'react';

const NameReveal = ({ onNext }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Cinematic timing sequence
    const t1 = setTimeout(() => setPhase(1), 1000);  // Show "Hello There"
    const t2 = setTimeout(() => setPhase(2), 3000); // Start writing "Nabeelah Anjum"
    const t3 = setTimeout(() => setPhase(3), 17000); // Animation finishes, show continue button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000', // Pure cinematic black
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      
      {/* Import beautiful cursive font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        
        .name-reveal-text {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(3rem, 10vw, 8rem);
          white-space: nowrap;
          color: #ffb6c1; /* Soft pink */
          text-shadow: 0 0 30px rgba(255, 182, 193, 0.4);
          
          /* The clipping mask wipe effect with a beautifully feathered glowing edge */
          -webkit-mask-image: linear-gradient(to right, black 40%, rgba(0,0,0,0.5) 50%, transparent 60%);
          -webkit-mask-size: 250% 100%;
          -webkit-mask-position: 100% 0;
          
          mask-image: linear-gradient(to right, black 40%, rgba(0,0,0,0.5) 50%, transparent 60%);
          mask-size: 250% 100%;
          mask-position: 100% 0;
        }

        .name-reveal-text.writing {
          -webkit-mask-position: 0% 0;
          mask-position: 0% 0;
          /* Perfectly smooth, linear 14-second wipe to match the music timing */
          transition: -webkit-mask-position 14s linear, mask-position 14s linear;
        }
      `}</style>

      {/* Small top text */}
      <div style={{
        position: 'absolute',
        top: '25%',
        fontFamily: 'var(--font-main)',
        fontSize: '1.2rem',
        letterSpacing: '10px',
        textTransform: 'uppercase',
        color: '#fff',
        opacity: phase >= 1 ? 0.7 : 0,
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 2s ease-out'
      }}>
        Hello There
      </div>

      {/* Main Cursive Name (Smooth CSS Reveal) */}
      <div className={`name-reveal-text ${phase >= 2 ? 'writing' : ''}`}>
        Nabeelah Anjum
      </div>

      {/* Continue Button */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        opacity: phase === 3 ? 1 : 0,
        pointerEvents: phase === 3 ? 'auto' : 'none',
        transition: 'opacity 2s ease-in'
      }}>
        <button 
          onClick={onNext}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            padding: '12px 30px',
            borderRadius: '30px',
            fontFamily: 'var(--font-main)',
            fontSize: '1rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
        >
          Continue →
        </button>
      </div>
      
    </div>
  );
};

export default NameReveal;
