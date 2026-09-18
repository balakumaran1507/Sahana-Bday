import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import NavigationButtons from './NavigationButtons';

const fullText = `Dear Nabeelah,

First of all Happy Birthday!

Lol that had to be said its been what 2 years now that we know each, tbh idk really how long it has been but it feels sooo long after all it has been a roller costers of events, now and here we are at last years of our college if anything u might be the biggest smartest and dumbed girl i have ever meet, god have mercy on you yet u pull through but you put me in a havoc to always wander around but ngl handling nabeelah is tuff but it aint impossible with all regards once again happy brithday nabeelah go rock ur life nabi.

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

  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 768;
  const scaleFactor = screenWidth < 450 ? (screenWidth - 30) / 400 : 1;

  return (
    <div className="page-section fade-in" style={{
      minHeight: '100vh',
      background: 'url(/bg-morning.png) center/cover no-repeat',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>

      {/* Soft light glass overlay for readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(255, 255, 255, 0.35)', backdropFilter: 'blur(3px)', zIndex: 0
      }} />

      {/* Hello Kitty Decor Placeholders */}
      <img src="/flower3.png" alt="decor" className="floating floating-decor" style={{ position: 'absolute', top: '10%', left: '5%', width: '100px', opacity: 0.8 }} />
      <img src="/flower4.png" alt="decor" className="floating floating-decor" style={{ position: 'absolute', bottom: '10%', right: '5%', width: '120px', animationDelay: '1s', opacity: 0.8 }} />
      <img src="/flower5.png" alt="decor" className="floating floating-decor" style={{ position: 'absolute', top: '20%', right: '10%', width: '80px', animationDelay: '0.5s', opacity: 0.8 }} />

      {/* Main Scene Container */}
      <div style={{
        position: 'relative',
        width: `${envWidth}px`,
        height: isGone ? 'auto' : `${envHeight}px`,
        perspective: '1500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: isGone ? 'none' : `scale(${scaleFactor})`,
        transition: 'transform 0.5s'
      }}>

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
          borderLeft: `${envWidth / 2}px solid transparent`,
          borderRight: `${envWidth / 2}px solid transparent`,
          borderTop: `${envHeight / 2 + 20}px solid #ff8ea7`,
          transformOrigin: 'top',
          transform: isGone ? 'translateY(100vh) rotateX(180deg) rotateZ(15deg)' : (isClosed ? 'rotateX(0deg)' : 'rotateX(180deg)'),
          transition: 'transform 0.6s ease-in-out, z-index 0s 0.2s, opacity 1s',
          opacity: isGone ? 0 : 1
        }} />

        {/* The Letter */}
        <div style={{
          position: isGone ? 'relative' : 'absolute',
          zIndex: 2,
          width: isGone ? '90vw' : '360px',
          maxWidth: isGone ? '600px' : '360px',
          height: isGone ? 'auto' : '220px',
          minHeight: isGone ? '480px' : '220px',
          background: '#fffef0',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isGone ? 'translateY(-20px)' : (isExtracted ? 'translateY(-180px)' : 'translateY(0)'),
          padding: isGone ? '60px 30px 45px 30px' : '20px',
          display: 'flex', flexDirection: 'column',
          overflow: isGone ? 'visible' : 'hidden'
        }}>

          {/* Decorative Frame Image */}
          <img src="/Flower Letter Border.png" alt="Flower Frame" style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.9,
            borderRadius: '16px'
          }} />

          {/* Decorative pin - only visible when fully expanded */}
          <div style={{
            position: 'absolute', top: '25px', left: '25px',
            display: 'flex', alignItems: 'center', gap: '10px',
            color: '#ff4d85', fontWeight: 'bold', fontFamily: 'var(--font-cute)',
            opacity: isGone ? 1 : 0, transition: 'opacity 1s ease 0.5s',
            zIndex: 1
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff4d85', boxShadow: '0 2px 5px rgba(255,77,133,0.5)' }} />
            To My Birthday Nigge
          </div>
          <img src="/flower6.png" alt="cute" style={{
            position: 'absolute', top: '-20px', right: '-20px', width: '90px', transform: 'rotate(15deg)',
            opacity: isGone ? 1 : 0, transition: 'opacity 1s ease 0.5s',
            zIndex: 1
          }} />

          {/* Typewriter Text */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'var(--font-main)',
            fontSize: '1.15rem',
            lineHeight: '1.8',
            color: '#444',
            whiteSpace: 'pre-wrap',
            marginTop: '40px',
            padding: '0 20px',
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
          borderLeft: `${envWidth / 2}px solid #ff9db4`,
          borderRight: `${envWidth / 2}px solid #ff9db4`,
          borderBottom: `${envHeight / 2 + 30}px solid #ffb6c1`,
          borderTop: `${envHeight / 2 - 30}px solid transparent`,
          borderRadius: '10px',
          transform: isGone ? 'translateY(100vh) rotateZ(15deg)' : 'translateY(0)',
          transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s',
          opacity: isGone ? 0 : 1
        }} />

      </div>

      <div style={{
        zIndex: 20,
        opacity: showNav ? 1 : 0, pointerEvents: showNav ? 'auto' : 'none',
        transition: 'opacity 1s',
        marginTop: '30px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <NavigationButtons onNext={onNext} onPrev={onPrev} />
      </div>
    </div>
  );
};

export default Letter;
