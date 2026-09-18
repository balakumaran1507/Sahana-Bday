import React, { useState, useRef } from 'react';
import NavigationButtons from './NavigationButtons';

const CakeCut = ({ onNext, onPrev }) => {
  const [isCut, setIsCut] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);
  const [wishText, setWishText] = useState('');
  const [isWishCrafted, setIsWishCrafted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [knifePos, setKnifePos] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 768;
  const isMobile = screenWidth < 768;
  const cakeSize = isMobile ? 220 : 300;
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
      <img src="/flower9.png" alt="decor" className="floating floating-decor" style={{ position: 'absolute', top: '5%', left: '10%', width: '90px', opacity: 0.9, zIndex: 1 }} />
      <img src="/flower10.png" alt="decor" className="floating floating-decor" style={{ position: 'absolute', top: '15%', right: '10%', width: '110px', animationDelay: '0.7s', opacity: 0.9, zIndex: 1 }} />
      <img src="/flower1.png" alt="decor" className="floating floating-decor" style={{ position: 'absolute', bottom: '15%', left: '5%', width: '80px', animationDelay: '1.2s', opacity: 0.9, zIndex: 1 }} />
      <img src="/flower2.png" alt="decor" className="floating floating-decor" style={{ position: 'absolute', bottom: '5%', right: '15%', width: '100px', animationDelay: '0.3s', opacity: 0.9, zIndex: 1 }} />

      {/* Floating Wish Willows */}
      <img src="/one-wish-willow.webp" alt="Wish Willow" className="floating floating-decor" style={{ position: 'absolute', top: '10%', right: '15%', width: '130px', opacity: 0.8, zIndex: 1, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }} />
      <img src="/one-wish-willow.webp" alt="Wish Willow" className="floating floating-decor" style={{ position: 'absolute', bottom: '10%', left: '15%', width: '100px', animationDelay: '1.5s', opacity: 0.6, zIndex: 1, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }} />

      <div className="glass-card fade-in" style={{ maxWidth: '600px', width: '95%', textAlign: 'center', position: 'relative', zIndex: 10, padding: isMobile ? '25px 15px' : '40px' }}>
        <h2 style={{ color: '#ff4d85', marginBottom: '10px', fontSize: isMobile ? '2rem' : '2.5rem', textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}>It's Cake Time! 🎂</h2>
        <p style={{ color: '#555', marginBottom: '25px', fontSize: isMobile ? '1.05rem' : '1.2rem', fontWeight: 600 }}>Make your birthday wish come true!</p>

        <div style={{ background: 'rgba(255, 249, 230, 0.8)', borderRadius: '16px', padding: isMobile ? '20px 10px' : '30px', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontFamily: 'var(--font-cute)', color: '#4a4a4a', marginBottom: '10px', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
            Cut your birthday cake!
          </h3>
          <p style={{ fontSize: '0.95rem', color: '#777', marginBottom: '25px' }}>
            Click and drag down across the cake to slice it!
          </p>

          <div 
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp} // Cancel drag if they leave the area
            style={{
              position: 'relative',
              width: `${cakeSize}px`,
              height: `${cakeSize}px`,
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

            {/* Slicing Guideline */}
            {!isCut && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '2px',
                height: '100%',
                background: 'linear-gradient(to bottom, transparent, #ff4d85 20%, #ff4d85 80%, transparent)',
                borderLeft: '2px dashed #ff4d85',
                zIndex: 15,
                opacity: 0.7,
                pointerEvents: 'none'
              }} />
            )}

            {/* Left and Right cake halves are handled below */}
            
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
                 Drag down to cut!
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
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 20
          }}>
            <style>{`
              @keyframes wishFloatUp {
                0% { transform: translate(-50%, 0) scale(1); opacity: 1; filter: blur(0); }
                70% { opacity: 0.8; filter: blur(0.5px); }
                100% { transform: translate(-50%, -180px) scale(0.65); opacity: 0; filter: blur(4px); }
              }
              @keyframes pulseWillow {
                0%, 100% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(255, 77, 133, 0.3)); }
                50% { transform: scale(1.04); filter: drop-shadow(0 0 25px rgba(255, 77, 133, 0.6)); }
              }
            `}</style>

            <h2 style={{ color: '#ff4d85', marginBottom: '10px', fontSize: '2.2rem', textShadow: '0 2px 8px rgba(255,105,180,0.2)' }}>Time to Make a Wish! ✨</h2>
            
            {/* The One Wish Willow Tree Visual - Now splits when wished! */}
            <div style={{ 
              margin: '15px 0', 
              height: '110px', 
              width: '110px',
              position: 'relative',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              {/* Left Half of Willow */}
              <img 
                src="/one-wish-willow.webp" 
                alt="One Wish Willow Left" 
                style={{ 
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  objectFit: 'contain',
                  clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
                  transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  transform: isWishCrafted ? 'translateX(-20px) rotate(-8deg)' : 'translateX(0) rotate(0)',
                  animation: isWishCrafted ? 'none' : 'pulseWillow 4s ease-in-out infinite'
                }} 
              />
              {/* Right Half of Willow */}
              <img 
                src="/one-wish-willow.webp" 
                alt="One Wish Willow Right" 
                style={{ 
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  objectFit: 'contain',
                  clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
                  transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  transform: isWishCrafted ? 'translateX(20px) rotate(8deg)' : 'translateX(0) rotate(0)',
                  animation: isWishCrafted ? 'none' : 'pulseWillow 4s ease-in-out infinite'
                }} 
              />
            </div>

            <p style={{ fontSize: '1.05rem', color: '#555', marginBottom: '20px', textAlign: 'center', fontWeight: 600 }}>
              Close your eyes, enter your birthday wish below, and craft it into the willow tree.
            </p>

            <input 
              type="text"
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder="Type your secret birthday wish..."
              disabled={isWishCrafted}
              style={{
                width: '85%',
                maxWidth: '380px',
                padding: '12px 20px',
                borderRadius: '25px',
                border: '2px solid #ffb6c1',
                outline: 'none',
                fontSize: '1.05rem',
                fontFamily: 'var(--font-cute)',
                textAlign: 'center',
                boxShadow: '0 5px 15px rgba(255,182,193,0.15)',
                marginBottom: '20px',
                transition: 'all 0.3s',
                pointerEvents: 'auto'
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff4d85'}
              onBlur={(e) => e.target.style.borderColor = '#ffb6c1'}
            />

            <button 
              className="btn-primary" 
              onClick={() => {
                if (!wishText.trim() || isWishCrafted) return;
                setIsWishCrafted(true);
                // Start black overlay fade out after willow split completes
                setTimeout(() => {
                  setIsFadingOut(true);
                }, 1300);
                // Go to next page after fade completes
                setTimeout(() => {
                  onNext();
                }, 2300);
              }}
              disabled={!wishText.trim() || isWishCrafted}
              style={{
                fontSize: '1.1rem',
                padding: '12px 35px',
                borderRadius: '30px',
                background: isWishCrafted ? '#aaa' : 'linear-gradient(45deg, #ff4d85, #ffb6c1)',
                border: 'none',
                color: 'white',
                fontWeight: 'bold',
                cursor: wishText.trim() && !isWishCrafted ? 'pointer' : 'default',
                boxShadow: wishText.trim() && !isWishCrafted ? '0 10px 20px rgba(255,105,180,0.3)' : 'none',
                opacity: wishText.trim() ? 1 : 0.6,
                transition: 'all 0.3s'
              }}
            >
              {isWishCrafted ? 'Crafting Wish... ✨' : 'Craft & Cast Wish 🌟'}
            </button>

            {/* Float-up Crafted Wish Text */}
            {isWishCrafted && (
              <div style={{
                position: 'absolute',
                top: '60%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                fontFamily: 'var(--font-cute)',
                color: '#ff4d85',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                animation: 'wishFloatUp 2.2s ease-out forwards',
                zIndex: 30,
                pointerEvents: 'none',
                textShadow: '0 2px 4px rgba(255,255,255,0.8)'
              }}>
                ✨ "{wishText}" ✨
                <br />
                <span style={{ fontSize: '0.85rem', color: '#ff75a0', fontWeight: 'normal' }}>Woven into the One Wish Willow... 🌸</span>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Black Fade-out Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: '#000',
        zIndex: 99,
        pointerEvents: 'none',
        opacity: isFadingOut ? 1 : 0,
        transition: 'opacity 1.0s ease-in-out'
      }} />

    </div>
  );
};

export default CakeCut;
