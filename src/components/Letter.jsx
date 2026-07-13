import React from 'react';
import { Heart } from 'lucide-react';
import NavigationButtons from './NavigationButtons';

const Letter = ({ onNext, onPrev }) => {
  return (
    <div className="page-section" style={{ minHeight: '100vh', background: 'var(--pastel-pink)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Hello Kitty Decor Placeholders */}
      <img src="/pngegg.png" alt="decor" className="floating" style={{ position: 'absolute', top: '10%', left: '5%', width: '100px', opacity: 0.8 }} />
      <img src="/pngegg (1).png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '10%', right: '5%', width: '120px', animationDelay: '1s', opacity: 0.8 }} />
      <img src="/pngegg (2).png" alt="decor" className="floating" style={{ position: 'absolute', top: '20%', right: '10%', width: '80px', animationDelay: '0.5s', opacity: 0.8 }} />

      <div className="glass-card fade-in" style={{ maxWidth: '600px', width: '100%', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#ff4d85', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            A Birthday Love Letter 💌
          </h2>
          <p style={{ color: '#ff75a0', fontSize: '0.9rem', fontFamily: 'var(--font-cute)' }}>
            From my heart to the birthday queen ✨
          </p>
        </div>

        <div style={{
          background: '#fffef0',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
          position: 'relative'
        }}>
          {/* Decorative pin */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#ff4d85',
            fontWeight: 'bold',
            fontFamily: 'var(--font-cute)'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff4d85', boxShadow: '0 2px 5px rgba(255,77,133,0.5)' }} />
            To My Birthday Princess
          </div>

          <img src="/pngegg (3).png" alt="cute" style={{ position: 'absolute', top: '-20px', right: '-20px', width: '90px', transform: 'rotate(15deg)' }} />

          <div style={{ marginTop: '40px', fontFamily: 'var(--font-main)', lineHeight: '1.8', color: '#555', fontStyle: 'italic' }}>
            <p style={{ marginBottom: '15px', color: '#ff4d85', fontWeight: 'bold' }}>My dearest birthday girl,</p>
            
            <p style={{ marginBottom: '15px' }}>
              Today marks another year of your incredible existence, and I couldn't be more grateful to celebrate it with you. You bring so much joy, laughter, and love into this world — and into my life.
            </p>
            
            <p style={{ marginBottom: '15px' }}>
              You deserve all the magic, all the dreams, and all the love this world has to offer. Thank you for being the amazing person you are. Here's to making countless more beautiful memories together!
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #ffb6c1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffb6c1'
              }}>
                <Heart size={20} />
              </div>
              
              <div style={{ textAlign: 'right', color: '#ff4d85', fontFamily: 'var(--font-cute)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                Forever yours 🥂
              </div>
            </div>
          </div>
        </div>

        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>
    </div>
  );
};

export default Letter;
