import React, { useState } from 'react';
import NavigationButtons from './NavigationButtons';

const CakeCut = ({ onNext, onPrev }) => {
  const [isCut, setIsCut] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);

  const handleCut = () => {
    if (isCut) return;
    setIsCut(true);
    setTimeout(() => {
      setShowWishModal(true);
    }, 1500);
  };

  return (
    <div className="page-section" style={{ minHeight: '100vh', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      
      {/* New Decor */}
      <img src="/pngwing.com (4).png" alt="decor" className="floating" style={{ position: 'absolute', top: '5%', left: '10%', width: '90px', opacity: 0.9 }} />
      <img src="/pngwing.com (5).png" alt="decor" className="floating" style={{ position: 'absolute', top: '15%', right: '10%', width: '110px', animationDelay: '0.7s', opacity: 0.9 }} />
      <img src="/pngwing.com (6).png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '15%', left: '5%', width: '80px', animationDelay: '1.2s', opacity: 0.9 }} />
      <img src="/pngwing.com (7).png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '5%', right: '15%', width: '100px', animationDelay: '0.3s', opacity: 0.9 }} />

      <div className="glass-card fade-in" style={{ maxWidth: '500px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <h2 style={{ color: '#ff4d85', marginBottom: '10px' }}>It's Cake Time! 🎂</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>Make your birthday wish come true!</p>

        <div style={{ background: '#fff9e6', borderRadius: '16px', padding: '30px', position: 'relative' }}>
          <h3 style={{ fontFamily: 'var(--font-cute)', color: '#4a4a4a', marginBottom: '10px' }}>
            Cut your birthday cake, birthday girl! 🔪
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '30px' }}>
            Tap or drag across the cake to cut it ✂️
          </p>

          <div 
            onClick={handleCut}
            style={{
              position: 'relative',
              width: '250px',
              height: '250px',
              margin: '0 auto',
              cursor: 'pointer',
              transition: 'transform 0.3s'
            }}
          >
            <div style={{
              fontSize: '120px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) ${isCut ? 'scale(1.1)' : 'scale(1)'}`,
              transition: 'all 0.5s ease-in-out'
            }}>
              🎂
            </div>
            
            {isCut && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '-10%',
                width: '120%',
                height: '4px',
                background: '#ff4d85',
                transform: 'rotate(-10deg)',
                boxShadow: '0 0 10px #ff4d85',
                animation: 'expandLine 0.5s forwards'
              }} />
            )}
            
            {!isCut && (
               <div className="floating" style={{
                 position: 'absolute',
                 top: '30%',
                 left: '10%',
                 background: 'white',
                 padding: '5px 10px',
                 borderRadius: '20px',
                 fontSize: '0.8rem',
                 boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                 color: '#ff4d85',
                 fontWeight: 'bold'
               }}>
                 Drag here to cut! ✂️
               </div>
            )}
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            width: '80px',
            height: '80px',
            background: 'url(/cat_cake_meme.png) center/cover',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            transform: 'rotate(15deg)'
          }} />
        </div>

        {!showWishModal && <NavigationButtons onNext={onNext} onPrev={onPrev} />}

        {showWishModal && (
          <div className="fade-in" style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 20
          }}>
            <h2 style={{ color: '#ff4d85', marginBottom: '20px' }}>Time to Make a Wish! ✨</h2>
            <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '30px', textAlign: 'center' }}>
              Close your eyes and make your birthday wish! 🌟<br/><br/>
              <span style={{ fontSize: '0.8rem', color: '#999' }}>Think of something wonderful...</span>
            </p>
            <button className="btn-primary" onClick={onNext}>
              I've Made My Wish!
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes expandLine {
          from { width: 0; left: 50%; opacity: 0; }
          to { width: 120%; left: -10%; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CakeCut;
