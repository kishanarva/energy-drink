import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Sparkles, Activity, Clock, Sliders } from 'lucide-react';
import { playNeonHoverSound, playEnergyClickSound, playPowerUpSound } from '../utils/sound';

export default function InteractiveCanSequence({ className = '' }) {
  const canvasRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const imagesRef = useRef([]);
  const animFrameRef = useRef(null);
  const totalFrames = 100;

  // Format frame number: 1 -> "001", 10 -> "010", 100 -> "100"
  const getFrameUrl = (idx) => {
    const padded = String(idx).padStart(3, '0');
    return `/sequence/ezgif-frame-${padded}.jpg`;
  };

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const imgs = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      imgs.push(img);
    }

    imagesRef.current = imgs;
  }, []);

  // Draw current frame to canvas
  const renderFrame = (frameNum) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameNum - 1];

    if (img && img.complete) {
      // Maintain aspect ratio cover
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShiftX = (canvas.width - img.width * ratio) / 2;
      const centerShiftY = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftX,
        centerShiftY,
        img.width * ratio,
        img.height * ratio
      );
    }
  };

  // Sync canvas render with currentFrame
  useEffect(() => {
    renderFrame(currentFrame);
  }, [currentFrame, imagesLoaded]);

  // Handle canvas sizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight || 450;
        renderFrame(currentFrame);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentFrame]);

  // Play / Pause animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let lastTime = performance.now();
    const fps = 24; // cinematic 24fps
    const interval = 1000 / fps;

    const loop = (now) => {
      const delta = now - lastTime;
      if (delta >= interval) {
        lastTime = now - (delta % interval);
        setCurrentFrame((prev) => {
          if (prev >= totalFrames) {
            return 1; // loop
          }
          if (prev === 48) {
            playPowerUpSound(); // sound fx on energy surge
          }
          return prev + 1;
        });
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Stage details based on current frame
  const getStageInfo = () => {
    if (currentFrame <= 30) {
      return {
        phase: 'PHASE 01: COGNITIVE FATIGUE',
        clarity: '18%',
        reaction: '410ms',
        fatigue: '94%',
        desc: 'Pre-consumption state. Reaction latency elevated, mental fatigue dominant.',
        color: '#ef4444',
      };
    } else if (currentFrame <= 65) {
      return {
        phase: 'PHASE 02: KINETIC IGNITION',
        clarity: '72%',
        reaction: '210ms',
        fatigue: '32%',
        desc: 'Immediate sublingual activation. Bioactive Taurine & B-complex catalyze rapid cellular ATP.',
        color: '#C7FF00',
      };
    } else {
      return {
        phase: 'PHASE 03: PEAK VOLTIX FLOW',
        clarity: '99%',
        reaction: '135ms',
        fatigue: '0%',
        desc: 'Full neuromuscular synergy. Zero jitteriness, relentless laser focus engaged.',
        color: '#39FF14',
      };
    }
  };

  const stage = getStageInfo();

  return (
    <div className={`relative rounded-3xl glass-panel p-4 sm:p-6 border border-white/10 shadow-2xl overflow-hidden ${className}`}>
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
          <span className="text-white font-bold tracking-wider">{stage.phase}</span>
        </div>
        <div className="flex items-center gap-3 text-content-secondary">
          <span className="text-volt-lime font-bold">HIGH-SPEED BIO-TELEMETRY</span>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative w-full aspect-video rounded-2xl bg-black overflow-hidden flex items-center justify-center border border-white/10 shadow-inner group">
        <canvas ref={canvasRef} className="w-full h-full block object-cover" />

        {/* Loading overlay if frames are buffering */}
        {!imagesLoaded && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 space-y-3 z-30">
            <Zap className="w-8 h-8 text-volt-lime animate-bounce" />
            <div className="text-sm font-mono text-white font-bold">
              INITIALIZING TRANSFORMATION SEQUENCE
            </div>
            <div className="w-48 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-volt-lime transition-all duration-150"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Real-time Bio-Telemetric Overlay Heads-up Display (HUD) */}
        <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono space-y-1 z-20 pointer-events-none hidden sm:block">
          <div className="text-[10px] text-content-muted uppercase">REAL-TIME TELEMETRY</div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-content-secondary">Mental Clarity:</span>
            <span className="font-bold text-white">{stage.clarity}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-content-secondary">Reflex Latency:</span>
            <span className="font-bold text-volt-lime">{stage.reaction}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-content-secondary">Fatigue Level:</span>
            <span className="font-bold" style={{ color: stage.color }}>{stage.fatigue}</span>
          </div>
        </div>

        {/* Bottom Stage Narrative */}
        <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-content-secondary flex items-center justify-between z-20">
          <p className="line-clamp-1 pr-2 text-white/90">
            {stage.desc}
          </p>
          <span className="shrink-0 text-volt-lime font-bold">ACTIVE SCAN</span>
        </div>
      </div>

      {/* Scrubbing & Playback Controls */}
      <div className="mt-5 space-y-3">
        {/* Timeline Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-mono text-content-secondary">
            <span>DRAG TIMELINE TO SCRUB TRANSFORMATION</span>
            <span className="text-white font-bold">{currentFrame}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={currentFrame}
            onChange={(e) => {
              if (isPlaying) setIsPlaying(false);
              setCurrentFrame(parseInt(e.target.value));
            }}
            aria-label="Scrub energy transformation timeline"
            className="w-full accent-volt-lime bg-white/10 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playEnergyClickSound();
                setIsPlaying(!isPlaying);
              }}
              onMouseEnter={playNeonHoverSound}
              className="py-2.5 px-5 rounded-full bg-volt-lime text-black font-display font-extrabold text-xs uppercase tracking-wider hover:bg-volt-neon transition-colors flex items-center gap-2 shadow-neon-lime"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-black" />}
              <span>{isPlaying ? 'PAUSE PREVIEW' : 'PLAY PREVIEW'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playEnergyClickSound();
                setCurrentFrame(1);
              }}
              onMouseEnter={playNeonHoverSound}
              aria-label="Restart timeline to beginning"
              title="Restart"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-content-secondary hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Quick jump milestones */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setCurrentFrame(1)}
              className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 text-content-secondary hover:text-white transition-colors"
            >
              Fatigue
            </button>
            <button
              type="button"
              onClick={() => setCurrentFrame(50)}
              className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 text-content-secondary hover:text-white transition-colors"
            >
              Ignition
            </button>
            <button
              type="button"
              onClick={() => setCurrentFrame(100)}
              className="px-3 py-1 rounded-md bg-volt-lime/20 border border-volt-lime/40 text-volt-lime font-bold hover:bg-volt-lime hover:text-black transition-colors"
            >
              Peak Energy
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
