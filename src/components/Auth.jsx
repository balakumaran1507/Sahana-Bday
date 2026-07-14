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
      backgroundColor: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'var(--font-main)',
      userSelect: 'none'
    }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '20px', textAlign: 'center' }}>

        <h1 style={{ 
          fontSize: '1.4rem', 
          marginBottom: '15px', 
          fontFamily: 'var(--font-main)',
          fontWeight: 400,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#e0e0e0'
        }}>
          Authentication
        </h1>

        <p style={{ 
          fontSize: '0.8rem', 
          letterSpacing: '3px', 
          color: '#666', 
          marginBottom: '50px',
          textTransform: 'uppercase'
        }}>
          Enter the date (0101)
        </p>

        {/* PIN Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '60px' }}>
          {[0, 1, 2, 3].map((index) => (
            <div key={index} style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: pin.length > index ? (error ? '#ff4444' : '#fff') : 'transparent',
              border: `1px solid ${error ? '#ff4444' : (pin.length > index ? '#fff' : '#444')}`,
              transition: 'all 0.2s',
              animation: error ? 'shake 0.4s' : 'none'
            }} />
          ))}
        </div>

        {/* Number Pad */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '15px',
          maxWidth: '280px',
          margin: '0 auto'
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} onClick={() => handleNumberClick(num.toString())} style={{
              background: 'transparent',
              border: '1px solid transparent',
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 300,
              padding: '25px 0',
              cursor: 'pointer',
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.border = '1px solid transparent';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {num}
            </button>
          ))}
          <div></div>
          <button onClick={() => handleNumberClick('0')} style={{
            background: 'transparent',
            border: '1px solid transparent',
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: 300,
            padding: '25px 0',
            cursor: 'pointer',
            borderRadius: '50%',
            transition: 'all 0.3s ease'
          }}
            onMouseOver={(e) => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.border = '1px solid transparent';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            0
          </button>
          <button onClick={handleDelete} style={{
            background: 'transparent',
            border: 'none',
            color: '#666',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            cursor: 'pointer',
            borderRadius: '50%',
            transition: 'color 0.3s ease'
          }}
            onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
            onMouseOut={(e) => e.currentTarget.style.color = '#666'}
          >
            <Delete size={22} strokeWidth={1.5} />
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
