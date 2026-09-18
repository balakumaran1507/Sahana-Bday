import React, { useState, useEffect } from 'react';
import NavigationButtons from './NavigationButtons';

const Credits = ({ onNext, onPrev }) => {
  const [showSponsor, setShowSponsor] = useState(false);

  useEffect(() => {
    // Show sponsor logo and nav buttons after credits finish scrolling (35 seconds)
    const timer = setTimeout(() => {
      setShowSponsor(true);
    }, 35000); 

    return () => clearTimeout(timer);
  }, []);

  // Standard roles where Big B is everything!
  const creativeTeam = [
    { role: "Creative Director", name: "Big B" },
    { role: "Art Director", name: "Big B" },
    { role: "UI & UX Designer", name: "Big B" },
    { role: "Motion Designer", name: "Big B" },
    { role: "3D Artist & Modeler", name: "Big B" },
    { role: "3D Animator", name: "Big B" },
    { role: "VFX Artist & Colorist", name: "Big B" },
    { role: "Video Editor", name: "Big B" },
    { role: "Sound Designer & Composer", name: "Big B" },
    { role: "Copywriter & UX Writer", name: "Big B" },
    { role: "Frontend Developer", name: "Big B" },
    { role: "Three.js / WebGL Developer", name: "Big B" },
    { role: "GSAP Animation Developer", name: "Big B" },
    { role: "Performance Engineer & QA", name: "Big B" }
  ];

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
          100% { transform: translateY(-112%); }
        }

        .credits-text {
          animation: scrollUp 34s linear forwards;
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
          <h1 style={{ fontSize: '2.5rem', marginBottom: '50px', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
            Credits
          </h1>

          <div style={{ marginBottom: '45px' }}>
            <h3 style={{ fontSize: '0.85rem', color: '#777', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>Starring</h3>
            <p style={{ fontSize: '1.6rem', letterSpacing: '1px', fontWeight: 600 }}>Nabeelah Anjum</p>
          </div>

          {/* BTS: Sketch Efforts */}
          <div style={{ marginBottom: '55px' }}>
            <h3 style={{ fontSize: '0.85rem', color: '#777', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '15px' }}>Behind the Scenes: Sketch Efforts</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', maxWidth: '85%', margin: '0 auto' }}>
              <div style={{ flex: 1, background: '#111', padding: '6px', borderRadius: '12px', border: '1px solid #333' }}>
                <img src="/credits-efforts-1.png" alt="Effort 1" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
              </div>
              <div style={{ flex: 1, background: '#111', padding: '6px', borderRadius: '12px', border: '1px solid #333' }}>
                <img src="/credits-efforts-2.png" alt="Effort 2" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
              </div>
            </div>
          </div>

          {/* Map creative team roles listing Big B */}
          {creativeTeam.map((item, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '0.85rem', color: '#777', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '10px' }}>{item.role}</h3>
              <p style={{ fontSize: '1.5rem', letterSpacing: '1px' }}>{item.name}</p>
            </div>
          ))}

          {/* Failed covers bloopers section */}
          <div style={{ marginBottom: '55px' }}>
            <h3 style={{ fontSize: '0.85rem', color: '#777', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '15px' }}>Bloopers: Failed Covers</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', maxWidth: '90%', margin: '0 auto' }}>
              <div style={{ flex: 1, background: '#111', padding: '4px', borderRadius: '8px', border: '1px solid #222' }}>
                <img src="/Bloopers-Cover-1.jpg" alt="Blooper 1" style={{ width: '100%', borderRadius: '6px', display: 'block' }} />
              </div>
              <div style={{ flex: 1, background: '#111', padding: '4px', borderRadius: '8px', border: '1px solid #222' }}>
                <img src="/Bloopers-Cover-2.jpg" alt="Blooper 2" style={{ width: '100%', borderRadius: '6px', display: 'block' }} />
              </div>
              <div style={{ flex: 1, background: '#111', padding: '4px', borderRadius: '8px', border: '1px solid #222' }}>
                <img src="/Bloopers-Cover-3.jpg" alt="Blooper 3" style={{ width: '100%', borderRadius: '6px', display: 'block' }} />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '45px' }}>
            <h3 style={{ fontSize: '0.85rem', color: '#777', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>Music Tracks</h3>
            <p style={{ fontSize: '1.2rem', letterSpacing: '1px', margin: '4px 0' }}>Unakkul Naane (Pritt)</p>
            <p style={{ fontSize: '1.2rem', letterSpacing: '1px', margin: '4px 0' }}>Childhood (Michael Jackson)</p>
            <p style={{ fontSize: '1.2rem', letterSpacing: '1px', margin: '4px 0' }}>Arabu Naade (Yuvan Shankar Raja)</p>
            <p style={{ fontSize: '1.2rem', letterSpacing: '1px', margin: '4px 0' }}>Iraade (Abdul Hannan)</p>
            <p style={{ fontSize: '1.2rem', letterSpacing: '1px', margin: '4px 0' }}>La petite fille de la mer (Vangelis)</p>
          </div>

          <div style={{ marginBottom: '45px' }}>
            <h3 style={{ fontSize: '0.85rem', color: '#777', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>Special Thanks To</h3>
            <p style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>Everyone who supported the journey</p>
          </div>

          <div style={{ marginTop: '100px', marginBottom: '50px' }}>
            <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#888' }}>"To many more memories to come..."</p>
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
          
          <div style={{ marginTop: '45px', width: '100%', display: 'flex', justifyContent: 'center' }}>
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
