import React from 'react';
import NavigationButtons from './NavigationButtons';

const pageBackgroundStyle = {
  minHeight: '100vh',
  background: 'url(/bg-2-morning.jpg) center/cover no-repeat',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px'
};

const overlayStyle = {
  position: 'absolute',
  inset: 0,
  background: 'rgba(255, 235, 240, 0.45)', // Warm romantic overlay
  backdropFilter: 'blur(4px)',
  zIndex: 0
};

// Scrapbook Washi Tape effect
const WashiTape = () => (
  <div style={{
    position: 'absolute',
    top: '-15px',
    left: '50%',
    transform: 'translateX(-50%) rotate(-3deg)',
    width: '90px',
    height: '24px',
    background: 'rgba(255, 105, 180, 0.25)',
    backdropFilter: 'blur(2px)',
    border: '1px dashed rgba(255, 255, 255, 0.6)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    zIndex: 15
  }} />
);

export const IntroNabi1 = ({ onNext, onPrev }) => {
  return (
    <div className="page-section fade-in" style={pageBackgroundStyle}>
      <div style={overlayStyle} />

      {/* Cute Scrapbook Decors */}
      <img src="/flower3.png" alt="decor" className="floating floating-decor" style={{ position: 'absolute', top: '10%', left: '8%', width: '90px', opacity: 0.9, zIndex: 1 }} />
      <img src="/flower4.png" alt="decor" className="floating floating-decor" style={{ position: 'absolute', bottom: '12%', right: '8%', width: '100px', animationDelay: '0.5s', opacity: 0.9, zIndex: 1 }} />

      <div className="glass-card" style={{
        maxWidth: '480px',
        width: '95%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '30px 20px',
        background: 'rgba(255, 255, 255, 0.75)',
        boxShadow: '0 20px 40px rgba(255, 182, 193, 0.25), inset 0 2px 0 rgba(255,255,255,0.9)'
      }}>
        <h2 style={{
          fontSize: '2rem',
          marginBottom: '25px',
          color: '#ff4d85',
          fontFamily: 'var(--font-heading)',
          textShadow: '0 2px 4px rgba(255,255,255,0.8)'
        }}>
          Happy Birthday Nabi! ✨
        </h2>

        {/* Polaroid Framed GIF */}
        <div style={{
          position: 'relative',
          display: 'inline-block',
          transform: 'rotate(-2deg)',
          background: '#fff',
          padding: '12px 12px 45px 12px',
          boxShadow: '0 12px 25px rgba(0,0,0,0.1)',
          borderRadius: '4px',
          border: '1px solid rgba(0,0,0,0.05)',
          marginBottom: '15px'
        }}>
          <WashiTape />
          <div style={{ background: '#fcfcfc', overflow: 'hidden', borderRadius: '2px' }}>
            <img src="/Nabi-Bday.gif" alt="Nabi Bday" style={{ maxWidth: '280px', width: '100%', display: 'block', objectFit: 'contain' }} />
          </div>
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: 0,
            width: '100%',
            fontFamily: 'var(--font-cute)',
            color: '#777',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            A crayon card for a my nigga 🌸
          </div>
        </div>

        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>
    </div>
  );
};

