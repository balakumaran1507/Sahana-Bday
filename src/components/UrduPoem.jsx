import React from 'react';
import NavigationButtons from './NavigationButtons';

const UrduPoem = ({ onNext, onPrev }) => {
  return (
    <div className="page-section fade-in" style={{ minHeight: '100vh', background: 'var(--pastel-peach)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Soft decor for the poem page */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
        zIndex: 0
      }}></div>

      <img src="/pngegg (3).png" alt="decor" className="floating" style={{ position: 'absolute', top: '10%', left: '10%', width: '80px', opacity: 0.7 }} />
      <img src="/pngegg.png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '15%', right: '10%', width: '100px', animationDelay: '1s', opacity: 0.7 }} />

      <div className="glass-card" style={{ 
        maxWidth: '600px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 10,
        background: 'rgba(255, 255, 255, 0.85)'
      }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', color: '#ff4d85', fontFamily: 'var(--font-heading)' }}>
          A Little Poetry For You ✨
        </h2>
        
        {/* Urdu text */}
        <div style={{ 
          fontSize: '1.6rem', 
          lineHeight: '2', 
          color: '#4a4a4a', 
          marginBottom: '30px',
          fontFamily: "'Amiri', 'Noto Nastaliq Urdu', serif", // Fallback for beautiful Urdu rendering
          direction: 'rtl'
        }}>
          تمہاری آمد سے روشن ہوئی ہے دنیا ہماری،<br/>
          مسکراہٹ میں تمہاری چھپی ہے جان ہماری۔<br/>
          خدا کا بے حد شکر ہے جس نے تمہیں بنایا،<br/>
          تمہارے بنا یہ کائنات تھی سونی اور خالی۔
        </div>

        <div style={{ 
          width: '50px', 
          height: '2px', 
          background: '#ffb6c1', 
          margin: '0 auto 30px' 
        }}></div>

        {/* English Translation */}
        <div style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.8', 
          color: '#666', 
          fontFamily: 'var(--font-cute)',
          fontStyle: 'italic',
          marginBottom: '20px'
        }}>
          "Your arrival has illuminated our world,<br/>
          Our life resides in your beautiful smile.<br/>
          Endless thanks to God who created you,<br/>
          Without you, this universe was lonely and empty."
        </div>

        <NavigationButtons onNext={onNext} onPrev={onPrev} nextText="Next" prevText="Back" />
      </div>
    </div>
  );
};

export default UrduPoem;
