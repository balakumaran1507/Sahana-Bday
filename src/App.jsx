import React, { useState, useRef, useEffect } from 'react';
import Hero from './components/Hero';
import NameReveal from './components/NameReveal';
import PhotoGallery from './components/PhotoGallery';
import CakeCut from './components/CakeCut';
import Playlist from './components/Playlist';
import Letter from './components/Letter';
import UrduPoem from './components/UrduPoem';
import { MagazineIntro, MagazineLeft, MagazineRight, MagazineCenter, MagazineShowcase } from './components/MagazineCovers';
import { IntroNabi1, IntroNabi2, IntroNabi3 } from './components/IntroducingNabeelah';
import HubblePhoto from './components/HubblePhoto';
import BalaPass from './components/BalaPass';
import Outro from './components/Outro';
import Credits from './components/Credits';
import Auth from './components/Auth';
import FlowerTransition from './components/FlowerTransition';
import './index.css';

// --- Custom Quill Cursor ---
const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on devices with a mouse
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePos = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseOver = (e) => {
      // Check if we are hovering a clickable element
      const isClickable = e.target.closest('button, a, input, [role="button"]');
      setIsHovering(!!isClickable);
    };

    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePos);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePos);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '32px', height: '32px', // Adjust based on your Quill-Cursor image aspect ratio
      transform: `translate(${pos.x}px, ${pos.y}px)`,
      backgroundImage: 'url(/Quill-Cursor.png)',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      pointerEvents: 'none',
      zIndex: 99999,
      filter: isHovering ? 'invert(1) drop-shadow(0 0 5px rgba(255,255,255,0.8))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
      transition: 'filter 0.2s ease, transform 0.05s linear', // smooth color invert, snappy follow
      transformOrigin: 'top left'
    }} />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // Track the *active* src to prevent resetting audio across slides that share the same song
  const [activeAudioSrc, setActiveAudioSrc] = useState('/Unakkul Naane - Pritt.mp3');

  const steps = [
    { component: Hero, audio: '/Unakkul Naane - Pritt.mp3' },
    { component: NameReveal, audio: '/Michael Jackson - Childhood (Official Video).mp3', audioStart: 55 },
    { component: PhotoGallery, audio: '/Unakkul Naane - Pritt.mp3' },
    { component: CakeCut, audio: '/Unakkul Naane - Pritt.mp3' },
    { component: Playlist, audio: '/Unakkul Naane - Pritt.mp3' },
    { component: Letter, audio: '/Unakkul Naane - Pritt.mp3' },
    { component: UrduPoem, audio: '/Unakkul Naane - Pritt.mp3' },
    
    // Magazine Section with custom audio
    { component: MagazineIntro, audio: '/Iraade.mp3', audioStart: 40 },
    { component: MagazineLeft, audio: '/Iraade.mp3' }, 
    { component: MagazineRight, audio: '/Iraade.mp3' },
    { component: MagazineCenter, audio: '/Iraade.mp3' },
    { component: MagazineShowcase, audio: '/Iraade.mp3' },
    
    { component: IntroNabi1, audio: '/Unakkul Naane - Pritt.mp3' },
    { component: IntroNabi2, audio: '/Unakkul Naane - Pritt.mp3' },
    { component: IntroNabi3, audio: '/Unakkul Naane - Pritt.mp3' },
    { component: HubblePhoto, audio: '/Unakkul Naane - Pritt.mp3' },
    { component: BalaPass, audio: '/Unakkul Naane - Pritt.mp3' },
    { component: Outro, audio: '/Unakkul Naane - Pritt.mp3' },
    { component: Credits, audio: '/La petite fille de la mer (Remastered).mp3' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      setIsPlaying(true);
    }
  };

  // Audio track switching logic
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const step = steps[currentStep];
    const targetAudio = step.audio;
    
    if (activeAudioSrc !== targetAudio) {
      if (isPlaying && audioRef.current) {
        // Smooth fade out
        let vol = 1;
        const fadeOut = setInterval(() => {
          if (vol > 0.1) {
            vol -= 0.1;
            audioRef.current.volume = vol;
          } else {
            clearInterval(fadeOut);
            audioRef.current.volume = 0;
            setActiveAudioSrc(targetAudio);
            
            // Wait for DOM to update src, then fade in
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.play().catch(e => console.error("Audio switch play failed:", e));
                let volIn = 0;
                audioRef.current.volume = volIn;
                const fadeIn = setInterval(() => {
                  if (volIn < 0.9) {
                    volIn += 0.1;
                    audioRef.current.volume = volIn;
                  } else {
                    clearInterval(fadeIn);
                    audioRef.current.volume = 1;
                  }
                }, 100);
              }
            }, 50);
          }
        }, 100);
      } else {
        setActiveAudioSrc(targetAudio);
      }
    }
  }, [currentStep, isAuthenticated, isPlaying, activeAudioSrc]);

  const handleLoadedMetadata = (e) => {
    const step = steps[currentStep];
    if (step.audioStart && activeAudioSrc === step.audio) {
      e.target.currentTime = step.audioStart;
    } else if (activeAudioSrc !== '/Unakkul Naane - Pritt.mp3') {
      e.target.currentTime = 0;
    }
    // Note: We don't reset currentTime for Unakkul Naane if it's already playing from a previous screen to allow continuous playback!
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="app-container" onClick={startAudio} style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <CustomCursor />
      
      {/* Global Audio Element */}
      <audio 
        ref={audioRef} 
        loop 
        src={activeAudioSrc} 
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Flower wipe overlay */}
      {isTransitioning && (
        <FlowerTransition 
          onMidpoint={() => setIsAuthenticated(true)}
          onComplete={() => setIsTransitioning(false)}
        />
      )}

      {!isAuthenticated ? (
        <Auth onLogin={() => setIsTransitioning(true)} />
      ) : (
        <div style={{ height: '100%' }}>
          <CurrentComponent onNext={handleNext} onPrev={handlePrev} />
        </div>
      )}
    </div>
  );
}

export default App;
