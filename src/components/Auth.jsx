import React, { useState } from 'react';
import { Delete } from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const correctPin = '1407';

  const handleNumberClick = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);
      
      if (newPin.length === 4) {
        if (newPin === correctPin) {
          setTimeout(() => {
            onLogin();
          }, 300);
        } else {
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 500);
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
      fontFamily: 'var(--font-main)'
    }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '20px', textAlign: 'center' }}>
        
        {/* Cat Icon (Using one of the decor images as a placeholder for the cat) */}
        <img src="/cat_cake_meme.png" alt="Cat" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', marginBottom: '20px', boxShadow: '0 4px 15px rgba(255, 77, 133, 0.2)' }} />
        
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
          Guess the date we never forget (1407) 🌸
        </div>

        {/* PIN Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px' }}>
          {[0, 1, 2, 3].map((index) => (
            <div key={index} style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: '2px solid #ff4d85',
              background: pin.length > index ? '#ff4d85' : 'transparent',
              transition: 'background 0.2s',
              transform: error ? 'translateX(5px)' : 'none',
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
            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              {num}
            </button>
          ))}
          <div></div> {/* Empty cell */}
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
          onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
          onMouseOut={(e) => e.target.style.background = 'transparent'}
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
            cursor: 'pointer',
            borderRadius: '16px',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
          onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            <Delete size={28} />
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
      `}</style>
    </div>
  );
};

export default Auth;
