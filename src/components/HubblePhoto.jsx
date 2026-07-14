import React, { useState, useEffect } from 'react';
import NavigationButtons from './NavigationButtons';
import { Telescope, Clock, ExternalLink } from 'lucide-react';

const HubblePhoto = ({ onNext, onPrev }) => {
  const [missionTime, setMissionTime] = useState("");
  const [stars, setStars] = useState([]);

  // Space Timer logic
  useEffect(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0); // Start of day for a larger number
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now - start;
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      const ms = Math.floor((diff % 1000) / 10).toString().padStart(2, '0');
      setMissionTime(`T+ ${h}:${m}:${s}:${ms}`);
    }, 47);
    return () => clearInterval(interval);
  }, []);

  // Generate random stars for the background
  useEffect(() => {
    const newStars = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random(),
      delay: Math.random() * 5
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="page-section fade-in" style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom, #020612, #0b1528)', 
      position: 'relative', 
      overflow: 'hidden',
      color: '#fff'
    }}>
      {/* Stars Background */}
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
          animation: `twinkle 3s ease-in-out infinite alternate ${star.delay}s`,
          zIndex: 1
        }} />
      ))}
      <style>{`
        @keyframes twinkle { 
          from { opacity: 0.1; } 
          to { opacity: 1; transform: scale(1.5); box-shadow: 0 0 10px #fff; } 
        }
        @keyframes floatSpace {
          from { transform: translateY(0) rotate(0deg); }
          to { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes pulseBeam {
          0% { opacity: 0; width: 0; }
          50% { opacity: 0.8; width: 100%; }
          100% { opacity: 0; width: 0; }
        }
      `}</style>

      {/* Top Left: Space Timer */}
      <div style={{
        position: 'absolute', top: '40px', left: '40px', zIndex: 10,
        background: 'rgba(2, 6, 18, 0.7)', border: '1px solid rgba(102, 252, 241, 0.4)',
        padding: '12px 25px', borderRadius: '12px', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', gap: '15px',
        color: '#66fcf1', fontFamily: 'monospace', fontSize: '1.4rem', letterSpacing: '2px',
        boxShadow: '0 0 20px rgba(102, 252, 241, 0.2)'
      }}>
        <Clock size={24} color="#66fcf1" />
        <span style={{ fontWeight: 'bold' }}>MISSION CLOCK:</span>
        <span style={{ color: '#fff' }}>{missionTime}</span>
      </div>

      {/* Center/Right: The Hubble Image Floating in Space */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-20%)',
        zIndex: 10,
        animation: 'floatSpace 8s ease-in-out infinite alternate',
      }}>
        <div style={{
          position: 'relative',
          padding: '15px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '24px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 80px rgba(102, 252, 241, 0.15), inset 0 0 20px rgba(255,255,255,0.05)'
        }}>
          <img 
            src="/july-14-2019-supernova-remnant-n-49.jpg" 
            alt="Supernova N49" 
            style={{ 
              borderRadius: '16px', 
              width: '450px', 
              maxWidth: '80vw',
              boxShadow: '0 20px 50px rgba(0,0,0,0.9)' 
            }} 
          />
        </div>
      </div>

      {/* Bottom Left: Telescope looking up */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: '80px',
        zIndex: 20,
      }}>
        <div style={{
          transform: 'rotate(-15deg)', // Tilt slightly more upward to aim at the image
          filter: 'drop-shadow(0 0 30px rgba(102, 252, 241, 0.6))',
          color: '#66fcf1',
          position: 'relative',
          opacity: 0.9
        }}>
          <Telescope size={180} strokeWidth={1} />
          {/* Faint sight-line ray targeting the supernova */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '150px', 
            width: '700px',
            height: '2px',
            background: 'linear-gradient(90deg, rgba(102,252,241,0.6), transparent)',
            transform: 'rotate(-25deg)',
            transformOrigin: 'left center',
            animation: 'pulseBeam 5s cubic-bezier(0.4, 0, 0.2, 1) infinite'
          }} />
        </div>
        <div style={{ 
          color: '#45a29e', fontFamily: 'monospace', fontSize: '0.9rem', 
          textAlign: 'center', marginTop: '15px', letterSpacing: '4px',
          fontWeight: 'bold', textShadow: '0 0 10px rgba(69, 162, 158, 0.5)'
        }}>
          OBSERVATORY ONLINE
        </div>
      </div>

      {/* Bottom Right: Information Card */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        right: '60px',
        zIndex: 20,
        maxWidth: '420px',
        background: 'rgba(2, 6, 18, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(102, 252, 241, 0.3)',
        borderRadius: '20px',
        padding: '35px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.7), inset 0 0 30px rgba(102, 252, 241, 0.05)'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '15px', color: '#66fcf1', fontFamily: 'var(--font-heading)', textShadow: '0 0 15px rgba(102, 252, 241, 0.4)' }}>
          Supernova N 49 🌌
        </h2>
        
        <p style={{ fontSize: '1.1rem', color: '#c5c6c7', marginBottom: '30px', fontFamily: 'var(--font-cute)', lineHeight: '1.8' }}>
          This is exactly what the majestic Hubble Space Telescope saw when it gazed into the cosmos on <strong>July 14</strong>! 
          <br/><br/>
          A breathtaking Supernova Remnant in the Large Magellanic Cloud. Bright, explosive, and just as beautiful as you are.
        </p>

        <a 
          href="https://imagine.gsfc.nasa.gov/hst_bday/july-14" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            color: '#0b0c10', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem',
            background: '#66fcf1', padding: '12px 24px', borderRadius: '30px',
            transition: 'all 0.3s', boxShadow: '0 0 20px rgba(102, 252, 241, 0.4)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#45a29e';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#66fcf1';
            e.currentTarget.style.color = '#0b0c10';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          NASA Official Archives <ExternalLink size={18} />
        </a>
      </div>

      {/* Navigation Buttons */}
      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 30 }}>
        <NavigationButtons onNext={onNext} onPrev={onPrev} nextText="Next Chapter →" />
      </div>

    </div>
  );
};

export default HubblePhoto;
