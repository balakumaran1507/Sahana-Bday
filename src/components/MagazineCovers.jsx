import React from 'react';
import NavigationButtons from './NavigationButtons';

const containerStyle = {
  minHeight: '100vh',
  background: '#0a0a0a',
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
    <div className="page-section fade-in" style={containerStyle}>
      <div style={{ maxWidth: '600px', textAlign: 'center', zIndex: 10 }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2.5rem',
          color: '#fff',
          letterSpacing: '5px',
          textTransform: 'uppercase',
          marginBottom: '30px',
          textShadow: '0 0 20px rgba(255,255,255,0.3)',
          animation: 'slideUp 1s ease-out'
        }}>
          How I See Nabeelah
        </h2>
        <p style={{
          fontFamily: 'var(--font-cute)',
          fontSize: '1.2rem',
          color: '#aaa',
          fontStyle: 'italic',
          letterSpacing: '1px',
          animation: 'slideUp 1.2s ease-out'
        }}>
          (Just between us... I think you're going to absolutely love these!)
        </p>
        <p style={{
          fontFamily: 'var(--font-main)',
          fontSize: '1.1rem',
          color: '#888',
          marginTop: '40px',
          lineHeight: '1.6',
          animation: 'slideUp 1.4s ease-out'
        }}>
          You might see yourself one way, but this is how the world sees you. 
          A masterpiece. A cover star. 
          <br/><br/>
          Or, you might just hate me entirely for making this... but honestly, it's a gamble I'm more than willing to take! 😉
        </p>
      </div>
      
      <div style={{ position: 'absolute', bottom: '40px', zIndex: 20 }}>
        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
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

    <div style={{ position: 'absolute', bottom: '40px', zIndex: 20 }}>
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

export const MagazineShowcase = ({ onNext, onPrev }) => {
  return (
    <div className="page-section fade-in" style={containerStyle}>
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '2rem',
        color: '#fff',
        letterSpacing: '4px',
        textTransform: 'uppercase',
        marginBottom: '60px',
        zIndex: 10,
        textShadow: '0 5px 15px rgba(0,0,0,0.5)',
        animation: 'fadeIn 1s ease'
      }}>
        The Complete Collection
      </h2>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        zIndex: 10,
        width: '100%',
        perspective: '1000px',
        padding: '0 20px',
        flexWrap: 'wrap' // wrap on mobile
      }}>
        
        {/* Left */}
        <img src="/Nabeelah Left Cover.jpg" alt="Left" style={{
          height: '40vh',
          maxHeight: '400px',
          objectFit: 'contain',
          borderRadius: '8px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          transform: 'rotateY(15deg) rotateZ(-5deg) scale(0.9)',
          transition: 'transform 0.3s ease',
          animation: 'slideInLeft 1s ease-out'
        }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05) rotateZ(0)'} 
           onMouseOut={e => e.currentTarget.style.transform = 'rotateY(15deg) rotateZ(-5deg) scale(0.9)'} />
        
        {/* Center */}
        <img src="/Nabeelah Centre Cover.jpg" alt="Center" style={{
          height: '50vh',
          maxHeight: '500px',
          objectFit: 'contain',
          borderRadius: '8px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.2)',
          transform: 'translateZ(50px) scale(1)',
          transition: 'transform 0.3s ease',
          animation: 'slideInCenter 1.2s ease-out',
          zIndex: 5
        }} onMouseOver={e => e.currentTarget.style.transform = 'translateZ(50px) scale(1.1)'} 
           onMouseOut={e => e.currentTarget.style.transform = 'translateZ(50px) scale(1)'} />
        
        {/* Right */}
        <img src="/Nabeelah Right cover.jpg" alt="Right" style={{
          height: '40vh',
          maxHeight: '400px',
          objectFit: 'contain',
          borderRadius: '8px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          transform: 'rotateY(-15deg) rotateZ(5deg) scale(0.9)',
          transition: 'transform 0.3s ease',
          animation: 'slideInRight 1s ease-out'
        }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05) rotateZ(0)'} 
           onMouseOut={e => e.currentTarget.style.transform = 'rotateY(-15deg) rotateZ(5deg) scale(0.9)'} />
           
      </div>

      <p style={{
        fontFamily: 'var(--font-cute)',
        fontSize: '1rem',
        color: '#ccc',
        marginTop: '50px',
        zIndex: 10,
        animation: 'fadeIn 2s ease'
      }}>
        You are truly admired. ✨
      </p>

      <div style={{ position: 'absolute', bottom: '40px', zIndex: 20 }}>
        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>

      <style>{`
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px) rotateY(15deg) rotateZ(-15deg); } to { opacity: 1; transform: translateX(0) rotateY(15deg) rotateZ(-5deg) scale(0.9); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(50px) rotateY(-15deg) rotateZ(15deg); } to { opacity: 1; transform: translateX(0) rotateY(-15deg) rotateZ(5deg) scale(0.9); } }
        @keyframes slideInCenter { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0) translateZ(50px) scale(1); } }
      `}</style>
    </div>
  );
};
