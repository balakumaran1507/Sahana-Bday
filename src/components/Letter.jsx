import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import NavigationButtons from './NavigationButtons';

const fullText = `My dearest Nabeelah,

Happy Birthday! 🎉

Today is all about you, and I just wanted to take a moment to remind you how truly special you are. You bring so much light and joy into the lives of everyone around you. Your smile is contagious, your heart is pure gold, and your spirit is absolutely unmatched.

I hope this year brings you everything you've ever wished for, because you deserve nothing less than the absolute best. Keep shining, keep being your amazing, beautiful self, and never forget how deeply you are loved.

Have the most magical birthday ever!

~Big B`;

const Letter = ({ onNext, onPrev }) => {
  const [phase, setPhase] = useState('closed'); // 'closed' | 'opening' | 'extracted' | 'gone' | 'typing'
  const [displayedText, setDisplayedText] = useState('');
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 1000); // Flap opens
    const t2 = setTimeout(() => setPhase('extracted'), 2000); // Letter slides up
    const t3 = setTimeout(() => setPhase('gone'), 3500); // Envelope drops, letter expands
    const t4 = setTimeout(() => setPhase('typing'), 4500); // Start typing
    const t5 = setTimeout(() => setShowNav(true), 18000); // Show nav after typing finishes (approx 13s)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
    };
  }, []);

  useEffect(() => {
    if (phase === 'typing') {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const envWidth = 400;
  const envHeight = 250;
  const isClosed = phase === 'closed';
  const isOpening = phase === 'opening';
  const isExtracted = phase === 'extracted';
  const isGone = phase === 'gone' || phase === 'typing';

  return (
    <div className="page-section fade-in" style={{ 
      minHeight: '100vh', 
      background: 'transparent', 
      position: 'relative', 
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      {/* Hello Kitty Decor Placeholders */}
      <img src="/flower3.png" alt="decor" className="floating" style={{ position: 'absolute', top: '10%', left: '5%', width: '100px', opacity: 0.8 }} />
      <img src="/flower4.png" alt="decor" className="floating" style={{ position: 'absolute', bottom: '10%', right: '5%', width: '120px', animationDelay: '1s', opacity: 0.8 }} />
      <img src="/flower5.png" alt="decor" className="floating" style={{ position: 'absolute', top: '20%', right: '10%', width: '80px', animationDelay: '0.5s', opacity: 0.8 }} />

      {/* Main Scene Container */}
      <div style={{ position: 'relative', width: `${envWidth}px`, height: `${envHeight}px`, perspective: '1500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* Envelope Back */}
        <div style={{
          position: 'absolute', inset: 0, background: '#ff75a0', borderRadius: '10px', zIndex: 1,
          transform: isGone ? 'translateY(100vh) rotateZ(15deg)' : 'translateY(0)',
          transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s',
          opacity: isGone ? 0 : 1,
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }} />

        {/* Envelope Flap */}
        <div style={{
          position: 'absolute', top: 0, left: 0, zIndex: isClosed ? 4 : 1, // Drops behind letter once open
          width: 0, height: 0,
          borderLeft: `${envWidth/2}px solid transparent`,
          borderRight: `${envWidth/2}px solid transparent`,
          borderTop: `${envHeight/2 + 20}px solid #ff8ea7`,
          transformOrigin: 'top',
          transform: isGone ? 'translateY(100vh) rotateX(180deg) rotateZ(15deg)' : (isClosed ? 'rotateX(0deg)' : 'rotateX(180deg)'),
          transition: 'transform 0.6s ease-in-out, z-index 0s 0.2s, opacity 1s',
          opacity: isGone ? 0 : 1
        }} />

        {/* The Letter */}
        <div style={{
          position: 'absolute',
          zIndex: 2,
          width: isGone ? '90vw' : '360px',
          maxWidth: isGone ? '600px' : '360px',
          height: isGone ? '650px' : '220px',
          background: '#fffef0',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isGone ? 'translateY(-20px)' : (isExtracted ? 'translateY(-180px)' : 'translateY(0)'),
          padding: isGone ? '60px 40px 40px 40px' : '20px',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden'
        }}>
          
          {/* Decorative pin - only visible when fully expanded */}
          <div style={{
            position: 'absolute', top: '25px', left: '25px',
            display: 'flex', alignItems: 'center', gap: '10px',
            color: '#ff4d85', fontWeight: 'bold', fontFamily: 'var(--font-cute)',
            opacity: isGone ? 1 : 0, transition: 'opacity 1s ease 0.5s'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff4d85', boxShadow: '0 2px 5px rgba(255,77,133,0.5)' }} />
            To My Birthday Princess
          </div>
          <img src="/flower6.png" alt="cute" style={{ 
            position: 'absolute', top: '-20px', right: '-20px', width: '90px', transform: 'rotate(15deg)',
            opacity: isGone ? 1 : 0, transition: 'opacity 1s ease 0.5s'
          }} />

          {/* Typewriter Text */}
          <div style={{
            fontFamily: 'var(--font-main)',
            fontSize: '1.15rem',
            lineHeight: '1.8',
            color: '#444',
            whiteSpace: 'pre-wrap',
            marginTop: '30px',
            opacity: isGone ? 1 : 0,
            transition: 'opacity 0.5s'
          }}>
            {displayedText}
          </div>
        </div>

        {/* Envelope Front */}
        <div style={{
          position: 'absolute', top: 0, left: 0, zIndex: 3,
          width: 0, height: 0,
          borderLeft: `${envWidth/2}px solid #ff9db4`,
          borderRight: `${envWidth/2}px solid #ff9db4`,
          borderBottom: `${envHeight/2 + 30}px solid #ffb6c1`,
          borderTop: `${envHeight/2 - 30}px solid transparent`,
          borderRadius: '10px',
          transform: isGone ? 'translateY(100vh) rotateZ(15deg)' : 'translateY(0)',
          transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s',
          opacity: isGone ? 0 : 1
        }} />

      </div>

      <div style={{ 
        position: 'absolute', bottom: '40px', zIndex: 20,
        opacity: showNav ? 1 : 0, pointerEvents: showNav ? 'auto' : 'none',
        transition: 'opacity 1s'
      }}>
        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>
    </div>
  );
};

export default Letter;
