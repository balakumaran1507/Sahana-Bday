import React, { useEffect, useState } from 'react';
import NavigationButtons from './NavigationButtons';

const FinalMessage = ({ onNext, onPrev }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate some random floating hearts/stars
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${6 + Math.random() * 8}s`,
      scale: 0.6 + Math.random() * 0.8,
      emoji: ['💖', '✨', '🌸', '🎈', '💕'][Math.floor(Math.random() * 5)]
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="page-section fade-in" style={{
      minHeight: '100vh',
      background: 'url(/bg-night.png) center/cover no-repeat',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <style>{`
        @keyframes floatUpward {
          0% {
            transform: translateY(105vh) scale(var(--scale)) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10vh) scale(var(--scale)) rotate(360deg);
            opacity: 0;
          }
        }
        .floating-element {
          position: absolute',
          bottom: 0;
          animation: floatUpward 10s linear infinite;
        }
        .final-letter {
          animation: zoomInLetter 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
          transform: scale(0.9) translateY(20px);
        }
        @keyframes zoomInLetter {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>

      {/* Floating Elements overlay */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-element"
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            '--scale': h.scale,
            fontSize: '1.5rem',
            pointerEvents: 'none',
            zIndex: 1,
            position: 'absolute'
          }}
        >
          {h.emoji}
        </span>
      ))}

      {/* Decorative corners */}
      <img
        src="/Flower-Corner.png"
        alt="Decor"
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          width: '180px',
          opacity: 0.8,
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
      <img
        src="/Flower-Corner.png"
        alt="Decor"
        style={{
          position: 'absolute',
          bottom: '-20px',
          right: '-20px',
          width: '180px',
          opacity: 0.8,
          zIndex: 2,
          transform: 'rotate(180deg)',
          pointerEvents: 'none'
        }}
      />

      {/* Final Glass Card */}
      <div
        className="glass-card final-letter"
        style={{
          maxWidth: '550px',
          width: '95%',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          borderRadius: '30px',
          padding: '40px 35px',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3), inset 0 2px 2px rgba(255,255,255,0.9)',
          zIndex: 10,
          position: 'relative'
        }}
      >
        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '15px' }}>👑</span>
        
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          color: '#ff4d85',
          fontSize: '2rem',
          marginBottom: '25px',
          letterSpacing: '1px'
        }}>
          One Last Thing...
        </h2>

        <div style={{
          fontFamily: 'var(--font-main)',
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#444',
          textAlign: 'left',
          marginBottom: '35px',
          whiteSpace: 'pre-wrap',
          background: 'rgba(255, 255, 255, 0.4)',
          padding: '25px',
          borderRadius: '20px',
          border: '1px dashed rgba(255, 117, 160, 0.3)'
        }}>
          <strong>Dear Nabeelah,</strong>
          <br /><br />
          From the bottom of my heart, thank you for being who you are. I hope this little virtual journey and celebration brought a massive smile to your face today.
          <br /><br />
          No matter where life takes us, always remember that you are deeply appreciated, celebrated, and cared for. You are a true masterpiece!
          <br /><br />
          Wishing you a wonderful year ahead filled with magic, laughter, and endless beautiful moments. Happy Birthday! 💖🎂✨
          <br /><br />
          <span style={{
            display: 'block',
            textAlign: 'right',
            fontFamily: 'var(--font-cute)',
            fontSize: '1.3rem',
            color: '#ff4d85',
            fontWeight: 'bold'
          }}>
            ~ Big B
          </span>
        </div>

        <NavigationButtons
          onNext={onNext}
          onPrev={onPrev}
          nextText="Restart Journey ↺"
          prevText="Back"
        />
      </div>
    </div>
  );
};

export default FinalMessage;
