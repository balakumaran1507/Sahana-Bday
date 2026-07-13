import React from 'react';

const Hero = ({ onNext }) => {
  return (
    <div className="page-section" style={{ minHeight: '100vh', textAlign: 'center', position: 'relative' }}>
      
      {/* Hello Kitty Decor */}
      <img src="/pngegg.png" alt="decor" className="floating" style={{ position: 'absolute', top: '5%', left: '10%', width: '100px', opacity: 0.9 }} />
      <img src="/pngegg (2).png" alt="decor" className="floating" style={{ position: 'absolute', top: '15%', right: '5%', width: '120px', animationDelay: '0.5s', opacity: 0.9 }} />
      <img src="/pngegg (3).png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '15%', left: '5%', width: '90px', animationDelay: '1s', opacity: 0.9 }} />

      <div className="glass-card fade-in" style={{ maxWidth: '400px', width: '100%', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#ffb6c1' }}>
          <span>● ● ●</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Happy Birthday!</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
        
        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>
          Happy Birthday,<br/>Beautiful! 🎂 ✨
        </h1>
        
        <p style={{ margin: '20px 0', fontSize: '1.05rem', lineHeight: '1.6', color: '#666' }}>
          Today is all about celebrating the most amazing person in my world. I've created something magical just for you on your special day...
        </p>

        <h3 style={{ margin: '20px 0', fontSize: '1.1rem', color: '#ff75a0', fontFamily: 'var(--font-cute)' }}>
          Ready for your birthday surprise?
        </h3>

        <button className="btn-primary" onClick={onNext}>
          Let's Gooo
        </button>
      </div>

      <div style={{ position: 'absolute', bottom: '30px', color: '#ff75a0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-cute)', fontWeight: 600 }}>
          Made with endless love for your special day 💕
        </span>
      </div>
    </div>
  );
};

export default Hero;
