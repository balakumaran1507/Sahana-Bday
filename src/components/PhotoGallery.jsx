import React, { useState, useRef } from 'react';
import NavigationButtons from './NavigationButtons';

const images = [
  '/memory-1.jpeg', 
  '/memory-2.jpeg', 
  '/memory-3.jpeg', 
  '/memory-4.jpeg', 
  '/memory-5.jpeg'
];

const PhotoGallery = ({ onNext, onPrev }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [phase, setPhase] = useState('slideshow'); // 'slideshow', 'stacking', 'closing', 'done'
  const [dragStartX, setDragStartX] = useState(null);

  const handleNextSlide = () => {
    if (currentSlide === images.length - 1) {
      setPhase('stacking');
      setTimeout(() => setPhase('closing'), 1200);
      setTimeout(() => setPhase('done'), 3000);
    } else {
      setCurrentSlide(s => Math.min(images.length - 1, s + 1));
    }
  };

  const handlePrevSlide = () => {
    setCurrentSlide(s => Math.max(0, s - 1));
  };

  // Touch & Drag Handling for Swipe
  const handlePointerDown = (e) => {
    if (phase !== 'slideshow') return;
    setDragStartX(e.clientX || (e.touches && e.touches[0].clientX));
  };

  const handlePointerUp = (e) => {
    if (phase !== 'slideshow' || dragStartX === null) return;
    const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    if (clientX === undefined) return;
    
    const diff = dragStartX - clientX;
    
    // Swipe threshold of 50px
    if (diff > 50) {
      handleNextSlide();
    } else if (diff < -50) {
      handlePrevSlide();
    }
    setDragStartX(null);
  };

  return (
    <div 
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
      style={{ 
        minHeight: '100vh', 
        background: '#0a0a0a', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        perspective: '1500px', 
        overflow: 'hidden',
        position: 'relative',
        touchAction: 'none' // Prevent default scroll when swiping
      }}
    >
      
      {/* Required for the cursive font on the album cover */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        
        .fade-in-slow {
          animation: slowFade 1s ease-in forwards;
        }
        @keyframes slowFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Title (Only during slideshow) */}
      <div style={{ 
        position: 'absolute', 
        top: '10%', 
        opacity: phase === 'slideshow' ? 1 : 0, 
        transition: 'opacity 0.5s',
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
        <h2 style={{ 
          fontFamily: 'var(--font-heading)', 
          color: '#ffb6c1', 
          fontSize: '2rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          margin: 0
        }}>
          A Trip Down Memory Lane
        </h2>
        <p style={{ color: '#888', fontFamily: 'var(--font-main)', marginTop: '10px' }}>
          Swipe to view our favorite moments.
        </p>
      </div>

      {/* 3D Album & Cards Container */}
      <div style={{ 
        position: 'relative', 
        width: '320px', 
        height: '353px', // Exactly 296px height + 12px top padding + 45px bottom padding = perfect square image (296x296)
        transformStyle: 'preserve-3d',
        marginTop: '20px',
        cursor: phase === 'slideshow' ? (dragStartX !== null ? 'grabbing' : 'grab') : 'default'
      }}>
        
        {/* Album Back Cover (Visible when stacked) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(135deg, #151515, #0a0a0a)', 
          border: '2px solid #b8860b', 
          borderRadius: '4px 15px 15px 4px',
          opacity: phase === 'slideshow' ? 0 : 1, 
          transition: 'opacity 0.8s', 
          zIndex: -1,
          boxShadow: '10px 10px 30px rgba(0,0,0,0.8)'
        }} />

        {/* The Photos */}
        {images.map((src, idx) => {
          const isSlideshow = phase === 'slideshow';
          const offset = idx - currentSlide;
          
          let transform = '';
          let opacity = 1;
          
          if (isSlideshow) {
             transform = `translateX(${offset * 125}%) scale(${offset === 0 ? 1 : 0.8}) rotateY(${offset * -15}deg)`;
             opacity = Math.abs(offset) > 1 ? 0 : (offset === 0 ? 1 : 0.4);
          } else {
             // Stacking animation
             transform = `translateX(0) scale(0.9) rotate(${(idx - 2) * 2}deg)`;
             opacity = 1;
          }

          return (
            <div key={idx} style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: '#fff', padding: '12px 12px 45px 12px', // Polaroid style padding
              borderRadius: '8px', 
              boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
              transform, 
              opacity,
              transition: dragStartX !== null ? 'none' : 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)', // Remove transition while dragging if we wanted live drag, but for swipe this just keeps it crisp
              zIndex: isSlideshow ? 10 - Math.abs(offset) : idx,
              pointerEvents: 'none', // Let the container handle drag events
              userSelect: 'none'
            }}>
              <img 
                src={src} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: idx === 0 ? 'fill' : 'cover', 
                  borderRadius: '4px',
                  backgroundColor: '#eee',
                  userSelect: 'none',
                  pointerEvents: 'none'
                }} 
                alt={`Memory ${idx + 1}`} 
                draggable="false"
              />
              <div style={{ 
                position: 'absolute', bottom: '12px', left: 0, width: '100%', 
                textAlign: 'center', fontFamily: 'var(--font-cute)', color: '#444',
                fontSize: '1.1rem', fontWeight: 'bold'
              }}>
                Memory #{idx + 1}
              </div>
            </div>
          )
        })}

        {/* Album Front Cover */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(135deg, #151515, #222)',
          border: '2px solid #b8860b',
          borderRadius: '4px 15px 15px 4px',
          transformOrigin: 'left center',
          // Start completely open (-170deg) during stacking, then close to 0deg
          transform: phase === 'closing' || phase === 'done' ? 'rotateY(0deg)' : 'rotateY(-170deg)',
          opacity: phase === 'slideshow' ? 0 : 1,
          transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s',
          zIndex: 20,
          boxShadow: phase === 'closing' || phase === 'done' 
            ? 'inset 5px 0 15px rgba(0,0,0,0.9), 25px 25px 40px rgba(0,0,0,0.8)' 
            : 'inset 5px 0 15px rgba(0,0,0,0.9), -15px 15px 30px rgba(0,0,0,0.5)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none'
        }}>
           {/* Book spine line styling */}
           <div style={{ 
             position: 'absolute', left: '12px', top: 0, bottom: 0, width: '4px', 
             background: 'rgba(0,0,0,0.8)', boxShadow: '1px 0 2px rgba(255,255,255,0.15)' 
           }} />
           
           {/* Cover Text */}
           <div style={{ 
             fontFamily: "'Great Vibes', cursive", 
             fontSize: '3.5rem', 
             color: '#b8860b', 
             textShadow: '0 2px 10px rgba(0,0,0,0.8)',
             opacity: phase === 'closing' || phase === 'done' ? 1 : 0,
             transition: 'opacity 0.8s ease-in 0.6s' // Delayed fade in as it closes
           }}>
             Memories
           </div>
        </div>

      </div>

      {/* Hidden Slideshow Controls (For users without touch/mouse drag) */}
      <div style={{ 
        position: 'absolute', 
        bottom: '12%', 
        display: 'flex', 
        gap: '20px',
        opacity: phase === 'slideshow' ? 1 : 0,
        pointerEvents: phase === 'slideshow' ? 'auto' : 'none',
        transition: 'opacity 0.5s'
      }}>
        {/* We keep the finish button just in case they don't know they can swipe the last one, or to explicitly finish */}
        {currentSlide === images.length - 1 && (
          <button 
            onClick={handleNextSlide}
            style={{ 
              padding: '12px 30px', borderRadius: '30px', background: 'rgba(255,182,193,0.1)', 
              border: '1px solid rgba(255,182,193,0.5)', color: '#ffb6c1', cursor: 'pointer',
              fontFamily: 'var(--font-main)', textTransform: 'uppercase', letterSpacing: '2px', transition: 'all 0.3s'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,182,193,0.2)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,182,193,0.1)'}
          >
            Close Album
          </button>
        )}
      </div>

      {/* Final Global Navigation (Visible only when album is fully closed) */}
      {phase === 'done' && (
        <div className="fade-in-slow" style={{ position: 'absolute', bottom: '10%' }}>
          <NavigationButtons onNext={onNext} onPrev={onPrev} nextText="Next Chapter →" />
        </div>
      )}

    </div>
  );
};

export default PhotoGallery;