export const IntroNabi2 = ({ onNext, onPrev }) => {
  return (
    <div className="page-section fade-in" style={pageBackgroundStyle}>
      <div style={overlayStyle} />

      {/* Cute Scrapbook Decors */}
      <img src="/flower5.png" alt="decor" className="floating floating-decor" style={{ position: 'absolute', top: '15%', right: '10%', width: '80px', opacity: 0.9, zIndex: 1 }} />
      <img src="/flower1.png" alt="decor" className="floating floating-decor" style={{ position: 'absolute', bottom: '10%', left: '10%', width: '95px', animationDelay: '0.8s', opacity: 0.9, zIndex: 1 }} />

      <div className="glass-card" style={{
        maxWidth: '480px',
        width: '95%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '30px 20px',
        background: 'rgba(255, 255, 255, 0.75)',
        boxShadow: '0 20px 40px rgba(255, 182, 193, 0.25), inset 0 2px 0 rgba(255,255,255,0.9)'
      }}>
        {/* Polaroid Framed GIF */}
        <div style={{
          position: 'relative',
          display: 'inline-block',
          transform: 'rotate(2deg)',
          background: '#fff',
          padding: '12px 12px 45px 12px',
          boxShadow: '0 12px 25px rgba(0,0,0,0.1)',
          borderRadius: '4px',
          border: '1px solid rgba(0,0,0,0.05)',
          marginBottom: '25px'
        }}>
          <WashiTape />
          <div style={{ background: '#fcfcfc', overflow: 'hidden', borderRadius: '2px' }}>
            <img src="/Make-a-wish-nabi.gif" alt="Make a wish nabi" style={{ maxWidth: '280px', width: '100%', display: 'block', objectFit: 'contain' }} />
          </div>
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: 0,
            width: '100%',
            fontFamily: 'var(--font-cute)',
            color: '#777',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            Make a secret wish! 🎂
          </div>
        </div>

        <h3 style={{
          fontSize: '1.15rem',
          color: '#ff4d85',
          fontFamily: 'var(--font-main)',
          lineHeight: '1.6',
          fontWeight: 600,
          background: 'rgba(255, 255, 255, 0.4)',
          padding: '15px',
          borderRadius: '16px',
          border: '1px dashed rgba(255, 77, 133, 0.2)'
        }}>
          For real thank you for being born, and ur finally 20! Can't wait for ur 21st so we get to be same age lol 🥳
        </h3>

        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>
    </div>
  );
};

export const IntroNabi3 = ({ onNext, onPrev }) => {
  return (
    <div className="page-section fade-in" style={pageBackgroundStyle}>
      <div style={overlayStyle} />

      {/* Cute Scrapbook Decors */}
      <img src="/flower6.png" alt="decor" className="floating floating-decor" style={{ position: 'absolute', top: '8%', left: '12%', width: '90px', opacity: 0.9, zIndex: 1 }} />
      <img src="/flower7.png" alt="decor" className="floating floating-decor" style={{ position: 'absolute', bottom: '15%', right: '12%', width: '85px', animationDelay: '1.1s', opacity: 0.9, zIndex: 1 }} />

      <div className="glass-card" style={{
        maxWidth: '480px',
        width: '95%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '30px 20px',
        background: 'rgba(255, 255, 255, 0.75)',
        boxShadow: '0 20px 40px rgba(255, 182, 193, 0.25), inset 0 2px 0 rgba(255,255,255,0.9)'
      }}>
        {/* Polaroid Framed GIF */}
        <div style={{
          position: 'relative',
          display: 'inline-block',
          transform: 'rotate(-1.5deg)',
          background: '#fff',
          padding: '12px 12px 45px 12px',
          boxShadow: '0 12px 25px rgba(0,0,0,0.1)',
          borderRadius: '4px',
          border: '1px solid rgba(0,0,0,0.05)',
          marginBottom: '25px'
        }}>
          <WashiTape />
          <div style={{ background: '#fcfcfc', overflow: 'hidden', borderRadius: '2px' }}>
            <img src="/nabi-bully.gif" alt="Nabi Bully" style={{ maxWidth: '280px', width: '100%', display: 'block', objectFit: 'contain' }} />
          </div>
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: 0,
            width: '100%',
            fontFamily: 'var(--font-cute)',
            color: '#777',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            Exhibit A: The Bully 😼
          </div>
        </div>

        <h3 style={{
          fontSize: '1.2rem',
          color: '#4a4a4a',
          lineHeight: '1.5',
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          background: 'rgba(255, 255, 255, 0.4)',
          padding: '15px',
          borderRadius: '16px',
          border: '1px dashed rgba(255, 77, 133, 0.2)'
        }}>
          And ofc ur my biggest self proclaimed bully 😹
        </h3>

        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>
    </div>
  );
};

const IntroducingNabeelah = () => {
  return <div>Use specific exports instead.</div>;
};

export default IntroducingNabeelah;
