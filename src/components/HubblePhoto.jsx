import React from 'react';
import NavigationButtons from './NavigationButtons';

const HubblePhoto = ({ onNext, onPrev }) => {
  return (
    <div className="page-section fade-in" style={{ minHeight: '100vh', background: '#0b0c10', position: 'relative', overflow: 'hidden' }}>
      
      {/* Some subtle starry background feel using CSS radial gradients */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, #1f2833 0%, #0b0c10 100%)',
        zIndex: 0
      }}></div>

      <div className="glass-card" style={{ 
        maxWidth: '600px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 10,
        background: 'rgba(31, 40, 51, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '15px', color: '#66fcf1', fontFamily: 'var(--font-heading)' }}>
          The Universe on Your Birthday 🌌
        </h2>
        
        <p style={{ fontSize: '1rem', color: '#c5c6c7', marginBottom: '25px', fontFamily: 'var(--font-cute)' }}>
          This is what the Hubble Space Telescope saw on July 14! <br/> 
          A beautiful Supernova Remnant (N 49) just as beautiful as you.
        </p>

        <div style={{ 
          background: 'black', padding: '10px', borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'inline-block',
          marginBottom: '20px'
        }}>
          <img 
            src="/july-14-2019-supernova-remnant-n-49.jpg" 
            alt="Hubble on July 14" 
            style={{ borderRadius: '10px', maxWidth: '100%', height: 'auto' }} 
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <a 
            href="https://imagine.gsfc.nasa.gov/hst_bday/july-14" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#45a29e', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}
          >
            Check out the official NASA page here 🚀
          </a>
        </div>

        <NavigationButtons onNext={onNext} onPrev={onPrev} nextText="Next" prevText="Back" />
      </div>
    </div>
  );
};

export default HubblePhoto;
