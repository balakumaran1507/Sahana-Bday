import React, { useState } from 'react';
import { Delete } from 'lucide-react';

// PIN is stored as a SHA-256 hash — never visible in source as plain text
const CORRECT_HASH = 'a3346b8b4c26feb607f8a40699c934ef426dee5ceebf51f9f7209aa79c08a0da';

async function hashPin(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const Auth = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleNumberClick = async (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      if (newPin.length === 4) {
        const hash = await hashPin(newPin);
        if (hash === CORRECT_HASH) {
          // Trigger the login success transition
          onLogin();
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

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'var(--font-main)',
      userSelect: 'none'
    }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '20px', textAlign: 'center' }}>

        <img
          src="/cat_cake_meme.png"
          alt="Cat"
          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', marginBottom: '20px', boxShadow: '0 4px 15px rgba(255, 77, 133, 0.2)', pointerEvents: 'none' }}
          onContextMenu={(e) => e.preventDefault()}
          draggable="false"
        />

        <h1 style={{ fontSize: '1.8rem', marginBottom: '30px', fontFamily: 'var(--font-heading)' }}>
          A surprise is waiting
        </h1>

        <p style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#888', marginBottom: '10px' }}>
          ENTER THE SECRET CODE 💌
        </p>

        <div style={{
          background: 'rgba(255, 77, 133, 0.1)',
          display: 'inline-block',
          padding: '8px 16px',
          borderRadius: '20px',
          color: '#ff75a0',
          fontSize: '0.9rem',
          marginBottom: '30px',
          fontFamily: 'var(--font-cute)'
        }}>
          Guess the date we never forget (0101) 🌸
        </div>

        {/* PIN Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px' }}>
          {[0, 1, 2, 3].map((index) => (
            <div key={index} style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: `2px solid ${error ? '#ff4444' : '#ff4d85'}`,
              background: pin.length > index ? (error ? '#ff4444' : '#ff4d85') : 'transparent',
              transition: 'all 0.2s',
              animation: error ? 'shake 0.4s' : 'none'
            }} />
          ))}
        </div>

        {/* Number Pad */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          maxWidth: '280px',
          margin: '0 auto'
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} onClick={() => handleNumberClick(num.toString())} style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              padding: '20px 0',
              cursor: 'pointer',
              borderRadius: '16px',
              transition: 'background 0.2s'
            }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              {num}
            </button>
          ))}
          <div></div>
          <button onClick={() => handleNumberClick('0')} style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            padding: '20px 0',
            cursor: 'pointer',
            borderRadius: '16px',
            transition: 'background 0.2s'
          }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            0
          </button>
          <button onClick={handleDelete} style={{
            background: 'transparent',
            border: 'none',
            color: '#ff4d85',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            cursor: 'pointer',
            borderRadius: '16px',
            transition: 'background 0.2s'
          }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Delete size={28} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
};

export default Auth;
