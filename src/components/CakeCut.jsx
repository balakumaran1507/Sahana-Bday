import React, { useState, useRef } from 'react';
import NavigationButtons from './NavigationButtons';

const CakeCut = ({ onNext, onPrev }) => {
  const [isCut, setIsCut] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);
  const [knifePos, setKnifePos] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);

  const handlePointerDown = (e) => {
    if (isCut) return;
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    startYRef.current = e.clientY - rect.top;
    setKnifePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handlePointerMove = (e) => {
    if (!isDragging || isCut) return;
    const rect = containerRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const x = e.clientX - rect.left;
    currentYRef.current = y;
    setKnifePos({ x, y });
  };

  const handlePointerUp = () => {
    if (!isDragging || isCut) return;
    setIsDragging(false);
    setKnifePos(null);
    
    // If they dragged down by at least 80px, it's a successful cut!
    if (currentYRef.current - startYRef.current > 80) {
      setIsCut(true);
      setTimeout(() => {
        setShowWishModal(true);
      }, 2000); // 2 second split animation before modal
    }
  };

  return (
    <div 
      className="page-section" 
      style={{ 
        minHeight: '100vh', 
        background: 'url(/bg-2-morning.jpg) center/cover no-repeat', 
        position: 'relative', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Light Overlay for readability against morning background */}
      <div style={{
        position: 'absolute', inset: 0, 
        background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(3px)', zIndex: 0
      }} />

      {/* Decor */}
      <img src="/flower9.png" alt="decor" className="floating" style={{ position: 'absolute', top: '5%', left: '10%', width: '90px', opacity: 0.9, zIndex: 1 }} />
      <img src="/flower10.png" alt="decor" className="floating" style={{ position: 'absolute', top: '15%', right: '10%', width: '110px', animationDelay: '0.7s', opacity: 0.9, zIndex: 1 }} />
      <img src="/flower1.png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '15%', left: '5%', width: '80px', animationDelay: '1.2s', opacity: 0.9, zIndex: 1 }} />
      <img src="/flower2.png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '5%', right: '15%', width: '100px', animationDelay: '0.3s', opacity: 0.9, zIndex: 1 }} />

      <div className="glass-card fade-in" style={{ maxWidth: '600px', width: '90%', textAlign: 'center', position: 'relative', zIndex: 10, padding: '40px' }}>
        <h2 style={{ color: '#ff4d85', marginBottom: '10px', fontSize: '2.5rem', textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}>It's Cake Time! 🎂</h2>
        <p style={{ color: '#555', marginBottom: '30px', fontSize: '1.2rem', fontWeight: 600 }}>Make your birthday wish come true!</p>

        <div style={{ background: 'rgba(255, 249, 230, 0.8)', borderRadius: '16px', padding: '30px', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontFamily: 'var(--font-cute)', color: '#4a4a4a', marginBottom: '10px', fontSize: '1.8rem' }}>
            Cut your birthday cake! 🔪
          </h3>
          <p style={{ fontSize: '1rem', color: '#777', marginBottom: '30px' }}>
            Click and drag down across the cake to slice it! ✂️
          </p>

          <div 
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp} // Cancel drag if they leave the area
            style={{
              position: 'relative',
              width: '300px',
              height: '300px',
              margin: '0 auto',
              cursor: isCut ? 'default' : 'crosshair',
              touchAction: 'none' // Prevent scrolling on mobile while cutting
            }}
          >
            {/* The Cake - Left Half */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'url(/3d_birthday_cake.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
              transition: 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
              transform: isCut ? 'translateX(-40px) rotate(-10deg)' : 'translateX(0) rotate(0)',
              filter: isCut ? 'drop-shadow(-10px 10px 15px rgba(0,0,0,0.2))' : 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))'
            }} />
            
            {/* The Cake - Right Half */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'url(/3d_birthday_cake.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
              transition: 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
              transform: isCut ? 'translateX(40px) rotate(10deg)' : 'translateX(0) rotate(0)',
              filter: isCut ? 'drop-shadow(10px 10px 15px rgba(0,0,0,0.2))' : 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' // Note: Safari drop-shadow on clip-path can sometimes be quirky, but it works great in modern browsers
            }} />

            {/* Magic Burst when Cut */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '10px',
              height: '10px',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 0 50px 30px #ffb6c1, 0 0 100px 60px #fff',
              opacity: isCut ? 0.9 : 0,
              transition: 'opacity 1s ease-in, transform 1.5s ease-out',
              transform: isCut ? 'translate(-50%, -50%) scale(6)' : 'translate(-50%, -50%) scale(0.1)',
              pointerEvents: 'none',
              zIndex: 5
            }} />
            
            {/* Knife Follower */}
            {isDragging && knifePos && !isCut && (
               <div style={{
                 position: 'absolute',
                 top: knifePos.y - 15,
                 left: knifePos.x - 15,
                 fontSize: '30px',
                 pointerEvents: 'none',
                 zIndex: 20,
                 filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.3))'
               }}>
                 🔪
               </div>
            )}
            
            {!isCut && !isDragging && (
               <div className="floating" style={{
                 position: 'absolute',
                 top: '10%',
                 left: '50%',
                 transform: 'translateX(-50%)',
                 background: 'rgba(255,255,255,0.9)',
                 padding: '8px 15px',
                 borderRadius: '20px',
                 fontSize: '0.9rem',
                 boxShadow: '0 5px 15px rgba(255,105,180,0.3)',
                 color: '#ff4d85',
                 fontWeight: 'bold',
                 pointerEvents: 'none',
                 whiteSpace: 'nowrap',
                 zIndex: 10
               }}>
                 Drag down to cut! ⬇️
               </div>
            )}
          </div>
          
        </div>

        {/* Global Navigation is hidden until wish is made. We can keep a back button if they want to go back. */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 30 }}>
            <button onClick={onPrev} style={{ background: 'transparent', border: 'none', color: '#ff4d85', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>← Back</button>
        </div>

        {showWishModal && (
          <div className="fade-in" style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 20
          }}>
            <h2 style={{ color: '#ff4d85', marginBottom: '20px', fontSize: '2.5rem', textShadow: '0 2px 10px rgba(255,105,180,0.3)' }}>Time to Make a Wish! ✨</h2>
            <p style={{ fontSize: '1.3rem', color: '#555', marginBottom: '40px', textAlign: 'center', lineHeight: '1.6' }}>
              Close your eyes and make your birthday wish! 🌟<br/><br/>
              <span style={{ fontSize: '1rem', color: '#888', fontStyle: 'italic' }}>Think of something truly wonderful...</span>
            </p>
            <button 
              className="btn-primary" 
              onClick={onNext}
              style={{
                fontSize: '1.2rem',
                padding: '15px 40px',
                borderRadius: '30px',
                background: 'linear-gradient(45deg, #ff4d85, #ffb6c1)',
                border: 'none',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(255,105,180,0.4)'
              }}
            >
              I've Made My Wish! 💖
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CakeCut;
