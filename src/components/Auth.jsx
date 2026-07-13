import React, { useState } from 'react';
import { Delete } from 'lucide-react';
import FlowerTransition from './FlowerTransition';

// PIN stored as SHA-256 hash — never visible as plain text
const CORRECT_HASH = 'a3346b8b4c26feb607f8a40699c934ef426dee5ceebf51f9f7209aa79c08a0da';

async function hashPin(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const FLOWER_DECORATIONS = [
  // Top left cluster
  { src: '/flower2.png', top: '-40px', left: '-30px', width: '180px', rotate: '-15deg', delay: '0s' },
  { src: '/flower5.png', top: '-20px', left: '100px', width: '140px', rotate: '10deg', delay: '0.2s' },
  { src: '/flower8.png', top: '-10px', left: '200px', width: '120px', rotate: '-5deg', delay: '0.1s' },
  // Top right cluster
  { src: '/flower1.png', top: '-40px', right: '-20px', width: '190px', rotate: '20deg', delay: '0s' },
  { src: '/flower4.png', top: '-20px', right: '120px', width: '150px', rotate: '-10deg', delay: '0.15s' },
  { src: '/flower7.png', top: '10px', right: '240px', width: '110px', rotate: '5deg', delay: '0.25s' },
  // Bottom left
  { src: '/flower3.png', bottom: '-30px', left: '-20px', width: '160px', rotate: '15deg', delay: '0s' },
  { src: '/flower9.png', bottom: '-20px', left: '110px', width: '130px', rotate: '-8deg', delay: '0.2s' },
  // Bottom right
  { src: '/flower6.png', bottom: '-30px', right: '-10px', width: '170px', rotate: '-20deg', delay: '0s' },
  { src: '/flower10.png', bottom: '-20px', right: '130px', width: '140px', rotate: '12deg', delay: '0.1s' },
];

const Auth = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleNumberClick = async (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      if (newPin.length === 4) {
        const hash = await hashPin(newPin);
        if (hash === CORRECT_HASH) {
          // Trigger the flower transition
          setTimeout(() => setShowTransition(true), 200);
        } else {
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 600);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  if (showTransition) {
    return <FlowerTransition onComplete={onLogin} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5ece4',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-main)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Corner flower decorations */}
      {FLOWER_DECORATIONS.map((f, i) => (
        <img
          key={i}
          src={f.src}
          alt=""
          draggable="false"
          onContextMenu={e => e.preventDefault()}
          style={{
            position: 'absolute',
            top: f.top,
            left: f.left,
            right: f.right,
            bottom: f.bottom,
            width: f.width,
            transform: `rotate(${f.rotate})`,
            pointerEvents: 'none',
            opacity: 0,
            animation: `fadeInFlower 0.8s ease forwards ${f.delay}`,
          }}
        />
      ))}

      {/* Central PIN pad */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
        {/* Pixel heart */}
        <div style={{ marginBottom: '20px', fontSize: '2.5rem' }}>🩷</div>

        {/* PIN dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
          {[0, 1, 2, 3].map((index) => (
            <div key={index} style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              border: `2px solid ${error ? '#e05a7a' : '#e8a0b0'}`,
              background: pin.length > index ? (error ? '#e05a7a' : '#e8a0b0') : 'transparent',
              transition: 'all 0.2s',
              animation: error ? 'shake 0.4s' : 'none',
            }} />
          ))}
        </div>

        {/* Number grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          maxWidth: '240px',
          margin: '0 auto',
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              style={{
                background: 'rgba(255,255,255,0.85)',
                border: 'none',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                fontSize: '1.3rem',
                color: '#7a5c5c',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'all 0.15s',
                fontFamily: 'var(--font-main)',
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,1)'; e.currentTarget.style.transform = 'scale(1.08)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {num}
            </button>
          ))}

          <div /> {/* spacer */}

          <button
            onClick={() => handleNumberClick('0')}
            style={{
              background: 'rgba(255,255,255,0.85)',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              fontSize: '1.3rem',
              color: '#7a5c5c',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.15s',
              fontFamily: 'var(--font-main)',
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,1)'; e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            0
          </button>

          <button
            onClick={handleDelete}
            style={{
              background: 'rgba(255,255,255,0.85)',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e8a0b0',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.15s',
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,1)'; e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Delete size={22} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInFlower {
          from { opacity: 0; transform: translateY(-10px) rotate(var(--r, 0deg)); }
          to   { opacity: 1; transform: translateY(0)    rotate(var(--r, 0deg)); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
};

export default Auth;
