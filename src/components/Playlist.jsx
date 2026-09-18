import React, { useState, useEffect } from 'react';
import NavigationButtons from './NavigationButtons';

const TRACKS = [
  { id: '5h3HxhOLripvupwSg686By', text: "Your music choices are just as beautiful as you are ✨" },
  { id: '317JrLcl1s0i6cXmnEWzR8', text: "The #2 track just for you..." },
  { id: '5KJSI1MjQeXEBHBYMjgP41', text: "Coming in at #3..." },
  { id: '3KkXRkHbMCARz0aVfEt68P', text: "And one more for the road! 💖" },
];

const Playlist = ({ onNext, onPrev }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [fadeOpacity, setFadeOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOpacity(0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleNextTrack = () => {
    if (currentIndex < TRACKS.length - 1 && !animating) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex(c => c + 1);
        setAnimating(false);
      }, 500); // 500ms slide out animation matches CSS
    }
  };

  const isLast = currentIndex === TRACKS.length - 1;
  const track = TRACKS[currentIndex];

  return (
    <div className="page-section fade-in" style={{ 
      minHeight: '100vh', 
      background: 'url(/Vibes-bg.avif) center/cover no-repeat', 
      position: 'relative', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      
      {/* Dark overlay for that Spotify Wrapped contrast */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', zIndex: 0 }} />

      <style>{`
        @keyframes slideInTape {
          from { transform: translateX(100vw) rotate(10deg); opacity: 0; }
          to { transform: translateX(0) rotate(0deg); opacity: 1; }
        }
        @keyframes slideOutTape {
          from { transform: translateX(0) rotate(0deg); opacity: 1; }
          to { transform: translateX(-100vw) rotate(-10deg); opacity: 0; }
        }
        @keyframes spinRecord {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .wrapped-text {
          font-family: 'Inter', 'Segoe UI', sans-serif; /* Standard wrapped style font */
          font-weight: 900;
          text-transform: uppercase;
          line-height: 1.2;
          background: linear-gradient(90deg, #ff4d85, #ffb6c1, #ff4d85); /* Soft pink/peach */
          background-size: 200% auto;
          color: #fff;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shineText 3s linear infinite, slideInTape 0.5s ease-out;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }
        @keyframes shineText {
          to { background-position: 200% center; }
        }
        .recorder-ui {
          animation: slideInTape 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .recorder-ui.animating {
          animation: slideOutTape 0.5s cubic-bezier(0.8, 0.2, 1, 0.2) forwards;
        }
        .next-btn:hover {
            transform: scale(1.05);
        }
        .next-btn:active {
            transform: scale(0.95);
        }
      `}</style>

      {/* Dynamic Text */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginBottom: '50px', maxWidth: '800px', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 key={currentIndex} className="wrapped-text" style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          margin: 0
        }}>
          {track.text}
        </h1>
      </div>

      {/* The Retro Recorder UI */}
      <div className={`recorder-ui ${animating ? 'animating' : ''}`} style={{
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(145deg, #2a2a2a, #151515)',
        padding: '25px',
        borderRadius: '24px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 2px 2px rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '450px',
        border: '1px solid #333'
      }}>
        
        {/* Spinning Vinyl Record Visual */}
        <div style={{ 
          position: 'absolute', top: '-50px', right: '-40px', zIndex: -1, 
          width: '140px', height: '140px', background: '#111', borderRadius: '50%', 
          border: '6px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          boxShadow: '0 15px 25px rgba(0,0,0,0.6)', animation: 'spinRecord 4s linear infinite' 
        }}>
          {/* Grooves */}
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '1px solid #333' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '1px solid #333', margin: '9px auto' }}>
              {/* Center Label */}
              <div style={{ width: '50px', height: '50px', background: 'linear-gradient(45deg, #ff4d85, #121212)', borderRadius: '50%', margin: '14px auto', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '12px', height: '12px', background: '#000', borderRadius: '50%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Spotify Iframe */}
        <div style={{ background: '#000', borderRadius: '12px', padding: '5px', width: '100%', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)' }}>
            <iframe 
            style={{ borderRadius: '12px', background: 'transparent' }} 
            src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`} 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            ></iframe>
        </div>

        {/* Recorder Controls */}
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px', padding: '0 10px' }}>
          <div style={{ color: '#666', fontFamily: 'monospace', fontSize: '14px', letterSpacing: '2px' }}>TAPE {currentIndex + 1}/{TRACKS.length}</div>
          
          {!isLast ? (
            <button 
              className="next-btn"
              onClick={handleNextTrack}
              style={{
                background: 'linear-gradient(45deg, #ff4d85, #ffb6c1)', /* Soft pink/peach gradient */
                border: 'none',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '30px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'var(--font-main)',
                boxShadow: '0 4px 15px rgba(255, 77, 133, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'transform 0.2s ease'
              }}
            >
              Next Track ⏭
            </button>
          ) : (
            <div style={{ color: '#ff4d85', fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: '2px' }}>END OF TAPE 📼</div>
          )}
        </div>
      </div>

      {/* Global Navigation - Only show when all tracks are done! */}
      <div style={{ 
        zIndex: 20,
        opacity: isLast ? 1 : 0,
        pointerEvents: isLast ? 'auto' : 'none',
        transition: 'opacity 1.5s ease 0.5s',
        marginTop: '30px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <NavigationButtons onNext={onNext} onPrev={onPrev} nextText="Next Chapter →" />
      </div>

      {/* Black Fade-in Overlay */}
      {fadeOpacity > 0 && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#000',
          zIndex: 99,
          pointerEvents: 'none',
          opacity: fadeOpacity,
          transition: 'opacity 1.2s ease-in-out'
        }} />
      )}

    </div>
  );
};

export default Playlist;
