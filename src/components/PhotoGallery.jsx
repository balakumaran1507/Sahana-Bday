import React, { useState } from 'react';
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
  const [dragStartX, setDragStartX] = useState(null);

  const handleNextSlide = () => {
    if (currentSlide < images.length - 1) {
      setCurrentSlide(s => s + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(s => s - 1);
    }
  };

  const handlePointerDown = (e) => {
    setDragStartX(e.clientX || (e.touches && e.touches[0].clientX));
  };

  const handlePointerUp = (e) => {
    if (dragStartX === null) return;
    const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    if (clientX === undefined) return;
    
    const diff = dragStartX - clientX;
    
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
        background: 'url(/bg-morning.png) center/cover no-repeat',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden',
        position: 'relative',
        touchAction: 'none'
      }}
    >
      {/* Soft overlay to make polaroids pop */}
      <div style={{
        position: 'absolute', inset: 0, 
        background: 'rgba(255, 255, 255, 0.5)', 
        backdropFilter: 'blur(15px)', zIndex: 0
      }} />

      {/* Title */}
      <div style={{ 
        position: 'absolute', 
        top: '10%', 
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <h2 style={{ 
          fontFamily: 'var(--font-heading)', 
          color: '#ff75a0', 
          fontSize: '2.5rem',
          letterSpacing: '2px',
          textShadow: '0 2px 10px rgba(255,255,255,0.8)',
          margin: 0
        }}>
          Memory Lane
        </h2>
        <p style={{ color: '#666', fontFamily: 'var(--font-main)', marginTop: '10px', fontWeight: 600 }}>
          Swipe left to view 💖
        </p>
      </div>

      {/* Floating Polaroid Stack */}
      <div style={{ 
        position: 'relative', 
        width: '300px', 
        height: '420px',
        marginTop: '20px',
        zIndex: 10,
        cursor: dragStartX !== null ? 'grabbing' : 'grab'
      }}>
        
        {images.map((src, idx) => {
          const isPast = idx < currentSlide;
          const isCurrent = idx === currentSlide;
          
          // Random rotation for the stacked look, seeded by index
          const baseRotation = (idx % 2 === 0 ? 1 : -1) * (idx * 4 + 2);
          
          let transform = '';
          let opacity = 1;
          
          if (isPast) {
             // Swiped away to the left
             transform = `translateX(-150vw) rotate(-45deg)`;
             opacity = 0;
          } else if (isCurrent) {
             // Active card, perfectly straight
             transform = `translateX(0px) rotate(0deg) scale(1.05)`;
          } else {
             // Stacked beneath
             transform = `translateX(${ (idx - currentSlide) * 8 }px) translateY(${ (idx - currentSlide) * 8 }px) rotate(${baseRotation}deg)`;
          }

          return (
            <div key={idx} style={{
              position: 'absolute', top: 0, left: 0, 
              width: '100%', height: '100%',
              background: '#fff', 
              padding: '15px 15px 70px 15px',
              borderRadius: '4px', 
              boxShadow: isCurrent ? '0 25px 50px rgba(0,0,0,0.3)' : '0 10px 20px rgba(0,0,0,0.15)',
              transform, 
              opacity,
              transition: dragStartX !== null ? 'none' : 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)', 
              zIndex: 100 - idx,
              pointerEvents: 'none', 
              userSelect: 'none',
              display: 'flex', flexDirection: 'column'
            }}>
              
              {/* Tape Detail for that physical aesthetic */}
              <div style={{
                position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%) rotate(-3deg)',
                width: '120px', height: '35px', background: 'rgba(255, 255, 255, 0.45)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)', backdropFilter: 'blur(3px)', zIndex: 10
              }} />

              {/* PERFECTLY SIZED IMAGE CONTAINER */}
              <div style={{
                width: '100%',
                flex: 1,
                overflow: 'hidden',
                backgroundColor: '#eee'
              }}>
                <img 
                  src={src} 
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover', // This prevents ANY layout breaking!
                    userSelect: 'none', 
                    pointerEvents: 'none',
                  }} 
                  alt={`Memory ${idx + 1}`} 
                  draggable="false"
                />
              </div>

              <div style={{ 
                position: 'absolute', bottom: '22px', left: 0, width: '100%', 
                textAlign: 'center', fontFamily: 'var(--font-cute)', color: '#444',
                fontSize: '1.6rem', fontWeight: 'bold'
              }}>
                Memory #{idx + 1}
              </div>
            </div>
          )
        })}

      </div>

      {/* Global Navigation (Visible when on the last slide) */}
      <div style={{ 
        position: 'absolute', bottom: '8%', zIndex: 20,
        opacity: currentSlide === images.length - 1 ? 1 : 0,
        pointerEvents: currentSlide === images.length - 1 ? 'auto' : 'none',
        transition: 'opacity 0.8s ease 0.5s'
      }}>
        <NavigationButtons onNext={onNext} onPrev={onPrev} nextText="Next Chapter →" />
      </div>

    </div>
  );
};

export default PhotoGallery;
