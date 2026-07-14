import React, { useEffect, useState } from 'react';

const NameReveal = ({ onNext }) => {
  const [phase, setPhase] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Fade in the black screen itself smoothly
    setMounted(true);

    // Cinematic timing sequence
    const t1 = setTimeout(() => setPhase(1), 1000);  // Show "Hello There"
    const t2 = setTimeout(() => setPhase(2), 3000); // Start writing "Nabeelah Anjum"
    const t3 = setTimeout(() => setPhase(3), 14000); // Animation finishes, show continue button earlier to remove pause

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/bg-night.png) center/cover no-repeat',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Import beautiful cursive font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        
        .svg-text-container {
          width: 100%;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .name-reveal-text {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(3rem, 10vw, 8rem);
          fill: transparent;
          stroke: #ffb6c1;
          stroke-width: 2px;
          stroke-dasharray: 2000; /* Large number to cover the text path */
          stroke-dashoffset: 2000;
          opacity: 0;
        }

        .name-reveal-text.writing {
          opacity: 1;
          /* Draw steadily over 9s, then immediately highlight without pause */
          animation: 
            drawOutline 9s linear forwards,
            fillColor 2.5s ease-in forwards 9s; 
        }

        @keyframes drawOutline {
          0% {
            stroke-dashoffset: 2000;
            filter: drop-shadow(0 0 5px rgba(255, 182, 193, 0));
          }
          100% {
            stroke-dashoffset: 0;
            filter: drop-shadow(0 0 15px rgba(255, 182, 193, 0.6));
          }
        }

        @keyframes fillColor {
          0% {
            fill: transparent;
            stroke-width: 2px;
          }
          100% {
            fill: #ffb6c1;
            stroke-width: 0px;
            filter: drop-shadow(0 0 25px rgba(255, 182, 193, 0.8));
          }
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
        transition: 'all 2.5s ease-out'
      }}>
        Hello There
      </div>

      {/* Main Cursive Name (SVG Stroke Animation) */}
      <div className="svg-text-container">
        <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid meet">
          <text 
            x="50%" 
            y="50%" 
            textAnchor="middle" 
            dominantBaseline="middle"
            className={`name-reveal-text ${phase >= 2 ? 'writing' : ''}`}
          >
            Nabeelah Anjum
          </text>
        </svg>
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
