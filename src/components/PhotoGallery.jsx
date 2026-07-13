import React from 'react';
import { Camera } from 'lucide-react';
import NavigationButtons from './NavigationButtons';

const PhotoGallery = ({ onNext, onPrev }) => {
  return (
    <div className="page-section" style={{ minHeight: '100vh', background: 'var(--pastel-peach)', position: 'relative', overflow: 'hidden' }}>
      
      {/* New Decor */}
      <img src="/pngwing.com.png" alt="decor" className="floating" style={{ position: 'absolute', top: '10%', left: '5%', width: '90px', opacity: 0.8 }} />
      <img src="/pngwing.com (1).png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '15%', left: '8%', width: '110px', animationDelay: '0.5s', opacity: 0.8 }} />
      <img src="/pngwing.com (2).png" alt="decor" className="floating" style={{ position: 'absolute', top: '20%', right: '5%', width: '100px', animationDelay: '1s', opacity: 0.8 }} />
      <img src="/pngwing.com (3).png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '10%', right: '8%', width: '120px', animationDelay: '1.5s', opacity: 0.8 }} />

      <div className="glass-card fade-in" style={{ maxWidth: '800px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>I saved these for you lol 📸</h2>
        <p style={{ marginBottom: '30px', color: '#555' }}>A little trip down memory lane with our favorite moments.</p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          padding: '10px'
        }}>
          {/* Placeholders for photos */}
          {[1, 2, 3, 4].map((item) => (
            <div key={item} style={{
              background: 'white',
              padding: '10px',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              transform: `rotate(${Math.random() * 6 - 3}deg)`,
              transition: 'transform 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = `rotate(${Math.random() * 6 - 3}deg)`}
            >
              <div style={{
                backgroundColor: '#eee',
                width: '100%',
                aspectRatio: '1',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#aaa',
                marginBottom: '10px'
              }}>
                <Camera size={32} />
              </div>
              <p style={{ fontFamily: 'var(--font-cute)', fontWeight: 600, color: '#333' }}>Memory #{item}</p>
            </div>
          ))}
        </div>

        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>
    </div>
  );
};

export default PhotoGallery;
