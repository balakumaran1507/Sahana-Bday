import React, { useState, useRef, useEffect } from 'react';
import Hero from './components/Hero';
import NameReveal from './components/NameReveal';
import BdayBanner from './components/BdayBanner';
import PhotoGallery from './components/PhotoGallery';
import CakeCut from './components/CakeCut';
import Playlist from './components/Playlist';
import Letter from './components/Letter';
import UrduPoem from './components/UrduPoem';
import { MagazineIntro, MagazineLeft, MagazineRight, MagazineCenter, MagazineExtra, MagazineShowcase } from './components/MagazineCovers';
import { IntroNabi1, IntroNabi2, IntroNabi3 } from './components/IntroducingNabeelah';
import HubblePhoto from './components/HubblePhoto';
import BalaPass from './components/BalaPass';
import Outro from './components/Outro';
import Credits from './components/Credits';
import BdayNight from './components/BdayNight';
import TheEnd from './components/TheEnd';
import FinalMessage from './components/FinalMessage';
import Auth from './components/Auth';
import FlowerTransition from './components/FlowerTransition';
import PetalsCursor from './components/PetalsCursor';
import './index.css';

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
    { component: BdayBanner, audio: '/Maryan.mp3', audioStart: 42 },
    { component: PhotoGallery, audio: '/Maryan.mp3' },
    { component: CakeCut, audio: '/Maryan.mp3' },
    { component: Playlist, audio: null }, // Pause background music so Spotify can play
    { component: Letter, audio: '/Maryan.mp3' },
    { component: UrduPoem, audio: '/Maryan.mp3' },
    
    // Magazine Section with custom audio
    { component: MagazineIntro, audio: '/Iraade.mp3', audioStart: 40 },
    { component: MagazineLeft, audio: '/Iraade.mp3' }, 
    { component: MagazineRight, audio: '/Iraade.mp3' },
    { component: MagazineCenter, audio: '/Iraade.mp3' },
    { component: MagazineExtra, audio: '/Iraade.mp3' },
    { component: MagazineShowcase, audio: '/Iraade.mp3' },
    
    { component: HubblePhoto, audio: '/Maryan.mp3' },
    { component: Outro, audio: '/Maryan.mp3' },
    { component: Credits, audio: '/La petite fille de la mer (Remastered).mp3' }, // Note: We keep this playing the ending track as requested
    { component: BdayNight, audio: '/La petite fille de la mer (Remastered).mp3' },
    { component: TheEnd, audio: '/La petite fille de la mer (Remastered).mp3' },
    { component: FinalMessage, audio: '/La petite fille de la mer (Remastered).mp3' }
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
            
            if (targetAudio) {
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
            } else {
              audioRef.current.pause();
              setIsPlaying(false);
            }
          }
        }, 100);
      } else {
        setActiveAudioSrc(targetAudio);
        if (targetAudio && audioRef.current) {
           setTimeout(() => {
             audioRef.current.volume = 1;
             audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("Audio resume failed:", e));
           }, 50);
        }
      }
    }
  }, [currentStep, isAuthenticated, isPlaying, activeAudioSrc]);

  // Spacebar Page Skip Shortcut (Silent Dev Tool)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        // Ignore space if user is currently typing in an input/textarea
        if (document.activeElement && 
           (document.activeElement.tagName === 'INPUT' || 
            document.activeElement.tagName === 'TEXTAREA' ||
            document.activeElement.isContentEditable)) {
          return;
        }
        
        e.preventDefault(); // Prevent page scroll
        
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [steps.length]);

  const handleLoadedMetadata = (e) => {
    const step = steps[currentStep];
    if (step.audioStart && activeAudioSrc === step.audio) {
      e.target.currentTime = step.audioStart;
    } else if (
      activeAudioSrc !== '/Unakkul Naane - Pritt.mp3' && 
      activeAudioSrc !== '/Maryan.mp3' && 
      activeAudioSrc !== '/La petite fille de la mer (Remastered).mp3'
    ) {
      e.target.currentTime = 0;
    }
    // Note: We don't reset currentTime for Unakkul Naane, Maryan, and La petite fille if they are already playing from a previous screen to allow continuous playback!
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="app-container" onClick={startAudio} style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <PetalsCursor />
      
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
          {currentStep === steps.length - 1 ? (
            <CurrentComponent onNext={() => setCurrentStep(0)} onPrev={handlePrev} />
          ) : (
            <CurrentComponent onNext={handleNext} onPrev={handlePrev} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
