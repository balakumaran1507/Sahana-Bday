import React from 'react';
import NavigationButtons from './NavigationButtons';

export const IntroNabi1 = ({ onNext, onPrev }) => {
  return (
    <div className="page-section fade-in" style={{ minHeight: '100vh', background: 'transparent', position: 'relative' }}>
      <div className="glass-card" style={{ textAlign: 'center', padding: '40px', position: 'relative', zIndex: 10 }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '30px', color: '#ff4d85' }}>Happy Birthday Nabi! ✨</h2>
        <div style={{ 
          background: 'white', padding: '15px', borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'inline-block'
        }}>
          <img src="/Nabi-Bday.gif" alt="Nabi Bday" style={{ borderRadius: '12px', maxWidth: '300px', width: '100%' }} />
        </div>

        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>
    </div>
  );
};

export const IntroNabi2 = ({ onNext, onPrev }) => {
  return (
    <div className="page-section fade-in" style={{ minHeight: '100vh', background: 'transparent', position: 'relative' }}>
      <div className="glass-card" style={{ textAlign: 'center', padding: '40px', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          background: 'white', padding: '15px', borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'inline-block',
          marginBottom: '30px'
        }}>
          <img src="/Make-a-wish-nabi.gif" alt="Make a wish nabi" style={{ borderRadius: '12px', maxWidth: '300px', width: '100%' }} />
        </div>
        <h3 style={{ fontSize: '1.4rem', color: '#ff75a0', fontFamily: 'var(--font-cute)', lineHeight: '1.5' }}>
          For real thank you for being born, and ur finally 20! Can't wait for ur 21st so we get to be same age lol 🥳
        </h3>

        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>
    </div>
  );
};

export const IntroNabi3 = ({ onNext, onPrev }) => {
  return (
    <div className="page-section fade-in" style={{ minHeight: '100vh', background: 'transparent', position: 'relative' }}>
      <div className="glass-card" style={{ textAlign: 'center', padding: '40px', position: 'relative', zIndex: 10 }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#4a4a4a', lineHeight: '1.4' }}>And ofc ur my biggest self proclaimed bully 😹</h2>
        <div style={{ 
          background: 'white', padding: '15px', borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'inline-block'
        }}>
          <img src="/nabi-bully.gif" alt="Nabi Bully" style={{ borderRadius: '12px', maxWidth: '300px', width: '100%' }} />
        </div>

        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>
    </div>
  );
};

const IntroducingNabeelah = () => {
  return <div>Use specific exports instead.</div>;
};

export default IntroducingNabeelah;
