import React, { useState, useEffect, useRef } from 'react';
import { Zap, Activity, Waves, Gauge, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playNeonHoverSound, playEnergyClickSound } from '../utils/sound';
import InteractiveCanSequence from './InteractiveCanSequence';

gsap.registerPlugin(ScrollTrigger);

export default function EnergyExperience() {
  const [energyLevel, setEnergyLevel] = useState(2); // 1: Steady Focus, 2: Peak Flow, 3: Hyperdrive
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  // GSAP ScrollTrigger entrance
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.experience-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      gsap.fromTo(
        '.experience-console',
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.experience-console',
            start: 'top 80%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      gsap.fromTo(
        '.experience-studio',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.experience-studio',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const modes = [
    {
      level: 1,
      name: 'STEADY FOCUS',
      hz: '340 Hz',
      desc: 'Calm alpha-wave cognitive alignment. Ideal for deep work, strategy, and continuous design sessions.',
      color: '#39FF14',
      speed: 0.02,
      amplitude: 25,
      frequency: 0.015,
    },
    {
      level: 2,
      name: 'PEAK FLOW',
      hz: '720 Hz',
      desc: 'Balanced neuromuscular synergy. Razor reflexes for competitive gaming and athletic training.',
      color: '#C7FF00',
      speed: 0.045,
      amplitude: 50,
      frequency: 0.025,
    },
    {
      level: 3,
      name: 'HYPERDRIVE OVERCLOCK',
      hz: '1280 Hz',
      desc: 'Maximum sensory amplification. Explosive sprint endurance and high-stakes tournament adrenaline.',
      color: '#F97316',
      speed: 0.08,
      amplitude: 75,
      frequency: 0.04,
    },
  ];

  const currentMode = modes[energyLevel - 1];

  // Canvas wave animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let step = 0;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 280;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      step += currentMode.speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw multiple sinusoidal energy wave harmonics
      const lines = [
        { opacity: 0.2, offset: 0, ampMult: 0.6 },
        { opacity: 0.4, offset: 2, ampMult: 0.8 },
        { opacity: 0.9, offset: 4, ampMult: 1.1 },
      ];

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = currentMode.color;
        ctx.globalAlpha = line.opacity;

        const centerY = canvas.height / 2;

        for (let x = 0; x < canvas.width; x += 3) {
          const y =
            centerY +
            Math.sin(x * currentMode.frequency + step + line.offset) *
              (currentMode.amplitude * line.ampMult) *
              Math.sin(x / canvas.width * Math.PI); // envelope taper

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Ambient glowing horizontal center beam
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = currentMode.color;
      ctx.fillRect(0, canvas.height / 2 - 1, canvas.width, 2);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [energyLevel]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-bg-primary overflow-hidden"
      aria-label="Energy Experience Visualizer"
    >
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none transition-colors duration-700 opacity-30"
        style={{ backgroundColor: currentMode.color }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="experience-header text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-volt-lime">
            <Activity className="w-3.5 h-3.5" />
            <span>KINETIC HARMONICS</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            FEEL THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt-lime to-white">VOLTIX EXPERIENCE.</span>
          </h2>
          <p className="text-content-secondary text-base sm:text-lg">
            Interact with our simulated bio-kinetic wave synthesizer. Tune into the optimal frequency for your personal state of momentum.
          </p>
        </div>

        {/* Interactive Experience Console */}
        <div className="experience-console rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2 text-white">
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: currentMode.color }} />
              <span className="font-bold tracking-wider uppercase">SYNTHESIZER STATUS: ACTIVE</span>
            </div>
            <div className="flex items-center gap-4 text-content-secondary">
              <span>FREQUENCY: <strong className="text-white">{currentMode.hz}</strong></span>
              <span>STATE: <strong style={{ color: currentMode.color }}>{currentMode.name}</strong></span>
            </div>
          </div>

          {/* Canvas Wave Visualizer */}
          <div className="relative w-full h-64 sm:h-72 my-6 rounded-2xl bg-black/60 border border-white/5 overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full block" />
            <div className="absolute top-4 left-4 font-mono text-[11px] text-content-secondary flex items-center gap-1.5">
              <Waves className="w-4 h-4" style={{ color: currentMode.color }} />
              <span>OSCILLOSCOPE HARMONIC WAVE</span>
            </div>
          </div>

          {/* Interactive Mode Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {modes.map((m) => {
              const isSelected = energyLevel === m.level;
              return (
                <button
                  key={m.level}
                  type="button"
                  onMouseEnter={playNeonHoverSound}
                  onClick={() => {
                    playEnergyClickSound();
                    setEnergyLevel(m.level);
                  }}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white/10 border-white/30 shadow-lg'
                      : 'bg-white/5 border-white/5 hover:border-white/15'
                  }`}
                  style={{
                    borderColor: isSelected ? m.color : undefined,
                    boxShadow: isSelected ? `0 0 20px ${m.color}25` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase font-bold" style={{ color: m.color }}>
                      TIER 0{m.level} // {m.hz}
                    </span>
                    <Zap className="w-4 h-4" style={{ color: isSelected ? m.color : '#666' }} />
                  </div>
                  <div className="font-display font-extrabold text-lg text-white mb-1">
                    {m.name}
                  </div>
                  <p className="text-xs text-content-secondary leading-relaxed">
                    {m.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 100-Frame Interactive Cinematic Scrubber Studio */}
        <div className="experience-studio mt-12">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-volt-lime font-bold">
              BIO-KINETIC TELEMETRY STUDIO
            </span>
            <h3 className="text-2xl font-display font-extrabold text-white mt-1">
              THE TRANSFORMATION TIMELINE
            </h3>
          </div>
          <InteractiveCanSequence />
        </div>

      </div>
    </section>
  );
}
