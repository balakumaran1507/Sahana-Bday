import React from 'react';

const NavigationButtons = ({ onNext, onPrev, nextText = "Next", prevText = "Back", showNext = true, showPrev = true }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '400px',
      maxWidth: '90vw',
      margin: '30px auto 0',
      padding: '0 10px',
      gap: '15px',
      boxSizing: 'border-box'
    }}>
      {showPrev ? (
        <button 
          onClick={onPrev}
          style={{
            background: 'rgba(255,255,255,0.5)',
            border: '1px solid var(--glass-border)',
            color: '#555',
            padding: '12px 24px',
            borderRadius: '30px',
            fontWeight: 'bold',
            cursor: 'pointer',
            flex: 1,
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.8)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.5)'}
        >
          {prevText}
        </button>
      ) : <div style={{ flex: 1 }} />}

      {showNext && (
        <button 
          onClick={onNext}
          className="btn-primary"
          style={{ flex: 1 }}
        >
          {nextText}
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
