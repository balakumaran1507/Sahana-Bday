import React, { useState, useRef } from 'react';
import NavigationButtons from './NavigationButtons';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// --- Abstracted Ticket Component ---
const TicketCard = ({ innerRef, claimed, stamped, handleClaim, isClone }) => (
  <div ref={innerRef} style={{
    background: 'linear-gradient(135deg, #fffbe6 0%, #fff8d6 100%)',
    borderRadius: '20px',
    padding: '0',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 2px #ffd700, 0 0 30px rgba(255,215,0,0.15)',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '480px',
    pointerEvents: isClone ? 'none' : 'auto',
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

      <div style={{ borderTop: '1px dashed #e0c060', margin: '0 0 20px' }} />

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

      <div style={{ borderTop: '1px dashed #e0c060', margin: '0 0 20px' }} />

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

        <div
          onClick={(!isClone && !claimed) ? handleClaim : undefined}
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            border: claimed ? '3px solid #cc0000' : '3px dashed #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: (!isClone && !claimed) ? 'pointer' : 'default',
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
);

// --- CSS 2D Printer Component ---
const PrinterMachine = ({ phase }) => {
  return (
    <div style={{
      position: 'relative',
      width: '400px',
      height: '150px',
      margin: '0 auto',
      zIndex: 20,
      animation: phase === 'processing' ? 'printerShake 0.15s infinite' : 'none',
    }}>
      {/* Paper guide left */}
      <div style={{ position: 'absolute', top: '-15px', left: '50px', width: '20px', height: '30px', background: '#ccc', borderRadius: '5px 0 0 0', border: '2px solid #999', borderBottom: 'none', zIndex: 1 }} />
      {/* Paper guide right */}
      <div style={{ position: 'absolute', top: '-15px', right: '50px', width: '20px', height: '30px', background: '#ccc', borderRadius: '0 5px 0 0', border: '2px solid #999', borderBottom: 'none', zIndex: 1 }} />
      
      {/* Main Body */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: '25px',
        background: 'linear-gradient(to bottom, #e0e0e0, #a0a0a0)',
        borderRadius: '20px',
        border: '3px solid #777',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 5px 10px rgba(255,255,255,0.8)',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Top Feed Slot */}
        <div style={{ width: '320px', height: '12px', background: '#222', borderRadius: '6px', marginTop: '10px', border: '2px solid #111', boxShadow: 'inset 0 5px 10px rgba(0,0,0,0.8)' }} />
        
        {/* Control Panel */}
        <div style={{
          width: '200px', height: '45px', background: '#222', marginTop: '15px',
          borderRadius: '8px', border: '2px solid #444',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px'
        }}>
          {/* Status Screen */}
          <div style={{
            background: '#0f0f15', color: phase === 'done' ? '#00ffcc' : (phase === 'processing' ? '#ff3366' : '#00ff00'),
            padding: '6px 10px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 'bold',
            width: '90px', textAlign: 'center', border: '1px solid #333',
            boxShadow: 'inset 0 0 5px rgba(0,0,0,0.8)',
            textShadow: `0 0 5px ${phase === 'processing' ? '#ff3366' : '#00ff00'}`
          }}>
            {phase === 'idle' || phase === 'capturing' ? 'READY' : phase === 'feeding' ? 'LOAD' : phase === 'processing' ? 'PRINTING' : phase === 'ejecting' ? 'EJECT' : 'DONE'}
          </div>
          
          {/* LED Lights */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{
              width: '12px', height: '12px', borderRadius: '50%',
              background: phase !== 'idle' ? '#00ffcc' : '#444',
              boxShadow: phase !== 'idle' ? '0 0 10px #00ffcc' : 'none',
              animation: phase === 'processing' ? 'blink 0.3s infinite' : 'none'
            }} />
            <div style={{
              width: '12px', height: '12px', borderRadius: '50%',
              background: phase === 'processing' ? '#ff3366' : '#444',
              boxShadow: phase === 'processing' ? '0 0 10px #ff3366' : 'none',
              animation: phase === 'processing' ? 'blink 0.2s infinite reverse' : 'none'
            }} />
          </div>
        </div>

        {/* Logo / Brand */}
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', color: '#666', marginTop: '12px', letterSpacing: '3px' }}>
          BALA-PRINT 3000
        </div>
      </div>

      {/* Output Tray Extension (Perspective) */}
      <div style={{
        position: 'absolute', bottom: 0, left: '40px', right: '40px', height: '40px',
        background: 'linear-gradient(to bottom, #888, #555)',
        border: '3px solid #444', borderTop: 'none',
        borderRadius: '0 0 15px 15px',
        transform: 'perspective(200px) rotateX(45deg)',
        transformOrigin: 'top',
        zIndex: 2,
        boxShadow: '0 20px 30px rgba(0,0,0,0.6)'
      }} />
      
      {/* Bottom Output Slot (where paper comes out) */}
      <div style={{
        position: 'absolute', bottom: '18px', left: '45px', right: '45px', height: '12px',
        background: '#111', borderRadius: '4px', zIndex: 4,
        boxShadow: 'inset 0 5px 10px rgba(0,0,0,0.9)'
      }} />
    </div>
  );
};


const BalaPass = ({ onNext, onPrev }) => {
  const [claimed, setClaimed] = useState(false);
  const [stamped, setStamped] = useState(false);
  const [printPhase, setPrintPhase] = useState('idle'); // 'idle' | 'capturing' | 'feeding' | 'processing' | 'ejecting' | 'done'
  
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
        scale: 2, 
        useCORS: true,
        backgroundColor: '#1a1a2e',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      
      // 2. Feed the ticket into the printer
      setPrintPhase('feeding');
      
      // 3. Printer processing / shaking
      setTimeout(() => {
        setPrintPhase('processing');
      }, 1500);

      // 4. Eject the clone out the bottom
      setTimeout(() => {
        setPrintPhase('ejecting');
      }, 3500);
      
      // 5. Finished - Prompt PDF Save
      setTimeout(() => {
        pdf.save('Bala_Sir_Premium_Pass.pdf');
        setPrintPhase('done');
      }, 6000);
      
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

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center', color: '#ffd700', fontFamily: 'var(--font-heading)',
          fontSize: '1.2rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px', opacity: 0.9
        }}>
          ⭐ Official Document ⭐
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* TOP TICKET WRAPPER (FEEDS IN) */}
          {(printPhase === 'idle' || printPhase === 'capturing' || printPhase === 'feeding' || printPhase === 'processing') && (
             <div style={{
               width: '100%',
               height: printPhase === 'idle' ? 'auto' : '650px',
               overflow: printPhase === 'idle' ? 'visible' : 'hidden',
               display: 'flex',
               justifyContent: 'center',
               position: 'relative',
               zIndex: 10,
               transition: 'height 0.3s ease',
               marginBottom: printPhase === 'idle' ? '40px' : '-20px'
             }}>
               <div style={{
                 width: '100%',
                 display: 'flex',
                 justifyContent: 'center',
                 transform: printPhase === 'feeding' || printPhase === 'processing' ? 'translateY(700px)' : 'translateY(0)',
                 transition: 'transform 1.5s cubic-bezier(0.5, 0, 1, 1)'
               }}>
                  <TicketCard innerRef={ticketRef} claimed={claimed} stamped={stamped} handleClaim={handleClaim} isClone={false} />
               </div>
             </div>
          )}

          {/* THE PRINTER MACHINE */}
          <div style={{
            opacity: printPhase === 'idle' ? 0 : 1,
            height: printPhase === 'idle' ? '0px' : '150px',
            transform: printPhase === 'idle' ? 'scale(0.8)' : 'scale(1)',
            transition: 'all 0.5s ease',
            pointerEvents: 'none',
            zIndex: 20
          }}>
            {printPhase !== 'idle' && <PrinterMachine phase={printPhase} />}
          </div>

          {/* BOTTOM TICKET WRAPPER (EJECTS OUT) */}
          {printPhase !== 'idle' && (
            <div style={{
              width: '100%',
              height: '650px',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 5,
              marginTop: '-40px' // overlaps with printer output tray
            }}>
               <div style={{
                 width: '100%',
                 display: 'flex',
                 justifyContent: 'center',
                 transform: printPhase === 'ejecting' || printPhase === 'done' ? 'translateY(30px)' : 'translateY(-700px)',
                 transition: 'transform 2.5s cubic-bezier(0, 0.2, 0.4, 1)' // smooth ease out
               }}>
                  <TicketCard claimed={claimed} stamped={stamped} isClone={true} />
               </div>
            </div>
          )}

        </div>

        {/* ACTION BUTTONS */}
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          
          {!claimed && (
            <p style={{ color: '#aaa', fontSize: '0.9rem', fontFamily: 'var(--font-cute)', animation: 'pulse 2s infinite' }}>
              Tap the stamp on the ticket to validate it first!
            </p>
          )}

          {claimed && printPhase === 'idle' && (
            <button 
              onClick={handlePrint}
              style={{
                padding: '16px 32px',
                borderRadius: '30px',
                border: 'none',
                background: 'linear-gradient(90deg, #00ffcc, #00b3ff)',
                color: '#1a1a2e',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.1rem',
                letterSpacing: '1px',
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(0, 255, 204, 0.3)',
                transition: 'all 0.3s',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              🖨️ PRINT OFFICIAL TICKET
            </button>
          )}

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
        @keyframes twinkle { from { opacity: 0.1; } to { opacity: 0.5; } }
        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        @keyframes printerShake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          20% { transform: translate(-1px, -2px) rotate(-1deg); }
          40% { transform: translate(-3px, 0px) rotate(1deg); }
          60% { transform: translate(3px, 2px) rotate(0deg); }
          80% { transform: translate(1px, -1px) rotate(1deg); }
          100% { transform: translate(-1px, 2px) rotate(-1deg); }
        }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default BalaPass;
