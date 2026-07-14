import React, { useEffect, useState } from 'react';

const NameReveal = ({ onNext }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Cinematic timing sequence
    const t1 = setTimeout(() => setPhase(1), 800);  // Show "Hello There"
    const t2 = setTimeout(() => setPhase(2), 2500); // Start writing "Nabeelah"
    const t3 = setTimeout(() => setPhase(3), 7500); // Fade everything out to black
    const t4 = setTimeout(() => onNext(), 9000);    // Transition to the next page

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onNext]);

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
      opacity: phase === 3 ? 0 : 1,
      transition: 'opacity 1.5s ease-in-out'
    }}>
      
      {/* Import beautiful cursive font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        
        .name-reveal-text {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(4rem, 15vw, 10rem);
          color: #ffb6c1; /* Soft pink */
          text-shadow: 0 0 30px rgba(255, 182, 193, 0.4);
          
          /* The clipping mask wipe effect */
          -webkit-mask-image: linear-gradient(to right, black 50%, transparent 50%);
          -webkit-mask-size: 200% 100%;
          -webkit-mask-position: 100% 0;
          
          mask-image: linear-gradient(to right, black 50%, transparent 50%);
          mask-size: 200% 100%;
          mask-position: 100% 0;
        }

        .name-reveal-text.writing {
          -webkit-mask-position: 0% 0;
          mask-position: 0% 0;
          transition: -webkit-mask-position 3.5s cubic-bezier(0.2, 0.6, 0.3, 1), mask-position 3.5s cubic-bezier(0.2, 0.6, 0.3, 1);
        }
      `}</style>

      {/* Small top text */}
      <div style={{
        position: 'absolute',
        top: '30%',
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

      {/* Main Cursive Name */}
      <div className={`name-reveal-text ${phase >= 2 ? 'writing' : ''}`}>
        Nabeelah
      </div>
      
    </div>
  );
};

export default NameReveal;
