import React, { useState, useEffect } from 'react';
import NavigationButtons from './NavigationButtons';
import { Clock, ExternalLink } from 'lucide-react';

const HubblePhoto = ({ onNext, onPrev }) => {
  const [stars, setStars] = useState([]);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Resize listener for responsiveness
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate random stars for the background
  useEffect(() => {
    const newStars = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.1,
      delay: Math.random() * 5
    }));
    setStars(newStars);
  }, []);

  const isMobile = screenWidth < 1024;

  return (
    <div className="page-section fade-in" style={{ 
      minHeight: '100vh', 
      background: '#04060c', // Deep quiet pure space dark
      position: 'relative', 
      overflowX: 'hidden',
      overflowY: isMobile ? 'auto' : 'hidden',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: isMobile ? 'flex-start' : 'center',
      padding: isMobile ? '40px 15px 100px 15px' : '20px'
    }}>
      {/* Quiet Stars Background */}
      {stars.map((star, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${star.y}%`,
          left: `${star.x}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          backgroundColor: '#fff',
          borderRadius: '50%',
          opacity: star.opacity,
          animation: `twinkle 4s ease-in-out infinite alternate ${star.delay}s`,
          zIndex: 1
        }} />
      ))}
      <style>{`
        @keyframes twinkle { 
          from { opacity: 0.1; } 
          to { opacity: 0.8; transform: scale(1.2); } 
        }
        @keyframes floatSpace {
          from { transform: translateY(0); }
          to { transform: translateY(-10px); }
        }
      `}</style>

      {/* Cool Astronomical Date Caption (Minimalist & Sleek) */}
      <div style={{
        position: isMobile ? 'relative' : 'absolute', 
        top: isMobile ? '0' : '40px', 
        left: isMobile ? '0' : '40px', 
        zIndex: 10,
        color: '#8e9aa8',
        fontFamily: 'var(--font-heading)',
        fontSize: isMobile ? '0.85rem' : '0.95rem', 
        letterSpacing: '5px',
        textTransform: 'uppercase',
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '10px',
        marginBottom: isMobile ? '25px' : '0'
      }}>
        <Clock size={14} color="#8e9aa8" />
        <span>OBSERVATORY DATA • 19 SEPTEMBER 2006</span>
      </div>

      {/* The Supernova Photo */}
      <div style={{
        position: isMobile ? 'relative' : 'absolute',
        top: isMobile ? '0' : '15%',
        left: isMobile ? '0' : '50%',
        transform: isMobile ? 'none' : 'translateX(-50%)',
        zIndex: 10,
        animation: 'floatSpace 6s ease-in-out infinite alternate',
        marginBottom: isMobile ? '25px' : '0'
      }}>
        <div style={{
          position: 'relative',
          padding: '6px',
          background: 'rgba(255,255,255,0.01)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.6)' // Normal depth shadow, no neon glow
        }}>
          <img 
            src="/SAHANA-BDAY-STAR.jpg" 
            alt="Ring Nebula" 
            style={{ 
              borderRadius: '12px', 
              width: isMobile ? '310px' : '420px', 
              maxWidth: '85vw',
              display: 'block',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)' 
            }} 
          />
        </div>
      </div>

      {/* Telescope looking up (Larger & glow-free) */}
      <div style={{
        position: isMobile ? 'relative' : 'absolute',
        bottom: isMobile ? '0' : '80px',
        left: isMobile ? '0' : '5%',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: isMobile ? '25px' : '0'
      }}>
        <div style={{
          transform: isMobile ? 'rotate(0deg)' : 'rotate(-10deg)',
          filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.4))',
          position: 'relative',
          opacity: 0.95
        }}>
          <img 
            src="/telescope.webp" 
            alt="Telescope" 
            style={{ 
              width: isMobile ? '135px' : '260px', // Enlarged telescope as requested
              height: 'auto', 
              display: 'block' 
            }} 
          />
        </div>
        <div style={{ 
          color: '#657382', 
          fontFamily: 'monospace', 
          fontSize: '0.8rem', 
          textAlign: 'center', 
          marginTop: '12px', 
          letterSpacing: '4px',
          fontWeight: 'bold'
        }}>
          OBSERVATORY ONLINE
        </div>
      </div>

      {/* Information Card (Glow-free, elegant and minimal) */}
      <div style={{
        position: isMobile ? 'relative' : 'absolute',
        bottom: isMobile ? '0' : '80px',
        right: isMobile ? '0' : '5%',
        zIndex: 20,
        width: '95%',
        maxWidth: isMobile ? '400px' : '360px',
        background: 'rgba(5, 7, 14, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: isMobile ? '20px' : '30px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.6)'
      }}>
        <h2 style={{ 
          fontSize: isMobile ? '1.5rem' : '1.7rem', 
          marginBottom: '14px', 
          color: '#fff', // Pure clean white
          fontFamily: 'var(--font-heading)',
          letterSpacing: '1px'
        }}>
          The Ring Nebula
        </h2>
        
        <p style={{ 
          fontSize: isMobile ? '0.95rem' : '1.02rem', 
          color: '#abb4be', 
          marginBottom: '25px', 
          fontFamily: 'var(--font-main)', 
          lineHeight: '1.7',
          fontWeight: 400
        }}>
          This is exactly what the majestic Hubble Space Telescope saw when it gazed into the cosmos on September 19, 2006.
          <br/><br/>
          A breathtaking close-up view of the Ring Nebula. Bright, colorful, and just as beautiful as you are.
        </p>

        <a 
          href="https://science.nasa.gov/asset/hubble/hubble-captures-a-ring/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px',
            color: '#fff', 
            textDecoration: 'none', 
            fontWeight: '600', 
            fontSize: '0.85rem',
            background: 'transparent', 
            border: '1px solid rgba(255,255,255,0.25)',
            padding: '10px 22px', 
            borderRadius: '30px',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          NASA Official Archives <ExternalLink size={14} />
        </a>
      </div>

      {/* Navigation Buttons */}
      <div style={{ 
        position: isMobile ? 'relative' : 'absolute', 
        bottom: isMobile ? '0' : '40px', 
        left: isMobile ? '0' : '50%', 
        transform: isMobile ? 'none' : 'translateX(-50%)', 
        zIndex: 30,
        marginTop: isMobile ? '30px' : '0'
      }}>
        <NavigationButtons onNext={onNext} onPrev={onPrev} nextText="Next Chapter →" />
      </div>

    </div>
  );
};

export default HubblePhoto;
