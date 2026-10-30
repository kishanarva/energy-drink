import React, { useEffect, useRef, useState } from 'react';
import { Zap, Sparkles, ArrowRight, ShoppingBag, Flame } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playNeonHoverSound, playEnergyClickSound, playPowerUpSound } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollCanvas({ onOpenBuyModal }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [activePhase, setActivePhase] = useState(0); // 0: Fatigue, 1: Ignition, 2: Surge, 3: Finale
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);

  const imagesRef = useRef([]);
  const targetFrameRef = useRef(1);
  const renderedFrameRef = useRef(1);
  const rafIdRef = useRef(null);
  const currentPhaseRef = useRef(0);
  const totalFrames = 100;

  const getFrameUrl = (index) => {
    const padded = String(index).padStart(3, '0');
    return `/sequence/ezgif-frame-${padded}.jpg`;
  };

  // 1. Preload all 100 images into memory
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);

      const onLoad = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / totalFrames) * 100);
        setLoadPercent(pct);
        if (loadedCount >= totalFrames) {
          setIsLoaded(true);
        }
      };

      if (img.complete) {
        onLoad();
      } else {
        img.onload = onLoad;
        img.onerror = onLoad;
      }

      images.push(img);
    }

    imagesRef.current = images;

    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // 2. High-performance Canvas Render Function
  const drawFrame = (frameNum) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const idx = Math.min(Math.max(Math.round(frameNum) - 1, 0), totalFrames - 1);
    const img = imagesRef.current[idx];

    if (img && img.complete && img.naturalWidth > 0) {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const hRatio = cw / iw;
      const vRatio = ch / ih;
      const ratio = Math.max(hRatio, vRatio);
      const shiftX = (cw - iw * ratio) / 2;
      const shiftY = (ch - ih * ratio) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';

      ctx.drawImage(img, 0, 0, iw, ih, shiftX, shiftY, iw * ratio, ih * ratio);

      // Commercial cinematic dark vignette
      const gradient = ctx.createRadialGradient(
        cw / 2,
        ch / 2,
        cw * 0.2,
        cw / 2,
        ch / 2,
        cw * 0.8
      );
      gradient.addColorStop(0, 'rgba(5, 5, 5, 0.05)');
      gradient.addColorStop(0.7, 'rgba(5, 5, 5, 0.45)');
      gradient.addColorStop(1, 'rgba(5, 5, 5, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, cw, ch);
    }
  };

  // 3. Canvas Resizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(renderedFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]);

  // 4. Native Smooth Sticky Scroll & Continuous Lerp Loop (Bidirectional Sync)
  useEffect(() => {
    if (!containerRef.current || !isLoaded) return;

    let soundPlayed = false;

    const updateFrameFromProgress = (progress) => {
      targetFrameRef.current = 1 + progress * (totalFrames - 1);

      if (progress >= 0.48 && !soundPlayed) {
        playPowerUpSound();
        soundPlayed = true;
      } else if (progress < 0.4) {
        soundPlayed = false;
      }

      let phase = 0;
      if (progress < 0.25) phase = 0;
      else if (progress < 0.55) phase = 1;
      else if (progress < 0.8) phase = 2;
      else phase = 3;

      if (phase !== currentPhaseRef.current) {
        currentPhaseRef.current = phase;
        setActivePhase(phase);
      }
    };

    // Synchronize with GSAP ScrollTrigger for Lenis smooth scrolling in both directions
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        updateFrameFromProgress(self.progress);
      },
    });

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
      updateFrameFromProgress(progress);
    };

    const lerpLoop = () => {
      const diff = targetFrameRef.current - renderedFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        renderedFrameRef.current += diff * 0.25;
        drawFrame(renderedFrameRef.current);
      }

      rafIdRef.current = requestAnimationFrame(lerpLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafIdRef.current = requestAnimationFrame(lerpLoop);

    return () => {
      trigger.kill();
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isLoaded]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-[250vh] bg-bg-primary"
      aria-label="VOLTIX Kinetic Experience"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Full-bleed HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Ambient Top & Bottom Lighting Gradients */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-10" />

        {/* Clean Brand Loading Screen */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-black border-2 border-volt-lime flex items-center justify-center shadow-neon-lime animate-pulse">
              <Zap className="w-8 h-8 text-volt-lime" />
            </div>
            <div className="font-display font-extrabold text-2xl tracking-wider text-white">
              INITIALIZING VOLTIX
            </div>
            <div className="w-56 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-volt-neon via-volt-lime to-white transition-all duration-150"
                style={{ width: `${loadPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Narrative Overlay Content Driven Seamlessly by Scroll */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-none">
          
          {/* Phase 0: Opening Hook */}
          <div
            className={`transition-all duration-500 max-w-2xl ${
              activePhase === 0
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-8 pointer-events-none absolute'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-volt-lime/50 text-volt-lime text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-neon-lime">
              <Zap className="w-3.5 h-3.5 text-volt-lime" />
              <span>VITALIZES BODY & MIND // ZERO CRASH</span>
            </div>

            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.92] text-white">
              UNLEASH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt-lime via-volt-neon to-white text-glow-lime">
                YOUR ENERGY.
              </span>
            </h1>

            <p className="mt-5 text-content-secondary text-base sm:text-lg font-normal max-w-lg leading-relaxed">
              Vitalizes body, focus, and momentum. Appreciated worldwide by top athletes, competitive esports players, university researchers, and night runners.
            </p>

            {/* Size Selector Pills */}
            <div className="flex items-center gap-2 mt-5">
              <span className="text-xs font-mono text-content-muted uppercase">AVAILABLE SIZES:</span>
              <button
                type="button"
                onClick={() => onOpenBuyModal('original')}
                className="px-2.5 py-1 rounded-md bg-white/10 text-white font-mono text-xs font-bold border border-white/10 hover:border-volt-lime transition-colors"
              >
                250 ml
              </button>
              <button
                type="button"
                onClick={() => onOpenBuyModal('original')}
                className="px-2.5 py-1 rounded-md bg-white/10 text-white font-mono text-xs font-bold border border-white/10 hover:border-volt-lime transition-colors"
              >
                355 ml
              </button>
              <button
                type="button"
                onClick={() => onOpenBuyModal('original')}
                className="px-2.5 py-1 rounded-md bg-volt-lime text-black font-mono text-xs font-bold border border-volt-lime shadow-neon-lime"
              >
                500 ml Vault
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                type="button"
                onClick={() => {
                  playPowerUpSound();
                  onOpenBuyModal('original');
                }}
                onMouseEnter={playNeonHoverSound}
                className="py-4 px-8 rounded-full bg-volt-lime text-black font-display font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-volt-neon transition-all duration-300 hover:scale-105 shadow-neon-lime flex items-center gap-2"
              >
                <span>BUY VOLTIX</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  playEnergyClickSound();
                  onOpenBuyModal('original');
                }}
                onMouseEnter={playNeonHoverSound}
                className="py-4 px-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white/10 hover:border-volt-lime/40 transition-all duration-300 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-volt-lime" />
                <span>DISCOVER ALL EDITIONS</span>
              </button>
            </div>
          </div>

          {/* Phase 1: The Spark */}
          <div
            className={`transition-all duration-500 max-w-xl ${
              activePhase === 1
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none absolute'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-volt-lime/20 border border-volt-lime/40 text-volt-lime text-xs font-mono font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FIRST SIP BIO-ACTIVATION</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              FEEL THE <br />
              <span className="text-volt-lime text-glow-lime">ELECTRIC SPARK.</span>
            </h2>

            <p className="mt-4 text-content-secondary text-base sm:text-lg leading-relaxed">
              Sublingual taurine and ionic electrolytes initiate instant cellular uptake. Fatigue receptors are disengaged without cardiovascular strain.
            </p>

            <div className="mt-6 flex items-center gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-black/70 border border-white/10 text-white">
                <div className="text-volt-lime font-bold text-xl font-display">7 MIN</div>
                <div className="text-content-secondary text-[11px]">Cellular Onset</div>
              </div>
              <div className="p-3 rounded-xl bg-black/70 border border-white/10 text-white">
                <div className="text-volt-lime font-bold text-xl font-display">0.0g</div>
                <div className="text-content-secondary text-[11px]">Zero Glycemic Spike</div>
              </div>
            </div>
          </div>

          {/* Phase 2: Kinetic Flow */}
          <div
            className={`transition-all duration-500 max-w-xl ml-auto text-right ${
              activePhase === 2
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none absolute'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-volt-neon/20 border border-volt-neon/40 text-volt-neon text-xs font-mono font-bold uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>NEURAL FLOW AMPLIFICATION</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              PURE KINETIC <br />
              <span className="text-volt-neon text-glow-neon">FLOW STATE.</span>
            </h2>

            <p className="mt-4 text-content-secondary text-base sm:text-lg leading-relaxed">
              Green coffee bean extract paired with L-Theanine locks you into 4+ hours of steady alpha-wave focus. Zero jitters. Zero afternoon crash.
            </p>

            <div className="mt-6 flex items-center justify-end gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-black/70 border border-white/10 text-right">
                <div className="text-volt-neon font-bold text-xl font-display">99.4%</div>
                <div className="text-content-secondary text-[11px]">Focus Matrix</div>
              </div>
              <div className="p-3 rounded-xl bg-black/70 border border-white/10 text-right">
                <div className="text-volt-neon font-bold text-xl font-display">4+ HRS</div>
                <div className="text-content-secondary text-[11px]">Sustained Output</div>
              </div>
            </div>
          </div>

          {/* Phase 3: Unleashed Finale */}
          <div
            className={`transition-all duration-500 max-w-2xl mx-auto text-center ${
              activePhase === 3
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none absolute'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-volt-lime/20 border border-volt-lime/50 text-volt-lime text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-neon-lime">
              <Flame className="w-4 h-4" />
              <span>COLD-VAULT MATTE ALUMINUM CAN</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-none">
              VOLTIX IS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt-lime via-volt-neon to-white text-glow-lime">
                IN YOUR HANDS.
              </span>
            </h2>

            <p className="mt-4 text-content-secondary text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              Equip your daily performance with cold-vault direct delivery. 180mg bio-caffeine, 0g sugar, 100% recyclable aluminum.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={() => {
                  playPowerUpSound();
                  onOpenBuyModal('original');
                }}
                onMouseEnter={playNeonHoverSound}
                className="py-4 px-9 rounded-full bg-volt-lime text-black font-display font-black text-sm uppercase tracking-wider hover:bg-volt-neon transition-all duration-300 hover:scale-105 shadow-neon-lime flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ORDER VOLTIX NOW</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playEnergyClickSound();
                  onOpenBuyModal('original');
                }}
                onMouseEnter={playNeonHoverSound}
                className="py-4 px-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-display font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
              >
                <span>CHOOSE PACK SIZE</span>
              </button>
            </div>
          </div>

        </div>

        {/* Minimalist, subtle scroll cue */}
        <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-1.5 text-content-muted">
            <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL TO EXPERIENCE</span>
            <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
              <div className="w-1 h-1.5 rounded-full bg-volt-lime animate-bounce" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
