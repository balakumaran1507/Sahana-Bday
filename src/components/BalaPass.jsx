import React, { useState, useRef } from 'react';
import NavigationButtons from './NavigationButtons';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const BalaPass = ({ onNext, onPrev }) => {
  const [claimed, setClaimed] = useState(false);
  const [stamped, setStamped] = useState(false);
  const [printPhase, setPrintPhase] = useState('idle'); // 'idle' | 'capturing' | 'scanning' | 'done'
  
  const ticketRef = useRef(null);

  const handleClaim = () => {
    setStamped(true);
    setTimeout(() => setClaimed(true), 600);
  };

  const handlePrint = async () => {
    if (!claimed || printPhase !== 'idle') return;
    
    setPrintPhase('capturing');
    
    try {
      // 1. Capture the DOM element invisibly first
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: '#1a1a2e', // Match the outer glow/theme if needed, but it's capturing the card mostly
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2] // Scale it back down for normal PDF size
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      
      // 2. Start the visual scanner animation for the user
      setPrintPhase('scanning');
      
      // 3. Wait for the scanning animation to feel "real" (2.5 seconds)
      setTimeout(() => {
        pdf.save('Bala_Sir_Premium_Pass.pdf');
        setPrintPhase('done');
      }, 2500);
      
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      setPrintPhase('idle');
    }
  };

  return (
    <div className="page-section fade-in" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
    }}>
      {/* Subtle starry backdrop */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${2 + (i * 13 % 3)}px`,
          height: `${2 + (i * 13 % 3)}px`,
          borderRadius: '50%',
          background: 'white',
          top: `${(i * 7.3 + 3) % 95}%`,
          left: `${(i * 11.7 + 5) % 95}%`,
          opacity: 0.1 + (i % 5) * 0.08,
          animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite alternate`,
          animationDelay: `${(i * 0.2) % 2}s`,
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '480px' }}>

        <h2 style={{
          textAlign: 'center',
          color: '#ffd700',
          fontFamily: 'var(--font-heading)',
          fontSize: '1.2rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '24px',
          opacity: 0.9
        }}>
          ⭐ Official Document ⭐
        </h2>

        {/* WRAPPER FOR SCANNER ANIMATION */}
        <div style={{
          position: 'relative',
          transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: printPhase === 'scanning' ? 'scale(0.95) translateY(10px)' : 'scale(1)',
        }}>
          
          {/* THE SCANNER LASER */}
          {printPhase === 'scanning' && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-5%',
              right: '-5%',
              height: '4px',
              background: '#00ffcc',
              boxShadow: '0 0 20px 8px rgba(0, 255, 204, 0.6), 0 0 40px 15px rgba(0, 255, 204, 0.3)',
              zIndex: 50,
              pointerEvents: 'none',
              animation: 'scanLaser 2.5s ease-in-out forwards',
              borderRadius: '10px'
            }} />
          )}

          {/* THE PASS CARD (This ref is what html2canvas captures) */}
          <div ref={ticketRef} style={{
            background: 'linear-gradient(135deg, #fffbe6 0%, #fff8d6 100%)',
            borderRadius: '20px',
            padding: '0',
            boxShadow: printPhase === 'scanning' 
              ? '0 0 50px rgba(0, 255, 204, 0.3), 0 0 0 2px #00ffcc' 
              : '0 20px 60px rgba(0,0,0,0.5), 0 0 0 2px #ffd700, 0 0 30px rgba(255,215,0,0.15)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'box-shadow 0.5s ease',
          }}>

            {/* Gold top banner */}
            <div style={{
              background: 'linear-gradient(90deg, #b8860b, #ffd700, #b8860b)',
              padding: '14px 20px',
              textAlign: 'center',
            }}>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.75rem',
                letterSpacing: '4px',
                color: '#1a1a1a',
                textTransform: 'uppercase',
                margin: 0
              }}>
                CERTIFIED BY BALA SIR™ &nbsp; · &nbsp; ONE TIME USE ONLY
              </p>
            </div>

            {/* Perforated edge dots */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px', margin: '-10px 0' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#1a1a2e' }} />
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#1a1a2e' }} />
            </div>

            {/* Main body */}
            <div style={{ padding: '28px 28px 24px' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <p style={{ fontSize: '0.65rem', color: '#b8860b', letterSpacing: '2px', margin: '0 0 4px', textTransform: 'uppercase' }}>Issued To</p>
                  <p style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
                    Nabeelah Anjum
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.65rem', color: '#b8860b', letterSpacing: '2px', margin: '0 0 4px', textTransform: 'uppercase' }}>Valid</p>
                  <p style={{ fontSize: '1rem', fontFamily: 'var(--font-cute)', fontWeight: 700, color: '#333', margin: 0 }}>Forever</p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px dashed #e0c060', margin: '0 0 20px' }} />

              {/* The actual message */}
              <p style={{
                fontFamily: 'var(--font-main)',
                fontSize: '0.95rem',
                lineHeight: '1.75',
                color: '#2a2a2a',
                margin: '0 0 20px',
              }}>
                This pass gives you, and only you, the right to come to me —{' '}
                <strong>Bala Sir</strong>, the Greatest Creator, the Coolest Guy you know,
                and probably the Coolest in the whole world, and also your{' '}
                <strong>Best Hacker</strong> — and ask me to build or hack{' '}
                <strong>ONE thing</strong> for you. No questions asked.
              </p>

              <p style={{
                fontFamily: 'var(--font-cute)',
                fontSize: '0.9rem',
                color: '#555',
                fontStyle: 'italic',
                margin: '0 0 20px',
              }}>
                (has to be reasonable though — I'm good but I'm not hacking the World Bank for you lol... I mean I could 👀 but still)
              </p>

              {/* Divider */}
              <div style={{ borderTop: '1px dashed #e0c060', margin: '0 0 20px' }} />

              {/* Footer row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ fontSize: '0.65rem', color: '#b8860b', letterSpacing: '2px', margin: '0 0 6px', textTransform: 'uppercase' }}>Authorised by</p>
                  <p style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: '#1a1a1a',
                    margin: 0,
                    fontStyle: 'italic',
                  }}>
                    Bala Sir ⚡
                  </p>
                  <p style={{ fontSize: '0.7rem', color: '#888', margin: '2px 0 0' }}>The Coolest Guy She Knows™</p>
                </div>

                {/* STAMP area */}
                <div
                  onClick={!claimed && printPhase === 'idle' ? handleClaim : undefined}
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    border: claimed ? '3px solid #cc0000' : '3px dashed #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: claimed ? 'default' : 'pointer',
                    transition: 'all 0.3s',
                    transform: stamped ? 'scale(1) rotate(-12deg)' : 'scale(1) rotate(0deg)',
                    position: 'relative',
                    background: claimed ? 'rgba(220, 0, 0, 0.05)' : 'transparent',
                  }}
                >
                  {claimed ? (
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '0.55rem', fontWeight: 800, letterSpacing: '1px', color: '#cc0000', margin: 0, textTransform: 'uppercase' }}>CLAIMED</p>
                      <p style={{ fontSize: '1.6rem', margin: 0 }}>✅</p>
                      <p style={{ fontSize: '0.5rem', color: '#cc0000', margin: 0 }}>ONE TIME</p>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '0.55rem', color: '#aaa', margin: 0, fontFamily: 'var(--font-cute)' }}>tap to</p>
                      <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#aaa', margin: 0 }}>CLAIM</p>
                      <p style={{ fontSize: '1.4rem', margin: 0 }}>🔖</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Gold bottom banner */}
            <div style={{
              background: 'linear-gradient(90deg, #b8860b, #ffd700, #b8860b)',
              padding: '8px 20px',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'var(--font-cute)', fontSize: '0.7rem', color: '#1a1a1a', margin: 0, letterSpacing: '1px' }}>
                🌟 Use it wisely. This offer expires never — but the gesture is priceless. 🌟
              </p>
            </div>
          </div>
        </div>

        {/* PRINT & NAVIGATION ACTIONS */}
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          
          {/* 1. If not claimed, tell them to tap the stamp */}
          {!claimed && (
            <p style={{ color: '#aaa', fontSize: '0.9rem', fontFamily: 'var(--font-cute)', animation: 'pulse 2s infinite' }}>
              Tap the stamp on the ticket to validate it first!
            </p>
          )}

          {/* 2. Print Button (only shows when claimed and not finished) */}
          {claimed && printPhase !== 'done' && (
            <button 
              onClick={handlePrint}
              disabled={printPhase !== 'idle'}
              style={{
                padding: '16px 32px',
                borderRadius: '30px',
                border: 'none',
                background: printPhase === 'idle' ? 'linear-gradient(90deg, #00ffcc, #00b3ff)' : '#333',
                color: printPhase === 'idle' ? '#1a1a2e' : '#00ffcc',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.1rem',
                letterSpacing: '1px',
                cursor: printPhase === 'idle' ? 'pointer' : 'default',
                boxShadow: printPhase === 'idle' ? '0 10px 20px rgba(0, 255, 204, 0.3)' : 'none',
                transform: printPhase === 'idle' ? 'scale(1)' : 'scale(0.95)',
                transition: 'all 0.3s',
              }}
            >
              {printPhase === 'idle' ? '🖨️ PRINT OFFICIAL TICKET' : '📠 SCANNING... BZZT...'}
            </button>
          )}

          {/* 3. Success Message & Next Button (only after printing) */}
          {printPhase === 'done' && (
            <div className="fade-in" style={{ width: '100%', textAlign: 'center' }}>
              <p style={{ color: '#00ffcc', fontWeight: 'bold', marginBottom: '20px', fontFamily: 'var(--font-cute)' }}>
                ✅ PDF Saved to your PC! Keep it safe.
              </p>
              <NavigationButtons onNext={onNext} onPrev={onPrev} nextText="Final Page →" />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          from { opacity: 0.1; }
          to   { opacity: 0.5; }
        }
        @keyframes scanLaser {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default BalaPass;
