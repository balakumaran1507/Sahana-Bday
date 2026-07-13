import React, { useState, useRef } from 'react';
import Hero from './components/Hero';
import PhotoGallery from './components/PhotoGallery';
import CakeCut from './components/CakeCut';
import Playlist from './components/Playlist';
import Letter from './components/Letter';
import UrduPoem from './components/UrduPoem';
import { IntroNabi1, IntroNabi2, IntroNabi3 } from './components/IntroducingNabeelah';
import HubblePhoto from './components/HubblePhoto';
import Outro from './components/Outro';
import './index.css';

function App() {
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
    Outro
  ];

  const handleNext = () => {
    // Autoplay music on the first interaction
    if (currentStep === 0 && audioRef.current && !isPlaying) {
      audioRef.current.play().catch(e => console.log("Audio autoplay blocked", e));
      setIsPlaying(true);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const CurrentComponent = steps[currentStep];

  return (
    <div className="app-container" style={{ overflow: 'hidden' }}>
      {/* Background Audio Placeholder */}
      <audio ref={audioRef} loop>
        <source src="placeholder-audio.mp3" type="audio/mpeg" />
      </audio>
      
      {/* Floating music toggle button */}
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

      {/* Render the current slide */}
      <div key={currentStep} className="fade-in" style={{ width: '100%', minHeight: '100vh' }}>
        <CurrentComponent onNext={handleNext} onPrev={handlePrev} />
      </div>
    </div>
  );
}

export default App;
