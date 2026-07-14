import React from 'react';
import NavigationButtons from './NavigationButtons';

const BdayBanner = ({ onNext, onPrev }) => {
  return (
    <div className="page-section fade-in" style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #050505, #120b18)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Background Star twinkle animations for space feel */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            background: '#ffb6c1',
            borderRadius: '50%',
            top: `${(i * 13) % 95}%`,
            left: `${(i * 17) % 95}%`,
            opacity: 0.2 + (i % 5) * 0.15,
            animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite alternate ${i * 0.1}s`
          }} />
        ))}
      </div>

      {/* Main Image Wrapper */}
      <div style={{
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '850px',
        width: '90%'
      }}>
        <div style={{
          position: 'relative',
          padding: '8px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '24px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 50px rgba(255, 77, 133, 0.15), inset 0 0 20px rgba(255,255,255,0.02)',
          animation: 'bannerFloat 6s ease-in-out infinite alternate'
        }}>
          <img 
            src="/Happy-Birthday-Nabeelah.png" 
            alt="Happy Birthday Nabeelah" 
            style={{
              width: '100%',
              maxHeight: '65vh',
              objectFit: 'contain',
              borderRadius: '16px',
              display: 'block',
              boxShadow: '0 15px 30px rgba(0,0,0,0.8)'
            }}
          />
        </div>

        {/* Buttons flow naturally underneath */}
        <div style={{ marginTop: '35px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <NavigationButtons onNext={onNext} onPrev={onPrev} />
        </div>
      </div>

      <style>{`
        @keyframes bannerFloat {
          from { transform: translateY(0); }
          to { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
};

export default BdayBanner;
