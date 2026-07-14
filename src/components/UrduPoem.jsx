import React, { useEffect, useState } from 'react';
import NavigationButtons from './NavigationButtons';

const urduLines = [
  "تمہاری آمد سے روشن ہوئی ہے دنیا ہماری،",
  "مسکراہٹ میں تمہاری چھپی ہے جان ہماری۔",
  "خدا کا بے حد شکر ہے جس نے تمہیں بنایا،",
  "تمہارے بنا یہ کائنات تھی سونی اور خالی۔"
];

const englishLines = [
  "Your arrival has illuminated our world,",
  "Our life resides in your beautiful smile.",
  "Endless thanks to God who created you,",
  "Without you, this universe was lonely and empty."
];

const UrduPoem = ({ onNext, onPrev }) => {
  const [phase, setPhase] = useState(0);
  const [embers, setEmbers] = useState([]);

  useEffect(() => {
    const newEmbers = Array.from({ length: 40 }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${8 + Math.random() * 10}s`,
      scale: 0.5 + Math.random() * 1
    }));
    setEmbers(newEmbers);

    // Accelerated sequence timings
    const t1 = setTimeout(() => setPhase(1), 500); // Start Urdu
    const t2 = setTimeout(() => setPhase(2), 2500); // Start English (starts 2s after Urdu starts)
    const t3 = setTimeout(() => setPhase(3), 6000); // Show Nav Buttons

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="page-section" style={{ minHeight: '100vh', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      
      <style>{`
        @keyframes sweepRTL {
          0% { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); opacity: 0; }
          1% { opacity: 1; }
          100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 1; }
        }

        @keyframes moveQuill {
          0% { left: 100%; opacity: 0; transform: translate(-50%, 0) rotate(15deg); }
          1% { opacity: 1; }
          20% { transform: translate(-50%, -10px) rotate(10deg); }
          40% { transform: translate(-50%, 5px) rotate(20deg); }
          60% { transform: translate(-50%, -10px) rotate(12deg); }
          80% { transform: translate(-50%, 5px) rotate(18deg); }
          95% { opacity: 1; }
          100% { left: 0%; opacity: 0; transform: translate(-50%, 0) rotate(15deg); }
        }

        @keyframes focusPull {
          0% { opacity: 0; filter: blur(15px); transform: scale(1.05) translateY(10px); }
          100% { opacity: 1; filter: blur(0px); transform: scale(1) translateY(0); }
        }

        @keyframes floatUp {
          0% { transform: translateY(100vh) translateX(0px) scale(var(--scale)); opacity: 0; }
          20% { opacity: 0.6; }
          50% { transform: translateY(50vh) translateX(20px) scale(var(--scale)); }
          80% { opacity: 0.6; }
          100% { transform: translateY(-10vh) translateX(-20px) scale(var(--scale)); opacity: 0; }
        }

        @keyframes gentleSway {
          0% { transform: rotate(-5deg) translateY(0); }
          50% { transform: rotate(5deg) translateY(-10px); }
          100% { transform: rotate(-5deg) translateY(0); }
        }
      `}</style>

      {/* Night Background Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'url(/bg-night.png) center/cover no-repeat',
        zIndex: 0, pointerEvents: 'none',
        opacity: 0, animation: 'fadeIn 2s ease forwards'
      }} />

      {/* Cinematic Vignette */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at center, rgba(5,5,10,0.4) 0%, rgba(5,5,10,0.9) 100%)',
        zIndex: 1, pointerEvents: 'none',
        opacity: 0, animation: 'fadeIn 2.5s ease forwards'
      }} />

      {/* Background Decor */}
      <img src="/First-page-Corner-Flower.png" alt="decor" style={{ position: 'absolute', top: '5%', left: '5%', width: '120px', opacity: 0.15, zIndex: 1, animation: 'gentleSway 8s ease-in-out infinite' }} />
      <img src="/First-page-big flower.png" alt="decor" style={{ position: 'absolute', bottom: '10%', right: '5%', width: '150px', opacity: 0.15, zIndex: 1, animation: 'gentleSway 10s ease-in-out infinite reverse' }} />

      {/* Floating Embers */}
      {embers.map((ember, i) => (
        <div key={i} style={{
          position: 'absolute',
          bottom: 0,
          left: ember.left,
          width: '3px', height: '3px',
          background: '#ffcf70',
          borderRadius: '50%',
          boxShadow: '0 0 10px 2px rgba(255, 207, 112, 0.8)',
          '--scale': ember.scale,
          animation: `floatUp ${ember.duration} linear infinite`,
          animationDelay: ember.delay,
          zIndex: 2,
          opacity: 0
        }} />
      ))}

      {/* Poem Container */}
      <div style={{ 
        maxWidth: '800px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 10,
        padding: '20px'
      }}>
        
        {/* Urdu Text Sequence with Animated Quill */}
        <div style={{ 
          marginBottom: '50px',
          fontFamily: "'Amiri', 'Noto Nastaliq Urdu', serif", 
          direction: 'rtl',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>
          {urduLines.map((line, idx) => (
            <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{ 
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                lineHeight: '1.8', 
                color: '#ffd700', // Golden text
                textShadow: '0 0 20px rgba(255, 215, 0, 0.4), 0 2px 5px rgba(0,0,0,0.8)',
                opacity: 0, // Hidden by default
                animation: phase >= 1 ? `sweepRTL 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards` : 'none',
                animationDelay: `${idx * 1.2}s`
              }}>
                {line}
              </div>
              <img src="/Quill-Writer.png" alt="Quill" style={{
                position: 'absolute',
                top: '-20px',
                width: '60px',
                pointerEvents: 'none',
                opacity: 0,
                zIndex: 15,
                animation: phase >= 1 ? `moveQuill 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards` : 'none',
                animationDelay: `${idx * 1.2}s`
              }} />
            </div>
          ))}
        </div>

        {/* Separator */}
        <div style={{ 
          width: '80px', height: '2px', 
          background: 'linear-gradient(90deg, transparent, #ffb6c1, transparent)', 
          margin: '0 auto 40px',
          opacity: phase >= 2 ? 1 : 0,
          transition: 'opacity 2s ease'
        }} />

        {/* English Translation Sequence */}
        <div style={{ 
          fontFamily: 'var(--font-main)',
          fontStyle: 'italic',
          fontWeight: 400,
          letterSpacing: '1px',
          color: '#ffffff',
          textShadow: '0 3px 6px rgba(0,0,0,1)'
        }}>
          {englishLines.map((line, idx) => (
            <div key={idx} style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
              lineHeight: '2.2', 
              opacity: 0,
              animation: phase >= 2 ? `focusPull 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards` : 'none',
              animationDelay: `${idx * 0.8}s`
            }}>
              {line}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div style={{
          marginTop: '60px',
          opacity: phase >= 3 ? 1 : 0,
          pointerEvents: phase >= 3 ? 'auto' : 'none',
          transition: 'opacity 2s ease'
        }}>
          <NavigationButtons onNext={onNext} onPrev={onPrev} nextText="Next Chapter →" prevText="Back" />
        </div>

      </div>
    </div>
  );
};

export default UrduPoem;
