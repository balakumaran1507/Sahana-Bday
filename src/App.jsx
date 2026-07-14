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
import Auth from './components/Auth';
import FlowerTransition from './components/FlowerTransition';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // Track the *active* src to prevent resetting audio across slides that share the same song
  const [activeAudioSrc, setActiveAudioSrc] = useState('/placeholder-audio.mp3');

  const steps = [
    { component: Hero, audio: '/placeholder-audio.mp3' },
    { component: NameReveal, audio: '/Michael Jackson - Childhood (Official Video).mp3', audioStart: 55 },
    { component: PhotoGallery, audio: '/placeholder-audio.mp3' },
    { component: CakeCut, audio: '/placeholder-audio.mp3' },
    { component: Playlist, audio: '/placeholder-audio.mp3' },
    { component: Letter, audio: '/placeholder-audio.mp3' },
    { component: UrduPoem, audio: '/placeholder-audio.mp3' },
    
    // Magazine Section with custom audio
    { component: MagazineIntro, audio: '/Iraade.mp3', audioStart: 40 },
    { component: MagazineLeft, audio: '/Iraade.mp3' }, // Continues playing seamlessly
    { component: MagazineRight, audio: '/Iraade.mp3' },
    { component: MagazineCenter, audio: '/Iraade.mp3' },
    { component: MagazineShowcase, audio: '/Iraade.mp3' },
    
    { component: IntroNabi1, audio: '/placeholder-audio.mp3' },
    { component: IntroNabi2, audio: '/placeholder-audio.mp3' },
    { component: IntroNabi3, audio: '/placeholder-audio.mp3' },
    { component: HubblePhoto, audio: '/placeholder-audio.mp3' },
    { component: BalaPass, audio: '/placeholder-audio.mp3' },
    { component: Outro, audio: '/placeholder-audio.mp3' }
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
      setActiveAudioSrc(targetAudio);
      // We don't set currentTime here anymore.
      // We wait for onLoadedMetadata on the audio tag to fire.
      
      if (audioRef.current && isPlaying) {
        // The browser will automatically load the new src because of the state change
        // We just need to ensure it plays once it's ready.
        audioRef.current.play().catch(e => console.error("Audio switch play failed:", e));
      }
    }
  }, [currentStep, isAuthenticated, isPlaying, activeAudioSrc]);

  const handleLoadedMetadata = (e) => {
    const step = steps[currentStep];
    if (step.audioStart) {
      e.target.currentTime = step.audioStart;
    } else {
      e.target.currentTime = 0;
    }
  };

  const CurrentComponent = steps[currentStep].component;

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
          <audio 
            ref={audioRef} 
            loop 
            src={activeAudioSrc} 
            onLoadedMetadata={handleLoadedMetadata}
          />
          
          <div onClick={startAudio} style={{ height: '100%' }}>
            <CurrentComponent onNext={handleNext} onPrev={handlePrev} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
