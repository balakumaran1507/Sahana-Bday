import React from 'react';
import NavigationButtons from './NavigationButtons';

const Playlist = ({ onNext, onPrev }) => {
  return (
    <div className="page-section" style={{ minHeight: '100vh', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      
      {/* New Decor */}
      <img src="/flower1.png" alt="decor" className="floating" style={{ position: 'absolute', top: '15%', left: '8%', width: '100px', opacity: 0.8 }} />
      <img src="/flower2.png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '20%', left: '12%', width: '120px', animationDelay: '0.9s', opacity: 0.8 }} />
      <img src="/flower3.png" alt="decor" className="floating" style={{ position: 'absolute', top: '10%', right: '10%', width: '90px', animationDelay: '0.4s', opacity: 0.8 }} />
      <img src="/flower4.png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '15%', right: '5%', width: '110px', animationDelay: '1.1s', opacity: 0.8 }} />

      <div className="glass-card fade-in" style={{ maxWidth: '600px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#fff' }}>Vibes ✨</h2>
        <p style={{ marginBottom: '30px', color: '#f0f0f0' }}>Your favorite songs, all in one place.</p>
        
        <div style={{
          background: 'rgba(255,255,255,0.8)',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <iframe 
            data-testid="embed-iframe" 
            style={{ borderRadius: '12px' }} 
            src="https://open.spotify.com/embed/track/6EivvaEepVTjmDde43eGiB?utm_source=generator&si=f812c94171ae4da7" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>

        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>
    </div>
  );
};

export default Playlist;
