import React from 'react';
import NavigationButtons from './NavigationButtons';

const Outro = ({ onNext, onPrev }) => {
  return (
    <div className="page-section fade-in" style={{ minHeight: '100vh', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      
      {/* New Decor */}
      <img src="/flower5.png" alt="decor" className="floating" style={{ position: 'absolute', top: '10%', left: '15%', width: '90px', opacity: 0.9 }} />
      <img src="/flower6.png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '30%', left: '5%', width: '110px', animationDelay: '0.7s', opacity: 0.9 }} />
      <img src="/flower7.png" alt="decor" className="floating" style={{ position: 'absolute', top: '15%', right: '15%', width: '80px', animationDelay: '1.2s', opacity: 0.9 }} />
      <img src="/flower8.png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '10%', right: '20%', width: '100px', animationDelay: '0.3s', opacity: 0.9 }} />

      {/* Generated goldfish swimming around */}
      <img src="/goldfish_party.png" alt="Goldfish" className="floating" style={{ 
        position: 'absolute', top: '20%', left: '10%', width: '150px',
        animationDuration: '4s', borderRadius: '50%', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', zIndex: 5 
      }} />
      
      <img src="/goldfish_party.png" alt="Goldfish" className="floating" style={{ 
        position: 'absolute', bottom: '20%', right: '10%', width: '120px',
        animationDuration: '3.5s', animationDelay: '1s', borderRadius: '50%', boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        transform: 'scaleX(-1)', zIndex: 5
      }} />

      <div className="glass-card fade-in" style={{ textAlign: 'center', padding: '40px', position: 'relative', zIndex: 10, maxWidth: '500px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#ff4d85' }}>Happy Birthday! 🎉</h2>
        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '40px', fontFamily: 'var(--font-cute)' }}>
          I hope you have the most amazing day ever!
        </p>

        {/* by-goldie gif */}
        <div style={{ 
          background: 'white', padding: '15px', borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'inline-block',
          marginBottom: '20px'
        }}>
          <img src="/by-goldie.gif" alt="By Goldie" style={{ borderRadius: '12px', maxWidth: '250px', width: '100%' }} />
        </div>
        
        <p style={{ color: '#ff75a0', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
          - by goldie
        </p>

        <NavigationButtons onNext={onNext} onPrev={onPrev} nextText="End Credits →" />
      </div>
    </div>
  );
};

export default Outro;
