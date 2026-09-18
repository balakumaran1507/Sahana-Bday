import React, { useState } from 'react';
import NavigationButtons from './NavigationButtons';

const images = [
  '/sahana1.jpeg', 
  '/sahana2.jpeg', 
  '/sahana3.jpeg', 
  '/sahana4.jpeg', 
  '/sahana5.png'
];

const PhotoGallery = ({ onNext, onPrev }) => {
  const [printedCount, setPrintedCount] = useState(0);
  const [printingState, setPrintingState] = useState('idle'); // idle, sliding, developing, flying
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePrint = () => {
    if (printingState !== 'idle' || printedCount >= images.length) return;
    
    setPrintingState('sliding'); // Card slides out of camera slot
    
    setTimeout(() => {
      setPrintingState('zoomed'); // Card pops to front and zooms in
    }, 600);
    
    setTimeout(() => {
      setPrintingState('flying'); // Card flies to the album in the corner
    }, 2600);
    
    setTimeout(() => {
      setPrintedCount(c => c + 1);
      setPrintingState('idle'); // Reset for next
    }, 3400);
  };

  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 768;
  const isMobile = screenWidth < 768;
  const zoomScale = isMobile ? 1.2 : 1.7;
  const zoomY = isMobile ? '-40px' : '-100px';

  return (
    <div className="page-section fade-in" style={{ 
      minHeight: '100vh', 
      background: 'url(/Memories-bg.avif) center/cover no-repeat',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes pulseAlbum {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); filter: drop-shadow(0 0 20px rgba(255, 105, 180, 0.8)); }
        }
      `}</style>
      
      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, 
        background: 'rgba(255, 182, 193, 0.45)', mixBlendMode: 'soft-light', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', inset: 0, 
        background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', zIndex: 0
      }} />

      {/* Header text */}
      <div style={{ position: 'absolute', top: '8%', width: '100%', textAlign: 'center', zIndex: 10, padding: '0 20px' }}>
        <h2 style={{ 
          fontFamily: "'Great Vibes', cursive", 
          color: '#d53f8c', 
          fontSize: 'clamp(3.5rem, 8vw, 6rem)', 
          margin: 0, 
          textShadow: '0 2px 15px rgba(255, 255, 255, 0.9)',
          lineHeight: '1.2'
        }}>
          Print Our Memories
        </h2>
        <p style={{ 
          color: '#2d3748', 
          fontFamily: 'var(--font-cute)', 
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', 
          textShadow: '0 2px 10px rgba(255,255,255,0.9)', 
          fontWeight: 700,
          marginTop: '10px'
        }}>
          {printedCount < images.length ? "Click the camera to print a photo!" : "All memories printed! ❤️"}
        </p>
      </div>

      {/* Camera & Polaroid Area */}
      <div 
        style={{ position: 'relative', zIndex: 10, cursor: printedCount < images.length ? 'pointer' : 'default', marginTop: '20px' }} 
        onClick={handlePrint}
      >
        
        {/* Animated Polaroid Card */}
        {printingState !== 'idle' && (
          <div style={{
            position: 'absolute',
            bottom: '30px', 
            left: '50%',
            marginLeft: '-110px',
            width: '220px',
            height: '280px',
            background: '#fff',
            padding: '10px 10px 40px 10px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
            borderRadius: '4px',
            zIndex: printingState === 'zoomed' || printingState === 'flying' ? 25 : 5, 
            transform: printingState === 'sliding' ? 'translateY(180px) scale(1) rotate(0deg)'
                     : printingState === 'zoomed' ? `translateY(${zoomY}) scale(${zoomScale}) rotate(2deg)`
                     : printingState === 'flying' ? (isMobile ? 'translate(20vw, 40vh) scale(0.02) rotate(360deg)' : 'translate(30vw, 40vh) scale(0.05) rotate(360deg)')
                     : 'translateY(0) scale(0)',
            opacity: printingState === 'flying' ? 0 : 1,
            transition: printingState === 'sliding' ? 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' 
                       : printingState === 'zoomed' ? 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                       : printingState === 'flying' ? 'transform 0.8s cubic-bezier(0.5, 0, 0.2, 1), opacity 0.6s ease-in'
                       : 'none',
          }}>
             <div style={{ width: '100%', height: '100%', background: '#222', overflow: 'hidden' }}>
                <img 
                  src={images[printedCount]} 
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    objectPosition: printedCount === 3 ? 'top' : 'center',
                    opacity: printingState === 'sliding' ? 0 : 1,
                    transition: 'opacity 1.2s ease-in 0.2s'
                  }} 
                  alt={`Printing memory ${printedCount + 1}`}
                />
             </div>
             <div style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center', fontFamily: 'var(--font-cute)', color: '#444', fontSize: '1.2rem', left: 0, fontWeight: 'bold' }}>
               Memory #{printedCount + 1}
             </div>
          </div>
        )}

        {/* The Camera (Foreground) - Now using true transparent PNG! */}
        <img 
          src="/vintage-poloraid.png" 
          alt="Vintage Polaroid Camera" 
          style={{
            width: '450px',
            maxWidth: '90vw',
            position: 'relative',
            zIndex: 10,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
            transition: 'transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)',
            transform: printingState === 'sliding' ? 'scale(0.97) translateY(5px)' : 'scale(1)'
          }}
        />
      </div>

      {/* Interactive Album in Bottom Right */}
      <div 
        onClick={() => setIsAlbumOpen(true)}
        style={{
          position: 'absolute',
          bottom: '30px',
          right: '5%',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          animation: printingState === 'flying' ? 'pulseAlbum 1s ease 0.8s' : 'none',
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <div style={{
          width: '85px', height: '115px',
          background: 'linear-gradient(135deg, #311042 0%, #12031c 100%)',
          borderRadius: '6px 16px 16px 6px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.5), inset -6px 0 15px rgba(0,0,0,0.4), 0 0 10px rgba(255, 215, 0, 0.15)',
          position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          border: '1.5px solid #d4af37',
          padding: '5px'
        }}>
          {/* Book Spine Ridge */}
          <div style={{ position: 'absolute', left: '10px', top: 0, bottom: 0, width: '3px', background: 'rgba(0,0,0,0.4)', boxShadow: '1px 0 0 rgba(255,255,255,0.1)' }} />
          <div style={{ position: 'absolute', left: '12px', top: 0, bottom: 0, width: '1px', background: 'rgba(255,215,0,0.4)' }} />
          
          {/* Gold Filigree corners */}
          <div style={{ position: 'absolute', top: '4px', right: '4px', width: '6px', height: '6px', borderTop: '1px solid #d4af37', borderRight: '1px solid #d4af37' }} />
          <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '6px', height: '6px', borderBottom: '1px solid #d4af37', borderRight: '1px solid #d4af37' }} />
          
          {/* Mini Polaroid Cover Art */}
          <div style={{
            width: '45px', height: '52px', background: '#fff', padding: '3px 3px 10px 3px', 
            borderRadius: '2px', boxShadow: '0 4px 8px rgba(0,0,0,0.4)', transform: 'rotate(-5deg)',
            marginBottom: '6px', marginTop: '5px'
          }}>
            <div style={{ width: '100%', height: '100%', background: '#ff75a0', overflow: 'hidden' }}>
              <img src="/flower5.png" alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          
          <span style={{ 
            fontFamily: 'var(--font-heading)', color: '#d4af37', fontSize: '0.65rem', 
            letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 'bold',
            textAlign: 'center', textShadow: '0 1px 2px rgba(0,0,0,0.5)', marginLeft: '8px'
          }}>
            Album
          </span>
        </div>
        <div style={{ 
          marginTop: '10px', fontFamily: 'var(--font-main)', color: '#fff', fontWeight: 700, 
          background: 'rgba(0,0,0,0.5)', padding: '4px 15px', borderRadius: '20px',
          backdropFilter: 'blur(5px)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
        }}>
          {printedCount} / {images.length}
        </div>
      </div>

      {/* Album Modal Overlay */}
      {isAlbumOpen && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {/* Close Album Button */}
          <button 
            onClick={() => setIsAlbumOpen(false)}
            style={{
              position: 'absolute', top: '30px', right: '30px',
              background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
              width: '50px', height: '50px', borderRadius: '50%', fontSize: '1.5rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(5px)', transition: 'background 0.2s', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            ✕
          </button>

          <h2 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '3rem', marginBottom: '30px', textShadow: '0 5px 15px rgba(255,105,180,0.5)' }}>
            Memory Album
          </h2>

          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '25px', justifyContent: 'center',
            maxWidth: '1000px', width: '90%', maxHeight: '60vh', overflowY: 'auto',
            padding: '20px'
          }}>
            {images.slice(0, printedCount).map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedPhoto(img)}
                style={{
                  width: '160px', height: '190px', background: '#fff',
                  padding: '10px 10px 35px 10px', borderRadius: '4px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
                  cursor: 'pointer', transform: `rotate(${(idx % 3 - 1) * 3}deg)`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  position: 'relative'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1) rotate(0deg)'; e.currentTarget.style.zIndex = 10; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = `scale(1) rotate(${(idx % 3 - 1) * 3}deg)`; e.currentTarget.style.zIndex = 1; }}
              >
                <div style={{ width: '100%', height: '100%', background: '#222', overflow: 'hidden' }}>
                    <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: img === '/sahana4.jpeg' ? 'top' : 'center' }} alt={`Memory ${idx+1}`} />
                </div>
                <div style={{ position: 'absolute', bottom: '8px', width: '100%', textAlign: 'center', fontFamily: 'var(--font-cute)', color: '#444', fontSize: '1rem', left: 0, fontWeight: 'bold' }}>
                   Memory #{idx + 1}
                </div>
              </div>
            ))}
            {printedCount === 0 && (
              <p style={{ color: '#aaa', fontFamily: 'var(--font-main)', fontSize: '1.2rem', fontStyle: 'italic' }}>Your album is empty. Print some photos first!</p>
            )}
          </div>
        </div>
      )}

      {/* Fullscreen Photo Viewer */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'absolute', inset: 0, zIndex: 110,
            background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(15px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.2s ease-out', cursor: 'zoom-out'
          }}
        >
           {/* Polaroid Frame */}
           <div 
             style={{
               width: '380px',
               maxWidth: '85vw',
               background: '#fff',
               padding: '16px 16px 64px 16px',
               borderRadius: '8px',
               boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
               transform: 'rotate(-1deg)',
               animation: 'zoomIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
               position: 'relative',
               display: 'flex',
               flexDirection: 'column'
             }}
           >
             <div style={{ width: '100%', aspectRatio: '1/1', background: '#222', overflow: 'hidden', borderRadius: '2px' }}>
                <img 
                  src={selectedPhoto} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: selectedPhoto === '/sahana4.jpeg' ? 'top' : 'center' }} 
                  alt="Fullscreen Memory" 
                />
             </div>
             <div style={{ 
               position: 'absolute', 
               bottom: '15px', 
               width: '100%', 
               textAlign: 'center', 
               fontFamily: 'var(--font-cute)', 
               color: '#333', 
               fontSize: '1.8rem', 
               left: 0, 
               fontWeight: 'bold',
               letterSpacing: '1px'
             }}>
                Memory #{images.indexOf(selectedPhoto) + 1}
             </div>
           </div>
           
           <div style={{ marginTop: '30px', color: '#888', fontFamily: 'var(--font-main)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
               Click anywhere to close
           </div>
        </div>
      )}

      {/* Global Navigation (Visible when all printed) */}
      <div style={{ 
        position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 20,
        opacity: printedCount >= images.length ? 1 : 0,
        pointerEvents: printedCount >= images.length ? 'auto' : 'none',
        transition: 'opacity 1.5s ease 0.5s'
      }}>
        <NavigationButtons onNext={onNext} onPrev={onPrev} nextText="Next Chapter →" />
      </div>

    </div>
  );
};

export default PhotoGallery;
