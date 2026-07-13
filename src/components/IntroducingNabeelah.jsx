import React from 'react';
import NavigationButtons from './NavigationButtons';

export const IntroNabi1 = ({ onNext, onPrev }) => {
  return (
    <div className="page-section fade-in" style={{ minHeight: '100vh', background: 'var(--pastel-peach)', position: 'relative' }}>
      <img src="/pngegg (4).png" alt="decor" className="floating" style={{ position: 'absolute', top: '15%', left: '10%', width: '90px' }} />
      <img src="/pngegg (5).png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '15%', right: '10%', width: '110px', animationDelay: '0.8s' }} />
      
      <div className="glass-card" style={{ textAlign: 'center', padding: '40px', position: 'relative', zIndex: 10 }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '30px', color: '#ff4d85' }}>Introducing the Birthday Star ✨</h2>
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
    <div className="page-section fade-in" style={{ minHeight: '100vh', background: 'var(--pastel-yellow)', position: 'relative' }}>
      <img src="/pngegg (6).png" alt="decor" className="floating" style={{ position: 'absolute', top: '20%', right: '15%', width: '100px' }} />
      
      <div className="glass-card" style={{ textAlign: 'center', padding: '40px', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          background: 'white', padding: '15px', borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'inline-block',
          marginBottom: '30px'
        }}>
          <img src="/Make-a-wish-nabi.gif" alt="Make a wish nabi" style={{ borderRadius: '12px', maxWidth: '300px', width: '100%' }} />
        </div>
        <h3 style={{ fontSize: '1.8rem', color: '#ff75a0', fontFamily: 'var(--font-cute)' }}>
          ...but for real though you're my biggest and self proclaimed!
        </h3>

        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>
    </div>
  );
};

export const IntroNabi3 = ({ onNext, onPrev }) => {
  return (
    <div className="page-section fade-in" style={{ minHeight: '100vh', background: 'var(--pastel-pink)', position: 'relative' }}>
      <img src="/pngegg (7).png" alt="decor" className="floating" style={{ position: 'absolute', top: '10%', left: '15%', width: '120px' }} />
      <img src="/pngegg (8).png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '20%', right: '15%', width: '90px', animationDelay: '1.2s' }} />

      <div className="glass-card" style={{ textAlign: 'center', padding: '40px', position: 'relative', zIndex: 10 }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#4a4a4a' }}>Also sometimes this... 😹</h2>
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
