import React, { useState, useRef } from 'react';
import Hero from './components/Hero';
import PhotoGallery from './components/PhotoGallery';
import CakeCut from './components/CakeCut';
import Playlist from './components/Playlist';
import Letter from './components/Letter';
import UrduPoem from './components/UrduPoem';
import { IntroNabi1, IntroNabi2, IntroNabi3 } from './components/IntroducingNabeelah';
import HubblePhoto from './components/HubblePhoto';
import BalaPass from './components/BalaPass';
import Outro from './components/Outro';
import Auth from './components/Auth';
import FlowerTransition from './components/FlowerTransition';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const steps = [
    Hero,
    PhotoGallery,
    CakeCut,
    Playlist,
    Letter,
    UrduPoem,
    IntroNabi1,
    IntroNabi2,
    IntroNabi3,
    HubblePhoto,
    BalaPass,
    Outro
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

  const toggleAudio = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error(e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const CurrentComponent = steps[currentStep];

  return (
    <div className="app-container" style={{ overflow: 'hidden' }}>
      
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
        <>
          <audio ref={audioRef} loop>
            <source src="/placeholder-audio.mp3" type="audio/mpeg" />
          </audio>
          
          <button 
            onClick={toggleAudio}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 1000,
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--glass-shadow)',
              fontSize: '1.2rem'
            }}
          >
            {isPlaying ? '🎵' : '🔇'}
          </button>
          
          <div onClick={startAudio} style={{ height: '100%' }}>
            <CurrentComponent onNext={handleNext} onPrev={handlePrev} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
