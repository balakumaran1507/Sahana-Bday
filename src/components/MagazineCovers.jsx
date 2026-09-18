import React from 'react';
import NavigationButtons from './NavigationButtons';

const containerStyle = {
  minHeight: '100vh',
  background: 'rgba(0,0,0,0.6)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  position: 'relative',
  overflow: 'hidden'
};

export const MagazineIntro = ({ onNext, onPrev }) => {
  return (
    <div className="page-section fade-in" style={{
      ...containerStyle,
      background: '#050505', // High fashion pure black
    }}>
      <div style={{ maxWidth: '800px', textAlign: 'center', zIndex: 10 }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          color: '#fff',
          letterSpacing: '10px',
          textTransform: 'uppercase',
          marginBottom: '40px',
          textShadow: '0 0 30px rgba(255,255,255,0.2)',
          animation: 'fashionReveal 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          opacity: 0,
          transform: 'translateY(50px) scale(0.95)'
        }}>
          How I See Nabeelah
        </h2>
        
        <div style={{
           width: '1px', height: '0px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
           margin: '0 auto 40px auto',
           animation: 'fadeInLine 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 1s',
           opacity: 0
        }} />

        <p style={{
          fontFamily: 'var(--font-cute)',
          fontSize: '1.4rem',
          color: '#ccc',
          fontStyle: 'italic',
          letterSpacing: '3px',
          animation: 'fashionReveal 2s cubic-bezier(0.16, 1, 0.3, 1) forwards 1.5s',
          opacity: 0,
          transform: 'translateY(30px)'
        }}>
          (Just between us... I think you're going to absolutely love these!)
        </p>
        
        <p style={{
          fontFamily: 'var(--font-main)',
          fontSize: '1.2rem',
          color: '#888',
          marginTop: '60px',
          lineHeight: '2',
          animation: 'fashionReveal 2s cubic-bezier(0.16, 1, 0.3, 1) forwards 2.5s',
          opacity: 0,
          transform: 'translateY(30px)',
          fontWeight: 300,
          letterSpacing: '1px'
        }}>
          You might see yourself one way, but this is exactly how I see you. <br/><br/>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.4rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            A breathtaking masterpiece I CREATED.
          </span>
          <br/><br/><br/>
          <span style={{ fontSize: '0.95rem', color: '#aaa', fontStyle: 'italic', fontWeight: 500 }}>
            Or, you might just kill me for making this... but honestly, it's a gamble I'm more than willing to take! 😉
          </span>
        </p>
      </div>
      
      <div style={{ zIndex: 20, animation: 'fadeInNav 2s ease forwards 4s', opacity: 0, marginTop: '35px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>

      <style>{`
        @keyframes fashionReveal {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeInLine {
          to { opacity: 1; height: 80px; }
        }
        @keyframes fadeInNav {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const CoverSlide = ({ imageSrc, title, subtitle, onNext, onPrev, floatAnim }) => (
  <div className="page-section fade-in" style={containerStyle}>
    
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `url('${imageSrc}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(20px) brightness(0.2)',
      transform: 'scale(1.1)',
      zIndex: 0
    }} />

    <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p style={{
        fontFamily: 'var(--font-cute)', color: '#fff', letterSpacing: '8px', 
        fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '20px',
        animation: 'fadeIn 1s ease'
      }}>
        {subtitle}
      </p>
      
      <img 
        src={imageSrc} 
        alt={title}
        style={{
          height: '60vh',
          maxHeight: '600px',
          objectFit: 'contain',
          borderRadius: '10px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.1)',
          animation: `${floatAnim} 6s ease-in-out infinite alternate`,
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      />
      
      <h3 style={{
        fontFamily: 'var(--font-heading)', color: '#fff', letterSpacing: '4px',
        fontSize: '1.5rem', marginTop: '30px', textTransform: 'uppercase',
        animation: 'fadeIn 1.5s ease'
      }}>
        {title}
      </h3>
    </div>

    <div style={{ zIndex: 20, marginTop: '30px', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <NavigationButtons onNext={onNext} onPrev={onPrev} />
    </div>

    <style>{`
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes floatLeft {
        from { transform: translateY(0) rotate(-2deg); }
        to { transform: translateY(-15px) rotate(1deg); }
      }
      @keyframes floatRight {
        from { transform: translateY(0) rotate(2deg); }
        to { transform: translateY(-15px) rotate(-1deg); }
      }
      @keyframes floatCenter {
        from { transform: translateY(0) scale(1); }
        to { transform: translateY(-10px) scale(1.02); }
      }
    `}</style>
  </div>
);

export const MagazineLeft = (props) => (
  <CoverSlide imageSrc="/Nabeelah Left Cover.jpg" title="The Left Cover" subtitle="Edition 01" floatAnim="floatLeft" {...props} />
);

export const MagazineRight = (props) => (
  <CoverSlide imageSrc="/Nabeelah Right cover.jpg" title="The Right Cover" subtitle="Edition 02" floatAnim="floatRight" {...props} />
);

export const MagazineCenter = (props) => (
  <CoverSlide imageSrc="/Nabeelah Centre Cover.jpg" title="The Center Cover" subtitle="Exclusive" floatAnim="floatCenter" {...props} />
);

export const MagazineExtra = (props) => (
  <CoverSlide imageSrc="/Extra Cover.jpg" title="The Extra Cover" subtitle="Special Edition" floatAnim="floatCenter" {...props} />
);

export const MagazineShowcase = ({ onNext, onPrev }) => {
  const [activeIndex, setActiveIndex] = React.useState(1);
  const [dragStartX, setDragStartX] = React.useState(null);

  const images = [
    { src: "/Nabeelah Left Cover.jpg", alt: "Left Cover" },
    { src: "/Nabeelah Centre Cover.jpg", alt: "Center Cover" },
    { src: "/Nabeelah Right cover.jpg", alt: "Right Cover" },
    { src: "/Extra Cover.jpg", alt: "Extra Cover" }
  ];

  const handleDragStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragEnd = (e) => {
    if (dragStartX === null) return;
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = clientX - dragStartX;

    if (diff > 50) {
      setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (diff < -50) {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
    setDragStartX(null);
  };

  const getStyle = (index) => {
    let position = index - activeIndex; 
    
    // Wrap around for continuous loop feel
    if (position > 1) position -= images.length;
    if (position < -1) position += images.length;

    let transform = '';
    let zIndex = 0;
    
    // Base styles for the images
    const baseStyle = {
      position: 'absolute',
      height: '50vh',
      maxHeight: '500px',
      objectFit: 'contain',
      borderRadius: '8px',
      transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
      WebkitBoxReflect: 'below 5px linear-gradient(transparent, transparent, rgba(0,0,0,0.2))'
    };

    if (position === 0) {
       // CENTER ITEM (Active)
       transform = 'translateX(0) translateZ(50px) scale(1.1)';
       zIndex = 20;
       return {
         ...baseStyle,
         transform,
         zIndex,
         boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.2)',
         filter: 'brightness(1)'
       };
    } else if (position === -1) {
       // LEFT ITEM
       transform = 'translateX(-65%) rotateY(15deg) rotateZ(-5deg) scale(0.85)';
       zIndex = 10;
       return {
         ...baseStyle,
         transform,
         zIndex,
         boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
         filter: 'brightness(0.6)'
       };
    } else if (position === 1) {
       // RIGHT ITEM
       transform = 'translateX(65%) rotateY(-15deg) rotateZ(5deg) scale(0.85)';
       zIndex = 10;
       return {
         ...baseStyle,
         transform,
         zIndex,
         boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
         filter: 'brightness(0.6)'
       };
    } else {
       // BACKGROUND ITEM
       transform = 'translateX(0) translateZ(-100px) scale(0.6)';
       zIndex = 5;
       return {
         ...baseStyle,
         transform,
         zIndex,
         boxShadow: 'none',
         filter: 'brightness(0.3) blur(2px)',
         opacity: 0,
         pointerEvents: 'none'
       };
    }
  };

  return (
    <div className="page-section fade-in" style={containerStyle}>
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '2rem',
        color: '#fff',
        letterSpacing: '4px',
        textTransform: 'uppercase',
        marginBottom: '40px',
        zIndex: 30,
        textShadow: '0 5px 15px rgba(0,0,0,0.5)',
        animation: 'fadeIn 1s ease'
      }}>
        The Complete Collection
      </h2>

      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          height: '55vh',
          maxHeight: '550px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1200px',
          zIndex: 10,
          cursor: dragStartX !== null ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {images.map((img, i) => (
          <img 
            key={i}
            src={img.src}
            alt={img.alt}
            style={{
              ...getStyle(i),
              pointerEvents: 'none' // Let container handle the drag events
            }}
            draggable="false"
          />
        ))}
      </div>

      <p style={{
        fontFamily: 'var(--font-cute)',
        fontSize: '1rem',
        color: '#ccc',
        marginTop: '30px',
        zIndex: 10,
        animation: 'fadeIn 2s ease'
      }}>
        Swipe left or right to explore. You are truly admired. ✨
      </p>

      <div style={{ zIndex: 30, marginTop: '25px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};
