import React, { useState } from 'react';
import { Delete } from 'lucide-react';

// PIN is stored as a SHA-256 hash - never visible in source as plain text
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
      background: 'url(/lock-screen-bg.avif) center/cover no-repeat', // New Blue lockscreen background
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4a4a4a',
      fontFamily: 'var(--font-cute)',
      userSelect: 'none'
    }}>

      <div style={{
        maxWidth: '350px',
        width: '90%',
        padding: '40px 20px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        borderRadius: '30px',
        boxShadow: '0 10px 30px rgba(96, 165, 250, 0.3), inset 0 2px 0 rgba(255,255,255,0.8)', // Blue tinted shadow
        border: '1px solid rgba(255,255,255,0.6)'
      }}>

        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
          🦋
        </div>

        <h1 style={{
          fontSize: '1.6rem',
          marginBottom: '10px',
          fontFamily: 'var(--font-heading)',
          color: '#3b82f6', // Elegant blue
          letterSpacing: '1px'
        }}>
          A Surprise Awaits!
        </h1>

        <p style={{
          fontSize: '0.9rem',
          color: '#666',
          marginBottom: '30px',
          fontWeight: 600
        }}>
          Guess the date we never forget (0101) 💙
        </p>

        {/* PIN Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
          {[0, 1, 2, 3].map((index) => (
            <div key={index} style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: pin.length > index ? (error ? '#ef4444' : '#60a5fa') : 'transparent',
              border: `2px solid ${error ? '#ef4444' : '#60a5fa'}`,
              transition: 'all 0.2s',
              animation: error ? 'shake 0.4s' : 'none',
              boxShadow: pin.length > index ? '0 0 10px rgba(96, 165, 250, 0.5)' : 'none'
            }} />
          ))}
        </div>

        {/* Number Pad */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '15px',
          maxWidth: '240px',
          margin: '0 auto'
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} onClick={() => handleNumberClick(num.toString())} style={{
              background: 'rgba(255, 255, 255, 0.6)',
              border: 'none',
              color: '#3b82f6', // Blue numbers
              fontSize: '1.4rem',
              fontWeight: 600,
              fontFamily: 'var(--font-cute)',
              padding: '15px 0',
              cursor: 'pointer',
              borderRadius: '20px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#60a5fa'; // Blue hover
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(96, 165, 250, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                e.currentTarget.style.color = '#3b82f6';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
              }}
            >
              {num}
            </button>
          ))}
          <div></div>
          <button onClick={() => handleNumberClick('0')} style={{
            background: 'rgba(255, 255, 255, 0.6)',
            border: 'none',
            color: '#3b82f6',
            fontSize: '1.4rem',
            fontWeight: 600,
            fontFamily: 'var(--font-cute)',
            padding: '15px 0',
            cursor: 'pointer',
            borderRadius: '20px',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
          }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#60a5fa';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 15px rgba(96, 165, 250, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
              e.currentTarget.style.color = '#3b82f6';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
            }}
          >
            0
          </button>
          <button onClick={handleDelete} style={{
            background: 'transparent',
            border: 'none',
            color: '#60a5fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            cursor: 'pointer',
            borderRadius: '20px',
            transition: 'all 0.2s ease'
          }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#2563eb'; // Darker blue on hover
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#60a5fa';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Delete size={26} strokeWidth={2} />
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
